document.addEventListener("DOMContentLoaded", function () {
  const assistantHTML = `
    <div id="neural-popup-overlay">
      <div id="neural-popup-box">
        <h2 class="popup-title">Meet the NeuralOps Manager</h2>
        <p class="popup-message">I'm here to guide you through the site or help you discover the perfect AI for your business. What would you like to do?</p>
        <div class="popup-buttons">
          <button class="popup-btn" id="popup-tour">Show Me Around</button>
          <button class="popup-btn" id="popup-help">I Need AI Help</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", assistantHTML);

  document.getElementById("popup-tour").onclick = () => {
    window.location.href = "intelligence.html#services";
  };

  document.getElementById("popup-help").onclick = () => {
    window.location.href = "contact.html";
  };
});
