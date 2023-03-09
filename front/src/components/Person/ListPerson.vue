<template>
  <div class="row">
    <div class="col-md-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name" v-model="name">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchName">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h4>People List</h4>
      <ul class="list-group">
        <li 
          class="list-group-item" 
          :active="{active: index == currentIndex}"
          v-for="(person, index) in people"
          :key="index"
          @click="setActivePerson(person, index)">
          {{ person.full_name }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentPerson">
        <h4>Person</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentPerson.full_name }}
        </div>
        <div>
          <label><strong>Birthday:</strong></label> {{ currentPerson.birthdate.split("-").reverse().join("/") }}
        </div>
        <div>
          <label><strong>Birthplace:</strong></label> {{ currentPerson.birthplace }}
        </div>

        <router-link :to="'/person/' + currentPerson.id" class="btn btn-sm btn-warning">Edit</router-link>
      </div>
      <div v-else>
        <br>
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>
<script>
import PersonDataService from '@/services/PersonDataService'

export default {
  name: "tutorials-list",
  data() {
    return {
      people: [],
      currentPerson: null,
      currentIndex: 1,
      name: ""
    }
  },
  methods: {
    retrievePeople() {
      PersonDataService.getAll()
        .then(response => {
          this.people = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    },
    refreshList() {
      this.retrievePeople();
      this.currentPerson = null;
      this.currentIndex = -1;
    },
    setActivePerson(person, index) {
      this.currentPerson = person;
      this.currentIndex = person ? index : -1;
    },
    searchName() {
      PersonDataService.findByName(this.name)
        .then(response => {
          this.people = response.data;
          this.setActivePerson(null);
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted() {
    this.retrievePeople();
  }
}
</script>
<style>
.list-group {
  overflow-x: scroll;
  height: 500px;
}
</style>