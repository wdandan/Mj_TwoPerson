module JAY {
	export class ShopMallPanel extends BasePanel {
		private closeBtn: eui.Button;
		private mallList: eui.List;
		
		public constructor() {
			super();
			this.skinName = "Skin.ShopMallPanelSkin";
		}
		/**添加到场景中*/
		protected onEnable() {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		public recDataFun(data){
			// var ac:eui.ArrayCollection=new eui.ArrayCollection();
			// var arr=[];
			// var revData = ProtocolHttpData.GoodsListData.data;
			// revData=data;
			// var len=revData.length;	
			// for (var i = 0; i < len; i++) {
			// 	var itemData = ArrayTool.deepCopy(ProtocolHttpData.GoodsListItemData);
			// 	itemData.icon=revData[i].icon;
			// 	itemData.id=revData[i].id;
			// 	itemData.selling_price=revData[i].selling_price;
			// 	itemData.rmb_price=revData[i].rmb_price;
			// 	itemData.title=revData[i].title;
			// 	arr.push(itemData);
			// }
			// ac.source=arr;
			// this.mallList.itemRenderer=ShopMallItem;
			// this.mallList.dataProvider=ac;
		}
		/**从场景中移除*/
		protected onRemove() {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
	}
}