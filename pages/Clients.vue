<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" class="tail-inline-flex primary-color tail-items-center tail-p-2 tail-h-9 tail-w-9 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-blue-600 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="inviteClient">
          <i class="ns-plus tail-text-white tail-text-lg"></i>
        </button>
        <gw-select :options="['All', 'Active', 'Invited']" selected="All" @selected="filterInvoice" />
      </template>
    </PageHeader>
    <gw-pagination class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full" :visible="Boolean(size)" :total-items="size">
      <template v-slot:content="{ pageNumber }">
        <GwClients :status="filter" :page-number="pageNumber" />
      </template>
    </gw-pagination>
    <modal name="inviteClientModal" :height="400">
      <InviteNewClient class="tail-m-6" @close="$modal.hide('inviteClientModal')" />
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Clients',
  data () {
    return {
      clients: false,
      openModal: false,
      filter: 'all'
    }
  },
  head () {
    return {
      title: 'Clients'
    }
  },
  computed: {
    ...mapGetters({
      size: 'client/clientsCount'
    })
  },
  methods: {
    filterInvoice (link) {
      this.filter = link
    },
    inviteClient () {
      this.$modal.show('inviteClientModal')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: rgba(143, 151, 166, 1);
}

.active {
  color: black;
}

.active:focus {
  outline: none !important;
}
</style>
