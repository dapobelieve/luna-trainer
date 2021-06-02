<template>
  <main class="d-flex">
    <article class="dash-view tail-pb-48 tail-mx-3 lg:tail-mx-0">
      <div class="main-view tail-grid tail-gap-4 tail-my-5 tail-mx-auto">
        <div
          style="background-color: #172942;"
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 d-flex tail-flex-col lg:tail-flex-row justify-content-between tail-text-white tail-order-first dog-paw"
        >
          <div>
            <h3 class="text-capitalize tail-font-bold">
              hello, rosie!
            </h3>
            <p class="lg:tail-max-w-md">
              Welcome back! If you need the GetWelp Team’s help with anything,
              just pop us a message in the live chat below!
            </p>
          </div>
          <div>
            <button
              style="background: rgba(86, 204, 242, 1);"
              class="text-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-green-700"
            >
              invite new client
            </button>
          </div>
        </div>
        <div
          style="background: #4F638C;"
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 d-flex justify-content-between tail-text-white order-3 md:tail-order-2"
        >
          <p class="">
            Get the best out of GetWelp by connecting your calendars and Zoom,
            Stripe, and onboard your clients!
          </p>
        </div>
        <div
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 md:tail-py-4 d-flex align-items-center tail-text-black tail-bg-white tail-order-2 md:tail-order-3"
        >
          <i class="ns-building tail-text-3xl tail-text-gray-500"></i>
          <h3 class="tail-ml-2 mb-0">
            Pawfect Dog Training
          </h3>
        </div>
        <div
          class="tail-grid md:tail-grid-cols-2 tail-gap-4 tail-order-4 md:tail-mb-20"
        >
          <!-- houses clients section -->
          <div class="tail-grid tail-gap-4">
            <div>
              <h5>Clients</h5>
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
              <h5>Messages</h5>
              <div class="tail-rounded-md tail-bg-white tail-p-6">
                <div
                  class="d-flex align-items-center tail-mb-4"
                  v-for="n in 3"
                  :key="n"
                >
                  <img
                    class="rounded-circle tail-h-14"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  />
                  <div class="tail-mr-auto tail-ml-2">
                    <p class="mb-0 text-capitalize">
                      rilwan lawal
                      <span class="text-muted tail-ml-2">1:09PM</span>
                    </p>
                    <small>Hello Rosie, sending you...</small>
                  </div>
                  <button
                    class="border text-capitalize tail-py-1 tail-px-2 tail-rounded-md tail-text-black tail-text-sm hover:tail-bg-green-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end of clients section -->
          <div class="tail-h-full">
            <h5>Payment</h5>
            <div class="tail-bg-white tail-rounded-md tail-p-4 tail-h-full">
              <p class="mb-0">
                This Month
              </p>
              <div class="tail-grid tail-gap-4 tail-grid-cols-2 tail-py-5">
                <div
                  class="rounded border tail-px-4 tail-py-2"
                  style="background: rgba(240, 245, 250, 1);"
                >
                  <small class="d-block">Due</small>
                  <h3 class="mb-0 tail-font-bold">
                    £480
                  </h3>
                </div>
                <div class="rounded border tail-px-4 tail-py-2 text-muted">
                  <small class="d-block">Received</small>
                  <h3 class="mb-0 tail-font-bold">
                    £1,840
                  </h3>
                </div>
              </div>
              <div
                v-if="!showPayment"
                class="tail-mt-5 tail-max-w-xs tail-mx-auto text-center"
              >
                <h5 class="tail-font-bold">
                  No payments yet
                </h5>
                <small class="d-block">
                  See paid and due transactions from your clients here. For
                  GetWelp to help you with your invoicing and payments, connect
                  to your Stripe account below!
                </small>
                <button
                  style="background: rgba(86, 204, 242, 1);"
                  class="text-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-green-700 tail-mt-5"
                  @click.prevent="showPayment = !showPayment"
                >
                  connect stripe
                </button>
              </div>
              <div v-else>
                <div
                  class="d-flex align-items-center tail-p-4"
                  v-for="n in 4"
                  :key="n"
                >
                  <img
                    class="rounded-circle tail-h-14"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  />
                  <div class="tail-ml-4 tail-mr-auto">
                    <p class="text-capitalize tail-font-bold mb-0">
                      rilwan lawal
                    </p>
                    <small class="text-muted">10 May</small>
                  </div>
                  <p class="tail-font-bold">
                    £60
                  </p>
                </div>
                <div>
                  <button
                    @click.prevent="showPayment = !showPayment"
                    class="tail-text-blue-500 w-100"
                  >
                    View All
                  </button>
                </div>
              </div>
              <!-- seems to be a necessary evil as margin and paddings arent adding up -->
              <div class="tail-h-20 md:tail-hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <CalendarView />
  </main>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      showPayment: false
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
}

@media only screen and (min-width: 769px) {
  .dash-view {
    width: calc(100% - 300px);
  }

  .main-view {
    max-width: calc(100% - 100px);
  }
}
</style>
