export default {
  computed: {
    isObjectKeysIterable (obj = this.checkObjKeys) {
      return Object.keys(obj).length && obj.constructor === Object
    },
    isObjectValuesIterable (obj = this.checkObjValues) {
      return Object.values(obj).length && obj.constructor === Object
    }
  }
}
