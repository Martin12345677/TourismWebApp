<template>
<div v-bind:class="bodybg">
	<div v-bind:class="dialogpart">
		<div class="dialog-head">
			知心朋友
		</div>
		<div class="msg">
			<div v-bind:class="msgpart"></div>
			<div id="end"></div>
		</div>
		<div class="input-part">
			<input v-model="sentence" type="text" maxlength="200" @keydown.enter="send()">
			<button type="button" v-on:click="send()">发送</button>
		</div>
	</div>
</div>
</template>

<script>

			function getTime() {
				var date = new Date();
				var currentTime =
					date.getFullYear() + "-" +
					(date.getMonth() + 1) + "-" +
					date.getDate() + " " +
					date.getHours() + ":" +
					date.getMinutes() + ":" +
					date.getSeconds();
				return currentTime;
			}
			
			function makeTime(time) {
				time = time.split(' ')
				var date = time[0].split('-')
				time = time[1].split(':')
				return {
					year: Number(date[0]),
					month: Number(date[1]),
					day: Number(date[2]),
					hour: Number(time[0]),
					min: Number(time[1]),
					sec: Number(time[2])
				}
			}
export default {
	data() {
		return{
			bodybg:'body-bg',
			dialogpart:'dialog-part',
			msgpart:'msg-part',
			email: '{{ email|safe }}',
			msgs: [],
			sentence:'',

		}
	},

	created(){ 
		// this.$http({
		// 	methods:'get',
		// 	url: '/depress/getHistory',
		// 	data: {
		// 		email: this.email
		// 	},
		// })
		// .then((response)=>{
		// 	if(response.data.code === 200){
		// 		this.msgs = response.data.msgs;
		// 		console.log(this.msgs);
		// 		for (var i = 0; i < this.msgs.length; i++) {
		// 			if (i === 0) {
		// 				this.addMsg(this.msgs[i], null, true);
		// 			} else {
		// 				this.addMsg(this.msgs[i], this.msgs[i - 1].time, true);
		// 			}
		// 		}
		// 	}
		// })
		// .catch((err)=>{
		// 	alert('err:'+err.message)
		// });
	},

	methods:{
		addMsg: function(msg, lasttime, load) {

			lasttime = lasttime || '0-0-0 0:0:0'
			load = load || false
			var time = makeTime(msg.time);
			lasttime = makeTime(lasttime);
			var check = ['year', 'month', 'day', 'hour'];
			var isShow = false;
			for (var i = 0; i < 4; i++) {
				if (time[check[i]] != lasttime[check[i]]) {
					isShow = true;
					if (i === 0) {
						time = msg.time;
					} else if (i <= 2) {
						time = time.month + '月' + time.day + '日' + time.hour + ':' + time.min + ':' + time.sec;
					} else {
						time = time.hour + ':' + time.min + ':' + time.sec;
			}
					break;
				}
			}
			if (!isShow && time.min - lasttime.min > 3) {
				isShow = true;
				time = time.hour + ':' + time.min + ':' + time.sec;
			}
			var part = document.getElementsByClassName('msg-part')[0];
			var div = document.createElement('div');
			div.className = 'msg-div';
			if (isShow) {
				var time_div = document.createElement('div');
				time_div.textContent = time;
				time_div.className = 'msg-time';
				div.appendChild(time_div);
			}
			var text_div = document.createElement('div');
			text_div.textContent = msg.text;
			text_div.className = 'msg-text-' + (msg.send ? 'right' : 'left');
			div.appendChild(text_div);
			if (!msg.send) {
				var icon_div = document.createElement('div');
				icon_div.className = 'msg-icon';
				div.appendChild(icon_div);
			}
			part.appendChild(div);
			if (!load) {
				this.msgs.push(msg);
			}
			window.location.href = '#end';
		},

		send: function() {

			//var sentence = input.val()
			if (this.sentence === '') {
				return
			}
			document.getElementsByTagName('input')[0].value = '';
			var time = getTime();
			var msg = {
				time: time,
				text: this.sentence,
				send: true
			};
			if (this.msgs.length === 0) {
				this.addMsg(msg);
			} else {
				this.addMsg(msg, this.msgs[this.msgs.length - 1].time);
			}
			// this.$http({
			// 	methods:'POST',
			// 	url: '/depress/getReply',
			// 	data: {
			// 		sentence: this.sentence,
			// 		email: this.email,
			// 		time: time
			// 	},
			// })
			// .then((response)=>{
			// 	if(response.data.code === 200){
			// 		var reply = response.data.msg;
			// 			console.log(reply);
			// 			if (this.msgs.length === 0) {
			// 				this.addMsg(reply);
			// 			} else {
			// 				this.addMsg(reply, this.msgs[this.msgs.length - 1].time);
			// 			}
			// 	}
			// })
			// .catch((err)=>{
			// 	alert('err:'+err.message)
			// });

			this.sentence = '';
			document.getElementsByTagName('input')[0].focus();

		}
	}

}
</script>

