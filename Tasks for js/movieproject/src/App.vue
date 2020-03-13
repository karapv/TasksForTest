<template>
  <div id="app">
    <Header></Header>
    <main id="main">
      <router-view/>
    </main>
    <Popup></Popup>
  </div>
</template>

<style lang="sass">
@import "sass/main"
</style>
<script>
  import Header from "@/components/header/Header";
  import Popup from "@/components/popup/Popup";
  export default {
    components: {Popup, Header}
  }
</script>