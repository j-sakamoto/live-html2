window.onload = () => {
  const startButton = document.querySelector('.start');

  startButton.onclick = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { startConvert: true },
        response => window.close()
      );
    });
  };
}
