i18n.registerContent('en', 'level1', [
    {
        title: 'Anatomy of a Robot',
        content: `
            <h3>🤖 Subsystems</h3>
            <p>Most robots combine <strong>mechanisms</strong> (links, joints), <strong>actuation</strong> (motors, gearboxes), <strong>sensing</strong> (encoders, cameras, IMU), <strong>compute</strong> (MCU to GPU), and <strong>software</strong> (drivers, planners, safety).</p>
            <h3>Degrees of freedom (DOF)</h3>
            <p>Each independent motion axis is one DOF. A fixed base arm with 6 revolute joints has 6 DOF; a mobile manipulator adds base DOF (e.g. 3 for planar pose).</p>
            <h3>Serial vs. parallel</h3>
            <ul>
                <li><strong>Serial chain:</strong> joints in sequence (typical industrial arm).</li>
                <li><strong>Parallel:</strong> multiple chains to one platform (Stewart platform, delta pickers) — high stiffness, complex kinematics.</li>
            </ul>
            <h3>End-effector &amp; workspace</h3>
            <p>The <strong>end-effector</strong> (gripper, tool) interacts with the world. Its <strong>workspace</strong> is the set of reachable poses, limited by link lengths and joint limits.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=industrial+robot+arm+6+axis+diagram+labeled&udm=2')">🔍 Industrial arm</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=delta+robot+parallel+manipulator+diagram&udm=2')">📷 Delta / parallel</button>
            </div>`,
        keyPoints: ['Name the five pillars: mechanism, actuation, sensing, compute, software', 'Distinguish serial and parallel kinematic structures', 'Workspace is limited by geometry and joint limits—not every pose is reachable'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Sensors and Transducers' }, { level: 'level1', index: 4, label: 'Actuators and Drive Systems' }, { level: 'level4', index: 3, label: 'Capstone — Full Autonomous Robot System Design' }],
        resources: [{ title: 'Modern Robotics — overview', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'ROS 2 docs', url: 'https://docs.ros.org/' }]
    },
    {
        title: 'Linear Algebra for Robotics',
        content: `
            <h3>Vectors &amp; frames</h3>
            <p>Positions and directions are <strong>vectors</strong> expressed in a chosen <strong>reference frame</strong>. Always state the frame: <em>v</em> in frame {A}.</p>
            <h3>Rotation matrices</h3>
            <p>A 3×3 rotation <strong>R</strong> is orthonormal: <strong>R</strong>ᵀ<strong>R</strong> = <strong>I</strong>, det(<strong>R</strong>) = +1. It maps coordinates from one frame to another.</p>
            <h3>Homogeneous transforms</h3>
            <p>A 4×4 matrix <strong>T</strong> = [<strong>R</strong> | <strong>p</strong>; 0 0 0 | 1] combines rotation <strong>R</strong> and translation <strong>p</strong>. It lets you chain transforms with matrix multiply.</p>
            <h3>Cross product</h3>
            <p><strong>a</strong> × <strong>b</strong> appears in moment arms, torques, and angular velocity—essential for 3D kinematics.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=rotation+matrix+3D+coordinate+frame+robotics&udm=2')">🔍 Rotation frames</button>
            </div>`,
        keyPoints: ['Track which frame every vector is expressed in', 'Use 4×4 homogeneous transforms to compose rigid motions', 'Cross products encode moments and rotational effects in 3D'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Coordinate Frames and Rigid Body Transformations' }, { level: 'level2', index: 0, label: 'Forward Kinematics' }],
        resources: [{ title: 'Barfoot — State Estimation (linear algebra primer)', url: 'https://www.cambridge.org/core/books/state-estimation-for-robotics/' }]
    },
    {
        title: 'Probability and Statistics for Robotics',
        content: `
            <h3>Why probability?</h3>
            <p>Sensors are noisy, models are wrong, and environments vary. Robotics treats <strong>belief</strong> over states (distributions), not single “true” values.</p>
            <h3>Gaussian models</h3>
            <p>Many filters (Kalman family) assume <strong>Gaussian</strong> noise: mean + covariance. They are tractable but wrong for multi-modal uncertainty.</p>
            <h3>Expectation &amp; variance</h3>
            <p>Understanding variance helps you set <strong>Q</strong> (process) and <strong>R</strong> (measurement) noise in estimators and interpret confidence.</p>
            <h3>Law of large numbers</h3>
            <p>Averaging many noisy samples reduces variance—used in sensor fusion and Monte Carlo methods.</p>`,
        keyPoints: ['Represent uncertainty explicitly; do not trust raw sensor values blindly', 'Gaussian models simplify filtering but can misrepresent ambiguity', 'Covariance tuning (Q, R) directly affects filter behavior'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'State Estimation and Kalman Filtering' }, { level: 'level1', index: 3, label: 'Sensors and Transducers' }],
        resources: [{ title: 'Probabilistic Robotics (Thrun, Burgard, Fox)', url: 'https://www.probabilistic-robotics.org/' }]
    },
    {
        title: 'Sensors and Transducers',
        content: `
            <h3>Proprioceptive vs. exteroceptive</h3>
            <ul>
                <li><strong>Proprioceptive:</strong> joint encoders, motor current, IMU (body state).</li>
                <li><strong>Exteroceptive:</strong> cameras, LiDAR, sonar, force/torque (world interaction).</li>
            </ul>
            <h3>IMU</h3>
            <p>Accelerometers + gyroscopes (+ magnetometer). Gyro integrates to orientation but <strong>drifts</strong>; accelerometers sense gravity and linear acceleration (hard to separate without fusion).</p>
            <h3>Encoders</h3>
            <p>Incremental vs. absolute; resolution (counts/rev) and calibration offset matter for odometry.</p>
            <h3>LiDAR &amp; cameras</h3>
            <p>LiDAR gives range geometry; cameras give appearance. Both need calibration and suffer from noise, occlusion, and dynamic scenes.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=robot+sensor+types+lidar+camera+imu+diagram&udm=2')">🔍 Sensor suite</button>
            </div>`,
        keyPoints: ['Match sensor class to the quantity you need (pose, force, appearance)', 'IMU biases and drift require fusion with absolute references', 'Every sensor needs a noise model for serious estimation'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'State Estimation and Kalman Filtering' }, { level: 'level3', index: 2, label: 'Robot Perception and Computer Vision' }],
        resources: [{ title: 'OpenCV tutorials', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Actuators and Drive Systems',
        content: `
            <h3>Electric motors</h3>
            <p><strong>DC brushed / brushless:</strong> common for wheels and arms. <strong>Steppers:</strong> open-loop friendly but can skip steps under load.</p>
            <h3>Gearboxes</h3>
            <p>Trade speed for torque; introduce <strong>backlash</strong> and friction—model them for precision tasks.</p>
            <h3>Motor control</h3>
            <p>Current/torque inner loops, velocity middle, position outer—similar spirit to cascade PID. Field-oriented control (FOC) for BLDC.</p>
            <h3>Pneumatics &amp; hydraulics</h3>
            <p>High force, compliance possible; nonlinear dynamics and maintenance differ from electric drives.</p>`,
        keyPoints: ['Know your actuator’s torque/speed envelope and thermal limits', 'Gear backlash limits precision—compensate in software or mechanically', 'Cascade loops mirror good joint control architecture'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Robot Dynamics' }, { level: 'level2', index: 4, label: 'Feedback Control and PID' }],
        resources: [{ title: 'Modern Robotics — Mechanisms &amp; Actuation', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Embedded Computing and Robot Programming Basics',
        content: `
            <h3>Real time</h3>
            <p><strong>Hard real-time</strong> deadlines must never be missed (safety, motor control). <strong>Soft real-time</strong> tolerates occasional overruns (vision).</p>
            <h3>ROS 2 mental model</h3>
            <p><strong>Nodes</strong> communicate via <strong>topics</strong> (streams), <strong>services</strong> (RPC), and <strong>actions</strong> (long tasks). Use appropriate QoS for sensors vs. control.</p>
            <h3>Coordinate frames in software</h3>
            <p>tf / tf2 (ROS) maintains a tree of transforms—must stay consistent with your math (see Coordinate Frames lesson).</p>
            <h3>Logging &amp; replay</h3>
            <p>Record sensor bags for offline debug—essential when hardware is scarce.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ROS2+node+topic+diagram&udm=2')">🔍 ROS 2 graph</button>
            </div>`,
        keyPoints: ['Separate high-rate control from slower perception pipelines', 'Use a transform tree that matches your physical robot frames', 'Log data for reproducible debugging'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Coordinate Frames and Rigid Body Transformations' }, { level: 'level4', index: 2, label: 'Autonomous System Integration and Safety' }],
        resources: [{ title: 'ROS 2 Documentation', url: 'https://docs.ros.org/en/humble/' }]
    },
    {
        title: 'Coordinate Frames and Rigid Body Transformations',
        content: `
            <h3>Frames &amp; naming</h3>
            <p>Attach a <strong>frame</strong> to each rigid part. Common names: <code>base_link</code>, <code>tool0</code>, <code>camera_optical</code>. Know parent/child directions.</p>
            <h3>Composing transforms</h3>
            <p>If <strong>T</strong><sub>A→B</sub> maps points from B to A, a chain from base to camera is: <strong>p</strong><sub>base</sub> = <strong>T</strong><sub>base→wrist</sub> <strong>T</strong><sub>wrist→cam</sub> <strong>p</strong><sub>cam</sub> (homogeneous 4-vector).</p>
            <h3>Inverse</h3>
            <p>For rigid transforms: <strong>T</strong>⁻¹ = [<strong>R</strong>ᵀ | −<strong>R</strong>ᵀ<strong>p</strong>; 0 0 0 | 1].</p>
            <h3>Common pitfall</h3>
            <p>Multiplying in the wrong order or mixing frames—draw the graph and label directions.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=robot+coordinate+frames+URDF+base+tool+diagram&udm=2')">🔍 Frame tree</button>
            </div>`,
        keyPoints: ['Homogeneous 4×4 matrices compose rigid motions by multiplication', 'Inverse transform swaps direction and uses Rᵀ for rotation', 'Wrong frame order is the #1 bug in perception–control integration'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Forward Kinematics' }, { level: 'level3', index: 2, label: 'Robot Perception and Computer Vision' }],
        resources: [{ title: 'Modern Robotics — Rigid-body motion', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'Murray, Li, Sastry — MLS wiki', url: 'https://www.cds.caltech.edu/~murray/mlswiki/' }]
    }
]);
