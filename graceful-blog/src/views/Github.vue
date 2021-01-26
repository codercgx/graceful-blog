<template>
  <div id="github">
    <span style="font-size: 5rem;"> loading...</span>
    <iframe src="https://github.com/codercgx?tab=repositories" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  mounted() {
    //  let timer= setTimeout(() => {
    //   location.assign("https://github.com/codercgx?tab=repositories")
    // }, 3000);
  },
};
</script>

<style lang="scss" scoped>
#github {
  width: 100%;
  span {
    display: block;
    width: 40%;
    height: 10rem;
    line-height: 10rem;
    margin: 10rem auto;
    text-align: center;
  }
}
</style>
