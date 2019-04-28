export interface IToken {
    expires_in: number;
    errmsg: string;
    access_token: string;
    errcode: number;
}
export interface IMessage {
    agent_id: number;
    userid_list: string;
    dept_id_list?: string;
    to_all_user?: boolean;
    msg: object;
}
export interface ITask {
    agent_id: number;
    task_id: number;
}
export interface IInstance {
    process_code: string;
    originator_user_id: string;
    dept_id: number;
    approvers: string;
    form_component_values: any;
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
