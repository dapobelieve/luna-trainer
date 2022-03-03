<template>
  <async-view loader-id="logout">
    <div v-if="loading" class="fixed preloader top-0 h-full w-full flex items-center justify-center">
      <div class="inline-flex flex-col items-center">
        <img class="h-8 mb-3" src="~/assets/img/logo-v2.svg">
        <SingleLoader height="40px" width="40px" />
      </div>
    </div>
    <GwHeader />
    <div class="flex">
      <invite-new-client-modal redirect />
      <Navigation class="hidden lg:block" />
      <div v-if="showSidebarMenu" class="block lg:hidden">
        <Navigation />
      </div>
      <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center">
        <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
          <Nuxt />
        </div>
      </div>
      <ExpiredSessionAuthModal />
    </div>
  </async-view>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from '~/components/modals/ExpiredSessionAuthModal'
import SingleLoader from "~/components/util/SingleLoader";
export default {
  components: {SingleLoader, ExpiredSessionAuthModal, InviteNewClientModal },
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
      loading: 'profile/getLoadingl'
    }),
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isStripeConnected: state => state.profile.isStripeConnected
    })
  },
  methods: {
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    hideMobileMenu () {
      this.showSidebarMenu = false
    },
    ...mapActions('sendBird', {
      connectToSendBird: 'connect_to_sb_server_with_userid',
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
  }
}
</script>

<style lang="scss">
.preloader {
  background-color: #171616A6;
  z-index: 999999;
}
</style>
