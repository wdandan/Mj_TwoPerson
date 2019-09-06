/**
 * 定义http协议发送和收到的数据的格式
 * @author JAY
 * @date 2018/1/30
 */
module JAY {
	export class ProtocolHttp {
		/**
		 * 登录请求相关数据
		 */
		public static login = {
			action: "/majapi/login",
			data:{
				user: "",
				password: "",
			}
		}
		/**
		 * 获取房间信息  
		 */
		public static getRoomInfo = {
			action: "/mj/get_hall_room_info",
			data:{
				skey: "",
				uid: 0,
				param: {},
			}
		}
		/**
         * 钻石金币信息
         */
        public static getMoneyMsg = {
            action: "getcurrency",
			data:{
				skey: "",
				uid: 0,
				param: {}
			}
        }
		/**
         * 个人信息
         */
        public static getUserInfo = {
            action: "getpersonal",
			data:{
				skey: "",
				uid: 0,
				param: {}
			}
        }

		/**玩家个人信息*/
		public static personalInfoData = {
			data: {
				point: 0,                //玩家总积分
				accid: -1,               //玩家平台ID
				uid: 0,                  //玩家游戏ID
				winning_rate: "0",        //玩家胜率
				avater_url: "",          //玩家头像地址
				total: 0,           //玩家总游戏场数
				sex: 0,                  //玩家性别
				highest_winning_streak: 0,//玩家最高连胜 
				nick_name: "",                  //玩家昵称  
				diamond:0,                //钻石数
				money:0                    //金币数
			},
			ret: 0,
			desc: ""
		}
	}
}