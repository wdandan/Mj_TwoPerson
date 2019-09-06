/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class HallScene extends Scene {
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			console.log("HallScene init()");
			
			
            // let hallLayer = new JAY.HallLayer();
			let hallLayer =new JAY.HallLayer2()
			hallLayer.Ctrl = new JAY.HallLayerController();
            this.addChild(hallLayer);
		}


	}
}