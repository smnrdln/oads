i18n.registerContent('de', 'level4', [
    {
        title: 'Vision-Language-Modelle',
        content: `<h3>CLIP</h3><p>Kontrastives Bild–Text-Training; Zero-Shot über Prompt-Embeddings vs. Bildeinbettung.</p><h3>Open-Vocab-Detection</h3><p>GLIP / Grounding DINO fusionieren Sprache in Detektoren.</p><h3>LVLMs</h3><p>ViT-Features in LLM projizieren (LLaVA, InstructBLIP) — dialogfähige Vision.</p><h3>Grenzen</h3><p>Globales CLIP ohne räumliche Köpfe; Halluzinationen beachten.</p><h3>Prompting</h3><p>„Ein Foto von {Klasse}“ schlägt bloße Substantive.</p>`,
        keyPoints: ['CLIP aligniert Modalitäten im gemeinsamen Raum', 'Verortung braucht räumliche Architektur', 'Instruction Tuning ermöglicht offene Fragen'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Vision Transformer' }, { level: 'level2', index: 8, label: 'Panoptische Segmentierung' }, { level: 'level4', index: 1, label: 'Bildbearbeitung und Synthese' }],
        resources: [{ title: 'CLIP', url: 'https://arxiv.org/abs/2103.00020' }, { title: 'LLaVA', url: 'https://arxiv.org/abs/2304.08485' }]
    },
    {
        title: 'Bildbearbeitung und Synthese',
        content: `<h3>Bedingte Diffusion</h3><p>Text, Layout, Kanten, Tiefe — ControlNet-Seitennetz; IP-Adapter für Bild-Prompts.</p><h3>Inpainting & img2img</h3><p>Maske und Rauschlevel steuern Treue vs. Edit-Stärke.</p><h3>Personalisierung</h3><p>DreamBooth, LoRA, Textual Inversion mit wenigen Bildern.</p><h3>Metriken</h3><p>FID auf großen Sets; CLIPScore; LPIPS.</p><h3>FID</h3><p>Verteilungsmetrik — Einzelbilder nicht aussagekräftig.</p>`,
        keyPoints: ['ControlNet friert Basis-UNet ein', 'LoRA passt Stil/Identität günstig an', 'FID mit ausreichend Stichproben berichten'],
        relatedTopics: [{ level: 'level3', index: 5, label: 'Generative Modelle: VAE und Diffusion' }, { level: 'level4', index: 0, label: 'Vision-Language-Modelle' }, { level: 'level4', index: 2, label: 'Robustheit, Fairness und Evaluation' }],
        resources: [{ title: 'ControlNet', url: 'https://arxiv.org/abs/2302.05543' }, { title: 'DreamBooth', url: 'https://arxiv.org/abs/2208.12242' }]
    },
    {
        title: 'Robustheit, Fairness und Evaluation',
        content: `<h3>Shift</h3><p>Kovariate/Label-Shift; Benchmarks ImageNet-C/A/R.</p><h3>Adversarial</h3><p>Kleine Störungen täuschen; adversarisches Training tauscht saubere Genauigkeit.</p><h3>Spuriöse Hinweise</h3><p>Hintergrund-Shortcuts — Clever-Hans.</p><h3>Fairness</h3><p>Demographische Parität vs. equalized odds.</p><h3>Kalibrierung</h3><p>ECE: Konfidenz vs. empirische Trefferquote.</p><h3>Dokumentation</h3><p>Model Cards und Datasheets.</p>`,
        keyPoints: ['Hohe Mittelwert-Genauigkeit kann Untergruppen verstecken', 'Kalibrierung wichtig in Medizin/Sicherheit', 'Bias mit Daten und Evaluation adressieren'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Trainings- und Bewertungsprotokolle' }, { level: 'level4', index: 0, label: 'Vision-Language-Modelle' }, { level: 'level4', index: 3, label: 'Model Deployment und Produktionssysteme' }],
        resources: [{ title: 'Model Cards', url: 'https://arxiv.org/abs/1810.03993' }, { title: 'ImageNet-C', url: 'https://arxiv.org/abs/1903.12261' }]
    },
    {
        title: 'Model Deployment und Produktionssysteme',
        content: `<h3>Optimierung</h3><p>ONNX, TensorRT, OpenVINO, Operator-Fusion.</p><h3>Serving</h3><p>REST vs. Streaming; dynamisches Batching vs. Latenz-SLAs.</p><h3>Skew</h3><p>Unterschiedliche Vorverarbeitung Train vs. Serve senkt Genauigkeit leise.</p><h3>Monitoring</h3><p>Input-Drift, Konzept-Drift, Canary/A-B.</p><h3>MLOps</h3><p>Container, Golden-Set-Regression vor Rollout.</p>`,
        keyPoints: ['Train-Serve-Skew ist häufige stille Fehlerquelle', 'Eingaben nicht nur Ausgaben monitoren', 'Quantisierung mit repräsentativen Kalibrierdaten'],
        relatedTopics: [{ level: 'level3', index: 7, label: 'Effiziente Vision-Architekturen' }, { level: 'level1', index: 6, label: 'Trainings- und Bewertungsprotokolle' }],
        resources: [{ title: 'TensorRT', url: 'https://docs.nvidia.com/deeplearning/tensorrt/' }]
    },
    {
        title: 'Capstone — End-to-End Vision-Systemdesign',
        content: `<h3>Problemformulierung</h3><p>Geschäftsziel in CV-Aufgabe und KPIs übersetzen.</p><h3>Daten</h3><p>Label-Strategie, aktives Lernen, Versionierung, Audits.</p><h3>Baselines</h3><p>Linear Probe oder kleines Fine-Tune — Untergrenze kennen.</p><h3>Architekturwahl</h3><p>Aufgabe + Latenz + Hardware → Shortlist.</p><h3>Schleife</h3><p>Deploy → monitoren → Hard Negatives → retrainen.</p><h3>Haltung</h3><p>Einfaches shipped Modell schlägt perfektes Labor-Modell.</p>`,
        keyPoints: ['Mehr passende Daten schlägt oft fancy Netze', 'Hard Negatives aus Produktion sind wertvoll', 'Verantwortung von Daten bis Monitoring'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Trainings- und Bewertungsprotokolle' }, { level: 'level4', index: 2, label: 'Robustheit, Fairness und Evaluation' }, { level: 'level4', index: 3, label: 'Model Deployment und Produktionssysteme' }],
        resources: [{ title: 'Hidden Technical Debt in ML', url: 'https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf' }]
    }
]);
