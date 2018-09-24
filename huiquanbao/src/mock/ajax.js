/*import axios from "axios";

export function bxproduct(){
	return axios.get("/static/mock.js")
}
*/

import alldata from "./mock.js";

export function bxproduct(){   //保险产品
	return alldata[0];
}
export function bxagent(){     //保险代理人
	return alldata[1];
}
export function bxquestion(){   //保险知识问答
	return alldata[2];
}
export function bxinfomation(){   //保险资讯
	return alldata[3]
}















