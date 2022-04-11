<template>
     <modal name="welcome-modal" :height="470" :width="500">
        <div>
            <div class="space"/>
            <div class="grid m-6">
            <div class="py-0 text-justify">
                <div class="text-left mb-5 font-light text-2xl">
                <h3>Welcome to Luna</h3>
                </div>
                <p class="mb-8 w-50 text-justify">
                Start the tour to discover how easy it is to do everything in Luna with -
                tips and tricks on how to save yourself time on basic
                business admin, so you can focus on doing what you love.
                </p>
                <div class="flex justify-left gap-5">
                    <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="exitTour">
                    Explore by myself
                </button>
                <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="takeTour">
                    Start the tour
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
  },
}
</script>
