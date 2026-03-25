// ════════════════════════════════════════════════════════
// German Language Pack (de)
// ════════════════════════════════════════════════════════
// To add a new language, copy this file to lang/XX.js and:
//   1. Change the code ('de' → 'XX') and label.
//   2. Translate all string values.
//   3. Replace __autoTranslateRules with rules for your
//      language (or remove the key if not needed).
//   4. Add 'XX' to lang/manifest.js.
// ════════════════════════════════════════════════════════

i18n.registerLanguage('de', 'Deutsch', {

    // ── App Header ──
    'app.title': 'Elektronik- & PCB-Design-Trainer',
    'header.progress': 'Fortschritt',
    'header.xp': 'XP',
    'header.level': 'Stufe %s',
    'header.streak': 'Serie',

    // ── Sidebar ──
    'sidebar.title': '📚 Kursübersicht',
    'search.label': '🔎 Inhalte suchen',
    'search.placeholder': 'Lektionen, Übungen, Szenarien und Quellen durchsuchen',
    'search.clear': 'Löschen',
    'search.help': 'Suche im Lektionstext, in Kernpunkten, Übungen, Szenarien und Quellen.',
    'search.summary': '%s Themen gefunden · %s Treffer',
    'search.noResults': 'Keine Treffer für "%s"',
    'search.topicCount': '%s Themen',

    // ── Level Names ──
    'level.level1.name': 'Stufe 1: Anfänger',
    'level.level2.name': 'Stufe 2: Fortgeschrittene',
    'level.level3.name': 'Stufe 3: Experten',
    'level.level4.name': 'Stufe 4: Spezialisten',

    // ── Category Names ──
    'category.essential': 'Grundlagen',
    'category.embedded': 'Embedded',
    'category.robotics': 'Robotik',

    // ── Welcome View ──
    'welcome.heading': 'Willkommen beim Elektronik- & PCB-Design-Trainer',
    'welcome.description': 'Wähle links ein Thema aus. Jedes Thema enthält Lerninhalte, Kernpunkte und interaktive Übungen zur Selbstkontrolle.',
    'welcome.totalXP': 'Gesamt-XP',
    'welcome.exercisesDone': 'Abgeschlossene Übungen',
    'welcome.scenariosSolved': 'Gelöste Szenarien',

    // ── Achievements ──
    'achievements.title': '🏆 Erfolge',
    'achievement.first_steps.title': 'Erste Schritte',
    'achievement.first_steps.desc': 'Erstes Thema abgeschlossen',
    'achievement.beginner_master.title': 'Anfänger-Meister',
    'achievement.beginner_master.desc': 'Stufe 1 abgeschlossen',
    'achievement.quiz_master.title': 'Quiz-Meister',
    'achievement.quiz_master.desc': '10 Übungen abgeschlossen',
    'achievement.scenario_solver.title': 'Szenario-Löser',
    'achievement.scenario_solver.desc': '5 Szenarien gelöst',
    'achievement.intermediate.title': 'Fortgeschritten',
    'achievement.intermediate.desc': 'Stufe 2 abgeschlossen',
    'achievement.advanced.title': 'Entwicklungsprofi',
    'achievement.advanced.desc': 'Stufe 3 abgeschlossen',
    'achievement.expert.title': 'Experte',
    'achievement.expert.desc': 'Stufe 4 abgeschlossen',
    'achievement.perfectionist.title': 'Perfektionist',
    'achievement.perfectionist.desc': '100 % abgeschlossen',

    // ── Topic View ──
    'topic.comingSoon': 'Für dieses Thema sind noch keine Inhalte hinterlegt.',
    'topic.keyTakeaways': '🎯 Wichtigste Erkenntnisse',
    'topic.relatedTopics': '🔗 Verwandte Themen',
    'topic.furtherReading': '📚 Weiterführende Quellen',
    'topic.markCompleted': '✅ Als erledigt markieren (+20 XP)',
    'topic.completed': '✅ Abgeschlossen',
    'topic.nextTopic': 'Nächstes Thema →',
    'topic.nextLevel': 'Nächste Stufe →',

    // ── Exercises ──
    'exercises.title': '🎯 Übungen',
    'exercises.retry': '🔁 Übungen wiederholen',
    'exercises.submitAnswer': 'Antwort absenden',
    'exercises.checkAnswer': 'Antwort prüfen',
    'exercises.selectAnswer': 'Bitte wähle eine Antwort aus.',
    'exercises.selectTrueFalse': 'Bitte wähle Richtig oder Falsch aus.',
    'exercises.enterNumeric': 'Bitte gib eine numerische Antwort ein.',
    'exercises.calculation': '📐 Berechnung',
    'exercises.trueOrFalse': '✅ Richtig oder Falsch',
    'exercises.true': '✅ Richtig',
    'exercises.false': '❌ Falsch',
    'exercises.typePlaceholder': 'Antwort eingeben ...',

    // ── Quiz Results ──
    'quiz.correct': '✅ Richtig! +%s XP',
    'quiz.correctCalc': '✅ Richtig! (Antwort: %s%s) +%s XP',
    'quiz.incorrect': '❌ Nicht richtig.',
    'quiz.incorrectCalc': '❌ Nicht ganz. Die richtige Antwort ist %s%s.',

    // ── Scenarios ──
    'scenarios.title': '🔧 Praxis-Szenario',
    'scenario.excellent': '✅ Sehr gut! +%s XP',
    'scenario.notQuite': '❌ Noch nicht optimal.',

    // ── Notifications ──
    'notification.levelUp': '🎉 Stufenaufstieg! Du bist jetzt Stufe %s.',
    'notification.achievement': '🏆 Erfolg freigeschaltet: %s',
    'notification.completed': '✅ Abgeschlossen: %s',

    // ── Visual Reference Modal ──
    'visualRef.title': '🖼️ Visuelle Referenz',
    'visualRef.openNewTab': 'In neuem Tab öffnen ↗',

    // ── Language Switcher ──
    'language.label': '🌐',

    // ── Auto-translate rules ─────────────────────────────────────────────────
    // Used as a best-effort fallback when no manually translated content file
    // is available for a given content type (e.g. exercises, scenarios).
    // Each entry: [RegExp, replacement string].
    // To add rules for a new language, include __autoTranslateRules in that
    // language's registerLanguage call.
    'theme.dark': 'Dunkel',
    'theme.light': 'Hell',
    'theme.switchToDark': 'Zum dunklen Modus wechseln',
    'theme.switchToLight': 'Zum hellen Modus wechseln',
    __autoTranslateRules: [
        [/\bPrinted Circuit Board\b/gi, 'Leiterplatte'],
        [/\bReal-World Scenario\b/gi, 'Praxisnahes Szenario'],
        [/\bDesign Rule Check\b/gi, 'Design-Rule-Prüfung'],
        [/\bElectrical Rule Check\b/gi, 'Elektrische Regelprüfung'],
        [/\bBill of Materials\b/gi, 'Stückliste'],
        [/\bSurface Mount\b/gi, 'Oberflächenmontage'],
        [/\bThrough-Hole\b/gi, 'Durchstecktechnik'],
        [/\bLevel Translation\b/gi, 'Pegelwandlung'],
        [/\bPower Supply\b/gi, 'Stromversorgung'],
        [/\bGround Plane\b/gi, 'Massefläche'],
        [/\bVisual Reference\b/gi, 'Visuelle Referenz'],
        [/\bCourse Outline\b/gi, 'Kursübersicht'],
        [/\bOpen in new tab\b/gi, 'In neuem Tab öffnen'],
        [/\bBeginner\b/gi, 'Anfänger'],
        [/\bIntermediate\b/gi, 'Fortgeschritten'],
        [/\bAdvanced\b/gi, 'Fortgeschritten'],
        [/\bExpert\b/gi, 'Experte'],
        [/\bKey Takeaways\b/gi, 'Wichtigste Erkenntnisse'],
        [/\bRelated Topics\b/gi, 'Verwandte Themen'],
        [/\bFurther Reading\b/gi, 'Weiterführende Literatur'],
        [/\bExercises\b/gi, 'Übungen'],
        [/\bExercise\b/gi, 'Übung'],
        [/\bQuestions\b/gi, 'Fragen'],
        [/\bQuestion\b/gi, 'Frage'],
        [/\bAnswers\b/gi, 'Antworten'],
        [/\bAnswer\b/gi, 'Antwort'],
        [/\bCorrect\b/gi, 'Richtig'],
        [/\bIncorrect\b/gi, 'Falsch'],
        [/\bExcellent\b/gi, 'Hervorragend'],
        [/\bNot quite\b/gi, 'Nicht ganz'],
        [/\bVoltage\b/gi, 'Spannung'],
        [/\bCurrent\b/gi, 'Strom'],
        [/\bResistors\b/gi, 'Widerstände'],
        [/\bResistor\b/gi, 'Widerstand'],
        [/\bResistance\b/gi, 'Widerstand'],
        [/\bCapacitors\b/gi, 'Kondensatoren'],
        [/\bCapacitor\b/gi, 'Kondensator'],
        [/\bInductor\b/gi, 'Induktivität'],
        [/\bDiode\b/gi, 'Diode'],
        [/\bTransistor\b/gi, 'Transistor'],
        [/\bBattery\b/gi, 'Batterie'],
        [/\bPower\b/gi, 'Leistung'],
        [/\bSignals\b/gi, 'Signale'],
        [/\bSignal\b/gi, 'Signal'],
        [/\bFilter\b/gi, 'Filter'],
        [/\bAmplifier\b/gi, 'Verstärker'],
        [/\bComparator\b/gi, 'Komparator'],
        [/\bSensors\b/gi, 'Sensoren'],
        [/\bSensor\b/gi, 'Sensor'],
        [/\bCircuits\b/gi, 'Schaltungen'],
        [/\bCircuit\b/gi, 'Schaltung'],
        [/\bBoards\b/gi, 'Platinen'],
        [/\bBoard\b/gi, 'Platine'],
        [/\bRouting\b/gi, 'Leiterbahnführung'],
        [/\bSchematic\b/gi, 'Schaltplan'],
        [/\bFootprint\b/gi, 'Footprint'],
        [/\bAssembly\b/gi, 'Montage'],
        [/\bSoldering\b/gi, 'Löten'],
        [/\bSolder\b/gi, 'Lot'],
        [/\bDecoupling\b/gi, 'Entkopplung'],
        [/\bProtection\b/gi, 'Schutz'],
        [/\bMicrocontroller\b/gi, 'Mikrocontroller'],
        [/\bController\b/gi, 'Controller'],
        [/\bFirmware\b/gi, 'Firmware'],
        [/\bHardware\b/gi, 'Hardware'],
        [/\bSoftware\b/gi, 'Software'],
        [/\bCommunication\b/gi, 'Kommunikation'],
        [/\bInterfaces\b/gi, 'Schnittstellen'],
        [/\bInterface\b/gi, 'Schnittstelle'],
        [/\bTesting\b/gi, 'Testen'],
        [/\bDebugging\b/gi, 'Fehlersuche'],
        [/\bMeasurements\b/gi, 'Messungen'],
        [/\bMeasurement\b/gi, 'Messung'],
        [/\bOscilloscope\b/gi, 'Oszilloskop'],
        [/\bMultimeter\b/gi, 'Multimeter'],
        [/\bLogic Analyzer\b/gi, 'Logikanalysator'],
        [/\bGround\b/gi, 'Masse'],
        [/\bInputs\b/gi, 'Eingänge'],
        [/\bInput\b/gi, 'Eingang'],
        [/\bOutputs\b/gi, 'Ausgänge'],
        [/\bOutput\b/gi, 'Ausgang'],
        [/\bSuccess Tips\b/gi, 'Erfolgstipps'],
        [/\bProjects\b/gi, 'Projekte'],
        [/\bProject\b/gi, 'Projekt'],
        [/\bBasics\b/gi, 'Grundlagen'],
        [/\bIntroduction\b/gi, 'Einführung'],
        [/\bStep\b/gi, 'Schritt'],
        [/\bAlways\b/gi, 'Immer'],
        [/\bNever\b/gi, 'Niemals'],
        [/\bRecommended\b/gi, 'Empfohlen'],
        [/\bSee:\b/gi, 'Ansehen:'],
        [/\bfor\b/gi, 'für'],
        [/\band\b/gi, 'und'],
        [/\bwith\b/gi, 'mit'],
    ],
});
