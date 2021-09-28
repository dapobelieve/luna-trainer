<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"

    >Add your first client</h2>
    <form class="tail-flex tail-flex-col tail-gap-6 tail-mt-6 lg:tail-mt-10">
      <div class="tail-flex tail-flex-row tail-gap-4">
        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-w-full">
          <label for="firstName" class="required">First name</label>
          <div class>
            <input
              id="firstName"
              v-model="firstName"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
          </div>
        </div>
        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-w-full">
          <label for="lastName" class="required">Last name</label>
          <div class>
            <input
              id="lastName"
              v-model="lastName"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
          </div>
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="email" class="required">Email Address</label>
        <div class>
          <input
            id="email"
            v-model="email"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"

          />
          <div v-if="$v.email.$error" class="tail-mt-0.5">
            <small
              v-if="!$v.email.email"
              class="error tail-text-red-700"
            >Please enter a valid email address.</small>
          </div>
        </div>
      </div>

      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="petName" class="required">Dog name</label>
        <div class>
          <input
            id="petName"
            v-model="petName"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="petBreed" class="required">Breed</label>
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
