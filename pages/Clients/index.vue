<template>
  <div v-if="allClients.size" class="tail-grid">
    <ClientCard v-for="n in allClients.size" :key="n" />
  </div>
  <div v-else class="tail-h-full tail-flex">
    <div
      class="tail-bg-white tail-m-auto tail-rounded-lg tail-border tail-border-gray-300 tail-shadow-md tail-overflow-hidden md:tail-grid tail-grid-cols-5 tail-p-5 md:tail-p-0 md:tail-h-4/6 md:tail-w-4/6"
    >
      <div
        class="tail-hidden md:tail-block tail-h-full invite-client tail-col-span-2"
      ></div>
      <div class="tail-col-span-3 tail-m-auto md:tail-px-5 xl:tail-px-0">
        <div class="tail-max-w-sm tail-grid tail-gap-5 md:tail-gap-10">
          <h2 class="tail-text-3xl tail-font-semibold">
            Add Your Clients
          </h2>
          <p>
            Here you can create, invite and onboard your new and existing
            clients into GetWelp and manage the entire client process from one
            end to another. Woof!
          </p>
          <div style="width: fit-content;">
            <button type="button" class="base-button" @click="addClient = true">
              <span class="">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal :isOpen="addClient" @close="addClient = $event">
      <InviteNewClient @close="addClient = $event" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      addClient: false
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'mock/FETCH_CLIENTS'
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
