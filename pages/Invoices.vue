<template>
  <div
    class="lg:tail-pl-14 lg:tail-mr-4 md:tail-px-4 lg:tail-pr-0 md:tail-mt-3 tail-border md:tail-border-none tail-w-full"
  >
    <div
      style="top: 72px"
      class="tail-sticky tail-flex tail-items-center md:tail-rounded-md tail-bg-white tail-px-4 tail-py-3"
    >
      <div
        class="tail-mr-auto tail-text-sm md:tail-text-2xl tail-flex tail-gap-3"
      >
        Invoices
        <!-- <NuxtLink exact-active-class="active" :to="{name: 'Clients-Classes'}">
          Classes <span class="">(3)</span>
        </NuxtLink> -->
      </div>
      <div class="relative inline-block text-left">
        <div class="tail-mr-2 md:tail-mr-5 tail-relative">
          <div
            class="tail-inline-flex tail-justify-items-start tail-w-full tail-rounded-md tail-border tail-border-gray-300 tail-shadow-sm tail-px-3 md:tail-pl-4 md:tail-pr-2 tail-py-1 md:tail-py-2 tail-bg-white tail-text-sm tail-font-medium hover:tail-bg-gray-50 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-offset-gray-100 focus:tail-ring-indigo-500"
            role="button"
            @click.prevent="openDropDown = !openDropDown"
          >
            <span class="tail-hidden md:tail-block">All Invoices</span>
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
              v-if="openDropDown"
              class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-auto md:tail-w-full tail-rounded-md tail-shadow-lg tail-bg-white tail-tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none"
            >
              <div class="tail-py-1">
                <div class="tail-divide-y tail-divide-gray-100">
                  <!-- <NuxtLink
                    :to="{ name: 'Clients' }"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm'
                    ]"
                  >
                    Received
                  </NuxtLink> -->
                  <button
                    type="button"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm',
                      'tail-w-full'
                    ]"
                  >
                    All invoices
                  </button>
                </div>
                <div>
                  <!-- <NuxtLink
                    :to="{ name: 'Clients-InvitedInvites' }"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm'
                    ]"
                  >
                    Sent
                  </NuxtLink> -->
                  <button
                    type="button"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm',
                      'tail-w-full'
                    ]"
                    @click="goToInvites"
                  >
                    Sent
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- <button
          type="button"
          class="base-button tail-gap-2"
        >
          <i class="ns-download"></i>
          <span class="tail-hidden sm:tail-block">export</span>
        </button> -->
      <div>
        <button type="button" class="base-button tail-gap-2">
          <i class="ns-add"></i>
          <span class="tail-hidden sm:tail-block">new invoice</span>
        </button>
      </div>
    </div>
    <div class="tail-m-3 md:tail-mx-0 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <div
        class="tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-flex tail-items-center"
      >
        <div class="tail-flex tail-mr-auto">
          <!-- <ClientAvatar
            :firstname="client.firstName"
            :lastname="client.lastName"
          /> -->
          <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
            <h3 class="tail-capitalize tail-font-semibold">
              <!-- {{ client.firstName }} {{ client.lastName }} -->
              maison maison
            </h3>
            <div class="tail-flex tail-items-center">
              <div>
                <img
                  class="tail-bg-green-700 tail-rounded-full"
                  src="~/assets/img/dog-paw.svg"
                  alt="dog paw"
                />
              </div>
              <span
                class="tail-capitalize tail-ml-1 tail-text-gray-500 tail-truncate"
              >
                <!-- {{ client.location.point }}, {{ client.city }}. -->
              </span>
            </div>
            <!-- <div>
            <div class="tail-flex tail-items-center">
              <span class="tail-text-gray-500">2 new updates</span>
            </div>
          </div> -->
          </div>
        </div>

        <div class="">
          <div class="tail-flex tail-gap-3">
            <button
              type="button"
              class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
            >
              <i class="ns-refresh"></i>
              <span class="tail-capitalize tail-ml-1">resend</span>
            </button>
            <!-- <button
              type="button"
              class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
            >
              <i class="ns-comment-alt"></i>
              <span class="tail-capitalize tail-ml-1">message</span>
            </button> -->
            <!-- <button
            class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          >
            <i class="ns-calendar"></i>
            <span class="tail-capitalize tail-ml-1">create session</span>
          </button> -->
            <button
              class="tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
            >
              <i class="ns-menu-dots"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal> -->
  </div>
</template>

<script>
export default {
  name: 'Invoices',
  data () {
    return {
      openDropDown: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
