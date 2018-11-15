const ByteBit = require("../src/HB/ByteBit");

describe ('ByteBit', () => {

    it('should accept very large number', () => {
        const byteBit = new ByteBit('9007199254740992');
        expect( byteBit.toString() ).toEqual('9007199254740992');
    });
    
    it('should accept very large number', () => {
        const byteBit = new ByteBit('131337515616165120231511215188');
        //console.log( byteBit.toByteArray() ); // [ 13, 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 1 ]
        //console.log( byteBit.coffecient ); // [ 84, 204, 244, 21, 79, 57, 168, 254, 187, 216, 95, 168, 1 ]
        expect( byteBit.toExponentString() ).toEqual('1.31337515616165120231511215188e+29');
        expect( byteBit.toExponentString(5) ).toEqual('1.31338e+29');
        expect( byteBit.toString() ).toEqual('131337515616165120231511215188');
    });

    it('should accept small number', () => {
        const byteBit = new ByteBit('37');
        expect( byteBit.toString() ).toEqual('37');
        expect( byteBit.toByteArray() ).toEqual( [1, 37]);
    });

    it('should calculate positive exponent', () => {
        const byteBit = new ByteBit('9007199254740990');
        //console.log( byteBit.toByteArray() ); // 
        //console.log( byteBit.coffecient ); // 
        expect( byteBit.toString() ).toEqual('9007199254740990');
    });

    it('should caclculate negative exponent for decimal point', () => {
        let byteBit = new ByteBit('1677700.217');

        // expect( byteBit.exponent ).toEqual(-3);
        // expect( byteBit.exponentInBytes ).toEqual([  128 +3 ]);
        // expect( byteBit.headByte ).toEqual(64 + 5);
        expect( byteBit.toString() ).toEqual('1677700.217');
        expect( byteBit.toByteArray() ).toEqual([ 64+5, 128+3, 121,172,255,99]);
    });
    
    it('should ignore trailing zeros for decimal point', () => {
        let byteBit = new ByteBit('1677700.21700000');
        expect( byteBit.toString() ).toEqual('1677700.217');
        expect( byteBit.toByteArray() ).toEqual([ 64+5, 128+3, 121,172,255,99]);
        
        byteBit = new ByteBit('1677700217.00000');
        expect( byteBit.toString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual([4, 121,172,255,99]);
    });

    it('should not calculate exponent when there is no decimal point and trailing zeros', () => {
        let byteBit = new ByteBit('1677700217');
        expect( byteBit.toString() ).toEqual('1677700217');
        expect( byteBit.toByteArray() ).toEqual([4, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined);
        expect( byteBit.headByte ).toEqual(4);
    });

    it('should not calculate exponent when \'forceExponent\' is set to \'false\'', () => {
        let byteBit = new ByteBit('70000', {
            forceExponent: false
        });
        expect( byteBit.toString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([3, 112, 17, 1]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined);
        expect( byteBit.headByte ).toEqual(3);
    });

    it('should calculate exponent when \'forceExponent\' is not set or \'true\' ', () => {
        const byteBit = new ByteBit('70000');
        expect( byteBit.toString() ).toEqual('70000');
        expect( byteBit.toByteArray() ).toEqual([64 + 2, 4, 7]);
        expect( byteBit.exponent ).toEqual( 4 );
        expect( byteBit.exponentInBytes ).toEqual( 4 );
        expect( byteBit.headByte ).toEqual( 64+2);
    });

    it('should not calculate exponent when value is smaller than 65535 ', () => {
        const byteBit = new ByteBit('60000');
        expect( byteBit.toString() ).toEqual('60000');
        expect( byteBit.toByteArray() ).toEqual([2, 96, 234]);
        expect( byteBit.exponent ).toEqual( 0 );
        expect( byteBit.exponentInBytes ).toEqual( undefined );
        expect( byteBit.headByte ).toEqual( 2 );
    });
    
    it('should calculate exponent for trialing zeros but should ignore zeros after decimal point', () => {
        let byteBit = new ByteBit('167770021700.00');
        expect( byteBit.toString() ).toEqual('167770021700');
        expect( byteBit.toByteArray() ).toEqual([64+5, 2, 121,172,255,99]);
        expect( byteBit.exponent ).toEqual( 2 );
        expect( byteBit.exponentInBytes ).toEqual( 2 );
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
        expect( byteBit.toByteArray() ).toEqual( [128+64+2, 128+1, 37]);
        expect( byteBit.exponent ).toEqual( -1 );
        expect( byteBit.exponentInBytes ).toEqual( 128+1 );
        expect( byteBit.headByte ).toEqual( 128+64+2 );
    });

    it('should throw error when all the bytes are not present', () => {
        const byteBit = new ByteBit('-3.7'); // [128+64+2, 128+1, 37]
        expect( () =>{
            byteBit.toBigNumber( [128+64+2, 128+1] );
        }).toThrowError('Invalid HB Bytes sequence. All coffecient bytes are not present.');
    });

});