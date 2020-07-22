window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const analyzeBtn = document.querySelector("#analyzerRoot .MuiButton-label");
  const editableDiv = document.querySelector("#analyzerRoot div[contenteditable=true]");

  if (editableDiv.previousSibling) {
    editableDiv.previousSibling.style.display = 'none';
  }

  editableDiv.textContent = event.data;
  analyzeBtn.click();
}