/**
 * 提示(待优化)
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Tips extends Single{
		private _pool:Array<TipItem>;
		private _queue:Array<number>;
		private _layer:egret.DisplayObjectContainer;

		//为方便提示，加入此接口
        public static get Instance(): Tips {
            return this.getInstance();
        }
		
		public setLayer(layer:egret.DisplayObjectContainer):void{
			this._layer = layer;
			this._pool = [];
			this._queue = [];

		}

		public static show(msg:string):void{
			Tips.Instance._initView(msg);
		}

		private _initView(msg:string):void{
			let item:TipItem = this._pool.length > 0 ? this._pool.pop() : new TipItem;
			item.text = msg;
			item.alpha = 0;
			item.x = (this._layer.stage.stageHeight)/2;
			var ty:number = this._layer.stage.stageHeight/2 - 200;
			item.y = ty;
			item.scaleX = item.scaleY = 1.2;
			this._layer.addChild(item);
			let time:number = this._pool.length > 0 ? 1500:0;
			this._queue.push(1);
			egret.Tween.get(item).wait(time).to({y:ty-100,alpha:1,scaleX:1,scaleY:1},500,egret.Ease.quadOut)
								 .wait(1500).to({y:ty-180,alpha:0},500,egret.Ease.quadIn).call((target)=>{
									 this._layer.removeChild(target);
									 this._pool.push(target);
									 this._queue.pop();
								 },this,[item])
		}
	}
	
	class TipItem extends egret.Sprite{
		private _txt:egret.TextField;
		private _bg:egret.Texture;
		public constructor(){
			super();
			this._init();
		}

		private _init(){
			this.width = egret.MainContext.instance.stage.width * 0.6;
			this._txt = new egret.TextField();
			this._txt.size = 26;
			this._txt.bold = true;
			this._txt.textColor = 0xffffff;
			this._txt.multiline = true;
			this._txt.wordWrap = true;
			this._txt.textAlign = egret.HorizontalAlign.CENTER;
			this._txt.width = egret.MainContext.instance.stage.width*0.5;
			this._txt.y = 10;
			this.addChild(this._txt);

		}

		public set text(v:string){
			this._txt.text = v;
			this.anchorOffsetX = this.width/2;
			this.anchorOffsetY = this.height/2;
			this.graphics.clear();
			this.graphics.beginFill(0x000000,0.8);
			this.graphics.drawRoundRect(0,0,this._txt.width,this.height + 20,30,30);
			this._txt.x = (this.width - this._txt.width)/2;
		}
	}
}