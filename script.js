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

function leaveConf() {
  if (isChromeOS()) {
    window.onbeforeunload = function() {
      return "Are you sure you want to leave?";
    };
  } else {
    if (window.onbeforeunload) {
      window.onbeforeunload = null;
    } else {
      window.onbeforeunload = function() {
        return "Are you sure you want to leave?";
      };
    }
  }
}

// Call the leaveConf function on page load to ensure it's enabled for Chrome OS users.
document.addEventListener("DOMContentLoaded", leaveConf);

function isChromeOS() {
  return navigator.userAgent.includes("CrOS");
}

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


let isTerminalMaximized = false;
let isTerminalMinimized = false;
let originalTerminalSize = {
    width: null,
    height: null
};

// Add event listeners for terminal buttons
document.querySelector('.terminal-button.maximize').addEventListener('click', () => {
  const terminal = document.querySelector('.terminal');
  if (!isTerminalMaximized) {
      // Store original size
      originalTerminalSize.width = terminal.style.width || '600px';  // Default width if not set
      originalTerminalSize.height = terminal.style.height || '400px'; // Default height if not set
      
      // Increase size (1.5x larger)
      terminal.style.width = '1100px';
      terminal.style.height = '800px';
      terminal.style.transition = 'all 0.3s ease';
  } else {
      // Restore original size
      terminal.style.width = originalTerminalSize.width;
      terminal.style.height = originalTerminalSize.height;
  }
  isTerminalMaximized = !isTerminalMaximized;
});

document.querySelector('.terminal-button.minimize').addEventListener('click', () => {
    const terminal = document.querySelector('.terminal');
    const terminalBody = document.querySelector('.terminal-body');
    
    if (!isTerminalMinimized) {
        terminalBody.style.display = 'none';
        terminal.style.height = 'auto';
    } else {
        terminalBody.style.display = 'block';
        terminal.style.height = originalTerminalSize.height || 'auto';
    }
    isTerminalMinimized = !isTerminalMinimized;
});

document.querySelector('.terminal-button.close').addEventListener('click', () => {
    const terminal = document.querySelector('.terminal');
    terminal.style.display = 'none';
});

document.querySelector('.terminal-button.close').addEventListener('click', () => {
  const terminal = document.querySelector('.terminal');
  const reopenButton = document.getElementById('reopen-terminal');
  terminal.style.display = 'none';
  reopenButton.style.display = 'block';
});

document.getElementById('reopen-terminal').addEventListener('click', () => {
  const terminal = document.querySelector('.terminal');
  const reopenButton = document.getElementById('reopen-terminal');
  terminal.style.display = 'flex';
  reopenButton.style.display = 'none';
});

let terminalSpeed = 20;

document.getElementById("terminal-input").addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let input = e.target.value.trim().toLowerCase();
        processTerminalCommand(input);
        e.target.value = "";
        const terminalContent = document.getElementById("terminal-content");
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
});

function typeWriter(element, text, speed = terminalSpeed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            element.parentElement.scrollTop = element.parentElement.scrollHeight;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function processTerminalCommand(cmd) {
    const terminalContent = document.getElementById("terminal-content");
    const cmdLine = document.createElement("div");
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    cmdLine.innerHTML = '<span class="terminal-prompt">user@sirdug.dev:~$</span> ' + cmd;
    terminalContent.appendChild(cmdLine);

    const validCommands = ["help", "clear", "about", "speed"];

    if (!command) return;

    if (validCommands.includes(command)) {
        if (command === "speed") {
            const speedDiv = document.createElement("div");
            terminalContent.appendChild(speedDiv);
            if (args[1]) {
                const newSpeed = parseInt(args[1]);
                if (newSpeed >= 1 && newSpeed <= 200) {
                    terminalSpeed = newSpeed;
                    typeWriter(speedDiv, `\nTyping speed set to ${terminalSpeed}ms`);
                } else {
                    typeWriter(speedDiv, "\nInvalid speed! Use a number between 1-200ms");
                }
            } else {
                typeWriter(speedDiv, `\nCurrent typing speed: ${terminalSpeed}ms`);
            }
        } else if (command === "help") {
            const helpDiv = document.createElement("div");
            terminalContent.appendChild(helpDiv);
            const helpText = `
                \nAvailable commands:
                \nhelp   - Show available commands
                \nclear  - Clear the terminal screen
                \nabout  - Show information about Sirdug
                \nspeed [1-200] - Set typing speed in milliseconds`;
            typeWriter(helpDiv, helpText);
        } else if (command === "clear") {
            terminalContent.innerHTML = '<span class="terminal-prompt">user@sirdug.dev:~$</span> Welcome to sirdug.dev!\n<span class="terminal-prompt">user@sirdug.dev:~$</span> Type help for a list of commands.';
        } else if (command === "about") {
            const aboutDiv = document.createElement("div");
            terminalContent.appendChild(aboutDiv);
            const aboutText = `
                \nAbout Sirdug:
                \n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                \nCreator: Sirdug
                \nDiscord: sirdug
                \nGitHub: sirdug
                \nDescription: I made this junk :)
                \n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
            typeWriter(aboutDiv, aboutText);
        }
    } else {
        const unknownDiv = document.createElement("div");
        terminalContent.appendChild(unknownDiv);
        typeWriter(unknownDiv, "\nCommand not found. Type 'help' for available commands.");
    }
}