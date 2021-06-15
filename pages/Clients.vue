<template>
  <div
    class="lg:tail-pl-14 lg:tail-mr-4 md:tail-px-4 lg:tail-pr-0 md:tail-mt-3 tail-border md:tail-border-none tail-w-full"
  >
    <div
      style="top: 72px"
      class="tail-sticky tail-flex tail-items-center md:tail-rounded-md tail-bg-white tail-px-4 tail-py-3"
    >
      <div class="tail-mr-auto tail-text-sm md:tail-text-2xl tail-flex tail-gap-3">
        <NuxtLink exact-active-class="active" :to="{name: 'Clients'}">
          Clients <span v-if="allClients.size" class="">({{ allClients.size }})</span>
        </NuxtLink>
        <!-- <NuxtLink exact-active-class="active" :to="{name: 'Clients-Classes'}">
          Classes <span class="">(3)</span>
        </NuxtLink> -->
      </div>
      <div v-if="allClients.size" class="relative inline-block text-left">
        <div class="tail-mr-2 md:tail-mr-5 tail-relative">
          <div
            class="tail-inline-flex tail-justify-items-start tail-w-full tail-rounded-md tail-border tail-border-gray-300 tail-shadow-sm tail-px-3 md:tail-pl-4 md:tail-pr-2 tail-py-1 md:tail-py-2 tail-bg-white tail-text-sm tail-font-medium hover:tail-bg-gray-50 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-offset-gray-100 focus:tail-ring-indigo-500"
            @click="show = !show"
          >
            <span class="tail-hidden md:tail-block">Received</span>
            <i class="ns-caret-down tail-text-xl" aria-hidden="true"></i>
          </div>
          <transition
            enter-active-class="tail-transition tail-ease-out tail-duration-100"
            enter-from-class="tail-transform tail-opacity-0 tail-scale-95"
            enter-to-class="tail-transform tail-opacity-100 tail-scale-100"
            leave-active-class="tail-transition tail-ease-in tail-duration-75"
            leave-from-class="tail-transform tail-opacity-100 tail-scale-100"
            leave-to-class="tail-transform tail-opacity-0 tail-scale-95"
          >
            <div
              v-if="show"
              class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-auto md:tail-w-full tail-rounded-md tail-shadow-lg tail-bg-white tail-tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none"
            >
              <div class="tail-py-1">
                <div class="tail-divide-y tail-divide-gray-100">
                  <a
                    href="#"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm'
                    ]"
                  >Received</a>
                </div>
                <div>
                  <a
                    href="#"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm'
                    ]"
                  >Sent</a>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div>
        <button type="button" class="base-button tail-gap-2" @click="openModal = true">
          <i class="ns-add"></i>
          <span class="tail-hidden sm:tail-block">new client</span>
        </button>
      </div>
    </div>
    <div class="tail-m-3 md:tail-mx-0 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child class="" />
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
      clients: false,
      show: false,
      active: true,
      openModal: false
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
a {
  color: rgba(143, 151, 166, 1);
}

.active {
  color: black
}

.active:focus {
  outline: none !important;
}
</style>
