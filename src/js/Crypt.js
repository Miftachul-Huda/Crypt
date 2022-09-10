/**
 * @name Crypt - Encryption system
 * @author Miftachul Huda <miftachul.huda.makruf@gmail.com>
 */
 class Crypt
 {
	 constructor( key = null )
	 {
		 this.BIT = Math.sqrt( 0xFF + 1 );
		 this.KEY = new ArrayBuffer( this.BIT / 2 );
		 this.HEX = new ArrayBuffer( this.BIT );
		 
		 let uInt8 = new Uint8Array( this.HEX );
		 uInt8.set( uInt8.map( ( v, i ) => i ) );
		 
		 this.Key = key;
	 }
	 setKey = ( bit, key, hex ) =>
	 {
		 for ( let i = 0; i < key.length; i++ )
			 
			 key[ i ] = bit * hex[ i + i ] + hex[ i + i + 1 ];
	 }
	 setHex = ( bit, key, hex ) =>
	 {
		 for ( let i = 0; i < key.length; i++ )
		 {
			 hex[ i + i + 1 ] = key[ i ] % bit;
			 hex[ i + i ] = ( key[ i ] - hex[ i + i + 1 ] ) / bit;
		 }
	 }
	 get Key()
	 {
		 let bit = this.BIT,
				 key = new Uint8Array( this.KEY ),
				 hex = new Uint8Array( this.HEX );
 
		 for ( let len = bit - 1, rnd, val; len > 0; len-- )
		 {
			 rnd = Math.trunc( Math.random() * len );
			 val = hex[ len ];
			 hex[ len ] = hex[ rnd ];
			 hex[ rnd ] = val;
		 }
		 this.setKey( bit, key, hex );
		 return Uint8Array.from( key );
	 }
	 set Key( val )
	 {
		 let bit = this.BIT,
				 key = new Uint8Array( this.KEY ),
				 hex = new Uint8Array( this.HEX );
 
		 if ( val && val.length == key.byteLength )
		 {
			 key.set( val );
			 this.setHex( bit, key, hex );
		 }
		 else val = this.Key;
	 }
	 /**
		* @param {Uint8Array} val
		*/
	 set Convert( val )
	 {
		 let bit = this.BIT,
				 hex = new Uint8Array( this.HEX );
 
		 for ( let ii = 0; ii < val.length; ii++ )
		 {
			 let tmp = [];
 
			 for ( let i = 0; true; i++ )
			 {
				 if ( i > 0 ) val[ ii ] = ( val[ ii ] - tmp[ tmp.length - 1 ] ) / bit;
 
				 if ( val[ ii ] >= bit ) tmp.push( val[ ii ] % bit );
 
				 else
				 {
					 tmp.push( val[ ii ] );
					 val[ ii ] = 0;
					 break;
				 }
			 }
 
			 if ( tmp.length == 1 ) tmp.push( 0 );
 
			 for ( let i = 0; i < tmp.length; i++ )
 
				 val[ ii ] += hex[ tmp[ i ] ] * Math.pow( bit, i );
		 }
	 }
	 /**
		* @param {number} val
		*/
	 set Level( val )
	 {
		 let bit = this.BIT,
				 key = new Uint8Array( this.KEY ),
				 hex = new Uint8Array( this.HEX );
 
		 this.setHex( bit, key, hex );
 
		 for ( let i = 0; i < val; i++ )
 
			 this.Convert = key;
 
		 this.setHex( bit, key, hex );
	 }
	 /**
		* @param {Uint8Array} key
		* @param {number} lvl
		*/
	 Solve( key, lvl = 1 )
	 {
		 let bit = this.BIT,
		 key1 = Uint8Array.from( key ),
		 hex = new Uint8Array( this.HEX ),
		 hex1 = new Uint8Array( bit ),
		 hex2 = new Uint8Array( bit );
 
		 this.setHex( bit, key1, hex1 );
		 
		 for ( let ii = 0; ii < bit; ii++ )
 
			 for ( let iii = 0; iii < bit; iii++ )
 
				 if ( hex1[ iii ] == ii ) hex2[ ii ] = iii;
				 
		 this.setKey( bit, key, hex2 );
 
		 this.setHex( bit, key, hex );
 
		 for ( let i = 0; i < lvl; i++ )
 
			 this.Convert = key;
 
	 }
 }
 export { Crypt };