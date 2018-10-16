<?php

// +----------------------------------------------------------------------
// | YFCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2016 http://www.rainfer.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: rainfer <81818832@qq.com>
// +----------------------------------------------------------------------

namespace app\admin\controller;

use think\Db;
use think\Cache;
use think\helper\Time;
use app\admin\model\News as NewsModel;
use app\admin\model\MemberList;

class Index extends Base {
    public $_admin = array();
    
    /**
     * 后台首页
     */
    public function index() {
        if(session('admin_auth.aid')){
            $admin = Db::name('admin')->alias("a")->join(config('database.prefix').'auth_group_access b','a.admin_id =b.uid')
                                      ->join(config('database.prefix').'auth_group c','b.group_id = c.id')
                                      ->join(config('database.prefix').'admin_dept d',"d.dept_id=b.dept_id")
                                      ->where(array('a.admin_id'=>session('admin_auth.aid')))->find();
            $this->_admin = $admin;
        }
        $role_tongji = config("role_tongji");
        if(isset($role_tongji[$admin['group_id']]) && $role_tongji[$admin['group_id']]){
            $role_arr = $role_tongji[$admin['group_id']];
            $model = $role_arr['model'];
            $act = $role_arr['en_name'];
            if(in_array($act,array("shangwuzy","shangwujl")) && !$admin['city_ids']){
                return $this->fetch();
            }
            
            $date_range = input("date_range","");
            if($date_range){
                $range_arr = explode(' - ',$date_range);
                $param['bgdate'] = $range_arr[0];
                $param['eddate'] = $range_arr[1];
            }else{
                $param['bgdate'] = date('Y-m-01');
                $param['eddate'] = date('Y-m-d');
            }
            
            if(request()->isAjax()){
                $tongji_res = $this->tongjisearch($admin);
                if($tongji_res){
                    return $tongji_res;
                }
            }
            
            $class_name = "\app\admin\model\\".$model;
            $obj = new $class_name();
            $result = $obj->$act($param);
            $this->assign("admin",$admin);
            $this->assign("result",$result);
            $this->assign("param",$param);
            return $this->fetch("index:".strtolower($model)."_". strtolower($act));
        }
        return $this->fetch();
    }

    /**
     * 统计搜索
     * @param type $admin
     * @return type
     */
    public function tongjisearch($admin = array()){
        $admin or $admin = $this->_admin;
        $role_tongji = config("role_tongji");
        if(isset($role_tongji[$admin['group_id']]) && $role_tongji[$admin['group_id']]){
            $role_arr = $role_tongji[$admin['group_id']];
            $model = $role_arr['model'];
            $act = input("type","");
            if(!$act){
                $this->error("类型错误");
            }
            
            $date_range = input("date_range","");
            if($date_range){
                $range_arr = explode(' - ',$date_range);
                $param['bgdate'] = $range_arr[0];
                $param['eddate'] = $range_arr[1];
            }else{
                $param['bgdate'] = date('Y-m-01');
                $param['eddate'] = date('Y-m-d');
            }
            
            $class_name = "\app\admin\model\\".$model;
            $obj = new $class_name();
            $result = $obj->$act($param); 
            $this->assign("result",$result);
            return $this->fetch("index:".strtolower($model)."_". strtolower($act));
        }
    }

    /**
     * 后台多语言切换
     */
    public function lang() {
        if (!request()->isAjax()) {
            $this->error('提交方式不正确');
        } else {
            $lang = input('lang_s');
            session('login_http_referer', $_SERVER["HTTP_REFERER"]);
            switch ($lang) {
                case 'cn':
                    cookie('think_var', 'zh-cn');
                    break;
                case 'en':
                    cookie('think_var', 'en-us');
                    break;
                //其它语言
                default:
                    cookie('think_var', 'zh-cn');
            }
            Cache::clear();
            $this->success('切换成功', session('login_http_referer'));
        }
    }
     /**删**/
     public function test(){
         return $this->fetch("index/kefu_kefuzj2");
     }
      public function test2(){
         return $this->fetch("index/kefu_kefuzg2");
     }
}
