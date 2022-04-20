<template>
  <modal name="welcome-modal" :height="470" :width="500" @closed="exitTour">
    <div>
      <div class="space" />
      <div class="grid m-6">
        <div class="py-0 text-justify">
          <div class="text-left mb-5 font-light text-2xl">
            <h3>Welcome to scheduling</h3>
          </div>
          <p class="mb-8 w-50 text-justify">
            This is where you can manage all your session bookings. Take our short tour of the key features or explore yourself.
          </p>
          <div class="flex justify-left gap-5">
            <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="takeTour">
              Take the tour
            </button>
            <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="exitTour">
              Explore by myself
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    exitTour: Function,
    takeTour: Function
  }
}
</script>
