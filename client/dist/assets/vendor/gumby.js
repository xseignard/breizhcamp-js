!function(){"use strict";function a(){this.$dom=$(document),this.isOldie=!!this.$dom.find("html").hasClass("oldie"),this.click="click",this.onReady=this.onOldie=this.onTouch=!1,this.uiModules={},this.inits={}}a.prototype.init=function(){this.initUIModules();var a=this;this.$dom.ready(function(){a.onReady&&a.onReady(),a.isOldie&&a.onOldie&&a.onOldie(),Modernizr.touch&&a.onTouch&&a.onTouch()})},a.prototype.ready=function(a){a&&"function"==typeof a&&(this.onReady=a)},a.prototype.oldie=function(a){a&&"function"==typeof a&&(this.onOldie=a)},a.prototype.touch=function(a){a&&"function"==typeof a&&(this.onTouch=a)},a.prototype.debug=function(){return{$dom:this.$dom,isOldie:this.isOldie,uiModules:this.uiModules,click:this.click}},a.prototype.selectAttr=function(){for(var a=0;a<arguments.length;a++){var b=arguments[a],c="data-"+arguments[a],d="gumby-"+arguments[a];if(this.attr(c))return this.attr(c);if(this.attr(d))return this.attr(d);if(this.attr(b))return this.attr(b)}return!1},a.prototype.addInitalisation=function(a,b){this.inits[a]=b},a.prototype.initialize=function(a){this.inits[a]&&"function"==typeof this.inits[a]&&this.inits[a]()},a.prototype.UIModule=function(a){var b=a.module;this.uiModules[b]=a},a.prototype.initUIModules=function(){var a;for(a in this.uiModules)this.uiModules[a].init()},window.Gumby=new a}();