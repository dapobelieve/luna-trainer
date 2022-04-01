<template>
  <main>
    <section class="mt-2">
      <div class="grid gap-4 md:grid-cols-2">
        <DashboardCard :view-all="events.length > 0" class="p-0">
          <div class="mb-5">
            <img class="w-full" src="~/assets/img/home.svg">
          </div>
          <div class="mb-6">
            <div class="flex items-center px-3 mb-5">
              <div class="h-12 w-12 rounded-full bg-fuchsia-50 mr-4 flex items-center justify-center">
                <span class="fi-rr-calendar text-fuchsia-500 text-xl"></span>
              </div>
              <h3 class="font-medium">
                My Sessions
              </h3>
              <span class="ml-auto text-gray-500 mr-1">{{ events.length }} upcoming</span>
            </div>
            <div class="flex px-3 items-center mb-4">
              <div class="font-medium text-sm">
                {{ $dateFns.format(new Date(), 'MMMM d, EEEE') }}
              </div>
            </div>
            <div class="px-3">
              <WeekView fetch-events @fetching-events="fetching=true" @stop-fetching-events="fetching=false" @events="events = $event" />
            </div>
          </div>
          <div class="px-3 h-[19rem]">
            <div v-if="fetching" class="flex items-center justify-center h-full">
              <SingleLoader height="40px" width="40px" />
            </div>
            <template v-else>
              <div v-if="!events.length" class="flex items-center h-full justify-center">
                <div class="flex flex-col items-center">
                  <i class="fi-rr-calendar text-5xl text-fuchsia-500"></i>
                  <h3 class="text-gray-700 text-lg">
                    You have no appointment
                  </h3>
                  <small class="text-base text-gray-500">Your appointments would be displayed here</small>
                  <button class="button-fill mt-3" @click="openSession">
                    Schedule a session
                  </button>
                </div>
              </div>
              <div v-else>
                <!--                <CurrentSessionCard class="mb-4" />-->
                <UpcomingSessionCard v-for="event in events" :key="event.id" :event="event" :color="event.color" class="mb-2" />
              </div>
            </template>
          </div>
        </DashboardCard>
        <div class="grid gap-4">
          <MessageWidget class="h-[20rem]" />
          <InvoiceWidget class="h-[31rem]" />
        </div>
      </div>
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
              <h3>Welcome to Luna</h3>
            </div>
            <p class="text-center mb-8 w-50">
              Start the tour to discover how easy it is to do everything in Luna
              - with tips and tricks on how to save yourself time on basic
              business admin, so you can focus on doing what you love.
            </p>
            <div class="flex justify-center gap-5">
              <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="tour()">
                Start the tour
              </button>
            </div>
          </div>
        </div>
      </modal>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashboardCard from '~/components/dashboard/DashboardCard'
import WeekView from '~/components/dashboard/WeekView'
// import CurrentSessionCard from '~/components/dashboard/CurrentSessionCard'
import UpcomingSessionCard from '~/components/dashboard/UpcomingSessionCard'
import InvoiceWidget from '~/components/dashboard/InvoiceWidget'
import MessageWidget from '~/components/dashboard/MessageWidget'
export default {
  name: 'Dashboard',
  components: { MessageWidget, InvoiceWidget, UpcomingSessionCard, WeekView, DashboardCard },
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
      fetching: false,
      fetchEventsForToday: false,
      events: [],
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
    this.$lunaToast.show(
      `Hey, ${this.$auth.user.firstName}
                    ${this.$auth.user.lastName}! We are glad to have you on our platform. We have built an all-in-one platform that’s solving all your dog training problems.`, {
        position: 'bottom-right',
        actions: true,
        confirm: {
          text: 'Got it',
          resolver: async () => {
          }
        },
        cancel: {
          text: 'Not Now',
          resolver: async () => {}
        }
      })
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
      this.fetchEventsForToday = true
      if (this.sendBirdConnStatus) {
        setTimeout(() => {
          this.showNotification = true
        }, 2000)
      }
    })
  },
  methods: {
    openSession () {
      this.$store.commit('scheduler/setStates', {
        drawer: { open: true, activePage: 'new-session' }
      })
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
      connectToSendBird: 'sendBird/connectToSBWithUserid'
    }),
    retry () {
      this.$store.commit('sendBird/CONNECTION_ERROR', false)
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$lunaToast.success('Chat connection successful')
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
