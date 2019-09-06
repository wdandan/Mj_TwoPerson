/**
 * 游戏的配置
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {

	// 版本控制在这里
	export class Config {
		public static default_res_json:string = "resource/default.res.json";
		public static default_thm_json:string = "resource/default.thm.json";
		public static default_resource:string = "resource/";
		public static SERVER_IP:string = "43.251.116.243";
		public static SERVER_SOCKET_PORT:string = "10000";
		public static SERVER_HTTP_PORT:string = "8889";
		
		public static SERVER_URL:string="ws://"+Config.SERVER_IP+":"+Config.SERVER_SOCKET_PORT;
		// public static MD5PASS:string = "8222b2020c704671b9c51d6fdcfe776c";
		// public static MaxPlayerCount:number = 3;//房间最大玩家数
		public static MaxPlayerCount:number = 4;//房间最大玩家数
		// public static MaxPlayerCount:number = 2;//房间最大玩家数
	}
}