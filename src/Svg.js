class Svg {
	constructor() {
		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	}
	createElement(name, attributes) {
		var result = document.createElementNS('http://www.w3.org/2000/svg', name);
		for (var key in attributes) {
			result.setAttribute(key, attributes[key]);
		}
		return result;
	}
}
export { Svg, Svg as default};