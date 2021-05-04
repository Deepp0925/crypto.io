/**
 * will create a drop down list
 * @param {*} algorithms - array of string values
 * @returns HTMLElement
 */
function createSelectElem(algorithms) {
  const selectElem = document.createElement("select");
  selectElem.id = "dropdown";
  selectElem.required = true;
  selectElem.classList.add("select");

  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Choose an algorithm";
  defaultOption.value = "";

  defaultOption.selected = true;
  defaultOption.disabled = true;
  selectElem.appendChild(defaultOption);

  for (const algorithm of algorithms) {
    const option = document.createElement("option");
    option.value = algorithm;
    option.innerHTML = algorithm;
    selectElem.appendChild(option);
  }

  return selectElem;
}
/**
 * will create a file input element
 * @returns HTMLElement
 */
function createFileElem() {
  const fileElem = document.createElement("input");
  fileElem.setAttribute("type", "file");
  fileElem.setAttribute("id", "fileInput");
  fileElem.classList.add("file-input");

  return fileElem;
}

/**
 * will create a label for file input element
 * @returns HTMLElement
 */
function createFileLabelElem() {
  const fileLabelElem = document.createElement("label");
  fileLabelElem.setAttribute("for", "fileInput");
  fileLabelElem.classList.add("file-input-label");
  fileLabelElem.innerHTML = "Upload a File";

  return fileLabelElem;
}

/**
 * will create a password input field
 * @returns HTMLElement
 */
function createPasswordInputElem() {
  const inputElem = document.createElement("input");
  inputElem.required = true;
  inputElem.minLength = 8;
  inputElem.placeholder = "Password";
  inputElem.type = "password";
  inputElem.classList.add(
    "w-1/2",
    "p-2",
    "py-3",
    "border-2",
    "border-gray-400",
    "rounded-md"
  );

  return inputElem;
}

/**
 * remove all child element of a given element
 * @param {*} parentElement
 */
function removeAllChild(parentElement) {
  // removes all steps
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
