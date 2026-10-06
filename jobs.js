/* Renders AGO_JOBS (jobs-data.js) into #ago-opp-grid. No content lives here. */
(function () {
  var D = window.AGO_JOBS, grid = document.getElementById('ago-opp-grid');
  if (!D || !grid) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function posted(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return '';
    var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[2] - 1];
    return 'Posted ' + mo + ' ' + (+m[3]);
  }
  var jobs = (D.jobs || []).filter(function (j) { return j.active !== false; })
    .sort(function (a, b) { return (b.posted || '').localeCompare(a.posted || ''); });
  if (!jobs.length) { grid.innerHTML = '<p class="ago-opp-empty">New roles will appear here as they come in through our network.</p>'; return; }
  grid.innerHTML = jobs.map(function (j, i) {
    var c = (D.certifications || {})[j.cert] || D.certifications['none'];
    return '<div class="ago-opp-card">' + (j.sample ? '<span class="ago-opp-ribbon">Sample</span>' : '') +
      '<div class="ago-opp-meta">' + esc(j.type) + ' &middot; ' + esc(j.location) + '</div>' +
      '<div class="ago-opp-title">' + esc(j.title) + '</div>' +
      '<div class="ago-opp-client">' + esc(j.client) + '</div>' +
      '<div><span class="ago-cert ago-cert-' + esc(c.tone) + '">' + esc(c.label) + '</span></div>' +
      '<p class="ago-opp-sum">' + esc(j.summary) + '</p>' +
      '<div class="ago-opp-foot"><span>' + esc(j.rate) + '</span><span>' + esc(posted(j.posted)) + '</span></div>' +
      '<button type="button" class="ago-opp-cta" data-i="' + i + '">Request Referral &rarr;</button></div>';
  }).join('');
  grid.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.ago-opp-cta'); if (!b) return;
    var j = jobs[+b.getAttribute('data-i')];
    openReferralModal(j.title + ' — ' + String(j.client).replace(/\s*·\s*/, ' (') + (/·/.test(j.client) ? ')' : ''));
  });
})();
