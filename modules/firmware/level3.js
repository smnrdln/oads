i18n.registerContent('en', 'level3', [

{
    title: "Real-Time Analysis and Schedulability",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Periodic task model; utilization and response-time intuition</li>
            <li>Blocking on mutexes and drivers; critical section effects</li>
            <li>Measure WCET on-target — do not guess from MHz alone</li>
            <li>Choose tick rates, priorities, and margins with evidence</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Schedulability is a proof obligation \u2014 not a slogan",
        "Include ISR interference and lock hold times in budgets",
        "Caches and pipelines change WCET \u2014 measure representative builds"
    ],
    relatedTopics: [
            { level: "level2", index: 1, label: "Tasks and the Scheduler" },
            { level: "level3", index: 1, label: "Priority Inversion, Deadlock, and Starvation" },
            { level: "level4", index: 4, label: "Capstone \u2014 End-to-End Real-Time Firmware System" }
    ],
    resources: [
            { title: "search: fixed priority response time analysis", url: "https://www.google.com/search?q=fixed+priority+response+time+analysis" }
    ]
},

{
    title: "Priority Inversion, Deadlock, and Starvation",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Classic priority inversion; inheritance and priority ceiling ideas</li>
            <li>Deadlock: mutual exclusion, hold-wait, no preemption, cycles</li>
            <li>Starvation from bad priority design; fair queuing patterns</li>
            <li>Global lock ordering to break circular waits</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Inheritance helps simple chains \u2014 not every resource graph",
        "Consistent lock order prevents many deadlocks",
        "Watchdogs reset symptoms; fix root scheduling/resource causes"
    ],
    relatedTopics: [
            { level: "level2", index: 3, label: "Semaphores, Mutexes, and Event Groups" },
            { level: "level3", index: 0, label: "Real-Time Analysis and Schedulability" },
            { level: "level4", index: 2, label: "Safety-Critical Firmware and Formal Methods" }
    ],
    resources: [
            { title: "search: priority inheritance mutex", url: "https://www.google.com/search?q=priority+inheritance+mutex" }
    ]
},

{
    title: "Peripheral Driver Architecture",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Layering: HAL vs low-level vs direct registers; timeouts</li>
            <li>DMA vs IRQ-driven I/O; zero-copy cautions</li>
            <li>Driver-internal state machines; clear error propagation</li>
            <li>Hardware abstraction seams to enable host-side tests</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Drivers should expose bounded-time operations to the rest of the system",
        "Timeouts convert hang bugs into handled faults",
        "Untestable drivers usually mean missing abstractions"
    ],
    relatedTopics: [
            { level: "level1", index: 2, label: "GPIO, Registers, and Peripheral Access" },
            { level: "level3", index: 3, label: "Serial Communication Protocols in Firmware" },
            { level: "level4", index: 3, label: "Firmware Testing and Continuous Integration" }
    ],
    resources: [
            { title: "search: embedded driver DMA state machine", url: "https://www.google.com/search?q=embedded+driver+DMA+state+machine" }
    ]
},

{
    title: "Serial Communication Protocols in Firmware",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>UART framing, baud error, FIFO depth; SPI CS and DMA</li>
            <li>I2C open-drain, pulls, clock stretching, recovery</li>
            <li>CAN termination and arbitration basics; USB stack timing costs</li>
            <li>Pick buses for bandwidth, wiring, EMI, and robustness</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Open-drain buses need pull-ups sized to rise-time budgets",
        "SPI is fast but needs a chip-select per slave",
        "Keep protocol parsing out of long ISRs"
    ],
    relatedTopics: [
            { level: "level3", index: 2, label: "Peripheral Driver Architecture" },
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" }
    ],
    resources: [
            { title: "TI UART primer", url: "https://www.ti.com/lit/slaa322" }
    ]
},

{
    title: "Low-Power Firmware Design",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Sleep modes vs clock gating; wake sources and latency</li>
            <li>Tickless idle; measuring active vs sleep current</li>
            <li>Peripheral off rules; RAM retention trade-offs</li>
            <li>Finding wake locks and accidental busy-wait</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "If idle never sleeps, battery math will be wrong",
        "Faster wake clocks often cost more energy",
        "Profile firmware \u2014 datasheet typ rows are not your app"
    ],
    relatedTopics: [
            { level: "level1", index: 4, label: "Timers, Clocks, and Time Sources" },
            { level: "level3", index: 5, label: "Multicore and Asymmetric Multiprocessing Firmware" }
    ],
    resources: [
            { title: "search: FreeRTOS tickless idle", url: "https://www.google.com/search?q=FreeRTOS+tickless+idle" }
    ]
},

{
    title: "Multicore and Asymmetric Multiprocessing Firmware",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>AMP vs SMP on MCUs; message passing between cores</li>
            <li>Inter-core interrupts, mailboxes; cache coherency cautions</li>
            <li>Splitting hard RT workloads across cores intentionally</li>
            <li>Secondary core boot flow from bootloader or supervisor</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Sharing mutable data needs explicit synchronization or coherent memory",
        "AMP often simplifies per-core hard RT guarantees",
        "Boot order is part of your system contract"
    ],
    relatedTopics: [
            { level: "level2", index: 2, label: "Queues and Message Passing" },
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" }
    ],
    resources: [
            { title: "search: dual-core MCU AMP firmware", url: "https://www.google.com/search?q=dual-core+MCU+AMP+firmware" }
    ]
}
]);
