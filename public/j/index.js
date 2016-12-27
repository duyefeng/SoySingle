$(function () {
    var ui = {
        $input : $('.login-body input'),
        $login : $('.banner-form .login'),
        $user_extend : $('.user-info'),
        $resetBtn : $('.login-body .reset'),
        $avatarArea : $('.login-pic'),
        $avatarBtn : $('#js_avatar'),
        $avatar: $('#avatarFile'),
        $inner: $('#inner-avatar'),
        $innerImg: $('#inner-bg'),
        $previewImg : $('#preview'),
        $registerBtn : $('.login-body .js_register'),
        $loginBtn : $('.login-body .js_login'),
        $quitBtn : $('.banner-form .quit')
    };
    var oPage = {
        data: {
            formInfo : {},
            loginInfo : {},
            username : '',
            avatarFile : {},
            position: [] // 头像偏移量
        },
        init: function () {
            this.view();
            this.listen();
        },
        view: function () {
            var self = this;
        },
        listen: function () {
            var self = this;
            $('body').on('click', function(e){
                var $e = $(e.originalEvent.target);
                if (!$e.hasClass("user-info-active")) {
                    $('.user-info-extend').slideUp(150);            
                    setTimeout(function(){
                        $('.user-info-active').removeClass('user-info-active');
                    },150);            
                }
            })
            ui.$user_extend.on('click',function(e) {
                if (!$(this).hasClass("user-info-active")) {
                    $(this).addClass('user-info-active');
                    $('.user-info-extend').slideDown(150);
                } else {
                    $('.user-info-extend').slideUp(150);            
                    setTimeout(function(){
                        $('.user-info-active').removeClass('user-info-active');
                    },150);   
                }
                e.stopPropagation(); 
            });
            ui.$input.on('focus',function(){
                $(this).addClass('outline');
            });
            ui.$input.on('blur',function(){
                $(this).removeClass('outline');
            });
            ui.$login.on('click',function(){
                window.sessionStorage.setItem('lastUrl',window.location.pathname);
            });
            ui.$avatarArea.on('click',function(e){
                var x = e.originalEvent.offsetX;
                var y = e.originalEvent.offsetY;
                if (x<80) {
                    x=80;
                } if (y<80) {
                    y=80;
                } if (x>320) {
                    x=320;
                } if (y>170) {
                    y=170;
                }
                ui.$inner.css('transform','translate('+(x-80)+'px,'+(y-80)+'px');
                ui.$innerImg.css('transform','translate('+(80-x)+'px,'+(80-y)+'px');
                ui.$previewImg.css('backgroundPosition',0.75*(80-x)+'px '+0.75*(80-y)+'px');
                oPage.data.position = [x-80,y-80];
            });
            ui.$avatar.on('change',function(){
                var file = this;
                ui.$avatarBtn.html('重新选择');
                if (file.files && file.files[0]) {                  
                    var reader = new FileReader();  
                    reader.onload = function(evt){  
                        var image = new Image();
                        var blob =  utils.dataURLtoBlob(evt.target.result);
                        image.src = window.URL.createObjectURL(blob);
                        image.onload = function(){
                            if(image.width<400||image.height<250) {
                                alert('图片尺寸太小');
                                return ;
                            } else {
                                oPage.data.avatarFile = file.files[0];
                                $('.login-pic').css('backgroundImage','url('+image.src+')');
                                ui.$innerImg.css('backgroundImage','url('+image.src+')');
                                ui.$previewImg.css('backgroundImage','url('+image.src+')');
                                ui.$inner.css('transform','');
                                ui.$innerImg.css('transform','');
                                ui.$previewImg.css('backgroundPosition','');
                            }
                        }              
                    };
                    reader.readAsDataURL(file.files[0]);  
                }
            });
            ui.$quitBtn.on('click',function(){
                self.doAjax({
                    url : '/logout',
                    type : 'get',
                    sucCallback : function(msg) {
                        console.log(msg);
                        window.location.reload();
                    }
                })
            });
            ui.$registerBtn.on('click',function(){
                if (self.formVali()) {
                    self.data.formInfo = {
                        nickname : $('.username input').val(),
                        password : $('.password input').val(),
                        phone : $('.phone input').val(),
                        mail :　$('.mail input').val()
                    };
                    var formData = new FormData();
                    formData.append("image", oPage.data.avatarFile);
                    formData.append("nickname", self.data.formInfo.nickname);
                    formData.append("password", self.data.formInfo.password);
                    formData.append("phone", self.data.formInfo.phone);
                    formData.append("mail", self.data.formInfo.mail);
                    formData.append("position", oPage.data.position);
                    console.log(formData);
                    $.ajax({
                      url: "register_post",
                      type: "POST",
                      data: formData,
                      processData: false,  
                      contentType: false,
                    }).done(function (msg) {
                        console.log(msg);
                        var data = msg.data;
                        var reg = new RegExp("(/login)|(/register)", "");
                        window.location.href = reg.test(window.sessionStorage.lastUrl) ? '/' :  window.sessionStorage.lastUrl;
                    }).always(function () {
            
                    });
                    // self.doAjax({
                    //     url : 'register_post',
                    //     data : self.data.formInfo,
                    //     type : 'post',
                    //     sucCallback : function(msg) {
                    //         var data = msg.data;
                    //         var reg = new RegExp("(/login)|(/register)", "");
                    //         window.location.href = reg.test(window.sessionStorage.lastUrl) ? '/' :  window.sessionStorage.lastUrl;
                    //     }
                    // })
                }
            });
            ui.$loginBtn.on('click',function(){
                if (self.formVali()) {
                    self.data.loginInfo = {
                        passport : $('.passport input').val(),
                        password : $('.password input').val()
                    }
                    self.doAjax({
                        url : 'login_post',
                        data : self.data.loginInfo,
                        type : 'post',
                        sucCallback : function(msg) {
                            var data = msg.data;
                            var reg = new RegExp("(/login)|(/register)", "");
                            window.location.href = reg.test(window.sessionStorage.lastUrl) ? '/' :  window.sessionStorage.lastUrl;
                        },
                        failCallback : function(msg) {
                            console.log('error');
                        }
                    })
                }
            });
            ui.$resetBtn.on('click',function(){
                ui.$input.each(function(){
                    $(this).val('');
                })
                $('.username input').focus();
            });
        },
        doAjax: function(options) {
          $.ajax({
            url: options.url,
            data: options.data,
            dataType: options.dataType||"JSON",
            type: options.type||'get'
          }).done(function (msg) {
            if(0 == msg.code) {     
              options.sucCallback && options.sucCallback(msg);
            } else {
              options.failCallback && options.failCallback(msg);
            }
          }).always(function () {
            
          });
        },
        formVali: function() {
            return true;
        }
    };

    oPage.init();
});
  