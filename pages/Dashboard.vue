<template>
  <main class="tail-flex">
    <!-- <article class="dash-view tail-pb-48 tail-mx-3 lg:tail-mx-0"> -->
    <article class="dash-view tail-mx-3 lg:tail-mx-0">
      <div class="main-view tail-grid tail-gap-4 tail-my-5 tail-mx-auto">
        <div
          class="tail-bg-white tail-rounded-md tail-w-full tail-p-5 tail-shadow-2xl md:tail-p-8 tail-flex tail-flex-col lg:tail-flex-row tail-justify-between tail-text-black tail-order-first dog-paw"
        >
          <div>
            <h2 class="tail-capitalize tail-text-2xl tail-font-medium">
              hello, {{ $store.state.authorize.getWelpUser.firstName }}!
            </h2>
            <p class="lg:tail-max-w-3xl tail-font-normal">
              Welcome back! If you need the GetWelp Team’s help with anything,
              just pop us a message in the live chat below!
            </p>
          </div>
          <div class="tail-w-max">
            <button
              type="button"
              class="base-button tail-gap-2"
              @click="openModal = true"
            >
              <span class="tail-hidden sm:tail-block">New client</span>
            </button>
          </div>
        </div>
        <div
          style="background: #4F638C;"
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 tail-grid tail-text-white tail-order-3 md:tail-order-2"
        >
          <p class="tail-mb-4">
            Get the best out of GetWelp by connecting your calendars and Zoom,
            Stripe, and onboard your clients!
          </p>
          <ul class="tail-inline-block tail-list-none tail-m-0 tail-p-0">
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="[$store.state.authorize.isStripeConnected ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i v-if="$store.state.authorize.isStripeConnected" class="ns-check"></i>
                  <i v-else class="ns-cross" />
                </p>
                <p
                  v-if="!true"
                  :class="['tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i class="ns-cross" />
                </p>
                <a href="#">Stripe</a>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <SingleLoader v-if="$store.state.client.loadingForAllClients" class="tail-mr-2" />
                <template v-else>
                  <p
                    :class="[allClientsConcise.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                  >
                    <i v-if="allClientsConcise.length" class="ns-check" />
                    <i v-else class="ns-cross" />
                  </p>
                </template>
                <p v-if="allClientsConcise.length">
                  Added your first client
                </p>
                <button v-else @click.prevent="openModal = true">
                  Add your first client
                </button>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="['tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i class="ns-cross" />
                </p>
                <p>Calendar(s) <span class="tail-underline">Sync</span></p>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="['tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i class="ns-cross" />
                </p>
                <p>Fully connected <span class="tail-underline">Sync</span></p>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 md:tail-py-4 tail-flex tail-items-center tail-text-black tail-bg-white tail-order-2 md:tail-order-3"
        >
          <i class="ns-building tail-text-3xl tail-text-gray-500" />
          <h3 class="tail-ml-2 tail-mb-0 tail-capitalize tail-font-medium tail-text-xl">
            {{ $store.state.authorize.getWelpUser.businessName }}.
          </h3>
        </div>
        <div class="tail-grid md:tail-grid-cols-2 tail-gap-4 tail-order-4 md:tail-mb-20">
          <!-- houses clients section -->
          <div class="tail-grid tail-gap-4">
            <div>
              <h5 class="tail-font-medium tail-mb-2">
                Clients
              </h5>
              <div class="tail-grid tail-grid-cols-3 tail-gap-4">
                <!-- when clients are <= 5 but not equal to zero-->
                <template v-if="acceptedClients.length <= 5 && acceptedClients.length !== 0">
                  <div
                    v-for="client in acceptedClients"
                    :key="client.index"
                    class="tail-rounded-md tail-bg-white tail-py-4 tail-grid tail-justify-items-center tail-mb-0 tail-cursor-pointer"
                    @click="openClientModal = true"
                  >
                    <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" :width="4" :height="4" />
                    <b class="tail-capitalize tail-text-sm tail-mt-3">{{ client.firstName }}</b>
                    <div class="tail-flex tail-items-center">
                      <img
                        class="tail-bg-green-400 tail-p-1 tail-rounded-full"
                        src="~/assets/img/dog-paw.svg"
                        alt="dog paw"
                      />
                      <small
                        class="tail-text-gray-500 tail-ml-1 tail-capitalize tail-text-sm"
                      >{{ client.pet[0].name }}</small>
                    </div>
                  </div>
                  <div
                    class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
                  >
                    <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
                      <i
                        class="ns-plus tail-text-2xl"
                      ></i>
                    </div>

                    <div>
                      <button
                        class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
                        @click="openModal = true"
                      >
                        Invite Client
                      </button>
                    </div>
                  </div>
                </template>
                <!-- when clients are 0 -->
                <template v-else-if="!acceptedClients.length">
                  <button
                    type="button"
                    class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
                    @click="openModal = true"
                  >
                    <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
                      <i
                        class="ns-plus tail-text-2xl"
                      ></i>
                    </div>

                    <div>
                      <div
                        class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
                      >
                        Invite clients
                      </div>
                    </div>
                  </button>
                  <div
                    v-for="n in 2"
                    :key="n"
                    class="tail-rounded-lg tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center tail-h-40 gw-bg-color"
                  >
                  </div>
                </template>
                <!-- when clients are >= 5 -->
                <template v-else-if="acceptedClients.length >= 5">
                  <div
                    v-for="client in acceptedClients.slice(0,2)"
                    :key="client.index"
                    class="tail-rounded-md tail-bg-white tail-py-4 tail-grid tail-justify-items-center tail-mb-0 tail-cursor-pointer"
                    @click="openClientModal = true"
                  >
                    <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" :width="4" :height="4" />
                    <b class="tail-capitalize tail-text-sm tail-mt-3">{{ client.firstName }}</b>
                    <div class="tail-flex tail-items-center">
                      <img
                        class="tail-bg-green-400 tail-p-1 tail-rounded-full"
                        src="~/assets/img/dog-paw.svg"
                        alt="dog paw"
                      />
                      <small
                        class="tail-text-gray-500 tail-ml-1 tail-capitalize tail-text-sm"
                      >{{ client.pet[0].name }}</small>
                    </div>
                  </div>
                  <div
                    class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
                  >
                    <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
                      <i
                        class="ns-angle-right tail-text-2xl"
                      ></i>
                    </div>

                    <div>
                      <NuxtLink
                        :to="{ name: 'Clients' }"
                        class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
                      >
                        View All
                      </NuxtLink>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div>
              <h5 class="tail-font-medium tail-mb-2">
                Messages
              </h5>
              <div class="tail-rounded-md tail-bg-white tail-p-4 md:tail-h-full">
                <div v-if="!getTotalUnreadMessages.length" class="tail-text-center tail-h-full tail-max-w-xs tail-m-auto">
                  <div class="tail-w-full tail-my-5">
                    <img
                      class="tail-text-center tail-inline-block"
                      src="~/assets/img/low-dog.png"
                      alt=""
                      srcset=""
                    >
                  </div>
                  <h5 class="tail-font-medium">
                    No messages
                  </h5>
                  <p class="tail-px-5 tail-text-sm tail-mb-0">
                    New messages will appear here when you invite and onboard a new client.
                  </p>
                </div>
                <template v-else>
                  <ul>
                    <li
                      v-for="messages in getTotalUnreadMessages"
                      :key="messages._id"
                      class="tail-w-full"
                    >
                      <div class="tail-relative tail-px-0 tail-py-2 tail-flex tail-items-center tail-space-x-3 hover:tail-bg-gray-50 focus-within:tail-ring-2 focus-within:tail-ring-inset">
                        <div class="tail-flex-shrink-0">
                          <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div class="tail-flex-1 tail-min-w-0 tail-mr-auto">
                          <div class="focus:tail-outline-none">
                            <p class="tail-text-sm tail-font-medium tail-text-gray-900">
                              {{ messages.opponentFirstName }} {{ messages.opponentLastName }}
                              <span class="tail-ml-2 tail-text-xs tail-text-gray-400">
                                {{ formatDistance(new Date(messages.created_at), new Date(), { addSuffix: true }) }}
                              </span>
                            </p>
                            <p class="tail-text-sm tail-text-gray-500">
                              {{ messages.body ? messages.body : messages.last_message }}
                            </p>
                          </div>
                        </div>
                        <!-- <button
                          class="tail-border tail-capitalize tail-py-1 tail-px-2 tail-rounded-md tail-text-black tail-text-sm"
                          @click="$router.push({
                            name: 'Clients-id-Messages',
                            params: {
                              id: messages.occupants[1][messages.occupants_ids[1]]._id
                            }
                          })"
                        >
                          View
                        </button> -->
                      </div>
                    </li>
                  </ul>
                </template>
              </div>
            </div>
          </div>
          <!-- end of clients section -->
          <div class="tail-h-full">
            <h5 class="tail-font-medium tail-mb-2">
              Payment
            </h5>
            <div class="tail-bg-white tail-rounded-md tail-p-4 md:tail-h-full">
              <p class="tail-mb-0 tail-capitalize tail-font-medium">
                For {{ getMonth }}.
              </p>
              <div class="tail-grid tail-gap-4 tail-grid-cols-2 tail-py-5">
                <div
                  class="tail-rounded-md tail-border tail-border-gray-300 tail-border-1 tail-px-4 tail-py-2"
                  style="background: rgba(240, 245, 250, 1);"
                >
                  <small class="tail-block">Due</small>
                  <h3 class="tail-mb-0 tail-font-medium">
                    £{{ totalOfOwedInvoice }}
                  </h3>
                </div>
                <div
                  class="tail-rounded-md tail-border tail-px-4 tail-py-2 tail-text-gray-400 tail-border-gray-300"
                >
                  <small class="tail-block">Received</small>
                  <h3 class="tail-mb-0 tail-font-medium">
                    £{{ totalOfPaidInvoice }}
                  </h3>
                </div>
              </div>
              <!-- TODO:: figure a better way for the v-if below -->
              <div
                v-if="!allInvoices.length"
                class="tail-mt-5 tail-max-w-xs tail-text-center tail-mx-auto tail-center"
              >
                <div class="tail-w-full tail-my-5">
                  <img
                    class="tail-text-center tail-inline-block"
                    src="~/assets/img/low-dog.png"
                    alt=""
                    srcset=""
                  >
                </div>
                <h5 class="tail-font-medium">
                  No payments
                </h5>
                <small class="tail-block">
                  See paid and due transactions from your clients here. For
                  GetWelp to help you with your invoicing and payments, connect
                  to your Stripe account below!
                </small>
                <button
                  v-if="!$store.state.authorize.isStripeConnected"
                  style="width: fit-content"
                  class="base-button tail-mt-5"
                  @click.prevent="stripeConnect"
                >
                  <SingleLoader v-if="isStripeLoading" class="tail-mr-2" />
                  {{ isStripeLoading ? 'connecting to stripe...' : 'connect stripe' }}
                </button>
                <button
                  v-else
                  disabled
                  style="width: fit-content"
                  class="base-button tail-mt-5 tail-bg-green-400"
                >
                  Stripe is connected
                </button>
              </div>
              <div v-else>
                <div
                  v-for="invoice in allInvoices.slice(0, 3)"
                  :key="invoice.index"
                  class="tail-flex tail-items-center tail-p-4"
                >
                  <ClientAvatar :firstname="invoice.customerId.firstName" :lastname="invoice.customerId.lastName" />
                  <div class="tail-ml-4 tail-mr-auto">
                    <p class="tail-capitalize tail-font-medium tail-mb-0">
                      {{ invoice.customerId.firstName }} {{ invoice.customerId.lastName }}
                    </p>
                    <small class="tail-text-gray-400">{{invoice.dueDate}}</small>
                  </div>
                  <p class="tail-font-medium">
                    £ {{ invoice.total }}
                  </p>
                </div>
              </div>
              <!-- seems to be a necessary evil as margin and paddings arent adding up -->
              <!-- <div class="tail-h-20 md:tail-hidden"></div> -->
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- <div>
      <CalendarView />
    </div> -->
    <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal>
    <Modal :is-open="openBankModal" @close="openBankModal = $event">
      <BankAccountDetails />
    </Modal>
    <Modal v-for="client in acceptedClients" :key="client.index" :status="client.status" :is-open="openClientModal" @close="openClientModal = $event">
      <ClientInfoPreview :client="client" />
    </Modal>
  </main>
