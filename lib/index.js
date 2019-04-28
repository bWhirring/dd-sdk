"use strict";
/**
 *  钉钉API
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var colors = require("colors");
var crypto_1 = require("./crypto");
var log = console.log;
var DDSdk = /** @class */ (function () {
    /**
     * 实例化小程序
     * @param appKey 小程序appKey
     * @param appSecret 小程序appSecret
     */
    function DDSdk(appKey, appSecret) {
        this.oapi = 'https://oapi.dingtalk.com';
        this.appKey = appKey;
        this.appSecret = appSecret;
    }
    /**
     * 获取access_token 【注意】正常情况下access_token有效期为7200秒，有效期内重复获取返回相同结果，并自动续期。
     */
    DDSdk.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appKey, appSecret, oapi, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("===========\u83B7\u53D6access_token"));
                        _a = this, appKey = _a.appKey, appSecret = _a.appSecret, oapi = _a.oapi;
                        return [4 /*yield*/, axios_1.default(oapi + "/gettoken?appkey=" + appKey + "&appsecret=" + appSecret)];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 判断传参是否有access_token, 没有的话重新获取
     * @param token access_token
     */
    DDSdk.prototype.getToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var access_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        access_token = (_a.sent()).access_token;
                        token = access_token;
                        _a.label = 2;
                    case 2: return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * 获取用户ID
     * @param code 用户授权码
     * @param token access_token
     */
    DDSdk.prototype.getUserId = function (code, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("===========\u83B7\u53D6\u7528\u6237ID"));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/user/getuserinfo?access_token=" + token + "&code=" + code)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取用户信息
     * @param userid 用户id
     * @param token access_token
     */
    DDSdk.prototype.getUser = function (userid, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("===========\u83B7\u53D6\u7528\u6237\u4FE1\u606F"));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/user/get?access_token=" + token + "&userid=" + userid)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取子部门列表
     * @param id 父部门id。根部门的话传1
     * @param token access_token
     */
    DDSdk.prototype.childDepartment = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("==========\u83B7\u53D6\u5B50\u90E8\u95E8\u5217\u8868"));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/department/list_ids?access_token=" + token + "&id=" + id)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取部门列表
     * @param id 父部门id（如果不传，默认部门为根部门，根部门ID为1）
     * @param token access_token
     */
    DDSdk.prototype.department = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("==========\u83B7\u53D6\u90E8\u95E8\u5217\u8868"));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/department/list?access_token=" + token + "&id=" + id)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取部门信息
     * @param id 部门ID
     * @param token access_token
     */
    DDSdk.prototype.departmentInfo = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green("==========\u83B7\u53D6\u90E8\u95E8\u5217\u8868"));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/department/get?access_token=" + token + "&id=" + id)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 查询部门的所有上级父部门路径
     * @param id 希望查询的部门的id，包含查询的部门本身
     * @param token access_token
     */
    DDSdk.prototype.getAllDepartment = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========查询部门的所有上级父部门路径'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/department/list_parent_depts_by_dept?access_token=" + token + "&id=" + id)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 查询指定用户的所有上级父部门路径
     * @param userId 希望查询的用户的id
     * @param token access_token
     */
    DDSdk.prototype.departmentListParentDepts = function (userId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========查询指定用户的所有上级父部门路径'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/department/list_parent_depts?access_token=" + token + "&userId=" + userId)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取企业员工人数
     * @param onlyActive 0：包含未激活钉钉的人员数量 1：不包含未激活钉钉的人员数量
     * @param token access_token
     */
    DDSdk.prototype.getOrgUserCount = function (onlyActive, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========获取企业员工人数'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default(this.oapi + "/user/get_org_user_count?access_token=" + token + "&onlyActive=" + onlyActive)];
                    case 3:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 发送工作消息
     * @param data IMessage
     * @param token access_token
     */
    DDSdk.prototype.setWorkerMessage = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========发送工作通知消息'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default({
                                url: "https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=" + token,
                                data: data,
                                method: 'POST',
                            })];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 查询工作通知消息的发送进度
     * @param data ITask
     * @param token access_token
     */
    DDSdk.prototype.viewWorkerMessage = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========查询工作通知消息的发送进度'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default({
                                url: "https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=" + token,
                                data: data,
                                method: 'POST',
                            })];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 查询工作通知消息的发送结果
     * @param data ITask
     * @param token access_token
     */
    DDSdk.prototype.resultWorkerMessage = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========查询工作通知消息的发送结果'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default({
                                url: "https://oapi.dingtalk.com/topapi/message/corpconversation/getsendresult?access_token=" + token,
                                data: data,
                                method: 'POST',
                            })];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 创建一个审批实例
     * @param data
     * @param token access_token
     */
    DDSdk.prototype.createProcessInstance = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default.post(this.oapi + "/topapi/processinstance/create?access_token=" + token, data)];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 获取审批实例
     * @param id 审批实例ID
     * @param token access_token
     */
    DDSdk.prototype.getProcessInstance = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, instance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========获取审批实例'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default.post(this.oapi + "/topapi/processinstance/get?access_token=" + token, {
                                process_instance_id: id
                            })];
                    case 3:
                        instance = _b.sent();
                        return [2 /*return*/, instance.data];
                }
            });
        });
    };
    /**
     * 注册审批回调
     * @param data
     * call_back_tag: string[]; 需要监听的事件类型
     * token: 加解密需要用到的token;
     * aes_key: 数据加密密钥。用于回调数据的加密，长度固定为43个字符，从a-z, A-Z, 0-9共62个字符中选取,您可以随机生成，ISV(服务提供商)推荐使用注册套件时填写的EncodingAESKey;
     * url: 接收事件回调的url，必须是公网可以访问的url地址
     * @param token
     */
    DDSdk.prototype.registerCallBack = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========获取审批实例'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default.post("https://oapi.dingtalk.com/call_back/register_call_back?access_token=" + token, data)];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 实例化crypto
     * @param token
     * @param encodingAESKey
     * @param CorpId
     */
    DDSdk.prototype.instanceCrypto = function (data) {
        var token = data.token, encodingAESKey = data.encodingAESKey, CorpId = data.CorpId, timestamp = data.timestamp, nonce = data.nonce, userid = data.userid;
        // tslint disabled-next-line
        var Cipher = new crypto_1.default(token, encodingAESKey, CorpId);
        var text = Cipher.encrypt('success');
        // 签名文本
        var sign = Cipher.getSignature(timestamp, nonce, text);
        var result = {
            userid: userid,
            msg_signature: sign,
            timeStamp: timestamp,
            nonce: nonce,
            encrypt: text
        };
        return result;
    };
    /**
     * 获取时间回调
     * @param token access_token
     */
    DDSdk.prototype.getCallBack = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('===========查询工作通知消息的发送结果'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default("https://oapi.dingtalk.com/call_back/get_call_back?access_token=" + token)];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 删除回调注册事件
     * @param token access_token
     */
    DDSdk.prototype.deleteCallBack = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(colors.green('=========删除回调注册事件'));
                        _a = token;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4 /*yield*/, axios_1.default("https://oapi.dingtalk.com/call_back/delete_call_back?access_token=" + token)];
                    case 3:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    return DDSdk;
}());
exports.default = DDSdk;
//# sourceMappingURL=index.js.map