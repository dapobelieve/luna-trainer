<template>
  <div>
    <div class="flex mb-5">
      <div class="mr-5 pt-1">
        <img
          class="hidden md:block"
          src="~/assets/img/user.png"
          alt="cancel"
          width="20px"
          height="auto"
        />
      </div>
      <div class="flex flex-col">
        <p class="capitalize font-normal">
          Dog Owner
        </p>
        <div class="flex items-center">
          <ClientAvatar :client-info="client" />
          <div class="ml-4 truncate mr-2 md:mr-0">
            <h3 class="capitalize font-medium">
              {{ client.firstName }} {{ client.lastName }}
            </h3>
            <div v-if="pets.length" class="flex items-center">
              <div>
                <img
                  class="bg-green-700 rounded-full"
                  src="~/assets/img/dog-paw.svg"
                  alt="dog paw"
                />
              </div>
              <span
                class="capitalize ml-1 text-gray-500 truncate"
              >
                {{ client.pet[0] && client.pet[0].name }},
                {{ client.pet[0] && client.pet[0].breed }}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mb-5">
      <div class="mr-5 text-xl">
        <i class="ns-envelope mt-1 text-gray-500"></i>
      </div>
      <div class="flex flex-col">
        <p class="capitalize font-normal">
          Email
        </p>
        <p class="font-medium text-gray-500">
          {{ client.email }}
        </p>
      </div>
    </div>
    <div class="flex mb-5">
      <div class="mr-5 text-xl">
        <i class="ns-location-alt mt-1 text-gray-500"></i>
      </div>
      <div class="flex flex-col">
        <p class="capitalize font-normal">
          Location
        </p>
        <div v-if="'location' in client" class="flex">
          <p class="capitalize font-light mr-1">
            Address:
          </p>
          <span class="capitalize text-gray-500 font-normal">
            {{ client.location }}
          </span>
        </div>
        <div v-if="'zip' in client" class="flex">
          <p class="capitalize font-light mr-1">
            Zip Code:
          </p>
          <span class="capitalize text-gray-500 font-normal">
            {{ client.location.zip }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mr-5 pt-1">
        <img
          class="hidden md:block"
          src="~/assets/img/black-dog.png"
          alt="cancel"
          width="20px"
          height="auto"
        />
      </div>
      <div class="flex flex-col">
        <p class="capitalize font-normal mb-0">
          Pet details {{ pets.length ? '' : 'is unavailable at the moment.' }}
        </p>
        <template v-if="pets.length">
          <div class="flex">
            <p class="capitalize font-light mr-1">
              Name:
            </p>
            <span class="capitalize text-gray-500 font-normal">
              {{ client.pet[0] && client.pet[0].name }}
            </span>
          </div>
          <div class="flex">
            <p class="capitalize font-light mr-1">
              Age:
            </p>
            <span class="capitalize text-gray-500 font-normal">
              {{ client.pet[0] && client.pet[0].age }}
            </span>
          </div>
          <div class="flex">
            <p class="capitalize font-light mr-1">
              Breed:
            </p>
            <span class="capitalize text-gray-500 font-normal">
              {{ client.pet[0] && client.pet[0].breed }}
            </span>
          </div>
          <div class="flex">
            <p class="capitalize font-light mr-1">
              Gender:
            </p>
            <span class="capitalize text-gray-500 font-normal">
              {{ client.pet[0] && client.pet[0].gender }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from '~/mixins/helpers'
export default {
  name: 'ClientInfoPreview',
  mixins: [Helpers],
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  computed: {
    pets () {
      return this.client.pet
    }
  }
}
</script>

<style></style>
