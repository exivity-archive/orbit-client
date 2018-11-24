(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{270:function(e,t,n){"use strict";var r=n(746),a=n(645),o=new r.a({schema:a.a}),i={type:"sun",id:"theSun",attributes:{name:"The Sun",classification:"Fusion giant"}},l={type:"planet",id:"jupiter",attributes:{name:"Jupiter",classification:"gas giant",atmosphere:!0}},d={type:"planet",id:"earth",attributes:{name:"Earth",classification:"terrestrial",atmosphere:!0},relationships:{sun:{data:{type:"sun",id:"theSun"}}}},u={type:"planet",id:"venus",attributes:{name:"Venus",classification:"terrestrial",atmosphere:!0}},c={type:"moon",id:"io",attributes:{name:"Io"},relationships:{planet:{data:{type:"planet",id:"jupiter"}}}},s={type:"moon",id:"europa",attributes:{name:"Europa"},relationships:{planet:{data:{type:"planet",id:"jupiter"}}}},p={type:"moon",id:"undiscoveredMoon",attributes:{name:"Undiscovered Moon"}},f={type:"moon",id:"theMoon",attributes:{name:"The Moon"},relationships:{planet:{data:{type:"planet",id:"earth"}}}},m={type:"satellite",id:"deepImpact",attributes:{name:"Deep Impact",class:"spacecraft"},relationships:{sun:{data:{type:"sun",id:"theSun"}}}},y={type:"satellite",id:"kepler",attributes:{name:"Kepler",class:"spacecraft"},relationships:{sun:{data:{type:"sun",id:"theSun"}}}},h={type:"satellite",id:"artemis",attributes:{name:"ARTEMIS",class:"spacecraft"},relationships:{moon:{data:{type:"moon",id:"theMoon"}}}},v={type:"satellite",id:"juno",attributes:{name:"Juno",class:"spacecraft"},relationships:{planet:{data:{type:"planet",id:"jupiter"}}}},b={type:"satellite",id:"galileo",attributes:{name:"Galileo",class:"spacecraft"},relationships:{planet:{data:{type:"planet",id:"jupiter"}}}};o.update(function(e){return[e.addRecord(p),e.addRecord(i),e.addRecord(l),e.addRecord(d),e.addRecord(u),e.addRecord(c),e.addRecord(s),e.addRecord(f),e.addRecord(m),e.addRecord(y),e.addRecord(h),e.addRecord(v),e.addRecord(b)]}),t.a=o},306:function(e,t,n){"use strict";var r=n(0),a=Object(r.createContext)({});t.a=a},307:function(e,t,n){"use strict";var r=n(7),a=n.n(r),o=n(8),i=n.n(o),l=n(9),d=n.n(l),u=n(14),c=n.n(u),s=n(15),p=n.n(s),f=n(16),m=n.n(f),y=n(6),h=n.n(y),v=n(4),b=n.n(v),R=n(0),g=n.n(R),S=n(1),E=n.n(S),C=n(204),A=n(184),O=n.n(A),k=n(35),T=n.n(k),_=n(131),q=n.n(_),j=n(306),P=n(186),I=n.n(P),w=n(81),x=n.n(w),D=n(309),U=n.n(D),B=function(e){function t(){var e,n;i()(this,t);for(var r=arguments.length,a=Array(r),o=0;o<r;o++)a[o]=arguments[o];return n=c()(this,(e=p()(t)).call.apply(e,[this].concat(a))),b()(h()(h()(n)),"build",function(){return n.props.buildRecord.apply(void 0,arguments)}),b()(h()(h()(n)),"add",U()(I.a.mark(function e(){var t,r,a,o,i,l,d,u,c,s,p=arguments;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(t=n.props,r=t.beforeAdd,a=t.addRecord,o=t.onAdd,i=t.onError,l=p.length,d=Array(l),u=0;u<l;u++)d[u]=p[u];if(!r){e.next=10;break}return e.next=5,r.apply(void 0,d);case 5:c=e.sent,s=!0===c?d:c,c&&a.apply(void 0,x()(s)).then(o).catch(i),e.next=11;break;case 10:a.apply(void 0,d).then(o).catch(i);case 11:case"end":return e.stop()}},e,this)}))),b()(h()(h()(n)),"update",U()(I.a.mark(function e(){var t,r,a,o,i,l,d,u,c,s,p=arguments;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(t=n.props,r=t.beforeUpdate,a=t.updateRecord,o=t.onUpdate,i=t.onError,l=p.length,d=Array(l),u=0;u<l;u++)d[u]=p[u];if(!r){e.next=10;break}return e.next=5,r.apply(void 0,d);case 5:c=e.sent,s=!0===c?d:c,c&&a.apply(void 0,x()(s)).then(o).catch(i),e.next=11;break;case 10:a.apply(void 0,d).then(o).catch(i);case 11:case"end":return e.stop()}},e,this)}))),b()(h()(h()(n)),"remove",U()(I.a.mark(function e(){var t,r,a,o,i,l,d,u,c,s,p=arguments;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(t=n.props,r=t.beforeRemove,a=t.removeRecord,o=t.onRemove,i=t.onError,l=p.length,d=Array(l),u=0;u<l;u++)d[u]=p[u];if(!r){e.next=10;break}return e.next=5,r.apply(void 0,d);case 5:c=e.sent,s=!0===c?d:c,c&&a.apply(void 0,x()(s)).then(o).catch(i),e.next=11;break;case 10:a.apply(void 0,d).then(o).catch(i);case 11:case"end":return e.stop()}},e,this)}))),b()(h()(h()(n)),"getHelpers",function(){return{buildRecord:n.build,addRecord:n.add,updateRecord:n.update,removeRecord:n.remove}}),n}return m()(t,e),d()(t,[{key:"render",value:function(){return this.props.children(this.getHelpers())}}]),t}(R.PureComponent);B.propTypes={children:E.a.func.isRequired,buildRecord:E.a.func,addRecord:E.a.func,updateRecord:E.a.func,removeRecord:E.a.func,onAdd:E.a.func,onUpdate:E.a.func,onRemove:E.a.func,beforeAdd:E.a.func,beforeUpdate:E.a.func,beforeRemove:E.a.func,onError:E.a.func},B.defaultProps={buildRecord:function(){},addRecord:function(){},updateRecord:function(){},removeRecord:function(){},onAdd:function(){},onUpdate:function(){},onRemove:function(){},onError:function(){}};var L=B;B.__docgenInfo={description:"",methods:[{name:"build",docblock:null,modifiers:[],params:[{name:"...args",type:null}],returns:null},{name:"add",docblock:null,modifiers:["async"],params:[{name:"...args",type:null}],returns:null},{name:"update",docblock:null,modifiers:["async"],params:[{name:"...args",type:null}],returns:null},{name:"remove",docblock:null,modifiers:["async"],params:[{name:"...args",type:null}],returns:null},{name:"getHelpers",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Crud",props:{buildRecord:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Function to build objectType."},addRecord:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Function to add record."},updateRecord:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Function to update record."},removeRecord:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Function to remove record."},onAdd:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Callback called when add() resolves. Provides added record."},onUpdate:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Callback called when update() resolves. Provides updated record."},onRemove:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Callback called when remove() resolves. Provides removed record."},onError:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:"Callback called when one of crud function catches"},children:{type:{name:"func"},required:!0,description:"Callback with build, add, update, remove promises."},beforeAdd:{type:{name:"func"},required:!1,description:"Callback called before add(). Takes a promise or function.\r\n   Return truthy value to proceed with add()"},beforeUpdate:{type:{name:"func"},required:!1,description:"Callback called before update(). Takes a promise or function.\r\n   Return truthy value to proceed with update()"},beforeRemove:{type:{name:"func"},required:!1,description:"Callback called before remove(). Takes a promise or function.\r\n   Return truthy value to proceed with remove()"}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\Crud.js"]={name:"Crud",docgenInfo:B.__docgenInfo,path:"src\\components\\Crud.js"});n(857);var M=function(e){var t=function(t){function n(){return i()(this,n),c()(this,p()(n).apply(this,arguments))}return m()(n,t),d()(n,[{key:"render",value:function(){var t=this.props,n=t.beforeAdd,r=t.onAdd,a=t.beforeUpdate,o=t.onUpdate,i=t.beforeRemove,l=t.onRemove,d=q()(t,["beforeAdd","onAdd","beforeUpdate","onUpdate","beforeRemove","onRemove"]);return g.a.createElement(j.a.Consumer,null,function(t){return g.a.createElement(L,T()({},t,{beforeAdd:n,onAdd:r,beforeUpdate:a,onUpdate:o,beforeRemove:i,onRemove:l}),function(t){return g.a.createElement(e,T()({},d,t))})})}}]),n}(R.PureComponent);return t.displayName=function(e){return e.displayName||e.name||"OrbitModel"}(e),t},K=["id","type","related","relatedTo","children","queryStore","updateStore","buildRecord","addRecord","updateRecord","removeRecord","cache"],N=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.every(function(e){return!!e})},Y=function(e){function t(e){var n;return i()(this,t),n=c()(this,p()(t).call(this,e)),b()(h()(h()(n)),"shouldQuery",function(){var e=n.props,t=e.cache,r=e.type,a=n.state,o=a.performedQuery,i=a[r],l=a.loading,d=a.error;return N(!o,"only"!==t,!i,!l,!d)}),b()(h()(h()(n)),"query",function(e){var t=n.props,r=t.id,a=t.related,o=t.relatedTo,i=t.type;return a&&o?e.findRelatedRecord({type:o.type,id:o.id},i):e.findRecord({type:i,id:r})}),b()(h()(h()(n)),"queryStore",function(){n.props.queryStore(n.query).then(function(){return n.setState({performedQuery:!0,loading:!1})}).catch(function(e){return n.setState({loading:!1,error:e})})}),b()(h()(h()(n)),"findAndSetProperty",function(e,t,r){1===e.length?t[e]=r:n.findAndSetProperty(e.slice(1),t[e[0]],r)}),b()(h()(h()(n)),"setPropertyByPath",function(e){var t=a()({},n.state[n.props.type]);return 2==(1>=arguments.length?0:arguments.length-1)?function(){n.findAndSetProperty(e,t,value),n.setState(b()({},n.props.type,t))}:function(r){n.findAndSetProperty(e,t,r),n.setState(b()({},n.props.type,t))}}),b()(h()(h()(n)),"setProperty",function(e){for(var t=arguments.length,r=Array(1<t?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];if(2===r.length){var o=r[0],i=r[1],l="relationships"===e?{data:i}:i;return function(){return n.setPropertyByPath([e,o],l)()}}return function(t){var a="relationships"===e?{data:t}:t;n.setPropertyByPath([e].concat(r),a)()}}),b()(h()(h()(n)),"setAttribute",function(){for(var e,t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];return(e=n).setProperty.apply(e,["attributes"].concat(r))}),b()(h()(h()(n)),"setRelationship",function(){for(var e,t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];return(e=n).setProperty.apply(e,["relationships"].concat(r))}),b()(h()(h()(n)),"resetAttributes",function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0;e.map(function(e){return n.setPropertyByPath(["attributes",e],t)})()}),b()(h()(h()(n)),"relatedToRecord",function(){var e=n.props,t=e.relatedTo,r=e.type,a=n.state[r];return!t&&(null===a||void 0===a?void 0:a.id)?a:t}),b()(h()(h()(n)),"getExtendedRecord",function(){var e=n.state[n.props.type];return e?a()({},e,{setAttribute:n.setAttribute,setRelationship:n.setRelationship,resetAttributes:n.resetAttributes,setProperty:n.setPropertyByPath,save:(null===e||void 0===e?void 0:e.id)?function(){for(var t,r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return(t=n.props).updateRecord.apply(t,[a()({},e)].concat(o))}:function(){for(var t,r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return(t=n.props).addRecord.apply(t,[a()({},e)].concat(o))},remove:function(){for(var t,r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return(t=n.props).removeRecord.apply(t,[a()({},e)].concat(o))}}):null}),b()(h()(h()(n)),"getStateAndReceivedEntities",function(){var e=O()(n.props,K.concat([n.props.type]));return a()(b()({},n.props.type,n.getExtendedRecord()),e,{loading:n.state.loading,error:n.state.error})}),n.state=e.related?{recordReference:null}:{idReference:null,recordReference:null},n}return m()(t,e),d()(t,[{key:"componentDidMount",value:function(){this.shouldQuery()&&this.queryStore()}},{key:"componentDidUpdate",value:function(){this.shouldQuery()&&this.queryStore()}},{key:"render",value:function(){var e=this.props,t=e.type,n=e.children,r=this.relatedToRecord();return"function"==typeof n?n(this.getStateAndReceivedEntities()):g.a.cloneElement(this.props.children,a()({key:"".concat(t,"-relatedTo-").concat(null===r||void 0===r?void 0:r.id)},this.getStateAndReceivedEntities(),{relatedTo:r}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.related?function(e,t){var n,r,a,o,i,l,d,u=!e.relatedTo,c=!!e.relatedTo&&!e[e.type],s=!!e[e.type]&&e[e.type]!==t.recordReference,p=!e[e.type],f="only"===e.cache,m=e.loading,y=!!e.error;return m||y?(n={recordReference:null},b()(n,e.type,null),b()(n,"loading",!!e.loading),b()(n,"error",e.error||!1),n):u?(r={recordReference:null},b()(r,e.type,null),b()(r,"performedQuery",!1),b()(r,"loading",!1),b()(r,"error",!1),r):c&&!e.required?f||t.performedQuery?(o={recordReference:null},b()(o,e.type,null),b()(o,"loading",!1),b()(o,"error",!1),o):(a={recordReference:null},b()(a,e.type,null),b()(a,"loading",!0),b()(a,"error",!1),a):p&&e.required?f||t.performedQuery?(l={recordReference:null},b()(l,e.type,null),b()(l,"loading",!1),b()(l,"error",{message:"Related ".concat(e.type," has not been found while being required")}),l):(i={recordReference:null},b()(i,e.type,null),b()(i,"loading",!0),b()(i,"error",!1),i):s?(d={recordReference:e[e.type]},b()(d,e.type,e[e.type]),b()(d,"performedQuery",!1),b()(d,"loading",!1),b()(d,"error",!1),d):null}(e,t):function(e,t){var n,r,a,o,i=!e.id&&e.id!==t.idReference,l=!!e.id&&e.id!==t.idReference,d=!!e[e.type]&&e[e.type]!==t.recordReference,u=!!e.id&&!e[e.type],c="only"===e.cache,s=e.loading,p=!!e.error;if(s||p)return n={recordReference:null},b()(n,e.type,null),b()(n,"loading",!!e.loading),b()(n,"error",e.error||!1),n;if(i){var f,m=e.buildRecord(e.type);return f={idReference:e.id,recordReference:m},b()(f,e.type,m),b()(f,"loading",!1),b()(f,"error",!1),f}return l?u?(a={idReference:e.id,recordReference:null},b()(a,e.type,null),b()(a,"loading",!c),b()(a,"error",!!c&&{message:"".concat(e.type," not found in cache")}),a):(r={idReference:e.id,recordReference:e[e.type]},b()(r,e.type,e[e.type]),b()(r,"loading",!1),b()(r,"error",!1),r):d?(o={idReference:e.id,recordReference:e[e.type]},b()(o,e.type,e[e.type]),b()(o,"loading",!1),b()(o,"error",!1),o):null}(e,t)}}]),t}(R.PureComponent),Q=M(Y);t.a=Object(C.withData)(function(e){var t=e.id,n=e.type,r=e.related,a=e.relatedTo;return"skip"===e.cache?{}:t?b()({},n,function(e){return e.findRecord({type:n,id:t})}):r&&a?b()({},n,function(e){return e.findRelatedRecord({type:a.type,id:a.id},n)}):{}},function(e,t){var n;return(!t.related||null!==(n=t.relatedTo)&&null!=n&&n.relationships[t.type])&&(t.id||t.related)?a()({},t,e):a()({},e,t,b()({},t.type,null))})(Q);Y.defaultProps={relatedTo:null,cache:"auto"},Y.propTypes={type:E.a.string,id:E.a.string,cache:E.a.oneOf(["only","skip","auto"]),buildRecord:E.a.func.isRequired,addRecord:E.a.func.isRequired,updateRecord:E.a.func.isRequired,removeRecord:E.a.func.isRequired,related:E.a.bool,relatedTo:E.a.object,required:E.a.bool},Y.__docgenInfo={description:"",methods:[{name:"getDerivedStateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",type:null},{name:"state",type:null}],returns:null},{name:"shouldQuery",docblock:null,modifiers:[],params:[],returns:null},{name:"query",docblock:null,modifiers:[],params:[{name:"query",type:null}],returns:null},{name:"queryStore",docblock:null,modifiers:[],params:[],returns:null},{name:"findAndSetProperty",docblock:null,modifiers:[],params:[{name:"path",type:null},{name:"record",type:null},{name:"value",type:null}],returns:null},{name:"setPropertyByPath",docblock:null,modifiers:[],params:[{name:"path",type:null},{name:"...args",type:null}],returns:null},{name:"setProperty",docblock:null,modifiers:[],params:[{name:"property",type:null},{name:"...args",type:null}],returns:null},{name:"setAttribute",docblock:null,modifiers:[],params:[{name:"...args",type:null}],returns:null},{name:"setRelationship",docblock:null,modifiers:[],params:[{name:"...args",type:null}],returns:null},{name:"resetAttributes",docblock:null,modifiers:[],params:[{name:"attributes",type:null},{name:"value",type:null}],returns:null},{name:"relatedToRecord",docblock:null,modifiers:[],params:[],returns:null},{name:"getExtendedRecord",docblock:null,modifiers:[],params:[],returns:null},{name:"getStateAndReceivedEntities",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Record",props:{relatedTo:{defaultValue:{value:"null",computed:!1},type:{name:"object"},required:!1,description:""},cache:{defaultValue:{value:"'auto'",computed:!1},type:{name:"enum",value:[{value:"'only'",computed:!1},{value:"'skip'",computed:!1},{value:"'auto'",computed:!1}]},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},buildRecord:{type:{name:"func"},required:!0,description:""},addRecord:{type:{name:"func"},required:!0,description:""},updateRecord:{type:{name:"func"},required:!0,description:""},removeRecord:{type:{name:"func"},required:!0,description:""},related:{type:{name:"bool"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\Record.js"]={name:"Record",docgenInfo:Y.__docgenInfo,path:"src\\components\\Record.js"})},308:function(e,t,n){"use strict";var r=n(7),a=n.n(r),o=n(8),i=n.n(o),l=n(9),d=n.n(l),u=n(14),c=n.n(u),s=n(15),p=n.n(s),f=n(16),m=n.n(f),y=n(6),h=n.n(y),v=n(4),b=n.n(v),R=n(0),g=n.n(R),S=n(1),E=n.n(S),C=n(204),A=n(310),O=n.n(A),k=n(184),T=n.n(k),_=n(129),q=n.n(_),j=function(e,t){var n=Object.keys(t).reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{});return Object.entries(n).reduce(function(e,t){var n=q()(t,2),r=n[0],a=n[1];return function(){return e.apply(void 0,arguments)[r](a)}},e)},P=["id","type","related","relatedTo","children","queryStore","updateStore","plural","cache"],I=function(e){function t(e){var n;return i()(this,t),n=c()(this,p()(t).call(this,e)),b()(h()(h()(n)),"startQuery",function(e){n.setState({loading:!0,error:!1},e)}),b()(h()(h()(n)),"query",function(){var e,t=n.props,r=t.queryStore,a=t.type,o=t.relatedTo,i=Array.isArray(o);if(i){if(!i.length)return null;e=n.getIdsFromRelatedCollection(o,a)}r(function(e){return e.findRecords(a)}).then(function(t){return n.setState({fetchedCollection:i?n.findRelatedRecords(t,e):t,loading:!1})}).catch(function(e){n.setState({loading:!1,error:e})})}),b()(h()(h()(n)),"queryRelated",function(){var e=n.props,t=e.queryStore,r=e.relatedTo;t(function(e){return e.findRelatedRecords({type:r.type,id:r.id},n.pluralizedType)}).then(function(e){n.setState({fetchedCollection:e,loading:!1})}).catch(function(e){n.setState({loading:!1,error:e})})}),b()(h()(h()(n)),"findOne",function(e){return n.props[n.props.type].find(function(t){return t.id===e})}),b()(h()(h()(n)),"find",function(e){var t=n.props[n.props.type];return e.map(function(e){return t.find(function(t){return t.id===e})})}),b()(h()(h()(n)),"findByAttribute",function(e){var t=e.attribute,r=e.value;return n.props[n.props.type].filter(function(e){return e.attributes[t]===r})}),b()(h()(h()(n)),"buildSaveTransforms",function(e){return function(t){return e.map(function(e){return e.id?t.replaceRecord(e):t.addRecord(e)})}}),b()(h()(h()(n)),"buildRemoveTransforms",function(e){return function(t){return e.map(function(e){return t.removeRecord(e)})}}),n.pluralizedType=e.plural||O()(e.type),n.state={fetchedCollection:[],loading:!1,error:!1},n}return m()(t,e),d()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.related,n=e.relatedTo;return"only"===e.cache?null:(t&&Array.isArray(n)&&this.startQuery(this.query),t&&n&&this.startQuery(this.queryRelated),void(!t&&this.startQuery(this.query)))}},{key:"render",value:function(){var e,t=this,n=this.props,r=n[this.pluralizedType],o=n.type,i=n.relatedTo,l=n.updateStore,d=n.cache,u=n.children,c=T()(this.props,P.concat([o])),s=i||r,p={loading:!!this.props.loading||this.state.loading,error:this.props.error||this.state.error},f={findOne:this.findOne,find:this.find,findByAttribute:this.findByAttribute,all:function(){return"only"===d?r:t.state.fetchedCollection}};if(p.loading||p.error){var m=a()(b()({},this.pluralizedType,null),p);return"function"==typeof u?u(m):g.a.cloneElement(u,a()({},m,{relatedTo:s}))}var y=a()({},c,(e={},b()(e,this.pluralizedType,f),b()(e,"save",function(e){return l(t.buildSaveTransforms(e))}),b()(e,"remove",function(e){return l(t.buildRemoveTransforms(e))}),e),p);return"function"==typeof this.props.children?u(y):g.a.cloneElement(u,a()({},y,{relatedTo:s}))}}],[{key:"findRelatedRecords",value:function(e,t){return e.filter(function(e){return t.includes(e.id)})}},{key:"getIdsFromRelatedCollection",value:function(e,t){return e.reduce(function(e,n){var r=n.relationships&&n.relationships[t]&&n.relationships[t].data.map(function(e){return e.id});return r?e.concat(r):e},[])}}]),t}(R.PureComponent);t.a=Object(C.withData)(function(e){var t=e.type,n=e.plural,r=e.cache,a=e.related,o=e.relatedTo,i=e.sort,l=e.filter,d=e.page,u=n||O()(t);return"skip"===r?{}:a&&Array.isArray(o)?b()({},u,function(e){return e.findRecords(t)}):a&&o?b()({},u,function(e){return e.findRelatedRecords({type:o.type,id:o.id},u)}):a?{}:b()({},u,j(function(e){return e.findRecords(t)},{sort:i,filter:l,page:d}))},function(e,t){var n=t.plural||O()(t.type);if("skip"===t.cache)return a()({},t);if(t.related&&Array.isArray(t.relatedTo)){var r=I.getIdsFromRelatedCollection(t.relatedTo,n);return a()({},e,t,b()({},n,I.findRelatedRecords(e[n],r)))}return t.related&&!t.relatedTo?a()({},e,t,b()({},n,[])):a()({},e,t)})(I);I.displayName="Collection",I.defaultProps={cache:"skip"},I.propTypes={type:E.a.string,plural:E.a.string,related:E.a.bool,relatedTo:E.a.oneOfType([E.a.object,E.a.array]),cache:E.a.oneOf(["only","skip"]),queryStore:E.a.func,updateStore:E.a.func,sort:E.a.oneOfType([E.a.string,E.a.object]),filter:E.a.oneOfType([E.a.string,E.a.object]),page:E.a.oneOfType([E.a.number,E.a.object])},I.__docgenInfo={description:"",methods:[{name:"findRelatedRecords",docblock:null,modifiers:["static"],params:[{name:"collection",type:null},{name:"relatedIds",type:null}],returns:null},{name:"getIdsFromRelatedCollection",docblock:null,modifiers:["static"],params:[{name:"relatedToCollection",type:null},{name:"ownType",type:null}],returns:null},{name:"startQuery",docblock:null,modifiers:[],params:[{name:"query",type:null}],returns:null},{name:"query",docblock:null,modifiers:[],params:[],returns:null},{name:"queryRelated",docblock:null,modifiers:[],params:[],returns:null},{name:"findOne",docblock:null,modifiers:[],params:[{name:"id",type:null}],returns:null},{name:"find",docblock:null,modifiers:[],params:[{name:"ids",type:null}],returns:null},{name:"findByAttribute",docblock:null,modifiers:[],params:[{name:"{ attribute, value }",type:null}],returns:null},{name:"buildSaveTransforms",docblock:null,modifiers:[],params:[{name:"collection",type:null}],returns:null},{name:"buildRemoveTransforms",docblock:null,modifiers:[],params:[{name:"collection",type:null}],returns:null}],displayName:"Collection",props:{cache:{defaultValue:{value:"'skip'",computed:!1},type:{name:"enum",value:[{value:"'only'",computed:!1},{value:"'skip'",computed:!1}]},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},plural:{type:{name:"string"},required:!1,description:""},related:{type:{name:"bool"},required:!1,description:""},relatedTo:{type:{name:"union",value:[{name:"object"},{name:"array"}]},required:!1,description:""},queryStore:{type:{name:"func"},required:!1,description:""},updateStore:{type:{name:"func"},required:!1,description:""},sort:{type:{name:"union",value:[{name:"string"},{name:"object"}]},required:!1,description:""},filter:{type:{name:"union",value:[{name:"string"},{name:"object"}]},required:!1,description:""},page:{type:{name:"union",value:[{name:"number"},{name:"object"}]},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\Collection.js"]={name:"Collection",docgenInfo:I.__docgenInfo,path:"src\\components\\Collection.js"})},645:function(e,t,n){"use strict";var r=new(n(17).d)({models:{planet:{attributes:{name:{type:"string"},classification:{type:"string"}},relationships:{sun:{type:"hasOne",model:"sun",inverse:"planets"},moons:{type:"hasMany",model:"moon",inverse:"planet"},satellites:{type:"hasMany",model:"satellites",inverse:"planet"}}},moon:{attributes:{name:{type:"string"}},relationships:{planet:{type:"hasOne",model:"planet",inverse:"moons"},satellites:{type:"hasMany",model:"satellites",inverse:"moon"}}},sun:{attributes:{name:{type:"string"},classification:{type:"string"}},relationships:{planets:{type:"hasMany",model:"planets",inverse:"sun"},satellites:{type:"hasMany",model:"satellites",inverse:"sun"}}},satellite:{attributes:{name:{type:"string"},class:{type:"string"}},relationships:{planet:{type:"hasOne",model:"planet",inverse:"satellites"},moon:{type:"hasOne",model:"moon",inverse:"satellites"},sun:{type:"hasOne",model:"sun",inverse:"satellites"}}}}});t.a=r},650:function(e,t,n){"use strict";var r=n(35),a=n.n(r),o=n(0),i=n.n(o),l=n(307),d=function(e){return i.a.createElement(l.a,a()({},e,{type:"planet"}))};t.a=d,d.__docgenInfo={description:"",methods:[],displayName:"Planet"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["orbitStories\\Planet.js"]={name:"Planet",docgenInfo:d.__docgenInfo,path:"orbitStories\\Planet.js"})},651:function(e,t,n){"use strict";var r=n(35),a=n.n(r),o=n(0),i=n.n(o),l=n(308),d=function(e){return i.a.createElement(l.a,a()({type:"planet"},e))};t.a=d,d.__docgenInfo={description:"",methods:[],displayName:"Planets"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["orbitStories\\Planets.js"]={name:"Planets",docgenInfo:d.__docgenInfo,path:"orbitStories\\Planets.js"})},742:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(743),i=n.n(o),l=function(e){var t=e.name,n=e.object,r=e.collapsed;return a.a.createElement(i.a,{name:t||n.type,src:n,collapsed:r,shouldCollapse:function(e){return["attributes","relationships","0","1","2"].includes(e.name)}})};t.a=l,l.__docgenInfo={description:"",methods:[],displayName:"Display"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".docz\\docs\\Display.js"]={name:"Display",docgenInfo:l.__docgenInfo,path:".docz\\docs\\Display.js"})},744:function(e,t,n){"use strict";var r=n(35),a=n.n(r),o=n(0),i=n.n(o),l=n(308),d=function(e){return i.a.createElement(l.a,a()({type:"moon"},e))};t.a=d,d.__docgenInfo={description:"",methods:[],displayName:"Moons"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["orbitStories\\Moons.js"]={name:"Moons",docgenInfo:d.__docgenInfo,path:"orbitStories\\Moons.js"})},745:function(e,t,n){"use strict";var r=n(35),a=n.n(r),o=n(0),i=n.n(o),l=n(307),d=function(e){return i.a.createElement(l.a,a()({type:"sun"},e))};t.a=d,d.__docgenInfo={description:"",methods:[],displayName:"Sun"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["orbitStories\\Sun.js"]={name:"Sun",docgenInfo:d.__docgenInfo,path:"orbitStories\\Sun.js"})},747:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(8),i=n.n(o),l=n(9),d=n.n(l),u=n(14),c=n.n(u),s=n(15),p=n.n(s),f=n(16),m=n.n(f),y=n(6),h=n.n(y),v=n(4),b=n.n(v),R=n(1),g=n.n(R),S=function(e){function t(e){var n;return i()(this,t),n=c()(this,p()(t).call(this,e)),b()(h()(h()(n)),"storeState",function(e){n.setState(e)}),n.state=e.store,n}return m()(t,e),d()(t,[{key:"render",value:function(){return this.props.children(this.state,this.storeState)}}]),t}(r.PureComponent),E=S;S.propTypes={children:g.a.func},S.__docgenInfo={description:"",methods:[{name:"storeState",docblock:null,modifiers:[],params:[{name:"value",type:null}],returns:null}],displayName:"StateContainer",props:{children:{type:{name:"func"},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook\\StateContainer.js"]={name:"StateContainer",docgenInfo:S.__docgenInfo,path:".storybook\\StateContainer.js"}),n.d(t,"a",function(){return C});var C=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return function(t,n){return a.a.createElement(E,{store:e},function(e,r){return n.state=e,n.storeState=r,t()})}}},748:function(e,t,n){n(311),n(749),e.exports=n(750)},750:function(e,t,n){"use strict";n.r(t),function(e){var t=n(8),r=n.n(t),a=n(9),o=n.n(a),i=n(14),l=n.n(i),d=n(15),u=n.n(d),c=n(16),s=n.n(c),p=n(0),f=n.n(p),m=n(139),y=n(738),h=n(739),v=n(740),b=n(204),R=n(270),g=n(306),S=(n(645),{buildRecord:function(e){return function(e){return{type:e,id:void 0,attributes:{name:"",classification:"",atmosphere:!0}}}(e)},addRecord:function(e){return R.a.update(function(t){return t.addRecord(e)})},updateRecord:function(e){return R.a.update(function(t){return t.replaceRecord(e)})},removeRecord:function(e){return R.a.update(function(t){return t.removeRecord(e)})}}),E=function(e){function t(e){var n;return r()(this,t),(n=l()(this,u()(t).call(this,e))).state={render:!1},n}return s()(t,e),o()(t,[{key:"componentDidMount",value:function(){var e=this;this.timeout=setTimeout(function(){return e.setState({render:!0})},300)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout)}},{key:"render",value:function(){return this.state.render?f.a.createElement(g.a.Provider,{value:S},f.a.createElement(b.DataProvider,{dataStore:R.a},this.props.story())):null}}]),t}(p.Component);Object(m.addDecorator)(y.withInfo),Object(m.addDecorator)(Object(h.withOptions)({name:"@exivity/orbit-client",url:"https://github.com/exivity/orbit-client",showAddonPanel:!0,addonPanelInRight:!0,hierarchySeparator:/\/|\./,hierarchyRootSeparator:/\|/})),Object(m.addDecorator)(function(e){return f.a.createElement("div",{style:{padding:"20px"}},f.a.createElement("style",null,"h1:first-child { margin-top: 0; }"),f.a.createElement(v.WithStyle,null,e()))}),Object(m.addDecorator)(function(e){return f.a.createElement(E,{story:e})});var C=n(853);Object(m.configure)(function(){C.keys().forEach(function(e){return C(e)})},e)}.call(this,n(276)(e))},765:function(e,t,n){var r={"./nestedObjectAssign":656,"./nestedObjectAssign.js":656};function a(e){var t=o(e);return n(t)}function o(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=765},853:function(e,t,n){var r={"./components/OrbitClient.stories.js":854};function a(e){var t=o(e);return n(t)}function o(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=853},854:function(e,t,n){"use strict";n.r(t),function(e){var t=n(8),r=n.n(t),a=n(9),o=n.n(a),i=n(14),l=n.n(i),d=n(15),u=n.n(d),c=n(16),s=n.n(c),p=n(0),f=n.n(p),m=n(139),y=n(747),h=n(742),v=n(650),b=n(651),R=n(744),g=n(745),S=function(e){var t=e.children;return f.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:1e3}},t)},E=function(e){var t=e.state,n=e.storeState;return f.a.createElement("div",null,f.a.createElement("label",null,"Id prop:"),f.a.createElement("input",{style:{marginLeft:10},value:t.planetId||"",onChange:function(e){return n({planetId:e.target.value,beforeAddCalled:!1,onAddCalled:!1,beforeUpdateCalled:!1,onUpdateCalled:!1,beforeRemoveCalled:!1,onRemoveCalled:!1})}}))},C=function(e){var t=e.planet,n=e.state;return f.a.createElement("div",null,f.a.createElement("h3",null,"Planet"),f.a.createElement("form",{style:{display:"flex",flexDirection:"column",justifyContent:"space-around",height:500}},f.a.createElement("label",null,"Name:"),f.a.createElement("input",{value:t.attributes.name,onChange:function(e){return t.setAttribute("name",e.target.value)()}}),f.a.createElement("label",null,"Classification:"),f.a.createElement("input",{value:t.attributes.classification,onChange:function(e){return t.setAttribute("classification",e.target.value)()}}),f.a.createElement("label",null,"Atmosphere:"),f.a.createElement("input",{type:"checkbox",value:t.attributes.atmosphere,onChange:function(e){return t.setAttribute("atmosphere",e.target.value)()}}),f.a.createElement("button",{onClick:function(e){e.preventDefault(),t.save()}},"Save"),f.a.createElement("button",{onClick:function(e){e.preventDefault(),t.remove()}},"Delete"),f.a.createElement("h3",null,"Callbacks"),f.a.createElement("div",null,"beforeAdd called: ".concat(n.beforeAddCalled)),f.a.createElement("div",null,"onAdd called: ".concat(n.onAddCalled)),f.a.createElement("div",null,"beforeUpdate called: ".concat(n.beforeUpdateCalled)),f.a.createElement("div",null,"onUpdate called: ".concat(n.onUpdateCalled)),f.a.createElement("div",null,"beforeRemove called: ".concat(n.beforeRemoveCalled)),f.a.createElement("div",null,"onRemove called: ".concat(n.onRemoveCalled))))},A=function(e){var t=e.planet;return f.a.createElement("div",null,f.a.createElement("h3",null,"Active Record"),f.a.createElement(h.a,{name:"planet",object:t}))},O=function(e){function t(){return r()(this,t),l()(this,u()(t).apply(this,arguments))}return s()(t,e),o()(t,[{key:"render",value:function(){return f.a.createElement("div",null,f.a.createElement("h3",null,"All planet id's"),f.a.createElement(b.a,{cache:"only"},function(e){var t=e.planets;return f.a.createElement("ul",null,t.all().map(function(e){return f.a.createElement("li",{key:e.id},e.id)}))}))}}]),t}(p.PureComponent),k=function(e){function t(){return r()(this,t),l()(this,u()(t).apply(this,arguments))}return s()(t,e),o()(t,[{key:"render",value:function(){var e=this.props,t=e.moons,n=e.sun;return f.a.createElement("div",null,f.a.createElement("h3",null,"Related moons"),f.a.createElement("ul",null,t.all().map(function(e){return f.a.createElement("li",{key:e.id},e.id)})),f.a.createElement("h3",null,"Related sun"),f.a.createElement("ul",null,f.a.createElement("li",{key:n&&n.id},n&&n.id)))}}]),t}(p.PureComponent),T=function(){return new Promise(function(e){setTimeout(function(){return e(!0)},3e3)})};Object(m.storiesOf)("components|orbit-client",e).addDecorator(function(e){return f.a.createElement("div",{style:{width:400,border:1}},e())}).addDecorator(Object(y.a)({planetId:"earth",beforeAddCalled:!1,onAddCalled:!1,beforeUpdateCalled:!1,onUpdateCalled:!1,beforeRemoveCalled:!1,onRemoveCalled:!1,sortOrder:"ascending"})).add("Single entity",function(e){var t=e.state,n=e.storeState;return f.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},f.a.createElement(E,{state:t,storeState:n}),f.a.createElement(v.a,{id:t.planetId,beforeAdd:function(){return n({beforeAddCalled:!0}),T()},onAdd:function(e){return n({planetId:e.id,onAddCalled:!0})},beforeUpdate:function(){return n({beforeUpdateCalled:!0}),T()},onUpdate:function(e){return n({planetId:e.id,onUpdateCalled:!0})},beforeRemove:function(){return n({beforeRemoveCalled:!0}),T()},onRemove:function(e){n({planetId:e.id,onRemoveCalled:!0}),setTimeout(function(){return n({planetId:void 0})},2e3)},cache:"only"},function(e){var n=e.planet,r=e.loading,a=e.error;return a?a.message:r?"Loading":n?f.a.createElement(S,null,f.a.createElement(C,{planet:n,state:t}),f.a.createElement(A,{planet:n}),f.a.createElement(O,null)):"no record found in cache"}))}).add("Single entity with relations",function(e){var t=e.state,n=e.storeState;return f.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},f.a.createElement(E,{state:t,storeState:n}),f.a.createElement(v.a,{id:t.planetId,cache:"only"},f.a.createElement(R.a,{related:!0,cache:"only"},f.a.createElement(g.a,{related:!0,cache:"only"},function(e){var n=e.planet,r=e.moons,a=e.sun,o=e.loading,i=e.error;return i?i.message:o?"Loading":n?f.a.createElement(S,null,f.a.createElement(C,{planet:n,state:t}),f.a.createElement(A,{planet:n}),f.a.createElement(O,null),f.a.createElement(k,{moons:r,sun:a})):"no record found in cache"}))))}).add("Multiple entities",function(e){var t=e.state,n=e.storeState;return f.a.createElement("div",null,f.a.createElement("h3",null,"All planet id's"),f.a.createElement(b.a,{sort:{attribute:"name",order:t.sortOrder},cache:"only"},function(e){var r=e.planets,a=e.save,o=e.remove;return f.a.createElement("div",null,f.a.createElement("ul",null,r.all().map(function(e){return f.a.createElement("li",{key:e.id},e.id)})),f.a.createElement("button",{onClick:function(){return a([{type:"planet",id:"mars",attributes:{name:"Mars"}},{type:"planet",id:"exivity to the moon",attributes:{name:"Rocket"}},{type:"planet",id:"neptunus",attributes:{name:"Neptunusr"}}])}},"Create records"),f.a.createElement("button",{onClick:function(){return o(r.all())}},"Delete all records"),f.a.createElement("button",{onClick:function(){n({sortOrder:"ascending"===t.sortOrder?"descending":"ascending"})}},t.sortOrder))}))})}.call(this,n(276)(e))}},[[748,3,2]]]);
//# sourceMappingURL=iframe.4952153e4e77faba4147.bundle.js.map