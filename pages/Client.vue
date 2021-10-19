<template>
  <div>
    <transition name="fadeIn">
      <PageHeader v-if="clientInfo">
        <template v-slot:back-button>
          <button type="button" @click="$router.push({ name: 'Clients' })">
            <img src="~/assets/img/svgs/chevron-back.svg" alt="" srcset="" />
          </button>
        </template>
        <template v-slot:title>
          <span class="tail-capitalize tail-ml-5 tail-font-medium tail-text-lg">
            {{ firstName }} {{ lastName }}
          </span>
        </template>
        <template v-slot:buttons>
          <div class="tail-relative">
            <button
              type="button"
              class="tail-bg-white tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border-none tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
              @click="showDropdown"
            >
              <img src="~/assets/img/svgs/ellipsis.svg" alt="" srcset="" />
            </button>
            <!-- dropdown menu -->
            <div
              v-show="showDropDown"
              class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
            >
              <div class="tail-py-2" role="none">
                <nuxt-link
                  :to="{ name: 'CreateInvoice' }"
                  class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                >
                  Create Invoice
                </nuxt-link>
                <a
                  href="#"
                  class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                >Archive</a>
              </div>
            </div>
          </div>
        </template>
      </PageHeader>
    </transition>
    <!-- start here -->
    <div
      class="tail-max-w-3xl tail-mx-auto sm:tail-px-6 lg:tail-max-w-7xl lg:tail-px-8 lg:tail-grid lg:tail-grid-cols-12 lg:tail-gap-8 tail-mt-5"
    >
      <!-- left menu -->
      <aside
        class="tail-col-span-4 tail-rounded-lg"
      >
        <div class="tail-sticky tail-top-[4.8rem]">
          <div class="tail-w-full">
            <!-- Sidebar contents-->
            <client-sidbar-content />
          </div>
        </div>
      </aside>

      <!-- main content -->
      <main class="tail-col-span-8 tail-bg-white lg:tail-border lg:tail-rounded-lg tail-overflow-y-auto" style="height: calc(100vh - 95px)">
        <nuxt-child />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Client',
  data () {
    return {
      showDropDown: false,
      clientInfo: null,
      id: this.$route.params.id,
      unreadMessages: 0
    }
  },
  computed: {
    ...mapState({
      thisUser: state => state.sendBird.tempClient
    }),
    ...mapGetters({
      unreadMessagesCount: 'sendBird/getUserUnreadMessageCount',
      isOnline: 'sendBird/isUserOnline'
    }),
    firstName () {
      return (this.clientInfo && this.clientInfo.firstName) || ''
    },
    lastName () {
      return (this.clientInfo && this.clientInfo.lastName) || ''
    },
    petName () {
      return (this.clientInfo.pet[0] && this.clientInfo.pet[0].name) || ''
    },
    petAge () {
      return (this.clientInfo.pet[0] && this.clientInfo.pet[0].age) || ''
    },
    petBreed () {
      return (this.clientInfo.pet[0] && this.clientInfo.pet[0].breed) || ''
    }
  },
  mounted () {
    this.getClientProfile(this.id)
      .then((response) => {
        this.clientInfo = response
        if (response.status === 'invited' && 'sendbirdId' in response) {
          this.isUserOnline(response.sendbirdId)
          this.setCurrentClient(response.sendbirdId)
          this.unreadMessages = this.unreadMessagesCount(response.sendbirdId)
            ? this.unreadMessagesCount(response.sendbirdId).unreadMessageCount
            : 0
        }
      })
      .catch(err => console.log('error fetching client', err))
  },
  methods: {
    ...mapMutations({
      setCurrentClient: 'sendBird/SET_CURRENT_VIEWING_CLIENT'
    }),
    ...mapActions({
      getClientProfile: 'client/getSingleClientById',
      getSendbirdUser: 'sendBird/getUser',
      isUserOnline: 'sendBird/isUserOnline'
    }),
    showDropdown () {
      this.showDropDown = !this.showDropDown
    }
  }
}
</script>

<style lang="scss" scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
