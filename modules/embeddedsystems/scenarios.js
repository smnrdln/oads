i18n.registerContent('en', 'scenarios', [
    {
        level: 'level1', topicIndex: 0,
        title: "Digital Logic and Number Systems",
        description: "You are writing initialization code. A peripheral requires you to set bits 4 and 5 of a control register to `1` without changing any other bits. The register currently holds an unknown value written by the bootloader.",
        choices: [
            { text: "Assign the entire register: `REG = 0x30`", correct: false, xp: 0 },
            { text: "Read the register, then OR the mask: `REG |= 0x30` ", correct: true, xp: 15 },
            { text: "Use XOR: `REG ^= 0x30`", correct: false, xp: 0 },
            { text: "Set bit 4 first, then separately set bit 5 with two assignments overwriting the register", correct: false, xp: 0 }
        ],
        explanation: "A destroys all other bits. C toggles rather than sets, so it can also clear bits that were already set. D with two full assignments loses the result of the first write if not using OR."
    },
    {
        level: 'level1', topicIndex: 1,
        title: "Microcontroller Architecture Fundamentals",
        description: "Your firmware reads a hardware status register in a tight `while` loop to wait for a flag. The compiler with `-O2` optimization removes the loop entirely because it sees no writes to that address in C code.",
        choices: [
            { text: "Disable compiler optimization globally", correct: false, xp: 0 },
            { text: "Declare the register pointer as `volatile uint32_t *` ", correct: true, xp: 15 },
            { text: "Add a `__NOP()` instruction inside the loop", correct: false, xp: 0 },
            { text: "Use an inline assembly memory barrier", correct: false, xp: 0 }
        ],
        explanation: "`volatile` is the correct, portable, idiomatic C solution. A is too broad and harms all other code. C and D may work on some compilers but are non-portable hacks that don't communicate intent."
    },
    {
        level: 'level1', topicIndex: 2,
        title: "Embedded C Programming Essentials",
        description: "A junior engineer wants to use a `malloc`-based ring buffer inside an interrupt service routine for a sensor data logger on a safety-relevant medical device.",
        choices: [
            { text: "Allow it \u2014 `malloc` is part of the C standard library and thus safe", correct: false, xp: 0 },
            { text: "Allow it only if guarded by a mutex", correct: false, xp: 0 },
            { text: "Replace with a statically allocated ring buffer of fixed maximum size ", correct: true, xp: 15 },
            { text: "Use `alloca` instead, which is stack-allocated", correct: false, xp: 0 }
        ],
        explanation: "`malloc` in an ISR risks heap fragmentation, non-deterministic execution time, and deadlock if the allocator uses locks. `alloca` has undefined behavior in ISRs and can overflow the interrupt stack. Static allocation eliminates all these issues."
    },
    {
        level: 'level1', topicIndex: 3,
        title: "GPIO and Pin Control",
        description: "A pushbutton connects a GPIO input to GND when pressed. No external resistor is fitted. The button is rarely pressed but the product is battery-powered.",
        choices: [
            { text: "Leave the pin floating \u2014 the software handles noise", correct: false, xp: 0 },
            { text: "Configure an internal pull-up \u2014 the pin is high at rest, low when pressed ", correct: true, xp: 15 },
            { text: "Configure an internal pull-down \u2014 the pin is low at rest, low when pressed (no change on press)", correct: false, xp: 0 },
            { text: "Configure the pin as an output driven high to simulate a pull-up", correct: false, xp: 0 }
        ],
        explanation: "A floating input draws no static current but causes unpredictable reads and may oscillate, consuming dynamic power. C creates no signal difference on press. D is wrong because an output pin cannot also be read as an input without reconfiguration."
    },
    {
        level: 'level1', topicIndex: 4,
        title: "Interrupts and Event-Driven Programming",
        description: "A UART ISR receives incoming bytes and needs to parse them into complete packets before notifying the application. Each packet can be up to 256 bytes. Parsing involves a state machine and a CRC calculation.",
        choices: [
            { text: "Run the full state machine and CRC inside the ISR so the packet is ready immediately", correct: false, xp: 0 },
            { text: "Buffer the raw byte in the ISR; set a flag; do state machine + CRC in the main loop ", correct: true, xp: 15 },
            { text: "Use `malloc` inside the ISR to allocate a fresh buffer per packet", correct: false, xp: 0 },
            { text: "Disable the UART interrupt during CRC calculation to avoid re-entry", correct: false, xp: 0 }
        ],
        explanation: "A makes the ISR long and risks losing subsequent bytes if the UART has no hardware FIFO. C introduces heap usage in an ISR (unsafe). D creates a period of data loss. B keeps the ISR minimal and safe."
    },
    {
        level: 'level2', topicIndex: 0,
        title: "Serial Communication Protocols \u2014 UART, SPI, I2C",
        description: "You need to connect 8 identical sensors to an MCU. Each sensor supports both SPI and I2C. The MCU has only 5 free GPIOs total (including the 2 needed for SDA/SCL or the 3 needed for MOSI/MISO/SCK).",
        choices: [
            { text: "Use SPI \u2014 faster and simpler protocol", correct: false, xp: 0 },
            { text: "Use I2C \u2014 only 2 pins needed for all 8 devices ", correct: true, xp: 17 },
            { text: "Use UART \u2014 point-to-point but reliable", correct: false, xp: 0 },
            { text: "Use SPI with a demultiplexer chip to manage chip selects", correct: false, xp: 0 }
        ],
        explanation: "SPI requires 3 shared lines + 1 CS per device = 11 GPIOs for 8 sensors \u2014 exceeding the pin budget. I2C uses 2 lines regardless of device count, fitting within 5 GPIOs. D is a valid engineering solution but adds a component; the question asks about the constrained pin scenario where B is the direct answer."
    },
    {
        level: 'level2', topicIndex: 1,
        title: "Timers, PWM, and Capture/Compare",
        description: "Your motor controller firmware services the watchdog only inside the motor control ISR that fires at 20 kHz. During a firmware update over UART, the ISR is temporarily disabled for 200 ms.",
        choices: [
            { text: "The current design is acceptable \u2014 ISRs are only briefly disabled", correct: false, xp: 0 },
            { text: "Service the watchdog from main loop too \u2014 but only when a semaphore is set by the ISR ", correct: true, xp: 17 },
            { text: "Increase the watchdog timeout to 500 ms to cover the update window", correct: false, xp: 0 },
            { text: "Disable the watchdog during firmware update", correct: false, xp: 0 }
        ],
        explanation: "C increases the detection window for real faults, making the watchdog less effective. D completely defeats the watchdog purpose. A causes unintended resets during valid update operations. B keeps the watchdog active while providing a supervised path for the update case."
    },
    {
        level: 'level2', topicIndex: 2,
        title: "Analog-to-Digital Conversion",
        description: "A thermocouple amplifier outputs 0\u20133.3 V linearly corresponding to 0\u20131000 \u00b0C. Your 12-bit ADC reads values that jump \u00b15 counts between consecutive samples, even though the temperature is stable.",
        choices: [
            { text: "Increase ADC resolution to 16-bit", correct: false, xp: 0 },
            { text: "Use a hardware low-pass RC filter on the ADC input and a software exponential IIR filter ", correct: true, xp: 17 },
            { text: "Read the ADC in a busy-wait loop and use only every 100th reading", correct: false, xp: 0 },
            { text: "Change the reference voltage to 5 V to spread the noise across more counts", correct: false, xp: 0 }
        ],
        explanation: "A addresses quantization but not analog noise. C wastes CPU time and doesn't reduce noise. D changes the scale (and may exceed supply voltage), reducing sensitivity per count without reducing absolute noise. B attacks noise at both its source (analog filter) and in software (IIR)."
    },
    {
        level: 'level2', topicIndex: 3,
        title: "Memory Architecture and Management",
        description: "Your product logs 4 bytes of sensor data to the same single Flash sector every 10 minutes. The Flash sector has a rated 10,000 erase cycle endurance. How long before the sector wears out, and what should you do?",
        choices: [
            { text: "Nothing \u2014 10,000 cycles \u00d7 10 minutes = ~69 days. It will wear out in ~69 days. (identifies the problem; the correct action is also required)", correct: false, xp: 0 },
            { text: "Compress the data to reduce write frequency", correct: false, xp: 0 },
            { text: "Implement wear leveling across multiple Flash sectors ", correct: true, xp: 17 },
            { text: "Switch to external EEPROM", correct: false, xp: 0 }
        ],
        explanation: "The calculation confirms the sector fails in ~69 days \u2014 unacceptable. B helps but doesn't solve the structural problem. D is a hardware change. C, wear leveling across the available sectors, is the standard embedded firmware solution that extends Flash lifetime proportionally to the number of sectors used."
    },
    {
        level: 'level2', topicIndex: 4,
        title: "Power Management and Low-Power Design",
        description: "Your IoT sensor samples every second, sends a BLE packet, and then tries to enter Stop mode. Current measurements show it never reaches the expected 2 \u00b5A Stop current; it stays at ~500 \u00b5A.",
        choices: [
            { text: "The MCU is defective \u2014 replace it", correct: false, xp: 0 },
            { text: "Increase the supply capacitance to stabilize the power rail", correct: false, xp: 0 },
            { text: "An active peripheral clock, DMA channel, or active GPIO is preventing Stop mode entry ", correct: true, xp: 17 },
            { text: "The BLE radio cannot be powered off; accept the 500 \u00b5A", correct: false, xp: 0 }
        ],
        explanation: "Most MCU low-power mode entry fails silently and falls back to a shallower mode when a peripheral is still active. Debugging with a reference manual checklist (disable all peripheral clocks, check DMA, configure GPIOs) is the correct diagnostic approach."
    },
    {
        level: 'level3', topicIndex: 0,
        title: "Real-Time Operating Systems (RTOS)",
        description: "Your RTOS application has a high-priority data acquisition task and a low-priority logging task. The logger holds a mutex protecting a shared UART. The acquisition task needs the same mutex to log a critical fault. The logger is printing a 1 MB dump.",
        choices: [
            { text: "Raise the logger's priority permanently so it finishes faster", correct: false, xp: 0 },
            { text: "Implement the UART driver so the logger uses DMA and releases the mutex after the DMA is triggered, not after it completes ", correct: true, xp: 20 },
            { text: "Give the acquisition task its own separate UART port", correct: false, xp: 0 },
            { text: "Use a binary semaphore instead of a mutex", correct: false, xp: 0 }
        ],
        explanation: "The root cause is the mutex being held for the entire duration of a long I/O operation. Breaking the operation into a kick-off (trigger DMA, release mutex) and a completion callback eliminates the blocking interval. A permanently changes the scheduling behavior system-wide. C is costly. D removes priority inheritance and worsens the inversion problem."
    },
    {
        level: 'level3', topicIndex: 1,
        title: "Device Driver Development",
        description: "You are writing an I2C driver that is shared between two RTOS tasks. Task A reads a temperature sensor; Task B reads an EEPROM. Both call `i2c_read()` concurrently.",
        choices: [
            { text: "Use `__disable_irq()` around every I2C transaction to prevent preemption", correct: false, xp: 0 },
            { text: "Protect the I2C driver with an RTOS mutex so only one task can hold the bus at a time ", correct: true, xp: 20 },
            { text: "Give each task its own separate I2C peripheral instance", correct: false, xp: 0 },
            { text: "Use a global `busy` flag polled in a `while` loop by the second task", correct: false, xp: 0 }
        ],
        explanation: "A disables all interrupts system-wide for the duration of a multi-byte I2C transfer \u2014 potentially many milliseconds \u2014 which destroys real-time behavior. C may not be available on hardware with only one I2C bus. D is a spinning wait that wastes CPU and is not race-condition-safe. B is the textbook solution: a mutex ensures mutual exclusion with proper blocking and priority inheritance."
    },
    {
        level: 'level3', topicIndex: 2,
        title: "Debugging and Fault Diagnosis",
        description: "Your firmware crashes randomly after 2\u20138 hours of operation. The crash always lands in `HardFault_Handler`. The stacked PC points to a location inside `memcpy`. You suspect memory corruption.",
        choices: [
            { text: "Add `printf` statements throughout the codebase to narrow down the location", correct: false, xp: 0 },
            { text: "Set a hardware watchpoint on the suspected corrupted memory region to catch the write that causes it ", correct: true, xp: 20 },
            { text: "Rewrite `memcpy` with bounds checking", correct: false, xp: 0 },
            { text: "Increase the stack size by 4 KB and see if the crash goes away", correct: false, xp: 0 }
        ],
        explanation: "A changes timing and may hide the bug. C treats the symptom, not the cause. D is a guess that confirms stack overflow only if it works \u2014 and might just delay the crash. B is the precise, efficient tool: a hardware watchpoint fires instantly when the corruption write happens, revealing the exact culprit code path."
    },
    {
        level: 'level3', topicIndex: 3,
        title: "Bootloaders and Firmware Updates",
        description: "A deployed IoT device receives a firmware update over BLE. Halfway through receiving the new image, the battery dies. On next power-up, the device must still function.",
        choices: [
            { text: "The device is bricked \u2014 accept it as a known failure mode", correct: false, xp: 0 },
            { text: "Store the incoming image in the inactive A/B partition; the bootloader boots the existing valid partition if the new one is incomplete ", correct: true, xp: 20 },
            { text: "Write the update directly over the running partition byte-by-byte to minimize memory usage", correct: false, xp: 0 },
            { text: "Use a RAM buffer for the entire image before writing to Flash", correct: false, xp: 0 }
        ],
        explanation: "C destroys the running firmware before the new one is validated \u2014 a power failure mid-write bricks the device. D requires the entire image to fit in RAM, which is rarely possible on small MCUs. A is unacceptable for deployed products. B is the standard A/B partition safety design."
    },
    {
        level: 'level3', topicIndex: 4,
        title: "Embedded Security Fundamentals",
        description: "You are shipping 50,000 IoT devices. Each device needs a unique AES-128 key for encrypted telemetry. The provisioning engineer suggests compiling one master key into all devices to save time.",
        choices: [
            { text: "Accept it \u2014 one key for all devices is simpler to manage", correct: false, xp: 0 },
            { text: "Provision each device with a unique key during manufacturing using a secure provisioning station ", correct: true, xp: 20 },
            { text: "Have each device generate its own key on first boot and store it in Flash", correct: false, xp: 0 },
            { text: "Use the MCU's UID as the encryption key directly", correct: false, xp: 0 }
        ],
        explanation: "A means one compromised device reveals the key for all 50,000. C is correct if the device has a TRNG and secure storage, but the key must be enrolled with a backend during manufacturing for traceability. D exposes the key (the UID is not secret; it can be read even with RDP Level 1 in some architectures). B is the industry-standard approach using a Hardware Security Module (HSM) at the manufacturing line."
    },
    {
        level: 'level4', topicIndex: 0,
        title: "Communication Protocols for IoT",
        description: "You are designing a pipeline monitoring system with 50 sensors over a 10 km stretch. Each sensor sends 10 bytes every 5 minutes. Power is from a battery expected to last 5 years. Cellular coverage is absent.",
        choices: [
            { text: "Use BLE mesh \u2014 low power and inexpensive modules", correct: false, xp: 0 },
            { text: "Use LoRaWAN \u2014 long range, low power, small payloads fit the duty cycle budget ", correct: true, xp: 23 },
            { text: "Use Wi-Fi with deep-sleep between transmissions", correct: false, xp: 0 },
            { text: "Use Zigbee \u2014 proven in industrial settings", correct: false, xp: 0 }
        ],
        explanation: "BLE mesh (A) has a range of ~100 m per hop and struggles with 10 km. Wi-Fi (C) consumes 50\u2013150 mA for connection setup, making 5-year battery life infeasible. Zigbee (D) has ~100 m range and requires many hops plus a powered coordinator. LoRaWAN (B) provides 2\u201315 km range, sends 10 bytes trivially within duty-cycle limits, and achieves multi-year battery life on a coin cell."
    },
    {
        level: 'level4', topicIndex: 1,
        title: "Performance Optimization and Profiling",
        description: "Your signal processing pipeline uses `double` floating-point throughout because the original algorithm was written on a PC. On the Cortex-M4, the FPU supports only single-precision (`float`). Profiling shows 60% of runtime is in floating-point operations.",
        choices: [
            { text: "Keep `double` \u2014 it's more accurate and the compiler will emulate it efficiently", correct: false, xp: 0 },
            { text: "Upgrade to Cortex-M7 which has a double-precision FPU", correct: false, xp: 0 },
            { text: "Convert the algorithm to `float` where precision analysis shows it is sufficient; use fixed-point Q format for the tightest loops ", correct: true, xp: 23 },
            { text: "Run the pipeline on a co-processor", correct: false, xp: 0 }
        ],
        explanation: "A is wrong \u2014 software-emulated `double` on M4 is ~10\u2013100\u00d7 slower than hardware `float`. B is a hardware change that may not be justified. D adds cost and complexity. C is the embedded engineer's standard approach: precision analysis first, then systematic conversion to the fastest sufficient type."
    },
    {
        level: 'level4', topicIndex: 2,
        title: "Hardware\u2013Software Co-Design",
        description: "Prototype PCBs arrive. The UART console works. The ADC reads correctly. But the I2C sensor never responds. You verify the I2C address is correct in firmware.",
        choices: [
            { text: "Rewrite the I2C driver from scratch \u2014 the current implementation is buggy", correct: false, xp: 0 },
            { text: "Use a logic analyzer to probe SDA and SCL, check for correct waveforms, ACK presence, and pull-up voltage levels ", correct: true, xp: 23 },
            { text: "Replace the sensor with a known-good part", correct: false, xp: 0 },
            { text: "Increase the I2C clock speed to 400 kHz to force the sensor to respond", correct: false, xp: 0 }
        ],
        explanation: "Without measuring the bus, you cannot distinguish firmware from hardware problems. The pull-up resistors may be missing, the wrong value, or connected to the wrong voltage. A wastes time if hardware is the issue. C doesn't diagnose. D makes things worse (stronger pull-up charge time concerns). B is the single measurement that immediately reveals whether the bus is even electrically functional."
    },
    {
        level: 'level4', topicIndex: 3,
        title: "Safety-Critical Firmware Design",
        description: "A firmware update removes a runtime CRC check of the Flash application image \"because the check adds 50 ms to startup time and the product manager says it is too slow.\"",
        choices: [
            { text: "Accept the removal \u2014 startup time is a user-facing metric and the bootloader already checks the CRC", correct: false, xp: 0 },
            { text: "Optimize the CRC algorithm to run faster (hardware CRC peripheral), then keep the runtime check ", correct: true, xp: 23 },
            { text: "Move the check to a background task that runs after boot is complete", correct: false, xp: 0 },
            { text: "Remove the check only in the non-safety variant of the firmware", correct: false, xp: 0 }
        ],
        explanation: "The bootloader CRC checks the image before jumping to it, but cosmic-ray or ESD-induced Flash bit-flips can corrupt the image at runtime after boot. The runtime check detects these. Option A eliminates a mandatory safety mechanism. C introduces a window between boot and check where faulty code is running unchecked. D creates two divergent firmware variants, which multiplies certification effort. B solves the root cause (performance) without sacrificing safety."
    },
    {
        level: 'level4', topicIndex: 4,
        title: "Capstone Project \u2014 System Integration",
        description: "A shipped IoT product has a critical firmware bug causing random reboots in the field. Devices are physically inaccessible (installed in remote infrastructure). No crash dump was implemented. 50,000 units are affected.",
        choices: [
            { text: "Issue a hotfix firmware release based on code review alone and push OTA immediately", correct: false, xp: 0 },
            { text: "Add crash dump logging to the hotfix firmware, push it OTA, collect logs from a sample of devices, then issue a targeted fix ", correct: true, xp: 23 },
            { text: "Recall all devices for bench debugging", correct: false, xp: 0 },
            { text: "Increase the watchdog timeout to give the buggy code more time to recover", correct: false, xp: 0 }
        ],
        explanation: "A without diagnosis risks fixing the wrong thing and introducing a second bug \u2014 to 50,000 devices. C is commercially disastrous. D masks the bug without fixing it. B is the professional approach: instrument first, diagnose from real field data, then fix precisely. The two-step OTA (instrumentation firmware + fix firmware) is standard practice in the industry."
    },
]);
