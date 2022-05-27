import axios from 'axios';
import qs from 'qs';
axios.defaults.withCredentials = true
//  export let base = 'http://localhost:42297/api';
// export let base = 'http://www.dr0759.cn/WxTest/api';
export let base = 'http://www.dr0759.cn/api';

export const checkUser = params => { return axios.get(`${base}/DnaOrder/CheckUser`, { params: params }); };
export const GetDnaOrderList = params => { return axios.get(`${base}/DnaOrder/GetDnaOrderList`, { params: params }); };
export const PrintDnaOrder = params => { return axios.get(`${base}/DnaOrder/PrintDnaOrder`, { params: params }); };
export const ChannelBillListExcel = params => { return axios.get(`${base}/DnaOrder/ChannelBillListExcel`, { params: params }); };
//网上预约信息
export const GetApptOrderList = params => { return axios.get(`${base}/DnaOrder/GetApptOrderList`, { params: params }); };
export const ChannelApptListExcel = params => { return axios.get(`${base}/DnaOrder/ChannelApptListExcel`, { params: params }); };
export const PrintApptOrder = params => { return axios.get(`${base}/DnaOrder/PrintApptOrder`, { params: params }); };
// 核酸预约
export const getHealthQuestionList = params => { return axios.get(`${base}/HealthQuestionAdmin/GetRegList`, { params: params }); };
export const getHealthQuestionDetail = params => { return axios.get(`${base}/HealthQuestionAdmin/GetRegInfo`, { params: params }); };




