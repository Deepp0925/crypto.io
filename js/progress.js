const progressBarWrapperElem = document.getElementById("progressBarWrapper");
const downloadBeganElement = document.createElement("span");
downloadBeganElement.innerHTML = "Your download will begin shortly...";

const modalHeaderElement = document.getElementById("modalHeader");
const modalStepsElement = document.getElementById("modalSteps");
const modalElement = document.getElementById("modalWrapper");
const modalBodyElement = document.getElementById("modalBody");
const continueBtnElement = document.getElementById("continueBtn");
const continueBtnWrapperElement = document.getElementById("continueBtnWrapper");

const progressBarElement = document.getElementById("progressBar");
progressBarElement.style.strokeDasharray =
  2 * Math.PI * progressBarElement.getAttribute("r");

function showProgressView() {
  progressBarWrapperElem.classList.remove("hidden");
  modalBodyElement.classList.add("hidden");
}

function hideProgressView() {
  progressBarWrapperElem.classList.add("hidden");
  modalBodyElement.classList.remove("hidden");
}

/**
 * updates the progress bar percent to the provided percent
 */
function updateProgress(percent) {
  const progressBarElement = document.getElementById("progressBar");
  if (!progressBarElement || percent < 0) return;

  if (percent >= 100) {
    hideProgressView();
  } else if (!modalBodyElement.classList.contains("hidden")) {
    showProgressView();
  }

  if (percent > 100) return;

  const radius = 2 * Math.PI * progressBarElement.getAttribute("r");

  // updates the progress
  progressBarElement.style.strokeDashoffset = radius - (percent / 100) * radius;
  document.getElementById("percent").innerHTML = Math.floor(percent) + "%";
}
