<template>
  <multiselect
      @select="($event)=>this.$emit('select',$event)"
      :value="selected"
      track-by="firstName"
      label="firstName"
      placeholder="Select a client"
      :options="clients"
      :option-height="104"
      :show-labels="false"
      :multiple="false"
    >
      <template slot="singleLabel" slot-scope="props"
        ><div class="option__desc tail-flex tail-items-center">
          <ClientAvatar
            :firstname="props.option.firstName"
            :lastname="props.option.lastName"
            :width="4"
            :height="4"
          />
          <div>
            <span class="option__title tail-pl-2">{{ props.option.firstName }} {{ props.option.lastName }}</span>|
            <span class="option__title tail-pl-2">{{ props.option.location.address }}</span>
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
          }}</span
          ><span class="option__small tail-pl-2">{{
            props.option.lastName
          }}</span>
        </div>
      </template>
  </multiselect>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'GwCustomerSelector',
  components: { Multiselect },
  props: {
    clients: Array,
    selected: Object
  }
}
</script>