<style>
  #znwd{
      color: #ff941a;
  }

	.body-bg {
		/* position: absolute; */
		width: 100%;
		height: 100vh;
		margin: 0;
		overflow: auto;
		/* background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582781166232&di=5f55a4821d70a94edcb0888166d88757&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F57bab71b94d33.jpg"); */
		/* background-size: cover; */
	}

	/* .znwd {
		color: #ffbf97;
	} */

	.dialog-part {
		margin: auto;
		margin-top: 0px;
		left: 0;
		right: 0;
		width: 500px;
		position: relative;
		background-color: aliceblue;
	}
	.dialog-head {
		margin: auto;
		line-height: 60px;
		width: 500px;
		background-color: rgb(35, 124, 128);
		top: 0;
		position: fixed;
		z-index: 3;
		font-size: 30px;
		text-align: center;
		color: aliceblue;
	}
	.dialog-part>.msg {
		padding: auto;
		min-height: 100vh;
		height: fit-content;
	}
	.msg-part>div:first-of-type {
		padding-top: 60px;
	}

	.msg-div {
		transition: ease 1s;
		position: relative;
		margin-bottom: 30px;
		word-break: break-all;
	}

	.msg-time {
		text-align: center;
		font-size: 16px;
		padding-top: 20px;
	}

	.msg-icon {
		width: 50px;
		height: 50px;
		background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582742671640&di=16b602f04b484ec18fa7072099836449&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fede4829a1c6c391293d639fa5c0a6d42cee9615c2f59-e1SnxF_fw658");
		background-size: cover;
		margin-left: 5px;
		position: absolute;
		bottom: -30px;
		border-radius: 50%;
	}

	.msg-text-left, .msg-text-right {
		font-size: 20px;
		width: fit-content;
		max-width: 65%;
		padding: 5px;
		background-color: aquamarine;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.msg-text-left {
		text-align: left;
		margin-left: 60px;
		border-bottom-right-radius: 10px;

	}

	.msg-text-right {
		text-align: right;
		margin-left: auto;
		margin-right: 20px;
		border-bottom-left-radius: 10px;
	}

	#end {
		height: 55px;
	}

	.input-part {
		bottom: 0;
		height: 50px;
		width: 500px;
		background-color: #c1ffcd;
		position: fixed;
	}

	.input-part input {
		width: 75%;
		height: 40px;
		font-size: 20px;
		margin: 5px;
		border: none;
		border-radius: 2px;
		text-indent: 10px;
	}

	.input-part button {
		width: 18%;
		height: 40px;
		margin-top: 5px;
		font-size: 20px;
		border-radius: 2px;
		border: none;
		background-color: aquamarine;
		padding-left: 5px;
	}

	.input-part button:hover {
		background-color: #09ff79;
		color: antiquewhite;
	}
</style>
