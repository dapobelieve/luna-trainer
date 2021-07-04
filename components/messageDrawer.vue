<template>
  <div class="tail-bg-white tail-w-100 tail-position-fixed msgContainer" :class="{showContainer:show}" style="width: 339px; height: 100vh">
    <div class="tail-flex tail-justify-between tail-border tail-px-3 tail-py-2">
      <span><strong>Messages</strong></span>
      <i class="ns-cross" role="button" @click="closemessagedrawer = closemessagedrawer" />
    </div>
    <div class="tail-flex body-background">
      <i class="ns-search tail-ml-2 tail-text-gray-400 tail-flex tail-justify-center tail-items-center"></i>
      <input type="search" name="searchMessages" placeholder="Search or start new chat" class="tail-outline-none body-background tail-w-full tail-h-10 tail-p-2">
    </div>
    <div class="tail-flex tail-justify-center tail-items-center tail-p-4">
      <div class="tail-flex tail-py-1">
        <div>
          <img
            class="tail-rounded-full"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
        </div>
        <div class="tail-grid tail-px-4">
          <span class="tail-text-base"><strong>James R . </strong><small class="tail-text-xs tail-text-gray-400"> 2 hours ago</small></span>
          <span>Lorem ipsum dolor sit amet, concude loema d...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageDrawer',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      closemessagedrawer: true
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
  margin-top: 0.125rem;
}
.showContainer {
  transform: translate(0) !important ;
}
</style>
