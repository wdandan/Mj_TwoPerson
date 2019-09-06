/**
 * 场景类(一个场景下可以加多个Layer或者其他的组件) 其子类不用关心销毁的操作 全在此类进行，销毁时移除所有的子节点以触发其相应的destory
 * 场景类中只处理UI的切换，不做协议的处理
 * 继承自eui.UILayer
 * UILayer 是 Group 的子类，它除了具有容器的所有标准功能，还能够自动保持自身尺寸始终与舞台尺寸相同（Stage.stageWidth,Stage.stageHeight）
 * 当舞台尺寸发生改变时，它会跟随舞台尺寸改变
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Scene extends eui.UILayer {
		protected TAG: string = "";
		private _isRunning: boolean;

		public constructor() {
			super();
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
			this._isRunning = true;
		}

		/**
		 * 场景是否在运行
		 * @return boolean true表示正在运行，falseb表示没有运行
		*/
		public get isRunning(): boolean {
			return this._isRunning;
		}

		/**
		 * 场景被添加到舞台时调用
		 * 进行一些初始化的操作
		*/
		protected init(): void {
			// console.log(this.TAG + " init");
		}

		// 进入层而且过渡动画结束时调用           
		public onEnterTransitionDidFinish() {
			// console.log(this.TAG + " onEnterTransitionDidFinish");
			// egret.Tween.get(this).to({x:this.stage.width*1.5 }, 0, egret.Ease.backInOut).to({x:0 }, 600, egret.Ease.sineInOut);
		}

		// 退出层而且开始过渡动画时调用       
		public onExitTransitionDidStart() {
			// console.log(this.TAG + " onExitTransitionDidStart");
			// egret.Tween.get(this).to({x:-this.stage.width}, 0, egret.Ease.backInOut);
		}

		/**
		 * 场景被销毁时调用
		 * 场景被销毁时注意移除其所有的子节点，会触发相应的Destory来清理注册事件
		*/
		private onDestroy() {
			// console.log(this.TAG + " onDestroy");
			this.removeChildren();
		}
	}
}