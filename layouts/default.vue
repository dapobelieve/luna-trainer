<template>
  <async-view loader-id="logout">
    <div v-if="loading" class="fixed preloader top-0 h-full w-full flex items-center justify-center">
      <div class="inline-flex flex-col items-center">
        <img class="h-8 mb-3" src="~/assets/img/logo-v2.svg">
        <SingleLoader height="20px" width="20px" />
      </div>
    </div>
    <div class="min-h-screen">
      <GwHeader
        :class="{
          hidden:
            $route.name === 'client-id-information' ||
            $route.name === 'client-id-messages'
        }"
      />
      <div class="flex">
        <Navigation class="hidden lg:block" />
        <div v-if="showSidebarMenu" class="block lg:hidden absolute">
          <Navigation  />
        </div>
        <main class="w-full bg-gray-100">
          <Nuxt :key="$route.fullpath" />
        </main>
        <transition
          enter-active-class="transition-all ease-in-out duration-[500ms]"
          leave-active-class="transition-all ease-in-out duration-[500ms]"
          enter-class="transform translate-x-full"
          leave-class="-translate-x-0"
          enter-to-class="-translate-x-0"
          leave-to-class="translate-x-full"
        >
          <SchedulerDrawer v-if="schedulerDrawer.open" v-model="schedulerDrawer.activePage" />
        </transition>
      </div>
    </div>

    <!-- adding notes -->
    <div id="no-border">
      <modal
        name="add-note"
        height="100%"
        :resizable="true"
        :adaptive="true"
        :shift-x="1"
        width="25%"
        :click-to-close="false"
      >
        <notes-add-note :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
      </modal>
    </div>

    <!-- expanding notes modal -->
    <div id="no-border">
      <modal
        name="expand-add-note"
        height="100%"
        width="100%"
        :adaptive="true"
        :click-to-close="false"
      >
        <notes-add-note :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
      </modal>
    </div>

    <PaymentMethodStatusModal />
    <PaymentMethodBankAccountModal />
    <InviteNewClientModal />
    <ExpiredSessionAuthModal />
    <ViewImageModal />
  </async-view>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import PaymentMethodStatusModal from '../components/modals/PaymentMethodStatusModal'
import PaymentMethodBankAccountModal from '../components/modals/PaymentMethodBankAccountModal'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from '~/components/modals/ExpiredSessionAuthModal'
import ViewImageModal from '~/components/messages/ViewImageModal.vue'

import SchedulerDrawer from '~/components/scheduler/SchedulerDrawer'
export default {
  components: { SchedulerDrawer, ExpiredSessionAuthModal, InviteNewClientModal, PaymentMethodStatusModal, PaymentMethodBankAccountModal, ViewImageModal },
  mixins: [sendBird, sendBirdEvents, sendBirdConnectionEvents, auth],
  data () {
    return {
      page: this.$route.name,
      showNotification: false,
      showSidebarMenu: false
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      addNoteModal: state => state.notes.addNoteModal,
      expandModal: state => state.notes.expandModal
    }),
    ...mapGetters({
      schedulerDrawer: 'scheduler/drawer',
      loading: 'profile/getLoading',
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (data) {
        this.$store.commit('scheduler/setStates', { drawer: { open: false, activePage: null } })
        if (data.name === 'schedule') {
          this.$store.commit('scheduler/setStates', { drawer: { open: false, activePage: null } })
        } else if (data.name === 'schedule-create') {
          this.$store.commit('scheduler/setStates', { drawer: { open: true, activePage: 'new-session' } })
        } else if (data.name === 'schedule-events-id') {
          this.$store.commit('scheduler/setStates', { drawer: { open: true, activePage: 'schedule-details' } })
        }
      }
    },
    sendBirdConnStatus (newValue, oldValue) {
      if (newValue || oldValue || !this.store.state.sendbirdId.sbUser) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showNotification = true
          }, 2000)
        })
      }
    },
    addNoteModal (newValue) {
      if (newValue) {
        this.$modal.show('add-note')
      } else if (!newValue) {
        this.$modal.hide('add-note')
      }
    },
    expandModal (newValue) {
      if (newValue) {
        this.$modal.show('expand-add-note')
      } else if (!newValue) {
        this.$modal.hide('expand-add-note')
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
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.sendBirdConnStatus) {
        setTimeout(() => {
          this.showNotification = true
        }, 2000)
      }
    })
  },
  methods: {
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    hideMobileMenu () {
      this.showSidebarMenu = false
    },
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions('sendBird', {
      connectToSendBird: 'connectToSBWithUserid',
      newMessage: 'updateConnectedChannels',
      addChannel: 'addNewChannel'
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

<style lang="scss">
@media print {
  .page-header,
  .navigation,
  .gw-header {
    display: none !important;
  }
}
</style>
