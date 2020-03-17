<style scoped>
.part-body {
    min-height: 100vh;
    height: fit-content;
    background-color: rgba(167, 255, 248, 0.897);
    border-radius: 20px;
    width: 60vw;
    min-width: 800px;
    margin: auto;
    margin-top: 150px;
}
.part-title {
    padding-top: 30px;
    position: relative;
    user-select: none;
    margin: auto;
    text-align: center;
}
.part-title>span {
    font-size: 30px;
    padding: 10px;
    font-weight: bold;
}
.part-title>div:first-of-type{
    margin-top: 10px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    font-size: 20px;
    position: relative;
}
.part-title>div>span{
    margin: 10px;
}

.route-score {
    display: flex;
    flex-wrap: nowrap;
    width: fit-content;
    position: absolute;
    right: 40px;
    top: 40px;
}
.route-score>div, .scene-score>div{
    background-image: url('../assets/star.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    margin-left: 5px;
}
</style>

<style scoped>
.part-main{
    margin: 20px;
}
.main-title {
    font-size: 28px;
    position: relative;
    height: 40px;
    vertical-align: middle;
    user-select: none;
}
.main-title>div:first-of-type{
    margin: auto;
    padding: 10px;
    width: fit-content;
    background-color: #fff;
    position: relative;
    z-index: 1;
}
.title-decorate {
    position: absolute;
    width: 100%;
    border: 2px dashed white;
    top: 26px;
    z-index: 0;
}
.scene-part {
    margin: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.scene {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
}

.scene-img {
    width: 150px;
    height: 150px;
    background-color: rgb(85, 85, 85);
    background-size: cover;
    border-radius: 10%;
    margin: auto;
    margin-bottom: 10px;
}
.scene-navi {
    background-image: url('../assets/arrow.png');
    width: 120px;
    height: 65px;
    background-size: cover;
    align-self: center;
    margin-left: 30px;
    cursor: pointer;
}
.scene-navi:hover {
    width: 130px;
    height: 70px;
    margin-left: 25px;
}
.scene-text {
    align-self: center;
    text-align: center;
    position: relative;
    cursor: pointer;
}
.scene span{
    font-size: 15px;
}
.scene span:first-of-type{
    font-weight: bold;
    font-size: 20px;
    margin-right: 10px;
}
.scene-score {
    display: flex;
    margin-top: 10px;
}
.hot-tag {
    position: absolute;
    top: -15px;
    right: -15px;
    font-style: italic;
    font-size: 30px;
    color: red;
    animation: hot 1s ease-in-out infinite;
}
@keyframes hot{
    50% {
        font-size: 34px;
        top: -17px;
        right: -17px;
    }
    100% {
        
    }
}

</style>

<template>
    <div class="part-body">
        <div class="part-title">
            <span>{{route.startCity}}</span>
            <span>→</span>
            <span>{{route.endCity}}</span>
            <div>
                <span>{{route.time.length}}天</span>
                <span>{{route.num}}个景点</span>
            </div>
            <div class="route-score">
                <div v-for="(s, index) in route.star_num" :key="index"></div>
            </div>
        </div>
        <div class="part-main" v-for="(d, index) in route.time" :key="index">
            <div class="main-title">
                <div class="title-text">
                    <span>第{{index+1}}天</span>
                    <span>{{cityName[index]}}</span>
                </div>
                <div class="title-decorate"></div>
            </div>
            <div class="scene-part" @click="clickScene">
                <div v-for="(s,sindex) in route.scenes" :key="sindex">
                    <div class="scene" v-if="s.day===index+1">
                        <div class="scene-text" :data-sindex="sindex" title="查看景区详情">
                            <div class="scene-img" :style="{backgroundImage: 'url('+(s.img?'http://'+s.img:'')+')'}"></div>
                            <span>{{s.name}}</span>
                            <span>{{s.price.replace(/[？￥$元?]/g, '')}}元</span>
                            <div class="scene-score">
                                <div v-for="(n, nindex) in new Array(Math.round(s.overall_rating))" :key="nindex"></div>
                            </div>
                            <div class="hot-tag" v-if="s.hot>=80">hot!</div>
                        </div>
                        <div class="scene-navi" title="路线导航" v-if="sindex+1<route.num && route.scenes[sindex+1].day===index+1" :data-sindex="sindex"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            route: {},
            cityName: []
        }
    },
    created: function() {
        var route = sessionStorage.getItem('route');
        if(!route) {
            this.$router.push('/');
        }
        route = JSON.parse(route);
        var star_num = new Array(Math.round(route.score / 20));
        var num = route.num;
        var cityName = [];
        for(var i = 0; i < num; i++) {
            let scene = route.scenes[i];
            if(i === 0) {
                cityName[0] = scene.city;
            }else {
                let last = route.scenes[i-1];
                if(last.day === scene.day && scene.city !== last.city) {
                    cityName[scene.day - 1] += '→' + scene.city;
                }else if (last.day !== scene.day) {
                    cityName[scene.day - 1] = scene.city;
                }
            }
        }
        this.cityName = cityName;
        var time = new Array(route.time);
        route.star_num = star_num;
        route.time = time;
        this.route = route;

    },
    methods: {
        clickScene: function(e) {
            var els = e.path.filter(el=>{
                return !!el.dataset && !!el.dataset.sindex;
            })
            if(els.length === 1){
                var el = els[0];
                var index = parseInt(el.dataset.sindex);
                var scene = this.route.scenes[index];
                var day = scene.day;
                if(el.className.indexOf('navi') !== -1) {
                    var mapData = {};
                    mapData.startSid = scene.sid;
                    mapData.day = day;
                    var dayRoute = this.route.scenes.filter(s=>{
                        return s.day === day;
                    });
                    mapData.dayRoute = dayRoute;
                    sessionStorage.setItem('mapData', JSON.stringify(mapData));
                    var href = this.$router.resolve('/navi').href;
                    window.open(href, '_blank');
                }else {
                    sessionStorage.setItem('chooseSid', scene.sid);
                    var href = this.$router.resolve('/detail').href;
                    window.open(href, '_blank');
                }
            }
        }
    }
}
</script>