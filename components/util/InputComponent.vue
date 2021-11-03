<template>
  <div class="flex flex-col gap-1.5">
    <label for="service" :class="[required ? 'required' : '']">
      <slot name="labelText"></slot>
    </label>
    <input
      :id="id"
      :value="value"
      :autofocus="autofocus"
      :type="type"
      :placeholder="placeholder"
      class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
/**
 * Still needs to be refactored
 * to be robust
 */
export default {
  props: {
    id: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'placehoder'
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
