module JAY {
	export class PersonalInfoPanel extends BasePanel{
		private closeBtn: eui.Button;
		private highestWinCount: eui.Label;
		private winRate: eui.Label;
		private totalCount: eui.Label;
		private nick: eui.Label;
		private golds: eui.Label;
		private id: eui.Label;
		private diamonds: eui.Label;
		private headImg: eui.Image;

		public constructor() {
			super();
			this.skinName = Skin.PersonalInfoPanelSkin;
		}
		/**添加到场景中*/
		protected onEnable() {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			
		}
		// public recDataFun(data) {
		// 	var personalinfodata=ProtocolHttpData.PersonalInfoData.data;
		// 	personalinfodata=data;
		// 	this.headImg.source=personalinfodata.avater_url;
		// 	this.nick.text=StringTool.formatNickName(personalinfodata.nick_name,12);
		// 	this.id.text=personalinfodata.uid+"";
		// 	this.golds.text=NumberTool.sperateMoney(personalinfodata.money);
		// 	this.diamonds.text=personalinfodata.diamond+"";//NumberTool.sperateMoney(personalinfodata.diamond);
		// 	this.totalCount.text=personalinfodata.total+"";
		// 	this.highestWinCount.text=personalinfodata.highest_winning_streak+"场";
		// 	this.winRate.text=personalinfodata.winning_rate;
		// }

		/**从场景中移除*/
		protected onRemove() {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}
	}
}