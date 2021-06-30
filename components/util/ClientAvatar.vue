<template>
  <div
    class="tail-rounded-full tail-flex tail-items-center tail-justify-center"
    :style="altStyling"
  >
    <span class="tail-font-medium">{{ displayInitials }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    width: {
      type: Number,
      default: 2.5
    },
    height: {
      type: Number,
      default: 2.5
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      altStyling: {
        width: this.width + 'em',
        height: this.height + 'em',
        background: '#56CCF2',
        color: '#000'
      }
    }
  },
  computed: {
    displayInitials () {
      let initials = ''
      if (this.firstname && this.lastname) {
        initials = (
          this.firstname.charAt(0) + this.lastname.charAt(0)
        ).toUpperCase()
      }
      return initials
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
