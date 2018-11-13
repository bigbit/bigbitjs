# BigBit
An improved data type to save large numbers in less space without precision loss. check more detail [here](https://github.com/amitguptagwl/bigbit). Or try the [demo](http://nimn.in/BigBit)

```JavaScript
var HBSequence = require('bigbit').HeaderByte;

let hb = new HBSequence('167770021700.00');
expect( hb.toString() ).toEqual('167770021700');
expect( hb.toByteArray() ).toEqual([69, 2, 121, 172, 255, 99]);
expect( hb.exponent ).toEqual( 2 );
expect( hb.exponentInBytes ).toEqual( 2 );
expect( hb.headByte ).toEqual(69);

var EHBSequence = require('bigbit').ExtendedHeaderByte;

let ehb = new EHBSequence('167770021700.00');
expect( ehb.toString() ).toEqual('167770021700');
expect( ehb.toByteArray() ).toEqual([69, 2, 121, 172, 255, 99]);
expect( ehb.exponent ).toEqual( 2 );
expect( ehb.exponentInBytes ).toEqual( [2] );
expect( ehb.headByte ).toEqual(69);

var LBSequence = require('bigbit').LinkedBytes;
expect( LBSequence.encode('123000')  ).toEqual( [ 248, 192, 7]);
expect( LBSequence.decode([ 248, 192, 7])  ).toEqual({ val: '123000', len: 3});
```