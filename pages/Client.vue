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
          <span class="tail-capitalize tail-ml-5 tail-font-medium tail-text-lg"> {{ firstName }} {{ lastName }} </span>
        </template>
        <template v-slot:buttons>
          <div class="tail-relative">
            <button
              type="button"
              class="tail-bg-white tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border-none tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
              @click="showDropdown"
            >
              <img src="~/assets/img/svgs/ellipsis.svg" alt="" srcset="" />
            </button>
            <!-- dropdown menu -->
            <div v-show="showDropDown" class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40">
              <div class="tail-py-2" role="none">
                <nuxt-link
                  :to="{ name: 'CreateInvoice' }"
                  class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                >
                  Create Invoice
                </nuxt-link>
                <a href="#" class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100">Archive</a>
              </div>
            </div>
          </div>
        </template>
      </PageHeader>
    </transition>
    <div
      class="tail-relative tail-flex tail-overflow-hidden tail-px-5 tail-py-4 tail-max-w-xl md:tail-mx-auto md:tail-max-w-4xl lg:tail-max-w-full 2xl:tail-max-w-7xl"
      style="height: calc(100vh - 63px)"
    >
      <div
        class="tail-flex-1 tail-min-w-0 tail-flex tail-flex-col tail-overflow-hidden"
      >
        <main class="tail-flex-1 tail-flex tail-overflow-hidden">
          <div
            class="tail-flex-1 tail-flex tail-overflow-hidden tail-space-x-6"
          >
            <!-- Static sidebar for desktop viewing -->
            <div class="tail-flex tail-flex-shrink-0 tail-w-1/3">
              <div class="tail-w-full">
                <!-- Sidebar contents-->
                <client-sidbar-content>
                  <template v-slot:petSummary>
                    <div
                      v-if="clientInfo"
                      class="tail-bg-white tail-rounded-lg tail-flex tail-justify-between tail-p-4 tail-mb-3"
                      aria-current="page"
                    >
                      <div>
                        <p>Dog: {{ petName }}</p>
                        <p>Age: {{ petAge }}</p>
                        <p>Breed: {{ petBreed }}</p>
                      </div>
                      <div>
                        <span class="tail-bg-gray-400 tail-rounded-full tail-text-white tail-p-1 tail-px-2 tail-inline-block">
                          0 courses
                        </span>
                      </div>
                    </div>
                    <div
                      v-else
                      class="tail-bg-white tail-rounded-lg tail-grid tail-place-items-center tail-h-24 tail-p-4 tail-mb-3"
                    >
                      <SingleLoader />
                    </div>
                  </template>
                </client-sidbar-content>
              </div>
            </div>
            <!-- Main content -->
            <div
              class="tail-flex-1 tail-bg-white tail-rounded-lg tail-overflow-y-auto"
              style="height: calc(100vh - 95px)"
            >
              <nuxt-child />
            </div>
          </div>
        </main>
      </div>
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
          this.unreadMessages = this.unreadMessagesCount(
            response.sendbirdId
          )
            ? this.unreadMessagesCount(response.sendbirdId)
              .unreadMessageCount
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
