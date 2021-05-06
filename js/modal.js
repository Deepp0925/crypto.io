let canCloseModal = true;

/**
 * shows a compression based modal
 * will also be used for decompression
 * @param {String} type - should be either compress/ decompress
 */
function showCompressionModal(type) {
  type = type.toLowerCase() === "compress" ? "Compress" : "Decompress";
  modalHeaderElement.innerHTML = type;
  let currentStep = 0;

  const fileElem = createFileElem();

  const fileLabelElem = createFileLabelElem();

  /// these steps will be shown on the left column
  const COMPRESSION_STEPS = [
    {
      step: "Select a File",
      element: fileElem,
      hasFile: true,
    },
    {
      step: "Select algorithm",
      element: createSelectElem(["Deflate", "LZ77"]),
      isInput: true,
    },
    {
      step: "Progress",
      isProgress: true,
    },
    {
      step: "Finish",
      element: downloadBeganElement,
    },
  ];

  const replies = [];

  COMPRESSION_STEPS.forEach((element, index) => {
    const stepElement = document.createElement("span");

    stepElement.classList.add("font-normal", "text-xl", "mb-16");

    if (index === 0) stepElement.classList.add("step-read");
    else stepElement.classList.add("step-unread");

    stepElement.innerHTML = element.step;

    modalStepsElement.appendChild(stepElement);

    // it has file element then setup change listener
    if (!!element.hasFile) {
      // file change listener which will be removed when used
      function fileChangeListener(evt) {
        const fileList = evt.target.files;
        if (!fileList.length)
          return console.log("please supply a file for ", type);

        replies.push(evt.target.files[0]);
        element.element.removeEventListener("change", fileChangeListener);
        nextStep();
      }

      element.element.addEventListener("change", fileChangeListener);

      if (typeof element.onShow === "function") element.onShow();
    }

    // if this the first child then show content for the mmodal
    if (index === 0) {
      updateModalContent();
    }
  });

  // show next step
  function nextStep() {
    currentStep++;

    if (currentStep > COMPRESSION_STEPS.length - 1) return;
    modalStepsElement.children[currentStep].classList.add("step-read");

    const nextStepInfo = COMPRESSION_STEPS[currentStep];

    // allows the user to close the modal or not based on the current step
    if (nextStepInfo.isProgress) {
      canCloseModal = false;
      updateProgress(0);
      // TODO call the correct function based on the input
      if (replies[1] === "Deflate") {
        if (type === "Compress") deflate(replies[0], updateProgress, nextStep);
        else inflate(replies[0], updateProgress, nextStep);
      } else {
        // TODO call LZ77 functions here
        if (type === "Compress")
          lz77Compress(replies[0], updateProgress, nextStep);
        else lz77Decompress(replies[0], updateProgress, nextStep);
      }
    } else canCloseModal = true;

    // shows continue btn if necessary
    if (
      !COMPRESSION_STEPS[currentStep].hasFile &&
      currentStep !== COMPRESSION_STEPS.length - 1
    )
      continueBtnWrapperElement.hidden = false;
    else continueBtnWrapperElement.hidden = true;

    if (nextStepInfo.isInput) {
      const onclickCB = () => {
        const val = nextStepInfo.element.value;
        if (val && nextStepInfo.element.checkValidity()) {
          replies.push(val);
          continueBtnElement.removeEventListener("click", onclickCB);
          nextStep();
          console.log(replies);
        }
      };

      continueBtnElement.addEventListener("click", onclickCB);
    }

    updateModalContent();
  }

  function updateModalContent() {
    const stepDetails = COMPRESSION_STEPS[currentStep];

    removeAllChild(modalBodyElement);

    // need to hide modal body
    if (stepDetails.isProgress) return;

    modalBodyElement.appendChild(stepDetails.element);

    if (stepDetails.hasFile) {
      modalBodyElement.appendChild(fileLabelElem);
    }
  }

  // function _updateProgress(percent) {
  //   if (percent >= 100) {
  //     hideProgressView();
  //     nextStep();
  //   } else if (!modalBodyElement.classList.contains("hidden")) {
  //     showProgressView();
  //   }

  //   updateProgress(percent);
  // }
}

/**
 *
 * @param {*} type - should be either encrypt / decrypt
 */
