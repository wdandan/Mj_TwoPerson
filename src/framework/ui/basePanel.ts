module JAY {
    export class BasePanel extends JAY.Layer {

        public recData: any;
        public gameBool:boolean;

        public constructor() {
            super();
            this.listenerVisible();
        }

        /***监听visible属性变化 避免没有调用hide半透明不移除*/
        private listenerVisible() {
            eui.Binding.bindHandler(this, ["visible"], (value) => {
                if (!value) {
                    this.hide();
                }
            }, this);

        }

        /**
         * 显示
         * @lock 是否锁定屏幕(增加半透明黑色背景)
         * @click 是否点击空白处可关闭弹框
         */
        public show(lock: boolean = true, click: boolean = true) {
			PopUpManager.Instance.addPopUp(this, lock, click);
            // PopUpManager.Instance().addPopUp(this, lock, click);
        }

        /**隐藏*/
        public hide() {
            PopUpManager.Instance.removePopUp(this);
        }

        /**接收参数 */
        public recDataFun(data: any) {
            this.recData = data;
        }
    }
}