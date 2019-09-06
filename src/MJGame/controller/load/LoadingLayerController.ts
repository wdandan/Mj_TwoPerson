/**
 * 加载层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class LoadingLayerController extends Controller {
		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor() {
			super();
		}
		
		protected init() {
			super.init();
			this.SocketEventList = [
				JAY.SocketEvents.Rev100000,
				// JAY.SocketEvents.Rev100002,
			];
		}

		private on_100000_event(event: egret.Event) {
			console.log(this.TAG + " on_100000_event: " + event.data);
		}
	}
}