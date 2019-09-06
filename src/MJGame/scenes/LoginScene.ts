/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class LoginScene extends Scene {

		public loginLayer: JAY.LoginLayer;
		private text: egret.TextField;


		public constructor() {
			super();
		}

		protected init() {
			super.init();

			this.loginLayer = new JAY.LoginLayer();
			this.loginLayer.Ctrl = new JAY.LoginLayerController();
			this.addChild(this.loginLayer);
		}
	}
}