<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="openModal = true">
          <i class="ns-plus tail-text-white tail-text-lg"></i>
        </button>
        <gw-select :options='["Active","Invited"]' @selected="goTo" selected="Invited"/>
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child />
    </div>
    <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Clients',
  data () {
    return {
      clients: false,
      openModal: false
    }
  },
  head () {
    return {
      title: 'All Clients'
    }
  },
  methods: {
    goTo (link) {
      this.$router.push({
        name: link === 'Active' ? 'Clients' : `Clients-${link}`
      })
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
