<template>
  <div>
    <div
      class="tail-rounded-md tail-bg-white tail-cursor-pointer tail-p-4 tail-mb-4 tail-flex tail-items-center tail-justify-between tail-m-4"
    >
      <div class="tail-w-full hover:tail-bg-gray-100" @click="viewClass">
        <h3 class="tail-font-semibold tail-text-base tail-text-gray-800">
          {{ identifier._id.title }}
        </h3>
        <p class="tail-text-sm tail-truncate tail-text-gray-500">
          Started on {{ identifier._id.date }}
        </p>
        <p class="tail-text-sm tail-truncate tail-text-gray-500">
          <span> {{ identifier._id.classNo }} classes</span>-
          <span>{{ identifier._id.remainder }} remaining</span>
        </p>
        <p class="tail-font-semibold tail-text-gray-800">
          {{ identifier._id.amount }}
        </p>
      </div>
      <div>
        <div v-if="identifier._id.status === 'active'">
          <img class="tail-h-6" src="~/assets/img/chevron-right.svg" alt="google logo">
        </div>
        <div v-else>
          <button
            class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
            @click.prevent="showSubMenu"
          >
            <i class="ns-ellipsis tail-font-bold tail-text-gray-600 tail-text-lg"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-show="meetSubMenu" v-click-outside="externalClick" class="tail-texl-sm">
      <GwOptions
        :options="['Edit Draft', 'Delete Draft']"
        selected=""
        @selected="classDetails"
      />
    </div>
    <Modal :is-open="openDeleteModal" :input-width="30" @close="openDeleteModal = $event" @closeBackDrop="openDeleteModal = $event">
      <CancelAlert @close="openDeleteModal = $event">
        <template v-slot:text>
          <div class="tail-text-base tail-font-medium tail-text-left">
            Are you sure you want to delete the course {{ identifier._id.title }}? A notification will be sent to all participants
          </div>
        </template>
      </CancelAlert>
    </Modal>
    <Modal
      :is-open="newCourse"
      :input-width="40"
      @close="newCourse = $event"
      @closeBackDrop="newCourse = $event"
    >
      <template v-slot:status>
        <div class="tail-px-2 tail-text-xl">
          Edit Course
        </div>
      </template>
      <CreateCourse @close="newCourse = $event" />
    </Modal>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'CourseIdentifier',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    identifier: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meetSubMenu: false,
      openDeleteModal: false,
      newCourse: false
    }
  },
  methods: {
    viewClass () {
      this.$router.push({
        name: 'Course-id',
        params: {
          id: this.identifier._id.id
        }
      })
    },
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    classDetails (selected) {
      if (selected === 'Delete Draft') {
        this.openDeleteModal = true
        this.meetSubMenu = false
      } else {
        this.newCourse = true
        this.meetSubMenu = false
      }
    },
    externalClick (e) {
      this.meetSubMenu = false
    }
  }
}
</script>

<style></style>
