
<style scoped>
@import url("../css/default.css?v=5");
</style>
<style scoped>
@import url("../css/master.css?v=15");
</style>

<style>
#app {
  overflow: hidden;
}
  .wjxhome__header.topNav {
    border-bottom: 1px solid #e1e4e5;
  }
  .wjxhome__menu a {
      color: #fff;
  }
  .register-btn {
      background-color: #2b3a57;
  }
  .index-line {
      padding-bottom: 8px;
      border-bottom: 2px solid #ff941a;
  }
  .topNav .index-line {
      border: none;
  }
  .topNav .wjxhome__menu a {
      color: #333;
  }             
</style>


<template>
  <div id="app">
    <div class="wjxhome__banner">
        <div class="wjxhome__banner--word">
            <h1>河山大好，出去走走</h1>
                <div class="h2">
                      用<em>脚步</em>丈量每寸土地&nbsp;
                      让<em>梦想</em>点亮夜和远方
                </div>
            <a id="begin" href="javascript:void(0)" @click="f1" class="btn btn_free">免费使用</a>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      isLogged : false
    }
  },
  methods:{
    f1: function(){
      if(this.isLogged){
                this.$router.push({path: '/dzlx'});
                window.location.reload();
      }
            else{
                this.$router.push({path: '/dzlx'});
                window.location.reload();
            }
    }
  },
}
</script>
