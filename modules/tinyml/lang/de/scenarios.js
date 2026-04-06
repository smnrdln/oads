i18n.registerContent('de', 'scenarios', [
    {
        level: 'level1', topicIndex: 0,
        title: "Was ist TinyML und Edge AI?",
        description: "A smart-home company is building a door sensor that should detect the word \"open\" without sending audio to the cloud for privacy reasons. The sensor runs on two AA batteries expected to last two years. ***",
        choices: [{"text": "Train and serve the keyword model from a cloud API", "correct": false, "xp": 0}, {"text": "Run a full transformer language model compressed to 8-bit on the MCU", "correct": false, "xp": 0}, {"text": "Deploy a tiny keyword-spotting model on a low-power MCU with always-on audio front-end", "correct": true, "xp": 20}, {"text": "Pre-record all possible voice commands and pattern-match with a lookup table", "correct": false, "xp": 0}],
        explanation: "Option A violates the privacy requirement and requires connectivity. Option B exceeds typical MCU memory and power for a full transformer. Option D cannot generalize to natural speech variation. Option C matches the TinyML paradigm exactly for this use case.\n\n***"
    },
    {
        level: 'level1', topicIndex: 1,
        title: "Mikrocontroller- und Edge-Hardware-Grundlagen",
        description: "Your team needs to classify hand gestures from an IMU (3-axis accelerometer + gyro) in real time at 200 Hz. The bill of materials target is under \\$2 per unit in volume. The model is a small 1D-CNN with 80 KB of weights and 64 KB peak activation memory. ***",
        choices: [{"text": "Use a Raspberry Pi 4 with Linux and PyTorch", "correct": false, "xp": 0}, {"text": "Use a Cortex-M4 MCU with 256 KB SRAM and 1 MB Flash", "correct": true, "xp": 20}, {"text": "Use a cloud inference API with BLE data streaming", "correct": false, "xp": 0}, {"text": "Use an FPGA development board", "correct": false, "xp": 0}],
        explanation: "The M4 meets the memory budget (80 KB weights in Flash, 64 KB activations in SRAM < 256 KB), satisfies the cost target, and handles 200 Hz sensor data. Option A is overkill and too expensive. Option C introduces latency and BLE bandwidth constraints. Option D adds HDL complexity and cost for a simple classifier.\n\n***"
    },
    {
        level: 'level1', topicIndex: 2,
        title: "Eingebettete Systeme: Randbedingungen",
        description: "A wildlife camera must detect animal sounds 24/7 on a solar + 200 mAh battery. The inference model needs 30 ms active time at 20 mA. After inference, the MCU sleeps at 10 \u00b5A. Audio checks happen every 500 ms. ***",
        choices: [{"text": "Run inference continuously without sleep modes", "correct": false, "xp": 0}, {"text": "Duty-cycle: wake every 500 ms for 30 ms inference, sleep the rest", "correct": true, "xp": 20}, {"text": "Run inference on a cloud server and stream audio via Wi-Fi", "correct": false, "xp": 0}, {"text": "Replace the neural network with a fixed-threshold amplitude detector only", "correct": false, "xp": 0}],
        explanation: "Duty cycling reduces average current to approximately (30 ms \u00d7 20 mA + 470 ms \u00d7 0.01 mA) / 500 ms \u2248 1.21 mA, versus 20 mA continuous \u2014 a ~16\u00d7 saving. Option A drains the battery in ~10 hours. Option C requires Wi-Fi which typically draws 80\u2013150 mA. Option D sacrifices the classification capability entirely.\n\n***"
    },
    {
        level: 'level1', topicIndex: 3,
        title: "Machine-Learning-Grundlagen f\u00fcr die Edge",
        description: "You are selecting the hidden layer design for a motion classifier on a Cortex-M4. You have a 3-second window of 6-axis IMU data processed as a 2D feature map (time \u00d7 channel). ***",
        choices: [{"text": "Standard Conv2D layers throughout", "correct": false, "xp": 0}, {"text": "Depthwise separable Conv2D layers with ReLU6", "correct": true, "xp": 20}, {"text": "Full transformer self-attention blocks", "correct": false, "xp": 0}, {"text": "LSTM layers with sigmoid gates", "correct": false, "xp": 0}],
        explanation: "Depthwise separable Conv2D with ReLU6 is the standard TinyML backbone choice \u2014 8\u20139\u00d7 fewer MACs than standard Conv2D, quantization-friendly activation, and proven in MobileNet-family architectures. Full transformers and LSTMs have memory and compute requirements that far exceed typical Cortex-M4 budgets for this task.\n\n***"
    },
    {
        level: 'level1', topicIndex: 4,
        title: "Sensordaten und Signalverarbeitung (Basics)",
        description: "You are building a cough detector for a wearable. The team debates whether to feed raw PCM audio directly to the model or to compute MFCCs first. ***",
        choices: [{"text": "Feed raw 16 kHz PCM audio; let the model learn all features", "correct": false, "xp": 0}, {"text": "Compute MFCCs (26 coefficients, 25 ms frames) and feed the 2D spectrogram", "correct": true, "xp": 20}, {"text": "Apply only a single FFT magnitude vector as input", "correct": false, "xp": 0}, {"text": "Downsample to 1 kHz and feed raw samples to reduce data size", "correct": false, "xp": 0}],
        explanation: "MFCCs reduce input dimensionality from 400 raw samples per 25 ms frame to 26 coefficients, dramatically reducing model size and input memory. Raw PCM (A) forces the model to learn basic spectral features, requiring much more capacity and memory. Single FFT (C) loses temporal dynamics. 1 kHz downsampling (D) loses the cough's important frequency content above 500 Hz.\n\n***"
    },
    {
        level: 'level1', topicIndex: 5,
        title: "Der TinyML-Entwicklungsworkflow",
        description: "Your model achieves 96% accuracy on the test set after training in Python. After conversion and quantization, you deploy to the MCU and observe 88% accuracy in hardware-in-the-loop testing. *** # Stage 2 \u2014 Intermediate *Goal: Master the core optimization toolkit that makes models fit and run efficiently on edge hardware.* ***",
        choices: [{"text": "Accept the 88% as normal; quantization always loses 8%", "correct": false, "xp": 0}, {"text": "Re-evaluate operator support, apply quantization-aware training, and re-measure after conversion", "correct": true, "xp": 20}, {"text": "Increase the model size to recover accuracy on the MCU", "correct": false, "xp": 0}, {"text": "Switch to cloud inference for this use case", "correct": false, "xp": 0}],
        explanation: "An 8% accuracy drop is larger than typical (1\u20133% is normal with proper quantization). This warrants quantization-aware training (QAT), which simulates quantization during training to recover accuracy. Option A accepts an unnecessary regression. Option C worsens the memory situation. Option D abandons the edge requirement.\n\n***\n\n# Stage 2 \u2014 Intermediate\n\n*Goal: Master the core optimization toolkit that makes models fit and run efficiently on edge hardware.*\n\n***"
    },
    {
        level: 'level2', topicIndex: 0,
        title: "Modell-Quantisierung",
        description: "A production team applies PTQ to a 200 KB float32 model targeting an MCU with 256 KB Flash (leaving ~56 KB for runtime). After quantization the model is 52 KB, but accuracy drops from 91% to 83% on validation data. ***",
        choices: [{"text": "Ship the 83% model \u2014 4\u00d7 size reduction justifies the accuracy loss", "correct": false, "xp": 0}, {"text": "Apply QAT and re-evaluate accuracy after reconversion", "correct": true, "xp": 20}, {"text": "Increase model parameters to compensate for quantization loss", "correct": false, "xp": 0}, {"text": "Switch to 16-bit quantization only and accept the 2\u00d7 instead of 4\u00d7 size reduction", "correct": false, "xp": 0}],
        explanation: "An 8-point accuracy drop strongly indicates that PTQ calibration was insufficient or the model architecture is quantization-unfriendly. QAT is the standard remedy. Option A ships a likely unacceptable product. Option C worsens the memory budget. Option D (int16) may not fit the Flash budget and is not always supported on MCU runtimes.\n\n***"
    },
    {
        level: 'level2', topicIndex: 1,
        title: "Modell-Pruning und Sparsit\u00e4t",
        description: "A team has a 1.2 MB audio classifier. Their target Flash is 256 KB. Quantization to int8 brings it to 300 KB \u2014 still over budget. They debate next steps. ***",
        choices: [{"text": "Apply 30% unstructured pruning after quantization", "correct": false, "xp": 0}, {"text": "Apply structured filter pruning to reduce the model architecture, then re-apply QAT", "correct": true, "xp": 20}, {"text": "Add more Flash memory to the BOM", "correct": false, "xp": 0}, {"text": "Accept 300 KB and overflow into external SPI Flash with latency penalty", "correct": false, "xp": 0}],
        explanation: "The gap (300 KB \u2192 256 KB) requires ~15% reduction. Structured pruning removes entire filters, reducing the dense model dimensions and enabling further QAT. Option A produces unstructured sparsity that won't reduce dense inference size. Option C adds BOM cost. Option D adds latency and risks cache thrashing.\n\n***"
    },
    {
        level: 'level2', topicIndex: 2,
        title: "Wissensdistillation",
        description: "Your team has a teacher ResNet-50 with 25M parameters achieving 93% accuracy on a gesture dataset. You need to deploy a student that fits 200 KB Flash. QAT alone from scratch reaches 88%. ***",
        choices: [{"text": "Prune the ResNet-50 directly to 200 KB", "correct": false, "xp": 0}, {"text": "Design a small custom student architecture, distill from the ResNet-50 teacher, then apply QAT to the student", "correct": true, "xp": 20}, {"text": "Deploy the teacher as-is with the assumption that the MCU will eventually be upgraded", "correct": false, "xp": 0}, {"text": "Use only the hard-label training data without a teacher", "correct": false, "xp": 0}],
        explanation: "Distillation + QAT from a powerful teacher is the standard pipeline: the teacher's soft labels guide the student past the accuracy ceiling achievable with hard labels alone. Pruning ResNet-50 to 200 KB in structured form would collapse architecture depth. Option C is unrealistic for the hardware. Option D leaves 2\u20134% accuracy on the table.\n\n***"
    },
    {
        level: 'level2', topicIndex: 3,
        title: "Neural Architecture Search f\u00fcr die Edge",
        description: "A startup needs a keyword spotter for three different MCU product variants (low-end M0+, mid-range M4, high-end M55). Their ML team has limited GPU budget. ***",
        choices: [{"text": "Train three completely separate models from scratch for each chip", "correct": false, "xp": 0}, {"text": "Use an Once-for-All supernet, train once, then specialize for each hardware target", "correct": true, "xp": 20}, {"text": "Run full RL-based NAS three times, once per chip", "correct": false, "xp": 0}, {"text": "Use the same model for all three chips and accept suboptimal performance on the M0+", "correct": false, "xp": 0}],
        explanation: "Once-for-All trains a single supernet that can be specialized for multiple hardware targets by selecting subnetworks without full retraining. This is dramatically more compute-efficient than running NAS three times (C) or training from scratch (A). Option D is pragmatic but leaves the M0+ over its resource budget.\n\n***"
    },
    {
        level: 'level2', topicIndex: 4,
        title: "Audio-Klassifikation und Keyword Spotting",
        description: "A smart speaker team measures that their keyword spotter fires falsely 3 times per hour during normal conversation. Users find this unacceptable. ***",
        choices: [{"text": "Lower the confidence threshold to require higher certainty before triggering", "correct": false, "xp": 0}, {"text": "Increase the confidence threshold to reduce false positives", "correct": true, "xp": 20}, {"text": "Remove noise augmentation from training to reduce confusion", "correct": false, "xp": 0}, {"text": "Reduce the MFCC window length to 0.5 seconds", "correct": false, "xp": 0}],
        explanation: "Raising the confidence threshold increases the minimum required model output score before a keyword is declared. This reduces FPR at the cost of slightly higher FNR \u2014 an acceptable trade for a \"less annoying\" wake-word experience. Option A (lower threshold) increases false positives. Option C degrades noise robustness. Option D reduces the temporal context available for the classifier.\n\n***"
    },
    {
        level: 'level2', topicIndex: 5,
        title: "Bildklassifikation auf Mikrocontrollern",
        description: "A quality control camera on a production line must classify 5 product defect types from 96\u00d796 grayscale images. The MCU has 512 KB Flash and 256 KB SRAM. The team is debating model choices. ***",
        choices: [{"text": "Deploy a full ResNet-50 pretrained model", "correct": false, "xp": 0}, {"text": "Use MobileNetV2 at \u03b1=0.35 with 96\u00d796 input, transfer learn from ImageNet", "correct": true, "xp": 20}, {"text": "Train a MobileNetV2 at \u03b1=1.0 from scratch", "correct": false, "xp": 0}, {"text": "Use a simple threshold on raw pixel intensity", "correct": false, "xp": 0}],
        explanation: "MobileNetV2 \u03b1=0.35 at 96\u00d796 fits comfortably in 512 KB Flash after quantization and benefits from ImageNet pretraining for fast convergence on a small defect dataset. ResNet-50 (A) exceeds both Flash and SRAM budgets by an order of magnitude. \u03b1=1.0 from scratch (C) may not fit Flash and will underfit on a small dataset. Pixel thresholding (D) cannot classify multiple defect types reliably.\n\n***"
    },
    {
        level: 'level2', topicIndex: 6,
        title: "Zeitreihen-Klassifikation und Anomalieerkennung",
        description: "A factory installs vibration sensors on 200 motors. Failure data is extremely rare \u2014 only 3 recorded failures in the last 5 years. The team must choose an anomaly detection strategy. ***",
        choices: [{"text": "Train a supervised classifier using the 3 failure examples as the anomaly class", "correct": false, "xp": 0}, {"text": "Train an autoencoder on months of normal vibration data and detect anomalies by reconstruction error", "correct": true, "xp": 20}, {"text": "Set a fixed amplitude threshold on raw vibration signal", "correct": false, "xp": 0}, {"text": "Use a cloud-based deep learning model that processes raw sensor streams in real time", "correct": false, "xp": 0}],
        explanation: "With only 3 failure examples, supervised learning is not viable. An autoencoder trained on abundant normal data is the standard approach for rare-anomaly predictive maintenance. Fixed thresholding (C) cannot capture complex multivariate anomaly patterns. Cloud streaming (D) violates real-time latency and bandwidth constraints for 200 sensors.\n\n***"
    },
    {
        level: 'level2', topicIndex: 7,
        title: "Leistungs- und Latenz-Profiling",
        description: "A team's deployed model runs at 120 ms per inference, missing a 50 ms latency requirement. They have profiled and found that 3 convolutional layers account for 95% of inference time. *** # Stage 3 \u2014 Advanced *Goal: Design, profile, and deploy complete application-level Edge AI systems with production concerns.* ***",
        choices: [{"text": "Increase the MCU clock frequency by 2\u00d7 to hit the latency target", "correct": false, "xp": 0}, {"text": "Analyze the 3 bottleneck layers for possible structured pruning, operator fusion, and quantization to int8 with SIMD acceleration", "correct": true, "xp": 20}, {"text": "Move inference to a cloud API", "correct": false, "xp": 0}, {"text": "Accept 120 ms and increase the sensor polling interval to match", "correct": false, "xp": 0}],
        explanation: "Since 3 layers dominate 95% of latency, targeted optimization (structured pruning, operator fusion, SIMD int8) on those layers alone can reduce overall inference time 2\u20134\u00d7. Doubling clock frequency (A) only gives 2\u00d7 at the cost of 4\u00d7 active power (power \u221d f). Cloud (C) abandons edge requirements. Option D changes the application behavior rather than solving the engineering problem.\n\n***\n\n# Stage 3 \u2014 Advanced\n\n*Goal: Design, profile, and deploy complete application-level Edge AI systems with production concerns.*\n\n***"
    },
    {
        level: 'level3', topicIndex: 0,
        title: "Objekterkennung an der Edge",
        description: "A retail store wants to count people entering a door using a camera module on an MCU with 512 KB SRAM and 2 MB Flash. They debate architectures. ***",
        choices: [{"text": "Deploy a full YOLOv8-medium model", "correct": false, "xp": 0}, {"text": "Use a MobileNetV2 classifier to classify each frame as \"person present / not present\"", "correct": false, "xp": 0}, {"text": "Use NanoDet or Tiny YOLO with extreme width multiplier to detect and localize people, count entries via centroid tracking", "correct": true, "xp": 20}, {"text": "Stream video to a cloud API for inference", "correct": false, "xp": 0}],
        explanation: "People counting requires localization (where in frame) to track entry direction \u2014 classification alone (B) cannot determine entry vs. exit direction reliably. NanoDet / Tiny YOLO can localize and track person centroids within the MCU's memory budget. YOLOv8-medium (A) exceeds MCU resources. Cloud streaming (D) requires reliable connectivity and adds latency.\n\n***"
    },
    {
        level: 'level3', topicIndex: 1,
        title: "On-Device-Learning und Personalisierung",
        description: "A hearing aid manufacturer wants to personalize a voice enhancement model to each user's specific voice characteristics without sending audio recordings to any server. ***",
        choices: [{"text": "Collect voice samples from all users and retrain a global model in the cloud monthly", "correct": false, "xp": 0}, {"text": "Use federated learning: each hearing aid fine-tunes locally on user voice samples, sends only gradients to server for aggregation", "correct": true, "xp": 20}, {"text": "Ship a single fixed model with no personalization", "correct": false, "xp": 0}, {"text": "Fine-tune the full model on device for each user using Adam optimizer", "correct": false, "xp": 0}],
        explanation: "Federated learning provides personalization signal to the global model without ever transmitting private audio. Local raw data stays on the device. Option A violates privacy. Option C provides no personalization. Option D with full-model Adam fine-tuning exceeds MCU memory for a reasonably sized audio model.\n\n***"
    },
    {
        level: 'level3', topicIndex: 2,
        title: "Hardware-Software-Co-Design",
        description: "A team is designing a real-time face detection system for an access control panel with a 20 ms latency requirement and 3.3 V battery power. ***",
        choices: [{"text": "Use a Cortex-M4 with no SIMD vector extensions", "correct": false, "xp": 0}, {"text": "Use a Cortex-M55 with Helium MVE and CMSIS-NN int8 optimized kernels", "correct": true, "xp": 20}, {"text": "Use a Raspberry Pi Compute Module 4 with Linux", "correct": false, "xp": 0}, {"text": "Use a cloud inference API with an edge camera streaming JPEG over Wi-Fi", "correct": false, "xp": 0}],
        explanation: "The M55 + Helium + CMSIS-NN combination provides 4\u20138\u00d7 compute throughput improvement over M4 while remaining in the microcontroller power envelope. Access control requires offline-capable, low-latency inference. Raspberry Pi (C) adds cost, Linux overhead, and higher idle power. Cloud (D) introduces connectivity dependency and latency variance unacceptable for physical access control.\n\n***"
    },
    {
        level: 'level3', topicIndex: 3,
        title: "Edge-MLOps und Modell-Lebenszyklus",
        description: "A fleet of 50,000 industrial vibration sensors has been running the same anomaly detection model for 14 months. Support tickets indicate false alarms have increased 3\u00d7 in the last 2 months. No changes were made to the model. ***",
        choices: [{"text": "Ignore the increase \u2014 model performance fluctuates naturally", "correct": false, "xp": 0}, {"text": "Trigger drift detection analysis on telemetry confidence histograms; if confirmed, collect new labeled data and retrain, validate, and OTA-deploy the updated model", "correct": true, "xp": 20}, {"text": "Remotely disable anomaly detection until the issue is diagnosed", "correct": false, "xp": 0}, {"text": "Replace all 50,000 sensors with new hardware", "correct": false, "xp": 0}],
        explanation: "Increasing false alarms are a classic concept drift signature \u2014 machine operating conditions have likely shifted (seasonal temperature, mechanical wear, new vibration sources). The correct response is: confirm drift via telemetry analysis, collect new representative data, retrain, validate on HIL, and OTA deploy. Option A ignores the problem. Option C disables safety functionality. Option D is an unnecessary and expensive hardware replacement.\n\n***"
    },
    {
        level: 'level3', topicIndex: 4,
        title: "Datenschutz und Sicherheit an der Edge",
        description: "A medical wearable detects atrial fibrillation from on-device ECG analysis. The startup wants to contribute to a global model improvement program using data from consented users. *** # Stage 4 \u2014 Expert / Capstone *Goal: Reason about cutting-edge architectures, privacy, distributed systems, and deliver an integrated system design.* ***",
        choices: [{"text": "Upload raw 30-second ECG recordings to the cloud for centralized retraining", "correct": false, "xp": 0}, {"text": "Use federated learning with differential privacy: compute local gradients on-device, add calibrated noise, upload only the noisy gradients", "correct": true, "xp": 20}, {"text": "Share inference results (AF detected: yes/no) only, with no gradient sharing", "correct": false, "xp": 0}, {"text": "Disable all telemetry and never update the model post-deployment", "correct": false, "xp": 0}],
        explanation: "Federated learning with DP provides the best balance: raw ECG (highly sensitive medical data) never leaves the device, yet the global model improves. DP guarantees mathematical privacy bounds against gradient inversion. Option C sacrifices the model improvement signal. Option A violates medical data minimization principles. Option D leaves deployed models without the ability to improve as new AF patterns emerge.\n\n***\n\n# Stage 4 \u2014 Expert / Capstone\n\n*Goal: Reason about cutting-edge architectures, privacy, distributed systems, and deliver an integrated system design.*\n\n***"
    },
    {
        level: 'level4', topicIndex: 0,
        title: "Transformer und Attention an der Edge",
        description: "A product team wants to add a natural language command interface to a smart appliance. The MCU is a Cortex-M55 with 2 MB Flash and 512 KB SRAM. Commands are from a vocabulary of 50 phrases. ***",
        choices: [{"text": "Deploy a full BERT-base model with 110M parameters", "correct": false, "xp": 0}, {"text": "Use a keyword spotting + intent classifier approach: tiny acoustic model detects wake word, then a small slot-filling classifier handles the 50-phrase vocabulary", "correct": true, "xp": 20}, {"text": "Deploy a quantized TinyBERT at int4 precision", "correct": false, "xp": 0}, {"text": "Use GPT-3.5 via cloud API for natural language understanding", "correct": false, "xp": 0}],
        explanation: "For a closed 50-phrase vocabulary, a wake-word + small classification model is the appropriate architecture. A tiny acoustic classifier for fixed phrases fits in < 200 KB Flash. Full BERT (A) and TinyBERT at int4 (C) still require tens of MB even after aggressive compression, far exceeding 2 MB Flash. Cloud GPT (D) introduces connectivity dependency and latency.\n\n***"
    },
    {
        level: 'level4', topicIndex: 1,
        title: "Federated Learning: Systemdesign",
        description: "A healthcare company deploys wearable ECG monitors to 20,000 patients in 5 countries with different demographic profiles (non-IID data). They want to improve a global arrhythmia detection model. ***",
        choices: [{"text": "Use standard FedAvg with all 20,000 devices participating every round", "correct": false, "xp": 0}, {"text": "Use FedProx with partial participation (10% per round), differential privacy for gradient uploads, and personalized fine-tuning layers per device", "correct": true, "xp": 20}, {"text": "Collect all ECG data to a central server and train a global model", "correct": false, "xp": 0}, {"text": "Maintain 5 separate country-specific models, trained independently with no knowledge sharing", "correct": false, "xp": 0}],
        explanation: "FedProx handles non-IID demographic distributions; partial participation manages device availability and straggler variance; DP satisfies medical data regulations; personalized layers adapt to individual patient baselines. FedAvg alone (A) degrades on non-IID data. Centralized collection (C) violates medical privacy regulations and crosses international data transfer restrictions. Fully siloed models (D) miss cross-patient learning opportunities.\n\n***"
    },
    {
        level: 'level4', topicIndex: 2,
        title: "Edge-AI-Systemdesign und -Integration",
        description: "A smart agriculture company deploys soil moisture and pest detection sensors across 500-hectare farms. The sensors run on solar + battery, must transmit a small alert (< 200 bytes) when a pest is detected, and the farm has no Wi-Fi coverage. ***",
        choices: [{"text": "Use Wi-Fi for high-bandwidth reliable transmission", "correct": false, "xp": 0}, {"text": "Use BLE to gateway nodes distributed across the farm", "correct": false, "xp": 0}, {"text": "Use LoRaWAN for long-range, low-power small-packet telemetry to a farm gateway", "correct": true, "xp": 20}, {"text": "Use LTE-M for cellular connectivity with real-time data streaming", "correct": false, "xp": 0}],
        explanation: "LoRaWAN is designed precisely for this use case: < 200-byte payloads, 1\u201315 km range, < 50 \u00b5A sleep current, and operates on unlicensed spectrum with a single farm gateway. BLE range is 10\u2013100 m \u2014 insufficient for 500 ha without many expensive relays. Wi-Fi requires AC power or large batteries and has 50\u2013100 m range. LTE-M has adequate range but higher power and ongoing SIM costs per sensor.\n\n***"
    },
    {
        level: 'level4', topicIndex: 3,
        title: "Capstone: End-to-End Edge-AI-Systemdesign",
        description: "A medical device regulatory reviewer challenges your fall detection design: \"How do you ensure the model does not drift and stop meeting the 95% sensitivity requirement after 12 months of deployment?\" *** ## 4. Quality Notes - **No gaps between stages:** Each stage's final topics (1.6, 2.8, 3.5) introduce concepts that are prerequisites for the next stage's first topics. - **Consistent terminology:** Topic titles are used verbatim in all \"Related Topics\" cross-references throughout the curriculum. - **Practical emphasis:** Every topic includes at least one quantitative worked example and a real-world decision scenario with engineering rationale. - **Optional depth tracks** (not in core sequence): *Hardware Description Languages for Edge AI* (FPGA/HLS), *Neuromorphic Computing*, *Spiking Neural Networks*, *Edge Vision-Language Models* \u2014 these represent active research frontiers beyond the Expert stage and are appropriate for independent study after completing the capstone.",
        choices: [{"text": "Respond that models do not drift once deployed", "correct": false, "xp": 0}, {"text": "Demonstrate a telemetry monitoring pipeline that tracks per-device confidence score distributions, a drift detection threshold, an OTA retraining-and-deployment pipeline, and a staged rollout with HIL accuracy re-validation before each fleet update", "correct": true, "xp": 20}, {"text": "Promise to issue a manual firmware update whenever complaints increase", "correct": false, "xp": 0}, {"text": "Reduce the sensitivity threshold to 90% to give more margin against drift", "correct": false, "xp": 0}],
        explanation: "Regulatory bodies require a systematic, documented, and automated approach to post-market surveillance for medical devices with ML components. A telemetry \u2192 drift detection \u2192 retrain \u2192 validate \u2192 staged OTA pipeline provides a defensible, traceable answer. Option A is factually wrong. Option C is reactive and manual \u2014 unacceptable for a regulated device. Option D degrades safety performance below specification.\n\n***\n\n## 4. Quality Notes\n\n- **No gaps between stages:** Each stage's final topics (1.6, 2.8, 3.5) introduce concepts that are prerequisites for the next stage's first topics.\n- **Consistent terminology:** Topic titles are used verbatim in all \"Related Topics\" cross-references throughout the curriculum.\n- **Practical emphasis:** Every topic includes at least one quantitative worked example and a real-world decision scenario with engineering rationale.\n- **Optional depth tracks** (not in core sequence): *Hardware Description Languages for Edge AI* (FPGA/HLS), *Neuromorphic Computing*, *Spiking Neural Networks*, *Edge Vision-Language Models* \u2014 these represent active research frontiers beyond the Expert stage and are appropriate for independent study after completing the capstone."
    },
]);
