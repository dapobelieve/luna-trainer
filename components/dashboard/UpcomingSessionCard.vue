<template>
  <div :id="`s-card-${scard}`" class="session-card relative cursor-pointer">
    <div class="px-4 py-4 rounded-2xl flex items-center rounded-xl lg:ml-2" :class="`bg-${color}-50`">
      <div class="mr-3">
        <ClientAvatar />
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold">
          Dog aggression training with James Blanco
        </h3>
        <small class="text-sm">7:30 - 8:30AM</small>
        <span class="text-gray-400 text-sm">Remote</span>
      </div>
      <div class="ml-auto">
        <i class="fi-rr-angle-small-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
let scard = 0
export default {
  props: {
    color: {
      type: String,
      default: 'pink'
    }
  },
  data () {
    return {
      scard: scard++
    }
  },
  mounted () {
    const styleElem = document.head.appendChild(document.createElement('style'))
    styleElem.innerHTML = `#s-card-${this.scard}:after {@apply bg-${this.color}-500}`
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .mr-3 {
    img {
      //height: 5rem !important;
      //width: 5rem !important;
    }
  }
}
.session-card {
  &::after {
    content: "";
    top: 0;
    border-radius: 4px;
    height: 100%;
    position: absolute;
    width: 4px;
    @apply bg-pink-500;
  }
}
</style>
