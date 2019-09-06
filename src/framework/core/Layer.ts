/**
 * 层级类,只处理UI上的逻辑(一个layer对应一个controller,处理和后端的交互)，其子类不用关心销毁的操作 全在此类进行，销毁时移除监听事件和触摸事件以及调用Ctrl的销毁
 * 所有的组件都继承自Layer
 * 继承自eui.Component可以自定义外观组件
 * 可在构造函数中this.skinName = "Skin.GameLayer"和皮肤绑定
 * 1.用户与界面交互后通知controller来处理相应的逻辑
 * 2.游戏逻辑处理完毕后消息派发通知UI来更新界面
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Layer extends eui.Component {
		protected TAG: string = "";
		protected _ctrl: Controller;
		protected UIEventList: Array<any> = null;//对此数组赋值，可以快速绑定 不需要重复操作，注意对每个id添加对应的函数
		public constructor(width?: number, height?: number) {
			super();
			this.width = width || egret.MainContext.instance.stage.stageWidth;
			this.height = width || egret.MainContext.instance.stage.stageHeight;

			this.TAG = egret.getQualifiedClassName(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
		}

		/**
		 * 组件创建完毕
		 * 此方法仅在组件第一次添加到舞台时回调一次
		*/
		protected createChildren(): void {
			super.createChildren();
		}

		public get Ctrl() {
			return this._ctrl;
		}

		public set Ctrl(ctrl: Controller) {
			this._ctrl = ctrl;
		}

		/**
		 * 进行一些初始化的操作
		*/
		protected init(): void {
			// console.log(this.TAG + " init");	
			this.UIEventList = new Array<any>();
			this.setOnTouchListener();
			this.registerCustomEvents();
			this._registerManyUIEvents(true);
			this.watchData();
		}

		/**
		 * 进行数据的监视
		*/
		protected watchData(){}

		/**
		 * 以某种特定的格式来注册ui消息
		 * 协议的回调函数以 ui + socket的id + event 的函数名 
		 * @param isRegister true 表示注册  false表示注销
		 */
		private _registerManyUIEvents(isRegister: boolean) {
			if(!this.UIEventList) return;
			for (let value of this.UIEventList) {
				let eventName: string = value.toString();
				let funcName: string = "ui_" + eventName;
				if (this[funcName]) {
					if (isRegister) {
						EventManager.getInstance().register(eventName, this[funcName], this);
					} else {
						EventManager.getInstance().unRegister(eventName, this[funcName], this);
					}
				} else {
					console.error(`未添加${this.TAG}的${funcName}的监听`);
				}
			}
		}
		// 触摸消息的注册全在这里操作
		protected setOnTouchListener() {
		}

		protected removeOnTouchListener() {
		}

		protected registerCustomEvents() {
		}

		protected unRegisterCustomEvents() {
		}

		// 进入层而且过渡动画结束时调用           
		public onEnterTransitionDidFinish() {

		}

		// 退出层而且开始过渡动画时调用       
		public onExitTransitionDidStart() {
		}

		/**
		 * 层被销毁时调用移除触摸监听和事件派发的监听
		 * 
		*/
		private onDestroy() {
			this.removeOnTouchListener();
			this.unRegisterCustomEvents();
			this._registerManyUIEvents(false);
			this.UIEventList = null;
			this.Ctrl && this.Ctrl.onDestroy();
		}
	}
}