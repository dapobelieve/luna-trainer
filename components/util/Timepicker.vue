`<template>
  <div>
    <date-picker
      v-model="model"
      :style="{ width: widthSize }"
      format="hh:mm A"
      type="time"
      class="my-dx"
      placeholder="HH:MM"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
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
    },
    inputWidth: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      time: ''
    }
  },
  computed: {
    widthSize () {
      return `${this.inputWidth}%`
    },
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }

  }
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
