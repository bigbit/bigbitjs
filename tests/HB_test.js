const ByteBit = require("../src/HB/ByteBit");

describe ('ByteBit', () => {

    it('should accept very large number', () => {
        const byteBit = new ByteBit('131337515616165120231511215188');
        //console.log( byteBit.toByteArray() ); // [ 13, 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 1 ]
        //console.log( byteBit.toCoffecientsArray() ); // [ 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 1 ]
        expect( byteBit.toDecimalString() ).toEqual('1.31337515616165120231511215188e+29');
    });

    it('should accept small number', () => {
        const byteBit = new ByteBit('37');
        expect( byteBit.toDecimalString() ).toEqual('37');
        expect( byteBit.toByteArray() ).toEqual( [1, 37]);
    });

    it('should caclculate negative exponent for decimal point', () => {
        let byteBit = new ByteBit('1677700.217');
        /* console.log( byteBit.toByteArray() );
        console.log( byteBit.exponent );
        console.log( byteBit.exponentInBytes );
        console.log( byteBit.headByte ); */

        /* expect( byteBit.exponent ).toEqual(-3);
        expect( byteBit.exponentInBytes ).toEqual([  128 +3 ]);
        expect( byteBit.headByte ).toEqual(64 + 4); */
        expect( byteBit.toDecimalString() ).toEqual('1677700.217');
        expect( byteBit.toByteArray() ).toEqual([ 64+4, 128+3, 121,172,255,99]);
    });
    
    it('should ignore trailing zeros for decimal point', () => {
        let byteBit = new ByteBit('1677700.21700000');
        expect( byteBit.toDecimalString() ).toEqual('1677700.217');
        expect( byteBit.toByteArray() ).toEqual([ 64+4, 128+3, 121,172,255,99]);
        
        byteBit = new ByteBit('1677700217.00000');
        expect( byteBit.toDecimalString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual([4, 121,172,255,99]);
    });

    it('should not calculate exponent when there is no decimal point and trailing zeros', () => {
        let byteBit = new ByteBit('1677700217');
        expect( byteBit.toDecimalString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual([4, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined);
        expect( byteBit.headByte ).toEqual(4);
    });

    it('should not calculate exponent when \'forceExponent\' is set to \'false\'', () => {
        let byteBit = new ByteBit('70000', {
            forceExponent: false
        });
        expect( byteBit.toDecimalString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([3, 112, 17, 1]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined);
        expect( byteBit.headByte ).toEqual(3);
    });

    it('should calculate exponent when \'forceExponent\' is not set or \'true\' ', () => {
        const byteBit = new ByteBit('70000');
        expect( byteBit.toDecimalString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([64 + 1, 4, 7]);
        expect( byteBit.exponent ).toEqual( 4 );
        expect( byteBit.exponentInBytes ).toEqual( 4 );
        expect( byteBit.headByte ).toEqual( 64+1);
    });

    it('should not calculate exponent when value is smaller than 65535 ', () => {
        const byteBit = new ByteBit('60000');
        expect( byteBit.toDecimalString() ).toEqual('60000');
        expect( byteBit.toByteArray() ).toEqual([2, 96, 234]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined );
        expect( byteBit.headByte ).toEqual( 2 );
    });
    
    it('should calculate exponent for trialing zeros but should ignore zeros after decimal point', () => {
        let byteBit = new ByteBit('167770021700.00');
        expect( byteBit.toDecimalString() ).toEqual('167770021700');
        expect( byteBit.toByteArray() ).toEqual([64+4, 2, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 2 );
        expect( byteBit.exponentInBytes ).toEqual( 2 );
        expect( byteBit.headByte ).toEqual(64 + 4);

        byteBit = new ByteBit('100.00');
        expect( byteBit.toDecimalString() ).toEqual('100');
        expect( byteBit.toByteArray() ).toEqual([1, 100]);
    });


    it('temp to test', () => {
        console.log( "-------- Test data" );
        let byteBit = new ByteBit('22659849036');
        expect( byteBit.toDecimalString() ).toEqual('22659849036');
        console.log( byteBit.toByteArray() );
        console.log( byteBit.headByte );
        console.log( byteBit.exponent );
        console.log( "-------- End: Test data" );
    });

    it('should accept negative numbers', () => {
        const byteBit = new ByteBit('-37');
        expect( byteBit.toDecimalString() ).toEqual('37');
        expect( byteBit.toByteArray() ).toEqual( [37]);
        expect( byteBit.headByte ).toEqual( 129 );
    }); */

});