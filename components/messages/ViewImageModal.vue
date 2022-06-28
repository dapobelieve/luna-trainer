<template>
  <modal
    name="view-image"
    height="100%"
    width="100%"
    :click-to-close="false"
  >
    <div v-if="isImageOpen">
      <div class="bg-black flex items-center justify-between px-4 py-2 text-white">
        <div class="flex items-center">
          <ClientAvatar
            :client-info="{
              firstName: Boolean(imageDetails.nickname) ? imageDetails.nickname : '',
              imgUrl: imageDetails.profileImg
            }"
          />
          <div class="ml-4">
            <p class="capitalize mb-0">
              {{ imageDetails.nickname }}
            </p>
            <small>
              {{ new Date(imageDetails.dateTime).toDateString() }}
            </small>
          </div>
        </div>
        <div class="space-x-4 text-xl cursor-pointer">
          <i class="fi-rr-download"></i>
          <i class="fi-rr-cross" @click="closeImage"></i>
        </div>
      </div>
      <div class="flex justify-center bg-black" style="height: calc(100vh - 64px)">
        <img
          class="w-full h-full object-contain"
          :src="imageDetails.url"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ViewImageModal',
  computed: {
    ...mapState({
      isImageOpen: state => state.sendBird.openImage,
      imageDetails: state => state.sendBird.imageDetails
    })
  },
  watch: {
    isImageOpen (newValue) {
      if (newValue) {
        this.$modal.show('view-image')
      } else if (!newValue) {
        this.$modal.hide('view-image')
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleView: 'sendBird/VIEW_IMAGE'
    }),
    closeImage () {
      this.toggleView({ imageDetails: null, status: false })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
