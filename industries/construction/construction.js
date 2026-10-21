(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = prefersReducedMotion;
  if (!paused) document.documentElement.classList.add("js-motion");

  const menu = $(".nav-toggle");
  const nav = $(".nav-links");
  function closeMenu(returnFocus = false) {
    if (!nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menu.focus();
  }
  menu.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $$(".nav-links a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu(true);
  });
  document.addEventListener("pointerdown", event => {
    if (window.innerWidth <= 980 && !event.target.closest(".site-header")) closeMenu();
  });

  const motionToggle = $(".motion-toggle");
  function setMotion() {
    document.body.classList.toggle("motion-off", paused);
    motionToggle.setAttribute("aria-pressed", String(paused));
    $(".motion-label").textContent = paused ? "Resume motion" : "Pause motion";
    $(".motion-indicator").textContent = paused ? "▶" : "Ⅱ";
  }
  motionToggle.addEventListener("click", () => { paused = !paused; setMotion(); });
  setMotion();

  const stages = {
    enquiry: {
      number: "01 / 04", label: "CUSTOMER DISCOVERY / FIRST CONTACT", short: "DISCOVERY",
      title: "Make every enquiry count.",
      description: "Help relevant customers understand what you do, ask the right questions and receive a clear next step.",
      outcome: "Enquiry capture and timely response", count: "1 OF 4", offset: 76
    },
    scope: {
      number: "02 / 04", label: "QUOTATION / NEXT DECISION", short: "AGREEMENT",
      title: "Turn conversations into clarity.",
      description: "Keep quotation status, open questions and agreed actions visible while an opportunity moves toward a decision.",
      outcome: "Quotation follow-ups and agreed next steps", count: "2 OF 4", offset: 49
    },
    coordinate: {
      number: "03 / 04", label: "TEAM UPDATES / WORK PROGRESS", short: "COORDINATION",
      title: "Keep everyone on the same page.",
      description: "Give office and site teams a simpler way to coordinate responsibilities, updates and the next handover.",
      outcome: "Connected updates and clearer responsibilities", count: "3 OF 4", offset: 23
    },
    handover: {
      number: "04 / 04", label: "CLOSE-OUT / CUSTOMER EXPERIENCE", short: "HANDOVER",
      title: "Finish with a clear handover.",
      description: "Make completion, outstanding items and customer communication easier to track through a consistent close-out process.",
      outcome: "Visible close-out actions and communication", count: "4 OF 4", offset: 0
    }
  };
  const keys = Object.keys(stages);
  let current = "enquiry";
  function setStage(key) {
    const item = stages[key];
    if (!item) return;
    current = key;
    $$(".c-process-button").forEach(b => {
      const on = b.dataset.stage === key;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    $("#stage-number").textContent = item.number;
    $("#stage-tag").textContent = item.label;
    $("#stage-graphic-title").textContent = item.short;
    $("#stage-title").textContent = item.title;
    $("#stage-description").textContent = item.description;
    $("#stage-outcome").textContent = item.outcome;
    $("#stage-counter").textContent = item.count;
    $("#stage-path").setAttribute("stroke-dashoffset", String(item.offset));
  }
  $$(".c-process-button").forEach(b => {
    b.addEventListener("click", () => setStage(b.dataset.stage));
    b.addEventListener("keydown", event => {
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
      const index = Math.max(0, Math.min(keys.length - 1, keys.indexOf(b.dataset.stage) + step));
      setStage(keys[index]);
      $$('.c-process-button')[index].focus();
    });
  });

  const form = $("#brief-form");
  const copy = $("#copy-brief");
  const state = $("#brief-status");
  let brief = "";
  function createBrief() {
    const role = $("#construction-role").value;
    const bottleneck = $("#construction-bottleneck").value;
    const priority = $("#construction-priority").value;
    brief = [
      "TAAMERAT360 / CONSTRUCTION — STARTING PROJECT BRIEF",
      "Business type: " + role,
      "Current challenge: " + bottleneck,
      "First improvement priority: " + priority,
      "",
      "Purpose: Explore practical business growth, sales follow-up, and/or coordination improvements.",
      "Scope, timeline, budget, responsibilities and deliverables: To be agreed with Taamerat360.",
      "",
      "This is a discussion starting point, not a confirmed proposal or service commitment."
    ].join("\n");
    $("#brief-result-title").textContent = "Your next step, in focus.";
    $("#brief-result-desc").textContent = role + " · " + bottleneck + " · " + priority;
    $("#brief-result-text").textContent = brief;
    $("#brief-result-text").hidden = false;
    copy.disabled = false;
    state.textContent = "Your draft is ready. Copy it, then paste it into your message on the proposal page.";
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    createBrief();
  });
  form.addEventListener("change", () => {
    if (!brief) return;
    brief = "";
    copy.disabled = true;
    $("#brief-result-title").textContent = "Selections changed.";
    $("#brief-result-desc").textContent = "Prepare the brief again to include your updated choices.";
    $("#brief-result-text").hidden = true;
    state.textContent = "Your previous brief is out of date. Choose “Prepare my brief” again.";
  });

  copy.addEventListener("click", async () => {
    if (!brief) return;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(brief);
      state.textContent = "Brief copied. You can paste it into the proposal conversation.";
    } catch (error) {
      // No silent failure: show selectable text as a manual fallback.
      $("#brief-result-text").hidden = false;
      state.textContent = "Automatic copy is unavailable in this browser. Select the brief above and copy it manually.";
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents($("#brief-result-text"));
        selection.addRange(range);
      }
    }
  });
  $("#year").textContent = String(new Date().getFullYear());
  let raf = false;
  function progress() {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      $(".scroll-meter").style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
      raf = false;
    });
  }
  window.addEventListener("scroll", progress, { passive: true });
  progress();
})();