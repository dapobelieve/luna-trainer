<template>
  <div class="flex">
    <div v-for="(crumb, index) in crumbs" :key="index" class="flex">
      <span
        role="button"
        :disabled="index + 1 === crumbs.length"
        :class="[
          index + 1 !== crumbs.length ? 'active' : 'cursor-not-allowed',
          'crumb',
        ]"
        @click="goTo(crumb, index)"
      >
        {{
          crumb
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
        }}
      </span>
      {{ index + 1 !== crumbs.length ? " / " : "" }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    crumbs () {
      const path = this.$route.path.split('/')
      return path.slice(1)
    }
  },
  methods: {
    goTo (crumb, index) {
      if (index === 0) {
        this.$router.push({ name: 'myFiles' })
        return
      }
      this.$router.push({ name: `myFiles-${crumb}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.crumb {
  line-height: 30px !important;
  @apply font-normal text-base text-gray-400 flex;
}
.active {
  @apply text-blue-500;
}
</style>
