import { useState, useEffect, use } from "react";
import "prismjs/themes/prism-tomorrow.css";
import editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import prism from "prismjs";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import "./App.css";
import Editor from "react-simple-code-editor";

function App() {
  useEffect(() => {
    prism.highlightAll();
  });
  const [code, Setcode] = useState(`//Enter your code here
`);
  const [loading, setLoading] = useState(false);

  const [review, setreview] = useState(``);
  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setreview(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="hero">
      <div className="logo">
        <img src="logo.png"></img>
      </div>

      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => Setcode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code","Fira Mono",monospace',
                fontSize: 15,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          </div>
          <div
            onClick={!loading ? reviewCode : null}
            className={`review ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <div className="spinner-wrapper">
                <div className="spinner"></div>
                Reviewing...
              </div>
            ) : (
              "Review"
            )}
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </div>
  );
}

function sum() {
  return 1 + 1;
}

export default App;
