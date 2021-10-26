<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" class="inline-flex primary-color items-center p-2 h-9 w-9 border border-gray-300 text-xs font-medium rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2" @click="inviteClient">
          <i class="ns-plus text-white text-lg"></i>
        </button>
      </template>
    </PageHeader>
    <gw-pagination class="contain-default-pages" :visible="Boolean(size)" :total-items="size">
      <template v-slot:content="{ pageNumber }">
        <GwClients :status="filter" :page-number="pageNumber" />
      </template>
    </gw-pagination>
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
