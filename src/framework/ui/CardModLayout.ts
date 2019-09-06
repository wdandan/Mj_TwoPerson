/**
 * 麻将布局（每个模块对麻将的视图上的操作全部在此进行）
 * @author lucywang
 * @date 2017/10/23
 */
module JAY {

    enum UpDownState {
        Up,
        Down,
    }
    export const SelectCardComplete: string = "selectCardComplete"//选牌完成
    /**
    * 麻将布局类
    * 麻将吃碰打出的牌手牌的变换位置等的操作全在此类进行
    *
    */
    export class CardModLayout extends eui.Component {
        //UI
        private AllCards: eui.Group;
        public HandCards: eui.Group;
        private OutCards: eui.Group;

        //逻辑
        private _handCardList: Array<number> = [];//当前的手牌数组
        private _upDist = 40;//弹起的距离
        private _upCardContainer: eui.Group;//记录当前弹起的牌,防止遍历去修改状态效率低
        private _drawCardContainer: eui.Group;

        public direction: JAY.Directions;
        public canOutACard: boolean = false;//是否可以出牌

        public constructor() {
            super();
            this.skinName = "Skin.CardModLayout";
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }


        /**
         * 初始化手牌（未排序，这里对其排序）
         * @param direction    方向
         * @param handCardList 手牌列表
         */
        public initHandCards(direction: JAY.Directions, handCardList: Array<number>) {
            this.currentState = JAY.Directions[direction];
            ArrayUtils.sortByAsc(handCardList);//升序排列
            this._handCardList = handCardList;//记录当前模块的手牌
            this.HandCards.removeChildren();//先移除手牌上的节点，再添加
            for (let i = 0; i < handCardList.length; i++) {
                let cardContainer = this._createHandCard(direction, handCardList[i]);
                this.HandCards.addChild(cardContainer);
            }
        }



        /**
         * 发牌补花(根据手牌来剔除花牌 hua_card代表花的多少与bu_cards的长度不一定相等)
         * @param direction   方向
         * @param hua_card    花牌
         * @param bu_cards    补牌
         */
        public appliqueCards(direction: JAY.Directions, hua_card: Array<number>, bu_cards: Array<number>) {
            if (direction != JAY.Directions.Down) return;//其他的人的补花不做任何处理
            //删除花牌
            this._handCardList = this._deleteHuaCard(this._handCardList);

            //放入补花的牌
            for (let key in bu_cards) {
                this._handCardList.push(bu_cards[key]);
            }

            this.initHandCards(direction, this._handCardList);
        }

        /**
         * 将已碰的牌 变成杠牌显示 即显示四张
         * @param direction   方向
         * @param cardValue   牌值
         */
        public buGang(direction: JAY.Directions, cardValue: number) {
            for (let i = 0; i < this.AllCards.numChildren; i++) {
                let element = this.AllCards.getChildAt(i);
                if (element instanceof JAY.ComboCards) {
                    (<JAY.ComboCards>element).changBuGang(direction, cardValue);
                }
            }

        }

        /**
         * 剔除花牌
         */
        private _deleteHuaCard(cardList: Array<number>) {
            let result = [];

            for (let key in cardList) {
                if (cardList[key] < 97 || cardList[key] > 104) {
                    result.push(cardList[key]);
                }
            }

            return result;
        }

        /**
         * 打出一张牌
         */
        public outACard(direction: JAY.Directions, cardValue: number, cardPointer: JAY.CardPointer) {
            this._deleteAllHandCardsByValue(direction, cardValue);

            //添加牌的出牌列表
            let outCardContainer = this._addOutCard(direction, cardValue, cardPointer);
            return outCardContainer;
        }

        /**
         * 根据值来删除所有的手牌 包括摸的牌
         */
        private _deleteAllHandCardsByValue(direction: JAY.Directions, cardValue: number) {
            if (direction == JAY.Directions.Down) {
                this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down);//两个相同的牌值打出一个时会弹起一张
                if (this._drawCardContainer) {
                    let drawCardValue = (<JAY.Card>this._drawCardContainer.getChildAt(0)).value;
                    //如果是打出的牌就是摸的牌，则移除摸的牌即可
                    if (drawCardValue == cardValue) {
                        this.removeDrawCard();
                    } else {
                        this._deleteHandCardByValue(direction, cardValue);
                        this._moveDrawCardToHandList(drawCardValue);
                    }
                } else {
                    this._deleteHandCardByValue(direction, cardValue);
                }
            } else {
                if (this._drawCardContainer) {
                    this.removeDrawCard();
                } else {
                    this._deleteHandCardByValue(direction, cardValue);
                }
            }
        }


