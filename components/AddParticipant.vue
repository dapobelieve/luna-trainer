<template>
  <div>
    <div v-for="n in 6" :key="n" class="flex items-center justify-between m-5">
      <div class="flex items-center">
        <ClientAvatar
          :client-info="{
            firstName: 'Get',
            lastName: 'Welp'
          }"
          class="m-1.5"
        />
        <div class="ml-2 m-1.5">
          <h3 class="font-semibold text-base text-gray-800">
            Liz Rumble
          </h3>
          <div class="flex items-center">
            <img
              class="bg-green-400 p-1 rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <span class="ml-1 text-gray-500 truncate">Shep-Hammersmith</span>
          </div>
        </div>
      </div>
      <button
        class="hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-400"
      >
        Add
      </button>
    </div>
    <div class="flex justify-end items-center mt-3 m-5">
      <button
        class="hidden md:flex items-center px-6 py-1 rounded-md text-white bg-blue-500 border border-gray-400"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
