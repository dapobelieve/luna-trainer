import Vue from 'vue'
import { formatDistance } from 'date-fns'

function amount (amount) {
  const currency = JSON.parse(localStorage.getItem('vuex'))
  return new Intl.NumberFormat('en', { style: 'currency', currency: currency.profile.currency }).format(amount)
}
function date (date) {
  return new Date(date).toDateString()
}
function howLongAgo (date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true
  }).substring(5)
}

Vue.filter('amount', amount)
Vue.filter('date', date)
Vue.filter('howLongAgo', howLongAgo)
