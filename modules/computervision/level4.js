i18n.registerContent('en', 'level4', [
    {
        title: 'Vision-Language Models',
        content: `<h3>CLIP</h3><p>Contrastive image–text training; zero-shot via prompt embeddings vs image embedding.</p><h3>Open-vocab detection</h3><p>GLIP / Grounding DINO fuse language into detectors.</p><h3>LVLMs</h3><p>Project ViT features into LLMs (LLaVA, InstructBLIP)— conversational vision.</p><h3>Limits</h3><p>Global CLIP lacks spatial precision without extra heads; watch hallucinations.</p><h3>Prompting</h3><p>Templates like “a photo of a {class}” beat bare nouns.</p>`,
        keyPoints: ['CLIP aligns modalities in shared space', 'Grounding needs spatial architecture beyond CLIP alone', 'Instruction tuning unlocks open-ended QA'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Vision Transformers' }, { level: 'level2', index: 8, label: 'Panoptic Segmentation' }, { level: 'level4', index: 1, label: 'Image Editing and Synthesis' }],
        resources: [{ title: 'CLIP', url: 'https://arxiv.org/abs/2103.00020' }, { title: 'LLaVA', url: 'https://arxiv.org/abs/2304.08485' }]
    },
    {
        title: 'Image Editing and Synthesis',
        content: `<h3>Conditional diffusion</h3><p>Text, layout, edge, depth as conditions—ControlNet side network; IP-Adapter image prompts.</p><h3>Inpainting & img2img</h3><p>Mask schedules and noise levels trade fidelity vs edit strength.</p><h3>Personalization</h3><p>DreamBooth, LoRA, textual inversion on handful of images.</p><h3>Metrics</h3><p>FID on large sets; CLIPScore; LPIPS perceptual distance.</p><h3>FID caveat</h3><p>Distributional—single images meaningless.</p>`,
        keyPoints: ['ControlNet freezes base UNet', 'LoRA adapts style/identity cheaply', 'Report FID with sufficient sample counts'],
        relatedTopics: [{ level: 'level3', index: 5, label: 'Generative Models: VAEs and Diffusion' }, { level: 'level4', index: 0, label: 'Vision-Language Models' }, { level: 'level4', index: 2, label: 'Robustness, Fairness, and Evaluation Beyond Accuracy' }],
        resources: [{ title: 'ControlNet', url: 'https://arxiv.org/abs/2302.05543' }, { title: 'DreamBooth', url: 'https://arxiv.org/abs/2208.12242' }]
    },
    {
        title: 'Robustness, Fairness, and Evaluation Beyond Accuracy',
        content: `<h3>Shift</h3><p>Covariate/label shift; benchmarks like ImageNet-C/A/R.</p><h3>Adversarial</h3><p>Small perturbations fool models; adversarial training trades clean accuracy.</p><h3>Spurious cues</h3><p>Background texture shortcuts—Clever Hans effects.</p><h3>Fairness</h3><p>Demographic parity vs equalized odds—impossibility results exist.</p><h3>Calibration</h3><p>ECE: match confidence to empirical accuracy.</p><h3>Documentation</h3><p>Model cards & datasheets for stakeholders.</p>`,
        keyPoints: ['High average accuracy can hide subgroup failure', 'Calibration matters in medical/safety', 'Mitigate bias with data and evaluation, not by hiding attributes alone'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Training and Evaluation Protocols' }, { level: 'level4', index: 0, label: 'Vision-Language Models' }, { level: 'level4', index: 3, label: 'Model Deployment and Production Systems' }],
        resources: [{ title: 'Model Cards', url: 'https://arxiv.org/abs/1810.03993' }, { title: 'ImageNet-C', url: 'https://arxiv.org/abs/1903.12261' }]
    },
    {
        title: 'Model Deployment and Production Systems',
        content: `<h3>Optimization</h3><p>ONNX, TensorRT, OpenVINO, operator fusion.</p><h3>Serving</h3><p>REST vs streaming; dynamic batching vs latency SLAs.</p><h3>Skew</h3><p>Training vs serving preprocessing mismatch silently kills accuracy.</p><h3>Monitoring</h3><p>Input drift, concept drift, canary/A-B releases.</p><h3>MLOps</h3><p>Containers, golden-set regression before promotion.</p>`,
        keyPoints: ['Training-serving skew is a top silent failure mode', 'Monitor inputs not just outputs', 'Quantized engines need calibration data representative of prod'],
        relatedTopics: [{ level: 'level3', index: 7, label: 'Efficient Vision Architectures' }, { level: 'level1', index: 6, label: 'Training and Evaluation Protocols' }],
        resources: [{ title: 'TensorRT', url: 'https://docs.nvidia.com/deeplearning/tensorrt/' }]
    },
    {
        title: 'Capstone — End-to-End Vision System Design',
        content: `<h3>Problem framing</h3><p>Map business goals to CV task + measurable KPIs before modeling.</p><h3>Data</h3><p>Label strategy, active learning, versioning, audits.</p><h3>Baselines</h3><p>Linear probe or tiny fine-tune first—know the floor.</p><h3>Architecture pick</h3><p>Task + latency + hardware → shortlist.</p><h3>Loop</h3><p>Deploy → monitor → mine hard negatives → retrain.</p><h3>Mindset</h3><p>Shipped simple model beats perfect lab model.</p>`,
        keyPoints: ['More relevant data usually beats fancier nets', 'Hard negatives from production are gold', 'Own the path from data to monitoring'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Training and Evaluation Protocols' }, { level: 'level4', index: 2, label: 'Robustness, Fairness, and Evaluation Beyond Accuracy' }, { level: 'level4', index: 3, label: 'Model Deployment and Production Systems' }],
        resources: [{ title: 'Hidden Technical Debt in ML', url: 'https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf' }]
    }
]);
