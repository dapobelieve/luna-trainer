<template>
  <modal
    name="scheduler-cancel-session"
    class="p-0"
    :width="450"
    :click-to-close="false"
    height="auto"
    :adaptive="true"
  >
    <div class="grid m-6">
      <div class="py-0">
        <div class="text-left mb-2 font-medium text-2xl">
          <h3>Cancel Session</h3>
        </div>
        <p class="text-left text-lg text-gray-700 mb-8">
          This session will permanently be deleted from your schedule. Do you want to cancel?
        </p>
        <div class="flex justify-end">
          <button class="py-2 px-4 text-primary-color" style="width:fit-content" @click="$emit('close')">
            No don't
          </button>
          <button :disabled="loading" class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="$emit('cancel')">
            Yes, cancel
            <SingleLoader v-if="loading" class="ml-2" />
          </button>
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
