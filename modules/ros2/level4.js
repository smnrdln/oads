i18n.registerContent('en', 'level4', [
    {
        title: "Security in ROS 2 (SROS2)",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Threat model: unauthenticated nodes injecting commands, eavesdropping sensor data, spoofing topics</li>
<li>DDS Security specification: Authentication, Access Control, Cryptography, Logging, Data Tagging plugins</li>
<li>SROS2 toolchain: <code>ros2 security</code> CLI — <code>create_keystore</code>, <code>create_enclave</code>, <code>create_permission</code></li>
<li>Enclaves: the security principal unit — one enclave per node or process</li>
<li>Permissions XML: governing which topics a node can publish/subscribe, which services it can call</li>
<li>Environment variable: <code>ROS_SECURITY_KEYSTORE</code>, <code>ROS_SECURITY_STRATEGY</code> (<code>Enforce</code> vs. <code>Permissive</code>)</li>
<li>Certificate chain: keystore CA → enclave certificate</li>
<li><code>Permissive</code> mode (development) vs. <code>Enforce</code> mode (production): never ship <code>Permissive</code> in production</li>
<li>Pitfall: <code>ENFORCE</code> mode will silently block communication if permissions do not match — test thoroughly in <code>Permissive</code> first</li>
</ul>`,
        keyPoints: ["SROS2 is built on the DDS Security standard; it does not require a third-party security layer", "Each enclave needs a signed certificate and a permissions file describing its allowed communication", "`ROS_SECURITY_STRATEGY=Enforce` rejects any node that cannot present a valid certificate \u2014 use this in production", "Permissions are scoped to topic partitions and message types; overly broad permissions defeat the purpose", "Key rotation requires restarting affected nodes; plan for zero-downtime key rotation in critical systems"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "ROS 2 Architecture and Core Philosophy"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}, {"level": "level4", "index": 2, "label": "CI/CD for Robotics Software"}, {"level": "level3", "index": 7, "label": "Multi-Robot Systems and Namespacing"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html"}, {"title": "https://design.ros2.org/articles/ros2_security_enclaves.html", "url": "https://design.ros2.org/articles/ros2_security_enclaves.html"}]
    },
    {
        title: "Testing Strategies for ROS 2",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Testing pyramid for robotics: unit tests → integration tests → system/simulation tests → hardware-in-loop</li>
<li>Unit testing: <code>pytest</code> (Python), <code>gtest</code>/<code>ament_gtest</code> (C++); testing pure logic without ROS overhead</li>
<li>ROS 2 integration testing: <code>launch_testing</code> framework — launching a real node graph in a test process</li>
<li><code>launch_testing</code> patterns: <code>ReadyToTest</code> event, <code>WaitForTopics</code>, asserting on published messages</li>
<li>Mocking hardware: fake hardware interfaces, mock sensor publishers replaying bags</li>
<li><code>colcon test</code> pipeline: running tests as part of CI build</li>
<li>Code coverage: <code>lcov</code> (C++), <code>pytest-cov</code> (Python); reporting with CI systems</li>
<li>Determinism in tests: using simulation time (<code>/clock</code> topic, <code>use_sim_time:=true</code>) for reproducible timing</li>
<li>Pitfall: flaky tests caused by race conditions at node startup — always use <code>ReadyToTest</code> event and topic availability assertions</li>
</ul>`,
        keyPoints: ["Unit tests should have zero ROS 2 dependencies \u2014 test the math and logic in isolation", "`launch_testing` is the official way to write integration tests that start actual nodes; use it over `subprocess` hacks", "Always use `use_sim_time:=true` in tests to decouple test timing from wall-clock speed", "A test that passes 95% of the time is worse than no test \u2014 eliminate flakiness before merging", "Hardware-in-loop tests require real hardware; gate them separately in CI from pure simulation tests"],
        relatedTopics: [{"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}, {"level": "level2", "index": 4, "label": "rosbag2: Recording and Replay"}, {"level": "level2", "index": 2, "label": "Simulation with Gazebo"}, {"level": "level4", "index": 2, "label": "CI/CD for Robotics Software"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Launch/Launch-testing.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Launch/Launch-testing.html"}, {"title": "https://docs.ros.org/en/rolling/p/launch_testing/", "url": "https://docs.ros.org/en/rolling/p/launch_testing/"}]
    },
    {
        title: "CI/CD for Robotics Software",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why CI/CD for robotics: consistent build environments, automated regression testing, simulation gating</li>
<li>Docker-based build and test environments: using official <code>ros:&lt;distro&gt;</code> base images</li>
<li>GitHub Actions / GitLab CI patterns for ROS 2: cache <code>ccache</code>, <code>colcon build</code>, <code>colcon test</code>, artifact uploads</li>
<li>Headless simulation in CI: <code>gz sim -s</code> + <code>Xvfb</code> or off-screen rendering for visual sensors</li>
<li>Quality gates: linting (<code>ament_flake8</code>, <code>ament_cpplint</code>, <code>ament_uncrustify</code>), coverage thresholds, test pass rate</li>
<li>Deployment patterns: building Docker images tagged with git SHA, pushing to a container registry</li>
<li>Over-the-air (OTA) update strategies for deployed robots: image-based updates vs. package-based updates</li>
<li>Secrets management: never embed robot credentials in launch files; use environment injection</li>
<li>Pitfall: using <code>--symlink-install</code> in a Docker build image — always use a full build for reproducible artifacts</li>
</ul>`,
        keyPoints: ["The official `ros:<distro>` Docker images provide a reproducible base; pin to a specific image digest for production", "`ament_flake8` and `ament_cpplint` run as `colcon test` jobs \u2014 treat linting failures as blocking", "Build caching with `ccache` reduces C++ rebuild times from 10+ minutes to under 2 minutes in CI", "OTA updates for robots should be atomic and rollback-capable; image-based updates (A/B partition) are safer than package managers", "Never use `ROS_DOMAIN_ID=0` in CI; use a random or job-specific domain ID to prevent interference between parallel CI runners on the same host"],
        relatedTopics: [{"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}, {"level": "level4", "index": 1, "label": "Testing Strategies for ROS 2"}, {"level": "level2", "index": 2, "label": "Simulation with Gazebo"}, {"level": "level4", "index": 0, "label": "Security in ROS 2 (SROS2)"}],
        resources: [{"title": "https://hub.docker.com/_/ros", "url": "https://hub.docker.com/_/ros"}]
    },
    {
        title: "Performance Profiling and Optimization",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Identifying bottlenecks: CPU, memory, network bandwidth, and latency profiling in a ROS 2 system</li>
<li><code>ros2 topic bw</code> and <code>ros2 topic hz</code>: baseline measurement before optimization</li>
<li><code>tracetools_analysis</code>: kernel-level tracing of callback scheduling, DDS transport, and executor overhead using <code>lttng</code></li>
<li><code>perf</code>, <code>gprof</code>, <code>Valgrind</code>: profiling C++ node CPU usage</li>
<li>Callback scheduling analysis: identifying callbacks that block the executor</li>
<li>Message size optimization: using compressed image transport, decimation, ROI cropping</li>
<li>Intra-process communication: composable nodes to bypass serialization for large messages</li>
<li>Zero-copy transport: <code>rmw_iceoryx2</code> for shared-memory, zero-copy topic transfer between processes on the same host</li>
<li>Pitfall: premature optimization — always profile first; the bottleneck is rarely where you expect it</li>
</ul>`,
        keyPoints: ["`tracetools_analysis` with `lttng` provides the most detailed view of ROS 2 executor and DDS behavior \u2014 it is the correct tool for callback latency profiling", "Intra-process composable nodes eliminate serialization for `PointCloud2` and `Image` messages, typically saving 30\u2013200 ms per frame at HD resolution", "Zero-copy transport (`iceoryx2`) is only beneficial when passing messages larger than ~4 KB between processes on the same machine", "Profile your system at the actual deployment data rates; lab benchmarks at reduced rates hide production bottlenecks", "The executor thread model is the most common source of latency; switch to a multi-threaded executor before adding hardware"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}, {"level": "level3", "index": 6, "label": "Real-Time Computing in ROS 2"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}, {"level": "level3", "index": 4, "label": "Perception and Computer Vision Integration"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/How-To-Guides/ros2-tracing-trace-and-analyze.html", "url": "https://docs.ros.org/en/rolling/How-To-Guides/ros2-tracing-trace-and-analyze.html"}]
    },
    {
        title: "Robot Diagnostics and Health Monitoring",
        content: `
<h3>Lesson outline</h3>
<ul>
<li><code>diagnostic_msgs/DiagnosticArray</code> and <code>DiagnosticStatus</code>: the standard ROS 2 health reporting format</li>
<li>Status levels: <code>OK (0)</code>, <code>WARN (1)</code>, <code>ERROR (2)</code>, <code>STALE (3)</code></li>
<li><code>diagnostic_updater</code> library: <code>Updater</code>, <code>DiagnosticTask</code>, <code>FunctionDiagnosticTask</code></li>
<li><code>robot_monitor</code> (RQT plugin): visualizing diagnostic status hierarchy</li>
<li><code>diagnostic_aggregator</code>: grouping and summarizing diagnostics from multiple nodes into a hierarchy</li>
<li>Hardware watchdogs: detecting stale diagnostics with the <code>STALE</code> level when a node stops publishing</li>
<li>Publishing rate monitors: <code>TopicDiagnostic</code> / <code>FrequencyStatus</code> to verify sensor publishing rates</li>
<li>Integrating diagnostics with recovery behaviors: acting on <code>ERROR</code> status in a Behavior Tree</li>
<li>Pitfall: publishing diagnostics at too high a rate (&gt; 1 Hz) wastes bandwidth; the convention is 1 Hz for status, burst on state change</li>
</ul>`,
        keyPoints: ["Every hardware driver should publish a `DiagnosticStatus` reporting sensor health, communication errors, and firmware version", "`STALE` status means the diagnostic publisher has not updated within the expected window \u2014 use it as a watchdog", "`diagnostic_aggregator` is essential for multi-node systems; it provides a single `/diagnostics_agg` topic summarizing overall system health", "Integrating `/diagnostics_agg` ERROR states into a Behavior Tree condition node enables automatic fault-driven recovery", "The `diagnostic_updater` library handles the 1 Hz publish rate automatically; you only need to implement the `run()` method per task"],
        relatedTopics: [{"level": "level3", "index": 5, "label": "Behavior Trees for Robot Autonomy"}, {"level": "level2", "index": 6, "label": "Lifecycle Nodes and Managed Systems"}, {"level": "level1", "index": 2, "label": "Topics and the Publisher-Subscriber Pattern"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/p/diagnostic_updater/", "url": "https://docs.ros.org/en/rolling/p/diagnostic_updater/"}]
    },
    {
        title: "Capstone: Full Autonomous System Integration",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Capstone scope: integrate a perception-navigation-manipulation pipeline on a simulated mobile manipulator</li>
<li>System architecture review: drawing the full node graph with all topics, services, actions, and TF2 frames before coding</li>
<li>Subsystem checklist: URDF with all sensors, <code>ros2_control</code> hardware interface, SLAM, Nav2, MoveIt 2, perception pipeline, diagnostics, BT mission manager</li>
<li>Integration order: bottom-up (hardware → control → perception → navigation → planning → mission)</li>
<li>End-to-end test scenario: detect an object on a table, navigate to it, pick it up, navigate to a drop zone, place it</li>
<li>Failure mode analysis: identify at least 5 failure modes and implement recovery behaviors for each</li>
<li>Performance validation: end-to-end latency from object detection to arm motion start; navigation success rate over 50 trials</li>
<li>Security and deployment: SROS2 enclaves for all nodes, lifecycle-managed startup, CI/CD pipeline producing a deployable Docker image</li>
<li>Documentation: system-level architecture diagram, parameter reference, known limitations</li>
</ul>`,
        keyPoints: ["Always draw the full system architecture before writing any code \u2014 surprises found on paper cost hours; surprises found in code cost days", "Bottom-up integration surfaces hardware and interface issues before mission logic is in place", "50+ automated simulation trials is the minimum for a meaningful navigation success rate estimate", "Every subsystem should have diagnostics; the capstone BT should respond to every subsystem's health state", "A deployable Docker image that passes all `colcon test` jobs in CI is the definition of \"done\" for this course"],
        relatedTopics: [],
        resources: [{"title": "Nav2 end-to-end tutorial:", "url": "https://navigation.ros.org/tutorials/docs/navigation2_on_real_turtlebot3.html"}]
    }
]);
