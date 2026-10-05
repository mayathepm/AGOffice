/* =====================================================================
   AGOffice™ BLOG — CONTENT & CONFIG
   This is the only file you edit to add or change posts.
   It contains data only. No layout or rendering code lives here.

   THREE SEPARATE CONCEPTS
   1. categories  Permanent topics. Describe what a post is about.
   2. series      Optional editorial collections. A post may belong to
                  one series (or none). Any number of series can exist.
   3. launch      A temporary switch on a series (series.launch.active).
                  Controls the prominent index-page band ONLY. Turning it
                  off never touches posts, categories, or series data.
   ===================================================================== */
window.BLOG = {

  /* ---- page-level text for the index (no hard-coded series/brand strings in the template) ---- */
  config: {
    eyebrow: 'The AGOffice™',
    title: 'Blog',
    archiveLabel: 'Archive',
    emptyMessage: 'More posts will appear here as they publish.'
  },

  /* ---- 1. CATEGORIES: permanent topics. Key = slug used by posts. ---- */
  categories: {
    'governance':            { label: 'Governance' },
    'project-management':    { label: 'Project Management' },
    'workflow':              { label: 'Workflow' },
    'pmo':                   { label: 'PMO' },
    'leadership':            { label: 'Leadership' },
    'ai-project-management': { label: 'AI + Project Management' },
    'lessons-learned':       { label: 'Lessons Learned' }
  },

  /* ---- 2. SERIES: optional editorial collections. Key = series id used by posts. ----
     name        shown as the series label
     theme       the series headline (shown in the launch band)
     total       default "of N" for numbering (a post can override with seriesTotal)
     showLabel   show the small "NAME 01 / 08" label on cards and posts (kept after launch)
     launch      { active: true }  = show the prominent band on the blog index.
                 Set active:false (or delete the launch line) to retire it.      */
  series: {
    'mayas-lessons-learned': {
      name: 'Maya’s Lessons Learned',
      theme: '8 Years. 8 Lessons.',
      total: 8,
      showLabel: true,
      launch: { active: true }
    }
  },

  /* ---- AUTHORS ---- */
  authors: {
    maya: {
      name: 'Maya Anders',
      role: 'Founder & Principal, AGOffice™',
      image: null,        // e.g. 'img/authors/maya.jpg'; falls back to initials
      initials: 'MA'
    }
  },

  /* ---- EVERGREEN CTA: written once, appended to every post ---- */
  evergreenCta: {
    heading: 'Keep the conversation going',
    text: 'Join us on <a class="in" href="https://www.instagram.com/theagoffice" target="_blank" rel="noopener noreferrer">Instagram</a> &amp; <a class="in" href="https://www.linkedin.com/company/theadaptablegovernanceoffice/" target="_blank" rel="noopener noreferrer">LinkedIn</a> as we explore what governance is, how it works, and how it can adapt to the way your work flows.'
  },

  /* ---- POSTS ----
     Required:  slug, title, date (YYYY-MM-DD), categories [slugs], author, excerpt, body
     Optional:  image, imageAlt, featured, topicCta,
                series (series id), seriesNumber, seriesTotal
     A post with no `series` is a regular post. Nothing else is needed.
     Body blocks:  p | lead | h (with n) | close     (text may contain inline HTML)   */
  posts: [
    {
      slug: 'what-is-governance',
      title: 'What Is Governance?',
      date: '2026-10-05',                                  // placeholder publish date
      categories: ['governance', 'lessons-learned'],
      author: 'maya',
      image: null,                                         // null = branded placeholder art
      imageAlt: '',
      featured: true,                                      // pins to the featured slot on the index
      series: 'mayas-lessons-learned',
      seriesNumber: 1,
      // seriesTotal: 8,                                   // optional override of the series default
      excerpt: 'Governance is the only domain applied throughout the entire project lifecycle, and the only one that follows the work beyond delivery.',
      body: [
        { t: 'p', x: 'Over the course of my nearly eight-year project management career, and specifically while studying for the PMP®, one of the key lessons I came to understand was that governance is the only domain applied throughout the entire project lifecycle, and the only one that follows the work beyond delivery.' },
        { t: 'lead', x: 'But what is governance?' },
        { t: 'p', x: 'First, let’s start with what I learned it isn’t.' },

        { t: 'h', n: 1, x: 'Governance isn’t a phase.' },
        { t: 'p', x: 'It isn’t something you complete during initiation or planning and then move on from.' },
        { t: 'p', x: 'Governance adapts and works across the lifecycle of an initiative or project, tracking milestones rather than tasks and providing the right structure at the right time as the work flows, decisions are made, and progress is evaluated.' },

        { t: 'h', n: 2, x: 'Governance isn’t task-level management.' },
        { t: 'p', x: 'Management helps plan, coordinate, and execute the work.' },
        { t: 'p', x: 'Governance establishes how decisions, accountability, oversight, alignment, and progression happen around that work.' },
        { t: 'p', x: 'And governance is more than a framework, so you’ll need more than a template to implement it.' },

        { t: 'h', n: 3, x: 'Governance isn’t a rigid layer imposed on top of the workflow.' },
        { t: 'p', x: 'It’s how teams create the conditions for work to move forward in the right and intended direction.' },
        { t: 'p', x: 'And that’s where adaptability matters.' },
        { t: 'close', x: 'At AGOffice™, we help PMs and PMOs adapt governance to the way their work flows, whether that’s within an agency, brand, or corporation. <a href="../index.html#intake">Tell us how we can help your work flow</a>.' }
      ],
      topicCta: {
        heading: 'See how governance flows',
        text: '<a href="https://www.thepmohq.com" target="_blank" rel="noopener noreferrer">Explore PMOHQ™</a>, the governance management platform that powers the way we work.'
      }
    }
  ]
};
