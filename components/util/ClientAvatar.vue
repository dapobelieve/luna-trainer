<template>
  <div
    v-if="!isImgAvailable"
    class="tail-rounded-full tail-flex tail-items-center tail-justify-center tail-h-full tail-w-full tail-bg-indigo-50 tail-text-indigo-500 tail-text-sm"
    :style="altStyling"
  >
    <span class="tail-font-medium">{{ displayInitials }}</span>
  </div>
  <img
    v-else
    :src="clientInfo.imgURL"
    class="tail-object-cover tail-rounded-full tail-h-full tail-w-full"
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
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    clientInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      altStyling: {
        width: this.width + '%',
        height: this.height + '%'
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
      } else if (!this.clientInfo.lastName) {
        initials = (
          this.clientInfo.firstName.charAt(0)
        ).toUpperCase()
      }
      return initials
    }
  }
}
</script>

<style lang="scss" scoped></style>
