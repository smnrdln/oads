i18n.registerContent('en', 'level1', [
    {
        title: 'Images as Data',
        content: `<h3>Digital images</h3><p>A raster image is a 2D or 3D array of intensities. Color models: <strong>RGB</strong>, <strong>BGR</strong> (OpenCV), <strong>HSV</strong>, grayscale—choose per task.</p><h3>Types and range</h3><p><code>uint8</code> vs <code>float32</code>; normalize to [0,1], [-1,1], or per-channel mean/std for stable training.</p><h3>Layout</h3><p>Origin usually top-left; tensors may be <strong>(H,W,C)</strong> or <strong>(C,H,W)</strong>. Watch <strong>EXIF orientation</strong>—loaders may ignore rotation metadata.</p><h3>Pitfalls</h3><p>Channel swap, integer overflow without casting to float, silent resize distortions.</p>`,
        keyPoints: ['Confirm channel order and value range before any model', 'Cast to float before linear ops', 'Library conventions for layout differ—read the docs'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Image Preprocessing and Augmentation' }, { level: 'level1', index: 5, label: 'Convolutional Neural Networks' }],
        resources: [{ title: 'Szeliski — Computer Vision', url: 'https://szeliski.org/Book/' }, { title: 'OpenCV color conversions', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Classical Image Filtering',
        content: `<h3>Convolution vs correlation</h3><p>Weighted sums over neighborhoods; kernels encode smoothing, sharpening, or gradients.</p><h3>Gaussian & separability</h3><p>2D Gaussian = product of 1D Gaussians → two 1D passes, <em>O(k)</em> per pixel instead of <em>k²</em>.</p><h3>Gradients</h3><p><strong>Sobel/Prewitt</strong> give G<sub>x</sub>, G<sub>y</sub>; magnitude and orientation describe edges.</p><h3>Morphology</h3><p>Erosion, dilation, opening, closing on binary masks—noise removal and blob cleanup.</p><h3>Borders</h3><p>Padding choices affect edges (zero, reflect, replicate).</p>`,
        keyPoints: ['Gaussian smoothing suppresses high-frequency noise', 'Gradient magnitude finds edges; morphology cleans binary masks', 'Classical filters are fixed—no learned weights'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Images as Data' }, { level: 'level1', index: 2, label: 'Edge Detection and Feature Descriptors' }, { level: 'level1', index: 5, label: 'Convolutional Neural Networks' }],
        resources: [{ title: 'Szeliski textbook', url: 'https://szeliski.org/Book/' }]
    },
    {
        title: 'Edge Detection and Feature Descriptors',
        content: `<h3>Canny</h3><p>Smooth → gradients → <strong>non-maximum suppression</strong> → double threshold + hysteresis tracking.</p><h3>Corners</h3><p><strong>Harris</strong> score from structure tensor; strong response where both eigenvalues are large.</p><h3>Scale space</h3><p>Pyramids and DoG for scale-invariant interest points.</p><h3>Descriptors & matching</h3><p>SIFT-style histograms; <strong>Lowe’s ratio test</strong> rejects ambiguous matches.</p><h3>Limits</h3><p>Large viewpoint/lighting change breaks hand-crafted descriptors—learned features often win on complex data.</p>`,
        keyPoints: ['NMS thins edges to single-pixel chains', 'Harris is weak on flat regions', 'Ratio test reduces false descriptor matches'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Classical Image Filtering' }, { level: 'level3', index: 2, label: 'Optical Flow and Motion Estimation' }],
        resources: [{ title: 'Lowe SIFT', url: 'https://www.google.com/search?q=Lowe+SIFT+IJCV+2004' }]
    },
    {
        title: 'Neural Network Fundamentals for Vision',
        content: `<h3>Building blocks</h3><p>MLP layers, <strong>ReLU/GELU/sigmoid</strong>, forward pass, losses: cross-entropy, MSE, BCE.</p><h3>Training</h3><p>Backprop, SGD/momentum/<strong>Adam</strong>, batch size vs noise.</p><h3>Generalization</h3><p>Bias–variance, over/underfitting, <strong>L2</strong> decay, <strong>dropout</strong> (train vs eval).</p><h3>Stability</h3><p>Vanishing/exploding gradients; gradient clipping when needed.</p>`,
        keyPoints: ['ReLU can “die” on negative half—leaky variants help', 'Zero train loss + high val loss ⇒ overfitting', 'Adam is a strong default for many vision optimizers'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Images as Data' }, { level: 'level1', index: 5, label: 'Convolutional Neural Networks' }, { level: 'level1', index: 6, label: 'Training and Evaluation Protocols' }],
        resources: [{ title: 'Deep Learning Book', url: 'https://www.deeplearningbook.org/' }, { title: 'CS231n', url: 'https://cs231n.stanford.edu/' }]
    },
    {
        title: 'Image Preprocessing and Augmentation',
        content: `<h3>Resize & crop</h3><p>Bilinear vs nearest; aspect-preserving resize + center/random crop vs squash.</p><h3>Normalize</h3><p>Compute mean/std on <strong>train</strong> only; freeze for val/test.</p><h3>Spatial aug</h3><p>Flips, crops, rotation—apply the <strong>same transform</strong> to boxes/masks for detection/segmentation.</p><h3>TTA</h3><p>Average predictions over augmented views—costs latency.</p><h3>Policies</h3><p>AutoAugment, RandAugment—don’t break label semantics (e.g. digit flips).</p>`,
        keyPoints: ['Augmentation is cheap regularization', 'Never use train-only augs at inference', 'Domain knowledge guides hue/color jitter'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Images as Data' }, { level: 'level1', index: 6, label: 'Training and Evaluation Protocols' }, { level: 'level2', index: 1, label: 'Transfer Learning and Fine-Tuning' }],
        resources: [{ title: 'RandAugment', url: 'https://arxiv.org/abs/1909.13719' }, { title: 'Albumentations', url: 'https://albumentations.ai/' }]
    },
    {
        title: 'Convolutional Neural Networks',
        content: `<h3>Why convolutions</h3><p>Local connectivity + weight sharing beat full dense layers on images.</p><h3>Hyperparameters</h3><p>Kernel, stride, padding; receptive field grows with depth.</p><h3>Pooling & GAP</h3><p>Max/avg pool; <strong>global average pooling</strong> shrinks FC heads.</p><h3>BatchNorm</h3><p>Batch stats in train; <strong>running</strong> stats in eval—toggle <code>model.eval()</code>.</p><h3>Milestones</h3><p>LeNet → AlexNet/ReLU → VGG 3×3 stacks → Inception multi-branch.</p>`,
        keyPoints: ['3×3 conv shares 9 weights across spatial locations', 'BN behavior differs train vs eval', 'Depthwise separable blocks cut params for mobile'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Neural Network Fundamentals for Vision' }, { level: 'level2', index: 0, label: 'Residual Networks and Skip Connections' }],
        resources: [{ title: 'D2L — CNNs', url: 'https://d2l.ai/chapter_convolutional-neural-networks/' }, { title: 'BatchNorm paper', url: 'https://arxiv.org/abs/1502.03167' }]
    },
    {
        title: 'Training and Evaluation Protocols',
        content: `<h3>Splits</h3><p>Train / val / test—no hyperparameter tuning on test.</p><h3>Metrics</h3><p>Accuracy, precision, recall, F1, macro/micro; confusion matrices.</p><h3>Imbalance</h3><p>Accuracy alone misleads—report per-class and PR curves.</p><h3>Schedules</h3><p>Step decay, cosine, warm-up; early stopping on val metric.</p><h3>Tracking</h3><p>Log configs, seeds, curves—reproducibility.</p>`,
        keyPoints: ['Test set touched once at the end', 'F1 and AUC matter under imbalance', 'Cosine + warmup is common for large vision training'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Neural Network Fundamentals for Vision' }, { level: 'level1', index: 4, label: 'Image Preprocessing and Augmentation' }, { level: 'level2', index: 1, label: 'Transfer Learning and Fine-Tuning' }],
        resources: [{ title: 'scikit-learn metrics', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' }]
    }
]);
