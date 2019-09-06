module JAY {
	export class SharePanel extends BasePanel {
		public wxShareBtn: eui.Button;
		public wxShareFriendBtn: eui.Button;
		public qqShareBtn: eui.Button;
		public closeBtn: eui.Button;

		public constructor() {
			super();
			this.skinName = "Skin.SharePanelSkin";
		}
		/** 添加到场景*/
		protected onEnable() {
			this.wxShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.wxShareFriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.qqShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		/**从场景中移除*/
		protected onRemove() {
			this.wxShareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.wxShareFriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.qqShareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setShareType, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		private setShareType(e: egret.TouchEvent) {
			var shareType = 0;
			switch (e.target) {
				case this.wxShareBtn:
					shareType = 0;
					break;
				case this.wxShareFriendBtn:
					shareType = 1;
					break;
				case this.qqShareBtn:
					shareType = 2;
					break;
			}
			this.onShare(shareType);
		}
		private onShare(shareType: number) {
			// var data;
			// switch (shareType) {
			// 	case 0:
			// 	data = ShareData.wxShareData;
			// 	data.type=0;
			// 		break;
			// 	case 1:
			// 	data = ShareData.wxShareData;
			// 	data.type=1;
			// 		break;
			// 	case 2:
			// 	data = ShareData.qqShareData;
			// 		break;
			// }	
			// App.PlatformBridge.sendPlatformEvent(PlatFormEventConst.shareStart, data);
			// Tips.showTop("分享请求已发送！");
		}
	}
}