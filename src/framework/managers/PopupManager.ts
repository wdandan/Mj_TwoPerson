module JAY {
    /**
     * 不在game、App中暴露，panel管理统一用panelManager
     */
    export class PopUpManager extends Single {
        private lockBg: egret.Sprite;   //半透明黑色背景
        private curPanel: BasePanel;     //当前显示的面板
        private lockCount: number = 0;   //黑色背景锁定次数
        private clickClose = [];        //点击黑色背景关闭弹框
        private panelList: Array<BasePanel> = [];

        public constructor() {
            super();
            this.createLockBg();
        }
        public static get Instance(): PopUpManager{ return this.getInstance(); }
        /**
         * 显示弹框
         * @panel 弹框
         * @lock 是否锁定屏幕(增加黑色半透明背景)
         * @click 是否监听点击黑色背景关闭弹框事件
         */
        public addPopUp(panel: BasePanel, lock: boolean = true, click: boolean = true) {
            if (this.curPanel == panel) {
                console.log("panel repitition!!!!!!!!!!!!!");
                this.curPanel.hide();
            }
            if (lock) {
                this.lockCount++;
                // App.LayerManager.addChildToLayer(this.lockBg, JAY.LayerConst.popLayer);
                SceneManager.Instance.runningScene.addChild(this.lockBg);
            }

            this.clickClose[this.lockCount] = click;
            SceneManager.Instance.runningScene.addChild(panel);
            // App.LayerManager.addChildToLayer(panel, LayerConst.popLayer);
            this.curPanel = panel;
            this.panelList.push(panel);
        }

        /**移除弹框*/
        public removePopUp(panel: BasePanel) {
            panel.parent && panel.parent.removeChild(panel);
            this.lockCount--;
            if (this.lockCount > 0) { //有多个弹框时，将黑色背景移动至其他弹框下
                // App.LayerManager.adjustIndex(this.lockBg);
            } else {
                this.lockCount = 0;
                this.clickClose[this.lockCount] = false;
                this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
                this.curPanel = null
            }
            this.panelList.pop();
            if (this.panelList.length > 0) {
                this.curPanel = this.panelList[this.panelList.length - 1];
            }
            if (this.panelList.length < 1) {
                this.curPanel = null;
                this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
            }
        }

        /**移除所有弹框*/
        public removeAllPopUp() {
            // App.LayerManager.removeLayerChirdren(LayerConst.popLayer);
            SceneManager.Instance.runningScene.removeChildren()
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
            this.lockCount = 0;
            this.clickClose.length = 0;

            this.curPanel = null;
        }

        /**改变透明度*/
        public changeTransparency(transparency: number) {
            this.lockBg.alpha = transparency;
        }

        //创建黑色半透明背景
        private createLockBg() {
            this.lockBg = new egret.Sprite();
            this.lockBg.graphics.beginFill(0x000000, 1);
            var stage = StageUtils.Instance.stage;
            this.lockBg.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
            this.lockBg.graphics.endFill();
            this.lockBg.touchEnabled = true;
            this.lockBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        //点击黑色背景
        private onTouchTap() {
            if (this.clickClose[this.lockCount]) {
                this.curPanel.hide();
            }
        }
    }
}
