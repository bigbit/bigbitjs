module.exports = function(x, base){
    if(x > base || x < 0 ){
        throw Error("Number should not be out of the range");
    }
    return {
        by : function(y){
            if(x + y <= base){
                return x + y;
            }else{
                return x + y - base;
            }
        }
    }
};