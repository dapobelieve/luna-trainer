<template>
  <div class="tail-h-screen">
    <div class="tail-p-2 tail-flex tail-justify-between">
      <h2>
        Messages
      </h2>
      <i class="ns-cross"></i>
    </div>
    <div class="tail-mt-1 tail-relative tail-rounded-md tail-border tail-border-gray-200 tail-pb-4 tail-h-4">
      <div class="tail-absolute tail-inset-y-0 tail-left-0 tail-pl-3 tail-pt-3 tail-flex tail-items-center tail-pointer-events-none" aria-hidden="true">
        <i class="ns-search tail-mr-3 tail-text-gray-400 tail-flex-shrink-0 tail-text-lg" />
      </div>
      <input type="text" name="search" class="tail-bg-gray-100 tail-py-1 focus:tail-border-gray-700 focus:tail-outline-none tail-block tail-w-full tail-pl-9 sm:tail-text-sm tail-border-gray-300" placeholder="Search or start a new chat">
    </div>
    <template v-if="true">
      <div class="tail-px-3 tail-pt-6">
        <div class="tail-flex">
          <div>
            <img src="https://picsum.photos/seed/picsum/200/300" class="tail-rounded-full tail-w-12 tail-h-12" />
          </div>
          <div>
            <div class="tail-flex tail-flex-row tail-px-4">
              <h4 class="tail-font-bold">
                James R
              </h4>
              <span class="tail-px-2">.</span>
              <small class="tail-text-gray-400">Time</small>
            </div>
            <span class="tail-px-4">
              Lorem ipsum sit amet...
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="tail-flex tail-justify-center tail-items-center tail-pt-2">
        <div class="tail-text-center tail-py-5">
          <h2 class="tail-font-bold">
            No messages, yet.
          </h2>
          <div class="tail-pt-3">
            <p>Looks like you haven’t started a conversation with your client</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {

  }
}
</script>
<style scoped>

</style>
