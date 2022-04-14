<template>
  <span
    v-if="!isImgAvailable"
    :style="altStyling"
    :class="{ 'user-is-online': online }"
    class="bg-green-white rounded-full flex items-center justify-center "
  >
    <span
      class="h-full w-full bg-indigo-50 rounded-full grid place-content-center leading-none text-indigo-500 text-xs font-medium"
    >{{ displayInitials }}</span>
  </span>
  <img
    v-else
    :class="{ 'user-is-online': online }"
    :src="clientInfo.imgURL || clientInfo.imgUrl"
    class="object-cover rounded-full h-10 w-10 inline-block"
    :style="altStyling"
    alt="client profile image"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      default () {
        return {}
      },
      required: true
    },
    online: {
      type: Boolean,
      default: false
    },
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
      return this.clientInfo?.imgURL || this.clientInfo.imgUrl
    },
    displayInitials () {
      let initials = ''
      const values = [this.clientInfo.firstName, this.clientInfo && this.clientInfo.lastName]
      if (values.length) {
        values.forEach((element) => {
          if (element) {
            initials += element.charAt(0).toUpperCase()
          }
        })
      }
      return initials
    }
  },
    
}
</script>

<style lang="scss" scoped>
.user-is-online {
  @apply border-2 p-0.5;
  border-color: #14b8a6;
}
</style>
