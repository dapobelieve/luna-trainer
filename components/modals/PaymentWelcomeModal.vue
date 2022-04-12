<template>
 <modal name="welcome-modal" :height="470" :width="500">
        <div>
          <div class="space"/>
          <div class="grid m-6">
            <div class="py-0 text-justify">
              <div class="text-left mb-5 font-light text-2xl">
                <h3>Welcome to Payments</h3>
              </div>
              <p class="mb-8 w-50 text-justify">
              Here you can create, send and manage invoices, with quick pay links for single service payment requests coming soon. Take our short tour to see how simple it is to manage your payments with Luna. 
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
  },
}
</script>
