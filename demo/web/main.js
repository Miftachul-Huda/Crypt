import { Crypt } from './src/Crypt.js';

function main() {

	const _text = document.getElementById("text");
	const _key = document.getElementById("key");
	const _count = document.getElementById("count");
	const _level = document.getElementById("level");
	const _enc = document.getElementById("enc");
	const _dec = document.getElementById("dec");
	const _gen = document.getElementById("generate");
	const _solve = document.getElementById("solve");
	const _run = document.getElementById("run");
	const encoder = new TextEncoder();
	const encrypt = new Crypt();
	const decrypt = new Crypt();
	let count, level, enc_key, dec_key, enc_total, dec_total, data;

	function Generate() {
		if (_level.value == "") alert("Level Kosong");
		else _key.value = toHexString(encrypt.Key);
	}

	function Run() {
		if (_text.value == "") alert("Data Kosong");
		else if (_level.value == "") alert("Level Kosong");
		else if (_key.value == "") alert("Key Kosong");
		else {
			data = encoder.encode(_text.value);
			count = parseInt(_count.value);
			level = parseInt(_level.value);
			enc_key = fromHexString(_key.value);
			dec_key = Uint8Array.from(enc_key);
			Crypt.Solve(dec_key, level);
			encrypt.Key = enc_key;
			decrypt.Key = dec_key;
			//encrypt.Level = level;

			enc_total = dec_total = 0;
			for(let i = 0, time; i < count; i++) {
				time = performance.now();
				encrypt.Convert = data;
				enc_total += performance.now()-time;
				time = performance.now();
				decrypt.Convert = data;
				dec_total += performance.now()-time;
			}
			_solve.innerHTML = toHexString(dec_key);
			_enc.value = `* Bytes = ${data.length}.\n* Times = ${enc_total/count} ms.\n* Bytes Total = ${data.length*count}.\n* Times Total = ${enc_total} ms.\n_________________________________________________\n${toHexString(encrypt.Convert = data)}`;
			_dec.value = `* Bytes = ${data.length}.\n* Times = ${dec_total/count} ms.\n* Bytes Total = ${data.length*count}.\n* Times Total = ${dec_total} ms.\n_________________________________________________\n${toHexString(decrypt.Convert = data)}`;
		}
	}
	_gen.addEventListener("click", Generate);
	_run.addEventListener("click", Run);
}

const fromHexString = hexString =>
	Uint8Array.from(hexString.replace(/\s/g, '').toLowerCase().match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = bytes =>
	bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0').toUpperCase() + ' ', '');

addEventListener('load', main);