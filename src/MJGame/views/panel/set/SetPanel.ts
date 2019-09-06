module JAY {
	export class SetPanel extends BasePanel {
		public hallSetGroup: eui.Group;
		public bgMusic_hallBtn: eui.ToggleButton;
		public effectMusic_hallBtn: eui.ToggleButton;
		public closeBtnHall: eui.Button;

		public bgMusic_Btn: eui.ToggleButton;
		public effectMusic_Btn: eui.ToggleButton;
		public closeBtn: eui.Button;


		public constructor() {
			super();
			this.skinName = "Skin.SetPanelSkin";
		}

		protected childrenCreated()
		{
			this.hallSetGroup.visible=false;
			// this.bgMusic_hallBtn.selected= !App.LocalStorageUtil.allowMusic;
			// this.effectMusic_hallBtn.selected= !App.LocalStorageUtil.allowEffect;
		}
		/** 添加到场景*/
		protected onEnable() {
			this.hallSetGroup.visible=false;
			if (this.gameBool) {
				this.hallSetGroup.visible = false;
				// this.bgMusic_Btn = this.music_togBtn_game;
				// this.effectMusic_Btn = this.voice_togBtn_game;
			}
			else {
				this.hallSetGroup.visible = true;
				this.bgMusic_Btn = this.bgMusic_hallBtn;
				this.effectMusic_Btn = this.effectMusic_hallBtn;
				this.closeBtn = this.closeBtnHall;
			}
			// this.bgMusic_Btn.selected= !App.LocalStorageUtil.allowMusic;
			// this.effectMusic_Btn.selected= !App.LocalStorageUtil.allowEffect;
			this.hallSetGroup.visible=true;
			this.bgMusic_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
			this.effectMusic_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
		}
		/** 从场景中移除*/
		protected onRemove() {
			this.bgMusic_Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
			this.effectMusic_Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.gameBool = false;
		}

		private onClose() {
			this.hide();
		}

		private setToggleSwitchTouch(e: egret.TouchEvent) {
			// var toogle = !e.target.selected;
			// switch (e.target) {
			// 	case this.bgMusic_Btn:
			// 		App.LocalStorageUtil.allowMusic = App.SoundManager.allowPlayBGM = toogle;
			// 		//游戏中开关背景音乐
			// 		if (App.SoundManager.allowPlayBGM && App.SceneManager.getCurScene() instanceof GameScene) {
			// 		} else {
			// 			App.SoundManager.stopBGM();
			// 		}
			// 		break;
			// 	case this.effectMusic_Btn:
			// 		App.LocalStorageUtil.allowEffect = App.SoundManager.allowPlayEffect = toogle;
			// 		//游戏中加载音效
			// 		break;
			// }
		}


	}
}