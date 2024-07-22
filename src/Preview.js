import Mag from "./Mag.js";
import Toolbar from "./Toolbar.js";

class Preview {
	CTRL = 1;
	SHIFT = 2;
	ALT = 4;
	META = 8;
	selector_domain = '#app, .result, #result';
	selector_section = 'section';
	_aspect = 3 / 2;
	_dom = null;
	width = 300;
	mag = null;
	preview = null;
	zoom = 1;
	constructor(content) {
		this.content = content;
	}
	get dom() {
		if (!this._dom) {
			this._dom = this.domCreate();
		}
		return this._dom;
	}

	
	toolbar() {
		var result = new Toolbar("display-size", [
			{ icon: "B", value: "full", label: "Plein-écran" },
			{ icon: "C", value: "width", label: "Largeur" },
			// { icon: "A", value: "one", label: "Un pour un" },
		]);
		result.type = "radio";
		console.log(result.dom);
		return result.dom;
	}
	
	domCreate() {
		var content = this.content;
		var result = document.createElement('div');
		result.classList.add('preview');
		// var toolbar = result.appendChild(this.toolbar());
		var divContent = result.appendChild(document.createElement('div'));
		divContent.classList.add('content');
		while (content.firstChild) {
			divContent.appendChild(content.firstChild);
		}

		result.addEventListener('mouseenter', (e) => {
			if (!result.mag) {
				var mag = new Mag(result);

				result.appendChild(mag.dom);
				mag.evt.enter(e);
			}
		});
		result.obj = this;
		return result;
	}
}

export { Preview as default, Preview };