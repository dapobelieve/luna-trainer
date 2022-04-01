<template>
  <async-view loader-id="logout">
    <div v-if="loading" class="fixed preloader top-0 h-full w-full flex items-center justify-center">
      <div class="inline-flex flex-col items-center">
        <img class="h-8 mb-3" src="~/assets/img/logo-v2.svg">
        <SingleLoader height="20px" width="20px" />
      </div>
    </div>
    <GwHeader />
    <div class="flex">
      <invite-new-client-modal redirect />
      <Navigation class="hidden lg:block" />
      <div v-if="showSidebarMenu" class="block lg:hidden">
        <Navigation />
      </div>
      <div class="w-full p-4 bg-gray-100 flex justify-center">
        <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
          <Nuxt />
        </div>
      </div>
      <ExpiredSessionAuthModal />
      <div class="bg-teal-500 text-rose-500 bg-teal-50 text-amber-500 bg-amber-500 bg-rose-500 bg-rose-50 bg-amber-50 bg-red-500 bg-red-50 bg-cyan-500 text-sky-500 bg-sky-500 bg-sky-50 bg-cyan-50"></div>
      <transition
        enter-active-class="transition-all ease-in-out duration-[500ms]"
        leave-active-class="transition-all ease-in-out duration-[500ms]"
        enter-class="transform translate-x-full"
        leave-class="-translate-x-0"
        enter-to-class="-translate-x-0"
        leave-to-class="translate-x-full"
      >
        <SchedulerDrawer v-if="schedulerDrawer && schedulerDrawer.open" v-model="schedulerDrawer.activePage" />
      </transition>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from '~/components/modals/ExpiredSessionAuthModal'
import SingleLoader from '~/components/util/SingleLoader'
import SchedulerDrawer from '~/components/scheduler/SchedulerDrawer'
export default {
  components: { SchedulerDrawer, SingleLoader, ExpiredSessionAuthModal, InviteNewClientModal },
  mixins: [sendBird, sendBirdEvents, sendBirdConnectionEvents, auth],
  data () {
    return {
      isLoading: false,
      form: {
        password: null
      },
      page: this.$route.name,
      showSidebarMenu: false
    }
  },
  computed: {
    ...mapGetters({
      schedulerDrawer: 'scheduler/drawer',
      loading: 'profile/getLoading'
    }),
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isStripeConnected: state => state.profile.isStripeConnected
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.$store.commit('scheduler/setStates', { drawer: { open: false, activePage: null } })
      }
    }
  },
  created () {
    this.$nuxt.$on('displayPageSidebar', () => {
      this.toggleSidebarMenu()
    })
    this.$nuxt.$on('hideSidebarMenu', () => {
      this.hideMobileMenu()
    })
    this.startFullPageLoad()
    const tokenValidity = this.$auth.strategy.token.status().valid()
    if (
      this.$auth.loggedIn &&
      Object.entries(this.$auth.user).length === 0 &&
      tokenValidity
    ) {
      this.$router.replace({ name: 'auth-onboarding' }).then(() => {
        this.endFullPageLoad()
      })
    } else {
      this.endFullPageLoad()
      this.fetchAllClients()
    }
  },
  async beforeMount () {
    try {
      await this.$store.dispatch('scheduler/connectToLocalCalendar')
    } catch (e) {
      console.log(e)
      await this.$store.dispatch('scheduler/getCalendars')
    }
  },
  methods: {
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    hideMobileMenu () {
      this.showSidebarMenu = false
    },
    ...mapActions('sendBird', {
      connectToSendBird: 'connectToSBWithUserid',
      newMessage: 'updateConnectedChannels',
      addChannel: 'addNewChannel'
    }),
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients'
    }),
    toggleSide () {
      this.open = !this.open
    },
    hideSide () {
      this.open = false
    }
  }
}
</script>

<style lang="scss">
.preloader {
  background-color: #171616A6;
  z-index: 999999;
}
</style>
