i18n.registerContent('en', 'level3', [
    {
        title: "Character and Platform Device Drivers",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Character device basics: <code>struct cdev</code>, <code>dev_t</code> (major:minor), <code>alloc_chrdev_region()</code></li>
<li>Implementing <code>file_operations</code>: <code>open</code>, <code>release</code>, <code>read</code>, <code>write</code>, <code>ioctl</code>, <code>mmap</code>, <code>poll</code></li>
<li>Kernel memory allocation: <code>kmalloc()</code> vs. <code>vmalloc()</code> — physically contiguous vs. virtually contiguous</li>
<li>Kernel–user data transfer: <code>copy_to_user()</code> / <code>copy_from_user()</code> — why raw pointer dereference is forbidden</li>
<li>Platform drivers: <code>struct platform_device</code>, <code>struct platform_driver</code>, resource retrieval with <code>platform_get_resource()</code></li>
<li>Interrupt handling: <code>request_irq()</code> / <code>devm_request_irq()</code>, top half vs. bottom half, <code>tasklet</code> vs. <code>workqueue</code></li>
<li>DMA: coherent vs. streaming DMA, <code>dma_alloc_coherent()</code>, <code>dma_map_single()</code></li>
<li>Locking: spinlocks (interrupt context), mutexes (process context) — never sleep in interrupt context</li>
<li>Common pitfalls: sleeping while holding a spinlock, not disabling IRQs when spinlocking from both process and interrupt context</li>
</ul>
`,
        keyPoints: ["`copy_to_user()` / `copy_from_user()` are mandatory; direct kernel pointer dereference from user space causes undefined behavior and is a security vulnerability", "Top-half IRQ handlers must be fast and non-blocking; defer work to a workqueue or threaded IRQ handler", "Never call any function that can sleep (e.g., `kmalloc(GFP_KERNEL)`, mutex lock) from interrupt context", "`kmalloc()` returns physically contiguous memory (required for DMA); `vmalloc()` returns only virtually contiguous memory", "Use `devm_request_irq()` to ensure IRQ is freed automatically on driver removal"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Linux Device Driver Model"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level2", "index": 4, "label": "POSIX System Programming for Embedded"}, {"level": "level3", "index": 4, "label": "Debugging, Tracing, and Profiling"}],
        resources: [{"title": "*Linux Device Driver Development* by John Madieu (2022): search query: `\"Linux Device Driver Development\" Madieu Packt`", "url": "https://duckduckgo.com/?q=*Linux+Device+Driver+Development*+by+John+Madieu+(2022):+search+query:+`\"Linux+Device+Driver+Development\"+Madieu+Packt`"}, {"title": "Kernel char device documentation", "url": "https://www.kernel.org/doc/html/latest/driver-api/basics.html"}, {"title": "Bootlin kernel driver training", "url": "https://bootlin.com/training/kernel/"}, {"title": "Search query: `linux character device driver file_operations cdev alloc_chrdev_region tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+character+device+driver+file_operations+cdev+alloc_chrdev_region+tutorial`"}]
    },
    {
        title: "Real-Time Linux and PREEMPT_RT",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Latency taxonomy: interrupt latency, scheduling latency, worst-case execution time (WCET)</li>
<li>The vanilla kernel preemption models: <code>PREEMPT_NONE</code>, <code>PREEMPT_VOLUNTARY</code>, <code>PREEMPT</code></li>
<li>What <code>PREEMPT_RT</code> (fully preemptible kernel) changes: threaded IRQs, preemptible spinlocks, preemptible RCU</li>
<li>Mainline status: <code>PREEMPT_RT</code> was merged into kernel 6.12</li>
<li>Configuring for RT: <code>CONFIG_PREEMPT_RT</code>, thread priority assignment, CPU isolation (<code>isolcpus=</code>)</li>
<li>Measuring latency: <code>cyclictest</code>, interpreting latency histograms, target: max latency &lt; 100 µs on typical hardware</li>
<li>Priority inheritance for real-time: PI-futexes, <code>PTHREAD_PRIO_INHERIT</code> mutex protocol</li>
<li>CPU shielding: <code>cpuset</code>, <code>taskset</code>, <code>chrt</code>, isolating RT threads from the kernel housekeeping CPUs</li>
<li>Common pitfalls: memory allocation in RT threads (use <code>mlockall(MCL_CURRENT|MCL_FUTURE)</code>), page faults causing latency spikes</li>
</ul>
`,
        keyPoints: ["`PREEMPT_RT` converts almost all spinlocks to sleepable `rt_mutex`; this allows high-priority tasks to preempt even kernel code", "The single most effective RT optimization is CPU isolation combined with `mlockall()` to prevent page faults in the RT thread", "`cyclictest` is the standard benchmark for measuring scheduling latency; run it for hours to catch outlier events", "`PREEMPT_RT` was merged into the mainline kernel at version 6.12 (2024), ending the out-of-tree patch era", "Real-time does not mean \"fast\" \u2014 it means \"deterministically bounded latency\""],
        relatedTopics: [{"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level2", "index": 4, "label": "POSIX System Programming for Embedded"}, {"level": "level3", "index": 2, "label": "Power Management and Energy Optimization"}, {"level": "level3", "index": 4, "label": "Debugging, Tracing, and Profiling"}],
        resources: [{"title": "`cyclictest` and rt-tests documentation", "url": "https://wiki.linuxfoundation.org/realtime/documentation/howto/tools/cyclictest/start"}, {"title": "Linux Foundation Real-Time Linux wiki", "url": "https://wiki.linuxfoundation.org/realtime/start"}, {"title": "Search query: `PREEMPT_RT linux 6.12 mainline latency cyclictest CPU isolation mlockall`", "url": "https://duckduckgo.com/?q=Search+query:+`PREEMPT_RT+linux+6.12+mainline+latency+cyclictest+CPU+isolation+mlockall`"}, {"title": "Search query: `real-time linux priority inversion PI-futex PTHREAD_PRIO_INHERIT`", "url": "https://duckduckgo.com/?q=Search+query:+`real-time+linux+priority+inversion+PI-futex+PTHREAD_PRIO_INHERIT`"}]
    },
    {
        title: "Power Management and Energy Optimization",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Linux power management subsystems: runtime PM, system sleep (suspend-to-RAM, suspend-to-disk), CPUfreq, CPUidle</li>
<li>Runtime PM: <code>pm_runtime_enable()</code>, <code>pm_runtime_get()</code>, <code>pm_runtime_put()</code> — automatic idle when unused</li>
<li>CPUfreq governors: <code>performance</code>, <code>powersave</code>, <code>schedutil</code>, <code>ondemand</code> — tradeoffs</li>
<li>CPUidle: idle states (C-states), <code>menu</code> governor, latency vs. power savings</li>
<li>Wake locks and wakeup sources: preventing suspend during critical operations</li>
<li>Dynamic Voltage and Frequency Scaling (DVFS): $P \propto C \cdot V^2 \cdot f$ — voltage reduction is the most impactful lever</li>
<li><code>PowerTOP</code>: identifying power consumers, enabling autosuspend for PCIe / USB devices</li>
<li>Suspend/resume sequencing: <code>prepare</code>, <code>suspend</code>, <code>suspend_late</code>, <code>suspend_noirq</code> — and the resume reversal</li>
<li>Common pitfalls: forgetting to enable runtime PM for a device (it draws full power forever), blocking suspend with a taken wakeup lock</li>
</ul>
`,
        keyPoints: ["Dynamic power scales with $V^2 \\cdot f$, so halving voltage has a 4\u00d7 greater effect on dynamic power than halving frequency", "Runtime PM allows individual devices to enter low-power states independently, without suspending the whole system", "`schedutil` CPUfreq governor uses scheduler utilization signals directly, giving the best frequency-vs-performance tradeoff on modern kernels", "`PowerTOP` generates tunables as a shell script that can be applied at boot for persistent optimization", "Always test suspend/resume under full system load, not just at idle \u2014 wake sources and in-flight DMA are common failure points"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Linux Device Driver Model"}, {"level": "level3", "index": 0, "label": "Character and Platform Device Drivers"}, {"level": "level3", "index": 1, "label": "Real-Time Linux and PREEMPT_RT"}, {"level": "level4", "index": 2, "label": "Board Bring-Up and Production Hardening"}],
        resources: [{"title": "Kernel power management documentation", "url": "https://www.kernel.org/doc/html/latest/driver-api/pm/"}, {"title": "PowerTOP usage guide", "url": "https://01.org/sites/default/files/documentation/powertop_users_guide_201412.pdf"}, {"title": "Search query: `linux CPUfreq schedutil governor embedded power management tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+CPUfreq+schedutil+governor+embedded+power+management+tutorial`"}, {"title": "Search query: `linux runtime PM pm_runtime_enable autosuspend device driver`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+runtime+PM+pm_runtime_enable+autosuspend+device+driver`"}]
    },
    {
        title: "System Security and Secure Boot",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Threat model for embedded Linux: physical access, network attack surface, supply chain</li>
<li>Secure boot chain: hardware root of trust → signed bootloader → signed kernel → signed rootfs</li>
<li>Public-key cryptography in the boot chain: asymmetric signing, hash verification, certificate chains</li>
<li>U-Boot verified boot: <code>FIT</code> images, <code>CONFIG_FIT_SIGNATURE</code>, device-specific signing keys</li>
<li>Linux kernel module signing: <code>CONFIG_MODULE_SIG_FORCE</code></li>
<li>Linux Security Modules (LSM): SELinux vs. AppArmor — policy model differences</li>
<li>Filesystem integrity: <code>dm-verity</code> for block-level hash tree verification of the rootfs</li>
<li>Reducing attack surface: removing unused kernel modules, disabling <code>CONFIG_KEXEC</code>, <code>/proc/kcore</code>, <code>debugfs</code> in production</li>
<li>Secure storage: OP-TEE and TrustZone for protecting keys; <code>fscrypt</code> for per-file encryption</li>
<li>Common pitfalls: shipping development keys in production, leaving <code>JTAG</code> and <code>UART</code> console enabled, using SHA-1 for image signing</li>
</ul>
`,
        keyPoints: ["A secure boot chain is only as strong as the hardware root of trust; a compromised bootloader invalidates all higher-layer signing", "`dm-verity` provides cryptographic verification of the rootfs at read time without requiring a decryption key on the device", "SELinux uses a mandatory access control model with a system-wide policy; AppArmor uses path-based profiles per application \u2014 AppArmor is typically easier to deploy on embedded", "Never ship with development/test signing keys; use a Hardware Security Module (HSM) for production key storage", "Disabling `debugfs`, removing `/proc/kcore`, and disabling `KEXEC` eliminates significant kernel attack surface in production"],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level1", "index": 4, "label": "Root Filesystem Construction"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}, {"level": "level4", "index": 2, "label": "Board Bring-Up and Production Hardening"}],
        resources: [{"title": "U-Boot verified boot documentation", "url": "https://docs.u-boot.org/en/latest/usage/fit/verified-boot.html"}, {"title": "dm-verity kernel documentation", "url": "https://www.kernel.org/doc/html/latest/admin-guide/device-mapper/verity.html"}, {"title": "OP-TEE documentation", "url": "https://optee.readthedocs.io/en/latest/"}, {"title": "Search query: `embedded linux secure boot dm-verity SELinux AppArmor production hardening`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+secure+boot+dm-verity+SELinux+AppArmor+production+hardening`"}]
    },
    {
        title: "Debugging, Tracing, and Profiling",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Debugging toolchain: <code>gdb</code> + <code>gdbserver</code> for remote debugging of user-space applications</li>
<li>Kernel debugging: <code>CONFIG_KGDB</code>, <code>CONFIG_DYNAMIC_DEBUG</code>, kernel oops and panic decoding with <code>addr2line</code></li>
<li>Tracing frameworks: <code>ftrace</code> (function tracer, irqsoff, preemptoff tracers), <code>perf</code>, <code>LTTng</code>, <code>eBPF</code></li>
<li><code>ftrace</code> usage: <code>trace-cmd</code>, kernel function tracing, event tracing, latency measurement</li>
<li><code>perf</code>: CPU performance counters, <code>perf stat</code>, <code>perf record</code>, <code>perf report</code>, flame graphs</li>
<li>Memory debugging: <code>kmemleak</code> (kernel), <code>valgrind</code>, address sanitizer (ASan) for user space</li>
<li><code>strace</code> and <code>ltrace</code>: syscall and library call tracing for user-space diagnosis</li>
<li>Hardware-assisted tracing: ARM CoreSight, ETM/ETB — cycle-accurate instruction tracing</li>
<li>Common pitfalls: debugging optimized (<code>-O2</code>) code without debug symbols, tracing overhead skewing timing results</li>
</ul>
`,
        keyPoints: ["Always keep a debug symbol file (`vmlinux` for kernel, unstripped ELF for applications) separate from the deployed stripped binary \u2014 you need it to decode addresses from crash logs", "`ftrace`'s `irqsoff` tracer identifies the longest period interrupts were disabled \u2014 the most direct measurement for RT latency investigation", "`perf` flame graphs collapse call stacks into a visual hierarchy; they are the fastest way to find CPU hotspots", "`kmemleak` scans kernel memory for objects that are allocated but have no reference pointers \u2014 run it during soak testing", "`eBPF` programs can trace kernel and user-space events at near-zero overhead without kernel recompilation, making them production-safe"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level3", "index": 0, "label": "Character and Platform Device Drivers"}, {"level": "level3", "index": 1, "label": "Real-Time Linux and PREEMPT_RT"}, {"level": "level4", "index": 1, "label": "CI/CD for Embedded Linux"}],
        resources: [{"title": "Brendan Gregg's Linux Performance tools overview", "url": "https://www.brendangregg.com/linuxperf.html"}, {"title": "`ftrace` kernel documentation", "url": "https://www.kernel.org/doc/html/latest/trace/ftrace.html"}, {"title": "Search query: `linux perf flame graph embedded debugging ftrace trace-cmd tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+perf+flame+graph+embedded+debugging+ftrace+trace-cmd+tutorial`"}, {"title": "Search query: `kmemleak kernel memory leak detection embedded linux`", "url": "https://duckduckgo.com/?q=Search+query:+`kmemleak+kernel+memory+leak+detection+embedded+linux`"}]
    },
    {
        title: "Networking Stack and Connectivity",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Linux network stack overview: NIC driver → netdev core → TCP/IP → socket API</li>
<li>Network driver basics: <code>struct net_device</code>, NAPI (New API) for interrupt-mitigation receive, <code>netif_receive_skb()</code></li>
<li>Configuring networking from user space: <code>ip</code>, <code>iproute2</code>, <code>ethtool</code>, <code>NetworkManager</code> vs. <code>systemd-networkd</code> vs. static <code>ip</code> scripts for embedded</li>
<li>Wireless: <code>cfg80211</code> / <code>mac80211</code> kernel subsystem, <code>wpa_supplicant</code>, regulatory domain</li>
<li>CAN bus: SocketCAN — treating CAN interfaces as network sockets, <code>can-utils</code> (<code>candump</code>, <code>cansend</code>)</li>
<li>Network namespaces and virtual interfaces: <code>veth</code>, <code>bridge</code>, <code>macvlan</code> — used in container-on-embedded scenarios</li>
<li>Firewall and packet filtering: <code>nftables</code> (replaces <code>iptables</code>), minimal rulesets for embedded</li>
<li>TLS in embedded: <code>mbedTLS</code> vs. <code>wolfSSL</code> — footprint and certification tradeoffs</li>
<li>Common pitfalls: MTU mismatch on industrial networks, multicast flooding on small switches, not pinning regulatory domain for Wi-Fi certification</li>
</ul>
`,
        keyPoints: ["NAPI batches received packets under high load, trading latency for throughput \u2014 for real-time applications, tune `rx-usecs` with `ethtool` to minimize interrupt coalescing delay", "SocketCAN exposes CAN bus as a standard network socket, enabling standard POSIX socket code to send and receive CAN frames", "`nftables` uses a single framework for all packet filtering (IPv4, IPv6, ARP, bridging); always prefer it over legacy `iptables` for new embedded designs", "Pinning the Wi-Fi regulatory domain at compile time is mandatory for products with fixed deployment geography to pass radio certification", "TLS library footprint matters: mbedTLS and wolfSSL both target under 300 KB flash; OpenSSL is typically too large for constrained targets"],
        relatedTopics: [{"level": "level2", "index": 4, "label": "POSIX System Programming for Embedded"}, {"level": "level2", "index": 3, "label": "Linux Device Driver Model"}, {"level": "level3", "index": 3, "label": "System Security and Secure Boot"}, {"level": "level4", "index": 2, "label": "Board Bring-Up and Production Hardening"}],
        resources: [{"title": "SocketCAN documentation", "url": "https://www.kernel.org/doc/html/latest/networking/can.html"}, {"title": "`iproute2` manual", "url": "https://baturin.org/docs/iproute2/"}, {"title": "mbedTLS documentation", "url": "https://mbed-tls.readthedocs.io/en/latest/"}, {"title": "Search query: `linux NAPI network driver embedded ethtool interrupt coalescing CAN SocketCAN`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+NAPI+network+driver+embedded+ethtool+interrupt+coalescing+CAN+SocketCAN`"}]
    },
    {
        title: "Storage Subsystems and Flash Management",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Flash memory types: NOR (byte-addressable, XIP), NAND (page/block, bad blocks), eMMC (managed NAND with internal controller), SD card</li>
<li>MTD (Memory Technology Device) subsystem: <code>mtdchar</code>, <code>mtdblock</code>, <code>mtdinfo</code>, <code>flash_erase</code>, <code>nandwrite</code></li>
<li>NAND constraints: erase-before-write, erase block size (128 KB–4 MB), bad block management, wear leveling</li>
<li>UBI (Unsorted Block Images): logical eraseblock mapping, wear leveling, bad block handling — sits on top of MTD</li>
<li>UBIFS: log-structured filesystem on UBI, power-cut safe, compression (LZO/zlib)</li>
<li>eMMC specifics: partitions (boot0, boot1, RPMB, user area), <code>mmc-utils</code>, reliable write mode</li>
<li>RPMB (Replay Protected Memory Block): tamper-evident storage for counters and keys</li>
<li>Filesystem selection matrix: NOR → JFFS2 / squashfs; raw NAND → UBI + UBIFS; eMMC → ext4 / f2fs; read-only → squashfs</li>
<li>Common pitfalls: mounting UBIFS directly on an MTD device (must go through UBI), not handling <code>EBADMSG</code> (bit-flip ECC error) in NAND drivers, filling a NAND partition to 100% (UBI requires free space for wear leveling)</li>
</ul>
`,
        keyPoints: ["Raw NAND must never be accessed through a block interface without UBI \u2014 doing so skips bad-block management and wear leveling, rapidly destroying flash", "UBI requires approximately 2\u20133 physical erase blocks overhead per volume for its internal tables; account for this in partition sizing", "eMMC's RPMB partition provides hardware-authenticated, replay-protected storage \u2014 use it for secure counter storage in OTA update systems", "JFFS2 mount time scales with partition size (it scans the entire flash at mount); for large NOR partitions, UBIFS is preferred even on NOR", "f2fs (Flash-Friendly File System) is optimized for eMMC and NVMe; it reduces write amplification compared to ext4"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Root Filesystem Construction"}, {"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}, {"level": "level3", "index": 3, "label": "System Security and Secure Boot"}],
        resources: [{"title": "MTD subsystem documentation", "url": "https://www.linux-mtd.infradead.org/doc/general.html"}, {"title": "UBI/UBIFS documentation", "url": "https://www.linux-mtd.infradead.org/doc/ubi.html"}, {"title": "Search query: `linux NAND UBI UBIFS partition layout embedded flash management tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+NAND+UBI+UBIFS+partition+layout+embedded+flash+management+tutorial`"}, {"title": "Search query: `eMMC RPMB mmc-utils embedded linux reliable write boot partition`", "url": "https://duckduckgo.com/?q=Search+query:+`eMMC+RPMB+mmc-utils+embedded+linux+reliable+write+boot+partition`"}]
    }
]);
