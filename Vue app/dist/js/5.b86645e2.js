(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"0rxc":function(e,t,n){},"0sh+":function(e,t,n){var r=n("quPj"),i=n("vhPU");e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(i(e))}},"0uMJ":function(e,t,n){"use strict";var r=n("FJHh"),i=n.n(r);i.a},"6J6a":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",e._l(e.checkins,function(e){return n("li",{key:e.id},[n("checkin-item",{attrs:{checkin:e}})],1)}))},i=[],c=n("yo3i"),u={props:{checkins:{type:Array,required:!0}},components:{CheckinItem:c["a"]}},a=u,s=(n("0uMJ"),n("KHd+")),o=Object(s["a"])(a,r,i,!1,null,null,null);t["a"]=o.exports},FJHh:function(e,t,n){},KVLZ:function(e,t,n){},L9rh:function(e,t,n){"use strict";var r=n("cdBF"),i=n.n(r);i.a},L9s1:function(e,t,n){"use strict";var r=n("XKFU"),i=n("0sh+"),c="includes";r(r.P+r.F*n("UUeW")(c),"String",{includes:function(e){return!!~i(this,e,c).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},TDtD:function(e,t,n){"use strict";var r=n("KVLZ"),i=n.n(r);i.a},UUeW:function(e,t,n){var r=n("K0xU")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,!"/./"[e](t)}catch(e){}}return!0}},Wxiv:function(e,t,n){"use strict";var r=n("0rxc"),i=n.n(r);i.a},XQEb:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._t("default",null,{beer:e.beer})],2)},i=[],c=n("+aOy"),u={apollo:{beer:{query:c["e"],variables:function(){return{id:this.id||Math.round(160*Math.random())+"",detailed:this.detailed}},fetchPolicy:"cache-and-network"}},props:{id:{type:String,default:null,required:!1},detailed:{type:Boolean,default:!1,required:!1}},data:function(){return{beer:{},loading:!1}}},a=u,s=n("KHd+"),o=Object(s["a"])(a,r,i,!1,null,null,null);t["a"]=o.exports},Z2Ku:function(e,t,n){"use strict";var r=n("XKFU"),i=n("w2a5")(!0);r(r.P,"Array",{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),n("nGyu")("includes")},cdBF:function(e,t,n){},klC1:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Feed"},[n("h1",[e._v("Feed")]),n("div",[n("h2",[e._v("Have you tried these beers?")]),n("random-beers")],1),n("div",[n("h2",[e._v("Had most recently")]),n("user-feed-provider",{scopedSlots:e._u([{key:"default",fn:function(e){var t=e.checkins;return n("checkin-list",{attrs:{checkins:t}})}}])})],1)])},i=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(6,function(t){return n("beer-provider",{key:t,staticClass:"container",scopedSlots:e._u([{key:"default",fn:function(e){return[n("beer-item",{attrs:{beer:e.beer}})]}}])})}))},u=[],a=n("XQEb"),s=n("mY5e"),o={components:{BeerProvider:a["a"],BeerItem:s["a"]}},l=o,d=(n("L9rh"),n("KHd+")),f=Object(d["a"])(l,c,u,!1,null,"502fbb30",null),v=f.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._t("default",null,{checkins:e.userFeed})],2)},p=[],b=(n("xfY5"),n("iv4g")),k=(n("Z2Ku"),n("L9s1"),n("+aOy")),_={data:function(){return{userFeed:[]}},computed:{user:function(){return this.$store.state.userInfo}},apollo:{userFeed:{query:k["h"],fetchPolicy:"cache-and-network",variables:function(){return{limit:this.limit}},error:function(e){console.log(e)},subscribeToMore:{document:k["b"],updateQuery:function(e,t){var n=e.userFeed,r=t.subscriptionData.data.checkinAdded,i=r.user.id,c=this.user,u=c.friends,a=c.id,s=Object(b["a"])(u).concat([a]).includes(i);return{userFeed:s?[r].concat(Object(b["a"])(n)):n}},variables:function(){return{onlyBeers:!1}},error:function(e){console.log(e)}}}},props:{limit:{type:Number,required:!1,default:18}}},m=_,y=(n("Wxiv"),Object(d["a"])(m,h,p,!1,null,null,null)),x=y.exports,g=n("6J6a"),F={components:{RandomBeers:v,UserFeedProvider:x,CheckinList:g["a"]}},K=F,C=Object(d["a"])(K,r,i,!1,null,null,null);t["default"]=C.exports},nGyu:function(e,t,n){var r=n("K0xU")("unscopables"),i=Array.prototype;void 0==i[r]&&n("Mukb")(i,r,{}),e.exports=function(e){i[r][e]=!0}},quPj:function(e,t,n){var r=n("0/R4"),i=n("LZWt"),c=n("K0xU")("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[c])?!!t:"RegExp"==i(e))}},yo3i:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkin"},[n("div",{staticClass:"header"},[n("avatar",{staticClass:"profile-picture",attrs:{id:e.checkin.user.id}}),n("div",[e._v(e._s(e.checkin.user.username))])],1),n("div",{staticClass:"body"},[n("router-link",{attrs:{to:"/beer/"+e.checkin.beer.id}},[n("div",{directives:[{name:"background",rawName:"v-background",value:e.checkin.beer.image_url,expression:"checkin.beer.image_url"}],staticClass:"beer-picture"})]),n("div",{staticClass:"title"},[n("h5",[e._v(e._s(e.checkin.beer.name))])]),n("p",[e._v('\n            "'+e._s(e.checkin.text)+'"\n        ')]),n("p",[e._v("Rating: "+e._s(e.checkin.rating))])],1),n("div",{staticClass:"footer"},[e._v("\n      "+e._s(e._f("ago")(e.checkin.createdAt))+"\n    ")])])},i=[],c=n("vYcY"),u={props:{checkin:{type:Object,default:function(){}}},components:{Avatar:c["a"]}},a=u,s=(n("TDtD"),n("KHd+")),o=Object(s["a"])(a,r,i,!1,null,"63ce8266",null);t["a"]=o.exports}}]);
//# sourceMappingURL=5.b86645e2.js.map