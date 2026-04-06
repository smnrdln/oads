i18n.registerContent('en', 'scenarios', [
    {
        level: "level1", topicIndex: 0,
        title: "Stale ISR-shared sensor",
        description: "Sensor updates every 10 ms in ISR; main loop sometimes reads stale values.",
        choices: [
            { text: "Speed the loop to 1 ms", correct: false, xp: 0 },
            { text: "Mark shared data volatile and review stronger synchronization if needed", correct: true, xp: 15 },
            { text: "Replace the sensor IC", correct: false, xp: 0 },
            { text: "Mask the ISR during reads", correct: false, xp: 0 }
        ],
        explanation: "Without volatile, the compiler may cache; fix visibility before chasing hardware."
    },
    {
        level: "level1", topicIndex: 1,
        title: "char[4] register view",
        description: "A colleague stores a 32-bit peripheral in char[4] via casting.",
        choices: [
            { text: "Accept \u2014 casting always works", correct: false, xp: 0 },
            { text: "Use volatile uint32_t* at the register address", correct: true, xp: 15 },
            { text: "Use only a union", correct: false, xp: 0 },
            { text: "memcpy into int", correct: false, xp: 0 }
        ],
        explanation: "Exact-width volatile pointers are the idiomatic MMIO access pattern."
    },
    {
        level: "level1", topicIndex: 2,
        title: "Bouncy button",
        description: "One physical press logs many edge interrupts.",
        choices: [
            { text: "Increase GPIO drive strength", correct: false, xp: 0 },
            { text: "Timer-based debounce / stable sampling", correct: true, xp: 15 },
            { text: "Add only a capacitor with no plan", correct: false, xp: 0 },
            { text: "Switch pin to open-drain", correct: false, xp: 0 }
        ],
        explanation: "Software debounce is the usual first fix."
    },
    {
        level: "level1", topicIndex: 3,
        title: "Fat UART ISR",
        description: "ISR parses frames, runs CRC, and printf-debugs.",
        choices: [
            { text: "Keep everything in ISR", correct: false, xp: 0 },
            { text: "Queue bytes; parse in a task", correct: true, xp: 15 },
            { text: "Disable UART IRQ forever", correct: false, xp: 0 },
            { text: "Lower baud to 1200 only", correct: false, xp: 0 }
        ],
        explanation: "Defer heavy work; keep ISRs short."
    },
    {
        level: "level1", topicIndex: 4,
        title: "Watchdog pet in timer ISR",
        description: "Timer ISR pets WDT even when no task makes progress.",
        choices: [
            { text: "This proves health", correct: false, xp: 0 },
            { text: "Pet only from a supervised liveness path", correct: true, xp: 15 },
            { text: "Disable the watchdog", correct: false, xp: 0 },
            { text: "Pet faster", correct: false, xp: 0 }
        ],
        explanation: "ISR petting can hide dead tasks."
    },
    {
        level: "level2", topicIndex: 0,
        title: "Fairness assumption",
        description: "Team expects Linux-like fairness from a fixed-priority RTOS.",
        choices: [
            { text: "Trust the name", correct: false, xp: 0 },
            { text: "Analyze periods, priorities, and blocking \u2014 FP is not fair-share", correct: true, xp: 15 },
            { text: "Set all priorities equal", correct: false, xp: 0 },
            { text: "Disable preemption", correct: false, xp: 0 }
        ],
        explanation: "Schedulability is an analysis task."
    },
    {
        level: "level2", topicIndex: 1,
        title: "Drifty motor loop",
        description: "vTaskDelay(10) loop drifts vs encoder sampling.",
        choices: [
            { text: "Chain more relative delays", correct: false, xp: 0 },
            { text: "Use vTaskDelayUntil for an absolute phase", correct: true, xp: 15 },
            { text: "Only raise priority", correct: false, xp: 0 },
            { text: "Remove the RTOS", correct: false, xp: 0 }
        ],
        explanation: "Relative delays accumulate jitter."
    },
    {
        level: "level2", topicIndex: 2,
        title: "Producer faster than UI",
        description: "Sensor bursts faster than the UI task consumes.",
        choices: [
            { text: "Block the ISR on the UI task", correct: false, xp: 0 },
            { text: "Use a bounded queue and explicit drop/backpressure policy", correct: true, xp: 15 },
            { text: "Silently lose data forever", correct: false, xp: 0 },
            { text: "printf each sample", correct: false, xp: 0 }
        ],
        explanation: "Design what happens when the queue fills."
    },
    {
        level: "level2", topicIndex: 3,
        title: "Mutex in UART ISR",
        description: "Developer calls mutex take inside the UART ISR.",
        choices: [
            { text: "Ship it", correct: false, xp: 0 },
            { text: "Use ISR-safe primitives \u2014 no blocking mutex waits in ISR", correct: true, xp: 15 },
            { text: "Set mutex priority to max", correct: false, xp: 0 },
            { text: "Disable UART", correct: false, xp: 0 }
        ],
        explanation: "Mutexes need task context."
    },
    {
        level: "level2", topicIndex: 4,
        title: "Huge SPI ISR",
        description: "ISR copies multi-kB buffers and checksums before returning.",
        choices: [
            { text: "Keep checksum in ISR", correct: false, xp: 0 },
            { text: "ISR captures minimal state; task processes payload", correct: true, xp: 15 },
            { text: "Disable SPI IRQ", correct: false, xp: 0 },
            { text: "Only slow the clock", correct: false, xp: 0 }
        ],
        explanation: "Long ISRs hurt global interrupt latency."
    },
    {
        level: "level2", topicIndex: 5,
        title: "Heap-first RTOS objects",
        description: "Safety project allocates tasks/queues from heap for flexibility.",
        choices: [
            { text: "Allow unlimited malloc", correct: false, xp: 0 },
            { text: "Prefer static pools; justify any dynamic use with fragmentation analysis", correct: true, xp: 15 },
            { text: "Disable MPU", correct: false, xp: 0 },
            { text: "Massively increase heap without bounds", correct: false, xp: 0 }
        ],
        explanation: "Safety wants deterministic memory stories."
    },
    {
        level: "level3", topicIndex: 0,
        title: "Rare deadline misses",
        description: "BLE stack activity causes occasional 1 ms violations.",
        choices: [
            { text: "Ignore rare events", correct: false, xp: 0 },
            { text: "Model interference; measure WCET under contention", correct: true, xp: 15 },
            { text: "Lower BLE priority blindly", correct: false, xp: 0 },
            { text: "Delete logs", correct: false, xp: 0 }
        ],
        explanation: "Hard real-time needs proof, not luck."
    },
    {
        level: "level3", topicIndex: 1,
        title: "Bus mutex inversion",
        description: "Low-priority task holds bus mutex; medium waits; high unrelated task spikes.",
        choices: [
            { text: "Delete medium task", correct: false, xp: 0 },
            { text: "Use mutex priority inheritance and shorten critical sections", correct: true, xp: 15 },
            { text: "Spin forever", correct: false, xp: 0 },
            { text: "Set every task to max priority", correct: false, xp: 0 }
        ],
        explanation: "Classic inversion \u2014 inheritance + design discipline."
    },
    {
        level: "level3", topicIndex: 2,
        title: "I2C NAK storm",
        description: "Driver loops forever on NAK in a busy-wait.",
        choices: [
            { text: "Loop forever", correct: false, xp: 0 },
            { text: "Bounded retries, backoff, and surfaced faults", correct: true, xp: 15 },
            { text: "Ignore NAK", correct: false, xp: 0 },
            { text: "Slow the CPU clock", correct: false, xp: 0 }
        ],
        explanation: "Drivers must terminate and report errors."
    },
    {
        level: "level3", topicIndex: 3,
        title: "Weak I2C pulls",
        description: "400 kHz I2C with slow edges and intermittent ACK loss.",
        choices: [
            { text: "Ignore analog behavior", correct: false, xp: 0 },
            { text: "Size pull-ups vs bus C; consider lower clock", correct: true, xp: 15 },
            { text: "Remove termination", correct: false, xp: 0 },
            { text: "Switch to SPI blindly", correct: false, xp: 0 }
        ],
        explanation: "Open-drain RC matters at speed."
    },
    {
        level: "level3", topicIndex: 4,
        title: "No sleep overnight",
        description: "Firmware never enters sleep; idle busy-waits.",
        choices: [
            { text: "Only buy a bigger battery", correct: false, xp: 0 },
            { text: "Enter tickless/sleep in idle; measure active vs sleep profile", correct: true, xp: 15 },
            { text: "Raise CPU clock", correct: false, xp: 0 },
            { text: "Disable brown-out", correct: false, xp: 0 }
        ],
        explanation: "Firmware must actually sleep to meet power targets."
    },
    {
        level: "level3", topicIndex: 5,
        title: "Torn struct on two cores",
        description: "Core A writes a struct while core B reads torn fields.",
        choices: [
            { text: "Increase UART baud", correct: false, xp: 0 },
            { text: "Synchronize or use coherent message passing \u2014 do not share blindly", correct: true, xp: 15 },
            { text: "Hope caches help", correct: false, xp: 0 },
            { text: "volatile alone fixes everything", correct: false, xp: 0 }
        ],
        explanation: "Multicore needs real memory rules."
    },
    {
        level: "level4", topicIndex: 0,
        title: "OTA power loss",
        description: "Single-slot overwrite of the running image over UART.",
        choices: [
            { text: "Keep overwriting in place", correct: false, xp: 0 },
            { text: "Dual-bank/staging so power loss still leaves a bootable image", correct: true, xp: 15 },
            { text: "Drop CRC checks", correct: false, xp: 0 },
            { text: "Jump to RAM always", correct: false, xp: 0 }
        ],
        explanation: "Resilience drives A/B or staging with verification."
    },
    {
        level: "level4", topicIndex: 1,
        title: "Keys in Flash",
        description: "AES key stored as a const byte array in firmware image.",
        choices: [
            { text: "Ship as-is", correct: false, xp: 0 },
            { text: "Use hardware-backed key storage / secure provisioning", correct: true, xp: 15 },
            { text: "XOR with 0xFF", correct: false, xp: 0 },
            { text: "Compress the key", correct: false, xp: 0 }
        ],
        explanation: "Plaintext keys extract easily from Flash."
    },
    {
        level: "level4", topicIndex: 2,
        title: "WDT fed everywhere",
        description: "Any module pets the watchdog whenever it wants.",
        choices: [
            { text: "More feeds = safer", correct: false, xp: 0 },
            { text: "Narrow supervised pet path tied to liveness checks", correct: true, xp: 15 },
            { text: "Disable tasks", correct: false, xp: 0 },
            { text: "Stop testing WDT", correct: false, xp: 0 }
        ],
        explanation: "Safety arguments need controlled watchdog semantics."
    },
    {
        level: "level4", topicIndex: 3,
        title: "CI only manual",
        description: "No automated host tests; nightly plug-in ritual.",
        choices: [
            { text: "Accept manual", correct: false, xp: 0 },
            { text: "Host unit tests + static analysis; HIL on release gates", correct: true, xp: 15 },
            { text: "Delete CI", correct: false, xp: 0 },
            { text: "Test only in production", correct: false, xp: 0 }
        ],
        explanation: "Fast feedback needs automation."
    },
    {
        level: "level4", topicIndex: 4,
        title: "Capstone demo only",
        description: "Manager wants production sign-off after a single demo.",
        choices: [
            { text: "Ship immediately", correct: false, xp: 0 },
            { text: "Require WCET evidence, regression artifacts, and checklist reviews", correct: true, xp: 15 },
            { text: "Skip documentation", correct: false, xp: 0 },
            { text: "Tag Git only", correct: false, xp: 0 }
        ],
        explanation: "Evidence beats a one-off demo."
    },
]);
