/**
 *  钉钉API
 */
import { ITask, IToken, ICrypto, IInstance, IMessage, IRegisterCallBack } from './interface';
declare class DDSdk {
    private appKey;
    private appSecret;
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
     * @param data IMessage {
     *    @param agent_id: number; // 应用agent_id,
     *    @param userid_list: string; // 可选(userid_list,dept_id_list, to_all_user必须有一个不能为空) 最大列表长度：100
     *    @param dept_id_list?: string; // 接收者的部门id列表， 最大长度20
     *    @param to_all_user?: boolean;  // 是否发送给企业全部用户
     *    @param msg: object;  // json对象
     * }
     * @param token access_token
     */
    setWorkerMessage(data: IMessage, token?: string): Promise<any>;
    /**
     * 查询工作通知消息的发送进度
     * @param data ITask {
     *    @param agent_id: number; // 应用agent_id,
     *    @param task_id: number; // 发送消息时钉钉返回的任务id
     * }
     * @param token access_token
     */
    viewWorkerMessage(data: ITask, token?: string): Promise<any>;
    /**
     * 查询工作通知消息的发送结果
     * @param data ITask {
     *   @param agent_id: number; // 应用agent_id,
     *   @param task_id: number; // 发送消息时钉钉返回的任务id
     * }
     * @param token access_token
     */
    resultWorkerMessage(data: ITask, token?: string): Promise<any>;
    /**
     * 创建一个审批实例
     * @param data IInstance {
     * @param  process_code: string; // 审批流的唯一码，process_code就在审批流编辑的页面URL中
     * @param  originator_user_id: string;  // 审批实例发起人的userid
     * @param  dept_id: number; // 发起人所在的部门，如果发起人属于根部门，传-1
     * @param  approvers: string; // 审批人userid列表，最大列表长度：20。
     * @param  form_component_values: any; // 审批流表单参数
     * }
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
     * @param data IRegisterCallBack{
     *    @param call_back_tag: string[]; 需要监听的事件类型
     *    @param token: 加解密需要用到的token;
     *    @param aes_key: 数据加密密钥。用于回调数据的加密，长度固定为43个字符，从a-z, A-Z, 0-9共62个字符中选取,您可以随机生成，ISV(服务提供商)推荐使用注册套件时填写的EncodingAESKey;
     *    @param url: 接收事件回调的url，必须是公网可以访问的url地址
     * }
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
     * 获取事件回调
     * @param token access_token
     */
    getCallBack(token?: string): Promise<any>;
    /**
     * 删除回调注册事件
     * @param token access_token
     */
    deleteCallBack(token?: string): Promise<any>;
}
/**
 * 授权登录
 * @param accessKey 扫码登录应用的appId
 * @param appSecret 扫码登录应用的appSecret
 * @param code 临时授权码
 */
export declare function authEncrypto(accessKey: string, appSecret: string, code: string): Promise<any>;
/**
 * 发送钉钉通知  消息类型 https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 * @param access_token
 * @param msg
 */
export declare function ddNotification(access_token: string, msg: any): Promise<any>;
export default DDSdk;
