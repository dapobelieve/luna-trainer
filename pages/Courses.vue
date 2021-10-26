<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="flex items-center">
          Courses
        </div>
      </template>
      <div>
      </div>
      <template v-slot:buttons>
        <div>
          <gw-select
            :options="['Active', 'Draft']"
            selected="active"
            @selected="filterCard"
          />
        </div>
        <button
          type="button"
          class="base-button inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click="openCourseModal = true"
        >
          <i class="ns-plus text-lg hover:text-white"></i>
        </button>
      </template>
    </PageHeader>
    <div>
      <div v-for="data in group" :key="data.id">
        <CourseIdentifier :identifier="data" />
      </div>
    </div>
    <GwModal
      :is-open="openCourseModal"
      :input-width="40"
      @close="openCourseModal = $event"
      @closeBackDrop="openCourseModal = $event"
    >
      <template v-slot:status>
        <div class="px-2 text-xl">
          New Course
        </div>
      </template>
      <div @close="openCourseModal = $event">
        <CreateCourse />
      </div>
    </GwModal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openModal: false,
      openAvailabilityModal: false,
      filter: 'active',
      displayDraft: false,
      displayActive: true,
      openCourseModal: false,
      group: [
        {
          _id: {
            id: 1,
            title: 'Puppies',
            date: 'Tue, August 4',
            classNo: '14',
            remainder: '6',
            amount: '£600',
            status: 'active'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 2,
            title: 'Course Title One',
            date: 'Sat, April 4',
            classNo: '10',
            remainder: '4',
            amount: '£500',
            status: 'active'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 3,
            title: 'Puppies',
            date: 'Tue, August 4',
            classNo: '30',
            remainder: '4',
            amount: '£900',
            status: 'active'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 2,
            title: 'Course Title One',
            date: 'Sat, April 4',
            classNo: '10',
            remainder: '4',
            amount: '£500',
            status: 'draft'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 2,
            title: 'Course Title One',
            date: 'Sat, April 4',
            classNo: '10',
            remainder: '4',
            amount: '£500',
            status: 'draft'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        }
      ]

    }
  },
  methods: {
    filterCard () {
      console.log('clicked')
    }
  }
}
</script>

<style>

</style>
