// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" },
  );
});

// Scroll to Contact
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Reveal Elements on Scroll
const observerOptions = {
  threshold: 0.2, // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

const processSteps = document.querySelectorAll(".process-step");
processSteps.forEach((step) => {
  observer.observe(step);
});

// --- Language Toggle Logic ---
// --- Language Toggle Logic ---
// --- Language Toggle Logic ---
function toggleLanguage() {
  const body = document.body;
  const emailInput = document.getElementById("senderEmail");
  const subjectInput = document.getElementById("subject");

  if (body.classList.contains("lang-en")) {
    // Switch to TR
    body.classList.remove("lang-en");
    body.classList.add("lang-tr");
    if (emailInput) emailInput.placeholder = "E-Posta Adresiniz...";
    if (subjectInput) subjectInput.placeholder = "Proje Açıklaması...";
  } else if (body.classList.contains("lang-tr")) {
    // Switch to AR
    body.classList.remove("lang-tr");
    body.classList.add("lang-ar");
    if (emailInput) emailInput.placeholder = "بريدك الإلكتروني...";
    if (subjectInput) subjectInput.placeholder = "وصف المشروع...";
  } else {
    // Switch back to EN
    body.classList.remove("lang-ar");
    body.classList.add("lang-en");
    if (emailInput) emailInput.placeholder = "Your Email...";
    if (subjectInput) subjectInput.placeholder = "Project Description...";
  }
}

// Email Handling
function handleEmail(event) {
  event.preventDefault(); // Stop default form submittion which refreshes page

  const senderEmail = document.getElementById("senderEmail").value;
  const subjectRaw = document.getElementById("subject").value;
  const recipient = "richeracx@gmail.com";

  // Construct Mailto Link
  const subject = encodeURIComponent(
    "Request from Taha Website: " + (subjectRaw || "Inquiry"),
  );

  let bodyText = "Hello Taha Team,\n\n";
  bodyText += "I initiated a request via the website.\n\n";
  bodyText += "Project Description: " + subjectRaw + "\n";
  bodyText += "My Contact Email: " + senderEmail + "\n\n";
  bodyText += "Details:\n";

  const body = encodeURIComponent(bodyText);

  // Open email client
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

  // UI Feedback
  const btnText = document.querySelector(".send-btn .btn-text");
  // Save original to restore later logic is a bit complex with two langs,
  // so let's just do a simple generic feedback
  const originalHTML = btnText.innerHTML;

  let sendingText = "Opening...";
  if (document.body.classList.contains("lang-tr")) sendingText = "Açılıyor...";
  if (document.body.classList.contains("lang-ar"))
    sendingText = "جاري الفتح...";

  btnText.innerText = sendingText;

  setTimeout(() => {
    btnText.innerHTML = originalHTML;
  }, 3000);
}
