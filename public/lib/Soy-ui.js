$(function(){ 
    // tab-js start
    function tabInit(obj) {
        var $tab = obj;
        var $span = $("<span class='Soy-active'></span>");
        $span.addClass('bg-default');
        $tab.find('a').eq(0).addClass('Soy-active-a');
        $span.css({
            'width' : $tab.find('a').eq(0).css('width')
        })
        $span.appendTo($tab);

        function spanMoving() {
            var left = $(this).position().left;
            var width = $(this).css('width');
            $('.Soy-active-a').removeClass('Soy-active-a');
            $(this).addClass('Soy-active-a');
            $span.css({
                'left' : left+'px',
                'width' : width,
                'transition' : 'right .3s cubic-bezier(.35,0,.25,1) .09s,left .3s cubic-bezier(.35,0,.25,1)'
            });
        };
        $tab.find('a').on('touchstart',spanMoving);
    };   

    // search-js start 
    function searchInit(width,obj) {
        var $searchInput = obj.find('.Soy-search-area');
        var $searchCancel = obj.find('.Soy-search-cancel');
        $searchInput.on('focus',function() {
            $searchInput.css('width',width);
            $searchCancel.css('width',100-parseInt(width)+'%');
        })
        $searchInput.on('blur',function() {
            $searchInput.css('width','100%');
            $searchCancel.css('width','0%');
        })
    };   

    // confirm-js start 
    function confirmInit(Func,obj) {
        $('.Soy-mask').addClass('Soy-showmask');
        $('.Soy-confirm').addClass('Soy-showconfirm');
        $('.Soy-confirm-sure').on('click',function(){
            $('.Soy-mask').removeClass('Soy-showmask');
            $('.Soy-confirm').removeClass('Soy-showconfirm');
            Soy.ruin($('.Soy-confirm'),$('.Soy-mask'));
            if(Func) {Func(obj)};
        });
        $('.Soy-confirm-cancel').on('click',function(){
            $('.Soy-mask').removeClass('Soy-showmask');
            $('.Soy-confirm').removeClass('Soy-showconfirm');
            Soy.ruin($('.Soy-confirm'),$('.Soy-mask'));
        });   
    };

    // action-js start 
    function actionInit(Func,obj)  {
        $('.Soy-mask').addClass('Soy-showmask');     
        $('.Soy-action-modal').css('bottom','-'+$('.Soy-action-modal').css('height'));        
        setTimeout(function(){
            $('.Soy-action-modal').css({
                'bottom' : '0',
                'transition': '300ms'
            });    
        },0);
        $('.Soy-action-func').find('.Soy-action-modal-button').on('touchstart',function(){
            $('.Soy-mask').removeClass('Soy-showmask');
            $('.Soy-action-modal').css({
                'bottom' : '-'+$('.Soy-action-modal').css('height'),
                'transition': '300ms'
            });
            var $self = $(this);  
            setTimeout(function(){
                Soy.ruin($('.Soy-action-modal'),$('.Soy-mask'));            
            },300);
            if(Func) {
                if(Func[$self.index()-1]) {
                    Func[$self.index()-1](obj);
                }
            }    
        });
        $('.Soy-action-cancel').on('touchstart',function(){
            $('.Soy-mask').removeClass('Soy-showmask');
            $('.Soy-action-modal').css({
                'bottom' : '-'+$('.Soy-action-modal').css('height'),
                'transition': '300ms'
            });  
            setTimeout(function(){
                Soy.ruin($('.Soy-action-modal'),$('.Soy-mask'));
            },300);   
        });
    };

    // alert-js start 
    function alertInit(Func,obj) {
        $('.Soy-mask').addClass('Soy-showmask');
        $('.Soy-alert').addClass('Soy-showalert');
        $('.Soy-alert-sure').on('touchstart',function(){
            $('.Soy-mask').removeClass('Soy-showmask');
            $('.Soy-confirm').removeClass('Soy-showalert');
            Soy.ruin($('.Soy-alert'),$('.Soy-mask'));
            if(Func) {Func(obj)};
        }); 
    };

    // sidebar-js start 
    function sidebarInit(options,obj) { 
        Soy.sidebarStatus = true;
        if (options.direction=='left') {
            $('.Soy-sidepage').addClass('left');
            $('.Soy-sidepage').css('transform','translateX('+-options.step+'px)');
            $('.Soy-sidepage').css('width',options.width);
            $('.Soy-mainpage').css({
                'transform': 'translateX('+options.step+'px)',
                'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
            });
        } else {
            $('.Soy-sidepage').addClass('right');
            $('.Soy-sidepage').css('transform','translateX('+options.step+'px)');
            $('.Soy-sidepage').css('width',options.width);
            $('.Soy-mainpage').css({
                'transform': 'translateX('+-options.step+'px)',
                'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
            });
        };   
        $('.Soy-sidepage').css({
            'opacity':0.9,
            'transform': 'translateX(0)',
            'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
        });    
        if (options.openCallback) {options.openCallback(obj);}
        return Soy.database.sidebar = options;
    }

    // sidebar-js end
    function sidebarEnd(options,obj) { 
        Soy.sidebarStatus = false;      
        $('.Soy-mainpage').css({
            'transform': 'translateX(0)',
            'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
        });
        if (options.direction=='left') {
            $('.Soy-sidepage').css({
                'transform': 'translateX('-options.step+'px)',
                'opacity': 0,
                'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
            });
        } else {
            $('.Soy-sidepage').css({
                'transform': 'translateX('+options.step+'px)',
                'opacity': 0,
                'transition': 'all '+options.speed+' cubic-bezier(.35,0,.25,1)'
            });
        }
        setTimeout(function(){
            if (options.direction=='left') {
                $('.Soy-sidepage').removeClass('left');
            } else {
                $('.Soy-sidepage').removeClass('right');
            }
            $('.Soy-mainpage')[0].style = '';
            $('.Soy-sidepage')[0].style = '';
            if (options.closeCallback) {options.closeCallback(obj);}
        },parseInt(options.speed));
    }

    // group-js start 
    function groupInit(options,obj) {
        if (options.head) {
            if (options.head.img) {
                obj.find('.Soy-group-head').css('background-Image','url('+options.head.img+')');
            } 
        } 
        if (options.foot) {
            if (options.foot[0].href) {
                obj.find('.Soy-group-foot a').eq(0).attr('href',options.foot[0].href);          
            } if (options.foot[1].href) {
                obj.find('.Soy-group-foot a').eq(1).attr('href',options.foot[1].href);
            } 
            obj.find('.Soy-group-foot a').eq(0).on('click',function(){
                if (options.foot[0].callback) options.foot[0].callback(obj);
            });
            obj.find('.Soy-group-foot a').eq(1).on('click',function(){
                if (options.foot[1].callback) options.foot[1].callback(obj);
            });
        }
        obj.find('.Soy-group-content').on('click',function(){
            if (options.callback) options.callback(obj);
        });
    }

    // form-js start
    function formInit(options,obj) {
        var data = {};
        var valiResults = [true,true,true];
        function valiUsername() {
            if ( !options.username ) return true;
            if ( options.username.vali(obj.find('.Soy-form-username input').val()) ) {
                obj.find('.Soy-form-username .vali').removeClass('vali-fail');
                obj.find('.Soy-form-username .vali').addClass('vali-pass');
                obj.find('.Soy-form-username .vali').html('&#xe610;');
                valiResults[0] = true;
            } else {
                obj.find('.Soy-form-username .vali').removeClass('vali-pass');
                obj.find('.Soy-form-username .vali').addClass('vali-fail');
                obj.find('.Soy-form-username .vali').html('&#xe60f;');
                valiResults[0] = false;
            }
        };
        function valiPassword() {
            if ( !options.password) return true;
            if ( options.password.vali(obj.find('.Soy-form-password input').val()) ) {
                obj.find('.Soy-form-password .vali').removeClass('vali-fail');
                obj.find('.Soy-form-password .vali').addClass('vali-pass');
                obj.find('.Soy-form-password .vali').html('&#xe610;');
                valiResults[1] = true;
            } else {
                obj.find('.Soy-form-password .vali').removeClass('vali-pass');
                obj.find('.Soy-form-password .vali').addClass('vali-fail');
                obj.find('.Soy-form-password .vali').html('&#xe60f;');
                valiResults[1] = false;
            }
        };
        function valiEmail() {
            if ( !options.mail ) return true;
            if ( options.mail.vali(obj.find('.Soy-form-email input').val()) ) {
                obj.find('.Soy-form-email .vali').removeClass('vali-fail');
                obj.find('.Soy-form-email .vali').addClass('vali-pass');
                obj.find('.Soy-form-email .vali').html('&#xe610;');
                valiResults[2] = true;
            } else {
                obj.find('.Soy-form-email .vali').removeClass('vali-pass');
                obj.find('.Soy-form-email .vali').addClass('vali-fail');
                obj.find('.Soy-form-email .vali').html('&#xe60f;');
                valiResults[2] = false;
            }
        }
        obj.find('.Soy-form-username input').on('blur',function(){
            valiUsername();
        });
        obj.find('.Soy-form-password input').on('blur',function(){
            valiPassword();
        });
        obj.find('.Soy-form-email input').on('blur',function(){
            valiEmail();
        });
        obj.find('.sex').on('touchstart',function(){
            if( $(this).find('a').hasClass('left') ) {
                $(this).find('a').removeClass('left');
                $(this).find('a').addClass('right');
        } else {
            $(this).find('a').removeClass('right');
            $(this).find('a').addClass('left');
            }
        });

        obj.find('.submit').on('click',function(){
            valiUsername();
            valiPassword();
            valiEmail();
            for (var i=0;i<valiResults.length;i++) {
                if (!valiResults[i]) { 
                    obj.find('input').eq(i).focus();
                    obj.find('input').eq(i).val('');
                    return false;
                }
            }
            $('.submit').html(options.submit.sending);
            if ( obj.find('div').hasClass('Soy-form-username') ) {
                data.name = obj.find('.Soy-form-username').find('input').val();
            } if ( obj.find('div').hasClass('Soy-form-password') ) {
                data.password = obj.find('.Soy-form-password').find('input').val();
            } if ( obj.find('div').hasClass('Soy-form-email') ) {
                data.mail = obj.find('.Soy-form-email').find('input').val();
            } if ( obj.find('div').hasClass('Soy-form-sex') ) {
                data.sex = obj.find('.Soy-form-sex').find('a').hasClass('left') ? options.sex.value[0] : options.sex.value[1];
            }
            options.submit.callback(data,function(){
                obj.find('.submit').addClass('sent');
                obj.find('.submit').html(options.submit.compeleted);
                obj.find('.submit').unbind('click');
            },function(){
                obj.find('.vali').each(function(){
                    $(this).html('');
                });
                obj.find('input').each(function(){
                    $(this).val('');
                });
                setTimeout(function(){
                    obj.find('input').eq(0)[0].focus();
                },100);
                obj.find('.submit').html(options.submit.text);
            });
        })
    }

    function Soyer() {
        this.sidebarStatus = false;
        this.database = {
            'sidebar' : {}
        }
        this.listenEvent = function() {
            var self = this;
            $('.Soy-tab').each(function(){
                var Data = eval("SoyConfig."+$(this).data('tab'));
                return self.tab(Data,$(this));
            });
            $('.Soy-search').each(function(){
                var Data = eval("SoyConfig."+$(this).data('search'));
                return self.search(Data,$(this));
            });
            $('.Soy-group').each(function(){
                var Data = eval("SoyConfig."+$(this).data('group'));
                return self.group(Data,$(this));
            });
            $('.Soy-form').each(function(){
                var Data = eval("SoyConfig."+$(this).data('form'));
                return self.form(Data,$(this));
            });
            $('body').on('touchstart','.Soy-confirm-start',function(){
                var Data = eval("SoyConfig."+$(this).data('confirm'));
                return self.confirm(Data,$(this));
            });
            $('body').on('touchstart','.Soy-action-start',function(){
                var Data = eval("SoyConfig."+$(this).data('action'));
                return self.action(Data,$(this));
            });
            $('body').on('touchstart','.Soy-alert-start',function(){
                var Data = eval("SoyConfig."+$(this).data('alert'));
                return self.alert(Data,$(this));
            });
            $('body').on('touchstart','.Soy-sidebar-start',function(event){
                event.stopPropagation();
                var Data = eval("SoyConfig."+$(this).data('sidebar'));
                return self.sidebar(Data,$(this),'open');
            });
            $('body').on('touchstart','.Soy-sidebar-end',function(){
                var Data = eval("SoyConfig."+$('.Soy-sidebar-start').data('sidebar'));
                return self.sidebar(Data,$(this),'close');
            });
            $('body').on('touchstart','.Soy-mainpage',function(){
               if ( Soy.sidebarStatus) {
                    self.sidebar(Soy.database.sidebar,$(this),'close');
               }
            });
        } 
        this.listenEvent();
    } 
    Soyer.prototype = {
        create: function(type,options,obj) {
            var self = this;
            switch (type) {
                case 'tab' : 
                    self.tab(options,obj);
                    break;
                case 'search' :
                    self.search(options,obj);
                    break;
                case 'confirm' :
                    self.confirm(options,obj);
                    break;
                case 'action' : 
                    self.action(options,obj);
                    break;
                case 'alert' : 
                    self.alert(options,obj);
                    break;
                case 'sidebar' : 
                    self.sidebar(options,obj,options.onoff);
                    break;
                case 'group' :
                    self.group(options,obj,'create');
                    break;
                case 'form' : 
                    self.form(options,obj);
                    break;
                default : 
            }
        },
        tab : function(options,obj) {
            var config = {
                'lists' : options.lists||['tab1','tab2','tab3']
            }
            var $div = '';
            for (var i=0 ; i<config.lists.length ; i++) {
                $div += "<a>"+config.lists[i]+"</a>";
            }
            obj.append($div);
            tabInit(obj);
        },
        search : function(options,obj) {
            var config = {
                'placeholder' : options.placeholder||"输入关键字...",
                'cancel' : options.cancel||'取消',
                'width' : options.width||'85%'
            }
            var $div =  "<i class='Soy-search-icon'></i>"+
            "<input class='Soy-search-area' placeholder="+config.placeholder+">"+
            "<div class='Soy-search-cancel'>"+config.cancel+"</div>"
            obj.append($div);
            searchInit(config.width,obj);
        },
        confirm : function(options,obj) {
            var config = {
                'title' : options.title||'Are you sure',
                'cancel' : options.cancel||'Cancel',
                'sure' : options.sure||'Sure'
            }
            var $div = "<div class='Soy-confirm'>"+
            "<div class='Soy-confirm-title'>"+config.title+"</div>"+
            "<div class='Soy-confirm-body'>"+    
            "<div class='Soy-confirm-cancel'>"+config.cancel+"</div>"+
            "<div class='Soy-confirm-sure'>"+config.sure+"</div>"+
            "</div>"+
            "</div>";
            this.mask();
            $('body').append($div);
            setTimeout( function(){ 
                confirmInit(options.callback,obj);
            },0);
        },
        action : function(options,obj) {
            var config = {
                'title' : options.title||'Are you sure',
                'lists' : options.lists||['Hello','World'],
                'cancel' : options.cancel||'Cancel'
            }
            var $list = '';
            for (var i=0 ; i<config.lists.length ; i++) {
                $list += "<span class='Soy-action-modal-button'>"+config.lists[i]+"</span>";
            }
            var $div = "<div class='Soy-action-modal'>"+
            "<div class='Soy-action-modal-group Soy-action-func'>"+
            "<span class='Soy-action-modal-title'>"+config.title+"</span>"+$list+"</div>"+
            "<div class='Soy-action-modal-group Soy-action-cancel'>"+
                "<span class='Soy-action-modal-button bg-danger'>"+config.cancel+"</span>"+
            "</div>"
            "</div>";
            this.mask();
            $('body').append($div);
            setTimeout( function(){ 
                actionInit(options.callback,obj);
            },0);
        },
        alert : function(options,obj) {
            var config = {
                'title' : options.title||'',
                'tips' : options.tips||自定义提示,
                'sure' : options.sure||确定
            }
            var $div = "<div class='Soy-alert'>"+
            "<div class='Soy-alert-head'>"+
            "<div class='Soy-alert-title'>"+config.title+"</div>"+
            "<div class='Soy-alert-tips'>"+config.tips+"</div>"+
            "</div>"+
            "<div class='Soy-alert-sure'>"+config.sure+"</div>"+
            "</div>";
            this.mask();
            $('body').append($div);
            setTimeout( function(){ 
                alertInit(options.callback,obj);
            },0);
        },
        sidebar : function(options,obj,onoff) {
            var config = {
                'width' : options.width||'60%',
                'step' : parseInt(options.width)/100*$('body').width(),
                'direction' : options.direction||'left',
                'speed' : options.speed||'500ms',
                'openCallback' : options.openCallback||false,
                'closeCallback' : options.closeCallback||false
            }
            onoff == 'open' ? sidebarInit(config,obj) : sidebarEnd(config,obj);
        },
        group : function(options,obj) {
            if (!obj.hasClass('Soy-group')) {
                var str1 = "<div class='Soy-group'>";
                var str2 = "</div>";
            } else {
                var str1 = "";
                var str2 = "";
            }
            var config = {
                'head' : options.head,
                'content' : options.content||['正文内容'],
                'foot': options.foot,
                'callback': options.callback
            };
            var $div = '';
            var $divBody = '';
            var $divHead = '';
            var $divFoot = '';
            if (config.head) {
                $divHead = "<div class='Soy-group-head'>"+(config.head.text||'你好')+"</div>"
            }    
            if (config.foot) {
                $divFoot =  "<div class='Soy-group-foot'>"+
                "<a>"+(config.foot[0].text||'赞')+"</a>"+
                "<a>"+(config.foot[1].text||'前往更多')+"</a>"+
                "</div>"
            }
            for (var i=0 ; i<config.content.length ; i++) {
                if ( config.content[i].constructor.name == 'Object') {
                    $divBody += "<p><img src='"+config.content[i].Image+"' width='100%'/></p>";
                } else {
                    $divBody += "<p>"+config.content[i]+"</p>";
                }
            }
            $divBody = "<div class='Soy-group-content'>"+$divBody+"</div>";
            $div = $(str1+$divHead+$divBody+$divFoot+str2);
            obj.append($div);
            if (arguments.length>2) {
                groupInit(config,$div);
            } else {                
                groupInit(config,obj);
            }
        },
        form : function(options,obj) {
            if (!obj.hasClass('Soy-form')) {
                obj.addClass('Soy-form');
            }
            var config = {
                'username' : options.username,
                'password' : options.password,
                'mail' : options.mail,
                'sex' : options.sex,
                'submit' : options.subimt
            }
            var $div = "";
            var $name = "";
            var $pwd = "";
            var $mail = "";
            var $sex = "";
            var $submit = "";
            if ( config.username ) {
                $name = "<div class='Soy-form-username'>"+
                            "<i class='icon iconfont'>&#xe609;</i>"+
                            "<div class='clearfix'>"+
                            "<div class='text'><span>"+(config.username.text||'用户名')+"</span></div>"+
                            "<input placeholder="+(config.username.holder||'your username')+">"+
                            "<i class='icon iconfont vali'></i>"+
                            "</div>"+  
                            "</div>"
            } if ( config.password ) {
                $pwd = "<div class='Soy-form-password'>"+
                           "<i class='icon iconfont'>&#xe60e;</i>"+
                           "<div class='clearfix'>"+
                           "<div class='text'><span>"+(config.password.text||'密码')+"</span></div>"+
                           "<input type='password' placeholder="+(config.password.holder||'your password')+">"+
                           "<i class='icon iconfont vali'></i>"+
                           "</div>"+
                           "</div>"
            } if ( config.mail ) {
                $mail = "<div class='Soy-form-email'>"+
                           "<i class='icon iconfont'>&#xe60d;</i>"+
                           "<div class='clearfix'>"+
                           "<div class='text'><span>"+(config.mail.text||'邮箱')+"</span></div>"+
                           "<input placeholder="+(config.mail.holder||'your email')+">"+
                           "<i class='icon iconfont vali'></i>"+
                           "</div>"+
                           "</div>"
            } if ( config.sex ) {
                 $sex = "<div class='Soy-form-sex'>"+
                            "<i class='icon iconfont'>&#xe605;</i>"+
                            "<div class='clearfix'>"+ 
                            "<div class='text'><span>"+(config.sex.text||'性别')+"</span></div>"+
                            "<span class='value-1'>"+config.sex.content[0]+"</span>"+
                            "<div class='sex'><a class='left'></a></div>"+
                            "<span class='value-2'>"+config.sex.content[1]+"</span>"+
                            "</div>"+
                            "</div>"
            }
            $submit = "<a class='submit'>"+options.submit.text+"</a>";
            $div = $name + $pwd + $mail + $sex + $submit;
            obj.append($div);
            formInit(options,obj);
        },
        mask : function() {
            var $mask = "<div class='Soy-mask'></div>";
            return $('body').append($mask);
        },
        ruin : function(ele) {
            for (var i=0;i<arguments.length;i++) {
                arguments[i].remove();
            } 
        },
        Start : function(obj) {
            var self = this;
            var Data = '';
            if(obj.timeout) {
                setTimeout(function(){
                    Data = eval("SoyConfig."+obj.el.data(obj.type));
                    // 如果有判断开关选项 ，让Data也含有开关选项
                    if(obj.onoff) {Data.onoff=obj.onoff};   
                    self.create(obj.type,Data,obj.el);
                },obj.timeout);
            } else {
                Data = eval("SoyConfig."+obj.el.data(obj.type));
                // 如果有判断开关选项 ，让Data也含有开关选项
                if(obj.onoff) {Data.onoff=obj.onoff};  
                self.create(obj.type,Data,obj.el);
            }
        }
    }
    var Soy = new Soyer;
    return window.Soy = Soy;
}); 