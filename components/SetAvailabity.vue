<template>
  <div>
    <span class="text-sm pb-1.5">Your clients can only schedule an appointment based on your available days and times</span>
    <div>
      <div v-for="day in days" :key="day.id" class="m-2">
        <div class="flex items-center">
          <input type="checkbox" value="index" @change="displayTag(day)" />
          <label for="day" class="ml-3 text-base leading-tight">{{ day.day }}</label>
        </div>
        <div v-if="day.checked" class="m-3">
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
      if (this.tempCheckedId === day.id) {
        day.checked = !day.checked
      }
    }
  }

}
</script>

<style>

</style>
