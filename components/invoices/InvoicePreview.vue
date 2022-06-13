<template>
  <div class="lg:block lg:min-w-[448px] space-y-8">
    <p class="capitalize text-lg font-medium">
      preview
    </p>
    <section ref="preview" class="lg:w-[448px]">
      <ul
        class="tabs flex space-x-8 mb-6 pb-4 pl-4 border-b"
      >
        <button
          ref="emailBtn"
          class="tablinks"
          @click.prevent="switchTabs($event, 'Email')"
        >
          Email
        </button>
        <button ref="pdfBtn" class="tablinks" @click.prevent="switchTabs($event, 'PDF')">
          Invoice PDF
        </button>
      </ul>
      <!-- Tab contents -->
      <!-- email section -->
      <div id="Email" class="tabcontent">
        <containers-container-with-title class="">
          <template v-slot:headerbox>
            <span class="text-xl capitalize">
              {{ $auth.user.businessName }}
            </span>
          </template>
          <template v-slot:content>
            <div>
              <div class="grid grid-cols-2 pb-4">
                <div class="">
                  <p class="text-gray-500 text-base">
                    From
                  </p>
                  <p class="text-gray-700 font-medium">
                    {{ $auth.user.businessName }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-500 text-base">
                    To
                  </p>
                  <p
                    class="text-gray-700 font-medium capitalize"
                  >
                    {{ client ? client.firstName : "Client's name" }}
                  </p>
                </div>
              </div>
              <div
                class="rounded-xl bg-gray-100 border p-3"
              >
                <p class="pb-1 text-gray-500 text-base">
                  Amount
                </p>
                <p class="text-3xl text-gray-700 pb-2">
                  {{ getTotal | amount }}
                </p>
                <p class="text-sm text-gray-700">
                  Due on {{ dueDate | date }}
                </p>
              </div>
            </div>
            <div>
              <div v-if="items && items.length" class="space-y-5">
                <div
                  v-for="item in items"
                  :key="item._id"
                  class="flex justify-between items-center last:border-b last:pb-5"
                >
                  <div>
                    <p class="text-gray-700 font-medium capitalize">
                      {{ item.description }}
                    </p>
                    <p class="text-gray-500 text-sm">
                      Qty 1
                    </p>
                  </div>
                  <span class="text-gray-700 font-medium">{{
                    item.price | amount
                  }}</span>
                </div>
              </div>
              <div v-else class="text-center">
                <em>Please select a service</em>
              </div>
              <div class="flex justify-between py-3">
                <p class="text-gray-700 text-xl">
                  Total
                </p>
                <p class="text-lg font-bold text-gray-700">
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
              <h2 class="text-xl capitalize">
                {{ $auth.user.businessName }}
              </h2>
              <span v-if="Boolean($auth.user.phoneNumber)" class="text-sm">
                Tel: {{ $auth.user.phoneNumber }}
              </span>
            </div>
          </template>
          <template v-slot:content>
            <div>
              <div class="pb-4 space-y-1">
                <p class="text-gray-700 text-base capitalize">
                  Bill to
                </p>
                <p class="text-gray-700 text-base">
                  {{ client ? client.firstName : 'N/A' }}
                </p>
                <p class="text-gray-700 text-base">
                  {{ client ? client.email : '' }}
                </p>
              </div>
              <div class="grid grid-cols-2 pb-4">
                <div class="">
                  <p class="text-gray-500 text-sm">
                    Invoice date:
                  </p>
                  <p class="text-gray-500 text-sm">
                    {{ dueDate | date }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">
                    Due Date:
                  </p>
                  <p class="text-gray-500 text-sm">
                    {{ dueDate | date }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="space-y-5">
                <div class="grid grid-cols-4">
                  <p class="text-gray-500 uppercase text-xs">
                    description
                  </p>
                  <p
                    class="text-gray-500 uppercase text-xs justify-self-end"
                  >
                    qty
                  </p>
                  <p
                    class="text-gray-500 uppercase text-xs justify-self-end"
                  >
                    unit price
                  </p>
                  <p
                    class="text-gray-500 uppercase text-xs justify-self-end"
                  >
                    amount
                  </p>
                </div>
                <template v-if="items && items.length">
                  <div
                    v-for="item in items"
                    :key="item._id"
                    class="grid grid-cols-4 last:border-b last:pb-5"
                  >
                    <p class="text-gray-500 text-sm capitalize">
                      {{ item.description }}
                    </p>
                    <p
                      class="text-gray-500 text-sm justify-self-end"
                    >
                      {{ itemQuantity }}
                    </p>
                    <p
                      class="text-gray-500 text-sm justify-self-end"
                    >
                      {{ item.price }}
                    </p>
                    <p
                      class="text-gray-500 text-sm justify-self-end"
                    >
                      {{ item.price | amount }}
                    </p>
                  </div>
                </template>
                <div v-else class="text-center">
                  <em>
                    Please select a service
                  </em>
                </div>
              </div>
              <div class="flex justify-between py-3">
                <p class="text-gray-500 text-xl">
                  Total
                </p>
                <p class="text-lg font-bold text-gray-700">
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
    invoice: Object
  },
  data () {
    return {
      itemQuantity: 1,
      items: this.invoice.items,
      dueDate: this.invoice.dueDate,
      client: this.invoice.customerId
    }
  },
  computed: {
    getTotal () {
      if (this.items && this.items.length) {
        return this.items.reduce(
          (accumulator, current) => accumulator + (current.price * this.itemQuantity), 0
        )
      }
      return 0
    }
  },
  mounted () {
    this.$refs.emailBtn.click()
  },
  methods: {
    switchTabs (evt, tabId) {
      this.$refs.preview.children.Email.style.display = 'none'
      this.$refs.preview.children.PDF.style.display = 'none'

      this.$refs.emailBtn.classList.remove('active')
      this.$refs.pdfBtn.classList.remove('active')

      this.$refs.preview.children[tabId].style.display = 'block'
      evt.currentTarget.className += ' active'
    }
  }
}
</script>

<style lang="scss" scoped>
.tablinks {
  @apply text-base font-normal text-gray-400;
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
    @apply text-gray-700 font-normal;
    &::after {
      content: "";
      @apply bg-blue-500 h-1 w-full rounded-sm shadow-md absolute -bottom-4;
    }
  }
}
</style>
