module JAY {
    /**
     * 单个场的相关配置
     */
    export class RoomData {
        /**房间类型，0初级场,1中级场,2高级场 */
        public roomType: number;
        /**房间名 */
        public roomName: string;
        /**最小进入金币 */
        public minEnterGold: number;
        /**最大进入金币 */
        public maxEnterGold: number;
        /**玩牌下限 */
        public minPlayGold: number;
        /**推荐支付金额 */
        public recommendPayNum: number;
        /**动作操作时间 */
        public outCardTime: number;
        /**台费 */
        public serviceCharge: number;
        /**底注 */
        public baseBet: number;
        /**最小胡牌番数 */
        public minHuFan: number;
        /**最大胡牌番数 */
        public maxHuFan: number;
        /**特殊规则 */
        public specialRule: any;
        /**该场次当前人数 */
        public curPlayerCount: number;

        /**初始化数据 */
        public initData(data: any) {
            this.roomType = data.room_type;
            this.roomName = data.name;
            this.minEnterGold = data.min_enter_gold;
            this.maxEnterGold = data.max_enter_gold;
            this.minPlayGold = data.min_play_gold;
            this.recommendPayNum = data.recommend_pay_num;
            this.outCardTime = data.draw_card_time;
            this.serviceCharge = data.service_charge;
            this.baseBet = data.base_bet;
            this.minHuFan = data.min_hu_fan;
            this.maxHuFan = data.max_hu_fan;
            this.specialRule = data.special_rule;
            this.curPlayerCount = data.cur_player_count;
        }
    }

    /**房间场类型 */
    export enum RoomType {
        noob,
        middle,
        high
    }
}