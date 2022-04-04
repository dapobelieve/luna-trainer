<template>
  <div class="note" role="button">
    <div class="mr-auto">
      <p class="title">
        note one
      </p>
      <p class="body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem itaque repudiandae error, a quae vel numquam hic voluptas provident soluta commodi nesciunt. Rerum dicta rem aliquid omnis deserunt iure nobis atque incidunt consequatur cum sint, accusantium exercitationem praesentium nemo ad voluptas recusandae sunt totam impedit maxime vel repudiandae libero hic.
      </p>
      <span class="date">date</span>
    </div>
    <i class="fi-rr-angle-right text-blue-500"></i>
  </div>
</template>

<script>
export default {
  name: 'Note'
}
</script>

<style lang="scss" scoped>
.note {
    @apply py-4 px-3 text-gray-700 flex items-center rounded-md hover:bg-blue-50;
    .title {
        @apply text-base font-medium capitalize;
    }
    .body {
        @apply text-sm font-normal max-w-[18rem] md:max-w-xl xl:max-w-2xl truncate;
    }
    .date {
        @apply text-gray-500 font-normal;
    }
}
</style>
