i18n.registerContent('en', 'level1', [
    {
        title: "ROS 2 Architecture and Core Philosophy",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What ROS 2 is and is not: middleware framework vs. operating system vs. full SDK[^1]</li>
<li>Why ROS 2 replaced ROS 1: production-readiness, DDS, real-time support, security[^3]</li>
<li>The three conceptual layers: filesystem (packages, workspaces), computation graph (nodes, topics, services, actions), and community (distributions, REPs)</li>
<li>Distributions and LTS policy: what a distribution freeze means for production work</li>
<li>Key design principles: modularity, language-agnosticism, decentralization (no ROS master), quality-of-service</li>
<li>Installing a distribution: environment sourcing, overlay vs. underlay workspaces</li>
<li>Pitfall: confusing ROS 1 <code>roscore</code>-centric model with ROS 2&#x27;s peer-to-peer DDS discovery</li>
</ul>`,
        keyPoints: ["ROS 2 has no central master; nodes discover each other via DDS", "A workspace overlay lets you override packages without touching the system install", "Each ROS 2 distribution targets specific DDS vendor defaults and RMW implementations", "`source /opt/ros/<distro>/setup.bash` must be run before any ROS 2 command in a new shell", "ROS 2 is production-ready; ROS 1 reached end-of-life in May 2025"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}, {"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}],
        resources: [{"title": "Official ROS 2 documentation:", "url": "https://docs.ros.org/en/rolling/"}, {"title": "ROS 2 Design rationale:", "url": "https://design.ros2.org/"}]
    },
    {
        title: "Nodes and the Computation Graph",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Definition: a node is a single process responsible for one logical task[^4]</li>
<li>Node naming: absolute (<code>/my_robot/camera</code>), relative, and private names</li>
<li><code>rclpy.Node</code> vs. <code>rclcpp::Node</code>: constructors, spin models, callbacks</li>
<li>The executor model: single-threaded, multi-threaded, and static single-threaded executors</li>
<li>Introspection tools: <code>ros2 node list</code>, <code>ros2 node info</code>, <code>rqt_graph</code></li>
<li>Composable nodes: running multiple nodes in a single process to reduce IPC overhead</li>
<li>Node graph namespacing and remapping at launch time</li>
<li>Pitfall: blocking calls inside callbacks starve the executor</li>
</ul>`,
        keyPoints: ["Each node should do one thing; small granularity enables reuse and testing", "Composable nodes share memory within a process while keeping the logical separation of single-process nodes", "Executor spin blocks the current thread; use timers or async patterns for periodic work", "Remapping lets you change topic/service names at runtime without recompiling", "`ros2 node info` reveals all publishers, subscribers, service servers/clients, and action servers on a node"],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Topics and the Publisher-Subscriber Pattern"}, {"level": "level1", "index": 3, "label": "Services and the Request-Response Pattern"}, {"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}, {"level": "level1", "index": 6, "label": "Launch Files and System Startup"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Nodes.html", "url": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Nodes.html"}]
    },
    {
        title: "Topics and the Publisher-Subscriber Pattern",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Publish-subscribe: asynchronous, many-to-many, decoupled communication</li>
<li>Topic names, message types, and the type system (<code>std_msgs</code>, <code>sensor_msgs</code>, <code>geometry_msgs</code>)</li>
<li>Creating a publisher: <code>create_publisher(MsgType, topic_name, qos_depth)</code></li>
<li>Creating a subscriber: <code>create_subscription(MsgType, topic_name, callback, qos_depth)</code></li>
<li>Message lifecycle: serialization, transport via DDS, deserialization</li>
<li>Introspection: <code>ros2 topic list</code>, <code>ros2 topic echo</code>, <code>ros2 topic hz</code>, <code>ros2 topic bw</code></li>
<li>QoS depth (queue size): effect on latency vs. memory; default &quot;keep last 10&quot;</li>
<li>Pitfall: mismatched QoS profiles between publisher and subscriber cause silent non-communication</li>
</ul>`,
        keyPoints: ["Topics are anonymous; the publisher does not know who subscribes", "`ros2 topic hz` measures actual publishing rate; use it to verify hardware drivers", "Message type versioning is enforced at compile time; topic name alone does not guarantee compatibility", "Queue depth buffers messages when the subscriber is slower than the publisher", "Always check `ros2 topic info -v` when a subscriber is not receiving data \u2014 QoS mismatch is the most common cause"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "ROS 2 Architecture and Core Philosophy"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}, {"level": "level2", "index": 4, "label": "rosbag2: Recording and Replay"}, {"level": "level2", "index": 7, "label": "Custom Message and Interface Design"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Topics.html", "url": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Topics.html"}, {"title": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-QoS-Settings.html", "url": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-QoS-Settings.html"}]
    },
    {
        title: "Services and the Request-Response Pattern",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Services vs. topics: synchronous request-reply vs. async publish-subscribe</li>
<li><code>.srv</code> interface files: <code>Request</code> and <code>Response</code> fields</li>
<li>Creating a service server: <code>create_service(SrvType, name, callback)</code></li>
<li>Creating a service client: <code>create_client(SrvType, name)</code>, <code>call_async</code>, <code>Future</code> objects</li>
<li>Blocking vs. non-blocking client calls; pitfall of calling <code>spin_until_future_complete</code> from within a callback</li>
<li>Introspection: <code>ros2 service list</code>, <code>ros2 service call</code>, <code>ros2 service type</code></li>
<li>Timeouts and retry logic for unreliable hardware services</li>
<li>When to use services vs. topics: state queries, discrete commands, one-shot operations</li>
</ul>`,
        keyPoints: ["Services are point-to-point and synchronous from the client's perspective; only one server per service name is allowed", "Never block inside a service callback (e.g., long computation) without using a separate thread or async executor", "`call_async` returns a `Future`; you must not call `spin_until_future_complete` from within the same executor's callback", "Services are best for operations that have a clear result and must complete before proceeding", "Always check `srv.wait_for_service(timeout_sec=...)` before calling to avoid hangs"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}, {"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}, {"level": "level2", "index": 7, "label": "Custom Message and Interface Design"}, {"level": "level2", "index": 6, "label": "Lifecycle Nodes and Managed Systems"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Services.html", "url": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Services.html"}]
    },
    {
        title: "Actions and Long-Running Tasks",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why actions exist: services time out; topics have no completion signal</li>
<li>Action anatomy: Goal, Feedback, and Result messages</li>
<li>The action state machine: <code>ACCEPTED</code>, <code>EXECUTING</code>, <code>CANCELING</code>, <code>SUCCEEDED</code>, <code>ABORTED</code>, <code>CANCELED</code></li>
<li>Creating an action server with <code>rclpy.action.ActionServer</code></li>
<li>Creating an action client with <code>rclpy.action.ActionClient</code>; <code>send_goal_async</code>, goal handle, feedback callback, result future</li>
<li>Preemption: canceling an in-progress goal</li>
<li>Introspection: <code>ros2 action list</code>, <code>ros2 action info</code>, <code>ros2 action send_goal</code></li>
<li>Pitfall: forgetting to return a <code>Result</code> object from the <code>execute_callback</code>; this hangs the client</li>
</ul>`,
        keyPoints: ["Actions are the right pattern for anything that takes more than a few hundred milliseconds and where a caller needs progress updates", "Feedback is optional but should carry meaningful progress (e.g., percent complete, current position)", "Always handle cancellation explicitly; robots must be stoppable mid-task", "The goal handle's `is_cancel_requested` flag must be polled inside your execute loop", "`ABORTED` means the server gave up; `CANCELED` means the client requested cancellation"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "Services and the Request-Response Pattern"}, {"level": "level3", "index": 5, "label": "Behavior Trees for Robot Autonomy"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html"}, {"title": "Nav2 action server examples:", "url": "https://navigation.ros.org/"}]
    },
    {
        title: "Parameters and Dynamic Configuration",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What parameters are: named, typed, node-scoped configuration values</li>
<li>Supported types: <code>bool</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>byte_array</code>, <code>bool_array</code>, <code>int_array</code>, <code>double_array</code>, <code>string_array</code></li>
<li>Declaring parameters: <code>declare_parameter(name, default_value, descriptor)</code> — must declare before use</li>
<li>Getting and setting: <code>get_parameter</code>, <code>set_parameters</code>, <code>set_parameters_atomically</code></li>
<li>Parameter callbacks: <code>add_on_set_parameters_callback</code> for validation and dynamic reconfiguration</li>
<li>Parameter files (YAML): loading at launch with <code>parameters</code> keyword in launch API</li>
<li><code>ros2 param list</code>, <code>ros2 param get</code>, <code>ros2 param set</code>, <code>ros2 param dump</code></li>
<li>Difference from environment variables: parameters are node-scoped, typed, introspectable, and live</li>
<li>Pitfall: parameters are not globally shared — each node has its own namespace</li>
</ul>`,
        keyPoints: ["Always declare parameters before use; undeclared parameters raise exceptions at runtime", "Use `ParameterDescriptor` to add description, range constraints, and read-only flags", "YAML parameter files are the standard way to configure nodes at deploy time", "Dynamic parameter callbacks allow runtime reconfiguration without restarting a node", "Parameters are per-node; two nodes with the same name in different namespaces have independent parameter stores"],
        relatedTopics: [{"level": "level1", "index": 6, "label": "Launch Files and System Startup"}, {"level": "level2", "index": 6, "label": "Lifecycle Nodes and Managed Systems"}, {"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Parameters.html", "url": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Parameters.html"}, {"title": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Using-Parameters-In-A-Class-Python.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Using-Parameters-In-A-Class-Python.html"}]
    },
    {
        title: "Launch Files and System Startup",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What launch files solve: coordinating multi-node startup with consistent configuration</li>
<li>Python launch API: <code>LaunchDescription</code>, <code>Node</code>, <code>IncludeLaunchDescription</code>, <code>ExecuteProcess</code></li>
<li>Key substitutions: <code>LaunchConfiguration</code>, <code>PathJoinSubstitution</code>, <code>FindPackageShare</code>, <code>EnvironmentVariable</code></li>
<li>Passing arguments: <code>DeclareLaunchArgument</code> + <code>LaunchConfiguration</code></li>
<li>Composable node containers in launch: <code>ComposableNodeContainer</code> + <code>ComposableNode</code></li>
<li>Conditional logic: <code>IfCondition</code>, <code>UnlessCondition</code></li>
<li>Remapping at launch: <code>remappings=[(&#x27;old_topic&#x27;, &#x27;new_topic&#x27;)]</code></li>
<li>Lifecycle node event handlers: <code>RegisterEventHandler</code>, <code>OnProcessExit</code>, <code>EmitEvent</code></li>
<li>Pitfall: relative paths in launch files that break when the working directory changes — always use <code>FindPackageShare</code></li>
</ul>`,
        keyPoints: ["Python launch files are code; use functions and loops to avoid repetition for multi-robot spawning", "`IncludeLaunchDescription` composes launch files without copying content", "`DeclareLaunchArgument` + `LaunchConfiguration` makes a launch file configurable without editing it", "Always use `FindPackageShare` or `get_package_share_directory` to locate installed package assets; never hard-code absolute paths", "`RegisterEventHandler` enables automatic recovery actions (e.g., restart a node when another exits)"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}, {"level": "level1", "index": 5, "label": "Parameters and Dynamic Configuration"}, {"level": "level2", "index": 6, "label": "Lifecycle Nodes and Managed Systems"}, {"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Launch/Launch-Main.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Launch/Launch-Main.html"}, {"title": "https://docs.ros.org/en/rolling/How-To-Guides/Launch-file-different-formats.html", "url": "https://docs.ros.org/en/rolling/How-To-Guides/Launch-file-different-formats.html"}]
    },
    {
        title: "ROS 2 Build System (colcon and ament)",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>The build toolchain: <code>colcon</code> as the build frontend, <code>ament_cmake</code> and <code>ament_python</code> as build backends</li>
<li>Package structure: <code>package.xml</code>, <code>CMakeLists.txt</code> (C++) or <code>setup.py</code>/<code>setup.cfg</code> (Python)</li>
<li><code>package.xml</code> manifest: <code>&lt;depend&gt;</code>, <code>&lt;exec_depend&gt;</code>, <code>&lt;build_depend&gt;</code>, <code>&lt;test_depend&gt;</code>, and format 3 conventions</li>
<li>Workspace layout: <code>src/</code>, <code>build/</code>, <code>install/</code>, <code>log/</code> directories</li>
<li>Key <code>colcon</code> commands: <code>colcon build</code>, <code>--packages-select</code>, <code>--symlink-install</code>, <code>colcon test</code>, <code>colcon graph</code></li>
<li>Overlays and underlays: sourcing order matters; overlay packages shadow underlay packages</li>
<li><code>ament_cmake</code> targets: <code>ament_target_dependencies</code>, <code>rosidl_generate_interfaces</code>, <code>install(TARGETS ...)</code></li>
<li>Pitfall: forgetting to <code>colcon build</code> after changing Python entry points or message definitions</li>
</ul>`,
        keyPoints: ["`--symlink-install` lets you edit Python scripts without rebuilding; do not use in production", "`colcon graph --dot` visualizes package dependencies \u2014 essential for debugging build order issues", "`package.xml` format 3 is the current standard; use `<depend>` for combined build + exec dependencies", "Always source `install/setup.bash` from your workspace root, not from individual packages", "Custom messages must be in a separate package from the nodes that use them to avoid circular build dependencies"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "ROS 2 Architecture and Core Philosophy"}, {"level": "level2", "index": 7, "label": "Custom Message and Interface Design"}, {"level": "level1", "index": 6, "label": "Launch Files and System Startup"}],
        resources: [{"title": "https://colcon.readthedocs.io/en/released/", "url": "https://colcon.readthedocs.io/en/released/"}, {"title": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html"}]
    }
]);
