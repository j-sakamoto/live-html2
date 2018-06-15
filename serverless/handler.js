'use strict';
const html2pug = require("html2pug")

const pug = (html) => {
  return html2pug(html, { fragment: true })
}

const buildResponse = (status, data) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data)
  }
}

const parseBody = (body) => {
  try {
    return JSON.parse(body)
  }
  catch (e) {
    return {}
  }
}

const transcode = (html, dest = "pug") => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (typeof html == "undefined" || typeof html == "null") throw new Error("html required.");
        let transcoder
        switch (dest) {
          case "pug":
            transcoder = pug
            break;
          default:
            new Error("undefined transcoder.")
        }
        const transcoded = transcoder(html)
        resolve(transcoded)
      }
      catch (e) {
        reject(e)
      }
    }, 0)
  })
}

module.exports.transcode = (event, context, callback) => {
  const params = parseBody(event.body)
  transcode(params.html)
    .then(result => {
      const response = buildResponse(200, { result: result })
      callback(null, response);
    })
    .catch(e => {
      log(e)
      callback(401, null)
    })
};
