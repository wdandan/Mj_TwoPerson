/**
 * Socket协议类(只做协议的处理,不要处理UI，最好不要依赖其他的模块)
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
	export class Socket extends Single {
		private print_log: false;
		private _socket: egret.WebSocket;
		private _timerId: number;
		private _connectInterval: number = 4500;
		private _headSize: number = 12;
		private _successCallback: Function;
		private _errorCallback: Function;
		private _closeCallback: Function;
		private _funcObj: any;
		private getMessage:number;

		//为方便代码提示，加入此接口
		public static get Instance(): Socket {
			return this.getInstance();
		}

		/**
		 * 创建socket
		 */
		private _initWebSocket(): void {
			//创建 WebSocket 对象
			this._socket = new egret.WebSocket();
			//设置数据格式为二进制，默认为字符串
			this._socket.type = egret.WebSocket.TYPE_BINARY;
			//添加链接打开侦听，连接成功会调用此方法
			this._socket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
			//添加收到数据侦听，收到数据会调用此方法
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
			this._socket.addEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			//添加异常侦听，出现异常会调用此方法
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
		}

		/**
		 * 开始根据提供的url连接socket
		 * @param url  全地址。如ws://echo.websocket.org:80
		 */
		public startConnect(url: string, success?: Function, thisObject?: any, close?: Function, error?: Function) {
			egret.log("start connect " + url);

			this._successCallback = success;
			this._errorCallback = error;
			this._funcObj = thisObject;

			this._initWebSocket();
			this._socket.connectByUrl(url);
			this._timerId = egret.setTimeout(this.timeOutHandler, this, this._connectInterval);
		}

		/**
		 * 关闭socket
		 * 
		 */
		public closeSocket(): void {
			egret.clearTimeout(this._timerId);
			this._socket.removeEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._socket.connected && this._socket.close();
		}

		/**
     	 * 发送数据
         * @param data 	      待发送数据
         * @param mainID      主ID
         * @param AssistantID 辅ID
         */
		public sendData(mainID: number, obj?: any, AssistantID?: number) {
			let data=JSON.stringify(obj)
			if (this._socket && this._socket.connected) {
				console.log("Send: mainID = " + mainID + " data = " + data);
				//创建 ByteArray 对象
				// let byte: egret.ByteArray = this._EnvelopedMessage(data, mainID, AssistantID);
				// byte.endian = egret.Endian.LITTLE_ENDIAN;
				// byte.position = 0;
				// //发送数据
				// this._socket.writeBytes(byte, 0, byte.length);

				let sendDataByte: egret.ByteArray = new egret.ByteArray();
                // let sendJson = JSON.stringify(data)
                sendDataByte.writeUTFBytes(data)
                let size: number = this._headSize + sendDataByte.length;
                // let protoList = mainID.split("_");
                let head: egret.ByteArray = this.getHead(size, mainID);
                head.writeBytes(sendDataByte);
                this._socket.writeBytes(head);
                this._socket.flush();
                console.log("send:", mainID, data);
			} else {
				egret.log("socket is not connected");
			}
		}
		/**
         * 消息头部
         * @param size 数据长度
         * @param id1 
         * @param id2
         */
        private getHead(size, id1): egret.ByteArray {
            var a: egret.ByteArray = new egret.ByteArray();
            a.endian = egret.Endian.LITTLE_ENDIAN;
            a.writeInt(size);
            a.writeInt(id1);
            a.writeInt(0);
            return a;
        }

		/**是否已连接*/
		public isConnected() {
			if (this._socket && this._socket.connected) {
				return true;
			}
			return false;
		}

		/**
		 * 连接超时
		 */
		private timeOutHandler() {
			if (!this._socket.connected) {
				egret.log("connect time out!");
				this.closeSocket();
			}
		}

		/**
		 * 连接成功回调
		 */
		private _onSocketOpen(event: egret.Event): void {
			egret.log("connect successed");
			egret.clearTimeout(this._timerId);
			this._successCallback && this._successCallback.call(this._funcObj);
		}

		/**
		 * 关闭连接回调
	 	 * 
	 	 */
		private _onSocketClose(event: egret.Event): void {
			egret.log("onSocketClose");
			this._closeCallback && this._closeCallback.call(this._funcObj);
		}

		/**
		 * 连接错误回调
		 * 
		 */
		private _onSocketError(event: egret.IOErrorEvent): void {
			egret.log("_onSocketError");
			this._errorCallback && this._errorCallback.call(this._funcObj);
		}

		/**
		 * 接收数据回调
		 * @param e 事件
		 */
		private _onReceiveMessage(event: egret.ProgressEvent): void {
			// //创建 ByteArray 对象
			// let byte: egret.ByteArray = new egret.ByteArray();
			// //读取数据
			// this._socket.readBytes(byte);
			// this._parseMessage(byte);
			console.log("socket _onReceiveMessage()")

			this.getMessage = 0;
            var b: egret.ByteArray = new egret.ByteArray();
            b.endian = egret.Endian.LITTLE_ENDIAN;
            this._socket.readBytes(b);
            this.process(b);
		}

		/**
		 * 解析数据
		 * @param byte 待解析的数据
		 */
		private _parseMessage(byte: egret.ByteArray): void {
			


			// byte.endian = egret.Endian.LITTLE_ENDIAN;
			// var len: number = byte.readInt();
			// var mainID: number = byte.readInt();
			// var AssistantID: number = byte.readInt();

			// let dataByte: egret.ByteArray = new egret.ByteArray();
			// byte.readBytes(dataByte, 0, len - this._headSize);

			// let dataDes = CryptoUtils.AESDecrypt(dataByte, JAY.AESKEY);
			// console.log("Receive: mainID = " + mainID + " data = " + dataDes);

			// EventManager.getInstance().dispatchCustomEvent(mainID.toString(), dataDes);
		}

		/**
         * 解析数据
         * @param b 待解析数据
         */
        private process(b: egret.ByteArray): void {
            var size = b.readInt();
            if (size != b.length) {
                console.error("data error!!")
                return
            }
            var id1 = b.readInt();
            var reserve2 = b.readInt();
            var str = b.readUTFBytes(b.length - this._headSize);
            var data;
            if ("" != str) {
                data = JSON.parse(str);
            }
			console.log("rev:", id1.toString(), data);
			EventManager.getInstance().dispatchCustomEvent(id1.toString(), data);
        }

		/**
		 * 封装数据
		 * @param byte 待封装的数据
		 */
		private _EnvelopedMessage(data: string, mainID: number, AssistantID: number = 0): egret.ByteArray {
			let msgBytes = CryptoUtils.AESEncrypt(data, JAY.AESKEY);
			let body: egret.ByteArray = new egret.ByteArray();
			body.endian = egret.Endian.LITTLE_ENDIAN;
			//写入数据
			// body.writeUTFBytes(data);
			for (var i = 0; i < msgBytes.length; i++) {
				body.writeByte(msgBytes[i]);
			}

			let byte: egret.ByteArray = new egret.ByteArray();
			byte.endian = egret.Endian.LITTLE_ENDIAN;

			let len = this._headSize + body.length;
			byte.writeInt(len);
			//写入主命令
			byte.writeInt(mainID);
			//写入辅命令
			byte.writeInt(AssistantID);
			byte.writeBytes(body, 0, len);
			return byte;
		}
	}
}