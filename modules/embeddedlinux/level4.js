i18n.registerContent('en', 'level4', [
    {
        title: "Over-the-Air Updates and Redundant Boot",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why OTA updates fail catastrophically: interrupted flash write, wrong image, hardware incompatibility</li>
<li>Dual-bank (A/B) partition scheme: always one known-good copy, atomic switchover</li>
<li>Update frameworks: RAUC, SWUpdate, Mender — architecture comparison</li>
<li>The update state machine: <code>DOWNLOADING</code> → <code>DOWNLOADED</code> → <code>INSTALLING</code> → <code>INSTALLED</code> → <code>ACTIVATED</code> → <code>REBOOTING</code> → <code>TESTING</code> → <code>CONFIRMED</code> (or rollback)</li>
<li>Bootloader integration: U-Boot boot count mechanism, <code>bootlimit</code>, fallback to previous partition on failed boot</li>
<li>Delta updates: binary diff algorithms (<code>bsdiff</code>, <code>casync</code>) to minimize transfer size</li>
<li>Cryptographic verification: image signing, certificate pinning for the update server</li>
<li>Atomic writes: writing the new image to the inactive partition, then atomically switching the boot flag</li>
<li>eMMC RPMB for update counter: prevents update rollback attacks</li>
<li>Common pitfalls: not testing the rollback path in CI, updating the bootloader itself (requires double-copy of bootloader too), partial update of multi-partition images</li>
</ul>
`,
        keyPoints: ["An OTA update system that cannot roll back is more dangerous than no OTA at all \u2014 a bad update must never brick the device permanently", "The A/B scheme requires at least 2\u00d7 the storage of a single image but is the only reliable approach for unattended devices", "The update agent should verify the image signature before writing anything to flash \u2014 reject corrupted or tampered images early", "Boot count + watchdog reset is the standard mechanism for detecting a failed update: if the new partition does not boot successfully and `confirm` the update within N reboots, revert to the previous partition", "Delta updates can reduce OTA bandwidth by 80\u201395% for minor software updates \u2014 significant for cellular-connected devices"],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level1", "index": 4, "label": "Root Filesystem Construction"}, {"level": "level3", "index": 6, "label": "Storage Subsystems and Flash Management"}, {"level": "level3", "index": 3, "label": "System Security and Secure Boot"}, {"level": "level4", "index": 1, "label": "CI/CD for Embedded Linux"}],
        resources: [{"title": "RAUC documentation", "url": "https://rauc.readthedocs.io/en/latest/"}, {"title": "SWUpdate documentation", "url": "https://sbabic.github.io/swupdate/"}, {"title": "Mender documentation", "url": "https://docs.mender.io/"}, {"title": "Search query: `embedded linux OTA A/B partition RAUC SWUpdate U-Boot bootcount rollback`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+OTA+A/B+partition+RAUC+SWUpdate+U-Boot+bootcount+rollback`"}]
    },
    {
        title: "CI/CD for Embedded Linux",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why CI/CD is hard for embedded: hardware-in-the-loop testing, long build times, image flashing, serial console access</li>
<li>Build pipeline stages: lint → static analysis → cross-compile → unit tests (QEMU) → image build → hardware tests</li>
<li>QEMU for embedded: <code>qemu-system-arm</code>, <code>qemu-system-aarch64</code> — what it can and cannot emulate (no peripheral fidelity)</li>
<li>Hardware-in-the-loop (HIL) testing: remote power cycling, UART console capture, automated flashing via U-Boot TFTP</li>
<li>Static analysis tools: <code>sparse</code>, <code>smatch</code>, <code>clang-tidy</code>, <code>cppcheck</code> for kernel and C code</li>
<li>Build reproducibility: <code>SOURCE_DATE_EPOCH</code>, Yocto's locked sstate-cache, Buildroot's hash tracking</li>
<li>Test frameworks for embedded: <code>pytest</code> + serial/SSH fixture, <code>labgrid</code>, <code>LAVA</code> (Linaro Automation and Validation Architecture)</li>
<li>Image signing integration: signing keys in CI secrets vault, signing at image generation time</li>
<li>Common pitfalls: QEMU passing tests that fail on real hardware (peripheral timing, memory ordering), flaky HIL tests caused by power-on timing, not archiving build artifacts with their source commit hash</li>
</ul>
`,
        keyPoints: ["QEMU is indispensable for fast feedback on kernel and application logic, but hardware tests are mandatory for anything involving real peripherals, timing, or power management", "`labgrid` is the standard Python framework for abstracting HIL lab resources (power switches, serial consoles, JTAG) in automated tests", "Reproducible builds mean that the same source commit always produces the bit-identical binary \u2014 this is essential for compliance auditing and binary security analysis", "Every deployable image artifact should be signed during the CI pipeline, never on a developer's workstation", "A \"passing CI pipeline\" on QEMU alone is not a sufficient quality gate for embedded products"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "Build System Fundamentals: Buildroot"}, {"level": "level2", "index": 1, "label": "Build System Fundamentals: Yocto Project"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}, {"level": "level3", "index": 4, "label": "Debugging, Tracing, and Profiling"}, {"level": "level4", "index": 2, "label": "Board Bring-Up and Production Hardening"}],
        resources: [{"title": "labgrid documentation", "url": "https://labgrid.readthedocs.io/en/latest/"}, {"title": "LAVA documentation", "url": "https://lava.readthedocs.io/en/latest/"}, {"title": "Search query: `embedded linux CI pipeline QEMU HIL labgrid automated testing`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+CI+pipeline+QEMU+HIL+labgrid+automated+testing`"}, {"title": "Search query: `Yocto reproducible builds SOURCE_DATE_EPOCH sstate-cache CI`", "url": "https://duckduckgo.com/?q=Search+query:+`Yocto+reproducible+builds+SOURCE_DATE_EPOCH+sstate-cache+CI`"}]
    },
    {
        title: "Board Bring-Up and Production Hardening",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What "board bring-up" means: getting a new, unsupported PCB to boot Linux from scratch</li>
<li>The bring-up sequence: serial console first → bootloader → kernel → minimal rootfs → peripherals one by one</li>
<li>Reading schematics and datasheets: identifying boot mode pins, UART debug port, JTAG, power rail sequencing</li>
<li>BSP porting checklist: CPU clock, DRAM initialization (DDR training), pinmux configuration, boot media</li>
<li>First-stage debugging without a running OS: JTAG + OpenOCD, register-level hardware verification</li>
<li>Memory testing: <code>memtester</code>, DDR stress testing before any software development begins</li>
<li>Production programming: writing bootloader, kernel, rootfs to eMMC/NAND in the factory — JTAG vs. SD card recovery image vs. USB mass storage gadget</li>
<li>End-of-line (EOL) testing: functional test, RF calibration for wireless, burn-in soak</li>
<li>Hardening a production image: stripping debug tools, minimizing packages, read-only rootfs, disabling unnecessary services, setting resource limits</li>
<li>Common pitfalls: skipping DDR validation (causes rare, irreproducible crashes in the field), not locking boot mode pins at production, shipping with development SSH keys</li>
</ul>
`,
        keyPoints: ["The serial console (UART) is the single most important debug interface during bring-up; establish it before anything else", "DDR initialization failure is the most common reason a new board refuses to boot \u2014 always run a full memory test before proceeding to software", "Boot mode pin resistors must be set at PCB layout time and locked for production; a floating boot mode pin causes random boot failures", "The production programming fixture should write a known-good image, verify it by reading back and checking the hash, and then run a brief functional test \u2014 never ship unverified flash", "A hardened production image should have no package manager, no compiler, no SSH daemon on the default network interface, and `root` account either disabled or password-locked"],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Bootloader Fundamentals and U-Boot"}, {"level": "level2", "index": 2, "label": "Device Tree Specification"}, {"level": "level1", "index": 3, "label": "Linux Kernel Configuration and Build"}, {"level": "level4", "index": 0, "label": "Over-the-Air Updates and Redundant Boot"}, {"level": "level4", "index": 1, "label": "CI/CD for Embedded Linux"}],
        resources: [{"title": "OpenOCD documentation", "url": "https://openocd.org/doc/html/index.html"}, {"title": "Bootlin board bring-up training", "url": "https://bootlin.com/training/embedded-linux/"}, {"title": "Search query: `embedded linux board bring-up sequence UART JTAG DDR training BSP porting`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+board+bring-up+sequence+UART+JTAG+DDR+training+BSP+porting`"}, {"title": "Search query: `production programming eMMC NAND factory test end-of-line embedded Linux`", "url": "https://duckduckgo.com/?q=Search+query:+`production+programming+eMMC+NAND+factory+test+end-of-line+embedded+Linux`"}]
    },
    {
        title: "Capstone: End-to-End Embedded Linux Product",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Integrating all course layers into a single coherent product architecture</li>
<li>Requirements analysis: defining hardware constraints, software feature set, security requirements, update strategy, production volume</li>
<li>Architecture decision record (ADR) format: documenting why each technical choice was made (e.g., Buildroot vs. Yocto, UBIFS vs. ext4)</li>
<li>Full system design walkthrough: hardware → BSP → toolchain → build system → kernel config → rootfs → OTA → CI/CD → security → production</li>
<li>Partitioning strategy: SPL | U-Boot | U-Boot env | Kernel A | Kernel B | RootFS A | RootFS B | Data | RPMB</li>
<li>Performance budget: boot time analysis, memory footprint analysis, storage budget</li>
<li>Security review checklist: boot chain, network exposure, key management, physical interfaces</li>
<li>Regression testing strategy: smoke tests on every commit, full HIL suite on release candidates</li>
<li>Maintenance lifecycle: LTS kernel selection, upstream dependency tracking, CVE monitoring workflow</li>
<li>The "day-2" problem: what happens 3 years after launch — kernel EOL, OpenSSL CVE, hardware supply change</li>
</ul>
`,
        keyPoints: ["Every architectural decision should be recorded with its rationale; future engineers (including yourself) will need to understand why, not just what", "LTS (Long-Term Support) kernel versions receive security backports for 6 years; always target an LTS release for products with multi-year lifespans", "A CVE monitoring workflow (subscribing to `linux-cve-announce`, tracking component versions) must be built into the maintenance process from day one, not retrofitted after the first incident", "The partition layout is one of the hardest things to change after shipping; design it generously with spare capacity and the full A/B OTA scheme from the beginning", "\"Done\" in embedded Linux is when the system boots securely, updates reliably, fails safely, and can be maintained by the next engineer who has never seen it before"],
        relatedTopics: [],
        resources: [{"title": "*Mastering Embedded Linux Programming, 4th ed.* (Simmonds & Vasquez): search query: `\"Mastering Embedded Linux Programming\" 4th edition Simmonds`", "url": "https://duckduckgo.com/?q=*Mastering+Embedded+Linux+Programming,+4th+ed.*+(Simmonds+&+Vasquez):+search+query:+`\"Mastering+Embedded+Linux+Programmi"}, {"title": "Linux kernel LTS release schedule", "url": "https://www.kernel.org/category/releases.html"}, {"title": "Search query: `embedded linux product architecture decision record LTS CVE maintenance lifecycle`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+product+architecture+decision+record+LTS+CVE+maintenance+lifecycle`"}, {"title": "Search query: `embedded linux boot time optimization memory footprint production checklist`", "url": "https://duckduckgo.com/?q=Search+query:+`embedded+linux+boot+time+optimization+memory+footprint+production+checklist`"}]
    }
]);
