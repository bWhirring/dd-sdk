#### 钉钉小程序SDK

`封装了一些常用的钉钉小程序服务端API，获取用户信息、部门信息、发送工作消息、审批流等`

install

```
npm install dd-sdk
```

usage

```
import DDSdk from "dd-sdk"

实例化sdk类
const dd = new DD(appKey, appSecret)
```

##### 获取access_token

```
getAccessToken(): Promise<IToken>
```
##### 获取用户ID

```
getUserId(code: string, token?: string)
```

##### 获取用户信息

```
getUser(userid: string, token?: string)
```

##### 获取子部门列表

```
childDepartment(id: number, token?: string)
```

##### 获取部门列表

```
department(id: number, token?: string)
```

##### 获取部门信息

```
departmentInfo(id: number, token?: string)
```


##### 查询部门的所有上级父部门路径

```
getAllDepartment(id: number, token?: string)
```

##### 查询指定用户的所有上级父部门路径

```
departmentListParentDepts(userId: string, token?: string)
```

##### 获取企业员工人数

```
getOrgUserCount(onlyActive: number, token?: string)
```

##### 发送工作消息

```
setWorkerMessage(data: IMessage, token?: string)
```

##### 查询工作通知消息的发送进度

```
viewWorkerMessage(data: ITask, token?: string)
```

##### 查询工作通知消息的发送结果

```
resultWorkerMessage(data: ITask, token?: string)
```

##### 创建一个审批实例

```
createProcessInstance(data: IInstance, token?: string)
```

##### 获取审批实例

```
getProcessInstance(id: string, token?: string)
```

##### 注册审批回调

```
registerCallBack(data: IRegisterCallBack, token?: string)
```

##### 注册事件回调时要实例化crypto

```
instanceCrypto(data: ICrypto)
```

##### 获取事件回调

```
getCallBack(token?: string)
```

##### 删除回调注册事件

```
deleteCallBack(token?: string)
```

##### 授权登录(H5微应用/第三方应用)

```
import { authEncrypto } from "dd-sdk";

authEncrypto(accessKey: string, appSecret: string, code: string)
```


### 文档

- [小程序服务端API](https://open-doc.dingtalk.com/microapp/serverapi2)
- [个人免登签名](https://open-doc.dingtalk.com/microapp/faquestions/hxs5v9)
- [注册事件回调](https://open-doc.dingtalk.com/microapp/serverapi2/pwz3r5)