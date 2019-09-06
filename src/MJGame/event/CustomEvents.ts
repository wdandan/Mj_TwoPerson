/**
 * 客户端的消息事件(避免和socket的事件混淆，在此用字符串的形式)
 * @author lucywang
 * @date 2017/10/19
 */
module CustomEvents {
	export const OtherPlayer_EnterROOM:string = "otherPlayerEnterRoom";//其他玩家进入房间
	export const DealCard:string = "dealCard";//发牌
	export const DrawCard:string = "drawCard";//摸牌
	export const BuHua_DealCard:string = "buHuaDealCard";//发牌补花
	export const BuHua_GameCard:string = "buHuaGameCard";//发牌补花
	export const AllUsersReady:string = "allUsersReady";
	export const CanAct:string = "canAct";//可以进行什么操作
	export const ACT_Aleady:string = "actAleady";//服务器通知操作完成，UI进行更新
	export const ChangeCard:string = "changeCard";//测试的时候换牌操作
	export const CheckOut:string = "checkOut";//结算
	export const GameOver:string = "gameOver";//游戏结束
	export const OnArrow:string = "onArrow";//点击向上箭头区域
}