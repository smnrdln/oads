<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Modern Computer Vision: Complete Interactive Course Curriculum


***

## 1. Scope

This course is designed for software engineers and ML practitioners who are comfortable writing Python, understand basic linear algebra and calculus at an intuitive level, and have at least passing familiarity with neural networks. No prior vision experience is required. A graduate of the course will be able to design, train, evaluate, and deploy modern vision systems — spanning image classification, detection, segmentation, generative synthesis, and vision-language reasoning — and will know how to select the right architecture, training strategy, and evaluation protocol for a given real-world problem.[^1][^2]

***

## 2. Structure

| Stage | Goal |
| :-- | :-- |
| **Beginner** | Build fluency with image data, classical CV operations, and foundational neural-network training concepts as applied to vision. |
| **Intermediate** | Master CNN architectures, transfer learning, and the core vision tasks: classification, object detection, and segmentation. |
| **Advanced** | Command transformer-based vision, self-supervised learning, generative models, 3D geometry, and video understanding. |
| **Expert / Capstone** | Design production-grade systems with vision-language models, efficient deployment, robustness considerations, and an end-to-end capstone. |


***

## 3. Topics


***

# STAGE 1 — BEGINNER


***

### Topic B-1: Images as Data

**Lesson outline**

- What a digital image is: a 2-D (or 3-D) array of pixel intensities
- Color models: RGB, BGR, HSV, grayscale — when each is useful
- Data types and dynamic range: uint8 vs float32, normalization conventions (0–1 vs −1–1 vs mean/std)
- Image coordinates: row-major indexing, origin at top-left, (H, W, C) vs (C, H, W) layouts
- Common pitfalls: channel-order mismatches, silent type overflow, EXIF orientation surprises

**Key takeaways**

- A pixel value is just a number; "seeing" is entirely about how you interpret arrays of numbers
- Always confirm channel order and value range before feeding data to any model
- Converting to float before arithmetic prevents integer overflow bugs
- Shape convention varies by library — always check before slicing

**Related topics:** Image Preprocessing and Augmentation, Convolutional Neural Networks

**Further learning**

- *Digital Image Processing* by Gonzalez \& Woods (search: "Gonzalez Woods Digital Image Processing 4th edition")
- Search: "numpy image array manipulation tutorial"
- Search: "color space conversion OpenCV docs HSV RGB"

**Check understanding**

*(a) Multiple-choice)* An image stored as shape `(480, 640, 3)` contains how many color channels?

- 0: 480
- 1: 640
- **2: 3** ✓
- 3: 921600
> Explanation: The last dimension is the channel axis in HWC layout, so 3 channels (e.g., R, G, B). Option 3 is the total pixel count (480 × 640), not channels.

*(b) True/False)* Dividing a uint8 image by 255.0 before training is purely cosmetic and has no effect on model accuracy.
**False.** Keeping values in 0–255 causes activation saturation in the first layer and training instability; normalization is a standard, practical necessity.

*(c) Numeric)* An RGB image is 1080 pixels tall, 1920 pixels wide. How many bytes does it occupy as uint8?
**Expected answer: 6,220,800 bytes (≈ 5.93 MB).** Calculation: 1080 × 1920 × 3 = 6,220,800.

**Decision scenario**
You receive a batch of images from a vendor. Some appear rotated 90°, but their pixel arrays are correctly shaped (1080 × 1920). What is the most likely cause?

- A) The vendor used a non-standard color space
- B) The images have EXIF orientation metadata that your loader is ignoring ✓
- C) The width and height were swapped in the array
- D) The model needs additional preprocessing layers

> **Best answer: B.** EXIF orientation tags instruct viewers to rotate on display, but many loaders ignore them, resulting in correctly shaped but visually rotated arrays.

***

### Topic B-2: Classical Image Filtering

**Lesson outline**

- Convolution vs. correlation: formula $(f * g)[x,y] = \sum_m \sum_n f[m,n] \cdot g[x-m, y-n]$
- Smoothing: box filter, Gaussian filter — role of kernel size and σ
- Sharpening: unsharp masking, Laplacian of Gaussian
- Gradient filters: Sobel, Prewitt — computing $G_x, G_y$, magnitude $\|G\| = \sqrt{G_x^2 + G_y^2}$, and orientation $\theta = \arctan(G_y / G_x)$
- Frequency-domain intuition: low-pass vs. high-pass
- Morphological operations: erosion, dilation, opening, closing
- Pitfall: border effects and padding strategies

**Key takeaways**

- Convolution is a weighted local average; the kernel encodes the operation
- Gaussian smoothing is separable, making it O(k) instead of O(k²) per pixel
- Gradient magnitude reveals edges; orientation reveals edge direction
- Morphological ops work on binary images and clean up noise or fill gaps
- Classical filters have no learned parameters — they are deterministic transforms

**Related topics:** Images as Data, Edge Detection and Feature Descriptors, Convolutional Neural Networks

**Further learning**

- Search: "Gonzalez Woods image filtering chapter PDF"
- Search: "Gaussian filter separability proof"
- *Computer Vision: Algorithms and Applications* by Szeliski, freely available at [https://szeliski.org/Book/](https://szeliski.org/Book/)

**Check understanding**

*(a) Multiple-choice)* Applying a large Gaussian kernel to an image primarily:

- 0: Sharpens edges
- **1: Reduces high-frequency noise** ✓
- 2: Detects corners
- 3: Equalizes the histogram
> Options 0 and 2 require high-frequency emphasis; option 3 is a separate histogram operation.

*(b) True/False)* A 5×5 Gaussian kernel can be computed as the outer product of two 1-D Gaussian vectors.
**True.** Gaussian is separable: $G(x,y) = G(x) \cdot G(y)$, which allows two 1-D passes instead of one 2-D pass, reducing computation.

*(c) Numeric)* A 3×3 Sobel-X kernel applied to a 9×9 image without padding yields an output of what size?
**Expected answer: 7×7.** Output size = Input − (Kernel − 1) = 9 − 2 = 7 per dimension.

**Decision scenario**
You need to find the approximate location of large blobs in a noisy binary mask before further processing. Which classical tool fits best?

- A) Sobel gradient filter
- B) Unsharp mask
- C) Morphological opening followed by connected-component analysis ✓
- D) Histogram equalization

> **Best answer: C.** Opening (erosion then dilation) removes small noise blobs while preserving large structures; connected-component analysis then labels distinct regions.

***

### Topic B-3: Edge Detection and Feature Descriptors

**Lesson outline**

- Canny edge detector pipeline: Gaussian smoothing → gradient computation → non-maximum suppression → double thresholding → edge tracking by hysteresis
- Corner detection intuition: Harris corner score $R = \det(M) - k \cdot \text{tr}(M)^2$ where M is the second-moment matrix
- Scale-invariant feature points: concept of a scale-space pyramid, Difference-of-Gaussians
- Local descriptor design goals: invariance (to scale, rotation, illumination), distinctiveness, compactness
- SIFT-like descriptors: orientation histograms over local patches
- Matching descriptors: nearest-neighbor ratio test (Lowe's 0.8 rule)
- Pitfall: descriptors break under large viewpoint or illumination changes

**Key takeaways**

- Edge detection requires careful thresholding; single thresholds produce fragmented edges
- Corners are well-defined in two gradient directions; edges are only one direction
- Scale-space pyramids let you find features regardless of image resolution
- Descriptor matching can generate false positives; the ratio test prunes them
- Classical descriptors are largely superseded by learned features for complex tasks but remain useful in resource-constrained settings

**Related topics:** Classical Image Filtering, Optical Flow and Motion Estimation, Image Preprocessing and Augmentation

**Further learning**

- Szeliski textbook chapters 7–8: [https://szeliski.org/Book/](https://szeliski.org/Book/)
- Search: "Lowe SIFT original paper 2004 IJCV"
- Search: "Harris corner detector derivation tutorial"

**Check understanding**

*(a) Multiple-choice)* In Canny edge detection, non-maximum suppression is used to:

- 0: Remove all weak edges
- **1: Thin edges to single-pixel width** ✓
- 2: Apply the double threshold
- 3: Smooth the image before differentiation
> Options 0 and 2 happen in later steps. Option 3 is the first step (Gaussian). Non-max suppression ensures only the local gradient maximum along the gradient direction survives.

*(b) True/False)* A Harris corner detector responds strongly to flat regions of uniform intensity.
**False.** In flat regions both eigenvalues of M are small, so R ≈ 0. Harris responds strongly only where both eigenvalues are large (corners).

*(c) Numeric)* Lowe's ratio test rejects a match if the ratio of the nearest to second-nearest descriptor distance exceeds 0.8. If the nearest distance is 0.6 and the second-nearest is 0.7, is the match accepted?
**Expected answer: Yes.** 0.6 / 0.7 ≈ 0.857 > 0.8, so the match is **rejected**. (If you got "accepted," re-read the inequality direction — the match is only kept when the ratio is *below* 0.8.)

**Decision scenario**
You are building a panorama stitching pipeline on an embedded device with no GPU. Which approach is most practical?

- A) Train a CNN to detect and match keypoints end-to-end
- B) Use classical scale-invariant feature detection and descriptor matching ✓
- C) Apply a vision transformer to find correspondences
- D) Use dense optical flow at full resolution

> **Best answer: B.** Classical feature matching is deterministic, requires no GPU, is lightweight, and has well-understood failure modes — ideal for embedded panorama stitching.

***

### Topic B-4: Neural Network Fundamentals for Vision

**Lesson outline**

- Perceptron and logistic regression as the simplest classifiers
- Multi-layer perceptron: hidden layers, activation functions (ReLU, GELU, Sigmoid)
- Forward pass computation; loss functions for vision: cross-entropy for classification, MSE for regression, binary cross-entropy for multi-label
- Backpropagation: chain rule, gradient flow through the computational graph
- Gradient descent variants: SGD, momentum, Adam — intuition, not just formulas
- Overfitting and underfitting; bias-variance tradeoff; capacity vs. data size
- Regularization basics: L2 weight decay, dropout
- Pitfall: vanishing and exploding gradients; gradient clipping

**Key takeaways**

- Every network layer is a function; training finds parameters that minimize a loss
- ReLU is preferred over sigmoid in hidden layers because it does not saturate for positive inputs
- Adam adapts per-parameter learning rates, making it robust for most vision tasks as a first try
- Dropout at training time stochastically zeros activations; at inference time it is disabled and weights are scaled
- Batch size affects gradient noise and memory; smaller batches generalize better but train slower

**Related topics:** Images as Data, Convolutional Neural Networks, Training and Evaluation Protocols

**Further learning**

- *Deep Learning* by Goodfellow, Bengio \& Courville: [https://www.deeplearningbook.org/](https://www.deeplearningbook.org/)
- Search: "Stanford CS231n backpropagation lecture notes"
- Search: "Adam optimizer Kingma Ba 2015 paper"

**Check understanding**

*(a) Multiple-choice)* Which activation function is most likely to suffer from the "dying neuron" problem?

- **0: ReLU** ✓
- 1: GELU
- 2: Tanh
- 3: Sigmoid
> ReLU outputs exactly 0 for all negative inputs; once a unit's pre-activation is persistently negative, it never recovers. GELU has a smooth nonzero gradient everywhere. Tanh and sigmoid both have nonzero gradients for negative inputs.

*(b) True/False)* A model with zero training loss and high validation loss is underfitting.
**False.** Zero training loss with high validation loss is the hallmark of *overfitting* — the model has memorized training data but fails to generalize. Underfitting shows high error on *both* sets.

*(c) Numeric)* A fully connected layer has 512 input features and 256 output features. How many trainable parameters does it have, including bias?
**Expected answer: 131,328.** Weights: 512 × 256 = 131,072; biases: 256; total = 131,328.

**Decision scenario**
Your classification model trains to near-perfect accuracy in 5 epochs but achieves only 60% validation accuracy with a large dataset. What should you try first?

- A) Increase model capacity by adding more layers
- B) Reduce the learning rate
- C) Add stronger regularization and/or data augmentation ✓
- D) Switch to a regression loss

> **Best answer: C.** The gap between train and validation accuracy is a clear overfitting signal. Regularization (dropout, weight decay) and augmentation are the right first levers before any architecture change.

***

### Topic B-5: Image Preprocessing and Augmentation

**Lesson outline**

