<template>
  <div>
    <div
      class="bg-white"
      style="position: relative;"
    >
      <vue-tags-input
        v-model.trim="input"
        class="tag-input__text capitalize"
        placeholder="Enter a Tag"
        :tags="tags"
        @tags-changed="newTags => tags = newTags.map(i => i.text)"
      />
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  data () {
    return {
      tags: [],
      input: ''
    }
  },
   components: {
    VueTagsInput,
  },
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
