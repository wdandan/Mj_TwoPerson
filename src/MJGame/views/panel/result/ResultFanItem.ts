module JAY {
    export class ResultFanItem extends eui.ItemRenderer {
        private nameLab:eui.Label;
        private fanLab:eui.Label;

        public constructor() {
			super();
			this.skinName = "Skin.ResultFanItemSkin";
		}
        
		protected dataChanged() {
			this.nameLab.text = this.data.name;
            this.fanLab.text = this.data.fan + "";
		}
    }
}