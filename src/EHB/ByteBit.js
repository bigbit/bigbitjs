const increase = require("../common/CyclicCounter");
const LBSequence = require("../LB/LBSequencePremitive");
const contants = {
    ZERO: 0,                          //0000 0000
    //NEGATIVE_ZERO: 1,
    NAN: 128,                        //1000 0000
    INFINITY: 64,                    //0100 0000
    NEGATIVE_INFINITY: 192, //0110 0000
    OTHER1: 32,      //0010 0000
    OTHER2: 160,    //1010 0000
    OTHER3: 224,    //1110 0000
    OTHER4: 48,      //0011 0000
    OTHER5: 176,    //1011 0000
}
const BigNumber = require("bignumber.js");

const base = 256;
//calculate values in advance to speed up runtime calculations
const powerOf256 = [ //exponentTableOf256
    BigNumber(256).pow(0),
    BigNumber(256).pow(1),
    BigNumber(256).pow(2),
    BigNumber(256).pow(3),
    BigNumber(256).pow(4),
    BigNumber(256).pow(5),
    BigNumber(256).pow(6),
    BigNumber(256).pow(7),
    BigNumber(256).pow(8),
    BigNumber(256).pow(9),
    BigNumber(256).pow(10),
    BigNumber(256).pow(11),
    BigNumber(256).pow(12),
    BigNumber(256).pow(13),
    BigNumber(256).pow(14),
    BigNumber(256).pow(15),
    BigNumber(256).pow(16),
    BigNumber(256).pow(17),
    BigNumber(256).pow(18),
    BigNumber(256).pow(19),
    BigNumber(256).pow(20),
]
const zerosRegExp = /(0+)$/;

const defaultOptions = {
    decimalSeparator: ".",
    errorOnNaN: false,
    infinityIdentifier: "infinity", // "- infinity", "-infinity",
    arrOnly: true,
    forceExponent: true, //It'll remove trailing zeros
}

