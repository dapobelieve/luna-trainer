<template>
  <nav class="tail-grid tail-place-items-center" aria-label="Progress">
    <ol role="list" class="tail-flex tail-items-center">
      <li v-for="(count, index) in 5" :key="index" class="tail-relative tail-pr-8 sm:tail-pr-10 last:pr-0 sm:last:tail-pr-0">
        <div class="tail-absolute tail-inset-0 tail-flex tail-items-center" aria-hidden="true">
          <div class="tail-h-0.5 tail-w-full" :class="[stepCount > index ? 'tail-bg-blue-500' : 'tail-bg-gray-200']"></div>
        </div>
        <a href="#" class="tail-relative tail-w-8 tail-h-8 tail-flex tail-items-center tail-justify-center tail-bg-white tail-border-2 tail-rounded-full" :class="[index > stepCount ? 'tail-border-gray-300' : 'tail-border-blue-500']" aria-current="step">
          <svg
            v-if="stepCount > index"
            class="tail-w-5 tail-h-5 tail-text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span v-else-if="stepCount === index" class="tail-h-2.5 tail-w-2.5 tail-bg-blue-500 tail-rounded-full" aria-hidden="true"></span>
          <span v-else class="tail-h-2.5 tail-w-2.5 tail-bg-transparent tail-rounded-full tail-group-hover:tail-bg-gray-300" aria-hidden="true"></span>
          <span class="tail-sr-only">Step {{ index }}</span>
        </a>
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
