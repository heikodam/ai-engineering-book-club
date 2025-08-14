import React, { useState } from 'react';

const EvaluationDrivenComponent = () => {
  const [selectedCapability, setSelectedCapability] = useState('domain');

  const capabilities = {
    domain: {
      title: 'Domain-Specific Capability',
      icon: '🎯',
      description: 'How well the AI performs in a specific area',
      examples: [
        { task: 'Medical Diagnosis AI', test: 'Can it identify diseases from symptoms?', score: 85 },
        { task: 'Code Assistant AI', test: 'Can it write working Python code?', score: 92 },
        { task: 'Customer Service AI', test: 'Can it resolve customer complaints?', score: 78 }
      ],
      analogy: 'Like testing if a chef can make Italian food specifically, not just any food!'
    },
    generation: {
      title: 'Generation Capability',
      icon: '✨',
      description: 'How well the AI creates new content',
      examples: [
        { task: 'Story Writing', test: 'Can it write engaging stories?', score: 88 },
        { task: 'Image Creation', test: 'Can it generate realistic images?', score: 94 },
        { task: 'Music Composition', test: 'Can it compose original melodies?', score: 76 }
      ],
      analogy: 'Like testing if an artist can create original paintings, not just copy others!'
    }
  };

  const currentCapability = capabilities[selectedCapability];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🔄</span>
        Evaluation-Driven Development
      </h2>
      
      <div className="info-box">
        <h3>🤖 What is Evaluation-Driven Development?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Think of it like studying for a test! You don't just read the textbook once - 
          you practice, check your answers, and improve. That's exactly what we do with AI:
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem' }}>
        <div className="visual-item" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>1️⃣</div>
          <strong>Build</strong>
          <p>Create AI system</p>
        </div>
        <div style={{ fontSize: '2rem' }}>→</div>
        <div className="visual-item" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>2️⃣</div>
          <strong>Test</strong>
          <p>Evaluate performance</p>
        </div>
        <div style={{ fontSize: '2rem' }}>→</div>
        <div className="visual-item" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>3️⃣</div>
          <strong>Improve</strong>
          <p>Fix weaknesses</p>
        </div>
        <div style={{ fontSize: '2rem' }}>→</div>
        <div className="visual-item" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>🔄</div>
          <strong>Repeat</strong>
          <p>Keep improving!</p>
        </div>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>🎓 Types of Capabilities We Test</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className={selectedCapability === 'domain' ? 'button-primary' : 'button-secondary'}
            onClick={() => setSelectedCapability('domain')}
          >
            {capabilities.domain.icon} Domain-Specific
          </button>
          <button
            className={selectedCapability === 'generation' ? 'button-primary' : 'button-secondary'}
            onClick={() => setSelectedCapability('generation')}
          >
            {capabilities.generation.icon} Generation
          </button>
        </div>

        <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
            {currentCapability.icon} {currentCapability.title}
          </h4>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{currentCapability.description}</p>
          
          <div className="warning-box" style={{ marginBottom: '1.5rem' }}>
            <strong>Simple Analogy:</strong> {currentCapability.analogy}
          </div>

          <h5 style={{ marginBottom: '1rem' }}>Real Examples:</h5>
          {currentCapability.examples.map((example, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{example.task}</strong>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{example.test}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="progress-bar" style={{ width: '150px', marginBottom: '0.5rem' }}>
                    <div 
                      className="progress-fill" 
                      style={{ width: `${example.score}%` }}
                    >
                      {example.score}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Why This Matters</h3>
        <p style={{ marginTop: '0.5rem' }}>
          By constantly testing and improving, we make sure our AI gets better over time - 
          just like how athletes train for competitions or students prepare for exams!
        </p>
      </div>
    </div>
  );
};

export default EvaluationDrivenComponent;
