/**
 * 麻将组合（只可被CardModLayout类调用）
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {

    /**
     * 组合牌的内部布局皮肤状态(外部不关心此状态，只有此类用到)
     */
    enum CardComboSkinState {
        Horizental,
        Vertical,
    }

    /**
     * 组合牌类型(这里还是保留此类型，将UI和协议分开，方便后期其他的麻将项目的开发)
     */
    export enum CardCombType {
        Chi,        //吃
        Peng,       //碰
        MGang,      //明杠
        AnGang,     //暗杠
    }

    /**
    * 麻将组合类
    */
    export class ComboCards extends eui.Component {
        //上下方向的组合牌
        private cardH_0: JAY.Card;
        private cardH_1: JAY.Card;
        private cardH_2: JAY.Card;
        private cardH_3: JAY.Card;
        //左右方向的组合牌
        private cardV_0: JAY.Card;
        private cardV_1: JAY.Card;
        private cardV_2: JAY.Card;
        private cardV_3: JAY.Card;

        public constructor() {
            super();
            this.skinName = "Skin.ComboCards";
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }


        /**
         * 设置组合牌的纹理
         * @param direction   方向
         * @param cardList    牌值数组
         * @param type        组合类型
         */
        public setCombCardsTexture(direction: JAY.Directions, cardList: Array<number>, type: CardCombType) {
            this._setComboSkinState(direction);

            if (direction == JAY.Directions.Down) {
                this.scaleX = this.scaleY = 1.47;
            }

            switch (type) {
                case CardCombType.Chi:
                case CardCombType.Peng:
                    this._setChiOrPeng(direction, cardList);
                    break;
                case CardCombType.MGang:
                    this._setMGang(direction, cardList);
                    break;
                case CardCombType.AnGang:
                    this._setAnGang(direction, cardList);
                    break
            }
        }

        /**
         * 判断是否是值为cardValue的碰组合
         * @param cardValue 牌值
         */
        private _isPengComb(cardValue: number): boolean {
            let result = false;
            for (let i = 0; i < 3; i++) {
                if ((<JAY.Card>this["cardH_" + i]).value != cardValue || (<JAY.Card>this["cardV_" + i]).value != cardValue) return false;
            }
            return true;
        }

        public changBuGang(direction: JAY.Directions, cardValue: number) {
            if (this._isPengComb(cardValue)) {
                this.cardH_3.visible = true;
                this.cardV_3.visible = true;
                this.cardH_3.setCardTexture(direction, JAY.CardState.Fall, cardValue);
                this.cardV_3.setCardTexture(direction, JAY.CardState.Fall, cardValue);
            }
        }

        /**
         *  设置吃碰牌型组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setChiOrPeng(direction: JAY.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 3, "ChiOrPeng card number error !");
            this.cardH_3.visible = false;
            this.cardV_3.visible = false;
            this._setList(direction, JAY.CardState.Fall, cardList);
        }



        /**
         *  设置明杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setMGang(direction: JAY.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 4, "MGang card number error !");
            this._setList(direction, JAY.CardState.Fall, cardList);
        }



        /**
         *  设置暗杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setAnGang(direction: JAY.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 4, "AnGang card number error !");
            this._setList(direction, JAY.CardState.Hide, cardList);

            if (direction == JAY.Directions.Down) {//自己的牌需要显示一张自己可见，其他的人不用显示
                (<JAY.Card>this.cardH_3).setCardTexture(direction, JAY.CardState.Fall, cardList[3]);
            }
        }



        /**
         *  设置牌的纹理
         * @param direction   方向
         * @param cardState   牌的状态 Stand,Fall,Hide
         * @param cardList    牌值数组
         */
        private _setList(direction: JAY.Directions, state: JAY.CardState, cardList: Array<number>) {
            for (let i = 0; i < cardList.length; i++) {
                //白鹭不同状态没办法切换纹理，所以用了两套
                (<JAY.Card>this["cardH_" + i]).setCardTexture(direction, state, cardList[i]);
                (<JAY.Card>this["cardV_" + i]).setCardTexture(direction, state, cardList[i]);
            }
        }



        /**
         *  设置组合牌的皮肤状态
         * @param  direction  方向
         */
        private _setComboSkinState(direction: JAY.Directions) {
            if (direction == JAY.Directions.Up || direction == JAY.Directions.Down) {
                this.currentState = CardComboSkinState[CardComboSkinState.Horizental];
            }
            else if (direction == JAY.Directions.Left || direction == JAY.Directions.Right) {
                this.currentState = CardComboSkinState[CardComboSkinState.Vertical];
            }
        }


    }
}