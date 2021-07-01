<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>TeamYar</title>
    <link type="image/x-icon" rel="icon" href="/public/home/res/favicon.ico">
    <style type="text/css">
	*,
body,
html {
    margin: 0;
    padding: 0
}
.ch_lose,
.ch_lose a,
a {
    text-decoration: none
}
.btn,
.cursor-pointer:hover,
.cursor-pointer_corner:hover {
    cursor: pointer
}
body,
html {
    height: 100%;
    background-color: #f6f6f6
}
.body {
    min-height: 100%;
    width: 100%;
    position: absolute
}
* {
    font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #484848
}
.container {
    margin-left: auto;
    margin-right: auto;
    padding: 20px 5px 110px;
	margin-bottom:15px;
}
.teamyar_text {
    color: #fff;
    text-align: justify;
    font-size: 16px
}
.teamyar_text a {
    color: #fff
}
.HolderMain {
    -moz-box-shadow: 0 10px 16px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19) !important;
    -webkit-box-shadow: 0 10px 16px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19) !important;
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19) !important;
    background-color: #fff;
	position:relative;
}
.form-control,
.holder_checkbox {
    display: block;
    width: 80%;
    height: 34px;
    line-height: 1.42857143;
    font-size: 14px
}
center {
    padding-top: 40px
}
.form-control {
    color: #555;
    border: 1px solid #ccc;
    margin: 15px 0;
    background-color: #fff;
    padding: 3px 10px
}
.holder_checkbox {
    -moz-box-sizing: padding-box;
    -webkit-box-sizing: padding-box;
    box-sizing: padding-box
}
.holder_checkbox a,
.holder_checkbox label {
    float: right;
    margin: 5px 0 !important;
    position: relative
}
.btn {
    background-color: #f37435 !important;
    border: 1px solid #f37435;
    color: #fff;
    font-size: 18px;
    outline: none
}

.ch_lose,
.ch_lose a {
    color: #f37435;
    cursor: pointer
}
.combobox,
.dropdown,
.input {
    color: #555 !important
}
.combobox {
    text-align: left;
    width: 100%;
    margin: 0 !important;
    border: 0 solid #ccc;
    padding: 7px 0 9px !important;
    height: 15px !important
}
.combobox:active,
.combobox:focus,
.combobox:hover,
.input:active,
.input:focus,
.input:hover {
    outline: #fff solid 0 !important
}
.combobox .arrow {
    float: right;
    border-top: 6px solid #555;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    margin-top: 13px;
    font-size: 14px
}

.dropdown {
    margin: 0;
    margin-top: 10px !important;
    width: 80% !important;
    height: 34px !important;
    position: relative;
    border: 1px solid #ccc !important;
    padding: 0 10px 5px !important
}
.dropdown-menu li {
    list-style: none;
    outline: #d5d5d5 solid 1px;
    padding: 5px 10px;
    text-align: left;
    z-index: 2000;
    font-size: 14px
}


.show {
    display: block !important
}

