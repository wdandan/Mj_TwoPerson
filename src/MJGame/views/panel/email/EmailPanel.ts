module JAY {
	export class EmailPanel extends BasePanel {
		private closeBtn: eui.Button;
		private emailList: eui.List;
		private emailEmptyGroup: eui.Group;
		
		public constructor() {
			super();
			this.skinName = "Skin.EmailPanelSkin";
		}
		/**添加到场景中*/
		protected onEnable() {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
		// public recDataFun(data) {
		// 	var ac: eui.ArrayCollection = new eui.ArrayCollection();
		// 	var arr = [];
		// 	var len = data.length;
		// 	if (len > 0) {
		// 		this.emailEmptyGroup.visible = false;
		// 		for (var i = 0; i < len; i++) {
		// 			var itemData =ArrayTool.deepCopy(ProtocolHttpData.EmailListItemData);
		// 			itemData.id = data[i].id;
		// 			itemData.content = StringTool.formatNickName(data[i].content,26);
		// 			itemData.title = StringTool.formatNickName(data[i].title,20);
		// 			itemData.time_desc = data[i].time_desc;
		// 			arr.push(itemData);
		// 		}
		// 		ac.source = arr;
		// 		this.emailList.itemRenderer = EmailItem;
		// 		this.emailList.dataProvider = ac;
		// 	}
		// 	else
		// 		this.emailEmptyGroup.visible = true;
		// }

		/**从场景中移除*/
		protected onRemove() {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}

	}
}