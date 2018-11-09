const HB = require("../src/HB/ByteBit");
const EHB = require("../src/EHB/ByteBit");
const LB = require("../src/LB/LBSequence");

describe ('ByteBit', () => {
    const num = '-22659.849036';
    it('temp to test', () => {
        console.log( num );
        console.log( "-------- HB" );
        let hb = new HB(num);
        console.log( hb.toByteArray() );
        console.log( hb.coffecient );
        console.log( "Head byte:", hb.headByte );
        console.log( "Exponent value:",hb.exponent );
        console.log( "Exponent byte:",hb.exponentInBytes );
        console.log( "-------- End: HB" );

        console.log( "-------- EHB" );
        let ehb = new EHB(num);
        console.log( ehb.toByteArray() );
        console.log( ehb.coffecient );
        console.log( "Head byte:", ehb.headByte );
        console.log( "Exponent value:",ehb.exponent );
        console.log( "Exponent byte:",ehb.exponentInBytes );
        console.log( "-------- End: EHB" );

        /* console.log( "-------- LB" );
        console.log( LB.encode(num) );
        console.log( "-------- End: LB" ); */
    });
});