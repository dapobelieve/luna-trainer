<template>
  <div>
    <div v-for="n in 6" :key="n" class="tail-flex tail-items-center tail-justify-between tail-m-5">
      <div class="tail-flex tail-items-center">
        <ClientAvatar
          :client-info="{
            firstName: 'Get',
            lastName: 'Welp'
          }"
          class="tail-m-1.5"
        />
        <div class="tail-ml-2 tail-m-1.5">
          <h3 class="tail-font-semibold tail-text-base tail-text-gray-800">
            Liz Rumble
          </h3>
          <div class="tail-flex tail-items-center">
            <img
              class="tail-bg-green-400 tail-p-1 tail-rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <span class="tail-ml-1 tail-text-gray-500 tail-truncate">Shep-Hammersmith</span>
          </div>
        </div>
      </div>
      <button
        class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
      >
        Add
      </button>
    </div>
    <div class="tail-flex tail-justify-end tail-items-center tail-mt-3 tail-m-5">
      <button
        class="tail-hidden md:tail-flex tail-items-center tail-px-6 tail-py-1 tail-rounded-md tail-text-white tail-bg-blue-500 tail-border tail-border-gray-400"
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
