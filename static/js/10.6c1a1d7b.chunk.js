(this["webpackJsonpreact-01"]=this["webpackJsonpreact-01"]||[]).push([[10,18,22,40,41,43],{205:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r);t.default=function(e){var t=e.title,n=e.txt,r=void 0===n?a.a.createElement("div",null):n,i=e.btn,c=void 0===i?a.a.createElement("div",null):i;return a.a.createElement("div",{className:"content-title"},a.a.createElement("h3",null,t),r,c)}},206:function(e,t,n){"use strict";n.r(t);n(464);var r=n(465),a=n(9),i=n(26),c=n(28),o=n(35),u=n(34),l=n(36),s=n(0),d=n.n(s),f=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).changePage=function(e){var t=n.props,r=t.params;(0,t.getList)(Object(a.a)({},r,{page:e}))},n.changePageSize=function(e,t){var r=n.props,i=r.params;(0,r.getList)(Object(a.a)({},i,{page:e,page_size:t}))},n.state={},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.page;return d.a.createElement("div",{style:{textAlign:"right",padding:"80px 0 0 0"}},d.a.createElement(r.a,{total:e.total,current:e.page,showSizeChanger:!0,showQuickJumper:!0,onChange:this.changePage,onShowSizeChange:this.changePageSize}))}}]),t}(s.Component);t.default=f},213:function(e,t,n){"use strict";n.r(t);var r=n(26),a=n(28),i=n(35),c=n(34),o=n(36),u=n(0),l=n.n(u),s=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={},n}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"secondDiv animated slideInRight"},"this is ManageOutLine")}}]),t}(u.Component);t.default=s},214:function(e,t,n){"use strict";n.r(t);n(459);var r=n(461),a=n(26),i=n(28),c=n(35),o=n(34),u=n(36),l=n(0),s=n.n(l),d=n(205),f=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(c.a)(this,Object(o.a)(t).call(this,e))).state.loading=!0,n}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=.6*this.refs.need.clientHeight;this.setState({scroll:{x:1600,y:e}})}},{key:"render",value:function(){var e=this.props.location.state;return s.a.createElement("div",{ref:"need",className:"secondDiv animated slideInRight"},s.a.createElement(d.default,{title:s.a.createElement("div",null,e&&e.title,"\xa0\xa0\xa0",s.a.createElement("span",{style:{fontSize:14,fontWeight:"normal"}},"\u6ce8\uff1a\u7b14\u8bd5\u5c0f\u9898\u53ea\u80fd\u652f\u6491\u5f3a\u652f\u6491\u7684\u76ee\u6807\u5176\u4e2d\u4e00\u4e2a\uff0c\u8bfe\u7a0b\u76ee\u6807\u603b\u6743\u91cd\u5e94\u4e3a1"))}),s.a.createElement(r.a,{style:{margin:"10px 0",height:2,backgroundColor:"#f0f2f5"}}))}}]),t}(n(455).a);t.default=f},215:function(e,t,n){"use strict";n.r(t);n(458);var r,a=n(457),i=(n(89),n(58)),c=n(9),o=n(26),u=n(28),l=n(35),s=n(34),d=(n(79),n(36)),f=n(0),h=n.n(f),p=n(66),m=n(205),v=n(206),g=n(456),b=n(455),O=n(155),j=Object(p.b)((function(e){return{lists:e.course.manageScore.lists.map((function(e,t){var n=e.student,r=n.class;return{key:n.id,class:r,name:n.name,student_no:n.student_no}})),page:e.course.manageScore.page}}),{getList:O.c})(r=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(s.a)(t).call(this,e))).getList=function(e){var t=n.props.page,r=t.page,a=t.page_size;n.setState({loading:!0}),n.props.getList(Object(c.a)({page:r,page_size:a},e,{training_plan_id:n.state.training_plan_id}))},n.state.loading=!0,n.state.training_plan_id=n.props.location.state.id,n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.refs.need,t=.6*e.clientHeight;this.setState({scroll:{x:e.clientWidth-40,y:t}}),this.getList()}},{key:"componentWillReceiveProps",value:function(e){this.setState({loading:!1})}},{key:"render",value:function(){var e=this.props.location.state,t=this.state,n=t.scroll,r=t.search_params,c=t.loading,o=this.props,u=o.lists,l=o.page;return h.a.createElement("div",{ref:"need",className:"secondDiv animated slideInRight"},h.a.createElement(m.default,{title:e&&e.title||"",txt:h.a.createElement("div",{style:{fontSize:20}},e.h3),btn:h.a.createElement("div",null,h.a.createElement(i.a,{type:"primary"},"\u6279\u91cf\u5bfc\u5165"),h.a.createElement(i.a,{type:"primary",className:"ml20"},"\u65b0\u589e"))}),h.a.createElement(a.a,{style:{marginTop:20,backgroundColor:"#fff",maxHeight:n.y+"px"},loading:c,scroll:n,dataSource:u,size:"middle",pagination:!1,bordered:!0,columns:g.g}),h.a.createElement(v.default,{page:l,params:r,getList:this.getList}))}}]),t}(b.a))||r;t.default=j},233:function(e,t,n){"use strict";n.r(t);n(458);var r,a=n(457),i=n(26),c=n(28),o=n(35),u=n(34),l=n(36),s=n(9),d=(n(89),n(58)),f=n(42),h=n(0),p=n.n(h),m=n(66),v=n(48),g=n(25),b=n(205),O=n(206),j=n(213),y=n(214),x=n(215),E=n(456),k=n(455),_=n(155),w=[{name:"outLine",txt:"\u67e5\u770b\u5927\u7eb2",component:j.default},{name:"set",txt:"\u8003\u6838\u8bbe\u7f6e",component:y.default},{name:"score",txt:"\u4e0a\u4f20\u6210\u7ee9",component:x.default}],I=[].concat(Object(f.a)(E.a),[Object(E.r)({width:260,fixed:"right",render:function(e,t){return p.a.createElement("div",null,w.map((function(e,n){return p.a.createElement(d.a,{type:"primary",size:"small",className:n?"ml10":"",key:e.name},p.a.createElement(v.b,{to:{pathname:"/course/manage/".concat(t.id,"/").concat(e.name),state:{id:t.id,title:e.txt,h3:t.term.title+"-"+t.course.title}}},e.txt))})))}})]),S=Object(m.b)((function(e){return Object(s.a)({},e.course.manage)}),{getList:_.b})(r=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).getList=function(e){var t=n.props.page,r=t.page,a=t.page_size;n.setState({loading:!0}),n.props.getList(Object(s.a)({page:r,page_size:a},e))},n.state.loading=!0,n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=.6*this.refs.need.clientHeight;this.setState({scroll:{x:1600,y:e}}),this.getList()}},{key:"componentWillReceiveProps",value:function(e){this.setState({loading:!1})}},{key:"render",value:function(){var e=this,t=this.props.location.state,n=this.state,r=n.scroll,i=n.search_params,c=n.loading,o=this.props,u=o.lists,l=o.page;return p.a.createElement("div",{ref:"need"},p.a.createElement(b.default,{title:t&&t.title||""}),p.a.createElement(a.a,{style:{marginTop:20,backgroundColor:"#fff",maxHeight:r.y+"px"},loading:c,scroll:r,dataSource:u,size:"middle",pagination:!1,bordered:!0,columns:I}),p.a.createElement(O.default,{page:l,params:i,getList:this.getList}),w.map((function(t){return p.a.createElement(g.b,{key:t.name,path:"".concat(e.props.match.path,"/:id/").concat(t.name),component:t.component})})))}}]),t}(k.a))||r;t.default=S},455:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));n(79);var r=n(9),a=n(26),i=n(35),c=n(34),o=n(36),u=n(0),l=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),t}(function(e){function t(){var e,n;Object(a.a)(this,t);for(var o=arguments.length,u=new Array(o),l=0;l<o;l++)u[l]=arguments[l];return(n=Object(i.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).confirm=function(){var e=n.fixedParams();n.getList(Object(r.a)({},e,{page:1}))},n.reset=function(){n.setState({search_params:n.resetParams()},(function(){n.confirm()}))},n}return Object(o.a)(t,e),t}(function(e){function t(){var e,n;Object(a.a)(this,t);for(var o=arguments.length,u=new Array(o),l=0;l<o;l++)u[l]=arguments[l];return(n=Object(i.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).fixedParams=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e=Object(r.a)({},n.state.search_params,{},e),Object.keys(e).forEach((function(t){e[t]||delete e[t]})),e},n.resetParams=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e=Object(r.a)({},n.state.search_params,{},e),Object.keys(e).forEach((function(t){e[t]=null})),e},n}return Object(o.a)(t,e),t}(function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={scroll:{x:2e3,y:0},search_params:{}},n}return Object(o.a)(t,e),t}(u.Component))))},456:function(e,t,n){"use strict";n.d(t,"r",(function(){return w})),n.d(t,"c",(function(){return N})),n.d(t,"d",(function(){return D})),n.d(t,"e",(function(){return A})),n.d(t,"f",(function(){return H})),n.d(t,"b",(function(){return R})),n.d(t,"a",(function(){return M})),n.d(t,"g",(function(){return W})),n.d(t,"h",(function(){return J})),n.d(t,"v",(function(){return T})),n.d(t,"t",(function(){return q})),n.d(t,"y",(function(){return B})),n.d(t,"z",(function(){return Q})),n.d(t,"B",(function(){return F})),n.d(t,"C",(function(){return G})),n.d(t,"w",(function(){return K})),n.d(t,"x",(function(){return U})),n.d(t,"D",(function(){return V})),n.d(t,"A",(function(){return X})),n.d(t,"u",(function(){return Y})),n.d(t,"j",(function(){return Z})),n.d(t,"l",(function(){return $})),n.d(t,"m",(function(){return ee})),n.d(t,"i",(function(){return te})),n.d(t,"n",(function(){return ne})),n.d(t,"k",(function(){return re})),n.d(t,"o",(function(){return ae})),n.d(t,"q",(function(){return ie})),n.d(t,"p",(function(){return ce})),n.d(t,"s",(function(){return oe}));n(462);var r=n(463),a=n(42),i=n(9),c=n(0),o=n.n(c),u=n(3),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"title",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dataIndex",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return Object(i.a)({title:e,dataIndex:t,key:n},r)},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5165\u5b66\u5e74\u4efd","enter_year"),{},e)},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u4e13\u4e1a","major"),{},e)},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u652f\u6491\u70b9","support"),{},e)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5b66\u53f7","student_no"),{},e)},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u59d3\u540d","name"),{},e)},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u7cfb","department"),{},e)},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u73ed\u7ea7","class"),{},e)},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5b66\u671f","terms"),{},e)},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8bfe\u7a0b\u7ec4\u8bfe\u7a0b","courses"),{},e)},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8bfe\u7a0b\u7ec4\u7ec4\u957f","leader"),{},e)},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8bfe\u7a0b\u7ec4\u6559\u5e08","teacher"),{},e)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5e73\u5747\u503c","average"),{},e)},x=Array(12).fill(1).map((function(e,t){return l("\u8981\u6c42".concat(t+1),"achivement_".concat(t+1))})),E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u7c7b\u522b","course_type"),{},e)},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8bfe\u7a0b\u7f16\u53f7","course_no"),{},e)},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5b66\u5206","score"),{},e)},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u64cd\u4f5c","operation"),{},e)},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u6bd5\u4e1a\u8981\u6c42","number"),{},e)},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5177\u4f53\u6bd5\u4e1a\u8981\u6c42","content"),{},e)},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u6743\u91cd","weight"),{},e)},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u5b66\u9662","college"),{},e)},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u6dfb\u52a0\u65f6\u95f4","create_time"),{},e)},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u89d2\u8272","role"),{},e)},N=[s({fixed:!0,width:200}),Object(i.a)({},d(),{render:function(e){return o.a.createElement("span",null,e.title)},width:160}),Object(i.a)({},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8fdb\u5ea6","progress"),{},e)}(),{render:function(e){return o.a.createElement(r.a,{percent:100*e})},width:200}),y()].concat(Object(a.a)(x)),D=[s({fixed:!0,width:100}),h({fixed:!0,width:180}),p({fixed:!0,width:100}),Object(i.a)({},d(),{render:function(e){return o.a.createElement("span",null,e.title)},width:160}),Object(i.a)({},v(),{render:function(e){return o.a.createElement("span",null,e.title)},width:160})].concat(Object(a.a)(x)),A=[E({render:function(e){return o.a.createElement("span",null,e.title)}}),k(),p({title:"\u8bfe\u7a0b\u540d\u79f0",dataIndex:"title"}),_({dataIndex:"credit"})],H=[s(),Object(i.a)({},d(),{render:function(e){return o.a.createElement("span",null,e.title)}}),f(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8fbe\u6210\u5ea6","achivement"),{},e)}({render:function(e){return o.a.createElement("span",{style:{color:"red"}},e)}})],R=[p({title:"\u8bfe\u7a0b\u7ec4\u540d\u79f0",dataIndex:"title"}),O(),m({render:function(e){return o.a.createElement("div",null,e.title)}}),g({render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e.title)}))}}),b({render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e.title)}))}}),j({render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e.join(","))}))}}),y({title:"\u8fbe\u6210\u5ea6\u5e73\u5747\u503c",render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e/1)}))}})],M=[g({render:function(e,t){return o.a.createElement("span",null,t.term&&t.term.title)}}),s(),d({render:function(e,t){return o.a.createElement("span",null,t.major&&t.major.title)}}),k({render:function(e,t){return o.a.createElement("span",null,t.course&&t.course.course_no)}}),k({title:"\u8bfe\u7a0b",dataIndex:"course",key:"course",render:function(e,t){return o.a.createElement("span",null,t.course&&t.course.title)}}),j({title:"\u6559\u5e08",render:function(e,t){return o.a.createElement("span",null,t.teachers&&t.teachers.join(","))}}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u8003\u6838\u8bbe\u7f6e","set"),{},e)}({render:function(e,t){return o.a.createElement("span",{style:{color:t.is_check_way_set?"#1890ff":""}},t.is_check_way_set?"\u5df2":"\u672a","\u8bbe\u7f6e")}}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(i.a)({},l("\u4e0a\u4f20\u72b6\u6001","u_status"),{},e)}({render:function(e,t){return o.a.createElement("span",{style:{color:t.is_exam_result_set?"#1890ff":""}},t.is_exam_result_set?"\u5df2":"\u672a","\u4e0a\u4f20")}})],W=[h(),p({width:200}),v()],J=[g(),s(),d(),k(),b({title:"\u8bfe\u7a0b",dataIndex:"course",key:"course"}),j(),_({title:"\u8bfe\u7a0b\u76ee\u6807\u5e73\u5747\u503c"})],T=[I(),S({width:600})],q=[s(),m(),d(),_({title:"\u8fbe\u6210\u5ea6\u6700\u4f4e\u6307\u6807"})],B=[s(),d({width:600,render:function(e,t){return o.a.createElement("span",null,e.title)}})],Q=[E(),g(),k(),p({title:"\u8bfe\u7a0b\u540d\u79f0"}),_()],F=[I(),s(),d(),f(),S(),L()],G=[k(),b({title:"\u652f\u6491\u8bfe\u7a0b"}),_(),L()],K=[s(),d(),k(),b(),_(),I({title:"\u8bfe\u7a0b\u76ee\u6807\u6570"})],U=[I({title:"\u5e8f\u53f7"}),_({title:"\u8bfe\u7a0b\u76ee\u6807",dataIndex:"target",key:"target"}),f(),L()],V=[s(),d({render:function(e){return o.a.createElement("div",null,e.title)}})],X=[g(),s(),d(),k(),b(),j()],Y=[p({title:"\u8bfe\u7a0b\u7ec4\u540d\u79f0"}),O(),b({render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e)}))}}),m(),j({render:function(e){return e.map((function(e,t){return o.a.createElement("div",{key:t},e)}))}})],Z=[p({title:"id",dataIndex:"id",key:"id",width:100}),z(),P()],$=[p({title:"id",dataIndex:"id",key:"id",width:100}),z(),m(),P()],ee=[p({title:"id",dataIndex:"id",key:"id",width:100}),z(),m(),d(),P()],te=[p({title:"id",dataIndex:"id",key:"id",width:100}),z(),m(),d(),v(),s({defaultSortOrder:"descend",sorter:function(e,t){return e.enter_year-t.enter_year}}),P()],ne=[p({title:"id",dataIndex:"id",key:"id",width:100}),g(),P()],re=[p({title:"id",dataIndex:"id",key:"id",width:100}),E({title:"\u8bfe\u7a0b\u7c7b\u522b"}),P()],ae=[k(),p({title:"\u8bfe\u7a0b\u540d\u79f0",dataIndex:"title"}),E(),_()],ie=[p({title:"\u6559\u5e08\u59d3\u540d"}),I({title:"\u804c\u5de5\u53f7"}),C({render:function(e){return o.a.createElement("div",null,Object(u.b)(e))}}),m()],ce=[s(),m(),d(),v(),I({title:"\u5b66\u53f7"}),p(),p({title:"\u6027\u522b",dataIndex:"sex",key:"sex"})],oe=[p({title:"id",dataIndex:"id",key:"id",width:100}),I({title:"\u6559\u5e08\u7f16\u53f7"}),p({title:"\u6559\u5e08\u59d3\u540d"}),C({title:"\u8eab\u4efd",render:function(e){return Object(u.b)(e)}}),S({title:"\u5177\u4f53\u8d1f\u8d23",dataIndex:"work",key:"work"}),P({title:"\u4e0a\u4f20\u65f6\u95f4",dataIndex:"updated_at",key:"updated_at"}),p({title:"\u4e0a\u4f20\u884c\u6570",dataIndex:"lines",key:"lines"}),p({title:"\u5df2\u5904\u7406\u884c\u6570",dataIndex:"done",key:"done"}),p({title:"\u6210\u529f\u884c\u6570",dataIndex:"success",key:"success"}),p({title:"\u5931\u8d25\u884c\u6570",dataIndex:"fail",key:"fail"}),p({title:"\u5931\u8d25\u5185\u5bb9",dataIndex:"errors",key:"errors",width:400,render:function(e){return e&&e.length?e.map((function(e,t){return o.a.createElement("div",{key:t},e)})):""}})]},459:function(e,t,n){"use strict";n(30),n(460)},460:function(e,t,n){},461:function(e,t,n){"use strict";var r=n(0),a=n(2),i=n.n(a),c=n(56);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){return r.createElement(c.a,null,(function(t){var n,a=t.getPrefixCls,c=e.prefixCls,s=e.type,d=void 0===s?"horizontal":s,f=e.orientation,h=void 0===f?"center":f,p=e.className,m=e.children,v=e.dashed,g=l(e,["prefixCls","type","orientation","className","children","dashed"]),b=a("divider",c),O=h.length>0?"-".concat(h):h,j=i()(p,b,"".concat(b,"-").concat(d),(u(n={},"".concat(b,"-with-text").concat(O),m),u(n,"".concat(b,"-dashed"),!!v),n));return r.createElement("div",o({className:j},g,{role:"separator"}),m&&r.createElement("span",{className:"".concat(b,"-inner-text")},m))}))}}}]);