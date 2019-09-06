/**
 * CryptoUtils类,加密解密类
 * @author lucywang
 * @date 2017/10/19
 */
module CryptoUtils {
    export function AESEncrypt(toEncrypt: string, key: string) {
        var base64: string = _AESEncrypt(toEncrypt, key);
        return _base64ToArrayBuffer(base64);
    }


    export function AESDecrypt(word, pwd) {
        var base64: string = Base64Encode(String.fromCharCode.apply(null, new Uint8Array(word.buffer)));
        console.log("AESDecrypt base64:", base64);
        return _AESDecrypt(base64, pwd);
    }

    function _AESEncrypt(plaintext, pwd) {
        var key = CryptoJS.enc.Utf8.parse(pwd);
        // console.log("AESEncrypt key:",pwd,"plaintext:",plaintext);
        var encryptedData = CryptoJS.AES.encrypt(plaintext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var encryptedStr = encryptedData.toString();
        // console.log("AESEncrypt encryptedStr:",encryptedStr);
        return encryptedStr;
    }

    function _AESDecrypt(encryptedStr, pwd) {
        var key = CryptoJS.enc.Utf8.parse(pwd);
        var decryptedData = CryptoJS.AES.decrypt(encryptedStr, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedStr;
    }

    function _base64ToArrayBuffer(base64) {
        var binary_string = Base64Decode(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }

    function Base64Decode(origin: string): string {
        return new Base64().decode(origin);
    }

    function Base64Encode(origin: string): string {
        return new Base64().encode(origin);
    }
}