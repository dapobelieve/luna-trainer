<template>
  <modal name="done" height="auto" :adaptive="true" :max-width="500" :click-to-close="false">
    <div class="m-8">
      <div class="flex justify-start flex-col mt-1 mb-2">
        <img
          src="~/assets/img/svgs/check-icon.svg"
          alt="checked"
          class="h-5 w-5 mb-2"
        />
        <h3 class="my-2 gray-700 text-xl lg:text-2xl">
          All done!
        </h3>
        <p class="my-1.5 text-sm lg:text-base">
          We’re now setting up your environment on GetWelp
        </p>
        <p class="my-1.5">
          In a second you’ll be taken to the dashboard and we will walk you
          through how to use it!
        </p>
      </div>
      <button
        type="button"
        class="button-fill"
        @click.prevent="$emit('closeOnboardingCompleteModal')"
      >
        Finish
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
