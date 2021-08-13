<template>
  <div>
    <div class="tail-rounded tail-border tail-border-gray-200 tail-m-3">
      <div class="tail-flex tail-items-center  tail-bg-white tail-m-6">
        <div v-for="(tag, index) in tags" :key="index" class="tail-flex tail-items-center">
          <div
            class="tail-text-base tail-px-3 tail-bg-white tail-border-2 tail-border-gray-100 tail-text-gray-800 tail-rounded-full tail-py-1.5 tail-flex items-center"
          >
            {{ tag.first.toLocaleString('en',{
              hour: '2-digit',
              minute:'2-digit'
            }) }} - {{ tag.last.toLocaleString('en',{
              hour: '2-digit',
              minute:'2-digit'
            }) }}
            <span class="tail-rounded-full tail-cursor-pointer tail-h-5 tail-w-5 tail-bg-gray-300 tail-text-base tail-flex tail-items-center tail-justify-center" @click="removeTag(index)">x</span>
          </div>
        </div>
      </div>
      <div class="tail-bg-gray-200 tail-py-1.5">
        <div class="tail-m-2 tail-flex tail-items-center tail-justify-around">
          <Timepicker v-model.trim="field.first" />
          <span class="tail-m-2">-</span>
          <Timepicker v-model.trim="field.last" />
          <button class="tail-text-sm tail-text-white tail-bg-blue-300 tail-rounded-md tail-py-3 tail-px-4 tail-m-1.5" @click="AddField()">
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
      console.log(this.field.last, this.field.first)
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