.input {
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #fff;
    border: 0;
    font-size: 18px;
    color: #484848 !important
}
.messageError,
.text {
    font-size: 12px
}
.messageError {
    color: red
}
.text_domain {
    font-size: 10px;
    color: #999;
    margin-left: 6px;
    margin-bottom: 3px;
    bottom: 0;
    position: absolute
}
.holder_info_pass {
    height: 25px;
    text-align: right;
    width: 80%
}
#holder_info {
    display: none;
    direction: <ty: rtl/>;
    min-height: 461px;
    margin: 0 auto
}
.HolderMain {
    height: auto;
    margin: 0 auto
}
@media (max-width: 468px) {
    .HolderMain {
        margin-top: 30px;
        margin-bottom: 40px;
        width: 90%
    }
    #holder_info {
        width: 300px
    }
	.holder_language{
		top:-10px;
		right:0;
	}
}
@media (min-width: 468px) and (max-width: 768px) {
    .HolderMain {
        margin-top: 15px;
        width: 80%
    }
    #holder_info {
        margin-top: 30px;
        width: 360px
    }
	.holder_language{
		top:-10px;
		right:0;
	}
}
@media (min-width: 768px) and (max-width: 992px) {
    .HolderMain {
        margin-top: 7%;
        width: 50%
    }
    #holder_info {
        margin-top: 7%;
        width: 360px
    }
	.holder_language{
		top:-10px;
		right:0;
	}
}
@media (min-width: 992px) and (max-width: 1200px) {
    .HolderMain {
        margin-top: 7%;
        width: 40%
    }
    #holder_info {
        margin-top: 7%;
        width: 360px
    }
}
@media (min-width: 1200px) {
    .HolderMain {
        margin-top: 7%;
        width: 35%
    }
    #holder_info {
        margin-top: 7%;
        width: 360px
    }
}
@media (min-width: 500px) {
    .container {
        width: 500px
    }
}
@media (min-width: 768px) {
    .container {
        width: 750px
    }
}
@media (min-width: 992px) {
    .container {
        width: 970px
    }
}
@media (min-width: 1200px) {
    .container {
        width: 1170px
    }
}
@media (max-width: 992px) {
    .text_domain {
        display: none !important
    }
}
.img_logo {
    width: 250px;
    height: 100px;
    margin-bottom: 20px
}
.footer {
    width: 100%;
    height: 70px;
    bottom: 0;
    text-align: center;
    position: absolute;
    z-index: 1002
}
.ti_holder {
    border-radius: 100%;
    background-color: #f37435;
    position: fixed;
    bottom: -200%;
    height: 200%;
    width: 100%;
    left: -25%;
    right: -25%;
    margin: 0 auto;
    transition-property: all;
    transition-duration: .5s;
    z-index: 1000;
    opacity: 1
}
.ti_holder_screen {
    bottom: -70%;
    width: 150%;
    left: -25%;
    right: -25%
}
.cursor-pointer_corner {
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px 10px 0 0;
    color: #fff;
    font-size: 16px
}
#logo {
    margin: 0 auto;
    color: #fff
}
#logo_color_change:hover {
    fill: #f37435
}
.show_info #logo_color_change,
.show_info #logo_color_change:hover {
    fill: #fff !important
}
.show_info .text_domain {
    display: none !important
}
.show_info #copyright {
    color: #fff !important
}
.text_portal {
    color: #fff;
    font-size: 13px;
}
.text_android {
    color: #fff;
    font-size: 13px;
}
#btn_portal {
	margin-top:20px;
    background-color: #acacac;
    border-radius: 0 10px 10px 0;
    position: absolute;
    bottom: 80px;
	padding:6px 19px 10px 19px;
	z-index:1003;

}
#btn_android{
    background-color: #6ab344;
     border-radius: 0 10px 10px 0;
    position: absolute;
    bottom: 40px;
	padding:6px 20px 10px 20px;
	z-index:1003;

}
	</style>
	<script type="text/javascript">
    function Dropdown(e) {
     var t = document.getElementById("list_type_login"),
         o = t.getAttribute("data-show");
     if ("false" == o) t.setAttribute("class", "show dropdown-menu"), t.setAttribute("data-show", "true");
     else {
         var n = document.getElementById("holder_for_dropdown"),
             l = document.getElementById("li_teamyar"),
             d = document.getElementById("login_type"),
             i = document.getElementById("text_list_login"),
             r = document.getElementById("netwotk"),
             m = document.getElementById("teamyar"),
             c = document.getElementById("id_arrow");
         e.target !== n && e.target !== c && e.target !== t && e.target !== l && e.target !== d && e.target !== i && e.target !== m && e.target !== r && closedrop()
     }
 }
 function onclickOnBodyShabake(e) {
     var t = document.getElementById("holder_for_dropdown");
     list_type_login = document.getElementById("list_type_login"), li_teamyar = document.getElementById("li_teamyar"), login_type = document.getElementById("login_type"), text_list_login = document.getElementById("text_list_login"), netwotk = document.getElementById("netwotk"), teamyar = document.getElementById("teamyar"), id_arrow = document.getElementById("id_arrow"), e.target !== t && e.target !== id_arrow && e.target !== list_type_login && e.target !== li_teamyar && e.target !== login_type && e.target !== text_list_login && e.target !== teamyar && e.target !== netwotk && closedrop()
 }
 function onclcikForSetInputTypeLogin(e, t) {
     var o = document.getElementById(e).innerHTML,
         n = document.getElementById("login_type_hidden");
     if ("netwotk" == e) {
         var l = document.getElementById("li_netwotk");
         l.setAttribute("class", "selected");
         var d = document.getElementById("li_teamyar");
         d.setAttribute("class", ""), n.setAttribute("value", "1")
     } else {
         var l = document.getElementById("li_teamyar");
         l.setAttribute("class", "selected");
         var d = document.getElementById("li_netwotk");
         d.setAttribute("class", ""), n.setAttribute("value", "2")
     }
     var i = document.getElementById("login_type");
     i.setAttribute("value", o + "<span></span>");
     var r = document.getElementById("text_list_login");
     r.innerHTML = o, t && closedrop()
 }
 function keypressSelectLoginType(e, t) {
     if ("38" == t.keyCode || "40" == t.keyCode) onclcikForSetInputTypeLogin(selected, !1), selected = "netwotk" == selected ? "teamyar" : "netwotk";
     else if ("13" == t.keyCode) {
         e.blur(), closedrop();
         var o = document.getElementById("id_login");
         o.focus()
     }
     return !1
 }
 function closedrop() {
     var e = document.getElementById("list_type_login");
     e.setAttribute("class", "dropdown-menu"), e.setAttribute("data-show", "false")
 }
 function submitForm(e) {
     "13" == e.keyCode && submitAndShowLoading()
 }
 function setborder(e) {
     var t = document.getElementById(e);
     t.style.borderColor = "#f37435"
 }
 function removeborder(e) {
     var t = document.getElementById(e);
     t.style.borderColor = "#ccc"
 }
 function showInfo() {
     var e = document.getElementById("teamyar_info"),
         t = e.className,
         o = document.getElementById("logo_color_change"),
         n = document.getElementById("close_info_btn"),
         l = document.getElementById("close_info_btn_corner"),
		 p = document.getElementById("btn_portal"),
		 a = document.getElementById("btn_android"),
         d = document.getElementById("copyright");
		 
     t.indexOf("ti_holder_screen") > 0 ? (e.className = " ti_holder ti_holder_screen", e.style.display = "block", setTimeout(function () {
         var e = document.getElementById("body"),
             t = document.getElementById("holder_form"),
             o = document.getElementById("holder_info");
              e.style.backgroundColor = "#f6f6f6", e.className = "body", t.style.display = "block",    o.style.display = "none", document.getElementById("teamyar_info").className = " ti_holder "
     }, 100), setTimeout(function () {
       document.getElementById("logo_color_change").style.display = "inline", document.getElementById("close_info_btn").style.display = "none", document.getElementById("close_info_btn_corner").style.display = "none", document.getElementById("copyright").style.color = "#999",a.style.display = "block",p.style.display = "block"
     }, 500), setTimeout(function () {
         document.getElementById("body").className = "body"
     }, 1e3)) : (p.style.display = "none",a.style.display = "none",e.className = " ti_holder ti_holder_screen", document.getElementById("body").className = "show_info body", setTimeout(function () {
         document.getElementById("body").style.backgroundColor = "#f37435", document.getElementById("holder_form").style.display = "none", document.getElementById("holder_info").style.display = "block", document.getElementById("teamyar_info").className = " ti_holder ti_holder_screen "
     }, 500), setTimeout(function () {
         document.getElementById("teamyar_info").style.display = "none"
     }, 500), o.style.display = "none", n.style.display = "inline", l.style.display = "inline", d.style.color = "#fff")
 }
 function exitpage(e) {
     var t = document.getElementById("teamyar_info"),
         o = t.className;
     o.indexOf("ti_holder_screen") > 0 && 27 == e.keyCode && showInfo()
 }

 function beforesubmit() {
     loading()
 }
 function loading() {
     "none" == document.getElementById("div-loading").style.display && (document.getElementById("div-loading").style.display = "block")
 }
 function submitAndShowLoading() {
     loading();
     var e = document.getElementById("form");
     e.submit()
 }
 function checkCapsLock(e) {
     var t = e.getModifierState && e.getModifierState("CapsLock");
     1 == t ? (document.getElementById("error_holder").style.display = "block", document.getElementById("error_text").innerHTML = message_capslock_on, document.getElementById("error_text").style.color = "black", document.getElementById("error_text").style.display = "inline-block", document.getElementById("icon_capslock").style.display = "inline-block") : (document.getElementById("error_holder").style.display = "none", document.getElementById("error_text").innerHTML = "", document.getElementById("error_text").style.color = "red", document.getElementById("icon_capslock").style.display = "none")
 }
 window.top == window.self && "undefined" == typeof ty__fullinfo || (top.location = "/public/home/login");
 var selected = "netwotk",
     message_capslock_on = "<ty:CAPS_ON/>";
	</script>
	
	
	
	<style>
	
