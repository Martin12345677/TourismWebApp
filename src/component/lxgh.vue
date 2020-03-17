<style>
#jdcx{
    color: #ff941a;
}
</style>

<style scoped>
.part-body {
    width: 80%;
    min-width: 1350px;
    min-height: 100vh;
    height: fit-content;
    background-color: rgba(168, 217, 236, 0.959);
    margin: auto;
    border-radius: 10px;
    margin-top: 150px;
}
.choose-part{
    padding: 30px;
}
.choose-part>div{
    width: 90%;
    margin-top: 20px;
    margin-left: 5%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    user-select:none;
}
.choose-part>div>div, .choose-part>div>label{
    position: relative;
    width: fit-content;
}
.choose-part>div>div:last-of-type, .choose-part>div>label{
    margin-left: 3%;
}
.choose-part>div span{
    padding-left: 10px;
    padding-right: 10px;
}
.choose-name{
    font-size: 25px;
    color: rgb(0, 0, 0);
    display: inline;
}

.date-part input{
    height: 29px;
    width: fit-content;
    font-size: 20px;
}

.choose-type{
    margin-left: 40px;
}

.float-part{
    position: absolute;
    background-color: rgba(193, 250, 236, 0.877);
    margin-top: 10px;
    border-radius: 10px;
    font-size: 20px;
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
    margin-left: -50%;
    z-index: 5;
}
.place-province, .place-city{
    float: left;
    width: fit-content;
    padding: 10px;
    text-align: left;
    overflow: auto;
    height: 300px;
}
.place-province div, .place-city div{
    white-space: nowrap;
}
.float-type{
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    width: 300px;
    height: 300px;
}
.float-type>div, .float-part>div>div{
    padding: 10px;
    border-radius: 5px;
}
.float-type>div{
    margin-left: 5px;
}
.float-part>div>div:hover, .float-type>div:hover{
    background-color: rgb(248, 244, 28);
    cursor: pointer;
}
.select{
    background-color: rgb(248, 244, 28);
    font-weight: bold;
}
.choose-btn{
    height: 27px;
    width: 27px;
    float: left;
    background-color: rgb(46, 146, 121);
    border: solid 5px rgb(46, 146, 121);
    border-radius: 20%;
    /* margin-top: 5px; */
    margin-right: 5px;
}
.choose-part input[type="checkbox"]{
    display: none;
}
.choose-part input[type="checkbox"]:checked+.choose-btn{
    background-color: rgb(40, 88, 76);
}
.choose-part>div:last-of-type label:hover{
    font-weight: bold;
    cursor: pointer;
}
.query-btn {
    width: 130px;
    height: 40px;
    margin-left: 20px;
    margin-top: -2px;
    background-color: rgb(247, 212, 179);
    border: none;
    border-radius: 5px;
    font-size: 24px;
    font-weight: bold;
    transition: 0.5s ease;
    animation: shrink 2s ease infinite ;
}
@keyframes shrink {
    50%{
        background-color: rgb(248, 159, 86);
    }
    100%{
        background-color: rgb(247, 212, 179);
    }
}
.query-btn:hover{
    background-color: rgb(245, 135, 46);
    animation: none;
}
</style>

<style scoped>
.route-part{
    height: fit-content;
    width: 70%;
    margin-left: 15%;
    padding: 20px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    background-size: cover;
    color: black;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.637), -1px 1px 1px rgba(255, 255, 255, 0.637), -1px -1px 1px rgba(255, 255, 255, 0.63), 1px -1px 1px rgba(255, 255, 255, 0.644);
}
.route-part:hover{
    color: rgb(5, 50, 109);
}
.route-intro{
    font-size: 30px;
    text-align: left;
    font-weight: bold;
    position: relative;
}
.route-intro span{
    margin-left: 30px;
}
.route-intro>div{
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 25px;
    color: rgb(253, 37, 37);
}
.route-intro>div>span{
    font-size: 20px;
    color: black;
    font-weight: normal;
}
.route-detail{
    display: flex;
    margin-top: 20px;
    font-size: 20px;
    flex-wrap: wrap;
    font-weight: bold;
}
.route-scene{
    position: relative;
    margin: 10px;
    text-align: left;
}
.route-scene span:last-of-type{
    margin-left: 30px;
}
.route-scene:last-child span{
    margin-left: 0;
}
.float-tag{
    position: absolute;
    right: 20px;
    top: 0px;
    font-size: 14px;
    color: #ff0000;
    text-shadow:1px 1px 1px #ff8989;
}
.float-tag:last-child{
    right: -35px;
}
</style>

