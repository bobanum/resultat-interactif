import Point from "./Point.js";

class Mag {
	CTRL = 1;
	SHIFT = 2;
	ALT = 4;
	META = 8;
	_dom = null;
	static aspect = 3 / 2;
	static width = 300;
	static zoom = 1;
	_ratios = null;
	content = null;
	subject = null;

	constructor(subject) {
		this.subject = subject;
		subject.mag = this;
	}

	get aspect() {
		return Mag.aspect;
	}
	set aspect(value) {
		Mag.aspect = value;
		this.ratio = null;
	}
	get width() {
		return Mag.width;
	}
	set width(value) {
		Mag.width = value;
		this.ratio = null;
	}
	get zoom() {
		return Mag.zoom;
	}
	set zoom(value) {
		Mag.zoom = value;
		this.ratio = null;
	}
	get ratios() {
		if (this._ratios === null) {
			var clientDom = Point.fromSize(this.dom, 'offset');
			this._ratios = Point.fromSize(this.content)
				.subtract(clientDom)
				.divide(Point.fromSize(this.subject)
					.subtract(clientDom)
				);
		}
		return this._ratios;
	}
	set ratios(value) {
		this._ratios = value;
	}
	get dom() {
		if (!this._dom) {
			this._dom = this.createDom();
		}
		return this._dom;
	}
	set dom(value) {
		this._dom = value;
	}
	evt = {
		wheel: (e) => {
			const rate = 1.15;
			if (e.ctrlKey) {
				e.preventDefault();
				if (e.deltaY > 0) {
					this.width *= rate;
				} else if (e.deltaY < 0) {
					this.width /= rate;
				}
				this.dom.style.setProperty('--width', this.width);
			}
			if (e.shiftKey) {
				e.preventDefault();
				if (e.deltaY > 0) {
					this.aspect *= rate;
				} else if (e.deltaY < 0) {
					this.aspect /= rate;
				}
				this.dom.style.setProperty('--aspect', this.aspect);
			}
		},
		enter: (e) => {
			this.subject.addEventListener('mouseleave', this.evt.leave);
			this.subject.addEventListener('mousemove', this.evt.move);
			this.subject.addEventListener('wheel', this.evt.wheel);
			this.evt.move(e);
		},
		leave: (e) => {
			this.subject.mag = null;
			this.dom.remove();
			this.subject.removeEventListener('mouseleave', this.evt.leave);
			this.subject.removeEventListener('mousemove', this.evt.move);
			this.subject.removeEventListener('wheel', this.evt.wheel);
		},
		move: (e) => {
			var dom = this.dom;
			var offset = Point.from(e, 'offset')
				.min(Point.fromSize(this.subject, 'offset').subtract(Point.fromSize(dom, 'offset').divide(2)).subtract(new Point(2,2)))
				.max(Point.fromSize(dom, 'client').divide(2))
				;
			offset.setProp(dom);
			var domClient = Point.fromSize(dom, 'offset')
				.divide(2)
				.subtract(offset)
				.multiply(this.ratios);
			domClient.setProp(this.content);
		}
	};
	createDom() {
		var clone = this.subject.cloneNode(true);
		var result = document.createElement('div');
		result.classList.add('mag');
		result.appendChild(clone);
		result.style.setProperty('--width', this.width);
		result.style.setProperty('--aspect', this.aspect);
		this.content = clone;
		return result;
	}
}

export { Mag as default, Mag };