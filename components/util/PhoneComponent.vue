<template>
  <div class="form-group">
    <label class="form-label" for="phone_number">
      {{ label }}
    </label>
    <client-only>
      <vue-tel-input
        :value="value"
        default-country="country"
        input-id="phone_number"
        :disabled="disable"
        input-classes="form-control"
        @onInput="compute"
      ></vue-tel-input>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Phone Number'
    },
    country: {
      type: String,
      default: 'GBP'
    },
    disable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    compute (input) {
      this.$emit('input', input.number.e164)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .vue-tel-input {
  border: none !important;
  width: 100%;

  .vti__dropdown {
    background-color: white;
    border-radius: .25rem 0 0 .25rem;
    border:1px solid #ced4da;
    &:focus-visible {
      @apply focus:border-blue-500;
      //border: 1px solid #ff9311;
    }
  }

  .vti__dropdown-list {
    max-width: 15rem;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 3px 6px #14151a14, 0px 7px 14px #474d5714, 0px 0px 1px #14151a1a; //binance shadow

    &.below {
      top: 46px;
    }
    .vti__dropdown-item {
      font-size: 14px;
      padding: 10px;
      display: flex;
      align-items: center;

      strong {
        flex-grow: 1;
      }
    }

    &::-webkit-scrollbar {
      width: 2px;
      height: 9px;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-blue-500;
      -webkit-border-radius: 1rem;
      //-webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
    }
  }

  input {
    border: 1px solid #ced4da;
    border-radius: 0 .25rem .25rem 0;
    height: 2.5rem;
    border-left: 0px;
    &:hover {
      @apply hover:border-blue-500;
    }
  }

  &:focus-within {
    box-shadow: none !important;
    border: none;
  }
}
</style>
