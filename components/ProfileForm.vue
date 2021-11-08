<template>
  <div class="grid gap-4 bg-white px-5 py-10 rounded-md">
    <div>
      <form autocomplete="off" class="grid gap-6">
        <div>
          <label for="location" class="form-label">Profile Image</label>
          <div
            style="cursor: pointer"
            class="border-dashed flex items-center rounded p-3"
            @click="()=>$refs.fileInput.click()"
          >
            <input
              ref="fileInput"
              type="file"
              name="image"
              class="hidden"
              accept="image/*"
              @change="onChange"
            />
            <div class="h-20 w-20">
              <img
                v-if="!profileImageUrl"
                style="object-fit: cover"
                :class="[ 'p-2', 'rounded-full', 'w-full','h-full', 'border', 'bg-gray-200']"
                src="~/assets/img/avatar-placeholder.gif"
              />
              <img
                v-else
                :class="[ 'p-0', 'rounded-full', 'w-full','h-full', 'border', 'bg-gray-200']"
                style="object-fit: cover"
                :src="profileImageUrl"
              />
            </div>
            <div class="ml-4">
              <template v-if="!profileImageUrl">
                <small class="block">
                  Drop images here or
                  <u>browse</u>
                </small>
                <small class="text-gray-400">Image format: jpeg, png or gif</small>
              </template>
              <template v-else>
                <small class="block">
                  <u>Upload a different image?</u>
                </small>
              </template>
            </div>
          </div>
        </div>
        <div class="flex justify-between flex-col lg:flex-row gap-6">
          <div class="w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
            <input
              v-model="profile.firstName"
              type="text"
              class="bg-white w-full p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div class="w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input
              v-model="profile.lastName"
              type="text"
              class="bg-white w-full p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label for="email">Email address</label>
          <input
            v-model="profile.email"
            disabled
            type="email"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md bg-gray-200"
          />
        </div>
        <div>
          <label for="location">Location</label>
          <div class>
            <select
              v-model="profile.location"
              autocomplete="country"
              class="bg-white shadow-sm block w-full sm:text-sm border-gray-300 rounded-md border py-2 px-2"
            >
              <option v-for="country in countries" :key="country.numericCode">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="location">Time zone</label>
          <div class>
            <select
              id="timezone"
              v-model="profile.timezone"
              class="bg-white shadow-sm block w-full sm:text-sm border-gray-300 rounded-md border py-2 px-2"
            >
              <option v-for="time in timezones" :key="time.index">
                {{ time.text }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="location">Date Format</label>
          <div class>
            <select
              id="dateformat"
              v-model="profile.dateFormat"
              class="bg-white shadow-sm block w-full sm:text-sm border-gray-300 rounded-md border py-2 px-2"
            >
              <option value="DD/MM/YY">
                DD/MM/YY
              </option>
              <option value="YY/MM/DD">
                YY/MM/DD
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="location">Currency</label>
          <select
            id="currency"
            v-model="profile.currency"
            autocomplete="currency"
            class="bg-white shadow-sm block w-full sm:text-sm border-gray-300 rounded-md border py-2 px-2"
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
        <div>
          <label for="business-name">Business Name</label>
          <input
            v-model="profile.businessName"
            type="text"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label for="url">Website URL</label>
          <input
            v-model="profile.websiteUrl"
            type="website"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
            @input="change($event)"
            @change="change($event)"
          />
          <small v-if="isValid" class="text-red-700">url is invalid</small>
        </div>
        <div>
          <label for="experience">Years of experience</label>
          <select
            id="experience"
            v-model="profile.experience"
            type="text"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
          >
            >
            <option
              v-for="val in Array.from(Array(13).keys())"
              :key="val"
              :value="parseInt(val) + 1"
              :selected="val.id == '' "
            >
              {{ parseInt(val) + 1 }}
            </option>
          </select>
        </div>
        <div>
          <label for="Specialization">Specialization</label>
          <settings-tag-input v-model="profile.specialization" :tabindex="9" />
        </div>
        <div>
          <label for="Specialization">Accreditations</label>
          <settings-tag-input v-model="profile.accreditations" :tabindex="10" />
        </div>
        <div class="flex justify-end">
          <button-spinner
            :loading="loading"
            type="button"
            style="width:fit-content"
            @click="submit"
          >
            Update profile
          </button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import timezones from '~/timezones.json'
import countries from '~/countries.json'

export default {
  name: 'ProfileForm',
  data () {
    return {
      profile: JSON.parse(JSON.stringify(this.$auth.user)),
      profileImageUrl: this.$auth.user.imgURL,
      profileImageData: null,
      loading: false,
      disabled: false,
      countries,
      timezones,
      isValid: false,
      // eslint-disable-next-line
      regex: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'profile/updateProfile',
      uploadPicture: 'profile/uploadProfileImage'
    }),
    submit () {
      if (!this.disabled) {
        this.loading = true
        return this.updateProfile(this.profile).then(async (response) => {
          if (response.status === 'success') {
            if (this.profileImageUrl !== this.profile.imgURL) {
              this.loading = true
              await this.uploadProfileImage()
              this.loading = false
              this.$toast.success('Updated profile successfully')
            } else {
              this.$toast.success('Updated profile successfully')
            }
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.error || err.response.data.message}`, { position: 'bottom-right' })
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    uploadProfileImage () {
      const imageData = new FormData()
      imageData.append('file', this.profileImageData)
      return this.uploadPicture(imageData)
    },
    onChange (e) {
      const files = e.target.files
      const reader = new FileReader()
      this.profileImageData = files[0]
      reader.onload = (e) => {
        this.profileImageUrl = e.target.result
      }
      reader.readAsDataURL(this.profileImageData)
    },
    change (e) {
      const url = e.target.value
      if (this.regex.test(url)) {
        this.isValid = false
      } else {
        this.isValid = true
      }
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
      email: {
        required,
        email
      },
      businessName: {
        required
      },
      location: {
        required
      }
    }
  }
}
</script>
<style scoped>
.border-dashed {
  border: 1px solid gray;
  border-style: dashed;
}
</style>
