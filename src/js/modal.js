const servicesDetailData = {
  personal: {
    title: "Personal Investigation Services",
    subtitle: "Discreet & Sensitive Solutions for Private Individuals",
    img: "/service_background.png",
    description: "Our personal investigation unit handles sensitive domestic, missing persons, asset tracking, and private verification matters with absolute confidentiality, legal compliance, and empathy.",
    deliverables: [
      "Discreet mobile & static observation by certified operatives",
      "Personal history, background, and associate verification",
      "Missing person & relative location services",
      "Financial asset discovery for domestic/matrimonial proceedings",
      "Timestamped digital findings dossier and final legal briefing"
    ]
  },
  corporate: {
    title: "Corporate Investigation Services",
    subtitle: "Risk Mitigation, Due Diligence & Internal Theft Detection",
    img: "/service_corporate.png",
    description: "Protecting enterprise assets, executive reputation, and operational continuity through structured corporate intelligence, due diligence, and internal fraud audits.",
    deliverables: [
      "Executive pre-appointment background vetting and risk screening",
      "Financial embezzlement and internal theft investigations",
      "M&A counterparty due diligence and asset liability audits",
      "Intellectual property infringement & trade secret tracing",
      "Corporate counter-espionage and security protocol assessments"
    ]
  },
  background: {
    title: "Background Verification & Vetting",
    subtitle: "Comprehensive Intel on Key Personnel & Partners",
    img: "/insight_background.png",
    description: "Detailed, multi-jurisdictional intelligence verification on C-suite candidates, strategic business partners, high-net-worth individuals, and major vendors.",
    deliverables: [
      "Civil litigation, criminal records, & regulatory sanctions audits",
      "Direct verification of executive credentials & employment history",
      "Financial integrity, bankruptcy, & corporate liability checking",
      "Undisclosed conflict-of-interest and associate mapping",
      "Court-ready compliance dossier with verified source materials"
    ]
  },
  matrimonial: {
    title: "Matrimonial Investigation Services",
    subtitle: "Discreet Verification for Pre-Marital & Family Enquiries",
    img: "/about_office.png",
    description: "Sensitive, objective fact-finding prior to marriage or during legal matrimonial proceedings to provide clarity, truth, and peace of mind.",
    deliverables: [
      "Pre-matrimonial background, history, and lifestyle vetting",
      "Hidden financial asset & income stream verification",
      "Discreet physical surveillance & chronological activity logs",
      "Undisclosed prior marital obligations & legal background check",
      "Encrypted report deliverables protected under client confidentiality"
    ]
  },
  employee: {
    title: "Employee Verification Services",
    subtitle: "Workplace Integrity Screening & Risk Minimization",
    img: "/insight_background.png",
    description: "Pre-employment screening, executive background vetting, and conflict-of-interest audits designed specifically for HR departments and executive leadership.",
    deliverables: [
      "Comprehensive employment history & credential validation",
      "Executive regulatory compliance & sanctions audit",
      "Workplace conflict-of-interest & dual-employment analysis",
      "Reference audit and thorough candidate history verification",
      "Standardized risk assessment report formatted for enterprise HR"
    ]
  },
  cyber: {
    title: "Cyber Investigation & OSINT",
    subtitle: "Digital Forensics, OSINT & Threat Attribution",
    img: "/insight_cyber.png",
    description: "Tracing digital footprints, data leak origins, online extortion, harassment, and open-source intelligence (OSINT) gathering across clear and dark web networks.",
    deliverables: [
      "Digital footprint analysis & executive vulnerability audits",
      "Source attribution for online defamation, harassment, or extortion",
      "Open-Source Intelligence (OSINT) deep web reporting",
      "Executive digital exposure minimization protocols",
      "Forensic device examination and chain-of-custody log"
    ]
  },
  legal: {
    title: "Legal Support & Litigation Support",
    subtitle: "Court-Admissible Evidence for Litigators & Law Firms",
    img: "/insight_ethics.png",
    description: "Partnering with law firms, attorneys, and corporate legal counsel to gather crucial evidence, locate key witnesses, conduct sworn interviews, and execute difficult process serving.",
    deliverables: [
      "Witness locate services and recorded sworn interview statements",
      "Difficult or elusive legal process serving execution",
      "Asset location and financial tracing for judgment enforcement",
      "Evidentiary chain-of-custody preservation & documentation",
      "Sworn operative affidavits and expert witness testimony"
    ]
  },
  surveillance: {
    title: "Professional Surveillance Services",
    subtitle: "Lawful Physical, Mobile & Technical Observation",
    img: "/hero_consultation.png",
    description: "State-of-the-art physical observation conducted by senior, certified field operatives adhering strictly to statutory legal guidelines to capture clear visual proof.",
    deliverables: [
      "Multi-operative static & mobile vehicle field observation",
      "High-definition optical zoom photography & optical video proof",
      "Technical counter-surveillance (TSCM / electronic bug sweeping)",
      "Detailed chronological activity logs with GPS timestamps",
      "In-person operative testimony in legal proceedings"
    ]
  }
};

