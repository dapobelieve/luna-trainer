<template>
  <div class="flex flex-col gap-1.5">
    <label for="service" :class="[required ? 'required' : '']">
      <slot name="labelText"></slot>
    </label>
    <div class="relative">
      <input
        :id="id"
        :value="value"
        :autofocus="autofocus"
        :disabled="disabled"
        :type="inputType"
        :placeholder="placeholder"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        @input="$emit('input', $event.target.value)"
      />
      <span v-if="type === 'password'" class="right-2 top-3 absolute cursor-pointer" @click="showPassword = !showPassword">
        <i :class="[!showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed']" class="text-xl text-gray-400"></i>
      </span>
    </div>
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
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    inputType () {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password'
      } else {
        return this.type
      }
    }
  }
}
</script>

<style scoped>

</style>
