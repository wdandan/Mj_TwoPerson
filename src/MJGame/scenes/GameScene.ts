/**
 * 游戏场景
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class GameScene extends Scene {
		private gameLayer: JAY.GameLayer;

		public constructor() {
			super();

		}

		protected init() {
			super.init();

			this.gameLayer = new JAY.GameLayer();
			this.gameLayer.Ctrl = new GameLayerController();
			this.addChild(this.gameLayer);

			
			// ErrorCodeManager.Instance.init("error_txt");
			// console.log(ErrorCodeManager.Instance.getErrorCode(1001));
		}
	}
}