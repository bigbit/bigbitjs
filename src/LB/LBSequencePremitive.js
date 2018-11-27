const increase = require("../common/CyclicCounter");
const {getCodePoint} = require("../common/encoding");
const powerOf128 = [ //exponentTableOf128
    Math.pow(128, 0),
    Math.pow(128, 1),
    Math.pow(128, 2),
    Math.pow(128, 3),
    Math.pow(128, 4),
    Math.pow(128, 5),
    Math.pow(128, 6),
    Math.pow(128, 7),
    Math.pow(128, 8),
    Math.pow(128, 9),
    Math.pow(128, 10),
    Math.pow(128, 11),
    Math.pow(128, 12),
    Math.pow(128, 13),
    Math.pow(128, 14),
    Math.pow(128, 15),
    Math.pow(128, 16),
    Math.pow(128, 17),
    Math.pow(128, 18),
    Math.pow(128, 19),
    Math.pow(128, 20),
]

const base = 128;
const defaultOptions = {
    decimalSeparator: ".",
    arrOnly: true,
}

const LBSequence = {
    encode : function(num, options){
        const opts = Object.assign({}, defaultOptions, options);

        if(num === null || num === undefined){
            throw new Error("LB format doesn't support an invalid number");
        }else if(num == 0){
            if( opts.arrOnly){
                return [ 0 ];
            }else{
                return 0;
            }
        }else if(typeof num === 'number' && num % 1 ){
            throw new Error("LB format doesn't support fractional number");
        }

        let decimalValue = num;
        if(decimalValue < 0){
            throw new Error("LB format doesn't support negative number");
        }

        let remainder = decimalValue % base ;
        let sequence = [ 0 ];
        let quotient = (decimalValue - remainder) / base;
    
        function _buildSequence(level, quotient, remainder){
            if( quotient> base - 1 ){//still divisible
                sequence[level] = increase(sequence[level] | 0, base).by(remainder) | 128;
                remainder = quotient % base;
                
                _buildSequence(level + 1, (quotient - remainder) / base , remainder);
            }else if(quotient === 0) {

                //don't add extra empty byte
            }else{
                sequence[level] = increase(sequence[level] | 0, base).by(remainder) | 128;
                if( !sequence[ level +1 ] ) {
                    sequence.push( 0 );
                }
                sequence[ level + 1 ] = increase(sequence[ level + 1 ] | 0, base).by( quotient );
            }
        }

        if(quotient === 0) {
            return [ remainder ];
        }else{
            _buildSequence(0, quotient, remainder );
            return sequence;
        }
    },

    decode : function( byteSequence , index ){
        index || (index = 0);
        
        //read for special values
        if( byteSequence[index] === 0){
            return {
                val: 0,
                len: 1
            } 
        }
        let decimalValue = 0;
        let i=0;
        for(; byteSequence[  index + i] & 128 ; i++){
            quotient = byteSequence[  index + i]  ^ 128;
            if( i < powerOf128.length ){ //to save runtime operations
                decimalValue = decimalValue +  ( powerOf128[i] * quotient ) ;
            }else{
                decimalValue = decimalValue +   ( Math.pow(base, i) *  quotient ) ;
            }
        }

        if( i < powerOf128.length ){ //to save runtime operations
            decimalValue = decimalValue +   ( powerOf128[i] *  byteSequence[ index+ i] ) ;
        }else{
            decimalValue = decimalValue +   (Math.pow(base, i) * byteSequence[ index+ i] ) ;
        }

        return {
            val: decimalValue,
            len: i + 1
        }
    }
}

LBSequence.strToByteArr = function(str){
    const byteArr = [];
    for(let i=0; i< str.length; i++){
        var code = str.charCodeAt(i);

        if (code >= 0xD800 && code <= 0xDBFF && str.length > 1) {
            var second = str.charCodeAt(++i);

            if (second >= 0xDC00 && second <= 0xDFFF) {
                code = (code - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            }
        }

        byteArr.push(...LBSequence.encode(code));
    }
    return byteArr;
}

LBSequence.byteArrToStr = function(byteArr, start, end){
    start || (start = 0);
    end || (end  = byteArr.length);
    let str = '';
    while(start< end){
        let code = LBSequence.decode( byteArr, start );
        str += String.fromCodePoint( code.val );
        start += code.len;
    }
    return str;
}

LBSequence.convert = function(){
    if( typeof arguments[0] === 'string'){
        return LBSequence.strToByteArr(arguments[0]);
    }else{
        return LBSequence.byteArrToStr( ...arguments);
    }
}

module.exports = LBSequence;