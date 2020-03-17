<template>
    <div class="body">
        <div class="search-part">
            <input class="search" placeholder="景点查询" id='keyword' />
            <button id="search" class="search-btn" @click="search">搜索</button>
        </div>
        <div class="result-part" v-if="result_items.length !== 0">
            <div class="items">
                <a href='javascript:void(0)' class="item transition" v-for="item in result_items"  @click="choose(item.pid)">
                    <div class="item-body" >
                        <img class="item-img" :src="!(item.img === '')  ? 'http://'+ item.img : 'http://pic.soutu123.com/element_pic/01/30/42/34573b12cf2b7ae.jpg!/fw/245/quality/90/unsharp/true/compress/true'">
                        <div class="item-name-height"><li class="item-name" :title="item.name">{{(item.name.length >= 10) ? item.name.substring(0,10)+'...' : item.name}}</li></div>
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
// var ex = {
//   img:'https://p0.ssl.qhimgs1.com/sdr/400__/t014ee8509d34bb9410.jpg',
//   name:'雅鲁藏布大峡谷 ',
//   pid: '123',
//   minPrice: 100,
//   score:4.9
// };
export default {
    data(){
        return {
            result_items:[
               ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex,ex
            ],
        }
    },
    methods:{
        choose: function(pid){
        this.$store.state.choosePid = pid;
        this.$router.push({path: '/detail'});
        },
        search: function(){
          var keyword = document.getElementById('keyword').value;
          this.$http({
            methods: 'get',
            url: '/api/getPlacesByKeyword?keyword=' + keyword
          }).then(
            (response)=>{
              if(response.data.code === 200){
                this.result_items = response.data.results;
              }
            }
          )
        }
    }
}
</script>

搜索部分
<style>
#jdcx{
    color: #ff941a;
}

.search-part{
    margin-top: 100px;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
    font-size: 16px;
    font-style:inherit;
    color: rgb(109, 109, 109);
    padding-left: 5px;
}
::-moz-placeholder { /* Firefox 19+ */  
	font-size: 16px;
    font-style:inherit;
    color: rgb(109, 109, 109);
    padding-left: 5px;
}
:-ms-input-placeholder { /* IE 10+ */ 
	font-size: 16px;
    font-style:inherit;
    color: rgb(109, 109, 109);
    padding-left: 5px;
}
:-moz-placeholder { /* Firefox 18- */ 
	font-size: 16px;
    font-style:inherit;
    color: rgb(109, 109, 109);
    padding-left: 5px;
}
        
.search{
  width: 55%;
  margin-top: 20px;
  height: 41px;
  font-size: 16px;
}

.search-btn{
  width: 70px;
  height: 40px;
  padding-bottom: 2px;
  border-radius: 7%;
  font-size: 17px;
  background-color: rgb(35, 167, 243);
  color: #fff;
}

</style>

结果部分
<style>

.result-part{
    position: absolute;
    background-color: #ffffffce;
    width: 80%;
    margin-top: 3%;
    margin-left: 10%;
    border-radius: 4%;
}

.items{
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

.item{
  width: 20%;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 1.5%;
  padding-right: 1.5%; 
  float: left;
  border: #ffffff00 3px solid;
}

.item-body{
  padding: 7%;
  background-color:#ffffffe1;
}

.item-img{
  border-radius: 5%;
  max-height: 120px;
  min-height: 90px;
}
.item-name{
  margin-top: 5px;
  font-style:inherit;
  font-size: 17px;
  height: 42px;
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
  font-size: 22px;
}
.item-score-1{
  font-size: 22px;
}
.transition{
    transition: all 0.3s ease 0s;
    /* Firefox 4 */
    -moz-transition: all 0.3s ease 0s;
    /* Safari and Chrome */
    -webkit-transition: all 0.3s ease 0s;
    /* Opera */
    -o-transition: all 0.3s ease 0s;
}

.item:hover{
  border: rgba(209, 84, 12, 0.897) solid 3px;
}
</style>