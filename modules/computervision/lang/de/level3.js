i18n.registerContent('de', 'level3', [
    {
        title: 'Vision Transformer',
        content: `<h3>Self-Attention</h3><p>Q,K,V und Softmax; Multi-Head teilt Unterraum.</p><h3>ViT</h3><p>Bild in Patches, linear einbetten, Position, Encoder-Blöcke, <strong>[CLS]</strong> für Klassifikation.</p><h3>Datenhunger</h3><p>ViT braucht großes Pre-Training vs. CNN-Induktionsbias.</p><h3>Swin</h3><p>Verschobene Fenster → nahezu linear; hierarchische Maps für dichte Aufgaben.</p><h3>DeiT</h3><p>Distillation-Token für dateneffizienteres ViT-Training.</p>`,
        keyPoints: ['Patchgröße: Auflösung vs. Kosten quadratisch bei globaler Attention', 'Swin als Backbone für Detection/Segmentierung', 'Positionskodierung wichtig für feine Lokalisierung'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }, { level: 'level2', index: 0, label: 'Residualnetze und Skip-Verbindungen' }, { level: 'level3', index: 1, label: 'Selbstüberwachte Repräsentationen' }],
        resources: [{ title: 'ViT', url: 'https://arxiv.org/abs/2010.11929' }, { title: 'Swin', url: 'https://arxiv.org/abs/2103.14030' }]
    },
    {
        title: 'Selbstüberwachte Repräsentationen',
        content: `<h3>Kontrastiv</h3><p>SimCLR/MoCo: augmentierte Views angleichen, Negative stoßen.</p><h3>BYOL / SimSiam</h3><p>Asymmetrie + Stop-Gradient ohne Negative.</p><h3>MAE</h3><p>Hohe Maskierung — Nachbarn korrelieren stark.</p><h3>DINO</h3><p>Selbstdestillation mit ViT; Attention hebt Objekte hervor.</p><h3>Fallstrick</h3><p>Symmetrie ohne Tricks kollabiert zu trivialen Lösungen.</p>`,
        keyPoints: ['MAE 75 % erzwingt globales Schließen', 'BYOL braucht EMA-Ziel + Predictor-Asymmetrie', 'SSL-Features transferieren gut auf dichte Aufgaben'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Vision Transformer' }, { level: 'level2', index: 1, label: 'Transfer Learning und Fine-Tuning' }, { level: 'level3', index: 5, label: 'Generative Modelle: VAE und Diffusion' }],
        resources: [{ title: 'SimCLR', url: 'https://arxiv.org/abs/2002.05709' }, { title: 'MAE', url: 'https://arxiv.org/abs/2111.06377' }]
    },
    {
        title: 'Optischer Fluss und Bewegungsschätzung',
        content: `<h3>Helligkeitskonstanz</h3><p>Klassische Annahme bricht bei Licht/Spiegelungen.</p><h3>Klassisch</h3><p>Lucas–Kanade lokal; Horn–Schunck mit Glattheit.</p><h3>Gelernt</h3><p>FlowNet, PWC-Net, <strong>RAFT</strong> mit iterativer Verfeinerung auf Korrelationsvolumen.</p><h3>Aperture-Problem</h3><p>Lokal nur normale Flusskomponente zur Kante messbar.</p><h3>Anwendungen</h3><p>Video, Stabilisierung, Fahren, Aktionshinweise.</p>`,
        keyPoints: ['RAFT iteriert — nicht nur ein Forward', 'Gelernt schlägt klassisch bei großen Verschiebungen', 'Bei Budget leichte Modelle wählen'],
        relatedTopics: [{ level: 'level1', index: 2, label: 'Kantendetektion und Merkmalsdeskriptoren' }, { level: 'level3', index: 3, label: 'Video-Verständnis und Zeitmodellierung' }, { level: 'level3', index: 4, label: '3D-Vision und Tiefenschätzung' }],
        resources: [{ title: 'RAFT', url: 'https://arxiv.org/abs/2003.12039' }]
    },
    {
        title: 'Video-Verständnis und Zeitmodellierung',
        content: `<h3>Tensor</h3><p>5D (B,T,C,H,W).</p><h3>Two-Stream</h3><p>RGB + Fluss fusionieren.</p><h3>3D-CNN / I3D</h3><p>Zeitliche Aufblähung 2D-Filter — Start von ImageNet.</p><h3>Effizienz</h3><p>(2+1)D-Faktorisierung; SlowFast mit zwei Pfaden.</p><h3>Transformer</h3><p>TimeSformer, Video Swin faktorisieren Raum-Zeit-Attention.</p><h3>Fallstrick</h3><p>Kinetics-Szenenbias vs. echte Zeitlogik bei Something-Something.</p>`,
        keyPoints: ['I3D nutzt ImageNet-Init', 'SlowFast trennt räumliche Detail- und schnelle Bewegungspfad', 'Benchmark an geforderter Zeitlogik ausrichten'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Optischer Fluss und Bewegungsschätzung' }, { level: 'level3', index: 0, label: 'Vision Transformer' }],
        resources: [{ title: 'I3D', url: 'https://arxiv.org/abs/1705.07750' }, { title: 'SlowFast', url: 'https://arxiv.org/abs/1812.03982' }]
    },
    {
        title: '3D-Vision und Tiefenschätzung',
        content: `<h3>Lochkameramodell</h3><p>3D-Punkte mit intrinsischer Matrix K projizieren.</p><h3>Monokular</h3><p>Skalenambiguität ohne metrische Anker.</p><h3>Stereo / LiDAR</h3><p>Metrische Tiefe durch Triangulation oder Range.</p><h3>Selbstüberwacht</h3><p>Monodepth2-ähnlich: photometrische Reprojektion auf Video.</p><h3>Punktwolken</h3><p>PointNet: shared MLP + globales Pooling, permutationsinvariant; PointNet++ lokal.</p>`,
        keyPoints: ['Monokular: relative Tiefe bis auf Skala', 'Stereo braucht Kalibrierung, liefert Metrik', 'PointNet ≠ lokale Conv — das ist PointNet++'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Optischer Fluss und Bewegungsschätzung' }, { level: 'level3', index: 6, label: 'NeRF und neuartige Ansichtssynthese' }, { level: 'level2', index: 3, label: 'Objekterkennung — Grundlagen' }],
        resources: [{ title: 'Monodepth2', url: 'https://arxiv.org/abs/1806.01260' }, { title: 'PointNet', url: 'https://arxiv.org/abs/1612.00593' }]
    },
    {
        title: 'Generative Modelle: VAE und Diffusion',
        content: `<h3>VAE</h3><p>ELBO = Rekonstruktion − KL; <strong>Reparameterisierung</strong> z = μ + σε für Gradienten.</p><h3>DDPM</h3><p>Vorwärts-Rauschen; gelerntes Rückwärts-Entrauschen.</p><h3>Schnelles Sampling</h3><p>DDIM, Destillation reduzieren Schritte.</p><h3>LDM / Stable Diffusion</h3><p>Diffusion im VAE-Latentraum — große Einsparung.</p><h3>CFG</h3><p>Classifier-free guidance: Vielfalt vs. Prompt-Treue.</p><h3>vs. GAN</h3><p>Diffusion: bessere Modenabdeckung; langsamer bei Inferenz.</p>`,
        keyPoints: ['Reparameterisierung macht Sampling differenzierbar', 'Hohe CFG kann übersättigen', 'Latente Diffusion ist Standard für HQ Text-zu-Bild'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Selbstüberwachte Repräsentationen' }, { level: 'level4', index: 0, label: 'Vision-Language-Modelle' }, { level: 'level4', index: 1, label: 'Bildbearbeitung und Synthese' }],
        resources: [{ title: 'DDPM', url: 'https://arxiv.org/abs/2006.11239' }, { title: 'LDM', url: 'https://arxiv.org/abs/2112.10752' }]
    },
    {
        title: 'NeRF und neuartige Ansichtssynthese',
        content: `<h3>NeRF</h3><p>MLP (x,y,z,θ,φ) → Farbe + Dichte; volumetrisches Rendering passt Fotos.</p><h3>Fourier-Features</h3><p>Hochfrequente Details über Positionskodierung.</p><h3>Beschleunigung</h3><p>Instant-NGP Hashing; <strong>3D Gaussian Splatting</strong> explizite Gaussians + Rasterisierung in Echtzeit.</p><h3>Voraussetzungen</h3><p>Genaue Kameraposen; wenige Views verschlechtern Qualität.</p>`,
        keyPoints: ['NeRF implizit — kein Mesh nötig', '3DGS rendert nach Optimierung schnell', 'Posenfehler verwischen Rekonstruktion'],
        relatedTopics: [{ level: 'level3', index: 4, label: '3D-Vision und Tiefenschätzung' }, { level: 'level3', index: 5, label: 'Generative Modelle: VAE und Diffusion' }],
        resources: [{ title: 'NeRF', url: 'https://arxiv.org/abs/2003.08934' }, { title: '3D Gaussian Splatting', url: 'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/' }]
    },
    {
        title: 'Effiziente Vision-Architekturen',
        content: `<h3>Tiefen-separabel</h3><p>Tiefenweise räumlich + 1×1 Punktweise — MobileNet-Familie.</p><h3>Quantisierung</h3><p>PTQ vs. QAT; INT8 auf unterstützten Beschleunigern.</p><h3>Pruning</h3><p>Strukturiert vs. unstrukturiert; Sparse-Speedups brauchen Hardware.</p><h3>NAS</h3><p>Architektursuche mit hohem Suchaufwand.</p><h3>Profiling</h3><p>FLOPs ≠ Latenz — Speicherbandbreite dominiert oft.</p>`,
        keyPoints: ['Tiefen-separabel senkt Parameter stark', 'QAT schlägt naive PTQ oft', 'Immer auf Ziel-SoC messen'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }, { level: 'level2', index: 2, label: 'Bildklassifikation im großen Maßstab' }, { level: 'level4', index: 3, label: 'Model Deployment und Produktionssysteme' }],
        resources: [{ title: 'MobileNetV2', url: 'https://arxiv.org/abs/1801.04381' }]
    }
]);
