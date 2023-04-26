<template>
  <li class="list-inline-item">
    <router-link v-bind:to="{ path: '/itemsList/' + listId }" class="btn btn-info btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Back to the list">
      <span class="oi oi-arrow-thick-left"></span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'BackToListButton',
  props: ['listId']
}
</script>
