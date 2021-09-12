<template>
  <div>
    <h2 class="tail-text-lg tail-font-medium tail-text-gray-900">
      <b v-if="services.length">You have added {{ services.length }} service{{ services.length === 1 ? '' : 's' }}</b>
      <b v-else>You have no services</b>
    </h2>
    <div class="tail-flex tail-flex-col tail-mt-5">
      <div v-for="(n, index) in services" :key="index" class="tail-rounded-xl tail-border-2 tail-border-blue-300 tail-overflow-hidden tail-w-72 tail-bg-white tail-mb-4 last:tail-mb-0">
        <div class="tail-px-3 tail-py-2 tail-border tail-border-b">
          <div class="tail-flex tail-justify-between">
            <span class="tail-capitalize tail-text-gray-600 tail-font-semibold">{{ n.title }}</span>
            <span class="tail-text-gray-600 tail-font-semibold">
              £{{ n.price }}.00
            </span>
          </div>
          <p v-for="a in n.appointmentType" :key="a.title" class="tail-capitalize tail-font-thin tail-mb-0 tail-text-gray-500 tail-text-sm">
            {{ a }}
          </p>
        </div>
        <div class="tail-flex tail-justify-around tail-py-3 tail-text-blue-500">
          <i class="ns-pencil" role="button" @click.prevent="editService(index)"></i>
          <i class="ns-trash" role="button" @click.prevent="deleteService(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'OnboardingServiceCards',
  computed: {
    ...mapState({
      services: state => state.profile.trainnerRegData.services,
      editingService: state => state.profile.editingServiceCard
    })
  },
  methods: {
    ...mapMutations({
      updateServices: 'profile/UPDATE_TRAINNER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    deleteService (index) {
      if (this.editingService) {
        this.$toast.error('You are currently editing a service', { position: 'top-right' })
      } else {
        const updatedServices = [...this.services]
        updatedServices.splice(index, 1)
        this.updateServices({ parent: 'services', type: 'deleteService', value: updatedServices })
      }
    },
    editService (index) {
      this.$emit('editservice', index)
      this.setTempState({ editingServiceCard: true })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
