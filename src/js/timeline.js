const processStepsData = [
  {
    step: "01",
    title: "Confidential Initial Consultation",
    badge: "Step 01 — Discovery & Non-Disclosure",
    text: "Every investigation begins with a strictly confidential consultation under end-to-end NDA compliance. We conduct a preliminary assessment of your mandate, evaluate objectives, and ensure maximum discretion from minute one."
  },
  {
    step: "02",
    title: "Rigorous Case Assessment",
    badge: "Step 02 — Legal & Strategic Evaluation",
    text: "Our senior operative directors assess legal feasibility, evidentiary requirements, potential risks, and jurisdictional boundaries. We formulate clear investigation perimeters tailored specifically for individual, corporate, or legal counsel clients."
  },
  {
    step: "03",
    title: "Tactical Investigation Planning",
    badge: "Step 03 — Strategy & Asset Deployment",
    text: "A bespoke investigation plan is engineered. Specialized operatives—ranging from forensic accountants and OSINT digital analysts to field surveillance teams—are assigned precise mandates and secure operational protocols."
  },
  {
    step: "04",
    title: "Discreet Evidence Gathering",
    badge: "Step 04 — Active Intel & Forensics",
    text: "Field operatives and digital investigators execute multi-layered surveillance, financial tracing, witness interviews, and digital forensics. All intelligence is logged in strict compliance with legal chain-of-custody protocols."
  },
  {
    step: "05",
    title: "Final Court-Ready Confidential Dossier",
    badge: "Step 05 — Deliverables & Briefing",
    text: "Upon case completion, you receive a comprehensive, encrypted dossier containing timestamped visual evidence, verified intelligence analysis, and court-admissible documentation, accompanied by an executive debriefing."
  }
];

export function initTimeline() {
  const steps = document.querySelectorAll('.process-step');
  const progressLine = document.querySelector('.process-progress-line');
  const detailBadge = document.querySelector('.detail-step-badge');
  const detailTitle = document.querySelector('.detail-title');
  const detailText = document.querySelector('.detail-text');

  if (!steps.length) return;

  function setStep(index) {
    steps.forEach((step, idx) => {
      if (idx <= index) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update progress bar percentage
    if (progressLine) {
      const pct = (index / (steps.length - 1)) * 90;
      progressLine.style.width = `${pct}%`;
    }

    // Update Detail Card Content
    const data = processStepsData[index];
    if (data && detailBadge && detailTitle && detailText) {
      detailBadge.textContent = data.badge;
      detailTitle.textContent = data.title;
      detailText.textContent = data.text;
    }
  }

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      setStep(index);
    });
  });

  // Initialize with step 0
  setStep(0);
}
