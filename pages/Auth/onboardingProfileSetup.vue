<template>
  <div class="lg:tail-grid lg:tail-grid-cols-3 tail-bg-blue-50 tail-h-full">
    <div
      class="tail-flex tail-flex-col tail-bg-blue-50 lg:tail-bg-white tail-h-screen tail-px-6 tail-py-10 tail-w-full"
    >
      <circle-step-navigation :step-count="step" />
      <div class="tail-mt-10 lg:tail-hidden tail-mb-auto">
        Tell us about you. (form will display here)
      </div>
      <div class="tail-mt-20 tail-hidden lg:tail-block tail-text-gray-700">
        <h2 class="tail-text-2xl tail-mb-8 tail-max-w-xs">
          {{ pageIntro[step].title }}
        </h2>
        <small class="tail-text-sm tail-font-extralight">
          {{ pageIntro[step].subTitle }}
        </small>
      </div>
      <div
        class="tail-flex tail-items-center tail-space-x-2 sm:tail-space-x-4 lg:tail-hidden"
      >
        <a href="#" class="tail-text-blue-500 tail-mr-auto" :class="[step === 3 || step === 4 ? 'tail-visible' : 'tail-invisible']">Skip</a>
        <button
          v-if="step"
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="decreaseStep"
        >
          back
        </button>
        <button
          v-if="step !== 5"
          type="button"
          style="width: fit-content"
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="increaseStep"
        >
          {{ step === 4 ? "Save & Complete" : "Next" }}
        </button>
      </div>
    </div>

    <div
      class="tail-mt-10 lg:tail-mt-0 tail-hidden lg:tail-flex tail-flex-col tail-bg-blue-50 tail-h-screen tail-px-6 tail-py-10"
    >
      <div
        class="tail-text-lg tail-font-medium tail-text-gray-900 tail-mb-auto"
      >
        <b>Tell us a bit about you</b>
      </div>
      <div class="tail-flex tail-items-center tail-space-x-2 sm:tail-space-x-4">
        <a href="#" class="tail-text-blue-500 tail-mr-auto" :class="[step === 3 || step === 4 ? 'tail-visible' : 'tail-invisible']">Skip</a>
        <button
          v-if="step"
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="decreaseStep"
        >
          back
        </button>
        <button
          v-if="step !== 5"
          type="button"
          style="width: fit-content"
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="increaseStep"
        >
          {{ step === 4 ? "Save & Complete" : "Next" }}
        </button>
      </div>
    </div>
    <div
      class="tail-mt-10 lg:tail-mt-0 tail-bg-blue-50 tail-h-screen tail-px-6 tail-pt-10 tail-border"
      :class="[step === 2 ? 'lg:tail-block' : 'lg:tail-hidden']"
    >
      <h2 class="tail-text-lg tail-font-medium tail-text-gray-900">
        <b>You have added 3 services</b>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnboardingProfileSetup',
  layout: 'authOnboarding',
  auth: false,
  data () {
    return {
      step: 0,
      pageIntro: [
        {
          id: 0,
          title: 'We would like to get to know you personally.',
          subTitle:
            'This first stage is your personal profile. Pretty simple, right?'
        },
        {
          id: 1,
          title: 'You as a Trainer...',
          subTitle:
            'We want to get to know you as a Trainer, in this section. It’s important because it gives us a good understanding of the types of Trainers using GetWelp and how we can help 🙂'
        },
        {
          id: 2,
          title: 'Your services',
          subTitle:
            'This first stage is your personal profile. Pretty simple, right?'
        },
        {
          id: 3,
          title: 'Add your first client',
          subTitle:
            'To make things really simple for you, if you add a client at this stage, a template profile will be created in your Clients section in the platform and it’s super easy to navigate.'
        },
        {
          id: 4,
          title: 'Stripe',
          subTitle:
            'If you’re an existing Stripe user or have a verified account, you can connect to Stripe by click on the Stripe logo below. It’ll makes your whole experience easier. '
        }
      ]
    }
  },
  methods: {
    increaseStep () {
      this.step++
    },
    decreaseStep () {
      this.step--
    }
  }
}
</script>

<style lang="scss" scoped></style>
