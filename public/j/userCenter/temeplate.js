$(function () {
    var ui = {
        $tabItem : $('.user-center-item a'),
        $theme : $('.user-center-pannel .theme')
    };
    var oPage = {
        data: {
            username : '',
            temp : null,
            ani : 'ani1',
            canToggle: false
        },
        init: function () {
            this.view();
            this.listen();
        }, 
        view: function () {
            var selected = document.getElementById(oPageConfig.temp);
            $(selected).addClass('current');
            $(selected).append('<i class="icon iconfont">&#xe610;</i>');
        },
        listen: function () {
            var self = this;
            ui.$theme.on('click',function() {
                self.toggleJs(this).addCurrent(this).aniRandom().tempToggle(this.id);
            })
            $('.save').on('click', function() {
                var params = {
                    'name' : oPageConfig.username,
                    'temp' : self.data.temp,
                    'theme' : self.data.theme
                }
                self.doAjax({
                    url : '/user_center/temp/select',
                    data : params,
                    type : 'post',
                    cache: false,
                    sucCallback : function(msg) {
                      
                    },
                    failCallback : function(msg) {
                        console.log('error');
                    }
                })
            })
        },
        toggleJs: function(ele) {
            var theme = $(ele).data('theme');
            if (theme=='deepsea') {
                $('canvas').css('display','none');
                $('#canvas1').css('display','block');
            } else if (theme=='hanabi') {
                $('canvas').css('display','none');
                $('#canvas2').css('display','block');
            } else  if (theme=='snow') {
                $('canvas').css('display','none');
                $('#canvas3').css('display','block');
            } else  if (theme=='halloween') {
                $('canvas').css('display','none');
                $('#canvas4').css('display','block');
            }
            this.data.theme = theme;
            return oPage;
        },
        addCurrent: function(ele) {
            var self = this;
            if ( self.data.canToggle ) return;
            $('.theme.current i').remove();
            $('.theme.current').removeClass('current');
            $(ele).addClass('current');
            $(ele).append('<i class="icon iconfont">&#xe610;</i>');
            return oPage;
        },
        aniRandom: function() {
            var self = this;
            var random = Math.floor(Math.random()*3);
            var aniArr = ['ani1','ani2','ani3'];
            oPage.data.ani = aniArr[random];
            return oPage;
        },
        tempToggle: function(arg) {
            var self = this;
            if ( self.data.canToggle ) return;
            self.data.canToggle = true;
            self.data.temp = arg; 
            var src =  "/i/userCenter-bg/"+self.data.temp+".jpg";
            $('#canvas-bg').css('backgroundImage','url("'+src+'")');
            $('#canvas-bg').addClass(self.data.ani);
            setTimeout(function(){
                $('#canvas-bg').removeAttr("class");
                self.data.canToggle = false;
            },1000);
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
  