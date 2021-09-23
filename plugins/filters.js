import Vue from 'vue'

function amount (amount) {
  const currency = JSON.parse(localStorage.getItem('userPreferrences'))
  return new Intl.NumberFormat('en', { style: 'currency', currency: currency.currency }).format(amount)
}
function date (date) {
  return new Date(date).toDateString()
}

Vue.filter('amount', amount)
Vue.filter('date', date)
