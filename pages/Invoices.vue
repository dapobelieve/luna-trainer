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
      </div>
      <div class="tail-mr-2 md:tail-mr-5 tail-relative inline-block text-left">
          <div
            class="outline-button"
            role="button"
            @click.prevent="openDropDown = !openDropDown"
          >
            <span class="tail-hidden sm:tail-block">All Invoices</span>
            <i class="ns-caret-down sm:tail-text-xl" aria-hidden="true"></i>
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
      <div class="tail-mr-2 md:tail-mr-5">
        <button type="button" class="outline-button tail-gap-2">
          <i class="ns-download"></i>
          <span class="tail-hidden sm:tail-block">export</span>
        </button>
      </div>
      <div>
        <button type="button" class="base-button tail-gap-2">
          <i class="ns-add"></i>
          <span class="tail-hidden sm:tail-block">new invoice</span>
        </button>
      </div>
    </div>
    <div class="tail-m-3 md:tail-mx-0 tail-pb-14 lg:tail-pb-10 tail-mt-4 tail-h-full">
      <div class="tail-flex tail-flex-row tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center">
        <div class="tail-mr-auto tail-text-left tail-font-semibold tail-text-gray-400 tail-uppercase tail-tracking-wider">
          Name
        </div>
        <div class="tail-mr-auto tail-text-left tail-font-semibold tail-text-gray-400 tail-uppercase tail-tracking-wider">
          Invoice #
        </div>
        <div class="tail-mr-auto tail-text-left tail-font-semibold tail-text-gray-400 tail-uppercase tail-tracking-wider">
          Created
        </div>
        <div class="tail-mr-auto tail-text-left tail-font-semibold tail-text-gray-400 tail-uppercase tail-tracking-wider">
          Amount
        </div>
        <div class="tail-mr-auto tail-text-left tail-font-semibold tail-text-gray-400 tail-uppercase tail-tracking-wider">
          Status
        </div>
      </div>

      <div class="tail-flex tail-flex-row tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center">
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-flex tail-items-center">
            <div class="tail-flex-shrink-0 tail-h-10 tail-w-10">
              <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
            </div>
            <div class="tail-ml-4">
              <div class="tail-font-medium">Jane Cooper</div>
            </div>
          </div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">039211224</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">Friday 30 April, 2021</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-semibold">£60</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <span class="tail-px-4 tail-py-1 tail-rounded-full tail-bg-gray-100 tail-text-gray-500 tail-text-sm tail-font-light">Draft</span>
        </div>
      </div>

      <div class="tail-flex tail-flex-row tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center">
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-flex tail-items-center">
            <div class="tail-flex-shrink-0 tail-h-10 tail-w-10">
              <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
            </div>
            <div class="tail-ml-4">
              <div class="tail-font-medium">Jane Cooper</div>
            </div>
          </div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">039211224</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">Friday 30 April, 2021</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-semibold">£60</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <span class="tail-px-4 tail-py-1 tail-rounded-full tail-bg-gray-100 tail-text-gray-500 tail-text-sm tail-font-light">Draft</span>
        </div>
      </div>

      <div class="tail-flex tail-flex-row tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center">
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-flex tail-items-center">
            <div class="tail-flex-shrink-0 tail-h-10 tail-w-10">
              <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
            </div>
            <div class="tail-ml-4">
              <div class="tail-font-medium">Jane Cooper</div>
            </div>
          </div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">039211224</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-normal">Friday 30 April, 2021</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <div class="tail-font-semibold">£60</div>
        </div>
        <div class="tail-mr-auto tail-whitespace-nowrap">
          <span class="tail-px-4 tail-py-1 tail-rounded-full tail-bg-gray-100 tail-text-gray-500 tail-text-sm tail-font-light">Draft</span>
        </div>
      </div>
    </div>
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
