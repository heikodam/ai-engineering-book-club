import React, { useState } from 'react';

const ModelSelectionComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCostLatency, setShowCostLatency] = useState(false);

  const selectionSteps = {
    1: {
      title: 'Filter by Hard Requirements',
      icon: '🔍',
      description: 'Remove models that don\'t meet your basic needs',
      analogy: 'Like filtering cars by "must have 4 doors" before even looking at them',
      examples: [
        { requirement: 'Must work offline', result: '❌ Cloud-only models out' },
        { requirement: 'Must handle images', result: '❌ Text-only models out' },
        { requirement: 'Must be free to use', result: '❌ Paid models out' }
      ]
    },
    2: {
      title: 'Check Public Information',
      icon: '📊',
      description: 'Look at benchmarks and reviews from other users',
      analogy: 'Like reading restaurant reviews before choosing where to eat',
      examples: [
        { source: 'Benchmark scores', info: 'How well it performs on standard tests' },
        { source: 'User reviews', info: 'What real people say about it' },
        { source: 'Documentation', info: 'How easy it is to use' }
      ]
    },
    3: {
      title: 'Run Your Own Tests',
      icon: '🧪',
      description: 'Test with your specific use case',
      analogy: 'Like test-driving a car with your daily route',
      examples: [
        { test: 'Your data', result: 'Does it work with your specific needs?' },
        { test: 'Your users', result: 'Do your users like the results?' },
        { test: 'Your constraints', result: 'Is it fast/cheap enough?' }
      ]
    },
    4: {
      title: 'Monitor in Production',
      icon: '📈',
      description: 'Keep checking after you start using it',
      analogy: 'Like regular car maintenance to keep it running well',
      examples: [
        { monitor: 'Performance', check: 'Is it still accurate?' },
        { monitor: 'User feedback', check: 'Are users happy?' },
        { monitor: 'Costs', check: 'Is it still affordable?' }
      ]
    }
  };

  const costLatencyFactors = {
    cost: {
      title: 'Cost Considerations',
      icon: '💰',
      factors: [
        { name: 'Per request pricing', example: '$0.001 per API call' },
        { name: 'Monthly subscriptions', example: '$20/month unlimited' },
        { name: 'Compute resources', example: 'GPU server costs' },
        { name: 'Hidden costs', example: 'Development time, maintenance' }
      ]
    },
    latency: {
      title: 'Speed Considerations',
      icon: '⚡',
      factors: [
        { name: 'Response time', example: '100ms vs 2 seconds' },
        { name: 'Network delays', example: 'Cloud vs local processing' },
        { name: 'Batch processing', example: 'One at a time vs many together' },
        { name: 'User experience', example: 'How long users will wait' }
      ]
    }
  };

  const currentStepData = selectionSteps[currentStep];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🎯</span>
        Model Selection Workflow
      </h2>
      
      <div className="info-box">
        <h3>🤔 How to Choose the Right AI Model?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Choosing an AI model is like choosing the right tool for a job. You wouldn't use 
          a hammer to paint a wall! Here's a simple 4-step process to find your perfect AI match.
        </p>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>📍 The 4-Step Selection Process</h3>
        
        <div className="visual-container" style={{ marginTop: '1.5rem', justifyContent: 'space-between' }}>
          {Object.entries(selectionSteps).map(([step, data]) => (
            <button
              key={step}
              className="visual-item"
              onClick={() => setCurrentStep(parseInt(step))}
              style={{ 
                cursor: 'pointer',
                flex: 1,
                minWidth: '120px',
                padding: '1rem',
                border: currentStep === parseInt(step) ? '3px solid #667eea' : '3px solid transparent',
                background: currentStep === parseInt(step) ? '#f0f4ff' : 'white'
              }}
            >
              <div style={{ fontSize: '2rem' }}>{data.icon}</div>
              <strong>Step {step}</strong>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{data.title}</p>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
            {currentStepData.icon} Step {currentStep}: {currentStepData.title}
          </h4>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{currentStepData.description}</p>
          
          <div className="warning-box" style={{ marginBottom: '1.5rem' }}>
            <strong>Simple Analogy:</strong> {currentStepData.analogy}
          </div>

          <h5 style={{ marginBottom: '1rem' }}>Examples:</h5>
          {currentStepData.examples.map((example, index) => (
            <div key={index} style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '10px', 
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <strong>{example.requirement || example.source || example.test || example.monitor}</strong>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {example.result || example.info || example.check}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            className="button-secondary"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          <button
            className="button-secondary"
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            style={{ opacity: currentStep === 4 ? 0.5 : 1 }}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem', background: '#fff3cd' }}>
        <h3>💰⚡ Cost and Latency Matter!</h3>
        <button
          className="button-primary"
          onClick={() => setShowCostLatency(!showCostLatency)}
          style={{ marginTop: '1rem' }}
        >
          {showCostLatency ? 'Hide' : 'Learn About'} Cost & Speed Trade-offs
        </button>

        {showCostLatency && (
          <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
            {Object.entries(costLatencyFactors).map(([key, data]) => (
              <div key={key} className="comparison-item">
                <h4 style={{ color: '#667eea' }}>
                  {data.icon} {data.title}
                </h4>
                {data.factors.map((factor, index) => (
                  <div key={index} style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <strong>{factor.name}</strong>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                      {factor.example}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#e3f2fd' }}>
        <h3>⚖️ The Balance Game</h3>
        <div className="visual-container" style={{ marginTop: '1rem', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🚀</div>
            <strong>Fast & Expensive</strong>
            <p style={{ fontSize: '0.9rem' }}>Premium models, instant results</p>
          </div>
          <div style={{ fontSize: '2rem' }}>↔️</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🐌</div>
            <strong>Slow & Cheap</strong>
            <p style={{ fontSize: '0.9rem' }}>Budget models, wait times</p>
          </div>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Pro Tip</h3>
        <p style={{ marginTop: '0.5rem' }}>
          There's no "best" model for everyone - the right choice depends on YOUR specific needs. 
          Start with step 1 and work through each step carefully. You'll find your perfect match!
        </p>
      </div>
    </div>
  );
};

export default ModelSelectionComponent;
