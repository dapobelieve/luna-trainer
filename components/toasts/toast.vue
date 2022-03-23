<template>
  <transition
    enter-active-class="transition-all ease-in-out duration-[500ms]"
    leave-active-class="transition-all ease-in-out duration-[500ms]"
    enter-class="transform translate-x-full"
    leave-class="-translate-x-0"
    enter-to-class="-translate-x-0"
    leave-to-class="translate-x-96"
  >
    <div v-if="show" :class="[toastPosition]" class="w-80 absolute z-1000" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="flex items-start bg-white border p-4 rounded-xl">
        <div class="flex-shrink-0">
          <div v-if="icon" :class="[iconBg]" class="h-8 w-8 inline-flex items-center justify-center rounded-full">
            <i :class="[icon, iconColor]" class="mt-1"></i>
          </div>
          <img v-else class="h-8 w-8" src="~/assets/img/2.svg">
        </div>
        <div class="flex-grow ml-2 mt-1">
          <h3 v-if="options.heading" class="text-black font-medium text-base">
            {{ options.heading }}
          </h3>
          <p class="text-gray-600">
            {{ options.message }}
          </p>
          <div v-if="options.actions" class="actions mt-3">
            <button v-if="options.cancel" class="text-sm border text-md rounded-lg py-1 px-3 mr-3" @click="cancel">
              {{
                cancelText
              }}
            </button>
            <button v-if="options.confirm" class="text-sm text-md rounded-lg text-white bg-blue-500 px-3 py-1" @click="confirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
        <div class="ml-2 mt-1" @click="close">
          <i style="font-size: 12px" class="cursor-pointer fi-rr-cross font-bold text-primary-color"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      success: {
        icon: 'fi-rr-check text-teal-500',
        bg: 'text-teal-50'
      },
      hover: false,
      timeoutId: null,
      show: false,
      options: {}
    }
  },
  computed: {
    icon () {
      return this.options.icon || undefined
    },
    iconBg () {
      return this.options.iconBg
    },
    iconColor () {
      return this.options.iconColor
    },
    isHtmlStr () {
      const doc = new DOMParser().parseFromString(this.options.message, 'text/html')
      return Array.from(doc.body.childNodes).some(node => node.nodeType === 1)
    },
    cancelText () {
      return this.options.cancel.text
    },
    confirmText () {
      return this.options.confirm.text
    },
    toastPosition () {
      if (this.options) { return `${this.options.position.split('-')[0]} ${this.options.position}` } else { return '' }
    }
  },
  mounted () {
    this.$nuxt.$on('toast', (options) => {
      this.options = options
      this.show = true
    })
  },
  updated () {
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      if (!this.hover) {
        setInterval(() => {
        }, this.options.timeout)
        this.show = false
      }
    }, this.options.timeout)
  },
  methods: {
    async confirm () {
      await this.options.confirm.resolver()
      this.close()
    },
    async cancel () {
      await this.options.cancel.resolver()
      this.close()
    },
    close () {
      clearTimeout(this.timeoutId)
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
.top {
  top: 1.5rem;
  &-left {
    left: 2.2rem;
  }
  &-right {
    right: 2.2rem;
  }
}

.bottom {
  bottom: 1.5rem;
  &-left {
    left: 2.2rem;
  }
  &-right {
    right: 2.2rem;
  }
}
</style>
