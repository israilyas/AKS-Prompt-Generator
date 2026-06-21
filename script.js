/**
 * Aks - Core Logic
 * Handles interactive themes, coupled inputs, prompt formatting, modal state,
 * clipboard copy, and full keyboard accessibility.
 */

// Field definition metadata for the 10-section framework
const AksFieldMeta = {
  identity: {
    label: "Identity lock",
    desc: "Who the subject is (age range, gender, ethnicity context)"
  },
  scene: {
    label: "Scene",
    desc: "What is happening and the setting's core action"
  },
  outfit: {
    label: "Outfit",
    desc: "Clothing details (saree, ihram, football jersey, abaya, etc.)"
  },
  pose: {
    label: "Pose",
    desc: "Body position, posture, and facial expression"
  },
  camera: {
    label: "Camera angle",
    desc: "Camera perspective and framing (e.g. eye-level, low angle)"
  },
  lighting: {
    label: "Lighting",
    desc: "Atmospheric lighting style (e.g. golden hour, studio softbox)"
  },
  lens: {
    label: "Lens specs",
    desc: "Lens parameters and depth of field details"
  },
  background: {
    label: "Background",
    desc: "Location details and soft-focus background scenery"
  },
  mood: {
    label: "Mood",
    desc: "Emotional tone and overall atmospheric feeling"
  },
  negative: {
    label: "Negative controls",
    desc: "Elements to avoid in the generated image (e.g. bad hands, blurry features)"
  }
};

// Application State
let currentTheme = "saree";
let lastFocusedElement = null;

// DOM Elements
const formContainer = document.getElementById("form-container");
const themeTabs = document.querySelectorAll(".theme-tab");
const btnSurprise = document.getElementById("btn-surprise");
const btnGenerate = document.getElementById("btn-generate");
const extraText = document.getElementById("field-extra-text");
const extraDetailsHint = document.getElementById("extra-details-hint");

// Modal DOM Elements
const resultModal = document.getElementById("result-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const promptOutput = document.getElementById("prompt-output");
const btnCopy = document.getElementById("btn-copy");
const copyConfirm = document.getElementById("copy-confirm");
const copyBtnText = document.getElementById("copy-btn-text");
const btnRegenerate = document.getElementById("btn-regenerate");
const btnEdit = document.getElementById("btn-edit");

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  renderFormFields(currentTheme);
  setupThemeListeners();
  setupButtonListeners();
  setupModalListeners();
});

// Render the 10 fields dynamically based on selected theme
function renderFormFields(themeKey) {
  formContainer.innerHTML = "";
  const themeData = AksThemes[themeKey];
  if (!themeData) return;

  const fieldKeys = Object.keys(AksFieldMeta);
  fieldKeys.forEach(key => {
    const meta = AksFieldMeta[key];
    const presets = themeData.fields[key] || [];

    // Create field container
    const fieldGroup = document.createElement("div");
    fieldGroup.className = "field-group";

    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", `field-${key}-select`);
    label.className = "field-label";
    label.textContent = meta.label;

    // Create description
    const desc = document.createElement("div");
    desc.className = "field-desc";
    desc.textContent = meta.desc;

    // Create inputs container
    const coupledInputs = document.createElement("div");
    coupledInputs.className = "coupled-inputs";

    // Create dropdown select
    const select = document.createElement("select");
    select.id = `field-${key}-select`;
    select.className = "dropdown-select";

    presets.forEach((preset, index) => {
      const option = document.createElement("option");
      option.value = preset;
      option.textContent = preset;
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });

    // Create custom override input
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = `field-${key}-text`;
    textInput.className = "text-input";
    textInput.placeholder = `or type custom ${meta.label.toLowerCase()}...`;

    // Append everything
    coupledInputs.appendChild(select);
    coupledInputs.appendChild(textInput);
    fieldGroup.appendChild(label);
    fieldGroup.appendChild(desc);
    fieldGroup.appendChild(coupledInputs);
    formContainer.appendChild(fieldGroup);
  });

  // Toggle Hajj/Umrah sensitivity hint
  if (themeKey === "hajj") {
    extraDetailsHint.classList.remove("hidden");
  } else {
    extraDetailsHint.classList.add("hidden");
  }
}

// Setup click listeners for theme tabs
function setupThemeListeners() {
  themeTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const targetTheme = e.target.getAttribute("data-theme");
      if (targetTheme === currentTheme) return;

      // Update active tab style
      themeTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      e.target.classList.add("active");
      e.target.setAttribute("aria-selected", "true");

      currentTheme = targetTheme;
      renderFormFields(currentTheme);
      
      // Clear extra details field when changing theme to prevent mixing contexts
      extraText.value = "";
    });
  });
}

// Randomize dropdown values (does not affect text override inputs)
function randomizePresets() {
  const fieldKeys = Object.keys(AksFieldMeta);
  fieldKeys.forEach(key => {
    const select = document.getElementById(`field-${key}-select`);
    if (select && select.options.length > 0) {
      const randomIndex = Math.floor(Math.random() * select.options.length);
      select.selectedIndex = randomIndex;
    }
  });
}

