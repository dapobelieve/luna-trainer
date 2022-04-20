<template>
  <form class="w-full" @submit.prevent="sendChat">
    <div
      class="border-t flex items-center justify-center bg-white rounded-b-xl shadow-sm px-4 py-2 h-auto"
    >
      <textarea
        ref="chatArea"
        :value="value"
        type="text"
        class="w-full focus:outline-none text-sm resize-none h-6 box-border"
        placeholder="Type a message"
        @input="$emit('input', $event.target.value)"
      />
      <div class="relative">
        <transition name="fadeIn">
          <img
            v-if="showUpload"
            role="button"
            class="text-2xl text-center inline-block p-1 absolute z-50 -top-14 right-0 rounded-full"
            src="~/assets/img/svgs/image.svg"
            style="background: rgba(59, 130, 246, 1)"
            @click="uploadPhoto"
          />
        </transition>
        <input
          ref="fileUpload"
          class="hidden"
          type="file"
          name="image"
          accept="image/*"
          @change="onChange"
        />
        <button
          class="button-text button-sm w-8 ml-2"
          type="button"
          @click="showUpload = !showUpload"
        >
          <i class="fi-rr-link text-blue-500"></i>
        </button>
      </div>
      <button
        class="button-fill flex items-center button-sm w-8 ml-2"
        type="submit"
        :class="{ 'opacity-50 cursor-default': value === '' }"
        :disabled="value === ''"
      >
        <i class="fi-rr-paper-plane h-4"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChatFormArea',
  //   model: {
  //     prop: 'value',
  //     event: 'change'
  //   },
  value: {
    type: String,
    default: '',
    required: true
  },
  data () {
    return {
      showUpload: false
    }
  },
  methods: {
    uploadPhoto () {
      this.$refs.fileUpload.click()
      this.showUpload = false
    },

    onChange (e) {
      this.$emit('onChange', e)
    },

    sendChat () {
      this.$emit('sendChat')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
