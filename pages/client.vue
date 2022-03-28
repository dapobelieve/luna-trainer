<template>
  <div class="flex flex-col">
    <transition name="fadeIn">
      <PageHeader v-if="clientInfo">
        <template v-slot:back-button>
          <button
            type="button"
            class="button-text w-10"
            @click="$router.push({ name: 'clients' })"
          >
            <i
              class="fi-rr-arrow-left font-bold text-blue-500 text-lg"
              style="margin-top: 5px"
            ></i>
          </button>
        </template>
        <template v-slot:title>
          <span
            class="hidden lg:block capitalize ml-5 font-medium text-lg"
          >{{ firstName }} {{ lastName }}</span>
        </template>
        <template v-slot:buttons>
          <ClientActions :client-info="clientInfo" />
        </template>
      </PageHeader>
    </transition>
    <!-- start here -->
    <div class="p-4 md:w-full bg-gray-100 flex justify-center">
      <div
        class="flex lg:space-x-4 w-full max-w-2xl lg:max-w-7xl flex-col lg:flex-row"
      >
        <!-- left menu -->
        <aside
          class="w-full lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-md w-full flex-shrink-0 order-1 lg:order-first"
        >
          <div class="sticky md:top-[4.5rem]">
            <div class="w-full">
              <!-- Sidebar contents-->
              <client-sidbar-content />
            </div>
          </div>
        </aside>

        <!-- main content -->

        <nuxt-child />

        <div
          v-if="displayComponent === false"
          class="bg-white p-2 shadow-sm sticky bottom-2 rounded-xl mt-4 border flex justify-end order-last flex lg:hidden"
        >
          <button
            class="button-fill w-full"
            @click="
              $router.push({
                name: 'Client-id-messages',
                params: { id: $route.params.id },
              })
            "
          >
            <i class="ns-comment-alt mr-2"></i> send message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Helpers from '~/mixins/helpers'
export default {
  name: 'Client',
  mixins: [Helpers],
  data () {
    return {
      showDropDown: false,
      clientInfo: null,
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      thisUser: state => state.sendBird.tempClient
    }),
    ...mapGetters({
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
    // this.getClientProfile(this.id)
    //   .then((response) => {
    //     this.clientInfo = response
    //     if (response.status === 'invited' && 'sendbirdId' in response) {
    //       this.isUserOnline(response.sendbirdId)
    //       this.setCurrentClient(response.sendbirdId)
    //     }
    //   })
    //   .catch(err => console.log('error fetching clienteeeee', err))
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
