<template>
  <div id="demo">
    DEMO
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "demo",
 
  
};
</script>
<style lang="scss" scoped>
#demo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 3rem 0;
  .demoItem {
    width: 30%;
    margin: 1rem;
    // padding: 0.8rem;
    height: 22rem;
    background: rgba(34, 34, 34,.8);
    border-radius: 0.5rem;
    box-shadow:0 0 3px #333;
    position: relative;
    color: #f2f2f2;
    position: relative;
     &::before{
        content: "";
        display: none;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
      }
      &:hover::before{
        display: block;
        transition: all 1s ease 100ms;
      }
    #video {
      border-radius: 0.5rem;
      position: relative;
      width: 100%;
      height: 66%;
      outline: none;
      z-index: 2;
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.4rem;
      p {
        font-size: 12px;
      }
      button {
        position: relative;
        z-index: 5;
        flex:1;
      }
      span {
        color:lightgreen;
      }
    }
  }
  @media screen and(max-width: 955px) {
    .demoItem {
      width: 45%;
      height: 18rem;
    }
  }
  @media screen and(max-width: 568px) {
    .demoItem {
      width: 100%;
      height: 25rem;
    }
  }
  .page {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
}
</style>