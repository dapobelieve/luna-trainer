<template>
  <div>
    <div class="tail-border tail-rounded tail-py-3 tail-bg-white">
      <div class="tail-flex tail-flex-wrap tail-px-4 tail-pb-3">
        <div class=" tail-flex tail-flex-wrap tail-px-4 tail-pb-3">
          <div v-for="(tag, index) in tags" :key="index" class="tag-input__tag tail-flex tail-items-center tail-border tail-rounded tail-p-2 tail-my-1 tail-ml-2">
            {{ tag }}

            <span class="tail-text-base tail-font-bold tail-px-2" @click="removeTag(index)">x</span>
          </div>
          <input
            type="text"
            placeholder="Enter a Tag"
            class="tag-input__text tail-capitalize"
            @keydown.enter="addTag"
            @keydown.188="addTag"
            @keydown.delete="removeLastTag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: []
    }
  },
  methods: {
    addTag (event) {
      event.preventDefault()
      const val = event.target.value.trim()
      if (val && !this.tags.includes(val.toLowerCase())) {
        if (val.length > 0) {
          this.tags.push(val)
          event.target.value = ''
        }
      }
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    },
    removeLastTag (event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    }
  }
}
</script>

<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 20px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #fff;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 10px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
