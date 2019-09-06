/**
 * 游戏层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class GameLayer extends Layer {
		//控制器
		protected _ctrl: GameLayerController;

		//四个方向的模块
		private Down: eui.Group;
		private Left: eui.Group;
		private Up: eui.Group;
		private Right: eui.Group;

		//麻将模块
		private mod_down: JAY.CardModLayout;
		private mod_right: JAY.CardModLayout;
		private mod_up: JAY.CardModLayout;
		private mod_left: JAY.CardModLayout;

		//房间号
		private roomNo: eui.Label;
		//中间的风向盘
		private disc: JAY.Disc;
		//准备按钮
		private btn_ready: eui.Button;
		//操作吃碰胡杠的操作器
		private actHandler: JAY.ActHandler;
		//出牌指针
		private _cardPointer: JAY.CardPointer;
		//记录当前出的牌的对象
		private _currentOutCardContainer: eui.Group;

		/**
		 * 测试相关按钮
		 */
		private cardSelect_Panel: eui.Panel;
		private card_Group: eui.Group;
		private dealCard: eui.Button;
		private changeCard: eui.Button;
		private confirmNextCard: eui.Button;
		private selectTargetCard: eui.Button;
		private selectSourceCard: eui.Button;
		private sure: eui.Button;

		private _sourceCardList: Array<number> = [];
		private _targetCardList: Array<number> = [];
		private _isSourceCard: boolean = true;

		/**
		 * 四人座位的配置位置
		 */
		private FourPlayers: Array<eui.Group>;

		/**
		 * 三人座位的位置
		 */
		private ThreePlayers: Array<eui.Group>;

		/**
		 * 二人座位的位置
		 */
		private TwoPlayers: Array<eui.Group>;

		private seatsUI: Array<eui.Group>;


		public constructor() {
			super();
			this.skinName = "Skin.GameLayer";
		}

		private move: eui.Button;
		protected init() {
			super.init();
			console.log("进入游戏层");

			this._initTestPanel();
			this._initCardPointer();
			this._initCardModDirection();//初始化牌布局的方向

			// test
			// this.mod_down.initHandCards(this.mod_down.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
			// // this.mod_down.addDrawCard(this.mod_down.direction, 18);

			// this.mod_up.initHandCards(this.mod_up.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
			// this.mod_left.initHandCards(this.mod_left.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
			// this.mod_right.initHandCards(this.mod_right.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);

			// this.mod_down.addCombToAllCardList(this.mod_down.direction, [], [22, 22, 22], JAY.CardCombType.Peng);
			// this.mod_up.addCombToAllCardList(this.mod_up.direction, [], [22, 22, 22], JAY.CardCombType.Peng);
			// this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 22, 22], JAY.CardCombType.Peng);
			// this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 22, 22], JAY.CardCombType.Peng);

			// this.mod_down.appliqueCards(this.mod_down.direction,[97,102,101],[49,50,51]);


			this._initLayoutSeats();//布置座位
			this._initUsersSeats();//玩家就座

		}

		/**
		 * 初始化出牌指针
		 */
		private _initCardPointer() {
			this._cardPointer = new JAY.CardPointer();
			this._cardPointer.visible = false;
			this.actHandler.Ctrl = new JAY.ActHandlerController();
		}

		/**
		 * 初始化测试面板
		 */
		private _initTestPanel() {
			this.cardSelect_Panel.visible = false;
			this._addShowCard(17, 25);
			this._addShowCard(33, 41);
			this._addShowCard(49, 57);
			this._addShowCard(65, 68);
			this._addShowCard(81, 83);
		}


		private _addShowCard(start: number, end: number, ) {
			let group = this.card_Group;

			for (let i = start; i <= end; i++) {
				let container = new eui.Group();
				group.addChild(container);

				let card = new JAY.Card();
				card.touchEnabled = false;
				card.scaleX = card.scaleY = 0.5;
				card.setCardTexture(JAY.Directions.Down, JAY.CardState.Stand, i);
				container.addChild(card);

				let toggle = new eui.ToggleButton();
				toggle.width = 43;
				toggle.height = 62;
				toggle.alpha = 0;
				container.addChild(toggle);

				toggle.addEventListener(egret.Event.CHANGE, (e: egret.Event) => {
					let radioButton = <eui.ToggleButton>e.target;
					if (radioButton.selected) {
						card.alpha = 0.3;
						this._isSourceCard ? this._sourceCardList.push(card.value) : this._targetCardList.push(card.value);
					} else {
						card.alpha = 1;
						this._isSourceCard ? ArrayUtils.deleteByValue(this._sourceCardList, card.value) : ArrayUtils.deleteByValue(this._targetCardList, card.value);
					}

				}, this);
			}
		}


		private _resetTestCard() {
			let group = this.card_Group;
			for (let i = 0; i < group.numChildren; i++) {
				let container = <eui.Group>group.getChildAt(i);
				let card = <JAY.Card>container.getChildAt(0);
				let toggle = <eui.ToggleButton>container.getChildAt(1);
				card.alpha = 1;
			}
		}

		/**
		 * 配置玩家的座位，人数决定布局
		 */
		private _initLayoutSeats() {
			this._initConfigSeats();//初始化座位配置
			this._hideOrShowAllSeats(false, this.FourPlayers);//隐藏所有座位
			this._chooseConfigSeates(JAY.Config.MaxPlayerCount);// 根据人数选好座位配置
			this._hideOrShowAllSeats(true, this.seatsUI);//显示需要的座位
		}

		/**
		 * 配好的人数及位置
		 */
		private _initConfigSeats() {
			this.FourPlayers = [
				this.Down,
				this.Right,
				this.Up,
				this.Left
			]

			this.ThreePlayers = [
				this.Down,
				this.Right,
				this.Left
			]

			this.TwoPlayers = [
				this.Down,
				this.Up,
			]

		}

		/**
		 * 根据人数选好座位配置
		 */
		private _chooseConfigSeates(maxPlayerCount: number) {
			switch (maxPlayerCount) {
				case 2:
					this.seatsUI = this.TwoPlayers;
					break;
				case 3:
					this.seatsUI = this.ThreePlayers;
					break;
				case 4:
					this.seatsUI = this.FourPlayers;
					break;
			}
		}


		/**
		 * @param isShow  是否显示
		 * @param seats   座位UI数组
		 */
		private _hideOrShowAllSeats(isShow: boolean, seats: Array<eui.Group>) {
			for (let userObj of seats) {
				userObj.getChildAt(0).visible = isShow;
			}
		}


		/**
		 * 根据用户的客户端座位号就座
		 */
		private _initUsersSeats() {
			for (let key in UsersInfo.Instance.UsersList) {
				let user = <User>UsersInfo.Instance.UsersList[key];
				(<UserHead>this.seatsUI[user.client_seatID].getChildAt(0)).UserModel = user;
			}
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				CustomEvents.OtherPlayer_EnterROOM,
				CustomEvents.DealCard,
				CustomEvents.DrawCard,
				CustomEvents.BuHua_DealCard,
				CustomEvents.BuHua_GameCard,
				CustomEvents.CanAct,
				CustomEvents.AllUsersReady,
				CustomEvents.ACT_Aleady,
				JAY.SelectCardComplete,
				CustomEvents.ChangeCard,
				CustomEvents.CheckOut,
				CustomEvents.GameOver
			];
		}

		private static count = 17;
		protected setOnTouchListener() {
			this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);

			//测试相关
			this.dealCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.changeCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.confirmNextCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectTargetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectSourceCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this)

			this.move.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.mod_down.buGang(this.mod_down.direction, 22);
				this.mod_up.buGang(this.mod_up.direction, 22);
				this.mod_left.buGang(this.mod_left.direction, 22);
				this.mod_right.buGang(this.mod_right.direction, 22);
				// this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 23, 24], JAY.CardCombType.Chi);
				// this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 23, 24], JAY.CardCombType.Chi);

				// this.mod_down.addCombToAllCardList(this.mod_down.direction, [], [22, 23, 24], JAY.CardCombType.Chi);
				// this.mod_up.addCombToAllCardList(this.mod_up.direction, [], [22, 23, 24], JAY.CardCombType.Chi);
				// // this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 23, 24], JAY.CardCombType.Chi);
				// // this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 23, 24], JAY.CardCombType.Chi);
				// this.mod_up.addCombToAllCardList(this.mod_up.direction, [0, 1, 2], [22, 22, 22, 22], JAY.CardCombType.MGang);
				// this.mod_down.addCombToAllCardList(this.mod_down.direction, [0, 1, 2], [22, 22, 22, 22], JAY.CardCombType.AnGang);
				// this.mod_down.moveDrawCardToHandList(8);		// this.mod_down.addDrawCard(this.mod_down.direction, 17);
				// if (GameLayer.count < 33) {
				// 	// this.mod_down._addOutCard(this.mod_down.direction, GameLayer.count,this._cardPointer);
				// 	this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
				// 	// this.mod_left._addOutCard(this.mod_left.direction, GameLayer.count,this._cardPointer);
				// } else if (GameLayer.count >= 33) {
				// 	this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
				// 	// this.mod_right._addOutCard(this.mod_right.direction, GameLayer.count,this._cardPointer);
				// }
				// this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
				// // this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count,this._cardPointer);
				// GameLayer.count++;
				// if (GameLayer.count == 26) GameLayer.count = 33;
				// if (GameLayer.count == 42) GameLayer.count = 49;

			}, this);
		}

		protected removeOnTouchListener() {
			this.btn_ready.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);

			//测试相关
			this.dealCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.changeCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.confirmNextCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectTargetCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectSourceCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.cardSelect_Panel.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this)
		}


		protected watchData() {
			eui.Binding.bindHandler(DeskInfo, ["deskID"], this._roomNoChange, this);

		}

		/**
		 * 房间号有变化时调用
		 */
		private _roomNoChange(value: any): void {
			value && (this.roomNo.text = `房间号：${value.toString()}`);
		}

		private _initCardModDirection() {
			this.mod_down.direction = Directions.Down;
			this.mod_right.direction = Directions.Right;
			this.mod_up.direction = Directions.Up;
			this.mod_left.direction = Directions.Left;
		}


		/**
		 * 所有玩家准备好
		 */
		private ui_allUsersReady(event: egret.Event) {
			let user = UsersInfo.Instance.getUserBySeatID(0);//找到服务器座位号为0的用户,0为东风
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//为0的用户座位的牌布局对象
			this.disc.setDongFengDirection(cardMod.direction);
		}

		/**
		 * 发牌
		 */
		private ui_dealCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.all_cards));
			let all_cards = event.data.all_cards;
			for (let key in all_cards) {
				let data = all_cards[key];
				let user = UsersInfo.Instance.getUserBySeatID(data.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
				user.status = ReadyState.PLAYING;
				let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
				cardMod.initHandCards(cardMod.direction, data.card_list);
			}

		}

		/**
		 * Test换牌
		 */
		private ui_changeCard(event: egret.Event) {
			console.log(this.TAG + " ui_changeCard: " + JSON.stringify(event.data.info));
			let data = event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(data.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.initHandCards(cardMod.direction, data.hand_card);
			if (data.hand_card.length == 14) {
				cardMod.removeDrawCard();
				cardMod.moveCardToDrawCard(cardMod.direction, data.hand_card[0]);//如果换来了14张牌，一张牌放到旁边
			}
		}

		/**
		 * 发牌补花
		 */
		private ui_buHuaDealCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
			let info = <AppliqueInfo>event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			console.log(`客户端座位号为${user.client_seatID}发牌补花`);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.appliqueCards(cardMod.direction, info.hua_card, info.bu_cards);
		}

		/**
		 * 游戏补花
		 */
		private ui_buHuaGameCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
			let info = <GameAppliqueInfo>event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			console.log(`客户端座位号为${user.client_seatID}游戏补花`);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.addDrawCard(cardMod.direction, info.hua_card_list[0]);
		}

		/**
		 * 绑定用户模型在userHead上
		 */
		private ui_otherPlayerEnterRoom(event: egret.Event) {
			console.log(this.TAG + " ui_otherPlayerEnterRoom: " + JSON.stringify(event.data));
			let user = event.data.user;
			let userHead = <UserHead>this.seatsUI[user.client_seatID].getChildAt(0);//头像UI对象
			userHead.UserModel = user;
		}

		/**
		 * 结算
		 */
		private ui_checkOut(event: egret.Event) {
			console.log(this.TAG + " ui_checkOut: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this.actHandler.hide();
			let gameResultLayer = new JAY.GameResult(info);
			// gameResultLayer.Ctrl = new JAY.SelectRoomController();
			SceneManager.Instance.runningScene.addChild(gameResultLayer);
		}


		/**
		 * 游戏结束
		 */
		private ui_gameOver(event: egret.Event) {
			console.log(this.TAG + " ui_gameOver: " + JSON.stringify(event.data.info));
			let info = event.data.info;//目前没什么消息可以处理
			this.btn_ready.visible = true;
			//重置风向盘
			this.disc.reSetDisc();
			this._reSetRoom();
		}


		/**
		 * 摸牌，轮到谁，谁的灯亮，并且开启倒计时
		 */
		private ui_drawCard(event: egret.Event) {
			console.log(this.TAG + " ui_drawCard: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
			cardMod.addDrawCard(cardMod.direction, info.card_list[0]);//添加摸牌对象
		}

		/**
		 * 服务器告诉玩家可以进行什么操作
		 */
		private ui_canAct(event: egret.Event) {
			console.log(this.TAG + " ui_canAct: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this._parseActInfo(info);
		}

		/**
		 * 解析推送玩家叫牌的信息，分别对UI进行操作
		 */
		private _parseActInfo(info: CallCardInfo) {
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);

			for (let key in info.act_info) {
				console.log(`_parseActInfo ${JAY.ACT[key]}`);
				switch (Number(key)) {
					case JAY.ACT.CHU:
						cardMod.canOutACard = true;
						this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
						cardMod.moveCardToDrawCard(cardMod.direction, info.act_info[key].card)
						break;
					case JAY.ACT.GUO:
					case JAY.ACT.CHI:
					case JAY.ACT.PENG:
					case JAY.ACT.AN_GANG:
					case JAY.ACT.BU_GANG:
					case JAY.ACT.DIAN_GANG:
					case JAY.ACT.DIAN_HU:
					case JAY.ACT.ZI_MO:
						//可以进行某种ACT操作，显示操作actHandler
						this.actHandler.visible = true;
						this.actHandler.addLayout(Number(key), info.act_info[key]);
						break;

					case JAY.ACT.TING:
						break;
				}
			}
		}


		/**
		 * cardModeLayout发过来的通知选牌完成
		 */
		private ui_selectCardComplete(event: egret.Event) {
			console.log(this.TAG + " ui_selectCardComplete: " + JSON.stringify(event.data.cardValue));
			let cardValue = event.data.cardValue;
			this._ctrl.actChuCard(cardValue);
		}


		/**
		 * 服务器通知客户端打有人作出了相应的操作
		 */
		private ui_actAleady(event: egret.Event) {
			console.log(this.TAG + " ui_actAleady: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this._parseActResponse(info);
		}

		/**
		 * 解析推送玩家动作响应协议 (推送给所有人)
		 */
		private _parseActResponse(info: ActResponseInfo) {
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);
			this.actHandler.hide();//做了操作后 此可以隐藏
			let deleteList = [];
			let combList = [];
			console.log("_parseActResponse " + JAY.ACT[info.act_type]);
			switch (info.act_type) {//过的视图上无太大变化
				case JAY.ACT.CHU:
					this._currentOutCardContainer = cardMod.outACard(cardMod.direction, info.card_list[0], this._cardPointer);
					break;
				case JAY.ACT.PENG:
					this.disc.lightBright(cardMod.direction);//倒计时在此接口加入，其他人接收不到101001的消息，通过此来转移指针
					//组合牌的显示，以及手牌的删除
					this._addCombArray(2, deleteList, info.card_list[0]);
					this._addCombArray(3, combList, info.card_list[0]);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, JAY.CardCombType.Peng);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case JAY.ACT.CHI:
					this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
					//组合牌的显示，以及手牌的删除
					deleteList = ArrayUtils.DeepCopy(info.card_list);
					combList = ArrayUtils.DeepCopy(info.card_list);
					let currentOutCardValue = (<JAY.Card>this._currentOutCardContainer.getChildAt(0)).value;
					ArrayUtils.deleteByValue(deleteList, currentOutCardValue);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, JAY.CardCombType.Chi);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case JAY.ACT.DIAN_GANG:
					this._addCombArray(3, deleteList, info.card_list[0]);//手牌删除3张
					this._addCombArray(4, combList, info.card_list[0]);//添加组合牌
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, JAY.CardCombType.MGang);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case JAY.ACT.BU_GANG:
					//找到显示中的碰组合，并将其换成杠牌
					cardMod.buGang(cardMod.direction, info.card_list[0]);
					break;
				case JAY.ACT.AN_GANG:
					this._addCombArray(4, deleteList, info.card_list[0]);//
					this._addCombArray(4, combList, info.card_list[0]);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, JAY.CardCombType.AnGang);
					break;
				case JAY.ACT.DIAN_HU:// 不用等了，消息从101006 回来了（结算消息时从服务器主动推过来的，如没牌的情况）
					break;
				case JAY.ACT.ZI_MO:  // 不用等了，消息从101006 回来了
					break;
			}
		}

		/**
		 * 添加comb数据到数组，为了和UI一致
		 */
		private _addCombArray(repeatCount: number, arr: Array<number>, value: number) {
			for (let i = 0; i < repeatCount; i++) {
				arr.push(value);
			}
		}


		/**
		 * 准备按钮点击
		 */
		private _onReadyBtnClick() {
			this.btn_ready.visible = false;
			// this._reSetRoom();
			this._ctrl.onMySelfReady();

		}


		private _reSetRoom() {
			//重置每个模块
			for (let element of this.seatsUI) {
				let cardMod = element.getChildAt(1);
				(<CardModLayout>cardMod).reSetMod();
			}

		}

		/**
		 * 测试按钮点击
		 */
		private _onTestBtnClick(event: egret.Event) {
			let btn = <eui.Button>event.currentTarget;
			switch (btn) {
				case this.dealCard:
					this._ctrl.test_Send(TestType.DealCard, this._targetCardList);
					break;
				case this.changeCard:
					this._ctrl.test_Send(TestType.ChangeCard, this._targetCardList, this._sourceCardList);
					break;
				case this.confirmNextCard:
					this._ctrl.test_Send(TestType.ConfirmNextCard, this._targetCardList);
					break;
				case this.selectSourceCard:
					this.cardSelect_Panel.visible = true;
					this._isSourceCard = true;
					this._sourceCardList = [];
					this._resetTestCard();
					break;
				case this.selectTargetCard:
					this.cardSelect_Panel.visible = true;
					this._isSourceCard = false;
					this._targetCardList = [];
					this._resetTestCard();
					break;
				case this.sure:
					this.cardSelect_Panel.visible = false;
					console.log("sourceCard:", this._sourceCardList, "\ntargetCard:", this._targetCardList);
					break;
			}
		}
	}
}