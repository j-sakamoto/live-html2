'use strict';

const html2pug = require("html2pug")
const exec = require("child-process-es6-promise").exec

const pug = (html) => {
  return html2pug(html, { fragment: true })
}

const haml = (html) => {
  return execRubyCommand(`echo '${html}' | html2haml -e --stdin`)
}

const slim = (html) => {
  return execRubyCommand(`echo '${html}' | html2slim`)
}

const execRubyCommand = (command) => {
  return exec(command).then(result => result.stdout)
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

        if (["pug", "haml", "slim"].includes(dest))
          transcoder = eval(dest);
        else
          new Error("undefined transcoder.");

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
  transcode(params.html, params.dest)
    .then(result => {
      const response = buildResponse(200, { result: result })
      callback(null, response);
    })
    .catch(e => {
      console.log(e)
      callback(401, null)
    })
};
