module JAY {
	export enum PanelConst {
        /**提示断线 */
        SocketClosePanel,
        /**设置 */
        SetPanel,
        /**分享 */
        SharePanel,
        /**商城 */
        ShopMallPanel,
        /**邮件 */
        EmailPanel,
        /**玩法介绍*/
        PlayMethodPanel,
        /**破产补助*/
        GiveMoneyPanel,
         /**金币不足*/
        MoneyNotEnoughPanel,
        /**邮件详情*/
        EmailDetailPanel,
        /**个人信息*/
        PersonalInfoPanel,
        /**通用提示*/
        CommonMessageBoxPanel,
        /**结算 */
        ResultPanel
    }
	export interface mothTest{
		panelID ?: number;
		gameBool ?:boolean;
		callBack ?: Function; 
		thisObject ?: any;
		click ?: boolean;
		lock ?: boolean;
		transData ?: any;
		clickCallback ?: Function;
	}
	export class PanelManager extends Single{
		/**弹框*/
		private panelList = {};
		/**弹框类定义*/
		private panelClassList = {};
		/**资源组*/
		private assetList = {};
		private constructor() {
			super();
			this.registerAll();
		}

		public static get Instance(): PanelManager{ return this.getInstance(); }

		/**
		 * 注册弹框
		 * @panelID 弹框ID
		 * @panelClass 弹框类定义
		 * @group 资源组名(支持字符串和数组)
		 */
		public register(panelID: number, panelClass: any, group: any = null) {
			this.panelClassList[panelID] = panelClass;
			this.assetList[panelID] = group;
		}
		/**
		 * 注册所有弹框
		 */
		public registerAll() {
			for (let key in PanelConst) {
				let panelID=Number(key);
				let panelClass=egret.getDefinitionByName("JAY."+PanelConst[key])
				this.register(panelID, panelClass);
			}
		}

		/**
		 * 打开弹框
		 * @panelID 弹框ID
		 * @gameBool 是否在游戏场内打开Panel
		 * @callBack 打开后回调(需要加载资源时，在加载完成后回调)
		 * @thisObject 执行环境
		 * @return 弹框
	   * @click 是否监听点击黑色背景关闭弹框事件
	   * @lock 是否弹出透明遮罩
	   * @transData 传递给Panel的参数
	   * @clickCallback click为true时点击黑色背景回调
		 */
		public open(panelID: number, gameBool:boolean=false,callBack: Function = null, thisObject: any = null, click: boolean = true, lock = true, transData: any = null, clickCallback: Function = null) {
		// public open(moth:mothTest) {
			console.log("open Panel==" + panelID);
			let panel = this.panelList[panelID];
			if (panel == null) {
				let clz = this.panelClassList[panelID];
				if (clz != null) {
					panel = new clz();
					this.panelList[panelID] = panel;
				} else {
					return null;
				}
			}
			if(gameBool)
				PopUpManager.Instance.changeTransparency(0.5);
			else
				PopUpManager.Instance.changeTransparency(0.8);

			/**接收参数 */
			if (transData != null) {
				panel.recDataFun(transData);
			}

			//加载弹框所需资源后，再打开弹框
			let group = this.assetList[panelID];
			if (group != null) {
				// App.LoadingLock.addLock();
				// App.ResUtils.loadGroup(group, this, () => {
				// 	App.LoadingLock.minusLock();
				// 	if (callBack != null && thisObject != null) {
				// 		panel.once(egret.Event.ADDED_TO_STAGE, () => {
				// 			callBack.call(thisObject, true);
				// 		}, this);
				// 	}
				// 	panel.show(lock, click);
				// }, null, 10);
			} else {
				if (callBack != null && thisObject != null) {
					panel.once(egret.Event.ADDED_TO_STAGE, () => {
						callBack.call(thisObject);
					}, this);
				}
				panel.show(lock, click);
			}
			return panel;
		}

		/**
		 * 关闭弹框
		 * @panelID 弹框ID
		 * @return 弹框
		 */
		public close(panelID: number) {
			let panel = this.panelList[panelID];
			if (panel != null) {
				panel.hide();
			}
			return panel;
		}

		/**
		 * 获取弹框
		 * @panelID 弹框ID
		 */
		public getPanel(panelID: number) {
			return this.panelList[panelID];
		}

		/**
		 * 移除所有弹框
		 */
		public closeAllPanel() {
			// App.ResUtils.deleteAllCallBack(); //防止当有弹框加载时，调用了该函数，加载完成后仍然会显示弹框
			PopUpManager.Instance.removeAllPopUp();
			// App.LoadingLock.minusLock();
		}
	}
}














