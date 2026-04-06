i18n.registerContent('en', 'level2', [
    {
        title: "TF2: Coordinate Frames and Transforms",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why transforms matter: every sensor reading exists in a frame; navigation requires a common world frame</li>
<li>Frame hierarchy in a typical robot: <code>map</code> → <code>odom</code> → <code>base_link</code> → <code>base_footprint</code> → <code>sensor_frame</code></li>
<li>Static vs. dynamic transforms: <code>StaticTransformBroadcaster</code> vs. <code>TransformBroadcaster</code></li>
<li>The TF2 tree: rules — no cycles, one parent per frame, all frames ultimately connected</li>
<li>Listening for transforms: <code>Buffer</code>, <code>TransformListener</code>, <code>lookup_transform(target, source, time)</code></li>
<li>Time handling: using <code>rclpy.time.Time(0)</code> to get the latest available transform vs. a specific timestamp</li>
<li><code>tf2_ros</code> geometry helpers: <code>do_transform_point</code>, <code>do_transform_pose</code></li>
<li>Introspection: <code>ros2 run tf2_tools view_frames</code>, <code>ros2 run tf2_ros tf2_echo</code></li>
<li>Pitfall: looking up a transform before it has been broadcast causes <code>LookupException</code>; always use <code>try/except</code> or <code>can_transform</code></li>
</ul>`,
        keyPoints: ["`odom` \u2192 `base_link` is published by odometry (wheel encoders, IMU); it drifts over time", "`map` \u2192 `odom` is published by localization (AMCL, SLAM) to correct drift", "Every frame must have exactly one parent; multiple parents cause a TF2 tree cycle and crash localization", "Static transforms are broadcast once and latched; use them for fixed sensor mounts", "Always wrap `lookup_transform` in a try/except for `TransformException` in production code"],
        relatedTopics: [{"level": "level2", "index": 1, "label": "URDF and Robot Description"}, {"level": "level2", "index": 3, "label": "Sensor Integration (LiDAR, IMU, Camera)"}, {"level": "level3", "index": 0, "label": "SLAM: Simultaneous Localization and Mapping"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Tf2/Tf2-Main.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Tf2/Tf2-Main.html"}]
    },
    {
        title: "URDF and Robot Description",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What URDF is: XML-based kinematic and visual description of a robot</li>
<li>Key elements: <code>&lt;link&gt;</code> (inertial, visual, collision), <code>&lt;joint&gt;</code> (fixed, revolute, continuous, prismatic)</li>
<li>Inertial properties: mass, origin, inertia tensor $I$ — why they matter for simulation accuracy</li>
<li>XACRO macros: <code>xacro:macro</code>, <code>xacro:property</code>, <code>xacro:include</code> — reducing URDF boilerplate</li>
<li>Publishing the robot description: <code>robot_state_publisher</code> node; subscribes to <code>/joint_states</code>, publishes TF2</li>
<li><code>joint_state_publisher</code> and <code>joint_state_publisher_gui</code> for testing without hardware</li>
<li>Visualizing in RViz2: add <code>RobotModel</code> display, set fixed frame to <code>base_link</code></li>
<li>Collision geometry: use simplified meshes (boxes, cylinders) for performance; not visual meshes</li>
<li>Pitfall: wrong inertia values cause simulation instability (spinning, floating, exploding robots)</li>
</ul>`,
        keyPoints: ["`robot_state_publisher` bridges URDF joint angles to TF2 \u2014 it is a required node in almost every ROS 2 robot stack", "Always use XACRO instead of raw URDF for any robot with more than 2 joints", "Inertia tensor diagonal terms for a uniform box: $I_{xx} = \\frac{m(h^2+d^2)}{12}$, $I_{yy} = \\frac{m(w^2+d^2)}{12}$, $I_{zz} = \\frac{m(w^2+h^2)}{12}$", "Collision meshes should always be simpler than visual meshes to reduce physics computation", "Joint limits (`<limit effort velocity lower upper>`) are essential for safe simulation and planning"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level2", "index": 2, "label": "Simulation with Gazebo"}, {"level": "level3", "index": 3, "label": "Motion Planning and MoveIt 2"}, {"level": "level3", "index": 2, "label": "Control Systems and ros2_control"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/URDF/URDF-Main.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/URDF/URDF-Main.html"}, {"title": "https://wiki.ros.org/xacro", "url": "https://wiki.ros.org/xacro"}]
    },
    {
        title: "Simulation with Gazebo",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Gazebo vs. Gazebo Classic vs. Ignition/Gazebo Harmonic: naming history and current recommendation</li>
<li>World files (SDF): lights, physics engine settings, static objects, plugin loading</li>
<li>Spawning a robot from URDF/SDF: <code>gz_ros2_control</code> and <code>robot_state_publisher</code> integration</li>
<li>Sensor plugins: camera, LiDAR, IMU, GPS — publishing to ROS 2 topics</li>
<li>Physics parameters: step size (default 1 ms), real-time factor, <code>max_step_size</code></li>
<li><code>gz sim</code> CLI: headless mode (<code>-s</code>), GUI mode, pausing</li>
<li>Teleop in simulation: <code>teleop_twist_keyboard</code>, verifying odometry via <code>ros2 topic echo /odom</code></li>
<li>Bridge configuration for topic type mapping between Gazebo and ROS 2</li>
<li>Pitfall: real-time factor &lt; 1.0 means simulation is slower than real time — sensor timestamps will drift from wall clock</li>
</ul>`,
        keyPoints: ["Modern ROS 2 (Jazzy+) targets Gazebo Harmonic; \"Gazebo Classic\" (Gazebo 11) is legacy", "A real-time factor of 1.0 means simulation advances at the same rate as wall clock", "The physics step size controls accuracy vs. speed tradeoff: smaller = more accurate but slower", "Sensor plugins publish directly to ROS 2 topics via `ros_gz_bridge`; always verify QoS compatibility", "Headless simulation (`gz sim -s`) is ideal for CI/CD pipelines"],
        relatedTopics: [{"level": "level2", "index": 1, "label": "URDF and Robot Description"}, {"level": "level2", "index": 3, "label": "Sensor Integration (LiDAR, IMU, Camera)"}, {"level": "level3", "index": 0, "label": "SLAM: Simultaneous Localization and Mapping"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}],
        resources: [{"title": "https://gazebosim.org/docs/harmonic/ros2_integration", "url": "https://gazebosim.org/docs/harmonic/ros2_integration"}, {"title": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Simulators/Gazebo/Gazebo.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Simulators/Gazebo/Gazebo.html"}]
    },
    {
        title: "Sensor Integration (LiDAR, IMU, Camera)",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Sensor data pipeline: hardware → driver node → ROS 2 topic → processing node</li>
<li><code>sensor_msgs/LaserScan</code>: <code>ranges</code>, <code>angle_min</code>, <code>angle_max</code>, <code>angle_increment</code>, <code>range_min</code>, <code>range_max</code></li>
<li><code>sensor_msgs/PointCloud2</code>: structured binary layout, field extraction with <code>point_cloud2</code> helpers</li>
<li><code>sensor_msgs/Imu</code>: linear acceleration, angular velocity, orientation quaternion, covariance matrices</li>
<li><code>sensor_msgs/Image</code> and <code>sensor_msgs/CameraInfo</code>: encoding strings, distortion model, camera matrix $K$</li>
<li>Time synchronization: <code>message_filters</code> <code>ApproximateTimeSynchronizer</code> for multi-modal fusion</li>
<li>Camera intrinsic calibration: checkerboard method, <code>camera_calibration</code> package</li>
<li>Covariance matrices in sensor messages: what −1 in the first element means (unknown)</li>
<li>Pitfall: using <code>rclpy.time.Time()</code> (latest) vs. the message&#x27;s <code>header.stamp</code> — always use the message timestamp for reproducibility</li>
</ul>`,
        keyPoints: ["All sensor messages carry a `Header` with `frame_id` and `stamp`; always populate both correctly", "`ApproximateTimeSynchronizer` pairs messages within a time tolerance \u2014 essential for camera-IMU or LiDAR-camera fusion", "The camera matrix $K = \\begin{bmatrix} f_x & 0 & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}$ maps 3D camera coordinates to 2D pixel coordinates", "A covariance matrix diagonal value of \u22121 (first element) signals \"covariance unknown\" in `sensor_msgs`", "`LaserScan` uses polar coordinates; `PointCloud2` uses Cartesian \u2014 conversions are provided by `laser_geometry`"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level2", "index": 1, "label": "URDF and Robot Description"}, {"level": "level2", "index": 4, "label": "rosbag2: Recording and Replay"}, {"level": "level3", "index": 4, "label": "Perception and Computer Vision Integration"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/p/sensor_msgs/", "url": "https://docs.ros.org/en/rolling/p/sensor_msgs/"}]
    },
    {
        title: "rosbag2: Recording and Replay",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Purpose of rosbag2: record and replay ROS 2 topic traffic for debugging, testing, and dataset creation</li>
<li><code>ros2 bag record</code>: recording selected topics vs. all topics, rate limiting, compression</li>
<li><code>ros2 bag play</code>: playback speed factor (<code>--rate</code>), loop, start offset (<code>--start-offset</code>)</li>
<li><code>ros2 bag info</code>: metadata — message counts, duration, topic list, serialization format</li>
<li>Storage plugins: <code>sqlite3</code> (default), <code>mcap</code> (recommended for production; indexing, seek performance)</li>
<li>Filtering and conversion: <code>ros2 bag convert</code> with filter config for topic/time slicing</li>
<li>Using bags in automated tests: playback into a running test harness</li>
<li>Pitfall: recording at full rate on slow storage causes dropped messages — always check <code>ros2 bag info</code> for message count vs. expected count</li>
</ul>`,
        keyPoints: ["MCAP format supports fast random access and time-indexed seeking; prefer it over SQLite3 for large bags", "`--rate 0.5` plays back at half speed \u2014 useful for debugging timing issues", "Always record `tf_static` alongside sensor topics; static transforms are not continuously published", "Use topic filtering in `ros2 bag record -e` (regex) to avoid recording unwanted high-bandwidth topics", "`ros2 bag info` reports drop counts; any drops indicate storage or CPU bottleneck during recording"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Sensor Integration (LiDAR, IMU, Camera)"}, {"level": "level4", "index": 2, "label": "CI/CD for Robotics Software"}, {"level": "level1", "index": 2, "label": "Topics and the Publisher-Subscriber Pattern"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data.html"}, {"title": "https://mcap.dev/docs", "url": "https://mcap.dev/docs"}]
    },
    {
        title: "QoS Policies and DDS Configuration",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>What Quality of Service (QoS) controls: reliability, durability, deadline, lifespan, liveliness, history</li>
<li>Reliability: <code>RELIABLE</code> (guaranteed delivery with retransmission) vs. <code>BEST_EFFORT</code> (no retransmit — for sensor streams)</li>
<li>Durability: <code>VOLATILE</code> vs. <code>TRANSIENT_LOCAL</code> (latched — subscribers receive last message on connect)</li>
<li>History: <code>KEEP_LAST(N)</code> vs. <code>KEEP_ALL</code></li>
<li>Deadline, lifespan, liveliness: expressing temporal contracts between publisher and subscriber</li>
<li>QoS compatibility rules: publisher and subscriber must be compatible or data flow silently stops</li>
<li>Predefined QoS profiles: <code>qos_profile_sensor_data</code>, <code>qos_profile_system_default</code>, <code>qos_profile_services_default</code></li>
<li>Diagnosing mismatches: <code>ros2 topic info -v</code> shows offered vs. requested QoS</li>
<li>DDS vendor tuning: environment variables for discovery timeout, multicast config, transport protocol</li>
</ul>`,
        keyPoints: ["`RELIABLE` + `TRANSIENT_LOCAL` is the correct pair for configuration/map topics where late subscribers must receive the last value", "`BEST_EFFORT` + `VOLATILE` is correct for high-rate sensor data where losing an occasional message is acceptable", "QoS incompatibility is completely silent at runtime \u2014 always check `ros2 topic info -v` when data flow is missing", "The deadline QoS triggers a callback when a publisher misses its promised publication period \u2014 use for watchdog monitoring", "Different DDS vendors (CycloneDDS, FastDDS, Connext) have different default behaviors; set `RMW_IMPLEMENTATION` explicitly in production"],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Topics and the Publisher-Subscriber Pattern"}, {"level": "level1", "index": 0, "label": "ROS 2 Architecture and Core Philosophy"}, {"level": "level2", "index": 6, "label": "Lifecycle Nodes and Managed Systems"}, {"level": "level3", "index": 6, "label": "Real-Time Computing in ROS 2"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-QoS-Settings.html", "url": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-QoS-Settings.html"}, {"title": "https://docs.ros.org/en/rolling/How-To-Guides/DDS-tuning.html", "url": "https://docs.ros.org/en/rolling/How-To-Guides/DDS-tuning.html"}]
    },
    {
        title: "Lifecycle Nodes and Managed Systems",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Problem solved: unmanaged nodes start immediately, making coordinated multi-node startup fragile</li>
<li>The lifecycle state machine: <code>Unconfigured</code> → <code>Inactive</code> → <code>Active</code> → <code>Finalized</code> (+ error states)</li>
<li>Transition callbacks: <code>on_configure</code>, <code>on_activate</code>, <code>on_deactivate</code>, <code>on_cleanup</code>, <code>on_shutdown</code></li>
<li><code>rclcpp_lifecycle::LifecycleNode</code> (C++) and the Python equivalent</li>
<li>The lifecycle manager pattern: a supervisor node that drives transitions in dependency order</li>
<li><code>ros2 lifecycle list</code>, <code>ros2 lifecycle get</code>, <code>ros2 lifecycle set</code></li>
<li>Integration with launch: <code>EmitEvent</code> + <code>OnTransitionRequestedEvent</code> for automated startup sequences</li>
<li>When to use lifecycle nodes: hardware drivers, navigation plugins, sensor drivers</li>
<li>Pitfall: resource allocation in <code>on_configure</code> (open ports, allocate memory) — not in the constructor</li>
</ul>`,
        keyPoints: ["Lifecycle nodes decouple construction from activation \u2014 the robot can be configured offline and activated when ready", "`on_configure` should acquire resources (open files, connect to hardware); `on_activate` should start publishing/processing", "`on_deactivate` must stop all publishers and timers; `on_cleanup` must release all resources", "A transition to `ErrorProcessing` is triggered automatically if any callback throws an unhandled exception", "Nav2 uses lifecycle nodes throughout; its `lifecycle_manager` is the reference implementation"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}, {"level": "level1", "index": 6, "label": "Launch Files and System Startup"}, {"level": "level3", "index": 2, "label": "Control Systems and ros2_control"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Writing-A-Composable-Node.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Intermediate/Writing-A-Composable-Node.html"}, {"title": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Managed-Nodes.html", "url": "https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Managed-Nodes.html"}]
    },
    {
        title: "Custom Message and Interface Design",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>When to define custom interfaces: domain-specific data, combining primitives meaningfully</li>
<li><code>.msg</code> files: field types (primitives, arrays, other messages), field names, default values, constants</li>
<li><code>.srv</code> files: request/response separator <code>---</code></li>
<li><code>.action</code> files: goal/result/feedback separator <code>---</code> (two separators)</li>
<li><code>rosidl</code> pipeline: IDL → language-specific generated code</li>
<li><code>CMakeLists.txt</code> and <code>package.xml</code> configuration for interface packages</li>
<li>Backward compatibility rules: adding optional fields is safe; removing or renaming fields is breaking</li>
<li>Versioning strategy: package version vs. message field versioning</li>
<li>Pitfall: defining interfaces and using them in the same package — always separate into <code>*_msgs</code> packages</li>
</ul>`,
        keyPoints: ["Use `Header` (with `stamp` and `frame_id`) in any message that carries spatially or temporally referenced data", "Array types: fixed-size (`float64[^3]`) vs. dynamic (`float64[]`); fixed-size is more efficient", "Constants in `.msg` files serve as enumerations; use them instead of magic numbers in code", "After adding a message field, rebuild and re-source the workspace; IDEs cache stale generated code", "Namespacing: the package name becomes the message namespace (`my_robot_msgs/msg/MyMessage`)"],
        relatedTopics: [{"level": "level1", "index": 7, "label": "ROS 2 Build System (colcon and ament)"}, {"level": "level1", "index": 2, "label": "Topics and the Publisher-Subscriber Pattern"}, {"level": "level1", "index": 3, "label": "Services and the Request-Response Pattern"}, {"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Interfaces.html", "url": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Interfaces.html"}, {"title": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Custom-ROS2-Interfaces.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Custom-ROS2-Interfaces.html"}]
    }
]);