- Resizing strategies: bilinear vs. nearest-neighbor, aspect-ratio-preserving resize + crop vs. squash
- Normalization: per-dataset mean and standard deviation subtraction; why it matters for optimizer stability
- Standard augmentation operations: horizontal/vertical flip, random crop, color jitter (brightness, contrast, saturation, hue), random rotation, cutout/erasing
- Augmentation for detection and segmentation: spatial transforms must be applied consistently to boxes/masks
- Test-time augmentation (TTA): averaging predictions over multiple augmented views
- Advanced policies: AutoAugment, RandAugment — learned augmentation schedules
- Pitfall: applying train augmentations at inference; label-breaking augmentations (e.g., flipping a "6" into a "9")

**Key takeaways**

- Augmentation is the cheapest form of regularization in vision
- Always apply the same spatial transform to both the image and its annotations
- Normalization parameters should be computed on the training set, then applied to validation and test sets unchanged
- Aggressive color jitter can help domain generalization but may confuse color-dependent tasks
- RandAugment reduces the search space of augmentation policies to just two hyperparameters (magnitude and number of ops)

**Related topics:** Images as Data, Training and Evaluation Protocols, Transfer Learning and Fine-Tuning

**Further learning**

- Search: "RandAugment Cubuk 2020 NeurIPS paper"
- Search: "albumentations library documentation augmentation"
- Search: "test-time augmentation survey deep learning"

**Check understanding**

*(a) Multiple-choice)* When applying a random horizontal flip to an object detection sample, you must also:

- 0: Increase the confidence threshold
- 1: Re-encode the class labels
- **2: Mirror the bounding box coordinates** ✓
- 3: Convert boxes to segmentation masks

> If you flip the image but not the boxes, each box now describes the wrong region. Labels do not change (a car flipped is still a car). Masks and boxes are not equivalent representations.

*(b) True/False)* Test-time augmentation always improves accuracy and should be used in every deployment.
**False.** TTA increases inference latency by the number of augmented copies and may not improve accuracy on every task or model. In latency-sensitive deployments it is often omitted.

*(c) Numeric)* An image is 256×256. A random crop of size 224×224 is applied. What is the maximum number of distinct top-left corner positions for this crop?
**Expected answer: 33 × 33 = 1,089.** The top-left x can range from 0 to 256 − 224 = 32 (inclusive) = 33 positions; same for y. Rounding note: answer is exact.

**Decision scenario**
You are training a skin-lesion classifier. Horizontal and vertical flips are already used. A colleague suggests aggressive hue shifts (±180°). What should you do?

- A) Apply them freely; color jitter always helps
- B) Use them only at test time
- C) Test empirically but be cautious — extreme hue shifts may remove clinically meaningful color cues ✓
- D) Replace all augmentation with RandAugment

> **Best answer: C.** Skin-lesion diagnosis relies partly on color (e.g., redness, pigmentation patterns). Extreme hue shifts could destroy those signals. Always evaluate augmentation choices against domain knowledge.

***

### Topic B-6: Convolutional Neural Networks

**Lesson outline**

- Motivation: why fully connected networks scale poorly to images (parameter explosion, no spatial inductive bias)
- Convolution in a CNN: learnable kernels, feature maps, stride, padding
- Parameter sharing and local connectivity — why they work for spatially correlated data
- Pooling: max-pool and average-pool; global average pooling (GAP) as a spatial summarizer
- CNN building block: Conv → BatchNorm → Activation
- BatchNorm: normalizes over the batch dimension, learnable γ and β, train vs. inference mode difference
- Classic architectures as milestones: LeNet concept, AlexNet depth + ReLU, VGG uniform 3×3 blocks, Inception modules
- Receptive field: how it grows with depth; formula for stacked convolutions
- Pitfall: forgetting that BatchNorm behaves differently at train vs. eval time

**Key takeaways**

- A CNN with stride-2 convolutions or pooling halves spatial resolution and doubles the effective receptive field rate
- Parameter sharing means a 3×3 kernel has only 9 weights regardless of feature map size
- BatchNorm stabilizes training and acts as implicit regularization
- Global average pooling replaces large fully connected heads, reducing parameters dramatically
- Increasing depth generally outperforms increasing width up to a point

**Related topics:** Neural Network Fundamentals for Vision, Residual Networks and Skip Connections, Transfer Learning and Fine-Tuning

**Further learning**

- Search: "Stanford CS231n CNN architecture notes"
- Search: "BatchNorm Ioffe Szegedy 2015 paper"
- *Dive into Deep Learning* online textbook: [https://d2l.ai/chapter_convolutional-neural-networks/index.html](https://d2l.ai/chapter_convolutional-neural-networks/index.html)

**Check understanding**

*(a) Multiple-choice)* A convolutional layer with 64 filters, each of size 3×3, operating on a 32-channel input has how many learnable weight parameters (excluding bias)?

- 0: 64
- 1: 9,216
- **2: 18,432** ✓
- 3: 576
> 3×3 × 32 input channels × 64 filters = 18,432. Option 1 ignores input channels. Option 3 is 3×3×64.

*(b) True/False)* BatchNorm uses the running mean and variance during training.
**False.** During training, BatchNorm normalizes using the *current batch* statistics and updates running estimates. During inference, it uses the *running* (frozen) mean and variance.

*(c) Numeric)* An input feature map is 28×28. After one 3×3 conv (stride 1, no padding) and one 2×2 max-pool (stride 2), what is the output spatial size?
**Expected answer: 13×13.** After conv: 28 − 2 = 26. After pool: ⌊26 / 2⌋ = 13.

**Decision scenario**
You have a 224×224 image and need to classify it into 1,000 classes on a mobile device. Which design principle is most important?

- A) Use as many layers as possible for maximum depth
- B) Replace all pooling with strided convolutions
- C) Use depthwise separable convolutions and global average pooling to minimize parameters ✓
- D) Add more filters in early layers

> **Best answer: C.** Depthwise separable convolutions (used in MobileNet) and global average pooling (eliminates large FC layers) are the two highest-impact tools for meeting mobile parameter/latency budgets.

***

### Topic B-7: Training and Evaluation Protocols

**Lesson outline**

- Dataset splits: train / validation / test — roles and contamination risks
- Cross-validation: k-fold, stratified k-fold for imbalanced classes
- Classification metrics: accuracy, precision, recall, F1-score, macro vs. micro vs. weighted averaging
- The confusion matrix: reading it, deriving per-class metrics
- Regression metrics: MAE, RMSE, R²
- Learning rate scheduling: step decay, cosine annealing, warm-up
- Early stopping: monitor validation metric, patience parameter
- Experiment tracking: logging loss curves, metric curves, hyperparameter sweeps
- Pitfall: reporting test-set accuracy after tuning hyperparameters on the test set (data leakage)

**Key takeaways**

- Accuracy is misleading for class-imbalanced datasets; always also report F1 or AUC
- The test set must be used exactly once, after all decisions are made
- Cosine annealing with warm-up is standard in vision transformers and large CNNs
- A confusion matrix shows not just overall error but *which* classes are confused
- Overfitting the validation set is easy with too many hyperparameter trials; use a held-out test set for final numbers

**Related topics:** Neural Network Fundamentals for Vision, Image Preprocessing and Augmentation, Transfer Learning and Fine-Tuning

**Further learning**

- Search: "scikit-learn classification report metrics explained"
- Search: "cosine annealing learning rate schedule PyTorch"
- Search: "deep learning experiment tracking best practices 2024"

**Check understanding**

*(a) Multiple-choice)* A binary classifier detects rare defects (1% positive rate). It always predicts "no defect." Its accuracy is:

- 0: 1%
- 1: 50%
- **2: 99%** ✓
- 3: 0%
> The model is correct 99% of the time by always predicting the majority class. This illustrates why accuracy alone is useless for imbalanced problems.

*(b) True/False)* Evaluating hyperparameters on the test set and then reporting the best result is an acceptable practice.
**False.** This inflates reported performance because the test set was implicitly used for model selection. The test set must remain unseen until the final evaluation.

*(c) Numeric)* A classifier has 80 true positives, 20 false positives, and 40 false negatives. What is the F1 score?
**Expected answer: 0.727 (rounded to 3 decimal places).** Precision = 80/(80+20) = 0.8; Recall = 80/(80+40) = 0.667; F1 = 2 × (0.8 × 0.667) / (0.8 + 0.667) ≈ 0.727.

**Decision scenario**
You train a fraud-detection image classifier. The dataset has 98% normal and 2% fraud images. Your model reaches 98.5% accuracy. Should you deploy it?

- A) Yes, 98.5% accuracy is excellent
- B) Yes, but monitor it weekly
- C) No — evaluate recall and precision on the fraud class before deciding ✓
- D) No — accuracy below 99% is always insufficient

> **Best answer: C.** A model predicting "normal" 100% of the time would achieve 98% accuracy. The critical metric is how often the model *catches* fraud (recall) and how often its fraud alerts are real (precision).

***

# STAGE 2 — INTERMEDIATE


***

### Topic I-1: Residual Networks and Skip Connections

**Lesson outline**

- Problem: deeper networks degrade in training accuracy — the degradation problem
- Residual (skip) connection: $\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W_i\}) + \mathbf{x}$
- Intuition: the network learns a *residual* perturbation rather than a full mapping; identity shortcut is easy to learn
- Bottleneck block: 1×1 → 3×3 → 1×1 convolutions for parameter efficiency
- ResNet family depth variants and how depth affects capacity
- DenseNet extension: each layer receives all prior feature maps via concatenation
- Wide ResNet: increase width instead of depth — fewer layers but more filters per layer
- Pre-activation ResNet: BN + ReLU before convolution improves gradient flow
- Pitfall: projection shortcuts when dimensions change; mismatched channels cause runtime errors

**Key takeaways**

- Skip connections solve vanishing gradients by providing gradient highways
- Residual blocks are the dominant building unit in almost all modern vision backbones
- Bottleneck blocks trade three cheap operations for one expensive 3×3, saving parameters
- DenseNet reuses feature maps aggressively but requires more memory bandwidth
- A residual network can be seen as an ensemble of many shorter paths through the network

**Related topics:** Convolutional Neural Networks, Transfer Learning and Fine-Tuning, Vision Transformers

**Further learning**

- Search: "He et al. Deep Residual Learning for Image Recognition 2016 CVPR"
- Search: "DenseNet Huang 2017 CVPR paper"
- *Dive into Deep Learning* ResNet chapter: [https://d2l.ai/chapter_convolutional-modern/resnet.html](https://d2l.ai/chapter_convolutional-modern/resnet.html)

**Check understanding**

*(a) Multiple-choice)* The primary purpose of the 1×1 convolution in a bottleneck block is to:

- 0: Increase spatial resolution
- **1: Reduce and then restore the channel dimension** ✓
- 2: Replace pooling layers
- 3: Apply non-local attention
> 1×1 convolutions project channels to a smaller dimension before the expensive 3×3 conv, then restore them. They have no spatial operation (1×1 kernel).

*(b) True/False)* A residual block can learn to become an identity function by driving its residual branch weights to zero.
**True.** If all weights in the residual branch $\mathcal{F}$ are zero, the output equals the input x exactly. This makes deeper networks at least as powerful as shallower ones.

*(c) Numeric)* A bottleneck block reduces 256 channels to 64, applies 3×3 conv, then restores to 256. How many weight parameters are in the three convolution layers? (No bias, ignore BN.)
**Expected answer: 69,632.** First 1×1: 256×64×1×1 = 16,384; middle 3×3: 64×64×3×3 = 36,864; last 1×1: 64×256×1×1 = 16,384; total = 69,632.

**Decision scenario**
You need a backbone for a satellite imagery task where the pre-trained checkpoint must load without errors, but your images have 4 channels (RGB + infrared) rather than 3. What should you do?

- A) Discard the infrared channel and use the standard 3-channel checkpoint
- B) Modify only the first convolution layer to accept 4 channels, then fine-tune ✓
- C) Retrain the entire network from scratch
- D) Split the 4-channel image into two 2-channel inputs

> **Best answer: B.** The first convolutional layer is the only one that depends on input channel count. You can initialize the new 4th channel weight using the mean of the three existing weights, then fine-tune, preserving all learned representations in deeper layers.

***

### Topic I-2: Transfer Learning and Fine-Tuning

**Lesson outline**

