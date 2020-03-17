var isLogged = false;
var urlOff1 = '',
    urlOff2 = '',
    urlOff3 = '',
    urlOfLogIn = '';
//点击定制路线调用
function f1() {
    if(isLogged){
        this.$router.push({path: '/dzlx'});
    }
    else{
        //window.location.href = '../component/dzlx.vue';
        this.$router.push({path: '/dzlx'});
    }
}
function f0(){
    if(isLogged){
        this.$router.push({path: '/'});
    }
    else{
        //window.location.href = '../component/';
        this.$router.push({path: '/'});
    }
}
