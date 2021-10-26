<template>
  <div>
    <span class="tail-text-sm tail-pb-1.5">Your clients can only schedule an appointment based on your available days and times</span>
    <div>
      <div v-for="day in days" :key="day.id" class="tail-m-2">
        <div class="tail-flex tail-items-center">
          <input type="checkbox" value="index" @change="displayTag(day)" />
          <label for="day" class="tail-ml-3 tail-text-base tail-leading-tight">{{ day.day }}</label>
        </div>
        <div v-if="day.checked" class="tail-m-3">
          <TimeTag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      days: [
        { id: 1, day: 'Sunday', checked: false },
        { id: 2, day: 'Monday', checked: false },
        { id: 3, day: 'Tuesday', checked: false },
        { id: 4, day: 'Wednesday', checked: false },
        { id: 5, day: 'Thursday', checked: false },
        { id: 6, day: 'Friday', checked: false },
        { id: 7, day: 'Saturday', checked: false }
      ],
      // checked: false,
      tempCheckedId: null
    }
  },
  methods: {
    displayTag (day) {
      this.tempCheckedId = day.id
      console.log(day)
      if (this.tempCheckedId === day.id) {
        day.checked = !day.checked
      }
    }
  }

}
</script>

<style>

</style>