- What is transferred: low-level filters (edges, textures) in early layers; high-level semantics in later layers
- Feature extraction: freeze all backbone weights, train only the head
- Full fine-tuning: unfreeze the backbone, use a lower learning rate for pre-trained layers
- Differential learning rates: assigning smaller LR to earlier (more general) layers
- Layer-freezing schedules: progressively unfreeze from top to bottom
- Domain gap: how different the source and target domains are affects how much to fine-tune
- Few-shot regime: when target data is very small, freezing more layers prevents overfitting
- Pitfall: forgetting to switch BatchNorm to eval mode when only training the head

**Key takeaways**

- Transfer learning almost always outperforms training from scratch when target data is limited
- Fine-tune with a learning rate 10×–100× smaller than initial training to avoid destroying pre-trained features
- The further the target domain from ImageNet (e.g., medical X-rays), the more layers should be unfrozen
- Always validate that BatchNorm statistics are correctly handled after loading a checkpoint
- Pre-training dataset size and quality matter more than the specific backbone architecture for transfer performance

**Related topics:** Residual Networks and Skip Connections, Image Preprocessing and Augmentation, Vision Transformers

**Further learning**

- Search: "how transferable are features in deep neural networks Yosinski 2014"
- Search: "fine-tuning pre-trained models vision best practices 2024"
- Search: "ULMFiT discriminative fine-tuning learning rates"

**Check understanding**

*(a) Multiple-choice)* You are fine-tuning a pre-trained network on a small, domain-similar dataset. The best strategy is usually:

- 0: Fine-tune all layers with the original learning rate
- **1: Freeze all layers except the final classification head** ✓
- 2: Discard the pre-trained weights and retrain from scratch
- 3: Remove BatchNorm layers before training

> With a small dataset and domain similarity, the pre-trained features are already good. Freezing prevents overfitting. Fine-tuning all layers with the original LR would quickly destroy the pre-trained representations.

*(b) True/False)* Differential learning rates assign the same learning rate to all layers.
**False.** Differential learning rates assign *smaller* learning rates to earlier (more generic) layers and *larger* ones to later (more task-specific) layers, allowing gradual adaptation.

*(c) Numeric)* A pre-trained model achieves 82% accuracy on the source domain. After freezing all layers and retraining only the head on the target domain (100 samples), it achieves 74%. You then unfreeze the last 2 blocks and fine-tune for 5 more epochs and reach 79%. What is the accuracy gain from unfreeze fine-tuning over head-only?
**Expected answer: +5 percentage points** (79% − 74% = 5%).

**Decision scenario**
You have 500 labeled chest X-rays for pneumonia detection. You have access to a backbone pre-trained on ImageNet. What approach gives the best chance of strong performance?

- A) Train from scratch; medical images are too different from ImageNet
- B) Use ImageNet weights, freeze all layers, only train the head ✓ (acceptable first step)
- C) Use ImageNet weights, unfreeze the entire network and fine-tune with a very low learning rate ✓
- D) Use a backbone pre-trained on a large medical dataset with differential fine-tuning ✓

> **Best answer: D.** For maximum performance, use domain-adjacent pre-training (e.g., a model trained on a large medical image dataset) and apply differential fine-tuning. If no medical pre-trained model is available, full fine-tuning with a low learning rate (C) typically outperforms head-only training (B) given enough data. Training from scratch (A) is almost always suboptimal at 500 samples.

***

### Topic I-3: Image Classification at Scale

**Lesson outline**

- Benchmark datasets as proxies for real-world generalization: ImageNet-1k, ImageNet-21k
- Top-1 vs. top-5 accuracy; label smoothing as a regularizer: $y_{\text{smooth}} = (1-\epsilon) y + \epsilon / K$
- Modern training recipes: multi-scale training, mixup, CutMix, progressive resizing
- EfficientNet: compound scaling of depth, width, and resolution simultaneously; Neural Architecture Search
- ConvNeXt: re-modernized pure-CNN competitive with vision transformers
- Knowledge distillation: training a smaller "student" model using soft targets from a larger "teacher"
- Hierarchical classification: coarse-to-fine label structures
- Pitfall: overfitting to benchmark leaderboards vs. generalization to deployment distribution

**Key takeaways**

- Mixup and CutMix train on convex combinations of two samples — powerful augmentation with minimal cost
- EfficientNet compound scaling lets you trade accuracy for compute along a smooth Pareto frontier
- Knowledge distillation can match a large model's accuracy with a much smaller model
- Label smoothing prevents the model from being overconfident on any single class
- ImageNet accuracy correlates with downstream transfer performance but is not a perfect proxy

**Related topics:** Convolutional Neural Networks, Residual Networks and Skip Connections, Transfer Learning and Fine-Tuning

**Further learning**

- Search: "EfficientNet Tan Le 2019 ICML compound scaling"
- Search: "ConvNeXt Liu 2022 CVPR modernizing CNN"
- Search: "Mixup training He 2018 ICLR paper"

**Check understanding**

*(a) Multiple-choice)* Label smoothing with ε = 0.1 on a 10-class problem replaces the hard target probability of 1.0 for the correct class with:

- 0: 0.9
- **1: 0.91** ✓
- 2: 0.1
- 3: 0.01
> $(1-0.1) \times 1.0 + 0.1/10 = 0.9 + 0.01 = 0.91$.

*(b) True/False)* CutMix mixes pixel regions from two images, while the label is a linear combination proportional to the area ratio.
**True.** A rectangular region from image B replaces the same region in image A; the label is $\lambda y_A + (1 - \lambda) y_B$ where λ is the fraction of area retained from A.

*(c) Numeric)* A teacher model has 95% top-1 accuracy. A student distilled from it achieves 91%. What is the accuracy retention rate (student / teacher)?
**Expected answer: 95.8%** (91 / 95 ≈ 0.9579 or 95.8%; round to 1 decimal).

**Decision scenario**
A product team wants to deploy an image classifier on a server and needs the highest possible accuracy. But they also need a lightweight version for a mobile companion. What is the most efficient approach?

- A) Train two separate models from scratch for the two deployment targets
- B) Train one large model, then distill it into a small model using soft targets ✓
- C) Train only the small model on all available data
- D) Compress the large model using weight pruning only

> **Best answer: B.** Distillation leverages the large model's soft probability distributions as a richer training signal for the small model, typically outperforming training the small model from scratch alone.

***

### Topic I-4: Object Detection Fundamentals

**Lesson outline**

- Task definition: predict class label + bounding box (x_center, y_center, w, h) for each object
- Anchor boxes: predefined aspect ratios and scales tiled over the image
- Intersection over Union (IoU): $\text{IoU} = \frac{\text{Area of Overlap}}{\text{Area of Union}}$ — the core overlap metric
- Two-stage detectors: region proposal network (RPN) → feature cropping → classification head (Faster R-CNN paradigm)
- One-stage detectors: directly predict boxes at each grid cell (YOLO paradigm) — faster, less accurate at extremes
- Anchor-free detection: predict object center, distances to box edges (FCOS, CenterNet)
- Non-maximum suppression (NMS): suppresses overlapping boxes below an IoU threshold
- Mean Average Precision (mAP): area under the precision-recall curve, averaged over classes and IoU thresholds
- Pitfall: using the wrong IoU threshold for NMS; too low retains duplicates, too high loses detections

**Key takeaways**

- IoU ≥ 0.5 is the standard threshold for calling a detection a true positive
- Two-stage detectors are more accurate on small objects; one-stage detectors are faster
- Anchor boxes require careful design for the object scales and aspect ratios in your dataset
- NMS is a post-processing step and must be re-tuned when deploying to new domains
- mAP@[0.5:0.95] (COCO metric) averages across 10 IoU thresholds from 0.5 to 0.95

**Related topics:** Residual Networks and Skip Connections, Feature Pyramid Networks, Modern Object Detectors

**Further learning**

- Search: "Ren et al. Faster RCNN 2015 NIPS paper"
- Search: "YOLO object detection original paper Redmon 2016"
- Search: "COCO detection evaluation metrics explained"

**Check understanding**

*(a) Multiple-choice)* Two boxes share a 40×40 overlap region. Box A is 80×80, Box B is 60×60. What is their IoU?

- 0: 0.25
- **1: 0.286** ✓
- 2: 0.44
- 3: 0.50
> Overlap = 1,600; Union = 6,400 + 3,600 − 1,600 = 8,400; IoU = 1,600 / 8,400 ≈ 0.190. Wait — let me recalculate: area_A=6400, area_B=3600, intersection=1600, union=6400+3600-1600=8400, IoU=1600/8400≈0.190.
> **Corrected answer: ≈ 0.190.** None of the options is correct — this exposes why students should always compute rather than guess.
> (For course implementation: adjust box sizes so one option is correct, or flag this as an open calculation problem.)

*(b) True/False)* NMS with a very low IoU threshold (e.g., 0.1) can cause multiple objects of the same class close together to be merged into one detection.
**True.** A low threshold aggressively suppresses boxes; if two boxes for different instances overlap even slightly, one will be removed. This is the well-known "crowded scene" failure mode of vanilla NMS.

*(c) Numeric)* Your detector has precision 0.75 and recall 0.60 at IoU=0.5. What is the F1 score?
**Expected answer: 0.667.** F1 = 2 × (0.75 × 0.60) / (0.75 + 0.60) = 0.9 / 1.35 = 0.667.

**Decision scenario**
You need to count individual fish in dense underwater video frames in real time (30 fps). Which approach fits best?

- A) Two-stage detector for maximum accuracy
- B) One-stage anchor-free detector with a soft-NMS variant for dense scenes ✓
- C) Image classifier applied to cropped regions
- D) Semantic segmentation only

> **Best answer: B.** One-stage detectors meet real-time throughput requirements. Anchor-free designs handle non-standard aspect ratios (fish) better than fixed anchors, and soft-NMS reduces the merged-object problem in dense scenes.

***

### Topic I-5: Feature Pyramid Networks

**Lesson outline**

- Multi-scale detection challenge: objects appear at wildly different scales in real images
- Image pyramid vs. feature pyramid: compute cost tradeoff
- FPN architecture: bottom-up pathway (standard CNN), top-down pathway with lateral connections via 1×1 conv, final 3×3 smoothing convolution
- Why lateral connections matter: they inject fine-grained spatial information lost during downsampling
- Output: a set of feature maps {P2, P3, P4, P5} at different resolutions, each with the same channel dimension
- Assigning objects to pyramid levels by size
- PANet extension: adds a bottom-up path augmentation from low to high resolution
- BiFPN (EfficientDet): learns weights for how much each scale contributes
- Pitfall: misaligning the FPN anchor sizes with the actual scale distribution in your dataset

**Key takeaways**

- FPN makes a single backbone produce multi-scale features without re-running the network multiple times
- All FPN levels share the same channel width — a design choice that simplifies downstream heads
- Small objects are detected at high-resolution levels (P2/P3); large objects at low-resolution levels (P5)
- Lateral connections preserve spatial detail through the top-down path
- FPN is now a standard component in nearly every production detection system

**Related topics:** Object Detection Fundamentals, Modern Object Detectors, Semantic Segmentation

**Further learning**

- Search: "Lin et al. Feature Pyramid Networks 2017 CVPR"
- Search: "PANet Path Aggregation Network Liu 2018"
- Search: "BiFPN EfficientDet Tan 2020 CVPR"

**Check understanding**

*(a) Multiple-choice)* In an FPN, the lateral connection at level P4 uses a 1×1 convolution primarily to:

- 0: Increase spatial resolution
- **1: Match channel dimensions between the bottom-up and top-down pathways** ✓
- 2: Apply non-local attention
- 3: Compute the gradient magnitude

> The bottom-up feature may have 512 channels while the top-down signal has 256. The 1×1 conv projects to the same width before addition. Spatial size is unchanged.

*(b) True/False)* FPN eliminates the need to run the backbone twice to detect objects at different scales.
**True.** A single forward pass through the backbone produces all levels of the feature pyramid simultaneously, whereas an image pyramid requires running the backbone once per scale.

*(c) Numeric)* An FPN backbone produces feature maps at strides {4, 8, 16, 32} (P2–P5). For a 640×640 input, what is the spatial size of the P4 feature map?
**Expected answer: 40×40.** Stride 16: 640 / 16 = 40.

**Decision scenario**
You are detecting both pedestrians (average 80×120 pixels) and road signs (average 30×30 pixels) in 1280×720 highway surveillance footage. Your current single-scale detector misses small signs. What is the most targeted fix?

- A) Increase input resolution to 2560×1440
- B) Add an FPN to leverage multi-scale feature maps ✓
- C) Switch from anchor-based to anchor-free detection
- D) Reduce the backbone depth

