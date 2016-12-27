(function($) {
    function DanMaKu(ele) {
        this.element = $(ele); // 容器
        this.player = this.element.find('video')[0]; // 播放器
        this.elementX = $(ele).width();  // 容器宽度
        this.elementY = $(ele).height();  // 容器高度
        this.opacity = 1;   // danmaku 透明度
        this.DanMaKuList = [];
        /*** Init DanMaku Func ***/
        this._init = function() {
            return DanMaKu;
        };
        this._init();
    }
    // init danmaku method
    DanMaKu.prototype.Init = function(arg) {
        try {
            if (!this.player) throw "noPlayer";
            if (arg===undefined) throw "noArg";
            if (Object.prototype.toString.call(arg) !== '[object Object]'&&Object.prototype.toString.call(arg) !== '[object Array]') throw "errorArg"
        } catch (err) {
            if (err=='noPlayer') {
                console.error('错误: 无法找到匹配的播放载体,请确认初始元素下有Video元素');
            } else if (err=='noArg') {
                console.error('错误: 请确保填写参数');
            } else if (err=='errorArg') {
                console.error('错误: 请确保参数为对象或者数组');
            }
        }
        if (Object.prototype.toString.call(arg) === '[object Object]') {
            this.DanMaKuList.push(arg);
        } else if (Object.prototype.toString.call(arg) === '[object Array]') {
            this.DanMaKuList = arg;
        }
        this.eventListener(this.DanMaKuList,0);
    }
    // insert danmaku method
    DanMaKu.prototype.Push = function(arg) {
        try {
            if (!this.player) throw "noPlayer";
            if (arg===undefined) throw "noArg";
            if (Object.prototype.toString.call(arg) !== '[object Object]') throw "errorArg"
        } catch (err) {
            if (err=='noPlayer') {
                console.error('错误: 无法找到匹配的播放载体,请确认初始元素下有Video元素');
            } else if (err=='noArg') {
                console.error('错误: 请确保填写参数');
            } else if (err=='errorArg') {
                console.error('错误: 请确保参数为对象');
            }
        }
        arg.isCreate = true;
        this.DanMaKuList.push(arg);
        this.Init(this.DanMaKuList,0);
    }
    // shield danmaku method
    DanMaKu.prototype.Shield = function() {
        this.opacity = 0;
        $('.danmaku').css('opacity',0);
    }
    // unshield danmaku method
    DanMaKu.prototype.UnShield = function() {
        this.opacity = 1;
        $('.danmaku').css('opacity',1);
    }
    // set danmaku opacity method
    DanMaKu.prototype.Opacity = function(arg) {
        $('.danmaku').css('opacity',arg);
        return this.opacity = arg;
    }
    // delete danmaku method
    DanMaKu.prototype.Del = function(arg) {
        try {
            if (!this.player) throw "noPlayer";
            if (arg===undefined) throw "noArg";
            if (Object.prototype.toString.call(arg) !== '[object Object]') throw "errorArg"
        } catch (err) {
            if (err=='noPlayer') {
                console.error('错误: 无法找到匹配的播放载体,请确认初始元素下有Video元素');
            } else if (err=='noArg') {
                console.error('错误: 请确保填写参数');
            } else if (err=='errorArg') {
                console.error('错误: 请确保参数为对象');
            }
        }
    } 
    // danmaku event listener
    DanMaKu.prototype.eventListener = function(arg,method) {
        var player = this.player;
        var element = this.element[0];
        var _this = this;
        var vTime = -1;
        element.onclick = function() {
            if ( player.paused ) {
                player.play();
            } else {
                player.pause();
            }
        }
        player.ontimeupdate = function () { 
            if (player.paused) return;
            if (Math.floor(player.currentTime) === vTime) return;
            vTime = Math.floor(player.currentTime);            
            $('.danmaku').each(function() {
                if ($(this).data('cleartime')) {
                    if (vTime < ($(this).data('cleartime')-3) || vTime > $(this).data('cleartime')){
                        $(this).remove();
                    }
                }
            });
            if (method) {
                arg.time == vTime ? _this._createDanmu(arg) : '';
            } else {
                for (var item in arg) {
                    arg[item].time == vTime ? _this._createDanmu(arg[item]) : ''; 
                }
            }
        }
        player.onpause = function() {
            // if video ended, then animation go on; 
            if ( player.ended ) return;
            $('.danmaku').each(function() {
                var x = parseInt($(this).css('transform').split(',')[4]);
                $(this).css('transform','translateX('+x+'px)');
                $(this).css('transition','-webkit-transform 0s linear;');                   
            });
        }
        player.onplay = function() {
            $('.danmaku').each(function(){
                if ($(this).data('speed')) {
                    var danmakuWidth = $(this).width();
                    const End = -(_this.elementX+danmakuWidth+40);
                    var SumTime = $(this).data('speed');
                    var x = parseInt($(this).css('transform').split(',')[4]);
                    const time = (x-End)/-End*SumTime;
                    $(this).css('transform','translateX('+End+'px)');
                    $(this).css('transition','-webkit-transform '+time+'s linear');
                }
            });
        }
        $('body').on('webkitTransitionEnd','.danmaku',function(){
            if (!player.paused) {
                $(this).remove();
            }
        });
    }
    // danmaku cerate method
    DanMaKu.prototype._createDanmu = function(option) {
        var border = option.isCreate ? '2px solid #008000' : 'none';
        var padding = option.isCreate ? '2px 4px' : '0';
        option.isCreate = false;
        option.left = this.elementX+10+'px';
        var fontSize = option.size == 'normal' ? '24px' : '28px';
        switch (option.type) {
            case 'normal' :
                var $div = $('<div class="danmaku" data-speed="7.09701" style="padding: '+padding+';border: '+border+';left: '+option.left+'; top: '+option.position+'px; color: '+option.color+'; font-size:'+fontSize+'; opacity: '+this.opacity+'; transform: translateX(0px); transition: -webkit-transform 7.09701s linear;">'+option.content+'</div>');
                this.element.prepend($div);
                option.danmakuWidth = $div.width();
                const WIDTH = this.elementX+option.danmakuWidth+40;
                setTimeout( function(){
                    $div.css('transform','translateX(-'+WIDTH+'px)');
                },100);
                break;
            case 'top' : 
                var $div = $('<div class="danmaku" data-cleartime='+(option.time+3)+' style="left: 50%; top: '+option.position+'px; color: '+option.color+'; font-size:'+fontSize+'; opacity: '+this.opacity+'; ">'+option.content+'</div>');            
                this.element.prepend($div);
                option.danmakuWidth = $div.width();
                $div.css('transform','translateX(-'+option.danmakuWidth/2+'px)');                
                break;
            case 'bottom' :
                var $div = $('<div class="danmaku" data-cleartime='+(option.time+3)+' style="left: 50%; bottom: '+option.position+'px; color: '+option.color+'; font-size:'+fontSize+'; opacity: '+this.opacity+'; ">'+option.content+'</div>');            
                this.element.prepend($div);
                option.danmakuWidth = $div.width();
                $div.css('transform','translateX(-'+option.danmakuWidth/2+'px)');
                break;
        }    
    }
    window.DanMaKu = window.Danmu = DanMaKu;
})(jQuery);