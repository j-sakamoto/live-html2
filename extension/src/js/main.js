import axios from 'axios';

function startConvert() {
  const targets = document.querySelectorAll("pre>code")
  Array.from(targets).forEach(target => {
    const params = {
      html: String(target.innerText)
    }
    axios.post("http://localhost:3000/transcode", params)
      .then(res => {
        const result = res.data.result
        target.innerText = result
      })
  })
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if(request.startConvert) {
    startConvert();
    response({
      startedExtension: true,
    });
  }
});
