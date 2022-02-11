<template>
  <div class="items-center w-2 inline-flex flex-col py-4">
    <div :id="`bar-${bar}`" class="bar-container w-[4px] h-[7.25rem] bg-gray-100 rounded-lg relative mb-2"></div>
    <span class="text-sm">{{ label }}</span>
  </div>
</template>

<script>
let bar = 0
export default {
  props: {
    color: {
      type: String,
      default: 'cyan'

    },
    label: {
      type: String,
      default: 'lun'
    }
  },
  data () {
    return {
      bar: bar++
    }
  },
  computed: {

  },
  mounted () {
    const styleElem = document.head.appendChild(document.createElement('style'))
    styleElem.innerHTML = `#bar-${this.bar}:before {background: ${this.color} }`
  }
}
</script>

<style scoped lang="scss">
.bar-container {
  &:before {
    content: "";
    height: 25%;
    border-radius: 8px;
    bottom: 0;
    width: 100%;
    position: absolute;
    //background-color: red;
  }
}
</style>
