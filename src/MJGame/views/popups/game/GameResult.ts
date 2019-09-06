/**
 * 加入房间层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class GameResult extends Layer {
		protected _ctrl: JoinRoomController;
		private closeButton: eui.Button;
		private total_Group: eui.Group;
		private _data: CheckOutInfo;
		/**按钮列表 */
		private _numberBtns: Array<eui.Button> = [];

		public constructor(data?: CheckOutInfo) {
			super();
			this.skinName = "Skin.GameResult";
			this._data = data;
		}

		protected init(): void {
			super.init();
			this._setTotalResult();
		}


		private _setTotalResult() {
			let totalPoints = this._data.total_points;
			for (let key in this._data.total_points) {
				let user = UsersInfo.Instance.getUserBySeatID(Number(key));//找到座位号对应的用户，需要其客户端对应的座位号
				let totalLabel = new eui.Label();
				this.total_Group.addChild(totalLabel);
				totalLabel.text = `玩家${user.user_id}的总分：${totalPoints[key]}`
			}
		}

		protected setOnTouchListener() {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);

		}

		protected removeOnTouchListener() {
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);

		}

		protected registerCustomEvents() {
			this.UIEventList = [

			];
		}

		private _onCloseClick() {
			this.parent.removeChild(this);
		}

		protected watchData() {

		}

	}
}