function showEncryptionModal(type) {
  type = type.toLowerCase() === "encrypt" ? "Encrypt" : "Decrypt";
  modalHeaderElement.innerHTML = type;
  let currentStep = 0;

  const fileElem = createFileElem();

  const fileLabelElem = createFileLabelElem();

  const passwordInputElem = createPasswordInputElem();

  /// these steps will be shown on the left column
  const ENCRYPTION_STEPS = [
    {
      step: "Select a File",
      element: fileElem,
      hasFile: true,
    },
    {
      step: "Select algorithm",
      element: createSelectElem(["AES", "DES", "Rabbit"]),
      isInput: true,
    },
    {
      step: "Set password",
      element: passwordInputElem,
      isInput: true,
    },
    {
      step: "Progress",
      isProgress: true,
    },
    {
      step: "Finish",
      element: downloadBeganElement,
    },
  ];

  const replies = [];

  ENCRYPTION_STEPS.forEach((element, index) => {
    const stepElement = document.createElement("span");

    stepElement.classList.add("font-normal", "text-xl", "mb-16");

    if (index === 0) stepElement.classList.add("step-read");
    else stepElement.classList.add("step-unread");

    stepElement.innerHTML = element.step;

    modalStepsElement.appendChild(stepElement);

    // it has file element then setup change listener
    if (!!element.hasFile) {
      // file change listener which will be removed when used
      function fileChangeListener(evt) {
        const fileList = evt.target.files;
        if (!fileList.length)
          return console.log("please supply a file for ", type);

        replies.push(evt.target.files[0]);
        element.element.removeEventListener("change", fileChangeListener);
        nextStep();
      }

      element.element.addEventListener("change", fileChangeListener);
    }

    // if this the first child then show content for the mmodal
    if (index === 0) {
      updateModalContent();
    }
  });

  // show next step
  function nextStep() {
    currentStep++;

    if (currentStep > ENCRYPTION_STEPS.length - 1) return;
    modalStepsElement.children[currentStep].classList.add("step-read");

    const nextStepInfo = ENCRYPTION_STEPS[currentStep];

    // allows the user to close the modal or not based on the current step
    if (nextStepInfo.isProgress) {
      canCloseModal = false;
      updateProgress(0);
      // AES
      if (replies[1] === "AES") {
        if (type === "Encrypt")
          encryptAES(replies[0], replies[2], updateProgress, nextStep);
        else decryptAES(replies[0], replies[2], updateProgress, nextStep);
      }
      // DES
      else if (replies[1] === "DES") {
        if (type === "Encrypt")
          encryptDES(replies[0], replies[2], updateProgress, nextStep);
        else decryptDES(replies[0], replies[2], updateProgress, nextStep);
      }
      // Rabbit
      else {
        if (type === "Encrypt")
          encryptRabbit(replies[0], replies[2], updateProgress, nextStep);
        else decryptRabbit(replies[0], replies[2], updateProgress, nextStep);
      }
    } else canCloseModal = true;

    // shows continue btn if necessary
    if (
      !ENCRYPTION_STEPS[currentStep].hasFile &&
      currentStep !== ENCRYPTION_STEPS.length - 1
    )
      continueBtnWrapperElement.hidden = false;
    else continueBtnWrapperElement.hidden = true;

    if (nextStepInfo.isInput) {
      const onclickCB = () => {
        const val = nextStepInfo.element.value;
        if (val && nextStepInfo.element.checkValidity()) {
          replies.push(val);
          continueBtnElement.removeEventListener("click", onclickCB);
          nextStep();
        }
      };

      continueBtnElement.addEventListener("click", onclickCB);
    }

    updateModalContent();
  }

  function updateModalContent() {
    const stepDetails = ENCRYPTION_STEPS[currentStep];

    removeAllChild(modalBodyElement);

    // need to hide modal body
    if (stepDetails.isProgress) return;

    modalBodyElement.appendChild(stepDetails.element);

    if (stepDetails.hasFile) {
      modalBodyElement.appendChild(fileLabelElem);
    }
  }

  // function _updateProgress(percent) {
  //   if (percent >= 100) {
  //     hideProgressView();
  //     nextStep();
  //   } else if (!modalBodyElement.classList.contains("hidden")) {
  //     showProgressView();
  //   }

  //   updateProgress(percent);
  // }
}

// close modal only when enabled by the program
function closeModal() {
  if (!canCloseModal) return alert("can't close the popup right now");

  modalElement.hidden = true;

  // removes all steps
  removeAllChild(modalStepsElement);
  // removes all body
  removeAllChild(modalBodyElement);
}

document.getElementById("compressBtn").onclick = function () {
  modalElement.hidden = false;
  showCompressionModal("compress");
};

document.getElementById("decompressBtn").onclick = function () {
  modalElement.hidden = false;
  showCompressionModal("decompress");
};

document.getElementById("encryptBtn").onclick = function () {
  modalElement.hidden = false;
  showEncryptionModal("encrypt");
};

document.getElementById("decryptBtn").onclick = function () {
  modalElement.hidden = false;
  showEncryptionModal("decrypt");
};

document.getElementById("modalCloseBtn").onclick = function () {
  console.log("closing");
  closeModal();
};
