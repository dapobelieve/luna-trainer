<template>
  <div>
    calendar
    <button type="button" @click="press">
      check
    </button>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      // channels: null
    }
  },
  computed: {
    channels () {
      return this.$store.state.sendBird.connectedChannels
    }
  },
  mounted () {
    // get list of all channels
    this.$store.dispatch('sendBird/listOfConnectedChannels')
  },
  methods: {
    press () {
      console.log(this.channels.get('sendbird_group_channel_105173530_c5849d11c59bf73ae9cc4125baae4a5646ea8fb1'))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
