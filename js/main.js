let alarmTime = null;
let alarmTriggered = false;
let ringtone = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
);
let clockInterval = null;
let rating = 0;

window.show = function (type, el) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");

  const port = document.getElementById("view-port");
//containers
  if (type === "counter") {
    port.innerHTML = `  <div id="text-area">
                <form action="">
                    <span id="count">280</span><br>
                    <textarea id="bio" maxlength="280"></textarea><br>
                    <button type="submit" id="post" disabled>submit</button>      
                </form>
            </div>`;

    const textarea = document.getElementById("bio");
    const btn = document.getElementById("post");
    const countDisplay = document.getElementById("count");
    const max_Length = 280;

    if (textarea && btn && countDisplay) {
      textarea.addEventListener("input", () => {
        const currentLength = textarea.value.length;
        const remaining = max_Length - currentLength;

        countDisplay.textContent = remaining;

        if (remaining <= 0) {
          countDisplay.style.color = "red";
        } else {
          countDisplay.style.color = "black";
        }
        if (currentLength === 0 || currentLength === max_Length) {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      });
    }
  }
  //star rating
  if (type === "stars") {
    port.innerHTML = `<div class="star-widget">
                <div id="stars-container">
                    <span class="star" style="cursor:pointer; font-size:30px;">&#9733;</span>
                    <span class="star" style="cursor:pointer; font-size:30px;">&#9733;</span>
                    <span class="star" style="cursor:pointer; font-size:30px;">&#9733;</span>
                    <span class="star" style="cursor:pointer; font-size:30px;">&#9733;</span>
                    <span class="star" style="cursor:pointer; font-size:30px;">&#9733;</span>
                </div>
                <p id="rating-text">Select a rating</p>
            </div>`;
    const stars = document.querySelectorAll(".star");
    const text = document.getElementById("rating-text");

    const labels = {
      0.5: "Poor",
      1: "Poor",
      1.5: "Poor",
      2: "Poor",
      2.5: "Good",
      3: "Good",
      3.5: "Good",
      4: "Good",
      4.5: "Excellent",
      5: "Excellent",
    };
    if (stars && text && labels) {
      stars.forEach((star, i) => {
        const val = i + 1;

        star.onmousemove = (e) => {
          const rect = star.getBoundingClientRect();
          const x = e.clientX - rect.left;
        
          if (x < rect.width / 2) {
            fill(val - 0.5);
          } else {
            fill(val);
          }
        };
        star.onmouseleave = () => fill(rating);

        star.onclick = (e) => {
          const rect = star.getBoundingClientRect();
          const x = e.clientX - rect.left;
        
          if (x < rect.width / 2) {
            rating = val - 0.5;
          } else {
            rating = val;
          }
          text.innerText = labels[rating] || (rating + " stars");
        };
      });

      function fill(num) {
        stars.forEach((s, i) => {
          const starIndex = i + 1;
      
          if (starIndex <= num) {
            s.style.color = "gold";
            s.style.background = "none";
            s.style.webkitTextFillColor = "";
          } else if (starIndex - 0.5 === num) {
            s.style.background = "linear-gradient(to left, gold 50%, lightgray 50%)";
            s.style.webkitBackgroundClip = "text";
            s.style.webkitTextFillColor = "transparent";
          } else {
            s.style.color = "lightgray";
            s.style.background = "none";
            s.style.webkitTextFillColor = "";
          }
        });
      }
    }
  }

  //tabs component
  else if (type === "tabs") {
    port.innerHTML = `

<div class="container text-center">
<div class="main-card shadow p-4 p-md-5">
    <h1 id="title" class="mb-3">welcome to the web</h1>
    <p class="text-muted mb-4">Simply: CSS for Look, and JavaScript for Interaction.</p>
    
    <div class="row justify-content-center mb-4">
    <div class="col-md-8">
        <input 
            type="text" 
            id="user-input" 
            class="form-control" 
            placeholder="enter your name :"
            dir="ltr"
            oninput="this.value = this.value.replace(/[^A-Za-z\s]/g, '')">
    </div>
</div>

    <div id="display-area" class="p-4 border mb-4 d-flex flex-column justify-content-center align-items-center">
        <p id="message" class="fs-5 mb-2">I am static HTML text.</p>
        <h3 id="counter-text" class="fw-bold"> Interactions: 0</h3>
    </div>

    <div class="row justify-content-center gap-2 gap-md-0">
        <div class="col-md-4">
            <button id="btn-style" class="btn btn-outline-leaf w-100 py-2" >🎨 CSS Touch (Style)</button>
        </div>
        <div class="col-md-4">
            <button id="btn-action" class="btn btn-outline-river w-100 py-2">⚡ JS Power (Action)</button>
        </div>
        <div class="col-md-4">
            <button id="btn-reset" class="btn btn-outline-earth w-100 py-2"> 🔄 Reset All</button>
        </div>
    </div>
</div>
</div>
`;

    const displayArea = document.getElementById("display-area");
    const message = document.getElementById("message");
    const counterText = document.getElementById("counter-text");
    const userInput = document.getElementById("user-input");

    let count = 0;
    document.getElementById("btn-style").addEventListener("click", () => {
        displayArea.classList.toggle("design-style");
        message.classList.toggle("bg-text-style"); 
      });

    document.getElementById("btn-action").addEventListener("click", () => {
      count++;
      counterText.innerText = "Interactions: " + count;

      let name = userInput.value;
      if (name === "") {
        message.innerText = "Please enter your name first!";
        message.style.color = "#a52a2a";
      } else {
        message.innerText =
          "Welcome, " + name + "! JS has recorded " + count + " interactions.";
        message.style.color = "white";
        message.style.background = " #355a74";
      }
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
      count = 0;
      counterText.innerText = "Interactions: 0";
      counterText.style.color = "#4a4a4a";
      message.innerText = "I am static HTML text.";
      message.style.color = "";
      userInput.value = "";
      displayArea.classList.remove("design-style");
      message.classList.remove("bg-text-style");
      message.style.background = "";
    });
  }
  //digital clock with alarm
  if (type === "clock") {
    port.innerHTML = `
    <div class="container d-flex justify-content-center align-items-center">
        <div class="main-card shadow-sm p-4 text-center" style="border-radius: 20px; background: #fff; width: 100%; max-width: 500px;">
            <h3 class="mb-4 text-primary">Digital Clock</h3>
            
            <div id="time" class="display-4 mb-4" style="font-family: sans-serif; color: #333; background: #f8f9fa; padding: 20px; border-radius: 15px;">
                00:00:00
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <input type="time" id="alTime" class="form-control">
                    <button class="btn btn-primary" onclick="setAl()">Set Alarm</button>
                </div>
            </div>

            <div id="alUI" class="p-3 bg-light mt-3" style="display:none; border-radius: 15px; border: 1px solid #ffcccc;">
                <h4 class="text-danger">⏰ Wake up!</h4>
                <div class="d-flex gap-2 justify-content-center mt-2">
                    <button class="btn btn-warning" onclick="snz()">Snooze</button>
                    <button class="btn btn-danger" onclick="stopAlarm()">Stop</button>
                </div>
            </div>
        </div>
    </div>
    `;

    window.setAl = function () {
      const input = document.getElementById("alTime").value;
      if (!input) {
        alert("Please select a time");
        return;
      }
      alarmTime = input; 
      alarmTriggered = false;
      ringtone.play().then(() => {
        ringtone.pause();
        ringtone.currentTime = 0;
      });
      alert("Alarm set for " + alarmTime);
    };

window.stopAlarm = function() {
  if (ringtone) {
      ringtone.pause();        
      ringtone.currentTime = 0; 
      ringtone.loop = false;    
  }
  
  document.getElementById("alUI").style.display = "none";
  alarmTriggered = false;
  alarmTime = null; 
};

window.snz = function() {
  if (ringtone) {
      ringtone.pause();
      ringtone.currentTime = 0;
  }
  
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);
  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");
  alarmTime = `${h}:${m}`;
  
  alarmTriggered = false;
  document.getElementById("alUI").style.display = "none";
  alert("تم تأجيل المنبه إلى: " + alarmTime);
};};
if (clockInterval) {
  clearInterval(clockInterval);
}
clockInterval = setInterval(() => {
  const now = new Date();
  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");
  let s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("time").innerText = `${h}:${m}:${s}`;

  if (alarmTime === `${h}:${m}` && !alarmTriggered) {
    alarmTriggered = true;

    ringtone.loop = true;
    ringtone.play();

    document.getElementById("alUI").style.display = "block";
  }
}, 1000);}
