$(function () {
    var ui = {
        $shiled : $('#shiled'),
        $unshiled : $('#unshiled'),
        $opacityBtn : $('#opacity-btn'),
        $onlineNum : $('#js_online_num '),
        $dmkNum : $('#js_danmaku_num'),
        $dmkul : $('#danmaku-list ul')
    };
    var oPage = {
        data: {
            DanMaKuList : [],
            limitHeight : 400,
            dmkNum : 0
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
            var DanMu = new Danmu('#player-video-danmaku');
            var player = document.getElementById('player');
            oPage.data.dmkNum = parseInt(ui.$dmkNum.html());
            self.doAjax({
                url : '/danmaku/init',
                data : { id :oPageConfig.videoId },
                type : 'post',
                sucCallback : function(msg) {
                    oPage.data.DanMaKuList = msg.data.danmaku;
                    DanMu.Init(oPage.data.DanMaKuList);
                },
                failCallback : function(msg) {
                    console.log('error');
                }
            })
            var socket = io.connect('http://192.168.137.39:3000');
            socket.on('connect', function(){
                socket.emit("userLogin", {
                    'username' : oPageConfig.username
                });
            });
            socket.on("sys", function(msg){
                console.log('当前观看人数:'+msg.roomNum);
                ui.$onlineNum.html(msg.roomNum);
            })
            socket.on('DmkReturn',function(msg, date) {
                oPage.data.dmkNum++;
                DanMu.Push(msg);
                self.listInsert(msg,date);
                ui.$dmkNum.html(oPage.data.dmkNum);
            });
            document.getElementById("danmu-btn").onclick = function(){
                self.sendDanmaku(socket);
            }
            document.getElementById("danmu").onkeydown = function(e) {
                return e.which == 13 ? self.sendDanmaku(socket) : null ;
            }
            // var arr = [
            //     {
            //         'time' : 2,
            //         'content' : '我是绿字施工君',
            //         'color' : 'rgb(0,255,0)',
            //         'type' : 'top',
            //         'size' : 'normal',
            //         'position'  : 30
            //     },
            //     {
            //         'time' :  14,
            //         'content' : '今天来跟大家聊一下我自己碰见过的一些和推销有关的',
            //         'color' : 'rgb(214,0,0)',
            //         'type' : 'bottom',
            //         'size' : 'normal',
            //         'position'  : 40 
            //     },
            // ]
            ui.$shiled.on('click',function(){
                DanMu.Shield();
            })
            ui.$unshiled.on('click',function(){
                DanMu.UnShield();
            })
            ui.$opacityBtn.on('click',function(){
                DanMu.Opacity($('#opacity').val());
            })
            // 单击选中该条弹幕
            ui.$dmkul.on('click',ui.$dmkul.find('li'),function(e){
                $('.selected') ? $('.selected').removeClass("selected") : null;
                var $li = $(e.originalEvent.target).closest("li");
                return $li.addClass('selected');
            });
            // 双击跳到选定弹幕位置
            ui.$dmkul.on('dblclick',ui.$dmkul.find('li'),function(e){
                var $li = $(e.originalEvent.target).closest("li");
                player.currentTime = $li.data('time') > 0 ? $li.data('time')-1 : 0 ;
                return player.paused ? player.play() : null;
            });
        },
        sendDanmaku: function(socket) {
            if (oPageConfig.username == '') return;
            var objectDmk = {};
            var txt = document.getElementById("danmu").value.trim();
            if (txt=='') return;
            document.getElementById("danmu").value = '';
            var currentTime = parseInt(player.currentTime);
            objectDmk = {
                'time' : currentTime,
                'content' : txt,
                'color' : 'rgb(255,255,255)',
                'type' : 'normal',
                'size' : 'normal'
            }
            //向服务器发射弹幕对象
            socket.emit("DmkSend", objectDmk, oPage.data.limitHeight, oPageConfig.username, oPageConfig.videoId);
        },
        listInsert: function(arg, localTime) {
            var m,s,time;
            m = parseInt(arg.time/60);
            s = arg.time%60;
            if  (m===0) {
                m = "00"
            }   else if (m<10) {
                m = "0" + m;
            }   else {
                m = "" + m;
            }
            if  (s===0) {
                s = "00"
            } else if (s<10) {
                s = "0" + s;
            }  else {
                s = "" + s;
            }
            time = m + ':' + s;
            var str = '<li data-time='+arg.time+'><span class="time">'+time+'</span><span class="text">'+arg.content+'</span><span class="send-time">'+localTime+'</span></li>'
            ui.$dmkul.append(str);
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
        }
    };
    oPage.init();
});
  