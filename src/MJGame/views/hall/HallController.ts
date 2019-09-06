// module JAY {
//     export class HallController extends BaseController {
//         /**控制模块名*/
//         public static NAME: string = "HallController";

//         /**绑定的Scene */
//         private get hallScene():HallScene {
//             return App.SceneManager.getScene(SceneConst.HallScene);
//         }

//         public constructor() {
//             super();
//         }

//         /**对应场景添加到显示列表时调用 */
//         public onRegister() {
//             var gameSocket: ClientSocket = App.gameSocket;
//             gameSocket.register(ProtocolHeadRev.R_100104, this.revQuickBegin, this);
//             gameSocket.register(ProtocolHeadRev.R_100105, this.revQuickBegin, this);
//         }

//         /**对应场景从显示列表移除是调用 */
//         public onRemove() {
            
//         }

//         /**选择房间发送 */
//         public sendChooseRoom(type: RoomType) {
//             var data = ProtocolDataSend.S_100105;
//             data.user_id = App.DataCenter.UserInfo.myUserUid;
//             data.room_type = type;
//             App.gameSocket.send(ProtocolHeadSend.S_100105, data);
//         }


//         /**快速开始发送 */
//         public sendQuickBegin() {
//             var data = ProtocolDataSend.S_100104;
//             data.user_id = App.DataCenter.UserInfo.myUserUid;
//             App.gameSocket.send(ProtocolHeadSend.S_100104, data);
//         }

//         /**快速开始返回处理, 选择房间返回处理 */
//         private revQuickBegin(data) {
//             if (data.code == 200) {
//                 var revData = ProtocolDataRev.R_100104;
//                 revData = data;

//                 App.DataCenter.runingData.curentRoomType = revData.info.room_type;

//                 // 更新用户信息
//                 for(var key in revData.info.seat_info) {
//                     if(revData.info.seat_info[key].user_id == App.DataCenter.UserInfo.myUserUid) {
//                         App.DataCenter.UserInfo.myUserInfo.seatID = revData.info.seat_info[key].seat_id;
//                         App.DataCenter.UserInfo.myUserInfo.gold = revData.info.seat_info[key].point;
//                     }
//                     else {
//                         var user = new UserVO();
//                         user.initUserFromSocket(revData.info.seat_info[key]);
//                         App.DataCenter.UserInfo.addUser(user);
//                     }
//                 }

//                 // 进入牌局
//                 var scene:GameScene =  <GameScene>App.SceneManager.runScene(SceneConst.GameScene, App.getController(GameController.NAME));
//                 scene.intoRoom();
//             }
//             else {
//                 Tips.showTop(data.desc)
//             }
//         }

//         /**发送解散房间*测试 */
//         public sendJieSanTest() {
//             var data = ProtocolDataSend.S_100112;
//             data.user_id = App.DataCenter.UserInfo.myUserUid;
//             App.gameSocket.send(ProtocolHeadSend.S_100112, data);
//         }

//         /**获取房间信息*/
//         public sendRoomNum() {
//             var httpsend = new HttpSender();
//             var dataS = ProtocolHttp.getRoomNum;
//             httpsend.sendTest(dataS, this.revRoomNum, this);
//         }

//         private revRoomNum(data) {
//             if (data.ret) {
//                 data.desc ? Tips.showTop(data.desc):Tips.showTop("获取房间人数失败");
//                 return;
//             }

//             App.DataCenter.roomInfo.reRoomNum(data.data.room_people_count);
//             this.hallScene.roomMod.reRoomNum(App.DataCenter.roomInfo.roomList);
//         }
//     }
// }