<template>
  <nav aria-label="Progress">
    <ol
      role="list"
      class="tail-flex tail-items-center tail-justify-between tail-w-full tail-relative tail-z-10 tail-transition-all"
    >
      <li v-for="(count, index) in  numberOfSteps" :key="index" class="tail-relative tail-w-full last:tail-w-5">
        <div
          class="tail-absolute tail-inset-0 tail-flex tail-items-center tail--z-10"
          aria-hidden="true"
        >
          <div
            class="tail-h-px tail-w-full"
            :class="[
              stepCount > index ? 'tail-bg-blue-500' : 'tail-bg-gray-200'
            ]"
          ></div>
        </div>
        <button
          class="tail-relative tail-w-5 tail-h-5 tail-flex tail-items-center tail-justify-center tail-bg-white tail-border tail-rounded-full"
          :class="[
            index > stepCount ? 'tail-border-gray-200' : 'tail-border-blue-500'
          ]"
          aria-current="step"
          @click.prevent="moveToStep(index)"
        >
          <svg
            v-if="stepCount > index"
            class="tail-w-5 tail-h-5 tail-text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            v-else-if="stepCount === index"
            class="tail-h-5 tail-w-5 tail-bg-blue-500 tail-rounded-full tail-shadow-md"
            aria-hidden="true"
          ></span>
          <span
            v-else
            class="tail-h-5 tail-w-5 tail-bg-gray-200 tail-rounded-full tail-group-hover:tail-bg-gray-200"
            aria-hidden="true"
          ></span>
          <span class="tail-sr-only">Step {{ index }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'CircleStepNavigation',
  props: {
    stepCount: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      numberOfSteps: 4
    }
  },
  methods: {
    moveToStep (index) {
      if (index === 0 || (index && !this.disabled[index - 1].isDisabled)) {
        this.$emit('stepper', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
