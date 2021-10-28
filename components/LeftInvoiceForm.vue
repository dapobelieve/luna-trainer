<template>
  <div class="w-12/12">
    <div class="border rounded grid gap-4 p-4 mb-4">
      <div>
        <div class="flex justify-between items-center">
          <h1 class="font-medium">
            Customer
          </h1>
          <a href="Clients" class="block" @click.prevent="openInviteModal=true">
            <div class="rounded-full mt-2 px-2 py-1 text-sm flex items-center">
              <i class="ns-plus rounded-full text-sm text-white p-1 primary-color" />
            </div>
          </a>
        </div>
      </div>
      <div>
        <gw-customer-selector v-model="invoice.client" :clients="allClients">
          <template v-slot:dropdownOption="{optionObject}">
            <div class="flex justify-between min-w-full items-center">
              <div class="flex content-center py-1">
                <ClientAvatar :width="2.3" :height="2.3" :client-info="optionObject" />
                <div class="flex flex-col ml-2 text-gray-700">
                  <p class="capitalize">
                    {{ optionObject.firstName }}
                  </p>
                  <small class="text-gray-500"> {{ optionObject.email }}</small>
                </div>
              </div>
              <div class="check">
                <i class="ns-check text-blue-500 text-lg"></i>
              </div>
            </div>
          </template>
        </gw-customer-selector>
        <!--        <p>{{invoice.client}}</p>-->
      </div>
    </div>

    <div class="border rounded gap-4 p-4">
      <div>
        <div class="flex justify-between items-center">
          <h1 class="font-medium mb-2">
            Services
          </h1>
          <a href="/Settings#services" class="block" alt="Add new service">
            <div class="rounded-full px-2 py-1 text-sm flex items-center">
              <i class="ns-plus rounded-full text-sm text-white p-1 primary-color" />
            </div>
          </a>
        </div>
        <template v-if="$auth.user.services">
          <gw-invoice-services-selector v-model="invoice.items" class="mt-4" :services="$auth.user.services" />
          <p>{{ invoice.items }}</p>
        </template>
      </div>
      <hr class="pt-5" />
      <div class="py-4">
        <input type="checkbox" class="p-2" />
        <span class="font-light">Value Added Tax (VAT)</span>
      </div>
      <div>
        <label for="dueDate" class="block font-light">Due date</label>
        <date-picker
          v-model="invoice.dueDate"
          style="width: 100% !important"
          class="w-full"
          :disabled-date="(date) => date < new Date()"
          value-type="format"
          placeholder="Select an appointment date"
        ></date-picker>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import { mapGetters } from 'vuex'
import GwCustomerSelector from './GwCustomerSelector.vue'

export default {
  name: 'LeftInvoiceForm',
  components: { DatePicker, GwCustomerSelector },
  data () {
    return {
      isLoading: false,
      openInviteModal: false,
      invoice: this.value
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    })
  },
  props: {
    value: Object
  }
}
</script>
