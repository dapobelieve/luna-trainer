<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <span class="tail-font-normal">Invoices</span>
      </template>
      <template v-slot:buttons>
        <div class="tail-flex tail-items-center">
          <ClickOutside :do="() => showDrop = false">
            <div class="tail-relative">
            <span @click="showDrop = !showDrop" class="tail-font-medium tail-flex tail-items-center tail-cursor-pointer text-primary-color tail-mr-5">
              <span>{{ currentInvoice }}</span>
              <i class="ns-caret-down tail-ml-2 tail-text-2xl"></i>
            </span>
              <div
                v-show="showDrop"
                class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
              >
                <div class="tail-py-1" role="none">
                  <a
                    class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                    @click.prevent="$router.push({name: 'Invoices-sent'}); showDrop=false">Sent
                  </a>
                  <a
                    class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                    @click.prevent="$router.push({name: 'Invoices-drafts'}); showDrop=false">Drafts
                  </a>
                </div>
              </div>
            </div>
          </ClickOutside>
          <NuxtLink
            :to="{ name: 'NewInvoice'}"
            exact-active-class="active"
            class="tail-inline-flex primary-color tail-items-center tail-justify-center tail-h-9 tail-w-9 tail-text-sm tail-font-medium tail-rounded-lg tail-shadow-sm hover:tail-bg-blue-500 focus:tail-outline-none "
          >
            <i class="ns-plus tail-text-white tail-text-2xl"></i>
          </NuxtLink>
        </div>
      </template>
    </PageHeader>
    <div class="tail-w-full tail-p-4 tail-pb-24 tail-bg-gray-100 tail-flex tail-justify-center">
      <div class="tail-max-w-xl md:tail-max-w-4xl 2xl:tail-max-w-7xl lg:tail-max-w-full tail-w-full">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Invoices',
  data () {
    return {
      showDrop: false,
      img: 'https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg',
      active: true,
      openModal: false,
      showNotification: false,
      filter: 'All',
      trash: false,
      deleteClient: false,
      tempTrashId: null
    }
  },
  head () {
    return {
      title: 'Invoices'
    }
  },
  computed: {
    currentInvoice () {
      return `${this.$route.name.split('-')[1].charAt(0).toUpperCase()}${this.$route.name.split('-')[1].slice(1)}`
    },
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      size: 'invoice/invoiceCount'
    })
  },
  methods: {
    ...mapActions({
      deleteInvoices: 'invoice/deleteInvoice',
      getInvoices: 'invoice/getInvoices'
    }),
    deleteIcon (e) {
      this.trash = !this.trash
      this.tempTrashId = e
    },
    deleteInvoice () {
      this.deleteClient = true
    },
    inviteClient () {
      this.$modal.show('inviteClientModal')
    },
    deleteClientData () {
      return this.deleteInvoices(this.tempTrashId)
        .then((response) => {
          if (response.status === 'success') {
            this.$toast.success('Invoice deleted successfully', {
              position: 'bottom-right'
            })
            this.getInvoices()
            this.deleteClient = false
            this.trash = false
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        })
    },
    filterInvoice (link) {
      this.filter = link
    },
    createInvoice () {
      if (!this.acceptedClients.length || !this.$auth.user.services.length) {
        this.showNotification = true
      } else {
        this.openModal = true
      }
    }
  }
}
</script>
