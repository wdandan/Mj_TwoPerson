/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class LoadingScene extends Scene {

        public loadingView: JAY.LoadingLayer;

		public constructor() {
			super();
		}

		protected init() {
			super.init();
		
            this.loadingView = new JAY.LoadingLayer();
			this.loadingView.Ctrl = new JAY.LoadingLayerController();
            this.addChild(this.loadingView);
		}
	}
}