function ByteBit( decimal , options){
    const opts = Object.assign({}, defaultOptions, options);

    //Check for special values
    if( typeof decimal === "string"){
        decimal = decimal.toLowerCase().replace(/ /g,"");
        let val;
        if( decimal === opts.infinityIdentifier ){
            val = contants.INFINITY;
        }else if( decimal === ("-"+ opts.infinityIdentifier) ){
            val = contants.NEGATIVE_INFINITY;
        }

        if( val ){
            if( opts.arrOnly){
                return [ val ];
            }else{
                return val;
            }
        }
    }else if( decimal == 0) {
        if( opts.arrOnly){
            return [ 0 ];
        }else{
            return 0;
        }
    }
    
    BigNumber.config({
        FORMAT : {
            decimalSeparator : opts.decimalSeparator
        }
    });

    let min = 0;
    this.decimalValue = BigNumber(decimal);

    if(this.decimalValue.isNaN() ){
        if(opts.errorOnNaN){
            throw new Error("Invalid number:"+ decimal);
        }else if( opts.arrOnly){
            return [ 128 ];
        }else{
            return 128;
        }
    }

    this.headByte = 0;
    
    if(typeof decimal === 'number'){
        decimal = '' + decimal;
    }
    
    this.exponent = 0;

    //remove decimal point
    var decimalPointPosition = decimal.indexOf( opts.decimalSeparator );
    if( decimalPointPosition !== -1 ){
        
        //there is no point of having trailing zero in decimal values
        //so remove them
        decimal = decimal.replace(/0+$/, ""); //remove trailing zeros
        this.exponent = decimal.length - decimalPointPosition - 1 ;
        if( this.exponent ) { // ignore the number like 123.00
            this.exponent = -this.exponent;
        }
        
        decimal = decimal.replace(opts.decimalSeparator, "");
    }

    //remove trailing zeros
    //exponent value take an extra byte. So don't create it until the number is smaller than 65535
    if( opts.forceExponent && this.decimalValue.isGreaterThan(65535) ){
        var zeros = zerosRegExp.exec(decimal);
        if( zeros ){
            this.exponent += zeros[1].length;
            decimal = decimal.replace(/0+$/, ""); //remove trailing zeros
        }
    }

    this.decimalValue = BigNumber(decimal);

    //update head byte as per exponent
    this.exponentInBytes = [];
    if( this.exponent ) {
        this.headByte = this.headByte | 64;
        if( this.exponent > 0) {
            this.exponentInBytes = LBSequence.encode(this.exponent, opts);
        }else{
            this.headByte = this.headByte | 32;
            this.exponentInBytes = LBSequence.encode( -this.exponent, opts);
        }
    }

    if( this.decimalValue.isNegative() ){
        this.headByte = this.headByte | 128;
        this.decimalValue = this.decimalValue.abs();
    }
    
    this.coffecient = [];

    /**
     * Construct cofficient bytes
     * fill the current byte with quotient. level up (add another byte) for remainder
     * keep doing it until the remainder is lesser than base
     */
    this._levelUp = function(level, quotient, remainder){
        this.coffecient[level] = increase(this.coffecient[level] | 0, base).by(remainder);
        if( quotient.isGreaterThan(base - 1) ){//still divisible
            remainder = quotient.modulo( base ).toNumber();
            
            this._levelUp(level + 1, quotient.minus(remainder).dividedBy( base ), remainder);
        }else if(quotient.isEqualTo(0)) {
            //don't add extra empty byte
        }else{
            if( !this.coffecient[ level +1 ] ) this.coffecient.push( 0 );

            this.coffecient[ level + 1 ] = increase(this.coffecient[ level + 1 ], base).by( quotient.toNumber() );
        }
    }

    this._decimalToByteSequence = function(){

        let remainder = this.decimalValue.modulo( base ).toNumber();
        let quotient = this.decimalValue.minus(remainder).dividedBy( base );

        this.coffecient = [ 0 ];
        this._levelUp(0, quotient, remainder );

        //half of the head byte contain cofficent & exponent bytes count if it is smaller than 16
        const count = this.exponentInBytes.length + this.coffecient.length;

        if(count < 16){
            this.headByte = this.headByte | count;
        }else{
            this.headByte = this.headByte | 16;
            this.totalCountBytes = LBSequence.encode( count );
        }
        
    }
    this._decimalToByteSequence();

   
    /**
     * Returns Byte array of header byte, exponent byte, and coffecients only
     */
    this.toByteArray = function(){
        let bArr = [ this.headByte ];
        if( this.totalCountBytes ){
            bArr.push( ...this.totalCountBytes);
        }
        if( this.exponentInBytes ){
            bArr.push( ...this.exponentInBytes);
        }
        bArr.push( ... this.coffecient );
        return bArr;
    }

    /**
     * Convert HB bytes array to BigNumber.
     * HB bytes array can be read from buffer when buffer/bytes array and index is given
     * or when passed as method param
     * otherwise construct it with instance value
     */
    this.toBigNumber = function( byteSequence , index ){
        //headByteArray || ( headByteArray = this.toByteArray() );
        index || (index = 0);
        let headByte = byteSequence[index];
        //read for special values
        if( headByte === contants.ZERO){
            return BigNumber(0);
        }else if( headByte === contants.NAN){
            return NaN;
        }else if( headByte === contants.INFINITY){
            return opts.infinityIdentifier;
        }else if( headByte === contants.NEGATIVE_INFINITY){
            return "-"+opts.infinityIdentifier;
        }

        const code = headByte & 15; //number of bytes (remainder)
        let count = 0;
        if( (headByte & 16) === 16){ //count byte flag
            count = LBSequence.decode(byteSequence, index + 1);
            index += count.len;
            count = count.val;
        }else{
            count = code;
            //index++;
        }

        if( byteSequence[ index+ count ] === undefined ) throw new Error("Invalid EHB bytes sequence.");

        let isNegative = false;
        if( (headByte & 128) === 128 ) {//negative
            isNegative = true;
            headByte = headByte ^ 128;
        }
        
        let exponent = {};
        if( (headByte & 64) === 64){//exponent byte is present
            exponent = LBSequence.decode(byteSequence, index +1 );
            count -= exponent.len;
            headByte = headByte ^ 64;
            if( (headByte & 32) === 32 ){//exponent byte is negative
                exponent.val = -exponent.val;
                headByte = headByte ^ 32;
            } 
        }

        //const coffecientsArrLength = headByte;
        if( byteSequence[ index + (headByte -1) ] === undefined) throw new Error("Invalid EHB Bytes array. All coffecient bytes are not present.");

        var coffecientIndex = (exponent.len ? index + exponent.len : index) + 1;

        let decimalValue = BigNumber( byteSequence[  coffecientIndex ] );
        for(let i=1; i< count; i++){
            if( i< powerOf256.length ){ //to save runtime operations
                decimalValue = decimalValue.plus(   powerOf256[i].multipliedBy( byteSequence[ coffecientIndex+ i] ) )
            }else{
                decimalValue = decimalValue.plus(   BigNumber(base).pow(i).multipliedBy( byteSequence[ coffecientIndex+ i] ) )
            }
        }

        if( exponent.val ){
            //decimalValue = decimalValue.multipliedBy( BigNumber(10).pow( exponent.val ) )
            decimalValue = BigNumber(exponentPow ( decimalValue.toFixed(), exponent.val ) );
        }

        if( isNegative ){
            decimalValue = decimalValue.multipliedBy( -1 );
        }

        return decimalValue;
    }


    this.toExponentString = function(range){
        return this.toBigNumber( this.toByteArray() ).toExponential(range);
    }
    
    this.toString = function(){
        return this.toBigNumber( this.toByteArray() ).toFixed();
    }


}

function exponentPow(numStr, pow){
    if(pow > 0){//positive
        return numStr + '0'.repeat(pow);
    }else{//negative
        const index = (numStr.length + pow);
        return numStr.substring(0,index) + "." + numStr.substring(index)
    }
}
module.exports = ByteBit;