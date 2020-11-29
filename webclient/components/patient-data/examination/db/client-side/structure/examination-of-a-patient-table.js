// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'
import examinationAllSelectOptionsTbl from './examination-all-select-options.js'
import examinationOfAPatientTbl from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class examinationForPatientClass extends clientTblManage {
  static entity = 'tblExaminationOfPatient'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/examination/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblExaminationAllSelectOptions/examinationFieldOptionId
         E.g: The  tblExaminationAllSelectOptions has:
         examinationFieldOptionId  |         examinationFieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table examinationFieldOptionId = 2 */
      appearance_select: this.string(''),
      attitude_multi_select: this.string(''),
      psychomotor_select: this.string(''),
      eye_contact_multi_select: this.string(''),
      speech_multi_select: this.string(''),
      mood_affect_multi_select: this.string(''),
      thought_content_multi_select: this.string(''),
      perceptions_multi_select: this.string(''),
      thought_process_multi_select: this.string(''),
      constitutional_multi_select: this.string(''),
      cognition_multi_select: this.string(''),
      insight_multi_select: this.string(''),
      judgement_multi_select: this.string(''),
      impulse_control_multi_select: this.string(''),
      neurological_multi_select: this.string(''),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const examinationFormDef = {
  id: 'examination',
  plural: 'examination',
  singular: 'examination',
  fieldsDef: [
    {
      nameInDb: 'appearance_select',
      nameInUi: 'Appearance',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'attitude_multi_select',
      nameInUi: 'Attitude',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'psychomotor_select',
      nameInUi: 'Psychomotor',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'padding: 20px',
    },
    {
      nameInDb: 'eye_contact_multi_select',
      nameInUi: 'Eye contact',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'speech_multi_select',
      nameInUi: 'Speech',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'mood_affect_multi_select',
      nameInUi: 'Mood affect',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'thought_content_multi_select',
      nameInUi: 'Thought content',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'perceptions_multi_select',
      nameInUi: 'Perceptions',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'thought_process_multi_select',
      nameInUi: 'Thought process',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'constitutional_multi_select',
      nameInUi: 'Constitutional',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'cognition_multi_select',
      nameInUi: 'Cognition',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'insight_multi_select',
      nameInUi: 'Insight',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'judgement_multi_select',
      nameInUi: 'Judgement',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'impulse_control_multi_select',
      nameInUi: 'Impulse control',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
    {
      nameInDb: 'neurological_multi_select',
      nameInUi: 'Neurological',
      type: 'multi-select-with-buttons',
      showLabel: true,
      style: 'paddong: 20px',
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,

  maxNumberOfTemporallyValidRows: 1,
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['appearance_select', 'attitude_multi_select', 'psychomotor_select'],
  validationsObj: {
    value: {
      appearance_select: {
        minLength: minLength(1),
      },
      attitude_multi_select: {
        minLength: minLength(8),
      },
      psychomotor_select: {
        minLength: minLength(8),
      },
    },
  },

  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },

  fnGetAllSelectOptionsAndSelectedForAField: function (fieldNameInDb, pclientSideUniqRowId = 1) {
    let arOfAllSelectOptions = examinationAllSelectOptionsTbl
      .query()
      .where('ROW_END', 2147483648000)
      .where('examinationFieldNameInDb', fieldNameInDb)
      .get()

    // get the value for this field in patient table
    let row = examinationOfAPatientTbl.find(pclientSideUniqRowId)
    let selectedIDs = row[fieldNameInDb]

    arOfAllSelectOptions.forEach(function (data) {
      data['id'] = data['examinationFieldOptionId']
      data['value'] = data['examinationFieldOptionLabel']
      data['selected'] = selectedIDs.includes(data['id']) ? true : false
    })
    return arOfAllSelectOptions
  },
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = examinationAllSelectOptionsTbl
      .query()
      .where('examinationFieldNameInDb', pFieldNameInDb)
      .where('examinationFieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['examinationFieldOptionLabel']

    return optionIdToLabel
  },
}