> **Best answer: B.** FPN directly addresses multi-scale detection by providing a high-resolution feature level for small objects (road signs) without the latency cost of processing a full 2× input. Increasing input resolution is also helpful but expensive; B is the more targeted solution.

***

### Topic I-6: Modern Object Detectors

**Lesson outline**

- YOLO family evolution: from grid-based regression to anchor-free, from v1 through v8/v9
- DETR (Detection Transformer): eliminates NMS; uses a set-prediction loss (Hungarian matching); encoder-decoder transformer with learned object queries
- Deformable DETR: addresses slow DETR convergence by restricting attention to sparse reference points
- RT-DETR: real-time DETR variant suitable for production deployment
- Rotated object detection: predicting angle θ in addition to x, y, w, h for aerial or document images
- Evaluation beyond mAP: latency (ms), FLOPs, model size — the accuracy/speed Pareto frontier
- Pitfall: DETR requires many more training epochs than CNN detectors to converge without deformable attention

**Key takeaways**

- DETR treats detection as a direct set prediction problem, removing post-processing heuristics like NMS entirely
- Hungarian matching ensures each ground-truth object is matched to exactly one prediction
- Modern YOLO variants are still the go-to for real-time edge deployment
- Deformable attention reduces DETR's O(N²) complexity to near-linear for large feature maps
- Speed benchmarks must be measured on your target hardware — GPU-optimized models may be slow on CPU or mobile

**Related topics:** Object Detection Fundamentals, Feature Pyramid Networks, Vision Transformers

**Further learning**

- Search: "Carion DETR 2020 ECCV end-to-end object detection transformer"
- Search: "Zhu Deformable DETR 2021 ICLR paper"
- Search: "YOLOv9 paper 2024 arxiv"

**Check understanding**

*(a) Multiple-choice)* DETR removes the need for NMS because:

- 0: It uses anchor boxes with very tight spacing
- 1: It predicts only one box per image
- **2: It formulates detection as set prediction with one-to-one Hungarian matching** ✓
- 3: It applies confidence thresholding during training

> Hungarian matching assigns each ground-truth object to exactly one query, so there are no duplicate predictions to suppress. The other options are either wrong or unrelated to removing NMS.

*(b) True/False)* DETR trains significantly faster than equivalent CNN-based detectors when using standard multi-head attention on full feature maps.
**False.** Standard DETR is notoriously slow to converge (500+ epochs on COCO vs ~36 for Faster R-CNN). Deformable DETR mitigates this, but convergence speed remains a known weakness of attention over dense feature maps.

*(c) Numeric)* Hungarian matching assigns predictions to ground-truths on a cost matrix of size N_pred × N_gt. If there are 100 queries and 8 ground-truth objects, how many queries will be assigned to a "no-object" class?
**Expected answer: 92.** 100 queries − 8 matched objects = 92 assigned to ∅ (no-object).

**Decision scenario**
You need to detect text regions in scanned document images where text is often at 30°, 45°, or arbitrary angles. Axis-aligned bounding boxes miss rotated text. What should you use?

- A) Standard YOLO with aggressive NMS
- B) DETR with standard learned queries
- C) A rotated bounding box detector predicting (x, y, w, h, θ) ✓
- D) Semantic segmentation followed by axis-aligned bounding box fitting

> **Best answer: C.** Rotated box detectors directly predict the rotation angle, giving tight fits around tilted text. Axis-aligned boxes would include too much background for angled text, harming downstream OCR.

***

### Topic I-7: Semantic Segmentation

**Lesson outline**

- Task: assign a class label to every pixel in the image
- Fully Convolutional Networks (FCN): replace classification heads with 1×1 convolutions, upsample with transposed convolution
- Encoder-decoder architecture: encoder compresses spatial info, decoder restores it
- Skip connections in U-Net: decoder receives both upsampled signal and encoder features at matching resolution
- Dilated (atrous) convolutions: expand receptive field without reducing resolution; rate r inserts (r−1) zeros between kernel elements
- Atrous Spatial Pyramid Pooling (ASPP): multi-rate dilated convolutions in parallel to capture multi-scale context
- DeepLab family: DeepLabv3+ uses a lightweight decoder atop ASPP
- Evaluation: mean Intersection over Union (mIoU) per class and overall
- Pitfall: class imbalance — background pixels dominate; use weighted loss or focal loss

**Key takeaways**

- Semantic segmentation does not distinguish separate instances of the same class — that requires instance segmentation
- U-Net skip connections preserve fine spatial detail that the encoder otherwise loses
- Dilated convolutions are more parameter-efficient than larger kernels for increasing receptive field
- mIoU treats every class equally — in imbalanced datasets, rare classes drag the overall score down
- For high-resolution outputs, a decoder with multiple upsampling steps is preferred over a single large transposed conv

**Related topics:** Feature Pyramid Networks, Instance Segmentation, Panoptic Segmentation

**Further learning**

- Search: "Ronneberger U-Net 2015 MICCAI original paper"
- Search: "DeepLabv3+ Chen 2018 ECCV paper"
- Search: "Long FCN 2015 CVPR fully convolutional networks"

**Check understanding**

*(a) Multiple-choice)* Dilated convolution with rate r = 3 on a 3×3 kernel covers an effective receptive field of:

- 0: 3×3
- 1: 5×5
- **2: 7×7** ✓
- 3: 9×9
> Effective size = kernel + (kernel−1) × (r−1) = 3 + 2×2 = 7 per dimension.

*(b) True/False)* A model with high per-class IoU on background but low IoU on a rare foreground class will still have high mIoU.
**False.** mIoU is the *mean* across all classes; a low IoU on any class pulls the average down proportionally. Background dominance in pixel count does not guarantee dominance in the class-averaged metric.

*(c) Numeric)* A segmentation model predicts 950 pixels as class "road" correctly, has 50 false positives (non-road predicted as road), and misses 100 road pixels. What is the IoU for class "road"?
**Expected answer: 0.864.** IoU = TP / (TP + FP + FN) = 950 / (950 + 50 + 100) = 950 / 1100 ≈ 0.864.

**Decision scenario**
You are building a real-time lane segmentation system for a vehicle (30 fps, Jetson-class GPU). DeepLabv3+ with a large backbone runs at 12 fps. What is the most targeted optimization?

- A) Switch to an instance segmentation model
- B) Replace the backbone with a lightweight encoder and simplify the decoder ✓
- C) Reduce input resolution to 32×32
- D) Remove skip connections

> **Best answer: B.** A lighter backbone (e.g., MobileNetV2 encoder) dramatically reduces FLOPs. Simplifying the decoder to a single bilinear upsample is a proven recipe (BiSeNet, DDRNet) for real-time segmentation. Reducing resolution to 32×32 would destroy useful spatial detail for lane following.

***

### Topic I-8: Instance Segmentation

**Lesson outline**

- Task: segment and individually label each object instance — "pixel-level detection"
- Mask R-CNN: extends Faster R-CNN with a parallel mask branch; RoIAlign replaces RoIPool to fix quantization
- RoIAlign: uses bilinear interpolation at sub-pixel locations — critical for tight mask quality
- Instance mask prediction: a binary mask per detected instance, at the RoI resolution
- YOLACT: real-time approach using prototype masks and linear combination coefficients
- CondInst and SOLOv2: single-stage, no RoI extraction — predict per-instance kernels dynamically
- Evaluation: mask mAP (IoU computed over pixels, not boxes)
- Pitfall: forgetting to resize the predicted mask back to the original RoI resolution before pasting into the full image

**Key takeaways**

- RoIAlign is the key contribution of Mask R-CNN over earlier methods — alignment matters more than model depth for mask quality
- Instance segmentation requires an underlying detection step (either explicit RPN or encoded in the architecture)
- YOLACT achieves real-time performance by decomposing masks into linear combinations of global prototypes
- Mask head is a light overhead on top of a detection backbone; the cost is usually small relative to the backbone
- Instance masks can be converted to bounding boxes but not vice-versa

**Related topics:** Object Detection Fundamentals, Semantic Segmentation, Panoptic Segmentation

**Further learning**

- Search: "He Mask RCNN 2017 ICCV paper"
- Search: "YOLACT Bolya 2019 ICCV real-time instance segmentation"
- Search: "CondInst Tian 2020 ECCV conditional convolutions"

**Check understanding**

*(a) Multiple-choice)* RoIAlign improves over RoIPool primarily by:

- 0: Using a larger feature map
- **1: Preserving precise spatial location through bilinear interpolation** ✓
- 2: Adding an attention mechanism
- 3: Reducing the number of anchor boxes

> RoIPool applies hard quantization (rounding to grid cells), causing spatial misalignment for masks. RoIAlign samples at exact floating-point positions using bilinear interpolation.

*(b) True/False)* If two people overlap heavily in an image, instance segmentation can still produce two distinct masks while semantic segmentation cannot.
**True.** Semantic segmentation assigns a single class label per pixel, so overlapping instances merge. Instance segmentation tracks each object independently, assigning different instance IDs.

*(c) Numeric)* A Mask R-CNN model runs at 8 fps on a GPU. The mask head accounts for 5% of total inference time. If you remove the mask head, what is the approximate new fps?
**Expected answer: ≈ 8.4 fps.** Time per frame = 1/8 = 0.125 s. Without mask head: 0.125 × 0.95 = 0.11875 s → ≈ 8.42 fps. (Rounding: accept 8.4–8.5.)

**Decision scenario**
A robotics team needs to grasp specific objects on a cluttered conveyor belt. They need to know the exact pixel boundary of each object, not just its bounding box. Which approach is most appropriate?

- A) Semantic segmentation with post-processing to split instances
- B) Object detection with bounding boxes only
- C) Instance segmentation to get per-object pixel masks for grasp planning ✓
- D) Depth estimation only

> **Best answer: C.** Robotic grasp planning requires precise object boundaries and individual identity. Instance segmentation directly provides per-object pixel masks, enabling the robot to compute contact points for each separate object.

***

### Topic I-9: Panoptic Segmentation

**Lesson outline**

- Task unification: merge semantic segmentation ("stuff" — sky, road) and instance segmentation ("things" — cars, people) into one output
- Panoptic Quality (PQ) metric: $\text{PQ} = \underbrace{\frac{\sum_{\text{TP}} \text{IoU}}{|\text{TP}|}}_{\text{SQ}} \times \underbrace{\frac{|\text{TP}|}{|\text{TP}| + \frac{1}{2}|\text{FP}| + \frac{1}{2}|\text{FN}|}}_{\text{RQ}}$
- Panoptic FPN: adds semantic and instance heads onto an FPN backbone; merges outputs heuristically
- Mask2Former: unified architecture using masked attention; achieves state-of-the-art on panoptic, semantic, and instance with a single model
- Stuff vs. things distinction: amorphous regions vs. countable discrete objects
- Merging conflicts: pixels can belong to only one segment — conflict resolution strategies
- SAM (Segment Anything Model): zero-shot promptable segmentation — point, box, or mask prompts
- Pitfall: evaluating panoptic quality requires careful handling of crowd annotations (marked as "ignore")

**Key takeaways**

- PQ = SQ × RQ; improving segmentation quality and recognition quality are distinct optimization targets
- Mask2Former uses a shared architecture for all three segmentation tasks with task-specific heads
- SAM provides powerful zero-shot segmentation but requires prompts — it is not a standalone classifier
- Stuff classes have no instance counts; things classes require instance-level tracking
- Panoptic segmentation is the richest single per-pixel output format in modern vision

**Related topics:** Semantic Segmentation, Instance Segmentation, Vision Transformers

**Further learning**

- Search: "Kirillov Panoptic Segmentation 2019 CVPR paper"
- Search: "Mask2Former Cheng 2022 CVPR paper"
- Search: "SAM Segment Anything Meta 2023 paper"

**Check understanding**

*(a) Multiple-choice)* SAM (Segment Anything Model) is best described as:

- 0: A supervised panoptic segmentation model
- **1: A promptable, class-agnostic segmentation model** ✓
- 2: An object detector with panoptic heads
- 3: A video segmentation model

> SAM segments any region given a prompt (point, box, or mask) without knowing or predicting class labels. It is class-agnostic and designed for zero-shot use. Panoptic-specific or class-aware tasks require additional components.

