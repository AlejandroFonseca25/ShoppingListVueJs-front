<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <h1>Add a new item</h1>
    <form @submit.prevent="addItem" method="post" class="form-horizontal" @keydown="fieldErrors.clear($event.target.name)">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Name:</label>
        <div class="col-sm-6">
          <input type="text" id="name" name="name" v-model="name" class="form-control"/>
          <small v-if="fieldErrors.has('name')" class="text-danger" v-text="fieldErrors.get('name')"></small>
        </div>
      </div>
      <div class="form-group">
        <label for="comment" class="col-sm-2 control-label">Comment:</label>
        <div class="col-sm-6">
          <textarea id="comment" name="comment" v-model="comment" rows="3" class="form-control"></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="submit" value="Add item" class="btn btn-outline-secondary" :disabled="fieldErrors.any()"/>
        </div>
      </div>
    </form>
    <ul class="list-inline">
      <back-to-list-button v-bind:list-id="listId"/>
      <all-lists-button/>
    </ul>
  </div>
</template>

<script>
import {AXIOS} from './http-common'
import ErrorAlert from './ErrorAlert'
import AllListsButton from './AllListsButton'
import BackToListButton from './BackToListButton'
import FieldErrors from './classes/FieldErrors'

export default {
  name: 'AddItem',
  components: {BackToListButton, AllListsButton, ErrorAlert},
  props: ['listId'],
  data () {
    return {
      name: '',
      comment: '',
      error: false,
      fieldErrors: new FieldErrors(),
      message: ''
    }
  },
  methods: {
    addItem: function () {
      AXIOS.post('/item', {
        name: this.name,
        comment: this.comment,
        listId: this.listId
      })
        .then(() => {
          this.$router.push('/itemsList/' + this.listId)
        })
        .catch(error => {
          if (!error.response) {
            console.log(error)
            this.error = true
            this.message = error.toString()
          } else {
            this.fieldErrors.set(error.response.data)
            console.log(this.fieldErrors)
          }
        })
    }
  }
}
</script>
