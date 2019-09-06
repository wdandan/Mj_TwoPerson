module JAY {
	export class GiveMoneyPanel extends BasePanel {
		private getMoneyBtn: eui.Button;
		private closeBtn: eui.Button;
		private contentText: eui.Label;
		private moneyText: eui.Label;

		public constructor() {
			super();
			this.skinName = "Skin.GiveMoneyPanelSkin";
		}
		/**添加到场景中*/
		protected onEnable() {
			this.getMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);


		}

		/**从场景中移除*/
		protected onRemove() {
			this.getMoneyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		/**接收参数 */
		// public recDataFun(data: any) {
		// 	this.recData = data;
		// 	var giveMoneyData=ProtocolHttpData.GiveMoneyData.data;
		// 	giveMoneyData=data;
		// 	var money = NumberTool.sperateMoney(giveMoneyData.money);
		// 	this.contentText.text = "您的金币不足！系统赠送您" + money + "金币，今天第" + NumberTool.formatCapital(giveMoneyData.income_support_times) + "次领取，一共可领取三次";
		// 	this.moneyText.text = money;

		// }
		private onSure(e: egret.TouchEvent) {
			// HallHttpDataSend.sendGetIncomeSupport();
		}
	}
}