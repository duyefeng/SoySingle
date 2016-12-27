$(function () {
    var ui = {
        $tabItem : $('.user-center-item a'),
        $button : $('.user-center-pannel button')
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
        },
        listen: function () {
            var self = this;
            ui.$button.on('click',function() {
                self.aniRandom().tempToggle(this.id);
            })
            $('.save').on('click', function() {
                var params = {
                    'name' : 123,
                    'temp' : self.data.temp
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
            var image = new Image();
            image.src = "/i/userCenter-bg/"+self.data.temp+".jpg";
            image.onload = function() {
                $('#canvas-bg').css('backgroundImage','url("'+image.src+'")');
                $('#canvas-bg').addClass(self.data.ani);
                setTimeout(function(){
                    $('#canvas-bg').removeClass(self.data.ani);
                    self.data.canToggle = false;
                },1200);
            }
            image.onerror = function() {
                alert('对不起，似乎图片出错了！');
                ui.$button.data('toggle',false);
            }
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
  