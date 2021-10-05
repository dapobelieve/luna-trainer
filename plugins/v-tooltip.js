import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip, {
  defaultTrigger: window.innerWidth > 768 ? 'hover focus' : 'click'
})
