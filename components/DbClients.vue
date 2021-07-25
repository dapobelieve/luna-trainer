<template>
  <div>
    <h5 class="tail-font-medium tail-mb-2">
      Clients
    </h5>
    <div v-if="!$store.state.client.isLoading" class="tail-grid tail-grid-cols-3 tail-gap-4">
      <!-- when clients are <= 5 but not equal to zero-->
      <template v-if="acceptedClients.length < 2 && acceptedClients.length !== 0">
        <div
          v-for="client in acceptedClients"
          :key="client.index"
          class="tail-rounded-md tail-bg-white tail-py-4 tail-grid tail-justify-items-center tail-mb-0 tail-cursor-pointer"
          @click="openClientModal = true"
        >
          <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" :width="4" :height="4" />
          <b class="tail-capitalize tail-text-sm tail-mt-3">{{ client.firstName }}</b>
          <div class="tail-flex tail-items-center">
            <img
              class="tail-bg-green-400 tail-p-1 tail-rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <small
              class="tail-text-gray-500 tail-ml-1 tail-capitalize tail-text-sm"
            >{{ client.pet[0].name }}</small>
          </div>
        </div>
        <button
          type="button"
          class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
          @click="openModal = true"
        >
          <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
            <i
              class="ns-plus tail-text-2xl"
            ></i>
          </div>

          <div>
            <div
              class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
            >
              Invite clients
            </div>
          </div>
        </button>
      </template>
      <!-- when clients are 0 -->
      <template v-else-if="!acceptedClients.length">
        <button
          type="button"
          class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
          @click="openModal = true"
        >
          <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
            <i
              class="ns-plus tail-text-2xl"
            ></i>
          </div>

          <div>
            <div
              class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
            >
              Invite clients
            </div>
          </div>
        </button>
        <div
          v-for="n in 2"
          :key="n"
          class="tail-rounded-lg tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center tail-h-40 gw-bg-color"
        >
        </div>
      </template>
      <!-- when clients are >= 5 -->
      <template v-else-if="acceptedClients.length >= 2">
        <div
          v-for="client in acceptedClients.slice(0,2)"
          :key="client.index"
          class="tail-rounded-md tail-bg-white tail-py-4 tail-grid tail-justify-items-center tail-mb-0 tail-cursor-pointer"
          @click="openClientModal = true"
        >
          <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" :width="4" :height="4" />
          <b class="tail-capitalize tail-text-sm tail-mt-3">{{ client.firstName }}</b>
          <div class="tail-flex tail-items-center">
            <img
              class="tail-bg-green-400 tail-p-1 tail-rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <small
              class="tail-text-gray-500 tail-ml-1 tail-capitalize tail-text-sm"
            >{{ client.pet[0].name }}</small>
          </div>
        </div>
        <button
          class="tail-rounded-lg tail-bg-white tail-pt-4 tail-pb-10 tail-grid tail-justify-items-center"
          @click="$router.push({ name: 'Clients' })"
        >
          <div class="tail-mb-2 tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-16 tail-h-16" style="background: rgba(240, 245, 250, 1);">
            <i
              class="ns-angle-right tail-text-2xl"
            ></i>
          </div>

          <div>
            <NuxtLink
              :to="{ name: 'Clients' }"
              class="tail-capitalize tail-text-xs tail-mt-3 gw-pry-text-color tail-no-underline tail-font-bold"
            >
              View All
            </NuxtLink>
          </div>
        </button>
      </template>
    </div>
    <div v-else class="tail-grid tail-place-content-center tail-h-full">
      <SingleLoader />
    </div>
    <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal>
    <Modal v-for="client in acceptedClients" :key="client.index" :status="client.status" :is-open="openClientModal" @close="openClientModal = $event">
      <ClientInfoPreview :client="client" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DbClients',
  data () {
    return {
      openModal: false,
      openClientModal: false
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    acceptedClients () {
      if (this.allClients.length) {
        return this.allClients.filter(c => c.status === 'accepted')
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
