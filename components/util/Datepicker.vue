<template>
  <div>
    <date-picker
      :style="{ width: widthSize }"
      class="w-full my-dp"
      type="date"
      :disabled-date="
        date => {
          if (date < new Date()) {
            return true;
          }
          return false;
        }
      "
      format="DD MMMM, YYYY"
      placeholder="Select an appointment date"
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
    disabledDate: {
      type: Boolean
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
      dataType: '',
      date: new Date()
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

.my-dp::v-deep {
  .mx-input-wrapper {
    height: 45px !important;
  }
  .mx-input {
    height: 100%;
  }
}
</style>
