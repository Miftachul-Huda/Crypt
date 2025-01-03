/**
 * @name Crypt - Encryption system
 * @author Miftachul Huda <miftachul.huda.makruf@gmail.com>
 */
using System;
using System.Linq;
using System.Collections.Generic;
namespace com.Manja.Encryption
{
	public class Crypt
	{
		Random RND = new Random();
		static byte BIT = (byte) MathF.Sqrt( Byte.MaxValue + 1 );
		byte[] KEY = new byte[ BIT / 2 ];
		byte[] HEX = new byte[ BIT ].Select( ( v, i ) => (byte) i ).ToArray();
		public Crypt( byte[] key = null ) => Key = key;

		private void setKey( byte bit, byte[] key, byte[] hex )
		{
			for ( byte i = 0; i < key.Length; i++ )

				key[ i ] = (byte)(bit * hex[ i + i ] + hex[ i + i + 1 ]);
		}
		private void setHex( byte bit, byte[] key, byte[] hex )
		{
			for ( byte i = 0; i < key.Length; i++ )
			{
				hex[ i + i + 1 ] = (byte) ( key[ i ] % bit );
				hex[ i + i ] = (byte) ( ( key[ i ] - hex[ i + i + 1 ] ) / bit );
			}
		}
		public byte[] Key
		{
			get
			{
				for ( int len = BIT - 1, rnd, val; len > 0; len-- )
				{
					rnd = RND.Next( len + 1 );
					val = HEX[ len ];
					HEX[ len ] = HEX[ rnd ];
					HEX[ rnd ] = (byte) val;
				}
				setKey( BIT, KEY, HEX );
				
				return KEY.ToArray();
			}
			set
			{
				if ( value is byte[] && value.Length == KEY.Length )
				{
					KEY = value.ToArray();
					setHex( BIT, KEY, HEX );
				}
				else value = Key;
			}
		}
		public byte[] Convert
		{
			set
			{
				for ( int ii = 0; ii < value.Length; ii++ )
				{
					var tmp = new List<byte>();

					for ( int i = 0; true; i++ )
					{
						if ( i > 0 ) value[ ii ] = (byte) ( ( value[ ii ] - tmp[ tmp.Count - 1 ] ) / BIT );

						if ( value[ ii ] >= BIT ) tmp.Add( (byte) ( value[ ii ] % BIT ) );
						else
						{
							tmp.Add( value[ ii ] );
							value[ ii ] = 0;
							break;
						}
					}
					if ( tmp.Count == 1 ) tmp.Add( 0 );

					for ( int i = 0; i < tmp.Count; i++ )

						value[ ii ] += (byte) ( HEX[ tmp[ i ] ] * Math.Pow( BIT, i ) );
				}
			}
		}
		public int Level
		{
			set
			{
				setHex( BIT, KEY, HEX );

				for ( int i = 0; i < value; i++ )
					
					Convert = KEY;

				setHex( BIT, KEY, HEX );
			}
		}
		public void Solve( byte[] key, int lvl )
		{
			byte bit = BIT;
			byte[] key1 = key.ToArray(); 
			byte[] hex = HEX;
			byte[] hex1 = new byte[ bit ];
			byte[] hex2 = new byte[ bit ];

			setHex( bit, key1, hex1 );

			for ( byte ii = 0; ii < bit; ii++ )

				for ( byte iii = 0; iii < bit; iii++ )

					if ( hex1[ iii ] == ii ) hex2[ ii ] = iii;

			setKey( bit, key, hex2 );
			setHex( bit, key, hex );
			
			for ( int i = 0; i < lvl; i++ )

				Convert = key;
		}
	}
}