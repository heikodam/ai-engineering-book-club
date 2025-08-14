import React, { useState } from 'react';

const SafetyEvaluationComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('inappropriate');
  const [showExample, setShowExample] = useState(false);

  const safetyCategories = {
    inappropriate: {
      title: 'Inappropriate Language',
      icon: '🚫',
      description: 'Words or phrases that are rude, offensive, or not suitable for all audiences',
      analogy: 'Like having a filter that prevents saying bad words in front of grandma!',
      examples: {
        unsafe: 'Using curse words or adult content',
        safe: 'Using polite, family-friendly language'
      },
      color: '#e74c3c'
    },
    harmful: {
      title: 'Harmful Content',
      icon: '⚠️',
      description: 'Information that could hurt someone physically or emotionally',
      analogy: 'Like a safety lock that prevents giving dangerous instructions',
      examples: {
        unsafe: 'Instructions for dangerous activities',
        safe: 'Promoting safety and well-being'
      },
      color: '#e67e22'
    },
    hate: {
      title: 'Hate Speech',
      icon: '💔',
      description: 'Mean or unfair words about people based on who they are',
      analogy: 'Like teaching to treat everyone with kindness and respect',
      examples: {
        unsafe: 'Making fun of or insulting groups of people',
        safe: 'Treating all people equally and kindly'
      },
      color: '#c0392b'
    },
    violence: {
      title: 'Violence',
      icon: '🛑',
      description: 'Content about hurting people or promoting aggressive behavior',
      analogy: 'Like a peacekeeper that promotes harmony instead of conflict',
      examples: {
        unsafe: 'Describing or encouraging violence',
        safe: 'Promoting peaceful solutions'
      },
      color: '#8e44ad'
    },
    stereotype: {
      title: 'Stereotypes',
      icon: '🏷️',
      description: 'Unfair assumptions about groups of people',
      analogy: 'Like teaching that everyone is unique, not fitting into boxes',
      examples: {
        unsafe: 'Assuming things about people based on appearance',
        safe: 'Recognizing individual differences'
      },
      color: '#2c3e50'
    }
  };

  const currentCategory = safetyCategories[selectedCategory];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🛡️</span>
        Safety Evaluation
      </h2>
      
      <div className="info-box">
        <h3>🔒 What is Safety Evaluation?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Just like we teach children to be kind and safe, we need to make sure AI systems 
          don't say or do harmful things. Safety evaluation checks if AI is being a good, 
          responsible helper!
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem' }}>
        <div className="visual-item" style={{ background: '#d4edda' }}>
          <div style={{ fontSize: '3rem' }}>😊</div>
          <h4>Safe AI</h4>
          <ul style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
            <li>Is helpful and kind</li>
            <li>Respects everyone</li>
            <li>Keeps people safe</li>
            <li>Uses nice language</li>
          </ul>
        </div>
        <div className="visual-item" style={{ background: '#f8d7da' }}>
          <div style={{ fontSize: '3rem' }}>😟</div>
          <h4>Unsafe AI</h4>
          <ul style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
            <li>Says mean things</li>
            <li>Gives bad advice</li>
            <li>Uses bad words</li>
            <li>Hurts feelings</li>
          </ul>
        </div>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>🎯 Safety Categories We Check</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {Object.entries(safetyCategories).map(([key, category]) => (
            <button
              key={key}
              className={selectedCategory === key ? 'button-primary' : 'button-secondary'}
              onClick={() => setSelectedCategory(key)}
              style={{ fontSize: '0.9rem' }}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>

        <div style={{ 
          marginTop: '2rem', 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          border: `3px solid ${currentCategory.color}`
        }}>
          <h4 style={{ color: currentCategory.color, marginBottom: '1rem' }}>
            {currentCategory.icon} {currentCategory.title}
          </h4>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{currentCategory.description}</p>
          
          <div className="warning-box" style={{ marginBottom: '1.5rem' }}>
            <strong>Simple Analogy:</strong> {currentCategory.analogy}
          </div>

          <button
            className="button-primary"
            onClick={() => setShowExample(!showExample)}
          >
            {showExample ? 'Hide' : 'Show'} Examples 👁️
          </button>

          {showExample && (
            <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
              <div className="comparison-item" style={{ background: '#f8d7da' }}>
                <h5 style={{ color: '#dc3545' }}>❌ Unsafe Example</h5>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                  {currentCategory.examples.unsafe}
                </p>
              </div>
              <div className="comparison-item" style={{ background: '#d4edda' }}>
                <h5 style={{ color: '#28a745' }}>✅ Safe Example</h5>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                  {currentCategory.examples.safe}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#e3f2fd' }}>
        <h3>🤖 How AI Learns Safety</h3>
        <div className="visual-container" style={{ marginTop: '1rem', gap: '1rem' }}>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>1️⃣</div>
            <strong>Training</strong>
            <p style={{ fontSize: '0.85rem' }}>Show examples of good & bad</p>
          </div>
          <div style={{ fontSize: '1.5rem' }}>→</div>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>2️⃣</div>
            <strong>Testing</strong>
            <p style={{ fontSize: '0.85rem' }}>Check with tricky questions</p>
          </div>
          <div style={{ fontSize: '1.5rem' }}>→</div>
          <div className="visual-item" style={{ flex: 1, padding: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>3️⃣</div>
            <strong>Filtering</strong>
            <p style={{ fontSize: '0.85rem' }}>Block unsafe responses</p>
          </div>
        </div>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Remember</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Safety evaluation is like teaching AI to be a good citizen - helpful, respectful, 
          and kind to everyone. It's one of the most important parts of building responsible AI!
        </p>
      </div>
    </div>
  );
};

export default SafetyEvaluationComponent;
