<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <div v-if="loading">Loading...</div>
    <div class="list-group" v-else>
      <h1 class="list-group-item list-group-item-info">{{ this.list.name }} <span class="badge badge-light">{{ this.list.items.length }}</span></h1>
      <div class="list-group-item" v-for="(item, index) in this.list.items" v-bind:key="item.id" v-bind:class="{ 'list-group-item-success': item.bought }">
        <div class="row">
          <div class="col-md-7">
            <router-link v-bind:to="{ path: '/item/' + item.id }">{{ item.name }}</router-link>
            <small class="clearfix" v-if="item.comment">{{ item.comment }}</small>
          </div>
          <div class="col-md-5">
            <ul class="list-inline text-right">
              <li class="list-inline-item">
                <a href="#" @click.prevent="buy(item.id, index)" class="badge badge-success" role="button">
                  {{ item.bought ? 'Take out' : 'Buy' }}
                </a>
              </li>
              <li class="list-inline-item">
                <router-link v-bind:to="{ path: '/editItem/' + item.id }" class="badge badge-warning" role="button">Edit</router-link>
              </li>
              <li class="list-inline-item">
                <a href="#" class="badge badge-danger" role="button" @click.prevent="confirmDeleteItem(item.id, index)">Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-inline">
      <li class="list-inline-item">
        <router-link v-bind:to="{ path: '/addItem/' + this.listId }" class="btn btn-success btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Add a new item">
          <span class="oi oi-plus"></span>
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link v-bind:to="{ path: '/editItemsList/' + this.listId }" class="btn btn-warning btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Edit list">
          <span class="oi oi-pencil"></span>
        </router-link>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-danger btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Delete list" @click.prevent="confirmDeleteList(listId)">
          <span class="oi oi-x"></span>
        </a>
      </li>
      <all-lists-button/>
    </ul>
  </div>
</template>

<script>
import {AXIOS} from './http-common'
import AllListsButton from './AllListsButton'
import ErrorAlert from './ErrorAlert'
import ItemsList from './classes/ItemsList'

export default {
  name: 'ItemsList',
  components: {AllListsButton, ErrorAlert},
  props: ['listId'],
  data () {
    return {
      list: {},
      loading: true,
      error: false,
      message: ''
    }
  },
  mounted () {
    AXIOS.get('/itemsList/' + this.listId)
      .then(response => {
        this.list = new ItemsList(response.data)
        this.loading = false
        this.error = false
      })
      .catch(error => {
        console.log(error)
        this.error = true
        this.loading = false
      })
  },
  methods: {
    buy: function (id, index) {
      AXIOS.patch('/item/' + id + '/buy')
        .then(() => {
          console.log('Buy clicked')
          this.error = false
          this.list.items[index].bought = !this.list.items[index].bought
        })
        .catch(error => {
          console.log(error)
          this.error = true
          this.message = error.toString()
        })
    },
    confirmDeleteItem: function (id, index) {
      this.$dialog.confirm('Are you sure you want to delete this item?')
        .then(() => {
          console.log('Delete clicked')
          AXIOS.delete('/item/' + id)
            .then(() => {
              // remove item from array
              this.list.items.splice(index, 1)
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
    },
    confirmDeleteList: function (id) {
      this.$dialog.confirm('Are you sure you want to delete this list?')
        .then(() => {
          console.log('Delete clicked')
          AXIOS.delete('/itemsList/' + id)
            .then(() => {
              this.$router.push('/')
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
