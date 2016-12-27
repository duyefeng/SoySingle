$(function () {
    var ui = {
        $commit : $('.write-area button')
    };
    var oPage = {
        data: {
            formInfo : {},
            loginInfo : {},
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
            ui.$commit.on('click',function(){
                var text = $('.write-area .textarea').html();
                var o = {
                    'aid' : window.oPageConfig.articleId,
                    'name' : window.oPageConfig.username,
                    'text' : text
                }
                if (o.name=='') {
                    return alert('用户请先登录！');
                }
                self.doAjax({
                    url : '/commit',
                    data : o,
                    type : 'post',
                    sucCallback : function(msg) {
                        alert('评论成功！');
                        window.location.reload();
                    },
                    failCallback : function(msg) {
                        console.log('error');
                    }
                })
            })
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
  