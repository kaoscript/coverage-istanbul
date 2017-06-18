import './_float.ks'
import './_number.ks'

extern {
	console: {
		log(...args)
	}
}

func alpha(n?, percentage = false): Number {
	let i: Number = Float.parse(n)
	
	return 1 if i is NaN else (percentage ? i / 100 : i).limit(0, 1).round(3)
}