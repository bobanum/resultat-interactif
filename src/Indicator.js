import Svg from "./Svg.js";

class Indicator extends Svg{
	constructor() {
		this.box = {
			top: 0,
			left: 0,
			width: 0,
			height: 0
		};
	}
	get top() {
		return this.box.top;
	}
	set top(value) {
		this.box.top = value;
	}
	get left() {
		return this.box.left;
	}
	set left(value) {
		this.box.left = value;
	}
	get width() {
		return this.box.width;
	}
	set width(value) {
		this.box.width = value;
	}
	get height() {
		return this.box.height;
	}
	set height(value) {
		this.box.height = value;
	}
	get x() {
		return this.box.left;
	}
	set x(value) {
		this.box.left = value;
	}
	get y() {
		return this.box.top;
	}
	set y(value) {
		this.box.top = value;
	}
	get right() {
		return this.box.left + this.box.width;
	}
	set right(value) {
		this.box.width = value - this.box.left;
	}
	get bottom() {
		return this.box.top + this.box.height;
	}
	set bottom(value) {
		this.box.height = value - this.box.top;
	}
	get diagonal() {
		return Math.sqrt(this.box.width * this.box.width + this.box.height * this.box.height);
	}
}
export {Indicator as default, Indicator};