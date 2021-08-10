<template>
  <div>
    <date-picker
      v-model="date"
      style="width: 100% !important"
      class="tail-w-full my-dp"
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
    }
  },
  data () {
    return {
      dataType: '',
      date: new Date()
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
