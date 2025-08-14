import React, { useState } from 'react';

const AiAsJudgeComponent = () => {
  const [selectedMethod, setSelectedMethod] = useState('self');
  const [showDemo, setShowDemo] = useState(false);

  const verificationMethods = {
    self: {
      title: 'Self-Verification',
      icon: '🤖',
      description: 'The AI checks its own work',
      analogy: 'Like a student double-checking their own homework before submitting it',
      process: [
        { step: 1, action: 'AI generates answer', icon: '💭' },
        { step: 2, action: 'AI reviews its answer', icon: '🔍' },
        { step: 3, action: 'AI scores/fixes it', icon: '✏️' }
      ],
      example: {
        task: 'Write a summary of Romeo and Juliet',
        firstDraft: 'Romeo and Juliet is about two lovers who live happily ever after.',
        selfCheck: 'Wait, that\'s wrong! They actually die at the end.',
        finalAnswer: 'Romeo and Juliet is a tragedy about star-crossed lovers whose deaths unite their feuding families.'
      }
    },
    knowledge: {
      title: 'Knowledge-Augmented Verification',
      icon: '📚',
      description: 'The AI uses external knowledge to verify',
      analogy: 'Like a student using a textbook to check if their answer is correct',
      process: [
        { step: 1, action: 'AI generates answer', icon: '💭' },
        { step: 2, action: 'AI searches knowledge base', icon: '🔎' },
        { step: 3, action: 'AI compares & corrects', icon: '📊' }
      ],
      example: {
        task: 'What year was the iPhone released?',
        firstDraft: 'The iPhone was released in 2008.',
        knowledgeCheck: 'Checking database... Actually, it was 2007!',
        finalAnswer: 'The iPhone was first released by Apple in 2007.'
      }
    }
  };

  const currentMethod = verificationMethods[selectedMethod];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">⚖️</span>
        AI as a Judge
      </h2>
      
      <div className="info-box">
        <h3>🧑‍⚖️ What is AI as a Judge?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Instead of humans checking every AI answer, we can use AI to check AI! It's like 
          having a smart friend help you proofread your essay. There are two main ways:
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem', gap: '1rem' }}>
        <button
          className={`visual-item ${selectedMethod === 'self' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('self')}
          style={{ 
            cursor: 'pointer',
            flex: 1,
            border: selectedMethod === 'self' ? '3px solid #667eea' : '3px solid transparent',
            background: selectedMethod === 'self' ? '#f0f4ff' : 'white'
          }}
        >
          <div style={{ fontSize: '3rem' }}>{verificationMethods.self.icon}</div>
          <h4>{verificationMethods.self.title}</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            AI checks itself
          </p>
        </button>

        <button
          className={`visual-item ${selectedMethod === 'knowledge' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('knowledge')}
          style={{ 
            cursor: 'pointer',
            flex: 1,
            border: selectedMethod === 'knowledge' ? '3px solid #667eea' : '3px solid transparent',
            background: selectedMethod === 'knowledge' ? '#f0f4ff' : 'white'
          }}
        >
          <div style={{ fontSize: '3rem' }}>{verificationMethods.knowledge.icon}</div>
          <h4>{verificationMethods.knowledge.title}</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            AI uses external facts
          </p>
        </button>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>{currentMethod.icon} How {currentMethod.title} Works</h3>
        
        <div className="warning-box" style={{ marginTop: '1rem' }}>
          <strong>Simple Analogy:</strong> {currentMethod.analogy}
        </div>

        <div className="visual-container" style={{ marginTop: '2rem', justifyContent: 'space-around' }}>
          {currentMethod.process.map((step, index) => (
            <React.Fragment key={step.step}>
              <div className="visual-item" style={{ padding: '1rem', minWidth: '150px' }}>
                <div style={{ fontSize: '2rem' }}>{step.icon}</div>
                <strong>Step {step.step}</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{step.action}</p>
              </div>
              {index < currentMethod.process.length - 1 && (
                <div style={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className="button-primary"
          onClick={() => setShowDemo(!showDemo)}
          style={{ marginTop: '2rem' }}
        >
          {showDemo ? 'Hide' : 'Show'} Real Example 🎯
        </button>

        {showDemo && (
          <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '15px' }}>
            <h4>Example: {currentMethod.example.task}</h4>
            
            <div style={{ marginTop: '1.5rem' }}>
              <div className="code-block" style={{ background: '#ffe6e6' }}>
                <strong>🤖 First Try:</strong>
                <p style={{ marginTop: '0.5rem' }}>{currentMethod.example.firstDraft}</p>
              </div>

              <div className="info-box" style={{ marginTop: '1rem' }}>
                <strong>🔍 Verification Process:</strong>
                <p style={{ marginTop: '0.5rem' }}>{currentMethod.example.knowledgeCheck}</p>
              </div>

              <div className="success-box" style={{ marginTop: '1rem' }}>
                <strong>✅ Final Answer:</strong>
                <p style={{ marginTop: '0.5rem' }}>{currentMethod.example.finalAnswer}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="comparison-grid" style={{ marginTop: '2rem' }}>
        <div className="comparison-item">
          <h4 style={{ color: '#28a745' }}>✅ Advantages</h4>
          <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
            <li>Much faster than human checking</li>
            <li>Can check thousands of answers</li>
            <li>Works 24/7 without getting tired</li>
            <li>Consistent evaluation criteria</li>
          </ul>
        </div>
        <div className="comparison-item">
          <h4 style={{ color: '#dc3545' }}>⚠️ Limitations</h4>
          <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
            <li>AI might miss its own mistakes</li>
            <li>Can be fooled by confident-sounding errors</li>
            <li>Still needs human oversight</li>
            <li>May inherit biases</li>
          </ul>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Key Insight</h3>
        <p style={{ marginTop: '0.5rem' }}>
          AI judges are like spell-checkers - super helpful for catching many errors quickly, 
          but you still need human judgment for the important stuff!
        </p>
      </div>
    </div>
  );
};

export default AiAsJudgeComponent;
