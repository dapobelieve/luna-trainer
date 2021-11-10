<template>
  <async-view>
    <div v-if="filteredClients.length" class="grid">
      <template v-if="$route.name === 'Clients-id-Messages'">
        <nuxt-child />
      </template>
      <div v-else class="bg-white">
        <ul v-if="filteredClients.length" role="list" class="relative z-0 p-1">
          <li v-for="client in filteredClients" :key="client._id">
            <ClientCard :client="client" />
          </li>
        </ul>
      </div>
    </div>
    <div v-else-if="firstTimeVisit" class="h-full flex">
      <div
        class="bg-white m-auto rounded-lg border border-gray-300 shadow-md overflow-hidden md:grid grid-cols-5 p-5 md:p-0 md:h-4/6 md:w-4/6"
      >
        <div class="hidden md:block h-full invite-client col-span-2"></div>
        <div class="py-10 col-span-3 m-auto md:px-5 xl:px-0">
          <div class="max-w-sm grid gap-5 md:gap-5">
            <h2 class="text-3xl font-semibold">
              Add Your Clients
            </h2>
            <p>
              Here you can create, invite and onboard your new and existing
              clients into GetWelp and manage the entire client process from one
              end to another. Woof!
            </p>
            <div style="width: fit-content;">
              <button type="button" class="base-button" @click="$modal.show('inviteClientModal')">
                <span class>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="my-16 px-5  grid gap-5 justify-center text-center">
      <div class="w-full">
        <img class="text-center inline-block" src="~/assets/img/low-dog.png" alt srcset />
      </div>
      <h5 class="font-bold">
        No clients yet
      </h5>
      <p
        class="px-5 text-sm mb-0 max-w-xs"
      >
        All your client list will appear here. Send an invite to a potential client to get started
      </p>
      <div class="w-max mx-auto">
        <button class="base-button" type="button" @click.prevent="$modal.show('inviteClientModal')" >
          <i class="ns-add"></i>
          Add client now
        </button>
      </div>
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GwClients',
  props: {
    status: {
      type: String,
      required: true
    },
    pageNumber: Number
  },
  data () {
    return {
      addClient: false,
      firstTimeVisit: false
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    filteredClients () {
      const status = this.status === 'Active' ? 'accepted' : this.status === 'Invited' ? 'invited' : 'All'
      // eslint-disable-next-line curly
      if (status === 'All') return this.allClients
      return this.allClients.filter(i => i.status === status)
    }
  },
  watch: {
    pageNumber (newValue) {
      if (newValue) {
        this.fetchAllClients({ page: this.pageNumber })
      }
    },
    status (newValue) {
      if (newValue) {
        newValue = newValue === 'Active' ? 'accepted' : newValue
        newValue === 'All' ? this.fetchAllClients() : this.fetchAllClients({ status: newValue.toLowerCase() })
      }
    }
  },
  created () {
    this.fetchAllClients({ page: this.pageNumber })
  },
  mounted () {
    const getTime = localStorage.getItem('clientsPageFirstVisit')
    if (!getTime) {
      this.firstTimeVisit = true
      localStorage.setItem('clientsPageFirstVisit', Date.now())
    }
  },
  methods: {
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients'
    })
  }
}
</script>

<style lang="scss" scoped>
.invite-client {
  background-image: url("~assets/img/black-dog.png");
  background-repeat: no-repeat;
  background-position: left bottom;
  background-color: rgba(214, 233, 227, 1);
}
</style>
