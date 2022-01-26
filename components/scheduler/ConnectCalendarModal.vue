<template>
  <modal
    name="scheduler-connect-calendar"
    class="p-0"
    :width="532"
    :click-to-close="false"
    height="auto"
    :adaptive="true"
  >
    <div class="grid m-6">
      <div class="py-0">
        <div class="flex justify-between mb-2 font-medium text-2xl mb-16">
          <h3>Sync with calendar</h3>
          <div>
            <i @click="$emit('close')" class="fi-rr-cross cursor-pointer text-primary-color text-xl"></i>
          </div>
        </div>
        <div>
          <div class="flex">
            <div>
              <h6 class="text-lg font-medium">GetWelp</h6>
              <span class="text-gray-500 text-sm">trainersemail@gmail.com</span>
            </div>
            <div class="ml-auto">
              <span class="bg-blue-50 p-2 rounded-full text-sm text-cyan-400">Default</span>
            </div>
          </div>
          <div class="flex">
            <div>
              <h6 class="text-lg font-medium">Sync with <img> </h6>
              <span class="text-gray-500 text-sm">trainersemail@gmail.com</span>
            </div>
            <div class="ml-auto">
              <span class="bg-blue-50 p-2 rounded-full text-sm text-cyan-400">Default</span>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </modal>
</template>

<script>
import SingleLoader from '~/components/util/SingleLoader'
export default {
  components: { SingleLoader },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
