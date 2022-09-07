/**
 * @name Crypt - Encryption system
 * @author Miftachul Huda <miftachul.huda.makruf@gmail.com>
 */
using System;
using System.Linq;
using System.Collections.Generic;
namespace com.Manja
{
	public class Crypt
	{
		Random RND = new Random();
		static byte BIT = (byte) MathF.Sqrt( Byte.MaxValue + 1 );
		byte[] KEY = new byte[ BIT / 2 ];
		byte[] HEX = new byte[ BIT ].Select( ( v, i ) => (byte) i ).ToArray();
		public Crypt( byte[] key = null ) => Key = key;
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
				for ( int i = 0; i < KEY.Length; i++ )

					KEY[ i ] = (byte) ( BIT * HEX[ i + i ] + HEX[ i + i + 1 ] );
				
				return KEY.ToArray();
			}
			set
			{
				if ( value is byte[] && value.Length == KEY.Length )
				{
					KEY = value.ToArray();
					
					for ( int i = 0; i < KEY.Length; i++ )
					{
						HEX[ i + i + 1 ] = (byte) ( KEY[ i ] % BIT );
						HEX[ i + i ] = (byte) ( ( KEY[ i ] - HEX[ i + i + 1 ] ) / BIT );
					}
				} else value = Key;
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
		public byte Level
		{
			set
			{
				byte[] key = KEY.ToArray();

				for ( byte i = 0; i < value; i++ ) Convert = key;

				for ( int i = 0; i < key.Length; i++ )
				{
					HEX[ i + i + 1 ] = (byte) ( key[ i ] % BIT );
					HEX[ i + i ] = (byte) ( ( key[ i ] - HEX[ i + i + 1 ] ) / BIT );
				}
			}
		}
		public static void Solve( byte[] key, byte lvl )
		{
			int bit = key.Length * 2;
			int[] hex1 = new int[ bit ];
			int[] hex2 = new int[ bit ];

			for ( int i = 0; i < key.Length; i++ )
			{
				hex1[ i + i + 1 ] = key[ i ] % bit;
				hex1[ i + i ] = ( key[ i ] - hex1[ i + i + 1 ] ) / bit;
			}
			for ( byte i = 0; i <= lvl; i++ )
			{
				for ( int ii = 0; ii < bit; ii++ )

					for ( int iii = 0; iii < bit; iii++ )

						if ( hex1[ iii ] == ii ) hex2[ ii ] = iii;
			}
			for ( int i = 0; i < key.Length; i++ )

				key[ i ] = (byte) ( bit * hex2[ i + i ] + hex2[ i + i + 1 ] );
		}
	}
}