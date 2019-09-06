module JAY {
	export class NumberTool {
		/**
		 * 将数字格式化为时间数字, 例 5 -> "05"
		 * @param num 待格式化数字
		 * @returns 格式化后的数字字符串
		 */
		public static formatTime(num: number): string {
			if (num >= 0 && num < 10) {
				return "0" + num;
			} else {
				return num + "";
			}
		}

		/**
		 * 获取随机整数   getRandInt(1,5) 返回1,2...5任意整数
		 * @start 起始数
		 * @end  终止数
		 * @return 随机值
		 */
		public static getRandInt(start: number, end: number): number {
			return (Math.round(Math.random() * (end - start)) + start);
		}

		/**
		 * 获取数字1~9对应的"一"~"九"
		 * @num 阿拉伯数字
		 * @return 大写数字
		 */
		public static formatCapital(num: number): string {
			if (num <= 0 || num >= 10) {
				return "";
			}
			return (["一", "二", "三", "四", "五", "六", "七", "八", "九"])[num - 1];
		}

		/**
		 * 当数字超过10万时，将数字进行转换。例如10万的金币，"117315"转换成"11.73万"。
		 * @num 待转换数字
		 * @types 1万以上 2千以上
		 * @return 转换结果
		 */
		public static formatMoney(num: number,types:number=1): string {
			var retStr = "";
			if (num >= 1000 && num < 9999) {
				if(types==2)
				retStr = (num / 1000).toFixed(0) + "千";
				else
				retStr=num+"";
			}
			if (num >= 10000 && num < 99999) {
				if (num%10000==0) retStr = (num / 10000).toFixed(0) + "万";
				else
					retStr = (num / 10000).toFixed(3) + "万";
			}
			if (num >= 100000 && num < 999999) {
				if (num%100000==0) retStr = (num / 10000).toFixed(0) + "万";
				else
					retStr = (num / 10000).toFixed(2) + "万";
			}
			if (num >= 1000000 && num < 9999999) {
				if (num%1000000==0) retStr = (num / 10000).toFixed(0) + "万";
				else
					retStr = (num / 10000).toFixed(1) + "万";
			}
			if (num >= 10000000 && num < 99999999) {
				if (num%10000000==0) retStr = (num / 10000).toFixed(0) + "万";
				else
					retStr = (num / 10000).toFixed(0) + "万";
			}
			if (num >= 100000000 && num < 999999999) {
				if (num%100000000==0) retStr = (num / 100000000).toFixed(0) + "亿";
				else
					retStr = (num / 100000000).toFixed(3) + "亿";
			}
			if (num >= 1000000000 && num < 9999999999) {
				if (num%1000000000==0) retStr = (num / 100000000).toFixed(0) + "亿";
				else
					retStr = (num / 100000000).toFixed(2) + "亿";
			}
			if (num >= 10000000000 && num < 99999999999) {
				if (num%10000000000==0) retStr = (num / 100000000).toFixed(0) + "亿";
				else
					retStr = (num / 100000000).toFixed(1) + "亿";
			}
			return retStr;
		}
		/**
          * 将数字装换成千位符分割的格式。
          * @num 待转换数字
          * @return 转换结果
          */
		public static sperateMoney(num: number): string {
			var srcStr = num.toString();
			var slen = srcStr.length;
			var count = 0;
			var resultStr = "";
			for (var i = slen - 1; i >= 0; i--) {
				resultStr = resultStr.concat(srcStr[i]);
				count++;
				if (count % 3 == 0) {
					resultStr = resultStr.concat(",");
				}
			}
			var rlen = resultStr.length;
			var retStr = "";
			for (var i = rlen - 1; i >= 0; i--) {
				retStr = retStr.concat(resultStr[i]);
			}
			if(retStr[0]==",") retStr=retStr.substr(1,rlen-1);
			return retStr;
		}

		/**
		 * 大厅和头像处金币显示规则
		 */
		public static formatGoldHead(num: number): string {
			if (num == 0) {
				return "0";
			}
			var goldText = "";
			var unitText = "";
			if (num >= 100000000){
				unitText = "亿";
				goldText = (num/100000000).toFixed(4) + "";
			}
			else if (num >= 10000) {
				unitText = "万";
				goldText = (num/10000).toFixed(4) + "";
			}
			else {
				goldText = num + "";
				return goldText;
			}
			goldText = goldText.substr(0, 5);
			if (goldText.substr(4, 1) == ".") {
				goldText = goldText.substr(0, 4);
			}
			for (var i = 0;i < goldText.length;i ++) {
				if (goldText.substr(goldText.length-1, 1) == "0") {
					goldText = goldText.substr(0, goldText.length-2);
				}
				else {
					break;
				}
			}

			goldText = goldText + unitText;

			return goldText;
		}
	}
}
