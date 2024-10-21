document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  const move = () => {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  };

  window.addEventListener('mousemove', event => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

function clicktocopy() {
  var copyText = document.getElementById("sirdug");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}

var countDownDate = new Date("August 18, 2024 12:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function toggleDropdown() {
  const dropdown = document.getElementById('aboutDropdown');
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdown.classList.add('hide');
  } else {
    dropdown.classList.remove('hide');
    dropdown.classList.add('show');
  }
}