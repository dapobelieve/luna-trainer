<template>
  <main>
    <header
      class="tail-bg-white tail-p-3 tail-py-1 tail-flex tail-justify-between tail-items-center tail-text-2xl tail-sticky tail-top-0 tail-z-10"
    >
      <div class="tail-flex tail-items-center">
        <img
          class="tail-h-16"
          src="~/assets/img/logo.png"
          alt="getWelp logo"
        >
        <img
          class="tail-hidden md:tail-block"
          src="~/assets/img/getwelp.png"
          alt="getWelp logo"
        >
      </div>
      <div
        class="tail-border tail-rounded-md body-background md:tail-py-1 md:tail-px-3 tail-flex tail-items-center md:tail-w-4/12"
      >
        <i class="ns-search tail-mr-2 tail-hidden md:tail-block tail-text-gray-400" />
        <input
          class="tail-outline-none tail-text-lg body-background tail-w-full tail-hidden md:tail-block"
          type="text"
          placeholder="Search"
        >
      </div>
      <div class="tail-flex">
        <i class="ns-search tail-border tail-rounded tail-p-1 tail-mr-2 md:tail-hidden" />
        <span role="button" class="tail-relative tail-flex tail-border tail-rounded tail-mr-2">
          <small
            v-if="getTotalUnreadMessages.length"
            style="padding: 0.2em !important"
            class="tail-absolute tail-right-0 tail-bg-red-700 tail-text-white tail-text-xs tail-leading-none tail-rounded-full"
          >{{ getTotalUnreadMessages.length }}</small>
          <i class="ns-comment-alt tail-rounded tail-p-1" />
        </span>
        <span class="tail-relative tail-flex tail-border tail-rounded tail-mr-2">
          <!-- <span
            class="tail-p-1 tail-bg-red-700 tail-absolute tail-right-1 tail-top-1 tail-rounded-full"
          ></span> -->
          <button @click="NotificationDropdownIsOpen = !NotificationDropdownIsOpen">
            <i class="ns-bell-ring tail-p-1" />
          </button>
        </span>
        <NotificationDropdown v-if="NotificationDropdownIsOpen" />
        <button class="focus:tail-outline-none" @click="profileDropdownIsOpen= !profileDropdownIsOpen">
          <img
            class="tail-rounded-full tail-h-8"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
        </button>
        <div class="tail-absolute tail-right-0 tail-border tail-border-gray-200 tail-top-full tail-mr-3">
          <ProfileDropdown v-if="profileDropdownIsOpen" />
        </div>
      </div>
    </header>
    <!-- <div class="tail-position-relative">
      <MessageDrawer
        :display="showMessageDrawer"
        @closemessagedrawer="showMessagesDrawer = false"
      />
    </div> -->
    <!-- <div class=" tail-z-0 tail-h-full tail-grid md:tail-flex"> -->
    <div class=" tail-z-0 tail-grid md:tail-flex">
      <Navigation />
      <Nuxt class="views tail-mb-20" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      profileDropdownIsOpen: false,
      NotificationDropdownIsOpen: false,
      showMessageDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      getTotalUnreadMessages: 'qb/getTotalUnreadMessages'
    })
  },
  mounted () {
    // const isStripConnected = Object.prototype.hasOwnProperty.call(this.$auth.user, 'stripConnected')
    const isStripeConnected = this.$store.state.authorize.stripeConnected
    if (!isStripeConnected) {
      this.$nextTick(function () {
        this.$toast.info('Please connect your Stripe account', { position: 'top-right' })
      })
    }
  },
  methods: {
    close () {
      this.$emit('closemessagedrawer')
    }
  }
}
</script>

<style lang="scss">
@media only screen and (min-width: 769px) {
  .views {
    margin-left: 99px;
    width: 100%;
  }
}
</style>
