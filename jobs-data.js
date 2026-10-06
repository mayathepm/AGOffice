/* =====================================================================
   AGOffice™ REFERRAL OPPORTUNITIES — CONTENT & CONFIG
   This is the only file you edit to add, change, or remove roles.
   Easiest way: open requisition-builder.html, add the role, and paste
   the file it gives you over this one.

   Fields per role
   id        short unique slug
   title     role title
   client    who it is for, e.g. 'Creative Agency · Confidential'
   type      Contract | Contract-to-Hire | Fractional | Full-time ...
   location  Remote | Hybrid · Atlanta, GA | ...
   cert      one of the keys in certifications below
   summary   one or two sentences
   rate      '$65–85/hr', 'Rate DOE', ...
   posted    'YYYY-MM-DD' (shown as 'Posted Sep 20'; newest shows first)
   active    true shows the role, false hides it without deleting it
   ===================================================================== */
window.AGO_JOBS = {

  certifications: {
    'pmp-required':   { label: 'PMP® Required',            tone: 'required'  },
    'pmp-preferred':  { label: 'PMP® Preferred',           tone: 'preferred' },
    'capm-preferred': { label: 'CAPM® Preferred',          tone: 'preferred' },
    'none':           { label: 'Certification Not Specified', tone: 'none'   }
  },

  jobs: [
    {
      id: 'sr-pm-creative-agency',
      title: 'Senior Project Manager',
      client: 'Creative Agency · Confidential',
      type: 'Contract', location: 'Remote',
      cert: 'pmp-preferred',
      summary: 'Lead delivery across multiple creative workstreams for a national brand campaign.',
      rate: '$65–85/hr', posted: '2026-09-20', active: true
    },
    {
      id: 'digital-marketing-pm-ecommerce',
      title: 'Digital Marketing PM',
      client: 'eCommerce Brand · Confidential',
      type: 'Contract-to-Hire', location: 'Remote',
      cert: 'capm-preferred',
      summary: 'Own the delivery calendar across paid, lifecycle, and creative production teams for a growing DTC brand.',
      rate: '$55–70/hr', posted: '2026-09-15', active: true
    },
    {
      id: 'program-manager-enterprise-comms',
      title: 'Program Manager',
      client: 'Enterprise Communications · Confidential',
      type: 'Fractional', location: 'Remote',
      cert: 'pmp-required',
      summary: 'Govern review and approval workflows for high-volume regulated communications across multiple stakeholders.',
      rate: 'Rate DOE', posted: '2026-09-10', active: true
    }
  ]
};
