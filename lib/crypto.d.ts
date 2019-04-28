/**
 * 加解密信息构造函数
 *
 * @param {String} token          第三方企业E应用平台上，开发者设置的Token
 * @param {String} encodingAESKey 第三方企业E应用平台上，开发者设置的EncodingAESKey
 * @param {String} id             对于ISV来说，填写对应的suitekey； 对于普通企业开发，填写企业的Corpid
 */
declare function DDBizMsgCrypt(token: any, encodingAESKey: any, id: any): void;
export default DDBizMsgCrypt;
