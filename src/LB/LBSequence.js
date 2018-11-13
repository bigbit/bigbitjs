
const increase = require("../common/CyclicCounter");
const BigNumber = require("bignumber.js");
const powerOf128 = [ //exponentTableOf128
    BigNumber(128).pow(0),
    BigNumber(128).pow(1),
    BigNumber(128).pow(2),
    BigNumber(128).pow(3),
    BigNumber(128).pow(4),
    BigNumber(128).pow(5),
    BigNumber(128).pow(6),
    BigNumber(128).pow(7),
    BigNumber(128).pow(8),
    BigNumber(128).pow(9),
    BigNumber(128).pow(10),
    BigNumber(128).pow(11),
    BigNumber(128).pow(12),
    BigNumber(128).pow(13),
    BigNumber(128).pow(14),
    BigNumber(128).pow(15),
    BigNumber(128).pow(16),
    BigNumber(128).pow(17),
    BigNumber(128).pow(18),
    BigNumber(128).pow(19),
    BigNumber(128).pow(20),
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
        }else if(typeof num === 'string' && num.indexOf(opts.decimalSeparator) !== -1){
            throw new Error("LB format doesn't support fractional number");
        }else if(typeof num === 'number' && num % 1 ){
            throw new Error("LB format doesn't support fractional number");
        }

        let decimalValue = BigNumber(num);
        if(decimalValue.isNegative()){
            throw new Error("LB format doesn't support negative number");
        }

        let remainder = decimalValue.modulo( base ).toNumber();
        let sequence = [ 0 ];
        let quotient = decimalValue.minus(remainder).dividedBy( base );
    
        function _buildSequence(level, quotient, remainder){
            if( quotient.isGreaterThan(base - 1) ){//still divisible
                sequence[level] = increase(sequence[level] | 0, base).by(remainder) | 128;
                remainder = quotient.modulo( base ).toNumber();
                
                _buildSequence(level + 1, quotient.minus(remainder).dividedBy( base ), remainder);
            }else if(quotient.isEqualTo(0)) {

                //don't add extra empty byte
            }else{
                sequence[level] = increase(sequence[level] | 0, base).by(remainder) | 128;
                if( !sequence[ level +1 ] ) {
                    sequence.push( 0 );
                }
                sequence[ level + 1 ] = increase(sequence[ level + 1 ] | 0, base).by( quotient.toNumber() );
            }
        }

        if(quotient.isEqualTo(0)) {
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
                val: BigNumber(0),
                len: 1
            } 
        }
        let decimalValue = BigNumber(0);
        let i=0;
        for(; byteSequence[  index + i] & 128 ; i++){
            quotient = BigNumber(byteSequence[  index + i]  ^ 128);
            if( i < powerOf128.length ){ //to save runtime operations
                decimalValue = decimalValue.plus(   powerOf128[i].multipliedBy( quotient ) )
            }else{
                decimalValue = decimalValue.plus(   BigNumber(base).pow(i).multipliedBy( quotient ) )
            }
        }

        if( i < powerOf128.length ){ //to save runtime operations
            decimalValue = decimalValue.plus(   powerOf128[i].multipliedBy( byteSequence[ index+ i] ) )
        }else{
            decimalValue = decimalValue.plus(   BigNumber(base).pow(i).multipliedBy( byteSequence[ index+ i] ) )
        }

        return {
            val: decimalValue.toFixed(),
            len: i + 1
        }
    }
}

LBSequence.strToByteArr = function(str){
    const byteArr = [];
    for(let i=0; i< str.length; i++){
        let code = str.charCodeAt(i);
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
        str += String.fromCharCode( code.val );
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