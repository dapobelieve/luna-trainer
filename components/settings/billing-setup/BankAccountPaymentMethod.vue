<template>
  <div class="flex justify-between items-center mb-8">
    <div :class="{ 'opacity-50': disabled }">
      <p class="text-lg font-medium text-gray-700 mb-1">
        {{ connected ? "Update" : "Setup" }} Bank Information
      </p>
      <p class="text-sm font-normal text-gray-500">
        Brief description about this feature
      </p>
      <p v-if="connected" class="mt-4 text-sm font-medium text-gray-700">
        **** **** {{ bankAccount.accountNo.substr(-0, 4) }}
      </p>
    </div>
    <div>
      <button
        v-if="!connected"
        class="button-outline flex items-center"
        @click.prevent="$modal.show('payment-method-bank-account')"
      >
        <i role="button" class="fi-rr-bank mr-2 text-blue-500 h-5 w-5"></i>
        <span class="text-base font-medium">{{
          connected ? "Edit Details" : "Setup"
        }}</span>
      </button>
      <div v-else class="flex space-x-4 items-start">
        <span v-if="isDefault" class="tag">
          Default
        </span>
        <span v-if="disabled" class="tag disabled">
          Disabled
        </span>
        <SingleLoader v-if="loading" />
        <dropdown
          v-if="!loading"
          :primary-action-text="connected ? 'Edit' : 'Add'"
          :disabled="disabled"
          @action="$modal.show('payment-method-bank-account')"
          @enable="enable"
          @disable="disable"
          @default="setAsDefault"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from './Dropdown.vue'

export default {
  name: 'BankAccountPaymentMethod',
  components: { Dropdown },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('payment-methods', {
      paymentMethod: 'getBankAccountPaymentMethod'
    }),
    bankAccount () {
      return this.paymentMethod.bank || {}
    },
    connected () {
      return this.bankAccount.accountNo
    },
    isDefault () {
      return this.paymentMethod.isDefault
    },
    disabled () {
      return this.paymentMethod.disabled
    }
  },
  methods: {
    ...mapActions({
      enablePaymentMethod: 'payment-methods/enablePaymentMethod',
      disablePaymentMethod: 'payment-methods/disablePaymentMethod',
      setDefaultPaymentMethod: 'payment-methods/setDefaultPaymentMethod'
    }),
    async enable (e) {
      try {
        this.loading = true
        await this.enablePaymentMethod(this.paymentMethod._id)
      } catch (error) {
        this.$lunaToast.error('Unable to disable payment')
      }
      this.loading = false
    },
    async setAsDefault () {
      try {
        this.loading = true
        await this.setDefaultPaymentMethod(this.paymentMethod._id)
      } catch (error) {
        console.log(error)
        this.$lunaToast.error('Unable to disable payment')
      }
      this.loading = false
    },
    async disable () {
      try {
        this.loading = true
        await this.disablePaymentMethod(this.paymentMethod._id)
      } catch (error) {
        this.$lunaToast.error('Unable to disable payment')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
