/**
 * 麻将牌（只可在CardModLayout和ComboCards类中进行操作）
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
    /**
     * 方向（布局的方向，牌的方向）
     * 
     */
    export enum Directions {//逆时针的顺序
        Down,
        Right,
        Up,
        Left,
    }

    /**
     * 牌的内部皮肤状态(外部不关心此状态，只有此类用到)
     */
    enum CardSkinState {
        stand_down,
        stand_right,
        stand_up,
        stand_left,

        fall_down,
        fall_right,
        fall_up,
        fall_left,
        hide_v,
        hide_h
    }

    /**
     * 牌的状态
     */
    export enum CardState {
        Stand,   //站立
        Fall,    //倒牌
        Hide,    //扣牌
    }

    /**
    * 麻将类
    */
    export class Card extends eui.Component {
        //UI相关变量
        private fallRight: eui.Image;
        private fallLeft: eui.Image;
        private fallUp: eui.Image;
        private fallDown: eui.Image;
        private standDown: eui.Image;

        //card的可供访问的类属性
        public value: number;
        public direction: number;
      
        public constructor() {
            super();
            this.skinName = "Skin.Card";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**
         * @param direction     方向 Up,Down,Left,Right
         * @param cardState     牌的状态 Stand,Fall,Hide
         * @param value         牌的值
         */
        public setCardTexture(direction: JAY.Directions, cardState: JAY.CardState, value: number) {
            this.direction = direction;
            this.value = value;


            this._setCardSkinState(direction, cardState)
            //牌值纹理
            let source = RES.getRes(this._getValueImageURL(direction, cardState, value));

            //未找到白鹭动态切换某个状态下的纹理的方法，暂且用多个Image对象的方法来切换其不同状态下的纹理
            this.fallRight.source = source;
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        }

        /**
         * @param value  牌值
         * @returns   string   牌值对应的纹理路径
         */
        private _getValueImageURL(direction: JAY.Directions, cardState: JAY.CardState, value: number): string {
            if (cardState == JAY.CardState.Fall) {
                return "card_small_" + value + "_png";
            } else {
                return "card_big_" + value + "_png";
            }

        }

        /**
         * 仅做展示牌的时候使用 UI编辑器上赋值不会立马在编辑器显现出来，只有运行时候才会显现
         */
        public set Source(value: number) {
            this.value = value;
            let source = RES.getRes(this._getValueImageURL(this.direction, CardSkinState[this.currentState], value));
            this.fallRight.source = source
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        }

        /**
         * 设置牌的内部皮肤状态
         * @param  direction  方向
         * @param  cardState  牌状态
         */
        private _setCardSkinState(direction: JAY.Directions, cardState: JAY.CardState) {
            let cardSkinState: CardSkinState;
            switch (cardState) {
                case JAY.CardState.Stand:
                    cardSkinState = <CardSkinState>(CardSkinState.stand_down + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case JAY.CardState.Fall:
                    cardSkinState = <CardSkinState>(CardSkinState.fall_down + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case JAY.CardState.Hide:
                    if (direction == JAY.Directions.Up || direction == JAY.Directions.Down) {
                        this.currentState = CardSkinState[CardSkinState.hide_v];
                    } else if (direction == JAY.Directions.Left || direction == JAY.Directions.Right) {
                        this.currentState = CardSkinState[CardSkinState.hide_h];
                    }
                    break;
            }

        }
    }
}