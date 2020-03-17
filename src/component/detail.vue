<template>
<div class="all">
    <div class="body">
        <div class="abstract-part">
            <div class="left-part">
                <img :src="!(place.img === '')  ? 'http://'+ place.img : 'http://pic.soutu123.com/element_pic/01/30/42/34573b12cf2b7ae.jpg!/fw/245/quality/90/unsharp/true/compress/true'" class="img" />
            </div>
            <div class="right-part">
                <div>
                    <h1 class="name">{{place.name}}</h1>
                    <div class="location-part">
                        景点地址
                        <font class="location">{{place.location}}</font>
                    </div>
                    <div class="comment-part">
                        大众评分
                        <font class="comment">{{place.comment.score}}</font><font class="comment-1">/5分</font>
                        <a href="#comment" class="comment-detail">查看{{place.comment.comments.length}}条点评</a>
                        <div class="one-comment" v-if="place.comment.comments.length!==0">“{{place.comment.comments[0].content}}”<br><font class="one-comment-time">--{{place.comment.comments[0].time}}</font></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="price-part">
            <div> <div class="price-head">门票</div><div class="price-line"></div></div>
            <div class="price-items">
                <div class="price-item" v-for="(price,index) in place.prices" :key="index">
                    <a class="price-name" href="javascript:void(0)" @click="changeDetails(index)">{{price.ticketName}}</a>
                    <font class="price-discount">¥<font class="price-discount-1">{{price.discount}}</font><font class="price-price">¥{{price.price}}</font></font>
                    <div class="price-details" v-if="price.isShow">
                        <h2 class="price-title">门票类型：<font class="price-detail">{{price.type}}</font></h2>
                        <h2 class="price-title">使用人数：<font class="price-detail">{{price.consumer}}</font></h2>
                        <h2 class="price-title">预定时间：<font class="price-detail">{{price.bookTime}}</font></h2>
                        <h2 class="price-title">有效日期：<font class="price-detail">{{price.beginDate}}-{{price.endDate}}</font></h2>
                        <h2 class="price-title">使用方式：<font class="price-detail">{{price.mode}}</font></h2>
                        <h2 class="price-title">费用包含：<font class="price-detail">{{price.item}}</font></h2>
                    </div>
                    <hr class="line">
                </div>
            </div>
        </div>

        <div class="comments-part">
            <div> <div class="comment-head" id="comment">用户评价</div><div class="price-line"></div></div>
            <div class="score">
                <span class="score-1">
                    {{place.comment.score}}
                    <span class="score-2">/5</span>
                    <span class="score-3">(共{{place.comment.comments.length}}人点评)</span>
                </span>
            </div>
            <hr class="line">
            <div class="comment-item" v-for="(comment, cindex) in place.comment.comments" :key="cindex">
                <div class="comment-type">{{comment.type}}</div>
                <div class="comment-content">{{comment.content}}</div>
                <div class="comment-time">{{comment.time}}</div>
                <hr class="line">
            </div>
        </div>
    </div>
</div>
</template>

<script>
var exPrice = {
    isShow: false,
    ticketName:'成人票',
    unit:'单票',
    consumer:'1成人',
    price: 10.0,
    discount:9.5,
    type:'组合优惠票',
    bookTime:'需提前1天23:45前预订',
    beginDate:'2019/4/24',
    endDate:'2019/11/30',
    mode:'换票入园，持[供应商二次发送的短信]先换票再入园，换票时间：08:30-16:30；换票地址：景区售票处；',
    timeLimit:'如需预订，您最晚要在游玩前一天23:45前下单，请尽早预订。',
    item:'武侯祠门票1张，马超墓门票1张、《出师表》门票（17:00场次演出）一张。演出周一停演，周二到周五每天一场演出时间14:00，周六日每天两场演出时间为14:00、17:00。请至少提前半小时换票。'
}
var exPrice2 = {
    isShow: false,
    ticketName:'成人票',
    unit:'单票',
    consumer:'1成人',
    price: 10.0,
    discount:9.5,
    type:'组合优惠票',
    bookTime:'需提前1天23:45前预订',
    beginDate:'2019/4/24',
    endDate:'2019/11/30',
    mode:'换票入园，持[供应商二次发送的短信]先换票再入园，换票时间：08:30-16:30；换票地址：景区售票处；',
    timeLimit:'如需预订，您最晚要在游玩前一天23:45前下单，请尽早预订。',
    item:'武侯祠门票1张，马超墓门票1张、《出师表》门票（17:00场次演出）一张。演出周一停演，周二到周五每天一场演出时间14:00，周六日每天两场演出时间为14:00、17:00。请至少提前半小时换票。'
}

