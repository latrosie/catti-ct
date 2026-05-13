export let cmdq = [];
let lastCmd = 0;

register("step", () => {
    if (cmdq.length == 0) return;

    let now = Date.now();
    if (now - lastCmd < 1100) return;

    ChatLib.command(cmdq.shift());
    lastCmd = now;
}).setFps(3);

register("messageSent", (msg, e) => {
    if (!msg.startsWith("/")) return;

    e.setCanceled(true);
    cmdq.push(msg.substring(1));
});