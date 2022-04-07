<template>
  <main>
    <section class="mt-2">
      <div class="grid gap-4 md:grid-cols-2">
        <DashboardCard :view-all="events.length > 0" class="p-0" id="session-st">
          <div id="session-hint">
            <div class="mb-5">
              <img class="w-full" src="~/assets/img/home.svg">
            </div>
            <div class="mb-6">
              <div class="flex items-center px-3 mb-5">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-fuchsia-50 mr-4 flex items-center justify-center">
                    <span class="fi-rr-calendar text-fuchsia-500 text-xl"></span>
                  </div>
                  <h3 class="font-medium">
                    My Sessions
                  </h3>
                </div>
              </div>
              <div class="flex px-3 items-center mb-4">
                <div class="font-medium text-sm">
                  {{ $dateFns.format(new Date(), 'MMMM d, EEEE') }}
                </div>
                <span class="ml-auto text-gray-500 mr-1">{{ events.length }} upcoming</span>
              </div>
              <div class="px-3">
                <WeekView fetch-events @fetching-events="fetching=true" @stop-fetching-events="fetching=false" @events="events = $event" />
              </div>
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
          <MessageWidget class="h-[20rem]" id="message-hint" />
          <InvoiceWidget class="h-[31rem]" id="billing-hint" />
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
      <modal name="welcome-modal" :height="500">
        <div>
          <div class="space"/>
          <div class="grid m-6">
            <div class="py-0 text-justify">
              <div class="text-left mb-5 font-light text-2xl">
                <h3>Welcome to Luna</h3>
              </div>
              <p class="mb-8 w-50 text-justify">
                Start the tour to discover how easy it is to do everything in Luna with -
                tips and tricks on how to save yourself time on basic
                business admin, so you can focus on doing what you love.
              </p>
              <div class="flex justify-left gap-5">
                 <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="() => {
                   closeModal()
                   this.doNotShowHints = true
                   }">
                   Explore by myself
                </button>
                <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="() => {
                   this.tourItems();
                  closeModal()
                  }">
                  Start the tour
                </button>
              </div>
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
    const newUser = (this.$route?.query?.new)
    this.fetchUserProfile()
    this.fetchPaidInvoices({ status: 'paid', limit: 5 }).then((r) => { this.paidInvoices = r }).catch(e => console.error(e))

    if (newUser) {
      this.$modal.show('welcome-modal')
    } else {
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
            resolver: async () => {}
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
    removeQueryParams() {
      let query = Object.assign({}, this.$route.query);
      delete query.new;
      this.$router.replace({ query });
    },
    tourItems () {
      if (this.doNotShowHints) return
    
      const self = this;
      this.$intro()
        .setOptions({
          ...{
            nextLabel: 'Next',
            prevLabel: 'Back',
            skipLabel: '',
            doneLabel: 'End tour',
            hidePrev: true,
            hideNext: false,
            nextToDone: true,
            tooltipPosition: 'bottom',
            tooltipClass: '',
            highlightClass: '',
            exitOnEsc: true,
            exitOnOverlayClick: true,
            showStepNumbers: false,
            keyboardNavigation: true,
            showButtons: true,
            showBullets: true,
            showProgress: false,
            scrollToElement: true,
            scrollTo: 'element',
            scrollPadding: 30,
            overlayOpacity: 0.5,
            autoPosition: true,
            positionPrecedence: ['bottom', 'top', 'right', 'left'],
            disableInteraction: false,
            helperElementPadding: 0,
            hintPosition: 'top-middle',
            hintAnimation: true,
            buttonClass: 'bg-white rounded px-6 py-1 text-blue-500',
            progressBarAdditionalClass: false
          },
          steps: [
            {
              element: document.querySelector('#new-action'),
              intro: 'If you quickly want to add a new client, create a new payment request, or schedule a new session, you can do that in one click here.'
            },
            {
              element: document.querySelector('#home-nav'),
              intro: 'This is your home dashboard. You can see everything you need to action from here.'
            },
            {
              element: document.querySelector('#home-nav'),
              intro: 'Within your left navigation menu, you can easily jump into any of your main pages. '
            },
            {
              element: document.querySelector('#session-st'),
              intro: 'From here you can see all your sessions for the day - schedule a new session, or click view all to jump into your full schedule. '
            },
            {
              element: document.querySelector('#message-hint'),
              intro: 'Here you will see all unread messages. Just click on an any message to jump into your clients profile to reply and see any relevant notes. '
            },
            {
              element: document.querySelector('#billing-hint'),
              intro: 'Here within payments, you can see all notifications on outstanding or recieved payments. You can quickly send a nudge to your clients to remind them to pay you. '
            },
            {
              element: document.querySelector('#settings-hint'),
              intro: 'And finally, if you want to make any changes to your settings, connect new payment platform, change bank details, update your trainer profile, connect a new calender, change your password - you can do that here. '
            },
            {
              element: document.querySelector('#reporting-hint'),
              intro: 'Within reporting you can see a simple overview of how your business is performing.'
            }
          ]
        })
        .oncomplete(function () {
          self.removeQueryParams()
        })
        .onexit(function () {
          self.removeQueryParams()
        })
        .start()

      this.$intro().showHints()
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
    },
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      fetchPaidInvoices: 'invoice/getInvoices',
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
<style>
.vm--overlay{
  background: rgba(241, 245, 249, 0.4);
}
.introjs-bullets{
  text-align: left;
  padding-left: 10px;
}
.introjs-bullets ul li a {
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.05);
  background: rgba(255,255,255,0.5);
}
.introjs-arrow.top {
    border-bottom-color: #3B82F6;
}
.introjs-arrow.bottom {
    border-top-color: #3B82F6;
}
.introjs-arrow.left {
    border-right-color: #3B82F6;
}
.introjs-arrow.right {
    border-bottom-color: #3B82F6;
}
.introjs-tooltip-title,
.introjs-tooltip,.introjs-floating,
introjs-tooltipbuttons,.introjs-tooltiptext,
.introjs-skipbutton,.introjs-tooltip-header,.introjs-tooltipbuttons{
  background: #3B82F6;
  border-top: 0px;
  color: #FFF;
}
.introjs-bullets li > a.active {
    width: 6px;
    background: #FFF;
}
.introjs-bullets ul li a.active {
    width: 6px;
    background: #FFF;
}
</style>
<style lang="scss" scoped>
.space{
  width: 100%;
  height: 250px;
  background: rgba(59, 130, 246, 0.05);
}
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
