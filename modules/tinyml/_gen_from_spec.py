#!/usr/bin/env python3
import json, re
from html import escape
from pathlib import Path
from urllib.parse import quote

ROOT = Path("/home/saman/experiments/kod/oa/oads")
MD = ROOT / "tmp/TinyML & Edge AI_ Complete Interactive Course Curr.md"
OUT = ROOT / "modules/tinyml"

GERMAN_TITLES = [
    "Was ist TinyML und Edge AI?",
    "Mikrocontroller- und Edge-Hardware-Grundlagen",
    "Eingebettete Systeme: Randbedingungen",
    "Machine-Learning-Grundlagen für die Edge",
    "Sensordaten und Signalverarbeitung (Basics)",
    "Der TinyML-Entwicklungsworkflow",
    "Modell-Quantisierung",
    "Modell-Pruning und Sparsität",
    "Wissensdistillation",
    "Neural Architecture Search für die Edge",
    "Audio-Klassifikation und Keyword Spotting",
    "Bildklassifikation auf Mikrocontrollern",
    "Zeitreihen-Klassifikation und Anomalieerkennung",
    "Leistungs- und Latenz-Profiling",
    "Objekterkennung an der Edge",
    "On-Device-Learning und Personalisierung",
    "Hardware-Software-Co-Design",
    "Edge-MLOps und Modell-Lebenszyklus",
    "Datenschutz und Sicherheit an der Edge",
    "Transformer und Attention an der Edge",
    "Federated Learning: Systemdesign",
    "Edge-AI-Systemdesign und -Integration",
    "Capstone: End-to-End Edge-AI-Systemdesign",
]


