<template>
  <main class="tail-flex">
    <article class="dash-view tail-pb-48 tail-mx-3 lg:tail-mx-0">
      <div class="main-view tail-grid tail-gap-4 tail-my-5 tail-mx-auto">
        <div
          class="tail-bg-white tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 tail-flex tail-flex-col lg:tail-flex-row tail-justify-between tail-text-black tail-order-first dog-paw"
        >
          <div>
            <h2 class="tail-capitalize tail-text-2xl tail-font-bold">
              hello, {{ $store.state.auth.getWelpUser.firstName }}!
            </h2>
            <p class="lg:tail-max-w-md tail-font-light">
              Welcome back! If you need the GetWelp Team’s help with anything,
              just pop us a message in the live chat below!
            </p>
          </div>
          <div class="tail-w-max">
            <button
              style="background: rgba(86, 204, 242, 1);"
              class="base-button"
              @click="addClient = true"
            >
              invite new client
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
                  :class="[allClientsConcise.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i class="ns-cross" />
                </p>
                <a href="#">Stripe</a>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="[allClientsConcise.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <i :class="[allClientsConcise.length ? 'ns-check' : 'ns-cross']" />
                </p>
                <a href="#">Added your first client</a>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="[allClientsConcise.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <!-- 1 -->
                  <i :class="[allClientsConcise.length ? 'ns-check' : 'ns-cross']" />
                </p>
                <a
                  href="#"
                >Calendar(s) <span class="tail-underline">Sync</span></a>
              </div>
            </li>
            <li>
              <div class="tail-flex tail-items-center">
                <p
                  :class="[allClientsConcise.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
                >
                  <!-- 2 -->
                  <i :class="[allClientsConcise.length ? 'ns-check' : 'ns-cross']" />
                </p>
                <a
                  href="#"
                >Fully connected <span class="tail-underline">Sync</span></a>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 md:tail-py-4 tail-flex tail-items-center tail-text-black tail-bg-white tail-order-2 md:tail-order-3"
        >
          <i class="ns-building tail-text-3xl tail-text-gray-500" />
          <h3 class="tail-ml-2 tail-mb-0 tail-capitalize tail-font-bold tail-text-xl">
            {{ $store.state.auth.getWelpUser.businessName }}.
          </h3>
        </div>
        <div
          class="tail-grid md:tail-grid-cols-2 tail-gap-4 tail-order-4 md:tail-mb-20"
        >
          <!-- houses clients section -->
          <div class="tail-grid tail-gap-4">
            <div>
              <h5 class="tail-font-semibold tail-mb-2">
                Clients
              </h5>
              <ClientDashboardList />
              <!-- <div class="d-flex tail-flex-wrap">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="tail-rounded-md tail-bg-white tail-p-8 tail-grid tail-justify-items-center tail-mr-4 md:tail-mb-4 tail-mb-0"
                >
                  <img
                    class="rounded-circle tail-h-14"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  />
                  <b class="text-capitalize tail-text-sm tail-mt-3">elena b</b>
                  <div class="d-flex align-items-center">
                    <i
                      class="ns-comment tail-bg-green-400 tail-p-1 rounded-circle tail-text-xs"
                    ></i>
                    <small
                      class="text-muted tail-ml-1 text-capitalize tail-text-sm"
                      >roxy</small
                    >
                  </div>
                </div>
                <div
                  class="tail-rounded-md tail-bg-white tail-p-8 tail-grid tail-justify-items-center tail-mr-4 tail-mb-4"
                >
                  <i
                    class="ns-angle-right tail-p-1 rounded-circle"
                    style="background: rgba(240, 245, 250, 1);"
                  ></i>
                  <a
                    class="text-capitalize tail-text-sm tail-mt-3 tail-text-blue-500 tail-no-underline tail-font-bold"
                    href="#"
                    >View All</a
                  >
                </div>
              </div> -->
            </div>
            <div>
              <h5 class="tail-font-semibold tail-mb-2">
                Messages
              </h5>
              <div class="tail-rounded-md tail-bg-white tail-p-6 md:tail-h-full">
                <div v-if="!showMessages" class="tail-text-center tail-h-full tail-max-w-xs tail-m-auto">
                  <div class="tail-w-full tail-my-5">
                    <img
                      class="tail-text-center tail-inline-block"
                      src="~/assets/img/low-dog.png"
                      alt=""
                      srcset=""
                    >
                  </div>
                  <h5 class="tail-font-bold">
                    No messages yet
                  </h5>
                  <p class="tail-px-5 tail-text-sm tail-mb-0">
                    Messages will appear here when you invite and onboard a new client
                  </p>
                </div>
                <template v-else>
                  <div
                    v-for="n in 3"
                    :key="n"
                    class="tail-flex tail-items-center tail-mb-4"
                  >
                    <img
                      class="tail-rounded-full tail-h-14"
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    >
                    <div class="tail-mr-auto tail-ml-2">
                      <p class="tail-mb-0 tail-capitalize">
                        rilwan lawal
                        <span
                          class="tail-text-gray-400 tail-ml-2 tail-text-xs"
                        >1:09PM</span>
                      </p>
                      <small>Hello Rosie, sending you...</small>
                    </div>
                    <button
                      class="tail-border tail-capitalize tail-py-1 tail-px-2 tail-rounded-md tail-text-black tail-text-sm hover:tail-bg-green-700"
                    >
                      View
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- end of clients section -->
          <div class="tail-h-full">
            <h5 class="tail-font-semibold tail-mb-2">
              Payment
            </h5>
            <div class="tail-bg-white tail-rounded-md tail-p-4 md:tail-h-full">
              <p class="tail-mb-0">
                This Month
              </p>
              <div class="tail-grid tail-gap-4 tail-grid-cols-2 tail-py-5">
                <div
                  class="tail-rounded tail-border-1 tail-px-4 tail-py-2"
                  style="background: rgba(240, 245, 250, 1);"
                >
                  <small class="tail-block">Due</small>
                  <h3 class="tail-mb-0 tail-font-bold">
                    ?
                  </h3>
                </div>
                <div
                  class="tail-rounded tail-border tail-px-4 tail-py-2 tail-text-gray-400"
                >
                  <small class="tail-block">Received</small>
                  <h3 class="tail-mb-0 tail-font-bold">
                    ?
                  </h3>
                </div>
              </div>
              <div
                v-if="!showPayment"
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
                <h5 class="tail-font-bold">
                  No payments yet
                </h5>
                <small class="tail-block">
                  See paid and due transactions from your clients here. For
                  GetWelp to help you with your invoicing and payments, connect
                  to your Stripe account below!
                </small>
                <button
                  style="background: rgba(86, 204, 242, 1);"
                  class="tail-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-green-700 tail-mt-5"
                  @click.prevent="showPayment = !showPayment"
                >
                  connect stripe
                </button>
              </div>
              <div v-else>
                <div
                  v-for="n in 4"
                  :key="n"
                  class="tail-flex tail-items-center tail-p-4"
                >
                  <img
                    class="tail-rounded-full tail-h-14"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  >
                  <div class="tail-ml-4 tail-mr-auto">
                    <p class="tail-capitalize tail-font-bold tail-mb-0">
                      rilwan lawal
                    </p>
                    <small class="tail-text-gray-400">10 May</small>
                  </div>
                  <p class="tail-font-bold">
                    £60
                  </p>
                </div>
                <div class="tail-w-full tail-text-center">
                  <button
                    class="tail-text-blue-500 w-100"
                    @click.prevent="showPayment = !showPayment"
                  >
                    View All
                  </button>
                </div>
              </div>
              <!-- seems to be a necessary evil as margin and paddings arent adding up -->
              <div class="tail-h-20 md:tail-hidden" />
            </div>
          </div>
        </div>
      </div>
    </article>
    <div>
      <CalendarView />
    </div>
    <Modal :is-open="addClient" @close="addClient = $event">
      <InviteNewClient @close="addClient = $event" />
    </Modal>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  middleware: 'qbInits',
  data () {
    return {
      showPayment: false,
      showMessages: false,
      addClient: false
    }
  },
  computed: {
    ...mapGetters({
      allClientsConcise: 'client/getAllClients'
    })
  },
  mounted () {
    this.fetchAllClientsConcise()
    const checkError = this.$store.getters['qb/getQbError']
    if (Object.entries(checkError).length !== 0 && checkError.constructor === Object) {
      this.$nextTick(function () {
        this.$toast.error('An error occured. Please relogin', { position: 'top-right' })
      })
    }
  },
  methods: {
    ...mapActions({
      fetchAllClientsConcise: 'client/fetchAllClientsConcise'
    })
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
    width: calc(100% - 300px);
  }

  .main-view {
    max-width: calc(100% - 100px);
  }
}
</style>
