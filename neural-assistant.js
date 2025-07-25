document.addEventListener("DOMContentLoaded", function () {
  const assistantHTML = `
    <div id="neural-popup-overlay">
      <div id="neural-popup-box">
        <h2 class="popup-title">
          NeuralOps Manager <span id="typing-indicator" class="dots hidden"></span>
        </h2>
        <div id="popup-chat-area"></div>
        <div class="popup-buttons" id="popup-buttons">
          <button class="popup-btn" id="popup-tour">Show Me Around</button>
          <button class="popup-btn" id="popup-help">I Need AI Help</button>
        </div>
        <div id="popup-followup" class="hidden">
          <input id="popup-user-input" type="text" placeholder="Type your response..." disabled />
          <button class="popup-btn" id="popup-submit">Submit</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", assistantHTML);

  const chatArea = document.getElementById("popup-chat-area");
  const typingIndicator = document.getElementById("typing-indicator");
  const buttonBlock = document.getElementById("popup-buttons");
  const followupBlock = document.getElementById("popup-followup");
  const inputField = document.getElementById("popup-user-input");
  const submitBtn = document.getElementById("popup-submit");

  const routes = {
    contact: "contact.html",
    intelligence: "intelligence.html",
    process: "process.html",
    privacy: "privacy.html",
    copyright: "copyright.html"
  };

  function simulateTyping(text, delay = 35, callback) {
    typingIndicator.classList.remove("hidden");
    chatArea.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        chatArea.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        typingIndicator.classList.add("hidden");
        if (callback) callback();
      }
    }, delay);
  }

  function handleResponse(input) {
    const key = input.toLowerCase().trim();
    let match = Object.keys(routes).find(k => key.includes(k));
    let target = routes[match] || "contact.html";
    window.location.href = target;
  }

  document.getElementById("popup-tour").onclick = () => {
    buttonBlock.classList.add("hidden");
    simulateTyping("Which part of NeuralOps are you most curious about? (e.g. intelligence, process, contact, privacy, copyright)", 35, () => {
      followupBlock.classList.remove("hidden");
      inputField.disabled = false;
      inputField.focus();
    });
  };

  document.getElementById("popup-help").onclick = () => {
    buttonBlock.classList.add("hidden");
    simulateTyping("Tell me what kind of AI assistance you’re looking for and I’ll guide you.", 35, () => {
      followupBlock.classList.remove("hidden");
      inputField.disabled = false;
      inputField.focus();
    });
  };

  submitBtn.onclick = () => {
    const userInput = inputField.value;
    if (userInput.trim()) {
      chatArea.innerHTML += "<br><strong>You:</strong> " + userInput;
      followupBlock.classList.add("hidden");
      inputField.disabled = true;
      simulateTyping("Got it. Routing you now...", 25, () => {
        handleResponse(userInput);
      });
    }
  };

  setTimeout(() => {
    simulateTyping(
      "I'm here to guide you through the site or help you discover the perfect AI for your business. What would you like to do?",
      30
    );
  }, 500);
});
