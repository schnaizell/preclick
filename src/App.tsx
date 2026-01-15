import { useState } from "react";
import { scenarios } from "./scenario";
import type { Scenario, Decision, Outcome } from "./scenario";
import { getDeterministicRandom } from "./simulate";

function App() {
  const [behavior, setBehavior] = useState({
    riskyCount: 0,
    cautiousCount: 0,
  });

  const [currentScenarioId, setCurrentScenarioId] = useState(scenarios[0].id);

  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );

  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);

  const currentScenario: Scenario =
    scenarios.find((s) => s.id === currentScenarioId) ?? scenarios[0];

  const handleDecisionSelect = (decision: Decision) => {
    const index = Math.floor(
      getDeterministicRandom() * decision.outcomes.length
    );
    const chosenOutcome = decision.outcomes[index];

    setSelectedDecision(decision);
    setSelectedOutcome(chosenOutcome);

    // เรียนรู้พฤติกรรมผู้เล่น
    if (decision.impact.risk === "สูง") {
      setBehavior((b) => ({ ...b, riskyCount: b.riskyCount + 1 }));
    }
    if (decision.impact.risk === "ต่ำ") {
      setBehavior((b) => ({ ...b, cautiousCount: b.cautiousCount + 1 }));
    }
  };

  const retryOutcome = () => {
    if (!selectedDecision || !selectedOutcome) return;

    const outcomes = selectedDecision.outcomes;

    if (outcomes.length <= 1) return;

    let next: Outcome = selectedOutcome;

    while (next === selectedOutcome) {
      // Use deterministic randomness for consistent decision outcomes
      const index = Math.floor(getDeterministicRandom() * outcomes.length);
      next = outcomes[index];
    }

    setSelectedOutcome(next);
  };

  const randomScenario = () => {
    // Select next scenario with light bias based on observed user behavior
    // (intentional: not adaptive learning, only soft exposure)
    const pool: Scenario[] = [];

    scenarios.forEach((s) => {
      if (
        behavior.riskyCount > behavior.cautiousCount &&
        s.tags?.includes("finance")
      ) {
        pool.push(s, s, s);
      } else {
        pool.push(s);
      }
    });

    if (pool.length === 0) return;

    let next = currentScenario;

    if (pool.length > 1) {
      while (next.id === currentScenario.id) {
        const index = Math.floor(getDeterministicRandom() * pool.length);
        next = pool[index];
      }
    }

    setCurrentScenarioId(next.id);
    setSelectedDecision(null);
    setSelectedOutcome(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>PreClick</h1>
        <p className="subtitle">
          เครื่องมือฝึกการตัดสินใจก่อนคลิก ก่อนเชื่อ ก่อนพลาด
        </p>
      </header>

      <div className="scenario-switcher">
        <label htmlFor="scenario-select">
          <strong>เลือกสถานการณ์:</strong>
        </label>
        <select
          id="scenario-select"
          value={currentScenarioId}
          onChange={(e) => {
            setCurrentScenarioId(e.target.value);
            setSelectedDecision(null);
            setSelectedOutcome(null);
          }}
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.title}
            </option>
          ))}
        </select>
      </div>

      <section className="panel">
        <div className="scenario-header">
          <h2>{currentScenario.title}</h2>
          <button onClick={randomScenario}>🔀 สถานการณ์ใหม่</button>
        </div>

        <p>{currentScenario.context}</p>

        <strong>สัญญาณที่ควรสังเกต:</strong>
        <ul>
          {currentScenario.signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h3>ถ้าเป็นคุณ จะเลือกแบบไหน?</h3>
        {currentScenario.decisions.map((decision) => (
          <button
            key={decision.id}
            onClick={() => handleDecisionSelect(decision)}
          >
            {decision.label}
          </button>
        ))}
      </section>

      {selectedDecision && selectedOutcome && (
        <section className="panel decision-summary">
          <h3>สิ่งที่อาจเกิดขึ้น</h3>

          <p>
            <strong>สิ่งที่เกิดขึ้น:</strong> {selectedOutcome.description}
          </p>

          <p>
            <strong>ผลต่อชีวิต:</strong> {selectedOutcome.lifeImpact}
          </p>

          <p>
            <strong>ผลต่อทรัพย์สิน:</strong> {selectedOutcome.assetImpact}
          </p>

          <div className="impact">
            <strong>ภาพรวมของการตัดสินใจ</strong>
            <ul>
              <li>ความน่าเชื่อถือ: {selectedDecision.impact.trust}</li>
              <li>ความเสี่ยง: {selectedDecision.impact.risk}</li>
              <li>ความมั่นใจ: {selectedDecision.impact.confidence}</li>
            </ul>
          </div>

          <button onClick={retryOutcome}>🔄 ลองดูอีกผลลัพธ์หนึ่ง</button>
        </section>
      )}
    </div>
  );
}

export default App;