const articlesDetailData = {
  'bg-vetting': {
    category: "Background Verification",
    title: "The Strategic Importance of Background Vetting in High-Stakes Decisions",
    readTime: "5 min read",
    author: "Senior Advisory Team, ANVESHAK",
    img: "/insight_background.png",
    content: `
      <p>In high-stakes corporate partnerships, executive hires, and private investments, relying on surface assumptions or automated online check services introduces unacceptable exposure. Automated databases often contain stale records, missed filings, or identity false positives that fail to provide complete clarity.</p>
      
      <h4>The Mechanics of Deep Intelligence Vetting</h4>
      <p>True background verification goes beyond automated search algorithms. It requires cross-referencing multi-jurisdictional court records, corporate registry filings, regulatory sanctions databases, and verified primary sources. This structured approach uncovers hidden liabilities, undisclosed conflicts of interest, and fictitious credentials before commitments are finalized.</p>
      
      <h4>Risk Mitigation Across Key Vectors</h4>
      <p>Whether vetting a prospective C-suite officer or evaluating a strategic joint-venture partner, thorough intelligence ensures that decision-makers operate with total transparency. At ANVESHAK, every background verification enquiry is executed within strict legal frameworks, ensuring that all gathered intelligence is factual, objective, and court-admissible.</p>
    `
  },
  'corp-diligence': {
    category: "Corporate Due Diligence",
    title: "Navigating Financial & Reputational Risk in Corporate Advisory",
    readTime: "6 min read",
    author: "Corporate Intelligence Group",
    img: "/insight_corporate.png",
    content: `
      <p>Mergers, acquisitions, and major commercial investments require more than just audited financial statements. Standard financial due diligence often overlooks qualitative risk factors—such as hidden counterpart liability, ongoing undisclosed litigation, or key executive reputational risk.</p>
      
      <h4>Uncovering Hidden Counterparty Liabilities</h4>
      <p>A comprehensive corporate investigation evaluates the underlying integrity of target companies, their beneficial owners, and key operational figures. By analyzing historical corporate structures, vendor relationships, and regulatory compliance records, corporate investigators identify operational friction points that traditional audits miss.</p>
      
      <h4>Safeguarding Enterprise Integrity</h4>
      <p>Proactive intelligence empowers board members, private equity firms, and legal counsel to negotiate terms from a position of strength, adjust valuations based on empirical risk, or abort compromised transactions before capital is deployed.</p>
    `
  },
  'cyber-safety': {
    category: "Cyber Awareness",
    title: "Executive Identity & Personal Digital Safety in a Hyper-Connected Era",
    readTime: "4 min read",
    author: "Digital Forensics & OSINT Unit",
    img: "/insight_cyber.png",
    content: `
      <p>High-net-worth individuals, corporate executives, and public figures face unprecedented exposure across digital channels. Exposed personal addresses, leaked credentials, and public social media trails create vulnerability vectors for targeted extortion, impersonation, and physical security risks.</p>
      
      <h4>Mitigating Executive Digital Exposure</h4>
      <p>Digital safety requires a proactive, multi-layered posture. Open-source intelligence (OSINT) audits map out exactly what personal data is accessible to malicious actors across clear, deep, and dark web indexes. Once identified, systematic removal request protocols and privacy shielding measures are deployed.</p>
      
      <h4>Actionable Defensive Protocols</h4>
      <p>Implementing encrypted communication channels, hardware-based authentication, and routine threat surface assessments preserves personal privacy and ensures that executive communications remain strictly confidential.</p>
    `
  },
  'investigation-ethics': {
    category: "Investigation Ethics",
    title: "Standards of Practice & Legal Compliance in Modern Enquiries",
    readTime: "7 min read",
    author: "Legal & Operational Compliance Board",
    img: "/insight_ethics.png",
    content: `
      <p>The distinction between a professional private investigation firm and an unethical operator lies entirely in legal compliance and methodology. Unlawful intrusion, unauthorized wiretapping, or illegal database breaches violate statutory laws and invalidate evidence in court proceedings.</p>
      
      <h4>Adherence to Statutory Legal Frameworks</h4>
      <p>Professional private investigation operates within defined statutory boundaries—utilizing public records, lawful physical observation, open-source intelligence, and voluntary interview statements. Every piece of evidence gathered must maintain a strict, verifiable chain of custody to withstand legal scrutiny.</p>
      
      <h4>The Non-Negotiable Imperative of Ethics</h4>
      <p>At ANVESHAK, we adhere to strict ethical standards. Every client enquiry undergoes a legal feasibility review prior to engagement, ensuring that our work protects client interests while operating with complete legal integrity.</p>
    `
  },
  'selecting-firm': {
    category: "Choosing an Investigation Firm",
    title: "Key Criteria for Selecting a Trustworthy Investigation Partner",
    readTime: "5 min read",
    author: "Executive Advisory Directorate",
    img: "/insight_firm.png",
    content: `
      <p>When selecting a private investigation firm for sensitive personal, legal, or corporate matters, selecting the right partner is paramount. A reputable firm builds trust through transparency, clear operational protocols, and realistic communication—never through exaggerated claims or illegal promises.</p>
      
      <h4>Core Indicators of Professionalism</h4>
      <p>Look for firms that provide formal Non-Disclosure Agreements (NDAs) prior to discussing case details, offer structured scope proposals, and maintain direct access to designated case officers. Be cautious of operators promising instant illegal access to private phone records, bank accounts, or guaranteed outcomes.</p>
      
      <h4>Transparency and Fact-Based Reporting</h4>
      <p>A trustworthy firm provides objective, unvarnished factual reporting regardless of outcome. True value lies in receiving verified facts that enable you to make informed personal or business decisions with complete clarity.</p>
    `
  }
};

