exports.dateFom  = function (result,name,type) {
    for (var item in result) {
        result[item][name] = new Date(result[item][name]*1000).Format(type);
    }
    return result;
}
exports.nowDate = function() {
    return Math.round(new Date().getTime()/1000);
}