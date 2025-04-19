const welcomeMessages = [
    "DUMXRG CORPORATION [Version 0.1]\nMostly rights left.\nWelcome to the Slightly-Off Command Line Experience™\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights reversed.\nInitializing nonsense protocol...\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nSome rights reserved. Most left behind.\nBooting up imaginary OS...\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights reserved. Some absolutely not.\nYour computer is now 87% functional.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll intellectual property likely stolen.\nPrepare to pretend this works.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nCopyright Ⓒ Everything, probably.\nLoading infinite loop... please wait.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights forgotten.\nWelcome to the void.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights are currently in beta.\nPlease expect errors... always.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nMost rights reserved. Others? Eh.\nNothing to see here. Move along.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights possibly lost during transit.\nSystem may or may not respond.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nAll rights reserved. Except the ones we accidentally forgot.\nWarning: This may or may not work.\n\n>",
    "DUMXRG CORPORATION [Version 0.1]\nProudly running on 0% reliability.\n\n>",
  ];
  window.onload = () => {
    const text = document.getElementById("text");
    if (text) {
      text.value = welcome_msg();
      text.focus(); // Auto-focus on page load
    }
  };
  
  let fakeFiles = ["notes.txt", "todo.md", "secrets.txt", "egg.png", "README.meh"];
  
  const commandDetails = {
    "echo": {
      description: "Displays the text you provide.",
      syntax: "echo [text]",
      example: "echo Hello World",
    },
    "clear": {
      description: "Clears the screen.",
      syntax: "clear / cls",
      example: "clear",
    },
    "cls": {
      description: "Clears the screen.",
      syntax: "cls",
      example: "cls",
    },
    "help": {
      description: "Displays this help message.",
      syntax: "help [command]",
      example: "help echo",
    },
    "date": {
      description: "Shows the current date and time.",
      syntax: "date",
      example: "date",
    },
    "about": {
      description: "Displays information about the system.",
      syntax: "about",
      example: "about",
    },
    "download": {
      description: "Saves the provided text into a file with the specified filename.",
      syntax: "echo [text] > [filename]",
      example: "echo Hello World > hello.txt",
    },
    "runjs": {
      description: "Executes JavaScript code in the console.",
      syntax: "runjs [code]",
      example: "runjs console.log('Hello!')",
    },
    "save": {
      description: "Saves the current session's output to a file.",
      syntax: "save",
      example: "save",
    },
    "exit": {
      description: "Exits the program with a confirmation prompt.",
      syntax: "exit",
      example: "exit",
    },
    "sudo": {
      description: "Attempts to use privileged commands.",
      syntax: "sudo [command]",
      example: "sudo rm -rf /",
    },
    "whoami": {
      description: "Displays information about the user (you).",
      syntax: "whoami",
      example: "whoami",
    },
    "mkdir": {
      description: "Creates a new directory.",
      syntax: "mkdir [directory_name]",
      example: "mkdir new_folder",
    },
    "title": {
        description: "Changes the title.",
        syntax: "title [title_name]",
        example: "title terminal",
      },
      "cowsay": {
        description: "Generates an ASCII cow that says your message.",
        syntax: "cowsay [message]",
        example: "cowsay Hello, World!",
      },
  };
  
  function cowsay(message) {
    let lines = message.split("\n");
    let maxLength = Math.max(...lines.map(line => line.length));
    let border = `+${"-".repeat(maxLength + 2)}+`;
  
    let cowLines = lines.map(line => `| ${line.padEnd(maxLength)} |`);
    let bubble = `${border}\n${cowLines.join("\n")}\n${border}`;
  
    let cow = `${bubble}
  \\   ^__^
   \\  (oo)\\_______
      (__)\\       )\\/\\
          ||----w |
          ||     ||
  `;
  
    return cow;
  }
  
  const welcome_msg = () => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  };
  
  const message = (arg) => {
    return "\n" + arg + "\n\n>";
  };
  
  function saveSession() {
    const text = document.getElementById("text").value;
    downloadFile("session_log.txt", text);
  }
  
  window.onload = () => {
    const text = document.getElementById("text");
    if (text) {
      text.value = welcome_msg();
    }
  };
  
  let commandHistory = [];
  let historyIndex = -1;
  
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  
  function runjsCommand(jsCode) {
    let result = "";
  
    const originalConsoleLog = console.log;
    console.log = function (message) {
      result += message + "\n";
    };
  
    try {
      eval(jsCode);
    } catch (e) {
      result = `Error: ${e.message}`;
    }
  
    console.log = originalConsoleLog;
  
    return result;
  }
  function enter(command = "") {
    let text = document.getElementById("text");
    const baseCommand = command.split(" ")[0];
    const body = command.split(" ").slice(1).join(" ");
    let filename = "";

    if (baseCommand === "help") {
        if (body) {
            const commandName = body.trim();
            if (commandDetails[commandName]) {
                text.value += message(
                    `Command: ${commandName}\n` +
                    `Description: ${commandDetails[commandName].description}\n` +
                    `Syntax: ${commandDetails[commandName].syntax}\n` +
                    `Example: ${commandDetails[commandName].example}\n`
                );
            } else {
                text.value += message(`Command "${commandName}" not found.\n`);
                text.value += message("Use 'help' to list all available commands.\n");
            }
        } else {
            text.value += message(
                "Available commands:\n" +
                Object.keys(commandDetails).map(command => `- ${command}: ${commandDetails[command].description}`).join("\n") + "\n\n" +
                "Use 'help [command]' for more details about each command.\n"
            );
        }
        return;
    }

    switch (baseCommand) {
        case "title": 
        if (body) {
            document.title = body.trim(); // Change the document's title
            text.value += message(`Title changed to: ${body.trim()}`);
          } else {
            text.value += message("Please provide a title.");
          }
        
        break
        case "ls":
        case "list":

            text.value += message(fakeFiles.toString());
            break;
        case "cowsay":
            const cowMessage = body.trim() || "Moo!";
            text.value += `\n${cowsay(cowMessage)}\n\n>`;
            break;
        case "echo":
            text.value += "\n" + body + "\n\n>";
            break;
        case "cat":
            text.value += message("meow\nmeow meow\nthis file is a cat now.");
            break;
        case "clear":
        case "cls":
            text.value = ">";
            break;
        case "date":
            text.value += message(new Date().toString());
            break;
        case "about":
            text.value += "\n" + welcome_msg();
            break;
        case "save":
            saveSession();
            text.value += "\nSession saved as session_log.txt\n\n>";
            break;
        case "runjs":
            const result = runjsCommand(body);
            text.value += `\n${result}\n\n>`;
            break;
        case "exit":
            text.value += "\nAre you sure you want to exit? (Y/N)\n";
            setTimeout(() => {
                const lastLine = text.value.split("\n").pop();
                if (lastLine.toUpperCase() === "Y") {
                    text.value += "\nExiting... Goodbye!\n";
                    setTimeout(() => location.reload(), 1000);
                } else {
                    text.value += "\nExit cancelled.\n";
                }
            }, 1000);
            break;
        case "sudo":
            text.value += message("Nice try, you don't have *DUMXRG* privileges.\nPlease contact your imaginary administrator.");
            break;
        case "whoami":
            text.value += message("You are a highly advanced meat-based input device.");
            break;
        case "mkdir":
            const dirName = body.trim();
            if (dirName) {
                text.value += message(`Directory "${dirName}" created.`);
            } else {
                text.value += message("Please provide a directory name.");
            }
            break;
        default:
            if (baseCommand === "") {
                text.value += `\n>`;
            } else {
                text.value += `\nThe command "${command}" is not recognized.\n\n>`;
            }
    }
}

  
  function replaceCurrentInput(newInput) {
    const text = document.getElementById("text");
    const lines = text.value.split("\n");
    lines[lines.length - 1] = ">" + newInput;
    text.value = lines.join("\n");
  }
  
  window.addEventListener("keydown", (e) => {
    const text = document.getElementById("text");
    e.preventDefault();
  
    switch (e.key) {
      case "Backspace":
      case "Delete":
        const lastPromptIndex = text.value.lastIndexOf("\n>") + 2;
        if (text.selectionStart > lastPromptIndex && text.value.length > lastPromptIndex) {
          text.value = text.value.slice(0, -1);
        }
        break;
      case "Enter":
        const lines = text.value.split("\n");
        const lastLine = lines[lines.length - 1];
        const input = lastLine.startsWith(">") ? lastLine.slice(1) : lastLine;
  
        if (input.trim() !== "") {
          commandHistory.push(input.trim());
          historyIndex = commandHistory.length;
        }
  
        enter(input.trim());
        break;
      case "ArrowUp":
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          replaceCurrentInput(commandHistory[historyIndex]);
        }
        break;
      case "ArrowDown":
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          replaceCurrentInput(commandHistory[historyIndex]);
        } else {
          historyIndex = commandHistory.length;
          replaceCurrentInput("");
        }
        break;
      default:
        if (e.key.length === 1) {
          text.value += e.key;
        }
        break;
    }
  });
  