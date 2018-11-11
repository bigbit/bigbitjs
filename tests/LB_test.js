const LBSequence = require("../src/LB/LBSequence");

describe ('Linked Byte Format', () => {

    it('should accept a number', () => {
        expect( LBSequence.encode('9007199254740991')  ).toEqual( [ 255, 255, 255, 255 ,255, 255, 255, 15]);
        expect( LBSequence.decode([ 255, 255, 255, 255 ,255, 255, 255, 15])  ).toEqual({ val: '9007199254740991', len: 8});
        
    });

   it('should accept a number', () => {
        expect( LBSequence.encode('123000')  ).toEqual( [ 248, 192, 7]);
        expect( LBSequence.decode([ 248, 192, 7])  ).toEqual({ val: '123000', len: 3});

        expect( LBSequence.encode('12300')  ).toEqual( [ 140, 96]);
        expect( LBSequence.decode([ 140, 96])  ).toEqual({ val: '12300', len: 2});

        expect( LBSequence.encode('123')  ).toEqual( [ 123]);
        expect( LBSequence.decode([ 123])  ).toEqual({ val: '123', len: 1});
    });

    it('should skip extra bytes a number', () => {
        expect( LBSequence.decode([ 248, 192, 7, 123, 123, 123])  ).toEqual({ val: '123000', len: 3});
        expect( LBSequence.decode([ 140, 96, 123, 123, 123])  ).toEqual({ val: '12300', len: 2});
        expect( LBSequence.decode([ 123, 123, 123, 123])  ).toEqual({ val: '123', len: 1});
    });


    it('should not accept a negative number', () => {
        expect( () => {
            LBSequence.encode('-123')
        }).toThrowError("LB format doesn't support negative number");
    });

    it('should not accept a fractional number', () => {
        expect( () => {
            LBSequence.encode('12.3')
        }).toThrowError("LB format doesn't support fractional number");

        expect( () => {
            LBSequence.encode(12.3)
        }).toThrowError("LB format doesn't support fractional number");

    });

    it('should not accept null', () => {
        expect( () => {
            LBSequence.encode( null )
        }).toThrowError("LB format doesn't support an invalid number");
    });

    it('should not accept undefined', () => {
        expect( () => {
            LBSequence.encode( )
        }).toThrowError("LB format doesn't support an invalid number");
    });

});