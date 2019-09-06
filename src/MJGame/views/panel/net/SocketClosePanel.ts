module JAY {
	export class SocketClosePanel extends BasePanel {
		public sureBtn: eui.Button;
		public constructor() {
			super();
			this.skinName = "Skin.SocketClosePanelSkin";
		}
		/**添加到场景中*/
		protected onEnable() {
			this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);

		}

		/**从场景中移除*/
		protected onRemove() {
			this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
		}

		private onSure(e:egret.TouchEvent) {
			// App.DataCenter.runingData.clearData();
			// App.DataCenter.UserInfo.deleteAllUserExcptMe();
			// (<LoginController>App.getController(LoginController.NAME)).connectGameServer();
			// App.PanelManager.closeAllPanel();
			// this.hide();
		}
	}
}