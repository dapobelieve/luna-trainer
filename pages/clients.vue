<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" class="button-fill w-10" @click="inviteClient">
          <i class="fi-rr-plus h-5"></i>
        </button>
      </template>
    </PageHeader>
    <div class="flex justify-center p-4 max-w-full md:max-w-4xl lg:max-w-full 2xl:max-w-7xl mx-auto">
      <gw-pagination class="contain-default-pages" :visible="Boolean(size)" :total-items="size">
        <template v-slot:content="{ pageNumber }">
          <GwClients :status="filter" :page-number="pageNumber" />
        </template>
      </gw-pagination>
    </div>
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
</style>
