class_name Crypt extends Object

var BIT:int = 16;
var KEY:PackedByteArray;
var HEX:PackedByteArray;
var Key:PackedByteArray:
	get:
		var hex := Array(HEX);
		hex.shuffle()
		HEX = hex.duplicate()
		setKey(BIT, KEY, HEX)
		return KEY.duplicate()
	set(value):
		if value and value.size() == KEY.size():
			KEY = value
			setHex(BIT, KEY, HEX)
		else : value = Key

func _init() -> void:
	KEY.resize(BIT / 2)
	HEX.resize(BIT)
	for i in BIT : HEX[i] = i

func setKey(bit:int, key:PackedByteArray, hex:PackedByteArray) -> void:
	for i in key.size():
		key[i] = bit * hex[i + i] + hex[i + i + 1]

func setHex(bit:int, key:PackedByteArray, hex:PackedByteArray) -> void:
	for i in key.size():
		hex[i + i + 1] = key[i] % bit
		hex[i + i] = (key[i] - hex[i + i + 1]) / bit

var Level:int:
	set(value):
		setHex(BIT, KEY, HEX)
		for i in value : Convert = KEY
		setHex(BIT, KEY, HEX)

var Convert:PackedByteArray:
	set(value):
		for ii in value.size():
			var tmp := PackedByteArray();
			for i in INF:
				if i > 0 : value[ii] = (value[ii] - tmp[tmp.size() - 1]) / BIT
				if value[ii] >= BIT : tmp.append(value[ii] % BIT)
				else:
					tmp.append(value[ii])
					value[ii] = 0
					break
			if tmp.size() == 1 : tmp.append(0)
			for i in tmp.size():
				value[ii] += int(HEX[tmp[i]] * pow(BIT, i))

func Solve(key:PackedByteArray, level:int) -> void:
	var key1 := key.duplicate();
	var hex1 := PackedByteArray();
	var hex2 := PackedByteArray();
	hex1.resize(BIT)
	hex2.resize(BIT)
	setHex(BIT, key1, hex1)
	for ii in BIT:
		for iii in BIT:
			if hex1[iii] == ii : hex2[ii] = iii
	setKey(BIT, key, hex2)
	setHex(BIT, key, HEX)
	for i in level : Convert = key
