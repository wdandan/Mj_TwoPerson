/**
 * 用户头像UI(组件都继承自component)
 * 组件只提供接口不处理协议，由数据来驱动组件的视图变化
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class UserHead extends eui.Component {
		private label_Name: eui.Label;
		private label_ready:eui.Label;
		private _userModel: User;
		private img_banker:eui.Image;


		public constructor() {
			super();
			this.skinName = "Skin.UserHead";
		}

		private _watchData(){
			eui.Binding.bindHandler(this._userModel, ["user_id"], this._userNameChange, this);
			eui.Binding.bindHandler(this._userModel, ["isBanker"], this._userIsBankerChange, this);
			eui.Binding.bindHandler(this._userModel, ["status"], this._userIsReadyChange, this);
		}

		private _userNameChange(value:any){
			if(!value) return;
			console.log(`_userNameChange`);
			this.label_Name.text = value || "";
			
		}

		private _userIsBankerChange(value:any){
			if(!value) return;
			console.log(`_userIsBankerChange`);
			this.img_banker.visible  = value;
		}

		private _userIsReadyChange(value:any){
			if(!value) return;
			console.log(`_userIsReadyChange`);
			this.label_ready.visible = (value == JAY.ReadyState.READY)? true : false;
		}

		/**
		 * 设置其数据模型
		*/
		public set UserModel(user:User){
			this._userModel = user; //绑定数据模型后，对其观察，不同值的变化驱动UI变化
			this._watchData();
		}


	}
}