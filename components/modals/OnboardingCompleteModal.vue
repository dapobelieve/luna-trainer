<template>
  <modal name="done" height="auto" :adaptive="true" :max-width="500" :click-to-close="false">
     <div class="m-8">
      <div class="flex justify-start flex-col mt-1 mb-2">
        <h3 class="my-2 gray-700 text-xl lg:text-2xl">All done!</h3>
        <p class="my-1.5">
          Thank you. In a moment, you’ll be taken to your personal Luna
          dashboard. Get familiar with the short tour to show you where
          everything is.
        </p>
      </div>
      <button
        type="button"
        class="button-fill"
        @click.prevent="$emit('closeOnboardingCompleteModal')"
      >
        Get Started
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'OnboardingCompleteModal'
}
</script>

<style>

</style>
