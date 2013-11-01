!function(){var a=window.Sharesome=Ember.Application.create({LOG_TRANSITIONS:!0,LOG_ACTIVE_GENERATION:!0,rsConnected:!1,rsConnecting:!1});Ember.RSVP.configure("onerror",function(a){console.log(a.message),console.log(a.stack)}),window.location.hash.match(/#access_token=.+/)&&a.deferReadiness(),a.initializer({name:"remoteStorage",initialize:function(){RemoteStorage.WireClient.REQUEST_TIMEOUT=9e4,remoteStorage.access.claim("shares","rw"),remoteStorage.displayWidget("remotestorage-connect",{redirectUri:window.location.href})}}),remoteStorage.on("ready",function(){a.set("rsConnecting",!1),a.set("rsConnected",!0),a.advanceReadiness()}),remoteStorage.on("disconnected",function(){a.set("rsConnecting",!1),a.set("rsConnected",!1)}),remoteStorage.on("connecting",function(){a.set("rsConnecting",!0),a.set("rsConnected",!1)}),remoteStorage.on("authing",function(){a.set("rsConnecting",!0),a.set("rsConnected",!1)}),window.vex.defaultOptions.className="vex-theme-flat-attack"}(),function(){Sharesome.ApplicationController=Ember.Controller.extend({})}(),function(){Sharesome.HistoryController=Ember.ArrayController.extend({content:[],sortProperties:["name"],sortAscending:!1,loadItems:function(){this.set("content",[]);var a=this;console.log("loading items"),remoteStorage.shares.list().then(function(b){$.each(b,function(b,c){var d=Ember.Object.create({name:c,url:remoteStorage.shares.getFileURL(c)});a.pushObject(d)})})},itemCount:function(){return this.get("content").length}.property("content.@each"),removeItem:function(a,b){var c=this.findProperty(a,b);this.removeObject(c)},actions:{share:function(a){window.vex.dialog.alert("Direct URL:<p><input type='text' value='"+a+"'>"),$(".vex-content input").first().select()},remove:function(a){var b=this;remoteStorage.shares.remove(a).then(function(){b.removeItem("name",a)},function(a){window.alert("Couldn't remove item. Please try again. Sorry!"),console.log(a)})}}})}(),function(){Sharesome.UploadController=Ember.ObjectController.extend({content:{},fileToUpload:!1,isUploading:!1,fileIsImage:function(){return this.get("content.type").match("image.*")}.property("content.type"),simpleFileType:function(){var a=this.get("content.type");return a&&"undefined"!=typeof a&&""!==a?a.replace("/","-"):"unkown"}.property("content.type"),actions:{cancelFileUpload:function(){this.set("fileToUpload",!1),this.set("content",{})},submitFileUpload:function(){var a=this,b=a.get("content");a.set("isUploading",!0),remoteStorage.shares.storeFile(b.type,b.name,b.binary).then(function(b){a.setProperties({fileToUpload:!1,isUploading:!1,content:{}}),window.vex.dialog.alert("Direct URL:<p><input type='text' value='"+b+"'>"),$(".vex-content input").first().select()},function(b){a.set("isUploading",!1),window.vex.dialog.alert("Something bad happened during upload.<br />Please try again."),console.log(b)})}}})}(),function(){Sharesome.ApplicationRoute=Ember.Route.extend({})}(),function(){Sharesome.ConnectedRoute=Ember.Route.extend({redirect:function(){Sharesome.rsConnected||this.transitionTo("index")}})}(),function(){Sharesome.HistoryRoute=Sharesome.ConnectedRoute.extend({})}(),function(){Sharesome.IndexRoute=Ember.Route.extend({renderTemplate:function(){this.render("upload",{controller:"upload"})}})}(),function(){Sharesome.HistoryView=Ember.View.extend({didInsertElement:function(){this.controller.loadItems()}})}(),function(){Sharesome.UploadFileSelectView=Ember.TextField.extend({type:"file",change:function(a){var b=a.target;b.files&&b.files[0]&&this.handleInputFile(b.files[0])},handleInputFile:function(a){var b=this,c=b._parentView.controller;if(c.setProperties({name:a.name,type:a.type,size:a.size,fileToUpload:!0}),a.type.match("image.*")){var d=new FileReader;d.onload=function(){return function(){c.set("base64",this.result)}}(a),d.readAsDataURL(a)}var e=new FileReader;e.onload=function(){return function(){c.set("binary",this.result)}}(a),e.readAsArrayBuffer(a)}})}(),function(){Sharesome.UploadView=Ember.View.extend({templateName:"upload",hasFileToUploadBinding:"this.controller.fileToUpload",classNameBindings:["hasFileToUpload"],didInsertElement:function(){this.$("#dropzone").bind("dragenter",function(){return $(this).addClass("drag-active"),!1}),this.$("#dropzone").bind("dragover",function(a){return a.preventDefault(),!1}),this.$("#dropzone").bind("dragleave",function(){return $(this).removeClass("drag-active"),!1}),this.$("#dropzone").bind("drop",function(){$(this).removeClass("drag-active")})}})}(),function(){Sharesome.Router.map(function(){this.resource("history",{path:"/history"})})}(),function(){Ember.Handlebars.helper("humanFileSize",function(a){var b=-1,c=[" KB"," MB"," GB"," TB","PB","EB","ZB","YB"];do a/=1024,b++;while(a>1024);return String(Math.max(a,.1).toFixed(1)+c[b])})}(),function(){Sharesome.HistoryItemComponent=Ember.Component.extend({isImage:function(){return this.get("url").match(/(jpg|jpeg|png|gif)$/i)}.property("url"),itemStyle:function(){return this.get("isImage")?"background-image: url("+this.get("url")+")":void 0}.property("url"),nameWithoutTimestamp:function(){return this.get("name").substr(12)}.property("name")})}(),function(){Sharesome.SpinnerComponent=Ember.Component.extend({didInsertElement:function(){var a=this.$(".spinner-wrapper");a.css("height",this.get("height")+"px");var b={lines:this.get("lines")||13,length:this.get("length")||20,width:this.get("width")||10,radius:this.get("radius")||30,corners:this.get("corners")||1,rotate:this.get("rotate")||0,direction:this.get("direction")||1,color:this.get("color")||"#000",speed:this.get("speed")||1,trail:this.get("trail")||60,shadow:this.get("shadow")||!1,hwaccel:this.get("hwaccel")||!0,className:"spinner",zIndex:this.get("zIndex")||2e9,top:this.get("top")||"0",left:this.get("left")||"0"};a.spin(b)}})}();