</template>

<script>
import { formatDistance } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  layout: 'dashboardLayout',
  middleware: ['qbInits'],
  data () {
    return {
      formatDistance,
      showPayment: false,
      addClient: false,
      isModalVisible: false,
      isStripeLoading: false,
      openModal: false,
      openBankModal: false,
      openClientModal: false
    }
  },
  mounted() {
    this.fetchUserProfile();
  },
  computed: {
    ...mapGetters({
      allClientsConcise: 'client/getAllClients',
      getTotalUnreadMessages: 'qb/getTotalUnreadMessages',
      allInvoices: 'invoice/getAllDraftInvoices',
      acceptedClients: 'client/getAllAcceptedClients'
    }),
    getMonth () {
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
      const thisMonth = new Date().getMonth()
      return monthNames[thisMonth] + ', ' + new Date().getFullYear()
    },
    totalOfOwedInvoice () {
      if (this.allInvoices.length) {
        return this.allInvoices.filter(invoice => invoice.status === 'draft').reduce(
          (accumulator, current) => accumulator + current.total, 0
        )
      }
      return 0
    },
    totalOfPaidInvoice () {
      if (this.allInvoices.length) {
        return this.allInvoices.filter(invoice => invoice.status === 'paid').reduce(
          (accumulator, current) => accumulator + current.total, 0
        )
      }
      return 0
    }
  },
  mounted () {
    this.fetchAllClientsConcise()
    this.fetchAllInvoices()
    this.fetchAcceptedClients()
  },
  updated () {
    if (!this.$store.state.authorize.isStripeConnected && !this.$store.state.payment.isBankLinked && this.$route.query.stripe === 'connected') {
      this.fetchUserProfile() // to set value of stripe in profile
      this.openBankModal = true
    }
  },
  methods: {
    ...mapActions({
      fetchAllClientsConcise: 'client/fetchAllClientsConcise',
      fetchAllInvoices: 'invoice/getInvoices',
      fetchAcceptedClients: 'client/fetchAllAcceptedClients',
      connectToStripe: 'invoice/stripeConnect',
      fetchUserProfile: 'authorize/getUserProfile'
    }),
    stripeConnect () {
      this.isStripeLoading = true
      return this.connectToStripe().then((response) => {
        window.location.href = response
      }).finally(() => {
        this.isStripeLoading = false
      })
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dog-paw {
  background-image: url("~/assets/img/dog-paw.svg");
  background-repeat: no-repeat;
  background-position: right bottom;
}
@media only screen and (max-width: 768px) {
  .calendar {
    display: none;
  }
  ul {
    li {
      display: block;
    }
  }
}

@media only screen and (min-width: 769px) {
  ul {
    li {
      display: inline-block;
      margin-right: 1em;
    }
  }
  .dash-view {
    width: 100%;
    // width: calc(100% - 300px);
  }

  .main-view {
    // max-width: calc(100% - 100px);
  }
}
</style>
