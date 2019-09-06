/**
 * 加载层
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
    export class LoadingLayer extends Layer {
        private pgBg: egret.Bitmap;
        private pgBar: egret.Bitmap;
        private textField: egret.TextField;
        private bg: egret.Bitmap;
        private w: number = 0;
        private h: number = 0;

        public constructor() {
            super();
        }

        protected init(): void {
            super.init();

            // this.width = this.width/2;
            this.w = this.width;
            this.h = this.height;

            this.anchorOffsetX = this.w / 2;
            this.horizontalCenter = 0;
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes("PreLoadingBg_png");
            this.bg.width = this.w;
            this.bg.height = this.h;
            this.addChild(this.bg);

            this.pgBg = new egret.Bitmap;
            this.pgBg.texture = RES.getRes("PreLoadingBarBg_png");
            this.pgBg.x = this.w / 2 - this.pgBg.width / 2;
            this.pgBg.y = this.h - this.pgBg.height - 50;
            this.addChild(this.pgBg);

            this.pgBar = new egret.Bitmap;
            this.pgBar.texture = RES.getRes("PreLoadingBar_png");
            this.pgBar.x = this.w / 2 - this.pgBar.width / 2;
            this.pgBar.y = this.pgBg.y + 20;
            this.addChild(this.pgBar);

            this.textField = new egret.TextField();
            this.textField.size = 24;
            this.textField.textColor = 0xFFFFFF;
            this.textField.bold = true;
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.addChild(this.textField);
            this.textField.width = 100;
            this.textField.x = this.w / 2 - this.textField.width / 2;
            this.textField.y = this.pgBg.y + 20;
            this.textField.textAlign = "center";
            this.textField.text = "0%";

            this.pgBar.width = 0;
        }

        /**
         * 进度条
         */
        // public progressBar:egret.gui.ProgressBar;

        public setProgress(current: number, total: number): void {
            // if(this.progressBar)
            // {
            //     this.progressBar.maximum = total;
            //     this.progressBar.value = current;
            // }
            var rate: number = Math.round((current / total) * 100);
            this.textField.text = rate + "%";
            this.pgBar.width = 641 * (current / total);
        }

        protected setOnTouchListener() {
            
        }

        protected removeOnTouchListener() {

        }

        protected registerCustomEvents() {
            this.UIEventList = [
                
            ];
        }

      
    }
}