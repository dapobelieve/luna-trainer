<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Add your first client
    </h2>
    <form class="tail-flex tail-flex-col tail-gap-6 tail-mt-6 lg:tail-mt-10">
      <div class="tail-flex tail-flex-col tail-gap-1.5 tail-w-full">
        <label for="firstName" :class="{'tail-text-red-400' : $v.firstName.$error}">First name<span v-if="$v.firstName.$dirty" class="tail-text-red-400">*</span></label>
        <div class>
          <input
            id="firstName"
            v-model="firstName"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            :class="{'tail-shadow-md tail-border-red-400' : $v.firstName.$error}"
            @blur="$v.firstName.$touch()"
          />
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="email" :class="{'tail-text-red-400' : $v.email.$error}">Email Address<span v-if="$v.firstName.$dirty" class="tail-text-red-400">*</span></label>
        <div class>
          <input
            id="email"
            v-model="email"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            :class="{'tail-shadow-md tail-border-red-400' : $v.email.$error}"
            @blur="$v.email.$touch()"
          />
          <div v-if="$v.email.$error" class="tail-mt-0.5">
            <small
              v-if="!$v.email.email"
              class="error tail-text-red-400"
            >Please enter a valid email address.</small>
          </div>
        </div>
      </div>

      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="petName">Dog name</label>
        <div class>
          <input
            id="petName"
            v-model="petName"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="petBreed">Breed</label>
        <div class>
          <input
            id="petBreed"
            v-model="petBreed"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
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
    email: {
      required,
      email
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
