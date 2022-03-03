<template>
  <span
    v-if="!isImgAvailable"
    :style="altStyling"
    :class="{ 'user-is-online': onlineStatus === 'online' }"
    class="bg-green-white rounded-full flex items-center justify-center "
  >
    <span
      class="h-full w-full bg-indigo-50 rounded-full grid place-content-center leading-none text-indigo-500 text-xs font-medium"
    >{{ displayInitials }}</span>
  </span>
  <img
    v-else
    :class="{ 'user-is-online': onlineStatus === 'online' }"
    :src="clientInfo.imgURL"
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
      default: function() {
        return {
          imgURL: 'https://res.cloudinary.com/rohing/image/upload/v1646190983/gitProfile_qje88s.png'
        }
      },
      required: true
    }
  },
  data () {
    return {
      onlineStatus: 'offline',
      altStyling: {
        width: this.width + 'rem',
        height: this.height + 'rem'
      }
    }
  },
  computed: {
    ...mapState({
      isSendbirdConnected: state => state.sendBird.sendbirdConnected
    }),
    isImgAvailable () {
      return 'imgURL' in this.clientInfo
    },
    isSendbirdIdAvailable () {
      return 'sendbirdId' in this.clientInfo
    },
    displayInitials () {
      let initials = ''
      const values = [this.clientInfo.firstName, this.clientInfo.lastName]
      if (values.length) {
        values.forEach((element) => {
          if (element !== undefined) {
            initials += element.charAt(0).toUpperCase()
          }
        })
      }
      return initials
    }
  },
  watch: {
    isSendbirdConnected: {
      handler (newValue, oldValue) {
        if ((newValue || oldValue) && this.isSendbirdIdAvailable) {
          this.isUserOnline([this.clientInfo.sendbirdId]).then((res) => {
            this.onlineStatus = res
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      isUserOnline: 'sendBird/isUserOnline'
    })
  }
}
</script>

<style lang="scss" scoped>
.user-is-online {
  @apply border-2 p-0.5;
  border-color: #14b8a6;
}
</style>
