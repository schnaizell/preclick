import { useState } from "react";
import { scenarios } from "./scenario";
import type { Scenario, Decision } from "./scenario";
import "./index.css";

function App() {
  const [currentScenarioId, setCurrentScenarioId] = useState(
    scenarios[0].id
  );
  const [selectedDecision, setSelectedDecision] =
    useState<Decision | null>(null);

  const currentScenario: Scenario =
    scenarios.find((s) => s.id === currentScenarioId)!;

  const handleDecisionSelect = (decision: Decision) => {
    setSelectedDecision(decision);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>PreClick</h1>
        <p className="subtitle">
          เครื่องมือฝึกการตัดสินใจก่อนคลิก ก่อนเชื่อ ก่อนพลาด
        </p>
      </header>

      {/* Scenario Switcher */}
      <div className="scenario-switcher">
        <label>
          <strong>สถานการณ์:</strong>{" "}
        </label>
        <select
          value={currentScenarioId}
          onChange={(e) => {
            setCurrentScenarioId(e.target.value);
            setSelectedDecision(null);
          }}
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.title}
            </option>
          ))}
        </select>
      </div>

      {/* Scenario Context */}
      <section className="panel">
        <h2>{currentScenario.title}</h2>
        <p>{currentScenario.context}</p>

        <div className="signal-list">
          <strong>สัญญาณที่สังเกตได้:</strong>
          <ul>
            {currentScenario.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Decisions */}
      <section>
        <h3>คุณคิดว่าจะทำอย่างไร?</h3>
        {currentScenario.decisions.map((decision) => (
          <button
            key={decision.id}
            onClick={() => handleDecisionSelect(decision)}
            className={`decision-btn ${
              selectedDecision?.id === decision.id ? "active" : ""
            }`}
          >
            {decision.label}
          </button>
        ))}
      </section>

      {/* Explanation */}
      {selectedDecision && (
        <section className="panel decision-summary">
          <h3>ภาพรวมของการตัดสินใจ</h3>

          <p>
            <strong>เหตุผลของการเลือกนี้:</strong>{" "}
            {selectedDecision.explanation}
          </p>

          {/* AI Explanation */}
          <div className="ai-box">
            <strong>🤖 มุมมองจาก AI:</strong>
            <p>{selectedDecision.aiExplanation}</p>
          </div>

          {/* Impact Summary */}
          <div className="impact">
            <strong>สิ่งที่เปลี่ยนแปลงตามมา:</strong>
            <ul>
              <li>
                ระดับความน่าเชื่อถือ:{" "}
                {selectedDecision.impact.trust}
              </li>
              <li>
                ระดับความเสี่ยง:{" "}
                {selectedDecision.impact.risk}
              </li>
              <li>
                ความมั่นใจในการตัดสินใจ:{" "}
                {selectedDecision.impact.confidence}
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
