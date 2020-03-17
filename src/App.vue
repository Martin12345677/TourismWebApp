<style scoped>
.menu-part {
    width: 100vw;
    height: 60px;
    margin: 0;
    position: fixed;
    top: 0;
    z-index: 10;
    font-size: 20px;
    transition: ease-in-out 0.5s all;
}
.menu-part>div {
    transition: ease 1s all;
}
.menu-bc {
    background-color: rgb(35, 124, 128);
}
.pull-left {
    float: left;
}
.pull-right {
    float: right;
    margin-right: 30px;
    height: 60px;
    display: flex;
    align-items: center;
}
.logo {
    margin-left: 20px;
    margin-right: 10px;
}
.menu-item {
    vertical-align: middle;
    height: 60px;
    margin-left: 20px;
    line-height: 60px;
}
.menu-item span{
    user-select: none;
    vertical-align: middle;
    margin-right: 20px;
    font-size: 23px;
    color: white;
    transition: ease-in-out 0.5s all;
    cursor: pointer;
}
.menu-item span:hover{
    color: #ff941a;
}
.btn {
    font-size: 21px;
    font-weight: bold;
    width: fit-content;
    padding: 5px;
    margin: 10px;
    border: turquoise 1px solid;
    background-color: rgb(65, 206, 194);
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: rgb(7, 66, 66);
    transition: ease-in-out 0.3s all;
}
.btn:hover {
    cursor: pointer;
    background-color: rgb(135, 248, 248);

}

</style>

<template>
  <div id="app" >
    <div class="menu-part" :class="{'menu-bc':scrollTop !== 0}">
        <div >
            <a  href="javascript:void(0)" @click="f0()" class="pull-left logo">
                <img src="./assets//logo.png" width="70" height="55" />
            </a>
            
            <div class="pull-left menu-item">
                <span @click="f1()" id="lxdz" class="transition b1">
                    附近景点
                </span>
                <span @click="f2()" id="jdcx" class="transition b2">
                    旅行规划
                </span>
                
                <span @click="f3()" id="znwd" class="transition b3">
                    智能问答
                </span>
            
            </div>
            <div v-if="!$store.state.isLogin" class="pull-right">
                <div class="btn" @click="f4()">
                    登录
                </div>
                <div class="btn" @click="f5()">
                    注册
                </div>
            </div>
        </div>
    </div>
    <keep-alive>
        <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isLogged: false,
            menuBC: true,
            scrollTop: document.documentElement.scrollTop
        }
    },
    mounted: function() {
        window.addEventListener('scroll', this.controlBC, true);
    },
    methods:{
        f0: function(){
            if(this.isLogged){
                this.$router.push({path: '/'});
            }
            else{
                //window.location.href = '../component/dzlx.vue';
                this.$router.push({name: 'home'});
                window.location.reload();
            }
        },
        f1: function(){
            if(this.isLogged){
                this.$router.push({path: '/dzlx'});
                window.location.reload();
            }
            else{
                this.$router.push({path: '/dzlx'});
                window.location.reload();
            }
        },
        f2: function(){
            if(this.isLogged){
                this.$router.push({path: '/lxgh'});
                window.location.reload();
            }
            else{
                // console.log('12')
                this.$router.push({path: '/lxgh'});
                window.location.reload();
            }
        },
        f3: function(){
            if(this.isLogged){
                this.$router.push({path: '/znwd'});
                window.location.reload();
            }
            else{
                this.$router.push({path: '/znwd'});
                window.location.reload();
            }
        },
        f4: function(){
            if(this.isLogged){
                this.$router.push({path: '/login'});
            }
            else{
                this.$router.push({path: '/login'});
            }
        },
        f5:function(){
            if(this.isLogged){
                this.$router.push({path: '/register'});
            }
            else{
                this.$router.push({path: '/register'});
            }
        },
        controlBC: function(e) {
            this.scrollTop = document.documentElement.scrollTop;
        }
    },
}
</script>
