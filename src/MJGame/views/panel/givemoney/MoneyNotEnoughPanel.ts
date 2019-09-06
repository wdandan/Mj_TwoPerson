module JAY {
	export class MoneyNotEnoughPanel extends BasePanel {
		private buyMoneyBtn: eui.Button;
		private tipsText: eui.Label;
		private moneyText: eui.Label;
		private closeBtn: eui.Button;
		private priceText: eui.Label;

		public constructor() {
			super();
			this.skinName = Skin.MoneyNotEnoughPanelSkin;
		}
		/**添加到场景中*/
		protected onEnable() {
			this.buyMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}

		/**从场景中移除*/
		protected onRemove() {
			this.buyMoneyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		/**接收参数 */
		// public recDataFun(data: any) {
		// 	this.recData = data;
		// 	var moneyNotEnoughData=ProtocolHttpData.MoneyNotEnoughData;
		// 	var lowestmoney = NumberTool.sperateMoney(moneyNotEnoughData.lowestmoney);
		// 	var money = NumberTool.sperateMoney(moneyNotEnoughData.quantity);
		// 	var type:string=moneyNotEnoughData.type;
		// 	//"fontFamily":"楷体"
		// 	var tetleTextStyleJson = { "size": 28, "textColor": 0xFCEFDC, "fontFamily": "Microsoft YaHei" }
		// 	var contentTextStyleJson = { "size": 28, "textColor": 0xFFEB00, "fontFamily": "SimHei" ,"bold":"true"}
		// 	this.tipsText.textFlow= <Array<egret.ITextElement>>[  { text: "您需要拥有  ", style: tetleTextStyleJson }
		// 		, { text: lowestmoney+"金币", style: contentTextStyleJson },
		// 		{text: "才能进入"+type+"级场", style: tetleTextStyleJson}];
		// 	this.moneyText.text = money;
		// 	this.priceText.text = "价值"+moneyNotEnoughData.selling_price+"元";
		// }
		// /**更新推荐商品 */
		// public updateRecommendGood(data)
		// {
		// 	var recommendGood=ProtocolHttpData.MoneyNotEnoughData;
		// 	recommendGood=data;
		// 	this.moneyText.text = recommendGood.quantity+"";
		// 	this.priceText.text = "价值"+recommendGood.selling_price+"元";
		// }
		private onSure(e: egret.TouchEvent) {

		}
	}
}