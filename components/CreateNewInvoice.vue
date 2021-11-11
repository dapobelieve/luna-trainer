<template>
  <div class="bg-white grid gap-4">
    <div>
      <label
        class="block font-medium text-gray-500 text-sm"
      >
        Client
      </label>
      <div class="flex ">
        <div class=" w-full">
          <div class="flex">
            <div class="w-full">
              <multiselect
                v-model="$v.selectedClient.$model"
                track-by="firstName"
                label="firstName"
                placeholder="Select a client"
                :options="acceptedClients"
                :option-height="104"
                :show-labels="false"
              >
                <template
                  slot="singleLabel"
                  slot-scope="props"
                >
                  <div class="option__desc flex items-center">
                    <ClientAvatar
                      :client-info="props.option"
                      :width="4"
                      :height="4"
                    />
                    <div>
                      <span
                        class="option__title pl-2"
                      >{{ props.option.firstName }}
                        {{ props.option.lastName }}</span>
                      |
                      <span
                        class="option__title pl-2"
                      >{{ props.option.location }}
                      </span>
                      <div class="pl-2 break-words">
                        {{ props.option.email }}
                      </div>
                    </div>
                  </div>
                </template>
                <template slot="option" slot-scope="props">
                  <div class="option__desc">
                    <span class="option__title">{{
                      props.option.firstName
                    }}</span><span class="option__small pl-2">{{
                      props.option.lastName
                    }}</span>
                  </div>
                </template>
              </multiselect>
            </div>
          </div>
          <p class="text-gray-500 text-xs italic">
            <template
              v-if="$v.selectedClient.$error && !$v.selectedClient.required"
            >
              Please select a client.
            </template>
          </p>
        </div>
      </div>
    </div>
    <div>
      <label class="block text-sm text-gray-500 font-medium">
        Session Description
      </label>
      <div>
        <multiselect
          v-model="$v.selectedService.$model"
          label="description"
          track-by="description"
          placeholder="Select a service"
          :options="services"
          :multiple="true"
          :searchable="true"
          :internal-search="false"
          :clear-on-select="false"
          :close-on-select="false"
          :options-limit="300"
          :limit="3"
          :max-height="600"
          :show-no-results="false"
          :hide-selected="true"
          class="w-full"
        >
        </multiselect>
        <p class="text-gray-500 text-xs">
          <template
            v-if="$v.selectedService.$error && !$v.selectedService.required"
          >
            Please select a service.
          </template>
        </p>
      </div>
    </div>
    <div class="">
      <label for="dueDate" class="block font-light">Due date</label>
      <date-picker
        v-model="$v.selectedDate.$model"
        style="width: 100% !important"
        class="w-full"
        :disabled-date="
          date => {
            if (date < new Date()) {
              return true;
            }
            return false;
          }
        "
        value-type="format"
        placeholder="Select an appointment date"
      ></date-picker>
      <p class="text-gray-500 text-xs italic">
        <template v-if="$v.selectedDate.$error && !$v.selectedDate.required">
          Please select a date.
        </template>
      </p>
    </div>
    <div>
      <label
        class="block text-sm font-medium text-gray-500"
      >
        Total Invoice amount
      </label>
      <div class="mt-1">
        {{ selectedPrice | amount }}
      </div>
    </div>
    <div class="flex justify-center">
      <button
        :disabled="isLoading"
        class="base-button"
        @click.prevent="createInvoice"
      >
        <SingleLoader v-if="isLoading" class="mr-2" />
        {{ isLoading ? "Creating Invoice..." : "Create Invoice" }}
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreateNewInvoice',
  components: { Multiselect, DatePicker },
  data () {
    return {
      isLoading: false,
      selectedClient: null,
      selectedService: [],
      selectedDate: new Date().toISOString().substring(0, 10)
    }
  },
  validations: {
    selectedClient: {
      required
    },
    selectedService: {
      required
    },
    selectedDate: {
      required
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients'
    }),
    services () {
      return this.$auth.user.services || []
    },
    // eslint-disable-next-line vue/return-in-computed-property
    selectedPrice () {
      // eslint-disable-next-line curly
      if (this.selectedService && this.selectedService.length) {
        return this.selectedService.reduce(
          (accumulator, current) => accumulator + current.pricing.amount,
          0
        )
      }
      return 0
    }
  },
  methods: {
    ...mapActions({
      sendInvoice: 'invoice/createInvoice',
      fetchInvoices: 'invoice/getInvoices'
    }),
    createInvoice () {
      if (
        !this.$v.selectedClient.$invalid &&
        !this.$v.selectedService.$invalid &&
        !this.$v.selectedDate.$invalid
      ) {
        this.isLoading = true
        this.sendInvoice({
          customerId: this.selectedClient._id,
          dueDateEpoch: new Date(this.selectedDate).getTime() / 1000,
          dueDate: new Date(this.selectedDate),
          items: this.selectedService.map(item => ({ service: item._id, price: item.pricing && item.pricing.amount, qty: 1 }))
        })
          .then((result) => {
            if (result.status === 'success') {
              this.$gwtoast.success('Invoice created successfully', {
                position: 'bottom-right'
              })
              this.fetchInvoices()
              this.$emit('close', false)
            }
          })
          .catch((err) => {
            if (err.response) {
              this.$gwtoast.error(
                `Something went wrong: ${err.response.data.message}`,
                { position: 'bottom-right' }
              )
            } else if (err.request) {
              this.$gwtoast.error('Something went wrong. Try again', {
                position: 'bottom-right'
              })
            } else {
              this.$gwtoast.error(`Something went wrong: ${err.message}`, {
                position: 'bottom-right'
              })
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
}
</script>
