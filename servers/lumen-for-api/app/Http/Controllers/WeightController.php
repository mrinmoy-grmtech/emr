<?php

namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class WeightController extends Controller
{
    public function get_all_temporal_weights($pPtUuid)
    {
        $weightQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, trim((UNIX_TIMESTAMP(timeOfMeasurementInMilliSecs) * 1000))+0 as timeOfMeasurementInMilliSecs FROM sc_vital_signs.weight FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($weightQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliSecs = (int)($requestData['data']['timeOfMeasurementInMilliSecs']);
        $weightInPounds = $requestData['data']['weightInPounds'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertWeight = DB::statement("INSERT INTO `sc_vital_signs`.`weight` (`serverSideRowUuid`, `ptUuid`, `weightInPounds`, `timeOfMeasurementInMilliSecs`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$weightInPounds}, FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertWeight, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $timeOfMeasurementInMilliSecs = (int)($requestData['data']['timeOfMeasurementInMilliSecs']);
        $weightInPounds = $requestData['data']['weightInPounds'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateWeight = DB::statement("UPDATE `sc_vital_signs`.`weight` SET `weightInPounds` = {$weightInPounds}, `timeOfMeasurementInMilliSecs` = FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `weight`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateWeight, 200);
    }

    public function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
