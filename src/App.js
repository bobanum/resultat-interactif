class App {
	static CTRL = 1;
	static SHIFT = 2;
	static ALT = 4;
	static META = 8;
	static selecteurDomaine = '.resultat, #resultat';
	static selecteurSection = 'section';

	static main(domaine) {
		var resultat = domaine || document.querySelector(this.selecteurDomaine);
		var apercu = resultat.appendChild(this.apercu(resultat));
		var controles = resultat.appendChild(this.controles());
		var aide = resultat.appendChild(this.aide());
		var ul = controles.appendChild(document.createElement('ul'));
		var sections = [...document.querySelectorAll(this.selecteurSection)];
		sections.reverse();
		sections.forEach((section) => {
			var li = ul.appendChild(document.createElement('li'));
			var titre = section.title;
			var entete = li.appendChild(document.createElement('h2'));
			entete.textContent = titre;
			var bouton = entete.appendChild(document.createElement('button'));
			bouton.textContent = '👻︎';
			bouton.type = 'button';
			bouton.addEventListener('click', (e) => {
				e.currentTarget.classList.toggle('fantome');
				section.classList.toggle('fantome');
			});
			var bouton = entete.appendChild(document.createElement('button'));
			bouton.textContent = '🔄︎';
			bouton.type = 'button';
			bouton.addEventListener('click', (e) => {
				[...ul2.children].forEach((li) => {
					this.toggle(li);
				});
			});
			var ul2 = li.appendChild(document.createElement('ul'));
			var images = [...section.querySelectorAll('img')];
			images.reverse();
			images.forEach((image) => {
				var label = image.alt;
				var li = ul2.appendChild(document.createElement('li'));
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
			});
		});
	}
	static titre(texte = 'Titre') {
		var resultat = document.createElement('h1');
		resultat.textContent = texte;
		return resultat;
	}
	static controles() {
		var resultat = document.createElement('div');
		resultat.classList.add('controles');
		return resultat;
	}
	static aide() {
		var resultat = document.createElement('div');
		resultat.classList.add('aide');
		resultat.innerHTML = `
		<p><kbd>shift-clic</kbd> Masquer les autres</p>
		<p><kbd>ctrl-clic</kbd> Masquer / Afficher tout</p>
		<p><kbd>👻︎</kbd> Section semi-transparente</p>
		`;
		return resultat;
	}
	static apercu(conteneur) {
		var resultat = document.createElement('div');
		resultat.classList.add('apercu');
		while (conteneur.firstChild) {
			resultat.appendChild(conteneur.firstChild);
		}
		return resultat;
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