
// NeuralOps Floating Assistant
document.addEventListener("DOMContentLoaded", function () {
  const assistantHTML = `
    <div id="neural-assistant-widget">
      <div id="neural-chat-icon">💬</div>
      <div id="neural-chat-box" class="hidden">
        <div id="neural-chat-header">NeuralOps Assistant</div>
        <div id="neural-chat-content"></div>
        <input type="text" id="neural-chat-input" placeholder="Type your response..." />
        <button id="neural-chat-send">Send</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", assistantHTML);

  const icon = document.getElementById("neural-chat-icon");
  const box = document.getElementById("neural-chat-box");
  const input = document.getElementById("neural-chat-input");
  const send = document.getElementById("neural-chat-send");
  const content = document.getElementById("neural-chat-content");

  const flow = [
    { type: "choice", text: "Hi! Want help exploring or finding an AI solution?", options: ["Show me around", "I need AI help"] },
    { type: "text", key: "business", text: "What kind of business are you in?" },
    { type: "text", key: "pain", text: "What's your biggest operational headache?" },
    { type: "text", key: "tools", text: "What tools do you currently use (e.g. Notion, Sheets, CRM)?" }
  ];

  let step = 0;
  const answers = {};

  function showMessage(text, from = "bot") {
    const div = document.createElement("div");
    div.className = `msg ${from}`;
    div.textContent = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
  }

  function askNext() {
    if (step >= flow.length) {
      showMessage("Thanks! We recommend our KPI Watchdog Agent. Want us to send you a proposal?");
      showMessage("Click below to send your answers to us:");
      const btn = document.createElement("button");
      btn.textContent = "Send Proposal";
      btn.onclick = () => {
        const mailto = `mailto:xavier@yourdomain.com?subject=NeuralOps Proposal&body=Business: ${answers.business}%0AIssue: ${answers.pain}%0ATools: ${answers.tools}`;
        window.location.href = mailto;
      };
      content.appendChild(btn);
      return;
    }

    const q = flow[step];
    if (q.type === "choice") {
      showMessage(q.text);
      q.options.forEach(option => {
        const b = document.createElement("button");
        b.textContent = option;
        b.onclick = () => {
          showMessage(option, "user");
          step++;
          askNext();
        };
        content.appendChild(b);
      });
    } else {
      showMessage(q.text);
    }
  }

  send.onclick = () => {
    const val = input.value.trim();
    if (!val) return;
    const q = flow[step];
    showMessage(val, "user");
    if (q.key) answers[q.key] = val;
    input.value = "";
    step++;
    askNext();
  };

  icon.onclick = () => box.classList.toggle("hidden");

  askNext();
});
