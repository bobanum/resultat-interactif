import Mag from "./Mag.js";

class Toolbar {
	_dom = null;
	type = "button";	// radio, checkbox, button
	defaultSelected = 0;
	constructor(name, content, label = null) {
		this.name = name;
		this.content = content;
		this.label = label;
	}
	get dom() {
		if (!this._dom) {
			this._dom = this.domCreate();
		}
		return this._dom;
	}

	
	domCreate() {
		var result = document.createElement("fieldset");
		result.classList.add('toolbar', `toolbar-type-${this.type}`, `toolbar-${this.name}`);
		if (this.label) {
			var label = result.appendChild(document.createElement("legend"));
			label.appendChild(document.createTextNode(this.label));
		}
		this.content.forEach((item, i) => {
			if (item instanceof HTMLElement) {
				var btn = result.appendChild(item);
				return;
			}
			if (item instanceof Toolbar) {
				var btn = result.appendChild(item.dom);
				return;
			}
			if (this.type == "radio") {
				var btn = result.appendChild(this.toolbarRadio(this.name, item.icon, item.value, item.label));
				if (i === this.defaultSelected) {
					btn.querySelector("input").checked = true;
				}
				return;
			}
			if (this.type == "checkbox") {
				var btn = result.appendChild(this.toolbarRadio(this.name, item.icon, item.value, item.label));
				return;
			}
		});

		return result;
	}
	static toolbarRadio(name, icon, value) {
		var result = document.createElement("label");
		var input = result.appendChild(document.createElement("input"));
		input.type = "radio";
		input.name = name;
		input.value = value;
		var span = result.appendChild(document.createElement("span"));
		span.appendChild(document.createTextNode(icon));
		return result;
	}
	static toolbarButton(icon) {
		var result = document.createElement("label");
		var span = result.appendChild(document.createElement("span"));
		span.appendChild(document.createTextNode(icon));
		return result;
	}
	toolbarRadio = Toolbar.toolbarRadio;
	toolbarButton = Toolbar.toolbarButton;
	
}

export { Toolbar as default, Toolbar };