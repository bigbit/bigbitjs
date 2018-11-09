/**
 * These snippets print any number in ieee 754 floating number format
 * and their representation in memory as bytes array
*/
var ieee754 = require("ieee754");

 var buf = new Uint8Array(10);
var v = 8796093022208;

ieee754.write(buf, v, 0, true, 23, 4);
console.log(buf );

var result = ieee754.read(buf,0,true,23,4);
console.log( result ); 

/* for( var i=1; i< 999999999; i++){

    var buf = new Uint8Array(10);
    ieee754.write(buf, i, 0, true, 23, 4);

    var result = ieee754.read(buf,0,true,23,4);
    if(i !== result){
        console.log( i, result );
        console.log( buf );
        break;
    }

} */

//numbers after 2^24 (16777216) are faulty
//1000000000000000000000000


/* const assert = require('assert');

const num = 987654321;
const expected = 987654336;
const buf = Buffer.alloc(4);

buf.writeFloatLE(num);

const actual = buf.readFloatLE();

assert.strictEqual(actual, expected); */