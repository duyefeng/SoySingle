$(function () {
    var ui = {
        $tabItem : $('.user-center-item a')
    };
    var oPage = {
        data: {
            username : ''
        },
        init: function () {
            this.view();
            this.listen();
        },
        view: function () {
            var self = this;
            $('canvas').css('display','none');
            switch (oPageConfig.theme) {
                case 'ocean' : 
                    $('#canvas1').css('display','block');
                    break;
                case 'hanabi':
                    $('#canvas2').css('display','block');
                    break;
                case 'snow':
                    $('#canvas3').css('display','block');
                    break;
                case 'halloween':
                    $('#canvas4').css('display','block');
                    break;
            }
            $('#canvas-bg').css('backgroundImage','url("/i/userCenter-bg/'+oPageConfig.temp+'.jpg")');
        },
        listen: function () {
            var self = this;
            $('.'+oPageConfig.pannelName).addClass('active');
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
  