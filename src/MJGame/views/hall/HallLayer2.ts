module JAY {
    export class HallLayer2 extends JAY.Layer {
        /**大厅场景控制类*/
        protected _ctrl: JAY.HallLayerController;

        private hallBackBtn: eui.Button;
        private hallKefuBtn: eui.Button;
        private hallQuickBtn: eui.Button;
        public headMod: JAY.HallHeadMod;
        public btnMod: JAY.HallBtnMod;
        public roomMod:JAY.HallRoomMod;

        private quickDb: dragonBones.EgretArmatureDisplay;
        private moveGro:eui.Group;

        public constructor() {
            console.log("jayHallLayer constructor()");
            super();
            this.skinName = "Skin.HallSceneSkin";
        }

        protected init(): void {
            console.log("jayHallLayer init()");
            super.init();
            this._ctrl.connectSocket();
            this.roomMod.Ctrl=this._ctrl;
        }

        protected setOnTouchListener() {
            
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.hallBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.hallKefuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKefu, this);
            this.hallQuickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuick, this);
            this.headMod.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHead, this);
        }

        protected removeOnTouchListener() {
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.hallBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.hallKefuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onKefu, this);
            this.hallQuickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuick, this);
            this.headMod.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHead, this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [

            ];
        }

        /**
         * 点击大厅任意位置响应
         */
        private onTap(evt: egret.Event) {
            // 隐藏钻石UI
            if (evt.target != this.headMod.arrowGroup) {
                this.headMod.setDiamondVisible(false);
            }
            console.log("jayHallLayer onTap()");
        }

        /**
         * 点击退出
         */
        private onBack() {
            console.log("jayHallLayer onBack()");
            /**test */
            // let msgBox = App.MessageBoxManager.getBox();
            // msgBox.showMsg("您确定要退出游戏吗?",true);
            // msgBox.ok = () => {
            //     this.ctrl.sendJieSanTest();
            // }
        }

        /**
         * 点击快速开始
         */
        private onQuick() {
            console.log("jayHallLayer onQuick()");
            // this.hallQuickBtn.touchEnabled = false;
            // setTimeout(()=>{
            //     this.hallQuickBtn.touchEnabled = true;
            // }, 1000);
            // this.ctrl.sendQuickBegin();
        }

        /**
         * 点击客服
         */
        private onKefu() {
            console.log("jayHallLayer onKefu()");
            // HallHttpDataSend.sendGetIncomeSupportMsg();
        }

        /**
         * 点击头像区域
         */
        private onHead() {
            console.log("jayHallLayer onHead()");
        }

        /**
         * 创建龙骨动画
         */
        private createQuickDb() {
            let factory: dragonBones.EgretFactory = new dragonBones.EgretFactory;
            factory.parseDragonBonesData(RES.getRes("tpm_NewProject_ske_json"));
            factory.parseTextureAtlasData(RES.getRes("tpm_NewProject_tex_json"), RES.getRes("tpm_NewProject_tex_png"));
            this.quickDb = factory.buildArmatureDisplay("Armature");
            this.moveGro.addChild(this.quickDb);
            this.quickDb.x = 1334/2;
            this.quickDb.y = 550-5;
        }

        /**播放快速开始动画 */
        private playQuick() {
            if (!this.quickDb) {
                this.createQuickDb();
            }
            if (this.quickDb) {
                this.quickDb.animation.play("kuaisukaishi", 0);
            }
        }

        private onTouchBottomBtn(msg) {
            switch (msg) {
                case HallBtnMsg.playMethod:
                    // App.PanelManager.open(PanelConst.PlayMethodPanel);
                    // App.PanelManager.open(PanelConst.MoneyNotEnoughPanel, false, null, null, true, true, ProtocolHttpData.MoneyNotEnoughData);
                    break;
                case HallBtnMsg.email:
                    // let emaildata = [];
                    // let emaildatalen = 5;
                    // for (let i = 0; i < emaildatalen; i++) {
                    //     let emailitemData = ProtocolHttpData.EmailListItemData;
                    //     emailitemData.icon="";
                    //     emailitemData.id = 1;
                    //     emailitemData.title = "500";
                    //     emailitemData.content = "5";
                    //     emailitemData.send_date = "5";
                    //     emaildata.push(emailitemData);
                    // }
                    // App.PanelManager.open(PanelConst.EmailPanel, false, null, null, true, true, emaildata);
                    //  HallHttpDataSend.sendGetEmailList();
                    break;
                case HallBtnMsg.share:
                    // App.PanelManager.open(PanelConst.SharePanel);
                    break;
                case HallBtnMsg.shop:
                    //     let shopdata=[];
                    //     let shopdatalen=5;
                    //     	for (let i = 0; i < 5; i++) {
                    // 	let shopitemData = ProtocolHttpData.GoodsListItemData;
                    // 	shopitemData.id=1;
                    // 	shopitemData.selling_price=500;
                    // 	shopitemData.quantity=5;
                    // 	shopdata.push(shopitemData);
                    // }
                    //     App.PanelManager.open(PanelConst.ShopMallPanel,false,null,null,true,true,shopdata);
                    // HallHttpDataSend.sendGetGoodsList();
                    break;
                case HallBtnMsg.set:
                    // App.PanelManager.open(PanelConst.SetPanel);
                    break;
                default:
                    console.error("hallbtn error");
                    break;
            }
        }
    }
}