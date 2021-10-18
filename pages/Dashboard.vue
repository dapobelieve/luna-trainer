<template>
  <main>
    <article>
      <div class="tail-grid tail-gap-4">
        <!-- dashboard intro -->
        <dashboard-intro-card />

        <div class="tail-grid md:tail-grid-cols-2 tail-gap-4">
          <div class="tail-grid tail-gap-4">
            <!-- client registration -->
            <dashboard-clients :accepted-clients="acceptedClients" class="tail-h-72" />
            <!-- new messages -->
            <dashboard-messages />
          </div>

          <!-- invoices -->
          <dashboard-payments :paid-invoices="paidInvoices" />
        </div>
      </div>
    </article>

    <!-- modals -->
    <NotificationsModal :visible="true">
      <template v-slot:title>Stripe Connect</template>
      <template v-slot:subtitle>
        Account under review, please confirm all requirements have been met
        before proceeding to creating invoices.
      </template>
    </NotificationsModal>
    <NotificationsModal :visible="showNotification" @close="showNotification = $event">
      <template v-slot:title>Chat Connection Failed</template>
      <template v-slot:subtitle>Reconnect chat to enjoy all of GetWelp's features</template>
      <template v-slot:actionButtons>
        <button
          class="tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-capitalize hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500 tail-text-blue-700"
          @click="retry"
        >retry</button>
      </template>
    </NotificationsModal>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashboardClients from '~/components/DashboardClients.vue'
export default {
  name: 'Dashboard',
  components: { DashboardClients },
  layout: 'dashboard',
  data () {
    return {
      openBankModal: false,
      showNotification: false,
      paidInvoices: [],
      acceptedClients: []
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  computed: {
    ...mapGetters('profile', {
      isStripeConnected: 'isStripeConnected',
      isStripeReady: 'isStripeReady'
    }),
    ...mapGetters({
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
    sendBirdConnStatus (newValue, oldValue) {
      if (newValue || oldValue || !this.store.state.sendbirdId.sbUser) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showNotification = true
          }, 2000)
        })
      }
    }
  },
  mounted () {
    this.fetchUserProfile()
    this.fetchPaidInvoices({ status: 'paid', limit: 5 }).then((r) => { this.paidInvoices = r }).catch(e => console.error(e))
    this.fetchAcceptedClients({ status: 'accepted', limit: 2 }).then((r) => { this.acceptedClients = r }).catch(e => console.error(e))
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
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      fetchPaidInvoices: 'invoice/fetchInvoiceWithStatusAndLimit',
      fetchAcceptedClients: 'client/fetchClientsWithStatusAndLimit',
      connectToSendBird: 'sendBird/connect_to_sb_server_with_userid'
    }),
    retry () {
      this.$store.commit('sendBird/CONNECTION_ERROR', false)
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$toast.success('Chat connection successful')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
