<template>
  <async-view loader-id="logout">
    <modal name="stripe-modal" height="auto" :adaptive="true" :max-width="500">
      <onboarding-stripe class="m-6" @closeModal="skipStripeProcess" />
    </modal>
    <GwHeader />
    <div class="flex">
      <invite-new-client-modal />
      <Navigation class="hidden lg:block" />
      <div v-if="showSidebarMenu" class="block lg:hidden">
        <Navigation />
      </div>
      <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center">
        <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
          <div class="text-right mb-4">
            <span class="font-medium">{{ new Date().toDateString() }}</span>
          </div>
          
          <Nuxt />
        </div>
      </div>
      <modal :click-to-close="false" height="auto" :adaptive="true" name="auth-modal">
        <div class="m-6">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h5 class="text-2xl text-gray-700">
                <slot name="title">
                  Session Expired
                </slot>
              </h5>
              <p>Please signin again</p>
            </div>
          </div>
          <div>
            <form @submit.prevent="fnLogin">
              <div class="flex justify-around">
                <div class="text-center">
                  <ClientAvatar
                    :width="4.5"
                    :height="4.5"
                    :client-info="$auth.user"
                  />
                  <div>
                    <span class="text-3xl font-bold">{{ $auth.user.firstName }} {{ $auth.user.lastName }}</span>
                  </div>
                </div>
              </div>
              <div>
                <InputComponent
                  id="oldPass"
                  v-model="form.password"
                  autofocus
                  placeholder=""
                  type="password"
                  class="mb-8"
                >
                  <template v-slot:labelText>
                    Password
                  </template>
                </InputComponent>
              </div>
              <button
                type="submit"
                :disabled="isLoading || !form.password"
                class="button-fill"
              >
                <SingleLoader v-if="isLoading" class="mr-2" />Login
              </button>
            </form>
          </div>
        </div>
      </modal>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import auth from '~/mixins/auth'
export default {
  components: { InviteNewClientModal },
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
    },
    skipStripeProcess () {
      localStorage.removeItem('profileCompleted')
      this.$modal.hide('stripe-modal')
    }
  },
  mounted () {
    const isProfileSetUpCompleted = localStorage.getItem('profileCompleted')
    if (isProfileSetUpCompleted && !this.isStripeConnected) {
      this.$modal.show('stripe-modal')
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

<style lang="scss"></style>
