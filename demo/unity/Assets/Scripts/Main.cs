using System.Linq;
using UnityEngine;
using com.Manja.Encryption;

public class Main : MonoBehaviour
{
	public GameObject _text;
	public GameObject _key;
	public GameObject _count;
	public GameObject _level;
	public GameObject _enc;
	public GameObject _dec;
	public GameObject _gen;
	public GameObject _solve;
	public GameObject _run;
	private Crypt encrypt = new Crypt();
	private Crypt decrypt = new Crypt();
	public byte[] enc_key, dec_key;
	private byte[] data = new byte[]{ 0x01, 0x02, 0x03, 0x04 };
	public int level = 99;

	void showHex( byte[] bytes, string msg = "" )
	{
		var str = "";
		for( int i = 0; i < bytes.Length; i++ )
		{
			str += bytes[ i ] + " ";
		}
		Debug.Log( msg + str );
	}

	void Start()
	{
			enc_key = encrypt.Key;
			dec_key = enc_key.ToArray();
			decrypt.Solve(dec_key, level);

			encrypt.Key = enc_key;
			decrypt.Key = dec_key;
			encrypt.Level = level;

			showHex(enc_key, "enc_key : ");
			showHex(dec_key, "dec_key : ");
			showHex(data, "data : ");

			encrypt.Convert = data;

			showHex(data, "enc_data : ");

			decrypt.Convert = data;

			showHex(data, "dec_data : ");
			

	}
}
