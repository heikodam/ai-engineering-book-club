import React, { useState } from 'react';

const DataContaminationComponent = () => {
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [selectedExample, setSelectedExample] = useState('exam');

  const contaminationExamples = {
    exam: {
      title: 'The Exam Cheat',
      icon: '📝',
      scenario: 'A student sees the exact test questions before the exam',
      problem: 'They score 100% but don\'t actually understand the material',
      aiEquivalent: 'AI trained on test data scores perfectly but fails on new problems'
    },
    cooking: {
      title: 'The Recipe Memorizer',
      icon: '👨‍🍳',
      scenario: 'A chef memorizes one recipe perfectly',
      problem: 'Can\'t cook anything else or adapt to new ingredients',
      aiEquivalent: 'AI memorizes specific answers but can\'t generalize'
    },
    sports: {
      title: 'The Practice Game',
      icon: '⚽',
      scenario: 'A team only practices against the same opponent',
      problem: 'They win practice games but lose real matches',
      aiEquivalent: 'AI performs well on familiar data but poorly on real-world tasks'
    }
  };

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🚫</span>
        Data Contamination
      </h2>
      
      <div className="info-box">
        <h3>💧 What is Data Contamination?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Imagine if you accidentally studied from the answer key instead of the textbook - 
          you'd ace the test but wouldn't really learn anything! Data contamination is when 
          AI accidentally "cheats" by seeing test questions during training.
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem' }}>
        <div className="visual-item" style={{ background: '#d4edda' }}>
          <div style={{ fontSize: '3rem' }}>✅</div>
          <h4>Clean Training</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Train on practice problems<br/>
            Test on new problems<br/>
            <strong>Real learning happens!</strong>
          </p>
        </div>
        
        <div style={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>VS</div>
        
        <div className="visual-item" style={{ background: '#f8d7da' }}>
          <div style={{ fontSize: '3rem' }}>❌</div>
          <h4>Contaminated Training</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Train on test answers<br/>
            Test on same answers<br/>
            <strong>Just memorization!</strong>
          </p>
        </div>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>🎭 Real-World Analogies</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Let's understand contamination through everyday examples:
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {Object.entries(contaminationExamples).map(([key, example]) => (
            <button
              key={key}
              className={selectedExample === key ? 'button-primary' : 'button-secondary'}
              onClick={() => setSelectedExample(key)}
            >
              {example.icon} {example.title}
            </button>
          ))}
        </div>

        {selectedExample && (
          <div style={{ marginTop: '1.5rem', background: 'white', padding: '2rem', borderRadius: '15px' }}>
            <h4 style={{ color: '#667eea' }}>
              {contaminationExamples[selectedExample].icon} {contaminationExamples[selectedExample].title}
            </h4>
            
            <div className="warning-box" style={{ marginTop: '1rem' }}>
              <strong>Scenario:</strong> {contaminationExamples[selectedExample].scenario}
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#ffe6e6', borderRadius: '10px' }}>
              <strong>The Problem:</strong> {contaminationExamples[selectedExample].problem}
            </div>
            
            <div className="info-box" style={{ marginTop: '1rem' }}>
              <strong>AI Equivalent:</strong> {contaminationExamples[selectedExample].aiEquivalent}
            </div>
          </div>
        )}
      </div>

      <div className="demo-box" style={{ marginTop: '2rem', background: '#fff3cd' }}>
        <h3>🔍 Types of Data Leakage</h3>
        
        <button
          className="button-primary"
          onClick={() => setShowExamples(!showExamples)}
          style={{ marginTop: '1rem' }}
        >
          {showExamples ? 'Hide' : 'Show'} Contamination Types 🎯
        </button>

        {showExamples && (
          <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
            <div className="comparison-item">
              <h4 style={{ color: '#e74c3c' }}>🎯 Direct Leakage</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                <strong>What:</strong> Test data directly in training set
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                <strong>Example:</strong> Wikipedia test questions were used for training
              </p>
              <div className="code-block" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                Training: "Capital of France is Paris"<br/>
                Test: "What is the capital of France?"<br/>
                Result: 100% (but just memorized!)
              </div>
            </div>

            <div className="comparison-item">
              <h4 style={{ color: '#e67e22' }}>📊 Statistical Leakage</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                <strong>What:</strong> Test patterns leaked into training
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                <strong>Example:</strong> Similar questions with same structure
              </p>
              <div className="code-block" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                Training: Many "X is capital of Y" facts<br/>
                Test: "What is capital of [Country]?"<br/>
                Result: Too easy - pattern memorized!
              </div>
            </div>

            <div className="comparison-item">
              <h4 style={{ color: '#8e44ad' }}>🕰️ Temporal Leakage</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                <strong>What:</strong> Using future data to predict past
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                <strong>Example:</strong> Training on 2024 data, testing on 2023
              </p>
              <div className="code-block" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                Training: News from 2024<br/>
                Test: "Predict 2023 events"<br/>
                Result: Perfect (already knows answers!)
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#e3f2fd' }}>
        <h3>🛡️ How to Prevent Contamination</h3>
        <div className="visual-container" style={{ marginTop: '1rem', gap: '1rem' }}>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>1️⃣</div>
            <strong>Separate Data Early</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Split train/test before any processing
            </p>
          </div>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>2️⃣</div>
            <strong>Time-Based Splits</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Train on past, test on future
            </p>
          </div>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>3️⃣</div>
            <strong>Check for Duplicates</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Remove test data from training
            </p>
          </div>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>4️⃣</div>
            <strong>Use Fresh Tests</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Create new benchmarks regularly
            </p>
          </div>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Remember</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Data contamination is like accidentally giving students the answer key - they'll 
          score perfectly but won't actually learn. Always keep your training and test data 
          completely separate to ensure your AI truly understands, not just memorizes!
        </p>
      </div>
    </div>
  );
};

export default DataContaminationComponent;
