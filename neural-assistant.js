document.addEventListener("DOMContentLoaded", function () {
  const assistantHTML = `
    <div id="neural-popup-overlay">
      <div id="neural-popup-box">
        <h2 class="popup-title">
          NeuralOps Manager <span id="typing-indicator" class="dots hidden"></span>
        </h2>
        <div id="popup-chat-area"></div>
        <div class="popup-buttons hidden" id="popup-buttons">
          <button class="popup-btn" id="popup-tour">Show Me Around</button>
          <button class="popup-btn" id="popup-help">I Need AI Help</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", assistantHTML);

  const chatArea = document.getElementById("popup-chat-area");
  const typingIndicator = document.getElementById("typing-indicator");
  const buttonBlock = document.getElementById("popup-buttons");

  function simulateTyping(text, delay = 40, callback) {
    typingIndicator.classList.remove("hidden");
    let i = 0;
    chatArea.innerHTML = ""; // clear previous content
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

  // Start simulated intro
  setTimeout(() => {
    simulateTyping(
      "I'm here to guide you through the site or help you discover the perfect AI for your business. What would you like to do?",
      30,
      () => {
        buttonBlock.classList.remove("hidden");
      }
    );
  }, 1000);

  // Button handlers
  document.getElementById("popup-tour").onclick = () => {
    window.location.href = "intelligence.html#services";
  };

  document.getElementById("popup-help").onclick = () => {
    window.location.href = "contact.html";
  };
});
