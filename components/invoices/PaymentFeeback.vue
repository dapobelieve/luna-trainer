<template>
  <div class="bg-[#F1F5F9] w-screen justify-center item-center flex" style="height: 100vh;">
    <div class="text-center my-20">
      <div class="flex justify-center item-center my-5">
        <div class="bg-red-400 flex justify-center justify-items-center item-center place-content-center text-center rounded-full w-16 h-16">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="text-[30px] font-semi-bold">
        {{ title }}
      </div>
      <div class="w-100 text-center text-[#64748B] text-[15px] my-3">
        <slot name="description">
        </slot>
      </div>
      <div class="my-4">
        <slot name="button"></slot>
      </div>
    </div>

    <a href="https://web.goluna.app/privacy" class="absolute bottom-0 text-center my-5 text-[#64748B]">
      <div>
        Privacy . Terms
      </div>
      <div>
        Luna © {{ date }}
      </div>
    </a>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'PaymentFeedback',
  props: {
    title: String,
    dueDate: [Date, String]
  },
  data () {
    return {
      date: format(new Date(Date.now()), 'yyyy')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.tablinks {
  @apply text-base font-normal text-gray-400;
}
.tabs {
  color: rgb(128, 123, 123);
}
.tabs button {
  transition: 0.3s;
}

button {
  position: relative;
  &.active {
    @apply text-gray-700 font-normal;
    &::after {
      content: "";
      @apply bg-blue-500 h-1 w-full rounded-sm shadow-md absolute -bottom-4;
    }
  }
}
</style>
