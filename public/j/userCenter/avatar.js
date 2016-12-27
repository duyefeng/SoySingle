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
  