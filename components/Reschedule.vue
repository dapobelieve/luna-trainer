<template>
  <div>
    <div class="m-3">
      <client-only>
        <v-date-picker v-model="date" mode="date" :format="$auth.user.dateFormat.toUpperCase()" style="width: 100% !important" />
      </client-only>
    </div>
    <TimeTag />
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: ''
    }
  }

}
</script>

<style>

</style>
