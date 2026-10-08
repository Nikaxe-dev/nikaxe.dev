const autoFocus = document.querySelector(".autofocus");

setInterval(() => {
    autoFocus?.focus();
}, 10);

const COMMANDS = {
    "welcome": [
        ["output", [
            "nikaxe.is-a.dev terminal (v1.0.0)",
            "---------------",
            "Welcome to my website!",
            "<a href='https://github.com/nikaxe-dev/nikaxe.dev' target='_blank'>Source Code</a>",
            "---------------",
            "For a complete list of available commands, type `help`.",
            "---------------",
        ]]
    ],

    "help": [
        ["exec", "welcome"],
        
        ["output", [
            "info:",
            "   welcome          shows the shell welcome message",
            "   help             gives a list of commands",
            "   me               some information about me",
            "   projects         redirects to my repositories",
            "projects:",
            "   fling-and-fight  redirects to the fling and fight github",
            "contact:",
            "   discord          redirects to my discord server",
            "   email            contact me through my public email address",
            "   youtube          redirects to my youtube channel",
            "   github           redirects to my github account",
            "   source           redirects to this websites source code",
        ]]
    ],

    "clear": [["clear"]],

    "nikaxe": [
        ["output", [
            "------",
            "Hey there!",
            "I'm nikaxe, a 14 year old heavily interested in computer science & game development.",
            "------",
            "I have experience in web, roblox, and godot development.",
            "The languages I have most used are typescript, luau, and C#.",
            "------",
            "As of the last time this website was updated, I have been working on FaF, which you may find more info on through the faf command.",
            "------"
        ]]
    ],

    "aboutme": "nikaxe",
    "about": "nikaxe",
    "me": "nikaxe",

    "fling-and-fight": [["redirect", "/projects/fling-and-fight"]],
    "faf": "fling-and-fight",
    "flingandfight": "fling-and-fight",
    "fling": "fling-and-fight",
    "fling and fight": "fling-and-fight",

    "discord": [["redirect", "https://discord.gg/vhpYZGUvXx"]],
    "email": [["redirect", "mailto:nikaxe.public@gmail.com"]],
    "youtube": [["redirect", "https://youtube.com/@nikaxe"]],
    "github": [["redirect", "https://github.com/Nikaxe-Dev"]],
    "source": [["redirect", "https://github.com/Nikaxe-Dev/nikaxe.dev"]],
    "projects": [["redirect", "https://github.com/Nikaxe-dev?tab=repositories"]]
}

const USER_CMD_HEADER = "[visitor@nikaxe.is-a.dev ~]$";

const terminal = document.querySelector(".terminal");
const terminalOutput = terminal.querySelector(".output");

const terminalForm = terminal.querySelector("form");
const terminalInput = terminalForm.querySelector("input");

function terminalWriteLine(text)
{
    const line = document.createElement('pre');
    line.innerHTML = text;
    terminalOutput.appendChild(line);

    line.scrollIntoView();
}

function executeTerminalCommand(commandName) {
    const data = COMMANDS[commandName];

    if (data == null) {
        terminalWriteLine(`${commandName}: command not found`);
        return;
    }

    if (typeof data == "string")
    {
        executeTerminalCommand(data);
        return;
    }

    data?.forEach(action => {
        const actionType = action[0];

        if (actionType == "exec")
            executeTerminalCommand(action[1]);
        if (actionType == "output")
            action[1].forEach(terminalWriteLine);
        if (actionType == "clear")
            terminalOutput.innerHTML = "";
        if (actionType == "redirect")
            window.open(action[1], "_blank");
    });
}

executeTerminalCommand("welcome");

terminalForm.onsubmit = function(e) {
    e.preventDefault();
    terminalWriteLine(`${USER_CMD_HEADER} ${terminalInput.value}`)
    executeTerminalCommand(terminalInput.value);
    terminalInput.value = "";
};