<template>
  <div class="min-h-full">
    <main>
      <div class="pt-4 max-w-3xl mx-auto lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <!-- left side -->
          <div class="grid grid-cols-1 lg:col-span-2 lg:min-h-full">
            <DashboardCard
              id="session-st"
              :view-all="events.length > 0"
              class="p-0"
              @action="$router.push({ name: 'schedule' })"
            >
              <div id="session-hint">
                <div class="mb-5">
                  <img class="w-full" src="~/assets/img/home.svg" />
                </div>
                <div class="mb-6">
                  <div class="flex items-center px-3 mb-5">
                    <div class="flex items-center">
                      <div
                        class="
                      h-12
                      w-12
                      rounded-full
                      bg-fuchsia-50
                      mr-4
                      flex
                      items-center
                      justify-center
                    "
                      >
                        <span
                          class="fi-rr-calendar text-fuchsia-500 text-xl"
                        ></span>
                      </div>
                      <h3 class="font-medium">
                        My Sessions
                      </h3>
                    </div>
                  </div>
                  <div class="flex px-3 items-center mb-4">
                    <div class="font-medium text-sm">
                      {{ $dateFns.format(new Date(), "MMMM d, EEEE") }}
                    </div>
                    <span
                      class="ml-auto text-gray-500 mr-1"
                    >{{ events.length }} upcoming</span>
                  </div>
                  <div class="px-3">
                    <WeekView
                      fetch-events
                      @fetching-events="fetching = true"
                      @stop-fetching-events="fetching = false"
                      @events="events = $event"
                    />
                  </div>
                </div>
              </div>
              <div class="px-3 h-[19rem]">
                <div
                  v-if="fetching"
                  class="flex items-center justify-center h-full"
                >
                  <SingleLoader height="40px" width="40px" />
                </div>
                <template v-else>
                  <div
                    v-if="!events.length"
                    class="flex items-center h-full justify-center"
                  >
                    <div class="flex flex-col items-center">
                      <i class="fi-rr-calendar text-5xl text-fuchsia-500"></i>
                      <h3 class="text-gray-700 text-lg">
                        You have no appointments.
                      </h3>
                      <small
                        class="text-base text-gray-500"
                      >Your appointments will be displayed here.</small>
                      <button class="button-fill mt-3" @click="openSession">
                        Schedule a session
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <!--                <CurrentSessionCard class="mb-4" />-->
                    <UpcomingSessionCard
                      v-for="event in events"
                      :key="event.id"
                      :event="event"
                      :color="event.color"
                      class="mb-2"
                    />
                  </div>
                </template>
              </div>
            </DashboardCard>
          </div>
          <!-- right side -->
          <div class="grid grid-cols-1 lg:col-span-2 gap-4">
            <MessageWidget id="message-hint" class="h-[23rem]" />
            <InvoiceWidget id="billing-hint" class="h-[30rem]" />
          </div>
        </div>
      </div>
    </main>

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
          class="
              bg-white
              rounded-md
              text-sm
              font-medium
              capitalize
              hover:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              text-blue-700
            "
          @click="retry"
        >
          retry
        </button>
      </template>
    </NotificationsModal>
    <DashboardWelcomeModal
      :exit-tour="
        () => {
          closeModal();
          doNotShowHints = true;
        }
      "
      :take-tour="
        () => {
          tourItems();
          closeModal();
        }
      "
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashboardCard from '~/components/dashboard/DashboardCard'
import WeekView from '~/components/dashboard/WeekView'
// import CurrentSessionCard from '~/components/dashboard/CurrentSessionCard'
import UpcomingSessionCard from '~/components/dashboard/UpcomingSessionCard'
import InvoiceWidget from '~/components/dashboard/InvoiceWidget'
import MessageWidget from '~/components/dashboard/MessageWidget'
import DashboardWelcomeModal from '~/components/modals/DashboardWelcomeModal.vue'
import { dashboardTourSteps } from '~/tour/DashboardTourSteps'
export default {
  name: 'Dashboard',
  components: {
    MessageWidget,
    InvoiceWidget,
    UpcomingSessionCard,
    WeekView,
    DashboardCard,
    DashboardWelcomeModal
  },
  layout: 'dashboard',
  async asyncData ({ store }) {
    const acceptedClients = await store.dispatch(
      'client/fetchClientsWithStatusAndLimit',
      {
        status: 'accepted',
        limit: 2
      }
    )
    return { acceptedClients }
  },
  data () {
    return {
      fetching: false,
      fetchEventsForToday: false,
      events: [],
      intro: null,
      escapeKeyPressedOnce: false,
      doNotShowHints: false,
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
    const newUser = this.$route?.query?.new
    this.fetchUserProfile()
    this.fetchPaidInvoices({ status: 'paid', limit: 5 })
      .then((r) => {
        this.paidInvoices = r
      })
      .catch(e => console.error(e))

    if (newUser) {
      window.localStorage.setItem('dashboard-tour', new Date())
      window.localStorage.setItem('session-tour', new Date())
      window.localStorage.setItem('client-tour', new Date())

      if (window.localStorage.getItem('dashboard-tour')) {
        this.$modal.show('welcome-modal')
      }
    } else if (!window.localStorage.getItem('welcome')) {
      // set date time stamp in local storage
      this.$lunaToast.show(
        'The all-in-one business software specifically designed and built for dog trainers and behaviourists. We hope you love it. Would you like to take the tour?.',
        {
          position: 'bottom-right',
          timeout: 10000,
          actions: true,
          heading: 'Welcome to Luna',
          confirm: {
            text: 'Get started',
            resolver: () => {
              this.tourItems()
            }
          },
          cancel: {
            text: 'Not Now',
            resolver: () => {
              window.localStorage.setItem('welcome', new Date())
            }
          },
          close: {
            resolver: () => {
              window.localStorage.setItem('welcome', new Date())
            }
          }
        }
      )
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
    removeQueryParams () {
      const query = Object.assign({}, this.$route.query)
      delete query.new
      this.$router.replace({ query })
      window.localStorage.removeItem('dashboard-tour')
    },
    tourItems () {
      if (this.doNotShowHints) { return }
      dashboardTourSteps(this.$intro())
        .oncomplete(() => {
          this.removeQueryParams()
        })
        .onexit(() => {
          this.removeQueryParams()
        })
        .onafterchange(() => {
        })
        .onexit(() => {
          const skip = document.getElementById('skip')
          skip.classList.add('opacity-0')
        })
        .start()

      const skip = document.getElementById('skip')
      skip.classList.remove('opacity-0')
      this.$intro().showHints()
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
      this.removeQueryParams()
    },
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      fetchPaidInvoices: 'invoice/getInvoices'
    })
  }
}
</script>

<style>
@import "../assets/css/introtheme.css";
</style>
