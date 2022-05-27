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
      <Navigation />
      <div class="w-full md:pl-64 p-4 bg-gray-100 flex justify-center">
        <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
          <Nuxt />
        </div>
      </div>
      <ExpiredSessionAuthModal />
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
    <v-dialog />
  </async-view>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from '~/components/modals/ExpiredSessionAuthModal'
import SingleLoader from '~/components/util/SingleLoader'
import SchedulerDrawer from '~/components/scheduler/SchedulerDrawer'
export default {
  name: 'Dashboard',
  components: { SchedulerDrawer, SingleLoader, ExpiredSessionAuthModal, InviteNewClientModal },
  mixins: [auth],
  computed: {
    ...mapGetters({
      schedulerDrawer: 'scheduler/drawer',
      loading: 'profile/getLoading'
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
    this.startFullPageLoad()
    const tokenValidity = this.$auth.strategy.token.status().valid()
    if (
      this.$auth.loggedIn &&
      (!this.$auth.user && !this.$auth.user.onboard) &&
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
  methods: {
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
