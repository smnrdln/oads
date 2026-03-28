i18n.registerContent('en', 'level2', [
    {
        title: 'Residual Networks and Skip Connections',
        content: `<h3>Degradation problem</h3><p>Very deep plain nets can train worse than shallower ones.</p><h3>Residual block</h3><p><strong>y = F(x) + x</strong>—learn residual perturbations; identity path carries gradients.</p><h3>Bottleneck</h3><p>1×1 → 3×3 → 1×1 saves FLOPs vs fat 3×3 stacks.</p><h3>Variants</h3><p>DenseNet concatenation, wide ResNet, pre-activation BN.</p><h3>Shortcuts</h3><p>Match dimensions with 1×1 projections when channels change.</p>`,
        keyPoints: ['Skip connections ease optimization in deep nets', 'Bottlenecks trade depth for efficiency', 'Load checkpoints carefully when input channels differ'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Convolutional Neural Networks' }, { level: 'level2', index: 1, label: 'Transfer Learning and Fine-Tuning' }, { level: 'level3', index: 0, label: 'Vision Transformers' }],
        resources: [{ title: 'ResNet (He et al.)', url: 'https://arxiv.org/abs/1512.03385' }, { title: 'D2L ResNet', url: 'https://d2l.ai/chapter_convolutional-modern/resnet.html' }]
    },
    {
        title: 'Transfer Learning and Fine-Tuning',
        content: `<h3>What transfers</h3><p>Low-level filters generalize; high layers are task-specific.</p><h3>Strategies</h3><p>Freeze backbone + train head; unfreeze top blocks with <strong>lower LR</strong>; differential LRs per layer group.</p><h3>Domain gap</h3><p>Medical/industrial imagery may need more layers unfrozen or domain pre-training.</p><h3>BatchNorm</h3><p>Keep eval mode sensible when freezing; watch running stats after partial fine-tunes.</p>`,
        keyPoints: ['Small similar data → often start with frozen backbone', 'Use 10–100× smaller LR on pretrained weights', 'Medical imaging benefits from clinical pre-training when available'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Residual Networks and Skip Connections' }, { level: 'level1', index: 4, label: 'Image Preprocessing and Augmentation' }],
        resources: [{ title: 'Yosinski transferability', url: 'https://arxiv.org/abs/1411.1792' }]
    },
    {
        title: 'Image Classification at Scale',
        content: `<h3>Benchmarks</h3><p>ImageNet-1k/21k; top-1 vs top-5.</p><h3>Regularizers</h3><p><strong>Label smoothing</strong>, Mixup, CutMix, progressive resizing.</p><h3>Scaling</h3><p>EfficientNet compound width/depth/resolution; ConvNeXt modern CNN recipe.</p><h3>Distillation</h3><p>Teacher soft targets train smaller students.</p><h3>Caveat</h3><p>Leaderboard scores ≠ deployment distribution fit.</p>`,
        keyPoints: ['Mixup/CutMix blend samples and labels', 'Distillation transfers dark knowledge beyond hard labels', 'Smoothing reduces overconfident logits'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Convolutional Neural Networks' }, { level: 'level2', index: 0, label: 'Residual Networks and Skip Connections' }],
        resources: [{ title: 'EfficientNet', url: 'https://arxiv.org/abs/1905.11946' }, { title: 'Mixup', url: 'https://arxiv.org/abs/1710.09412' }]
    },
    {
        title: 'Object Detection Fundamentals',
        content: `<h3>Task</h3><p>Class + box (cx,cy,w,h) per object.</p><h3>IoU</h3><p>Intersection over union for match quality.</p><h3>Two-stage</h3><p>RPN proposals → RoI head (Faster R-CNN).</p><h3>One-stage</h3><p>Dense predictions per cell (YOLO family)—faster, different error profile.</p><h3>Anchor-free</h3><p>FCOS/CenterNet predict center-to-border distances.</p><h3>NMS</h3><p>Suppress overlapping duplicates; threshold tuning matters in crowds.</p><h3>mAP</h3><p>COCO-style mAP@[.5:.95] averages PR across IoUs.</p>`,
        keyPoints: ['IoU ≥ 0.5 common TP threshold', 'NMS low IoU merges nearby instances', 'Two-stage often stronger on small objects'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Feature Pyramid Networks' }, { level: 'level2', index: 5, label: 'Modern Object Detectors' }],
        resources: [{ title: 'Faster R-CNN', url: 'https://arxiv.org/abs/1506.01497' }, { title: 'COCO metrics', url: 'https://cocodataset.org/#detection-eval' }]
    },
    {
        title: 'Feature Pyramid Networks',
        content: `<h3>Multi-scale need</h3><p>Objects vary in pixel size; single stride misses small or large instances.</p><h3>FPN</h3><p>Bottom-up CNN + top-down pathway + <strong>lateral 1×1</strong> merges; shared channel width per level.</p><h3>Assignment</h3><p>Small objects on high-res levels (P2/P3), large on coarse levels.</p><h3>Extensions</h3><p>PANet bottom-up refinement; BiFPN learned fusion weights.</p>`,
        keyPoints: ['Lateral 1×1 aligns channel counts before add', 'One forward pass builds all scales—no image pyramid re-runs', 'Match anchor/design to dataset scale stats'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Object Detection Fundamentals' }, { level: 'level2', index: 5, label: 'Modern Object Detectors' }, { level: 'level2', index: 6, label: 'Semantic Segmentation' }],
        resources: [{ title: 'FPN', url: 'https://arxiv.org/abs/1612.03144' }]
    },
    {
        title: 'Modern Object Detectors',
        content: `<h3>YOLO line</h3><p>Real-time grid/dense detectors evolved toward anchor-free and improved heads.</p><h3>DETR</h3><p>Set prediction + <strong>Hungarian matching</strong>; no NMS—slower convergence without deformable attention.</p><h3>Rotated boxes</h3><p>(x,y,w,h,θ) for aerial/docs.</p><h3>Benchmarks</h3><p>Report mAP <em>and</em> latency/FLOPs on target hardware.</p>`,
        keyPoints: ['DETR needs long schedules or deformable variants', 'YOLO-family default for edge throughput', 'Profile on deployment device'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Object Detection Fundamentals' }, { level: 'level2', index: 4, label: 'Feature Pyramid Networks' }, { level: 'level3', index: 0, label: 'Vision Transformers' }],
        resources: [{ title: 'DETR', url: 'https://arxiv.org/abs/2005.12872' }, { title: 'Deformable DETR', url: 'https://arxiv.org/abs/2010.04159' }]
    },
    {
        title: 'Semantic Segmentation',
        content: `<h3>Per-pixel classes</h3><p>FCN, encoder–decoder, U-Net <strong>skip connections</strong> restore detail.</p><h3>Dilated convs</h3><p>Expand receptive field without downsampling; ASPP multi-rate context.</p><h3>DeepLab</h3><p>ASPP + lightweight decoder.</p><h3>mIoU</h3><p>Mean IoU across classes—rare classes drag average.</p><h3>Imbalance</h3><p>Weighted CE, focal loss, oversampling underrepresented classes.</p>`,
        keyPoints: ['Semantic merges instances of same class', 'Dilated convs preserve resolution', 'Real-time lanes often need light backbones'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Feature Pyramid Networks' }, { level: 'level2', index: 7, label: 'Instance Segmentation' }, { level: 'level2', index: 8, label: 'Panoptic Segmentation' }],
        resources: [{ title: 'U-Net', url: 'https://arxiv.org/abs/1505.04597' }, { title: 'DeepLabv3+', url: 'https://arxiv.org/abs/1802.02611' }]
    },
    {
        title: 'Instance Segmentation',
        content: `<h3>Task</h3><p>Separate mask per object instance.</p><h3>Mask R-CNN</h3><p>Detection + parallel mask branch; <strong>RoIAlign</strong> fixes quantization vs RoIPool.</p><h3>Real-time</h3><p>YOLACT prototypes + coefficients; CondInst/SOLOv2 single-stage masks.</p><h3>Metrics</h3><p>Mask mAP averages IoU over pixels.</p>`,
        keyPoints: ['RoIAlign uses bilinear sampling at float coords', 'Instance needs identity—semantic alone cannot split overlaps', 'Mask head cost usually modest vs backbone'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Object Detection Fundamentals' }, { level: 'level2', index: 6, label: 'Semantic Segmentation' }, { level: 'level2', index: 8, label: 'Panoptic Segmentation' }],
        resources: [{ title: 'Mask R-CNN', url: 'https://arxiv.org/abs/1703.06870' }]
    },
    {
        title: 'Panoptic Segmentation',
        content: `<h3>Unification</h3><p>Joint “stuff” (sky, road) and “things” (countable objects).</p><h3>PQ</h3><p>Panoptic Quality = segmentation quality × recognition quality.</p><h3>Architectures</h3><p>Panoptic FPN; <strong>Mask2Former</strong> masked attention across tasks.</p><h3>SAM</h3><p>Promptable class-agnostic masks—needs downstream heads for semantics.</p><h3>Constraint</h3><p>Each pixel belongs to exactly one panoptic label.</p>`,
        keyPoints: ['PQ separates mask quality from detection quality', 'SAM segments from prompts, not class lists', 'AV stacks often need panoptic outputs'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Semantic Segmentation' }, { level: 'level2', index: 7, label: 'Instance Segmentation' }, { level: 'level3', index: 0, label: 'Vision Transformers' }],
        resources: [{ title: 'Panoptic Segmentation', url: 'https://arxiv.org/abs/1801.00868' }, { title: 'SAM', url: 'https://segment-anything.com/' }]
    }
]);
