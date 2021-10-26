<template>
  <div>
    <div
      class="rounded-md bg-white cursor-pointer p-4 mb-4 flex items-center justify-between m-4"
    >
      <div class="w-full hover:bg-gray-100" @click="viewClass">
        <h3 class="font-semibold text-base text-gray-800">
          {{ identifier._id.title }}
        </h3>
        <p class="text-sm truncate text-gray-500">
          Started on {{ identifier._id.date }}
        </p>
        <p class="text-sm truncate text-gray-500">
          <span> {{ identifier._id.classNo }} classes</span>-
          <span>{{ identifier._id.remainder }} remaining</span>
        </p>
        <p class="font-semibold text-gray-800">
          {{ identifier._id.amount }}
        </p>
      </div>
      <div>
        <div v-if="identifier._id.status === 'active'">
          <img class="h-6" src="~/assets/img/chevron-right.svg" alt="google logo">
        </div>
        <div v-else>
          <button
            class=" inline-flex items-center px-4 md:px-2 py-1 mt-2  border-0 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            @click.prevent="showSubMenu"
          >
            <i class="ns-ellipsis font-bold text-gray-600 text-lg"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-show="meetSubMenu" v-click-outside="externalClick" class="texl-sm">
      <GwOptions
        :options="['Edit Draft', 'Delete Draft']"
        selected=""
        @selected="classDetails"
      />
    </div>
    <GwModal :is-open="openDeleteModal" :input-width="30" @close="openDeleteModal = $event" @closeBackDrop="openDeleteModal = $event">
      <CancelAlert @close="openDeleteModal = $event">
        <template v-slot:text>
          <div class="text-base font-medium text-left">
            Are you sure you want to delete the course {{ identifier._id.title }}? A notification will be sent to all participants
          </div>
        </template>
      </CancelAlert>
    </GwModal>
    <GwModal
      :is-open="newCourse"
      :input-width="40"
      @close="newCourse = $event"
      @closeBackDrop="newCourse = $event"
    >
      <template v-slot:status>
        <div class="px-2 text-xl">
          Edit Course
        </div>
      </template>
      <CreateCourse @close="newCourse = $event" />
    </GwModal>
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
