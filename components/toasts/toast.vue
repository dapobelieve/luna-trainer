<template>
  <transition
    enter-active-class="transition-all ease-in-out duration-[500ms]"
    leave-active-class="transition-all ease-in-out duration-[500ms]"
    enter-class="transform translate-x-full"
    leave-class="-translate-x-0"
    enter-to-class="-translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div @mouseover="hover = true" @mouseleave="hover = false" v-if="show" class="w-80 right-1 bottom-1 absolute z-50">
      <div class="flex items-start justify-between bg-white border p-4 rounded-xl">
      <div class="flex-shrink-0 mr-2">
        <img class="h-8 w-8" src="~/assets/img/2.svg">
      </div>
      <div>
        <h3 class="text-black font-medium text-base">Welcome to luna</h3>
        <p class="text-gray-600">
          Hey, Patrick Wayne! We are glad to have you on our platform. We have built an all-in-one platform that’s solving all your dog training problems.
        </p>
        <div class="actions mt-3">
          <button class="text-sm border text-md rounded-lg py-1 px-3 mr-3">Not Now</button>
          <button class="text-sm text-md rounded-lg text-white bg-blue-500 px-3 py-1">Get Started</button>
        </div>
      </div>
      <div class="" @click="close">
        <i style="font-size: 10px" class="cursor-pointer fi-rr-cross font-bold text-primary-color"></i>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      hover: false,
      timeoutId: null,
      show: false
    }
  },
  computed: {
    toastPosition() {
      
    }
  },
  methods: {
    close() {
      clearTimeout(this.timeoutId)
      this.show = false
    }
  },
  mounted() {
    this.$nuxt.$on('toast', () => {
      this.show = true
    })
  },
  updated() {
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      // if(!this.hover) {
      //   this.show = false
      // }
    }, 5000)
  }
}
</script>

<style scoped>

</style>