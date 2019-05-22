/**
 *  钉钉API
 */

import axios from 'axios';
import * as colors from 'colors';
import * as crypto from 'crypto';
import DDCrypto from './crypto';
import {
  ITask,
  IToken,
  ICrypto,
  IInstance,
  IMessage,
  IRegisterCallBack
} from './interface';

const { log } = console;

const OAPI = 'https://oapi.dingtalk.com';

class DDSdk {
  private appKey: string;
  private appSecret: string;
  /**
   * 实例化小程序
   * @param appKey 小程序appKey
   * @param appSecret 小程序appSecret
   */
  constructor(appKey: string, appSecret: string) {
    this.appKey = appKey;
    this.appSecret = appSecret;
  }

  /**
   * 获取access_token 【注意】正常情况下access_token有效期为7200秒，有效期内重复获取返回相同结果，并自动续期。
   */
  async getAccessToken(): Promise<IToken> {
    log(colors.green(`===========获取access_token`));
    const { appKey, appSecret } = this;
    const { data } = await axios(
      `${OAPI}/gettoken?appkey=${appKey}&appsecret=${appSecret}`
    );
    return data;
  }

  /**
   * 判断传参是否有access_token, 没有的话重新获取
   * @param token access_token
   */
  private async getToken(token: string) {
    if (!token) {
      const { access_token } = await this.getAccessToken();
      token = access_token;
    }
    return token;
  }

