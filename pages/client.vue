<template>
  <div class="flex flex-col">
    <transition name="fadeIn">
      <PageHeader v-if="clientInfo">
        <template v-slot:back-button>
          <button
            type="button"
            class="button-text w-10"
            @click="backRoute()"
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
          <ClientActions v-if="clientInfo" :client-info="clientInfo" />
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
          class="w-full lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-md flex-shrink-0 order-1 lg:order-first"
        >
          <div class="sticky md:top-[4.5rem]">
            <div class="w-full">
              <!-- Sidebar contents-->
              <client-sidbar-content v-if="clientInfo" :client="clientInfo" />
            </div>
          </div>
        </aside>

        <!-- main content -->

        <nuxt-child />

        <div
          v-if="displayComponent === false"
          class="bg-white p-2 shadow-sm sticky bottom-2 rounded-xl mt-4 border flex justify-end order-last lg:hidden"
        >
          <button
            class="button-fill w-full"
            @click="
              $router.push({
                name: 'client-id-messages',
                params: { id: $route.params.id },
              })
            "
          >
            <i class="fi-rr-comment-alt h-4 mr-2"></i> Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    firstName () {
      return (this.clientInfo && this.clientInfo.firstName) || ''
    },
    lastName () {
      return (this.clientInfo && this.clientInfo.lastName) || ''
    }
  },
  async mounted () {
    try {
      this.clientInfo = await this.getSingleClientById(this.$route.params.id)
    } catch (error) {
      this.$lunaToast.error('an error occured')
    }
  },
  methods: {
    ...mapActions({
      getSingleClientById: 'client/getSingleClientById'
    }),
    showDropdown () {
      this.showDropDown = !this.showDropDown
    },
    backRoute () {
      if (this.$route.name === 'client-id-information') {
        this.$router.push({ name: 'clients' })
      } else {
        this.$router.push({ name: 'client-id-information', params: { id: this.$route.params.id } })
      }
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