.holder_language{
	cursor:pointer;
	position:absolute;
	top:-50px;
	right:12px;
	width:70px
}
	
.dropdown,
.dropdown-menu li {
    background-color: #fff!important;
}

.combobox,
.dropdown,
.input {
    color: #555 !important
}
.combobox {
    text-align: left;
    width: 100%;
    margin: 0 !important!important;;
    border: 0 solid #ccc!important;;
    padding: 7px 0 9px !important;
    height: 15px !important
}
.combobox:active,
.combobox:focus,
.combobox:hover,
.input:active,
.input:focus,
.input:hover {
    outline: #fff solid 0 !important
}
.combobox .arrow {
    float: right;
    border-top: 6px solid #555;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    margin-top: 13px;
    font-size: 14px
}
.dropdown-menu {
    display: none;
    left: 0;
    padding: 0 !important;
    position: absolute;
    width: 100% !important;
    margin-top: 5px !important
}
.dropdown {
    margin: 0;
    margin-top: 10px !important;
    width: 80% !important;
    height: 34px !important;
    position: relative;
    border: 1px solid #ccc !important;
    padding: 0 10px 5px !important;
}
#dropdown_list_lang.dropdown-menu li {
    list-style: none;
	outline: unset!important;
    cursor:pointer;
    padding: 5px 10px;
    text-align: left;
    z-index: 2000;
    font-size: 14px
}
#dropdown_list_lang.dropdown-menu {
    display: none;
    left: 0;
    padding: 0 !important;
    position: absolute;
    width: 100% !important;
    margin-top: 60px !important
}
#dropdown_list_lang.dropdown-menu li *{
    cursor:pointer;
	font-size:13px;
}
.dropdown-menu li:hover {
    background-color: #D6E5E6
}
.selected {
    background-color: #D6E5E6 !important
}
.dropdown-show {
    display: block !important
}

