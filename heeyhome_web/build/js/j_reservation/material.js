/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-29 */
!function(){var a=angular.module("heeyhomeApp"),b="/api/public/order/material/userget",c="/api/public/alipay/pay",d="/api/public/order/material/outMaterialByUser",e="/api/public//order/material/finish",f={init:function(){f.initEvent()},initEvent:function(){var a=this;a.initWebDataEvent()},initWebDataEvent:function(){var a=this;a.initMaterialListDetailsEvent()},initMaterialListDetailsEvent:function(){getDataForAjaxHandler.getDataEvent()}};getDataForAjaxHandler={getDataEvent:function(){var a=this,c=getUrlParamHandler.getUrlParam("pos"),d=getUrlParamHandler.getUrlParam("material_type"),e=spliceMaterialContHandler;$.ajax({url:b,type:"GET",async:!0,dataType:"jsonp",data:{order_id:c,material_type:d},beforeSend:function(){$("#itemlists").addClass("loagbg")},complete:function(){$("#itemlists").removeClass("loagbg")}}).done(function(b){if(0==b.data.order_pay_type)e.spliceMaterialsDataEvent(b.data,!1),a.initTotalSumEvent(),a.initPaySumbitEvent(),a.initSelectAllEvent(),$(document).on("click",".titlelist input",function(){var a=$(this);e.spliceRelevantMaterialsEvent(b.data,a.data("brand"),a,!1),a.parents("li").siblings().find("i").removeClass("rep_radiao_check"),a.siblings("i").addClass("rep_radiao_check")}),$(".Jnum").html($(".shows").length);else if(1==b.data.order_pay_type)a.initPaySumbitEvent(b.data.order_pay_type),$("#checkYt").prop("checked",!0),$(".explain").find("em").addClass("defalut_ico"),$(".explain").find("label").addClass("cursor"),$("#nocheck").addClass("yes_check"),e.spliceMaterialsDataEvent(b.data,!0),$(document).on("click",".titlelist input",function(){var a=$(this);e.spliceRelevantMaterialsEvent(b.data,a.data("brand"),a,!0),a.parents("li").siblings().find("i").removeClass("rep_radiao_check"),a.siblings("i").addClass("rep_radiao_check")}),layer.msg("材料不可选择，可以选择自行购买或平台支付"),a.initTotalSumEvent(),$(".Jnum").html($(".shows").length);else if(3==b.data.order_pay_type){var c=sessionStorage.getItem("data-buy");"1"==c&&($(".listnumber span").remove(),$(".listnumber").append("<b>已自行购买材料</b>")),2==b.data.order_material_status?($("#Jpayment").val("确认收货"),$("#Jpayment").click(function(){getDataForAjaxHandler.initConfirmMaterialEvent()})):3==b.data.order_material_status?$("#Jpayment").val("已收货").addClass("alreadyPaid"):$("#Jpayment").val("已支付").addClass("alreadyPaid"),$(document).on("click",".titlelist input",function(){var a=$(this);e.spliceRelevantMaterialsEvent(b.data,a.data("brand"),a,!0),a.parents("li").siblings().find("i").removeClass("rep_radiao_check"),a.siblings("i").addClass("rep_radiao_check")}),e.spliceMaterialsDataEvent(b.data,!0),$("#checkYt").prop("checked",!0),a.initTotalSumEvent(),$(".Jnum").html($(".shows").length),$(".explain").find("em").addClass("defalut_ico"),$(".explain").find("label").addClass("cursor"),$("#nocheck").addClass("yes_check"),$(".selfPurchase").addClass("ap")}})},initPaySumbitEvent:function(a){var b=getUrlParamHandler.getUrlParam("pos");1!=a&&$(document).on("click","#checkYt",function(){$(this).is(":checked")?($(this).siblings("em").addClass("defalut_ico"),$(this).parents().siblings("span").addClass("yes_check")):($(this).siblings("em").removeClass("defalut_ico"),$(this).parents().siblings("span").removeClass("yes_check"))}),$(document).on("click","#Jpayment",function(){if($("#checkYt").is(":checked")){var a=[];if($.each($("#itemlists .itemlist .material_cardtable tbody tr"),function(b,c){$(c).find("em").hasClass("defalut_ico")&&a.push($(c).find(".Jselect").data("select"))}),0!=a.length){var d=$("#Jpayment").data("submit");c=c+"?pay_type="+d+"&order_id="+b+"&material_list="+JSON.stringify(a),$("#meterialFrom").attr("action",c),$("#meterialFrom").submit()}else layer.msg("请先勾选您需要的材料")}else layer.msg("请先仔细阅读合同条款并勾选确认")}),$(document).on("click","#JSelfPurchase",function(){$.ajax({url:d,type:"GET",async:!0,dataType:"jsonp",data:{order_id:b},success:function(){},error:function(){}}).done(function(){layer.confirm("您确定自行购买吗？",{btn:["确定","取消"]},function(){location.reload(),sessionStorage.setItem("data-buy","1")})})})},initSelectAllEvent:function(){var a=this;$(document).on("click",".JcheckGcd",function(){$(this).is(":checked")?($(this).siblings("em").removeClass("defalut_ico"),$(this).closest("table").find('input[name="subBox"]').prop("checked",this.checked).siblings("em").removeClass("defalut_ico")):($(this).siblings("em").addClass("defalut_ico"),$(this).closest("table").find('input[name="subBox"]').prop("checked",this.checked).siblings("em").addClass("defalut_ico")),a.initTotalSumEvent()}),$(document).on("click",".material_cardtable tbody tr input",function(){$(this).is(":checked")?$(this).siblings("em").removeClass("defalut_ico"):$(this).siblings("em").addClass("defalut_ico"),a.initTotalSumEvent()})},initTotalSumEvent:function(){var a=0;$.each($("#itemlists .itemlist .material_cardtable tbody tr"),function(b,c){$(c).find("em").hasClass("defalut_ico")&&(a+=parseInt($(c).find(".Jselect").data("subtotal")))}),$(".Jtotal").html(a)},initConfirmMaterialEvent:function(){var a=getUrlParamHandler.getUrlParam("pos"),b=getUrlParamHandler.getUrlParam("material_type");$.ajax({type:"get",url:e,async:!0,dataType:"jsonp",data:{order_id:a,material_type:b},success:function(a){layer.msg(a.msg),location.reload()},error:function(){}})}},spliceMaterialContHandler={spliceMaterialsDataEvent:function(a,b){var c="";$.each(a,function(a,d){if("order_pay_type"!=a&&"order_material_status"!=a){var e,f=0;for(e in d)f++;if(1==parseInt(f))if("无品牌"==Object.keys(d))c+='<div class="itemlist">',c+='<div class="titlelist"></div>',c+='<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>',c+='<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>',c+='<td align="center" width="100px">小计/元</td><td align="center" width="50px">',c+=b?"</td></tr></thead><tbody>":'<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>',$.each(d,function(a,d){$.each(d,function(a,d){c+='<tr class="shows">',c+='<td rowspan="'+d.data.length+'" class="border_eee"><img src="'+d.img+'"></td>',c+='<td rowspan="'+d.data.length+'" class="border_eee">'+d.name+"</td>",$.each(d.data,function(a,d){0!=a&&(c+='<tr class="shows">'),c+=null==d.spec_name?'<td class="Jselect" data-select="'+d.id+'" data-subtotal="'+parseFloat(d.price)*parseFloat(d.num)+'">无</td><td>'+d.unit+"</td><td>"+d.price+"</td><td>"+d.num+"</td><td>"+parseFloat(d.price)*parseFloat(d.num)+"</td>":'<td class="Jselect" data-select="'+d.id+'" data-subtotal="'+parseFloat(d.price)*parseFloat(d.num)+'">'+d.spec_name+"</td><td>"+d.unit+"</td><td>"+d.price+"</td><td>"+d.num+"</td><td>"+parseFloat(d.price)*parseFloat(d.num)+"</td>",c+="<td>",c+=b?'<label class="set_default cursor"><input name="subBox" checked="'+(1==d.choose_flag?"checked":"")+'" type="checkbox" /><em class="'+(1==d.choose_flag?"defalut_ico":"")+'"></em></label></td>':'<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>',c+="</tr>"})}),c+="</tbody></table></div></div>"});else{var g=Object.keys(d).map(function(a){return d[a]});c+='<div class="itemlist">',c+='<div class="titlelist"><dl><dt>请选择一个品牌</dt><dd><ul class="airplane_rad clearfix"><li>',c+='<label for="airplaneRadio'+a+'" id="repAirRadio'+a+'"><input type="radio" checked="checked" data-brand="'+g[0][0].data[0].brand_id+'" id="airplaneRadio'+a+'" class="display" />',c+='<i class="rep_radiao_check"></i><span>'+Object.keys(d)+"</span></label></li></ul></dd></dl></div>",c+='<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>',c+='<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>',c+='<td align="center" width="100px">小计/元</td><td align="center" width="50px">',c+=b?"</td></tr></thead><tbody>":'<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>',$.each(d,function(a,d){$.each(d,function(a,d){c+='<tr class="shows">',c+='<td rowspan="'+d.data.length+'" class="border_eee"><img src="'+d.img+'"></td>',c+='<td rowspan="'+d.data.length+'" class="border_eee">'+d.name+"</td>",$.each(d.data,function(a,d){0!=a&&(c+='<tr class="shows">'),c+=null==d.spec_name?'<td class="Jselect" data-select="'+d.id+'" data-subtotal="'+parseFloat(d.price)*parseFloat(d.num)+'" >无</td><td>'+d.unit+"</td><td>"+d.price+"</td><td>"+d.num+"</td><td>"+parseFloat(d.price)*parseFloat(d.num)+"</td>":'<td class="Jselect" data-select="'+d.id+'" data-subtotal="'+parseFloat(d.price)*parseFloat(d.num)+'" >'+d.spec_name+"</td><td>"+d.unit+"</td><td>"+d.price+"</td><td>"+d.num+"</td><td>"+parseFloat(d.price)*parseFloat(d.num)+"</td>",c+="<td>",c+=b?'<label class="set_default cursor"><input name="subBox" type="checkbox" checked="'+(1==d.choose_flag?"checked":"")+'" /><em class="'+(1==d.choose_flag?"defalut_ico":"")+'"></em></label></td>':'<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>',c+="</tr>"})}),c+="</tbody></table></div></div>"})}else{var h=[];$.each(d,function(a,b){var c=Object.keys(b).map(function(a){return b[a]});h.push(c[0].data[0].brand_id)}),c+='<div class="itemlist">',c+='<div class="titlelist"><dl><dt>请选择一个品牌</dt><dd><ul class="airplane_rad clearfix">';for(var i in Object.keys(d))c+='<li><label for="airplaneRadio'+a+i+'" id="repAirRadio'+a+i+'">',c+='<input type="radio" checked="checked" data-brand="'+h[i]+'" id="airplaneRadio'+a+i+'" class="display" />',c+='<i class="'+(0==parseInt(i)?"rep_radiao_check":"")+'"></i><span>'+Object.keys(d)[i]+"</span></label></li>";c+="</ul></dd></dl></div>",c+='<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>',c+='<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>',c+='<td align="center" width="100px">小计/元</td><td align="center" width="50px">',c+=b?"</td></tr></thead><tbody>":'<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>';var g=Object.keys(d).map(function(a){return d[a]});$.each(g[0],function(a,d){c+='<tr class="shows">',c+='<td rowspan="'+d.data.length+'" class="border_eee"><img src="'+d.img+'"></td>',c+='<td rowspan="'+d.data.length+'" class="border_eee">'+d.name+"</td>",$.each(d.data,function(a,d){0!=a&&(c+='<tr class="shows">'),c+='<td class="Jselect" data-select="'+d.id+'" data-subtotal="'+parseFloat(d.price)*parseFloat(d.num)+'" >'+d.spec_name+"</td><td>"+d.unit+"</td><td>"+d.price+"</td><td>"+d.num+"</td><td>"+parseFloat(d.price)*parseFloat(d.num)+"</td>",c+="<td>",c+=b?'<label class="set_default cursor"><input name="subBox" type="checkbox" checked="'+(1==d.choose_flag?"checked":"")+'" /><em class="'+(1==d.choose_flag?"defalut_ico":"")+'"></em></label></td>':'<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>',c+="</tr>"})}),c+="</tbody></table></div></div>"}}}),$("#itemlists").html(c),$("#itemlists").find("table tbody > tr").each(function(a,b){window.setTimeout(function(){$(b).addClass("shows")},20*a)})},spliceRelevantMaterialsEvent:function(a,b,c,d){var e="";$.each(a,function(a,c){"order_pay_type"!=a&&"order_material_status"!=a&&$.each(c,function(a,c){c[0].data[0].brand_id==b&&(e+='<div class="material_cardtable "><table cellspacing="0" cellpadding="0"><thead><tr><td align="center" width="200px">参考图</td>',e+='<td align="center" width="185px">名称</td><td align="center" width="100px">规格</td><td align="center" width="100px">单位</td><td align="center" width="100px">单价/元</td><td align="center" width="100px">数量</td>',e+='<td align="center" width="100px">小计/元</td><td align="center" width="50px">',e+=d?"</td></tr></thead><tbody>":'<label class="set_default"><input class="JcheckGcd" id="checkGcd" type="checkbox" /><em class="defalut_ico"></em></label></td></tr></thead><tbody>',$.each(c,function(a,b){e+="<tr>",e+='<td rowspan="'+b.data.length+'" class="border_eee"><img src="'+b.img+'"></td>',e+='<td rowspan="'+b.data.length+'" class="border_eee">'+b.name+"</td>",$.each(b.data,function(a,b){0!=a&&(e+="<tr>"),e+='<td data-select="'+b.id+'">'+b.spec_name+"</td><td>"+b.unit+"</td><td>"+b.price+"</td><td>"+b.num+"</td><td>"+parseFloat(b.price)*parseFloat(b.num)+"</td>",e+="<td>",e+=d?'<label class="set_default cursor"><input name="subBox" type="checkbox" checked="'+(1==b.choose_flag?"checked":"")+'" /><em class="'+(1==b.choose_flag?"defalut_ico":"")+'"></em></label></td>':'<label class="set_default"><input name="subBox" type="checkbox" /><em class="defalut_ico"></em></label></td>',e+="</tr>"})}),e+="</tbody></table></div></div>")})}),c.closest(".titlelist").siblings().html(e),c.closest(".titlelist").siblings().find("table tbody > tr").each(function(a,b){window.setTimeout(function(){$(b).addClass("shows")},20*a)})}},getUrlParamHandler={getUrlParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?unescape(c[2]):null}},a.controller("materiallistCtrl",["$scope","$http",function(){f.init()}])}();