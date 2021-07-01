<template>
  <div class="tail-grid tail-gap-8 tail-grid-cols-1">
    <div class="left-card">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="tail-border tail-rounded tail-p-4">
          <div>
            <div class="tail-py-2">
              <h1 class="tail-font-medium">
                Customer
              </h1>
            </div>
            <div class="tail-pb-4">
              <span class="tail-text-gray-400">A short description about this section</span>
            </div>
          </div>
          <div class="tail-pb-8">
            <label for="email" class="">Name</label>
            <input
              v-if="customerId"
              style="cursor: not-allowed"
              disabled
              :value="`${$route.params.client.firstName} ${$route.params.client.lastName}`"
              type="email"
              class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            >
            <template v-else-if="!customerId && clients.length">
              <select v-model="invoiceDetails.selectedClient" class="tail-block tail-w-full tail-border tail-border-gray-400 tail-rounded-md tail-p-2">
                <option v-for="client in clients" :key="client.id" value="">
                  {{ client }}
                </option>
              </select>
            </template>
            <template v-else>
              <button class="base-button tail-mt-1">
                Invite a client
              </button>
              <small style="color: red" class="tail-text-center">
                <em>You have no clients, please invite one</em>
              </small>
            </template>
          </div>
          <div v-if="clients.length" class="">
            <label for="email" class="">Email Address</label>
            <input style="cursor: not-allowed" disabled :value="$store.state.authorize.getWelpUser.email" type="email" class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div class="tail-border tail-rounded tail-p-4">
          <div>
            <div class="tail-py-2">
              <h1>Services</h1>
            </div>
            <div class="tail-pb-8">
              <span class="tail-text-gray-500">A short description about this section</span>
            </div>
          </div>
          <div class="tail-pb-4">
            <label for="item" class="">Select a service</label>
            <template v-if="$store.state.authorize.getWelpUser.services && $store.state.authorize.getWelpUser.services.length">
              <select v-model="invoiceDetails.selectedService" class="tail-block tail-w-full tail-border tail-border-gray-400 tail-rounded-md tail-p-2">
                <option v-for="service in $store.state.authorize.getWelpUser.services" :key="service.id" value="">
                  {{ service.appointmentType }}
                </option>
              </select>
            </template>
            <template v-else>
              <button class="base-button tail-mt-1" @click.prevent="$router.push({ name: 'Settings' })">
                Add a service
              </button>
              <small style="color: red" class="tail-text-center">
                <em>You have no services, add some.</em>
              </small>
            </template>
          </div>
          <!-- <div class="tail-border tail-p-4 tail-rounded">
            <div class="tail-flex tail-justify-between tail-p-2">
              <div>
                <input type="checkbox" class="tail-p-2">
                <span class="tail-text-sm">Behaviour Consuming</span>
              </div>
              <div>
                <span>£60</span>
              </div>
            </div>
            <div class="tail-flex tail-justify-between tail-p-2 tail-py-4">
              <div class="">
                <input type="checkbox" class="tail-p-2">
                <span class="tail-text-sm">Milage</span>
              </div>
              <div>
                <span>£40</span>
              </div>
            </div>
            <button @click.prevent="addItem = true">
              <div class="tail-flex tail-p-2">
                <div>
                  <i class="ns-plus tail-text-blue-600" />
                </div>
                <div>
                  <span class="tail-text-sm tail-text-blue-600">Add new item</span>
                </div>
              </div>
            </button>
          </div> -->
          <div v-if="$store.state.authorize.getWelpUser.services && $store.state.authorize.getWelpUser.services.length" class="tail-border tail-rounded tail-mt-4">
            <div class="tail-p-2">
              <div class="tail-flex tail-justify-between tail-py-2">
                <div>
                  <p><strong>Behaviour Consuming</strong></p>
                  <p class="tail-text-gray-500">
                    Qty <span>1</span>
                  </p>
                </div>
                <button @click.prevent="editItem = true">
                  <div class="tail-p-3">
                    <span>£60</span>
                    <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                  </div>
                </button>
              </div>
              <div class="tail-flex tail-justify-between tail-py-4">
                <div>
                  <p><strong>Milage</strong></p>
                  <p class="tail-text-gray-500">
                    Qty <span>1</span>
                  </p>
                </div>
                <button @click.prevent="editItem = true">
                  <div class="tail-p-3">
                    <span>£10</span>
                    <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="tail-pt-5">
            <hr />
          </div>
          <div class="tail-py-4">
            <input type="checkbox" class="tail-p-2">
            <span>Value Added Tax (VAT)</span>
          </div>
          <div class="">
            <label for="dueDate" class="tail-block">Due date</label>
            <!-- <input type="date" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"> -->
            <date-picker
              v-model="date"
              class="tail-w-full"
              :disabled-date="
                (date) => {
                  if (date < new Date()) {
                    return true
                  }
                  return false
                }
              "
              value-type="format"
              placeholder="Select an appointment date"
            ></date-picker>
          </div>
          <!-- <div class="tail-py-8">
            <label for="options" class="">Payment Options</label>
            <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div> -->
        </div>
        <button class="primary-color tail-border tail-rounded tail-text-white tail-p-2">
          Save Invoice
        </button>
      </form>
    </div>
    <Modal :is-open="addItem" @close="addItem = $event">
      <AddItem @close="addItem = $event" />
    </Modal>
    <Modal :is-open="editItem" @close="editItem = $event">
      <EditItem @close="editItem = $event" />
    </Modal>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'LeftInvoiceForm',
  components: { DatePicker },
  props: {
    clients: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      addItem: false,
      editItem: false,
      customerId: this.$route.params.client.userId || 0,
      date: new Date().toISOString().substring(0, 10),
      invoiceDetails: {
        selectedClient: '',
        selectedService: ''
      }
    }
  }
}
</script>
<style scoped>
.left-card {
  width: 26.25rem;
}
</style>
