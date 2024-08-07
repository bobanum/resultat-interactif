class App {
	static CTRL = 1;
	static SHIFT = 2;
	static ALT = 4;
	static META = 8;
	static selector_domain = '#app, .result, #result';
	static selector_section = 'section';

	static main(domain) {
		if (typeof domain === 'string') {
			domain = document.querySelector(domain);
		}
		var result = domain || document.querySelector(this.selector_domain);
		var preview = result.appendChild(this.preview(result));
		var controls = result.appendChild(this.controls());
		var ul = controls.appendChild(document.createElement('ul'));
		var sections = [...document.querySelectorAll(this.selector_section)];
		// sections.reverse();
		sections.forEach((section) => {
			var li = ul.appendChild(document.createElement('li'));
			var titre = section.title;
			section.removeAttribute('title');
			if (section.classList.contains('radio')) {
				li.classList.add('radio');
			}
			var entete = li.appendChild(document.createElement('h2'));
			entete.textContent = titre;
			entete.appendChild(this.btnGhost(section));
			entete.appendChild(this.btnInverse());
			var ul2 = li.appendChild(document.createElement('ul'));
			var images = [...section.querySelectorAll('img')];
			// images.reverse();
			images.forEach((image) => {
				var label = image.alt;
				var li = ul2.appendChild(document.createElement('li'));
				li.textContent = label || image.getAttribute('src');
				li.reference = image;
				// li.dataset.src = image.getAttribute('src');
				if (image.classList.contains('active')) {
					li.classList.add('active');
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
			});
		});
		// var help = result.appendChild(this.help());
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
	static titre(texte = 'Titre') {
		var result = document.createElement('h1');
		result.textContent = texte;
		return result;
	}
	static controls() {
		var result = document.createElement('div');
		result.classList.add('controls');
		return result;
	}
	static help() {
		var result = document.createElement('div');
		result.classList.add('help');
		result.innerHTML = `
		<p><kbd>shift-clic</kbd> Masquer les autres</p>
		<p><kbd>ctrl-clic</kbd> Masquer / Afficher tout</p>
		<p><kbd>👻︎</kbd> Section semi-transparente</p>
		`;
		return result;
	}
	static preview(conteneur) {
		var result = document.createElement('div');
		result.classList.add('preview');
		while (conteneur.firstChild) {
			result.appendChild(conteneur.firstChild);
		}
		var mag, ratios, ratio, offsetLeft, offsetTop, aspect = 4 / 2;
		
		const evt = {
			enter: (e) => {
				if (!mag) {
					mag = result.appendChild(this.mag(result, aspect));
					ratios = {
						x: mag.content.clientWidth / result.clientWidth,
						y: mag.content.clientHeight / result.clientHeight
					};
					ratio = Math.max(ratios.x, ratios.y);
					result.addEventListener('mouseleave', evt.leave);
					result.addEventListener('mousemove', evt.move);
					({offsetLeft, offsetTop} = result.querySelector('img'));
					
					evt.move(e);
				}
			},
			leave: (e) => {
				if (mag) {
					mag.remove();
					mag = null;
				}
				result.removeEventListener('mouseleave', evt.leave);
				result.removeEventListener('mousemove', evt.move);
			},
			move: (e) => {
				mag.style.left = e.layerX + 'px';
				mag.style.top = e.layerY + 'px';
				mag.content.style.left = (-e.layerX)*ratio + mag.offsetWidth/2 + 'px';
				mag.content.style.top = (-e.layerY)*ratio + mag.offsetHeight/2 + 'px';
			}
		};
		result.addEventListener('mouseenter', evt.enter);

		return result;
	}
	static mag(content, aspect = .5) {
		var clone = content.cloneNode(true);
		var result = document.createElement('div');
		result.classList.add('mag');
		result.appendChild(clone);
		result.content = clone;
		var width = Math.max(250, Math.min(450, content.clientWidth / 4));
		result.style.setProperty('--width', width);
		result.style.setProperty('--aspect', aspect);
		return result;
	}
	static toggle(li, etat, radio = false) {
		if (radio) {
			li.parentNode.querySelectorAll('.active').forEach((li) => {
				this.toggle(li, false);
			});
		}
		li.classList.toggle('active', etat);
		li.reference.classList.toggle('active', etat);
		return this;
	}
	static evt = {
		click: (e) => {
			this.toggle(e.currentTarget, undefined, !!e.currentTarget.closest(".radio"));
		},
		ctrlClick: (e) => {
			var etat = e.currentTarget.classList.contains('active');
			[...e.currentTarget.closest('ul').children].forEach((li) => {
				this.toggle(li, !etat);
			});
		},
		shiftClick: (e) => {
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