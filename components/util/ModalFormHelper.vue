<template>
  <div v-if="isVisible">
    <div
      class="tail-flex tail-justify-center tail-items-center tail-py-4 tail-fixed tail-inset-0 tail-z-50"
      :class="{ isNotVisible: isNotVisible }"
    >
      <div
        class="tail-flex tail-flex-col tail-max-w-5xl tail-rounded-lg tail-shadow-lg tail-bg-white"
      >
        <div
          id="modal-header"
          class="tail-flex tail-justify-between tail-items-start tail-p-5"
        >
          <h1 class="tail-text-2xl tail-font-semibold">
            Header
          </h1>
          <button type="button" class="tail-p-1 tail-leading-none" @click="closeModal">
            <span
              class="tail-text-2xl tail-font-semibold tail-h-6 tail-w-6"
            >X</span>
          </button>
        </div>
        <div id="modal-body" class="tail-p-6">
          <p>
            This will have the text of the the modal body and for now we just
            dey write rubbish
          </p>
        </div>
        <div
          id="modal-footer"
          class="tail-p-6 tail-flex tail-justify-end tail-items-center"
        >
          <button class="tail-border tail-rounded">
            <span class="tail-p-3">Cancel</span>
          </button>
          <button class="tail-ml-2 tail-border tail-rounded">
            <span class="tail-p-3">Ok</span>
          </button>
        </div>
      </div>
    </div>
    <div
      class="tail-opacity-25 tail-bg-black tail-bg-fixed tail-inset-0 tail-z-40"
    />
  </div>
</template>

<script>
export default {
  name: 'ModalFormHelper',
  props: {
    isNotVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('closedrawer')
    }
  }
}
</script>

<style lang="scss" scoped></style>
