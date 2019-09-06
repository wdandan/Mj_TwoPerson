module JAY {
	export class HallRoomMod extends JAY.Layer{
        
        private lowBtn:eui.Button;
        private middleBtn:eui.Button;
        private highBtn:eui.Button;
        private lowGro:eui.Group;
        private baseLab:eui.Label;
        private mininumLab:eui.Label;
        private playLab:eui.Label;
        private middleGro:eui.Group;
        private baseLabM:eui.Label;
        private mininumLabM:eui.Label;
        private playLabM:eui.Label;
        private highGro:eui.Group;
        private baseLabH:eui.Label;
        private mininumLabH:eui.Label;
        private playLabH:eui.Label;

        private betLabList: Array<eui.Label>;
        private minGoldLabList: Array<eui.Label>;
        private playerLabList: Array<eui.Label>;

		public constructor() {
			super();
            this.skinName = "Skin.HallRoomModSkin";
		}

        protected init(): void {
            console.log("jayHallLayer init()");
            super.init();
            this.initList();
        }

        protected setOnTouchListener() {
            this.lowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.middleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.highBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        protected removeOnTouchListener() {
            this.lowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.middleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.highBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [

            ];
        }

        private initList() {
            this.betLabList = [];
            this.minGoldLabList = [];
            this.playerLabList = [];

            this.betLabList.push((this.lowBtn.getChildByName("lowGro") as eui.Group).getChildByName("baseLab") as eui.Label);
            this.betLabList.push((this.middleBtn.getChildByName("middleGro") as eui.Group).getChildByName("baseLabM") as eui.Label);
            this.betLabList.push((this.highBtn.getChildByName("highGro") as eui.Group).getChildByName("baseLabH") as eui.Label);

            this.minGoldLabList.push((this.lowBtn.getChildByName("lowGro") as eui.Group).getChildByName("mininumLab") as eui.Label);
            this.minGoldLabList.push((this.middleBtn.getChildByName("middleGro") as eui.Group).getChildByName("mininumLabM") as eui.Label);
            this.minGoldLabList.push((this.highBtn.getChildByName("highGro") as eui.Group).getChildByName("mininumLabH") as eui.Label);

            this.playerLabList.push((this.lowBtn.getChildByName("lowGro") as eui.Group).getChildByName("playLab") as eui.Label);
            this.playerLabList.push((this.middleBtn.getChildByName("middleGro") as eui.Group).getChildByName("playLabM") as eui.Label);
            this.playerLabList.push((this.highBtn.getChildByName("highGro") as eui.Group).getChildByName("playLabH") as eui.Label);
        }

        // public initRoomUI(data: Array<RoomData>) {
        //     for (var i = 0; i < data.length;i ++) {
        //         this.betLabList[i].text = data[i].baseBet + "";
        //         this.minGoldLabList[i].text = NumberTool.formatMoney(data[i].minEnterGold,2)  + "金币以上";
        //         this.playerLabList[i].text = data[i].curPlayerCount+"人在玩";
        //     }
        // }

        // public reRoomNum(data: Array<RoomData>) {
        //     for (var i = 0; i < data.length;i ++) {
        //         this.playerLabList[i].text = data[i].curPlayerCount+"人在玩";
        //     }
        // }

        /**
         * 点击房间处理
         */
        private onTouch(evt: egret.Event) {
            let target = evt.target;
            let roomType: JAY.RoomType;
            switch (target) {
                case this.lowBtn:
                    roomType = RoomType.noob;
                    break;
                case this.middleBtn:
                    roomType = RoomType.middle;
                    break;
                case this.highBtn:
                    roomType = RoomType.high;
                    break;
                default:
                    roomType = RoomType.noob;
                    break;
            }
            console.log("hallRoom before send roomType:"+roomType);
            if(this._ctrl){
                console.log("hallRoom sendChooseRoom roomType:"+roomType);
                (<JAY.HallLayerController>this._ctrl).sendChooseRoom(roomType);
            }
        }
	}
}