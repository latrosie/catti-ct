export let cmdq = [];
let lastCmd = 0;

register("step", () => {
    if (cmdq.length == 0) return;
    
    let now = Date.now();
    if (now - lastCmd < 1100) return;

    ChatLib.command(cmdq.shift());
    lastCmd = now;
}).setFps(5); // Check 5 times a second (saves CPU)

// To add a command:
// queue.push("nick action");