        /**
        * 根据牌值删除手牌
        */
        private _deleteHandCardByValue(direction: JAY.Directions, cardValue: number) {
            if (direction != JAY.Directions.Down) {//其他方向服务器不给值，没办法删，就用此方法删除
                let cardContainer = <eui.Group>this.HandCards.getChildAt(0);//每次删除第一个，后面可以改成随机删除某张牌
                cardContainer.parent.removeChild(cardContainer);
            } else {
                //找到其索引值
                let index = this._handCardList.indexOf(cardValue);
                if (index == -1) return;
                //视图移除
                let cardContainer = <eui.Group>this.HandCards.getChildAt(index);
                cardContainer.parent.removeChild(cardContainer);
                //数组移除
                this._handCardList.splice(index, 1);
            }
        }


        /**
         * 获取将要插入手牌排堆的索引值
         */
        private _getInsertIndex(cardValue: number): number {
            //手牌放入数组
            this._handCardList.push(cardValue);
            //重新排序
            ArrayUtils.sortByAsc(this._handCardList);
            let index = this._handCardList.indexOf(cardValue);
            return index;
        }


        /**
        * 将摸的牌插入手牌列表
        * @param drawCardValue 牌值
        */
        private _moveDrawCardToHandList(drawCardValue: number) {
            let index = this._getInsertIndex(drawCardValue);
            let cardContainer = this._drawCardContainer.parent.removeChild(this._drawCardContainer);
            this.HandCards.addChildAt(cardContainer, index);
            this._drawCardContainer = null;
        }


        /**
        * 将手牌移除到drawCard,如吃碰杠操作后，弹一个将要出的牌，换牌（服务器返回了所有的card）成功的时候，如果是换的摸的牌，则将手牌移动过来
        * @param drawCardValue 牌值
        */
        public moveCardToDrawCard(direction: JAY.Directions, drawCardValue: number) {
            if (this._drawCardContainer) return;//如果有摸的牌  则不移动
            this._deleteHandCardByValue(direction, drawCardValue);
            this.addDrawCard(direction, drawCardValue);
        }


