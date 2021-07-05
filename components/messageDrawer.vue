<template>
  <div class="tail-bg-white tail-w-100 position-fixed tail-top-0 right-0 msgContainer" :class="{ showContainer: display }" style="width: 339px; height: 100vh">
    <div class="tail-flex justify-content-between border-bottom px-3 py-2">
      <span><strong>Messages</strong></span>
      <i class="ns-cross" @click="close" />
    </div>
    <div>
      <span>stuff
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageDrawer',
  props: {
    display: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('closemessagedrawer')
    }
  }
}
</script>

<style scoped>
.msgContainer {
  z-index: 1000;
  max-width: 384px;
  height: 100vh;
  transform: translate(100%, 0);
  transition: all 0.3s;
}
.showContainer {
  transform: translate(0) !important ;
}
</style>
