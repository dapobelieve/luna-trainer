<template>
  <div class="parent-container bg-white rounded-xl p-4">
    <h2 class="heading text-xl text-gray-700 font-normal pb-8">
      Profile
    </h2>

    <div class="content">
      <p class="section-title">
        ABOUT YOU
      </p>
      <form class="flex flex-col gap-6">
        <div class="flex flex-col gap-1.5">
          <label>Profile image</label>
          <div class="border-dashed flex items-center rounded p-2">
            <ClientAvatar
              :width="4.5"
              :height="4.5"
              :client-info="{
                firstName: 'Get',
                lastName: 'Welp'
              }"
            />
            <div class="info">
              <p class="">
                Drop images here or <u>browse</u>
              </p>
              <p class="">
                Image format: jpeg, png or gif
              </p>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col gap-1.5 flex-grow">
            <label for="first-name" class="required">First name</label>
            <div class>
              <input
                id="first-name"
                type="text"
                name="first-name"
                class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1.5 flex-grow">
            <label for="last-name" class="required">Last name</label>
            <div class>
              <input
                id="last-name"
                type="text"
                name="last-name"
                class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            for="businessName"
            class="required"
          >What’s your business’s name?</label>
          <input
            id="businessName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col gap-1.5 relative mb-1">
          <label
            for="websiteURL"
            class="required"
          >What’s your website url?</label>
          <input
            id="website"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
          <!-- <small v-if="isValid" class="text-red-500 text-sm absolute -bottom-5">url is invalid</small> -->
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="country" class="required">Where are you based?</label>
          <select
            autocomplete="country"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option v-for="country in countries" :key="country.numericCode">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            for="currency"
            class="required"
          >Select your local currency</label>
          <select
            id="currency"
            autocomplete="currency"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="AUD">
              AUD
            </option>
            <option value="CAD">
              CAD
            </option>
            <option value="GBP">
              GBP (£)
            </option>
            <option value="USD">
              USD
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="timezone" class="required">Time zone</label>
          <select
            id="timezone"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option v-for="time in timezones" :key="time.index">
              {{ time.text }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="dateformat">Date format</label>
          <select
            id="dateformat"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="DD/MM/YY">
              DD/MM/YY
            </option>
            <option value="YY/MM/DD">
              YY/MM/DD
            </option>
          </select>
        </div>

        <!-- trainer info section -->
        <p class="section-title" style="padding: 12px 0">
          AS A TRAINER
        </p>
        <div class="flex flex-col gap-1.5">
          <label for="accreditations">Do you have any accreditations? e.g APDT</label>
          <settings-tag-input :block="false" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            class="required"
          >What training or behavioural areas do you specialise in? e.g Puppies, Separation Anxiety</label>
          <settings-tag-input :block="false" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            for="reinforcement"
          >Do you use positive reinforcement, force free, trust based methods?</label>
          <div class="flex flex-row gap-2">
            <label
              class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            >
              <input
                type="radio"
                name="reinforcement"
                checked="reinforcement"
                value="yes"
                class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
                aria-labelledby="reinforcement-0-label"
                aria-describedby="reinforcement-0-description"
              />
              <span id="reinforcement-0-label" class="block font-medium ml-2">Yes</span>
            </label>
            <label
              class="bg-blue-50 rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            >
              <input
                checked="reinforcement"
                type="radio"
                name="reinforcement"
                value="no"
                class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
                aria-labelledby="reinforcement-0-label"
                aria-describedby="reinforcement-0-description"
              />
              <span id="reinforcement-0-label" class="block font-medium ml-2">No</span>
            </label>
          </div>
        </div>
        <div class="flex justify-end">
          <button-spinner
            style="width:fit-content"
            :loading="isLoading"
          >
            Update
          </button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import timezones from '~/timezones.json'
import countries from '~/countries.json'
export default {
  data () {
    return {
      countries,
      timezones,
      isLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.parent-container {
  border: 1px solid #e2e8f0;
}

.heading {
  line-height: 28px;
}

.content {
  @apply mx-auto;
  width: 448px;

  .section-title {
    @apply text-gray-500 text-xs font-medium pb-6;
    line-height: 16px;
  }
}

.border-dashed{
  @apply p-2 rounded-md;
    border: 1px dashed #E2E8F0;
    border-style: dashed;

    .info {
      @apply ml-4;
      p:first-child {
        @apply text-gray-700 text-base font-normal;
        line-height: 24px;
      }
      p{
        @apply font-normal text-gray-500 text-sm;
        line-height: 20px;
      }
    }
}
</style>
