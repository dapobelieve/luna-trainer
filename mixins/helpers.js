export default {
  computed: {
    isObjectKeysIterable (obj = this.checkObjKeys) {
      return Object.keys(obj).length && obj.constructor === Object
    },
    isObjectValuesIterable (obj = this.checkObjValues) {
      return Object.values(obj).length && obj.constructor === Object
    },
    displayComponent () {
      return this.$route.name === 'Client-id-Messages'
    }
  },
  methods: {
    flattenObject (obj, prefix = '') {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : ''
        if (typeof obj[k] === 'object') {
          Object.assign(acc, this.flattenObject(obj[k], pre + k))
        } else {
          acc[pre + k] = obj[k]
        }
        return acc
      }, {})
    }
  }
}
