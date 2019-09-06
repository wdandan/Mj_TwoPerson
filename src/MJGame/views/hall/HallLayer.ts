/**
 * 大厅层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
    export class HallLayer extends Layer {
        protected _ctrl: HallLayerController;
        private btn_playGround: eui.Button;
        private btn_friendRoom: eui.Button;

        public constructor() {
            super();
            this.skinName = "Skin.HallLayer";
        }

        protected init(): void {
            super.init();
            this._ctrl.connectSocket();
        }

        protected setOnTouchListener() {
            this.btn_playGround.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
        }

        protected removeOnTouchListener() {
            this.btn_playGround.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [

            ];
        }

        /**
         * 点击游戏场按钮
         */
        private _onPlayGroundBtnClick() {
            console.log("_onPlayGroundBtnClick");
        }

        /**
         * 点击好友房按钮
         */
        private _onFriendRoomBtnClick() {
            console.log("_onFriendRoomBtnClick");
            let selecRoomLayer = new JAY.SelectRoom();
            selecRoomLayer.Ctrl = new JAY.SelectRoomController();
            SceneManager.Instance.runningScene.addChild(selecRoomLayer);

        }

    }
}