i18n.registerContent('en', 'level3', [
    {
        title: 'State Estimation and Kalman Filtering',
        content: `
            <h3>Bayesian filtering</h3>
            <p>Maintain a <strong>belief</strong> over state; <strong>predict</strong> with motion model, <strong>update</strong> with measurements.</p>
            <h3>Linear Kalman filter</h3>
            <p>Gaussian belief: predict <strong>x̂</strong>⁻, <strong>P</strong>⁻; then Kalman gain <strong>K</strong> = <strong>P</strong>⁻<strong>H</strong>ᵀ(<strong>H</strong><strong>P</strong>⁻<strong>H</strong>ᵀ + <strong>R</strong>)⁻¹ blends model vs. sensor.</p>
            <h3>EKF / UKF</h3>
            <p><strong>EKF</strong> linearizes nonlinear <em>f</em>, <em>h</em> at the estimate; can diverge if nonlinearities are harsh. <strong>UKF</strong> propagates sigma points.</p>
            <h3>Multi-rate fusion</h3>
            <p>High-rate IMU prediction + low-rate LiDAR/vision updates is standard for smooth pose.</p>
            <h3>Observability</h3>
            <p>If the state is not observable from sensors, no filter fixes it—fix the sensor suite or model.</p>`,
        keyPoints: ['Large R means trust the prediction more (noisy sensor)', 'Tune Q and R—they encode your model and sensor trust', 'Multi-rate EKF is the workhorse for robot localization'],
        relatedTopics: [{ level: 'level2', index: 5, label: 'Mobile Robot Kinematics and Odometry' }, { level: 'level3', index: 1, label: 'Simultaneous Localization and Mapping' }, { level: 'level1', index: 3, label: 'Sensors and Transducers' }],
        resources: [{ title: 'Barfoot — State Estimation for Robotics', url: 'https://www.cambridge.org/core/books/state-estimation-for-robotics/' }, { title: 'Probabilistic Robotics', url: 'https://www.probabilistic-robotics.org/' }]
    },
    {
        title: 'Simultaneous Localization and Mapping',
        content: `
            <h3>Problem</h3>
            <p>Build a map and localize in it simultaneously—errors in one corrupt the other.</p>
            <h3>EKF-SLAM</h3>
            <p>Augmented state (pose + landmarks); cost grows ~<em>O</em>(<em>n</em>²)—impractical at large <em>n</em>.</p>
            <h3>Graph SLAM</h3>
            <p>Nodes = poses; edges = relative measurements; solve sparse nonlinear least squares (g²o, GTSAM, Ceres).</p>
            <h3>Loop closure</h3>
            <p>Recognizing revisits adds constraints that <strong>bound drift</strong>—critical for large environments.</p>
            <h3>Occupancy grids</h3>
            <p>Discretize space; log-odds updates fuse range measurements into free/occupied belief.</p>
            <h3>False closures</h3>
            <p>One bad loop edge can warp the map—robust front-ends matter.</p>`,
        keyPoints: ['Graph SLAM is the modern default for many mobile robots', 'Without loop closure, drift is unbounded', 'Validate data association before trusting closures'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'State Estimation and Kalman Filtering' }, { level: 'level3', index: 3, label: 'Path Planning for Mobile Robots' }, { level: 'level3', index: 2, label: 'Robot Perception and Computer Vision' }],
        resources: [{ title: 'Probabilistic Robotics Ch. 10–11', url: 'https://www.probabilistic-robotics.org/' }]
    },
    {
        title: 'Robot Perception and Computer Vision',
        content: `
            <h3>Pipeline</h3>
            <p>Raw data → features → objects → scene understanding; may include learning at each stage.</p>
            <h3>Pinhole model</h3>
            <p>Intrinsic matrix <strong>K</strong> (focal lengths, principal point) + distortion; calibrate with checkerboards.</p>
            <h3>Features</h3>
            <p>Corners (Harris, Shi–Tomasi), binary descriptors (ORB) for speed; learned features for robustness.</p>
            <h3>Depth</h3>
            <p>Stereo disparity, structured light, ToF; each has range, noise, and sunlight trade-offs.</p>
            <h3>Learning detectors</h3>
            <p>Bounding boxes + NMS; domain shift (lab vs. warehouse) breaks naive deployment.</p>
            <h3>Point clouds</h3>
            <p>Voxel downsampling, normals, <strong>ICP</strong> for alignment—needs good initialization.</p>`,
        keyPoints: ['Calibrate intrinsics per camera and keep extrinsics in the tf tree', 'Test perception in target lighting and clutter—not only in the lab', 'ICP aligns geometry but can stick in local minima'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Simultaneous Localization and Mapping' }, { level: 'level3', index: 6, label: 'Manipulation and Grasping' }],
        resources: [{ title: 'Hartley &amp; Zisserman — Multiple View Geometry', url: 'https://www.robots.ox.ac.uk/~vgg/hzbook/' }, { title: 'OpenCV docs', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Path Planning for Mobile Robots',
        content: `
            <h3>C-space</h3>
            <p>Represent the robot as a point in configuration space; inflate obstacles by robot footprint.</p>
            <h3>Grid search</h3>
            <p><strong>Dijkstra</strong> optimal but slow; <strong>A*</strong> with admissible heuristic speeds search; <strong>D* Lite</strong> for dynamic maps.</p>
            <h3>Sampling-based</h3>
            <p><strong>PRM</strong> for multi-query; <strong>RRT</strong> / <strong>RRT*</strong> for single-query high-DOF systems.</p>
            <h3>Potential fields</h3>
            <p>Fast reactive planners but suffer <strong>local minima</strong>.</p>
            <h3>Heuristic admissibility</h3>
            <p>For A* on 8-connected grids, Euclidean cost-to-go is admissible; Manhattan is not.</p>`,
        keyPoints: ['Inflate obstacles before planning point robots', 'A* needs admissible heuristics for optimality', 'RRT-family handles arms and high-DOF C-spaces where grids fail'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Simultaneous Localization and Mapping' }, { level: 'level3', index: 4, label: 'Trajectory Generation and Optimization' }, { level: 'level3', index: 5, label: 'Motion Planning Algorithms' }],
        resources: [{ title: 'LaValle — Planning Algorithms (free)', url: 'http://planning.cs.uiuc.edu/' }, { title: 'Choset — Principles of Robot Motion', url: 'https://mitpress.mit.edu/9780262033275/' }]
    },
    {
        title: 'Trajectory Generation and Optimization',
        content: `
            <h3>Path vs. trajectory</h3>
            <p>A path is geometry; a trajectory adds <strong>time</strong>, velocities, accelerations.</p>
            <h3>Polynomials</h3>
            <p>Cubic (pos+vel BCs), quintic (+accel BCs). Solve coefficients from boundary conditions.</p>
            <h3>Trapezoidal / S-curve</h3>
            <p>Industrial workhorses; S-curves limit jerk to reduce vibration.</p>
            <h3>Feasibility</h3>
            <p>A collision-free path may still violate torque or velocity limits at the chosen time scaling—check dynamics.</p>
            <h3>Optimization</h3>
            <p>Minimize time, energy, or integrated jerk subject to constraints (TOPP-style methods).</p>`,
        keyPoints: ['Always ask: geometrically feasible vs. dynamically feasible', 'Jerk limits reduce excitation of flexible mechanics and cameras', 'Quintic segments give smooth acceleration at waypoints'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Robot Dynamics' }, { level: 'level3', index: 3, label: 'Path Planning for Mobile Robots' }, { level: 'level3', index: 5, label: 'Motion Planning Algorithms' }],
        resources: [{ title: 'Modern Robotics Ch. 9', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Motion Planning Algorithms',
        content: `
            <h3>Beyond geometric paths</h3>
            <p>Consider dynamics, contacts, and uncertainty; tie to task-level decisions.</p>
            <h3>RRT-Connect</h3>
            <p>Bidirectional trees—often far faster than vanilla RRT.</p>
            <h3>Optimization-based</h3>
            <p><strong>CHOMP</strong>, <strong>STOMP</strong> optimize smoothness + obstacle costs over whole trajectories.</p>
            <h3>TAMP</h3>
            <p><strong>Task and motion planning</strong> interleaves discrete task choices with continuous motions.</p>
            <h3>Probabilistic completeness</h3>
            <p>Means success probability → 1 as time → ∞—not a bounded-time guarantee.</p>`,
        keyPoints: ['RRT-Connect is a practical default upgrade over RRT', 'CHOMP/STOMP handle cost shaping beyond binary collision', 'Decoupled task then motion can yield physically unrealizable sequences'],
        relatedTopics: [{ level: 'level3', index: 3, label: 'Path Planning for Mobile Robots' }, { level: 'level3', index: 4, label: 'Trajectory Generation and Optimization' }, { level: 'level2', index: 1, label: 'Inverse Kinematics' }],
        resources: [{ title: 'LaValle — Planning Algorithms', url: 'http://planning.cs.uiuc.edu/' }]
    },
    {
        title: 'Manipulation and Grasping',
        content: `
            <h3>Grasp taxonomy</h3>
            <p><strong>Power</strong> vs. <strong>precision</strong> grasps; trade envelope vs. dexterity.</p>
            <h3>Force / form closure</h3>
            <p><strong>Form closure</strong> is purely geometric constraint; <strong>force closure</strong> uses friction cones to resist arbitrary wrenches.</p>
            <h3>Quality metrics</h3>
            <p>Ferrari–Canny and related metrics score wrench-resistance ability.</p>
            <h3>Planning grasps</h3>
            <p>Analytic for primitives; <strong>learned</strong> grasp nets for cluttered bins (GraspNet family).</p>
            <h3>Reality gap</h3>
            <p>Friction, compliance, and calibration differ from simulation—always hardware-test critical grasps.</p>`,
        keyPoints: ['Force closure is the usual stability criterion for frictional contacts', 'Simulation success does not imply hardware success', 'Custom fingertips win on single high-volume parts; learned planners win on variety'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Robot Perception and Computer Vision' }, { level: 'level3', index: 5, label: 'Motion Planning Algorithms' }, { level: 'level2', index: 3, label: 'Robot Dynamics' }],
        resources: [{ title: 'Murray — MLS', url: 'https://www.cds.caltech.edu/~murray/mlswiki/' }]
    }
]);
