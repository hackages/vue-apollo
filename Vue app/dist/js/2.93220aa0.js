(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{z8vP:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("\n  coucou\n  "),n("h4",{staticClass:"mv3"},[e._v(e._s(e.login?"Login":"Sign Up"))]),n("div",{staticClass:"flex flex-column"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"Your username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("div",{staticClass:"flex mt3"},[n("button",{staticClass:"pointer mr2 button",on:{click:function(t){e.confirm()}}},[e._v("\n      "+e._s(e.login?"login":"create account")+"\n    ")]),n("button",{staticClass:"pointer button",on:{click:function(t){e.login=!e.login}}},[e._v("\n      "+e._s(e.login?"need to create an account?":"already have an account?")+"\n    ")])])])},a=[],o=(n("ls82"),n("MECJ")),r=n("yT7P"),i=n("+aOy"),u={username:"",password:""},c={name:"Login",data:function(){return Object(r["a"])({},u,{login:this.$route.params.login||!1})},methods:{confirm:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,n,s,a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.login){e.next=13;break}return console.log("will create user",this.username),e.prev=2,e.next=5,this.$apollo.mutate({mutation:i["c"],variables:{username:this.username,password:this.password}});case 5:t=e.sent,console.log(t),e.next=13;break;case 9:return e.prev=9,e.t0=e["catch"](2),console.warn(e.t0),e.abrupt("return",-1);case 13:return e.prev=13,e.next=16,this.$apollo.mutate({mutation:i["i"],variables:{username:this.username,password:this.password}});case 16:n=e.sent,s=n.data.signInUser,a=s.token,o=s.user,console.log(o),this.saveUserData(o,a),e.next=27;break;case 24:e.prev=24,e.t1=e["catch"](13),console.warn(e.t1);case 27:case"end":return e.stop()}},e,this,[[2,9],[13,24]])}));return function(){return e.apply(this,arguments)}}(),saveUserData:function(e,t){console.log("user",e),localStorage.setItem("token",t),this.$store.commit("setUserInfo",e),this.$router.push("/feed")}}},l=c,p=n("KHd+"),m=Object(p["a"])(l,s,a,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=2.93220aa0.js.map