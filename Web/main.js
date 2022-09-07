import Crypt from Crypt;

function main() {
	const _text = document.getElementById("text");
	const _key = document.getElementById("key");
	const _level = document.getElementById("level");
	const _enc = document.getElementById("enc");
	const _dec = document.getElementById("dec");
	const _gen = document.getElementById("generate");
	const _solve = document.getElementById("solve");
	const _run = document.getElementById("run");
	const encoder = new TextEncoder();
	let level, key, data, time;
	
	function BufferShow( buff ) {
		let text = "";
		buff.forEach(v => {
			v = v.toString(16).toUpperCase();
			if (v.length < 2) v = 0 + v;
			text += v + " ";
		});
		return text;
	}
	
	const fromHexString = hexString =>
		Uint8Array.from(hexString.replace(/\s/g, '').toLowerCase().match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
	
	const toHexString = bytes =>
		bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
	
	
	function Generate() {
		level = parseInt(_level.value);
		if (_level.value == "") {
			alert("Level Kosong");
			return;
		}
		_c.Level = level;
		key = _c.Key;
		_key.value = BufferShow(key);
	}
	
	function Run() {
		if (_text.value == "") alert("Data Kosong");
		else if (_level.value == "") alert("Level Kosong");
		else if (_key.value == "") alert("Key Kosong");
		else {
			data = encoder.encode(_text.value);
			level = parseInt(_level.value);
			key = fromHexString(_key.value);
			crypt.Key = key;
			time = performance.now();
			_c.Convert = data;
			_enc.value = `* ${data.length} bytes in ${performance.now()-time} ms.\n${BufferShow(data)}`;
			Crypt.Solve(key, level);
			_c.Key = key;
			_solve.innerHTML = BufferShow(key);
			time = performance.now();
			_c.Convert = data;
			_dec.value = `* ${data.length} bytes in ${performance.now()-time} ms.\n${BufferShow(data)}`;
		}
	}
	
	_gen.addEventListener("click", Generate);
	_run.addEventListener("click", Run);
	
}
