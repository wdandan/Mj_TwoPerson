/**
 * 定义socket协议发送和收到的数据的格式,好处是提前定义接口的字段，减少与服务器的反复确认
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	/**
	 * 登录  
	 */
	export interface Send100002 {
		user_id: number;
		passwd:string;
	}

	export interface Rev100002 {
		code: number;
		info: loginInfo;
	}

	interface loginInfo {
		room: string;
		old_session: string;
		reconnect:number;
	}

	/**
	 * 创建好友桌
	 */
	export interface Send100101 {
		user_id: number;
	}

	export interface Rev100101 {
		code: number;
		info: CreateDeskInfo;
		need_push: number;
	}

	interface CreateDeskInfo {
		desk_id: number;
		seat_info: Array<PlayerInfo>;
	}

	/**
	 * 准备
	 */
	export interface Send100100 {
		ready: JAY.ReadyState;
		user_id: number;
	}

	export interface Rev100100 {
		code: number;
		info: readyInfo;
	}

	interface readyInfo {
		ready: JAY.ReadyState;
	}

	/**
	 * 加入好友桌
	 */
	export interface Send100102 {
		user_id: number;
		desk_id: number;
	}

	export interface Rev100102 {
		code: number;
		info: JoinRoomInfo,
		need_push: number,
	}

	interface JoinRoomInfo {
		desk_id: number;
		seat_info: Array<PlayerInfo>;
	}

	/**
	 * 推送玩家进入房间
	 */
	export interface Rev101107 {
		code: number;
		info: PlayerInfo;
		need_push: number;
	}

	export interface PlayerInfo {
		status: number; //玩家是否准备 1表示未准备
		nick: string;
		seat_id: number;
		user_id: number;
		point: number;
	}

	/**
	 * 推送玩家准备
	 */
	export interface Rev101106 {
		code: number;
		info: ReadyInfo;
	}

	interface ReadyInfo {
		user_id: number;
		nick: string;
		ready: number;
	}

	/**
	 * 推送玩家定庄消息
	 */
	export interface Rev101004 {
		code: number;
		need_push: number;
		info: BankerInfo;
	}

	interface BankerInfo {
		bank_seat_id: number;//庄家座位序号
		dice: [number, number];//骰子值(一般是两个骰子)
	}

	/**
	* 推送发牌消息
	*/
	export interface Rev101005 {
		code: number;
		need_push: number;
		info: DealCardInfo;
	}

	interface DealCardInfo {
		all_cards: Array<CardInfo>;
	}

	interface CardInfo {
		card_list: Array<number>;//具体牌的数据 
		seat_id: number;//玩家座位序号
	}

	/**
   * 推送发牌补花
   */
	export interface Rev101008 {
		code: number;
		need_push: number;
		info: AppliqueInfo;
	}

	export interface AppliqueInfo {
		seat_id: number;	//玩家座位序号
		hua_card: Array<number>; //花牌
		bu_cards: Array<number>; //补来的牌,(如果是自己补花,则自己能看到补到的牌值)
	}

	/**
   * 推送游戏补花
   */
	export interface Rev101007 {
		code: number;
		need_push: number;
		info: GameAppliqueInfo;
	}

	export interface GameAppliqueInfo {
		seat_id: number;
		hua_card_list: Array<number>;//一般就一张
	}

	/**
	* 推送玩家摸牌
	*/
	export interface Rev101002 {
		code: number;
		need_push: number;
		info: DrawCardInfo;
	}

	interface DrawCardInfo {
		seat_id: number;		 	//玩家座位序号
		card_list: Array<number>;	//摸到的牌
		remain_count: number;		//剩余牌数
	}

	/**
	* 推送玩家叫牌
	*/
	export interface Rev101001 {
		code: number;
		need_push: number;
		info: CallCardInfo;
	}

	export interface CallCardInfo {
		seat_id: number;
		act_info: Object;//key: 表示具体动作,  value 表示动作操作的牌  根据key的不同来对value做不同的解析
	}

	/**
 	* 动作类型
 	*/
	export enum ACT {
		GUO = 0,		//过
		CHU = 10,		//出牌
		CHI = 20, 		//吃牌
		PENG = 30,		//碰牌
		DIAN_GANG = 40,	//点杠
		BU_GANG = 50,	//补杠
		AN_GANG = 60,	//暗杠
		TING = 70,		//听牌
		DIAN_HU = 80,	//胡牌
		ZI_MO = 90,		//自摸
	}


	/**
	* 发送玩家叫牌操作
	*/
	export interface Send100140 {
		user_id: number;
		act: ACT;
		act_params: string;//act_params 是json格式化成的字符串 构造的内容参照ActSendParams
	}

	export interface ActSendParams {
		card?: number;//具体牌值
		used_card?: any;//只能也必须发送2个牌值过来,用于和被吃牌组成顺子
	}

	/**
	* 推送玩家动作响应
	*/
	export interface Rev101112 {
		code: number;
		need_push: number;
		info: ActResponseInfo;
	}

	export interface ActResponseInfo {
		seat_id: number;
		act_type: ACT;
		card_list: Array<number>;
		// all_hand_cards?:{
		//         0:{hand_card:[], angang_card:[]}
		//         1:{hand_card:[], angang_card:[]}
		//     }
	}

	/**
	 * 测试接口
	 */
	export interface Send100999 {
		test_type: TestType;
		user_id: number;
		test_params: string;//此处test_params 是json格式化成的字符串
	}

	export enum TestType {
		ChangeCard = 1, 	 //换牌
		ConfirmNextCard = 2, //确定接下来的牌
		checkLastCard = 3,   //查看最后一张
		DealCard = 4,		 //初始化发牌,在开局前使用
	}

	export interface SendTestParams {
		/**
		 	test_type = 1  source_card: [17]  手中的某张牌
		 	test_type = 2,3,4 				  传[]空数组
		 */
		source_card?: Array<number>;
		/**
		  test_type = 1  target_card: [18]  					 将要换成的某张牌
		  test_type = 2  target_card: [17] 					 	 将要获得的牌
		  test_type = 4  target_card: [17, 17, 17, 18......25]   将要换成的13张牌
		*/
		target_card?: Array<number>;
	}

	export interface Rev100999 {
		code: number;
		need_push: number;
		info: TestInfo;

	}

	export interface TestInfo {
		test_type: TestType;
		seat_id?: number;
		need_push: number;
		init_cards?: Array<number>;
		hand_card?: Array<number>;//返回当前手牌
	}


	/**
	 * 结算
	 */
	export interface Rev101006 {
		code: number;
		need_push: number;
		info: CheckOutInfo;

	}

	export interface CheckOutInfo {
		total_points: Array<number>;//注意可能人数不定  不用[number,number,number,nubmer]的形式 坐标对应的是seat_id
		detail: Array<CheckOut_DetailInfo>;
	}

	export enum CheckOutType {
		Hu = 1,				//胡牌结算
		Gang = 2,			//杠牌
		FollowBanker = 3,	//跟庄
	}

	interface CheckOut_DetailInfo {
		params: Object;//checkOut_HuDetailParams
		points: Array<number>;
		type: CheckOutType;
	}

	enum HuType {
		//  4×3+2 类
		PI_HU = 1000,
		PENG_PENG_HU = 1001,
		//  7×2 类
		QI_XIAO_DUI = 2000,
		//  13×1 类
		SHI_SAN_YAO = 3000,
		//  公用类, 可能出现在以上各类胡法中
		QING_YI_SE = 9001
	}


	export interface checkOut_HuDetailParams {
		source: number;//扣账的人的服务器座位号id
		seat_id: number;//收账人的服务器座位号id
		type: Array<HuType>;
		is_zi_mo: number; //是否自摸 0 点炮，1 自摸
	}



	/**
	 * 游戏结束
	 */
	export interface Rev101003 {
		code: number;
		need_push: number;
		info: GameOverInfo;

	}

	interface GameOverInfo {
		
	}

}