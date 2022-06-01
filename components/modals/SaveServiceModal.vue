<template>
  <modal name="save-service" :adaptive="true" :max-width="500" :click-to-close="false">
      <div class="grid m-6">
        <div class="py-0 text-justify">
          <div class="text-left mb-5 font-light text-2xl">
            <h3>You have an unsaved service</h3>
          </div>
          <p class="mb-8 w-50 text-justify">
            How do you wish to continue?
          </p>
          <div class="flex justify-left gap-5">
            <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="continueSave">
              Save Service
            </button>
            <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="cancelSave">
              Continue without Saving
            </button>
          </div>
        </div>
      </div>
  </modal>
</template>

<script>
export default {
  props: {
    continueSave: Function,
    cancelSave: Function
  }
}
</script>
