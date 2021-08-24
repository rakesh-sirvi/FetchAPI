import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import highLight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);

  const fetch_api = (url, method) => {
    if (url) {
      axios({
        method: method,
        url: url,
      })
        .then((res) => {
          setHistory((prev) => [...prev, url]);
          setResponse({ config: res.config, data: res.data });
        })
        .catch((err) =>
          setResponse({ config: err.config, data: { message: err.message } })
        );
    }
  };

  const pretty = (data) => {
    return highLight.highlight(JSON.stringify(data, null, 2).toString(), {
      language: "json",
    }).value;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h3>Fetch API JSON Pretty Print</h3>
      </header>
      <div className="container">
        <div className="input">
          <input
            placeholder="Enter Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="methods">
          <button className="btn btn-get" onClick={() => fetch_api(url, "GET")}>
            get
          </button>
          <button
            className="btn btn-post"
            onClick={() => fetch_api(url, "POST")}
          >
            post
          </button>
        </div>
        <button
          className="btn btn-history"
          onClick={() => setShow((prev) => !prev)}
        >
          SHOW/HIDE History
        </button>
        {response && (
          <pre>
            {show && (
              <code
                className="language-json hljs"
                dangerouslySetInnerHTML={{ __html: pretty(history) }}
              ></code>
            )}
            <code
              className="language-json hljs"
              dangerouslySetInnerHTML={{ __html: pretty(response.config) }}
            ></code>
            <code
              className="language-json hljs"
              dangerouslySetInnerHTML={{ __html: pretty(response.data) }}
            ></code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
