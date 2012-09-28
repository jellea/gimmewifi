/*

  Agility.js    
  Licensed under the MIT license
  Copyright (c) Artur B. Adib, 2011
  http://agilityjs.com

*/
// Sandboxed, so kids don't get hurt. Inspired by jQuery's code:
//   Creates local ref to window for performance reasons (as JS looks up local vars first)
//   Redefines undefined as it could have been tampered with
(function(e,t){if(!e.jQuery)throw"agility.js: jQuery not found";var n=e.document,r=e.location,i=jQuery,s,o={},u={},a=0,f="&";if(!Object.create||Object.create.toString().search(/native code/i)<0)Object.create=function(e){var t=function(){};return i.extend(t.prototype,e),new t};if(!Object.getPrototypeOf||Object.getPrototypeOf.toString().search(/native code/i)<0)typeof "test".__proto__=="object"?Object.getPrototypeOf=function(e){return e.__proto__}:Object.getPrototypeOf=function(e){return e.constructor.prototype};o.isAgility=function(e){return e._agility===!0},o.proxyAll=function(e,n){if(!e||!n)throw"agility.js: util.proxyAll needs two arguments";for(var r in e){var s=e[r];if(typeof e[r]=="function")s=e[r]._noProxy?e[r]:i.proxy(e[r]._preProxy||e[r],n),s._preProxy=e[r]._noProxy?t:e[r]._preProxy||e[r],e[r]=s;else if(typeof e[r]=="object"){for(var o in e[r]){var u=e[r][o];typeof e[r][o]=="function"&&(u=e[r][o]._noProxy?e[r][o]:i.proxy(e[r][o]._preProxy||e[r][o],n),u._preProxy=e[r][o]._noProxy?t:e[r][o]._preProxy||e[r][o],s[o]=u)}e[r]=s}}},o.reverseEvents=function(e,n){var r=i(e).data("events");if(r!==t&&r[n]!==t){var s=[];for(var o in r[n]){if(!r[n].hasOwnProperty(o))continue;s.unshift(r[n][o])}r[n]=s}},o.size=function(e){var t=0,n;for(n in e)t++;return t},o.extendController=function(e){for(var n in e.controller)(function(){var r,i,s,o,u,a;if(typeof e.controller[n]=="function"){r=n.match(/^(\~)*(.+)/),i=r[1],s=r[2];if(!i)return;o=e.controller[s]?e.controller[s]._preProxy||e.controller[s]:t,u=e.controller[n],a=function(){o&&o.apply(this,arguments),u&&u.apply(this,arguments)},e.controller[s]=a,delete e.controller[n]}})()},u={_agility:!0,_container:{_insertObject:function(e,t,n){var r=this;if(!o.isAgility(e))throw"agility.js: append argument is not an agility object";return this._container.children[e._id]=e,this.trigger(n,[e,t]),e._parent=this,e.bind("destroy",function(e,t){r._container.remove(t)}),this},append:function(e,t){return this._container._insertObject.call(this,e,t,"append")},prepend:function(e,t){return this._container._insertObject.call(this,e,t,"prepend")},after:function(e,t){return this._container._insertObject.call(this,e,t,"after")},before:function(e,t){return this._container._insertObject.call(this,e,t,"before")},remove:function(e){return delete this._container.children[e],this.trigger("remove",e),this},each:function(e){return i.each(this._container.children,e),this},empty:function(){return this.each(function(){this.destroy()}),this},size:function(){return o.size(this._container.children)}},_events:{parseEventStr:function(e){var t={type:e},n=e.search(/\s/);return n>-1&&(t.type=e.substr(0,n),t.selector=e.substr(n+1)),t},bind:function(e,t){var n=this._events.parseEventStr(e);return n.selector?n.selector===f?this.view.$().bind(n.type,t):this.view.$().delegate(n.selector,n.type,t):i(this._events.data).bind(n.type,t),this},trigger:function(e,t){var n=this._events.parseEventStr(e);return n.selector?n.selector===f?this.view.$().trigger(n.type,t):this.view.$().find(n.selector).trigger(n.type,t):(i(this._events.data).trigger("_"+n.type,t),o.reverseEvents(this._events.data,"pre:"+n.type),i(this._events.data).trigger("pre:"+n.type,t),o.reverseEvents(this._events.data,"pre:"+n.type),i(this._events.data).trigger(n.type,t),this.parent()&&this.parent().trigger((n.type.match(/^child:/)?"":"child:")+n.type,t),i(this._events.data).trigger("post:"+n.type,t)),this}},model:{set:function(e,t){var n=this,r=[];if(typeof e!="object")throw"agility.js: unknown argument type in model.set()";var s=!1;t&&t.reset?(s=this.model._data,this.model._data=i.extend({},e)):i.extend(this.model._data,e);for(var o in e)delete s[o],r.push(o);for(o in s)r.push(o);return t&&t.silent===!0?this:(this.trigger("change"),i.each(r,function(e,t){n.trigger("change:"+t)}),this)},get:function(e){if(e===t)return this.model._data;if(typeof e=="string")return this.model._data[e];throw"agility.js: unknown argument for getter"},reset:function(){return this.model.set(this.model._initData,{reset:!0}),this},size:function(){return o.size(this.model._data)},each:function(e){return i.each(this.model._data,e),this}},view:{format:"<div/>",style:"",$:function(e){return!e||e===f?this.view.$root:this.view.$root.find(e)},render:function(){if(this.view.format.length===0)throw"agility.js: empty format in view.render()";this.view.$root.size()===0?this.view.$root=i(this.view.format):this.view.$root.html(i(this.view.format).html());if(this.view.$root.size()===0)throw"agility.js: could not generate html from format";return this},_parseBindStr:function(e){var t={key:null,attr:[]},n=e.split(","),r=/([a-zA-Z0-9_\-]+)(?:[\s=]+([a-zA-Z0-9_\-]+))?/,i=!1,s;if(n.length>0)for(var o=0;o<n.length;o++){s=n[o].match(r);if(s)if(typeof s[2]=="undefined"||s[2]===""){if(i)throw new Error("You may specify only one key ("+i+" has already been specified in data-bind="+e+")");i=s[1],t.key=s[1]}else t.attr.push({attr:s[1],attrVar:s[2]})}return t},bindings:function(){var e=this,t=this.view.$().filter("[data-bind]"),n=this.view.$("[data-bind]"),r=function(t,n,r){var i=t.attr[r];return function(){n.attr(i.attr,e.model.get(i.attrVar))}};return t.add(n).each(function(){var t=i(this),n=e.view._parseBindStr(t.data("bind")),s=function(){if(n.attr)for(var i=0;i<n.attr.length;i++)e.bind("_change:"+n.attr[i].attrVar,r(n,t,i))};t.is("input:checkbox")?(e.bind("_change:"+n.key,function(){t.prop("checked",e.model.get(n.key))}),t.change(function(){var t={};t[n.key]=i(this).prop("checked"),e.model.set(t)}),s()):t.is("select")?(e.bind("_change:"+n.key,function(){var r=t.attr("name"),i=e.model.get(n.key);t.val(i)}),t.change(function(){var r={};r[n.key]=t.val(),e.model.set(r)}),s()):t.is("input:radio")?(e.bind("_change:"+n.key,function(){var r=t.attr("name"),i=e.model.get(n.key);t.siblings('input[name="'+r+'"]').filter('[value="'+i+'"]').prop("checked",!0)}),t.change(function(){if(!t.prop("checked"))return;var r={};r[n.key]=t.val(),e.model.set(r)}),s()):t.is('input[type="search"]')?(e.bind("_change:"+n.key,function(){t.val(e.model.get(n.key))}),t.keypress(function(){setTimeout(function(){var r={};r[n.key]=t.val(),e.model.set(r)},50)}),s()):t.is("input:text, textarea")?(e.bind("_change:"+n.key,function(){t.val(e.model.get(n.key))}),t.change(function(){var t={};t[n.key]=i(this).val(),e.model.set(t)}),s()):(n.key&&e.bind("_change:"+n.key,function(){e.model.get(n.key)?t.text(e.model.get(n.key).toString()):t.text("")}),s())}),this},sync:function(){var e=this;return this.model.each(function(t,n){e.trigger("_change:"+t)}),this.model.size()>0&&this.trigger("_change"),this},stylize:function(){var n,r=new RegExp(f,"g");if(this.view.style.length===0||this.view.$().size()===0)return;if(this.view.hasOwnProperty("style")){n="agility_"+this._id;var s=this.view.style.replace(r,"."+n);i("head",e.document).append('<style type="text/css">'+s+"</style>"),this.view.$().addClass(n)}else{var o=function(e){while(e!==null){e=Object.getPrototypeOf(e);if(e.view.hasOwnProperty("style"))return e._id}return t},u=o(this);n="agility_"+u,this.view.$().addClass(n)}return this}},controller:{_create:function(e){this.view.stylize(),this.view.bindings(),this.view.sync()},_destroy:function(e){this._container.empty(),this.view.$().remove()},_append:function(e,t,n){this.view.$(n).append(t.view.$())},_prepend:function(e,t,n){this.view.$(n).prepend(t.view.$())},_before:function(e,t,n){if(!n)throw"agility.js: _before needs a selector";this.view.$(n).before(t.view.$())},_after:function(e,t,n){if(!n)throw"agility.js: _after needs a selector";this.view.$(n).after(t.view.$())},_remove:function(e,t){},_change:function(e){}},destroy:function(){this.trigger("destroy",this._id)},parent:function(){return this._parent},append:function(){return this._container.append.apply(this,arguments),this},prepend:function(){return this._container.prepend.apply(this,arguments),this},after:function(){return this._container.after.apply(this,arguments),this},before:function(){return this._container.before.apply(this,arguments),this},remove:function(){return this._container.remove.apply(this,arguments),this},size:function(){return this._container.size.apply(this,arguments)},each:function(){return this._container.each.apply(this,arguments)},empty:function(){return this._container.empty.apply(this,arguments)},bind:function(){return this._events.bind.apply(this,arguments),this},trigger:function(){return this._events.trigger.apply(this,arguments),this}},s=function(){var e=Array.prototype.slice.call(arguments,0),t={},n=u;typeof e[0]=="object"&&o.isAgility(e[0])&&(n=e[0],e.shift()),t=Object.create(n),t.model=Object.create(n.model),t.view=Object.create(n.view),t.controller=Object.create(n.controller),t._container=Object.create(n._container),t._events=Object.create(n._events),t._id=a++,t._parent=null,t._events.data={},t._container.children={},t.view.$root=i(),t.model._data=n.model._data?i.extend(!0,{},n.model._data):{},t._data=n._data?i.extend(!0,{},n._data):{};if(e.length!==0)if(e.length===1&&typeof e[0]=="object"&&(e[0].model||e[0].view||e[0].controller))for(var r in e[0])r==="model"?i.extend(t.model._data,e[0].model):r==="view"?i.extend(t.view,e[0].view):r==="controller"?(i.extend(t.controller,e[0].controller),o.extendController(t)):t[r]=e[0][r];else{if(typeof e[0]=="object")i.extend(t.model._data,e[0]);else if(e[0])throw"agility.js: unknown argument type (model)";if(typeof e[1]=="string")t.view.format=e[1];else if(typeof e[1]=="object")i.extend(t.view,e[1]);else if(e[1])throw"agility.js: unknown argument type (view)";typeof e[2]=="string"&&(t.view.style=e[2],e.splice(2,1));if(typeof e[2]=="object")i.extend(t.controller,e[2]),o.extendController(t);else if(e[2])throw"agility.js: unknown argument type (controller)"}t.model._initData=i.extend({},t.model._data),o.proxyAll(t,t),t.view.render();var s=function(e,n){typeof n=="function"&&t.bind(e,n)};for(var f in t.controller){var l=f.split(";"),c=t.controller[f];i.each(l,function(e,t){t=t.trim(),s(t,c)})}return t.trigger("create"),t},s.document=s({view:{$:function(e){return e?i(e,"body"):i("body")}},controller:{_create:function(){}}}),s.fn=u,s.isAgility=function(e){return typeof e!="object"?!1:o.isAgility(e)},e.agility=e.$$=s,s.fn.persist=function(e,n){var r="id";return this._data.persist=i.extend({adapter:e},n),this._data.persist.openRequests=0,n&&n.id&&(r=n.id),this.save=function(){var e=this;return this._data.persist.openRequests===0&&this.trigger("persist:start"),this._data.persist.openRequests++,this._data.persist.adapter.call(this,{type:this.model.get(r)?"PUT":"POST",id:this.model.get(r),data:this.model.get(),complete:function(){e._data.persist.openRequests--,e._data.persist.openRequests===0&&e.trigger("persist:stop")},success:function(t,n,i){t[r]?e.model.set({id:t[r]},{silent:!0}):i.getResponseHeader("Location")&&e.model.set({id:i.getResponseHeader("Location").match(/\/([0-9]+)$/)[1]},{silent:!0}),e.trigger("persist:save:success")},error:function(){e.trigger("persist:error"),e.trigger("persist:save:error")}}),this},this.load=function(){var e=this;if(this.model.get(r)===t)throw"agility.js: load() needs model id";return this._data.persist.openRequests===0&&this.trigger("persist:start"),this._data.persist.openRequests++,this._data.persist.adapter.call(this,{type:"GET",id:this.model.get(r),complete:function(){e._data.persist.openRequests--,e._data.persist.openRequests===0&&e.trigger("persist:stop")},success:function(t,n,r){e.model.set(t),e.trigger("persist:load:success")},error:function(){e.trigger("persist:error"),e.trigger("persist:load:error")}}),this},this.erase=function(){var e=this;if(this.model.get(r)===t)throw"agility.js: erase() needs model id";return this._data.persist.openRequests===0&&this.trigger("persist:start"),this._data.persist.openRequests++,this._data.persist.adapter.call(this,{type:"DELETE",id:this.model.get(r),complete:function(){e._data.persist.openRequests--,e._data.persist.openRequests===0&&e.trigger("persist:stop")},success:function(t,n,r){e.destroy(),e.trigger("persist:erase:success")},error:function(){e.trigger("persist:error"),e.trigger("persist:erase:error")}}),this},this.gather=function(e,n,r,s){var o,u=this;if(!e)throw"agility.js plugin persist: gather() needs object prototype";if(!e._data.persist)throw"agility.js plugin persist: prototype doesn't seem to contain persist() data";return s?o=r:typeof r=="string"?o=r:(o=t,s=r),this._data.persist.openRequests===0&&this.trigger("persist:start"),this._data.persist.openRequests++,e._data.persist.adapter.call(e,{type:"GET",data:s,complete:function(){u._data.persist.openRequests--,u._data.persist.openRequests===0&&u.trigger("persist:stop")},success:function(t){i.each(t,function(t,r){var i=ಠ_ಠ(e,r);typeof n=="string"&&u[n](i,o)}),u.trigger("persist:gather:success",{data:t})},error:function(){u.trigger("persist:error"),u.trigger("persist:gather:error")}}),this},this},s.adapter={},s.adapter.restful=function(e){var t=i.extend({dataType:"json",url:(this._data.persist.baseUrl||"api/")+this._data.persist.collection+(e.id?"/"+e.id:"")},e);i.ajax(t)}})(window);