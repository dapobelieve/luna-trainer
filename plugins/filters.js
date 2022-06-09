import Vue from 'vue'
import { formatDistance, format } from 'date-fns'

function amount (amount, currency) {
  const vuex = JSON.parse(localStorage.getItem('vuex'))
  return new Intl.NumberFormat('en', { style: 'currency', currency: currency || vuex.profile.user.currency }).format(amount)
}
function date (date) {
  const vuex = JSON.parse(localStorage.getItem('vuex'))
  try {
    return format(new Date(date), vuex.profile.user.dateFormat)
  } catch (err) {
    return format(new Date(date), 'MMM dd, yyyy')
  }
}
function howLongAgo (date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: false
  })
}

Vue.filter('amount', amount)
Vue.filter('date', date)
Vue.filter('howLongAgo', howLongAgo)
