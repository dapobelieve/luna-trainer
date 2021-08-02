<template>
  <div>
    <div class="tail-flex">
      <div class="tail-pr-3">
        <p class="tail-font-medium">
          27
        </p>
        <p class="tail-font-medium">
          TUE
        </p>
      </div>
      <div class="tail-w-full tail-mb-2">
        <div class="tail-rounded-md tail-bg-white tail-border-l-4 tail-border-yellow-400 tail-flex tail-justify-between tail-items-center tail-flex-col md:tail-flex-row tail-text-gray-700 tail-p-2 md:tail-p-4 tail-w-full">
          <div class="tail-flex ">
            <ClientAvatar firstname="Get" lastname="Welp" />
            <div class="tail-pl-2">
              <p class="tail-font-bold">
                APBC Committee Meeting with Ali R
              </p>
              <div><span style="padding-top: 0.1em; padding-bottom: 0.1rem" class="tail-text-xs tail-px-3 tail-bg-gray-200 tail-text-gray-800 tail-rounded-full">Happening Now</span> <span class="tail-text-xs md:tail-text-sm">- Remote</span> </div>
            </div>
          </div>
          <div>
            <button class="base-button tail-inline-flex tail-items-center tail-my-2 tail-text-white tail-px-6 md:tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2">
              Join
            </button>
          </div>
        </div>
        <div class="tail-w-full tail-mt-2">
          <div class="tail-rounded-md tail-bg-white tail-border-l-4 tail-border-green-400 tail-flex tail-justify-between tail-items-center tail-flex-col md:tail-flex-row tail-text-gray-700 tail-p-4 tail-w-full">
            <div class="tail-flex ">
              <ClientAvatar firstname="Get" lastname="Welp" />
              <div class="tail-pl-2">
                <p class="tail-font-bold">
                  Behaviour training with Bingo with Adelaine Sweet
                </p>
                <div><span style="padding-top: 0.1em; padding-bottom: 0.1rem" class="tail-text-xs tail-px-3 tail-bg-gray-200 tail-text-gray-800 tail-rounded-full">7pm-9pm</span> <span class="tail-text-xs md:tail-text-sm">- SW15 ILA</span> </div>
              </div>
            </div>
            <div>
              <button class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click.prevent="showSubMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="tail-w-4 tail-h-4" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /><circle cx="416" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /><circle cx="96" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /></svg>
              </button>
            </div>
          </div>

          <div>
          </div>
        </div>
        <div class="">
          <div
            v-show="meetSubMenu"
            class="tail-absolute tail-right-1.5 tail-flex tail-flex-col tail-text-left tail-bg-white tail-p-4 tail-shadow-lg tail-border-2 tail-rounded-lg tail-border-gray-200"
          >
            <a
              class="tail-text-blue-900 tail-hover:text-blue-800"
              href="#"
            >
              Cancel Session
            </a>
            <a
              class="tail-text-blue-900 tail-
                  hover:text-blue-800 tail-pt-2"
              href="#"
            >
              Edit Session
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleCard',
  data () {
    return {
      meetSubMenu: false
    }
  },
  methods: {
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
