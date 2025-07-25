// NeuralOps AI Assistant
class NeuralAssistant {
  constructor() {
    this.isInitialized = false;
    this.hasShown = false;
    this.routes = {
      intelligence: "intelligence.html",
      ai: "intelligence.html",
      artificial: "intelligence.html",
      machine: "intelligence.html",
      automation: "intelligence.html",
      process: "process.html",
      workflow: "process.html",
      how: "process.html",
      work: "process.html",
      contact: "contact.html",
      support: "contact.html",
      help: "contact.html",
      privacy: "privacy.html",
      policy: "privacy.html",
      legal: "privacy.html",
      copyright: "copyright.html",
      terms: "copyright.html"
    };
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    const assistantHTML = `
      <div id="neural-popup-overlay">
        <div id="neural-popup-box">
          <button class="close-btn" id="close-assistant">&times;</button>
          <h2 class="popup-title">
            NeuralOps Manager
            <div id="typing-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
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
    this.bindEvents();
    this.isInitialized = true;
  }

  bindEvents() {
    this.chatArea = document.getElementById("popup-chat-area");
    this.typingIndicator = document.getElementById("typing-indicator");
    this.buttonBlock = document.getElementById("popup-buttons");
    this.followupBlock = document.getElementById("popup-followup");
    this.inputField = document.getElementById("popup-user-input");
    this.submitBtn = document.getElementById("popup-submit");
    this.overlay = document.getElementById("neural-popup-overlay");

    // Event listeners
    document.getElementById("popup-tour").onclick = () => this.handleTourClick();
    document.getElementById("popup-help").onclick = () => this.handleHelpClick();
    document.getElementById("popup-submit").onclick = () => this.handleSubmit();
    document.getElementById("close-assistant").onclick = () => this.hide();
    
    // Enter key support
    this.inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !this.inputField.disabled) {
        this.handleSubmit();
      }
    });

    // Click outside to close
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });
  }

  show() {
    if (!this.hasShown) {
      this.overlay.style.display = "flex";
      setTimeout(() => {
        this.overlay.classList.add("show");
        this.startIntroSequence();
      }, 100);
      this.hasShown = true;
    }
  }

  hide() {
    this.overlay.classList.remove("show");
    setTimeout(() => {
      this.overlay.style.display = "none";
    }, 300);
  }

  reset() {
    this.hasShown = false;
    this.hide();
    setTimeout(() => {
      this.resetUI();
    }, 400);
  }

  resetUI() {
    this.chatArea.innerHTML = "";
    this.buttonBlock.classList.remove("hidden", "show");
    this.followupBlock.classList.add("hidden");
    this.followupBlock.classList.remove("show");
    this.inputField.value = "";
    this.inputField.disabled = true;
    this.typingIndicator.classList.remove("show");
  }

  startIntroSequence() {
    setTimeout(() => {
      this.simulateTyping(
        "Hello! I'm your NeuralOps Manager. I'm here to guide you through our AI solutions or help you find exactly what you're looking for.",
        30,
        () => {
          setTimeout(() => {
            this.simulateTyping(
              "What would you like to do today?",
              25,
              () => {
                this.buttonBlock.classList.add("show");
              }
            );
          }, 800);
        }
      );
    }, 1000);
  }

  simulateTyping(text, delay = 35, callback) {
    this.typingIndicator.classList.add("show");
    this.chatArea.innerHTML = "";
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < text.length) {
        this.chatArea.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        this.typingIndicator.classList.remove("show");
        if (callback) callback();
      }
    }, delay);
  }

  handleTourClick() {
    this.buttonBlock.classList.add("fade-out");
    setTimeout(() => {
      this.buttonBlock.classList.add("hidden");
      this.simulateTyping(
        "Perfect! I can show you around our different areas. What interests you most?<br><br>• <strong>AI Intelligence</strong> - Our core AI systems<br>• <strong>Process & Workflows</strong> - How we work<br>• <strong>Legal & Privacy</strong> - Policies and compliance<br>• <strong>Contact & Support</strong> - Get in touch<br><br>Just type what you're interested in:",
        25,
        () => {
          this.showFollowup();
        }
      );
    }, 300);
  }

  handleHelpClick() {
    this.buttonBlock.classList.add("fade-out");
    setTimeout(() => {
      this.buttonBlock.classList.add("hidden");
      this.simulateTyping(
        "Great! I'm here to help you find the right AI solution. Tell me more about what you're looking for:<br><br>• What kind of business challenge are you trying to solve?<br>• Are you interested in automation, intelligence, or workflow optimization?<br>• Do you need technical details or just an overview?<br><br>Type your response below:",
        25,
        () => {
          this.showFollowup();
        }
      );
    }, 300);
  }

  showFollowup() {
    this.followupBlock.classList.remove("hidden");
    setTimeout(() => {
      this.followupBlock.classList.add("show");
      this.inputField.disabled = false;
      this.inputField.focus();
    }, 100);
  }

  handleSubmit() {
    const userInput = this.inputField.value.trim();
    if (!userInput) return;

    // Show user message
    this.chatArea.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
    
    // Hide followup and disable input
    this.followupBlock.classList.remove("show");
    setTimeout(() => {
      this.followupBlock.classList.add("hidden");
      this.inputField.disabled = true;
    }, 300);

    // Process response
    setTimeout(() => {
      this.simulateTyping(
        `Perfect! Based on what you've told me, I think I know exactly where to take you. <span class="loading-dots">Routing you now</span>`,
        25,
        () => {
          setTimeout(() => {
            this.handleResponse(userInput);
          }, 2000);
        }
      );
    }, 500);
  }

  handleResponse(input) {
    const key = input.toLowerCase();
    
    // Check for direct keyword matches
    for (let keyword in this.routes) {
      if (key.includes(keyword)) {
        this.navigateTo(this.routes[keyword]);
        return;
      }
    }

    // Fallback logic with better categorization
    if (key.includes("ai") || key.includes("smart") || key.includes("automation") || 
        key.includes("machine") || key.includes("neural") || key.includes("algorithm")) {
      this.navigateTo("intelligence.html");
    } else if (key.includes("how") || key.includes("work") || key.includes("process") || 
              key.includes("workflow") || key.includes("step") || key.includes("method")) {
      this.navigateTo("process.html");
    } else if (key.includes("legal") || key.includes("policy") || key.includes("privacy") || 
              key.includes("data") || key.includes("compliance") || key.includes("terms")) {
      this.navigateTo("privacy.html");
    } else if (key.includes("contact") || key.includes("support") || key.includes("help") || 
              key.includes("question") || key.includes("talk") || key.includes("discuss")) {
      this.navigateTo("contact.html");
    } else {
      // Default to intelligence page for business-related queries
      this.navigateTo("intelligence.html");
    }
  }

  navigateTo(page) {
    // Navigate to the specified page
    window.location.href = page;
    
    // Optionally hide the assistant after routing
    setTimeout(() => {
      this.hide();
    }, 1000);
  }
}

// Initialize the assistant when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  const neuralAssistant = new NeuralAssistant();
  
  // Auto-show after a brief delay
  // You can control this with localStorage to implement "don't show again" functionality
  setTimeout(() => {
    // Check if user has seen assistant before (optional)
    // if (!localStorage.getItem('hasSeenNeuralAssistant')) {
      neuralAssistant.show();
    //   localStorage.setItem('hasSeenNeuralAssistant', 'true');
    // }
  }, 1500);
  
  // Expose globally for manual control (optional)
  window.neuralAssistant = neuralAssistant;
});
