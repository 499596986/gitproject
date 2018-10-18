import axios from "axios";

var baseurl="https://www.easy-mock.com/mock/5bb9af0b0cd54b6d67b499ee/elementui";
export function dataCount(){		//首页统计数据
	return axios.get(baseurl+"/dataCount");
}

export function dataManage(){		//数据管理
	return axios.get(baseurl+"/dataManage");
}

export function userSpread(){		//用户分布
	return axios.get(baseurl+"/userSpread"); 
}















