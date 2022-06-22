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
          <h3 class="text-base mb-1">
            Breed
          </h3>
          <GwSelector
            v-model="clientInfo.pet[0].breed"
            placeholder="Type here"
            @change="focusField"
            :options="dogBreeds"
            label="name"
            class="overfllow-hidden"
          >
              <template v-slot:selectedOption="{selected}">
                <div class="flex items-center">
                  <span class="text-gray-700 ">{{ truncate(selected.name)}}</span>
                </div>
              </template>
              <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                <div class="flex items-center py-2">
                  <span class="text-gray-700">{{ optionObject.name }}</span>
                </div>
              </template>
          </GwSelector>
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
        <div>
          <h3 class="text-base mb-1">
            Gender
          </h3>
          <GwSelector
            v-model="clientInfo.pet[0].gender"
            placeholder="Type here"
            @change="focusField"
            :options="gender"
            label="name"
            class="overfllow-hidden"
          >
              <template v-slot:selectedOption="{selected}">
                <div class="flex items-center">
                  <span class="text-gray-700 ">{{ format(selected.name)}}</span>
                </div>
              </template>
              <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                <div class="flex items-center py-2">
                  <span class="text-gray-700">{{ format(optionObject.name) }}</span>
                </div>
              </template>
          </GwSelector>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
        <div>
          <label for="age" class="input-text-label text-gray-700 block">Is this Spayed <span class="text-xs text-gray-300">(optional)</span></label>
          <div
            class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
          >
            <label
              class="rounded-2xl relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm information_box"
              :class="{
              'bg-blue-50': isSpayed,
              }"
            >
              <input
                id="spaying"
                name="spaying"
                value="spaying"
                v-model="isSpayed"
                type="checkbox"
                @change="focusField"
                class="h-5 w-5 rounded checkbox-round"
              />
              <span
                id="reinforcement-0-label"
                class="ml-2 font-medium"
              >Yes</span>
            </label>
            <label
              class="rounded-2xl relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm information_box"
              :class="{
              'bg-blue-50': isNotSpayed,
              }"
            >
              <input
                id="neutering"
                name="neutering"
                value="neutering"
                v-model="isNotSpayed"
                type="checkbox"
                @change="focusField"
                class="h-5 w-5 rounded checkbox-round"
              />
              <span
                id="reinforcement-0-label"
                class="ml-2 font-medium"
              >No</span>
            </label>
          </div>
        </div>
        <div>
          <h3 class="text-base mb-1">
            Fixing Date
          </h3>
          <date-picker
            v-model="clientInfo.pet[0].fixing.date"
            style="width: 100% !important"
            class="w-full relative"
            :disabled-date="date => date > new Date()"
            format="DD-MMM-YYYY"
            :clearable="false"
            @change="focusField"
          ></date-picker>
        </div>
      </div>

      <div class="flex flex-col gap-1.5 mt-3">
        <label
          class="required"
        >Behavioural Problems</label>
        <TagInput v-model="clientInfo.behaviouralIssues" :tabindex="9" placeholder="Press [Tab] to move on, or [Enter] to add multiple items" @input="focusField"/>
      </div>
      <div class="grid grid-cols-1 gap-4 xl:gap-6 w-full mt-6">
        <div>
          <dt class="input-text-label">
            Owner’s Notes
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
import dogBreeds from '~/dogBreeds.json'
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
      isSpayed: false,
      isNotSpayed: false,
      clientInfo: { ...this.value },
      gender: [{ name: 'male' }, { name: 'female' }],
      dogBreeds: dogBreeds.sort((a, b) => {
        return a?.name > b?.name ? 1 : -1
      }).map(i => ({ ...i, name: this.format(i.name), value: this.format(i.name) }))
    }
  },
  watch: {
    isSpayed (newValue) {
      if (newValue) {
        this.clientInfo.pet[0].fixing.value = 'spaying'
        this.isNotSpayed = false
      } else {
        this.clientInfo.pet[0].fixing.value = undefined
      }
    },
    isNotSpayed (newValue) {
      if (newValue) {
        this.clientInfo.pet[0].fixing.value = 'neutering'
        this.isSpayed = false
      } else {
        this.clientInfo.pet[0].fixing.value = undefined
      }
    }
  },
  created () {
    this.clientInfo.pet[0].fixing = {
      date: new Date(this.clientInfo.pet[0]?.fixing?.date ?? Date.now()),
      value: this.clientInfo.pet[0]?.fixing?.value
    }
    this.isSpayed = this.clientInfo.pet[0]?.fixing?.value?.includes('spaying')
    this.isNotSpayed = this.clientInfo.pet[0]?.fixing?.value?.includes('neutering')
    this.clientInfo.pet[0].gender = this.gender.find((i) => {
      return i?.name === this.clientInfo.pet[0].gender
    })
    this.clientInfo.pet[0].breed = this.dogBreeds.find((i) => {
      return i?.name === this.clientInfo.pet[0].breed
    })
  },
  methods: {
    focusField () {
      this.$emit('showButtons', true)
    },
    truncate (t) {
      return (t?.length ?? 0) > 15 ? String(t).substring(0, 15) + '...' : t
    },
    format (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  @apply mx-auto;
  max-width: 512px;
}
.information_box{
  height: 2.5rem;
  border: 1px solid #E2E8F0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-transform: capitalize;
}

.checkbox-round {
    width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.checkbox-round:checked {
    background-color: #fff;
    border-width: 5px;
    border-color: #3B82F6;
}

</style>
