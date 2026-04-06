i18n.registerContent('en', 'level1', [
    {
        title: "Embedded Linux System Architecture",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What "embedded" means: constrained resources, dedicated purpose, no interactive installer</li>
<li>The four mandatory software layers: bootloader → kernel → root filesystem → user-space applications</li>
<li>How the layers communicate at runtime (system calls, device files, sysfs)</li>
<li>Comparison with desktop Linux: same kernel, radically different packaging and life cycle</li>
<li>The role of hardware abstraction: CPU architecture, memory map, peripheral buses</li>
<li>Why a custom toolchain is required instead of a host compiler</li>
<li>Common pitfalls: conflating host and target architectures, assuming desktop package managers exist on target</li>
</ul>
`,
        keyPoints: ["Every embedded Linux system has exactly four layers; missing one means the system cannot boot", "The kernel is architecture-independent C; the toolchain makes it architecture-specific", "Device files (`/dev`), sysfs (`/sys`), and procfs (`/proc`) are the three primary kernel\u2013user interfaces", "Storage is almost always flash (NOR, NAND, eMMC); this changes filesystem and update strategy", "\"Cross-compilation\" means the build machine and the target machine have different CPU architectures"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Cross-Compilation Toolchain"}, {"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level1", "index": 4, "label": "Root Filesystem Construction"}, {"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}],
        resources: [{"title": "*Mastering Embedded Linux Programming, 4th ed.* (Simmonds \\& Vasquez) \u2014 search query: `\"Mastering Embedded Linux Programming\" Simmonds 4th edition`", "url": "https://duckduckgo.com/?q=*Mastering+Embedded+Linux+Programming,+4th+ed.*+(Simmonds+\\&+Vasquez)+\u2014+search+query:+`\"Mastering+Embedded+Linux+Program"}, {"title": "Bootlin Embedded Linux training slides (free PDF)", "url": "https://bootlin.com/doc/training/embedded-linux/"}, {"title": "The Linux Kernel documentation overview", "url": "https://www.kernel.org/doc/html/latest/"}, {"title": "Search query: `embedded linux four layers bootloader kernel rootfs userspace overview`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+four+layers+bootloader+kernel+rootfs+userspace+overview`"}]
    },
    {
        title: "Cross-Compilation Toolchain",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Toolchain components: compiler (GCC or Clang), assembler, linker, C library, debugger (GDB)</li>
<li>The three-tuple naming convention: <code>arch-vendor-os-abi</code> (e.g., <code>aarch64-linux-gnu</code>)</li>
<li>C library choices: glibc (full-featured), musl (lightweight), uClibc-ng (legacy embedded)</li>
<li>Hard-float vs. soft-float ABI: why mixing them causes silent linker failures</li>
<li>Sysroot: what it is, why the toolchain must match the target's C library version</li>
<li>Pre-built toolchains vs. building your own with Crosstool-NG</li>
<li>Verifying a toolchain: checking target architecture, libc version, and ABI flags</li>
<li>Common pitfalls: host vs. target library paths, mismatched CFLAGS, rpath issues</li>
</ul>
`,
        keyPoints: ["The triplet (arch-vendor-os-abi) uniquely identifies what a toolchain can produce", "The C library in the toolchain must exactly match (or be compatible with) the C library on the target", "Hard-float ABI uses hardware FPU registers for argument passing; mixing ABIs causes link errors or silent incorrect behavior", "The sysroot is the toolchain's view of the target filesystem; always point `--sysroot` to it", "Pre-built toolchains from your board vendor or Linaro are the fastest starting point"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Embedded Linux System Architecture"}, {"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}, {"level": "level2", "index": 1, "label": "Build System Fundamentals: Yocto Project"}],
        resources: [{"title": "Crosstool-NG documentation", "url": "https://crosstool-ng.github.io/docs/"}, {"title": "Bootlin toolchain training slides", "url": "https://bootlin.com/doc/training/embedded-linux/"}, {"title": "Linaro pre-built toolchains", "url": "https://www.linaro.org/downloads/"}, {"title": "Search query: `arm gcc toolchain sysroot ABI hard float soft float explained`", "url": "https://duckduckgo.com/?q=Search+query:+`arm+gcc+toolchain+sysroot+ABI+hard+float+soft+float+explained`"}]
    },
    {
        title: "Bootloader Fundamentals and U-Boot",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What a bootloader does: hardware initialization, memory controller setup, loading the kernel</li>
<li>Two-stage boot: SPL (Secondary Program Loader) / MLO → full bootloader → kernel</li>
<li>Why two stages exist: internal SRAM size limits on many SoCs</li>
<li>U-Boot architecture: environment, commands, scripting, <code>bootcmd</code></li>
<li>Boot sources: eMMC, SD card, NOR flash, NAND flash, network (TFTP), USB</li>
<li>Passing information to the kernel: kernel command line, device tree blob address</li>
<li>U-Boot environment: persistent variables stored in flash, <code>fw_setenv</code> / <code>fw_printenv</code></li>
<li>Falcon mode (direct SPL → kernel bypass) for fast-boot applications</li>
<li>Common pitfalls: incorrect load address, environment corruption on NAND, wrong DTB address</li>
</ul>
`,
        keyPoints: ["On most ARM SoCs, the ROM bootloader runs first; U-Boot is already \"second stage\" or \"third stage\"", "U-Boot's environment is the primary mechanism for configuring the boot process at runtime without reflashing", "The kernel command line (`bootargs`) is set in U-Boot and consumed by the kernel at startup", "Passing the wrong DTB address to the kernel is one of the most common boot failures in embedded Linux", "Network boot (TFTP + NFS) drastically accelerates development iteration"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Embedded Linux System Architecture"}, {"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}],
        resources: [{"title": "U-Boot official documentation", "url": "https://docs.u-boot.org/en/latest/"}, {"title": "Bootlin U-Boot chapter in Embedded Linux slides", "url": "https://bootlin.com/doc/training/embedded-linux/"}, {"title": "Search query: `U-Boot SPL two-stage boot ARM eMMC TFTP boot sequence`", "url": "https://duckduckgo.com/?q=Search+query:+`U-Boot+SPL+two-stage+boot+ARM+eMMC+TFTP+boot+sequence`"}, {"title": "Search query: `U-Boot environment fw_setenv fw_printenv NAND flash`", "url": "https://duckduckgo.com/?q=Search+query:+`U-Boot+environment+fw_setenv+fw_printenv+NAND+flash`"}]
    },
    {
        title: "Linux Kernel Configuration and Build",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Kernel source structure: <code>arch/</code>, <code>drivers/</code>, <code>fs/</code>, <code>include/</code>, <code>Documentation/</code></li>
<li>Configuration system: Kconfig, <code>make menuconfig</code> / <code>xconfig</code>, <code>defconfig</code> files</li>
<li>Configuration options: built-in (<code>y</code>), module (<code>m</code>), disabled (<code>n</code>) — tradeoffs</li>
<li>The role of a board <code>defconfig</code> provided by SoC vendors</li>
<li>Build artifacts: <code>zImage</code> / <code>Image</code> / <code>uImage</code>, <code>vmlinux</code>, kernel modules (<code>.ko</code>)</li>
<li>Device tree compilation: <code>make dtbs</code>, where DTBs live, how they are named</li>
<li>Out-of-tree vs. in-tree builds: <code>O=</code> flag</li>
<li>Installing modules: <code>make modules_install INSTALL_MOD_PATH=</code></li>
<li>Common pitfalls: missing kernel headers for module build, wrong ARCH and CROSS_COMPILE variables, version mismatch between kernel and modules</li>
</ul>
`,
        keyPoints: ["Always start from the SoC vendor's `defconfig`, then add only what you need", "`ARCH=` and `CROSS_COMPILE=` must both be set for every cross-build invocation", "Kernel modules must be compiled against the exact kernel version they will run on", "`zImage` is a self-decompressing image for 32-bit ARM; `Image` is a raw binary for 64-bit ARM (AArch64)", "The DTB is a separate binary; its load address must be passed to the bootloader"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Cross-Compilation Toolchain"}, {"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level2", "index": 3, "label": "Linux Device Driver Model"}],
        resources: [{"title": "Kernel Kconfig documentation", "url": "https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html"}, {"title": "Bootlin kernel build section", "url": "https://bootlin.com/doc/training/embedded-linux/"}, {"title": "Search query: `linux kernel defconfig menuconfig ARCH CROSS_COMPILE embedded build`", "url": "https://duckduckgo.com/?q=Search+query:+`linux+kernel+defconfig+menuconfig+ARCH+CROSS_COMPILE+embedded+build`"}, {"title": "*Linux Kernel Programming* by Kaiwan N. Billimoria (2024) \u2014 search query: `\"Linux Kernel Programming\" Billimoria 2024`", "url": "https://duckduckgo.com/?q=*Linux+Kernel+Programming*+by+Kaiwan+N.+Billimoria+(2024)+\u2014+search+query:+`\"Linux+Kernel+Programming\"+Billimoria+2024`"}]
    },
    {
        title: "Root Filesystem Construction",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What the root filesystem must contain: <code>/bin</code>, <code>/sbin</code>, <code>/lib</code>, <code>/etc</code>, <code>/dev</code>, <code>/proc</code>, <code>/sys</code>, <code>/tmp</code></li>
<li>BusyBox: what it is, how it replaces hundreds of GNU utilities with one binary via symlinks</li>
<li>Init systems: BusyBox init (inittab), SysV init, systemd — tradeoffs for embedded</li>
<li>The role of <code>/etc/fstab</code> and mount sequence</li>
<li>Creating a minimal rootfs by hand: directory structure, device nodes, init binary</li>
<li>Filesystem formats for flash: UBIFS (NAND), JFFS2 (NOR), ext4 (eMMC), squashfs (read-only)</li>
<li>Overlay filesystems: combining a read-only squashfs base with a writable tmpfs or UBIFS overlay</li>
<li>Initramfs vs. initrd: differences, when to use each</li>
<li>Common pitfalls: missing <code>/dev/console</code>, wrong library paths, no <code>getty</code> on serial port</li>
</ul>
`,
        keyPoints: ["BusyBox is the single most important tool for a minimal embedded rootfs", "`/dev/console` must exist and have the correct major:minor (5:1) or the kernel will panic", "Choosing the right filesystem type depends on the flash type: NAND \u2192 UBIFS; NOR \u2192 JFFS2; eMMC/SD \u2192 ext4", "A read-only root with a writable overlay is the safest pattern for products (reduces corruption risk)", "systemd is powerful but pulls in significant dependencies; evaluate whether it is worth it for your use case"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Embedded Linux System Architecture"}, {"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}],
        resources: [{"title": "BusyBox documentation", "url": "https://busybox.net/FAQ.html"}, {"title": "UBIFS documentation", "url": "https://www.kernel.org/doc/html/latest/filesystems/ubifs.html"}, {"title": "Search query: `embedded linux root filesystem squashfs overlay UBIFS eMMC ext4`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+root+filesystem+squashfs+overlay+UBIFS+eMMC+ext4`"}, {"title": "Search query: `BusyBox inittab embedded init system minimal rootfs`", "url": "https://duckduckgo.com/?q=Search+query:+`BusyBox+inittab+embedded+init+system+minimal+rootfs`"}]
    }
]);
