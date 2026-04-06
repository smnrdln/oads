i18n.registerContent('en', 'level2', [

{
    title: "RTOS Concepts and Scheduling Theory",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Tasks, preemption, blocking primitives; structured concurrency</li>
            <li>Cooperative vs preemptive; fixed-priority preemptive as common baseline</li>
            <li>Ready/Running/Blocked states; tick interrupt and scheduler entry</li>
            <li>Context switch: TCB, stack pointer, saving/restoring context</li>
            <li>WCET thinking vs average-case performance</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Real-time emphasizes bounded latency \u2014 not highest average MIPS",
        "Each task has its own stack; overflow can corrupt unrelated memory",
        "Tick period sets scheduling granularity for tick-driven decisions"
    ],
    relatedTopics: [
            { level: "level2", index: 1, label: "Tasks and the Scheduler" },
            { level: "level2", index: 2, label: "Queues and Message Passing" },
            { level: "level3", index: 0, label: "Real-Time Analysis and Schedulability" }
    ],
    resources: [
            { title: "FreeRTOS fundamentals", url: "https://www.freertos.org/implementation/a00002.html" }
    ]
},

{
    title: "Tasks and the Scheduler",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Task parameters: stack depth, priority, entry function</li>
            <li>vTaskDelay vs vTaskDelayUntil for periodic loops without drift</li>
            <li>Stack watermarking, overflow hooks, MPU guards during development</li>
            <li>Time slicing among equal priorities; task notifications as lighter signals</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "vTaskDelayUntil anchors phase; relative delays accumulate jitter",
        "Rate-monotonic heuristic: shorter period often implies higher priority",
        "Do not starve idle beyond what your RTOS requires for housekeeping"
    ],
    relatedTopics: [
            { level: "level2", index: 0, label: "RTOS Concepts and Scheduling Theory" },
            { level: "level2", index: 2, label: "Queues and Message Passing" },
            { level: "level3", index: 0, label: "Real-Time Analysis and Schedulability" }
    ],
    resources: [
            { title: "FreeRTOS task creation", url: "https://www.freertos.org/a00019.html" }
    ]
},

{
    title: "Queues and Message Passing",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>FIFO queues; fixed item size; copy-by-value semantics</li>
            <li>Blocking sends/receives; timeout discipline; portMAX_DELAY pitfalls</li>
            <li>FromISR APIs; higherPriorityTaskWoken and yielding</li>
            <li>Queue sets; depth-1 overwrite mailboxes for latest-value semantics</li>
            <li>Backpressure: block, drop, or shed load — pick explicitly</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "After FromISR, yield if a higher-priority task was woken",
        "Queues copy bytes \u2014 sender buffers can be reused after a successful send",
        "Silent drops happen if you do not design full-queue behavior"
    ],
    relatedTopics: [
            { level: "level2", index: 3, label: "Semaphores, Mutexes, and Event Groups" },
            { level: "level2", index: 4, label: "ISR-to-Task Communication" },
            { level: "level3", index: 2, label: "Peripheral Driver Architecture" }
    ],
    resources: [
            { title: "FreeRTOS queues", url: "https://www.freertos.org/a00018.html" }
    ]
},

{
    title: "Semaphores, Mutexes, and Event Groups",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Counting vs binary semaphores; producer/consumer signaling</li>
            <li>Mutex ownership and priority inheritance vs binary semaphore misuse</li>
            <li>Recursive mutex trade-offs; event groups for ANY/ALL waits</li>
            <li>Monitor-style pairing of mutex + condition signaling</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Mutex release must match the owning task",
        "Do not block on mutexes inside ISRs",
        "Priority inheritance mitigates inversion but does not replace design discipline"
    ],
    relatedTopics: [
            { level: "level2", index: 2, label: "Queues and Message Passing" },
            { level: "level3", index: 1, label: "Priority Inversion, Deadlock, and Starvation" },
            { level: "level2", index: 4, label: "ISR-to-Task Communication" }
    ],
    resources: [
            { title: "FreeRTOS mutexes", url: "https://www.freertos.org/a00113.html" }
    ]
},

{
    title: "ISR-to-Task Communication",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Two-stage pattern: ISR captures minimal state; task does the work</li>
            <li>Binary semaphores or task notifications from ISR</li>
            <li>Passing data: queues, ring buffers + indices, DMA metadata</li>
            <li>Budget ISR time against worst-case interrupt load</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Missing yield after ISR wake can add up to a tick of latency",
        "Notifications are lighter when one consumer is enough",
        "ISR uses the interrupted task stack \u2014 mind nesting depth"
    ],
    relatedTopics: [
            { level: "level1", index: 3, label: "Interrupts and Exception Handling" },
            { level: "level2", index: 2, label: "Queues and Message Passing" },
            { level: "level2", index: 3, label: "Semaphores, Mutexes, and Event Groups" }
    ],
    resources: [
            { title: "Deferred interrupt handling", url: "https://www.freertos.org/deferred_interrupt_handling.html" }
    ]
},

{
    title: "RTOS Memory Management",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Static vs dynamic RTOS objects; fragmentation and determinism</li>
            <li>Heap algorithms; thread safety; memory pools for fixed blocks</li>
            <li>MPU regions; per-task stack allocation strategies</li>
            <li>Leak detection: watermarks, allocation counters, guard patterns</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Safety-critical firmware often prefers static allocation",
        "Pools provide bounded-time allocation with internal slack trade-offs",
        "Guard bands catch overflow earlier than mysterious corruption"
    ],
    relatedTopics: [
            { level: "level1", index: 0, label: "Microcontroller Memory Architecture" },
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" },
            { level: "level3", index: 5, label: "Multicore and Asymmetric Multiprocessing Firmware" }
    ],
    resources: [
            { title: "FreeRTOS memory management", url: "https://www.freertos.org/a00111.html" }
    ]
}
]);
