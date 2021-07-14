<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        Invoices
      </template>
      <template v-slot:buttons>
        <div>
          <div class="tail-relative">
            <button
              type="button"
              class="tail-bg-white tail-relative tail-w-full tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-pl-3 tail-pr-10 tail-py-2 tail-text-left focus:tail-outline-none focus:tail-ring-1 sm:tail-text-sm"
              aria-labelledby="listbox-label"
              aria-expanded="true"
              aria-haspopup="listbox"
              @click="openDropDown = !openDropDown"
            >
              <span class="tail-block tail-capitalize">
                {{ current }}
              </span>
              <span class="tail-absolute tail-inset-y-0 tail-right-0 tail-flex tail-items-center tail-pr-2 tail-pointer-events-none">
                <i class="ns-caret-down tail-text-lg"></i>
              </span>
            </button>
            <transition
              leave-active-class="tail-transition tail-ease-in tail-duration-100"
              leave-from-class="tail-opacity-100"
              leave-to-class="tail-opacity-0"
            >
              <ul
                v-if="openDropDown"
                class="tail-absolute tail-z-10 tail-mt-1 tail-w-full tail-bg-white tail-shadow-lg tail-max-h-60 tail-rounded-md tail-py-1 tail-text-base tail-ring-1 tail-ring-black tail-ring-opacity-5 tail-overflow-auto focus:tail-outline-none sm:tail-text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <li id="listbox-option-0" class="tail-text-gray-900 tail-cursor-pointer tail-select-none tail-relative tail-py-2 tail-pl-3 tail-pr-9" role="option">
                  <span
                    class="tail-font-normal tail-block tail-truncate"
                    @click="goTo('Draft')"
                  >
                    Draft
                  </span>
                </li>
                <li id="listbox-option-0" class="tail-text-gray-900 tail-cursor-pointer tail-select-none tail-relative tail-py-2 tail-pl-3 tail-pr-9" role="option">
                  <span
                    class="tail-font-normal tail-block tail-truncate"
                    @click="goTo('Paid')"
                  >
                    Paid
                  </span>
                </li>
                <li id="listbox-option-0" class="tail-text-gray-900 tail-cursor-pointer tail-select-none tail-relative tail-py-2 tail-pl-3 tail-pr-9" role="option">
                  <span
                    class="tail-font-normal tail-block tail-truncate"
                    @click="goTo('Sent')"
                  >
                    Sent
                  </span>
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <button type="button" class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="openModal = true">
          <i class="ns-plus tail-text-white tail-text-lg"></i>
        </button>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-tail-text-sm tail-font-medium tail-text-white tail-bg-white hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2">
          <i class="ns-download tail-mr-2 tail-text-black tail-text-sm"></i>
          <span class="tail-text-black tail-text-sm">Export</span>
        </button>
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child />
    </div>
    <Modal status="Create New Invoice" :input-width="30" :is-open="openModal" @close="openModal = $event">
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'Invoices',
  data () {
    return {
      openDropDown: false,
      active: true,
      openModal: false,
      current: 'draft'
    }
  },
  head () {
    return {
      title: 'All Invoices'
    }
  },
  methods: {
    goTo (link) {
      this.$router.push({
        name: link === 'Draft' ? 'Invoices' : `Invoices-${link}`
      })
      this.current = link
      this.openDropDown = false
    }
  }
}
</script>
