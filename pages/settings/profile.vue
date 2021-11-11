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
          <div class="border-dashed cursor-pointer flex items-center rounded p-2" @click="()=>$refs.fileInput.click()">
            <input
              ref="fileInput"
              type="file"
              name="image"
              class="hidden"
              accept="image/*"
              @change="profileImageChange"
            />
            <ClientAvatar
              v-if="!profileImageUrl"
              :width="4.5"
              :height="4.5"
              :client-info="!profile.firstName && !profile.lastName ? {firstName: 'Get', lastName: 'Welp'} : profile"
            />
            <img
              v-else
              :class="[ 'p-0', 'rounded-full', 'w-16','h-16', 'border', 'bg-gray-200']"
              style="object-fit: cover"
              :src="profileImageUrl"
            >
            <div class="info">
              <template v-if="!profileImageUrl">
                <p class="">
                  Drop images here or <u>browse</u>
                </p>
                <p class="">
                  Image format: jpeg, png or gif
                </p>
              </template>
              <template v-else>
                <p>
                  <u>Upload a different image?</u>
                </p>
              </template>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col gap-1.5 flex-grow">
            <label for="first-name" class="required">First name</label>
            <div class>
              <input
                id="first-name"
                v-model="profile.firstName"
                type="text"
                name="first-name"
                class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
                :class="{'border-red-500' : $v.profile.firstName.$invalid}"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1.5 flex-grow">
            <label for="last-name" class="required">Last name</label>
            <div class>
              <input
                id="last-name"
                v-model="profile.lastName"
                type="text"
                name="last-name"
                class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
                :class="{'border-red-500' : $v.profile.lastName.$invalid}"
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
            v-model="profile.businessName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.profile.businessName.$invalid}"
          />
        </div>
        <div class="flex flex-col gap-1.5 relative mb-1">
          <label
            for="websiteUrl"
            class="required"
          >What’s your website url?</label>
          <input
            id="websiteUrl"
            v-model="profile.websiteUrl"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.profile.websiteUrl.$invalid}"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="country" class="required">Where are you based?</label>
          <select
            v-model="profile.location"
            autocomplete="country"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.profile.location.$invalid}"
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
            v-model="profile.currency"
            autocomplete="currency"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.profile.currency.$invalid}"
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
            v-model="profile.timezone"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.profile.timezone.$invalid}"
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
            v-model="profile.dateFormat"
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
          <settings-tag-input v-model="profile.accreditations" :tabindex="9" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            class="required"
          >What training or behavioural areas do you specialise in? e.g Puppies, Separation Anxiety</label>
          <settings-tag-input v-model="profile.specialization" :class="{'border-red-500' : $v.profile.specialization.$invalid}" :tabindex="9" />
        </div>
        <div class="flex flex-row gap-2">
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
          >
            <input
              v-model="profile.usePositiveReinforce"
              type="radio"
              name="profile.usePositiveReinforce"
              :checked="profile.usePositiveReinforce"
              :value="true"
              class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
              aria-labelledby="usePositiveReinforce-0-label"
              aria-describedby="usePositiveReinforce-0-description"
            />
            <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">Yes</span>
          </label>
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{ 'bg-blue-50' : !profile.usePositiveReinforce }"
          >
            <input
              v-model="profile.usePositiveReinforce"
              :checked="profile.usePositiveReinforce"
              type="radio"
              name="profile.usePositiveReinforce"
              :value="false"
              class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
              aria-labelledby="usePositiveReinforce-0-label"
              aria-describedby="usePositiveReinforce-0-description"
            />
            <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">No</span>
          </label>
        </div>
        <div class="flex justify-end">
          <button-spinner
            style="width:fit-content"
            :disabled="$v.$invalid"
            :loading="isLoading"
            @click="update"
          >
            Update
          </button-spinner>
        </div>
      </form>
    </div>
    </form>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import timezones from '~/timezones.json'
import countries from '~/countries.json'
export default {
  data () {
    return {
      profile: JSON.parse(JSON.stringify(this.$auth.user)),
      profileImageUrl: this.$auth.user.imgURL,
      profileImageData: null,
      isLoading: false,
      countries,
      timezones
    }
  },
  validations: {
    profile: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      businessName: {
        required
      },
      location: {
        required
      },
      currency: {
        required
      },
      timezone: {
        required
      },
      specialization: {
        required,
        minLength: minLength(1)
      },
      dateFormat: {
        required
      },
      websiteUrl: {
        isUrl: (value) => {
          // eslint-disable-next-line
          const urlRegex =  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
          return urlRegex.test(value)
        }
      }
    }
  },
  methods: {
    ...mapActions('profile', {
      updateProfile: 'updateProfile',
      uploadPicture: 'uploadProfileImage'
    }),
    async update () {
      this.isLoading = true
      return await this.updateProfile(this.profile).then(async (response) => {
        if (response.status === 'success') {
          if (this.profileImageUrl !== this.profile.imgURL) {
            await this.uploadProfileImage()
            this.$gwtoast.success('Updated profile successfully')
          } else {
            this.$gwtoast.success('Updated profile successfully')
          }
        }
      }).catch((err) => {
        if (err.response) {
          this.$gwtoast.error(`Something went wrong: ${err.response.data.error || err.response.data.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    uploadProfileImage () {
      const imageData = new FormData()
      imageData.append('file', this.profileImageData)
      return this.uploadPicture(imageData)
    },
    profileImageChange (e) {
      const files = e.target.files
      const reader = new FileReader()
      this.profileImageData = files[0]
      reader.onload = (e) => {
        this.profileImageUrl = e.target.result
      }
      reader.readAsDataURL(this.profileImageData)
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
