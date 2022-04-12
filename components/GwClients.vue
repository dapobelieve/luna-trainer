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
    <div v-else class="my-16 px-5  grid gap-5 justify-center text-center">
      <div class="w-full">
        <i class="fi-rr-following text-[50px] mt-1 mr-1 text-blue-500"/>
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
        <button class="base-button flex items-center" type="button" @click.prevent="$modal.show('inviteClientModal')">
          <i class="fi-rr-add h-5 w-5 mr-2"></i>
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
      addClient: false
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
  methods: {
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
