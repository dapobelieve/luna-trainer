<template>
  <modal name="done" height="auto" :adaptive="true">
    <div class="tail-m-8">
      <div class="tail-flex  tail-justify-start tail-flex-col tail-mb-2">
        <img
          src="~/assets/img/svgs/check-icon.svg"
          alt="checked"
          class="tail-h-8 tail-w-8 tail-mb-2"
        />
        <h3 class="tail-my-2 tail-gray-700 tail-text-xl lg:tail-text-2xl">
          All done!
        </h3>
        <p class="tail-my-1.5 tail-text-sm lg:tail-text-base">
          We’re now setting up your environment on GetWelp
        </p>
        <p class="tail-my-1.5">
          In a second you’ll be taken to the dashboard and we will walk you
          through how to use it!
        </p>
      </div>
      <button
        type="button"
        class="button-fill"
        @click.prevent="$emit('closeStripeModal')"
      >
        Finish
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ConnectToStripeModal'
}
</script>

<style>

</style>
