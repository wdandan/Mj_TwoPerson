/**
 * 选择进入房间类型层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class SelectRoom extends Layer {
		protected _ctrl: SelectRoomController;
		private closeButton: eui.Button;
		private btn_joinRoom: eui.Button;
		private btn_createRoom: eui.Button;

		public constructor() {
			super();
			this.skinName = "Skin.SelectRoom";
		}

		protected init(): void {
			super.init();

		}

		protected setOnTouchListener() {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			this.btn_joinRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onJoinRoomClick, this);
			this.btn_createRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCreateRoomClick, this);
		}

		protected removeOnTouchListener() {
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			this.btn_joinRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onJoinRoomClick, this);
			this.btn_createRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCreateRoomClick, this);
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				
			];
		}

		/**
		 * 点击加入房间
		 */
		private _onJoinRoomClick() {
			console.log("_onJoinRoomClick");
			let joinRoomLayer = new JAY.JoinRoom();
			joinRoomLayer.Ctrl = new JAY.JoinRoomController();
			SceneManager.Instance.runningScene.addChild(joinRoomLayer);
		}

		/**
		 * 点击创建房间
		 */
		private _onCreateRoomClick() {
			console.log("_onCreateRoomClick");
			this._ctrl.createRoom();
		}

		private _onCloseClick() {
			this.parent.removeChild(this);
		}
	}
}