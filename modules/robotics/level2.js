i18n.registerContent('en', 'level2', [
    {
        title: 'Forward Kinematics',
        content: `
            <h3>Definition</h3>
            <p><strong>Forward kinematics (FK)</strong> maps joint angles → end-effector pose. It is <em>unique</em> for a given configuration.</p>
            <h3>Denavit–Hartenberg (DH)</h3>
            <p>Four parameters (a, d, α, θ) per joint build a standard link transform. <strong>Modified vs. standard DH</strong> differ in frame placement—pick one convention and stay consistent.</p>
            <h3>FK chain</h3>
            <p><strong>T</strong>₀<sup>n</sup> = <strong>T</strong>₀¹ <strong>T</strong>₁² ··· <strong>T</strong><sub>n−1</sub><sup>n</sup>.</p>
            <h3>Product of exponentials (PoE)</h3>
            <p>Modern alternative using <strong>screw axes</strong>; avoids some DH ambiguities but needs Lie-group intuition.</p>
            <h3>Workspace</h3>
            <p><strong>Reachable</strong> vs. <strong>dexterous</strong> workspace—orientation capability may be limited even when position is reachable.</p>
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Denavit+Hartenberg+robot+arm+table+tutorial&udm=2')">🔍 DH frames</button>
            </div>`,
        keyPoints: ['FK is a direct, fast chain of matrix multiplications', 'DH gives compact parameters; PoE is flexible for software pipelines', 'Workspace is set by link geometry and joint limits'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Coordinate Frames and Rigid Body Transformations' }, { level: 'level2', index: 1, label: 'Inverse Kinematics' }, { level: 'level2', index: 2, label: 'Velocity Kinematics and the Jacobian' }],
        resources: [{ title: 'Modern Robotics Ch. 4', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'Coursera Modern Robotics', url: 'https://www.coursera.org/specializations/modernrobotics' }]
    },
    {
        title: 'Inverse Kinematics',
        content: `
            <h3>Definition</h3>
            <p><strong>IK</strong> maps desired end-effector pose → joint angles. May have <strong>zero, one, many</strong> solutions; singularities and workspace boundaries matter.</p>
            <h3>Analytic IK</h3>
            <p>Closed form for specific morphologies (2R planar, 6R with <strong>spherical wrist</strong>). <strong>Pieper’s condition</strong> enables decoupled position/orientation solve.</p>
            <h3>Numerical IK</h3>
            <p>Jacobian transpose, pseudo-inverse, <strong>damped least squares (DLS)</strong>: Δ<strong>q</strong> = <strong>J</strong>ᵀ(<strong>J</strong><strong>J</strong>ᵀ + λ²<strong>I</strong>)⁻¹ Δ<strong>x</strong> — λ avoids blow-up near singularities.</p>
            <h3>Redundancy</h3>
            <p>Extra DOF → <strong>null-space</strong> motion for secondary goals (elbow posture, obstacle avoidance).</p>`,
        keyPoints: ['Prefer closed-form IK when geometry allows—it is fast and deterministic', 'DLS trades small tracking error for bounded joint motion near singularities', 'Multiple IK solutions need selection criteria (elbow up/down, joint limits)'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Forward Kinematics' }, { level: 'level2', index: 2, label: 'Velocity Kinematics and the Jacobian' }, { level: 'level3', index: 5, label: 'Motion Planning Algorithms' }],
        resources: [{ title: 'Modern Robotics Ch. 6', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Velocity Kinematics and the Jacobian',
        content: `
            <h3>Definition</h3>
            <p><strong>ẋ</strong> = <strong>J</strong>(<strong>q</strong>)<strong>q̇</strong>. <strong>J</strong> depends on configuration—recompute each control cycle.</p>
            <h3>Geometric vs. analytic Jacobian</h3>
            <p>Geometric Jacobian stacks linear and angular velocity columns per joint. Analytic Jacobian can suffer <strong>gimbal lock</strong> if using Euler angles.</p>
            <h3>Singularities</h3>
            <p>When <strong>J</strong> loses rank, the robot cannot move in some task-space direction. Manipulability <em>w</em> = √(det(<strong>J</strong><strong>J</strong>ᵀ)) measures distance from singularity.</p>
            <h3>Statics duality</h3>
            <p><strong>τ</strong> = <strong>J</strong>ᵀ<strong>f</strong> maps end-effector wrench to joint torques—foundation of force control.</p>
            <h3>Resolved-rate control</h3>
            <p><strong>q̇</strong> = <strong>J</strong>⁺<strong>ẋ</strong><sub>des</sub> — use DLS near singularities.</p>`,
        keyPoints: ['Jacobian is the local linear map from joint rates to task velocity', 'Singularities are physical loss of motion direction, not just math', 'Jᵀ is the static wrench map for forces and torques'],
        relatedTopics: [{ level: 'level2', index: 1, label: 'Inverse Kinematics' }, { level: 'level2', index: 3, label: 'Robot Dynamics' }, { level: 'level2', index: 4, label: 'Feedback Control and PID' }],
        resources: [{ title: 'Modern Robotics Ch. 5', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'Murray — MLS', url: 'https://www.cds.caltech.edu/~murray/mlswiki/' }]
    },
    {
        title: 'Robot Dynamics',
        content: `
            <h3>Kinematics vs. dynamics</h3>
            <p>Kinematics describes motion without forces; <strong>dynamics</strong> links forces/torques to accelerations.</p>
            <h3>Manipulator equation</h3>
            <p><strong>M</strong>(<strong>q</strong>)<strong>q̈</strong> + <strong>C</strong>(<strong>q</strong>,<strong>q̇</strong>)<strong>q̇</strong> + <strong>g</strong>(<strong>q</strong>) = <strong>τ</strong>. <strong>M</strong> is symmetric positive definite.</p>
            <h3>Newton–Euler vs. Lagrange</h3>
            <p>Recursive Newton–Euler is efficient on computers; Lagrangian view builds intuition from energy.</p>
            <h3>Feedforward</h3>
            <p><strong>τ</strong><sub>ff</sub> = <strong>M</strong><strong>q̈</strong><sub>d</sub> + <strong>C</strong><strong>q̇</strong><sub>d</sub> + <strong>g</strong> cancels predictable dynamics; essential at high speed.</p>
            <h3>Gravity compensation</h3>
            <p>Even <strong>g</strong>(<strong>q</strong>) alone improves teleoperation and slow tracking.</p>`,
        keyPoints: ['Coriolis/centrifugal terms grow with speed—PD-only control may fail when fast', 'Inverse dynamics supports feedforward and simulation', 'M(q) always SPD for well-modeled rigid serial chains'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Velocity Kinematics and the Jacobian' }, { level: 'level2', index: 4, label: 'Feedback Control and PID' }, { level: 'level3', index: 4, label: 'Trajectory Generation and Optimization' }],
        resources: [{ title: 'Modern Robotics Ch. 8', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Feedback Control and PID',
        content: `
            <h3>PID law</h3>
            <p><em>u</em> = <em>K</em><sub>p</sub><em>e</em> + <em>K</em><sub>i</sub>∫<em>e</em> + <em>K</em><sub>d</sub>ė — tracks setpoints, rejects disturbances.</p>
            <h3>Role of each term</h3>
            <ul>
                <li><strong>P:</strong> proportional to error — fast but can leave steady-state error under load.</li>
                <li><strong>I:</strong> removes steady-state error; watch <strong>integrator windup</strong> when actuators saturate.</li>
                <li><strong>D:</strong> damping; amplifies noise—often low-pass filtered.</li>
            </ul>
            <h3>Cascade control</h3>
            <p>Inner velocity loop + outer position loop is standard on industrial joints.</p>
            <h3>Stability intuition</h3>
            <p>Phase margin ~45°+ and gain margin ~6 dB+ are common design targets in frequency domain tuning.</p>`,
        keyPoints: ['Add I when persistent bias remains with P-only control', 'Anti-windup is mandatory when torque or voltage saturates', 'Cascade loops outperform a single sloppy position loop on stiff mechanisms'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Robot Dynamics' }, { level: 'level1', index: 5, label: 'Embedded Computing and Robot Programming Basics' }],
        resources: [{ title: 'MIT OCW 6.003 Signals and Systems', url: 'https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/' }]
    },
    {
        title: 'Mobile Robot Kinematics and Odometry',
        content: `
            <h3>Differential drive</h3>
            <p><em>v</em> = (<em>v</em><sub>R</sub> + <em>v</em><sub>L</sub>)/2, <em>ω</em> = (<em>v</em><sub>R</sub> − <em>v</em><sub>L</sub>)/<em>b</em> with wheelbase <em>b</em>.</p>
            <h3>Non-holonomic constraints</h3>
            <p>A diff-drive cannot instantaneously slide sideways, but can reach any planar pose with maneuvers (parallel parking argument).</p>
            <h3>Odometry integration</h3>
            <p>Integrate (<em>v</em>, <em>ω</em>) to propagate pose; errors grow without bound—fuse with absolute sensing.</p>
            <h3>Error growth</h3>
            <p>Heading error dominates lateral drift over distance; wheel slip and resolution matter.</p>
            <h3>Omnidirectional vs. Ackermann</h3>
            <p>Holonomic platforms simplify planning; car-like Ackermann suits high-speed outdoor motion.</p>`,
        keyPoints: ['Odometry alone drifts—correct with LiDAR, vision, or beacons', 'Non-holonomic limits instantaneous velocity, not reachable poses', 'Small heading bias causes quadratic lateral error growth'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Coordinate Frames and Rigid Body Transformations' }, { level: 'level3', index: 0, label: 'State Estimation and Kalman Filtering' }, { level: 'level3', index: 1, label: 'Simultaneous Localization and Mapping' }],
        resources: [{ title: 'Modern Robotics Ch. 13', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'Probabilistic Robotics — motion models', url: 'https://www.probabilistic-robotics.org/' }]
    }
]);
