/**
 * 用户数据
 */
module JAY {

	export enum ReadyState {
		UNREADY = 1,    // 待准备
		READY = 2,     // 准备中
		PLAYING = 3,    // 游戏中
		ESCAPE = 4,     // 逃跑
	}

	export class User {
		/**用户ID*/
		public user_id: number;
		public user_name:string="";
		public nick_name:string="";
		public password:string="";
		public nick: string = "";
		public skey:string="";
		public headImgUrl:string="";
		public seat_id: number;//服务器座位号
		public point: number;  //分数
		public money: number;	//金币
		public diamond: number; //钻石
		public status: ReadyState;//是否准备状态
		public client_seatID: number;//客户端座位号  0,1,2,3取值  保留seat_id的逆时针顺序，与服务器座位号弱关联
		public isBanker: boolean = false;//是否是庄家
	}
}