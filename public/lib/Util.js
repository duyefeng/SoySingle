"use strict";
String.prototype.trim=function(){
　　return this.replace(/(^\s*)|(\s*$)/g, "");
}
!function(){
    var utils = {
        dataURLtoBlob: function(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
    }
    return window.utils = utils;
}();