/**
 * 登录层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class LoginLayerController extends Controller {
		protected init() {
			super.init();
			this.SocketEventList = [
				// JAY.SocketEvents.Rev100000,
				// JAY.SocketEvents.Rev100002,
			];
		}

		/**测试账号登录*/
		public sendDebugLoginReq(name: string, password: string) {
			// let url = JAY.WEB_URL + "login";
			// let data = { user: name, password: password };
			let login=JAY.ProtocolHttp.login;
			console.log("httpLogin:"+login.action);
			login.data.user=name;
			login.data.password=password;
			let param = JSON.stringify(login.data);
            let url = "http://"+JAY.Config.SERVER_IP+":"+JAY.Config.SERVER_HTTP_PORT+login.action;
			// Http.get(url,sendData,this._loginResult,this);
			Http.post(url, param, this._loginResult, this);
			// console.log("jay socket url="+JAY.Config.SERVER_URL);

			//test
			// let str = JSON.stringify({
			// 	"action": "LoginHandler",
			// 	"data": { "diamond": 0, "uid": name, "avater_url": "https://impublic-res.oss-cn-shenzhen.aliyuncs.com/f5c7153f80aa66f7a4f2fd9e0d9b996b", "ip": JAY.Config.SERVER_IP, "sex": 1, "user": "test1", "password": "8222b2020c704671b9c51d6fdcfe776c", "port": JAY.Config.SERVER_SOCKET_PORT, "accid": 1, "skey": "30d148f652bfdf660b873313f0acda73", "name": "test1", "point": 0, "payment": 2, "is_visitor": 0 }, // 服务器数据对User进行封装？
			// 	"ret": 0,
			// 	"desc": "success"
			// });
			// let obj = <egret.Event>{
			// 	currentTarget: {
			// 		response: str
			// 	}
			// }
			// this._loginResult(obj);

		}

		private _loginResult(e: egret.Event) {
			let data = e.currentTarget.response;
			let Obj = JSON.parse(data);
			console.log("login success! data : ", Obj);
			if (Obj.ret == "0") {
				let ud = Obj.data;
				// avater_url: "http://ozgj3gqsu.bkt.clouddn.com/5.png"
				// bsfb_id: 1
				// diamond: 1000
				// ip: "192.168.1.168"
				// is_visitor: 1
				// money: 10000
				// nick_name: "韦泽斯3"
				// password: "8222b2020c704671b9c51d6fdcfe776c"
				// payment: 1
				// point: 0
				// port: 10000
				// sex: 1
				// skey: "ad0613e05690e0513a617fa6b922d2ba"
				// uid: 14
				// user_name: "test3"
				let user = new User();
				user.user_id = ud.uid;
				user.user_name=ud.user_name;
				user.password=ud.password;
				user.skey=ud.skey;
				user.nick_name=ud.nick_name;
				user.point=ud.point;
				user.money=ud.money;
				user.diamond=ud.diamond;
				user.headImgUrl=ud.avater_url
				
				UsersInfo.MySelf = user;
				
				// JAY.Config.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
				// JAY.Config.MD5PASS = ud.password;

				this.gotoHall();
			} else {
				console.log("login error action:%s,ret:%s,desc:%s", Obj.action, Obj.ret, Obj.desc);
			}
		}

		private gotoHall() {
			let hallScene = new JAY.HallScene();
			JAY.SceneManager.Instance.replaceScene(hallScene);
		}
	}
}