<template>
  <div>
    <div
      class="tail-rounded-md tail-bg-white tail-cursor-pointer tail-p-4 tail-mb-4 tail-flex tail-items-center tail-justify-between tail-m-4"
    >
      <div @click="viewClass">
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
      <div v-if="identifier._id.status === 'active'">
        <svg
          class="tail-w-6 tail-h-6 tail-text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          @click="viewClass"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
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
    <div v-show="meetSubMenu" class="">
      <GwOptions
        :options="['Reschedule Class', 'Cancel Class']"
        selected=""
        @selected="classDetails"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseIdentifier',
  props: {
    identifier: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meetSubMenu: false
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
    classDetails () {
      console.log('clicked')
    }
  }
}
</script>

<style></style>
