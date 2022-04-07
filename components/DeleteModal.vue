<template>
  <div id="use-border">
    <modal name="delete-modal" height="auto" :adaptive="true">
      <div class="px-4 py-4">
        <p class="text-2xl text-gray-700 font-normal py-4 capitalize">
          {{ title }}
        </p>
        <slot name="subTitle" />
        <div class="mt-10 flex justify-end space-x-4">
          <button class="button-outline" @click.prevent="closeModal">
            No, cancel
          </button>
          <slot name="confirm" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  watch: {
    value (newValue) {
      if (newValue) {
        this.$modal.show('delete-modal')
      } else {
        this.$modal.hide('delete-modal')
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
