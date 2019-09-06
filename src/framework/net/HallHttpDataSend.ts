module JAY {
	/**发送WEB请求*/
	export class HallHttpDataSend extends JAY.Single {
		/**
		 * 获取商品列表
		 * @goodType  商品类型(1:房卡类)
		 */
		// public static sendGetGoodsList(goodType: number = 1) {
		// 	var data = ProtocolHttp.GetGoodsList;
		// 	data.param.type = goodType;
		// 	App.httpSender.send(data, HallHttpDataReceive.revGoodsList, this);
		// }

		/**
		 * 购买道具
		 * @goodid    商品id
		 */
		// public static sendBuyProp(goodId: number = 1) {
		// 	var data = ProtocolHttp.BuyProp;
		// 	data.param.goodid = goodId;
		// 	App.httpSender.send(data, HallHttpDataReceive.revBuyProp, this);
		// }

		/**
		 * 获取邮件列表
		 */
		// public static sendGetEmailList() {
		// 	var data = ProtocolHttp.GetEmailList;
		// 	App.httpSender.send(data, HallHttpDataReceive.revEmailList, this);
		// }
		/**
		 * 获取邮件详情
		 * @eid 邮件ID
		 */
		// public static sendReadEmail(eid: number) {
		// 	var data = ProtocolHttp.ReadEmail;
		// 	data.param.id=eid;
		// 	App.httpSender.send(data, HallHttpDataReceive.revEmailDetail, this);
		// }

		/**
		 * 获取玩家信息
		 */
		// public static sendGetUserInfo() {
		// 	var data = ProtocolHttp.getUserInfo;
		// 	App.httpSender.send(data, HallHttpDataReceive.revUserInfo, this);
		// }

        
		/**
		 * 获取钻石和金币
		 */
		// public static sendGetDiamondAndGold()
		// {
		// 	var data = JAY.ProtocolHttp.getMoneyMsg;
		// 	App.httpSender.send(data, HallHttpDataReceive.revMoneyMsg, this);
		// }
		/**
		 * 获取取救济金信息
		 */
		// public static sendGetIncomeSupportMsg()
		// {
		// 	var data = ProtocolHttp.GetIncomeSupportMsg;
		// 	App.httpSender.send(data, HallHttpDataReceive.revIncomeSupportMsg, this);
		// }
		/**
		 * 领取救济金
		 */
		// public static sendGetIncomeSupport()
		// {
		// 	var data = ProtocolHttp.GetIncomeSupport;
		// 	App.httpSender.send(data, HallHttpDataReceive.revIncomeSupport, this);
		// }

	}
}