<template>
  <main>
    <article class="tail-mx-3 lg:tail-mx-0">
      <div class="tail-space-y-3 tail-mb-5">
        <!-- dashboard intro -->
        <dashboard-intro-card />

        <div class="tail-grid md:tail-grid-cols-2 tail-gap-4">
          <div class="tail-grid tail-gap-4">
            <!-- client registration -->
            <containers-summary-card-with-notifications>
              <template v-slot:icon>
                <i
                  class="ns-users tail-bg-blue-50 tail-p-1 tail-rounded-full tail-text-blue-500 tail-text-2xl"
                ></i>
              </template>
              <template v-slot:title>
                new client registrations
              </template>
              <template v-slot:notifications>
                2 new requests
              </template>
              <template v-slot:content>
                <ul role="list" class="tail-relative tail-z-0 tail-mx-0.5">
                  <li
                    v-for="invoice in 2"
                    :key="invoice.index"
                  >
                    <containers-summary-information-with-avatar>
                      <template v-slot:avatar>
                        <ClientAvatar
                          :client-info="{
                            firstName: 'Get',
                            lastName: 'Welp'
                          }"
                        />
                      </template>
                      <template v-slot:content>
                        New client registration from Peter.
                      </template>
                      <template v-slot:date>
                        {{ new Date().toDateString() }}
                      </template>
                    </containers-summary-information-with-avatar>
                  </li>
                </ul>
              </template>
            </containers-summary-card-with-notifications>

            <!-- new messages -->
            <containers-summary-card-with-notifications>
              <template v-slot:icon>
                <i
                  class="ns-comment-alt tail-bg-blue-50 tail-p-1 tail-rounded-full tail-text-blue-500 tail-text-2xl"
                ></i>
              </template>
              <template v-slot:title>
                new messages
              </template>
              <template v-slot:notifications>
                2 new messages
              </template>
              <template v-slot:content>
                <ul role="list" class="tail-relative tail-z-0 tail-mx-0.5">
                  <li
                    v-for="invoice in 2"
                    :key="invoice.index"
                  >
                    <containers-summary-information-with-avatar>
                      <template v-slot:avatar>
                        <ClientAvatar
                          :client-info="{
                            firstName: 'Get',
                            lastName: 'Welp'
                          }"
                        />
                      </template>
                      <template v-slot:content>
                        Abi Carpenter has sent you a message.
                      </template>
                      <template v-slot:date>
                        {{ new Date().toDateString() }}
                      </template>
                    </containers-summary-information-with-avatar>
                  </li>
                </ul>
              </template>
            </containers-summary-card-with-notifications>
          </div>

          <!-- invoices -->
          <dashboard-payments :paid-invoices="paidInvoices" />
        </div>
      </div>
    </article>

    <!-- modals -->
    <NotificationsModal :visible="true">
      <template v-slot:title>
        Stripe Connect
      </template>
      <template v-slot:subtitle>
        Account under review, please confirm all requirements have been met
        before proceeding to creating invoices.
      </template>
    </NotificationsModal>
    <NotificationsModal
      :visible="showNotification"
      @close="showNotification = $event"
    >
      <template v-slot:title>
        Chat Connection Failed
      </template>
      <template v-slot:subtitle>
        Reconnect chat to enjoy all of GetWelp's features
      </template>
      <template v-slot:actionButtons>
        <button
          class="tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-capitalize hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500 tail-text-blue-700"
          @click="retry"
        >
          retry
        </button>
      </template>
    </NotificationsModal>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  layout: 'dashboard',
  data () {
    return {
      openBankModal: false,
      showNotification: false,
      paidInvoices: []
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
