window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const type = event.data.type;
  switch (type) {
    case 'SET_TEXT': setText(event.data.text); break;
    case 'GET_TEXT':
      const text = getText();
      event.source.postMessage({
        type: 'GET_TEXT',
        text
      }, event.origin);
      break;
  }
}

function setText(text) {
  const analyzeBtn = document.querySelector("#analyzerRoot .MuiButton-label");
  const editableDiv = getEditableDiv();

  if (editableDiv.previousSibling) {
    editableDiv.previousSibling.style.display = 'none';
  }

  editableDiv.textContent = text;
  analyzeBtn.click();
}

function getText() {
  const editableDiv = getEditableDiv();
  return editableDiv.textContent;
}

function getEditableDiv() {
  return document.querySelector("#analyzerRoot div[contenteditable=true]");
}