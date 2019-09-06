module JAY {
    export class ResultPanel extends BasePanel {
        private liuGro:eui.Group;
        private changeBtnT:eui.Button;
        private continueBtnT:eui.Button;
        private huGro:eui.Group;
        private loseBgGro:eui.Group;
        private winBgGro:eui.Group;
        private uiGro:eui.Group;
        private cardGro:eui.Group;
        private fanNumLab:eui.BitmapLabel;
        private guoTimesLab:eui.BitmapLabel;
        private goldLab:eui.BitmapLabel;
        private changeBtn:eui.Button;
        private continueBtn:eui.Button;
        private fanList:eui.List;
        private backBtn:eui.Button;
        private guoGro:eui.Group;


        // private get cardFactory() {
        //     return CardFactory.getInstance();
        // }

        public constructor() {
            super();
            this.skinName = "Skin.ResultPanelSkin";
        }

        protected childrenCreated() {
        }

        protected onEnable() {
            this.showResult();

            this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.changeBtnT.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
            this.continueBtnT.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        }

        protected onRemove() {
            this.cardGro.removeChildren();

            this.changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.changeBtnT.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.continueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
            this.continueBtnT.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
            this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        }

        /**换对手 */
        private onChange() {
            // (<GameScene>App.SceneManager.getScene(SceneConst.GameScene)).clearDesk(false);
            // (<GameController>App.getController(GameController.NAME)).sendMod.sendReady();
            this.hide();
        }

        /**继续 */
        private onContinue() {
            // (<GameScene>App.SceneManager.getScene(SceneConst.GameScene)).clearDesk(false);
            // (<GameController>App.getController(GameController.NAME)).sendMod.sendReady();
            this.hide();
        }

        /**退出 */
        private onBack() {
            // var readyMod = (<GameScene>App.SceneManager.getScene(SceneConst.GameScene)).readyMod;
            // readyMod.visible = true;
            // readyMod.setState(ReadyState.ready_00);
            this.hide();
        }

        private showResult() {
            // var data = App.DataCenter.MsgCache.getMsgData(ProtocolHeadRev.R_101006);
            // if (data.code != 200) {
            //     Tips.showTop(data.desc);
            //     return;
            // }
            // var revData = ProtocolDataRev.R_101006.info;
            // revData = data.info;

            // var result: ResultType;
            // if (revData.detail[0].params.hu_seat_id == App.DataCenter.UserInfo.myUserInfo.seatID) {
            //     result = ResultType.win;
            // }
            // else if (revData.detail[0].params.hu_seat_id == -1) {
            //     result = ResultType.liu;
            //     this.showResultType(result);
            //     return;
            // }
            // else {
            //     result = ResultType.lose;
            // }
            // this.showResultType(result);

            // var cardList:Array<any> = ArrayTool.deepCopy(revData.detail[0].params.hand_card_for_settle_show);
            // this.showCardList(cardList);

            // this.fanNumLab.text = revData.detail[0].params.hu_fan_count + "";
            
            // if (App.DataCenter.runingData.curentRoomType != RoomType.noob) {
            //     this.guoGro.visible = true;
            //     this.guoTimesLab.text = revData.detail[0].params.guo_hu_count + "";
            // }
            // else {
            //     this.guoGro.visible = false;
            // }
            // var symbol:string = "+";
            // this.goldLab.font = "tpm_result_win_fnt";
            // if (revData.detail[0].points[App.DataCenter.UserInfo.myUserInfo.seatID] < 0) {
            //     symbol = "";
            //     this.goldLab.font = "tpm_result_lose_fnt";
            // }
            // this.goldLab.text = symbol+revData.detail[0].points[App.DataCenter.UserInfo.myUserInfo.seatID] + "";

            // this.showFanType(revData.detail[0].params.type_list);
        }

        private showResultType(type: ResultType) {
            switch (type) {
                case ResultType.liu:
                    this.liuGro.visible = true;
                    this.huGro.visible = false;
                    break;
                case ResultType.lose:
                    this.liuGro.visible = false;
                    this.huGro.visible = true;
                    this.loseBgGro.visible = true;
                    this.winBgGro.visible = false;
                    break;
                case ResultType.win:
                    this.liuGro.visible = false;
                    this.huGro.visible = true;
                    this.loseBgGro.visible = false;
                    this.winBgGro.visible = true;
                    break;
                default:
                    console.error("result type error");
                    break;
            }
        }

        private showFanType(data: Array<number>) {
            var arr = [];
            for (var i = 0;i < data.length;i ++) {
                var item = {
                    name: "",
                    fan: 0
                }
                // item.name = HuType.HuTypeName[data[i]];
                // item.fan = HuType.getHuTypeFan(data[i]);
                arr.push(item);
            }
            var ac: eui.ArrayCollection = new eui.ArrayCollection();
            ac.source = arr;
            this.fanList.itemRenderer = ResultFanItem;
            this.fanList.dataProvider = ac;
        }

        /**
         * @param [[17,17,17], [17,17,17,17], [17,0,0,0], [1,1,1], [17]]
         * 数组含义：吃碰，明杠，暗杠，手牌，胡牌
         */
        private showCardList(cardValueList: Array<any>) {
            // var eatLen = 0;
            
            // var beginPos = 70;
            // var pos = UserPosition.Down;

            // for (var j = 0;j < cardValueList.length;j ++) {
            //     var item = cardValueList[j];
            //     if (j == cardValueList.length-1) {
            //         var card = this.cardFactory.getHandCard(item[0], pos);
            //         card.x = CardPos.moCardPosXList[pos];
            //         card.y = 14;
            //         this.cardGro.addChild(card);
            //     }
            //     else if (j == cardValueList.length-2) {
            //         var handLen = 0;
            //         for (var i = 0;i < item.length;i ++) {
            //             var card = this.cardFactory.getHandCard(item[i], pos);
            //             card.x = beginPos + CardPos.handCardGapList[pos] * (3 * eatLen + handLen);
            //             card.y = 14;
            //             this.cardGro.addChild(card);
            //             handLen ++;
            //         }
            //     }
            //     else if (item.length == 3) {
            //         for (var i = 0;i < 3;i ++) {
            //             var card = this.cardFactory.getEatCard(item[i], pos);
            //             card.x = beginPos + CardPos.handCardGapList[pos] * 3 * eatLen + CardPos.eatCardGapList[pos] * i;
            //             card.y = 37;
            //             this.cardGro.addChild(card);
            //         }
            //         eatLen ++;
            //     }
            //     else if (item.length == 4 && item[1] != 0) {
            //         for (var i = 0;i < 4;i ++) {
            //             var card = this.cardFactory.getEatCard(item[i], pos);
            //             if (i < 3) {
            //                 card.x = beginPos + CardPos.handCardGapList[pos] * 3 * eatLen + CardPos.eatCardGapList[pos] * i;
            //                 card.y = 37;
            //             }
            //             else {
            //                 card.x = beginPos + CardPos.handCardGapList[pos] * 3 * eatLen + CardPos.eatCardGapList[pos] * 1;
            //                 card.y = 37 - 22;
            //             }
            //             this.cardGro.addChild(card);
            //         }
            //         eatLen ++;
            //     }
            //     else if (item.length == 4 && item[1] == 0) {
            //         item[3] = item[0];
            //         item[0] = 0;
            //         for (var i = 0;i < 4;i ++) {
            //             if (i < 3) {
            //                 var card = this.cardFactory.getAnGangCard(item[i], pos);
            //                 card.x = beginPos + CardPos.handCardGapList[pos] * 3 * eatLen + CardPos.eatCardGapList[pos] * i;
            //                 card.y = 37;
            //                 this.cardGro.addChild(card);
            //             }
            //             else {
            //                 var card = this.cardFactory.getEatCard(item[i], pos);
            //                 card.x = beginPos + CardPos.handCardGapList[pos] * 3 * eatLen + CardPos.eatCardGapList[pos] * 1;
            //                 card.y = 37 - 22;
            //                 this.cardGro.addChild(card);
            //             }
            //         }
            //         eatLen ++;
            //     }
            // }
        }
    }

    enum ResultType {
        win,
        lose,
        liu
    }
}