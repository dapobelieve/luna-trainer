<template>
  <label class="block checkbox py-3 cursor-pointer px-3">
    <span class="flex items-centers">
      <slot></slot>
      <span class="ml-auto relative w-5">
        <input type="checkbox" class="absolute">
        <span class="checkbox-checkmark absolute"></span>
      </span>
    </span>
  </label>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.checkbox {
  input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkbox-checkmark {
      background-color: #3B82F6;
      border: none;
      &:after {
        display: block;
      }
    }
  }
}
.checkbox-checkmark {
  top: 0;
  left: 0;
  height: 20px;
  border-radius: 4px;
  width: 20px;
  border: 1px solid #64748B;
  &::after {
    content: "";
    position: absolute;
    display: none;
  }
  &::after {
    left: 7px;
    top: 1px;
    width: 7px;
    height: 14px;
    border: solid #fff;
    border-radius: 0px 1px 2px 1px;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

</style>