<template>
    <div class="part-body" @click="changeFloat">
        <div class="choose-part">
            <div class="">
                <div v-for="(p, pindex) in place" :key="pindex">
                    <div class="choose-name" :data-pindex="pindex" @mouseenter="changeFloat">{{p.name}}</div>
                    <span v-if="pindex===0" class="choose-name">→</span>
                    <div v-if="float === pindex + 1" class="float-part float-items" @mouseleave="changeFloat">
                        <div class="place-province float-items" @click="chooseProvince">
                            <div v-for="(i, index) in provinces" :key="index" :class="{select: (i.name === (pindex === 0 ? startProvince : endProvince))}" :data-pindex="pindex">{{i.name}}</div>
                        </div>
                        <div class="place-city float-items" @click="chooseCity">
                            <div v-for="(c, index) in cities" :key="index" :class="{select: (c.name === (pindex === 0 ? startCity : endCity))}" :data-pindex="pindex">{{c.name}}</div>
                        </div>
                    </div>
                </div>

                <div title="选择倾向的景区类型">
                    <div class="choose-name choose-type" data-pindex="2" @mouseenter="changeFloat">类型</div>
                    <div class="float-part float-type float-items" v-if="float === 3" @click="chooseTag" @mouseleave="changeFloat">
                        <div v-for="(t, index) in preferType" :key="index" :class="{select: (tags.indexOf(t.tid) !== -1)} " :data-tid="t.tid">
                            {{t.name}}
                        </div>
                    </div>
                </div>
                <div class="date-part">
                    <label class="choose-name" title="选择开始日期">
                        开始日期：
                        <input type="datetime-local" v-model="startDate">
                    </label>
                    <label class="choose-name" title="选择结束日期">
                        结束日期：
                        <input type="datetime-local" v-model="endDate">
                    </label>
                </div>
            </div>
            <div>
                <label class="choose-name">
                    <input type="checkbox" v-model="preferHot" value="1"><div class="choose-btn"></div><span>{{choices[0].name}}</span>
                </label>
                <label class="choose-name">
                    <input type="checkbox" v-model="preferDiscount" value="1"><div class="choose-btn"></div><span>{{choices[1].name}}</span>
                </label>
                <label class="choose-name">
                    <input type="checkbox" v-model="preferScore" value="1"><div class="choose-btn"></div><span>{{choices[2].name}}</span>
                </label>
                <input type="button" value="一键规划" class="query-btn" @click="query">
            </div>
        </div>
        <div class="result-part" @click="openRoute">
            <div class="route-part" v-for="(r, index) in routes" :key="index" title="查看路线" :style="{backgroundImage: 'url(' + ('http://' + r.img) + ')'}" :data-index="index">
                <div class="route-intro">
                    <span> 路线{{index+1}}</span>
                    <span> 总门票：</span>{{r.price}}元
                    <span> 景点数：</span>{{r.num}}
                    <span> 时间：</span>{{r.time}}天
                    <div><span> 综合得分：</span>{{r.score}}</div>
                </div>
                <div class="route-detail">
                    <div class="route-scene" v-for="(s, sindex) in r.scenes" :key="sindex">
                        <span>{{s.name}}</span>
                        <div class="float-tag"> Day{{s.day}}</div>
                        <span v-if="sindex<r.num-1">→</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var place = [
  {
    name: '起点',
  },
  {
    name: '目的地',
  }
]
var provinces = [
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
    ];


var cities = [
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
      {
        name: '北京',
        stratPlace: false
      },
      {
        name: '上海',
        stratPlace: false
      },
    ];

