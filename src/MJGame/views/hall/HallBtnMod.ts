module JAY {
	export enum HallBtnMsg {
		playMethod,
		email,
		share,
		shop,
		set
	}

	export class HallBtnMod extends JAY.Layer{
		private hall_playMethod:eui.Button;
		private hall_email:eui.Button;
		private hall_share:eui.Button;
		private hall_shop:eui.Button;
		private hall_set:eui.Button;
		
		public constructor() {
			console.log("jayHallLayer HallBtnMod constructor()")
			super();
            this.skinName = "Skin.HallBtnModSkin";
		}

		protected setOnTouchListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        protected removeOnTouchListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [

            ];
        }

		private onTouch(e: egret.TouchEvent) {
			let target = e.target;
			console.log("jayHallLayer HallBtnMod onTouch target="+target)
			let message;
			switch (target) {
				case this.hall_playMethod:
					PanelManager.Instance.open(PanelConst.PlayMethodPanel);
					// App.PanelManager.open(PanelConst.MoneyNotEnoughPanel, false, null, null, true, true, ProtocolHttpData.MoneyNotEnoughData);
                    break;
					// message = HallBtnMsg.playMethod;
					// break;
				case this.hall_email:
					message = HallBtnMsg.email;
					break;
				case this.hall_share:
					message = HallBtnMsg.share;
					break;
				case this.hall_shop:
					message = HallBtnMsg.shop;
					break;
				case this.hall_set:
					message = HallBtnMsg.set;
					break;
				default:
					break;
			}
			
		}
	}
}