const HB = require("../src/HB/ByteBit");

describe ('ByteBit', () => {
    const num = '22659849036';
    it('temp to test', () => {
        console.log( "-------- HB" );
        let hb = new HB(num);
        console.log( hb.toByteArray() );
        console.log( hb.toCoffecientsArray() );
        console.log( "Head byte:", hb.headByte );
        console.log( "Exponent value:",hb.exponent );
        console.log( "Exponent byte:",hb.exponentInBytes );
        console.log( "-------- End: HB" );
    });
});