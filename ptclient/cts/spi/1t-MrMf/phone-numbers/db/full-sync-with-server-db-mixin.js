// Reference implementation
import objOrm from '~/cts/spi/1t-MrMf/phone-numbers/db/vuex-orm/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // TODO: Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proNumbersFromDB = await objOrm.api().get(objOrm.apiUrl + '/getAll')
      //   debugger
      if (proNumbersFromDB.ok) {
      }
    },
  },
}
