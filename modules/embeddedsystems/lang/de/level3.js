i18n.registerContent('de', 'level3', [
    {
        title: "Echtzeitbetriebssysteme (RTOS)",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>What makes a system "real-time": hard vs. soft vs. firm deadlines</li>
<li>RTOS kernel concepts: task (thread), scheduler, context switch, tick</li>
<li>Scheduling algorithms: round-robin, preemptive priority, rate-monotonic analysis (RMA)</li>
<li>FreeRTOS anatomy: task creation, \`vTaskDelay\`, \`vTaskDelayUntil\`, task priorities, task states (Running, Ready, Blocked, Suspended)</li>
<li>Synchronization primitives: binary semaphore, counting semaphore, mutex</li>
<li>Priority inversion and the priority inheritance protocol</li>
<li>Inter-task communication: queues, event groups, task notifications</li>
<li>Stack allocation for RTOS tasks: \`configMINIMAL_STACK_SIZE\`, stack overflow hooks</li>
<li>Tick-less idle mode for power-efficient RTOS operation</li>
<li>Porting considerations: \`configCPU_CLOCK_HZ\`, \`configTICK_RATE_HZ\`, heap model selection</li>
<li>Common pitfall: calling non-ISR FreeRTOS API from within an ISR — use \`FromISR\` variants</li>
<li>Common pitfall: mutex deadlock from recursive lock attempts</li>
</ul>
        `,
        keyPoints: ["An RTOS does not make code faster; it makes timing behavior predictable by giving high-priority tasks guaranteed CPU access", "Always use vTaskDelayUntil for periodic tasks, not vTaskDelay \u2014 the former is immune to task body execution time drift", "A mutex must be acquired and released from the same task; semaphores can be signaled from any context", "Priority inversion can violate real-time deadlines \u2014 FreeRTOS mutexes implement priority inheritance automatically", "Use the FromISR variants of all FreeRTOS API calls in ISRs and check xHigherPriorityTaskWoken to yield after the ISR if needed"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level2", "index": 1, "label": "Timer, PWM und Capture/Compare"}, {"level": "level2", "index": 4, "label": "Energiemanagement und Low-Power-Design"}, {"level": "level3", "index": 1, "label": "Ger\u00e4tetreiber-Entwicklung"}],
        resources: [{"title": "FreeRTOS official documentation:", "url": "https://www.freertos.org/Documentation/RTOS_book.html"}, {"title": "The Real-Time Kernel* (Jean Labrosse): search query: `MicroC OS-II Labrosse real-time kernel book", "url": "https://www.google.com/search?q=The+Real-Time+Kernel*+(Jean+Labrosse):+search+query:+`MicroC+OS-II+Labrosse+real-time+kernel+book"}, {"title": "rate monotonic analysis RMA schedulability test embedded RTOS", "url": "https://www.google.com/search?q=rate+monotonic+analysis+RMA+schedulability+test+embedded+RTOS"}, {"title": "Percepio Tracealyzer for RTOS visualization:", "url": "https://percepio.com/tracealyzer/"}]
    },
    {
        title: "Ger\u00e4tetreiber-Entwicklung",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Driver architecture patterns: bare-metal register driver, HAL wrapper, layered driver model</li>
<li>The driver API contract: \`init()\`, \`read()\`, \`write()\`, \`ioctl()\`, \`deinit()\` — portable interfaces</li>
<li>Interrupt-driven driver skeleton: receive ISR → ring buffer → \`read()\` API</li>
<li>DMA-driven driver: descriptor setup, completion callback, cache coherency (Cortex-M7)</li>
<li>Non-blocking vs. blocking drivers: callbacks, polling completion flags, OS semaphores</li>
<li>Error handling and return codes in drivers: \`HAL_OK\`, custom enum, errno-style</li>
<li>Thread safety in drivers: re-entrancy, spinlocks vs. OS mutexes</li>
<li>Writing portable drivers: hardware abstraction layer (HAL) pin/register callbacks</li>
<li>Driver testing without hardware: register mock objects, hardware-in-the-loop (HIL)</li>
<li>Common pitfall: enabling the peripheral interrupt before fully initializing the driver state — ISR fires into uninitialized data</li>
<li>Common pitfall: driver that \`while(1)\`-polls in ISR context</li>
</ul>
        `,
        keyPoints: ["Initialize all driver state structures before enabling interrupts; the ISR can fire the moment you enable it", "A ring buffer (circular buffer) is the canonical structure for ISR \u2192 main-context byte streams; size must be a power of two for efficient index wrapping", "DMA transfers require that source and destination buffers remain valid (in scope and uncached or cache-maintained) for the entire DMA duration", "Design drivers to work with or without an RTOS by abstracting synchronization primitives behind a thin OS-abstraction layer", "Return meaningful error codes from every driver function; void-returning drivers hide faults silently"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level2", "index": 0, "label": "Serielle Protokolle \u2014 UART, SPI, I2C"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}],
        resources: [{"title": "Linux Device Drivers* (Corbet, Rubini, Kroah-Hartman, 3rd ed., free online):", "url": "https://lwn.net/Kernel/LDD3/"}, {"title": "ring buffer circular buffer embedded C interrupt driver implementation", "url": "https://www.google.com/search?q=ring+buffer+circular+buffer+embedded+C+interrupt+driver+implementation"}, {"title": "DMA driver embedded Cortex-M cache coherency flush invalidate", "url": "https://www.google.com/search?q=DMA+driver+embedded+Cortex-M+cache+coherency+flush+invalidate"}, {"title": "hardware abstraction layer embedded driver portable design pattern", "url": "https://www.google.com/search?q=hardware+abstraction+layer+embedded+driver+portable+design+pattern"}]
    },
    {
        title: "Debugging und Fehlerdiagnose",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Debug interface hardware: JTAG vs. SWD (Serial Wire Debug); connector standards (20-pin JTAG, 10-pin Cortex, Tag-Connect)</li>
<li>OpenOCD, J-Link, ST-Link: probe software, GDB server, semihosting</li>
<li>GDB commands for embedded: \`break\`, \`watch\`, \`step\`, \`info registers\`, \`x\` (memory examine), \`backtrace\`</li>
<li>Hard fault analysis on Cortex-M: reading the fault status registers (CFSR, HFSR, MMFAR, BFAR), decoding the stacked PC</li>
<li>Fault sources: null-pointer dereference, stack overflow, unaligned access, divide by zero, illegal instruction</li>
<li>Printf-style debugging: \`semihosting\` vs. ITM (Instrumentation Trace Macrocell) via SWO pin; RTT (Real-Time Transfer)</li>
<li>Logic analyzer and oscilloscope use: protocol decode, timing verification, glitch capture</li>
<li>Watchpoint (hardware data breakpoint) for detecting memory corruption</li>
<li>Trace: ETM (Embedded Trace Macrocell), DWT cycle counter for profiling</li>
<li>Common pitfall: optimized builds (\`-O2\`) reorder/eliminate code — debug with \`-Og\` or carefully with symbols</li>
<li>Common pitfall: relying solely on \`printf\` — it changes timing and can mask race conditions</li>
</ul>
        `,
        keyPoints: ["When a hard fault occurs, save the stacked frame immediately in the fault handler; the PC in the frame shows exactly which instruction faulted", "ITM/SWO trace output is non-intrusive (no timing effect) and far superior to UART printf for real-time debugging", "Hardware watchpoints let you catch the precise moment a memory location is written \u2014 invaluable for tracking down corruption", "Always keep a -Og (optimize for debugging) build configuration alongside your release build", "The DWT cycle counter (DWT->CYCCNT) is a free, zero-overhead profiling tool on Cortex-M3/4/7"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level1", "index": 2, "label": "Embedded-C-Programmierung \u2014 Grundlagen"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}],
        resources: [{"title": "Cortex-M hard fault handler decode CFSR HFSR stacked PC tutorial", "url": "https://www.google.com/search?q=Cortex-M+hard+fault+handler+decode+CFSR+HFSR+stacked+PC+tutorial"}, {"title": "SWD JTAG OpenOCD GDB embedded debugging setup", "url": "https://www.google.com/search?q=SWD+JTAG+OpenOCD+GDB+embedded+debugging+setup"}, {"title": "SEGGER RTT real-time transfer embedded debug printf alternative", "url": "https://www.google.com/search?q=SEGGER+RTT+real-time+transfer+embedded+debug+printf+alternative"}, {"title": "search query: `\"The Art of Debugging\" GDB Matloff Salzman book", "url": "https://www.google.com/search?q=search+query:+`\"The+Art+of+Debugging\"+GDB+Matloff+Salzman+book"}]
    },
    {
        title: "Bootloader und Firmware-Updates",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Bootloader role: Flash validation, application jump, recovery mode</li>
<li>Memory map with bootloader: bootloader region, application region, update staging area, metadata/settings region</li>
<li>Jump-to-application mechanism: load stack pointer from vector table, load reset handler, jump</li>
<li>Firmware image format: binary vs. Intel HEX vs. ELF; image header (magic, version, CRC/hash, size)</li>
<li>CRC and cryptographic hash for image integrity: CRC-32, SHA-256 — trade-offs</li>
<li>Signature verification: ECDSA / RSA for authenticity — why CRC alone is not enough for security</li>
<li>A/B (ping-pong) partition scheme: atomic update, rollback safety</li>
<li>Firmware update transports: UART, USB DFU, TFTP over Ethernet, BLE OTA, HTTPS OTA</li>
<li>Commit and rollback: watchdog-based commit, trial-boot counter</li>
<li>Encrypted firmware images: AES-CBC/GCM for confidentiality</li>
<li>Common pitfall: bricking the device by erasing the bootloader or failing mid-erase</li>
<li>Common pitfall: not validating the image before jumping — jumping to 0xFF... causes immediate fault</li>
</ul>
        `,
        keyPoints: ["The bootloader must be stored in write-protected Flash; losing it bricks the device permanently unless a factory recovery path exists", "Always validate image integrity (CRC or hash) AND authenticity (signature) before committing an update \u2014 integrity alone does not prevent loading a valid-but-malicious image", "An A/B partition scheme allows safe updates: the running partition is never erased until the new one is validated", "Implement a trial-boot counter: if the new image crashes before confirming itself, the bootloader automatically reverts to the previous image", "The application jump is two steps: set the MSP from [app_start], then branch to [app_start + 4]"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level1", "index": 2, "label": "Embedded-C-Programmierung \u2014 Grundlagen"}, {"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level3", "index": 4, "label": "Embedded-Security-Grundlagen"}],
        resources: [{"title": "MCUboot open-source bootloader documentation:", "url": "https://docs.mcuboot.com/"}, {"title": "bootloader jump to application Cortex-M MSP reset handler", "url": "https://www.google.com/search?q=bootloader+jump+to+application+Cortex-M+MSP+reset+handler"}, {"title": "A/B firmware update partition scheme rollback embedded OTA", "url": "https://www.google.com/search?q=A/B+firmware+update+partition+scheme+rollback+embedded+OTA"}, {"title": "ECDSA firmware signing embedded secure boot verification", "url": "https://www.google.com/search?q=ECDSA+firmware+signing+embedded+secure+boot+verification"}]
    },
    {
        title: "Embedded-Security-Grundlagen",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Threat model for embedded devices: physical access, supply chain, network, side-channel</li>
<li>Secure boot chain: ROM bootloader → signed bootloader → signed application; root of trust</li>
<li>Read-Out Protection (RDP) levels on Cortex-M: prevent Flash extraction via debug port</li>
<li>Unique device identifier (UID) and key derivation: per-device secrets</li>
<li>Cryptographic primitives in embedded context: AES (hardware accelerator), SHA, TRNG, ECC</li>
<li>Secure storage: key storage in OTP (one-time programmable) memory, TrustZone, secure enclave</li>
<li>TrustZone-M (Cortex-M23/M33): secure vs. non-secure worlds, NSC gateway functions</li>
<li>Common attack vectors: JTAG extraction, fault injection (voltage glitching), timing side-channels</li>
<li>Network-level security: TLS 1.3 on constrained devices — mbed TLS / wolfSSL</li>
<li>Secure firmware update: signing, encryption, anti-rollback version counter</li>
<li>Common pitfall: shipping development firmware with RDP level 0 (debug port open)</li>
<li>Common pitfall: hardcoded credentials or symmetric keys compiled into firmware binary</li>
</ul>
        `,
        keyPoints: ["Security is a design constraint, not a feature added at the end; threat modeling must happen during architecture, not during certification", "RDP level 2 permanently locks the device \u2014 test your production firmware thoroughly before enabling it, as it cannot be reversed", "Never hardcode cryptographic keys in firmware; derive device-unique keys from a UID + master secret using HKDF or similar KDF", "TrustZone-M provides hardware-enforced isolation between security-sensitive code and the application, but only if the secure world is correctly configured", "Side-channel attacks (power analysis, timing) against software crypto implementations are real threats on physically accessible devices"],
        relatedTopics: [{"level": "level3", "index": 3, "label": "Bootloader und Firmware-Updates"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level4", "index": 0, "label": "Kommunikationsprotokolle f\u00fcr IoT"}],
        resources: [{"title": "ARM TrustZone-M documentation:", "url": "https://developer.arm.com/ip-products/security-ip/trustzone"}, {"title": "mbed TLS (now Mbed TLS / TF-M):", "url": "https://www.trustedfirmware.org/projects/mbed-tls/"}, {"title": "embedded threat modeling IoT device security design principles", "url": "https://www.google.com/search?q=embedded+threat+modeling+IoT+device+security+design+principles"}, {"title": "STM32 RDP read protection levels Flash debug port security", "url": "https://www.google.com/search?q=STM32+RDP+read+protection+levels+Flash+debug+port+security"}]
    }
]);
