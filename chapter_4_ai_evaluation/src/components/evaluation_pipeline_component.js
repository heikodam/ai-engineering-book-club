import React, { useState } from 'react';

const EvaluationPipelineComponent = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [showRubric, setShowRubric] = useState(false);
  const [showBusinessMetrics, setShowBusinessMetrics] = useState(false);

  const pipelineSteps = {
    1: {
      title: 'Evaluate All Components',
      icon: '🧩',
      description: 'Test every part of your AI system separately',
      analogy: 'Like checking every ingredient before baking a cake',
      components: [
        { name: 'Data Quality', test: 'Is input data clean?', icon: '📊' },
        { name: 'Model Performance', test: 'Does AI give good answers?', icon: '🤖' },
        { name: 'Response Time', test: 'Is it fast enough?', icon: '⚡' },
        { name: 'User Interface', test: 'Is it easy to use?', icon: '🎨' },
        { name: 'Error Handling', test: 'What happens when things go wrong?', icon: '🚨' }
      ]
    },
    2: {
      title: 'Create Evaluation Guidelines',
      icon: '📋',
      description: 'Make clear rules for scoring with examples',
      analogy: 'Like a teacher\'s grading rubric - everyone knows how points are earned',
      rubricExample: {
        task: 'Customer Service Response Quality',
        levels: [
          { score: 5, label: 'Excellent', criteria: 'Answers question completely, friendly tone, offers extra help' },
          { score: 4, label: 'Good', criteria: 'Answers question well, professional tone' },
          { score: 3, label: 'Acceptable', criteria: 'Answers basic question, neutral tone' },
          { score: 2, label: 'Poor', criteria: 'Partial answer, may confuse user' },
          { score: 1, label: 'Failing', criteria: 'Wrong answer or inappropriate response' }
        ]
      }
    },
    3: {
      title: 'Define Methods & Data',
      icon: '📊',
      description: 'Choose how to test and gather enough examples',
      analogy: 'Like planning a science experiment - you need the right method and enough samples',
      dataRequirements: {
        minimum: { amount: 300, description: 'Bare minimum to see patterns' },
        better: { amount: 1000, description: 'Good statistical confidence' },
        best: { amount: '5000+', description: 'Production-ready evaluation' }
      }
    }
  };

  const businessMetricsExample = {
    scenario: 'Customer Support AI',
    metrics: [
      { 
        evaluation: 'Factual Consistency', 
        current: '70%', 
        target: '90%',
        businessImpact: 'Can automate 20% → 50% of tickets',
        savings: '$200K → $500K per year'
      },
      {
        evaluation: 'Response Quality',
        current: '3.2/5',
        target: '4.5/5',
        businessImpact: 'Customer satisfaction 75% → 92%',
        savings: 'Reduce escalations by 60%'
      }
    ]
  };

  const currentStep = pipelineSteps[activeStep];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🔬</span>
        Design Your Evaluation Pipeline
      </h2>
      
      <div className="info-box">
        <h3>🏗️ What is an Evaluation Pipeline?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          It's your complete system for testing AI - like a quality control process in a 
          factory. You need to check every part, have clear standards, and test with real data!
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem', justifyContent: 'space-between' }}>
        {Object.entries(pipelineSteps).map(([step, data]) => (
          <button
            key={step}
            className="visual-item"
            onClick={() => setActiveStep(parseInt(step))}
            style={{ 
              cursor: 'pointer',
              flex: 1,
              minWidth: '150px',
              padding: '1rem',
              border: activeStep === parseInt(step) ? '3px solid #667eea' : '3px solid transparent',
              background: activeStep === parseInt(step) ? '#f0f4ff' : 'white'
            }}
          >
            <div style={{ fontSize: '2.5rem' }}>{data.icon}</div>
            <strong>Step {step}</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{data.title}</p>
          </button>
        ))}
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>{currentStep.icon} Step {activeStep}: {currentStep.title}</h3>
        <p style={{ color: '#666', marginTop: '1rem' }}>{currentStep.description}</p>
        
        <div className="warning-box" style={{ marginTop: '1rem' }}>
          <strong>Simple Analogy:</strong> {currentStep.analogy}
        </div>

        {activeStep === 1 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4>Components to Evaluate:</h4>
            <div className="visual-container" style={{ marginTop: '1rem', gap: '1rem' }}>
              {currentStep.components.map((component, index) => (
                <div key={index} className="visual-item" style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ fontSize: '2rem' }}>{component.icon}</div>
                  <h5>{component.name}</h5>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
                    {component.test}
                  </p>
                </div>
              ))}
            </div>
            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <strong>💡 Pro Tip:</strong> A chain is only as strong as its weakest link! 
              Test every component to find where improvements are needed most.
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div style={{ marginTop: '1.5rem' }}>
            <button
              className="button-primary"
              onClick={() => setShowRubric(!showRubric)}
            >
              {showRubric ? 'Hide' : 'Show'} Example Scoring Rubric 📊
            </button>

            {showRubric && (
              <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '15px' }}>
                <h4 style={{ color: '#667eea' }}>Example: {currentStep.rubricExample.task}</h4>
                {currentStep.rubricExample.levels.map((level) => (
                  <div key={level.score} style={{ 
                    marginTop: '1rem', 
                    padding: '1rem', 
                    background: '#f8f9fa', 
                    borderRadius: '10px',
                    borderLeft: `4px solid ${
                      level.score === 5 ? '#28a745' : 
                      level.score === 4 ? '#17a2b8' : 
                      level.score === 3 ? '#ffc107' : 
                      level.score === 2 ? '#fd7e14' : '#dc3545'
                    }`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{level.score} - {level.label}</strong>
                      <span style={{ fontSize: '1.5rem' }}>
                        {'⭐'.repeat(level.score)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#666' }}>
                      {level.criteria}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              className="button-secondary"
              onClick={() => setShowBusinessMetrics(!showBusinessMetrics)}
              style={{ marginTop: '1rem', marginLeft: '1rem' }}
            >
              {showBusinessMetrics ? 'Hide' : 'Show'} Business Impact 💰
            </button>

            {showBusinessMetrics && (
              <div className="info-box" style={{ marginTop: '1.5rem', background: '#e8f5e9' }}>
                <h4>Connecting Evaluation to Business Metrics</h4>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                  "Understanding the impact of evaluation metrics on business metrics is helpful 
                  for planning - if you know how much gain you can get from improving a certain metric..."
                </p>
                
                <h5 style={{ marginTop: '1rem' }}>Example: {businessMetricsExample.scenario}</h5>
                {businessMetricsExample.metrics.map((metric, index) => (
                  <div key={index} style={{ 
                    marginTop: '1rem', 
                    padding: '1rem', 
                    background: 'white', 
                    borderRadius: '10px' 
                  }}>
                    <strong>{metric.evaluation}</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                      <span style={{ color: '#dc3545' }}>{metric.current}</span>
                      <span>→</span>
                      <span style={{ color: '#28a745' }}>{metric.target}</span>
                      <span>=</span>
                      <span style={{ color: '#667eea', fontWeight: 'bold' }}>{metric.businessImpact}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                      💰 {metric.savings}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeStep === 3 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4>📊 How Much Data Do You Need?</h4>
            <div className="comparison-grid" style={{ marginTop: '1rem' }}>
              <div className="comparison-item" style={{ background: '#fff3cd' }}>
                <h5 style={{ color: '#856404' }}>
                  {currentStep.dataRequirements.minimum.amount} examples
                </h5>
                <p style={{ fontSize: '0.9rem' }}>Minimum</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
                  {currentStep.dataRequirements.minimum.description}
                </p>
              </div>
              <div className="comparison-item" style={{ background: '#d1ecf1' }}>
                <h5 style={{ color: '#0c5460' }}>
                  {currentStep.dataRequirements.better.amount} examples
                </h5>
                <p style={{ fontSize: '0.9rem' }}>Better</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
                  {currentStep.dataRequirements.better.description}
                </p>
              </div>
              <div className="comparison-item" style={{ background: '#d4edda' }}>
                <h5 style={{ color: '#155724' }}>
                  {currentStep.dataRequirements.best.amount} examples
                </h5>
                <p style={{ fontSize: '0.9rem' }}>Best</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
                  {currentStep.dataRequirements.best.description}
                </p>
              </div>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h5>💡 Use Production Data!</h5>
              <p style={{ marginTop: '0.5rem' }}>
                The best test data comes from real users. It's like training for a race on the 
                actual track instead of a treadmill - much more realistic!
              </p>
            </div>

            <div className="warning-box" style={{ marginTop: '1rem' }}>
              <h5>⚠️ Data Collection Tips</h5>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Start collecting early - don't wait until the end</li>
                <li>Include edge cases and difficult examples</li>
                <li>Balance your data (not all easy or all hard)</li>
                <li>Update regularly as your users change</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>🎯 Pipeline Summary</h3>
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🧩</div>
            <p style={{ fontSize: '0.85rem' }}>Test all parts</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>+</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📋</div>
            <p style={{ fontSize: '0.85rem' }}>Clear scoring</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>+</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📊</div>
            <p style={{ fontSize: '0.85rem' }}>Enough data</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>=</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>✅</div>
            <p style={{ fontSize: '0.85rem' }}>Great evaluation!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPipelineComponent;
