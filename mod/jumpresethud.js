import { config } from "..";
if (config.jumpresethud) {
    // config
    let perfectWindow = 100;
    let comboTimeout = 2000;

    let lastJump = 0;
    let lastHurt = 0;

    const KEY_SPACE = 57; // Space

    register('tick', () => {
        if (Keyboard.isKeyDown(KEY_SPACE)) {
            lastJump = Date.now();
        }
    });

    const S19PacketEntityStatus = Java.type("net.minecraft.network.play.server.S19PacketEntityStatus");

    register('packetReceived', (packet) => {
        try {
            // sts 2 = hurt
            if (packet.func_149160_c() !== 2) return;

            const world = World.getWorld();
            if (!world) return;

            const entity = packet.func_149161_a(world);
            if (!entity) return;

            const player = Player.getPlayer();
            if (!player) return;

            // only us
            if (entity.func_145782_y() === player.func_145782_y()) {
                lastHurt = Date.now();
            }
        } catch (e) {
            // meow
        }
    }).setFilteredClass(S19PacketEntityStatus);

    function calcDiff() {
        if (lastJump === 0 && lastHurt === 0) {
            return { diff: '', label: 'WAITING' };
        }

        const diff = lastJump - lastHurt;

        if (diff < 0) return { diff, label: 'EARLY' };
        if (diff <= perfectWindow) return { diff, label: 'PERFECT' }; // ~2 ticks
        if (diff <= comboTimeout) return { diff, label: 'LATE' };
        return { diff: '', label: 'WAITING' };
    }

    const bob = register('renderOverlay', () => {
        const { diff, label } = calcDiff();

        const color = {
            PERFECT: '§a',  // green
            EARLY: '§c',  // red
            LATE: '§e',  // yellow
            WAITING: '§7',  // gray
        }[label] || '§f';

        const text = diff !== ''
            ? `JUMP RESET: ${diff}ms ${color}${label}`
            : `JUMP RESET: ${color}${label}`;

        Renderer.drawString(text, 50, 10, true);
    });

    register('command', (fld, val) => {
        switch (fld) {
            case 'toggle':
                ChatLib.chat('idk');
                // if(val === 'true') bob.register();
                // else if(val === 'false') bob.unregister();
                // else ChatLib.chat('idk what ur saying bru');
                break;
            case 'perfectWindow':
                if (!val) val = 100;
                perfectWindow = val;
                ChatLib.chat('perfectWindow set to: ' + val);
                break;
            case 'comboTimeout':
                if (!val) val = 2000;
                comboTimeout = val;
                ChatLib.chat('comboTimeout set to: ' + val);
                break;
            default:
                ChatLib.chat('idk what ur saying bru');
        }
    }).setTabCompletions('toggle', 'perfectWindow', 'comboTimeout').setName('jrc');
}