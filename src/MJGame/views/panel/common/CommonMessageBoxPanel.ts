module JAY {
	export class CommonMessageBoxPanel extends BasePanel {
		private sureBtn: eui.Button;
		private closeBtn: eui.Button;
		private tipsMessage: eui.Label;

		public constructor() {
			super();
			this.skinName = "Skin.CommonMessageBoxPanelSkin";
		}
			/**添加到场景中*/
		protected onEnable() {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		public recDataFun(data) {
			if(data.content&&data.content!="")this.tipsMessage.text=data.content;
		}

		/**从场景中移除*/
		protected onRemove() {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}

	}
}