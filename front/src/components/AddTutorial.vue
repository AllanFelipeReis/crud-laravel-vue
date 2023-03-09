<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title">
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <input type="text" class="form-control" id="body" required v-model="tutorial.body" name="body">
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>
<script>
import TutorialDataService from '../services/TutorialDataService'

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        body: "",
        published: false
      },
      submitted: false
    }
  },
  methods: {
    saveTutorial() {
      let data = {
        title: this.tutorial.title,
        body: this.tutorial.body
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e)
        });
    },
    newTutorial() {
      this.submitted = false;
      this.tutorial = {}
    }
  }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>