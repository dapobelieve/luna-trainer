<template>
  <span v-if="!isImgAvailable" class="tail-inline-flex tail-items-center tail-justify-center tail-h-10 tail-w-10 tail-rounded-full tail-bg-indigo-50" :style="altStyling">
    <span class="tail-text-sm tail-font-medium tail-leading-none tail-text-indigo-500">{{ displayInitials }}</span>
  </span>
  <img
    v-else
    :src="clientInfo.imgURL"
    class="tail-object-cover tail-rounded-full tail-h-10 tail-w-10"
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
      default: 3
    },
    height: {
      type: Number,
      default: 3
    },
    clientInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      altStyling: {
        width: this.width + 'rem',
        height: this.height + 'rem'
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
