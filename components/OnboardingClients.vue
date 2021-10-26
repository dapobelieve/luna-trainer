<template>
  <div>
    <h2
      class="text-lg font-extrabold tracking-tight text-gray-700"
    >
      Add your first client
    </h2>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="firstName" :class="{'text-red-500' : $v.firstName.$error}">First name<span v-if="$v.firstName.$dirty" class="text-red-500">*</span></label>
        <div class>
          <input
            id="firstName"
            v-model="firstName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'shadow-md border-red-500' : $v.firstName.$error}"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1.5 relative mb-3">
        <label for="email" :class="{'text-red-500' : $v.email.$error}">Email Address<span v-if="$v.firstName.$dirty" class="text-red-500">*</span></label>
        <div class>
          <input
            id="email"
            v-model="email"
            class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'shadow-md border-red-500' : $v.email.$error}"
          />
          <div v-if="$v.email.$error" class="absolute -bottom-5">
            <small
              v-if="!$v.email.email"
              class="error text-red-500"
            >Please enter a valid email address.</small>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="petName">Dog name</label>
        <div class>
          <input
            id="petName"
            v-model="petName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="petBreed">Breed</label>
        <div class>
          <input
            id="petBreed"
            v-model="petBreed"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
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
