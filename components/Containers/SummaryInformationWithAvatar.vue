<template>
  <ul role="list" class="tail-relative tail-z-0">
    <li v-for="n in 2" :key="n">
      <div class="tail-relative tail-py-2 tail-flex tail-items-center hover:tail-bg-gray-50">
        <div class="tail-mr-auto tail-flex tail-items-center tail-space-x-3">
          <div class="flex-shrink-0">
            <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://source.unsplash.com/random" alt="">
          </div>
          <div class="tail-flex-1 tail-min-w-0">
            <a href="#" class="focus:tail-outline-none">
              <!-- Extend touch target to entire panel -->
              <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
              <p class="tail-text-base tail-font-medium tail-text-gray-700">
                New client registration from Peter
              </p>
              <small class="tail-text-xs tail-text-gray-500 tail-truncate">
                {{ new Date().toDateString() }}
              </small>
            </a>
          </div>
        </div>
        <img class="tail-h-4" src="~/assets/img/svgs/chevron-right-blue.svg" alt="arrow-right" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SummaryInformationWithAvatar'
}
</script>

<style lang="scss" scoped>

</style>
