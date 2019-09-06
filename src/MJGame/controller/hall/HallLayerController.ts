/**
 * 大厅的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class HallLayerController extends Controller {
		private timer: number;

		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor(){
			super();
		}
		
		protected init() {
			super.init();
			this.SocketEventList = [
				SocketEvents.Send100002,
				
			];
		}

		/**登录消息返回 */
		private on_100002_event(event: egret.Event) {
			console.log(this.TAG + " on_100002_event: ");
			let data=<Rev100002>{};
			data = event.data;
			// let obj = <Rev100002>JSON.parse(data);
			if (data.code == 200) {//success
				console.log("登录游戏服务器成功");
				// 获取房间相关信息
                this.sendRoomInfo();
			}else{//fail

			}
		}

		 /**获取房间信息*/
        private sendRoomInfo() {
            let roomInfo=JAY.ProtocolHttp.getRoomInfo;
			roomInfo.data.skey=UsersInfo.MySelf.skey;
			roomInfo.data.uid=UsersInfo.MySelf.user_id;
			let jsondata=JSON.stringify(roomInfo.data);
			console.log("jsondata="+jsondata);
			let url="http://"+JAY.Config.SERVER_IP+":"+JAY.Config.SERVER_HTTP_PORT+roomInfo.action+"?base="+jsondata;
			Http.get(url,null,this.revRoomInfo,this);
        }

		/**选择房间发送 */
        public sendChooseRoom(type: JAY.RoomType) {
            let data = JAY.ProtocolSocket.send100105;
            data.user_id = JAY.UsersInfo.MySelf.user_id;
            data.room_type = type;
			Socket.Instance.sendData(SocketEvents.Send100105, data);
        }


        private revRoomInfo(e: egret.Event) {
			let data = e.currentTarget.response;
			let Obj = JSON.parse(data);
			console.log("revRoomInfo success! data : ", Obj);

            // 初始化房间信息
            // App.DataCenter.roomInfo.initList(data.data.room_cfg_info);

            // if (this.reconnectFlag) {
            //     // 断线重连
            //     this.sendReconnect();
            //     this.reconnectFlag = false;
            // }
            // else {
            //     // 进入大厅
            //     App.SceneManager.runScene(SceneConst.HallScene, App.getController(HallController.NAME));
            //     // 初始化房间UI
            //     (<HallScene>App.SceneManager.getScene(SceneConst.HallScene)).roomMod.initRoomUI(App.DataCenter.roomInfo.roomList);
            // }
        }

		/**连接socket */
		public connectSocket() {
			Socket.Instance.startConnect(Config.SERVER_URL, this._onSocketConnect, this, this._onSocketClose);
		}

		/**socket连接成功*/
		private _onSocketConnect() {
			// console.log(this.TAG + " connenct socket success");
			//游戏服务器连接成功，发送登录请求
			this._wServerLogin();
			this.timer = egret.setInterval(this._sentHeart, this, 1800000);
		}

		/**socket连接关闭*/
		private _onSocketClose() {
			console.log(this.TAG + " onSocketClose");
			egret.clearInterval(this.timer);
		}

		/**发送心跳包*/
		private _sentHeart() {
			console.log("发送心跳");
			Socket.Instance.sendData(SocketEvents.Send100000, "");
		}

		/**发送登录游戏服务器*/
		private _wServerLogin() {
			let obj: Send100002 = <Send100002>{};
			// obj.passwd = UsersInfo.MySelf.password;
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.passwd="112233";
			Socket.Instance.sendData(SocketEvents.Send100002, obj);
		}

	}
}