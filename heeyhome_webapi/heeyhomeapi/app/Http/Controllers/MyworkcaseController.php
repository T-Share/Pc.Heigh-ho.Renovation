<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 18:06
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MyworkcaseController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $foreman_id=rq('foreman_id');
        $total=DB::select('select count(id) as total from hh_workcase where foreman_id=?',[$foreman_id]);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $select=DB::select('select * from hh_workcase  where foreman_id=? order by id desc limit ?,?',[$foreman_id,$offset[0],$offset[1]]);
        foreach($select as $key=>$val){
            $imgs=DB::select('select img_id,case_img from hh_workcase_img where case_id=?',[$val->case_id]);
            $select[$key]->img=$imgs;
        }
        if($select){
            $arr = array("code" => "000",
                "data" => $select
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function add(){
        $callback=rq('callback');
        $foreman_id=rq('foreman_id');
//        $area=rq('area');
//        $room=rq('room');
//        $parlour=rq('parlour');
//        $toilet=rq('toilet');
//        $balcony=rq('balcony');
        $housetype=rq('housetype');
        $style=rq('style');
        $timelong=rq('timelong');
        $address=rq('address');
        $case_id=rand_number(5);
        $files=Request::file('myfile');
        if(!Request::hasFile('myfile')){
            $arr = array("code" => "121",
                "msg" => "没有图片被上传"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if($files->isValid()){
            $case=DB::insert('insert into hh_workcase(case_id,foreman_id,area,style,timelong,address) values(?,?,?,?,?,?)',[$case_id,$foreman_id,$area,$style,$timelong,$address]);
            foreach($files as $file){
                $clientName = $file -> getClientOriginalName();//文件原名
                $entension = $file -> getClientOriginalExtension();//扩展名
                $realPath = $file->getRealPath();   //临时文件的绝对路径
                $type = $file->getClientMimeType();
                $size=$file-> getClientSize();
                //dd($size);
                $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                if($is){
                    $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                    $insert=DB::insert('insert into hh_workcase_img(case_id,case_img) values (?,?)',[$case_id,$path]);
                    $arr = array("code" => "000",
                        "msg" => "添加成功"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "111",
                        "msg" => "上传失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
        }else{
            $arr = array("code" => "122",
                "msg" => "图片上传出错"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}