const CycleCounter = require("../common/CyclicCounter");
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
    infiniteIdentifier: "infinity", // "- infinity", "-infinity",
    arrOnly: true,
    forceExponent: true, //It'll remove trailing zeros
}
function ByteBit( decimal , options){
    const opts = Object.assign({}, defaultOptions, options);

    //Check for special values
    if( typeof decimal === "string"){
        decimal = decimal.toLowerCase().replace(/ /g,"");
        let val;
        if( decimal === opts.infiniteIdentifier ){
            val = 64
        }else if( decimal === ("-"+ opts.infiniteIdentifier) ){
            val = 192
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
    if( this.exponent ) {
        this.headByte = this.headByte | 64;
        if( this.exponent > 0) {
            this.exponentInBytes = this.exponent;
        }else{
            this.exponentInBytes = -this.exponent + 128;
        }
    }

    if( this.decimalValue.isNegative() ){
        this.headByte = 128;
        this.decimalValue = this.decimalValue.abs();
    }
    
    this.coffecient = [];

    /* this.up = function(){
        for(let i=0; i< this.coffecient.length; i++){
            var result = this.coffecient[i].up();
            if(result){//added
                break;
            }else if( i + 1 < this.coffecient.length ){
                this.coffecient.push( new CycleCounter(1, base, min) )
            }
        }
    } */

    /**
     * fill the current byte with quotient. level up (add another byte) for remainder
     * keep doing it until the remainder is lesser than base
     */
    this._levelUp = function(level, quotient, remainder){
        if( !this.coffecient[level] ) this.coffecient.push( new CycleCounter(0, base, min) );

        this.coffecient[level].add(remainder);
        if( quotient.isGreaterThan(base - 1) ){//still divisible
            remainder = quotient.modulo( base ).toNumber();
            
            this._levelUp(level + 1, quotient.minus(remainder).dividedBy( base ), remainder);
        }else if(quotient.isEqualTo(0)) {
            //don't add extra empty byte
        }else{
            if( !this.coffecient[ level +1 ] ) this.coffecient.push( new CycleCounter(0, base, min) );
            this.coffecient[ level + 1 ].add( quotient.toNumber() );
        }
    }

    this._decimalToByteBit = function(){

        let remainder = this.decimalValue.modulo( base ).toNumber();
        let quotient = this.decimalValue.minus(remainder).dividedBy( base );

        this._levelUp(0, quotient, remainder );
        this.headByte = this.headByte | this.coffecient.length;
    }
    this._decimalToByteBit();

    /**
     * Returns Byte array of coffecients only
     * @returns Byte Array
     */
    this.toCoffecientsArray = function(){
        //const bArr = [ this.headByte, ...this.exponentInBytes ];
        const bArr = [ ];
        for(let i=0; i< this.coffecient.length; i++){
            bArr.push( this.coffecient[i].value );
        }
        return bArr;
    }

    /**
     * Returns Byte array of header byte, exponent byte, and coffecients only
     */
    this.toByteArray = function(){
        let bArr;
        if( this.exponentInBytes ){
            bArr = [ this.headByte, this.exponentInBytes ];
        }else{
            bArr = [ this.headByte ];
        }
        //const bArr = [ ];
        for(let i=0; i< this.coffecient.length; i++){
            bArr.push( this.coffecient[i].value );
        }
        return bArr;
    }

    this.toDecimalString = function(){
        return ByteBit.toBigNumber( this.toByteArray() ).toString();
    }

    

}

/**
 * Convert HB bytes array to BigNumber.
 * HB bytes array can be read from buffer when buffer/bytes array and index is given
 * or when passed as method param
 * otherwise construct it with instance value
 */
ByteBit.toBigNumber = function( headByteArray , index ){
    //headByteArray || ( headByteArray = this.toByteArray() );
    index || (index = 0);
    let headByte = headByteArray[index];
    //read for special values
    if( headByte === 0){
        return BigNumber(0);
    }else if( headByte === 128){
        return NaN;
    }else if( headByte === 64){
        return opts.infiniteIdentifier;
    }else if( headByte === 192){
        return "-"+opts.infiniteIdentifier;
    }

    let isNegative = false;
    if( (headByte & 128) === 128 ) {//negative
        isNegative = true;
        headByte = headByte ^ 128;
    }
    
    let exponentValue = 0;
    if( (headByte & 64) === 64){//exponent byte is present
        if( !headByteArray[ index+1 ] ) throw new Error("Invalid HB Bytes array. exponent byte was expected.");
        if(headByteArray[ index+1 ] & 128 === 128){//negative
            exponentValue = -(headByteArray[ index+1 ] ^ 128); 
        }else{//positive
            exponentValue = headByteArray[ index+1 ]; 
        }

        headByte = headByte ^ 64;
    }

    //const coffecientsArrLength = headByte;
    if( !headByteArray[ index + (headByte -1) ] ) throw new Error("Invalid HB Bytes array. All coffecient bytes are not present.");

    var coffecientIndex = exponentValue !== 0 ? index + 2 : index + 1;

    let decimalValue = BigNumber( headByteArray[  coffecientIndex ] );
    for(let i=1; i< headByte; i++){
        if( i< powerOf256.length ){ //to save runtime operations
            decimalValue = decimalValue.plus(   powerOf256[i].multipliedBy( headByteArray[ coffecientIndex+ i] ) )
        }else{
            decimalValue = decimalValue.plus(   BigNumber(base).pow(i).multipliedBy( headByteArray[ coffecientIndex+ i] ) )
        }
    }

    if( exponentValue ){
        decimalValue = decimalValue.multipliedBy( BigNumber(10).pow( exponentValue ) )
    }

    if( isNegative ){
        decimalValue = decimalValue.multipliedBy( -1 );
    }

    return decimalValue;
}

//TODO: 
ByteBit.prototype.from = function(byteArr, from){
    return {
        updatedIndex : from,
        byteArray : byteArr
    }
}

module.exports = ByteBit;