class App {
	static CTRL = 1;
	static SHIFT = 2;
	static ALT = 4;
	static META = 8;
	static selecteurDomain = '.result, #result';
	static selecteurSection = 'section';
	static xsltFilePath = '../src/Indicator.xsl';

	static main(domain) {
		const naturalSize = this.getNaturalSize(domain);
		this.loadXSLT(naturalSize).then(xsltProcessor => {
			this.xsltProcessor = xsltProcessor;
			var defs = this.xsltProcessor.transformToFragment(document.body, document);
			document.body.appendChild(defs.firstChild);
			this.processDomain(domain);
		});
	}
	static async loadXSLT(params = {}) {
		var xsltString = await fetch(this.xsltFilePath).then(response => response.text());
		var processor = new XSLTProcessor();
		for (const [key, value] of Object.entries(params)) {
			processor.setParameter(null, key, value);
		}
		var xslt = new DOMParser().parseFromString(xsltString, "text/xml");
		processor.importStylesheet(xslt);
		return processor;
	}
	static getNaturalSize(domain) {
		domain = domain || document.querySelector(this.selecteurDomain);
		var baseImage = domain.querySelector('img');
		return {width: baseImage.naturalWidth, height: baseImage.naturalHeight};
	}
	static processDomain(domain) {
		var result = domain || document.querySelector(this.selecteurDomain);
		var apercu = result.appendChild(this.apercu(result));
		var controles = result.appendChild(this.controles());
		var aide = result.appendChild(this.aide());
		var ul = controles.appendChild(document.createElement('ul'));
		var sections = [...document.querySelectorAll(this.selecteurSection)];
		sections.reverse();
		sections.forEach((section) => {
			var li = ul.appendChild(this.liSection(section));
		});
	}
	static liSection(section) {
		var li = document.createElement('li');
		var titre = section.title;
		var entete = li.appendChild(document.createElement('h2'));
		entete.textContent = titre;
		entete.appendChild(this.boutonFantome(section));
		entete.appendChild(this.boutonInverser());
		var ul = li.appendChild(document.createElement('ul'));
		var children = [...section.children];
		children.reverse();
		children.forEach((child) => {
			if (child.nodeName === 'IMG') {
				ul.appendChild(this.liImage(child));
			} else if (child.nodeName === 'LAYER') {
				this.svgLayer(child).then(li => child.replaceWith(li));
			}
		});
		return li;
	}
	static liImage(image) {
		var label = image.alt;
		var li = document.createElement('li');
		li.textContent = label || image.getAttribute('src');
		li.reference = image;
		// li.dataset.src = image.getAttribute('src');
		if (image.classList.contains('actif')) {
			li.classList.add('actif');
		}
		li.addEventListener('click', (e) => {
			var modifiers = e.shiftKey * this.SHIFT + e.ctrlKey * this.CTRL + e.altKey * this.ALT + e.metaKey * this.META;
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
		return li;
	}
	static async svgLayer(layer) {
		var result = this.xsltProcessor.transformToFragment(layer, document).firstChild;
		return result;
	}
	static boutonFantome(section) {
		var result = document.createElement('button');
		result.textContent = '👻︎';
		result.type = 'button';
		if (section.classList.contains('fantome1')) {
			result.classList.add('fantome1');
		}
		if (section.classList.contains('fantome2')) {
			result.classList.add('fantome2');
		}
		result.addEventListener('click', (e) => {
			if (e.currentTarget.classList.contains('fantome1')) {
				e.currentTarget.classList.remove('fantome1');
				e.currentTarget.classList.add('fantome2');
				section.classList.remove('fantome1');
				section.classList.add('fantome2');
			} else if (e.currentTarget.classList.contains('fantome2')) {
				e.currentTarget.classList.remove('fantome2');
				section.classList.remove('fantome2');
			} else {
				e.currentTarget.classList.add('fantome1');
				section.classList.add('fantome1');
			}
		});
		return result;
	}
	static boutonInverser() {
		var result = document.createElement('button');
		result.textContent = '🔄︎';
		result.type = 'button';
		result.addEventListener('click', (e) => {
			[...e.currentTarget.closest('li').querySelectorAll(":scope>ul>li")].forEach((li) => {
				// console.log(li);
				this.toggle(li);
			});
		}); return result;
	}
	static titre(texte = 'Titre') {
		var result = document.createElement('h1');
		result.textContent = texte;
		return result;
	}
	static controles() {
		var result = document.createElement('div');
		result.classList.add('controles');
		return result;
	}
	static aide() {
		var result = document.createElement('div');
		result.classList.add('aide');
		result.innerHTML = `
		<p><kbd>shift-clic</kbd> Masquer les autres</p>
		<p><kbd>ctrl-clic</kbd> Masquer / Afficher tout</p>
		<p><kbd>👻︎</kbd> Section semi-transparente</p>
		`;
		return result;
	}
	static apercu(conteneur) {
		var result = document.createElement('div');
		result.classList.add('apercu');
		while (conteneur.firstChild) {
			result.appendChild(conteneur.firstChild);
		}
		return result;
	}
	static toggle(li, etat) {
		li.classList.toggle('actif', etat);
		li.reference.classList.toggle('actif', etat);
		return this;
	}
	static evt = {
		click: (e) => {
			this.toggle(e.currentTarget);
		},
		ctrlClick: (e) => {
			var etat = e.currentTarget.classList.contains('actif');
			console.log(e.currentTarget.closest('ul').children);
			[...e.currentTarget.closest('ul').children].forEach((li) => {
				this.toggle(li, !etat);
			});
		},
		shiftClick: (e) => {
			console.log('shift');
			var ul = e.currentTarget.closest('ul');
			if (e.currentTarget.classList.contains('actif') && ul.querySelectorAll(':scope>.actif').length === 1) {
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
				li.classList.remove('actif');
			});
			e.currentTarget.classList.toggle('actif');
			var image = document.querySelector(`img[src="${e.currentTarget.dataset.src}"]`);
			image.classList.toggle('actif');
		},
	};
}

export { App as default, App };