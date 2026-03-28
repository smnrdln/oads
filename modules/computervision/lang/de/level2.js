i18n.registerContent('de', 'level2', [
    {
        title: 'Residualnetze und Skip-Verbindungen',
        content: `<h3>Degradation</h3><p>Sehr tiefe Plain-Nets können schlechter trainieren als flachere.</p><h3>Residualblock</h3><p><strong>y = F(x) + x</strong> — Restterm lernen; Identitätspfad führt Gradienten.</p><h3>Bottleneck</h3><p>1×1 → 3×3 → 1×1 spart FLOPs gegenüber breiten 3×3-Stapeln.</p><h3>Varianten</h3><p>DenseNet-Konkatenation, Wide ResNet, Pre-Activation-BN.</p><h3>Shortcuts</h3><p>Bei Kanalwechsel 1×1-Projektionen zum Angleichen.</p>`,
        keyPoints: ['Skip-Verbindungen erleichtern Optimierung in tiefen Netzen', 'Bottlenecks tauschen Tiefe gegen Effizienz', 'Bei anderer Eingangstiefe Checkpoints sorgfältig laden'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }, { level: 'level2', index: 1, label: 'Transfer Learning und Fine-Tuning' }, { level: 'level3', index: 0, label: 'Vision Transformer' }],
        resources: [{ title: 'ResNet', url: 'https://arxiv.org/abs/1512.03385' }, { title: 'D2L ResNet', url: 'https://d2l.ai/chapter_convolutional-modern/resnet.html' }]
    },
    {
        title: 'Transfer Learning und Fine-Tuning',
        content: `<h3>Was transferiert</h3><p>Frühe Filter generalisieren; hohe Schichten sind aufgabenspezifisch.</p><h3>Strategien</h3><p>Backbone einfrieren + Kopf trainieren; obere Blöcke mit <strong>kleinerer LR</strong> freigeben; differentielle LRs.</p><h3>Domänenabstand</h3><p>Medizin/Industrie braucht oft mehr freie Schichten oder domänennahes Pre-Training.</p><h3>BatchNorm</h3><p>Beim Einfrieren Eval-Modus konsistent halten; laufende Stats nach Teil-Fine-Tunes prüfen.</p>`,
        keyPoints: ['Kleine ähnliche Daten → oft eingefrorener Backbone', 'Pretrained-Gewichte mit 10–100× kleinerer LR', 'Klinische Bilder profitieren von medizinischem Pre-Training'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Residualnetze und Skip-Verbindungen' }, { level: 'level1', index: 4, label: 'Bildvorverarbeitung und Augmentation' }],
        resources: [{ title: 'Yosinski Transferability', url: 'https://arxiv.org/abs/1411.1792' }]
    },
    {
        title: 'Bildklassifikation im großen Maßstab',
        content: `<h3>Benchmarks</h3><p>ImageNet-1k/21k; Top-1 vs. Top-5.</p><h3>Regularisierung</h3><p><strong>Label Smoothing</strong>, Mixup, CutMix, progressive Auflösung.</p><h3>Skalierung</h3><p>EfficientNet skaliert Tiefe/Breite/Auflösung gemeinsam; ConvNeXt modernisiert CNNs.</p><h3>Destillation</h3><p>Lehrer-Softlabels für kleine Schüler.</p><h3>Vorsicht</h3><p>Leaderboard ≠ Verteilung im Deployment.</p>`,
        keyPoints: ['Mixup/CutMix mischen Samples und Labels', 'Destillation überträgt mehr als harte Labels', 'Smoothing reduziert Überkonfidenz'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Faltungsnetze (CNNs)' }, { level: 'level2', index: 0, label: 'Residualnetze und Skip-Verbindungen' }],
        resources: [{ title: 'EfficientNet', url: 'https://arxiv.org/abs/1905.11946' }, { title: 'Mixup', url: 'https://arxiv.org/abs/1710.09412' }]
    },
    {
        title: 'Objekterkennung — Grundlagen',
        content: `<h3>Aufgabe</h3><p>Klasse + Box (cx,cy,w,h) pro Objekt.</p><h3>IoU</h3><p>Schnitt durch Vereinigung.</p><h3>Zwei Stufen</h3><p>RPN-Vorschläge → RoI-Kopf (Faster R-CNN).</p><h3>Eine Stufe</h3><p>Dichte Vorhersagen (YOLO) — schneller, anderes Fehlerprofil.</p><h3>Anchor-free</h3><p>FCOS/CenterNet: Abstände Rand–Mitte.</p><h3>NMS</h3><p>Überlappende Duplikate unterdrücken; Schwellwert in Mengen kritisch.</p><h3>mAP</h3><p>COCO mAP@[.5:.95] mittelt PR über IoUs.</p>`,
        keyPoints: ['IoU ≥ 0,5 übliche TP-Schwelle', 'Niedriges NMS-IoU verschmilzt nahe Instanzen', 'Zwei Stufen oft stärker bei kleinen Objekten'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Feature-Pyramiden-Netze (FPN)' }, { level: 'level2', index: 5, label: 'Moderne Objektdetektoren' }],
        resources: [{ title: 'Faster R-CNN', url: 'https://arxiv.org/abs/1506.01497' }, { title: 'COCO Metriken', url: 'https://cocodataset.org/#detection-eval' }]
    },
    {
        title: 'Feature-Pyramiden-Netze (FPN)',
        content: `<h3>Mehrskalen-Bedarf</h3><p>Objekte variieren in Pixelgröße; eine Skala verpasst kleine oder große Instanzen.</p><h3>FPN</h3><p>Bottom-up-CNN + Top-down-Pfad + <strong>laterale 1×1</strong>; gemeinsame Kanalbreite pro Stufe.</p><h3>Zuordnung</h3><p>Kleine Objekte auf hochauflösenden Stufen (P2/P3), große auf groben.</p><h3>Erweiterungen</h3><p>PANet; BiFPN mit gelernten Fusionsgewichten.</p>`,
        keyPoints: ['Laterale 1×1 gleicht Kanäle vor der Addition ab', 'Ein Forward baut alle Skalen — kein Bildpyramiden-Re-Run', 'Anker/Design an Datenskala anpassen'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Objekterkennung — Grundlagen' }, { level: 'level2', index: 5, label: 'Moderne Objektdetektoren' }, { level: 'level2', index: 6, label: 'Semantische Segmentierung' }],
        resources: [{ title: 'FPN', url: 'https://arxiv.org/abs/1612.03144' }]
    },
    {
        title: 'Moderne Objektdetektoren',
        content: `<h3>YOLO-Linie</h3><p>Echtzeit-Dichte-Detektoren → anchor-free, bessere Köpfe.</p><h3>DETR</h3><p>Mengen-Vorhersage + <strong>ungarische Zuordnung</strong>; kein NMS — langsame Konvergenz ohne deformable Attention.</p><h3>Rotierte Boxen</h3><p>(x,y,w,h,θ) für Luftbild/Dokument.</p><h3>Benchmarks</h3><p>mAP <em>und</em> Latenz/FLOPs auf Zielhardware.</p>`,
        keyPoints: ['DETR braucht lange Schedules oder deformable Varianten', 'YOLO-Familie Standard für Edge-Durchsatz', 'Auf Deployment-Gerät profilen'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Objekterkennung — Grundlagen' }, { level: 'level2', index: 4, label: 'Feature-Pyramiden-Netze (FPN)' }, { level: 'level3', index: 0, label: 'Vision Transformer' }],
        resources: [{ title: 'DETR', url: 'https://arxiv.org/abs/2005.12872' }, { title: 'Deformable DETR', url: 'https://arxiv.org/abs/2010.04159' }]
    },
    {
        title: 'Semantische Segmentierung',
        content: `<h3>Pixel-Klassen</h3><p>FCN, Encoder–Decoder, U-Net-<strong>Skip-Verbindungen</strong> für Details.</p><h3>Dilatierte Conv</h3><p>Rezeptives Feld ohne Downsampling; ASPP mehrrate Kontext.</p><h3>DeepLab</h3><p>ASPP + leichter Decoder.</p><h3>mIoU</h3><p>Mittel-IoU über Klassen — seltene Klassen ziehen nach unten.</p><h3>Ungleichgewicht</h3><p>Gewichtete CE, Focal Loss, Oversampling.</p>`,
        keyPoints: ['Semantik verschmilzt Instanzen derselben Klasse', 'Dilatation erhält Auflösung', 'Echtzeit-Spuren brauchen leichte Backbones'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Feature-Pyramiden-Netze (FPN)' }, { level: 'level2', index: 7, label: 'Instanzsegmentierung' }, { level: 'level2', index: 8, label: 'Panoptische Segmentierung' }],
        resources: [{ title: 'U-Net', url: 'https://arxiv.org/abs/1505.04597' }, { title: 'DeepLabv3+', url: 'https://arxiv.org/abs/1802.02611' }]
    },
    {
        title: 'Instanzsegmentierung',
        content: `<h3>Aufgabe</h3><p>Eigene Maske pro Objektinstanz.</p><h3>Mask R-CNN</h3><p>Detection + Maskenzweig; <strong>RoIAlign</strong> statt quantisierendem RoIPool.</p><h3>Echtzeit</h3><p>YOLACT-Prototypen + Koeffizienten; CondInst/SOLOv2 einstufig.</p><h3>Metriken</h3><p>Mask-mAP über Pixel-IoU.</p>`,
        keyPoints: ['RoIAlign: bilinear an Float-Koordinaten', 'Instanz braucht Identität — Semantik trennt Überlappungen nicht', 'Maskenkopf meist günstig vs. Backbone'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Objekterkennung — Grundlagen' }, { level: 'level2', index: 6, label: 'Semantische Segmentierung' }, { level: 'level2', index: 8, label: 'Panoptische Segmentierung' }],
        resources: [{ title: 'Mask R-CNN', url: 'https://arxiv.org/abs/1703.06870' }]
    },
    {
        title: 'Panoptische Segmentierung',
        content: `<h3>Vereinigung</h3><p>„Stuff“ (Himmel, Straße) und „Things“ (zählbare Objekte).</p><h3>PQ</h3><p>Panoptic Quality = Segmentierungsqualität × Erkennungsqualität.</p><h3>Architekturen</h3><p>Panoptic FPN; <strong>Mask2Former</strong> mit masked attention.</p><h3>SAM</h3><p>Promptbasiert, klassenagnostisch — Semantik braucht nachgelagerte Köpfe.</p><h3>Constraint</h3><p>Genau ein panoptisches Label pro Pixel.</p>`,
        keyPoints: ['PQ trennt Masken- von Erkennungsqualität', 'SAM segmentiert nach Prompts, nicht nach Klassenliste', 'Autonome Systeme brauchen oft panoptische Ausgaben'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Semantische Segmentierung' }, { level: 'level2', index: 7, label: 'Instanzsegmentierung' }, { level: 'level3', index: 0, label: 'Vision Transformer' }],
        resources: [{ title: 'Panoptic Segmentation', url: 'https://arxiv.org/abs/1801.00868' }, { title: 'SAM', url: 'https://segment-anything.com/' }]
    }
]);
