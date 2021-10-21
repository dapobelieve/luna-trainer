<template>
  <span v-if="user && !user.imgUrl" class="tail-inline-flex tail-items-center tail-justify-center tail-h-10 tail-w-10 tail-rounded-full tail-bg-indigo-50" :style="altStyling">
    <span class="tail-text-sm tail-font-medium tail-leading-none tail-text-indigo-500">{{ avatar }}</span>
  </span>
  <img
    v-else
    :src="avatar"
    class="tail-object-cover tail-rounded-full tail-h-10 tail-w-10"
    :style="altStyling"
    alt="client profile image"
  />
</template>

<script>
import { mapGetters } from 'vuex'
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
      // required: true
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
    ...mapGetters({
      user: 'profile/getUser'
    }),
    avatar () {
      if (this.user.imgUrl) {
        return this.user.imgUrl
      }
      return this.user.firstName.charAt(0).toUpperCase()
    }
  }
}
</script>
