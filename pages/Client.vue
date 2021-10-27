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
          <span class="capitalize ml-5 font-medium text-lg">
            {{ firstName }} {{ lastName }}
          </span>
        </template>
        <template v-slot:buttons>
          <div class="relative">
            <button
              type="button"
              class="bg-white inline-flex items-center px-2 py-1 border-none text-xs font-medium rounded shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click="showDropdown"
            >
              <img src="~/assets/img/svgs/ellipsis.svg" alt="" srcset="" />
            </button>
            <!-- dropdown menu -->
            <div
              v-show="showDropDown"
              class="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
            >
              <div class="py-2" role="none">
                <nuxt-link
                  :to="{ name: 'NewInvoice', params: { pushedClient: clientInfo } }"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Create Invoice
                </nuxt-link>
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                >Archive</a>
              </div>
            </div>
          </div>
        </template>
      </PageHeader>
    </transition>
    <!-- start here -->
    <div
      class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 mt-5"
    >
      <!-- left menu -->
      <aside
        class="col-span-4 rounded-lg"
      >
        <div class="sticky top-[4.8rem]">
          <div class="w-full">
            <!-- Sidebar contents-->
            <client-sidbar-content />
          </div>
        </div>
      </aside>

      <!-- main content -->
      <main class="col-span-8 bg-white lg:border lg:rounded-lg overflow-y-auto" style="height: calc(100vh - 95px)">
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
