(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d046f338"],{"3c6f":function(t,s,a){t.exports=a.p+"img/logo_white.2540fc08.svg"},"49bf":function(t,s,a){t.exports=a.p+"img/envelope-solid.a1b1533c.svg"},"7aff":function(t,s,a){t.exports=a.p+"img/facebook-brands.7df7570f.svg"},aaa6:function(t,s,a){"use strict";var o=a("d590"),c=a.n(o);c.a},b924:function(t,s,a){"use strict";a.r(s);var o=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("header",[a("div",{staticClass:"room-bg bg-1",style:{"background-image":"url("+t.loopRoom[t.loopIndex]+")"}}),t._m(0)]),a("main",[a("RoomCard",{attrs:{rooms:t.rooms}})],1)])},c=[function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"header-content"},[o("img",{attrs:{src:a("3c6f"),alt:"White Space Hotel"}}),o("div",{staticClass:"flex-rcc contactSec"},[o("div",{staticClass:"IGFB flex-rcc"},[o("img",{staticClass:"mediaIcon",attrs:{src:a("d477")}}),o("img",{staticClass:"mediaIcon",attrs:{src:a("7aff")}})]),o("div",{staticClass:"middleLine"}),o("div",{staticClass:"contactBox"},[o("div",{staticClass:"contactText"},[o("img",{staticClass:"contactIcon",attrs:{src:a("cf63")}}),o("p",[t._v("02-17264937")])]),o("div",{staticClass:"contactText"},[o("img",{staticClass:"contactIcon",attrs:{src:a("49bf")}}),o("p",[t._v("whitespace@whitespace.com.tw")])]),o("div",{staticClass:"contactText"},[o("img",{staticClass:"contactIcon",attrs:{src:a("c6c2")}}),o("p",[t._v("台北市羅斯福路十段30號")])])])])])}],i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"rooms"},[a("ul",{staticClass:"card-container flex-rcc"},t._l(t.rooms,(function(s){return a("li",{key:s.id,staticClass:"card-item"},[a("a",{staticClass:"card-link",attrs:{href:"javascript:;"},on:{click:function(a){return a.preventDefault(),t.checkRoomDetail(s.id)}}},[a("img",{staticClass:"room-img",attrs:{src:s.imageUrl}}),a("div",{staticClass:"room-description flex-ccl"},[a("div",{staticClass:"room-name"},[a("p",[t._v(t._s(s.name))])]),a("div",{staticClass:"room-cost flex-rsbc"},[a("p",[t._v(" NT."+t._s(s.normalDayPrice)+" "),a("span",[t._v("平日")])]),a("span",[t._v("NT."+t._s(s.holidayPrice)+" 假日")])])])])])})),0)])},e=[],n={props:["rooms"],methods:{checkRoomDetail:function(t){this.$router.push("roominfo/".concat(t))}}},r=n,l=a("2877"),m=Object(l["a"])(r,i,e,!1,null,null,null),p=m.exports,d={components:{RoomCard:p},data:function(){return{rooms:[],loopRoom:["https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"],loopIndex:0}},created:function(){var t=this;this.$http.get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms",{headers:{Authorization:"Bearer fjvgAkJM7GUZwUIVZvktJmICowRuZMD5i8LUgZ39oo0c9s1ys4eO9rX0dA9E",accept:"application/json"}}).then((function(s){t.rooms=s.data.items}))},mounted:function(){var t=this;setInterval((function(){t.loopIndex>=t.loopRoom.length-1?t.loopIndex=0:t.loopIndex++}),3500)}},f=d,u=(a("aaa6"),Object(l["a"])(f,o,c,!1,null,"50c46fd2",null));s["default"]=u.exports},c6c2:function(t,s,a){t.exports=a.p+"img/home.1600889c.svg"},cf63:function(t,s,a){t.exports=a.p+"img/phone.6dbf65e5.svg"},d477:function(t,s,a){t.exports=a.p+"img/instagram-brands.cc5e92b0.svg"},d590:function(t,s,a){}}]);
//# sourceMappingURL=chunk-d046f338.fa238ee3.js.map