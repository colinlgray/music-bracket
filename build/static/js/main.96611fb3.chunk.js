(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,t,n){e.exports=n(279)},279:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(16),o=n.n(i),s=n(33),c=n(34),l=n(38),m=n(35),u=n(39),p=n(24),h=n(107),d=n(5),g=n.n(d),f=n(23),E=n(117),b=n.n(E),v=n(121),y=n.n(v),w=n(118),O=n.n(w),j=n(119),S=n.n(j),k=n(44),x=n.n(k),B=n(17),C=n.n(B),N=n(123),I=n.n(N),R=n(74),L=n.n(R),P=n(120),T=n.n(P),q=n(122),A=n.n(q),D=n(36),U=n.n(D),W=n(110),F=n.n(W),G=n(37),H=n.n(G),K=n(111),z=n.n(K),J=n(113),M=n.n(J),X=n(112),$=n.n(X),Q=n(55),V=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).renderLink=function(e){return r.a.createElement(Q.b,Object.assign({to:n.props.to},e))},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.icon,n=e.primary,a=e.secondary;return r.a.createElement("li",null,r.a.createElement(U.a,{button:!0,component:this.renderLink},t&&r.a.createElement(F.a,null,t),r.a.createElement(H.a,{inset:!0,primary:n,secondary:a})))}}]),t}(r.a.Component),Y=r.a.createElement("div",null,r.a.createElement(V,{to:"/",primary:"Home",icon:r.a.createElement(z.a,null)}),r.a.createElement(V,{to:"/nominate",primary:"Nominate a song",icon:r.a.createElement($.a,null)}),r.a.createElement(V,{to:"/nominations",primary:"Current Nominations",icon:r.a.createElement(M.a,null)})),Z=n(25);var _=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Welcome"),r.a.createElement(C.a,{component:"div",style:{paddingTop:"24px"}},"To the left is the menu where you can nominate your favorite song, then see the list of everyone's favorite songs so far"))},ee=n(54),te=n(116),ne=n.n(te),ae=n(56),re=n.n(ae),ie=n(114),oe=n(115),se=n.n(oe);var ce=Object(f.withStyles)(function(e){return{loadingIcon:{margin:2*e.spacing.unit}}})(function(e){var t=e.loading,n=e.items,a=void 0===n?[]:n,i=e.classes;return t?r.a.createElement(se.a,{className:i.loadingIcon}):r.a.createElement(C.a,{component:"div"},a.map(function(e){return r.a.createElement(U.a,{key:e.id},r.a.createElement(H.a,{primary:e.name}))}))}),le=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={query:"",url:"",loading:!1,searchResults:[]},n.handleChange=function(e){return function(t){var a;n.setState((a={},Object(p.a)(a,e,t.target.value),Object(p.a)(a,"loading",!0),a),n.debouncedLookupSongs)}},n.handleKeyPress=function(e){e&&13===e.keyCode&&n.handleSubmit()},n.lookupSongs=function(){fetch("".concat(n.baseApiUrl,"/songs?q=").concat(encodeURI(n.state.query)),{mode:"no-cors",url:n.baseApiUrl}).then(function(e){return e.json()}).then(function(e){n.setState({loading:!1,searchResults:e.items,totalResults:e.total})})},n.baseApiUrl="http://colinlgray.com/api",n.debouncedLookupSongs=Object(ie.debounce)(n.lookupSongs.bind(Object(ee.a)(n)),500),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({name:""}),document.addEventListener("keydown",this.handleKeyPress)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyPress)}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Nominate"),r.a.createElement(re.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-end"},r.a.createElement(re.a,{item:!0,xs:12},r.a.createElement(ne.a,{className:e.textInput,label:"Search",value:this.state.query,onChange:this.handleChange("query"),margin:"normal"})),r.a.createElement(re.a,{item:!0,className:e.searchResults},r.a.createElement(ce,{loading:this.state.loading,items:this.state.searchResults}))))}}]),t}(r.a.Component),me=Object(f.withStyles)(function(e){return{textInput:{width:24*e.spacing.unit,marginRight:4*e.spacing.unit},button:{margin:2*e.spacing.unit},searchResults:{margin:2*e.spacing.unit},loadingIcon:{margin:2*e.spacing.unit}}})(le);var ue=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{component:"h3",variant:"h3",color:"inherit",gutterBottom:!0},"Top songs"),r.a.createElement(C.a,{variant:"h6"},r.a.createElement(x.a,null,e.nominees.map(function(e){return r.a.createElement(U.a,{key:e},r.a.createElement(H.a,{primary:e}))}))))},pe=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,nominees:["1. Old Town Road remix ft. Billy Ray Cyrus","2. Old Town Road"]},n.handleDrawerOpen=function(){n.setState({open:!0})},n.handleDrawerClose=function(){n.setState({open:!1})},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(Q.a,null,r.a.createElement(b.a,null),r.a.createElement(O.a,{position:"absolute",className:g()(t.appBar,this.state.open&&t.appBarShift)},r.a.createElement(S.a,{disableGutters:!this.state.open,className:t.toolbar},r.a.createElement(L.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerOpen,className:g()(t.menuButton,this.state.open&&t.menuButtonHidden)},r.a.createElement(T.a,null)),r.a.createElement(C.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"Song of the Summer: 2019"))),r.a.createElement(y.a,{variant:"permanent",classes:{paper:g()(t.drawerPaper,!this.state.open&&t.drawerPaperClose)},open:this.state.open},r.a.createElement("div",{className:t.toolbarIcon},r.a.createElement(L.a,{onClick:this.handleDrawerClose},r.a.createElement(A.a,null))),r.a.createElement(I.a,null),r.a.createElement(x.a,{className:t.navList},Y)),r.a.createElement("main",{className:t.content},r.a.createElement("div",{className:t.appBarSpacer}),r.a.createElement(Z.a,{path:"/",exact:!0,component:_}),r.a.createElement(Z.a,{path:"/nominate/",render:function(t){return r.a.createElement(me,Object.assign({},t,{addNominee:function(t){e.state.nominees.push("".concat(e.state.nominees.length+8,". ").concat(t))}}))}}),r.a.createElement(Z.a,{path:"/nominations/",render:function(t){return r.a.createElement(ue,Object.assign({},t,{nominees:e.state.nominees}))}}))))}}]),t}(r.a.Component),he=Object(f.withStyles)(function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(h.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(p.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:7*e.spacing.unit},e.breakpoints.up("sm"),{width:9*e.spacing.unit}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,padding:3*e.spacing.unit,height:"100vh",overflow:"auto"},bodyText:{marginBottom:"24px"},tableContainer:{height:320},h5:{marginBottom:2*e.spacing.unit},navList:{"&:hover":{cursor:"pointer"}}}})(pe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[124,1,2]]]);
//# sourceMappingURL=main.96611fb3.chunk.js.map