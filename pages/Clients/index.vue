<template>
  <page-loader-view>
    <div v-if="acceptedClients.length" class="tail-grid">
      <ClientCard v-for="n in acceptedClients" :key="n._id" :client="n" />
    </div>
    <div v-else-if="firstTimeVisit" class="tail-h-full tail-flex">
      <div
        class="tail-bg-white tail-m-auto tail-rounded-lg tail-border tail-border-gray-300 tail-shadow-md tail-overflow-hidden md:tail-grid tail-grid-cols-5 tail-p-5 md:tail-p-0 md:tail-h-4/6 md:tail-w-4/6"
      >
        <div
          class="tail-hidden md:tail-block tail-h-full invite-client tail-col-span-2"
        ></div>
        <div class="tail-py-10 tail-col-span-3 tail-m-auto md:tail-px-5 xl:tail-px-0">
          <div class="tail-max-w-sm tail-grid tail-gap-5 md:tail-gap-5">
            <h2 class="tail-text-3xl tail-font-semibold">
              Add Your Clients
            </h2>
            <p>
              Here you can create, invite and onboard your new and existing
              clients into GetWelp and manage the entire client process from one
              end to another. Woof!
            </p>
            <div style="width: fit-content;">
              <button type="button" class="base-button" @click="$refs.openInvite.openModal()">
                <span class="">Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tail-mt-16 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center">
      <div class="tail-w-full">
        <img class="tail-text-center tail-inline-block" src="~/assets/img/low-dog.png" alt="" srcset="" />
      </div>
      <h5 class="tail-font-bold">
        No clients yet
      </h5>
      <p class="tail-px-5 tail-text-sm tail-mb-0 tail-max-w-xs">
        All your client list will appear here. Send an invite to a potential client to get started
      </p>
      <div class="tail-w-max tail-mx-auto">
        <button
          class="base-button"
          type="button"
          @click="$refs.openInvite.openModal()"
        >
          <i class="ns-add"></i>
          add your first client
        </button>
      </div>
    </div>
    <!-- <Modal :is-open="addClient" @close="addClient = $event">
      <InviteNewClient @close="addClient = $event" />
    </Modal> -->
    <MainModal ref="openInvite">
      <template v-slot:body>
        <InviteNewClient @close="addClient = $event" />
      </template>
    </MainModal>
  </page-loader-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      addClient: false,
      firstTimeVisit: false
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients'
    })
  },
  created () {
    this.fetchAcceptedClients()
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
      fetchAcceptedClients: 'client/fetchAllAcceptedClients'
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
