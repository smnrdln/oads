i18n.registerContent('de', 'level4', [
    {
        title: "Diagnose der Schätzung und Robustheit",
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
        keyPoints: ["Schätzungen müssen diagnostizierbar sein.", "Innovationen zeigen Modell-, Zeit- oder Sensorfehler.", "Robuste Systeme degradieren kontrolliert.", "Validierung braucht Off-Nominal-Tests."],
        relatedTopics: [{"level": "level2", "index": 0, "label": "Frequency-Domain Analysis"}, {"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}],
        resources: [{"title": "Welch & Bishop — Kalman filter introduction", "url": "https://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf"}, {"title": "MIT OCW — Signal Processing", "url": "https://ocw.mit.edu/courses/2-161-signal-processing-continuous-and-discrete-fall-2008/"}]
    },
    {
        title: "Trägheitsnavigation und GNSS-Fusion",
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
        keyPoints: ["INS liefert hohe Rate, driftet aber ohne Hilfe.", "Bias-Schätzung ist zentral.", "GNSS hilft langfristig, scheitert aber lokal.", "Navigation ist Kalibrierung, Zeit und Beobachtbarkeit."],
        relatedTopics: [{"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 2, "label": "Capstone Sensor Fusion System Design"}],
        resources: [{"title": "Groves — Inertial navigation tutorial", "url": "https://discovery.ucl.ac.uk/1470141/1/AESS%20Tutorial%20Groves%20Text%20and%20Figures%20for%20UCL%20Discovery.pdf"}, {"title": "NASA — INS/GNSS integration tutorial", "url": "https://ntrs.nasa.gov/api/citations/20150018921/downloads/20150018921.pdf"}]
    },
    {
        title: "Capstone: Sensorfusionssystem-Design",
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
        keyPoints: ["Gute Fusion ist Engineering.", "Anforderungen treiben Architektur.", "Deployments brauchen Fehlerfälle.", "Ein Capstone braucht verteidigbare Kompromisse."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 0, "label": "Coordinate Frames and Sensor Calibration"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 1, "label": "Inertial Navigation and GNSS Fusion"}],
        resources: [{"title": "MIT OCW — Signal Processing", "url": "https://ocw.mit.edu/courses/2-161-signal-processing-continuous-and-discrete-fall-2008/"}, {"title": "Probabilistic Robotics", "url": "https://www.probabilistic-robotics.org/"}, {"title": "Search: sensor fusion validation ablation uncertainty", "url": "https://www.google.com/search?q=sensor+fusion+validation+ablation+uncertainty"}]
    },
    {
        title: "Partikelfilter und Monte-Carlo-Schätzung",
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
        keyPoints: ["Partikelfilter für multimodale Verteilungen.", "Resampling ist nötig und riskant.", "Partikelzahl ist ein Kosten-Genauigkeits-Hebel.", "Viele Lokalisierer nutzen Partikelmethoden."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level4", "index": 4, "label": "Factor Graphs and Batch Smoothing"}],
        resources: [{"title": "Probabilistic Robotics (PDF)", "url": "https://docs.ufpr.br/~danielsantos/ProbabilisticRobotics.pdf"}, {"title": "Search: particle filter SIR tutorial", "url": "https://www.google.com/search?q=particle+filter+sequential+importance+resampling+tutorial"}]
    },
    {
        title: "Faktorgraphen und Batch-Glättung",
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
        keyPoints: ["Faktorgraphen vereinheitlichen Schätzprobleme.", "Batch-Glättung nutzt die ganze Vergangenheit.", "Sparsamkeit skaliert.", "Loop-Closure korrigiert Drift."],
        relatedTopics: [{"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 3, "label": "Particle Filters and Monte Carlo Estimation"}, {"level": "level4", "index": 2, "label": "Capstone Sensor Fusion System Design"}],
        resources: [{"title": "Search: GTSAM factor graph SLAM iSAM2", "url": "https://www.google.com/search?q=GTSAM+factor+graph+SLAM+iSAM2"}, {"title": "Search: Dellaert factor graphs robotics tutorial", "url": "https://www.google.com/search?q=Frank+Dellaert+factor+graphs+robotics+tutorial"}]
    },
    {
        title: "Multi-Sensor- und Multi-Ziel-Datenassoziation",
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
        keyPoints: ["Assoziation ist in Clutter oft schwerer als Schätzung.", "Falsche Zuordnungen vergiften Kovarianzen.", "Gating muss abgestimmt sein.", "MHT ist mächtig und teuer."],
        relatedTopics: [{"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}, {"level": "level4", "index": 4, "label": "Factor Graphs and Batch Smoothing"}],
        resources: [{"title": "Search: PDAF Fortmann Bar-Shalom", "url": "https://www.google.com/search?q=probabilistic+data+association+filter+PDAF+Fortmann+Bar-Shalom"}, {"title": "Search: multiple hypothesis tracking tutorial", "url": "https://www.google.com/search?q=multiple+hypothesis+tracking+Blackman+tutorial"}]
    },
]);