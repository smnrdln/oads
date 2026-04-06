const roadmapData = {
    levels: [
        {
            id: 'level1',
            name: 'level.level1.name',
            topics: [
                { name: "ROS 2 Architecture and Core Philosophy", category: 'essential', completed: false },
                { name: "Nodes and the Computation Graph", category: 'robotics', completed: false },
                { name: "Topics and the Publisher-Subscriber Pattern", category: 'robotics', completed: false },
                { name: "Services and the Request-Response Pattern", category: 'robotics', completed: false },
                { name: "Actions and Long-Running Tasks", category: 'robotics', completed: false },
                { name: "Parameters and Dynamic Configuration", category: 'robotics', completed: false },
                { name: "Launch Files and System Startup", category: 'robotics', completed: false },
                { name: "ROS 2 Build System (colcon and ament)", category: 'embedded', completed: false }
            ]
        },
        {
            id: 'level2',
            name: 'level.level2.name',
            topics: [
                { name: "TF2: Coordinate Frames and Transforms", category: 'robotics', completed: false },
                { name: "URDF and Robot Description", category: 'robotics', completed: false },
                { name: "Simulation with Gazebo", category: 'embedded', completed: false },
                { name: "Sensor Integration (LiDAR, IMU, Camera)", category: 'embedded', completed: false },
                { name: "rosbag2: Recording and Replay", category: 'embedded', completed: false },
                { name: "QoS Policies and DDS Configuration", category: 'robotics', completed: false },
                { name: "Lifecycle Nodes and Managed Systems", category: 'embedded', completed: false },
                { name: "Custom Message and Interface Design", category: 'embedded', completed: false }
            ]
        },
        {
            id: 'level3',
            name: 'level.level3.name',
            topics: [
                { name: "SLAM: Simultaneous Localization and Mapping", category: 'robotics', completed: false },
                { name: "Navigation Stack (Nav2)", category: 'robotics', completed: false },
                { name: "Control Systems and ros2_control", category: 'robotics', completed: false },
                { name: "Motion Planning and MoveIt 2", category: 'robotics', completed: false },
                { name: "Perception and Computer Vision Integration", category: 'robotics', completed: false },
                { name: "Behavior Trees for Robot Autonomy", category: 'robotics', completed: false },
                { name: "Real-Time Computing in ROS 2", category: 'embedded', completed: false },
                { name: "Multi-Robot Systems and Namespacing", category: 'robotics', completed: false }
            ]
        },
        {
            id: 'level4',
            name: 'level.level4.name',
            topics: [
                { name: "Security in ROS 2 (SROS2)", category: 'essential', completed: false },
                { name: "Testing Strategies for ROS 2", category: 'essential', completed: false },
                { name: "CI/CD for Robotics Software", category: 'essential', completed: false },
                { name: "Performance Profiling and Optimization", category: 'robotics', completed: false },
                { name: "Robot Diagnostics and Health Monitoring", category: 'essential', completed: false },
                { name: "Capstone: Full Autonomous System Integration", category: 'essential', completed: false }
            ]
        },
    ]
};
