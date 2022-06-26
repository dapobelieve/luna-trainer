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

function shortDate (date) {
  return format(new Date(date), 'MMM d, yyyy')
}
function howLongAgo (date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: false
  })
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

Vue.filter('amount', amount)
Vue.filter('date', date)
Vue.filter('howLongAgo', howLongAgo)
Vue.filter('shortDate', shortDate)
Vue.filter('capitalize', capitalize)
