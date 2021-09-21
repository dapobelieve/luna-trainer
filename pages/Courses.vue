<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="tail-flex tail-items-center">
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
          class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click="openCourseModal = true"
        >
          <i class="ns-plus tail-text-lg hover:tail-text-white"></i>
        </button>
      </template>
    </PageHeader>
    <div>
      <div v-for="data in group" :key="data.id">
        <CourseIdentifier :identifier="data" />
      </div>
    </div>
    <Modal
      :is-open="openCourseModal"
      :input-width="40"
      @close="openCourseModal = $event"
      @closeBackDrop="openCourseModal = $event"
    >
      <template v-slot:status>
        <div class="tail-px-2 tail-text-xl">
          New Course
        </div>
      </template>
      <div @close="openCourseModal = $event">
        <CreateCourse />
      </div>
    </Modal>
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
