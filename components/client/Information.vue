<template>
  <div>
    <div class="bg-gray-100 rounded-xl">
      <div class="py-4 flex flex-col items-center ">
        <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
        <div class="flex space-x-2 mt-2">
          <GwInputField
            v-model="clientInfo.firstName"
            placeholder="First name"
            type="text"
            autocomplete="text"
            :align-right="true"
            class="text-xl capitalize text-right"
            @input="focusField"
          />
          <GwInputField
            v-model="clientInfo.lastName"
            placeholder="Last name"
            autocomplete="text"
            type="text"
            class="text-xl capitalize"
            @input="focusField"
          />
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
          <div class="place-self-auto mt-1">
            <dt class="input-text-label">
              Email Address
            </dt>
            <dd class="truncate information_box">
              {{ clientInfo && clientInfo.email }}
            </dd>
          </div>
          <div>
            <PhoneComponent v-model="clientInfo.phoneNumber" label="Telephone" @input="focusField" />
          </div>
        </div>
        <div class="grid grid-cols-1 w-full mt-6">
          <div class="w-full">
            <dt class="input-text-label">
              Country
            </dt>
            <GwSelector v-model="clientInfo.businessCountry" class="w-full repeat-selector" :options="countries" @change="focusField">
              <template v-slot:selectedOption="{selected}">
                <div class="flex items-center">
                  <span class="text-gray-700">{{ selected.name }}</span>
                </div>
              </template>
              <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                <div class="flex items-center py-2">
                  <span class="text-gray-700">{{ optionObject.name }}</span>
                </div>
              </template>
            </GwSelector>
          </div>
          <div class="mt-4">
            <GwInputField
              v-model="clientInfo.location"
              placeholder="Type here"
              type="text"
              label="Address"
              autocomplete="text"
              class-name="information_box"
              class="w-full"
              @input="focusField"
            />
          </div>
          <div class="mt-4">
            <GwInputField
              v-model="clientInfo.city"
              placeholder="Type here"
              type="text"
              label="City"
              autocomplete="text"
              class-name="information_box"
              class="w-full"
              @input="focusField"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 w-full mt-6">
          <div>
            <GwInputField
              v-model="clientInfo.zip"
              placeholder="Type here"
              type="text"
              autocomplete="text"
              label="Post Code/ Zip Code"
              class-name="information_box"
              @input="focusField"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countries from '~/countries.json'
export default {
  name: 'ClientInformation',
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
      clientInfo: this.value,
      countries
    }
  },
  created () {
    this.clientInfo.businessCountry = this.countries.find((i) => {
      return i?.code === this.clientInfo.businessCountry
    })
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
  @apply mx-auto px-4 pb-4;
  max-width: 512px;
}
</style>
