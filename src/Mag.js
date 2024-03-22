class Mag {
	CTRL = 1;
	SHIFT = 2;
	ALT = 4;
	META = 8;
	_dom = null;
	_aspect = 3 / 2;
	_width = 300;
	_zoom = 1;
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
	}
	get width() {
		return this._width;
	}
	set width(value) {
		this._width = value;
	}
	get mag() {
		return this._mag;
	}
	set mag(value) {
		this._mag = value;
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
	getRatio() {
		var ratios = {
			x: (this.content.clientWidth - this.dom.clientWidth / 2) / this.subject.clientWidth - this.dom.clientWidth,
			y: (this.content.clientHeight - this.dom.clientHeight / 2) / (this.subject.clientHeight - this.dom.clientHeight)
		};
		return Math.max(ratios.x, ratios.y);
	}
	createPreview(conteneur) {
		var result = document.createElement('div');
		result.classList.add('preview');
		while (conteneur.firstChild) {
			result.appendChild(conteneur.firstChild);
		}

		result.addEventListener('mouseenter', evt.enter);
		
		return result;
	}
	evt = {
		wheel: (e) => {
			if (e.ctrlKey) {
				e.preventDefault();
				if (e.deltaY > 0) {
					this.width *= 1.15;
				} else if (e.deltaY < 0) {
					this.width /= 1.15;
				}
				this.dom.style.setProperty('--width', this.width);
			}
			if (e.shiftKey) {
				e.preventDefault();
				if (e.deltaY > 0) {
					this.aspect *= 1.15;
				} else if (e.deltaY < 0) {
					this.aspect /= 1.15;
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
			dom.style.left = e.offsetX + 'px';
			dom.style.top = e.offsetY + 'px';

			this.content.style.left = (dom.offsetWidth / 2 - e.offsetX) * this.ratio + 'px';
			this.content.style.top = (dom.offsetHeight / 2 - e.offsetY) * this.ratio + 'px';
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