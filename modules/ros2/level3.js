i18n.registerContent('en', 'level3', [
    {
        title: "SLAM: Simultaneous Localization and Mapping",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>The SLAM problem: estimating a map $m$ and robot pose $x_t$ simultaneously from observations $z_{1:t}$ and controls $u_{1:t}$</li>
<li>SLAM variants: offline (batch) vs. online (incremental); 2D LiDAR SLAM vs. 3D LiDAR SLAM vs. Visual SLAM</li>
<li>Graph-based SLAM: nodes are poses, edges are relative measurements; loop closure adds constraints</li>
<li>Loop closure detection: recognizing a previously visited place to correct accumulated drift</li>
<li>Popular ROS 2 SLAM packages: <code>slam_toolbox</code> (2D, lifelong mapping), <code>rtabmap_ros</code> (3D, RGB-D/LiDAR), <code>cartographer_ros</code></li>
<li><code>slam_toolbox</code> modes: online synchronous, online asynchronous, offline, localization-only</li>
<li>Required inputs: <code>/scan</code> (LaserScan), <code>/tf</code> (odom → base_link), <code>/odom</code> (optional but improves quality)</li>
<li>Saved maps: <code>map_saver_cli</code> produces <code>.pgm</code> + <code>.yaml</code> for Nav2</li>
<li>Pitfall: SLAM diverges if odometry is missing or has large jumps — always verify odometry quality before enabling SLAM</li>
</ul>`,
        keyPoints: ["SLAM provides the `map` \u2192 `odom` transform that corrects odometry drift over time", "Loop closure is the key mechanism that bounds long-term map error", "`slam_toolbox`'s localization-only mode re-uses a saved map \u2014 no new geometry is added, just pose updates", "The map quality directly determines navigation safety; save multiple maps during testing", "SLAM requires well-calibrated odometry and sensor-to-base transforms; fix TF2 issues first"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level2", "index": 3, "label": "Sensor Integration (LiDAR, IMU, Camera)"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}, {"level": "level3", "index": 4, "label": "Perception and Computer Vision Integration"}],
        resources: [{"title": "https://navigation.ros.org/tutorials/docs/navigation2_with_slam.html", "url": "https://navigation.ros.org/tutorials/docs/navigation2_with_slam.html"}]
    },
    {
        title: "Navigation Stack (Nav2)",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Nav2 architecture: server-client decomposition, lifecycle-managed nodes, plugin-based planners and controllers</li>
<li>Core servers: <code>bt_navigator</code>, <code>planner_server</code>, <code>controller_server</code>, <code>smoother_server</code>, <code>waypoint_follower</code>, <code>behavior_server</code></li>
<li>Global planner plugins: <code>NavFn</code> (Dijkstra/A\*), <code>Smac Planner</code> (Hybrid-A\*, State Lattice)</li>
<li>Local controller plugins: <code>DWB</code> (Dynamic Window Approach), <code>RPP</code> (Regulated Pure Pursuit), <code>MPPI</code></li>
<li>Cost maps: <code>global_costmap</code> and <code>local_costmap</code>; layers: static, inflation, obstacle, voxel</li>
<li>Behavior tree navigator: default <code>navigate_to_pose_bt.xml</code>; how to read and extend BT XML</li>
<li>Sending navigation goals: <code>NavigateToPose</code> action, <code>NavigateThroughPoses</code> action</li>
<li>Recovery behaviors: <code>spin</code>, <code>back_up</code>, <code>wait</code>, <code>clear_costmap</code></li>
<li>Pitfall: inflation radius must be ≥ robot radius; under-inflation causes wall-grazing collisions</li>
</ul>`,
        keyPoints: ["Nav2's inflation layer pads obstacles by the robot's circumscribed radius plus a safety margin; set it correctly or the robot will scrape walls", "`DWB` is suitable for differential-drive robots; `RPP` is simpler and faster for known, smooth paths; `MPPI` handles complex dynamics", "The Behavior Tree navigator is fully customizable; most production deployments replace the default BT", "Nav2 requires: `map` \u2192 `odom` (from SLAM/localization), `odom` \u2192 `base_link` (from odometry), and a `base_footprint` frame", "Always tune the `controller_server` `max_vel_x` and `max_vel_theta` to match actual hardware limits"],
        relatedTopics: [{"level": "level3", "index": 0, "label": "SLAM: Simultaneous Localization and Mapping"}, {"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}, {"level": "level3", "index": 5, "label": "Behavior Trees for Robot Autonomy"}],
        resources: [{"title": "https://navigation.ros.org/", "url": "https://navigation.ros.org/"}, {"title": "https://navigation.ros.org/configuration/packages/configuring-costmaps.html", "url": "https://navigation.ros.org/configuration/packages/configuring-costmaps.html"}]
    },
    {
        title: "Control Systems and ros2_control",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why <code>ros2_control</code> exists: standardized hardware abstraction for controllers and actuators</li>
<li>Core components: <code>controller_manager</code>, <code>hardware_interface</code>, <code>resource_manager</code></li>
<li>Hardware interface types: <code>StateInterface</code> (read) and <code>CommandInterface</code> (write)</li>
<li>Controller types: <code>diff_drive_controller</code>, <code>joint_trajectory_controller</code>, <code>joint_state_broadcaster</code>, <code>velocity_controllers</code></li>
<li>The <code>ros2_control</code> URDF tag: <code>&lt;ros2_control&gt;</code> element with <code>&lt;hardware&gt;</code> and <code>&lt;joint&gt;</code> children</li>
<li>Real-time control loop: <code>update()</code> runs at fixed rate (e.g., 1000 Hz); no heap allocation, no logging in the loop</li>
<li><code>controller_manager</code> services: <code>load_controller</code>, <code>configure_controller</code>, <code>switch_controller</code></li>
<li>Gazebo integration: <code>gz_ros2_control</code> plugin replaces simulated hardware interface</li>
<li>Pitfall: mixing controller interfaces — <code>velocity_controllers</code> and <code>position_controllers</code> cannot both claim the same joint command interface simultaneously</li>
</ul>`,
        keyPoints: ["`joint_state_broadcaster` is always required; it reads from all `StateInterfaces` and publishes `/joint_states`", "The real-time control loop must never block; use lock-free data structures for state sharing between RT and non-RT threads", "Controller switching is atomic: `switch_controller` can start and stop controllers in one call", "Hardware plugins abstract physical drivers; the same controller code runs in simulation and on real hardware", "`ros2_control` completely replaces the old `ros_control` / `controller_manager` from ROS 1"],
        relatedTopics: [{"level": "level2", "index": 1, "label": "URDF and Robot Description"}, {"level": "level2", "index": 2, "label": "Simulation with Gazebo"}, {"level": "level3", "index": 6, "label": "Real-Time Computing in ROS 2"}, {"level": "level3", "index": 3, "label": "Motion Planning and MoveIt 2"}],
        resources: [{"title": "https://control.ros.org/rolling/index.html", "url": "https://control.ros.org/rolling/index.html"}, {"title": "https://control.ros.org/rolling/doc/ros2_control/hardware_interface/doc/writing_new_hardware_component.html", "url": "https://control.ros.org/rolling/doc/ros2_control/hardware_interface/doc/writing_new_hardware_component.html"}]
    },
    {
        title: "Motion Planning and MoveIt 2",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>MoveIt 2 architecture: <code>move_group</code> node, planning pipeline, kinematics plugin, collision checker</li>
<li>Planning scene: the world model for collision avoidance — meshes, primitives, attached objects</li>
<li>Kinematics: inverse kinematics (IK) via <code>KDL</code>, <code>TRAC-IK</code>, or <code>bio_ik</code> plugins</li>
<li>Planning algorithms: OMPL sampling-based planners (RRT, RRT\*, PRM), STOMP, PILZ Industrial Motion Planner</li>
<li>Constraints: joint, position, orientation, visibility, and custom constraints</li>
<li>MoveIt 2 Python and C++ APIs: <code>MoveGroupInterface</code>, <code>PlanningSceneInterface</code></li>
<li>Grasp planning and end-effector configuration</li>
<li>Collision objects: <code>add_box</code>, <code>add_mesh</code>, <code>attach_object</code></li>
<li>Pitfall: IK solutions can be non-deterministic; always validate joint limits and check for collisions before execution</li>
</ul>`,
        keyPoints: ["The planning scene must be kept synchronized with the real world; stale collision objects cause phantom failures or real collisions", "OMPL planners are probabilistically complete but not optimal (unless using RRT\\*); add a path smoother post-planning", "PILZ Industrial Motion Planner generates deterministic motions (LIN, PTP, CIRC) \u2014 essential for certified industrial applications", "`execute()` is asynchronous; always monitor the action result and handle `ABORTED` states", "Always set `max_velocity_scaling_factor` and `max_acceleration_scaling_factor` conservatively for first runs"],
        relatedTopics: [{"level": "level2", "index": 1, "label": "URDF and Robot Description"}, {"level": "level3", "index": 2, "label": "Control Systems and ros2_control"}, {"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}],
        resources: [{"title": "https://moveit.picknik.ai/main/index.html", "url": "https://moveit.picknik.ai/main/index.html"}, {"title": "Planning Algorithms* \u2014 LaValle (free online):", "url": "http://lavalle.pl/planning/"}]
    },
    {
        title: "Perception and Computer Vision Integration",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Perception pipeline pattern: raw sensor → preprocessing → detection/segmentation → semantic output topic</li>
<li><code>image_transport</code>: abstracted image publishing supporting raw, compressed, and <code>theora</code> transport plugins</li>
<li><code>cv_bridge</code>: converting between <code>sensor_msgs/Image</code> and <code>cv::Mat</code> / NumPy arrays</li>
<li>Point cloud processing: <code>pcl_ros</code> for filtering, segmentation, normal estimation</li>
<li>Object detection integration: publishing detections as custom messages or <code>vision_msgs/Detection2DArray</code></li>
<li>Depth-to-point-cloud: <code>depth_image_proc</code> nodelet/composable node pipeline</li>
<li>Semantic segmentation output: <code>vision_msgs/Detection2DArray</code>, <code>vision_msgs/Detection3DArray</code></li>
<li>Camera-LiDAR extrinsic calibration: why it matters and how to validate with checkerboard targets</li>
<li>Pitfall: forgetting <code>image_transport</code> remapping when using compressed transport — subscribers must request the correct transport</li>
</ul>`,
        keyPoints: ["Always use `image_transport` publishers/subscribers, not raw topic publishers, to support compressed transport transparently", "`cv_bridge.imgmsg_to_cv2(msg, \"bgr8\")` converts ROS image messages; always specify the desired encoding", "`vision_msgs` provides a standard taxonomy for 2D/3D detections, classifications, and tracks \u2014 prefer it over custom messages", "Point cloud processing in a ROS 2 node should use composable nodes with intra-process communication to avoid serializing large `PointCloud2` messages", "Camera-LiDAR extrinsic calibration error of >1 cm can cause incorrect 3D detections at 5 m range"],
        relatedTopics: [{"level": "level2", "index": 3, "label": "Sensor Integration (LiDAR, IMU, Camera)"}, {"level": "level3", "index": 0, "label": "SLAM: Simultaneous Localization and Mapping"}, {"level": "level2", "index": 7, "label": "Custom Message and Interface Design"}, {"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/p/vision_msgs/", "url": "https://docs.ros.org/en/rolling/p/vision_msgs/"}]
    },
    {
        title: "Behavior Trees for Robot Autonomy",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Why Behavior Trees (BTs): more modular and reactive than FSMs; more predictable than neural planners</li>
<li>BT anatomy: root, control flow nodes (Sequence, Fallback/Selector, Parallel), decorator nodes, leaf nodes (Action, Condition)</li>
<li>Tick mechanism: the tree is ticked at a fixed rate; each node returns <code>SUCCESS</code>, <code>FAILURE</code>, or <code>RUNNING</code></li>
<li><code>BehaviorTree.CPP</code> v4: the library underlying Nav2&#x27;s BT navigator</li>
<li><code>BT::ActionNodeBase</code> and <code>BT::ConditionNode</code>: creating custom nodes that wrap ROS 2 actions/services</li>
<li>Blackboard: shared typed key-value store for inter-node data passing</li>
<li>XML BT format: node registration, port definitions, tree structure</li>
<li>Reactive vs. one-shot trees: <code>ReactiveFallback</code> enables preemption mid-action</li>
<li>Pitfall: long-running action nodes must return <code>RUNNING</code> on each tick while executing — never block the tick thread</li>
</ul>`,
        keyPoints: ["A `Sequence` node ticks children left to right and returns `FAILURE` on the first child failure \u2014 models \"do A, then B, then C\"", "A `Fallback` ticks children left to right and returns `SUCCESS` on the first child success \u2014 models \"try A; if fail, try B\"", "`ReactiveFallback` re-evaluates its first child (usually a `Condition`) on every tick, enabling preemption", "The Blackboard decouples BT nodes from each other; always use typed port definitions for safety", "Nav2's BT navigator XML files are the best real-world reference for production BT design"],
        relatedTopics: [{"level": "level1", "index": 4, "label": "Actions and Long-Running Tasks"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}, {"level": "level1", "index": 3, "label": "Services and the Request-Response Pattern"}],
        resources: [{"title": "https://www.behaviortree.dev/docs/intro", "url": "https://www.behaviortree.dev/docs/intro"}, {"title": "https://navigation.ros.org/tutorials/docs/using_groot.html", "url": "https://navigation.ros.org/tutorials/docs/using_groot.html"}]
    },
    {
        title: "Real-Time Computing in ROS 2",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>Real-time vs. best-effort: determinism and bounded worst-case execution time (WCET), not just low average latency</li>
<li>Linux real-time kernels: <code>PREEMPT_RT</code> patch; priority inversion; priority inheritance mutexes</li>
<li><code>SCHED_FIFO</code> and <code>SCHED_RR</code> scheduling policies; setting thread priorities with <code>pthread_setschedparam</code></li>
<li>Memory: <code>mlockall(MCL_CURRENT | MCL_FUTURE)</code> prevents page faults in RT threads; pre-fault stack pages</li>
<li>Lock-free data structures: why mutexes are dangerous in RT threads; <code>std::atomic</code>, lock-free ring buffers</li>
<li><code>rclcpp</code> real-time executor: <code>StaticSingleThreadedExecutor</code> and RT-safe callback groups</li>
<li>DDS transport in RT context: <code>RMW_IMPLEMENTATION=rmw_cyclonedds_cpp</code> is commonly used for RT workloads</li>
<li>Measuring latency: <code>cyclictest</code> for kernel jitter; custom timing probes in <code>update()</code> loops</li>
<li>Pitfall: calling <code>malloc</code> / <code>new</code> inside a RT callback; heap allocation is non-deterministic</li>
</ul>`,
        keyPoints: ["A real-time system guarantees an upper bound on response time \u2014 it is about worst-case, not average performance", "`PREEMPT_RT` reduces Linux kernel latency from milliseconds to tens of microseconds", "Never allocate heap memory, print to stdout, or call any blocking system call from inside an RT callback", "Pre-allocate all message buffers and data structures before entering the RT loop", "`ros2_control`'s `update()` loop is designed for RT use; custom RT nodes must follow the same discipline"],
        relatedTopics: [{"level": "level3", "index": 2, "label": "Control Systems and ros2_control"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}, {"level": "level1", "index": 1, "label": "Nodes and the Computation Graph"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Advanced/ROS2-with-realtime-computing.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/ROS2-with-realtime-computing.html"}]
    },
    {
        title: "Multi-Robot Systems and Namespacing",
        content: `
<h3>Lesson outline</h3>
<ul>
<li>The namespacing problem: multiple robots on the same ROS 2 graph will have colliding topic names without isolation</li>
<li>Node namespacing: <code>/robot_1/camera_node</code> vs. <code>/camera_node</code></li>
<li><code>ROS_DOMAIN_ID</code>: using separate domain IDs to fully isolate robot fleets at the DDS layer</li>
<li>Launch-time namespace injection: <code>namespace</code> argument in <code>Node</code> action; <code>PushRosNamespace</code> context</li>
<li>Multi-robot TF2: prefixing all frame IDs with robot namespace (e.g., <code>robot_1/base_link</code>)</li>
<li>Fleet coordination patterns: centralized coordinator node vs. peer-to-peer negotiation</li>
<li><code>unique_id</code> generation for multi-robot task assignment</li>
<li>Bandwidth management: using domain bridges or selective topic bridging between isolated domains</li>
<li>Pitfall: TF2 does not automatically prefix frame IDs with the node namespace — you must do this manually in the URDF/launch configuration</li>
</ul>`,
        keyPoints: ["`ROS_DOMAIN_ID` ranges from 0 to 101 (limited by DDS multicast group ranges); reserve one per robot group", "Full namespace isolation requires: node namespace, topic namespace, TF2 frame prefix, and parameter namespace \u2014 all four", "The `ros2_domain_bridge` package selectively forwards topics across domain IDs without full exposure", "Fleet coordination at scale typically uses an external task planner that sends `NavigateToPose` goals to individual robots' namespaced action servers", "Test multi-robot setups with at least 3 robots to expose race conditions in coordination logic"],
        relatedTopics: [{"level": "level2", "index": 0, "label": "TF2: Coordinate Frames and Transforms"}, {"level": "level1", "index": 6, "label": "Launch Files and System Startup"}, {"level": "level3", "index": 1, "label": "Navigation Stack (Nav2)"}, {"level": "level2", "index": 5, "label": "QoS Policies and DDS Configuration"}],
        resources: [{"title": "https://docs.ros.org/en/rolling/Tutorials/Advanced/tf2/Introduction-To-Tf2.html", "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/tf2/Introduction-To-Tf2.html"}]
    }
]);
