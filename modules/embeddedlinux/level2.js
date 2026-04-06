i18n.registerContent('en', 'level2', [
    {
        title: "Build System Fundamentals: Buildroot",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What a build system does: automates toolchain, kernel, rootfs, and bootloader builds into one reproducible output</li>
<li>Buildroot's design philosophy: simplicity, no package manager on the target, static dependency resolution</li>
<li>Directory structure: <code>package/</code>, <code>board/</code>, <code>configs/</code>, <code>output/</code></li>
<li>Menuconfig layers: toolchain config, system config, target packages, kernel, bootloader</li>
<li>Package recipes: <code>Config.in</code> and <code>*.mk</code> files — minimal format</li>
<li>Board support: board-specific <code>post-build.sh</code>, <code>post-image.sh</code>, overlay directories</li>
<li>Buildroot vs. Yocto: when to choose which (complexity vs. flexibility)</li>
<li>Generating the SDK for application development</li>
<li>Common pitfalls: not using <code>BR2_EXTERNAL</code> for out-of-tree customizations, rebuilding everything on config change</li>
</ul>
`,
        keyPoints: ["Buildroot produces a complete system image in a single `make` invocation after initial configuration", "`BR2_EXTERNAL` is the correct mechanism for keeping custom packages and board configs out of the upstream tree", "Buildroot does not support package upgrades on the target; the entire image is rebuilt and re-flashed", "The `output/images/` directory contains all deployable artifacts (kernel, DTB, rootfs image, bootloader)", "Buildroot's package format is significantly simpler than BitBake recipes, making it faster to learn"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Root Filesystem Construction"}, {"level": "level1", "index": 1, "label": "Cross-Compilation Toolchain"}, {"level": "level2", "index": 1, "label": "Build System Fundamentals: Yocto Project"}, {"level": "level4", "index": 1, "label": "CI/CD for Embedded Linux"}],
        resources: [{"title": "Buildroot official manual", "url": "https://buildroot.org/downloads/manual/manual.html"}, {"title": "Bootlin Buildroot training", "url": "https://bootlin.com/training/buildroot/"}, {"title": "Search query: `Buildroot BR2_EXTERNAL custom package board configuration tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`Buildroot+BR2_EXTERNAL+custom+package+board+configuration+tutorial`"}, {"title": "Search query: `Buildroot vs Yocto embedded Linux when to choose`", "url": "https://duckduckgo.com/?q=Search+query:+`Buildroot+vs+Yocto+embedded+Linux+when+to+choose`"}]
    },
    {
        title: "Build System Fundamentals: Yocto Project",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Yocto Project vs. OpenEmbedded: how they relate (Poky = reference distribution on top of OE-Core)</li>
<li>Core concepts: recipes (<code>.bb</code>), layers (<code>meta-*</code>), BitBake, images, classes</li>
<li>The layer model: <code>BBLAYERS</code>, <code>LAYERCONF_VERSION</code>, separation of BSP / distro / application layers</li>
<li>BitBake workflow: fetch → unpack → configure → compile → install → package → image</li>
<li>Key variables: <code>IMAGE_INSTALL</code>, <code>MACHINE</code>, <code>DISTRO</code>, <code>EXTRA_IMAGE_FEATURES</code></li>
<li>Writing a simple recipe: <code>SRC_URI</code>, <code>do_compile</code>, <code>do_install</code>, <code>FILES</code></li>
<li>SDK generation: <code>bitbake -c populate_sdk</code></li>
<li>Devtool workflow for iterative application development</li>
<li>Common pitfalls: layer compatibility (<code>LAYERSERIES_COMPAT</code>), sstate-cache invalidation, network fetch during builds</li>
</ul>
`,
        keyPoints: ["In Yocto, a layer is a directory containing recipes, configuration files, and append files; layers can override each other", "`MACHINE` selects the BSP layer (hardware description); `DISTRO` selects the distribution policy (init system, libc, features)", "BitBake is a parallel task execution engine; understanding task dependencies (`do_fetch`, `do_compile`, etc.) prevents debugging confusion", "The sstate-cache is Yocto's build acceleration mechanism; sharing it across a team via a server dramatically speeds builds", "`.bbappend` files let you modify upstream recipes without forking them \u2014 always prefer append over copy-modify"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level4", "index": 1, "label": "CI/CD for Embedded Linux"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}],
        resources: [{"title": "Yocto Project official documentation", "url": "https://docs.yoctoproject.org/"}, {"title": "Linux Foundation LFD460 course", "url": "https://training.linuxfoundation.org/training/embedded-linux-development-with-yocto-project/"}, {"title": "Bootlin Yocto training", "url": "https://bootlin.com/training/yocto/"}, {"title": "*Embedded Linux Systems with the Yocto Project* by Rudolf Streif \u2014 search query: `\"Embedded Linux Systems with the Yocto Project\" Streif`", "url": "https://duckduckgo.com/?q=*Embedded+Linux+Systems+with+the+Yocto+Project*+by+Rudolf+Streif+\u2014+search+query:+`\"Embedded+Linux+Systems+with+the+Yocto"}]
    },
    {
        title: "Device Tree Specification",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why device trees exist: removing board-specific code from the kernel proper</li>
<li>Device tree syntax: nodes, properties, phandles, labels, <code>compatible</code> string</li>
<li>Standard bindings: <code>reg</code>, <code>interrupts</code>, <code>clocks</code>, <code>pinctrl-*</code>, <code>status</code></li>
<li>The <code>compatible</code> string convention and how the kernel matches it to a driver</li>
<li>Device tree overlays (DTO): dynamic patching for add-on hardware without full recompile</li>
<li>Compiling: <code>dtc</code> compiler, <code>make dtbs</code>, output <code>.dtb</code> file</li>
<li>Reading vendor DTS files: understanding inherited base DTSs via <code>#include</code></li>
<li>Using <code>fdtdump</code> / <code>fdtget</code> to inspect a compiled DTB at runtime</li>
<li>Common pitfalls: wrong unit address in node name, <code>#address-cells</code> / <code>#size-cells</code> mismatch, missing <code>status = "okay"</code></li>
</ul>
`,
        keyPoints: ["A device tree describes hardware topology; it does not contain executable code", "The `compatible` property is the primary mechanism by which the kernel binds a driver to a hardware node", "Setting `status = \"disabled\"` disables a peripheral without removing it from the DTS; `status = \"okay\"` enables it", "`#address-cells` and `#size-cells` define how many 32-bit cells encode an address and size in child `reg` properties", "Device tree overlays let factory configurations and add-on boards be described without rebuilding the base DTB"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level2", "index": 3, "label": "Linux Device Driver Model"}, {"level": "level3", "index": 0, "label": "Character and Platform Device Drivers"}],
        resources: [{"title": "Device Tree Specification", "url": "https://devicetree-specification.readthedocs.io/en/stable/"}, {"title": "Kernel DT binding documentation", "url": "https://www.kernel.org/doc/html/latest/devicetree/bindings/"}, {"title": "Bootlin device tree training slides", "url": "https://bootlin.com/doc/training/embedded-linux/"}, {"title": "Search query: `linux device tree tutorial compatible string address-cells size-cells bindings`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+device+tree+tutorial+compatible+string+address-cells+size-cells+bindings`"}]
    },
    {
        title: "Linux Device Driver Model",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>The Linux driver model: bus, device, and driver objects — the three-way match</li>
<li>Bus types: platform, I2C, SPI, USB, PCI — how each enumerates devices</li>
<li>The <code>probe()</code> / <code>remove()</code> lifecycle: when they are called and what they must do</li>
<li>Driver registration: <code>platform_driver_register()</code>, <code>i2c_add_driver()</code>, etc.</li>
<li>Resource management: <code>devm_*</code> APIs — automatic release on driver detach</li>
<li>sysfs and the kobject hierarchy: how drivers expose attributes to user space</li>
<li><code>udev</code> and <code>mdev</code>: dynamic <code>/dev</code> population based on kernel uevents</li>
<li>Power management callbacks: <code>suspend()</code>, <code>resume()</code>, <code>runtime_suspend()</code></li>
<li>Common pitfalls: not using <code>devm_*</code> (causes resource leaks), forgetting to handle <code>probe()</code> returning <code>-EPROBE_DEFER</code></li>
</ul>
`,
        keyPoints: ["The kernel's driver model separates device description (DT or ACPI) from driver logic \u2014 one driver can serve many hardware variants via the `compatible` table", "`probe()` is called when the bus matches a device to a driver; always return an error code on failure, never panic", "`devm_*` functions tie resource lifetimes to the device; they eliminate most resource-leak bugs in modern drivers", "`-EPROBE_DEFER` means a dependency (e.g., a clock or GPIO) is not yet ready; the kernel will retry `probe()` later", "sysfs attributes are the standard way to expose driver state and configuration to user-space tools"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level3", "index": 0, "label": "Character and Platform Device Drivers"}, {"level": "level2", "index": 4, "label": "POSIX System Programming for Embedded"}],
        resources: [{"title": "Kernel driver model documentation", "url": "https://www.kernel.org/doc/html/latest/driver-api/driver-model/"}, {"title": "*Linux Device Driver Development* by John Madieu (2022) \u2014 search query: `\"Linux Device Driver Development\" Madieu 2022 embedded`", "url": "https://duckduckgo.com/?q=*Linux+Device+Driver+Development*+by+John+Madieu+(2022)+\u2014+search+query:+`\"Linux+Device+Driver+Development\"+Madieu+2022+e"}, {"title": "Bootlin kernel driver training", "url": "https://bootlin.com/training/kernel/"}, {"title": "Search query: `linux platform driver probe devm resource management tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+platform+driver+probe+devm+resource+management+tutorial`"}]
    },
    {
        title: "POSIX System Programming for Embedded",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why POSIX matters in embedded Linux: portability, standardized APIs, inter-process communication</li>
<li>Process model: <code>fork()</code>, <code>exec()</code>, <code>wait()</code>, signals — embedded constraints (no MMU variants aside)</li>
<li>File I/O and device access: <code>open()</code>, <code>read()</code>, <code>write()</code>, <code>ioctl()</code>, <code>mmap()</code> — used to talk to drivers</li>
<li>Inter-process communication: pipes, FIFOs, POSIX message queues, shared memory, Unix sockets</li>
<li>Threads: <code>pthread_create()</code>, mutexes, condition variables — priority inversion and <code>PTHREAD_MUTEX_ERRORCHECK</code></li>
<li>Memory-mapped I/O from user space: <code>mmap()</code> on <code>/dev/mem</code> vs. UIO</li>
<li>Signals and <code>signalfd()</code> for non-racy signal handling in event loops</li>
<li><code>epoll</code> and <code>select</code> for multiplexed I/O in embedded daemons</li>
<li>Common pitfalls: blocking calls in real-time threads, priority inversion, unchecked return values from syscalls</li>
</ul>
`,
        keyPoints: ["`ioctl()` is the primary mechanism for control operations on device files that don't map to read/write", "Priority inversion occurs when a high-priority thread is blocked by a low-priority thread holding a mutex; use priority inheritance mutexes", "`mmap()` on a device file maps hardware registers or DMA buffers directly into user-space virtual memory", "`epoll` scales to thousands of file descriptors; `select()` does not \u2014 prefer `epoll` in any daemon that may grow", "Always check every syscall return value; embedded systems have unusual resource constraints that cause failures that desktops never see"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Linux Device Driver Model"}, {"level": "level3", "index": 0, "label": "Character and Platform Device Drivers"}, {"level": "level3", "index": 1, "label": "Real-Time Linux and PREEMPT_RT"}, {"level": "level3", "index": 5, "label": "Networking Stack and Connectivity"}],
        resources: [{"title": "*The Linux Programming Interface* by Michael Kerrisk \u2014 search query: `\"The Linux Programming Interface\" Kerrisk POSIX`", "url": "https://duckduckgo.com/?q=*The+Linux+Programming+Interface*+by+Michael+Kerrisk+\u2014+search+query:+`\"The+Linux+Programming+Interface\"+Kerrisk+POSIX`"}, {"title": "POSIX standard reference", "url": "https://pubs.opengroup.org/onlinepubs/9699919799/"}, {"title": "Search query: `linux epoll ioctl mmap device file embedded programming tutorial`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+epoll+ioctl+mmap+device+file+embedded+programming+tutorial`"}, {"title": "Search query: `POSIX message queue shared memory embedded linux IPC examples`", "url": "https://duckduckgo.com/?q=Search+query:+`POSIX+message+queue+shared+memory+embedded+linux+IPC+examples`"}]
    }
]);
