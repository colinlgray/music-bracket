(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{123:function(e,n,t){e.exports=t(277)},277:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(16),o=t.n(i),c=t(31),l=t(32),s=t(35),m=t(33),u=t(36),p=t(34),h=t(105),d=t(5),g=t.n(d),E=t(52),f=t(114),b=t.n(f),v=t(120),w=t.n(v),y=t(115),O=t.n(y),j=t(116),S=t.n(j),C=t(41),B=t.n(C),x=t(17),N=t.n(x),k=t(122),I=t.n(k),L=t(57),R=t.n(L),T=t(118),W=t.n(T),D=t(117),P=t.n(D),F=t(121),G=t.n(F),H=t(119),z=t.n(H),A=t(55),J=t.n(A),X=t(108),$=t.n(X),q=t(56),K=t.n(q),M=t(109),Q=t.n(M),U=t(111),V=t.n(U),Y=t(110),Z=t.n(Y),_=t(54),ee=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(i)))).renderLink=function(e){return r.a.createElement(_.b,Object.assign({to:t.props.to},e))},t}return Object(u.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){var e=this.props,n=e.icon,t=e.primary,a=e.secondary;return r.a.createElement("li",null,r.a.createElement(J.a,{button:!0,component:this.renderLink},n&&r.a.createElement($.a,null,n),r.a.createElement(K.a,{inset:!0,primary:t,secondary:a})))}}]),n}(r.a.Component),ne=r.a.createElement("div",null,r.a.createElement(ee,{to:"/",primary:"Home",icon:r.a.createElement(Q.a,null)}),r.a.createElement(ee,{to:"/nominate",primary:"Nominate a song",icon:r.a.createElement(Z.a,null)}),r.a.createElement(ee,{to:"/nominations",primary:"Current Nominations",icon:r.a.createElement(V.a,null)})),te=t(23);var ae=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Welcome"),r.a.createElement(N.a,{component:"p"},"To the left is the menu where you can nominate your favorite song, then see the list of everyone's favorite songs so far"))},re=t(53),ie=t(113),oe=t.n(ie),ce=t(112),le=t.n(ce),se=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).state={name:""},t.handleChange=function(e){return function(n){t.setState(Object(p.a)({},e,n.target.value))}},t.handleSubmit=function(){t.props.addNominee(t.state.name)},t.handleSubmit=t.handleSubmit.bind(Object(re.a)(t)),t}return Object(u.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Nominate a song"),r.a.createElement(N.a,{component:"div"},r.a.createElement(le.a,{id:"standard-name",label:"Song Name",value:this.state.name,onChange:this.handleChange("name"),margin:"normal",fullWidth:!0}),r.a.createElement(oe.a,{variant:"contained",color:"primary",onClick:this.handleSubmit,style:{float:"right",marginTop:"16px"}},"Submit")))}}]),n}(r.a.Component);var me=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Current top songs:"),r.a.createElement(N.a,{variant:"h6"},r.a.createElement(B.a,null,e.nominees.map(function(e){return r.a.createElement(J.a,{key:e},r.a.createElement(K.a,{primary:e}))}))))},ue=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(t=Object(s.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={open:!0,nominees:["1. Old Town Road remix ft. Billy Ray Cyrus","2. Old Town Road"]},t.handleDrawerOpen=function(){t.setState({open:!0})},t.handleDrawerClose=function(){t.setState({open:!1})},t}return Object(u.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){var e=this,n=this.props.classes;return r.a.createElement("div",{className:n.root},r.a.createElement(_.a,null,r.a.createElement(b.a,null),r.a.createElement(O.a,{position:"absolute",className:g()(n.appBar,this.state.open&&n.appBarShift)},r.a.createElement(S.a,{disableGutters:!this.state.open,className:n.toolbar},r.a.createElement(R.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerOpen,className:g()(n.menuButton,this.state.open&&n.menuButtonHidden)},r.a.createElement(P.a,null)),r.a.createElement(N.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:n.title},"Song of the Summer: 2019"),r.a.createElement(R.a,{color:"inherit"},r.a.createElement(W.a,{badgeContent:0,color:"secondary",className:n.notifications},r.a.createElement(z.a,null))))),r.a.createElement(w.a,{variant:"permanent",classes:{paper:g()(n.drawerPaper,!this.state.open&&n.drawerPaperClose)},open:this.state.open},r.a.createElement("div",{className:n.toolbarIcon},r.a.createElement(R.a,{onClick:this.handleDrawerClose},r.a.createElement(G.a,null))),r.a.createElement(I.a,null),r.a.createElement(B.a,{className:n.navList},ne)),r.a.createElement("main",{className:n.content},r.a.createElement("div",{className:n.appBarSpacer}),r.a.createElement(te.a,{path:"/",exact:!0,component:ae}),r.a.createElement(te.a,{path:"/nominate/",render:function(n){return r.a.createElement(se,Object.assign({},n,{addNominee:function(n){e.state.nominees.push("".concat(e.state.nominees.length+8,". ").concat(n))}}))}}),r.a.createElement(te.a,{path:"/nominations/",render:function(n){return r.a.createElement(me,Object.assign({},n,{nominees:e.state.nominees}))}}))))}}]),n}(r.a.Component),pe=Object(E.withStyles)(function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(h.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(p.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:7*e.spacing.unit},e.breakpoints.up("sm"),{width:9*e.spacing.unit}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,padding:3*e.spacing.unit,height:"100vh",overflow:"auto"},bodyText:{marginBottom:"24px"},tableContainer:{height:320},h5:{marginBottom:2*e.spacing.unit},navList:{"&:hover":{cursor:"pointer"}},notifications:{display:"none"}}})(ue);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[123,1,2]]]);
//# sourceMappingURL=main.04aa4429.chunk.js.map