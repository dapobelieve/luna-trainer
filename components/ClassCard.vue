<template>
  <div>
    <div
      class="tail-rounded-md tail-bg-white tail-cursor-pointer tail-p-4 tail-mb-4 tail-flex tail-items-center tail-justify-between tail-m-4"
    >
      <div>
        <div @click="$emit('showInfo', false)">
          <h3 class="tail-font-semibold tail-text-base tail-text-gray-800">
            {{ data._id.title }} :  {{ data._id.date }}
          </h3>
          <p class="tail-text-sm tail-truncate tail-text-gray-500">
            Location ({{ data.courses[0].location }})
          </p>
          <p class="tail-text-sm tail-truncate tail-text-gray-500">
            {{ data.courses[0].participants }} participants - {{ data.courses[0].time }}
          </p>
        </div>
      </div>
      <div>
        <button
          class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click.prevent="showSubMenu"
        >
          <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
        </button>
      </div>
    </div>
    <div v-show="meetSubMenu" class="">
      <GwOptions
        :options="['Reschedule Class', 'Message', 'Cancel Class']"
        selected=""
        @selected="classActions"
      />
    </div>

    <Modal :is-open="openReschedule" :input-width="30" @close="openReschedule = $event">
      <template v-slot:status>
        <div class="tail-px-2 tail-text-2xl tail-font-bold">
          Reschedule Class
        </div>
      </template>
      <div>
        <Reschedule @close="openReschedule = $event" />
      </div>
    </Modal>
    <Modal :is-open="openDeleteModal" :input-width="30" @close="openDeleteModal = $event">
      <CancelAlert @close="openDeleteModal = $event">
        <template v-slot:text>
          <div class="tail-text-base tail-font-medium tail-text-left">
           Are you sure you want to cancel the class Puppies : August 26?
          </div>
        </template>
      </CancelAlert>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'ClassCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meetSubMenu: false,
      openReschedule: false,
      openDeleteModal: false
    }
  },
  methods: {
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    classActions (selected) {
      if (selected === 'Reschedule Class') {
        this.openReschedule = true
        this.meetSubMenu = false
      } else if (selected === 'Cancel Class') {
        this.openDeleteModal = true
        this.meetSubMenu = false
      }
    }
  }

}
</script>

<style>

</style>
