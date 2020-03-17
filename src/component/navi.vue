<style scoped>
.part-body {
    width: 100%;
    margin-top: 150px;
    position: relative;
}
.open-left-btn, .open-right-btn{
    width: fit-content;
    font-size: 50px;
    color: ivory;
    background-color: rgb(53, 53, 53);
    position: fixed;
    padding: 10px;
    top: 45vh;
    cursor: pointer;
}
.open-left-btn:hover, .open-right-btn:hover {
    background-color: rgb(90, 90, 90);
    color: peachpuff;
}
.open-left-btn {
    left: 0;
}
.open-right-btn {
    right: 0;
}
.left-part {
    min-width: 260px;
    min-height: 500px;
    width: 20vw;
    position: fixed;
    left: 0;
    background-color: rgb(39, 39, 39);
    background-image: url('http://file06.16sucai.com/2016/0329/176e5a5268bf717304dfb6213b37a472.jpg');
    background-size: cover;
    color: seashell;
    text-align: center;
    z-index: 5;
    transition: ease-out 0.5s all;
}
.left-hide {
    transform: translateX(-100%);
}
.right-part {
    width: 20vw;
    float: right;
    position: fixed;
    right: 0;
    min-width: 370px;
    min-height: 500px;
    max-height: 550px;
    transition: ease-out 0.5s all;
    z-index: 3;
}
.right-hide {
    transform: translateX(100%);
}
.left-title {
    user-select: none;
    margin: 50px;
    font-size: 32px;
}
.left-part>div>div {
    font-size: 20px;
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    border: seashell 1px solid;
    border-radius: 20px;
    width: fit-content;
    cursor: pointer;
}
.left-part>div>div:last-of-type {
    margin-top: 50px;
}
.left-part>div>div:hover , .select{
    color: black;
    background-color: #fff;
}
.left-part>.hide-btn {
    float: right;
    font-size: 24px;
    width: fit-content;
    margin: 5px;
    margin-right: 10px;
    cursor: pointer;
}
.map-part {
    margin: auto;
    width: fit-content;
    border: paleturquoise 2px solid;
}

.map-container{
    width: 40vw;
    height: 40vw;
    min-width: 500px;
    min-height: 500px;
}

.mode-part {
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
    background-color: rgb(53, 53, 53);
    align-content: left;
    color: ivory;
}
.mode-part>div {
    padding: 10px;
    font-size: 24px;
    border: rgb(53, 53, 53) 1px solid;
    cursor: pointer;
    text-align: center;
}
.navi-result {
    overflow: auto;
    border: rgb(53, 53, 53) 1px solid;
    height: 500px;
    background-color: #fff;
}
.selectMode {
    color: rgb(43, 43, 43);
    background-color: #fff;
}
</style>
<template>
    <div class="part-body">
        <div class="open-left-btn" v-if="leftHide" @click="leftHide=false;"> &gt; </div>
        <div class="open-right-btn" v-if="rightHide" @click="rightHide=false;"> &lt; </div>
        <div class="left-part" :class="{'left-hide': leftHide}">
            <div class="hide-btn" @click="leftHide=true;"> ←</div>
            <div class="left-title">第{{mapData.day}}天</div>
            <div>
                <div @click="changeNavi" v-for="(s, index) in mapData.dayRoute" :key="index" :class="{select: index === startIndex}" :data-index="index" >
                    {{index===0? "我的位置" : mapData.dayRoute[index-1].name}}→{{s.name}}
                </div>
                <div @click="searchHotel">
                    酒店查询
                </div>
            </div>
        </div>
        <div class="right-part" :class="{'right-hide': rightHide}">
            <div class="mode-part" @click="changeMode">
                <div :class="{selectMode: naviMode === 0}" data-mode="0">
                    驾车
                </div>
                <div :class="{selectMode: naviMode === 1}" data-mode="1">
                    公交
                </div>
                <div :class="{selectMode: naviMode === 2}" data-mode="2">
                    步行
                </div>
                <div :class="{selectMode: naviMode === 3}" data-addimode="3">
                    酒店
                </div>
                <div :class="{selectMode: naviMode === 4}" data-addimode="4">
                    美食
                </div>
                <div data-addimode="5">
                    →
                </div>
            </div>
            <div id="naviResult" class="navi-result">
            </div>
        </div>
        <div class="map-part">
            <div id="mymap" class="map-container">

            </div>
        </div>
    </div>
