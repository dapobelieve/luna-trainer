<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Add your first client
    </h2>
    <form
      class="tail-grid tail-grid-cols-1 tail-gap-y-6 sm:tail-grid-cols-2 sm:tail-gap-x-8 tail-mt-10 tail-text-gray-700"
    >
      <div class="sm:tail-col-span-2">
        <label
          for="firstName"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.firstName.$error}"
        >
          First name <span v-if="$v.firstName.$dirty" class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="firstName"
            v-model="firstName"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-outline-none focus:tail-shadow-md focus:tail-bg-white focus:tail-border-blue-400 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
            :class="{'tail-shadow-md tail-border-red-700' : $v.firstName.$error}"
            @blur="$v.firstName.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="lastName"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.lastName.$error}"
        >
          Last name <span v-if="$v.firstName.$dirty" class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="lastName"
            v-model="lastName"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-outline-none focus:tail-shadow-md focus:tail-bg-white focus:tail-border-blue-400 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
            :class="{'tail-shadow-md tail-border-red-700' : $v.lastName.$error}"
            @blur="$v.lastName.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="email"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.email.$error}"
        >
          Email Address <span v-if="$v.firstName.$dirty" class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="email"
            v-model="email"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-outline-none focus:tail-shadow-md focus:tail-bg-white focus:tail-border-blue-400 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
            :class="{'tail-shadow-md tail-border-red-700' : $v.email.$error}"
            @blur="$v.email.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="petName"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Dog name
        </label>
        <div class="">
          <input
            id="petName"
            v-model="petName"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="petBreed"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Breed
        </label>
        <div class="">
          <input
            id="petBreed"
            v-model="petBreed"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'OnboardingClients',
  computed: {
    ...mapState({
      clientData: state => state.profile.trainnerRegData.client
    }),
    firstName: {
      get () { return this.clientData.firstName },
      set (val) {
        this.addClient({ parent: 'client', key: 'firstName', value: val })
      }
    },
    lastName: {
      get () { return this.clientData.lastName },
      set (val) {
        this.addClient({ parent: 'client', key: 'lastName', value: val })
      }
    },
    email: {
      get () { return this.clientData.email },
      set (val) {
        this.addClient({ parent: 'client', key: 'email', value: val })
      }
    },
    petName: {
      get () { return this.clientData.petName },
      set (val) {
        this.addClient({ parent: 'client', key: 'petName', value: val })
      }
    },
    petBreed: {
      get () { return this.clientData.petBreed },
      set (val) {
        this.addClient({ parent: 'client', key: 'petBreed', value: val })
      }
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required
    }
  },
  methods: {
    ...mapMutations({
      addClient: 'profile/UPDATE_TRAINNER_REG_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
