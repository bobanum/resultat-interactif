class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	static from(input, prop = null) {
		if (input instanceof Point) {
			return new Point(input.x, input.y);
		}
		if (input instanceof Array) {
			return new Point(input[0], input[1]);
		}
		if (prop && input[`${prop}X`] !== undefined) {
			return new Point(input[`${prop}X`], input[`${prop}Y`]);
		}
		if (prop && input[`${prop}Left`] !== undefined) {
			return new Point(input[`${prop}Left`], input[`${prop}Top`]);
		}
		return new Point(input.x, input.y);
	}
	static fromSize(input, prop = "client") {
		if (input[`${prop}Width`] !== undefined) {
			return new Point(input[`${prop}Width`], input[`${prop}Height`]);
		}
	}
	static fromEnd(input, prop = "client") {
		if (input[`${prop}Right`] !== undefined) {
			return new Point(input[`${prop}Right`], input[`${prop}Bottom`]);
		}
	}
	setProp(object, prop = "", unit = "px") {
		if (!prop) {
			object.style.left = this.x + unit;
			object.style.top = this.y + unit;
			return this;
		}
		object.style[`${prop}Left`] = this.x + unit;
		object.style[`${prop}Right`] = this.y + unit;
		return this;
	}
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	add(point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	}
	subtract(point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	}
	multiply(x, y) {
		if (x instanceof Point) {
			y = x.y;
			x = x.x;
		}
		if (y === undefined) {
			y = x;
		}
		this.x *= x;
		this.y *= y;
		return this;
	}
	divide(x, y) {
		if (x instanceof Point) {
			y = x.y;
			x = x.x;
		}
		if (y === undefined) {
			y = x;
		}
		this.x /= x;
		this.y /= y;
		return this;
	}
	clone() {
		return new Point(this.x, this.y);
	}
	min(point) {
		this.x = Math.min(this.x, point.x);
		this.y = Math.min(this.y, point.y);
		return this;
	}
	max(point) {
		this.x = Math.max(this.x, point.x);
		this.y = Math.max(this.y, point.y);
		return this;
	}
}
export { Point, Point as default };