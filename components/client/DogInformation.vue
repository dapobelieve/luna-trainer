<template>
  <div class="w-full">
    <div class="bg-gray-100 rounded-xl">
      <div class="py-4 flex flex-col items-center ">
        <img class="h-20 w-50" src="~/assets/img/dog-avatar.png" alt="google logo">
        <div class="flex space-x-2 mt-2">
          <p class="text-xl capitalize text-center">
            {{ clientInfo.pet[0].name }}
          </p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
        <div>
          <GwInputField
            v-model="clientInfo.pet[0].name"
            label="Dog name"
            placeholder="Type here"
            type="text"
            autocomplete="text"
            class-name="information_box"
            @input="focusField"
          />
        </div>
        <div>
          <GwInputField
            v-model="clientInfo.pet[0].breed"
            placeholder="Type here"
            label="Breed"
            type="text"
            autocomplete="text"
            class-name="information_box"
            @input="focusField"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
        <div>
          <label for="age" class="input-text-label text-gray-700 block">Date of birth</label>
          <date-picker
            v-model="petAge"
            style="width: 100% !important"
            class="w-full relative"
            :disabled-date="date => date > new Date()"
            format="DD-MMM-YYYY"
            :clearable="false"
            @change="focusField"
          ></date-picker>
          <small v-if="clientInfo.pet[0].age" class="text-xs"><span class="capitalize">{{ clientInfo.pet[0].name ? clientInfo.pet[0].name : 'Your dog' }}</span> is about {{ showDate }}</small>
        </div>
      </div>
      <div class="flex flex-col gap-1.5 mt-3">
        <label
          class="required"
        >Behavioural issues</label>
        <TagInput v-model="clientInfo.behaviouralIssues" :tabindex="9" @input="focusField"/>
      </div>
      <div class="grid grid-cols-1 gap-4 xl:gap-6 w-full mt-6">
        <div>
          <dt class="input-text-label">
            Additional comments by the owner
          </dt>
          <dd class="information_text-area truncate">
            {{ clientInfo && clientInfo.notes }}
          </dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import PetAge from '~/mixins/petAge'
import TagInput from '~/components/TagInput'
export default {
  name: 'DogInformation',
  components: { DatePicker, TagInput },
  mixins: [PetAge],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      clientInfo: this.value
    }
  },
  methods: {
    focusField () {
      this.$emit('showButtons', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  @apply mx-auto;
  max-width: 512px;
}
</style>
