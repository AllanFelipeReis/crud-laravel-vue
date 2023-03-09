<template>
  <div class="edit-form" v-if="currentPerson">
    <h4>Person</h4>
    <form>
      <div class="row">
        <div class="form-group col-lg-12">
          <label for="full_name">Full Name</label>
          <input type="text" class="form-control" id="full_name" v-model="currentPerson.full_name">
        </div>
        <div class="form-group col-lg-6">
          <label for="mothers_name">Document</label>
          <input type="text" class="form-control" id="document" v-model="currentPerson.document" v-mask="'###.###.###-##'">
        </div>
        <div class="form-group col-lg-6">
          <label for="birthdate">BirthDate</label>
          <input type="text" class="form-control" id="birthdate" v-model="currentPerson.birthdate" v-mask="'##/##/####'">
        </div>
        <div class="form-group col-lg-6">
          <label for="birthplace">Birthplace</label>
          <input type="text" class="form-control" id="birthplace" v-model="currentPerson.birthplace">
        </div>
        <div class="form-group col-lg-6">
          <label for="uf">UF</label>
          <input type="text" class="form-control" id="uf" v-model="currentPerson.uf">
        </div>
        <div class="form-group col-lg-6">
          <label for="gender">Gender</label>
          <select class="form-control" name="gender" id="gender" v-model="currentPerson.gender">
            <option value="null">Selecione</option>
            <option value="1">Masculino</option>
            <option value="2">Feminino</option>
          </select>
        </div>
        <div class="form-group col-lg-6">
          <label for="mothers_name">Mother's Name</label>
          <input type="text" class="form-control" id="mothers_name" v-model="currentPerson.mothers_name">
        </div>
        <div class="form-group col-lg-12">
          <label for="marital_status">Marital Status</label>
          <input type="text" class="form-control" id="marital_status" v-model="currentPerson.marital_status">
        </div>
      </div>
    </form>
    <button class="btn btn-danger mr-2" @click="deletePerson">
      Delete
    </button>
    <button type="submit" class="btn btn-success" @click="updatePerson">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br>
    <p>Please click on a Person...</p>
  </div>
</template>
<script>
import PersonDataService from '@/services/PersonDataService'
import {mask} from 'vue-the-mask'

export default {
  name: "person-update",
  directives: {mask},
  data() {
    return {
      currentPerson: null,
      message: null
    }
  },
  methods: {
    getTutorial(id) {
      PersonDataService.get(id)
        .then(response => {
          let person = response.data;
          person.birthdate = person.birthdate.split("-").reverse().join("/")
          this.currentPerson = person;
        })
        .catch(e => {
          console.log(e)
        })
    },
    updatePerson() {
      let data = {
        full_name: this.currentPerson.full_name,
        document: this.currentPerson.document.replace(/\D/g, ""),
        birthdate: this.currentPerson.birthdate.split("/").reverse().join("-"),
        birthplace: this.currentPerson.birthplace,
        uf: this.currentPerson.uf,
        gender: this.currentPerson.gender,
        mothers_name: this.currentPerson.mothers_name,
        marital_status: this.currentPerson.marital_status
      };

      PersonDataService.update(this.currentPerson.id, data)
        .then(response => {
          console.log(response)
          this.message = "The tutorial was updated successfully!";
        })
        .catch(e => {
          console.log(e)
        })
    },
    deletePerson() {
      PersonDataService.delete(this.currentPerson.id)
        .then(response => {
          console.log(response)
          this.$router.push({ name: "list-person" })
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
