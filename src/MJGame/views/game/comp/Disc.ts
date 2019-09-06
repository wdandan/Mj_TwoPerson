/**
 * 风向盘
 * 组件只提供接口不处理协议，由数据来驱动组件的视图变化
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Disc extends Layer {
		private anim_dice: JAY.MCPlayer;//骰子动画
		private dice: eui.Group;//骰子值
		private remain_count: eui.Label;//剩余的牌值
		private img_fengDir: eui.Image;//风向图

		private lights: eui.Group;//其方向按下右上左的顺序 和 card的方向一致

		public constructor() {
			super();
			this.skinName = "Skin.Disc";
		}

		protected init() {
			super.init();
			//初始化
			this.anim_dice.MC.stop();
			this.anim_dice.visible = false;
			this.dice.visible = false;
			this.remain_count.visible = false;
			//灯全不显示
			this._setLightsVisible(false);
		}

		/**
		 * 设置所有灯的可见性
		 */
		private _setLightsVisible(visible: boolean) {
			for (let i = 0; i < this.lights.numChildren; i++) {
				this.lights.getChildAt(i).visible = visible;
			}
		}


		/**
		 * 摇骰子动画并设置骰子值
		 */
		private _setDice(dice: [number, number]) {
			if (dice == null) return;
			if (dice[0] == -1 && dice[1] == -1) {
				this.anim_dice.visible = true;
				this.anim_dice.MC.play(-1);
			} else {
				(<eui.Image>this.dice.getChildAt(0)).source = RES.getRes(`s${dice[0]}_png`);
				(<eui.Image>this.dice.getChildAt(1)).source = RES.getRes(`s${dice[1]}_png`);

				let timeoutId = egret.setTimeout(() => {
					this.anim_dice.MC.stop();
					this.anim_dice.MC.visible = false;
					this.dice.visible = true;
					clearTimeout(timeoutId);
				}, this, 1000);
			}
		}


		/**
		 * 剩余牌数
		 */
		private _setRemainCount(value: number) {
			value && (this.remain_count.text = `剩余:${value.toString()}张牌`);
			this.remain_count.visible = true;
		}


		protected watchData() {
			eui.Binding.bindHandler(DeskInfo, ["diceValue"], this._setDice, this);
			eui.Binding.bindHandler(DeskInfo, ["remain_count"], this._setRemainCount, this);

		}


		//设置座位东西南北风向  设置东风的方向
		public setDongFengDirection(direction: JAY.Directions) {
			switch (direction) {
				case JAY.Directions.Down:
					this.img_fengDir.rotation = 0;
					break;
				case JAY.Directions.Right:
					this.img_fengDir.rotation = 270;
					break;
				case JAY.Directions.Up:
					this.img_fengDir.rotation = 180;
					break;
				case JAY.Directions.Left:
					this.img_fengDir.rotation = 90;
					break;
			}

		}

		/**
		 * 轮到出牌的一方的亮灯  后期加入倒计时在这里加
		 * @param direction 方向
		 */
		public lightBright(direction: JAY.Directions,coolTime?:number) {
			this._setLightsVisible(false);
			let element = this.lights.getChildAt(direction);
			element.visible = true;
			egret.Tween.get(element, { loop: true }).to({ alpha: 0 }, 200, egret.Ease.quadIn).to({ alpha: 1 }, 200, egret.Ease.quadIn);
		}

		/**
        * 重置方向盘
        */
		public reSetDisc(){
			this._setLightsVisible(false);
			//初始化
			this.anim_dice.MC.stop();
			this.anim_dice.visible = false;
			this.dice.visible = false;
			this.remain_count.visible = false;
		}
	}
}