#dropdown_label_selected_lang{
	font-size:13px;
}

#dropdown_holder_lang{
	margin:0px!important;
	border:0px !important;
	background-color:unset!important;
}
	
#dropdown_list_lang{
	box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
	top:-58px;
}
	
#dropdown_btn_lang{
	background-color:unset!important;
}
</style>
<script>

var lang_id=<ty:selected_language/>;

 function controlClosedrop(name) {
      var ul = document.getElementById("dropdown_list_"+name);
      ul.setAttribute("class", "dropdown-menu"),ul.setAttribute("data-show", "false");
  }

function controlDropdown(e,name) {

      

      var ul = document.getElementById("dropdown_list_"+name),
          ul_data = ul.getAttribute("data-show");
      if ("false" == ul_data)
	  ul.setAttribute("class", "dropdown-show dropdown-menu"), ul.setAttribute("data-show", "true");
      else {
          var dropdown_holder = document.getElementById("dropdown_holder_"+name),
              btn = document.getElementById("dropdown_btn_"+name),
              title = document.getElementById("dropdown_label_selected_"+name),
              arrow = document.getElementById("dropdown_arrow_"+name);
          e.target !== dropdown_holder && e.target !== btn && e.target !== title &&
		  e.target !== arrow && checkequalli(e,ul)  && controlClosedrop(name)
      }
	  

	  
  }
  
  
   function onclickOnBody(e) {

	   var ul_open=document.getElementsByClassName('dropdown-show'),
	   name;
	   
	   var dropdown_holder ,
				  btn ,
				  title ,
				  arrow ;
			  
	   for(var i=0;i<ul_open.length;i++){
	   
		 name=ul_open[i].getAttribute("data-name");
		 
		   dropdown_holder = document.getElementById("dropdown_holder_"+name),
		   btn = document.getElementById("dropdown_btn_"+name),
		   title = document.getElementById("dropdown_label_selected_"+name),
		   arrow = document.getElementById("dropdown_arrow_"+name);
		   
		   
			  e.target !== dropdown_holder && e.target !== btn && e.target !== title &&
			  e.target !== arrow && checkequalli(e,ul_open[i])  && controlClosedrop(name)
		 
		
	   }
   
    
    
  }
  
  
   function controlOnclcikForSetInputTypeLogin(value, flag,element) {
   
      var html_of_li = element.innerText,
	      ul=element.parentNode,
		  name=ul.getAttribute("data-name"),
          hidden = document.getElementById("dropdown_hidden_"+name),
		  li=ul.children;
		 
      for(var i=0; i<li.length;i++){
	    li[i].setAttribute("class", "");
	  }
	  
	  element.setAttribute("class", "selected");
	  
	  hidden.setAttribute("value", value);
	  
	    var i = document.getElementById("dropdown_btn_"+name);
            i.setAttribute("value", html_of_li );
	  
	    var r = document.getElementById("dropdown_label_selected_"+name);
        r.innerHTML = html_of_li;
	  
	    flag && controlClosedrop(name);
		
	
		top.location='?lang_id='+value;
		
		
	  
  }
  
  
  	  function checkequalli(e,ul){
	  
	     var li=ul.children,
		 label;
		 
	     for(var i=0;i<li.length; i++){
		 
		   if(li[i]==e.target)
		   return false;
		   
		   label=li[i].children;
		   
		   for(var j=0;j<label.length;j++){
			  if(label[j]==e.target)
		        return false;
		   }
		   
		 }
		 
		 return true;
	  }
	  
	 function controlkeypressSelectLoginType(element, event) {
		 
	  }
	  
	  function onloadbody() {
	  
	    setborder("holder_id_login");
	    var e = document.getElementById("id_login");
	    e.focus();
		
		createComboLanguage();
		
		document.getElementById('link_forgot_password').setAttribute('href','/public/home/forgot_password?lang_id='+lang_id);
		document.getElementById('link_portal').setAttribute('href','/public/portal/login?lang_id='+lang_id);
		document.getElementById('dropdown_hidden_lang').value=lang_id;
		
	
	}
	
	function createComboLanguage(){
	
	var selected=lang_id,
	list=<ty:language_list/>;
	
	var str_out='';
	
	
	for(var i=0;i<list.length;i++){
     
	   if(list[i][0]==selected){
	        document.getElementById('dropdown_label_selected_lang').innerText=list[i][1];
    	}
		
	  str_out+='<li  onclick="controlOnclcikForSetInputTypeLogin('+list[i][0]+',true,this);" id="li_male"><label id="dropdown_option_male_lang">'+list[i][1]+'</label></li>';
	  
	}

	document.getElementById('dropdown_list_lang').innerHTML=(str_out);
	
	}


