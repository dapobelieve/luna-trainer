<template>
  <div>
    <multiselect v-model="selected" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select invoice items" label="description" track-by="description" :preselect-first="true">
      <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="selected.length &amp;&amp; !isOpen">{{ selected.length }} options selected</span></template>
      <template slot="tag" v-if="false"></template>
    </multiselect>
    <ul class="tail-mt-4 tail-p-4 tail-pb-3 tail-border-gray-400 tail-border-solid tail-border tail-rounded-lg tail-border-opacity-30">
      <li v-for="(select,index) in selected" class="tail-flex tail-justify-between tail-mb-3" :key="index"> 
          <div>
            <h2 class="tail-font-medium tail-text-lg active-item">{{select.description}}</h2>
            <small class="tail-text-gray-500 tail-ml-5">Qty 1</small>
          </div>
          <div class="tail-flex tail-justify-between tail-items-center tail-gap-2">
            <h5 class="tail-font-medium tail-text-lg"> £{{ select.pricing.amount | amount }}</h5>
            <button @click.once="removeSelectedItem(select._id)">
              <small class="ns-cross tail-flex tail-align-middle tail-bg-gray-300 tail-rounded-full tail-p-1 tail-text-white" ></small>
            </button>
          </div>
       </li>
    </ul>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'GwInvoiceServicesSelector',
  props: {
    services: Array
  },
  components: {
    Multiselect
  },
  watch: {
    selected (newValue) {
      this.$emit("selected", newValue)
    }
  },
  data () {
    return {
      selected: [],
      options: this.services
    }
  },
  methods: {
    removeSelectedItem (id) {
      this.selected = this.selected.filter((item) => item._id !== id)
    }
  }
}
</script>
<style scoped>
  .active-item{
    position: relative;
    padding-left: 20px;
  }
  .active-item::after{
    display: block;
    width: 10px;
    position: absolute;
    height: 10px;
    background: #56ccf2;
    content: "";
    top: calc( 50% - 5px);
    border-radius: 100%;
    left: 0;
  }
</style>
