/**
 * 出牌指针
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class CardPointer extends Layer {
		private _moveDist: number = -10;  //移动距离

		public constructor() {
			super();
			this.width = 50;
			this.height = 64;
		}

		/**
		 * 组件创建完毕
		 * 此方法仅在组件第一次添加到舞台时回调一次
		*/
		protected createChildren(): void {
			super.createChildren();
			var image = new eui.Image();
			image.source = "outCardPointer_png";
			this.addChild(image);
			image.anchorOffsetY = image.height / 2;
			this.start();
		}



		//开始上下移动的动画
		public start() {
			var yPos = this.y;
			egret.Tween.removeTweens(this);
			egret.Tween.get(this, { loop: true }).to({ y: yPos + this._moveDist }, 500).to({ y: yPos }, 500);
		}
	}
}