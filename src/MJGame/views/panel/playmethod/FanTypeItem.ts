module JAY {
	export class FanTypeItem extends eui.Component {
		private nameLabel: eui.Label;      //番型名
		private descripeLabel: eui.Label;  //番型描述
		private cardGroup: eui.Group;      //牌容器

		public constructor() {
			super();
			this.skinName = "Skin.FanTypeItemSkin";
		}

		public setName(fanName: string) {
			this.nameLabel.text = fanName;
		}

		public setDescripe(des: string) {
			this.descripeLabel.text = des;

			//描述超过两行时，牌容器下移和Item高度增加
			if (this.descripeLabel.numLines >= 2) {
				let offerY = this.descripeLabel.size * (this.descripeLabel.numLines - 1)
				this.cardGroup.y += offerY;
				this.height += offerY;
			}
		}

		public setCardList(cardList) {
			let len = cardList.length;
			for (let i = 0; i < len; i++) {
				let card = new JAY.Card;
            	card.setCardTexture(Directions.Down, JAY.CardState.Fall, cardList[i]);
				card.scaleX = 1;
				card.scaleY = 1;
				card.x =  0.8*card.width* i;
				card.y = 0;
				this.cardGroup.addChild(card);
			}

			//牌数组为0时，Item高度减少
			if (len == 0) {
				this.height = this.height-this.cardGroup.height;
			}
		}
	}
}
