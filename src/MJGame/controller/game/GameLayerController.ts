/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class GameLayerController extends Controller {
		protected init() {
			super.init();
			this.SocketEventList = [
				JAY.SocketEvents.Send100100, //发送玩家准备，取消准备   
				JAY.SocketEvents.Rev101107,  //推送玩家加入桌子
				JAY.SocketEvents.Rev101106,  //推送玩家准备/取消准备
				JAY.SocketEvents.Rev101004,  //推送定庄信息
				JAY.SocketEvents.Rev101005,  //推送发牌信息
				JAY.SocketEvents.Rev101008,  //推送补花
				JAY.SocketEvents.Rev101007,  //推送游戏补花
				JAY.SocketEvents.Rev101002,  //推送玩家摸牌
				JAY.SocketEvents.Rev101001,  //推送其他玩家叫牌 
				JAY.SocketEvents.Rev101112, 	//推送玩家动作响应
				JAY.SocketEvents.Send100140, //发送玩家叫牌
				JAY.SocketEvents.Send100999,	//发送测试接口
				JAY.SocketEvents.Rev101006,  //推送游戏结算
				JAY.SocketEvents.Rev101003,	//推送游戏结束
			];
		}

		/**
		 *  玩家自己准备
		 */
		public onMySelfReady() {
			let obj = <Send100100>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.ready = ReadyState.UNREADY;
			Socket.Instance.sendData(SocketEvents.Send100100, obj);
		}

		/**
		 *  玩家自己出牌
		 */
		public actChuCard(cardValue: number) {//懒得接收它的协议，后面的101112协议还是会告诉客户端出了什么牌  还是得接收，不然出牌的动作太慢了，体验不好
			let obj = <Send100140>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.act = JAY.ACT.CHU;

			//动作参数
			let actParams = <ActSendParams>{};
			actParams.card = cardValue;
			let actParamsStr = JSON.stringify(actParams)
			obj.act_params = actParamsStr;
			Socket.Instance.sendData(SocketEvents.Send100140, obj);
		}

		/**
		 * 测试接口
		 */
		public test_Send(test_type: JAY.TestType, target_card: Array<number>, source_card: Array<number> = []) {
			let obj = <Send100999>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.test_type = test_type;

			let test_param = <SendTestParams>{};
			test_param.source_card = source_card;
			test_param.target_card = target_card;
			let testParamsStr = JSON.stringify(test_param)
			obj.test_params = testParamsStr;
			Socket.Instance.sendData(SocketEvents.Send100999, obj);
		}


		/**
		 *  玩家自己准备回调
		 */
		private on_100100_event(event: egret.Event) {
			console.log(this.TAG + " on_100100_event: " + event.data);
			let data = event.data;
			let obj = <Rev100100>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("准备成功");
				UsersInfo.MySelf.status = JAY.ReadyState.READY;
				this._isAllUsersReady();
			} else {//fail

			}
		}

		/**
		 * 推送玩家进入房间
		 */
		private on_101107_event(event: egret.Event) {
			console.log(this.TAG + " on_101107_event: " + event.data);
			let data = event.data;
			let obj = <Rev101107>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log(`玩家id为${obj.info.user_id}进入房间`);
				let user = new User();
				for (let key in obj.info) {
					user[key] = obj.info[key];
				}
				UsersInfo.Instance.addUser(user);
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.OtherPlayer_EnterROOM, { user: user });
			} else {//fail

			}
		}

		/**
		 * 推送玩家进入准备
		 */
		private on_101106_event(event: egret.Event) {
			console.log(this.TAG + " on_101106_event: " + event.data);
			let data = event.data;
			let obj = <Rev101106>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log(`玩家id为${obj.info.user_id}进入准备状态`);
				let user = UsersInfo.Instance.getUserById(obj.info.user_id);
				user.status = JAY.ReadyState.READY;
				this._isAllUsersReady();
			} else {//fail

			}
		}

		/**
		 * 检查是否所有的玩家准备好
		 */
		private _isAllUsersReady() {
			if (UsersInfo.Instance.isAllUsersReady()) {
				DeskInfo.diceValue = [-1, -1];//骰子未定，播放动画
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.AllUsersReady);
			}
		}


		/**
		 * 推送定庄信息（摇骰子）
		 */
		private on_101004_event(event: egret.Event) {
			console.log(this.TAG + " on_101004_event: " + event.data);
			let data = event.data;
			let obj = <Rev101004>JSON.parse(data);
			if (obj.code == 200) {//success
				let seat_id = obj.info.bank_seat_id;
				let user = UsersInfo.Instance.getUserBySeatID(seat_id);
				console.log(`客户端座位为${user.client_seatID}是庄家`);
				user.isBanker = true;
				DeskInfo.diceValue = obj.info.dice;
			} else {//fail

			}
		}


		/**
		 * 推送发牌消息 游戏开始发牌每人13张
		 */
		private on_101005_event(event: egret.Event) {
			console.log(this.TAG + " on_101005_event: " + event.data);
			let data = event.data;
			let obj = <Rev101005>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.DealCard, { all_cards: obj.info.all_cards });
			} else {//fail

			}
		}

		/**
		 * 推送发牌补花
		 */
		private on_101008_event(event: egret.Event) {
			console.log(this.TAG + " on_101008_event: " + event.data);
			let data = event.data;
			let obj = <Rev101008>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.BuHua_DealCard, { info: obj.info });
			} else {//fail

			}
		}

		/**
		 * 推送玩家摸牌
		 */
		private on_101002_event(event: egret.Event) {
			console.log(this.TAG + " on_101002_event: " + event.data);
			let data = event.data;
			let obj = <Rev101002>JSON.parse(data);
			if (obj.code == 200) {//success
				DeskInfo.remain_count = obj.info.remain_count;
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.DrawCard, { info: obj.info });
			} else {//fail

			}
		}

		/**
		 * 推送玩家游戏补花
		 */
		private on_101007_event(event: egret.Event) {
			console.log(this.TAG + " on_101007_event: " + event.data);
			let data = event.data;
			let obj = <Rev101007>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.BuHua_GameCard, { info: obj.info });
			} else {//fail

			}
		}


		/**
		 * 推送玩家叫牌(只推送给自己)
		 */
		private on_101001_event(event: egret.Event) {
			console.log(this.TAG + " on_101001_event: " + event.data);
			let data = event.data;
			let obj = <Rev101001>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.CanAct, { info: obj.info });
			} else {//fail

			}
		}

		/**
		 * 接收玩家叫牌
		 */
		private on_100140_event(event: egret.Event) {
			console.log(this.TAG + " on_101001_event: " + event.data);
			let data = event.data;
			//暂时不做处理
			// // let obj = <Rev101001>JSON.parse(data);
			// if (obj.code == 200) {//success

			// } else {//fail

			// }
		}



		/**
		 * 推送玩家动作响应,以及进行了什么操作
		 */
		private on_101112_event(event: egret.Event) {
			console.log(this.TAG + " on_101112_event: " + event.data);
			let data = event.data;
			let obj = <Rev101112>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.ACT_Aleady, { info: obj.info });
			} else {//fail

			}
		}


		/**
		 * 推送玩家结算
		 */
		private on_101006_event(event: egret.Event) {
			console.log(this.TAG + " on_101006_event: " + event.data);
			let data = event.data;
			let obj = <Rev101006>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.CheckOut, { info: obj.info });
			} else {//fail

			}
		}


		/**
		 * 推送游戏结束
		 */
		private on_101003_event(event: egret.Event) {
			console.log(this.TAG + " on_101003_event: " + event.data);
			let data = event.data;
			let obj = <Rev101003>JSON.parse(data);
			if (obj.code == 200) {//success
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.GameOver, { info: obj.info });
			} else {//fail

			}
		}



		/**
		 * 测试接口
		 */
		private on_100999_event(event: egret.Event) {
			console.log(this.TAG + " on_100999_event: " + event.data);
			let data = event.data;
			let obj = <Rev100999>JSON.parse(data);
			if (obj.code == 200) {//success
				switch (obj.info.test_type) {

					case TestType.DealCard://发牌不做处理
						break;
					case TestType.ChangeCard:
						EventManager.getInstance().dispatchCustomEvent(CustomEvents.ChangeCard, { info: obj.info });
						break;

				}
			} else {//fail
				let errorInfo = JSON.parse(data);
				Tips.show(errorInfo.info);
			}
		}


	}
}