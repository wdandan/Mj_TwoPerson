/**
 * 加入房间层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class JoinRoom extends Layer {
		protected _ctrl: JoinRoomController;
		private closeButton: eui.Button;
		private group_label_number: eui.Group;
		private group_number_btn: eui.Group;
		private label_roomNo:eui.BitmapLabel;

		/**按钮列表 */
		private _numberBtns: Array<eui.Button> = [];

		public constructor() {
			super();
			this.skinName = "Skin.JoinRoom";
		}

		protected init(): void {
			super.init();
			this.label_roomNo.text = "";
			//初始化button
			for (var i = 0; i < 12; i++) {
				this._numberBtns.push(<eui.Button>this.group_number_btn.getChildAt(i));
			}

		}

		protected setOnTouchListener() {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			this.group_number_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);

		}

		protected removeOnTouchListener() {
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			this.group_number_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				
			];
		}

		private _onCloseClick() {
			this.parent.removeChild(this);
		}


		/**软键盘点击响应 */
		private _onNumberBtnClick(e: egret.TouchEvent) {
			for (var i = 0; i < this._numberBtns.length; i++) {
				if (e.target == this._numberBtns[i]) {
					this._changeRoomNumber(i);
				}
			}
		}

		private _changeRoomNumber(id:number):void{
			if(id < 10){//数字
				if(this.label_roomNo.text.length >= 6){
					console.log("房间号只能为6位数");
					return;
				}
				this.label_roomNo.text = this.label_roomNo.text + id.toString();
				// console.log(this.label_roomNo.text.length);	
			}else if(id == 10){//删除
				let txt = this.label_roomNo.text;
				txt = txt.substr(0,txt.length-1);
				this.label_roomNo.text = txt;
			}else if(id == 11){//确定
				if(this.label_roomNo.text.length != 6){
					console.log("房间号不存在");	
				}else{
					this._ctrl.joinFriendRoom(Number(this.label_roomNo.text));
				}
			}
		}
	}
}