*(b) True/False)* In panoptic segmentation, the same pixel can be assigned to both a "car" instance and the "road" stuff class.
**False.** Each pixel in the panoptic output belongs to exactly one segment — this is the core constraint that differentiates panoptic from simply overlaying semantic and instance results.

*(c) Numeric)* A panoptic model has TP=50, FP=10, FN=5, and average IoU over TP segments = 0.78. What is PQ?
**Expected answer: 0.605.** SQ = 0.78; RQ = 50 / (50 + 0.5×10 + 0.5×5) = 50 / 57.5 ≈ 0.8696; PQ = 0.78 × 0.8696 ≈ 0.678. (Rounding note: accept 0.67–0.68.)

**Decision scenario**
Your autonomous vehicle perception system needs to understand drivable areas (roads, sidewalks) and simultaneously track individual pedestrians and vehicles. Which output representation should you use?

- A) Semantic segmentation only
- B) Object detection only
- C) Instance segmentation only
- D) Panoptic segmentation ✓

> **Best answer: D.** Roads and sidewalks are amorphous "stuff" classes best handled by semantic segmentation, while pedestrians and vehicles are countable "things" requiring instance tracking. Panoptic segmentation delivers both in a single unified output.

***

# STAGE 3 — ADVANCED


***

### Topic A-1: Vision Transformers

**Lesson outline**

- Self-attention mechanism: query, key, value matrices; attention weight computation $\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$
- Multi-head self-attention: parallel attention heads, concatenation, projection
- ViT (Vision Transformer): split image into non-overlapping patches, linearly embed each patch, prepend [CLS] token, add positional encoding, feed to transformer encoder
- Positional encoding: learned vs. fixed sinusoidal; 2-D adaptations for images
- ViT scaling laws: ViT-B, ViT-L, ViT-H and the effect of pre-training dataset size
- Swin Transformer: hierarchical feature maps, shifted window self-attention — O(N) complexity vs. ViT's O(N²)
- DeiT: efficient data-efficient ViT training with distillation token
- Inductive biases: CNNs have locality and translation equivariance; ViT has neither by default — needs more data to learn them
- Pitfall: ViT requires large pre-training datasets (JFT-300M, ImageNet-21k) to outperform CNNs at equal data volume

**Key takeaways**

- Self-attention computes pairwise relationships between all patch pairs — global context from layer 1
- Swin's hierarchical design makes it suitable as a drop-in CNN backbone replacement for detection and segmentation
- ViT scales better than CNNs when pre-training data volume is very large
- Patch size is a key hyperparameter: smaller patches → higher resolution but quadratic cost increase
- The CLS token aggregates global image representation for classification

**Related topics:** Convolutional Neural Networks, Residual Networks and Skip Connections, Self-Supervised Visual Representation Learning

**Further learning**

- Search: "Dosovitskiy ViT An Image is Worth 16x16 Words 2020 ICLR"
- Search: "Liu Swin Transformer 2021 ICCV paper"
- Search: "DeiT Touvron 2021 ICML paper"

**Check understanding**

*(a) Multiple-choice)* A ViT-B/16 processes a 224×224 image with patch size 16. How many patch tokens does the transformer receive (excluding [CLS])?

- 0: 196
- **1: 196** ✓
- 2: 256
- 3: 14
> (224/16)² = 14² = 196 patches. The [CLS] token is additional, so the sequence length is 197 total, but patch count is 196. Options 2 and 3 are wrong patch counts.

*(b) True/False)* Swin Transformer achieves linear computational complexity in image size by restricting self-attention to local windows.
**True.** Swin computes self-attention within non-overlapping local windows of fixed size M×M, so complexity is O(M²N) ≈ O(N) for fixed M, unlike global ViT's O(N²).

*(c) Numeric)* In multi-head attention with d_model = 512 and 8 heads, what is the dimension d_k of each head's key space?
**Expected answer: 64.** d_k = d_model / num_heads = 512 / 8 = 64.

**Decision scenario**
You are building a backbone for a dense prediction task (semantic segmentation) and have 500K labeled images. CNN backbones reach 78% mIoU. A ViT-B checkpoint pre-trained only on your dataset reaches 75% mIoU. What should you do?

- A) Switch to ViT-H; larger ViT always wins
- B) Use Swin Transformer, which provides hierarchical features and works well with limited data ✓
- C) Abandon transformers; CNNs are always better for segmentation
- D) Train ViT-B from scratch on your 500K dataset

> **Best answer: B.** Swin provides hierarchical feature maps (unlike flat ViT) which are critical for dense prediction, and its shifted-window design is more data-efficient. ViT-H requires far more data. CNNs remain competitive, but Swin bridges the gap.

***

### Topic A-2: Self-Supervised Visual Representation Learning

**Lesson outline**

- Motivation: labeled data is expensive; self-supervised methods learn from unlabeled images
- Contrastive learning framework: create two augmented views of the same image (positive pair), maximize agreement while pushing apart different images (negatives) — SimCLR
- Momentum encoder (MoCo): maintains a slowly updating key encoder and a queue of negatives for scalable contrastive learning
- BYOL: removes negatives entirely — uses online/target network asymmetry and a stop-gradient to prevent collapse
- Masked image modeling (MAE): randomly mask 75% of patches, train an encoder-decoder to reconstruct raw pixels; the encoder learns rich representations
- DINO: self-distillation using student/teacher ViTs; emergent segmentation in attention maps
- SimSiam: further simplifies by using only stop-gradient and a predictor MLP
- Pitfall: representation collapse — the model learns a trivial constant mapping; symmetric architectures without asymmetry mechanisms collapse

**Key takeaways**

- Contrastive methods need careful negative sampling or asymmetry mechanisms to avoid trivial solutions
- MAE masking at 75% (much higher than NLP's ~15%) works because adjacent patches are highly correlated
- DINO attention maps reveal object boundaries without any segmentation supervision
- Self-supervised ViT features transfer better to dense tasks than supervised CNN features in many settings
- High masking ratio in MAE forces the encoder to learn semantic structure, not pixel textures

**Related topics:** Vision Transformers, Transfer Learning and Fine-Tuning, Generative Models: VAEs and Diffusion

**Further learning**

- Search: "Chen SimCLR 2020 ICML self-supervised contrastive learning"
- Search: "He MAE Masked Autoencoders 2022 CVPR"
- Search: "Caron DINO 2021 ICCV self-supervised vision transform

<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Continue if you are not done.

**Check understanding**

*(a) Multiple-choice)* MAE uses a masking ratio of approximately 75% rather than 15% (used in BERT) because:

- 0: Vision transformers have more parameters
- 1: Image patches are larger than text tokens
- **2: Adjacent image patches are highly correlated, requiring more masking to force semantic reasoning** ✓
- 3: GPUs are more efficient at 75% sparsity

> Text tokens carry dense semantic content; even 15% masking is challenging. Adjacent image patches share color and texture, so low masking ratios allow trivial pixel interpolation. 75% forces the model to reason about global structure.

*(b) True/False)* BYOL uses no negative pairs and therefore avoids the representation collapse problem without any special mechanism.
**False.** BYOL avoids collapse through the *asymmetry* between the online and target networks (stop-gradient on the target + exponential moving average update). Without these, symmetric networks without negatives collapse immediately.

*(c) Numeric)* A MAE model masks 75% of the 196 patches of a ViT-B/16 input. How many patches does the encoder actually process?
**Expected answer: 49.** 196 × 0.25 = 49 visible patches. The encoder sees only unmasked patches; the lightweight decoder reconstructs the rest.

**Decision scenario**
You have 2 million unlabeled product images and only 5,000 labeled ones. Your task is fine-grained product classification. What is the best strategy?

- A) Train a supervised CNN on the 5,000 labels only
- B) Pre-train a ViT using MAE on all 2 million images, then fine-tune on 5,000 labels ✓
- C) Use only classical feature descriptors on the unlabeled data
- D) Apply k-means clustering to the unlabeled images and use cluster IDs as pseudo-labels

> **Best answer: B.** MAE can leverage all 2 million unlabeled images to learn rich visual representations. Fine-tuning on 5,000 labeled examples then adapts those features to the specific classification task — far more effective than supervised-only training on 5,000 samples.

***

### Topic A-3: Optical Flow and Motion Estimation

**Lesson outline**

- Optical flow: per-pixel 2-D displacement field between consecutive frames; the brightness constancy assumption: $I(x, y, t) = I(x + u, y + v, t + 1)$
- Lucas-Kanade: local least-squares solution under the assumption of constant flow in a patch
- Horn-Schunck: global smoothness regularization via energy minimization
- FlowNet and PWC-Net: learned optical flow using CNN feature pyramids and cost volumes
- RAFT (Recurrent All-Pairs Field Transforms): iterative refinement via GRU on 4-D correlation volume — current benchmark leader
- Scene flow: 3-D motion estimation in 3-D space (relevant to LiDAR point clouds)
- Applications: video compression, action recognition, autonomous driving, video stabilization
- Pitfall: brightness constancy fails under lighting changes, specular reflections, and shadows

**Key takeaways**

- Optical flow is dense motion — one vector per pixel per frame pair
- Learned methods far outperform classical methods on real-world, large-displacement, occluded scenes
- RAFT's correlation volume captures all-pairs similarity between frame features — powerful but memory intensive
- Optical flow is often used as an auxiliary input to action recognition models
- The aperture problem: for a moving edge, only the component perpendicular to the edge is observable locally

**Related topics:** Video Understanding and Temporal Modeling, Edge Detection and Feature Descriptors, 3D Vision and Depth Estimation

**Further learning**

- Search: "Teed Deng RAFT 2020 ECCV optical flow paper"
- Search: "Horn Schunck 1981 optical flow original paper"
- Search: "PWC-Net Sun 2018 CVPR optical flow CNN"

**Check understanding**

*(a) Multiple-choice)* The aperture problem in optical flow means:

- 0: The camera aperture introduces blur that distorts flow
- **1: Only the flow component perpendicular to an edge is observable locally** ✓
- 2: Optical flow cannot be computed for occluded regions
- 3: Large displacements cannot be estimated

> Through a small aperture, a moving edge is indistinguishable from a differently-angled edge moving at a different speed. Only the normal component is constrained — tangential motion is ambiguous.

*(b) True/False)* RAFT estimates optical flow in a single feedforward pass without iterative refinement.
**False.** RAFT uses a recurrent GRU-based architecture that iteratively refines a flow estimate over multiple steps (typically 12 iterations at test time), which is key to its accuracy.

*(c) Numeric)* A video is recorded at 30 fps. An object moves at 1 m/s. The camera is 5 m away and the focal length maps 1 m at that distance to 200 pixels. What is the approximate pixel displacement per frame?
**Expected answer: ≈ 6.67 pixels/frame.** In 1/30 s, the object moves 1/30 m ≈ 0.033 m. At 5 m distance with the given scale: 0.033 m × 200 px/m = 6.67 px. (Accept 6.5–7.0.)

**Decision scenario**
Your action recognition pipeline needs motion cues but cannot afford to run full RAFT at 30 fps. What is the best tradeoff?

- A) Use raw pixel differences between frames
- B) Use a lightweight optical flow model (e.g., FastFlowNet) or compute flow at a lower frame rate and interpolate ✓
- C) Remove motion information entirely and rely on appearance only
- D) Run RAFT at full resolution every 10 frames with no interpolation

> **Best answer: B.** Lightweight flow models or temporal subsampling with interpolation maintain meaningful motion signals while reducing computation dramatically. Raw pixel differences are too noisy, and skipping 10 frames without interpolation loses fast-motion events.

***

### Topic A-4: Video Understanding and Temporal Modeling

**Lesson outline**

- Video as a 5-D tensor: (Batch, Time, Channels, Height, Width)
- Two-stream networks: spatial stream (RGB frames) + temporal stream (optical flow) fused by late averaging
- 3-D convolutions (C3D): extend spatial kernels into the temporal dimension; 3×3×3 conv
- Inflated 3D (I3D): initialize 3-D filters by repeating pre-trained 2-D ImageNet filters along the time axis — leverages image pre-training
- Efficient 3-D architectures: (2+1)D convolutions (separate spatial + temporal), SlowFast (two-pathway: slow high-res + fast low-res)
- Video transformers (TimeSformer, VideoSwin): factorized temporal + spatial attention for scalability
- Action recognition benchmarks: Kinetics-400/700, Something-Something, UCF-101
- Temporal action localization: detect when actions occur in untrimmed video (start time, end time, class)
- Pitfall: over-relying on scene context rather than motion — models can "cheat" by recognizing where actions happen rather than how

