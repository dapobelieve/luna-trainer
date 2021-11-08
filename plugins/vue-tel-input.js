import Vue from 'vue'
import VueTelInput from 'vue-tel-input'
Vue.use(VueTelInput, { defaultCountry: 'GB', validCharactersOnly: true, dropdownOptions: { showDialCodeInSelection: true } })
