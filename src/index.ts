/**
 *  钉钉API
 */

import axios from 'axios';
import * as colors from 'colors';
import DDCrypto from './crypto';
import { ITask, IToken, ICrypto, IInstance, IMessage, IRegisterCallBack } from './interface';

const { log } = console;

class DDSdk {
  private appKey: string;
  private appSecret: string;
  private oapi: string = 'https://oapi.dingtalk.com';
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
    const { appKey, appSecret, oapi } = this;
    const { data } = await axios(
      `${oapi}/gettoken?appkey=${appKey}&appsecret=${appSecret}`
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
      `${this.oapi}/user/getuserinfo?access_token=${token}&code=${code}`
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
      `${this.oapi}/user/get?access_token=${token}&userid=${userid}`
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
      `${this.oapi}/department/list_ids?access_token=${token}&id=${id}`
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
      `${this.oapi}/department/list?access_token=${token}&id=${id}`
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
      `${this.oapi}/department/get?access_token=${token}&id=${id}`
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
      `${this.oapi}/department/list_parent_depts_by_dept?access_token=${token}&id=${id}`
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
      `${this.oapi}/department/list_parent_depts?access_token=${token}&userId=${userId}`
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
      `${this.oapi}/user/get_org_user_count?access_token=${token}&onlyActive=${onlyActive}`
    );
    return data;
  }

  /**
   * 发送工作消息
   * @param data IMessage
   * @param token access_token
   */
  async setWorkerMessage(data: IMessage, token?: string) {
    log(colors.green('===========发送工作通知消息'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`,
      data,
      method: 'POST',
    });
    return res.data;
  }

  /**
   * 查询工作通知消息的发送进度
   * @param data ITask
   * @param token access_token
   */
  async viewWorkerMessage(data: ITask, token?: string) {
    log(colors.green('===========查询工作通知消息的发送进度'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`,
      data,
      method: 'POST',
    });
    return res.data;
  }

  /**
   * 查询工作通知消息的发送结果
   * @param data ITask
   * @param token access_token
   */
  async resultWorkerMessage(data: ITask, token?: string) {
    log(colors.green('===========查询工作通知消息的发送结果'));
    token = token || (await this.getToken(token));
    const res = await axios({
      url: `https://oapi.dingtalk.com/topapi/message/corpconversation/getsendresult?access_token=${token}`,
      data,
      method: 'POST',
    });
    return res.data;
  }

  /**
   * 创建一个审批实例
   * @param data
   * @param token access_token
   */
  async createProcessInstance(data: IInstance, token?: string) {
    token = token || (await this.getToken(token));
    const res = await axios.post(
      `${this.oapi}/topapi/processinstance/create?access_token=${token}`,
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
      `${this.oapi}/topapi/processinstance/get?access_token=${token}`,
      {
        process_instance_id: id
      }
    );
    return instance.data;
  }

  /**
   * 注册审批回调
   * @param data
   * call_back_tag: string[]; 需要监听的事件类型
   * token: 加解密需要用到的token;
   * aes_key: 数据加密密钥。用于回调数据的加密，长度固定为43个字符，从a-z, A-Z, 0-9共62个字符中选取,您可以随机生成，ISV(服务提供商)推荐使用注册套件时填写的EncodingAESKey;
   * url: 接收事件回调的url，必须是公网可以访问的url地址
   * @param token
   */
  async registerCallBack(data: IRegisterCallBack, token?: string) {
    log(colors.green('===========获取审批实例'));
    token = token || (await this.getToken(token));
    const res = await axios.post(
      `https://oapi.dingtalk.com/call_back/register_call_back?access_token=${token}`,
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
    const res = await axios(`https://oapi.dingtalk.com/call_back/get_call_back?access_token=${token}`);
    return res.data;
  }

  /**
   * 删除回调注册事件
   * @param token access_token
   */
  async deleteCallBack(token?: string) {
    log(colors.green('=========删除回调注册事件'));
    token = token || (await this.getToken(token));
    const res = await axios(`https://oapi.dingtalk.com/call_back/delete_call_back?access_token=${token}`);
    return res.data;
  }

}

export default DDSdk;
