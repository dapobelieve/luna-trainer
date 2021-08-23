import Vue from 'vue'
import VueTelInput from 'vue-tel-input'
Vue.use(VueTelInput, { defaultCountry: 'GB', styleClasses: 'tel-input', dropdownOptions: { showDialCodeInSelection: true } })