var excomment = {
    time:'2019年10月14日',
    content:'真的很不错dfjk的空间付货款金额后付款金额哈开奖号付款金额符合可记为光华科技供热考核人进口国科技馆健康人格和金额开关盒愧疚如果回馈给科技馆科技文化认可就我和可记为',
    type:1
}


export default {
    data(){
        return {
            place: {},
        }
    },
    created(){
        var sid = sessionStorage.getItem('chooseSid');
        console.log(sid);
        this.$http({
            methods:'get',
            url:'/api/getDetailsOfPlace?pid='+sid
        })
        .then((response)=>{
            if(response.data.code === 200){
                this.place = response.data.place;
                for(var i = 0; i < this.place.prices.length; i++){
                    this.place.prices[i].isShow = false;
                }
            }
        })
        .catch((err)=>{
            alert(err);
        })
    },
    methods: {
        changeDetails: function(index){
            var price = this.place.prices[index];
            price.isShow = ! price.isShow;
            this.$set(this.place.prices, index, price);
        },
    }
}
</script>

简介区
<style scoped>
.all{
    text-align: center;
}
.body{
    margin: auto;
    margin-top: 100px;
    width: 1000px;
}
.abstract-part{
    width: 100%;
    min-height: 290px;
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 5%;
}
.left-part{
    margin-top: 40px;
    float: left;
    margin-left: 5%;
    width: 30%;
    margin-bottom: 10px;
}
.img-part{
    width: 100%;
}
.img{
    width: 100%;
    max-height: 210px;
}
.right-part{
    padding-top: 35px;
    width: 60%;
    margin-left: 40%;
}
.right-part div{
    width: 100%;
    text-align: left;
}
.name{
    font-size: 30px;
    margin-left: 5px;
}
.location-part{
    margin-top: 10px;
    font-size: 18px;

}
.location{
    margin-left: 10px;
    font-size: 16px;
}

.comment-part{
    margin-top: 10px;
    font-size: 18px;
    padding-bottom: 10px;
}
.comment{
    margin-left: 10px;
    font-size: 25px;
    color: #ff941a;
}
.comment-1{
    font-size: 15px;
    color: #838383;
}
.comment-detail{
    font-size: 16px;
}
.one-comment{
    padding-right: 10px;
    margin-top: 20px;
    margin-left: 10px;;
    font-style: italic;
}
.one-comment-time{
    margin-left: 10px;
}

</style>

门票区
<style scoped>
.price-part{
    margin-top: 20px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 5%;
    border-top-left-radius: 10%;
    text-align: left;
}
.price-head{
    padding: 15px;
    font-size: 30px;
    width: 90px;
    background-color: rgb(0, 162, 255);
    border-top-left-radius: 30%;
    color: aliceblue;
}
.price-line{
    margin-top: 0;
    background-color: rgb(0, 162, 255);
    height: 2px;
}
.price-item{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.price-name{
    font-size: 23px;
}

.price-discount{
    float: right;
    margin-right: 20px;
    margin-top: 0px;
    color: #ff941a;
    font-weight: bold;
    font-size: 16px;
}
.price-discount-1{
    font-size: 30px;
}

.line{
    margin-bottom: 0px;
    margin-top: 20px;
}
.price-price{
    color: #838383;
    text-decoration: line-through;
    font-weight: normal;
}
</style>

门票详情区
<style scoped>
.price-title{
    margin-top: 10px;
    margin-left: 10px;
}
.price-detail{
    padding-left: 55px;
    padding-right: 5px;
}
</style>

评论区
<style scoped>
.comments-part{
    margin-top: 20px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 5%;
    text-align: left;
}
.comment-head{
    padding: 15px;
    font-size: 30px;
    width: 150px;
    background-color: rgb(0, 162, 255);
    border-top-left-radius: 30%;
    color: aliceblue;
}
.score{
    margin-top: 20px;
    margin-left: 20px;
}
.score-1{
    color: rgb(44, 44, 255);
    font-size: 35px;
    font-weight: bold;
}
.score-2{
    color: #838383;
    font-size: 20px;
    font-weight: normal;
}
.score-3{
    color: #838383;
    font-size: 20px;
    font-weight: normal;
}
.comment-item{
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 20px;
}
.comment-type{
    font-size: 20px;
    font-weight: bold;
}
.comment-content{
    margin-top: 5px;
    font-size: 15px;
}
.comment-time{
    margin-top: 1px;
    font-style: italic;
    color: #838383;
}
</style>