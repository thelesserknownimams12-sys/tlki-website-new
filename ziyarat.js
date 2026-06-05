(function() {
  var overlay = document.createElement('div');
  overlay.className = 'ziyarat-overlay';
  overlay.id = 'ziyaratOverlay';
  overlay.innerHTML = '<div class="ziyarat-backdrop" id="ziyaratBackdrop"></div>'
    + '<div class="ziyarat-panel">'
    + '<div class="ziyarat-header">'
    + '<button class="ziyarat-close" id="ziyaratClose" aria-label="Close">&times;</button>'
    + '<div class="ziyarat-header-arabic">زِيَارَةُ ٱلْغَدِيرِ</div>'
    + '<div class="ziyarat-header-title">Ziyarat-e-Ghadir</div>'
    + '<div class="ziyarat-header-date">18th Zilhajj &mdash; Eid ul Ghadir</div>'
    + '</div>'
    + '<p class="ziyarat-intro">Through authoritative chains of narration, it is reported that Imam Ali ibn Muhammad al-Hadi (peace be upon him) recited this ziyarah at the holy tomb of Imam Ali Amir al-Mu\'minin (peace be upon him) on the day of Ghadir.</p>'
    + '<div class="ziyarat-body" id="ziyaratBody"><p style="color:var(--text-dim);text-align:center;padding:40px 0">Loading ziyarat...</p></div>'
    + '</div>';

  var trigger = document.createElement('button');
  trigger.className = 'ziyarat-trigger';
  trigger.id = 'ziyaratTrigger';
  trigger.innerHTML = '<span class="ziyarat-trigger-icon">&#x1F4DC;</span> Ziyarat-e-Ghadir';

  document.body.appendChild(trigger);
  document.body.appendChild(overlay);

  var isOpen = false;

  function openZiyarat() {
    isOpen = true;
    overlay.classList.add('ziyarat-open');
    document.body.style.overflow = 'hidden';
    loadContent();
  }

  function closeZiyarat() {
    isOpen = false;
    overlay.classList.remove('ziyarat-open');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', function() {
    if (isOpen) { closeZiyarat(); } else { openZiyarat(); }
  });

  document.getElementById('ziyaratClose').addEventListener('click', closeZiyarat);
  document.getElementById('ziyaratBackdrop').addEventListener('click', closeZiyarat);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) { closeZiyarat(); }
  });

  var contentLoaded = false;
  function loadContent() {
    if (contentLoaded) return;
    var body = document.getElementById('ziyaratBody');
    var basePath = '';
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('script.js') !== -1 || src.indexOf('hadiths-data') !== -1) {
        basePath = src.substring(0, src.lastIndexOf('/') + 1);
        break;
      }
    }
    var url = basePath + 'ziyarat-content.html';
    fetch(url).then(function(r) { return r.text(); }).then(function(html) {
      body.innerHTML = html;
      contentLoaded = true;
    }).catch(function() {
      body.innerHTML = '<p style="color:var(--red-soft);text-align:center;padding:40px 0">Could not load ziyarat content.</p>';
    });
  }

  setTimeout(function() { openZiyarat(); }, 300);
})();