def main() -> None:
    text = MD.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r"^<img[^>]*>\s*", "", text, flags=re.M)

    raw_topics = []
    for m in re.finditer(r"^### Topic (\d+)\.(\d+) — (.+)$", text, re.M):
        major, minor, title = int(m.group(1)), int(m.group(2)), m.group(3).strip()
        start = m.end()
        nxt = re.search(r"^### Topic \d+\.\d+ — ", text[start:], re.M)
        end = start + nxt.start() if nxt else len(text)
        raw_topics.append((major, minor, title, text[start:end]))

    level_for_major = {1: "level1", 2: "level2", 3: "level3", 4: "level4"}
    topics_by_level = {"level1": [], "level2": [], "level3": [], "level4": []}
    for maj, _minr, title, _ in raw_topics:
        topics_by_level[level_for_major[maj]].append(title)

    flat_refs = []
    for lid in ["level1", "level2", "level3", "level4"]:
        for i, t in enumerate(topics_by_level[lid]):
            flat_refs.append((lid, i, t.lower()))

    def norm(s: str) -> str:
        return re.sub(r"\s+", " ", re.sub(r"\[\^\d+\]", "", s)).strip().lower()

    def find_related(rel_text: str) -> list:
        if not rel_text:
            return []
        bullets = []
        for line in rel_text.split("\n"):
            line = line.strip()
            if line.startswith("- "):
                bullets.append(norm(line[2:]))
        out = []
        for b in bullets:
            best = None
            best_score = 0
            for lid, idx, tl in flat_refs:
                if b in tl or tl in b:
                    score = min(len(b), len(tl))
                    if score > best_score:
                        best_score = score
                        best = (lid, idx, topics_by_level[lid][idx])
            if best:
                out.append({"level": best[0], "index": best[1], "label": best[2]})
        seen = set()
        deduped = []
        for x in out:
            k = (x["level"], x["index"])
            if k not in seen:
                seen.add(k)
                deduped.append(x)
        return deduped[:4]

    def section_until_headers(block: str, header: str, next_headers: list) -> str:
        m = re.search(rf"\*\*{re.escape(header)}\*\*\s*\n\n(.*)", block, re.S)
        if not m:
            return ""
        rest = m.group(1)
        if not next_headers:
            return rest.strip()
        alt = "|".join(re.escape(h) for h in next_headers)
        mm = re.search(rf"(?=\n\*\*(?:{alt})\*\*)", rest)
        if mm:
            return rest[: mm.start()].strip()
        return rest.strip()

    def md_bullets_to_html(md: str) -> str:
        lines = [l.strip() for l in md.split("\n") if l.strip()]
        items = [L[2:] for L in lines if L.startswith("- ")]
        if not items:
            return f"<p>{escape(md)}</p>"
        lis = "".join(f"<li>{escape(it)}</li>" for it in items)
        return f"<ul>{lis}</ul>"

    def parse_resources(fl_text: str) -> list:
        res = []
        if not fl_text:
            return res
        for line in fl_text.split("\n"):
            line = line.strip()
            if not line.startswith("- "):
                continue
            line = line[2:]
            line = re.sub(r"\[\^\d+\]", "", line).strip()
            m = re.search(r"`([^`]+)`", line)
            if m and m.group(1).startswith("http"):
                url = m.group(1)
                title = line.split("`")[0].strip(" —:")
                res.append({"title": title[:120] or "Resource", "url": url})
            elif "http" in line:
                um = re.search(r"(https?://[^\s\)\]]+)", line)
                if um:
                    res.append({"title": line[:120], "url": um.group(1)})
            elif m:
                q = m.group(1)
                res.append(
                    {
                        "title": line.split("`")[0].strip(" —:")[:100],
                        "url": "https://www.google.com/search?q=" + quote(q),
                    }
                )
            elif line.lower().startswith("book:"):
                res.append({"title": line[:200], "url": "https://www.google.com/search?q=" + quote(line)})
        return res[:8]

    def parse_assessments(cu_text: str) -> dict:
        if not cu_text:
            return {}
        block = cu_text
        out = {}
        m = re.search(r"\*\(a\) Multiple-choice\*(.*?)(?=\*\(b\)|\Z)", block, re.S)
        if m:
            chunk = m.group(1)
            q = ""
            opts = []
            for L in chunk.split("\n"):
                Ls = L.strip()
                if not Ls:
                    continue
                om = re.match(r"^([0-3])\.\s+(.*)$", Ls)
                if om:
                    opts.append(om.group(2).strip())
                elif not q and not Ls.startswith("0."):
                    q = Ls
            cm = re.search(r"\*\*Correct index:\s*(\d)", chunk)
            expl = ""
            em = re.search(r"\*\*Correct index:\s*\d+\.\*\*\s*(.+)", chunk, re.S)
            if em:
                expl = re.sub(r"\[\^\d+\]", "", em.group(1)).strip().split("\n")[0]
            if cm and len(opts) == 4:
                out["mc"] = {"q": q, "opts": opts, "correct": int(cm.group(1)), "expl": expl}
        m = re.search(r"\*\(b\) True/False\*(.*?)(?=\*\(c\)|\Z)", block, re.S)
        if m:
            chunk = m.group(1)
            stm = re.search(r"\*\*Statement:\*\*\s*(.+)", chunk)
            statement = stm.group(1).strip() if stm else ""
            ans = None
            if re.search(r"^\*\*False", chunk, re.M):
                ans = False
            elif re.search(r"^\*\*True", chunk, re.M):
                ans = True
            expl = ""
            for pref in ("**False.**", "**True.**"):
                if pref in chunk:
                    after = chunk.split(pref, 1)[1]
                    expl = re.sub(r"\[\^\d+\]", "", after).strip()
                    expl = re.split(r"\n\n", expl)[0][:800]
                    break
            out["tf"] = {"q": statement, "a": ans, "expl": expl}
        m = re.search(r"\*\(c\) Numeric\*(.*?)(?=\*\*Decision Scenario|\Z)", block, re.S)
        if m:
            chunk = m.group(1)
            qlines = []
            for L in chunk.split("\n"):
                Ls = L.strip()
                if not Ls:
                    continue
                if Ls.startswith("**Expected"):
                    break
                if Ls.startswith("Intersection:") or Ls.startswith("Union ="):
                    continue
                if "**" in Ls:
                    break
                qlines.append(Ls)
            q = " ".join(qlines)
            em = re.search(r"\*\*Expected answer:\s*([^*]+?)\*\*", chunk)
            exp_raw = em.group(1).strip() if em else ""
            exp_raw = exp_raw.replace("×", "x").replace("÷", "/").replace("~", "")
            num = None
            fm = re.search(r"([\d\.]+)", exp_raw)
            if fm:
                num = float(fm.group(1))
            out["num"] = {"q": q, "answer": num, "exp": exp_raw, "expl": exp_raw}
        m = re.search(r"\*\*Decision Scenario[^*]*\*\*(.*?)(?=\n\*\*\s*$|\n### |\Z)", block, re.S)
        if m:
            chunk = m.group(1).strip()
            desc = []
            choices = []
            for L in chunk.split("\n"):
                L = L.strip()
                if re.match(r"^[A-D]\.\s", L):
                    choices.append((L[0], L[3:].strip()))
                elif L and not L.startswith("**Best"):
                    desc.append(L)
            bm = re.search(r"\*\*Best answer:\s*([A-D])", chunk)
            best = bm.group(1) if bm else "A"
            exm = re.search(r"\*\*Best answer:\s*[A-D]\.\*\*\s*(.+)", chunk, re.S)
            expl = re.sub(r"\[\^\d+\]", "", exm.group(1)).strip() if exm else ""
            out["scen"] = {"desc": " ".join(desc), "choices": choices, "best": best, "expl": expl}
        return out

    records = []
    idx_all = 0
    for maj, _minr, title, block in raw_topics:
        lid = level_for_major[maj]
        lo = section_until_headers(block, "Lesson Outline", ["Key Takeaways"])
        kt = section_until_headers(block, "Key Takeaways", ["Related Topics"])
        rel = section_until_headers(block, "Related Topics", ["Further Learning"])
        fl = section_until_headers(block, "Further Learning", ["Check Understanding"])
        cu = section_until_headers(block, "Check Understanding", [])
        assess = parse_assessments(cu)
        key_points = []
        for line in kt.split("\n"):
            line = line.strip()
            if line.startswith("- "):
                key_points.append(line[2:].strip())
        key_points = key_points[:8]
        lesson_html = f"<h3>Lesson outline</h3>{md_bullets_to_html(lo)}<h3>Key takeaways</h3>{md_bullets_to_html(kt)}"
        gtitle = GERMAN_TITLES[idx_all] if idx_all < len(GERMAN_TITLES) else title
        idx_all += 1
        records.append(
            {
                "level": lid,
                "title": title,
                "title_de": gtitle,
                "content": lesson_html,
                "keyPoints": key_points or ["Review the lesson outline and key takeaways above."],
                "relatedTopics": find_related(rel),
                "resources": parse_resources(fl),
                "assess": assess,
            }
        )

    by_level = {"level1": [], "level2": [], "level3": [], "level4": []}
    for r in records:
        by_level[r["level"]].append(r)

    idx_map = {}
    counts = {"level1": 0, "level2": 0, "level3": 0, "level4": 0}
    for rec in records:
        lid = rec["level"]
        ti = counts[lid]
        counts[lid] += 1
        idx_map[id(rec)] = (lid, ti)

    categories = {
        "level1": ["essential", "embedded", "essential", "embedded", "embedded", "essential"],
        "level2": ["embedded", "embedded", "embedded", "embedded", "embedded", "embedded", "embedded", "essential"],
        "level3": ["robotics", "embedded", "essential", "embedded", "essential"],
        "level4": ["robotics", "embedded", "essential", "embedded"],
    }
    lines = ["const roadmapData = {", "    levels: ["]
    for lid in ["level1", "level2", "level3", "level4"]:
        lines.append("        {")
        lines.append(f"            id: '{lid}',")
        lines.append(f"            name: 'level.{lid}.name',")
        lines.append("            topics: [")
        for i, t in enumerate(topics_by_level[lid]):
            cat = categories[lid][i] if i < len(categories[lid]) else "embedded"
            name = t.replace("'", "\\'")
            lines.append(f"                {{ name: '{name}', category: '{cat}', completed: false }},")
        lines.append("            ]")
        lines.append("        },")
    lines.append("    ]")
    lines.append("};")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "levels.js").write_text("\n".join(lines) + "\n", encoding="utf-8")

    def js_str(s):
        return json.dumps(s)

    def emit_level_file(lid: str, items: list, lang_code: str, title_key: str) -> str:
        parts = [f"i18n.registerContent('{lang_code}', '{lid}', ["]
        for rec in items:
            title = rec[title_key]
            parts.append("    {")
            parts.append(f"        title: {js_str(title)},")
            parts.append(f"        content: `{rec['content']}`,")
            parts.append(f"        keyPoints: {json.dumps(rec['keyPoints'])},")
            parts.append(f"        relatedTopics: {json.dumps(rec['relatedTopics'])},")
            parts.append(f"        resources: {json.dumps(rec['resources'])}")
            parts.append("    },")
        parts.append("]);")
        return "\n".join(parts) + "\n"

    (OUT / "lang" / "de").mkdir(parents=True, exist_ok=True)
    for lid in ["level1", "level2", "level3", "level4"]:
        (OUT / f"{lid}.js").write_text(emit_level_file(lid, by_level[lid], "en", "title"), encoding="utf-8")
        (OUT / "lang" / "de" / f"{lid}.js").write_text(
            emit_level_file(lid, by_level[lid], "de", "title_de"), encoding="utf-8"
        )

    ex_lines = ["i18n.registerContent('en', 'quizzes', ["]
    ex_de = ["i18n.registerContent('de', 'quizzes', ["]
    for rec in records:
        lid, ti = idx_map[id(rec)]
        a = rec["assess"]
        if "mc" in a:
            m = a["mc"]
            line = (
                f"    {{ level: '{lid}', topicIndex: {ti}, question: {js_str(m['q'])}, "
                f"options: {json.dumps(m['opts'])}, correct: {m['correct']}, "
                f"explanation: {js_str(m.get('expl', ''))}, xp: 10 }},"
            )
            ex_lines.append(line)
            ex_de.append(line)
        if "tf" in a and a["tf"].get("a") is not None:
            tf = a["tf"]
            line = (
                f"    {{ level: '{lid}', topicIndex: {ti}, type: 'truefalse', question: {js_str(tf['q'])}, "
                f"answer: {str(tf['a']).lower()}, xp: 10, explanation: {js_str(tf.get('expl', ''))} }},"
            )
            ex_lines.append(line)
            ex_de.append(line)
        if "num" in a and a["num"].get("answer") is not None:
            n = a["num"]
            qlow = n["q"].lower()
            unit = "IoU" if "iou" in qlow else ""
            tol = 0.08 if unit == "IoU" else 0.12
            if "dmips" in qlow:
                unit = "DMIPS"
            elif "macs" in qlow and "million" in n.get("exp", "").lower():
                unit = "M MACs"
            elif "latency" in qlow or "milliseconds" in qlow or " ms" in qlow:
                unit = "ms"
            elif "how many times faster" in qlow:
                unit = "x"
            elif "hour" in qlow and "battery" in qlow:
                unit = "h"
            line = (
                f"    {{ level: '{lid}', topicIndex: {ti}, type: 'calculation', question: {js_str(n['q'])}, "
                f"answer: {n['answer']}, unit: {js_str(unit)}, tolerance: {tol}, xp: 15, "
                f"explanation: {js_str(n.get('expl', ''))} }},"
            )
            ex_lines.append(line)
            ex_de.append(line)

    ex_lines.append("]);")
    ex_de.append("]);")
    (OUT / "exercises.js").write_text("\n".join(ex_lines) + "\n", encoding="utf-8")
    (OUT / "lang" / "de" / "quizzes.js").write_text("\n".join(ex_de) + "\n", encoding="utf-8")

    sc_lines = ["i18n.registerContent('en', 'scenarios', ["]
    sc_de = ["i18n.registerContent('de', 'scenarios', ["]
    scenario_count = 0
    for rec in records:
        lid, ti = idx_map[id(rec)]
        a = rec["assess"].get("scen")
        if not a:
            continue
        scenario_count += 1
        choice_objs = []
        for letter, txt in a["choices"]:
            is_cor = letter == a["best"]
            choice_objs.append({"text": txt, "correct": is_cor, "xp": 20 if is_cor else 0})
        sc_lines.append("    {")
        sc_lines.append(f"        level: '{lid}', topicIndex: {ti},")
        sc_lines.append(f"        title: {js_str(rec['title'])},")
        sc_lines.append(f"        description: {js_str(a['desc'])},")
        sc_lines.append(f"        choices: {json.dumps(choice_objs)},")
        sc_lines.append(f"        explanation: {js_str(a['expl'])}")
        sc_lines.append("    },")
        sc_de.append("    {")
        sc_de.append(f"        level: '{lid}', topicIndex: {ti},")
        sc_de.append(f"        title: {js_str(rec['title_de'])},")
        sc_de.append(f"        description: {js_str(a['desc'])},")
        sc_de.append(f"        choices: {json.dumps(choice_objs)},")
        sc_de.append(f"        explanation: {js_str(a['expl'])}")
        sc_de.append("    },")
    sc_lines.append("]);")
    sc_de.append("]);")
    (OUT / "scenarios.js").write_text("\n".join(sc_lines) + "\n", encoding="utf-8")
    (OUT / "lang" / "de" / "scenarios.js").write_text("\n".join(sc_de) + "\n", encoding="utf-8")

    exercise_count = len(ex_lines) - 2
    topics_n = len(records)
    print("topics", topics_n, "exercises", exercise_count, "scenarios", scenario_count)


if __name__ == "__main__":
    main()