</template>
<script>
// import BMap from 'BMap';
export default {
    data() {
        return {
            mapData: {},
            map: null,
            naviMode: 0,
            startIndex: 0,
            leftHide: false,
            rightHide: false
        }
    },
    created: function() {
        var mapData = sessionStorage.getItem('mapData');
        if(!mapData) {
            this.$router.push('/');
        }
        this.mapData = JSON.parse(mapData);
    },
    mounted: function(){
        this.$nextTick(this.initMap);
    },
    methods: {
        initMap: function() {
            console.log('init');
            if(typeof BMap==='undefined'){
                setTimeout(this.initMap, 200);
                return;
            }
            this.map = new BMap.Map('mymap');
            this.changeNavi();
            this.localSearch = new BMap.LocalSearch(this.map,
                            {
                                renderOptions:{
                                    map: this.map,
                                    autoViewport: true,
                                    panel: "naviResult"
                                }
                            });
        },
        changeNavi: function(e) {
            if(e) {
                var index = parseInt(this.$getTarget(e).dataset.index);
                this.startIndex = index;
            }
            else var index = this.startIndex;
            var scene = this.mapData.dayRoute[index];
            var mode = this.naviMode;
            if(mode <= 2) {
                if(index === 0) {
                    var ip = this.$store.state.ip;
                    this.$http({
                        methods: 'get',
                        url: '/map/location/ip?ak=' + this.$store.state.ak + '&coor=bd09ll&ip=' + ip
                    }).then(res=>{
                        var startP = res.data.content.point;
                        startP.lat = startP.y;
                        startP.lng = startP.x;
                        var endP = scene.location;
                        this.changeNaviTo(startP, endP);
                    }).catch(err=>console.log(err))
                }else {
                    var mode = this.naviMode;
                    var scenes = this.mapData.dayRoute;
                    this.changeNaviTo(scenes[index-1].location, scenes[index].location);
                }
            }else {
                this.search(scene.name);
            } 
        },
        changeNaviTo: function(startP, endP) {
            var start = new BMap.Point(startP.lng, startP.lat);
            var end = new BMap.Point(endP.lng, endP.lat);
            // var start = new BMap.Point(120.10289, 31.4364);
            // var end = new BMap.Point(120.233413, 31.52977395);
            var mode = this.naviMode;
            var Route = (mode===0)? BMap.DrivingRoute : (mode===1 ? BMap.TransitRoute : BMap.WalkingRoute);
            var navi = new Route(this.map, {
                renderOptions: {
                    map: this.map,
                    autoViewport: true,
                    panel: "naviResult"
                }
            });
            navi.search(start, end);
        },
        search: function(name) {
            var mode = this.naviMode;
            var tag = '';
            if(mode === 3) tag = '酒店';
            else if (mode === 4) tag = '美食';
            else return;
            console.log(name);
            this.localSearch.searchNearby(tag, name);
        },
        searchHotel: function(e) {
            this.naviMode = 3;
            var scenes = this.mapData.dayRoute;
            // var pos = scenes[scenes.length-1].location;
            var name = scenes[scenes.length-1].name;
            this.search(name);
        },
        changeMode: function(e) {
            e = this.$getTarget(e);
            var mode = e.dataset.mode;
            if(mode !== undefined) {
                this.naviMode = parseInt(mode);
                this.changeNavi();
            }else {
                var addimode = e.dataset.addimode;
                if(addimode !== undefined) {
                    addimode = parseInt(addimode);
                    this.naviMode = addimode;
                    if(addimode <= 4){
                        var name = this.mapData.dayRoute[this.startIndex].name;
                        this.search(name);
                    }else if (addimode === 5){
                        this.rightHide = true;
                    }
                }
                return;
            }
        }
    }
}
</script>