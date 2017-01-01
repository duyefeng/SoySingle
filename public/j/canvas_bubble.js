(function () {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        canvas = document.getElementById('canvas1');
        ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // create particles
        circles = [];
        for(var x = 0; x < width*0.1; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;
        // constructor
        (function() {
            _this.pos = {};
            init();
            // console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.2+Math.random()*0.3;
            _this.scale = 0.2+Math.random()*0.4;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0001;
            ctx.beginPath();
            ctx.shadowColor = "RGBA(255,255,255,1)";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 15;
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*30, 0, 2 * Math.PI, false);
            ctx.strokeStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.stroke();
        };
    }
})();