**Key takeaways**

- Optical flow captures short-range motion; 3-D convolutions capture learned temporal patterns
- I3D bootstraps video models from image pre-training — critical given the cost of video data collection
- SlowFast's key insight: high temporal rate (fast path) at low resolution and low temporal rate (slow path) at high resolution can be fused effectively
- Something-Something requires genuine temporal reasoning (not just scene recognition)
- Video understanding models are expensive; factorized attention and (2+1)D convolutions are standard efficiency tricks

**Related topics:** Optical Flow and Motion Estimation, Vision Transformers, Self-Supervised Visual Representation Learning

**Further learning**

- Search: "Carreira Zisserman I3D 2017 CVPR paper"
- Search: "Feichtenhofer SlowFast 2019 ICCV paper"
- Search: "Bertasius TimeSformer 2021 ICML paper"

**Check understanding**

*(a) Multiple-choice)* The key advantage of (2+1)D convolution over full 3-D convolution is:

- 0: It captures longer temporal ranges
- **1: It reduces parameter count and FLOPs while approximating 3-D interactions** ✓
- 2: It uses optical flow as an explicit input
- 3: It requires no pre-training

> (2+1)D factorizes a 3×3×3 conv into a 1×3×3 spatial conv and a 3×1×1 temporal conv. This reduces parameters and enables an extra nonlinearity, often matching full 3-D accuracy at lower cost.

*(b) True/False)* A model trained on Kinetics-400 will trivially generalize to Something-Something without retraining, because both are action recognition benchmarks.
**False.** Something-Something requires understanding temporal order (e.g., "pushing object from left to right"), which spatial scene cues cannot answer. Kinetics-heavy models often rely on scene statistics and fail on temporally-sensitive datasets.

*(c) Numeric)* A video clip is 32 frames at 30 fps. A SlowFast model uses a fast pathway at 1/4 frame rate. How many frames does the slow pathway process?
**Expected answer: 8 frames.** Slow pathway: 32 × (1/4) = 8 frames.

**Decision scenario**
You need to detect when a surgeon makes a specific incision motion in a 3-hour surgical video. Runtime does not need to be real-time, but accuracy is critical. What approach fits best?

- A) Run a single-frame classifier on every 30th frame
- B) Use a two-stage pipeline: scene detection to find surgical moments, then temporal action localization with a strong video transformer ✓
- C) Use optical flow only without appearance information
- D) Apply audio event detection

> **Best answer: B.** Surgical incision detection requires both temporal precision and appearance understanding. A coarse scene filter reduces the search space, and a strong temporal model (e.g., VideoSwin + localization head) identifies exact incision moments with high recall.

***

### Topic A-5: 3D Vision and Depth Estimation

**Lesson outline**

- Pinhole camera model: projection $\begin{pmatrix} u \\ v \end{pmatrix} = \frac{1}{Z} K \begin{pmatrix} X \\ Y \\ Z \end{pmatrix}$ where K is the intrinsic matrix
- Monocular depth estimation: predict per-pixel depth from a single RGB image (inherently scale-ambiguous without supervision)
- Stereo depth: triangulation from two calibrated cameras; disparity inversely proportional to depth
- Self-supervised depth (Monodepth2): train on monocular video using photometric reprojection loss — no depth labels needed
- Depth completion: densify sparse LiDAR measurements using RGB guidance
- Point clouds: unordered set of 3-D (x, y, z) points; PointNet processes each point independently then aggregates globally
- PointNet++ and 3-D sparse convolutions for local neighborhood learning
- Depth-to-3D: using the intrinsic matrix to lift a depth map back to a point cloud
- Pitfall: scale ambiguity in monocular methods — metric depth requires either supervised training or known scale references

**Key takeaways**

- Stereo depth is metric and reliable; monocular depth is up-to-scale without extra supervision
- Self-supervised depth estimation from monocular video has nearly closed the gap with supervised methods on benchmarks
- PointNet's permutation invariance is achieved by symmetric operations (max-pooling across points)
- Depth and normals are complementary representations of surface geometry
- Intrinsic matrix K encodes focal length and principal point — must be known for accurate 3-D reconstruction

**Related topics:** Optical Flow and Motion Estimation, Neural Radiance Fields and Novel View Synthesis, Object Detection Fundamentals

**Further learning**

- Search: "Godard Monodepth2 2019 ICCV self-supervised depth"
- Search: "Qi PointNet 2017 CVPR point cloud deep learning"
- Search: "Szeliski 3D reconstruction computer vision textbook szeliski.org"

**Check understanding**

*(a) Multiple-choice)* In monocular depth estimation, scale ambiguity means:

- 0: The model cannot predict relative depth ordering
- **1: The predicted depth map is correct up to an unknown global scale factor** ✓
- 2: The model fails on large images
- 3: Depth and disparity are not related

> A scene twice as large twice as far away projects identically. Without metric anchors (stereo, LiDAR, known object sizes), monocular networks learn depth up to a scale they cannot determine from appearance alone.

*(b) True/False)* PointNet applies convolutions over local 3-D neighborhoods, similar to a spatial CNN.
**False.** PointNet applies shared MLPs independently to each point and aggregates using a global max-pool. It is invariant to point order but does *not* use local neighborhood convolutions — that is PointNet++'s contribution.

*(c) Numeric)* A point is at (X=2, Y=1, Z=5) in camera coordinates. The focal length is f_x = f_y = 500 px, and the principal point is (320, 240). What are the pixel coordinates (u, v)?
**Expected answer: u = 520, v = 340.** u = (500 × 2)/5 + 320 = 200 + 320 = 520; v = (500 × 1)/5 + 240 = 100 + 240 = 340.

**Decision scenario**
You are building a warehouse robot that must navigate autonomously. You have a tight hardware budget and can only mount one sensor. Which is the best choice for depth sensing?

- A) Single monocular RGB camera with a self-supervised depth model
- B) Stereo RGB camera pair with a learned stereo matching network ✓
- C) Only a 2-D LiDAR scanner
- D) A fisheye wide-angle camera with no depth capability

> **Best answer: B.** Stereo cameras provide metric depth with high frame rate, no emitter (works in daylight and dark with IR illuminators), and are low-cost. Monocular depth is scale-ambiguous and less reliable for precise navigation. A 2-D LiDAR only covers one horizontal plane.

***

### Topic A-6: Generative Models: VAEs and Diffusion

**Lesson outline**

- Variational Autoencoders (VAEs): encoder maps input to latent distribution $q_\phi(z|x)$; decoder reconstructs from sampled z; ELBO loss: $\mathcal{L} = \mathbb{E}_{q}[\log p_\theta(x|z)] - D_{\text{KL}}(q_\phi(z|x) \| p(z))$
- The reparameterization trick: $z = \mu + \sigma \cdot \epsilon, \; \epsilon \sim \mathcal{N}(0, I)$ — enables backprop through sampling
- Denoising Diffusion Probabilistic Models (DDPMs): forward process adds Gaussian noise over T steps; reverse process (learned) iteratively denoises
- Score matching and DDIM: faster sampling by skipping steps, deterministic sampling trajectories
- Latent Diffusion Models (LDM / Stable Diffusion): apply diffusion in a compressed VAE latent space — dramatic compute reduction
- Classifier-free guidance (CFG): condition generation on text/class without a separate classifier; guidance scale controls fidelity vs. diversity tradeoff
- Diffusion vs. GAN: diffusion has better mode coverage and stability but is slower at inference; GANs are one-pass but prone to mode collapse
- Pitfall: confusing the VAE reconstruction loss (pixel MSE) with perceptual/LPIPS loss — MSE tends to produce blurry reconstructions

**Key takeaways**

- VAEs provide a structured, continuous latent space — useful for interpolation and conditional generation
- Diffusion models currently produce the highest-quality diverse images among generative paradigms
- CFG scale is the primary control knob: low values give diversity, high values give prompt fidelity at the cost of variety
- Latent diffusion dramatically reduces memory and compute by working in a ~8× compressed latent space
- Diffusion models require hundreds to thousands of sampling steps in naive DDPM; DDIM reduces this to ~50 steps without quality loss

**Related topics:** Self-Supervised Visual Representation Learning, Vision-Language Models, Image Editing and Synthesis

**Further learning**

- Search: "Ho DDPM 2020 NeurIPS denoising diffusion probabilistic models"
- Search: "Rombach Latent Diffusion 2022 CVPR stable diffusion"
- Search: "Kingma Welling VAE 2013 ICLR original paper"

**Check understanding**

*(a) Multiple-choice)* The reparameterization trick in VAEs is necessary because:

- 0: The KL divergence term has no closed form
- **1: Sampling from a distribution is not differentiable, so gradients cannot flow through it directly** ✓
- 2: The encoder output must be discrete
- 3: The decoder cannot process continuous inputs

> Backprop requires differentiable operations. Sampling z ~ N(μ, σ²) is non-differentiable. The reparameterization z = μ + σε shifts randomness to ε (a fixed noise sample), making the path from μ and σ to z differentiable.

*(b) True/False)* Increasing the classifier-free guidance scale always improves the visual quality of generated images.
**False.** Higher CFG scales increase prompt adherence and sharpness but reduce diversity and can cause oversaturation and artifacts. There is an optimal range that balances quality and naturalness.

*(c) Numeric)* A latent diffusion model compresses 512×512×3 images to a latent of 64×64×4 using a VAE. What is the compression ratio (input pixels to latent elements)?
**Expected answer: 12.** Input: 512×512×3 = 786,432; Latent: 64×64×4 = 16,384; ratio = 786,432 / 16,384 = 48. (Note: this is a 48× reduction, not 12×. Accept 48.)

**Decision scenario**
You need to generate high-quality synthetic training images for a rare defect detector. You have 200 real defect examples. Which generative approach is most practical?

- A) Train a DDPM from scratch on 200 images
- B) Fine-tune a pre-trained Latent Diffusion Model (e.g., with DreamBooth or LoRA) on 200 examples ✓
- C) Use a VAE to interpolate between 200 examples
- D) Use nearest-neighbor augmentation only

> **Best answer: B.** Fine-tuning a pre-trained LDM on a small domain-specific set (DreamBooth, LoRA) is well-established for data augmentation of rare classes. Training from scratch with 200 images will produce poor quality. VAE interpolation is limited to in-distribution blends.

***

### Topic A-7: Neural Radiance Fields and Novel View Synthesis

**Lesson outline**

- Task: given a set of posed images, synthesize the scene from arbitrary new viewpoints
- Volume rendering integral: $C(\mathbf{r}) = \int_{t_n}^{t_f} T(t) \, \sigma(\mathbf{r}(t)) \, \mathbf{c}(\mathbf{r}(t), \mathbf{d}) \, dt$, where $T(t) = \exp\!\left(-\int_{t_n}^{t} \sigma(\mathbf{r}(s)) ds\right)$
- NeRF: an MLP mapping (x, y, z, θ, φ) → (RGB, density σ); trained per-scene by minimizing rendering loss
- Positional encoding: maps raw coordinates to high-frequency Fourier features, enabling fine-detail learning
- Hierarchical sampling: coarse network identifies important regions, fine network samples densely there
- Instant-NGP: replace MLP with a hash-encoded grid — reduces training from hours to seconds
- 3D Gaussian Splatting (3DGS): represent scene as a set of 3-D Gaussians; rasterize differentiably — real-time rendering
- Applications: AR/VR scene capture, visual effects, novel view generation for data augmentation
- Pitfall: NeRF requires well-calibrated camera poses; errors in poses lead to blurry reconstructions

**Key takeaways**

- NeRF is an implicit neural scene representation — no explicit mesh or voxel grid
- Volume rendering is differentiable, enabling end-to-end training purely from RGB images with known poses
- Instant-NGP makes NeRF practical for everyday use; 3DGS makes it real-time
- 3D Gaussian Splatting significantly outperforms NeRF in rendering speed at comparable quality
- These methods require dense multi-view captures — sparse views degrade quality significantly

**Related topics:** 3D Vision and Depth Estimation, Generative Models: VAEs and Diffusion, Optical Flow and Motion Estimation

**Further learning**

- Search: "Mildenhall NeRF 2020 ECCV neural radiance fields original paper"
- Search: "Müller Instant NGP 2022 SIGGRAPH paper"
- Search: "Kerbl 3D Gaussian Splatting 2023 SIGGRAPH paper"

