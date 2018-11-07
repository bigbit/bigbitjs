const CyclicCounter = require("../src/common/CyclicCounter");

describe ('CyclicCounter', () => {

    it('should increase if lesser than maximum value otherwise reset', () => {
        const counter = new CyclicCounter(10, 15, 5);
        expect( counter.up() ).toEqual( true);
        expect( counter.value ).toEqual( 11 );
        
        expect( counter.up() ).toEqual( true);
        expect( counter.value ).toEqual( 12 );

        expect( counter.up() ).toEqual( true);
        expect( counter.value ).toEqual( 13 );

        expect( counter.up() ).toEqual( true);
        expect( counter.value ).toEqual( 14 );

        expect( counter.up() ).toEqual( true);
        expect( counter.value ).toEqual( 15 );
        
        expect( counter.up() ).toEqual( false);
        expect( counter.value ).toEqual( 5 );

    });

    it('should add ', () => {
        const counter = new CyclicCounter(10, 15, 5);
        expect( counter.add(3) ).toEqual( true);
        expect( counter.value ).toEqual( 13 );
        
        expect( counter.add(3) ).toEqual( false);
        expect( counter.value ).toEqual( 6 );
        
    });
});
