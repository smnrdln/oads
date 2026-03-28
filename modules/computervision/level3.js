i18n.registerContent('en', 'level3', [
    {
        title: 'Vision Transformers',
        content: `<h3>Self-attention</h3><p>Q,K,V softmax attention; multi-head splits subspaces.</p><h3>ViT</h3><p>Patchify image, linear embed, add position info, stack encoder blocks, <strong>[CLS]</strong> for classification.</p><h3>Data hunger</h3><p>ViT needs large pre-training vs inductive bias of CNNs.</p><h3>Swin</h3><p>Shifted windows → near-linear cost; hierarchical maps for dense tasks.</p><h3>DeiT</h3><p>Distillation tokens for data-efficient ViT training.</p>`,
        keyPoints: ['Patch size trades resolution vs cost quadratically in global attention', 'Swin fits detection/segmentation backbones', 'Positional encoding choice matters for fine localization'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Convolutional Neural Networks' }, { level: 'level2', index: 0, label: 'Residual Networks and Skip Connections' }, { level: 'level3', index: 1, label: 'Self-Supervised Visual Representation Learning' }],
        resources: [{ title: 'ViT', url: 'https://arxiv.org/abs/2010.11929' }, { title: 'Swin', url: 'https://arxiv.org/abs/2103.14030' }]
    },
    {
        title: 'Self-Supervised Visual Representation Learning',
        content: `<h3>Contrastive</h3><p>SimCLR/MoCo align augmented views, push negatives apart.</p><h3>BYOL / SimSiam</h3><p>Asymmetry + stop-gradient avoids collapse without negatives.</p><h3>MAE</h3><p>Mask most patches—high ratio works because neighbors correlate.</p><h3>DINO</h3><p>Self-distillation with ViT; attention maps highlight objects emergently.</p><h3>Pitfall</h3><p>Symmetric setups without tricks collapse to trivial representations.</p>`,
        keyPoints: ['MAE 75% masks force global reasoning', 'BYOL needs EMA target + predictor asymmetry', 'SSL features transfer well to dense tasks'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Vision Transformers' }, { level: 'level2', index: 1, label: 'Transfer Learning and Fine-Tuning' }, { level: 'level3', index: 5, label: 'Generative Models: VAEs and Diffusion' }],
        resources: [{ title: 'SimCLR', url: 'https://arxiv.org/abs/2002.05709' }, { title: 'MAE', url: 'https://arxiv.org/abs/2111.06377' }]
    },
    {
        title: 'Optical Flow and Motion Estimation',
        content: `<h3>Brightness constancy</h3><p>Classic assumption breaks under lighting/specularities.</p><h3>Classical</h3><p>Lucas–Kanade local; Horn–Schunck global smoothness.</p><h3>Learned</h3><p>FlowNet, PWC-Net, <strong>RAFT</strong> with iterative refinement on correlation volumes.</p><h3>Aperture problem</h3><p>Only normal flow component observable along edges locally.</p><h3>Applications</h3><p>Video, stabilization, driving, action cues.</p>`,
        keyPoints: ['RAFT iterates— not single feedforward', 'Learned flow handles large displacement better than classical on real video', 'Use lightweight models when budget-limited'],
        relatedTopics: [{ level: 'level1', index: 2, label: 'Edge Detection and Feature Descriptors' }, { level: 'level3', index: 3, label: 'Video Understanding and Temporal Modeling' }, { level: 'level3', index: 4, label: '3D Vision and Depth Estimation' }],
        resources: [{ title: 'RAFT', url: 'https://arxiv.org/abs/2003.12039' }]
    },
    {
        title: 'Video Understanding and Temporal Modeling',
        content: `<h3>Representations</h3><p>5D tensors (B,T,C,H,W).</p><h3>Two-stream</h3><p>RGB + flow fusion.</p><h3>3D CNN / I3D</h3><p>Inflate 2D filters temporal—bootstrap from image nets.</p><h3>Efficiency</h3><p>(2+1)D factorization; SlowFast dual pathways.</p><h3>Transformers</h3><p>TimeSformer, Video Swin factorize space-time attention.</p><h3>Pitfall</h3><p>Scene bias on Kinetics vs temporal reasoning on Something-Something.</p>`,
        keyPoints: ['I3D reuses ImageNet init', 'SlowFast separates spatial detail and fast motion', 'Choose benchmarks matching required temporal reasoning'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Optical Flow and Motion Estimation' }, { level: 'level3', index: 0, label: 'Vision Transformers' }],
        resources: [{ title: 'I3D', url: 'https://arxiv.org/abs/1705.07750' }, { title: 'SlowFast', url: 'https://arxiv.org/abs/1812.03982' }]
    },
    {
        title: '3D Vision and Depth Estimation',
        content: `<h3>Pinhole model</h3><p>Project 3D points with intrinsics K.</p><h3>Monocular depth</h3><p>Scale-ambiguous without metric cues.</p><h3>Stereo / LiDAR</h3><p>Metric depth via triangulation or range sensors.</p><h3>Self-supervised</h3><p>Monodepth2-style photometric reprojection losses on video.</p><h3>Point clouds</h3><p>PointNet global pooling permutation invariance; PointNet++ local neighborhoods.</p>`,
        keyPoints: ['Monocular networks predict relative depth up to scale', 'Stereo needs calibration but gives metric data', 'PointNet ≠ local convs—that is PointNet++'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Optical Flow and Motion Estimation' }, { level: 'level3', index: 6, label: 'Neural Radiance Fields and Novel View Synthesis' }, { level: 'level2', index: 3, label: 'Object Detection Fundamentals' }],
        resources: [{ title: 'Monodepth2', url: 'https://arxiv.org/abs/1806.01260' }, { title: 'PointNet', url: 'https://arxiv.org/abs/1612.00593' }]
    },
    {
        title: 'Generative Models: VAEs and Diffusion',
        content: `<h3>VAE</h3><p>ELBO = reconstruction − KL; <strong>reparameterization</strong> z = μ + σε for gradients.</p><h3>DDPM</h3><p>Forward noise schedule; learned reverse denoising.</p><h3>Fast sampling</h3><p>DDIM and distillation reduce steps.</p><h3>LDM / Stable Diffusion</h3><p>Diffuse in VAE latent space—huge savings.</p><h3>CFG</h3><p>Classifier-free guidance trades diversity for prompt fidelity.</p><h3>vs GANs</h3><p>Diffusion modes better coverage; slower inference.</p>`,
        keyPoints: ['Reparameterization makes sampling differentiable', 'High CFG can oversaturate', 'Latent diffusion is standard for HQ text-to-image'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Self-Supervised Visual Representation Learning' }, { level: 'level4', index: 0, label: 'Vision-Language Models' }, { level: 'level4', index: 1, label: 'Image Editing and Synthesis' }],
        resources: [{ title: 'DDPM', url: 'https://arxiv.org/abs/2006.11239' }, { title: 'LDM', url: 'https://arxiv.org/abs/2112.10752' }]
    },
    {
        title: 'Neural Radiance Fields and Novel View Synthesis',
        content: `<h3>NeRF</h3><p>MLP maps (x,y,z,θ,φ) → radiance + density; volume rendering integral matches photos.</p><h3>Fourier features</h3><p>High-frequency detail via positional encoding.</p><h3>Speedups</h3><p>Instant-NGP hashing; <strong>3D Gaussian Splatting</strong> explicit Gaussians + rasterization for real-time.</p><h3>Needs</h3><p>Accurate camera poses; sparse views hurt quality.</p>`,
        keyPoints: ['NeRF is implicit—no mesh required', '3DGS renders fast after optimization', 'Pose errors blur reconstructions'],
        relatedTopics: [{ level: 'level3', index: 4, label: '3D Vision and Depth Estimation' }, { level: 'level3', index: 5, label: 'Generative Models: VAEs and Diffusion' }],
        resources: [{ title: 'NeRF', url: 'https://arxiv.org/abs/2003.08934' }, { title: '3D Gaussian Splatting', url: 'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/' }]
    },
    {
        title: 'Efficient Vision Architectures',
        content: `<h3>Depthwise separable</h3><p>Depthwise spatial + pointwise 1×1—MobileNet family.</p><h3>Quantization</h3><p>PTQ vs QAT; INT8 on supported accelerators.</p><h3>Pruning</h3><p>Structured vs unstructured; needs hardware support for sparse speedups.</p><h3>NAS</h3><p>Automates architecture at high search cost.</p><h3>Profiling</h3><p>FLOPs ≠ latency—memory bandwidth dominates many ops.</p>`,
        keyPoints: ['Depthwise separable cuts params sharply', 'QAT usually beats naive PTQ on hard models', 'Always benchmark on target SoC'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Convolutional Neural Networks' }, { level: 'level2', index: 2, label: 'Image Classification at Scale' }, { level: 'level4', index: 3, label: 'Model Deployment and Production Systems' }],
        resources: [{ title: 'MobileNetV2', url: 'https://arxiv.org/abs/1801.04381' }]
    }
]);
