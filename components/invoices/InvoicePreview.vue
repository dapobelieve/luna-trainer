<template>
  <div class="tail-hidden lg:tail-block lg:tail-min-w-[448px] tail-space-y-8">
    <p class="tail-capitalize tail-text-lg tail-font-medium">
      preview
    </p>
    <section class="lg:tail-w-[448px]">
      <ul
        class="tabs tail-flex tail-space-x-8 tail-mb-6 tail-pb-4 tail-pl-4 tail-border-b"
      >
        <button
          id="defaultOpen"
          class="tablinks"
          @click.prevent="switchTabs($event, 'Email')"
        >
          Email
        </button>
        <button class="tablinks" @click.prevent="switchTabs($event, 'PDF')">
          Invoice PDF
        </button>
      </ul>
      <!-- Tab contents -->
      <!-- email section -->
      <div id="Email" class="tabcontent">
        <containers-container-with-title class="">
          <template v-slot:headerbox>
            <span class="tail-text-xl tail-capitalize">
              getwelp limited
            </span>
          </template>
          <template v-slot:content>
            <div>
              <div class="tail-grid tail-grid-cols-2 tail-pb-4">
                <div class="">
                  <p class="tail-text-gray-500 tail-text-base">
                    From
                  </p>
                  <p class="tail-text-gray-700 tail-font-medium">
                    {{ $auth.user.businessName }}
                  </p>
                </div>
                <div>
                  <p class="tail-text-gray-500 tail-text-base">
                    To
                  </p>
                  <p
                    class="tail-text-gray-700 tail-font-medium tail-capitalize"
                  >
                    {{ client ? client.firstName : "Client's name" }}
                  </p>
                </div>
              </div>
              <div
                class="tail-rounded-xl tail-bg-gray-100 tail-border tail-p-3"
              >
                <p class="tail-pb-1 tail-text-gray-500 tail-text-base">
                  Amount
                </p>
                <p class="tail-text-3xl tail-text-gray-700 tail-pb-2">
                  {{ getTotal | amount }}
                </p>
                <p class="tail-text-sm tail-text-gray-700">
                  Due on {{ dueDate | date }}
                </p>
              </div>
            </div>
            <div>
              <div v-if="services.length" class="tail-space-y-5">
                <div
                  v-for="service in services"
                  :key="service._id"
                  class="tail-flex tail-justify-between tail-items-center last:tail-border-b last:tail-pb-5"
                >
                  <div>
                    <p class="tail-text-gray-700 tail-font-medium tail-capitalize">
                      {{ service.description }}
                    </p>
                    <p class="tail-text-gray-500 tail-text-sm">
                      Qty 1
                    </p>
                  </div>
                  <span class="tail-text-gray-700 tail-font-medium">{{
                    service.pricing.amount | amount
                  }}</span>
                </div>
              </div>
              <div v-else class="tail-text-center">
                <em>Please select a service</em>
              </div>
              <div class="tail-flex tail-justify-between tail-py-3">
                <p class="tail-text-gray-700 tail-text-xl">
                  Total
                </p>
                <p class="tail-text-lg tail-font-bold tail-text-gray-700">
                  {{ getTotal | amount }}
                </p>
              </div>
            </div>
          </template>
        </containers-container-with-title>
      </div>

      <!-- pdf section -->
      <div id="PDF" class="tabcontent">
        <containers-container-with-title class="">
          <template v-slot:headerbox>
            <div>
              <h2 class="tail-text-xl tail-capitalize">
                getwelp limited
              </h2>
              <span class="tail-text-sm">
                Tel: +44 000 000 0000
              </span>
            </div>
          </template>
          <template v-slot:content>
            <div>
              <div class="tail-pb-4 tail-space-y-1">
                <p class="tail-text-gray-700 tail-text-base tail-capitalize">
                  Bill to
                </p>
                <p class="tail-text-gray-700 tail-text-base">
                  {{ client ? client.firstName : 'N/A' }}
                </p>
                <p class="tail-text-gray-700 tail-text-base">
                  {{ client ? client.email : '' }}
                </p>
              </div>
              <div class="tail-grid tail-grid-cols-2 tail-pb-4">
                <div class="">
                  <p class="tail-text-gray-500 tail-text-sm">
                    Date of issue:
                  </p>
                  <p class="tail-text-gray-500 tail-text-sm">
                    {{ dueDate | date }}
                  </p>
                </div>
                <div>
                  <p class="tail-text-gray-500 tail-text-sm">
                    Due Date
                  </p>
                  <p class="tail-text-gray-500 tail-text-sm">
                    {{ dueDate | date }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="tail-space-y-5">
                <div class="tail-grid tail-grid-cols-4">
                  <p class="tail-text-gray-500 tail-uppercase tail-text-xs">
                    description
                  </p>
                  <p
                    class="tail-text-gray-500 tail-uppercase tail-text-xs tail-justify-self-end"
                  >
                    qty
                  </p>
                  <p
                    class="tail-text-gray-500 tail-uppercase tail-text-xs tail-justify-self-end"
                  >
                    unit price
                  </p>
                  <p
                    class="tail-text-gray-500 tail-uppercase tail-text-xs tail-justify-self-end"
                  >
                    amount
                  </p>
                </div>
                <template v-if="services.length">
                  <div
                    v-for="service in services"
                    :key="service._id"
                    class="tail-grid tail-grid-cols-4 last:tail-border-b last:tail-pb-5"
                  >
                    <p class="tail-text-gray-500 tail-text-sm tail-capitalize">
                      {{ service.description }}
                    </p>
                    <p
                      class="tail-text-gray-500 tail-text-sm tail-justify-self-end"
                    >
                      1
                    </p>
                    <p
                      class="tail-text-gray-500 tail-text-sm tail-justify-self-end"
                    >
                      {{ service.pricing.amount | amount }}
                    </p>
                    <p
                      class="tail-text-gray-500 tail-text-sm tail-justify-self-end"
                    >
                      {{ service.pricing.amount | amount }}
                    </p>
                  </div>
                </template>
                <div v-else class="tail-text-center">
                  <em>
                    Please select a service
                  </em>
                </div>
              </div>
              <div class="tail-flex tail-justify-between tail-py-3">
                <p class="tail-text-gray-500 tail-text-xl">
                  Total
                </p>
                <p class="tail-text-lg tail-font-bold tail-text-gray-700">
                  {{ getTotal | amount }}
                </p>
              </div>
            </div>
          </template>
        </containers-container-with-title>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'InvoicePreview',
  props: {
    services: Array,
    dueDate: [Date, String],
    client: Object
  },
  computed: {
    getTotal () {
      if (this.services.length) {
        return this.services.reduce(
          (accumulator, current) => accumulator + current.pricing.amount, 0
        )
      }
      return 0
    }
  },
  mounted () {
    document.getElementById('defaultOpen').click()
  },
  methods: {
    switchTabs (evt, cityName) {
      // Declare all variables
      let i, tabcontent, tablinks

      // Get all elements with class="tabcontent" and hide them
      // eslint-disable-next-line prefer-const
      tabcontent = document.getElementsByClassName('tabcontent')
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }

      // Get all elements with class="tablinks" and remove the class "active"
      // eslint-disable-next-line prefer-const
      tablinks = document.getElementsByClassName('tablinks')
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = 'block'
      evt.currentTarget.className += ' active'
    }
  }
}
</script>

<style lang="scss" scoped>
.tablinks {
  @apply tail-text-base tail-font-normal tail-text-gray-400;
}
.tabs {
  color: rgb(128, 123, 123);
}
.tabs button {
  transition: 0.3s;
}

button {
  position: relative;
  &.active {
    @apply tail-text-gray-700 tail-font-normal;
    &::after {
      content: "";
      @apply tail-bg-blue-500 tail-h-1 tail-w-full tail-rounded-sm tail-shadow-md tail-absolute tail--bottom-4;
    }
  }
}

.tabcontent {
  display: none;
}
</style>
