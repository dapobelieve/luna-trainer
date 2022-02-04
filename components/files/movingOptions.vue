<template>
  <div>
    <div class="flex justify-between items-center bg-white p-4">
      <h5 class="text-xl text-gray-700">
        Move to
      </h5>
      <div
        class="hover:bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full"
      >
        <i
          class="fi-rr-cross text-base text-blue-500"
          role="button"
          @click="$emit('close')"
        ></i>
      </div>
    </div>
    <div v-if="folders.length" class="pb-2 px-4 bg-white">
      <div class="relative flex items-center h-8">
        <i class="fi-rr-search absolute left-2 text-gray-400"></i>
        <input
          v-model="search"
          type="text"
          class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-7 shadow-sm focus:border-blue-500"
          placeholder="Search folder to move to"
        />
      </div>
    </div>
    <template v-if="search">
      <template v-if="searchClient.length">
        <div
          v-for="client in searchClient"
          :key="client._id"
          role="button"
          :class="{ 'cursor-not-allowed': client.status !== 'accepted' }"
          class="flex hover:bg-gray-100 px-3 mx-0.5 py-3 rounded-lg"
          @click="client.status === 'accepted' ? $router.push({ name: 'client-id-messages', params: { id: client._id } }) : '#'"
        >
          <div class="flex-none w-12 mr-4">
            <ClientAvatar
              :client-info="{
                firstName: client.firstName
              }"
            />
          </div>
          <div class="truncate flex-grow">
            <div class="flex items-center">
              <span
                class="text-base text-gray-700 font-medium capitalize mr-2 flex-grow truncate"
              >{{ client.firstName }}</span>
              <span
                :class="[client.status === 'accepted' ? 'bg-green-200 text-green-700' : 'text-red-700', 'rounded text-sm font-normal normal-case flex-none w-18 text-sm items-center flex']"
              >
                <i :class="{ hidden : client.status === 'accepted' }" class="fi-rr-time-add text-xs mr-1"></i>
              </span>
            </div>
            <div
              class="text-gray-700 text-xs font-normal normal-case truncate"
            >
              {{ client.status === 'accepted' ? 'Message' : 'Invitation Pending' }}
            </div>
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-10">
        😩 Client not found.
      </div>
    </template>
    <div v-else-if="folders.length && !search.length">
      <div
        v-for="folder, index in folders"
        :key="index"
        role="button"
        class="flex hover:bg-gray-100 px-3 mx-0.5 py-3 rounded-lg"
        @click="selectFolder(folder)"
      >
        <div class="flex-none w-12 mr-4">
          <span
            class="bg-green-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
          >
            <i class="fi-rr-folder text-sm text-gray-700"></i>
          </span>
        </div>
        <div class="truncate flex-grow">
          <div
            class="text-gray-700 text-base font-normal capitalize truncate"
          >
            {{ folder }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 px-4 flex w-full justify-center">
      <div class="max-w-xs flex gap-3 flex-col">
        <h2 class="font-bold text-lg text-gray-700">
          No create folders.
        </h2>
        <p class="text-sm">
          You can start by creating one.
        </p>
        <button class="button-fill">
          Create folder <i class="fi-rr-folder ml-2 h-5"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovingOptions',
  data () {
    return {
      search: '',
      folders: ['course videos', 'client archives']
    }
  },
  methods: {
    selectFolder (folder) {
      this.$gwtoast.success(`Moved to ${folder}`)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
