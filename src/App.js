import React, { useState } from "react";

const zones = ["Short", "Medium", "Long", "Extreme"];
const turnStates = ["Pending", "Fast Turn Taken", "Slow Turn Taken"];
const statusEffects = ["Healthy", "Injured", "Dead"];
const combatantTypes = ["PC", "Enemy", "Ally", "NPC"];

const CombatTracker = () => {
  const [combatants, setCombatants] = useState([]);
  const [savedCombatants, setSavedCombatants] = useState([]);
  const [round, setRound] = useState(1);
  const [combatLog, setCombatLog] = useState([]);
  const [roundSummaries, setRoundSummaries] = useState([]);
  const [combatEnded, setCombatEnded] = useState(false);
  const [newCombatant, setNewCombatant] = useState({
    name: "",
    type: "PC",
    zone: "Short",
    turn: "Pending",
    status: "Healthy",
    customText: "",
    action: "",
  });

  const updateCombatant = (index, field, value) => {
    const updated = [...combatants];
    updated[index][field] = value;
    setCombatants(updated);
  };

  const resetTurns = () => {
    const roundSummary = combatants
      .map(
        (c) =>
          `Round ${round}: ${c.name} (${c.type}) - Zone: ${c.zone}, Turn: ${c.turn}, Status: ${c.status}, Action: ${c.action}, Notes: ${c.customText}`
      )
      .join("\n");
    setRoundSummaries([...roundSummaries, roundSummary]);
    setCombatLog([...combatLog, `Round ${round} completed.`]);
    setCombatants(combatants.map((c) => ({ ...c, turn: "Pending" })));
    setRound(round + 1);
  };

  const resetCombat = () => {
    setCombatLog([]);
    setRoundSummaries([]);
    setRound(1);
    setCombatants(savedCombatants.map((c) => ({ ...c, turn: "Pending" })));
    setCombatEnded(false);
  };

  const addCombatant = () => {
    if (newCombatant.name.trim() !== "") {
      setCombatants([...combatants, newCombatant]);
      setNewCombatant({
        name: "",
        type: "PC",
        zone: "Short",
        turn: "Pending",
        status: "Healthy",
        customText: "",
        action: "",
      });
    }
  };

  const removeCombatant = (index) => {
    setCombatants(combatants.filter((_, i) => i !== index));
  };

  const endCombat = () => {
    const summary = roundSummaries.join("\n\n");
    setCombatLog([
      ...combatLog,
      `Combat ended after ${round} rounds.\n\nRound Summaries:\n${summary}`,
    ]);
    setCombatEnded(true);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        margin: "auto",
        backgroundColor: "#222",
        color: "white",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#ff4444" }}>
        PbP Combat Tracker
      </h1>
      <p style={{ textAlign: "center", color: "#ffcc00" }}>Round: {round}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "10px",
          justifyContent: "center",
        }}
      >
        <input
          placeholder="New Combatant Name"
          value={newCombatant.name}
          onChange={(e) =>
            setNewCombatant({ ...newCombatant, name: e.target.value })
          }
          style={{ flex: 1, padding: "5px", minWidth: "150px" }}
        />
        <select
          onChange={(e) =>
            setNewCombatant({ ...newCombatant, type: e.target.value })
          }
          style={{ padding: "5px", minWidth: "100px" }}
        >
          {combatantTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={addCombatant}
          style={{
            backgroundColor: "#44aa44",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add Combatant
        </button>
      </div>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid white",
          padding: "10px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {combatants.map((combatant, index) => (
          <div
            key={index}
            style={{ padding: "10px", borderBottom: "1px solid gray" }}
          >
            <p>
              <strong>{combatant.name}</strong> ({combatant.type})
            </p>
            <input
              placeholder="Action Details"
              value={combatant.action}
              onChange={(e) => updateCombatant(index, "action", e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
            <input
              placeholder="Notes"
              value={combatant.customText}
              onChange={(e) =>
                updateCombatant(index, "customText", e.target.value)
              }
              style={{ width: "100%", padding: "5px", marginTop: "5px" }}
            />
            <button
              onClick={() => removeCombatant(index)}
              style={{
                backgroundColor: "#aa4444",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                marginTop: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={resetTurns}
          style={{
            backgroundColor: "#ffcc00",
            color: "black",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Next Round
        </button>
        <button
          onClick={resetCombat}
          style={{
            backgroundColor: "#777",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Reset Combat
        </button>
        <button
          onClick={endCombat}
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
          }}
        >
          End Combat
        </button>
      </div>
      {combatEnded && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#444",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ color: "#ff4444" }}>Combat Summary</h2>
          {combatLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CombatTracker;
