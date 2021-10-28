<template>
  <div>
    <PageHeader v-if="$route.name === 'Invoices-id'">
      <template v-slot:back-button>
        <button type="button outline-none" @click="$router.go(-1)">
          <img src="~/assets/img/svgs/chevron-back-blue.svg" alt="" srcset="" />
        </button>
      </template>
      <template v-slot:buttons>
        <div class=" relative">
          <button
            type="button"
            class="bg-white inline-flex items-center text-blue-500 px-2  py-1  border-none  text-base  font-medium  rounded  shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            @click="printInvoice"
          >
            <i class="ns-print text-blue-500 text-xl pr-1.5"></i>
            Print
          </button>
        </div>
      </template>
    </PageHeader>
    <PageHeader v-else>
      <template v-slot:title>
        <span class="font-normal">Invoices</span>
      </template>
      <template v-slot:buttons>
        <div class="flex items-center">
          <ClickOutside :do="() => showDrop = false">
            <div class="relative">
              <span class="font-medium flex items-center cursor-pointer text-primary-color mr-5" @click="showDrop = !showDrop">
                <span>{{ currentInvoice }}</span>
                <i class="ns-caret-down ml-2 text-2xl"></i>
              </span>
              <div
                v-show="showDrop"
                class="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
              >
                <div class="py-1" role="none">
                  <a
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    @click.prevent="$router.push({name: 'Invoices-sent'}); showDrop=false"
                  >Sent
                  </a>
                  <a
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    @click.prevent="$router.push({name: 'Invoices-drafts'}); showDrop=false"
                  >Drafts
                  </a>
                </div>
              </div>
            </div>
          </ClickOutside>
          <NuxtLink
            :to="{ name: 'NewInvoice'}"
            exact-active-class="active"
            class="inline-flex primary-color items-center justify-center h-9 w-9 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
          >
            <i class="ns-plus text-white text-2xl"></i>
          </NuxtLink>
        </div>
      </template>
    </PageHeader>
    <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center">
      <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
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
    printInvoice () {
      window.print()
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