</script>
</head>

<body id="holder_for_Error_IE" onclick="onclickOnBodyShabake(event);" onkeypress="exitpage(event)" onload="onloadbody()">
    <div id="body" class="body" onclick="onclickOnBody(event);">
		
        <div id="teamyar_info" class="ti_holder">
        </div>
        <div class="container">
            <div id="holder_form" class="HolderMain">
                <div class="row">
                <center> 
				<a id="svg_logo">
				<img class="img_logo" src="<ty:teamyar_logo/>"/>
				</a>
				
				<form name="login" action="" id="form" method="post" >
					
					<div class="input dropdown" id="holder_for_dropdown" style="display:<ty:use_ldap/>;" >
						<input type="hidden" name="login_type" value="<ty:login_type_value/>" id="login_type_hidden" />
						<div  onfocus="Dropdown(event);" onblur="Dropdown(event);"  onkeyup="keypressSelectLoginType(this,event)" tabindex="1"  onclick="event.preventDefault();"  class="input combobox" id="login_type" value="<ty:login_type_value/>">
						<span id="text_list_login"><ty:login_type/></span>
						<span class="arrow" id="id_arrow"></span>
						</div>
						<ul id="list_type_login" data-show="false" class="dropdown-menu">
							<li  onclick="onclcikForSetInputTypeLogin('netwotk',true);" id="li_netwotk"><label id="netwotk"><ty:LOGIN_TYPE_NETWORK/></label></li>
							<li  onclick="onclcikForSetInputTypeLogin('teamyar',true);" id="li_teamyar"><label id="teamyar" ><ty:LOGIN_TYPE_TEAMYAR/></label></li>
						  </ul>
					</div>
					
					<div class="form-control" id="holder_id_login">
						<input tabindex="2" onfocus="setborder('holder_id_login');closedrop();" onblur="removeborder('holder_id_login')" onkeypress="submitForm(event)" type="text" class="input" name="login" id="id_login" placeholder="<ty:login/>"/>
					</div>
					
					<div class="form-control" id="holder_id_password" >
						<input tabindex="3" onfocus="setborder('holder_id_password')" onblur="removeborder('holder_id_password')"  onkeypress="submitForm(event);checkCapsLock(event);" type="password" class="input" id="id_password" name="password" placeholder="<ty:password/>" />
					</div>
					
					<div class="holder_checkbox" id="error_holder" style="height:29px;display:<ty:login_error/>;" >
					
					 <p class="messageError" id="error_text"><ty:error_message/></p>
					 
					 <span id="icon_capslock" style="display:none;" >
						<svg style="vertical-align:-21%;" id="icon_capslock" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="18px" height="18px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">
						
						
						<g>
							<path fill="#ff9900" d="M15.547,11.15l-5.254-9.106c-0.475-0.82-1.35-1.325-2.296-1.325c-0.947,0-1.822,0.505-2.295,1.325
								l-5.347,9.261c-0.473,0.82-0.473,1.831,0,2.65c0.474,0.82,1.349,1.325,2.295,1.325h10.693c0.004,0,0.006,0,0.006,0
								c1.463,0,2.65-1.187,2.65-2.65C16,12.082,15.832,11.571,15.547,11.15z M9.131,12.036c0,0.627-0.48,1.105-1.131,1.105
								c-0.649,0-1.132-0.479-1.132-1.105v-0.025c0-0.624,0.482-1.106,1.132-1.106c0.65,0,1.131,0.479,1.131,1.106V12.036z M9.158,4.582
								L8.598,9.473C8.561,9.825,8.326,10.044,8,10.044S7.44,9.822,7.402,9.473l-0.56-4.894C6.805,4.201,7.01,3.915,7.362,3.915h1.273
								C8.988,3.918,9.195,4.204,9.158,4.582z"/>
						</g>
						</svg>
					</span>		   
					</div>
					
					<div class="form-control btn" tabindex="4" onkeypress="submitForm(event)" onclick="submitAndShowLoading();"><ty:login_btn/></div>
					<div class="holder_info_pass" >
						 <label style="padding-right: 12px;" class="ch_remember text"><ty:remember_me/>&nbsp;<input style="position:absolute;margin-top:5px;" tabindex="5" name="remember" id="remember" type="checkbox"/></label>
					</div>
					<div class="holder_info_pass" style="padding-bottom: 10px;">
						<label class="ch_lose text"> <a id="link_forgot_password" class="text" href='/public/home/forgot_password' tabindex="6"> <ty:forgot_password/></a>	</label>			   
					</div>
					<input type="hidden" name="lang_id" value="" id="dropdown_hidden_lang" />
			    </form>
				</center>
                </div>
				<div class="holder_language" style="">
					
					
					
					<div class="input dropdown" id="dropdown_holder_lang"  >
						
						<div  onclick="controlDropdown(event,'lang');" onblur="controlDropdown(event,'lang');"  onkeyup="controlkeypressSelectLoginType(this,event)"   class="input combobox" id="dropdown_btn_lang" value="">
						<span id="dropdown_label_selected_lang"></span>
						<span class="arrow" id="dropdown_arrow_lang"></span>
						</div>
						<ul id="dropdown_list_lang" data-name="lang" data-show="false" class="dropdown-menu">
						</ul>
					</div>
					
					
					
					
					
				</div>
            </div>
            <div id="holder_info">
				
				<center style="padding-top:0 !important;">
					<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="3.05555in"
					height="1.11111in" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
					viewBox="0 0 3056 1111" xmlns:xlink="http://www.w3.org/1999/xlink">
						<ty:svg_logo/>
					</svg>
				</center>
				<p class="teamyar_text"><ty:TRANSLATE_LOGIN1/></p>
				<br/>
				<p class="teamyar_text"><ty:TRANSLATE_LOGIN2/></p>
				<br/>
				<p class="teamyar_text"><ty:website/> : <a href="http://www.teamyar.com/">www.teamyar.com</a></p>
			</div>
            <!--[if IE ]>
				<script type="text/javascript" >
			
						 var holder_for_Error_IE=document.getElementById("holder_for_Error_IE");
					
						holder_for_Error_IE.innerHTML= '<div style="width:100%;height:70%;color:red;margin:0 auto;padding-top:180px;left:0;right:0;position:absolute;text-align:center;direction:rtl;">'+error+'<br/><br/><br/> <p class="text">version&nbsp;<ty:version_num/>&nbsp;&nbsp;&nbsp;&copy; 2007-2015 <a tabindex="4"  href="http://www.softsys.net/" target="_blank" class="ty_href ch_lose text" >&nbsp;&nbsp;&copy;Soft System Kish</a></p></div>';

				</script>
			<![endif]-->
        </div>
		
		<a href="http://download.teamyar.com/real/downloads/download_teamyar_app.html"><div id="btn_android" class="text_android" >
		<span class="text_android"><ty:download_version/></span>
		</div>
		</a>
		<a id="link_portal" href="/public/portal/login"><div id="btn_portal" class="text_portal" style="display:<ty:show_btn_portal/>;"><ty:customer_portal/></div></a>
		
        <div class="footer">
				<svg  id="logo_color_change" class="cursor-pointer" onclick="showInfo()" fill="#999" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="74px"
					height="36px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
					viewBox="0 0 3056 1111" xmlns:xlink="http://www.w3.org/1999/xlink">
					<ty:svg_logo/>
                </svg>
				<!--<div id="close_info_btn" style="display:none;color:#fff;font-size:26px;" class="cursor-pointer" onclick="showInfo()">&#10754;</div>-->
				<svg id="close_info_btn" style="display:none;margin-bottom:8px;" fill="#fff" class="cursor-pointer" onclick="showInfo()"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="28px" height="28px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
				<g>
					<g>
						<path d="M27.314,4.685C24.291,1.663,20.273,0,16,0S7.708,1.663,4.685,4.685C1.663,7.708,0,11.727,0,16s1.663,8.291,4.685,11.314
							C7.708,30.337,11.727,32,16,32s8.291-1.663,11.314-4.686C30.337,24.291,32,20.273,32,16S30.337,7.708,27.314,4.685z M16,30.233
							C8.154,30.233,1.767,23.846,1.767,16C1.767,8.154,8.154,1.767,16,1.767c7.846,0,14.233,6.387,14.233,14.233
							C30.233,23.846,23.846,30.233,16,30.233z"/>
						<path d="M19.953,12.047c-0.349-0.347-0.904-0.347-1.25,0L16,14.75l-2.703-2.703c-0.347-0.347-0.903-0.347-1.25,0
							c-0.347,0.347-0.347,0.903,0,1.25L14.75,16l-2.703,2.703c-0.347,0.346-0.347,0.901,0,1.25c0.17,0.17,0.399,0.261,0.622,0.261
							s0.452-0.084,0.622-0.261l2.703-2.703l2.703,2.703c0.17,0.17,0.399,0.261,0.622,0.261c0.222,0,0.452-0.084,0.621-0.261
							c0.347-0.349,0.347-0.904,0-1.25L17.25,16l2.703-2.703C20.299,12.95,20.299,12.395,19.953,12.047z"/>
					</g>
				</g>
				</svg>
				<div id="close_info_btn_corner" style="display:none;color:#fff !important;" class="cursor-pointer_corner" onclick="showInfo()" >&#10006;&#xFE0E;</div>	
			<div>
                <p onclick="showInfo()" id="copyright" class="text cursor-pointer" style="color: #999;">version&nbsp;<ty:version_num/>&nbsp;&copy;&nbsp;2007-<ty:year/>&nbsp;&nbsp;Soft System Kish</p>
            </div>
        </div>
			<p class="text_domain"><ty:domain/></p>
			<div id="div-loading" style="z-index:3000;display: none; width: 100%; height: 100%; position: absolute; top: 0px; background-color: rgba(255, 255, 255, 0.6);">
             <div style="margin: 0px auto; height: 32px; top: 30%; position: relative; width: 300px;">
				<center>
					<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
						<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
							s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
							c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z">
						</path>
						<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
							C22.32,8.481,24.301,9.057,26.013,10.047z">
							<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
						</path>
					 </svg>
				</center>
				<p style="text-align: center; font-size: 12px;"><ty:LOADING/></p>
			</div>
		</div>
    </div>


</body>

</html>
