<template>
    <div id="container">
        <div style="float: left; width: 200px; height: 450px;"></div>

        <div id="box" style="width: 400px; height: 450px">			
            <div class="box1">				
                <div class="box1-text"><h2 style="color: white; font-family: '微软雅黑';">用户登录</h2></div>			
            </div>		

            <div class="box2">				
                <!-- <form action="" method="post">	 -->
                    <img src="../assets/24.png" width="25" height="25" alt="账户">				
                    <input type="text" name="account" id="account" placeholder="用户名" style="vertical-align:bottom;margin-left: 5px; width: 85%; height: 30px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px" />				
                    <div  style="width: 10px;height: 25px;"></div>

                    <img src="../assets/26.png" width="25" height="25" alt="密码">		
                    <input type="password" name="password" id="password" placeholder="请输入密码" style="vertical-align:bottom;margin-left: 5px; width: 85%; height: 30px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px"/>					
                    <br />					
                    <br />
                    <br />		
                    <input type="button" id="btn" value="登录" @click="tijiao()" onmousemove='this.style.background="#00bddd"' onmouseout='this.style.background="#00bfff"' style="background-color: #00bfff; color: white; font-size: 15px; width: 150px; height: 30px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE">			
                <!-- </form>	 -->
                <!-- <button id="button0" onclick="tijiao()" onmousemove='this.style.background="#00bddd"' onmouseout='this.style.background="#00bfff"' style="background-color: #00bfff; color: white; font-size: 15px; width: 150px; height: 30px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE">
                    登录
                </button> -->
                <br/>
                <br/>					
                <br/>
                <span style="font-size: 15px">
                    <a href="javascript:void(0)" @click="register()" style="float: left;">注册</a>
                    <a href="javascript:void(0)" @click="changePassword()" style="float:right;">找回密码</a>
                </span>		
            </div>
        </div>

    </div>
</template>

<script>

export default {
    methods:{
        tijiao: function(){
            var account = document.getElementById("account").value;		
            var password = document.getElementById("password").value;	
            var url ="/api/login?account="+account+"&password="+password;	
            if(account == ""){
                alert("用户名不能为空");
            }	
            else if(password == ""){
                alert("密码不能为空");
            }														
            else{	
                this.$http({
                    method:'post',
                    url:url
                })
                .then((response)=>{
                    if(response.data.code == 200){
                        this.$store.state.isLogin = true;
                        this.$router.push({path: '/dzlx'});
                    }
                    else if(response.data.code === 401){
                        alert('用户不存在！');
                    }
                    else if(response.data.code === 400){
                        alert('密码错误！');
                    }
                })
                .catch((err)=>{ 
                    alert('err:'+err.message)
                });
            }
        },
        register: function(){
            this.$router.push({path:'/register'});
        },
        changePassword: function(){
            this.$router.push({path:'/changePassword'});
        }
    }
}
</script>

<style scoped>
#container {
        width: 802px;               
        height: 450px;       
        float: center;                               
        margin: 200px auto;               
}

#box {               
        width: 400px;               
        height: 450px;       
        float: left;   
        background:url('../assets/back.jpg') no-repeat center center fixed;;
        background-size:cover;               
        border: 1px solid cornflowerblue;               
        /*margin: 30px auto;              */
        /*box-shadow: -5px 5px 5px black;               */
        border-radius:15px;         
     }    

.box1{              
        width: 100%;                
        height: 60px;               
        background:#00bfff;             
        float:right;                
        /*box-shadow: -5px 1px 10px black;                */
        margin:30px auto;               
        border-radius:0px;          
      }

.box1-text{
    margin-top: 20px;
}

.box2 {             
        width: 290px;             
        height: 250px;          
        text-align: center;             
        margin: 150px auto;             
        border-radius:5px;          
      }           

#button1{
        float: right; 
        margin-top: 30px;
     }

#button2{
        float: right; 
        margin-top: 30px; 
     }

.button{
        background-color: #00bfff; 
        color: white; 
        font-size: 15px; 
        width: 120px; 
        height: 30px; 
        border-radius:15px;
        border-style: solid; 
        border-width: 1px; 
        border-color: #B0C4DE
     }

h2{             
        text-align: center;             
        line-height:20px;           
    }


input:focus{
    outline:2px solid #00bfff;
}

a {text-decoration: none}
a:link {color: blue} /* 未被访问的链接*/
a:visited {color: blue} /* 已被访问过的链接*/
a:hover {color: #00bfff} /* 鼠标悬浮在上的链接*/
a:active {color: blue} /* 鼠标点中激活链接*/
</style>