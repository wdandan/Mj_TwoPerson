module JAY {
	export class EmailItem extends eui.ItemRenderer {
		public emailIcon: eui.Image;
		public emailTitle: eui.Label;
		public sendTime: eui.Label;
		public emailContent: eui.Label;
		public readEmailBtn: eui.Button;
		public id:number;

		public constructor() {
			super();
			this.skinName = "Skin.EmailItemSkin";
		}
		// protected dataChanged() {
		// 	var data = ProtocolHttpData.EmailListItemData;
		// 	data = this.data;
		// 	if(data.icon!="")this.emailIcon.source=data.icon;
		// 	this.emailTitle.text = data.title;
		// 	this.emailContent.text = data.content;
		// 	this.sendTime.text = data.time_desc.substr(5);
		// 	this.id = data.id;
		// }
		protected childrenCreated() {
			this.readEmailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readEmail, this);
		}

		private readEmail(e: egret.TouchEvent) {
			// App.PanelManager.open(PanelConst.EmailDetailPanel);
			// HallHttpDataSend.sendReadEmail(this.id);
		}
	}
}