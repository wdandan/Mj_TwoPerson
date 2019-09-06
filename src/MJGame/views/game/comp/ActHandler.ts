/**
 * 动作操作类
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class ActHandler extends Layer {
		protected _ctrl: JAY.ActHandlerController;

		private Chi: JAY.MCPlayer;
		private Peng: JAY.MCPlayer;
		private Gang: JAY.MCPlayer;
		private Hu: JAY.MCPlayer;
		private Guo: JAY.MCPlayer;
		private chiComb_Group: eui.Group;

		private _actList: Object;

		public constructor() {
			super();
			this.skinName = "Skin.ActHandler";//注意其帧动画已在编辑器上进行设置
		}

		protected init() {
			super.init();

			this._actList = {
				[JAY.ACT.GUO]: { obj: this.Guo },
				[JAY.ACT.CHI]: { obj: this.Chi },
				[JAY.ACT.PENG]: { obj: this.Peng },
				[JAY.ACT.AN_GANG]: { obj: this.Gang },
				[JAY.ACT.BU_GANG]: { obj: this.Gang },
				[JAY.ACT.DIAN_GANG]: { obj: this.Gang },
				[JAY.ACT.DIAN_HU]: { obj: this.Hu },
				[JAY.ACT.ZI_MO]: { obj: this.Hu },
			};

			this._clearLayout();
		}

		private _clearLayout() {
			for (let key in this._actList) {
				let element = this._actList[key].obj;
				this._showAct(element, false);
				delete this._actList[key].info;
			}
		}

		protected setOnTouchListener() {
			this.Chi.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
		}

		protected removeOnTouchListener() {
			this.Chi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Peng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Gang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Hu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
			this.Guo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
		}

		private _actButtonClick(event: egret.Event) {
			let actplayer = <JAY.MCPlayer>event.currentTarget;
			console.log(actplayer.mcLink);
			switch (actplayer) {
				case this.Guo:
					this.hide();//点了之后立马隐藏
					this._actGuoClick();
					break;
				case this.Chi:
					this._actChiClick();
					break;
				case this.Peng:
					this._actPengClick();
					break;
				case this.Gang:
					this._actGangClick();
					break;
				case this.Hu:
					this._actHuClick();
					break;
			}

		}

		/**
		 * 点击了过按钮
		 */
		private _actGuoClick() {
			console.log("_actGuoClick");
			this._ctrl.actGuo();
		}

		/**
		 * 点击了吃按钮
		 */
		private _actChiClick() {
			console.log("_actChiClick");
			let info = this._actList[JAY.ACT.CHI].info;
			if (info.length == 1) {//长度为1直接吃
				this._ctrl.actChi(info[0]);
			} else {//显示可以吃的牌型
				this.chiComb_Group.visible = true;
				this.chiComb_Group.removeChildren();
				for (let combList of info) {
					let combCards = new JAY.ComboCards;
					// combCards.bottom = 0;
					combCards.scaleX = combCards.scaleY = 0.6;
					combCards.setCombCardsTexture(JAY.Directions.Down, combList, JAY.CardCombType.Chi);
					combCards.addEventListener(egret.TouchEvent.TOUCH_TAP, this._chiCombCardHandler, this);
					this.chiComb_Group.addChild(combCards);
				}
			}

		}

		/**
		 * 吃组合被点击的时候
		 */
		private _chiCombCardHandler(event: egret.Event) {
			let combCards = <JAY.ComboCards>event.currentTarget;
			let index = this.chiComb_Group.getChildIndex(combCards);
			let info = this._actList[JAY.ACT.CHI].info;
			this.chiComb_Group.visible = false;
			this.hide();
			this.chiComb_Group.removeChildren();
			this._ctrl.actChi(info[index]);

		}

		/**
		 * 点击了碰按钮
		 */
		private _actPengClick() {
			console.log("_actPengClick");
			this._ctrl.actPeng();
		}

		private _actHuClick() {
			console.log("_actHuClick");
			if(this._actList[JAY.ACT.DIAN_HU].info){
				this._ctrl.actHu(JAY.ACT.DIAN_HU);
			}else if(this._actList[JAY.ACT.ZI_MO].info){
				this._ctrl.actHu(JAY.ACT.ZI_MO);
			}
		}

		private _actGangClick() {
			console.log("_actGangClick");
			if(this._actList[JAY.ACT.DIAN_GANG].info){//是某种杠的类型info才有值，注意在clearLayout时 delete此属性
				this._ctrl.actGang(JAY.ACT.DIAN_GANG);
			}else if(this._actList[JAY.ACT.BU_GANG].info){
				this._ctrl.actGang(JAY.ACT.BU_GANG,this._actList[JAY.ACT.BU_GANG].info[0]);
			}else if (this._actList[JAY.ACT.AN_GANG].info){
				this._ctrl.actGang(JAY.ACT.AN_GANG,this._actList[JAY.ACT.AN_GANG].info[0]);
			}
			
		}

		/**
		 * 参与布局的UI
		 * @param act 动作
		 * @param value 动作携带的信息
		 */
		public addLayout(act: JAY.ACT, value: any) {
			this._showAct(this._actList[act].obj, true);
			this._actList[act].info = value;
		}

		/**
		 * 是否参与布局
		 */
		private _showAct(mcPlayer: JAY.MCPlayer, isShow: boolean) {
			mcPlayer.visible = isShow;
			mcPlayer.includeInLayout = isShow;
		}

		public hide() {
			this.visible = false;
			this._clearLayout();
		}
	}
}