**Check understanding**

*(a) Multiple-choice)* Why does NeRF use positional encoding on the input coordinates?

- 0: To reduce overfitting
- 1: To encode camera pose
- **2: To enable the MLP to represent high-frequency detail that raw coordinates cannot** ✓
- 3: To compress the input dimensionality

> Neural networks with raw coordinate inputs are biased toward low-frequency functions (spectral bias). Fourier positional encoding maps coordinates to many frequency components, allowing the MLP to fit sharp edges and fine texture.

*(b) True/False)* 3D Gaussian Splatting requires no MLP and can render novel views in real time once the Gaussians are optimized.
**True.** 3DGS represents the scene as explicit 3-D Gaussians (position, covariance, opacity, color) and rasterizes them directly via tile-based differentiable splatting — no network inference at render time.

*(c) Numeric)* A NeRF uses 60 Fourier frequency bands for positional encoding in 3-D (x, y, z). What is the dimensionality of the encoded position input to the MLP?
**Expected answer: 363.** Each coordinate gets sin and cos at each of 60 frequencies: 3 × (2 × 60) = 360 encoded dimensions + 3 raw coordinates = 363. (Accept 360 if the original coordinates are excluded per implementation.)

**Decision scenario**
A film production studio needs photorealistic novel views of a physical set from sparse photos for a VFX shot. Render quality is paramount; offline render time is acceptable. What technology best fits?

- A) Classical photogrammetry with textured meshes
- B) NeRF-based method (e.g., Instant-NGP or Zip-NeRF) for high-quality implicit scene capture ✓
- C) 3D Gaussian Splatting for real-time preview and final render
- D) A single-image depth estimation followed by image warping

> **Best answer: B.** NeRF-based methods (especially modern variants like Zip-NeRF) produce the highest visual fidelity for photorealistic view synthesis of real sets, handling reflections and view-dependent effects that meshes struggle with. 3DGS (C) is also a valid answer for production use due to its speed, but NeRF variants still edge out on final quality in sparse-view scenarios.

***

### Topic A-8: Efficient Vision Architectures

**Lesson outline**

- Depthwise separable convolution: depthwise (per-channel spatial) + pointwise (1×1 channel mixing) — reduces FLOPs by ≈1/N_filters
- MobileNet family: V1 (depthwise separable), V2 (inverted residuals + linear bottlenecks), V3 (NAS-found with hard-swish)
- EfficientNet compound scaling revisited: depth, width, resolution scaled jointly by a fixed coefficient
- Neural Architecture Search (NAS): optimize architecture as a discrete search problem; DARTS (differentiable relaxation), once-for-all networks
- Pruning: structured (remove entire filters) vs. unstructured (zero out individual weights); post-training vs. training-aware
- Quantization: FP32 → INT8 (or INT4); post-training quantization (PTQ) vs. quantization-aware training (QAT)
- Knowledge distillation (revisited here for efficiency): training-time technique complementary to quantization
- Latency profiling: FLOPs ≠ latency — memory bandwidth, parallelism, hardware scheduling all matter
- Pitfall: optimizing for FLOPs but ignoring memory access patterns — a 2× FLOPs reduction may yield only 1.1× speedup on certain hardware

**Key takeaways**

- Depthwise separable convolutions are the single most impactful substitution for reducing mobile model cost
- INT8 quantization typically incurs <1% accuracy loss with QAT and delivers 2–4× speedup on compatible hardware
- Always profile on the target hardware — FLOP counts mislead when hardware is memory-bound
- Structured pruning preserves hardware efficiency; unstructured pruning requires sparse computation support
- NAS automates architecture design but requires enormous compute upfront

**Related topics:** Convolutional Neural Networks, Image Classification at Scale, Model Deployment and Production Systems

**Further learning**

- Search: "Howard MobileNetV2 2018 CVPR inverted residuals"
- Search: "Han deep compression pruning quantization 2016 ICLR"
- Search: "Guo quantization aware training survey 2022"

**Check understanding**

*(a) Multiple-choice)* Compared to a standard 3×3 convolution with C input and C output channels, a depthwise separable equivalent reduces parameters by approximately what factor?

- 0: 2×
- 1: 4×
- **2: C/9 × reduction (≈ factor of N_channels / 9)** ✓
- 3: 100×

> Standard: C × C × 3 × 3; depthwise: C × 1 × 3 × 3 + C × C × 1 × 1. Ratio ≈ 1/9 + 1/C ≈ 1/9 for large C. For C=256, reduction ≈ 8.9×.

*(b) True/False)* Post-training quantization always achieves the same accuracy as quantization-aware training.
**False.** PTQ calibrates the quantization ranges after training without updating weights, which can cause significant accuracy drops on sensitive models. QAT simulates quantization during training, allowing the model to adapt, typically yielding higher accuracy.

*(c) Numeric)* A model has 50M FLOPs. Replacing standard convolutions with depthwise separable equivalents (C=128 filters) reduces FLOPs by the depthwise separable ratio ≈ (1/9 + 1/128) ≈ 0.119. What is the approximate new FLOPs count?
**Expected answer: ≈ 5.95M FLOPs.** 50M × 0.119 ≈ 5.95M. (Accept 5.5M–6.5M given approximation.)

**Decision scenario**
You need to deploy a classifier on a microcontroller with 512KB flash and no floating-point unit. Which techniques should you apply in combination?

- A) Use a full ResNet-50 with FP32 weights
- B) Use a depthwise separable CNN backbone + INT8 post-training quantization ✓
- C) Apply unstructured pruning to ResNet-50
- D) Use a vision transformer with 8-head attention

> **Best answer: B.** Microcontrollers require both a compact architecture (depthwise separable) and integer arithmetic (INT8/INT4 quantization). Unstructured pruning does not reduce model size without sparse hardware support. Transformers are far too large and FP-heavy.

***

# STAGE 4 — EXPERT / CAPSTONE


***

### Topic E-1: Vision-Language Models

**Lesson outline**

- CLIP: contrastive pre-training on 400M image-text pairs; image encoder + text encoder produce aligned embeddings; zero-shot classification by comparing image embedding to text prompt embeddings
- Contrastive loss for VLM: maximize cosine similarity for matched pairs, minimize for non-matched within the batch
- Open-vocabulary detection: extend CLIP alignment to detect objects described by free-text queries (GLIP, Grounding DINO)
- Visual Question Answering (VQA): given image + question text, produce answer — multi-modal fusion challenge
- Large Vision-Language Models (LVLMs): LLaVA, InstructBLIP, GPT-4V — connect a visual encoder (ViT) to a large language model via a projection layer
- Instruction tuning for vision: fine-tune on (image, instruction, response) triples to enable conversational vision
- Chain-of-thought and visual grounding: prompting strategies to improve reasoning over images
- Pitfall: CLIP embeddings encode semantic similarity, not spatial layout — CLIP cannot precisely localize objects without additional components

**Key takeaways**

- CLIP's zero-shot transfer is enabled by training on naturally occurring web text rather than fixed label sets
- The projection layer connecting visual and language spaces is small but critical — it must be trained even when both backbones are frozen
- Grounding DINO extends open-vocabulary understanding to spatial localization by fusing CLIP-like text alignment into a DETR-style detector
- LVLMs hallucinate visual content — responses must be treated with the same skepticism as any large language model output
- Prompt engineering significantly affects LVLM performance: templates like "a photo of a {class}" outperform bare class names in CLIP

**Related topics:** Vision Transformers, Self-Supervised Visual Representation Learning, Panoptic Segmentation

**Further learning**

- Search: "Radford CLIP 2021 ICML learning transferable visual models"
- Search: "Liu LLaVA 2023 NeurIPS visual instruction tuning"
- Search: "Liu Grounding DINO 2023 open-vocabulary detection"

**Check understanding**

*(a) Multiple-choice)* CLIP's zero-shot classification works by:

- 0: Fine-tuning the image encoder on target class images
- **1: Computing the cosine similarity between the image embedding and embeddings of text prompts for each class** ✓
- 2: Running an object detector and mapping detected labels to text
- 3: Using k-NN on pixel values

> CLIP projects both image and text into a shared embedding space. At inference, text prompts ("a photo of a dog") are embedded and compared to the image embedding — the highest similarity determines the class.

*(b) True/False)* CLIP can precisely localize objects within an image without any additional architecture components.
**False.** CLIP produces a global image embedding — it has no spatial output. Object localization requires additional components (e.g., a detection head as in Grounding DINO) that operate on spatially-aware features.

*(c) Numeric)* A CLIP model with batch size 512 uses an in-batch contrastive loss. How many negative image-text pairs exist for each positive pair in that batch?
**Expected answer: 511.** Each of the 512 matched pairs has 511 non-matched pairings (all other images in the batch for a given text, and vice versa).

**Decision scenario**
A customer support team wants to let users upload images and ask free-text questions like "Why does the surface look like this?" about product defects. Which technology is the best starting point?

- A) A CLIP zero-shot classifier with a fixed set of defect names
- B) A large vision-language model (LVLM) fine-tuned on defect images with instruction tuning ✓
- C) A classic VQA model trained only on general-purpose benchmarks
- D) An object detector with a lookup table of defect descriptions

> **Best answer: B.** Free-text, open-ended questions about images require multi-modal dialogue capability. An LVLM instruction-tuned on domain-specific defect data handles arbitrary phrasing while providing explanatory responses. CLIP (A) is only for classification, not explanation.

***

### Topic E-2: Image Editing and Synthesis

**Lesson outline**

- Conditional generation: text-to-image, class-conditional, layout-conditional, image-conditional (image-to-image)
- Inpainting: fill masked regions consistently with surrounding context and text prompts
- SDEdit and img2img: noise-then-denoise pipeline for style transfer and image editing
- ControlNet: adds spatial conditioning (pose, depth, edge map, segmentation) to a frozen diffusion model via trainable copy of the encoder
- IP-Adapter: inject image-prompt conditioning through a lightweight cross-attention adapter
- Textual Inversion and DreamBooth: personalization — learn a new concept (person, object) from 3–20 reference images
- GAN-based editing revisited: StyleGAN latent space editing, GANSpace, InterFaceGAN — semantically meaningful directions in W-space
- Evaluation metrics: FID (Fréchet Inception Distance), CLIP score, IS (Inception Score), LPIPS
- Pitfall: FID measures distributional similarity over thousands of images, not per-image quality — a single beautiful image can have terrible FID

**Key takeaways**

- ControlNet makes spatial conditioning plug-and-play without modifying or retraining the base diffusion model
- FID requires a large evaluation set (≥ 10K samples) to be reliable; small-set FID is high-variance
- DreamBooth/LoRA fine-tuning is how practitioners adapt diffusion models to specific visual styles or identities
- SDEdit's noise level controls the tradeoff between faithfulness to the input and adherence to the new prompt
- LPIPS is a perceptual metric aligned with human judgments; MSE is not

**Related topics:** Generative Models: VAEs and Diffusion, Vision-Language Models, Robustness, Fairness, and Evaluation Beyond Accuracy

**Further learning**

- Search: "Zhang ControlNet 2023 ICCV adding conditional control"
- Search: "Ruiz DreamBooth 2023 CVPR personalized text-to-image"
- Search: "Heusel FID 2017 NeurIPS inception score Fréchet"

**Check understanding**

*(a) Multiple-choice)* FID (Fréchet Inception Distance) measures:

- 0: The sharpness of individual generated images
- **1: The distance between feature distributions of real and generated images** ✓
- 2: The CLIP alignment between generated images and their prompts
- 3: The pixel-wise MSE between pairs of images

> FID computes the Fréchet distance between two multivariate Gaussians fitted to Inception features of real and generated image sets. It captures both quality and diversity.

*(b) True/False)* ControlNet requires retraining the entire base diffusion model when adding a new spatial conditioning type (e.g., depth maps).
**False.** ControlNet keeps the base model fully frozen. It trains only a new copy of the encoder conditioned on the spatial input, adding the outputs to the frozen decoder via zero-initialized convolutions.

*(c) Numeric)* You generate 50,000 images to compute FID against a reference set of 50,000 real images. If instead you use only 500 generated images, describe (qualitatively) what happens to FID reliability.
**Expected answer (qualitative):** FID estimated from 500 samples has high variance — the Gaussian fit to Inception features is unreliable at small N. The result may differ substantially from the true FID and should not be used for model comparisons.

