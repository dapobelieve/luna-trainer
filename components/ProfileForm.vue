<template>
  <div class="tail-grid tail-gap-4 tail-bg-white tail-px-5 tail-py-10 tail-rounded-md">
    <div>
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div>
          <label for="location" class="form-label">Profile Image</label>
          <div style="cursor: pointer" class="border-dashed tail-flex tail-items-center tail-rounded tail-p-3" @click="()=>$refs.fileInput.click()">
            <input
              ref="fileInput"
              type="file"
              name="image"
              class="tail-hidden"
              accept="image/*"
              @change="onChange"
            />
            <div class="tail-h-20 tail-w-20">
              <img
                v-if="!profileImageUrl"
                style="object-fit: cover"
                :class="[ 'tail-p-2', 'tail-rounded-full', 'tail-w-full','tail-h-full', 'tail-border', 'tail-bg-gray-200']"
                src="~/assets/img/avatar-placeholder.gif"
              >
              <img
                v-else
                :class="[ 'tail-p-0', 'tail-rounded-full', 'tail-w-full','tail-h-full', 'tail-border', 'tail-bg-gray-200']"
                style="object-fit: cover"
                :src="profileImageUrl"
              >
            </div>
            <div class="tail-ml-4">
              <template v-if="!profileImageUrl">
                <small class="tail-block"> Drop images here or <u>browse</u> </small>
                <small class="tail-text-gray-400">Image format: jpeg, png or gif</small>
              </template>
              <template v-else>
                <small class="tail-block"> <u>Upload a different image?</u> </small>
              </template>
            </div>
          </div>
        </div>
        <div class="tail-flex tail-justify-between tail-flex-col lg:tail-flex-row tail-gap-6">
          <div class="tail-w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
            <input v-model="profile.firstName" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input v-model="profile.lastName" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div>
          <label for="email">Email address</label>
          <input v-model="profile.email" disabled type="email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md tail-bg-gray-200">
        </div>
        <div>
          <label for="location">Location</label>
          <div class="">
            <select
              v-model="profile.location"
              autocomplete="country"
              class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
            >
              <option v-for="country in countries" :key="country.numericCode">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="location">Time zone</label>
          <div class="">
            <select
              id="timezone"
              v-model="profile.timezone"
              class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
            >
              <option v-for="time in timezones" :key="time.index">
                {{ time.text }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="location">Date Format</label>
          <div class="">
            <select
              id="dateformat"
              v-model="profile.dateFormat"
              class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
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
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
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
          <input v-model="profile.businessName" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="url">Website URL</label>
          <input
            v-model="profile.websiteUrl"
            type="website"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            @input="change($event)"
            @change="change($event)"
          >
          <small v-if="isValid" class="tail-text-red-700">url is invalid</small>
        </div>
        <div>
          <label for="experience">Years of experience</label>
          <select
            id="experience"
            v-model="profile.experience"
            type="text"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
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
        <div class="tail-flex tail-justify-end">
          <button-spinner :loading="loading" type="button" style="width:fit-content" @click="submit">
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
