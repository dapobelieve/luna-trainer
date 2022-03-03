<template>
  <main>
    <section class="mt-2">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-xl">
          <DashboardCard class="p-0">
            <div class="mb-5">
              <img class="w-full" src="~/assets/img/home.svg">
            </div>
            <div class="mb-6">
              <div class="flex items-center px-3 mb-10">
                <div class="flex items-center">
                  <span class="fi-rr-calendar text-purple-500 mr-3 mt-1"></span>
                  <h3 class="font-bold">
                    My Sessions
                  </h3>
                </div>
                <button class="ml-auto text-primary-color border rounded-lg px-4 py-2">
                  Upcoming
                  <i class="fi-rr-caret-down mt-1 ml-2"></i>
                </button>
              </div>
              <div class="flex px-3 items-center mb-4">
                <div class="font-medium text-sm">
                  March 2, Wednesday
                </div>
                <span class="ml-auto text-gray-500 mr-1">3 upcoming</span>
              </div>
              <div class="px-3">
                <WeekView />
              </div>
            </div>
            <div class="px-3">
              <CurrentSessionCard class="mb-4" />
              <div>
                <UpcomingSessionCard class="mb-2" />
                <UpcomingSessionCard color="blue" class="" />
              </div>
            </div>
          </DashboardCard>
        </div>
        <div class="grid gap-4">
          <dashboard-payments :paid-invoices="paidInvoices" />
          <dashboard-messages />
        </div>
      </div>
      <client>
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
      </client>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashboardCard from '~/components/dashboard/DashboardCard'
import WeekView from '~/components/dashboard/WeekView'
import CurrentSessionCard from '~/components/dashboard/CurrentSessionCard'
import UpcomingSessionCard from '~/components/dashboard/UpcomingSessionCard'
export default {
  name: 'Dashboard',
  components: { UpcomingSessionCard, CurrentSessionCard, WeekView, DashboardCard },
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
    do () {
      console.log('doing...')
    },
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

<style lang="scss" scoped>
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
