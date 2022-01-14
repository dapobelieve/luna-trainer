<template>
  <async-view>
    <div class="bg-white border rounded-xl w-full py-3.5 min-h-screen">
      <div class="flex justify-between items-center px-4">
        <p class="text-gray-700 font-normal text-xl">
          Notes
        </p>
        <button class="text-blue-500" type="button" @click.prevent="addNote">
          <i class="fi-rr-plus h-4 w-4"></i>
        </button>
      </div>
      <div class="mt-8 px-3">
        <div v-if="!notes.length" class="mb-4 px-5  grid gap-5 justify-center text-center">
          <h5 class="font-bold text-gray-700 text-lg">
            You have no notes
          </h5>
          <p
            class="text-sm max-w-xs font-normal text-gray-500"
          >
            Short message about adding services
          </p>
          <div class="w-max mx-auto">
            <button class="base-button flex items-center" type="button" @click.prevent="addNote(true)">
              <i class="fi-rr-plus h-4 w-4 mr-2"></i>
              Create Note
            </button>
          </div>
        </div>
        <div v-else>
          <ul v-for="note in notes" :key="note.id">
            <li class="py-4 flex items-center first:pt-0">
              <div class="mr-auto">
                <h3 class="text-gray-700 text-base font-medium">
                  {{ note.title }}
                </h3>
                <p class="font-normal text-sm text-gray-700">
                  {{ note.body }}
                </p>
                <p class=" text-gray-500 text-sm font-normal">
                  {{ note.date | date }}
                </p>
              </div>
              <i class="fi-rr-angle-small-right text-blue-500 h-2 w-2"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </async-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Notes',
  data () {
    return {
    //   notes: [
    //     {
    //       id: 1,
    //       title: 'Note one',
    //       body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id maxime incidunt laborum sunt est, neque molestiae quasi ipsam nesciunt cupiditate non unde ab quas natus earum odio! Debitis, ullam animi alias sunt laborum delectus magnam, optio ex, sit natus harum vel ipsam facere enim? Quasi vero nulla culpa numquam soluta!',
    //       date: new Date()
    //     },
    //     {
    //       id: 2,
    //       title: 'Note one',
    //       body: 'Lorem ipsum',
    //       date: new Date()
    //     },
    //     {
    //       id: 3,
    //       title: 'Note one',
    //       body: 'Lorem ipsum',
    //       date: new Date()
    //     }
    //   ]
    }
  },
  computed: {
    ...mapGetters({
      notes: 'notes/notes'
    })
  },
  methods: {
    ...mapMutations({
      toggleModal: 'notes/toggleModal'
    }),
    addNote (status) {
      console.log('stat ', status)
      this.toggleModal(status)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
