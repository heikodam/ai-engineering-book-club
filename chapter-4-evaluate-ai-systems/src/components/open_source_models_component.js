import React, { useState } from 'react';

const OpenSourceModelsComponent = () => {
  const [selectedAspect, setSelectedAspect] = useState('basics');
  const [showDebate, setShowDebate] = useState(false);

  const aspects = {
    basics: {
      title: 'The Basics',
      content: {
        opensource: {
          icon: '🌐',
          title: 'Open Source Models',
          description: 'Free to use, modify, and share',
          analogy: 'Like a recipe you can copy, change, and share with friends',
          examples: ['LLaMA', 'BLOOM', 'Stable Diffusion', 'BERT']
        },
        proprietary: {
          icon: '🔒',
          title: 'Proprietary Models',
          description: 'Owned by companies, access through APIs',
          analogy: 'Like a restaurant - you can order food but can\'t see the recipe',
          examples: ['GPT-4', 'Claude', 'Gemini', 'DALL-E']
        }
      }
    },
    licensing: {
      title: 'Licensing & Restrictions',
      content: {
        opensource: {
          icon: '📜',
          title: 'Open Licenses',
          points: [
            '✅ Can use for commercial projects',
            '✅ Can modify and improve',
            '⚠️ Must check specific license terms',
            '⚠️ Some require attribution'
          ]
        },
        proprietary: {
          icon: '📋',
          title: 'Terms of Service',
          points: [
            '❌ Can\'t see or modify the code',
            '❌ Usage limits and restrictions',
            '⚠️ Data might be used for training',
            '⚠️ Service can change or stop'
          ]
        }
      }
    },
    costs: {
      title: 'Cost Comparison',
      content: {
        opensource: {
          icon: '💸',
          title: 'Open Source Costs',
          breakdown: [
            { item: 'Model itself', cost: 'Free! 🎉' },
            { item: 'Computing power', cost: '$$ - $$$$ 💻' },
            { item: 'Engineering time', cost: '$$$ - $$$$ 👨‍💻' },
            { item: 'Maintenance', cost: '$$ ongoing 🔧' }
          ]
        },
        proprietary: {
          icon: '💳',
          title: 'API Costs',
          breakdown: [
            { item: 'Per request', cost: '$ - $$ per 1000 calls 📞' },
            { item: 'No hardware needed', cost: 'Included ✅' },
            { item: 'No maintenance', cost: 'Provider handles 🛠️' },
            { item: 'Scaling', cost: 'Pay as you grow 📈' }
          ]
        }
      }
    },
    deployment: {
      title: 'Deployment Options',
      content: {
        opensource: {
          icon: '📱',
          title: 'On-Device Deployment',
          benefits: [
            '🔒 Complete privacy - data stays local',
            '⚡ No internet needed',
            '💰 No ongoing API costs',
            '🎯 Full control over the model'
          ]
        },
        proprietary: {
          icon: '☁️',
          title: 'Cloud Deployment',
          benefits: [
            '🚀 Always latest version',
            '⚙️ No setup required',
            '📈 Handles any scale',
            '🔧 Automatic improvements'
          ]
        }
      }
    }
  };

  const currentAspect = aspects[selectedAspect];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🌍</span>
        Open Source vs Proprietary Models
      </h2>
      
      <div className="info-box">
        <h3>🤖 Two Types of AI Models</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Just like software can be free (like Firefox) or paid (like Microsoft Office), 
          AI models come in two flavors: open source (free to use and modify) and 
          proprietary (owned by companies).
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
        {Object.entries(aspects).map(([key, aspect]) => (
          <button
            key={key}
            className={selectedAspect === key ? 'button-primary' : 'button-secondary'}
            onClick={() => setSelectedAspect(key)}
          >
            {aspect.title}
          </button>
        ))}
      </div>

      <div className="comparison-grid" style={{ marginTop: '2rem' }}>
        {Object.entries(currentAspect.content).map(([key, data]) => (
          <div key={key} className="comparison-item">
            <h3 style={{ color: key === 'opensource' ? '#27ae60' : '#e74c3c' }}>
              {data.icon} {data.title}
            </h3>
            
            {selectedAspect === 'basics' && (
              <>
                <p style={{ marginTop: '1rem', color: '#666' }}>{data.description}</p>
                <div className="warning-box" style={{ marginTop: '1rem' }}>
                  <strong>Like this:</strong> {data.analogy}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <strong>Examples:</strong>
                  <ul style={{ marginTop: '0.5rem', listStyle: 'none', padding: 0 }}>
                    {data.examples.map((example, idx) => (
                      <li key={idx} style={{ marginTop: '0.25rem' }}>• {example}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {selectedAspect === 'licensing' && (
              <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                {data.points.map((point, idx) => (
                  <li key={idx} style={{ marginTop: '0.5rem' }}>{point}</li>
                ))}
              </ul>
            )}

            {selectedAspect === 'costs' && (
              <div style={{ marginTop: '1rem' }}>
                {data.breakdown.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    background: '#f8f9fa',
                    borderRadius: '5px'
                  }}>
                    <span>{item.item}</span>
                    <span style={{ fontWeight: 'bold' }}>{item.cost}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedAspect === 'deployment' && (
              <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                {data.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ marginTop: '0.5rem' }}>{benefit}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="demo-box" style={{ marginTop: '2rem', background: '#f0f4ff' }}>
        <h3>🤔 The Big Debate</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Do open source models have the incentive to catch up with proprietary models?
        </p>
        
        <button
          className="button-primary"
          onClick={() => setShowDebate(!showDebate)}
        >
          {showDebate ? 'Hide' : 'Show'} Different Perspectives 💭
        </button>

        {showDebate && (
          <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
            <div className="comparison-item" style={{ background: '#d4edda' }}>
              <h4 style={{ color: '#27ae60' }}>✅ Yes, They Will!</h4>
              <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
                <li>Community collaboration is powerful</li>
                <li>Universities and researchers contribute</li>
                <li>Companies benefit from improvements</li>
                <li>History shows open source wins (Linux, Android)</li>
              </ul>
            </div>
            <div className="comparison-item" style={{ background: '#f8d7da' }}>
              <h4 style={{ color: '#dc3545' }}>❌ Maybe Not...</h4>
              <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
                <li>Proprietary has more funding</li>
                <li>Top talent goes to big companies</li>
                <li>Expensive to train large models</li>
                <li>Proprietary can move faster</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>🎯 Which Should You Choose?</h3>
        <div className="visual-container" style={{ marginTop: '1rem', gap: '1rem' }}>
          <div className="visual-item" style={{ flex: 1, background: '#d4edda' }}>
            <h4>Choose Open Source If:</h4>
            <ul style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
              <li>Privacy is critical</li>
              <li>Need full control</li>
              <li>Have technical team</li>
              <li>Want to customize</li>
            </ul>
          </div>
          <div className="visual-item" style={{ flex: 1, background: '#fff3cd' }}>
            <h4>Choose Proprietary If:</h4>
            <ul style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
              <li>Want latest features</li>
              <li>Need easy setup</li>
              <li>Limited tech resources</li>
              <li>Prefer pay-as-you-go</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 The Future</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Both open source and proprietary models will continue to evolve. The competition 
          between them drives innovation forward, benefiting everyone! The best choice 
          depends on your specific needs, resources, and values.
        </p>
      </div>
    </div>
  );
};

export default OpenSourceModelsComponent;
