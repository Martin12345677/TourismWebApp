<template>
    <div id="container">
        <div style="float: left; width: 200px; height: 450px;"></div>

        <div id="box" style="width: 400px; height: 480px">			
            <div class="box1">	
                <div class="box1-text">			
                    <h2 style="color: white; font-family: '微软雅黑';">用户注册</h2>			
                </div>
            </div>		

            <div class="box2">				
                <!-- <form action="" method="post">	 -->
                    <img src="../assets/24.png" width="25" height="25" alt="账户" >				
                    <input type="text" name="account" id="account" placeholder="请输入邮箱号码作为用户名" style="vertical-align:bottom;margin-left: 5px;width: 85%; height: 30px; float: center; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE;padding-left: 3px" />			
                    <br />		

                    <img src="../assets/26.png" width="25" height="25" alt="密码">								
                    <input type="password" name="password" id="password" placeholder="密码，8~20位字母或数字" style="vertical-align:bottom;margin-left: 5px;width: 85%; height: 30px; float: center; margin-top: 20px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE;padding-left: 3px"/>									
                    <br />

                    <img src="../assets/27.png" width="25" height="25" alt="确认">
                    <input type="password" name="password1" id="password1" placeholder="请确认密码" style="vertical-align:bottom;margin-left: 5px;width: 85%; height: 30px; float: center; margin-top: 20px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE;padding-left: 3px"/>					
                    <br />	

                    <img src="../assets/25.png" width="25" height="25" alt="昵称" >				
                    <input type="text" id="username" placeholder="请设置一个昵称" style="vertical-align:bottom;margin-left: 5px;width: 85%; height: 30px; float: center; margin-top: 20px; border-radius:5px; border-style: solid; border-width: 1px; border-color: #B0C4DE;padding-left: 3px" />			
                    <br />

                    <input type="button" value="创建账户" @click="register()" onmousemove='this.style.background="#00bddd"' onmouseout='this.style.background="#00bfff"' style="background-color: #00bfff; color: white; font-size: 15px; width: 150px; height: 30px; margin-top: 30px; border-radius:5px;border-style: solid; border-width: 1px; border-color: #B0C4DE">									
                <br/>
                <div style=" margin: 20px auto;">					
                    <a href="javascript:void(0)" @click="login()" style="font-size: 15px">已有账户，立即登录</a>
                </div>
            </div>		
        </div>


    </div>
</template>

<script>
export default {
    methods: {
        register: function () {
            var account = document.getElementById("account").value;				
            if(account.length==""){					
                alert("用户名不能为空！！！");									
            }			
            else{
                var password = document.getElementById("password").value;
                var password1 = document.getElementById('password1').value;	
                var reg = /^[0-9a-zA-Z]+$/		
                if(password.length>20||password.length<8){					
                    alert("密码长度错误！！！");									
                }
                else if(!reg.test(password)){
                    alert("你输入的字符不是数字或者字母")
                }
                else{
                    if(password!=password1){					
                        alert("密码不一致！！！");								
                    }
                    else{
                        var username = document.getElementById("username").value;
                        if(username==""){
                            alert("昵称不能为空")
                        }		
                        else{
                            var url ="/api/register?account="+account+"&username="+username+"&password="+password1;
                            this.$http({
                                method: 'post',
                                url:url
                            })
                            .then((res)=>{
                                if(res.data.code === 200){
                                    alert('注册成功！');
                                    this.$router.push({path : '/login'});
                                }
                                else{
                                    alert('该邮箱已被注册！');
                                }
                            })
                            .catch((err)=>{
                                alert('error:'+ err.message);
                            })
                        }			
                    }
                }
            }			
        },
        login: function(){
            this.$router.push({path: '/login'});
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
        background:url('../assets/back.jpg') no-repeat center center fixed;  
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
        float: right;           
        margin: 30px auto;                         
        border-radius:0px;          
      }

.box1-text{
    margin-top: 20px;
}

.box2{             
        width: 290px;             
        height: 250px;          
        text-align: center;  
        margin: 135px auto;            
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
a:link {color: red} /* 未被访问的链接*/
a:visited {color: blue} /* 已被访问过的链接*/
a:hover {color: #00bfff} /* 鼠标悬浮在上的链接*/
a:active {color: blue} /* 鼠标点中激活链接*/
</style>