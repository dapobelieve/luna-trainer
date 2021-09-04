<template>
  <div
    v-if="!isImgAvailable"
    class="tail-rounded-full tail-flex tail-items-center tail-justify-center"
    :style="altStyling"
  >
    <span class="tail-font-medium">{{ displayInitials }}</span>
  </div>
  <img
    v-else
    :src="clientInfo.imgURL"
    class="tail-object-cover tail-rounded-full"
    :style="altStyling"
    alt="client profile image"
  />
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
    clientInfo: {
      type: Object,
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
    isImgAvailable () {
      return 'imgURL' in this.clientInfo
    },
    displayInitials () {
      let initials = ''
      if (this.clientInfo.firstName && this.clientInfo.lastName) {
        initials = (
          this.clientInfo.firstName.charAt(0) +
          this.clientInfo.lastName.charAt(0)
        ).toUpperCase()
      }
      return initials
    }
  }
}
</script>

<style lang="scss" scoped></style>
