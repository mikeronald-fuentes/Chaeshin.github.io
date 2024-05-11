// typewriter effect
const words = ['Software Engineer', 'Backend Developer', 'FullStack Developer']

let mainTimeline = gsap.timeline({
    repeat: -1
})

words.forEach(word => {
    let textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 4
    })

    textTimeline.to('#typewriter',{
        text: word,
        duration: 1,
        onUpdate: () => {
            cursorTimeline.restart()
            cursorTimeline.pause()
        },
        onComplete: () => {
            cursorTimeline.play()
        }
    })

    mainTimeline.add(textTimeline)
})

let cursorTimeline = gsap.timeline({
    repeat: -1, 
    repeatDelay: .8
})

cursorTimeline.to('#cursor', {
    opacity: 1,
    duration: 0
}).to('#cursor', {
    opacity: 0,
    duration: 0, 
    delay: 0.5
})


// cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

document.addEventListener("scroll", function() {
  const sections = document.querySelectorAll('about-container', 'about-me-pic');

  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.getBoundingClientRect().height;

      if (sectionTop <= (window.innerHeight || document.documentElement.clientHeight) - sectionHeight / 3) {
          section.style.opacity = 1;
          section.style.transform = 'translateY(0)';
      }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
          targetSection.scrollIntoView({ 
              behavior: 'smooth'
          });
      }
  });
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  var formData = new FormData(event.target);

  // Display loading message
  var statusMessage = document.getElementById("status-message");

  // Send form data using Fetch API
  fetch("https://formspree.io/f/xzbnwebk", {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
          // If request is successful, display success message
          statusMessage.textContent = "Message sent successfully!";
      } else {
          // If request fails, display error message
          statusMessage.textContent = "Failed to send message. Please try again later.";
      }
  })
});


