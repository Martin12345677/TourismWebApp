<template>
  <div id="dzlx">
    <div class="nav">
        <div class="selector" data-toggle="distpicker" >
          <div class="selecttext">选择心仪的目的地</div>
          <select class="selectitem" id="province" data-province="---- 选择省 ----" ></select>
          <select class="selectitem" id="city" data-city="---- 选择市 ----"></select>            
<!--           
          <select class="selectitem" id="district" data-district="---- 选择区 ----"></select>
         -->
          </div>
        <div>
          <button class="btn" @click="search()">{{vauleOfBtn}}
          </button>
        </div>
    </div>
    <div class="right-part">
      <div class="items">
        <a href='javascript:void(0)' class="item transition" v-for="(item, index) in items" :key="index" @click="choose(item.pid)">
          <div class="item-body" >
            <img class="item-img" :src="!(item.img === '')  ? 'http://'+ item.img : 'http://pic.soutu123.com/element_pic/01/30/42/34573b12cf2b7ae.jpg!/fw/245/quality/90/unsharp/true/compress/true'">
            <li class="item-name" :title="item.name">{{(item.name.length >= 8) ? item.name.substring(0,8)+'...' : item.name}}</li>
            <div class="item-details"> 
              <div class="item-score"><font class="item-score-1">{{item.score}}</font>分</div>
              <div class="item-price"><font class="item-price-1"> {{item.minPrice}}</font>元起</div>
            </div>
          </div>
        </a>
      </div>
    </div>
      
  </div>
</template>

<script>
import distpicker from "distpicker"

// var ex = {
//   img:'https://p0.ssl.qhimgs1.com/sdr/400__/t014ee8509d34bb9410.jpg',
//   name:'雅鲁藏布大峡谷 ',
//   pid: '123',
//   minPrice: 100,
//   score:4.9
// };



export default {
  // data(){
  //   return{
  //     name:this.$store.state.name,
  //     items:[
  //       ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex
  //     ]
  //   }
  // },
  data(){
    return {
      items: [],
      preurl:'',
      vauleOfBtn: '查询'
    }
  },
  created(){
    this.$http({
      methods:'get',
      url: '/api/getPlacesOfCity?province=河南&city=洛阳&numOfPlaces=200',
    })
    .then((response)=>{
      if(response.data.code === 200){
        this.items = response.data.results;
      }
    })
    .catch((err)=>{ 
      alert('err:'+err.message)
    });
  },

  methods:{
    choose: function(pid){
      sessionStorage.setItem('chooseSid', pid);
      this.$router.push({path: '/detail'});
    },
    search: function(){
      var province = document.getElementById('province').value;
      var city = document.getElementById('city').value;
      city = city.substring(0, city.length-1);
      this.vauleOfBtn = "查询中..."
      this.$http({
        methods: 'get',
        url: '/api/getPlacesOfCity?province=' + province + '&city=' + city +'&numOfPlaces=200',
      })
      .then((response)=>{
        this.vauleOfBtn = "查询";
        if(response.data.code === 200){
          this.items = response.data.results;
        }
      })
      .catch(err=>{
        alert(err);
      });
    }
  }
}
</script>

<style>
#lxdz{
  color: #ff941a;
}
#dzlx{
  position: relative;
  top: 100px;
}
</style>

搜索区
<style scoped>

.nav{
  position: fixed;
  top:100px;
  border-radius: 5%;
  width: 350px;
  height: 300px;
  background: rgba(255, 255, 255, 0.637);
  margin-left: 50px;
  z-index: 10;
}
.nav div{
  opacity: 1;
}
.selector{
  margin-top: 65px;
  text-align: center;
}
.selectitem{
  width: 45%;
  height: 35px;
  border-radius: 7%;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.445);
}
.selecttext{
  width: 100%;
  font-size: 30px;
}
.btn {
    margin: auto;
    margin-top: 25px;
    font-size: 18px;
    color: #fff;
    background-color: #ff941a;
    border-radius:16px;
    display: block;
    width: 100px;
    *width: 66px;
    line-height: 35px;
    text-align: center;
}
.btn:hover{
    background-color: #fff;
    color: #ff941a;
}
.btn,
.transition{
    transition: all 0.3s ease 0s;
    /* Firefox 4 */
    -moz-transition: all 0.3s ease 0s;
    /* Safari and Chrome */
    -webkit-transition: all 0.3s ease 0s;
    /* Opera */
    -o-transition: all 0.3s ease 0s;
}

</style>

结果区
<style scoped>

.item:hover{
  border: rgba(209, 84, 12, 0.897) solid 3px;
}

.right-part{
  position: absolute;
  margin-top: 0px;
  margin-left: 410px;
  margin-right: 5%;
  background-color: #ffffff9c;
  border-radius: 3%;
  text-align: center;
}

.items{
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

.item{
  width: 25%;
  min-width: 170px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 1.5%;
  padding-right: 1.5%; 
  border: #ffffff00 3px solid;
  float: left;
}

.item-body{
  padding: 7%;
  border-radius: 4%;
  min-height: 150px;
  background-color:#ffffffb6;
}

.item-img{
  border-radius: 5%;
  min-height: 130px;
  max-height: 140px;
}
.item-name{
  margin-top: 5px;
  font-style:inherit;
  height: 42px;
  font-size: 17px;
  color: black;
}
.item-details{
  margin-top: 5px;
  width: 100%;
  height: 20px;
}
.item-price{
  font-style: italic;
  color: #e03b3b;
  font-size: 10px;
  float: right;
}
.item-score{
  font-size: 10px;
  float: left;
}
.item-price-1{
  font-size: 20px;
}
.item-score-1{
  font-size: 20px;
}

</style>