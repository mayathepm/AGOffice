/* =====================================================================
   AGOffice™ BLOG — RENDERING
   Reads window.BLOG (blog-data.js) and draws the index and post pages.
   Contains no post content and no series/category names.
   ===================================================================== */
(function () {
  var B = window.BLOG;
  var app = document.getElementById('app');

  /* ---------- helpers ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmtDate(iso) {
    var m = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var p = iso.split('-');
    return m[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0];
  }
  function catLabel(slug) { return B.categories[slug] ? B.categories[slug].label : slug; }
  function seriesOf(p) { return p.series ? B.series[p.series] : null; }
  function totalOf(p) { var s = seriesOf(p); return p.seriesTotal || (s && s.total) || null; }
  function sortPosts(list) {
    return list.slice().sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return (a.seriesNumber || 0) - (b.seriesNumber || 0);
    });
  }
  function postHref(p) { return '#/post/' + p.slug; }
  /* Posts with status:'draft' stay in the data file but are hidden from the index, filters and series tracker. */
  function published() { return B.posts.filter(function (p) { return p.status !== 'draft'; }); }

  /* Warn (console only) if a post points at something that isn't defined. */
  function validate() {
    B.posts.forEach(function (p) {
      (p.categories || []).forEach(function (c) { if (!B.categories[c]) console.warn('[blog] "' + p.slug + '": unknown category "' + c + '"'); });
      if (p.series && !B.series[p.series]) console.warn('[blog] "' + p.slug + '": unknown series "' + p.series + '"');
      if (!B.authors[p.author]) console.warn('[blog] "' + p.slug + '": unknown author "' + p.author + '"');
    });
  }

  /* ---------- small components ---------- */
  function art(p, cls) {
    var inner = p.image
      ? '<img src="' + p.image + '" alt="' + (p.imageAlt || '') + '">'
      : '<span class="art-num">' + (p.seriesNumber ? pad(p.seriesNumber) : '') + '</span><span class="art-tag">Featured image placeholder</span>';
    return '<div class="art ' + (cls || '') + '">' + inner + '</div>';
  }
  function avatar(a) {
    return '<span class="avatar">' + (a.image ? '<img src="' + a.image + '" alt="' + a.name + '">' : a.initials) + '</span>';
  }
  function catChips(p) {
    return (p.categories || []).map(function (c) { return '<span class="chip">' + catLabel(c) + '</span>'; }).join('');
  }
  /* Small series label. Driven by the post's series; shown unless series.showLabel === false. */
  function seriesLabel(p) {
    var s = seriesOf(p);
    if (!s || s.showLabel === false) return '';
    var num = '';
    if (p.seriesNumber) { var t = totalOf(p); num = ' &nbsp;' + pad(p.seriesNumber) + (t ? ' / ' + pad(t) : ''); }
    return '<span class="series-id"><b>' + s.name + '</b>' + num + '</span>';
  }
  function byline(p) {
    var a = B.authors[p.author];
    return '<div class="byline">' + avatar(a) + '<span><b>' + a.name + '</b></span><span class="dot">·</span><span>' + fmtDate(p.date) + '</span></div>';
  }

  /* Launch band: one per series where series.launch.active is true. */
  function launchBands() {
    return Object.keys(B.series).filter(function (id) {
      var s = B.series[id];
      return s.launch && s.launch.active && s.total;
    }).map(function (id) {
      var s = B.series[id], ticks = '';
      for (var i = 1; i <= s.total; i++) {
        var live = published().filter(function (p) { return p.series === id && p.seriesNumber === i; })[0];
        ticks += live
          ? '<a class="tick" href="' + postHref(live) + '">' + pad(i) + '<small>Live</small></a>'
          : '<div class="tick">' + pad(i) + '<small>Soon</small></div>';
      }
      return '<div class="series-band"><div class="wrap" style="padding-top:44px; padding-bottom:44px;">' +
        '<div class="ago-eyebrow" style="color:#8FB0E8; margin-bottom:8px;">' + s.name + '</div>' +
        '<div class="h-display" style="color:#FAF9F5; font-size:clamp(24px,4vw,36px);">' + s.theme + '</div>' +
        '<div class="series-ticks">' + ticks + '</div></div></div>';
    }).join('');
  }

  /* ---------- pages ---------- */
  function renderIndex(catFilter) {
    var all = sortPosts(published());
    var shown = catFilter ? all.filter(function (p) { return (p.categories || []).indexOf(catFilter) >= 0; }) : all;

    // featured: most recent post flagged featured, else newest
    var feat = shown.filter(function (p) { return p.featured; })[0] || shown[0];
    var rest = shown.filter(function (p) { return p !== feat; });

    // filter chips: only categories that have at least one post, in the order defined
    var used = Object.keys(B.categories).filter(function (c) {
      return published().some(function (p) { return (p.categories || []).indexOf(c) >= 0; });
    });
    var filters = '<div class="filters">' +
      '<a class="chip' + (!catFilter ? ' is-on' : '') + '" href="#/">All</a>' +
      used.map(function (c) { return '<a class="chip' + (catFilter === c ? ' is-on' : '') + '" href="#/category/' + c + '">' + catLabel(c) + '</a>'; }).join('') +
      '</div>';

    var featHtml = feat ? (
      '<a class="feature" href="' + postHref(feat) + '">' + art(feat) +
      '<div><div class="card-meta">' + catChips(feat) + seriesLabel(feat) + '</div>' +
      '<h2 class="h-display">' + feat.title + '</h2>' +
      '<p class="lede">' + feat.excerpt + '</p>' + byline(feat) + '</div></a>'
    ) : '<div class="empty">No posts in this category yet.</div>';

    var cards = rest.map(cardHtml).join('');

    app.innerHTML =
      '<div class="wrap" style="padding-top:56px; padding-bottom:44px;">' +
        '<div class="ago-eyebrow">' + B.config.eyebrow + '</div>' +
        '<h1 class="h-display" style="font-size:clamp(40px,8vw,72px); line-height:1;">' + B.config.title + '</h1>' +
      '</div>' +
      (catFilter ? '' : launchBands()) +
      '<div class="wrap" style="padding-top:64px; padding-bottom:36px;">' + filters + featHtml + '</div>' +
      '<div class="wrap" style="padding-bottom:96px;">' +
        (rest.length
          ? '<div class="ago-eyebrow archive-label">' + B.config.archiveLabel + '</div><div class="grid">' + cards + '</div>'
          : '<div class="empty" style="margin-top:28px;">' + B.config.emptyMessage + '</div>') +
      '</div>';
    document.title = B.config.title + ' — The AGOffice';
  }

  /* Video embeds: YouTube / Vimeo page URLs -> privacy-friendly embed URLs. */
  function embedUrl(u) {
    var m;
    if ((m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/))) return 'https://www.youtube-nocookie.com/embed/' + m[1];
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return 'https://player.vimeo.com/video/' + m[1];
    return u;
  }

  function bodyHtml(blocks) {
    return blocks.map(function (b) {
      if (b.t === 'h') return '<h3><span class="n">' + b.n + '.</span>' + b.x + '</h3>';
      if (b.t === 'lead') return '<p class="lead">' + b.x + '</p>';
      if (b.t === 'close') return '<p class="close">' + b.x + '</p>';
      if (b.t === 'image') return '<figure class="media"><img src="' + b.src + '" alt="' + (b.alt || '') + '">' + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
      if (b.t === 'video') return '<figure class="media"><div class="video"><iframe src="' + embedUrl(b.src) + '" title="' + (b.alt || 'Video') + '" allowfullscreen loading="lazy"></iframe></div>' + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
      return '<p>' + b.x + '</p>';
    }).join('');
  }

  function cardHtml(p) {
    return '<a class="card" href="' + postHref(p) + '">' + art(p) +
      '<div class="card-meta">' + catChips(p) + seriesLabel(p) + '</div>' +
      '<h3 class="h-display">' + p.title + '</h3><p>' + p.excerpt + '</p>' +
      '<div class="card-foot">' + byline(p) + '</div></a>';
  }

  function postHtml(p) {
    var body = bodyHtml(p.body);
    var cta = B.evergreenCta;
    return (
      '<div class="post-head">' +
        '<a class="ago-underline-link" href="#/" style="font-size:13.5px; font-weight:700;"><span style="color:#1F4FA0;">←</span> All posts</a>' +
        '<div class="card-meta" style="margin-top:32px;">' + catChips(p) + seriesLabel(p) + '</div>' +
        '<h1 class="h-display post-title">' + p.title + '</h1>' +
        byline(p) +
      '</div>' +
      '<div class="hero">' + art(p) + '</div>' +
      '<article class="prose">' + body + '</article>' +
      '<div class="cta-wrap"><div class="cta">' +
        (p.topicCta
          ? '<h2 class="h-display">' + p.topicCta.heading + '</h2><p>' + p.topicCta.text + '</p><hr>'
          : '') +
        '<h2 class="h-display">' + cta.heading + '</h2>' +
        '<p>' + cta.text + '</p>' +
      '</div></div>');
  }

  function renderPost(slug) {
    var p = B.posts.filter(function (x) { return x.slug === slug; })[0];
    if (!p) { location.hash = '#/'; return; }
    app.innerHTML = postHtml(p);
    document.title = p.title + ' — The AGOffice';
  }

  /* ---------- router ---------- */
  function route() {
    var h = location.hash || '#/', m;
    if ((m = h.match(/^#\/post\/(.+)$/))) renderPost(m[1]);
    else if ((m = h.match(/^#\/category\/(.+)$/))) renderIndex(m[1]);
    else renderIndex(null);
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event('blog:rendered'));
  }

  /* Template functions are exposed so the Post Composer can preview a draft with the real templates. */
  window.BlogTemplates = { postHtml: postHtml, cardHtml: cardHtml };

  window.BlogApp = { render: route };
  if (app) {                       // the composer page has no #app and doesn't run the router
    window.addEventListener('hashchange', route);
    validate();
    route();
  }

  window.toggleMobileMenu = function () {
    var menu = document.getElementById('ago-mobile-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  };
})();
