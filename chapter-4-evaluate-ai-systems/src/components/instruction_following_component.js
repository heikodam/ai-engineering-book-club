import React, { useState } from 'react';

const InstructionFollowingComponent = () => {
  const [activeTest, setActiveTest] = useState('format');
  const [showRoleplaying, setShowRoleplaying] = useState(false);

  const instructionTests = {
    format: {
      title: 'Format Instructions',
      icon: '📝',
      instruction: 'List 3 fruits in bullet points',
      good: '• Apple\n• Orange\n• Banana',
      bad: 'Apple, Orange, and Banana',
      feedback: 'Asked for bullet points, not commas!'
    },
    length: {
      title: 'Length Requirements',
      icon: '📏',
      instruction: 'Write exactly 5 words about dogs',
      good: 'Dogs are loyal best friends.',
      bad: 'Dogs are amazing, loyal, and friendly companions to humans.',
      feedback: 'Asked for 5 words, not 10!'
    },
    content: {
      title: 'Content Restrictions',
      icon: '🎯',
      instruction: 'Describe winter WITHOUT using "cold" or "snow"',
      good: 'Winter brings cozy fireplaces and holiday celebrations.',
      bad: 'Winter is cold with lots of snow.',
      feedback: 'Used forbidden words!'
    },
    style: {
      title: 'Style Requirements',
      icon: '✨',
      instruction: 'Explain gravity like you\'re talking to a 5-year-old',
      good: 'Gravity is like invisible glue that keeps us on the ground!',
      bad: 'Gravity is the force of attraction between masses proportional to their product.',
      feedback: 'Too complex for a 5-year-old!'
    }
  };

  const roleplayExamples = [
    { role: 'Pirate', icon: '🏴‍☠️', response: 'Ahoy matey! Ye be askin\' about the weather, arr!' },
    { role: 'Chef', icon: '👨‍🍳', response: 'Let me tell you, just like cooking, this requires patience!' },
    { role: 'Teacher', icon: '👩‍🏫', response: 'Great question! Let\'s break this down step by step...' },
    { role: 'Robot', icon: '🤖', response: 'PROCESSING... ANSWER COMPUTED... BEEP BOOP...' }
  ];

  const currentTest = instructionTests[activeTest];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">📋</span>
        Instruction Following & Roleplaying
      </h2>
      
      <div className="info-box">
        <h3>🎪 What is Instruction Following?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          It's like playing "Simon Says" with AI! We give specific instructions and check 
          if the AI follows them exactly. Just like how a good student follows the teacher's 
          directions carefully.
        </p>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>🧪 Automatic Verification Tests</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          These are tests that computers can check automatically - no humans needed!
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {Object.entries(instructionTests).map(([key, test]) => (
            <button
              key={key}
              className={activeTest === key ? 'button-primary' : 'button-secondary'}
              onClick={() => setActiveTest(key)}
            >
              {test.icon} {test.title}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h4>{currentTest.icon} Test: {currentTest.title}</h4>
          
          <div className="code-block" style={{ marginTop: '1rem' }}>
            <strong>📢 Instruction:</strong> {currentTest.instruction}
          </div>

          <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
            <div className="comparison-item" style={{ background: '#d4edda' }}>
              <h5 style={{ color: '#28a745' }}>✅ Good Response</h5>
              <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                {currentTest.good}
              </pre>
            </div>
            <div className="comparison-item" style={{ background: '#f8d7da' }}>
              <h5 style={{ color: '#dc3545' }}>❌ Bad Response</h5>
              <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                {currentTest.bad}
              </pre>
            </div>
          </div>

          <div className="warning-box" style={{ marginTop: '1rem' }}>
            <strong>Why it failed:</strong> {currentTest.feedback}
          </div>
        </div>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem', background: '#f0f4ff' }}>
        <h3>🎭 Roleplaying Capability</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          AI can pretend to be different characters! It's like an actor playing different roles.
        </p>

        <button
          className="button-primary"
          onClick={() => setShowRoleplaying(!showRoleplaying)}
        >
          {showRoleplaying ? 'Hide' : 'Show'} Roleplay Examples 🎪
        </button>

        {showRoleplaying && (
          <div style={{ marginTop: '2rem' }}>
            <div className="code-block">
              <strong>User:</strong> "Explain what clouds are"
            </div>
            
            <div className="visual-container" style={{ marginTop: '1.5rem', gap: '1rem' }}>
              {roleplayExamples.map((example, index) => (
                <div key={index} className="visual-item" style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{example.icon}</div>
                  <h5>As a {example.role}</h5>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    "{example.response}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>📊 Why Test These Things?</h3>
        <div className="visual-container" style={{ marginTop: '1rem', gap: '1rem' }}>
          <div className="visual-item" style={{ flex: 1 }}>
            <h4>Format Following</h4>
            <p style={{ fontSize: '0.9rem' }}>Important for structured data and reports</p>
          </div>
          <div className="visual-item" style={{ flex: 1 }}>
            <h4>Constraint Respect</h4>
            <p style={{ fontSize: '0.9rem' }}>Shows AI can work within boundaries</p>
          </div>
          <div className="visual-item" style={{ flex: 1 }}>
            <h4>Role Adaptation</h4>
            <p style={{ fontSize: '0.9rem' }}>Useful for different user needs</p>
          </div>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 The Big Picture</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Testing instruction following is like checking if someone is a good listener. 
          An AI that follows instructions well is more helpful and trustworthy!
        </p>
      </div>
    </div>
  );
};

export default InstructionFollowingComponent;