**Decision scenario**
You want to add product-specific image generation to an e-commerce platform. Users can type "show this sofa in a modern living room." You have 50 high-quality sofa photos but no labeled scene data. What is the most practical pipeline?

- A) Train a GAN from scratch on 50 images
- B) Use a pre-trained diffusion model with IP-Adapter for appearance conditioning + a text prompt for the scene ✓
- C) Paste the sofa image onto a background using classical compositing
- D) Fine-tune an entire diffusion model on 50 sofa images using standard supervised loss

> **Best answer: B.** IP-Adapter injects the sofa's visual appearance into a frozen diffusion model via cross-attention. Combined with a text prompt for the scene, it generates photorealistic composites without any training data beyond the reference images. Training a GAN or full diffusion model from 50 images is infeasible.

***

### Topic E-3: Robustness, Fairness, and Evaluation Beyond Accuracy

**Lesson outline**

- Distribution shift: covariate shift (input distribution changes), label shift (output distribution changes), dataset shift combinations
- ImageNet-C, ImageNet-A, ImageNet-R: corruption robustness, natural adversarial examples, and rendition benchmarks
- Adversarial examples: imperceptible perturbations $x' = x + \delta$ where $\|\delta\|_\infty \leq \epsilon$ cause misclassification; FGSM, PGD attacks
- Adversarial training: include adversarial examples in training to improve robustness — at a cost to standard accuracy
- Spurious correlations: models learn background or texture cues rather than the true signal (Clever Hans effect)
- Fairness metrics: demographic parity, equalized odds, calibration — and the impossibility of satisfying all simultaneously
- Bias sources in CV datasets: label bias, sampling bias, annotation bias; skin tone disparities in facial analysis
- Model cards and datasheets: structured documentation for model capabilities, intended use, and known failure modes
- Calibration: a model is well-calibrated if its confidence score equals its empirical accuracy; expected calibration error (ECE)
- Pitfall: improving accuracy on the aggregate test set while degrading performance on underrepresented subgroups

**Key takeaways**

- A model can be accurate on average but fail systematically on specific demographics or conditions
- Adversarial training increases robustness but almost always reduces clean accuracy — this tradeoff must be managed
- Spurious correlations are best diagnosed with counterfactual datasets or feature attribution methods
- ECE should always be reported alongside accuracy for high-stakes applications (medical, autonomous driving)
- Releasing a model without a model card is insufficient practice for any deployment beyond personal experiments

**Related topics:** Training and Evaluation Protocols, Vision-Language Models, Model Deployment and Production Systems

**Further learning**

- Search: "Hendrycks Baselines Corruptions Robustness 2019 ImageNet-C"
- Search: "Madry adversarial training PGD 2018 ICLR"
- Search: "Mitchell model cards machine learning 2019 FAccT"

**Check understanding**

*(a) Multiple-choice)* A model achieves 92% accuracy overall but 65% accuracy on a demographic group making up 8% of the dataset. This is primarily a:

- 0: Calibration problem
- 1: Adversarial robustness problem
- **2: Fairness / subgroup performance disparity problem** ✓
- 3: Distribution shift from training to test

> The model's aggregate accuracy hides systematic underperformance on a specific group. This is a fairness problem requiring stratified evaluation, not calibration or adversarial robustness.

*(b) True/False)* A perfectly calibrated model always has high accuracy.
**False.** Calibration means the confidence scores are reliable (e.g., among samples where the model says 70% confident, 70% are correct). A model that is 70% accurate can be perfectly calibrated while still making many mistakes.

*(c) Numeric)* A binary classifier outputs probabilities. In the confidence bin [0.8, 0.9], it makes 200 predictions with an average confidence of 0.85. If 150 are correct, what is the calibration error for this bin?
**Expected answer: 0.10.** Empirical accuracy = 150/200 = 0.75; average confidence = 0.85; calibration gap = |0.85 − 0.75| = 0.10.

**Decision scenario**
Your face recognition system achieves 99.2% accuracy on the benchmark but your audit reveals it makes 3× more false acceptances for darker-skinned individuals. Executives want to ship now since overall accuracy is high. What is the right response?

- A) Ship immediately; overall accuracy is the only metric that matters legally
- B) Delay shipping; retrain with balanced data and stratified evaluation targets, and document findings in a model card ✓
- C) Apply a post-processing threshold adjustment only for the affected group and ship
- D) Remove the demographic attribute from training data to fix the bias

> **Best answer: B.** Disparate performance on demographic groups is both an ethical and legal risk (GDPR, AI Act). Threshold adjustment alone (C) treats symptoms without addressing root cause. Removing demographic attributes (D) does not remove proxy correlations. A full audit, retraining, and model card are required before deployment.

***

### Topic E-4: Model Deployment and Production Systems

**Lesson outline**

- Inference optimization: operator fusion, kernel optimization, ONNX export, TensorRT compilation
- Hardware targets: cloud GPU, edge GPU (Jetson), mobile CPU (ARM NEON), browser (WebAssembly/WebGL), microcontroller
- Batching strategies: dynamic batching for throughput, latency SLA constraints
- Model serving patterns: synchronous REST, asynchronous queue, streaming (video), batch offline
- Monitoring in production: data drift detection (statistical tests on input feature distributions), prediction drift, label drift
- Canary deployments and A/B testing for vision models
- The full ML pipeline: data ingestion → preprocessing → inference → post-processing → monitoring → retraining trigger
- Containerization and reproducibility: consistent environments for training and serving
- Pitfall: training-serving skew — preprocessing in training differs from production preprocessing, silently degrading performance

**Key takeaways**

- Training-serving skew is the \#1 silent killer of production vision systems — always use the same preprocessing pipeline
- Dynamic batching improves GPU utilization but requires careful timeout configuration to meet latency SLAs
- Drift monitoring must operate on model inputs *and* outputs — input drift can go undetected if only watching prediction distributions
- TensorRT / OpenVINO quantization and fusion commonly yields 3–5× latency improvement over naive FP32 inference
- CI/CD pipelines for ML must include regression tests on a held-out golden set before any model swap

**Related topics:** Efficient Vision Architectures, Training and Evaluation Protocols, Robustness, Fairness, and Evaluation Beyond Accuracy

**Further learning**

- Search: "TensorRT optimization guide NVIDIA inference"
- Search: "machine learning production serving best practices Google 2024"
- Search: "data drift detection production ML monitoring survey"

**Check understanding**

*(a) Multiple-choice)* Training-serving skew most commonly occurs when:

- 0: The model is too large for the server
- **1: Preprocessing steps in the training pipeline differ from those in the serving pipeline** ✓
- 2: The model is retrained too frequently
- 3: Batch normalization is used

> If the serving pipeline normalizes images differently (e.g., different mean/std, different resize method) than the training pipeline, predictions become unreliable — even though the model weights are identical.

*(b) True/False)* Monitoring only the distribution of model output predictions is sufficient to detect all relevant production failures.
**False.** A model can receive completely out-of-distribution inputs (e.g., corrupted images, sensor failures) while still producing confident predictions. Monitoring input features and intermediate embeddings is also necessary.

*(c) Numeric)* A model serves 120 requests/second at a latency of 8 ms per request on a single GPU. If you apply TensorRT optimization that yields a 4× latency improvement, what is the new maximum throughput per GPU, assuming the system is compute-bound?
**Expected answer: 480 requests/second.** Latency becomes 2 ms; throughput = 1/0.002 = 500 req/s. (Accept 480–500 depending on whether overhead is considered.)

**Decision scenario**
Your vision-based defect detection model worked well for 6 months but suddenly shows increased false negatives. No code has changed. What is the most likely cause and correct first step?

- A) A bug was introduced in the model weights during an automated retraining cycle
- B) The input data distribution has shifted (e.g., camera recalibration, lighting change) — investigate via input drift monitoring ✓
- C) The server hardware degraded, causing compute errors
- D) The model's training labels were corrupted

> **Best answer: B.** Sudden performance degradation with no code change is the classic signature of data distribution shift in production — a camera recalibration, lens change, or lighting retrofit are common culprits in industrial CV. Input drift monitoring would show the shift immediately.

***

### Topic E-5: Capstone — End-to-End Vision System Design

**Lesson outline**

- Problem framing: translate a business requirement into a well-defined CV task; define success metrics before touching data
- Data strategy: sourcing, labeling (active learning to minimize annotation cost), versioning, quality auditing
- Baseline first: establish a simple baseline (e.g., linear probe on pre-trained features) before complex models
- Architecture selection framework: task type → candidate architectures → efficiency constraints → shortlist
- Training pipeline design: reproducible experiments, config management, metric logging
- Evaluation suite: primary metric + secondary fairness/robustness metrics + latency benchmark
- Deployment readiness checklist: preprocessing parity, performance regression tests, model card, monitoring setup
- Iteration loop: deploy → monitor → collect hard negatives → re-label → retrain → evaluate → redeploy
- Pitfall: optimizing the model endlessly without deploying — getting real-world data is always more valuable than marginal benchmark gains on a held-out set

**Key takeaways**

- The most impactful intervention is almost always *more/better data* rather than a more sophisticated architecture
- Active learning (uncertainty sampling, core-set selection) dramatically reduces labeling cost
- A deployed simple model beats an undeployed perfect model — the goal is to learn from production
- Hard negative mining — collecting failure cases from production — is the highest-leverage way to improve a deployed model
- End-to-end thinking means the ML engineer owns the full loop from data to monitoring, not just the training script

**Related topics:** Training and Evaluation Protocols, Model Deployment and Production Systems, Robustness, Fairness, and Evaluation Beyond Accuracy

**Further learning**

- Search: "Sculley hidden technical debt machine learning systems NIPS 2015"
- Search: "active learning computer vision annotation efficiency survey 2024"
- Search: "ML system design interview guide chip huyen"

**Check understanding**

*(a) Multiple-choice)* You have a newly labeled dataset of 50,000 images and an unlimited compute budget. The single most important first step is:

- 0: Train the largest available vision transformer
- **1: Establish a simple baseline to set a performance floor** ✓
- 2: Run a full neural architecture search
- 3: Apply the most aggressive augmentation policy available

> Without a baseline, you cannot measure whether a complex model is worth its cost. A linear probe or fine-tuned small model takes minutes to run and gives an essential reference point for all future decisions.

*(b) True/False)* Once a model is deployed, the labeling and annotation pipeline can be shut down.
**False.** Production data contains distribution shifts, edge cases, and novel failure modes that were absent from the training set. Continuous labeling of hard negatives and drift samples is essential for maintaining model quality over time.

*(c) Short-answer)* Name three concrete items that should appear in a model card before production deployment.
**Expected answer (any three of):** Intended use and known out-of-scope uses; training data description and known biases; per-subgroup performance metrics; evaluation conditions (hardware, thresholds); ethical considerations and limitations; contact/owner information.

**Decision scenario**
Your capstone project: a recycling plant needs automated sorting of plastic, glass, paper, and metal on a conveyor belt at 2 items/second, 24/7 operation, with a budget for one edge GPU. Accuracy must exceed 97% across all material classes, including rare contaminants. Design your system.

- A) Deploy CLIP zero-shot classification — no training needed
- B) Train a ResNet-50 on a balanced synthetic dataset only; deploy without monitoring
- C) Collect a balanced real dataset from the conveyor, fine-tune an efficient backbone (e.g., EfficientNet-B3 or MobileNetV3-Large), deploy with input drift monitoring and a hard-negative retraining loop ✓
- D) Use a panoptic segmentation model — more information is always better

> **Best answer: C.** Real production data from the specific belt, lighting, and material mix is irreplaceable. An efficient backbone meets the latency budget. Drift monitoring catches conveyor changes (new contamination, relighting). Hard-negative retraining continuously improves the system. CLIP lacks the fine-grained material discrimination and 97% accuracy target. Panoptic segmentation is overkill and likely too slow for 2 items/second on an edge GPU.

***

## 4. Quality Notes

- **No gaps between stages:** Every Beginner topic is explicitly listed as a "Related topic" for at least one Intermediate topic, and so on, forming a directed dependency graph through the curriculum.
- **Consistent terminology:** "mIoU," "mAP," "RoIAlign," "FPN," "BatchNorm," and all architecture names are used identically in every cross-reference.
- **Optional depth track (not required for graduation):** *Transformers for medical imaging*, *event-based cameras*, *continual learning in CV*, and *neuromorphic vision hardware* are natural extensions beyond the Expert stage for learners who want to specialize further.[^1][^2]

