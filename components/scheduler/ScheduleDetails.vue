<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-end mb-4">
      <span class="cursor-pointer" @click="$emit('close')">
        <i class="fi-rr-cross text-primary-color"></i>
      </span>
    </div>
    <div class="flex-grow">
      <h4 class="text-2xl mb-2 text-gray-700 mb-3">
        {{ event.title }}
      </h4>
      <p class="mb-4">
          {{event.description}}
      </p>      
      <div class="mb-4">
        <EventItem :event="event" />
      </div>
      <div v-if="event.participants">
          <div v-for="client in event.participants">
            <div class="flex items-center content-center py-1 mb-2.5">
              <ClientAvatar
                :width="3"
                :height="3"
                :client-info="{firstName: client.name, ...client}"
              />
              <div class="ml-2">
                <p class="capitalize font-medium text-md  text-gray-700">
                  {{ client.name }}
                </p>
                <span class="text-sm text-gray-400">{{ client.email }}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="schedule-footer flex justify-around mb-4">
      <button @click="$modal.show('scheduler-cancel-session')" class="text-primary-color">Cancel</button>
      <button class="button-fill" @click="$emit('reschedule', event)">
        Reschedule
      </button>
    </div>
    <CancelSessionModal :loading="loading" @close="closeModal" @cancel="deleteEvent" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import EventItem from "~/components/scheduler/EventItem";
import CancelSessionModal from "~/components/scheduler/CancelSessionModal";
export default {
  data() {
    return {
      loading: false
    }
  },
  components: {CancelSessionModal, EventItem},
  computed: {
    ...mapGetters({
      event: "scheduler/getActiveEvent"
    })
  },
  methods: {
    async deleteEvent() {
      this.loading = true
      try {
        await this.$store.dispatch('scheduler/deleteAppointment', {id: this.event.id});
        this.$emit('remove-event', this.event.id)
        this.closeModal()
        this.$gwtoast.success('Session Deleted')
        this.$emit('close')
      }catch (e) {
        console.log(e)
      }finally {
        this.loading = false
      }
    },
    closeModal() {
      this.$modal.hide('scheduler-cancel-session')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.button-fill {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
</style>