  /**
   * 获取用户ID
   * @param code 用户授权码
   * @param token access_token
   */
  async getUserId(code: string, token?: string) {
    log(colors.green(`===========获取用户ID`));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/user/getuserinfo?access_token=${token}&code=${code}`
    );
    return data;
  }

  /**
   * 获取用户信息
   * @param userid 用户id
   * @param token access_token
   */
  async getUser(userid: string, token?: string) {
    log(colors.green(`===========获取用户信息`));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/user/get?access_token=${token}&userid=${userid}`
    );
    return data;
  }

  /**
   * 获取子部门列表
   * @param id 父部门id。根部门的话传1
   * @param token access_token
   */
  async childDepartment(id: number, token?: string) {
    log(colors.green(`==========获取子部门列表`));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/department/list_ids?access_token=${token}&id=${id}`
    );
    return data;
  }

  /**
   * 获取部门列表
   * @param id 父部门id（如果不传，默认部门为根部门，根部门ID为1）
   * @param token access_token
   */
  async department(id: number, token?: string) {
    log(colors.green(`==========获取部门列表`));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/department/list?access_token=${token}&id=${id}`
    );
    return data;
  }

  /**
   * 获取部门信息
   * @param id 部门ID
   * @param token access_token
   */
  async departmentInfo(id: number, token?: string) {
    log(colors.green(`==========获取部门列表`));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/department/get?access_token=${token}&id=${id}`
    );
    return data;
  }

  /**
   * 查询部门的所有上级父部门路径
   * @param id 希望查询的部门的id，包含查询的部门本身
   * @param token access_token
   */
  async getAllDepartment(id: number, token?: string) {
    log(colors.green('===========查询部门的所有上级父部门路径'));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/department/list_parent_depts_by_dept?access_token=${token}&id=${id}`
    );
    return data;
  }

  /**
   * 查询指定用户的所有上级父部门路径
   * @param userId 希望查询的用户的id
   * @param token access_token
   */
  async departmentListParentDepts(userId: string, token?: string) {
    log(colors.green('===========查询指定用户的所有上级父部门路径'));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/department/list_parent_depts?access_token=${token}&userId=${userId}`
    );
    return data;
  }

  /**
   * 获取企业员工人数
   * @param onlyActive 0：包含未激活钉钉的人员数量 1：不包含未激活钉钉的人员数量
   * @param token access_token
   */
  async getOrgUserCount(onlyActive: number, token?: string) {
    log(colors.green('===========获取企业员工人数'));
    token = token || (await this.getToken(token));
    const { data } = await axios(
      `${OAPI}/user/get_org_user_count?access_token=${token}&onlyActive=${onlyActive}`
    );
    return data;
  }

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
  async setWorkerMessage(data: IMessage, token?: string) {
    log(colors.green('===========发送工作通知消息'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `${OAPI}/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`,
      data,
      method: 'POST'
    });
    return res.data;
  }

  /**
   * 查询工作通知消息的发送进度
   * @param data ITask {
   *    @param agent_id: number; // 应用agent_id,
   *    @param task_id: number; // 发送消息时钉钉返回的任务id
   * }
   * @param token access_token
   */
  async viewWorkerMessage(data: ITask, token?: string) {
    log(colors.green('===========查询工作通知消息的发送进度'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `${OAPI}/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`,
      data,
      method: 'POST'
    });
    return res.data;
  }

  /**
   * 查询工作通知消息的发送结果
   * @param data ITask {
   *   @param agent_id: number; // 应用agent_id,
   *   @param task_id: number; // 发送消息时钉钉返回的任务id
   * }
   * @param token access_token
   */
  async resultWorkerMessage(data: ITask, token?: string) {
    log(colors.green('===========查询工作通知消息的发送结果'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `${OAPI}/topapi/message/corpconversation/getsendresult?access_token=${token}`,
      data,
      method: 'POST'
    });
    return res.data;
  }

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
  async createProcessInstance(data: IInstance, token?: string) {
    token = token || (await this.getToken(token));
    const res = await axios.post(
      `${OAPI}/topapi/processinstance/create?access_token=${token}`,
      data
    );
    return res.data;
  }

  /**
   * 获取审批实例
   * @param id 审批实例ID
   * @param token access_token
   */
  async getProcessInstance(id: string, token?: string) {
    log(colors.green('===========获取审批实例'));
    token = token || (await this.getToken(token));
    const instance = await axios.post(
      `${OAPI}/topapi/processinstance/get?access_token=${token}`,
      {
        process_instance_id: id
      }
    );
    return instance.data;
  }

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
  async registerCallBack(data: IRegisterCallBack, token?: string) {
    log(colors.green('===========获取审批实例'));
    token = token || (await this.getToken(token));
    const res = await axios.post(
      `${OAPI}/call_back/register_call_back?access_token=${token}`,
      data
    );
    return res.data;
  }

  /**
   * 实例化crypto
   * @param token
   * @param encodingAESKey
   * @param CorpId
   */
  instanceCrypto(data: ICrypto) {
    const { token, encodingAESKey, CorpId, timestamp, nonce, userid } = data;
    // tslint disabled-next-line
    const Cipher: any = new DDCrypto(token, encodingAESKey, CorpId);
    const text = Cipher.encrypt('success');
    // 签名文本
    const sign = Cipher.getSignature(timestamp, nonce, text);
    const result = {
      userid,
      msg_signature: sign,
      timeStamp: timestamp,
      nonce,
      encrypt: text
    };
    return result;
  }

  /**
   * 获取事件回调
   * @param token access_token
   */
  async getCallBack(token?: string) {
    log(colors.green('===========查询工作通知消息的发送结果'));
    token = token || (await this.getToken(token));
    const res = await axios(
      `${OAPI}/call_back/get_call_back?access_token=${token}`
    );
    return res.data;
  }

  /**
   * 删除回调注册事件
   * @param token access_token
   */
  async deleteCallBack(token?: string) {
    log(colors.green('=========删除回调注册事件'));
    token = token || (await this.getToken(token));
    const res = await axios(
      `${OAPI}/call_back/delete_call_back?access_token=${token}`
    );
    return res.data;
  }
}

/**
 * 授权登录
 * @param accessKey 扫码登录应用的appId
 * @param appSecret 扫码登录应用的appSecret
 * @param code 临时授权码
 */
export async function authEncrypto(accessKey: string, appSecret: string, code: string) {
  const timestamp = +new Date();
  let signature = crypto
    .createHmac('sha256', appSecret)
    .update(`${timestamp}`)
    .digest()
    .toString('base64');
  signature = encodeURIComponent(signature);

  const URL = `${OAPI}/sns/getuserinfo_bycode?accessKey=${accessKey}&timestamp=${timestamp}&signature=${signature}`;
  const res = await axios.post(URL, {
    tmp_auth_code: code
  });
  return res.data;
}

export default DDSdk;
