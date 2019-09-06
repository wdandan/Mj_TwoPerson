module JAY {
    export class HallHeadMod extends JAY.Layer{
        private headGro: eui.Group;
        private headMask: eui.Image;
        private headImg: eui.Image;
        private nameLab: eui.Label;
        private idLab: eui.Label;
        private moneyGro: eui.Group;
        private goldLab: eui.Label;
        private addBtn: eui.Button;
        private arrowGro: eui.Group;
        private diamondGro: eui.Group;
        private diamondLab: eui.Label;
        private showmallGro: eui.Group;
        private timeOut: number;

        public constructor() {
            super();
            this.skinName = "Skin.HallHeadModSkin";
        }

        protected init(): void {
            super.init();
            // 初始化钻石UI显示状态
            this.setDiamondVisible();
            this.headImg.mask = this.headMask;
            this.updatePersonalInfo();
        }

        protected setOnTouchListener() {
            this.headGro.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPersonalInfo, this);
            this.arrowGro.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onArrow, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        }

        protected removeOnTouchListener() {
            this.headGro.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPersonalInfo, this);
            this.arrowGro.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onArrow, this);
            this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        }
        /**
         * 设置钻石UI显示状态
         */
        public setDiamondVisible(visible: boolean = false) {
            if (visible) {
                this.arrowGro.visible = false;
                this.diamondGro.visible = true;
            }
            else {
                this.arrowGro.visible = true;
                this.diamondGro.visible = false;
            }
        }
        protected registerCustomEvents() {
            this.UIEventList = [
                CustomEvents.OtherPlayer_EnterROOM,

            ];
        }

        /**
         * 获取Arrow区域
         */
        public get arrowGroup() {
            return this.arrowGro;
        }

        /**
         * 点击向上箭头区域
         */
        private onArrow() {
            this.setDiamondVisible(true);
            this.timeOut = setTimeout(() => {
                this.setDiamondVisible(false);
                clearTimeout(this.timeOut);
            }, 3000, this);
            this.sendGetDiamondAndGold();

        }
        /**获取房间信息*/
        private sendGetDiamondAndGold() {
            let moneyMsg = JAY.ProtocolHttp.getMoneyMsg;
            moneyMsg.data.skey = JAY.UsersInfo.MySelf.skey;
            moneyMsg.data.uid = JAY.UsersInfo.MySelf.user_id;
            let jsondata = JSON.stringify(moneyMsg.data);
            console.log("jsondata=" + jsondata);
            let url = "http://" + JAY.Config.SERVER_IP + ":" + JAY.Config.SERVER_HTTP_PORT +"/"+ moneyMsg.action + "?base=" + jsondata;
            JAY.Http.get(url, null, this.revDiamondMsg, this);
        }
        private revDiamondMsg(e: egret.Event) {
            // var revData = ProtocolHttpData.PersonalInfoData;
            // revData = data;
            // if (!revData.ret) {
            //     var hallscene = App.SceneManager.getScene(SceneConst.HallScene) as HallScene;
            //     hallscene && hallscene.headMod.updateDiamondAndGold(revData.data.diamond, revData.data.money);
            // }
            // else
            //     Tips.showTop(revData.desc);
        }

        private _loginResult(e: egret.Event) {
            // let data = e.currentTarget.response;
            // let Obj = JSON.parse(data);
            // console.log("login success! data : ", Obj);
            // if (Obj.ret == "0") {
            //     let ud = Obj.data;
            //     let user = new User();
            //     user.user_id = ud.uid;
            //     user.user_name = ud.user_name;
            //     user.password = ud.password;
            //     user.skey = ud.skey;
            //     UsersInfo.MySelf = user;

            //     // JAY.Config.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
            //     // JAY.Config.MD5PASS = ud.password;

            //     this.gotoHall();
            // } else {
            //     console.log("login error action:%s,ret:%s,desc:%s", Obj.action, Obj.ret, Obj.desc);
            // }
        }
        /**
         * 显示个人信息
         */
        private showPersonalInfo() {
            // HallHttpDataSend.sendGetUserInfo();
        }

        /**
         * 点击+
         */
        private onAdd() {
            // HallHttpDataSend.sendGetGoodsList();
            // App.PanelManager.open(PanelConst.ShopMallPanel);
        }
        /**
        * 更新钻石金币
        */
        public updateDiamondAndGold(diamond, gold) {
            // this.diamondLab.text = diamond + "";//NumberTool.sperateMoney(diamond);
            // this.goldLab.text = NumberTool.formatMoney(gold);
        }
        /**
         * 更新个人信息
         */
        public updatePersonalInfo() {
            
            this.nameLab.text = StringTool.formatNickName(JAY.UsersInfo.MySelf.user_name, 12);
            this.idLab.text = "ID:" + JAY.UsersInfo.MySelf.user_id + "";
            this.diamondLab.text = JAY.UsersInfo.MySelf.diamond+ "";
            this.goldLab.text = NumberTool.formatMoney(JAY.UsersInfo.MySelf.money);
            this.headImg.source = JAY.UsersInfo.MySelf.headImgUrl;
        }
    }
}