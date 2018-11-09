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
                sequence[level] = increase(sequence[level]).by(remainder) | 128;
                remainder = quotient % base;
                
                _buildSequence(level + 1, (quotient - remainder) / base , remainder);
            }else if(quotient === 0) {

                //don't add extra empty byte
            }else{
                sequence[level] = increase(sequence[level] | 0).by(remainder) | 128;
                if( !sequence[ level +1 ] ) {
                    sequence.push( 0 );
                }
                sequence[ level + 1 ] = increase(sequence[ level + 1 ]).by( quotient );
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

const increase = function(x){
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
}


module.exports = LBSequence;