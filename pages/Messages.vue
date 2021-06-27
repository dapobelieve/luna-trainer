<template>
  <div class="main tail-p-3 tail-pl-20 tail-flex">
    <div class="message-box tail-pr-5">
      <div class="tail-border tail-border-gray-200 tail-rounded-md tail-overflow-hidden tail-flex tail-flex-col tail-justify-between tail-h-full tail-items-center tail-relative">
        <!-- header part -->
        <div class="tail-bg-white tail-px-3 tail-py-2 tail-flex tail-items-center tail-w-full">
          <i class="ns-angle-left tail-p-1 tail-border tail-rounded tail-border-gray-300 tail-mr-5"></i>
          <img
            class="tail-rounded-full tail-h-6"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
          <strong class="tail-ml-2">James R</strong>
        </div>

        <!-- messages area -->
        <div class=" tail-h-full mx-auto" style="width: 85%">
          Message box
        </div>
        <!-- input area -->
        <div class="tail-w-full">
          <form @submit.prevent="">
            <div
              class="tail-border tail-flex align-items-center tail-bg-white tail-rounded-md tail-shadow-sm tail-pl-4 tail-pr-14 tail-py-3"
            >
              <input
                v-model="message"
                type="text"
                class="tail-w-full focus:tail-outline-none"
                placeholder="Type a message"
              />
              <button class="tail-mr-3" type="submit">
                <i class="ns-upload text-muted"></i>
              </button>
              <button class="" type="submit">
                <i class="ns-paper-plane text-muted"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="contact tail-rounded-md tail-p-3">
      <div class="tail-flex tail-items-center">
        <img
            class="tail-rounded-full tail-h-16"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
          <div class="tail-ml-2">
            <p class="tail-text-sm">
              <strong>James R</strong>
            </p>
            <div class="tail-flex tail-items-center">
              <img
              class="tail-bg-green-700 tail-rounded-full tail-inline-block"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
              <span class="tail-text-xs tail-ml-2">Shep</span>
            </div>
            <div class="tail-flex tail-items-center">
              <i class="ns-location-alt"></i>
              <span class="tail-text-xs tail-ml-1">SMV 1123</span>
            </div>
          </div>
      </div>
      <!-- <hr> -->
      <div class="tail-py-4 tail-border-gray-200 tail-border-t tail-border-b tail-my-3">
        <button class="base-button">new invoice</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
    height: calc(100vh - 72px);
    overflow: hidden !important;
    margin-bottom: 0;
    .message-box {
        width: 70%
    }
    .contact {
        width: 30%
    }
}
</style>
