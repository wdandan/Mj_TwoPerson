module JAY {
	export class ShopMallItem extends eui.ItemRenderer {
		public moneyIcon: eui.Image;
		public moneyText: eui.Label;
		public priceText: eui.Label;
		public buyBtn: eui.Button;
		public id: number;

		public constructor() {
			super();
			this.skinName = Skin.ShopMallItemSkin;
		}
		protected dataChanged() {
			// var goodsListItemData=ProtocolHttpData.GoodsListItemData;
			// goodsListItemData=this.data;
			// this.moneyIcon.source = "tpm_moneyIcon" + goodsListItemData.icon + "_png";
			// this.moneyText.text = goodsListItemData.title;//NumberTool.sperateMoney(goodsListItemData.title);
			// this.priceText.text = "价值" + goodsListItemData.rmb_price + "元";
			// (this.buyBtn.getChildAt(2) as eui.BitmapLabel).text=goodsListItemData.selling_price+"";
			// this.id=goodsListItemData.id;
		}
		protected childrenCreated() {
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
		}

		private onBuy(e: egret.TouchEvent) {
			// HallHttpDataSend.sendBuyProp(this.id);
		} 
	}
}