<template>
  <div>
    <date-picker
      v-model="model"
      style="width: 100% !important"
      format="hh:mm A"
      type="time"
      class="my-dx"
      placeholder="HH:MM"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  props: {
    type: {
      type: String

    },
    width: {
      type: String

    },
    format: {
      type: String

    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      time: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
  // methods: {
  //   updateValue (value) {
  //     this.$emit('input', value)
  //   }
  // }
}
</script>

<style lang="scss" scoped>

.my-dx::v-deep {
  .mx-input-wrapper{
    height: 45px !important;
  }
  .mx-input {
    height: 45px !important;
  }
}
</style>
