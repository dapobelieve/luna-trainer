<template>
  <div>
    <h6 class="text-xs uppercase font-bold tracking-normal mb-4">
      Clients
    </h6>
    <div class="mb-6">
      <div class="flex flex-col">
        <div class="flex items-center">
          <i class="fi-rr-user mt-1 text-md text-gray-500"></i>
          <div class="ml-3 text-gray-500 w-full">
            <GwSelector
              v-model="participants"
              placeholder="Participants"
              multiple
              label="firstName"
              class="w-full clients-selector repeat-selector"
              :options="allClients"
            >
              <template>
                <div class="flex items-center" style="z-index: 3000">
                  <span class="text-gray-700">Participants</span>
                </div>
              </template>
              <template v-slot:dropdownOption="{ optionObject }">
                <div class="flex justify-between min-w-full items-center">
                  <div class="flex items-center content-center py-1">
                    <ClientAvatar
                      :width="2.3"
                      :height="2.3"
                      :client-info="optionObject"
                    />
                    <p class="capitalize text-gray-700 ml-4">
                      {{ optionObject.firstName }} {{ $utils.optional(optionObject.lastName) }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-slot:footer @click.stop="">
                <button
                  type="button"
                  class="flex items-center w-full py-2 outline-none"
                  @click.prevent="$modal.show('invite-client')"
                >
                  <div class="flex px-2 ml-1 items-center justify-center">
                    <i
                      class="fi-rr-plus text-base text-blue-500 p-1 mt-1"
                    />
                    <span class="text-primary-color text-base pl-2">Create new Client</span>
                  </div>
                </button>
              </template>
            </GwSelector>
          </div>
        </div>
      </div>
      <div>
        <div v-if="participants" class="flex flex-row flex-wrap">
          <div v-for="(client, cId) in participants" :key="cId" class="mr-2 py-1">
            <div class="flex items-center rounded-full border-2 p-0">
              <div class="bg-[#CAE5CE] h-10 w-10 relative flex-shrink-0 rounded-full flex justify-center items-center overflow-hidden" style="left: -1px">
                <ClientAvatar
                  v-if="client.firstName"
                  :width="2.3"
                  :height="2.3"
                  :client-info="client"
                />
                <ClientAvatar
                  v-else
                  :width="2.3"
                  :height="2.3"
                  :client-info="{firstName: client.name}"
                />
              </div>
              <div class="ml-2">
                <p class="capitalize text-md text-gray-700">
                  <template v-if="client.firstName">
                    {{ client.firstName }} {{ $utils.optional(client.lastName) }}
                  </template>
                  <template v-else>
                    {{ client.name }}
                  </template>
                </p>
              </div>
              <span v-if="hasSchedule || participants.length" class="ml-5 mr-3 cursor-pointer" @click="removeClient(client)">
                <i class="fi-rr-cross text-black font-bold text-[8px]"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClientSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    event: {
      type: Object
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      participants: [...(this.value ?? [])]
    }
  },
  methods: {
    removeClient (client) {
      this.participants = this.participants.filter(item => item.userId !== client.userId)
    }
  },
  computed: {
    ...mapGetters({
      activeCalendar: 'scheduler/getCalendar',
      allClients: 'client/getAllClients'
    }),
    hasSchedule () {
      return !!this.event.id
    }
  },
  watch: {
    'participants' (newValue) {
      this.$emit('change', (newValue ?? []).map(i => ({
        userId: i.userId,
        profileId: i._id,
        email: i.email,
        name: `${i.firstName} ${i.lastName}`,
        imgUrl: i.imgURL
      })))
    }
  }
}
</script>
<style lang="scss" scoped>
.clients-selector {
  ::v-deep {
    .vs__selected-options {
      div :not(input) {
        display: none;
      }
    }
  }
}
.date-picker {
  ::v-deep .mx-input-wrapper {
    .mx-input {
      border: none;
      padding-left: 0px;
      font-size: 16px;
      font-weight: 400;
      color: #000;
      box-shadow: none;
    }
    .mx-icon-calendar {
      display: none;
    }
  }
}
.repeat-selector {
  ::v-deep {
    .vs__selected-options {
      input {
        padding-left: 0;
      }
    }
    .vs__actions {
      display: none;
    }
  }
}
.color-selector, .repeat-selector {
  ::v-deep .v-select {
    border: none  !important;
    .vs__selected-options {
      cursor: pointer !important;
      padding-left: 0;
    }
    .vs__selected {
      padding-left: 0;
    }
  }
  ::v-deep .vs__dropdown-menu {
    padding: 4px;
    li {
      border-radius: 8px;
    }
  }
}
.color-circle {
  height: 18px;
  width: 18px;
}
</style>
