const ByteBit = require("../src/EHB/ByteBit");

describe ('ByteBit', () => {

    it('should accept very large number', () => {
        const byteBit = new ByteBit('1334441894813007682332945638531320916');
        //console.log( byteBit.toByteArray() ); // [ 16, 16, 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 16, 1, 1, 1 ]
        //console.log( byteBit.coffecient ); // [ 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 16, 1, 1, 1 ]
        expect( byteBit.toExponentString() ).toEqual('1.334441894813007682332945638531320916e+36');
        expect( byteBit.toExponentString(5) ).toEqual('1.33444e+36');
        expect( byteBit.toString() ).toEqual('1334441894813007682332945638531320916');
    });

    it('should accept small number', () => {
        const byteBit = new ByteBit('137');
        expect( byteBit.toString() ).toEqual('137');
        expect( byteBit.toByteArray() ).toEqual( [1, 137]);
    });

    it('should caclculate negative exponent for decimal point', () => {
        let byteBit = new ByteBit('1677700.217');

        // expect( byteBit.exponent ).toEqual(-3);
        // expect( byteBit.exponentInBytes ).toEqual([  128 +3 ]);
        //console.log( byteBit.headByte );
        //console.log( byteBit.coffecient );
        expect( byteBit.toString() ).toEqual('1677700.217');
        //expect( byteBit.toByteArray() ).toEqual([ 64+5, 128+3, 121,172,255,99]);
        expect( byteBit.toByteArray() ).toEqual([ 101, 3, 121,172,255,99]);
    });
    
    it('should ignore trailing zeros for decimal point', () => {
        let byteBit = new ByteBit('1677700.21700000');
        expect( byteBit.toString() ).toEqual('1677700.217');
        expect( byteBit.toByteArray() ).toEqual( [101, 3, 121,172,255,99]);
        
        byteBit = new ByteBit('1677700217.00000');
        expect( byteBit.toString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual( [4, 121,172,255,99]);
    });

    it('should not calculate exponent when there is no decimal point and trailing zeros', () => {
        let byteBit = new ByteBit('1677700217');
        expect( byteBit.toString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual([4, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( [] );
        expect( byteBit.headByte ).toEqual(4);
    });

    it('should not calculate exponent when \'forceExponent\' is set to \'false\'', () => {
        let byteBit = new ByteBit('70000', {
            forceExponent: false
        });
        expect( byteBit.toString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([3, 112, 17, 1]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( []);
        expect( byteBit.headByte ).toEqual(3);
    });

    it('should calculate exponent when \'forceExponent\' is not set or \'true\' ', () => {
        const byteBit = new ByteBit('70000');
        expect( byteBit.toString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([64 + 2, 4, 7]);
        expect( byteBit.exponent ).toEqual( 4 );
        expect( byteBit.exponentInBytes ).toEqual( [ 4 ] );
        expect( byteBit.headByte ).toEqual( 64+2);
    });

    it('should not calculate exponent when value is smaller than 65535 ', () => {
        const byteBit = new ByteBit('60000');
        expect( byteBit.toString() ).toEqual('60000');
        expect( byteBit.toByteArray() ).toEqual([2, 96, 234]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( [] );
        expect( byteBit.headByte ).toEqual( 2 );
    });
    
    it('should calculate exponent for trialing zeros but should ignore zeros after decimal point', () => {
        let byteBit = new ByteBit('167770021700.00');
        expect( byteBit.toString() ).toEqual('167770021700');
        expect( byteBit.toByteArray() ).toEqual([64+5, 2, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 2 );
        expect( byteBit.exponentInBytes ).toEqual( [2] );
        expect( byteBit.headByte ).toEqual(64 + 5);

        byteBit = new ByteBit('100.00');
        expect( byteBit.toString() ).toEqual('100');
        expect( byteBit.toByteArray() ).toEqual([1, 100]);
    });


    it('should accept negative numbers', () => {
        const byteBit = new ByteBit('-37');
        expect( byteBit.toString() ).toEqual('-37');
        expect( byteBit.toByteArray() ).toEqual( [128+1, 37]);
        expect( byteBit.headByte ).toEqual( 129 );
    });

    it('should accept negative decimal numbers', () => {
        const byteBit = new ByteBit('-3.7000');
        expect( byteBit.toString() ).toEqual('-3.7');
        expect( byteBit.toByteArray() ).toEqual( [128+64+32+2, 1, 37]);
        expect( byteBit.exponent ).toEqual( -1 );
        expect( byteBit.exponentInBytes ).toEqual( [ 1 ] );
        expect( byteBit.headByte ).toEqual( 128+64+32+2 );
    });

    it('should throw error when all the bytes are not present', () => {
        //const byteBit = new ByteBit('-3.7'); // [128+64+2, 128+1, 37]
        expect( () =>{
            ByteBit.toBigNumber( [128+64+2, 128+1] );
        }).toThrowError('Invalid EHB bytes sequence.');
    });

    //TODO: coefficient length should count bytes for exponent.

});