        /**
        * 摸牌(摸的牌只有一张)
        * @param direction   方向
        * @param value       牌值
        *
        */
        public addDrawCard(direction: JAY.Directions, value: number) {
            this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down);//将点击的牌落下
            this._drawCardContainer && this._drawCardContainer.parent.removeChild(this._drawCardContainer);//如果有摸到的牌则移除掉，如游戏的补花
            this._drawCardContainer = this._createHandCard(direction, value);
            this.AllCards.addChild(this._drawCardContainer);
        }


        /**
         * 移除摸牌
         */
        public removeDrawCard() {
            this._drawCardContainer.parent.removeChild(this._drawCardContainer);
            this._drawCardContainer = null;
        }


        /**
        * 添加牌到出牌列表
        * @param direction   方向
        * @param value       牌值
        */
        private _addOutCard(direction: JAY.Directions, value: number, cardPointer: JAY.CardPointer) {
            let cardContainer = new eui.Group();//注意不要设置其大小，group才会根据子节点的大小来自适应 为了加入指针进来，所以添加了一个group
            this.OutCards.addChild(cardContainer);

            let card = new JAY.Card;
            card.setCardTexture(direction, JAY.CardState.Fall, value);
            card.anchorOffsetX = card.width / 2;
            card.anchorOffsetY = card.height / 2;
            card.horizontalCenter = 0;
            card.verticalCenter = 0;
            cardContainer.addChild(card);

            this._adjustOutDir(direction, card);
            this._moveCardPointer(cardContainer, cardPointer)

            return cardContainer;
        }


        /**
         * 移动指针
         */
        private _moveCardPointer(cardContainer: eui.Group, cardPointer: JAY.CardPointer) {
            cardPointer.parent && cardPointer.parent.removeChild(cardPointer);
            cardPointer.y = cardContainer.getChildAt(0).y;
            cardPointer.visible = true;
            cardContainer.addChild(cardPointer);
        }


        /**
        * 调整出牌的布局(为了使用tilemap的自动布局，且节点的添加顺序和麻将的习惯一致，做此调整)
        * @param direction   方向
        * @param card        牌对象
        */
        private _adjustOutDir(direction: JAY.Directions, card: JAY.Card) {
            switch (direction) {
                case JAY.Directions.Left:
                    card.scaleX = -1;
                    card.anchorOffsetX = card.width / 2;
                    card.anchorOffsetY = card.height / 2;
                    card.horizontalCenter = 0;
                    card.verticalCenter = 0;
                    break;
                case JAY.Directions.Right:
                    // card.scaleY = -1;
                    break;
                case JAY.Directions.Up:
                    card.scaleX = -1;
                    card.scaleY = -1;
                    break;
            }
        }


        /**
        * 添加组合牌到列表
        * @param direction   方向
        * @param deleteList  手牌中需要删除的牌的索引值的数组
        * @param combList    组合牌值
        * @type  type        组合类型
        */
        public addCombToAllCardList(direction: JAY.Directions, deleteList: Array<number>, combList: Array<number>, type: CardCombType) {
            for (let v of deleteList) {
                this._deleteAllHandCardsByValue(direction, v);
            }
            this._addComboCards(direction, combList, type);
        }


        /**
        * 创建手牌
        * @param direction   方向
        * @param value       牌值
        */
        private _createHandCard(direction, value) {
            //白鹭的group加了布局后不允许改动其位置，没法实现弹起的效果，真是讨厌，这里加个group
            let cardContainer = new eui.Group();//注意不要设置其大小，group才会根据子节点的大小来自适应
            cardContainer.y = 0;
            (direction == JAY.Directions.Down) && cardContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this._handCardHandler, this);

            let card = new JAY.Card;
            card.setCardTexture(direction, JAY.CardState.Stand, value);
            cardContainer.addChild(card);

            return cardContainer;
        }


        /**
        * 触摸手牌的处理函数（此处只处理UI上的逻辑，其他的逻辑请在外部添加监听调用）
        * @param event   事件
        */
        private _handCardHandler(event: egret.Event) {
            let cardContainer = <eui.Group>event.currentTarget;
            //打印其深度
            let index = this.HandCards.getChildIndex(cardContainer);
            console.log(`inner Cards index = ${index} click`);
            if (this._upCardContainer != cardContainer) {//有弹起的牌
                this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down);//如果有弹起的牌将弹起的牌落下
                this._upOrDown(cardContainer, UpDownState.Up);//将点击的牌弹起
            } else if (this._upCardContainer == cardContainer && this.canOutACard) {//点击的牌就是已弹起的牌
                let card = <JAY.Card>this._upCardContainer.getChildAt(0);
                this.canOutACard = false;
                EventManager.getInstance().dispatchCustomEvent(JAY.SelectCardComplete, { cardValue: card.value });
            }
        }

        /**
         * 弹起或落下
         */
        private _upOrDown(cardContainer: eui.Group, state: UpDownState) {
            if (state == UpDownState.Up) {
                cardContainer.getChildAt(0).y = - this._upDist;
                this._upCardContainer = cardContainer;//修改当前弹起的牌
            } else if (state == UpDownState.Down) {
                cardContainer.getChildAt(0).y = 0;
                this._upCardContainer = null;
            }
        }


        /**
        * 添加组合牌
        * @param direction   方向
        * @param combList    牌值数组
        * @param type        组合类型
        */
        private _addComboCards(direction: JAY.Directions, combList: Array<number>, type: CardCombType) {
            let combCards = new JAY.ComboCards;
            combCards.bottom = 0;
            combCards.setCombCardsTexture(direction, combList, type);
            this.AllCards.addChildAt(combCards, 0);
        }


        /**
        * 重置模块
        */
        public reSetMod(){
           this._handCardList = [];
           this._upCardContainer = null;
           this._drawCardContainer = null;
           this.canOutACard = false;

           for(let i = 0;i < this.AllCards.numChildren; i++){
               let element = this.AllCards.getChildAt(i);
               if(element != this.HandCards){
                   this.AllCards.removeChild(element);
               }

           }
           this.HandCards.removeChildren(); 
           this.OutCards.removeChildren();
        }
    }
}