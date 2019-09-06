/**
 * 加入房间的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class JoinRoomController extends Controller {

		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			this.SocketEventList = [
				JAY.SocketEvents.Send100102,

			];
		}

		/**加入好友房间返回 */
		private on_100102_event(event: egret.Event) {
			console.log(this.TAG + " on_100102_event: ");
			let data = event.data;
			let obj = <Rev100102>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("加入好友房间成功");
				//记录桌子信息
				DeskInfo.deskID = obj.info.desk_id;

				this._findAndSetMyself(obj.info.seat_info);

				//加入User
				for (let value of obj.info.seat_info) {
					let user = new User();

					for (let key in value) {
						user[key] = value[key];
					}

					UsersInfo.Instance.addUser(user);
				}

				let gameScene = new JAY.GameScene();
				SceneManager.Instance.replaceScene(gameScene);

			} else {//fail

			}
		}

		/**
		 * 找出自己并赋值
		 */
		private _findAndSetMyself(seat_info: Array<PlayerInfo>) {
			for (let value of seat_info) {
				let user = new User();
				for (let key in value) {
					user[key] = value[key];
				}
				(user.user_id == UsersInfo.MySelf.user_id) && (UsersInfo.MySelf = user);
			}
		}

		/**
		 * 加入好友房间
		 */
		public joinFriendRoom(roomNo: number) {
			let obj = <Send100102>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.desk_id = roomNo;
			Socket.Instance.sendData(SocketEvents.Send100102, obj);
		}


	}
}