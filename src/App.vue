<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import ShoppingList from './components/ShoppingList.vue'

export default {
  components: {
    ShoppingList
  }
}
</script>
