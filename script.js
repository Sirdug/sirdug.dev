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

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdown.classList.add('hide');
  } else {
    dropdown.classList.remove('hide');
    dropdown.classList.add('show');
  }
}

function closeDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.remove('show');
  dropdown.classList.add('hide');
}

function setServerStatus(serverId, isUp) {
  const statusDot = document.getElementById(serverId);
  if (isUp) {
    statusDot.classList.add('green');
    statusDot.classList.remove('red');
  } else {
    statusDot.classList.add('red');
    statusDot.classList.remove('green');
  }
}

function pingServer(ip, port, serverId) {
  fetch(`/ping?ip=${ip}&port=${port}`)
    .then(response => response.json())
    .then(data => {
      setServerStatus(serverId, data.status === 'up');
    })
    .catch(error => {
      console.error('Error pinging server:', error);
      setServerStatus(serverId, false);
    });
}

// Example usage
setInterval(() => {
  pingServer('localhost', 3000, 'server1-status'); // Replace with your server IP and port
  pingServer('192.168.1.2', 80, 'server2-status'); // Replace with your server IP and port
}, 5000); // Ping every 5 seconds