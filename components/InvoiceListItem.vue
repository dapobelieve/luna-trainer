<template>
  <div v-if="invoice.customerId" class="rounded-lg w-full hover:bg-gray-50 flex items-center justify-between py-5 px-4">
    <div class="flex items-center">
      <div>
        <ClientAvatar :client-info="invoice.customerId" />
      </div>
      <div class="ml-4 ">
        <h6 class="text-base text-gray-700 font-medium text-capitalize">
          {{ invoice.customerId.firstName || '' }} {{ invoice.customerId.lastName }}
        </h6>
        <span class="text-sm text-gray-500">{{ invoice.customerId.email }}</span>
      </div>
    </div>
    <ClickOutside :do="() => { showDropDown = false }">
      <div class="relative">
        <span class="fi-rr-menu-dots cursor-pointer font-medium text-xl text-primary-color" @click="showDropDown = !showDropDown" v-if="!loading"></span>
        <div class="font-medium text-xl text-primary-color" v-else>
          <SingleLoader />
        </div>
        <div
          v-show="showDropDown"
          class="absolute top-[13px] right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="py-1" role="none">
            <a
              class="text-gray-700 cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100"
              @click.prevent="$router.push({
                name: 'payments-request-id',
                params: {
                  id: invoice._id
                }
              });showDropDown=false"
            >Edit
            </a>
            <a
              class="text-gray-700 cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100"
              @click.prevent="deletePrompt"
            >Delete
            </a>
          </div>
        </div>
      </div>
    </ClickOutside>
  </div>
</template>

<script>
export default {
  props: ['invoice'],
  data () {
    return {
      loading: false,
      showDropDown: false
    }
  },
  methods: {
    deletePrompt () {
      this.$modal.show('dialog', {
        title: 'Delete payment request',
        text: 'Are you sure you want to delete this payment request?',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Yes, sure',
            handler: async () => {
              this.loading = true
              this.showDropDown = false
              this.$modal.hide('dialog')
              await this.deleteInvoice()
              this.loading = false
            }
          }
        ]
      })
    },
    async deleteInvoice () {
      await this.$store.dispatch('invoice/deleteInvoice', this.invoice._id)
      this.$emit('invoice-deleted', this.invoice)
      this.$lunaToast.success('Invoice deleted successfully')
    }
  }
}
</script>

<style scoped>

</style>
