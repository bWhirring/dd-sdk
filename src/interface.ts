export interface IToken {
  expires_in: number;
  errmsg: string;
  access_token: string;
  errcode: number;
}

export interface IMessage {
  agent_id: number; // 应用agent_id,
  userid_list: string; // 可选(userid_list,dept_id_list, to_all_user必须有一个不能为空) 最大列表长度：100
  dept_id_list?: string; // 接收者的部门id列表， 最大长度20
  to_all_user?: boolean;  // 是否发送给企业全部用户
  msg: object;  // json对象
}

export interface ITask {
  agent_id: number; // 应用agent_id,
  task_id: number; // 发送消息时钉钉返回的任务id
}

export interface IInstance {
  process_code: string; // 审批流的唯一码，process_code就在审批流编辑的页面URL中
  originator_user_id: string;  // 审批实例发起人的userid
  dept_id: number; // 发起人所在的部门，如果发起人属于根部门，传-1
  approvers: string; // 审批人userid列表，最大列表长度：20。
  form_component_values: any; // 审批流表单参数
}

export interface IRegisterCallBack {
  call_back_tag: string[];
  token: string;
  aes_key: string;
  url: string;
}

export interface ICrypto {
  timestamp: number;
  nonce: string;
  token: string;
  userid: string;
  encodingAESKey: string;
  CorpId: string;
}
