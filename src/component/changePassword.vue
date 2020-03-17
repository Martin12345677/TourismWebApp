<template>
    <div id="container">

        <div style="float: left; width: 200px; height: 450px;"></div>

        <div id="box" style="width: 400px; height: 450px">			
        <!-- 	<div class="box1">				
                <h2 style="color: white; font-family: '微软雅黑';">用户登录</h2>			
            </div> -->		
            <div class="box1">
                <h2 style="color: #00bfff; font=size: 20px; font-family: '微软雅黑'">使用邮箱找回密码</h2>
            </div>

            <div class="box2">				
                <!-- <form action="" method="post">	 -->
                    <img src="../assets/25.png" width="25" height="25" alt="邮箱">				
                    <input type="text" name="account" id="account" placeholder="请输入邮箱账号" style="vertical-align:bottom;margin-left: 5px; width: 85%; height: 30px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px" />				
                    <div  style="width: 10px;height: 25px;"></div>				

                    <img src="../assets/25.png" width="25" height="25" alt="验证码">				
                    <input type="text" name="check" id="check" placeholder="请输入验证码" style="vertical-align:bottom;margin-left: 5px; width: 50%; height: 30px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px" />	
                    
                    <input type="button" value="发送验证码" @click="yanzheng()" onmousemove='this.style.background="#00bddd"' onmouseout='this.style.background="#00bfff"' style="vertical-align:bottom;margin-left: 6px;background-color: #00bfff; color: white; font-size: 15px; width: 90px; height: 35px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE">
                    <div  style="width: 10px;height: 25px;"></div>	

                    <img src="../assets/26.png" width="25" height="25" alt="新密码">				
                    <input type="password" name="password" id="password" placeholder="请设置新密码" style="vertical-align:bottom;margin-left: 5px; width: 85%; height: 30px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px"/>				
                    <div  style="width: 10px;height: 25px;"></div>	

                    <img src="../assets/27.png" width="25" height="25" alt="确认新密码">				
                    <input type="password" name="newPassword" id="newPassword" placeholder="请确认新密码" style="vertical-align:bottom;margin-left: 5px; width: 85%; height: 30px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE; padding-left: 3px"/>				
                    <div  style="width: 10px;height: 35px;"></div>				

                    <input type="button" value="提交" @click="changePassword()" onmousemove='this.style.background="#00bddd"' onmouseout='this.style.background="#00bfff"' style="background-color: #00bfff; color: white; font-size: 15px; width: 150px; height: 30px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE">			
                <!-- </form>	 -->
                <br/>
	
            </div>		
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            random: ''
        }
    },
    methods: {
        changePassword: function(){
            var account = document.getElementById("account").value;	
            var check = document.getElementById("check").value;
            var password = document.getElementById("password").value;		
            var newPassword = document.getElementById("newPassword").value;
            var url ="/api/changePassword?account="+account+"&newPassword="+password;
            var reg = /^[0-9a-zA-Z]+$/	
            if(account == ""){
                alert("用户名不能为空");
            }	
            else if(check!=this.random){					
                alert("验证码错误");									
            }
            else if(password == ""){
                alert("密码不能为空");
            }	
            else if(password.length>20||password.length<8){					
                alert("密码长度错误！！！");									
            }
            else if(!reg.test(password)){
                alert("你输入的字符不是数字或者字母")
            }
            else if(password != newPassword){
                alert("密码不一致");
            }														
            else{
                this.$http({
                    method: 'post',
                    url: url
                })
                .then((res)=>{
                    if(res.data.code === 200){
                        alert('修改成功！');
                        this.$router.push({path: '/login'});
                    }
                    else{
                        alert('修改失败！');
                    }
                })
                .catch((err)=>{
                    alert('error:'+err.message);
                })		
            }
        },
        yanzheng: function(){
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
        height: 30px;                         
        float:right;                
        /*box-shadow: -5px 1px 10px black;                */
        /*background: white;*/
        margin:50px auto;               
        border-radius:0px;          
      }

.box2 {             
        width: 290px;             
        height: 250px;          
        text-align: center;             
        margin: 110px auto;             
        border-radius:5px;      
        /*background: white;    */
      }           

#button1{
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