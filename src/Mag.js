class Mag {
	CTRL = 1;
	SHIFT = 2;
	ALT = 4;
	META = 8;
	_dom = null;
	_aspect = 3 / 2;
	_width = 300;
	_zoom = 1;
	_ratio = null;
	content = null;
	subject = null;

	constructor(subject) {
		this.subject = subject;
		subject.mag = this;
	}

	get aspect() {
		return this._aspect;
	}
	set aspect(value) {
		this._aspect = value;
		this.ratio = null;
	}
	get width() {
		return this._width;
	}
	set width(value) {
		this._width = value;
		this.ratio = null;
	}
	get ratio() {
		if (this._ratio === null) {
			const ratios = [
					(this.content.clientWidth - this.dom.clientWidth) / (this.subject.clientWidth),
					(this.content.clientHeight - this.dom.clientHeight) / (this.subject.clientHeight)
					// (this.content.clientWidth - this.dom.clientWidth) / this.subject.clientWidth - this.dom.clientWidth,
					// (this.content.clientHeight - this.dom.clientHeight) / (this.subject.clientHeight - this.dom.clientHeight)
			];
			this._ratio = Math.max(...ratios);
			console.log("ratios", ratios, this);
		}
		return this._ratio;
	}
	set ratio(value) {
		this._ratio = value;
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
			console.log("subject", this.subject.getBoundingClientRect());
			console.log("dom", this.dom.getBoundingClientRect());
			console.log("content", this.content.getBoundingClientRect());
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
			dom.style.left = e.offsetX + 'px';
			dom.style.top = e.offsetY + 'px';
			console.log(this.ratio, e.offsetX, e.offsetY, e.layerX, e.layerY);
			// this.content.style.left = 0 + 'px';
			// this.content.style.top = 0 + 'px';
			this.content.style.left = (dom.clientWidth / 2 - e.offsetX)*this.ratio + 'px';
			this.content.style.top = (dom.clientHeight / 2 - e.offsetY)*this.ratio+100 + 'px';
			// this.content.style.left = (dom.clientWidth / 2 - e.offsetX) * this.ratio + 'px';
			// this.content.style.top = (dom.clientHeight / 2 - e.offsetY) * this.ratio + 'px';
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