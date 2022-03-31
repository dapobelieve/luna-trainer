<template>
  <div
    v-show="showDropDown"
    class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
  >
    <div class="tail-py-1" role="none">
      <a
        class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
        @click.prevent="$router.push({name: 'payment-requests-sent'});"
      >Edit
      </a>
      <a
        class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
        @click.prevent="$router.push({name: 'payment-requests-drafts'});"
      >Delete
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {}
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>
