i18n.registerContent('de', 'level1', [
    {
        title: 'Bilder als Daten',
        content: `<h3>Digitale Bilder</h3><p>Rasterbild = 2D- oder 3D-Array von Intensitäten. Farbräume: <strong>RGB</strong>, <strong>BGR</strong> (OpenCV), <strong>HSV</strong>, Graustufen.</p><h3>Typen und Wertebereich</h3><p><code>uint8</code> vs. <code>float32</code>; Normalisierung [0,1], [-1,1] oder Mittelwert/Std pro Kanal.</p><h3>Layout</h3><p>Ursprung oft oben links; Tensoren <strong>(H,W,C)</strong> oder <strong>(C,H,W)</strong>. <strong>EXIF-Orientierung</strong> beachten.</p><h3>Fallen</h3><p>Kanalvertausch, Integer-Überlauf ohne Float-Cast, stilles Verzerren beim Resize.</p>`,
        keyPoints: ['Kanalreihenfolge und Wertebereich vor jedem Modell prüfen', 'Vor linearen Ops nach float casten', 'Layout-Konventionen je Bibliothek lesen'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Bildvorverarbeitung und Augmentation' }, { level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }],
        resources: [{ title: 'Szeliski — Computer Vision', url: 'https://szeliski.org/Book/' }, { title: 'OpenCV Farbraum', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Klassische Bildfilterung',
        content: `<h3>Faltung</h3><p>Gewichtete lokale Summen; Kernel glätten, schärfen oder Gradienten liefern.</p><h3>Gauß & Separabilität</h3><p>2D-Gauß = Produkt 1D-Gauß → zwei 1D-Durchläufe, <em>O(k)</em> statt <em>k²</em>.</p><h3>Gradienten</h3><p><strong>Sobel/Prewitt</strong> für G<sub>x</sub>, G<sub>y</sub>; Betrag und Richtung beschreiben Kanten.</p><h3>Morphologie</h3><p>Erosion, Dilatation, Opening, Closing auf Binärmasken.</p><h3>Ränder</h3><p>Padding (Null, spiegeln, replizieren) beeinflusst Kantenpixel.</p>`,
        keyPoints: ['Gauß dämpft Hochfrequenzen', 'Gradientenbetrag findet Kanten; Morphologie räumt Masken auf', 'Klassische Filter sind fest — keine trainierbaren Gewichte'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Bilder als Daten' }, { level: 'level1', index: 2, label: 'Kantendetektion und Merkmalsdeskriptoren' }, { level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }],
        resources: [{ title: 'Szeliski Lehrbuch', url: 'https://szeliski.org/Book/' }]
    },
    {
        title: 'Kantendetektion und Merkmalsdeskriptoren',
        content: `<h3>Canny</h3><p>Glätten → Gradienten → <strong>Non-Maximum-Suppression</strong> → Doppel-Schwellwert + Hysterese.</p><h3>Ecken</h3><p><strong>Harris</strong> aus Strukturtensor; starke Antwort wenn beide Eigenwerte groß.</p><h3>Skalenraum</h3><p>Pyramiden und DoG für skaleninvariante Punkte.</p><h3>Deskriptoren</h3><p>SIFT-ähnliche Histogramme; <strong>Lowe-Ratio-Test</strong> verwirft zweideutige Matches.</p><h3>Grenzen</h3><p>Starke Blick-/Beleuchtungsänderung bricht Hand-Crafted — gelernte Merkmale oft besser.</p>`,
        keyPoints: ['NMS verdünnt Kanten auf eine Pixelbreite', 'Harris schwach auf flachen Regionen', 'Ratio-Test reduziert falsche Matches'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Klassische Bildfilterung' }, { level: 'level3', index: 2, label: 'Optischer Fluss und Bewegungsschätzung' }],
        resources: [{ title: 'Lowe SIFT', url: 'https://www.google.com/search?q=Lowe+SIFT+IJCV+2004' }]
    },
    {
        title: 'Neuronale Netze für die Vision (Grundlagen)',
        content: `<h3>Bausteine</h3><p>MLP-Schichten, <strong>ReLU/GELU/Sigmoid</strong>, Vorwärtslauf, Verluste: Cross-Entropy, MSE, BCE.</p><h3>Training</h3><p>Backprop, SGD/Momentum/<strong>Adam</strong>, Batchgröße vs. Rauschen.</p><h3>Generalisierung</h3><p>Bias–Varianz, Über-/Unteranpassung, <strong>L2</strong>, <strong>Dropout</strong> (Train vs. Eval).</p><h3>Stabilität</h3><p>Verschwindende/explodierende Gradienten; Clipping bei Bedarf.</p>`,
        keyPoints: ['ReLU kann auf negativer Hälfte „sterben“', 'Trainingsverlust 0 + hoher Validierungsfehler ⇒ Überanpassung', 'Adam ist oft ein guter Start'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Bilder als Daten' }, { level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }, { level: 'level1', index: 6, label: 'Trainings- und Bewertungsprotokolle' }],
        resources: [{ title: 'Deep Learning Book', url: 'https://www.deeplearningbook.org/' }, { title: 'CS231n', url: 'https://cs231n.stanford.edu/' }]
    },
    {
        title: 'Bildvorverarbeitung und Augmentation',
        content: `<h3>Skalieren & Croppen</h3><p>Bilinear vs. nearest; Seitenverhältnis bewahren + Crop vs. quetschen.</p><h3>Normalisieren</h3><p>Mittel/Std nur auf <strong>Train</strong>; für Val/Test fix übernehmen.</p><h3>Räumliche Augs</h3><p>Flips, Crops, Rotation — <strong>gleiche Transformation</strong> auf Boxen/Masken.</p><h3>TTA</h3><p>Mittel über augmentierte Ansichten — kostet Latenz.</p><h3>Richtlinien</h3><p>AutoAugment, RandAugment — Semantik nicht brechen (z. B. Ziffern-Flip).</p>`,
        keyPoints: ['Augmentation ist günstige Regularisierung', 'Train-only-Augs nicht in der Inferenz', 'Domänenwissen steuert Farb-/Hue-Jitter'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Bilder als Daten' }, { level: 'level1', index: 6, label: 'Trainings- und Bewertungsprotokolle' }, { level: 'level2', index: 1, label: 'Transfer Learning und Fine-Tuning' }],
        resources: [{ title: 'RandAugment', url: 'https://arxiv.org/abs/1909.13719' }, { title: 'Albumentations', url: 'https://albumentations.ai/' }]
    },
    {
        title: 'Faltungsnetze (CNNs)',
        content: `<h3>Warum Conv</h3><p>Lokale Verbindungen + Gewichtsteilung schlagen dichte Schichten auf Bildern.</p><h3>Hyperparameter</h3><p>Kernel, Stride, Padding; rezeptives Feld wächst mit der Tiefe.</p><h3>Pooling & GAP</h3><p>Max/Avg-Pool; <strong>Global Average Pooling</strong> verkleinert FC-Köpfe.</p><h3>BatchNorm</h3><p>Batch-Statistiken im Training; <strong>laufende</strong> Statistiken in der Inferenz — <code>eval()</code>.</p><h3>Meilensteine</h3><p>LeNet → AlexNet/ReLU → VGG-3×3-Stacks → Inception.</p>`,
        keyPoints: ['3×3-Conv teilt 9 Gewichte räumlich', 'BN: Training ≠ Inferenz', 'Tiefen-separable Blöcke für Mobile'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Neuronale Netze für die Vision (Grundlagen)' }, { level: 'level2', index: 0, label: 'Residualnetze und Skip-Verbindungen' }],
        resources: [{ title: 'D2L — CNNs', url: 'https://d2l.ai/chapter_convolutional-neural-networks/' }, { title: 'BatchNorm', url: 'https://arxiv.org/abs/1502.03167' }]
    },
    {
        title: 'Trainings- und Bewertungsprotokolle',
        content: `<h3>Splits</h3><p>Train / Val / Test — kein Hyperparameter-Tuning auf Test.</p><h3>Metriken</h3><p>Genauigkeit, Precision, Recall, F1, Makro/Mikro; Konfusionsmatrix.</p><h3>Ungleichgewicht</h3><p>Genauigkeit allein täuscht — PR-Kurven und Klassenmetriken.</p><h3>Schedules</h3><p>Step-Decay, Cosinus, Warm-up; Early Stopping auf Val.</p><h3>Tracking</h3><p>Configs, Seeds, Kurven — Reproduzierbarkeit.</p>`,
        keyPoints: ['Testset einmal am Ende', 'F1 und AUC bei Klassenungleichgewicht', 'Cosinus + Warm-up ist üblich für große Vision-Trainings'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Neuronale Netze für die Vision (Grundlagen)' }, { level: 'level1', index: 4, label: 'Bildvorverarbeitung und Augmentation' }, { level: 'level2', index: 1, label: 'Transfer Learning und Fine-Tuning' }],
        resources: [{ title: 'scikit-learn Metriken', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' }]
    }
]);
