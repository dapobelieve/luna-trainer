<template>
  <main>
    <article>
      <div class="grid gap-4">
        <!-- dashboard intro -->
        <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div class="font-normal p-4 pt-5 flex flex-col space-y-2">
            <h1 class="capitalize text-3xl">
              hey {{ $auth.user.firstName }}!
            </h1>
            <p class="text-gray-500">
              Welcome back! If you need the GetWelp Team’s help with anything, just pop us a message in the live chat below!
            </p>
          </div>
          <dashboard-status-card />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="grid gap-4">
            <!-- client registration -->
            <dashboard-clients :accepted-clients="acceptedClients" class="h-72" />
            <!-- new messages -->
            <dashboard-messages />
          </div>

          <!-- invoices -->
          <dashboard-payments :paid-invoices="paidInvoices" />
        </div>
      </div>
    </article>

    <!-- modals -->
    <NotificationsModal :visible="true">
      <template v-slot:title>
        Stripe Connect
      </template>
      <template v-slot:subtitle>
        Account under review, please confirm all requirements have been met
        before proceeding to creating invoices.
      </template>
    </NotificationsModal>
    <NotificationsModal
      :visible="showNotification"
      @close="showNotification = $event"
    >
      <template v-slot:title>
        Chat Connection Failed
      </template>
      <template v-slot:subtitle>
        Reconnect chat to enjoy all of GetWelp's features
      </template>
      <template v-slot:actionButtons>
        <button
          class="bg-white rounded-md text-sm font-medium capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-blue-700"
          @click="retry"
        >
          retry
        </button>
      </template>
    </NotificationsModal>
    <modal name="welcome-modal">
      <div class="grid m-6">
        <div class="py-0">
          <div class="text-center mb-10 font-medium text-2xl">
            <h3>Welcome to your Getwelp Dashboard</h3>
          </div>
          <p class="text-center mb-8 w-50">
            Some information about getwelp and things that <br> can be done on the dashboard
          </p>
          <div class="flex justify-center gap-5">
            <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="tour()">
              start tour
            </button>
          </div>
        </div>
      </div>
    </modal>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashboardClients from '~/components/DashboardClients.vue'
export default {
  name: 'Dashboard',
  components: { DashboardClients },
  layout: 'dashboard',
  async asyncData ({ store }) {
    const acceptedClients = await store.dispatch('client/fetchClientsWithStatusAndLimit', {
      status: 'accepted',
      limit: 2
    })
    return { acceptedClients }
  },
  data () {
    return {
      intro: null,
      openBankModal: false,
      showNotification: false,
      paidInvoices: [],
      acceptedClients: []
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  computed: {
    ...mapGetters('profile', {
      isStripeConnected: 'isStripeConnected',
      isStripeReady: 'isStripeReady'
    }),
    ...mapGetters({
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
    sendBirdConnStatus (newValue, oldValue) {
      if (newValue || oldValue || !this.store.state.sendbirdId.sbUser) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showNotification = true
          }, 2000)
        })
      }
    }
  },
  mounted () {
    this.fetchUserProfile()
    this.fetchPaidInvoices({ status: 'paid', limit: 5 }).then((r) => { this.paidInvoices = r }).catch(e => console.error(e))

    const getTime = localStorage.getItem('dashboardFirstVisit')
    if (!getTime) {
      this.$modal.show('welcome-modal')
      localStorage.setItem('dashboardFirstVisit', Date.now())
    }

    this.fetchPaidInvoices({ status: 'paid', limit: 5 })
      .then((r) => {
        this.paidInvoices = r
      })
      .catch(e => console.error(e))
  },
  updated () {
    this.$nextTick(() => {
      if (this.sendBirdConnStatus) {
        setTimeout(() => {
          this.showNotification = true
        }, 2000)
      }
    })
  },
  methods: {
    tour () {
      this.$modal.hide('welcome-modal')
      this.$intro()
        .setOptions({
          hidePrev: true,
          steps: [
            {
              element: document.querySelector('#introjs-step-1'),
              intro: 'Click here to connect your stripe account'
            },
            {
              element: document.querySelector('#introjs-step-2'),
              intro: 'Add your first client here',
              position: 'left'
            },
            {
              element: document.querySelector('#introjs-step-3'),
              intro: 'Click here to manage all your clients',
              position: 'right'
            },
            {
              element: document.querySelector('#introjs-step-4'),
              intro: 'Click here generate new invoice for your clients',
              position: 'right'
            },
            {
              element: document.querySelector('#introjs-step-5'),
              intro: 'Here you can manages messages received  from your clients',
              position: 'right'
            }
          ]
        })
        .start()
      this.$intro().showHints()
    },
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      fetchPaidInvoices: 'invoice/fetchInvoiceWithStatusAndLimit',
      connectToSendBird: 'sendBird/connect_to_sb_server_with_userid'
    }),
    retry () {
      this.$store.commit('sendBird/CONNECTION_ERROR', false)
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$gwtoast.success('Chat connection successful')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.introjs-tooltip {
  background-color: #3B82F6;
  border-radius: 12px;
  &-header  {
    display: none;
  }
  .introjs-tooltiptext {
    color: #fff;
    padding: 16px;
    font-size: 14px;
    font-weight: 400;
  }
  .introjs-bullets {
    display: none;
  }
  .introjs-tooltipbuttons {
    border: none;
    a {
      padding: 6px 16px 6px 16px;
      color: #3B82F6;
      background: #fff;
      border: none;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 500;
      &:focus {
        box-shadow: none;
      }
    }
  }
}
</style>
