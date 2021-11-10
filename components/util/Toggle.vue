<template>
  <div
    class="toggle-switch"
    :aria-checked="value"
    :small-size="smallSize"
    @click="toggle"
  >
    <div class="white-ball" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    smallSize: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-switch {
  @apply flex rounded-sm p-1 cursor-pointer;
  transition: background-color 0.3s ease;
  background-color: #ebebeb;
  min-width: 4rem;
  width: 4rem;
  height: 2rem;

  .white-ball {
    @apply rounded-sm shadow-md;
    transition: transform 0.3s ease;
    background-color: #fff;
    width : 1.5rem;
    height: 1.5rem;
  }

  &[aria-checked] {
    @apply bg-blue-500;
    .white-ball {
      transform: translateX(2rem);
    }
  }
  &[small-size] {
    min-width: 2.5rem;
    width: 2.5rem;
    height: 1.5rem;
    .white-ball {
      width: 1rem;
      height: 1rem;
    }
    &[aria-checked] {
      .white-ball {
        transform: translateX(1rem);
      }
    }
  }
}
</style>
