module JAY {
	export class EmailDetailPanel extends BasePanel {
		private closeBtn: eui.Button;
		private suretBtn: eui.Button;
		private emailDetailtitle: eui.Label;
		private emailDetailcontent: eui.Label;

		private hasGiftGroup: eui.Group;
		private HcloseBtn: eui.Button;
		private HemailDetailtitle: eui.Label;
		private HemailDetailcontent: eui.Label;
		private giftGroup: eui.Group;
		private giftNum: eui.Label;
		private gitIcon: eui.Image;
		private getGiftBtn: eui.Button;
		private noGiftGroup: eui.Group;
		private NemailDetailtitle: eui.Label;
		private NemailDetailcontent: eui.Label;
		private NcloseBtn: eui.Button;
		private sureBtn: eui.Button;


		public constructor() {
			super();
			this.skinName = "Skin.EmailDetailPanelSkin";

		}
		/**添加到场景中*/
		protected onEnable() {
			this.NcloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.HcloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.getGiftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			
		}
		// public recDataFun(data) {
		// 	var emailDeatilData=ProtocolHttpData.emailDeatilData.data;
		// 	emailDeatilData=data;
		// 	var len=emailDeatilData.reward.length;
		// 	if(len==0)
		// 	{
		// 		this.hasGiftGroup.visible=false;
		// 		this.noGiftGroup.visible=true;
		// 		this.NemailDetailtitle.text=emailDeatilData.title;
		// 	    this.NemailDetailcontent.text=emailDeatilData.content;
		// 	}
		// 	else
		// 	{
		// 		this.hasGiftGroup.visible=true;
		// 		this.noGiftGroup.visible=false;
		// 		var rewardItem=ProtocolHttpData.RewardItem;
		// 		rewardItem=emailDeatilData.reward[0];
		// 		// this.gitIcon.source=rewardItem.reward_icon+"";
		// 		this.giftNum.text="×"+rewardItem.reward_quantity;
		// 		this.HemailDetailtitle.text=emailDeatilData.title;
		// 	    this.HemailDetailcontent.text=emailDeatilData.content;
		// 	}
			
		// }
		private  getReward()
		{
			
		}

		/**从场景中移除*/
		protected onRemove() {
			this.HcloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.NcloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			this.getGiftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
			this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		}

	}
}