<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:back-button>
        <svg
          role="button"
          width="7"
          height="14"
          viewBox="0 0 9 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="$router.go(-1)"
        >
          <path d="M7.87878 18.0001C7.67989 18 7.48915 17.921 7.34853 17.7803L1.21953 11.6513C0.516515 10.9481 0.121582 9.99443 0.121582 9.00006C0.121582 8.0057 0.516515 7.05204 1.21953 6.34881L7.34853 0.219811C7.48998 0.0831927 7.67944 0.00759688 7.87608 0.0093057C8.07273 0.0110145 8.26084 0.0898912 8.3999 0.228947C8.53895 0.368003 8.61783 0.556113 8.61954 0.75276C8.62125 0.949408 8.54565 1.13886 8.40903 1.28031L2.28003 7.40931C1.85822 7.83125 1.62126 8.40344 1.62126 9.00006C1.62126 9.59668 1.85822 10.1689 2.28003 10.5908L8.40903 16.7198C8.51389 16.8247 8.58529 16.9583 8.61422 17.1038C8.64315 17.2493 8.62829 17.4 8.57154 17.5371C8.51479 17.6741 8.41868 17.7912 8.29538 17.8736C8.17207 17.956 8.02709 18 7.87878 18.0001Z" fill="black" />
        </svg>
      </template>
      <template v-slot:avatar>
        <span class="tail-rounded-full tail-border-2 tail-border-red-400 tail-p-1 tail-mr-1 tail-ml-4">
          <ClientAvatar firstname="get" lastname="welp" width="1.5" height="1.5" />
        </span>
      </template>
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="openModal = true">
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
    <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal>
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
