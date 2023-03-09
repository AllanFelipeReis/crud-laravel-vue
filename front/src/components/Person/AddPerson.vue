<template>
  <div class="submit-form">
    <div v-if="!submitted">
       <form>
        <div class="row">
          <div class="form-group col-lg-12">
            <label for="full_name">Full Name</label>
            <input type="text" class="form-control" id="full_name" v-model="person.full_name">
          </div>
          <div class="form-group col-lg-6">
            <label for="mothers_name">Document</label>
            <input type="text" class="form-control" id="document" v-mask="'###.###.###-##'" v-model="person.document">
          </div>
          <div class="form-group col-lg-6">
            <label for="birthdate">BirthDate</label>
            <input type="text" class="form-control" id="birthdate" v-model="person.birthdate" v-mask="'##/##/####'">
          </div>
          <div class="form-group col-lg-6">
            <label for="birthplace">Birthplace</label>
            <input type="text" class="form-control" id="birthplace" v-model="person.birthplace">
          </div>
          <div class="form-group col-lg-6">
            <label for="uf">UF</label>
            <input type="text" class="form-control" id="uf" v-model="person.uf">
          </div>
          <div class="form-group col-lg-6">
            <label for="gender">Gender</label>
            <select class="form-control" name="gender" id="gender" v-model="person.gender">
              <option value="null">Selecione</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </select>
          </div>
          <div class="form-group col-lg-6">
            <label for="mothers_name">Mother's Name</label>
            <input type="text" class="form-control" id="mothers_name" v-model="person.mothers_name">
          </div>
           <div class="form-group col-lg-12">
            <label for="marital_status">Marital Status</label>
            <input type="text" class="form-control" id="marital_status" v-model="person.marital_status">
          </div>
        </div>
      </form>
      <button @click="savePerson" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPerson">Add</button>
    </div>
  </div>
</template>
<script>
import PersonDataService from '@/services/PersonDataService'
import {mask} from 'vue-the-mask'

export default {
  name: "add-person",
  directives: {mask},
  data() {
    return {
      person: {
        id: null,
        full_name: "",
        document: "",
        birthdate: "",
        birthplace: "",
        uf: "",
        gender: null,
        mothers_name: "",
        marital_status: ""
      },
      submitted: false
    }
  },
  methods: {
    savePerson() {
      let data = {
        full_name: this.person.full_name,
        document: this.person.document.replace(/\D/g, ""),
        birthdate: this.person.birthdate.split("/").reverse().join("-"),
        birthplace: this.person.birthplace,
        uf: this.person.uf,
        gender: this.person.gender,
        mothers_name: this.person.mothers_name,
        marital_status: this.person.marital_status
      };

      PersonDataService.create(data)
        .then(response => {
          this.person.id = response.data.id;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e)
        });
    },
    newPerson() {
      this.submitted = false;
      this.person = {}
    }
  }
}
</script>