var preferType = [
  {
    name: '博物馆',
    tid: 1,
    isSelected: false

  },
  {
    name: '水族馆',
    tid: 2,
    isSelected: false
  },
  {
    name: '风景区',
    tid: 3,
    isSelected: false
  },
  {
    name: '动物园',
    tid: 4,
    isSelected: false
  },
  {
    name: '文物古迹',
    tid: 5,
    isSelected: false
  },
  {
    name: '公园',
    tid: 6,
    isSelected: false
  },
  {
    name: '景点',
    tid: 7,
    isSelected: false
  },
  {
    name: '休闲娱乐',
    tid: 8,
    isSelected: false
  },
  {
    name: '体育场馆',
    tid: 9,
    isSelected: false
  },
  {
    name: '游乐场',
    tid: 10,
    isSelected: false
  },
  {
    name: '度假村',
    tid: 11,
    isSelected: false
  },
  {
    name: '植物园',
    tid: 12,
    isSelected: false
  },
  {
    name: '海滨浴场',
    tid: 13,
    isSelected: false
  },
  {
    name: '科技馆',
    tid: 14,
    isSelected: false
  }
]
var choices = [
  {
    model: 'preferHot',
    name: '人气优先',
    value: 1
  },
  {
    model: 'preferDiscount',
    name: '团购优先',
    value: 1
  },
  {
    model: 'preferScore',
    name: '好评优先',
    value: 1
  }
]
var tags = [];
var routes = [
    {
        price: 2000,
        time: 2,
        num: 5,
        score: 95,
        img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
        scenes: [
            {
                name: '市博物馆',
                day: 1,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '水电费肾脏被vfvsb',
                day: 1,
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '黄山旅游区',
                day: 2,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '暗示法律男生都',
                day: 2,
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '龙门石窟',
                day: 3,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
        ]
    },
    {
        price: 800,
        time: 1,
        score: 90,
        num: 3,
        img: 'pic5.40017.cn/03/000/c7/46/rBANB1zRBHGAb88MAAHVgwV8bQw373.jpg',
        scenes: [
            {
                name: '龙门石窟',
                day: 1,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 1,
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '龙门石窟',
                day: 1,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
        ]
    },
    {
        price: 3600,
        time: 4,
        score: 85,
        num: 9,
        img: 'pic5.40017.cn/02/001/95/d7/rBLkCVnEsViAEP0iAAHMA72kpgE675.jpg',
        scenes: [
            {
                name: '龙门石窟',
                day: 1,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                type: 'scope',
                city: '洛阳',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 1,
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                city: '洛阳',
                type: 'scope',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '龙门石窟',
                day: 2,
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                city: '洛阳',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 2,
                city: '开封',
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '龙门石窟',
                day: 3,
                city: '洛阳',
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 3,
                city: '郑州',
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                img: 'pic5.40017.cn/04/002/05/96/rBTJUl1Dm_KAZK35AANXRpmz2ac796.jpg',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 4,
                city: '洛阳',
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
            {
                name: '龙门石窟',
                day: 4,
                city: '郑州',
                sid: '969ee0484375382dadb22a92',
                tag: '旅游景点;博物馆',
                type: 'scope',
                location: {
                    lat: 43.91145956,
                    lng: 125.3552811
                },
                price: '?80元',
                shop_hours: '05-01～10-07：08:30～17:20开放；10-08～04-30：08:30～16:50开放；',
                overall_rating: 4.1,
                groupon_num: '\n',
                hot: 100
            },
            {
                name: '龙门石窟',
                day: 4,
                city: '开封',
                sid: '6f3d2800421d3a8f7cc876ef',
                tag: '旅游景点;风景区',
                type: 'scope',
                location: {
                    lat: 31.43639954,
                    lng: 120.1028944
                },
                price: '￥210元',
                shop_hours: '开放时间07:30-17:00',
                overall_rating: 4.4,
                groupon_num: '\n',
                hot: 120
            },
        ]
    }
];
var startDate = getCurrentDate();
var endDate = getCurrentDate();
function getCurrentDate() {
	  var now = new Date();
	  var year = now.getFullYear(); //得到年份
	  var month = now.getMonth();//得到月份
	  var date = now.getDate();//得到日期
	  var day = now.getDay();//得到周几
	  var hour = now.getHours();//得到小时
	  var minu = now.getMinutes();//得到分钟
	  month = month + 1;
	  if (month < 10) month = "0" + month;
	  if (date < 10) date = "0" + date;
	  if (hour < 10) hour = "0" + hour;
	  if (minu < 10) minu = "0" + minu;
	  var time = "";
	  time = year + "-" + month + "-" + date+ "T" + hour + ":" + minu;
	  return time;
}
export default {
    data() {
        return{
            place,
            choices,
            preferType, 
            preferHot: 0,
            preferDiscount: 0,
            preferScore: 0,
            provinces,
            cities,
            tags,
            startProvince: '',
            endProvince: '',
            startCity: '',
            endCity: '',
            float: 0,
            startDate,
            endDate,
            routes
        }
    },
    computed: {
    },
    methods: {
        changeFloat: function(e) {
            // console.log(e)
            var type = e.type;
            if(type === 'mouseleave'){
                this.float = 0;
                return;
            }else{
                var e = this.$getTarget(e);
                var isJump = e.className.indexOf('float-part') !== -1 || e.parentNode.className.indexOf('float-items') !== -1;
                
                if(isJump) {
                    return;
                }else {
                    var isSwitch = e.nodeName === 'DIV' && e.className.indexOf('choose-name') !== -1;
                    
                    if(isSwitch) {
                        var f = parseInt(e.dataset.pindex) + 1;
                        this.float = (this.float === f) ? 0 : f;
                        // this.float = f;
                    }else {
                        this.float = 0;
                    }
                }
            }
        },
        chooseProvince: function(e){
            if(e.path[0].children.length !== 0) return;
            //请求对应的城市列表
            //
            console.log(e);
            e = this.$getTarget(e);
            if(e.dataset.pindex === '0'){
                if(this.startProvince === e.innerText) return;
                this.startProvince = e.innerText;
                this.startCity = '';
            }else{
                if(this.endProvince === e.innerText) return;
                this.endProvince = e.innerText;
                this.endCity = '';
            }
        },
        chooseCity: function(e){
            if(e.path[0].children.length !== 0) return;
            console.log(e);
            e = this.$getTarget(e);
            if(e.dataset.pindex === '0'){
                if(this.startCity === e.innerText) return;
                this.startCity = e.innerText;
                this.$set(this.place[0], 'name', e.innerText);
            }else{
                if(this.endCity === e.innerText) return;
                this.endCity = e.innerText;
                this.$set(this.place[1], 'name', e.innerText);
            }
        },
        chooseTag: function(e){
            if(e.path[0].children.length !== 0) return;
            console.log(e);
            e = this.$getTarget(e);
            var tid = parseInt(e.dataset.tid);
            var index = this.tags.indexOf(tid);
            console.log(tid, index)
            if(index !== -1){
                this.tags.splice(index, 1);
            }else {
                this.tags.push(tid);
            }
            console.log(this.tags)
        },
        query: function(e) {
            if(this.startCity==='' || this.endCity === '')  alert('请选择起点城市和终点城市。');
            var startCity = this.startCity;
            var endCity = this.endCity;
            this.$http({
                url: '/map/place/v2/search?region=全国&output=json&query=' + startCity + '&ak=' + this.$store.state.ak,
                method: 'get'
            }).then(res=>{
                var startPos = res.data.results[0].location;
                this.$http({
                    url: '/map/place/v2/search?region=全国&output=json&query=' + endCity + '&ak=' + this.$store.state.ak,
                    method: 'get'
                }).then(res=>{
                    var endPos = res.data.results[0].location;
                    //发送后端请求


                    this.routes.startCity = this.startCity;
                    this.routes.endCity = this.endCity;
                }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
        },
        openRoute: function(e) {
            e = e.path.filter(el=>{
                return !!el.dataset && !!el.dataset.index;
            });
            if(e.length === 0) return;
            e = e[0];
            var index = e.dataset.index;
            console.log(index);
            var route = this.routes[index];
            route.startCity = this.routes.startCity;
            route.endCity = this.routes.endCity;
            sessionStorage.setItem('route', JSON.stringify(route));
            var href = this.$router.resolve({
                path: '/route'
            }).href;
            window.open(href, '_blank')
        }
    },
    created: function(){
        this.$http({
            methods: 'get',
            url: '/ip/'
        }).then(res=>{
            var returnCitySN = {};
            var data = new Function(res.data+'return returnCitySN;');
            var ip = data().cip;
            this.$store.state.ip = ip;
            this.$http({
                methods: 'get',
                url: '/map/location/ip?ak=' + this.$store.state.ak + '&coor=bd09ll&ip=' + ip
            }).then(res=>{
                var addr = res.data.content.address_detail;
                var startProvince = addr.province.replace('省', '');
                var startCity = addr.city.replace('市', '') || '起点';
                this.$set(this.place[0], 'name', startCity);
                this.startCity = startCity;
                this.startProvince = startProvince;
            }).catch(err=>console.log(err))
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>