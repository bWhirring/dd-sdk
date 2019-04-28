/**
 *  钉钉API
 */
import { ITask, IToken, ICrypto, IInstance, IMessage, IRegisterCallBack } from './interface';
declare class DDSdk {
    private appKey;
    private appSecret;
    private oapi;
    /**
     * 实例化小程序
     * @param appKey 小程序appKey
     * @param appSecret 小程序appSecret
     */
    constructor(appKey: string, appSecret: string);
    /**
     * 获取access_token 【注意】正常情况下access_token有效期为7200秒，有效期内重复获取返回相同结果，并自动续期。
     */
    getAccessToken(): Promise<IToken>;
    /**
     * 判断传参是否有access_token, 没有的话重新获取
     * @param token access_token
     */
    private getToken;
    /**
     * 获取用户ID
     * @param code 用户授权码
     * @param token access_token
     */
    getUserId(code: string, token?: string): Promise<any>;
    /**
     * 获取用户信息
     * @param userid 用户id
     * @param token access_token
     */
    getUser(userid: string, token?: string): Promise<any>;
    /**
     * 获取子部门列表
     * @param id 父部门id。根部门的话传1
     * @param token access_token
     */
    childDepartment(id: number, token?: string): Promise<any>;
    /**
     * 获取部门列表
     * @param id 父部门id（如果不传，默认部门为根部门，根部门ID为1）
     * @param token access_token
     */
    department(id: number, token?: string): Promise<any>;
    /**
     * 获取部门信息
     * @param id 部门ID
     * @param token access_token
     */
    departmentInfo(id: number, token?: string): Promise<any>;
    /**
     * 查询部门的所有上级父部门路径
     * @param id 希望查询的部门的id，包含查询的部门本身
     * @param token access_token
     */
    getAllDepartment(id: number, token?: string): Promise<any>;
    /**
     * 查询指定用户的所有上级父部门路径
     * @param userId 希望查询的用户的id
     * @param token access_token
     */
    departmentListParentDepts(userId: string, token?: string): Promise<any>;
    /**
     * 获取企业员工人数
     * @param onlyActive 0：包含未激活钉钉的人员数量 1：不包含未激活钉钉的人员数量
     * @param token access_token
     */
    getOrgUserCount(onlyActive: number, token?: string): Promise<any>;
    /**
     * 发送工作消息
     * @param data IMessage
     * @param token access_token
     */
    setWorkerMessage(data: IMessage, token?: string): Promise<any>;
    /**
     * 查询工作通知消息的发送进度
     * @param data ITask
     * @param token access_token
     */
    viewWorkerMessage(data: ITask, token?: string): Promise<any>;
    /**
     * 查询工作通知消息的发送结果
     * @param data ITask
     * @param token access_token
     */
    resultWorkerMessage(data: ITask, token?: string): Promise<any>;
    /**
     * 创建一个审批实例
     * @param data
     * @param token access_token
     */
    createProcessInstance(data: IInstance, token?: string): Promise<any>;
    /**
     * 获取审批实例
     * @param id 审批实例ID
     * @param token access_token
     */
    getProcessInstance(id: string, token?: string): Promise<any>;
    /**
     * 注册审批回调
     * @param data
     * call_back_tag: string[]; 需要监听的事件类型
     * token: 加解密需要用到的token;
     * aes_key: 数据加密密钥。用于回调数据的加密，长度固定为43个字符，从a-z, A-Z, 0-9共62个字符中选取,您可以随机生成，ISV(服务提供商)推荐使用注册套件时填写的EncodingAESKey;
     * url: 接收事件回调的url，必须是公网可以访问的url地址
     * @param token
     */
    registerCallBack(data: IRegisterCallBack, token?: string): Promise<any>;
    /**
     * 实例化crypto
     * @param token
     * @param encodingAESKey
     * @param CorpId
     */
    instanceCrypto(data: ICrypto): {
        userid: string;
        msg_signature: any;
        timeStamp: number;
        nonce: string;
        encrypt: any;
    };
    /**
     * 获取时间回调
     * @param token access_token
     */
    getCallBack(token?: string): Promise<any>;
    /**
     * 删除回调注册事件
     * @param token access_token
     */
    deleteCallBack(token?: string): Promise<any>;
}
export default DDSdk;
