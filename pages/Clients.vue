<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
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
import { mapGetters } from 'vuex'
export default {
  name: 'Clients',
  data () {
    return {
      openDropDown: false,
      optionsText: 'Received',
      clients: false,
      active: true,
      openModal: false
    }
  },
  head () {
    return {
      title: 'All Clients'
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients',
      invitedClients: 'client/getAllInvitedClients'
    })
  },
  methods: {
    goToInvites () {
      this.optionsText = 'Sent'
      this.$router.push({
        name: 'Clients-InvitedInvites'
      })
      this.openDropDown = false
    },
    goToAccepted () {
      this.optionsText = 'Received'
      this.$router.push({
        name: 'Clients'
      })
      this.openDropDown = false
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
