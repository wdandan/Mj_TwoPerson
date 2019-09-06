/**
 * 操作吃碰杠牌的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class ActHandlerController extends Controller {
		protected init() {
			super.init();
			this.SocketEventList = [
				// JAY.SocketEvents.Send100140, 
			];
		}

		/**
		 * 发送过叫牌
		 */
		public actGuo() {
			//动作参数
			let actParams = <ActSendParams>{};
			this._sendData(JAY.ACT.GUO, actParams);
		}


		/**
		 * 发送吃叫牌
		 */
		public actChi(used_card: Array<number>) {
			//动作参数
			let actParams = <ActSendParams>{};
			actParams.used_card = used_card;
			this._sendData(JAY.ACT.CHI, actParams);
		}

		/**
		 * 发送碰叫牌
		 */
		public actPeng() {
			//动作参数
			let actParams = <ActSendParams>{};
			this._sendData(JAY.ACT.PENG, actParams);
		}

		/**
		 * 发送点杠叫牌
		 */
		public actGang(act: JAY.ACT,used_card?: number) {
			//动作参数
			let actParams = <ActSendParams>{};
			used_card && (actParams.used_card = used_card);
			this._sendData(act, actParams);
		}


		/**
		 * 发送胡叫牌
		 */
		public actHu(act: JAY.ACT) {
			//动作参数
			let actParams = <ActSendParams>{};
			this._sendData(act, actParams);
		}

		/**
		 * 叫牌的格式差不多，抽象出来
		 */
		private _sendData(act: JAY.ACT, actParams: ActSendParams) {
			let obj = <Send100140>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.act = act;

			let actParamStr = JSON.stringify(actParams);
			obj.act_params = actParamStr;
			Socket.Instance.sendData(SocketEvents.Send100140, obj);
		}

	}
}