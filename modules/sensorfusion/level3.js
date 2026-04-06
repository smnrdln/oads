i18n.registerContent('en', 'level3', [
    {
        title: "Coordinate Frames and Sensor Calibration",
        content: `
<h3>Frames</h3>
<p>Local, body, sensor, and world frames—why rigid transform discipline matters for fusion.</p>
<h3>Calibration</h3>
<p>Intrinsic and extrinsic calibration, scale, misalignment, offsets, and time-offset calibration vs spatial alignment.</p>
<h3>Validation</h3>
<p>Validate calibration under motion with residuals and repeated experiments.</p>
<h3>Pitfalls</h3>
<p>Handedness mistakes, sign conventions, and assuming calibration is permanent.</p>
        `,
        keyPoints: ["Many fusion failures are frame or calibration failures, not filter failures.", "Extrinsics, time offsets, and axis alignment affect observability and accuracy.", "Calibration must be validated under motion, not only at rest.", "A stable estimator cannot rescue systematically misaligned sensors."],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Signals, Systems, and Sensor Data"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 1, "label": "Inertial Navigation and GNSS Fusion"}],
        resources: [{"title": "Groves — Inertial navigation tutorial (UCL Discovery)", "url": "https://discovery.ucl.ac.uk/1470141/1/AESS%20Tutorial%20Groves%20Text%20and%20Figures%20for%20UCL%20Discovery.pdf"}, {"title": "Probabilistic Robotics", "url": "https://www.probabilistic-robotics.org/"}]
    },
    {
        title: "Extended and Unscented Kalman Filtering",
        content: `
<h3>Nonlinearity</h3>
<p>Nonlinear process and measurement models appear in navigation, vision, and ranging fusion.</p>
<h3>EKF</h3>
<p>Linearization with Jacobians, first-order approximation, and common failure modes.</p>
<h3>UKF</h3>
<p>Sigma-point intuition: propagate representative points through nonlinear models.</p>
<h3>Practice</h3>
<p>Compare accuracy, tuning burden, computation, consistency, divergence, and covariance inflation.</p>
        `,
        keyPoints: ["EKF handles nonlinearity by local linearization.", "UKF propagates representative points through nonlinear models.", "Better nonlinear handling does not fix bad models or bad calibration.", "Initialization quality matters more as nonlinearity increases."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}],
        resources: [{"title": "Welch & Bishop — Kalman filter introduction", "url": "https://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf"}, {"title": "Search: unscented Kalman filter tutorial", "url": "https://www.google.com/search?q=unscented+Kalman+filter+tutorial"}]
    },
    {
        title: "Fusion Architectures and Timing",
        content: `
<h3>Architectures</h3>
<p>Centralized vs decentralized fusion; loosely vs tightly coupled designs and hybrids.</p>
<h3>Time</h3>
<p>Synchronous vs asynchronous updates, multi-rate fusion, buffering, interpolation, extrapolation, and out-of-sequence measurements.</p>
<h3>System-level logic</h3>
<p>Gating, association hooks, and sensor health at the architecture layer.</p>
<h3>Pitfalls</h3>
<p>Aligning by arrival time, double-counting correlated information, and hidden feedback loops.</p>
        `,
        keyPoints: ["Fusion architecture is a system design choice, not just a math choice.", "Time alignment errors can dominate sensor quality differences.", "Loose and tight coupling solve different problems and fail differently.", "Multi-rate systems need explicit buffering and update policies."],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Sampling and Aliasing"}, {"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 1, "label": "Inertial Navigation and GNSS Fusion"}],
        resources: [{"title": "NASA — INS/GNSS integration tutorial", "url": "https://ntrs.nasa.gov/api/citations/20150018921/downloads/20150018921.pdf"}, {"title": "MIT OCW — Discrete-Time Signal Processing", "url": "https://ocw.mit.edu/courses/6-341-discrete-time-signal-processing-fall-2005/"}]
    },
]);