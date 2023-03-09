<template>
  <div class="edit-form" v-if="currentTutorial">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentTutorial.title">
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <input type="text" class="form-control" id="body" v-model="currentTutorial.body">
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2" v-if="currentTutorial.published" @click="updatePublished(false)">
      UnPublish
    </button>
    <button class="badge badge-primary mr-2" v-else @click="updatePublished(true)">
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>
    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br>
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
import TutorialDataService from '@/services/TutorialDataService'

export default {
  name: "tutorial-details",
  data() {
    return {
      currentTutorial: null,
      message: null
    }
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    },
    updatePublished(status) {
      let data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        body: this.currentTutorial.body,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          console.log(response)
          this.currentTutorial.published.status = status;
          this.message = "The status was updated successfully!";
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response)
          this.message = "The tutorial was updated successfully!";
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response)
          this.$router.push({ name: "tutorials" })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  }
}
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