// Setup form actions
function setupButtonListeners() {
  btnSurprise.addEventListener("click", () => {
    randomizePresets();
  });

  btnGenerate.addEventListener("click", (e) => {
    lastFocusedElement = e.target;
    openModalAndShowPrompt();
  });
}

// Helper to sanitize and structure the final prompt text
function compilePrompt() {
  const values = {};
  const fieldKeys = Object.keys(AksFieldMeta);

  fieldKeys.forEach(key => {
    const select = document.getElementById(`field-${key}-select`);
    const textInput = document.getElementById(`field-${key}-text`);
    
    // Custom text input overrides select if not empty
    let val = "";
    if (textInput && textInput.value.trim() !== "") {
      val = textInput.value.trim();
    } else if (select) {
      val = select.value;
    }
    
    values[key] = val;
  });

  const promptParts = [];

  // Sentence 1: Identity lock + Scene + Outfit
  const s1 = [];
  if (values.identity) s1.push(values.identity);
  if (values.scene) s1.push(values.scene);
  if (values.outfit) s1.push(values.outfit);
  if (s1.length > 0) {
    promptParts.push(s1.join(", ") + ".");
  }

  // Sentence 2: Pose
  if (values.pose) {
    promptParts.push(capitalizeFirst(values.pose) + ".");
  }

  // Sentence 3: Camera angle + Lighting + Lens specs
  const s3 = [];
  if (values.camera) s3.push(values.camera);
  if (values.lighting) s3.push(values.lighting);
  if (values.lens) s3.push(values.lens);
  if (s3.length > 0) {
    promptParts.push(capitalizeFirst(s3.join(", ")) + ".");
  }

  // Sentence 4: Background
  if (values.background) {
    promptParts.push(capitalizeFirst(values.background) + ".");
  }

  // Sentence 5: Mood
  if (values.mood) {
    promptParts.push(capitalizeFirst(values.mood) + ".");
  }

  // Sentence 6: Extra details (if filled)
  const extraVal = extraText.value.trim();
  if (extraVal) {
    promptParts.push(capitalizeFirst(extraVal) + ".");
  }

  // Sentence 7: Negative controls
  if (values.negative) {
    promptParts.push(capitalizeFirst(values.negative));
  }

  // Join and clean string syntax
  let finishedPrompt = promptParts.join(" ")
    .replace(/\s+/g, " ")      // Collapse spaces
    .replace(/\.\./g, ".")     // Prevent double periods
    .replace(/,\./g, ".")      // Prevent comma-period
    .replace(/—/g, "-")        // Replace em dash
    .replace(/–/g, "-")        // Replace en dash
    .trim();

  return finishedPrompt;
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Modal handling
function openModalAndShowPrompt() {
  const promptText = compilePrompt();
  promptOutput.textContent = promptText;
  
  // Reset clipboard button feedback state
  copyConfirm.classList.add("hidden");
  copyBtnText.textContent = "Copy to clipboard";

  resultModal.classList.remove("hidden");
  
  // Trap focus inside modal
  setupFocusTrap();
}

function closeModal() {
  resultModal.classList.add("hidden");
  
  // Return focus to the button that triggered the modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function setupModalListeners() {
  // Close buttons
  btnCloseModal.addEventListener("click", closeModal);
  btnEdit.addEventListener("click", closeModal);

  // Close when clicking outside content card (on the scrim)
  resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
      closeModal();
    }
  });

  // Re-roll random values and stay in modal
  btnRegenerate.addEventListener("click", () => {
    randomizePresets();
    const promptText = compilePrompt();
    promptOutput.textContent = promptText;
    
    // Reset copy button feedback
    copyConfirm.classList.add("hidden");
    copyBtnText.textContent = "Copy to clipboard";
  });

  // Copy to clipboard
  btnCopy.addEventListener("click", () => {
    const textToCopy = promptOutput.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(showCopySuccess)
        .catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  });

  // Escape key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !resultModal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function showCopySuccess() {
  copyConfirm.classList.remove("hidden");
  copyBtnText.textContent = "Copied!";
  setTimeout(() => {
    copyConfirm.classList.add("hidden");
    copyBtnText.textContent = "Copy to clipboard";
  }, 2000);
}

// Fallback for older browsers or local file scheme security restrictions
function fallbackCopy() {
  try {
    const range = document.createRange();
    range.selectNode(promptOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    const success = document.execCommand("copy");
    window.getSelection().removeAllRanges();
    if (success) {
      showCopySuccess();
    } else {
      alert("Please select the text and copy it manually.");
    }
  } catch (err) {
    alert("Please select the text and copy it manually.");
  }
}

// Accessible Focus Trap within modal dialog
function setupFocusTrap() {
  const focusableElements = resultModal.querySelectorAll('button, [tabindex="0"], a');
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Focus copy button first for user convenience
  btnCopy.focus();

  // Remove any previous listener to avoid stack build-up
  resultModal.removeEventListener("keydown", trapFocusHandler);
  
  // Attach handler
  resultModal.addEventListener("keydown", trapFocusHandler);

  function trapFocusHandler(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift + Tab -> Wrap from first to last
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab -> Wrap from last to first
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}
