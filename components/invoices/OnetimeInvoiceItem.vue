<template>
  <div class="m-5">
    <div class="flex justify-between items-center">
      <h5 class="text-2xl text-gray-700">
        <slot name="title">
          {{'Add one-time item' }}
        </slot>
      </h5>
      <button type="button" @click="$emit('close')">
        <i class="fi-rr-cross text-sm text-blue-500"></i>
      </button>
    </div>
    <form class="flex flex-col gap-6 mt-8">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Description</label>
        <input
          id="service"
          v-model="service.description"
          autofocus
          placeholder="Separation Anxiety (Replace this description)"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
 
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="relative flex">
          <div
            class="inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-white h-10 border shadow-sm rounded-l-md border-r-0"
          >
            <span class="text-gray-500">{{ $auth.user.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="service.pricing.amount"
            type="number"
            class="bg-white h-10 flex justify-center py-2 px-4 w-full border shadow-sm rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:border border-l-0"
          />
        </div>
      </div>
      <div class="sm:col-span-2 flex justify-end gap-2">
        <button-spinner
          :disabled="$v.service.$invalid"
          :loading="loading"
          type="button"
          style="width:fit-content"
          @click="saveItem"
        >
          {{ 'Add new item' }} 
        </button-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, numeric, minValue, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'OnetimeInvoiceItem',
  props: {
    item: {
      _id:'',
      description:'',
      price:0
    }
  },
  validations:{
   service: {
      description: { required, minLength: minLength(4)},
      pricing: {
        amount: { required, numeric, minValue: minValue(1) },
      }
    },
  },
  data(){
    return {
      service:{
        _id: this.item._id,
        description: this.item.description,
        pricing:{
          amount:this.item.price
        }
      },
      loading:false
    }
  },
  computed:{
    ...mapGetters({
      isMaxServicesAmountReached: "services/isMaxServicesAmountReached"
    })
  },
  methods:{
    async saveItem(){
      this.$nuxt.$emit("new-invoice-item",this.service)
      this.$emit("close")
    },
    cancel(){
      this.$emit("close")
    },
  },
}
</script>

<style lang="scss" scoped></style>
