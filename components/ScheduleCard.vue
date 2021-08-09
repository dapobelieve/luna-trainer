<template>
  <div>
    <div>
      <div class="tail-w-full tail-mb-2">
        <div
          :class="[
            data.session === true
              ? 'tail-border-green-400'
              : 'tail-border-yellow-400'
          ]"
          class="tail-rounded-md tail-bg-white tail-border-l-4 tail-cursor-pointer tail-flex tail-justify-between tail-items-center tail-flex-col md:tail-flex-row tail-text-gray-700 tail-p-2 md:tail-p-4 tail-w-full"
        >
          <div class="tail-flex " @click="openModal = true">
            <ClientAvatar firstname="Get" lastname="Welp" />
            <div class="tail-pl-2">
              <p class="tail-font-bold">
                {{ data.meeting }} with {{ data.client }}.
              </p>
              <div>
                <span
                  style="padding-top: 0.1em; padding-bottom: 0.1rem"
                  class="tail-text-xs tail-px-3 tail-bg-gray-200 tail-text-gray-800 tail-rounded-full"
                >
                  {{ data.time }}</span>
                <span
                  class="tail-text-xs md:tail-text-sm"
                >- {{ data.venue }}</span>
              </div>
            </div>
          </div>
          <div>
            <div v-if="data.join">
              <button
                class="base-button tail-inline-flex tail-items-center tail-my-2 tail-text-white tail-px-6 md:tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click="openModal = true"
              >
                {{ data.join }}
              </button>
            </div>
            <div v-if="data.actions">
              <button
                class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
              </button>
            </div>
            <div v-if="data.cancelled">
              <button
                class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-show="meetSubMenu" class="">
          <GwOptions
            :options="['Cancel Session', 'Edit Session']"
            selected=""
            @selected="selectSession"
          />
        </div>
        <Modal :is-open="openEditModal" :input-width="30" @close="openEditModal = $event">
          <CreateSchedule :data="data" @close="openEditModal = $event" />
        </Modal>
        <Modal
          :is-open="openModal"
          :input-width="30"
          @close="openModal = $event"
        >
          <template v-slot:status>
            <div :class="[data.status === 'cancelled' ? 'tail-text-red-500' : 'tail-text-gray-500']" class="tail-bg-gray-100  tail-px-2 tail-rounded-3xl">
              {{ data.status }}
            </div>
          </template>
          <ScheduleInfoPreview :data="data" @close="openModal = $event" />
        </Modal>
        <Modal :is-open="openDeleteModal" :input-width="30" @close="openDeleteModal = $event">
          <div>
            <div class="tail-mb-2 tail-text-base">
              Are you sure you want to cancel the appointment?
            </div>
            <div class="tail-flex tail-justify-end tail-items-center">
              <button class="tail-hidden md:tail-flex tail-items-center tail-px-3.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1.5">
                Yes
              </button>
              <button class="tail-hidden md:tail-flex tail-items-center tail-px-3.5 tail-py-1 tail-rounded-md tail-bg-blue-400 tail-text-white tail-border tail-border-gray-400 tail-m-1.5">
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meetSubMenu: false,
      openModal: false,
      openDeleteModal: false,
      openEditModal: false
    }
  },
  methods: {
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    selectSession (selected) {
      if (selected === 'Cancel Session') {
        this.openDeleteModal = true
        this.meetSubMenu = false
      } else {
        this.openEditModal = true
        this.meetSubMenu = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
