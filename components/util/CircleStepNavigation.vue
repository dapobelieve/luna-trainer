<template>
  <nav aria-label="Progress">
    <ol
      role="list"
      class="flex items-center justify-between w-full relative z-10 transition-all"
    >
      <li v-for="(count, index) in numberOfSteps" :key="index" class="relative w-full last:w-5">
        <div
          class="absolute inset-0 flex items-center -z-10"
          aria-hidden="true"
        >
          <div
            class="h-px w-full"
            :class="[
              stepCount > index ? 'bg-blue-500' : 'bg-gray-200'
            ]"
          ></div>
        </div>
        <button
          class="relative w-5 h-5 flex items-center justify-center bg-white border rounded-full"
          :class="[
            index > stepCount ? 'border-gray-200' : 'border-blue-500'
          ]"
          aria-current="step"
          @click.prevent="moveToStep(index)"
        >
          <!-- <svg
            v-if="stepCount > index"
            class="w-5 h-5 text-blue-500"
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
          </svg> -->
          <i
            v-if="stepCount > index"
            class="fi-rr-check text-sm text-blue-500"
          ></i>
          <span
            v-else-if="stepCount === index"
            class="h-5 w-5 bg-blue-500 rounded-full shadow-md"
            aria-hidden="true"
          ></span>
          <span
            v-else
            class="h-5 w-5 bg-gray-200 rounded-full group-hover:bg-gray-200"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Step {{ index }}</span>
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
