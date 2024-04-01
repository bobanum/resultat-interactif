import Mag from "./Mag.js";
import Preview from "./Preview.js";
import Toolbar from "./Toolbar.js";

class App {
	static CTRL = 1;
	static SHIFT = 2;
	static ALT = 4;
	static META = 8;
	static selector_domain = '#app, .result, #result';
	static selector_section = 'section';
	static _aspect = 3 / 2;
	static width = 300;
	static mag = null;
	static preview = null;
	static zoom = 1;


	static main(domain) {
		if (typeof domain === 'string') {
			domain = document.querySelector(domain);
		}
		var result = domain || document.querySelector(this.selector_domain);
		this.preview = new Preview(result);
		console.log(controls);
		result.appendChild(this.preview.dom);
		var controls = result.appendChild(this.controls());
		var help = result.appendChild(this.help());
	}


	static btnGhost(section) {
		var result = document.createElement('button');
		result.textContent = '👻︎';
		result.type = 'button';
		if (section.classList.contains('ghost1')) {
			result.classList.add('ghost1');
		}
		if (section.classList.contains('ghost2')) {
			result.classList.add('ghost2');
		}
		result.addEventListener('click', (e) => {
			if (e.currentTarget.classList.contains('ghost1')) {
				e.currentTarget.classList.remove('ghost1');
				e.currentTarget.classList.add('ghost2');
				section.classList.remove('ghost1');
				section.classList.add('ghost2');
			} else if (e.currentTarget.classList.contains('ghost2')) {
				e.currentTarget.classList.remove('ghost2');
				section.classList.remove('ghost2');
			} else {
				e.currentTarget.classList.add('ghost1');
				section.classList.add('ghost1');
			}
		});
		return result;
	}
	static btnInverse() {
		var result = document.createElement('button');
		result.textContent = '🔄︎';
		result.type = 'button';
		result.addEventListener('click', (e) => {
			[...e.currentTarget.closest('li').querySelectorAll(":scope>ul>li")].forEach((li) => {
				console.log(li);
				this.toggle(li);
			});
		}); return result;
	}
	static title(texte = 'Title') {
		var result = document.createElement('h1');
		result.textContent = texte;
		return result;
	}
	static controls() {
		var result = document.createElement('div');
		result.id = 'controls';
		result.appendChild(this.toolbar().dom);
		var ul = result.appendChild(document.createElement('ul'));
		var sections = [...document.querySelectorAll(this.selector_section)];
		sections.reverse();
		sections.forEach((section) => {
			ul.appendChild(this.dom_section(section));
		});
		return result;
	}
	static dom_section(section) {
		var result = document.createElement('li');
		var title = section.title;
		section.removeAttribute('title');
		var entete = result.appendChild(document.createElement('h2'));
		entete.textContent = title;
		entete.appendChild(this.btnGhost(section));
		entete.appendChild(this.btnInverse());
		var ul = result.appendChild(document.createElement('ul'));
		var images = [...section.querySelectorAll('img')];
		images.reverse();
		images.forEach((image) => {
			ul.appendChild(this.dom_image(image));
		});
		return result;
	}
	static dom_image(image) {
		var result = document.createElement('li');
		var label = image.alt;
		result.textContent = label || image.getAttribute('src');
		result.reference = image;
		// li.dataset.src = image.getAttribute('src');
		if (image.classList.contains('active')) {
			result.classList.add('active');
		}
		result.addEventListener('click', (e) => {
			if (e.ctrlKey) {
				this.evt.ctrlClick(e);
			} else if (e.shiftKey) {
				this.evt.shiftClick(e);
			} else if (e.altKey) {
				this.evt.altClick(e);
			} else {
				this.evt.click(e);
			}
		});
		return result;
	}
	static toolbar() {
		var btnHelp = Toolbar.toolbarButton("");
		btnHelp.classList.add("btn-help");
		// btnHelp.tabIndex = 1;
		btnHelp.htmlFor = 'help';
		// btnHelp.appendChild(this.help());
		btnHelp.addEventListener('click', (e) => {
			console.log(document.getElementById('help'));
			document.getElementById('help').focus();
		});
		var result = new Toolbar('app', [
			btnHelp,
			this.preview.toolbar(),
		]);
		return result;
	}
	static help() {
		var result = document.createElement('div');
		result.classList.add('help');
		result.id = 'help';
		result.tabIndex = 1;
		result.innerHTML = `
		<div>
		<p><kbd>shift-clic</kbd> Masquer les autres</p>
		<p><kbd>ctrl-clic</kbd> Masquer / Afficher tout</p>
		<p><kbd>👻︎</kbd> Section semi-transparente</p>
		</div>
		`;
		return result;
	}

	static createPreview(conteneur) {
		var result = document.createElement('div');
		result.classList.add('preview');
		while (conteneur.firstChild) {
			result.appendChild(conteneur.firstChild);
		}

		result.addEventListener('mouseenter', (e) => {
			if (!result.mag) {
				var mag = new Mag(result);

				result.appendChild(mag.dom);
				mag.evt.enter(e);
			}
		});

		return result;
	}
	static toggle(li, etat) {
		li.classList.toggle('active', etat);
		li.reference.classList.toggle('active', etat);
		return this;
	}
	static evt = {
		click: (e) => {
			this.toggle(e.currentTarget);
		},
		ctrlClick: (e) => {
			var etat = e.currentTarget.classList.contains('active');
			console.log(e.currentTarget.closest('ul').children);
			[...e.currentTarget.closest('ul').children].forEach((li) => {
				this.toggle(li, !etat);
			});
		},
		shiftClick: (e) => {
			console.log('shift');
			var ul = e.currentTarget.closest('ul');
			if (e.currentTarget.classList.contains('active') && ul.querySelectorAll(':scope>.active').length === 1) {
				// Reverse
				[...ul.children].forEach((li) => {
					this.toggle(li);
				});
				return;
			}

			[...ul.children].forEach((li) => {
				this.toggle(li, false);
			});
			this.toggle(e.currentTarget);
		},
		altClick: (e) => {
			[...e.currentTarget.closest('ul').children].forEach((li) => {
				li.classList.remove('active');
			});
			e.currentTarget.classList.toggle('active');
			var image = document.querySelector(`img[src="${e.currentTarget.dataset.src}"]`);
			image.classList.toggle('active');
		},
	};

}

export { App as default, App };