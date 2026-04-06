i18n.registerContent('en', 'level4', [
    {
        title: "Estimation Diagnostics and Robustness",
        content: `
<h3>Signals to watch</h3>
<p>Innovations, residuals, covariance consistency, and sanity envelopes.</p>
<h3>Tests</h3>
<p>Innovation whiteness, normalized metrics, and outlier gating.</p>
<h3>Robust operation</h3>
<p>Fault detection, dropout handling, adaptive noise tuning, and fallback modes.</p>
<h3>Failure taxonomy</h3>
<p>Separate model error, calibration error, timing error, and sensor fault signatures.</p>
        `,
        keyPoints: ["A fused estimate must be diagnosable, not just smooth.", "Innovation behavior often reveals wrong model, timing, or sensor assumptions.", "Robust systems degrade gracefully when sensors fail.", "Validation needs off-nominal tests, not only nominal runs."],
        relatedTopics: [{"level": "level2", "index": 0, "label": "Frequency-Domain Analysis"}, {"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}],
        resources: [{"title": "Welch & Bishop — Kalman filter introduction", "url": "https://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf"}, {"title": "MIT OCW — Signal Processing", "url": "https://ocw.mit.edu/courses/2-161-signal-processing-continuous-and-discrete-fall-2008/"}]
    },
    {
        title: "Inertial Navigation and GNSS Fusion",
        content: `
<h3>IMU fundamentals</h3>
<p>IMU outputs, strapdown integration, and why errors grow without aiding.</p>
<h3>Error sources</h3>
<p>Accelerometer and gyro biases, scale factors, gravity handling, and heading drift.</p>
<h3>Aiding</h3>
<p>GNSS, odometry, barometric height, and other aids—loose vs tight coupling.</p>
<h3>Field practice</h3>
<p>Stationary detection, zero-velocity updates, and honest uncertainty growth during outages.</p>
        `,
        keyPoints: ["Inertial sensing gives high-rate motion information but drifts without aiding.", "Bias estimation is central to good inertial fusion.", "GNSS aids long-term accuracy but has outages, latency, and environment-dependent quality.", "Navigation fusion is timing, calibration, and observability—not only filtering."],
        relatedTopics: [{"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 2, "label": "Capstone Sensor Fusion System Design"}],
        resources: [{"title": "Groves — Inertial navigation tutorial", "url": "https://discovery.ucl.ac.uk/1470141/1/AESS%20Tutorial%20Groves%20Text%20and%20Figures%20for%20UCL%20Discovery.pdf"}, {"title": "NASA — INS/GNSS integration tutorial", "url": "https://ntrs.nasa.gov/api/citations/20150018921/downloads/20150018921.pdf"}]
    },
    {
        title: "Capstone Sensor Fusion System Design",
        content: `
<h3>Requirements first</h3>
<p>Mission requirements, operating conditions, failure modes, and acceptance metrics drive architecture.</p>
<h3>Sensor selection</h3>
<p>Bandwidth, noise, drift, range, timing, environment, and cost constraints.</p>
<h3>End-to-end pipeline</h3>
<p>Preprocessing, calibration, synchronization, model choice, diagnostics, fallbacks, and evaluation.</p>
<h3>Engineering discipline</h3>
<p>Document assumptions, state definitions, frames, validation procedures, and uncertainty reporting.</p>
        `,
        keyPoints: ["Good fusion systems are engineered, not only estimated.", "Requirements should drive architecture, models, and diagnostics.", "Every deployment needs validation under failure and corner cases.", "A capstone is complete when you can defend design trade-offs."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 1, "label": "Inertial Navigation and GNSS Fusion"}],
        resources: [{"title": "MIT OCW — Signal Processing", "url": "https://ocw.mit.edu/courses/2-161-signal-processing-continuous-and-discrete-fall-2008/"}, {"title": "Probabilistic Robotics", "url": "https://www.probabilistic-robotics.org/"}, {"title": "Search: sensor fusion validation ablation uncertainty", "url": "https://www.google.com/search?q=sensor+fusion+validation+ablation+uncertainty"}]
    },
    {
        title: "Particle Filters and Monte Carlo Estimation",
        content: `
<h3>Motivation</h3>
<p>When Gaussian assumptions break, particle methods represent multimodal and non-Gaussian beliefs.</p>
<h3>Mechanics</h3>
<p>Weighted samples, importance updates, normalization, and resampling.</p>
<h3>Resampling</h3>
<p>Multinomial, systematic, and residual strategies; degeneracy and diversity loss.</p>
<h3>Trade-offs</h3>
<p>Computational cost vs accuracy; curse of dimensionality; proposal design.</p>
        `,
        keyPoints: ["Particle filters can represent non-Gaussian and multimodal distributions in the limit.", "Resampling is necessary but reduces diversity.", "Particle count trades cost for accuracy.", "Many robotics localization systems use particle filters or descendants."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 4, "label": "Factor Graphs and Batch Smoothing"}],
        resources: [{"title": "Probabilistic Robotics (PDF)", "url": "https://docs.ufpr.br/~danielsantos/ProbabilisticRobotics.pdf"}, {"title": "Search: particle filter SIR tutorial", "url": "https://www.google.com/search?q=particle+filter+sequential+importance+resampling+tutorial"}]
    },
    {
        title: "Factor Graphs and Batch Smoothing",
        content: `
<h3>Filtering vs smoothing</h3>
<p>Online causal filtering vs revisiting past measurements for higher accuracy.</p>
<h3>Factor graphs</h3>
<p>Variables, factors, and sparse structure that makes large SLAM problems tractable.</p>
<h3>Online bridges</h3>
<p>Fixed-lag smoothing, sliding windows, iSAM / iSAM2 intuition.</p>
<h3>Loop closures</h3>
<p>Loop constraints as factors that correct accumulated drift.</p>
        `,
        keyPoints: ["Factor graphs unify many estimation problems algebraically.", "Batch smoothing outperforms causal filtering when past data can be revisited.", "Sparse solvers are essential; dense solvers do not scale to real sensor streams.", "Loop closures keep long trajectories consistent."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 3, "label": "Particle Filters and Monte Carlo Estimation"}, {"level": "level4", "index": 2, "label": "Capstone Sensor Fusion System Design"}],
        resources: [{"title": "Search: GTSAM factor graph SLAM iSAM2", "url": "https://www.google.com/search?q=GTSAM+factor+graph+SLAM+iSAM2"}, {"title": "Search: Dellaert factor graphs robotics tutorial", "url": "https://www.google.com/search?q=Frank+Dellaert+factor+graphs+robotics+tutorial"}]
    },
    {
        title: "Multi-Sensor and Multi-Target Data Association",
        content: `
<h3>Problem statement</h3>
<p>Decide which measurement belongs to which target or landmark before updating tracks.</p>
<h3>Methods</h3>
<p>Nearest-neighbor, PDA, JPDA, and MHT at a conceptual level.</p>
<h3>Gating and tracks</h3>
<p>Mahalanobis gating, track initiation/deletion, and clutter models.</p>
<h3>Failure modes</h3>
<p>Wrong associations corrupt covariances and spawn ghost tracks.</p>
        `,
        keyPoints: ["Association is often harder than estimation in clutter.", "Wrong associations corrupt covariance and continuity.", "Gating reduces search cost but must be tuned.", "Multi-hypothesis methods delay commitment at computational cost."],
        relatedTopics: [{"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 4, "label": "Factor Graphs and Batch Smoothing"}],
        resources: [{"title": "Search: PDAF Fortmann Bar-Shalom", "url": "https://www.google.com/search?q=probabilistic+data+association+filter+PDAF+Fortmann+Bar-Shalom"}, {"title": "Search: multiple hypothesis tracking tutorial", "url": "https://www.google.com/search?q=multiple+hypothesis+tracking+Blackman+tutorial"}]
    },
]);