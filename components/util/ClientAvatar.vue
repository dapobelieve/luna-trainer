<template>
  <span v-if="!isImgAvailable" class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50" :style="altStyling">
    <span class="text-xs font-medium leading-none text-indigo-500">{{ displayInitials }}</span>
  </span>
  <img
    v-else
    :src="clientInfo.imgURL"
    class="object-cover rounded-full h-10 w-10"
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
      const values = [this.clientInfo.firstName, this.clientInfo.lastName]
      if (values.length) {
        values.forEach((element) => {
          initials += (element && element.charAt(0).toUpperCase()) || ''
        })
      }
      return initials
    }
  }
}
</script>

<style lang="scss" scoped></style>
