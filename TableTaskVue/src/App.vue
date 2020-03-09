<template>
  <div id="app">
    <Table></Table>
    <Form></Form>
  </div>
</template>

<style lang="scss">
  @import "~bootstrap";
  @import './sass/main.sass';
</style>
<script>
  import Table from "./views/Table";
  import Form from "./views/Form";
  export  default {
    name: 'app',
    data(){
      return{
      }
    },
    components:{
      Form,
      Table
    }
  }
</script>