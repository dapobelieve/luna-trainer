import Vue from 'vue'

function amount(amount) {
    const amt = Number(amount)
    return (
        `${(amt && amt.toLocaleString(undefined, { maximumFractionDigits: 2 }))}.00`||
        '0.00'
    )
}
function date(date){
    return new Date(date).toDateString()
}

Vue.filter('amount', amount)
Vue.filter('date', date)