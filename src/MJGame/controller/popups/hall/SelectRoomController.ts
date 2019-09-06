/**
 * 选择加入或者创建房间的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class SelectRoomController extends Controller {

		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			this.SocketEventList = [
				// JAY.SocketEvents.Rev100000,
				// JAY.SocketEvents.Rev100002,
				JAY.SocketEvents.Send100101,
			];
		}

		/**创建好友房消息返回 */
		private on_100101_event(event: egret.Event) {
			console.log(this.TAG + " on_100101_event: ");
			let data = event.data;
			let obj = <Rev100101>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("创建好友房成功");

				DeskInfo.deskID = obj.info.desk_id;
				let user = new User();
				for(let key in obj.info.seat_info[0]){
					user[key] = obj.info.seat_info[0][key];	
				}
				UsersInfo.MySelf = user;
				
				UsersInfo.Instance.addUser(UsersInfo.MySelf);
				let gameScene = new JAY.GameScene();
				SceneManager.Instance.replaceScene(gameScene);
			} else {
				let errorInfo = JSON.parse(data);
				Tips.show(errorInfo.info);
			}
		}


		/**创建房间*/
		public createRoom() {
			let obj: Send100101 = <Send100101>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			Socket.Instance.sendData(SocketEvents.Send100101, obj);
		}

	}
}