export function initModal() {
  const consultationModalOverlay = document.getElementById('consultation-modal');
  const serviceModalOverlay = document.getElementById('service-modal');
  const articleModalOverlay = document.getElementById('article-modal');
  const confirmationModalOverlay = document.getElementById('confirmation-modal');
  const policyModalOverlay = document.getElementById('policy-modal');

  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-close-btn-action');
  const openConsultationBtns = document.querySelectorAll('[data-open-modal="consultation"]');
  const serviceDetailBtns = document.querySelectorAll('[data-open-service]');
  const articleDetailBtns = document.querySelectorAll('[data-open-article]');
  const policyBtns = document.querySelectorAll('[data-open-policy]');

  let lastViewedService = null;
  let lastViewedArticle = null;

  function closeAllModals() {
    [consultationModalOverlay, serviceModalOverlay, articleModalOverlay, confirmationModalOverlay, policyModalOverlay].forEach(overlay => {
      overlay?.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // Open Consultation Modal
  openConsultationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // If clicked from inside another modal, close that modal first
      if (serviceModalOverlay?.classList.contains('active')) {
        serviceModalOverlay.classList.remove('active');
      }
      if (articleModalOverlay?.classList.contains('active')) {
        articleModalOverlay.classList.remove('active');
      }
      if (policyModalOverlay?.classList.contains('active')) {
        policyModalOverlay.classList.remove('active');
      }

      // Close mobile drawer if open
      const mobileDrawer = document.querySelector('.mobile-drawer');
      const mobileToggle = document.querySelector('.mobile-toggle');
      const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
      if (mobileDrawer?.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle?.classList.remove('active');
        drawerOverlay?.classList.remove('open');
      }

      // Pre-fill service in modal form if coming from a service context
      const serviceSelect = consultationModalOverlay?.querySelector('select[name="service"]');
      if (serviceSelect && lastViewedService) {
        serviceSelect.value = lastViewedService;
      }

      // Pre-fill context if coming from an article
      const descTextarea = consultationModalOverlay?.querySelector('textarea[name="description"]');
      if (btn.closest('#article-modal') && lastViewedArticle && descTextarea) {
        descTextarea.value = `[Enquiry regarding: ${lastViewedArticle.title}]\n\nPlease advise on applicable consultation options.\n`;
        if (serviceSelect) {
          const catMap = {
            'bg-vetting': 'background',
            'corp-diligence': 'corporate',
            'cyber-safety': 'cyber',
            'investigation-ethics': 'legal',
            'selecting-firm': 'corporate'
          };
          for (const [key, svc] of Object.entries(catMap)) {
            if (lastViewedArticle.key === key) {
              serviceSelect.value = svc;
              break;
            }
          }
        }
      }

      consultationModalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Open Service Detail Modal
  serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-open-service');
      const data = servicesDetailData[serviceKey];
      lastViewedService = serviceKey;

      if (data && serviceModalOverlay) {
        const titleEl = serviceModalOverlay.querySelector('.service-modal-title');
        const subtitleEl = serviceModalOverlay.querySelector('.service-modal-subtitle');
        const descEl = serviceModalOverlay.querySelector('.service-modal-desc');
        const deliverablesList = serviceModalOverlay.querySelector('.service-modal-deliverables');
        const imgEl = serviceModalOverlay.querySelector('.service-modal-img');

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        if (descEl) descEl.textContent = data.description;
        if (imgEl) imgEl.src = data.img;

        if (deliverablesList) {
          deliverablesList.innerHTML = data.deliverables.map(item => `
            <li style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; font-size:0.95rem; color:var(--text-secondary);">
              <svg style="width:18px; height:18px; color:var(--accent-gold); flex-shrink:0; margin-top:2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${item}</span>
            </li>
          `).join('');
        }

        // Close any other open modal
        [consultationModalOverlay, articleModalOverlay, policyModalOverlay].forEach(m => m?.classList.remove('active'));

        serviceModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open Article Reader Modal
  articleDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleKey = btn.getAttribute('data-open-article');
      const data = articlesDetailData[articleKey];
      if (data) {
        lastViewedArticle = { key: articleKey, ...data };
      }

      if (data && articleModalOverlay) {
        const catEl = articleModalOverlay.querySelector('.article-modal-category');
        const titleEl = articleModalOverlay.querySelector('.article-modal-title');
        const metaEl = articleModalOverlay.querySelector('.article-modal-meta');
        const imgEl = articleModalOverlay.querySelector('.article-modal-img');
        const bodyEl = articleModalOverlay.querySelector('.article-modal-body');

        if (catEl) catEl.textContent = data.category;
        if (titleEl) titleEl.textContent = data.title;
        if (metaEl) metaEl.innerHTML = `<span>${data.author}</span> • <span>${data.readTime}</span>`;
        if (imgEl) imgEl.src = data.img;
        if (bodyEl) bodyEl.innerHTML = data.content;

        // Close any other open modal
        [consultationModalOverlay, serviceModalOverlay, policyModalOverlay].forEach(m => m?.classList.remove('active'));

        articleModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open Policy Modal & Tabs
  policyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPolicy = btn.getAttribute('data-open-policy') || 'privacy';
      switchPolicyTab(targetPolicy);

      closeAllModals();
      policyModalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Policy Modal Tab Buttons
  const policyTabBtns = policyModalOverlay?.querySelectorAll('[data-policy-tab]');
  policyTabBtns?.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tabKey = tabBtn.getAttribute('data-policy-tab');
      switchPolicyTab(tabKey);
    });
  });

  function switchPolicyTab(tabKey) {
    if (!policyModalOverlay) return;
    const tabBtns = policyModalOverlay.querySelectorAll('[data-policy-tab]');
    const panes = policyModalOverlay.querySelectorAll('.policy-pane');

    tabBtns.forEach(b => {
      if (b.getAttribute('data-policy-tab') === tabKey) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    panes.forEach(pane => {
      if (pane.id === `policy-${tabKey}`) {
        pane.style.display = 'block';
        pane.classList.add('active');
      } else {
        pane.style.display = 'none';
        pane.classList.remove('active');
      }
    });
  }

  // Close Modals via Close Buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close by clicking backdrop
  [consultationModalOverlay, serviceModalOverlay, articleModalOverlay, confirmationModalOverlay, policyModalOverlay].forEach(overlay => {
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Close by pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}
