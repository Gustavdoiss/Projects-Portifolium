const extensions    = document.querySelector('.extensions');
const themeButton   = document.querySelector('.theme-switcher');
const logo          = document.querySelector('.logo');
const filters = {
    all:        document.querySelector('.allFilt'),
    active:     document.querySelector('.activeFilt'),
    inactive:   document.querySelector('.inactiveFilt')
};

filters.all.classList.add('active');

function activateFilt(filter) {
  for (const filt of Object.values(filters)) {
    if (filt === filter) {
      filt.classList.add('active');
    }else {
      filt.classList.remove('active');
    }
  }
}

function filtrarExts(cards) {
    filters.active.addEventListener('click', function (){
      activateFilt(filters.active);
      for (const card of cards) {
        if (card.dataset.active === "true") {
          card.classList.remove('hidden');
        }else {
          card.classList.add('hidden');
        }
      }
    })

    filters.inactive.addEventListener('click', function (){
      activateFilt(filters.inactive);
      for (const card of cards) {
        if (card.dataset.active === "true") {
          card.classList.add('hidden');
        }else {
          card.classList.remove('hidden');
        }
      }
    })

    filters.all.addEventListener('click', function () {
      activateFilt(filters.all);
      for (const card of cards) {
        card.classList.remove('hidden');
      }
    })
}

function toggleExts(cards) {
  for (const card of cards) {
    const toggleButton = card.querySelector('.extToggle');
    toggleButton.addEventListener('change', function() {
      if (toggleButton.checked) {
        card.dataset.active = "true";
      }else {
        card.dataset.active = "false";
      }
    })
  }
}

function removerExts(cards) {
  for (const card of cards) {
    const removeButton = card.querySelector('.extRemove');
    removeButton.addEventListener('click', function() {
      card.remove();
    })
  }
}

function toggleTheme() {
  themeButton.addEventListener('click', function() {
    document.body.classList.toggle('light');
    logo.src = document.body.classList.contains('light') ? "./assets/images/logo-light.svg" : "./assets/images/logo-dark.svg";
    themeButton.querySelector('img').src = document.body.classList.contains('light') ? "./assets/images/icon-moon.svg" : "./assets/images/icon-sun.svg";
  })
}

function buscarExts() {
    fetch('data.json')
        .then(resposta => resposta.json())
        .then(dados => {
            for(const extObj of dados) {
                const ext = document.createElement('article');
                ext.classList.add('card');
                ext.dataset.active = extObj.isActive;
                ext.innerHTML = `
                    <div class="info">

                      <div class="extLogo">
                        <img src="${extObj.logo}" alt="logo-${extObj.name}">
                      </div>

                      <div class="extInfo">
                        <h3 class="extName">
                          ${extObj.name}
                        </h3>
                        <p class="extDesc">
                          ${extObj.description}
                        </p>
                      </div>

                    </div>

                    <div class="extButtons">
                      <button class="extRemove">Remove</button>
                      <label class="toggle">
                        <input class="extToggle" type="checkbox" aria-label="toggle-ext" ${extObj.isActive ? "checked" : ''}>
                      </label>
                    </div>
                `;
                extensions.append(ext);
            };

            const extCards = document.querySelectorAll('.card');

            filtrarExts(extCards);
            toggleExts (extCards);
            removerExts(extCards);
        })
}

buscarExts();
toggleTheme();


