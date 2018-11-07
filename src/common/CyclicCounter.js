/**
 * reset the counter once reach to max (inclusive)
 * @param {number} max 
 * @param {number} min 
 * @returns 0 if increments. 1 if resets
 */
function cyclicCounter(val, max, min){
    this.max = max;
    this.min = min || 0;
    this.value = val || min;

    this.add = function(num){
        if(num > this.max || num < 0 ){
            throw Error("Number should not be out of the range");
        }
        if(this.value + num <= this.max){
            this.value += num;
            return true;
        }else{
            this.value = this.min + ( this.value + num - this.max);
            return false;
        }
    }

    this.up = function(){
        if(this.value < this.max){
            this.value++;
            return true;
        }else{
            this.value = this.min;
            return false;
        }
    }

    this.down = function(){
        if(this.value > this.min){
            this.value--;
            return true;
        }else{
            this.value = this.max;
            return false;
        }
    }
}

module.exports = cyclicCounter;