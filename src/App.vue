<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
  }
  ul,ol {
    list-style: none;
  }
  .flex {
    display: flex;
  }
  .j-c {
    justify-content: center;
  }
  .j-s {
    justify-content: space-between;
  }
  .a-c {
    align-items: center;
  }
  .f-d {
    flex-direction: column;
  }
  .f-w {
    flex-wrap: wrap;
  }
  .f-nw {
    flex-wrap: nowrap;
  }
  .b-w {
    word-wrap:break-word;
  }
  .c-p {
      cursor: pointer;
  }
  .p-r {
    position: relative;
  }
  .p-a {
    position: absolute;
  }
  .mar_center{
    margin: 0 1%
  }
</style>
