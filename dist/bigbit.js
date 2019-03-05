var bigbit=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=function(e,t){if(e>t||e<0)throw Error("Number should not be out of the range");return{by:function(n){return e+n<=t?e+n:e+n-t}}}},function(e,t,n){var r;!function(i){"use strict";var o,s=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,u=Math.ceil,l=Math.floor,a="[BigNumber Error] ",f=a+"Number primitive has more than 15 significant digits: ",c=1e14,h=14,p=9007199254740991,d=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],w=1e7,y=1e9;function g(e){var t=0|e;return e>0||e===t?t:t-1}function m(e){for(var t,n,r=1,i=e.length,o=e[0]+"";r<i;){for(t=e[r++]+"",n=h-t.length;n--;t="0"+t);o+=t}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function v(e,t){var n,r,i=e.c,o=t.c,s=e.s,u=t.s,l=e.e,a=t.e;if(!s||!u)return null;if(n=i&&!i[0],r=o&&!o[0],n||r)return n?r?0:-u:s;if(s!=u)return s;if(n=s<0,r=l==a,!i||!o)return r?0:!i^n?1:-1;if(!r)return l>a^n?1:-1;for(u=(l=i.length)<(a=o.length)?l:a,s=0;s<u;s++)if(i[s]!=o[s])return i[s]>o[s]^n?1:-1;return l==a?0:l>a^n?1:-1}function b(e,t,n,r){if(e<t||e>n||e!==(e<0?u(e):l(e)))throw Error(a+(r||"Argument")+("number"==typeof e?e<t||e>n?" out of range: ":" not an integer: ":" not a primitive number: ")+e)}function N(e){return"[object Array]"==Object.prototype.toString.call(e)}function B(e){var t=e.c.length-1;return g(e.e/h)==t&&e.c[t]%2!=0}function O(e,t){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(t<0?"e":"e+")+t}function x(e,t,n){var r,i;if(t<0){for(i=n+".";++t;i+=n);e=i+e}else if(++t>(r=e.length)){for(i=n,t-=r;--t;i+=n);e+=i}else t<r&&(e=e.slice(0,t)+"."+e.slice(t));return e}(o=function e(t){var n,r,i,o=V.prototype={constructor:V,toString:null,valueOf:null},E=new V(1),I=20,A=4,T=-7,S=21,M=-1e7,_=1e7,C=!1,P=1,R=0,L={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0},F="0123456789abcdefghijklmnopqrstuvwxyz";function V(e,t){var n,o,u,a,c,d,w,y,g=this;if(!(g instanceof V))return new V(e,t);if(null==t){if(e instanceof V)return g.s=e.s,g.e=e.e,void(g.c=(e=e.c)?e.slice():e);if((d="number"==typeof e)&&0*e==0){if(g.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,c=e;c>=10;c/=10,a++);return g.e=a,void(g.c=[e])}y=e+""}else{if(!s.test(y=e+""))return i(g,y,d);g.s=45==y.charCodeAt(0)?(y=y.slice(1),-1):1}(a=y.indexOf("."))>-1&&(y=y.replace(".","")),(c=y.search(/e/i))>0?(a<0&&(a=c),a+=+y.slice(c+1),y=y.substring(0,c)):a<0&&(a=y.length)}else{if(b(t,2,F.length,"Base"),y=e+"",10==t)return G(g=new V(e instanceof V?e:y),I+g.e+1,A);if(d="number"==typeof e){if(0*e!=0)return i(g,y,d,t);if(g.s=1/e<0?(y=y.slice(1),-1):1,V.DEBUG&&y.replace(/^0\.0*|\./,"").length>15)throw Error(f+e);d=!1}else g.s=45===y.charCodeAt(0)?(y=y.slice(1),-1):1;for(n=F.slice(0,t),a=c=0,w=y.length;c<w;c++)if(n.indexOf(o=y.charAt(c))<0){if("."==o){if(c>a){a=w;continue}}else if(!u&&(y==y.toUpperCase()&&(y=y.toLowerCase())||y==y.toLowerCase()&&(y=y.toUpperCase()))){u=!0,c=-1,a=0;continue}return i(g,e+"",d,t)}(a=(y=r(y,t,10,g.s)).indexOf("."))>-1?y=y.replace(".",""):a=y.length}for(c=0;48===y.charCodeAt(c);c++);for(w=y.length;48===y.charCodeAt(--w););if(y=y.slice(c,++w)){if(w-=c,d&&V.DEBUG&&w>15&&(e>p||e!==l(e)))throw Error(f+g.s*e);if((a=a-c-1)>_)g.c=g.e=null;else if(a<M)g.c=[g.e=0];else{if(g.e=a,g.c=[],c=(a+1)%h,a<0&&(c+=h),c<w){for(c&&g.c.push(+y.slice(0,c)),w-=h;c<w;)g.c.push(+y.slice(c,c+=h));y=y.slice(c),c=h-y.length}else c-=w;for(;c--;y+="0");g.c.push(+y)}}else g.c=[g.e=0]}function q(e,t,n,r){var i,o,s,u,l;if(null==n?n=A:b(n,0,8),!e.c)return e.toString();if(i=e.c[0],s=e.e,null==t)l=m(e.c),l=1==r||2==r&&s<=T?O(l,s):x(l,s,"0");else if(o=(e=G(new V(e),t,n)).e,u=(l=m(e.c)).length,1==r||2==r&&(t<=o||o<=T)){for(;u<t;l+="0",u++);l=O(l,o)}else if(t-=s,l=x(l,o,"0"),o+1>u){if(--t>0)for(l+=".";t--;l+="0");}else if((t+=o-u)>0)for(o+1==u&&(l+=".");t--;l+="0");return e.s<0&&i?"-"+l:l}function U(e,t){var n,r,i=0;for(N(e[0])&&(e=e[0]),n=new V(e[0]);++i<e.length;){if(!(r=new V(e[i])).s){n=r;break}t.call(n,r)&&(n=r)}return n}function D(e,t,n){for(var r=1,i=t.length;!t[--i];t.pop());for(i=t[0];i>=10;i/=10,r++);return(n=r+n*h-1)>_?e.c=e.e=null:n<M?e.c=[e.e=0]:(e.e=n,e.c=t),e}function G(e,t,n,r){var i,o,s,a,f,p,w,y=e.c,g=d;if(y){e:{for(i=1,a=y[0];a>=10;a/=10,i++);if((o=t-i)<0)o+=h,s=t,w=(f=y[p=0])/g[i-s-1]%10|0;else if((p=u((o+1)/h))>=y.length){if(!r)break e;for(;y.length<=p;y.push(0));f=w=0,i=1,s=(o%=h)-h+1}else{for(f=a=y[p],i=1;a>=10;a/=10,i++);w=(s=(o%=h)-h+i)<0?0:f/g[i-s-1]%10|0}if(r=r||t<0||null!=y[p+1]||(s<0?f:f%g[i-s-1]),r=n<4?(w||r)&&(0==n||n==(e.s<0?3:2)):w>5||5==w&&(4==n||r||6==n&&(o>0?s>0?f/g[i-s]:0:y[p-1])%10&1||n==(e.s<0?8:7)),t<1||!y[0])return y.length=0,r?(t-=e.e+1,y[0]=g[(h-t%h)%h],e.e=-t||0):y[0]=e.e=0,e;if(0==o?(y.length=p,a=1,p--):(y.length=p+1,a=g[h-o],y[p]=s>0?l(f/g[i-s]%g[s])*a:0),r)for(;;){if(0==p){for(o=1,s=y[0];s>=10;s/=10,o++);for(s=y[0]+=a,a=1;s>=10;s/=10,a++);o!=a&&(e.e++,y[0]==c&&(y[0]=1));break}if(y[p]+=a,y[p]!=c)break;y[p--]=0,a=1}for(o=y.length;0===y[--o];y.pop());}e.e>_?e.c=e.e=null:e.e<M&&(e.c=[e.e=0])}return e}return V.clone=e,V.ROUND_UP=0,V.ROUND_DOWN=1,V.ROUND_CEIL=2,V.ROUND_FLOOR=3,V.ROUND_HALF_UP=4,V.ROUND_HALF_DOWN=5,V.ROUND_HALF_EVEN=6,V.ROUND_HALF_CEIL=7,V.ROUND_HALF_FLOOR=8,V.EUCLID=9,V.config=V.set=function(e){var t,n;if(null!=e){if("object"!=typeof e)throw Error(a+"Object expected: "+e);if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(b(n=e[t],0,y,t),I=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(b(n=e[t],0,8,t),A=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(N(n=e[t])?(b(n[0],-y,0,t),b(n[1],0,y,t),T=n[0],S=n[1]):(b(n,-y,y,t),T=-(S=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if(N(n=e[t]))b(n[0],-y,-1,t),b(n[1],1,y,t),M=n[0],_=n[1];else{if(b(n,-y,y,t),!n)throw Error(a+t+" cannot be zero: "+n);M=-(_=n<0?-n:n)}if(e.hasOwnProperty(t="CRYPTO")){if((n=e[t])!==!!n)throw Error(a+t+" not true or false: "+n);if(n){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw C=!n,Error(a+"crypto unavailable");C=n}else C=n}if(e.hasOwnProperty(t="MODULO_MODE")&&(b(n=e[t],0,9,t),P=n),e.hasOwnProperty(t="POW_PRECISION")&&(b(n=e[t],0,y,t),R=n),e.hasOwnProperty(t="FORMAT")){if("object"!=typeof(n=e[t]))throw Error(a+t+" not an object: "+n);L=n}if(e.hasOwnProperty(t="ALPHABET")){if("string"!=typeof(n=e[t])||/^.$|\.|(.).*\1/.test(n))throw Error(a+t+" invalid: "+n);F=n}}return{DECIMAL_PLACES:I,ROUNDING_MODE:A,EXPONENTIAL_AT:[T,S],RANGE:[M,_],CRYPTO:C,MODULO_MODE:P,POW_PRECISION:R,FORMAT:L,ALPHABET:F}},V.isBigNumber=function(e){return e instanceof V||e&&!0===e._isBigNumber||!1},V.maximum=V.max=function(){return U(arguments,o.lt)},V.minimum=V.min=function(){return U(arguments,o.gt)},V.random=function(){var e=9007199254740992*Math.random()&2097151?function(){return l(9007199254740992*Math.random())}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)};return function(t){var n,r,i,o,s,f=0,c=[],p=new V(E);if(null==t?t=I:b(t,0,y),o=u(t/h),C)if(crypto.getRandomValues){for(n=crypto.getRandomValues(new Uint32Array(o*=2));f<o;)(s=131072*n[f]+(n[f+1]>>>11))>=9e15?(r=crypto.getRandomValues(new Uint32Array(2)),n[f]=r[0],n[f+1]=r[1]):(c.push(s%1e14),f+=2);f=o/2}else{if(!crypto.randomBytes)throw C=!1,Error(a+"crypto unavailable");for(n=crypto.randomBytes(o*=7);f<o;)(s=281474976710656*(31&n[f])+1099511627776*n[f+1]+4294967296*n[f+2]+16777216*n[f+3]+(n[f+4]<<16)+(n[f+5]<<8)+n[f+6])>=9e15?crypto.randomBytes(7).copy(n,f):(c.push(s%1e14),f+=7);f=o/7}if(!C)for(;f<o;)(s=e())<9e15&&(c[f++]=s%1e14);for(o=c[--f],t%=h,o&&t&&(s=d[h-t],c[f]=l(o/s)*s);0===c[f];c.pop(),f--);if(f<0)c=[i=0];else{for(i=-1;0===c[0];c.splice(0,1),i-=h);for(f=1,s=c[0];s>=10;s/=10,f++);f<h&&(i-=h-f)}return p.e=i,p.c=c,p}}(),r=function(){function e(e,t,n,r){for(var i,o,s=[0],u=0,l=e.length;u<l;){for(o=s.length;o--;s[o]*=t);for(s[0]+=r.indexOf(e.charAt(u++)),i=0;i<s.length;i++)s[i]>n-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/n|0,s[i]%=n)}return s.reverse()}return function(t,r,i,o,s){var u,l,a,f,c,h,p,d,w=t.indexOf("."),y=I,g=A;for(w>=0&&(f=R,R=0,t=t.replace(".",""),h=(d=new V(r)).pow(t.length-w),R=f,d.c=e(x(m(h.c),h.e,"0"),10,i,"0123456789"),d.e=d.c.length),a=f=(p=e(t,r,i,s?(u=F,"0123456789"):(u="0123456789",F))).length;0==p[--f];p.pop());if(!p[0])return u.charAt(0);if(w<0?--a:(h.c=p,h.e=a,h.s=o,p=(h=n(h,d,y,g,i)).c,c=h.r,a=h.e),w=p[l=a+y+1],f=i/2,c=c||l<0||null!=p[l+1],c=g<4?(null!=w||c)&&(0==g||g==(h.s<0?3:2)):w>f||w==f&&(4==g||c||6==g&&1&p[l-1]||g==(h.s<0?8:7)),l<1||!p[0])t=c?x(u.charAt(1),-y,u.charAt(0)):u.charAt(0);else{if(p.length=l,c)for(--i;++p[--l]>i;)p[l]=0,l||(++a,p=[1].concat(p));for(f=p.length;!p[--f];);for(w=0,t="";w<=f;t+=u.charAt(p[w++]));t=x(t,a,u.charAt(0))}return t}}(),n=function(){function e(e,t,n){var r,i,o,s,u=0,l=e.length,a=t%w,f=t/w|0;for(e=e.slice();l--;)u=((i=a*(o=e[l]%w)+(r=f*o+(s=e[l]/w|0)*a)%w*w+u)/n|0)+(r/w|0)+f*s,e[l]=i%n;return u&&(e=[u].concat(e)),e}function t(e,t,n,r){var i,o;if(n!=r)o=n>r?1:-1;else for(i=o=0;i<n;i++)if(e[i]!=t[i]){o=e[i]>t[i]?1:-1;break}return o}function n(e,t,n,r){for(var i=0;n--;)e[n]-=i,i=e[n]<t[n]?1:0,e[n]=i*r+e[n]-t[n];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(r,i,o,s,u){var a,f,p,d,w,y,m,v,b,N,B,O,x,E,I,A,T,S=r.s==i.s?1:-1,M=r.c,_=i.c;if(!(M&&M[0]&&_&&_[0]))return new V(r.s&&i.s&&(M?!_||M[0]!=_[0]:_)?M&&0==M[0]||!_?0*S:S/0:NaN);for(b=(v=new V(S)).c=[],S=o+(f=r.e-i.e)+1,u||(u=c,f=g(r.e/h)-g(i.e/h),S=S/h|0),p=0;_[p]==(M[p]||0);p++);if(_[p]>(M[p]||0)&&f--,S<0)b.push(1),d=!0;else{for(E=M.length,A=_.length,p=0,S+=2,(w=l(u/(_[0]+1)))>1&&(_=e(_,w,u),M=e(M,w,u),A=_.length,E=M.length),x=A,B=(N=M.slice(0,A)).length;B<A;N[B++]=0);T=_.slice(),T=[0].concat(T),I=_[0],_[1]>=u/2&&I++;do{if(w=0,(a=t(_,N,A,B))<0){if(O=N[0],A!=B&&(O=O*u+(N[1]||0)),(w=l(O/I))>1)for(w>=u&&(w=u-1),m=(y=e(_,w,u)).length,B=N.length;1==t(y,N,m,B);)w--,n(y,A<m?T:_,m,u),m=y.length,a=1;else 0==w&&(a=w=1),m=(y=_.slice()).length;if(m<B&&(y=[0].concat(y)),n(N,y,B,u),B=N.length,-1==a)for(;t(_,N,A,B)<1;)w++,n(N,A<B?T:_,B,u),B=N.length}else 0===a&&(w++,N=[0]);b[p++]=w,N[0]?N[B++]=M[x]||0:(N=[M[x]],B=1)}while((x++<E||null!=N[0])&&S--);d=null!=N[0],b[0]||b.splice(0,1)}if(u==c){for(p=1,S=b[0];S>=10;S/=10,p++);G(v,o+(v.e=p+f*h-1)+1,s,d)}else v.e=f,v.r=+d;return v}}(),i=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,n=/^\.([^.]+)$/,r=/^-?(Infinity|NaN)$/,i=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(o,s,u,l){var f,c=u?s:s.replace(i,"");if(r.test(c))o.s=isNaN(c)?null:c<0?-1:1,o.c=o.e=null;else{if(!u&&(c=c.replace(e,function(e,t,n){return f="x"==(n=n.toLowerCase())?16:"b"==n?2:8,l&&l!=f?e:t}),l&&(f=l,c=c.replace(t,"$1").replace(n,"0.$1")),s!=c))return new V(c,f);if(V.DEBUG)throw Error(a+"Not a"+(l?" base "+l:"")+" number: "+s);o.c=o.e=o.s=null}}}(),o.absoluteValue=o.abs=function(){var e=new V(this);return e.s<0&&(e.s=1),e},o.comparedTo=function(e,t){return v(this,new V(e,t))},o.decimalPlaces=o.dp=function(e,t){var n,r,i,o=this;if(null!=e)return b(e,0,y),null==t?t=A:b(t,0,8),G(new V(o),e+o.e+1,t);if(!(n=o.c))return null;if(r=((i=n.length-1)-g(this.e/h))*h,i=n[i])for(;i%10==0;i/=10,r--);return r<0&&(r=0),r},o.dividedBy=o.div=function(e,t){return n(this,new V(e,t),I,A)},o.dividedToIntegerBy=o.idiv=function(e,t){return n(this,new V(e,t),0,1)},o.exponentiatedBy=o.pow=function(e,t){var n,r,i,o,s,f,c,p=this;if((e=new V(e)).c&&!e.isInteger())throw Error(a+"Exponent not an integer: "+e);if(null!=t&&(t=new V(t)),o=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return c=new V(Math.pow(+p.valueOf(),o?2-B(e):+e)),t?c.mod(t):c;if(s=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new V(NaN);(r=!s&&p.isInteger()&&t.isInteger())&&(p=p.mod(t))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||o&&p.c[1]>=24e7:p.c[0]<8e13||o&&p.c[0]<=9999975e7)))return i=p.s<0&&B(e)?-0:0,p.e>-1&&(i=1/i),new V(s?1/i:i);R&&(i=u(R/h+2))}for(o?(n=new V(.5),f=B(e)):f=e%2,s&&(e.s=1),c=new V(E);;){if(f){if(!(c=c.times(p)).c)break;i?c.c.length>i&&(c.c.length=i):r&&(c=c.mod(t))}if(o){if(G(e=e.times(n),e.e+1,1),!e.c[0])break;o=e.e>14,f=B(e)}else{if(!(e=l(e/2)))break;f=e%2}p=p.times(p),i?p.c&&p.c.length>i&&(p.c.length=i):r&&(p=p.mod(t))}return r?c:(s&&(c=E.div(c)),t?c.mod(t):i?G(c,R,A,void 0):c)},o.integerValue=function(e){var t=new V(this);return null==e?e=A:b(e,0,8),G(t,t.e+1,e)},o.isEqualTo=o.eq=function(e,t){return 0===v(this,new V(e,t))},o.isFinite=function(){return!!this.c},o.isGreaterThan=o.gt=function(e,t){return v(this,new V(e,t))>0},o.isGreaterThanOrEqualTo=o.gte=function(e,t){return 1===(t=v(this,new V(e,t)))||0===t},o.isInteger=function(){return!!this.c&&g(this.e/h)>this.c.length-2},o.isLessThan=o.lt=function(e,t){return v(this,new V(e,t))<0},o.isLessThanOrEqualTo=o.lte=function(e,t){return-1===(t=v(this,new V(e,t)))||0===t},o.isNaN=function(){return!this.s},o.isNegative=function(){return this.s<0},o.isPositive=function(){return this.s>0},o.isZero=function(){return!!this.c&&0==this.c[0]},o.minus=function(e,t){var n,r,i,o,s=this,u=s.s;if(t=(e=new V(e,t)).s,!u||!t)return new V(NaN);if(u!=t)return e.s=-t,s.plus(e);var l=s.e/h,a=e.e/h,f=s.c,p=e.c;if(!l||!a){if(!f||!p)return f?(e.s=-t,e):new V(p?s:NaN);if(!f[0]||!p[0])return p[0]?(e.s=-t,e):new V(f[0]?s:3==A?-0:0)}if(l=g(l),a=g(a),f=f.slice(),u=l-a){for((o=u<0)?(u=-u,i=f):(a=l,i=p),i.reverse(),t=u;t--;i.push(0));i.reverse()}else for(r=(o=(u=f.length)<(t=p.length))?u:t,u=t=0;t<r;t++)if(f[t]!=p[t]){o=f[t]<p[t];break}if(o&&(i=f,f=p,p=i,e.s=-e.s),(t=(r=p.length)-(n=f.length))>0)for(;t--;f[n++]=0);for(t=c-1;r>u;){if(f[--r]<p[r]){for(n=r;n&&!f[--n];f[n]=t);--f[n],f[r]+=c}f[r]-=p[r]}for(;0==f[0];f.splice(0,1),--a);return f[0]?D(e,f,a):(e.s=3==A?-1:1,e.c=[e.e=0],e)},o.modulo=o.mod=function(e,t){var r,i,o=this;return e=new V(e,t),!o.c||!e.s||e.c&&!e.c[0]?new V(NaN):!e.c||o.c&&!o.c[0]?new V(o):(9==P?(i=e.s,e.s=1,r=n(o,e,0,3),e.s=i,r.s*=i):r=n(o,e,0,P),(e=o.minus(r.times(e))).c[0]||1!=P||(e.s=o.s),e)},o.multipliedBy=o.times=function(e,t){var n,r,i,o,s,u,l,a,f,p,d,y,m,v,b,N=this,B=N.c,O=(e=new V(e,t)).c;if(!(B&&O&&B[0]&&O[0]))return!N.s||!e.s||B&&!B[0]&&!O||O&&!O[0]&&!B?e.c=e.e=e.s=null:(e.s*=N.s,B&&O?(e.c=[0],e.e=0):e.c=e.e=null),e;for(r=g(N.e/h)+g(e.e/h),e.s*=N.s,(l=B.length)<(p=O.length)&&(m=B,B=O,O=m,i=l,l=p,p=i),i=l+p,m=[];i--;m.push(0));for(v=c,b=w,i=p;--i>=0;){for(n=0,d=O[i]%b,y=O[i]/b|0,o=i+(s=l);o>i;)n=((a=d*(a=B[--s]%b)+(u=y*a+(f=B[s]/b|0)*d)%b*b+m[o]+n)/v|0)+(u/b|0)+y*f,m[o--]=a%v;m[o]=n}return n?++r:m.splice(0,1),D(e,m,r)},o.negated=function(){var e=new V(this);return e.s=-e.s||null,e},o.plus=function(e,t){var n,r=this,i=r.s;if(t=(e=new V(e,t)).s,!i||!t)return new V(NaN);if(i!=t)return e.s=-t,r.minus(e);var o=r.e/h,s=e.e/h,u=r.c,l=e.c;if(!o||!s){if(!u||!l)return new V(i/0);if(!u[0]||!l[0])return l[0]?e:new V(u[0]?r:0*i)}if(o=g(o),s=g(s),u=u.slice(),i=o-s){for(i>0?(s=o,n=l):(i=-i,n=u),n.reverse();i--;n.push(0));n.reverse()}for((i=u.length)-(t=l.length)<0&&(n=l,l=u,u=n,t=i),i=0;t;)i=(u[--t]=u[t]+l[t]+i)/c|0,u[t]=c===u[t]?0:u[t]%c;return i&&(u=[i].concat(u),++s),D(e,u,s)},o.precision=o.sd=function(e,t){var n,r,i,o=this;if(null!=e&&e!==!!e)return b(e,1,y),null==t?t=A:b(t,0,8),G(new V(o),e,t);if(!(n=o.c))return null;if(r=(i=n.length-1)*h+1,i=n[i]){for(;i%10==0;i/=10,r--);for(i=n[0];i>=10;i/=10,r++);}return e&&o.e+1>r&&(r=o.e+1),r},o.shiftedBy=function(e){return b(e,-p,p),this.times("1e"+e)},o.squareRoot=o.sqrt=function(){var e,t,r,i,o,s=this,u=s.c,l=s.s,a=s.e,f=I+4,c=new V("0.5");if(1!==l||!u||!u[0])return new V(!l||l<0&&(!u||u[0])?NaN:u?s:1/0);if(0==(l=Math.sqrt(+s))||l==1/0?(((t=m(u)).length+a)%2==0&&(t+="0"),l=Math.sqrt(t),a=g((a+1)/2)-(a<0||a%2),r=new V(t=l==1/0?"1e"+a:(t=l.toExponential()).slice(0,t.indexOf("e")+1)+a)):r=new V(l+""),r.c[0])for((l=(a=r.e)+f)<3&&(l=0);;)if(o=r,r=c.times(o.plus(n(s,o,f,1))),m(o.c).slice(0,l)===(t=m(r.c)).slice(0,l)){if(r.e<a&&--l,"9999"!=(t=t.slice(l-3,l+1))&&(i||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(G(r,r.e+I+2,1),e=!r.times(r).eq(s));break}if(!i&&(G(o,o.e+I+2,0),o.times(o).eq(s))){r=o;break}f+=4,l+=4,i=1}return G(r,r.e+I+1,A,e)},o.toExponential=function(e,t){return null!=e&&(b(e,0,y),e++),q(this,e,t,1)},o.toFixed=function(e,t){return null!=e&&(b(e,0,y),e=e+this.e+1),q(this,e,t)},o.toFormat=function(e,t){var n=this.toFixed(e,t);if(this.c){var r,i=n.split("."),o=+L.groupSize,s=+L.secondaryGroupSize,u=L.groupSeparator,l=i[0],a=i[1],f=this.s<0,c=f?l.slice(1):l,h=c.length;if(s&&(r=o,o=s,s=r,h-=r),o>0&&h>0){for(r=h%o||o,l=c.substr(0,r);r<h;r+=o)l+=u+c.substr(r,o);s>0&&(l+=u+c.slice(r)),f&&(l="-"+l)}n=a?l+L.decimalSeparator+((s=+L.fractionGroupSize)?a.replace(new RegExp("\\d{"+s+"}\\B","g"),"$&"+L.fractionGroupSeparator):a):l}return n},o.toFraction=function(e){var t,r,i,o,s,u,l,f,c,p,w,y,g=this,v=g.c;if(null!=e&&(!(f=new V(e)).isInteger()&&(f.c||1!==f.s)||f.lt(E)))throw Error(a+"Argument "+(f.isInteger()?"out of range: ":"not an integer: ")+e);if(!v)return g.toString();for(r=new V(E),p=i=new V(E),o=c=new V(E),y=m(v),u=r.e=y.length-g.e-1,r.c[0]=d[(l=u%h)<0?h+l:l],e=!e||f.comparedTo(r)>0?u>0?r:p:f,l=_,_=1/0,f=new V(y),c.c[0]=0;w=n(f,r,0,1),1!=(s=i.plus(w.times(o))).comparedTo(e);)i=o,o=s,p=c.plus(w.times(s=p)),c=s,r=f.minus(w.times(s=r)),f=s;return s=n(e.minus(i),o,0,1),c=c.plus(s.times(p)),i=i.plus(s.times(o)),c.s=p.s=g.s,t=n(p,o,u*=2,A).minus(g).abs().comparedTo(n(c,i,u,A).minus(g).abs())<1?[p.toString(),o.toString()]:[c.toString(),i.toString()],_=l,t},o.toNumber=function(){return+this},o.toPrecision=function(e,t){return null!=e&&b(e,1,y),q(this,e,t,2)},o.toString=function(e){var t,n=this,i=n.s,o=n.e;return null===o?i?(t="Infinity",i<0&&(t="-"+t)):t="NaN":(t=m(n.c),null==e?t=o<=T||o>=S?O(t,o):x(t,o,"0"):(b(e,2,F.length,"Base"),t=r(x(t,o,"0"),10,e,i,!0)),i<0&&n.c[0]&&(t="-"+t)),t},o.valueOf=o.toJSON=function(){var e,t=this,n=t.e;return null===n?t.toString():(e=m(t.c),e=n<=T||n>=S?O(e,n):x(e,n,"0"),t.s<0?"-"+e:e)},o._isBigNumber=!0,null!=t&&V.set(t),V}()).default=o.BigNumber=o,void 0===(r=function(){return o}.call(t,n,t,e))||(e.exports=r)}()},function(e,t){e.exports={getCodePoint:function(e,t){var n=e.charCodeAt(t);if(n>=55296&&n<=56319&&e.length>1){var r=e.charCodeAt(t+1);if(r>=56320&&r<=57343)return 1024*(n-55296)+r-56320+65536}return n}}},function(e,t,n){e.exports={HeaderByte:n(4),ExtendedHeaderByte:n(5),LinkedBytes:n(7)}},function(e,t,n){const r=n(0),i=n(1),o=256,s=[i(256).pow(0),i(256).pow(1),i(256).pow(2),i(256).pow(3),i(256).pow(4),i(256).pow(5),i(256).pow(6),i(256).pow(7),i(256).pow(8),i(256).pow(9),i(256).pow(10),i(256).pow(11),i(256).pow(12),i(256).pow(13),i(256).pow(14),i(256).pow(15),i(256).pow(16),i(256).pow(17),i(256).pow(18),i(256).pow(19),i(256).pow(20)],u=/(0+)$/,l={decimalSeparator:".",errorOnNaN:!1,infiniteIdentifier:"infinity",arrOnly:!0,forceExponent:!0};function a(e,t){const n=Object.assign({},l,t);if("string"==typeof e){let t;if((e=e.toLowerCase().replace(/ /g,""))===n.infiniteIdentifier?t=64:e==="-"+n.infiniteIdentifier&&(t=192),t)return n.arrOnly?[t]:t}else if(0==e)return n.arrOnly?[0]:0;i.config({FORMAT:{decimalSeparator:n.decimalSeparator}});if(this.decimalValue=i(e),this.decimalValue.isNaN()){if(n.errorOnNaN)throw new Error("Invalid number:"+e);return n.arrOnly?[128]:128}this.headByte=0,"number"==typeof e&&(e=""+e),this.exponent=0;var s=e.indexOf(n.decimalSeparator);if(-1!==s&&(e=e.replace(/0+$/,""),this.exponent=e.length-s-1,this.exponent&&(this.exponent=-this.exponent),e=e.replace(n.decimalSeparator,"")),n.forceExponent&&this.decimalValue.isGreaterThan(65535)){var a=u.exec(e);a&&(this.exponent+=a[1].length,e=e.replace(/0+$/,""))}if(this.decimalValue=i(e),this.exponent){if(Math.abs(this.exponent)>127)throw new Error("Maximum value of exponent is exceeded.");this.headByte=64|this.headByte,this.exponent>0?this.exponentInBytes=this.exponent:this.exponentInBytes=128-this.exponent}this.decimalValue.isNegative()&&(this.headByte=128|this.headByte,this.decimalValue=this.decimalValue.abs()),this.coffecient=[],this._levelUpIterative=function(e,t,n){let i=[0];for(i[e]=r(0|i[e],o).by(n),e=1;t.isGreaterThan(o-1);e++)n=t.modulo(o).toNumber(),t=t.minus(n).dividedBy(o),i[e]=r(0|i[e],o).by(n);return t.isEqualTo(0)||(i[e]||i.push(0),i[e]=r(i[e],o).by(t.toNumber())),i},this._decimalToByteSequence=function(){let e=this.decimalValue.modulo(o).toNumber(),t=this.decimalValue.minus(e).dividedBy(o);this.coffecient=this._levelUpIterative(0,t,e),this.exponent?this.headByte=this.headByte|this.coffecient.length+1:this.headByte=this.headByte|this.coffecient.length},this._decimalToByteSequence(),this.toByteArray=function(){let e=[this.headByte];return this.exponentInBytes&&e.push(this.exponentInBytes),e.push(...this.coffecient),e},this.toExponentString=function(e){return f(this.toByteArray()).toExponential(e)},this.toString=function(){return f(this.toByteArray()).toFixed()}}const f=function(e,t){t||(t=0);let n=e[t],r=63&n;if(r&&void 0===e[t+r])throw new Error("Invalid HB Bytes sequence. All coffecient bytes are not present.");if(0===n)return i(0);if(128===n)return NaN;if(64===n)return opts.infiniteIdentifier;if(192===n)return"-"+opts.infiniteIdentifier;let u=!1;128==(128&n)&&(u=!0,n^=128);let l=0;64==(64&n)&&(l=128==(128&e[t+1])?-(128^e[t+1]):e[t+1],n=(64^n)-1);var a=0!==l?t+2:t+1;let f=i(e[a]);for(let t=1;t<n;t++)f=t<s.length?f.plus(s[t].multipliedBy(e[a+t])):f.plus(i(o).pow(t).multipliedBy(e[a+t]));return l&&(f=i(function(e,t){if(t>0)return e+"0".repeat(t);{const n=e.length+t;return e.substring(0,n)+"."+e.substring(n)}}(f.toFixed(),l))),u&&(f=f.multipliedBy(-1)),f};a.decode=function(){return new a(f(...arguments).toFixed())},e.exports=a},function(e,t,n){const r=n(0),i=n(6),o={ZERO:0,NAN:128,INFINITY:64,NEGATIVE_INFINITY:192,OTHER1:32,OTHER2:160,OTHER3:224,OTHER4:48,OTHER5:176},s=n(1),u=256,l=[s(256).pow(0),s(256).pow(1),s(256).pow(2),s(256).pow(3),s(256).pow(4),s(256).pow(5),s(256).pow(6),s(256).pow(7),s(256).pow(8),s(256).pow(9),s(256).pow(10),s(256).pow(11),s(256).pow(12),s(256).pow(13),s(256).pow(14),s(256).pow(15),s(256).pow(16),s(256).pow(17),s(256).pow(18),s(256).pow(19),s(256).pow(20)],a=/(0+)$/,f={decimalSeparator:".",errorOnNaN:!1,infinityIdentifier:"infinity",arrOnly:!0,forceExponent:!0};function c(e,t){const n=Object.assign({},f,t);if("string"==typeof e){let t;if((e=e.toLowerCase().replace(/ /g,""))===n.infinityIdentifier?t=o.INFINITY:e==="-"+n.infinityIdentifier&&(t=o.NEGATIVE_INFINITY),t)return n.arrOnly?[t]:t}else if(0==e)return n.arrOnly?[0]:0;s.config({FORMAT:{decimalSeparator:n.decimalSeparator}});if(this.decimalValue=s(e),this.decimalValue.isNaN()){if(n.errorOnNaN)throw new Error("Invalid number:"+e);return n.arrOnly?[128]:128}this.headByte=0,"number"==typeof e&&(e=""+e),this.exponent=0;var l=e.indexOf(n.decimalSeparator);if(-1!==l&&(e=e.replace(/0+$/,""),this.exponent=e.length-l-1,this.exponent&&(this.exponent=-this.exponent),e=e.replace(n.decimalSeparator,"")),n.forceExponent&&this.decimalValue.isGreaterThan(65535)){var c=a.exec(e);c&&(this.exponent+=c[1].length,e=e.replace(/0+$/,""))}this.decimalValue=s(e),this.exponentInBytes=[],this.exponent&&(this.headByte=64|this.headByte,this.exponent>0?this.exponentInBytes=i.encode(this.exponent,n):(this.headByte=32|this.headByte,this.exponentInBytes=i.encode(-this.exponent,n))),this.decimalValue.isNegative()&&(this.headByte=128|this.headByte,this.decimalValue=this.decimalValue.abs()),this.coffecient=[],this._levelUpIterative=function(e,t,n){let i=[0];for(i[e]=r(0|i[e],u).by(n),e=1;t.isGreaterThan(u-1);e++)n=t.modulo(u).toNumber(),t=t.minus(n).dividedBy(u),i[e]=r(0|i[e],u).by(n);return t.isEqualTo(0)||(i[e]||i.push(0),i[e]=r(i[e],u).by(t.toNumber())),i},this._decimalToByteSequence=function(){let e=this.decimalValue.modulo(u).toNumber(),t=this.decimalValue.minus(e).dividedBy(u);this.coffecient=this._levelUpIterative(0,t,e);const n=this.exponentInBytes.length+this.coffecient.length;n<16?this.headByte=this.headByte|n:(this.headByte=16|this.headByte,this.totalCountBytes=i.encode(n))},this._decimalToByteSequence(),this.toByteArray=function(){let e=[this.headByte];return this.totalCountBytes&&e.push(...this.totalCountBytes),this.exponentInBytes&&e.push(...this.exponentInBytes),e.push(...this.coffecient),e},this.toExponentString=function(e){return h(this.toByteArray()).toExponential(e)},this.toString=function(){return h(this.toByteArray()).toFixed()}}const h=function(e,t,n=64){t||(t=0);let r=e[t];if(r===o.ZERO)return s(0);if(r===o.NAN)return NaN;if(r===o.INFINITY)return opts.infinityIdentifier;if(r===o.NEGATIVE_INFINITY)return"-"+opts.infinityIdentifier;const a=15&r;let f=0;if(16==(16&r)?(t+=(f=i.decode(e,t+1)).len,f=f.val):f=a,void 0===e[t+f])throw new Error("Invalid EHB bytes sequence.");let c=!1;128==(128&r)&&(c=!0,r^=128);let h={};if(64==(64&r)){if(n<(f-=(h=i.decode(e,t+1)).len))throw Error("Maximum length exceeded");32==(32&(r^=64))&&(h.val=-h.val,r^=32)}if(void 0===e[t+(r-1)])throw new Error("Invalid EHB Bytes array. All coffecient bytes are not present.");var p=(h.len?t+h.len:t)+1;let d=s(e[p]);for(let t=1;t<f;t++)d=t<l.length?d.plus(l[t].multipliedBy(e[p+t])):d.plus(s(u).pow(t).multipliedBy(e[p+t]));return h.val&&(d=s(function(e,t){if(t>0)return e+"0".repeat(t);{const n=e.length+t;return e.substring(0,n)+"."+e.substring(n)}}(d.toFixed(),h.val))),c&&(d=d.multipliedBy(-1)),d};c.decode=function(){return new c(h(...arguments).toFixed())},e.exports=c},function(e,t,n){const r=n(0),{getCodePoint:i}=n(2),o=[Math.pow(128,0),Math.pow(128,1),Math.pow(128,2),Math.pow(128,3),Math.pow(128,4),Math.pow(128,5),Math.pow(128,6),Math.pow(128,7),Math.pow(128,8),Math.pow(128,9),Math.pow(128,10),Math.pow(128,11),Math.pow(128,12),Math.pow(128,13),Math.pow(128,14),Math.pow(128,15),Math.pow(128,16),Math.pow(128,17),Math.pow(128,18),Math.pow(128,19),Math.pow(128,20)],s=128,u={decimalSeparator:".",arrOnly:!0},l={encode:function(e,t){const n=Object.assign({},u,t);if(null===e||void 0===e)throw new Error("LB format doesn't support an invalid number");if(0==e)return n.arrOnly?[0]:0;if("number"==typeof e&&e%1)throw new Error("LB format doesn't support fractional number");let i=e;if(i<0)throw new Error("LB format doesn't support negative number");let o=i%s,l=[0],a=(i-o)/s;return 0===a?[o]:(function e(t,n,i){n>s-1?(l[t]=128|r(0|l[t],s).by(i),e(t+1,(n-(i=n%s))/s,i)):0===n||(l[t]=128|r(0|l[t],s).by(i),l[t+1]||l.push(0),l[t+1]=r(0|l[t+1],s).by(n))}(0,a,o),l)},decode:function(e,t){if(t||(t=0),0===e[t])return{val:0,len:1};let n=0,r=0;for(;128&e[t+r];r++)quotient=128^e[t+r],n+=r<o.length?o[r]*quotient:Math.pow(s,r)*quotient;return{val:n+=r<o.length?o[r]*e[t+r]:Math.pow(s,r)*e[t+r],len:r+1}},strToByteArr:function(e){const t=[];for(let i=0;i<e.length;i++){var n=e.charCodeAt(i);if(n>=55296&&n<=56319&&e.length>1){var r=e.charCodeAt(++i);r>=56320&&r<=57343&&(n=1024*(n-55296)+r-56320+65536)}t.push(...l.encode(n))}return t},byteArrToStr:function(e,t,n){t||(t=0),n||(n=e.length);let r="";for(;t<n;){let n=l.decode(e,t);r+=String.fromCodePoint(n.val),t+=n.len}return r},convert:function(){return"string"==typeof arguments[0]?l.strToByteArr(arguments[0]):l.byteArrToStr(...arguments)}};e.exports=l},function(e,t,n){"use restrict";const r=n(0),{getCodePoint:i}=n(2),o=n(1),s=[o(128).pow(0),o(128).pow(1),o(128).pow(2),o(128).pow(3),o(128).pow(4),o(128).pow(5),o(128).pow(6),o(128).pow(7),o(128).pow(8),o(128).pow(9),o(128).pow(10),o(128).pow(11),o(128).pow(12),o(128).pow(13),o(128).pow(14),o(128).pow(15),o(128).pow(16),o(128).pow(17),o(128).pow(18),o(128).pow(19),o(128).pow(20)],u=128,l={decimalSeparator:".",arrOnly:!0},a={encode:function(e,t){const n=Object.assign({},l,t);if(null===e||void 0===e)throw new Error("LB format doesn't support an invalid number");if(0==e)return n.arrOnly?[0]:0;if("string"==typeof e&&-1!==e.indexOf(n.decimalSeparator))throw new Error("LB format doesn't support fractional number");if("number"==typeof e&&e%1)throw new Error("LB format doesn't support fractional number");let i=o(e);if(i.isNegative())throw new Error("LB format doesn't support negative number");let s=[0],a=i.modulo(u).toNumber(),f=i.minus(a).dividedBy(u);return f.isEqualTo(0)?[a]:(function(e,t,n){for(;t.isGreaterThan(u-1);e++)s[e]=128|r(0|s[e],u).by(n),n=t.modulo(u).toNumber(),t=t.minus(n).dividedBy(u);t.isEqualTo(0)||(s[e]=128|r(0|s[e],u).by(n),s[e+1]||s.push(0),s[e+1]=r(0|s[e+1],u).by(t.toNumber()))}(0,f,a),s)},decode:function(e,t,n=64){if(t||(t=0),0===e[t])return{val:o(0),len:1};let r=o(0),i=0;for(;128&e[t+i];i++){if(n<i)throw Error("Maximum length exceeded");quotient=o(128^e[t+i]),r=i<s.length?r.plus(s[i].multipliedBy(quotient)):r.plus(o(u).pow(i).multipliedBy(quotient))}return{val:(r=i<s.length?r.plus(s[i].multipliedBy(e[t+i])):r.plus(o(u).pow(i).multipliedBy(e[t+i]))).toFixed(),len:i+1}},strToByteArr:function(e){const t=[];for(let i=0;i<e.length;i++){var n=e.charCodeAt(i);if(n>=55296&&n<=56319&&e.length>1){var r=e.charCodeAt(++i);r>=56320&&r<=57343&&(n=1024*(n-55296)+r-56320+65536)}t.push(...a.encode(n))}return t},byteArrToStr:function(e,t,n){t||(t=0),n||(n=e.length);let r="";for(;t<n;){let n=a.decode(e,t);r+=String.fromCodePoint(n.val),t+=n.len}return r},convert:function(){return"string"==typeof arguments[0]?a.strToByteArr(arguments[0]):a.byteArrToStr(...arguments)}};e.exports=a}]);
//# sourceMappingURL=bigbit.js.map