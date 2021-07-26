import Vue from 'vue'

function amount(amount) {
    return new Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(amount);     
}
function date(date){
    return new Date(date).toDateString()
}

Vue.filter('amount', amount)
Vue.filter('date', date)