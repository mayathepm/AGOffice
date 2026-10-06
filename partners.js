(function () {
  var P = window.AGO_PARTNERS, g = document.getElementById('ago-pt-grid'); if (!P || !g) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  g.innerHTML = P.map(function (p) {
    var art = p.logo ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.name) + '">' : '<span>' + esc(p.name) + '</span>';
    return '<div class="ago-pt-card"><div class="ago-pt-logo">' + art + '</div>' +
      '<div class="ago-pt-body"><div class="ago-pt-focus">' + esc(p.focus) + '</div>' +
      (p.logo ? '<div class="ago-pt-name">' + esc(p.name) + '</div>' : '') +
      '<p class="ago-pt-desc">' + esc(p.description) + '</p>' +
      '<a class="ago-pt-link" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Visit website &rarr;</a></div></div>';
  }).join('');
})();
