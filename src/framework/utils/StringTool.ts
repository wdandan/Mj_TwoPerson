module JAY {
	export class StringTool {
		/**
		 * 删除左右两端的空格.   " abc " - > "abc"
		 * @str 待处理字符串
		 * @return 处理后字符串
		 */
		public static trim(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}

		/**
		 * 将字符串截取到指定字符数，多余的用"..."表示
		 * @str 昵称字符串
		 * @charMax 字符限制(中文、大写字母占2， 其余占1)
		 */
		public static formatNickName(str: string, charMax: number = 10) {
			if (!str) {
				// console.error("nickname error");
				return;
			}
			var msg= this.getStrLength(str,charMax);
			var len = msg[0];
			if (len > charMax) {
				return str.substr(0,  msg[1])+ "...";
			}
			return str;
		}

		/**
		 * 获取字符串长度，中文、大写字母占2， 其他占1 (Egret中文英文字符都是占1)
		 * @str 字符串
		 * @reutrn 长度
		 */
		public static getStrLength(str: string,charMax:number=10):number[] {
			var len = 0;
			var charCode = 0;
			var count = 0;
			for (var i = 0; i < str.length; i++) {
				charCode = str.charCodeAt(i);
				if (charCode > 127 || (charCode >= 65 && charCode <= 90)) {
					len += 2;
					if(len<=charMax)
					count++;
				} else {
					len++;
					if(len<=charMax)
					count++;
				}
			}
			return [len,count];
		}
	}
}