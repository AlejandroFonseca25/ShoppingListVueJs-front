<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <h1>Shopping lists</h1>
    <div v-if="loading">Loading...</div>
    <ul class="list-unstyled" v-else>
      <li v-for="(list, index) in itemsLists" v-bind:key="list.id">
        <p>
          <router-link v-bind:to="{ path: '/itemsList/' + list.id }" class="btn btn-outline-secondary">{{ list.name }}</router-link>
          <router-link v-bind:to="{ path: '/editItemsList/' + list.id }" class="btn btn-warning btn-sm mx-1">Edit</router-link>
          <a href="#" class="btn btn-danger btn-sm" @click.prevent="confirmDeleteList(list.id, index)">Delete</a>
        </p>
      </li>
    </ul>
    <router-link to="/addItemsList" class="btn btn-success btn-sm">Add</router-link>
  </div>
</template>

<script>
import {AXIOS} from './http-common'
import ErrorAlert from './ErrorAlert'

export default {
  name: 'ShoppingList',
  components: {ErrorAlert},
  data () {
    return {
      itemsLists: [],
      loading: true,
      error: false,
      message: ''
    }
  },
  mounted () {
    AXIOS.get('/')
      .then(response => {
        this.itemsLists = response.data
        this.loading = false
        this.error = false
      })
      .catch(error => {
        this.error = true
        this.message = error.toString()
        this.loading = false
      })
  },
  methods: {
    confirmDeleteList: function (id, index) {
      this.$dialog.confirm('Are you sure you want to delete this list?')
        .then(() => {
          console.log('Delete clicked')
          AXIOS.delete('/itemsList/' + id)
            .then(() => {
              // remove list from array
              this.itemsLists.splice(index, 1)
              this.error = false
            })
            .catch(error => {
              console.log(error)
              this.error = true
              this.message = error.toString()
            })
        })
        .catch(function () {
          console.log('Cancel delete clicked')
        })
    }
  }
}
</script>
