<template>
  <div class="tail-flex tail-flex-col lg:tail-flex-row lg:tail-space-x-10">
    <!-- invoice builder -->
    <containers-container-with-title class="lg:tail-min-w-[448px]">
      <template v-slot:headerbox>
        <span class="tail-text-xl tail-capitalize">
          client
        </span>
        <button type="button" @click="$modal.show('inviteClientModal')">
          <img
            class="tail-h-4"
            src="~/assets/img/svgs/plus-icon.svg"
            alt=""
            srcset=""
          />
        </button>
        <modal name="inviteClientModal" height="auto" :adaptive="true">
          <InviteNewClient class="tail-m-6" @close="$modal.hide('inviteClientModal')" />
        </modal>
      </template>
      <template v-slot:content>
        <!-- this portion will hold component for fetching client -->
        <!-- TODO:: import selector component here -->
        <!-- end of portion -->
        <div class="tail-flex tail-items-center tail-justify-between">
          <p class="tail-capitalize tail-text-xl tail-font-normal">
            invoice service &amp; items
          </p>
          <button type="button" @click="$modal.show('add-service-modal')">
            <img
              class="tail-h-4"
              src="~/assets/img/svgs/plus-icon.svg"
              alt=""
              srcset=""
            />
          </button>
        </div>
        <div class="tail-space-y-6">
          <div class="tail-flex tail-flex-col tail-space-y-2">
            <!-- this portion will hold component for fetching servuces -->
            <!-- TODO:: import selector component here -->
            <!-- end of portion -->
            <div
              class="tail-rounded-xl tail-border tail-bg-gray-50 tail-py-4 tail-px-3 tail-space-y-3"
            >
              <div
                v-for="service in selectedServices"
                :id="service.id"
                :key="service.id"
                class="tail-flex tail-justify-between tail-items-center"
              >
                <div
                  class="tail-max-w-[180px] md:tail-max-w-[500px] lg:tail-max-w-[300px]"
                >
                  <p class="tail-font-medium">
                    {{ service.title }}
                  </p>
                  <p class="tail-text-xs tail-truncate">
                    {{ service.description }}
                  </p>
                </div>
                <div class="tail-flex tail-items-center tail-space-x-2">
                  <span> {{ 60 | amount }} </span>
                  <div class="tail-relative">
                    <button @click="showDropDown = !showDropDown">
                      <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
                    </button>
                    <!-- dropdown menu -->
                    <div
                      v-show="showDropDown"
                      class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
                    >
                      <div class="tail-py-2" role="none">
                        <button
                          type="button"
                          class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                          @click="editServiceItem(service.id)"
                        >
                          Edit
                        </button>
                        <a
                          href="#"
                          class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
                        >Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input type="checkbox" class="tail-p-2" />
            <span class="tail-font-light">Value Added Tax (VAT)</span>
          </div>
          <div>
            <label
              for="dueDate"
              class="tail-block tail-text-base tail-font-normal tail-text-gray-700 tail-capitalize"
            >Due date</label>
            <date-picker
              v-model="dueDate"
              style="width: 100% !important"
              class="tail-w-full"
              :disabled-date="date => date < new Date()"
              value-type="format"
              placeholder="Select a due date for this invoice"
            ></date-picker>
          </div>
        </div>
        <div
          class="tail-flex tail-justify-end tail-space-x-6 lg:tail-space-x-0"
        >
          <button type="button" class="button-outline lg:tail-hidden">
            preview
          </button>
          <button-spinner
            :loading="isLoading"
            :disabled="true"
            type="button"
            style="width:fit-content"
          >
            send invoice
          </button-spinner>
        </div>
      </template>
    </containers-container-with-title>

    <!-- modal -->
    <modal name="add-service-modal" height="auto" :adaptive="true">
      <creating-invoice-new-service
        class="tail-m-6"
        :selected-service-index="selectedServiceProps"
        @clearSelectedServiceIndex="selectedServiceProps = $event"
        @close-modal="$modal.hide('add-service-modal')"
      />
    </modal>

    <!-- divider -->
    <span
      class="tail-hidden lg:tail-block tail-bg-gray-200 tail-w-[1px]"
    ></span>

    <!-- invoice previews -->
    <invoices-invoice-preview />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'NewInvoice',
  components: { DatePicker },
  layout: 'invoice',
  data () {
    return {
      isLoading: false,
      dueDate: new Date(),
      showDropDown: false,
      selectedServiceProps: null,
      selectedServices: [
        {
          id: 1,
          title: 'Service one',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates praesentium necessitatibus iste sequi perferendis! Quidem harumaccusamus vero sunt at.'
        },
        {
          id: 2,
          title: 'Service one',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates praesentium necessitatibus iste sequi perferendis! Quidem harumaccusamus vero sunt at.'
        },
        {
          id: 3,
          title: 'Service one',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates praesentium necessitatibus iste sequi perferendis! Quidem harumaccusamus vero sunt at.'
        },
        {
          id: 4,
          title: 'Service one',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates praesentium necessitatibus iste sequi perferendis! Quidem harumaccusamus vero sunt at.'
        }
      ]
    }
  },
  methods: {
    editServiceItem (id) {
      console.log('id ', id)
      this.selectedServiceProps = id - 1
      this.$modal.show('add-service-modal')
    }
  }
}
</script>

<style lang="scss" scoped></style>
