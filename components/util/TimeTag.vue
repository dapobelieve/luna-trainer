<template>
  <div>
    <div class="rounded border border-gray-200 m-3">
      <div class="flex items-center  bg-white m-6">
        <div v-for="(tag, index) in tags" :key="index" class="flex items-center">
          <div
            class="text-base px-3 bg-white border-2 border-gray-100 text-gray-800 rounded-full py-1.5 flex items-center"
          >
            {{ tag.first.toLocaleString('en',{
              hour: '2-digit',
              minute:'2-digit'
            }) }} - {{ tag.last.toLocaleString('en',{
              hour: '2-digit',
              minute:'2-digit'
            }) }}
            <span class="rounded-full cursor-pointer h-5 w-5 bg-gray-300 text-base flex items-center justify-center" @click="removeTag(index)">x</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-200 py-1.5">
        <div class="m-2 flex items-center justify-around">
          <Timepicker v-model.trim="field.first" />
          <span class="m-2">-</span>
          <Timepicker v-model.trim="field.last" />
          <button class="text-sm text-white bg-blue-300 rounded-md py-3 px-4 m-1.5" @click="AddField()">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [],
      field: {
        first: '',
        last: ''
      }
    }
  },
  methods: {
    AddField () {
      const fieldClone = {
        ...this.field
      }
      if (this.field.first && this.field.last !== '') {
        this.tags.push(fieldClone)
        this.field.first = ''
        this.field.last = ''
      }
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

.my-dx::v-deep {
  .mx-input-wrapper{
    height: 45px !important;
  }
  .mx-input {
    height: 45px !important;
  }
}
</style>
