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
              hello, {{ $auth.user.firstName }}!
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
        <!-- Overall app status -->
        <DbStatusCard />
        <div
          class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 md:tail-py-4 tail-flex tail-items-center tail-text-black tail-bg-white tail-order-2 md:tail-order-3"
        >
          <i class="ns-building tail-text-3xl tail-text-gray-500" />
          <h3 class="tail-ml-2 tail-mb-0 tail-capitalize tail-font-medium tail-text-xl">
            {{ $auth.user.businessName }}.
          </h3>
        </div>
        <div class="tail-grid md:tail-grid-cols-2 tail-gap-4 tail-order-4 md:tail-mb-20">
          <div class="tail-grid tail-gap-4">
            <!-- clients section -->
            <DbClients />
            <!-- messages section -->
            <DbMessages />
          </div>
          <!-- payment section -->
          <DbPayments />
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
  </main>
</template>

<script>
import { formatDistance } from 'date-fns'
import { mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  layout: 'dashboardLayout',
  middleware: ['qbInits'],
  data () {
    return {
      formatDistance,
      openModal: false,
      openBankModal: false
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  mounted () {
    this.fetchUserProfile()
  },
  updated () {
    if (!this.$store.state.authorize.isStripeConnected && !this.$store.state.payment.isBankLinked && this.$route.query.stripe === 'connected') {
      this.fetchUserProfile() // to set value of stripe in profile
      this.openBankModal = true
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'authorize/getUserProfile'
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
    width: 100%;
    // width: calc(100% - 300px);
  }

  .main-view {
    // max-width: calc(100% - 100px);
  }
}
</style>
