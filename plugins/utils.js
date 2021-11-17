export default (context, inject) => {
  inject('utils', {
    isEmpty (value) {
      return !value || ['Undefined', 'null', 'None', 'NULL', 'NONE', 'undefined'].includes(value)
    },
    optional (value) {
      return !['Undefined', 'null', 'None', 'NULL', 'NONE', 'undefined', null, undefined].includes(value) && value || ''
    }
  })
}
