i18n.registerContent('en', 'level2', [
    {
        title: "Frequency-Domain Analysis",
        content: `
<h3>Decomposition</h3>
<p>Sinusoidal decomposition, frequency, phase, and amplitude give an alternate view of sensor streams.</p>
<h3>DFT / FFT</h3>
<p>Discrete Fourier transform intuition and why FFT matters computationally.</p>
<h3>Spectral practice</h3>
<p>Spectral leakage, windowing, resolution, zero padding, and power spectral density for diagnosing periodic interference.</p>
<h3>Pitfalls</h3>
<p>Confusing resolution with accuracy; over-reading noisy spectra; ignoring window effects.</p>
        `,
        keyPoints: ["Frequency-domain views reveal periodic structure hidden in time traces.", "Window choice changes leakage behavior.", "Frequency resolution depends on observation length, not just sample rate.", "Spectra help choose filters and diagnose interference sources."],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Sampling and Aliasing"}, {"level": "level2", "index": 1, "label": "Digital Filters and Smoothing"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}],
        resources: [{"title": "MIT OCW — Digital Signal Processing", "url": "https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/"}, {"title": "MIT OCW — Discrete-Time Signal Processing", "url": "https://ocw.mit.edu/courses/6-341-discrete-time-signal-processing-fall-2005/"}]
    },
    {
        title: "Digital Filters and Smoothing",
        content: `
<h3>FIR vs IIR</h3>
<p>Compare finite vs infinite impulse response, recursion, stability, and implementation cost.</p>
<h3>Filter families</h3>
<p>Low-pass, high-pass, band-pass, notch, and smoothing designs for drift, broadband noise, and narrowband interference.</p>
<h3>Phase and transients</h3>
<p>Cutoff, order, phase lag, group delay, and transient behavior affect control and tracking.</p>
<h3>Complementary filtering</h3>
<p>A simple fusion bridge when sensors have complementary frequency strengths.</p>
        `,
        keyPoints: ["Filter design is about trade-offs, not maximum smoothness.", "FIR filters are often easier to reason about; IIR filters are often cheaper computationally.", "Phase lag can break tracking and control even when noise looks better.", "Complementary filters are often the simplest useful fusion model."],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Noise, Statistics, and Basic Filtering"}, {"level": "level2", "index": 0, "label": "Frequency-Domain Analysis"}, {"level": "level2", "index": 2, "label": "State-Space Models and the Kalman Filter"}],
        resources: [{"title": "MIT OCW — Digital Signal Processing", "url": "https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/"}, {"title": "MIT OCW — Discrete-Time Signal Processing", "url": "https://ocw.mit.edu/courses/6-341-discrete-time-signal-processing-fall-2005/"}]
    },
    {
        title: "State-Space Models and the Kalman Filter",
        content: `
<h3>Models</h3>
<p>State, control, process model, measurement model, and linear stochastic structure: <em>x<sub>k</sub> = A x<sub>k−1</sub> + B u<sub>k−1</sub> + w</em>, <em>z<sub>k</sub> = H x<sub>k</sub> + v</em>.</p>
<h3>Recursive estimation</h3>
<p>Predict and update, innovation, Kalman gain, posterior covariance, and what Q and R mean.</p>
<h3>Tuning and observability</h3>
<p>Observability basics, tuning logic, and why a wrong model can look stable while being wrong.</p>
        `,
        keyPoints: ["The Kalman filter estimates hidden state by combining prediction and measurement.", "Q injects model uncertainty; R sets measurement trust.", "Innovation is the most useful single diagnostic in early development.", "A wrong model can look stable while still being wrong."],
        relatedTopics: [{"level": "level1", "index": 2, "label": "Noise, Statistics, and Basic Filtering"}, {"level": "level2", "index": 1, "label": "Digital Filters and Smoothing"}, {"level": "level3", "index": 1, "label": "Extended and Unscented Kalman Filtering"}, {"level": "level4", "index": 0, "label": "Estimation Diagnostics and Robustness"}],
        resources: [{"title": "Welch & Bishop — Kalman filter introduction", "url": "https://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf"}, {"title": "Probabilistic Robotics", "url": "https://www.probabilistic-robotics.org/"}]
    },
]);