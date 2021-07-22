<template>
  <div class="tail-bg-white tail-grid tail-gap-4">
    <div>
      <label
        class="tail-block tail-font-medium tail-text-gray-500 tail-text-sm"
      >
        Client
      </label>
      <div class="tail-flex ">
        <div class=" tail-w-full">
          <div class="tail-flex">
            <div class="tail-w-full">
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
                  <div class="option__desc tail-flex tail-items-center">
                    <ClientAvatar
                      :firstname="props.option.firstName"
                      :lastname="props.option.lastName"
                      :width="3"
                      :height="3"
                    />
                    <div>
                      <span
                        class="option__title tail-pl-2"
                      >{{ props.option.firstName }}
                        {{ props.option.lastName }}</span>
                      |
                      <span
                        class="option__title tail-pl-2"
                      >{{ props.option.location.address }}
                      </span>
                      <div class="tail-pl-2 tail-break-words">
                        {{ props.option.email }}
                      </div>
                    </div>
                  </div>
                </template>

                <template slot="option" slot-scope="props">
                  <div class="option__desc">
                    <span class="option__title">{{
                      props.option.firstName
                    }}</span><span class="option__small tail-pl-2">{{
                      props.option.lastName
                    }}</span>
                  </div>
                </template>
              </multiselect>
            </div>
          </div>
          <p class="tail-text-red-500 tail-text-xs tail-italic">
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
      <label class="block tail-text-sm tail-text-gray-500 font-medium">
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
          class="tail-w-full"
        >
        </multiselect>
        <p class="tail-text-red-500 tail-text-xs">
          <template
            v-if="$v.selectedService.$error && !$v.selectedService.required"
          >
            Please select a service.
          </template>
        </p>
      </div>
    </div>
    <div class="">
      <label for="dueDate" class="tail-block tail-font-light">Due date</label>
      <date-picker
        v-model="$v.selectedDate.$model"
        style="width: 100% !important"
        class="tail-w-full"
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
      <p class="tail-text-red-500 tail-text-xs tail-italic">
        <template v-if="$v.selectedDate.$error && !$v.selectedDate.required">
          Please select a date.
        </template>
      </p>
    </div>
    <div>
      <label
        class="tail-block tail-text-sm tail-font-medium tail-text-gray-500"
      >
        Total Invoie amount
      </label>
      <div class="tail-mt-1">£ {{ selectedPrice | amount }}</div>
    </div>
    <div class="tail-flex tail-justify-center">
      <button
        :disabled="isLoading"
        class="base-button"
        @click.prevent="createInvoice"
      >
        <SingleLoader v-if="isLoading" class="tail-mr-2" />
        {{ isLoading ? "Creating Invoice..." : "Create Invoice" }}
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
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
      allClients: 'client/getAllClients'
    }),
    acceptedClients () {
      return this.allClients.filter(c => c.status === 'accepted')
    },
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
          items: this.selectedService.map(item => ({
            service: item._id,
            price: item.pricing && item.pricing.amount,
            qty: 1
          }))
        })
          .then((result) => {
            if (result.status === 'success') {
              this.$toast.success('Invoice created successfully', {
                position: 'bottom-right'
              })
              this.fetchInvoices()
              this.$emit('close', false)
            }
          })
          .catch((err) => {
            if (err.response) {
              this.$toast.error(
                `Something went wrong: ${err.response.data.message}`,
                { position: 'bottom-right' }
              )
            } else if (err.request) {
              this.$toast.error('Something went wrong. Try again', {
                position: 'bottom-right'
              })
            } else {
              this.$toast.error(`Something went wrong: ${err.message}`, {
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
<style lang="scss">
/* .multiselect__tag,
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: rgb(86, 204, 242) !important;
}

 .multiselect__tag-icon:after,
.multiselect__tag-icon:after:hover {
  color: rgb(86, 204, 242) !important;
}
.multiselect__tag-icon:after {
  color: rgb(86, 204, 242) !important;
} */
</style>
