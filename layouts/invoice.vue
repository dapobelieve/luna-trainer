<template>
  <div class="bg-gray-100 w-full min-h-screen">
    <div
      class="flex justify-between  lg:grid grid-cols-3 bg-white px-4 py-3 items-center border-b border-gray-200"
    >
      <span class="text-2xl to-gray-700 font-normal">
        {{ sharedPage.page }}
      </span>
      <span :class="[showAutosavingText ? 'visible' : 'invisible', 'text-xs text-gray-500 lg:justify-self-center']">
        Saving as draft...
      </span>
      <i
        role="button"
        class="fi-rr-cross text-blue-500 text-md lg:justify-self-end"
        @click.prevent="promptCancel"
      ></i>
    </div>
    <Nuxt
      class="md:m-4 lg:m-0 lg:pt-10 flex justify-center"
    />
    <v-dialog />
  </div>
</template>
<script>
export default {
  name: 'InvoiceLayout',
  provide () {
    return {
      sharedPage: this.sharedPage
    }
  },
  data () {
    return {
      showAutosavingText: false,
      sharedPage: {
        page: 'Create Payment Request'
      }
    }
  },
  created () {
    this.$nuxt.$on('autosaving-invoice', () => {
      this.showAutosavingText = true
    })
    this.$nuxt.$on('autosaving-invoice-completed', () => {
      this.showAutosavingText = false
    })
  },
  methods: {
    promptCancel () {
      this.$modal.show('dialog', {
        title: 'Confirm exit page',
        text: 'Leaving this page will discard your changes. This cannot be on done',
        buttons: [
          {
            title: 'No',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Yes, sure',
            handler: () => {
              this.$router.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
