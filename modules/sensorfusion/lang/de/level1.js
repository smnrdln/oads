i18n.registerContent('de', 'level1', [
    {
        title: "Signale, Systeme und Sensordaten",
        content: `
<h3>Vocabulary</h3>
<p>Define <strong>signal</strong>, <strong>system</strong>, <strong>measurement</strong>, <strong>estimate</strong>, <strong>state</strong>, <strong>observation</strong>, and <strong>disturbance</strong>. Distinguish continuous vs discrete time, scalar vs vector, deterministic vs stochastic signals.</p>
<h3>Sensor chain</h3>
<p>Physical quantity → transduction → conditioning → digitization → estimation. Cover units, dynamic range, resolution, bias, drift, saturation, dead zone, hysteresis, and latency.</p>
<h3>Metadata</h3>
<p>Timestamps and metadata are part of the estimation problem—not optional annotations.</p>
<h3>Pitfalls</h3>
<ul>
    <li>Treating measurements as ground truth</li>
    <li>Ignoring units or dropping timestamps</li>
    <li>Mixing reference frames without explicit transforms</li>
</ul>
<div class="visual-ref-links">
    <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Nyquist+sampling+diagram+sensor+fusion&udm=2')">🔍 Sampling intuition</button>
</div>
        `,
        keyPoints: ["Sensormesswerte sind Rauschen um den Zustand, nicht der Zustand selbst.", "Klare Definitionen von Signal, Zustand und Messung sind die Basis.", "Einheiten, Zeitstempel und Sensorgrenzen sind so wichtig wie Algorithmen.", "Viele Fusionsfehler sind Datenqualitäts- oder Metadatenfehler."],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Sampling and Aliasing"}, {"level": "level1", "index": 2, "label": "Noise, Statistics, and Basic Filtering"}, {"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}],
        resources: [{"title": "MIT OCW — Signals and Systems", "url": "https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/"}, {"title": "MIT OCW — Digital Signal Processing", "url": "https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/"}]
    },
    {
        title: "Abtastung und Aliasing",
        content: `
<h3>Sampling model</h3>
<p>Sampling maps continuous-time phenomena to discrete-time observations. Define sampling period, rate, Nyquist frequency, and aliasing.</p>
<h3>Anti-alias filtering</h3>
<p>Anti-aliasing belongs in system design—not only as a post-processing afterthought.</p>
<h3>Practical effects</h3>
<p>Quantization, clipping, missing samples, interpolation, resampling, and zero-order-hold intuition.</p>
<h3>Pitfalls</h3>
<ul>
    <li>Undersampling high-frequency motion</li>
    <li>Assuming more samples always recover lost bandwidth</li>
</ul>
        `,
        keyPoints: ["Abtastung bestimmt, welche Information im Signal erhalten bleibt.", "Frequenzen oberhalb der halben Abtastrate können als falsche tiefe Frequenzen erscheinen.", "Anti-Aliasing gehört ins Systemdesign, nicht nur in die Nachverarbeitung.", "Resampling ersetzt keine Information, die nie erfasst wurde."],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Signals, Systems, and Sensor Data"}, {"level": "level2", "index": 0, "label": "Frequency-Domain Analysis"}, {"level": "level3", "index": 2, "label": "Fusion Architectures and Timing"}],
        resources: [{"title": "MIT OCW — Digital Signal Processing", "url": "https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/"}, {"title": "MIT OCW — Discrete-Time Signal Processing", "url": "https://ocw.mit.edu/courses/6-341-discrete-time-signal-processing-fall-2005/"}]
    },
    {
        title: "Rauschen, Statistik und einfache Filterung",
        content: `
<h3>Statistics</h3>
<p>Mean, variance, covariance, standard deviation, and correlation connect sensors to estimators.</p>
<h3>Noise types</h3>
<p>White vs colored noise, bias, drift, outliers, and impulsive disturbances behave differently in fusion.</p>
<h3>Simple filters</h3>
<p>Moving average, median, exponential smoothing, and basic low-pass filters trade variance, delay, and distortion.</p>
<h3>Diagnostics</h3>
<p>Use residuals and summary statistics deliberately—outlier handling should be explicit.</p>
        `,
        keyPoints: ["Unsicherheit hat viele Formen: Bias, Drift und Zufallsrauschen.", "Filter tauschen Varianz gegen Verzögerung und Verzerrung.", "Kovarianzen beschreiben Zusammenhänge zwischen Kanälen.", "Ausreißerbehandlung soll explizit sein, nicht zufällig."],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Signals, Systems, and Sensor Data"}, {"level": "level2", "index": 1, "label": "Digital Filters and Smoothing"}, {"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}],
        resources: [{"title": "MIT OCW — Signal Processing", "url": "https://ocw.mit.edu/courses/2-161-signal-processing-continuous-and-discrete-fall-2008/"}, {"title": "Search: covariance estimation noisy sensor time series", "url": "https://www.google.com/search?q=covariance+estimation+noisy+sensor+time+series"}]
    },
]);