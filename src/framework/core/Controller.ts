/**
 * 控制器（处理和后端的交互和纯游戏逻辑，不做UI处理，用派发器通知相应的界面来更新）
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Controller {
		protected TAG: string = "";
		protected SocketEventList: Array<any> = null;//对此数组赋值，可以快速绑定 不需要重复操作，注意对每个id添加对应的函数
		
		public constructor() {
			this.TAG = egret.getQualifiedClassName(this);
			this.init();
			this._registerManySockets(true);
		}

		// 进行一些初始化的操作
		protected init() {
			this.SocketEventList = new Array<any>();
			this.registerSockets();
		}

		/**
		 * 以某种特定的格式来注册协议
		 * 协议的回调函数以 on + socket的id + event 的函数名 
		 * @param isRegister true 表示注册  false表示注销
		 */
		private _registerManySockets(isRegister: boolean) {
			for (let value of this.SocketEventList) {
				let eventName: string = value.toString();
				let funcName: string = "on_" + eventName + "_event";
				if (this[funcName]) {
					if (isRegister) {
						EventManager.getInstance().register(eventName, this[funcName], this);
					} else {
						EventManager.getInstance().unRegister(eventName, this[funcName], this);
					}
				}else{
					console.error(`未添加${this.TAG}的${funcName}的监听`);
				}
			}
		}

		/**
		 * 注册协议
		 * 保留此接口，一般省事儿用初始化SocketEventList即可
		 */
		protected registerSockets() {

		}

		/**
		 * 注销协议
		 * 保留此接口，一般省事儿用初始化SocketEventList即可
		 */
		protected unRegisterSockets() {

		}

		/**
		 * 销毁ctrl
		 * Layer基类已经调用此方法，不要在外部随意调用此方法
		 */
		public onDestroy() {
			// console.log(this.TAG + " onDestroy");
			this.unRegisterSockets();
			this._registerManySockets(false);
			this.SocketEventList = null;
		}
	}
}