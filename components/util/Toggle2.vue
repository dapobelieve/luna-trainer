<template>
  <label class="switch">
    <input :disabled="disabled" :checked="value" type="checkbox" @click="$emit('input', !value)">
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E2E8F0;
    -webkit-transition: .4s;
    transition: .4s;
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 0px;
      top: 4px;
      background-color: #fff;
      -webkit-transition: .4s;
      transition: .4s;
    }
    &.round {
      border-radius: 4px;
      &:before {
        border-radius: 2px;
      }
    }
  }
  input:checked + .slider {
    background-color: #3B82F6;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    //transform: translateX(26px);
  }
}
</style>
