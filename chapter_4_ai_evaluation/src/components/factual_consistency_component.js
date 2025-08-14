import React, { useState } from 'react';

const FactualConsistencyComponent = () => {
  const [selectedType, setSelectedType] = useState('local');
  const [showExample, setShowExample] = useState(false);

  const consistencyTypes = {
    local: {
      title: 'Local Factual Consistency',
      icon: '📋',
      description: 'Checking if the AI sticks to the information you gave it',
      analogy: 'Like a student using only their textbook to answer - they should only use what\'s in the book!',
      examples: {
        good: {
          context: 'The Eiffel Tower is 330 meters tall and located in Paris.',
          question: 'How tall is the Eiffel Tower?',
          answer: 'The Eiffel Tower is 330 meters tall.',
          verdict: '✅ Correct! Used only the given information'
        },
        bad: {
          context: 'The Eiffel Tower is 330 meters tall and located in Paris.',
          question: 'When was the Eiffel Tower built?',
          answer: 'The Eiffel Tower was built in 1889.',
          verdict: '❌ Wrong! This info wasn\'t in the context'
        }
      }
    },
    global: {
      title: 'Global Factual Consistency',
      icon: '🌍',
      description: 'Checking if the AI tells the truth about the real world',
      analogy: 'Like fact-checking someone\'s general knowledge - is what they\'re saying actually true?',
      examples: {
        good: {
          context: 'No specific context given',
          question: 'What is the capital of France?',
          answer: 'The capital of France is Paris.',
          verdict: '✅ Correct! This is true in the real world'
        },
        bad: {
          context: 'No specific context given',
          question: 'What is the tallest mountain?',
          answer: 'The tallest mountain is K2.',
          verdict: '❌ Wrong! Mount Everest is actually the tallest'
        }
      }
    }
  };

  const currentType = consistencyTypes[selectedType];
  const currentExample = showExample ? currentType.examples : null;

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">✅</span>
        Factual Consistency
      </h2>
      
      <div className="info-box">
        <h3>🔍 What is Factual Consistency?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          It's making sure the AI tells the truth! Just like how we check if someone is 
          being honest, we check if AI gives accurate information. But there are two ways to check:
        </p>
      </div>

      <div className="visual-container" style={{ marginTop: '2rem' }}>
        <button
          className={`visual-item ${selectedType === 'local' ? 'selected' : ''}`}
          onClick={() => setSelectedType('local')}
          style={{ 
            cursor: 'pointer', 
            border: selectedType === 'local' ? '3px solid #667eea' : '3px solid transparent',
            background: selectedType === 'local' ? '#f0f4ff' : 'white'
          }}
        >
          <div style={{ fontSize: '3rem' }}>{consistencyTypes.local.icon}</div>
          <h4>{consistencyTypes.local.title}</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Checking against given information
          </p>
        </button>

        <button
          className={`visual-item ${selectedType === 'global' ? 'selected' : ''}`}
          onClick={() => setSelectedType('global')}
          style={{ 
            cursor: 'pointer', 
            border: selectedType === 'global' ? '3px solid #667eea' : '3px solid transparent',
            background: selectedType === 'global' ? '#f0f4ff' : 'white'
          }}
        >
          <div style={{ fontSize: '3rem' }}>{consistencyTypes.global.icon}</div>
          <h4>{consistencyTypes.global.title}</h4>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Checking against world knowledge
          </p>
        </button>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>{currentType.icon} {currentType.title}</h3>
        <p style={{ marginTop: '1rem', color: '#666' }}>{currentType.description}</p>
        
        <div className="warning-box" style={{ marginTop: '1rem' }}>
          <strong>Simple Analogy:</strong> {currentType.analogy}
        </div>

        <button
          className="button-primary"
          onClick={() => setShowExample(!showExample)}
          style={{ marginTop: '1.5rem' }}
        >
          {showExample ? 'Hide Example' : 'Show Example'} 👀
        </button>

        {currentExample && (
          <div style={{ marginTop: '2rem' }}>
            <h4>Let's see examples:</h4>
            
            <div className="comparison-grid" style={{ marginTop: '1rem' }}>
              <div className="comparison-item" style={{ background: '#d4edda' }}>
                <h5 style={{ color: '#28a745' }}>✅ Good Example</h5>
                {selectedType === 'local' && (
                  <div className="code-block" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                    <strong>Context:</strong> {currentExample.good.context}
                  </div>
                )}
                <div style={{ marginTop: '1rem' }}>
                  <strong>Question:</strong> {currentExample.good.question}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>AI Answer:</strong> {currentExample.good.answer}
                </div>
                <div className="success-box" style={{ marginTop: '1rem', padding: '1rem' }}>
                  {currentExample.good.verdict}
                </div>
              </div>

              <div className="comparison-item" style={{ background: '#f8d7da' }}>
                <h5 style={{ color: '#dc3545' }}>❌ Bad Example</h5>
                {selectedType === 'local' && (
                  <div className="code-block" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                    <strong>Context:</strong> {currentExample.bad.context}
                  </div>
                )}
                <div style={{ marginTop: '1rem' }}>
                  <strong>Question:</strong> {currentExample.bad.question}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>AI Answer:</strong> {currentExample.bad.answer}
                </div>
                <div className="warning-box" style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da' }}>
                  {currentExample.bad.verdict}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#fff3cd' }}>
        <h3>🤔 The Challenge</h3>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Quote from the book:</strong> "Often the hardest part of factual consistency 
          verification is determining what the facts are."
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>In simple terms:</strong> Sometimes it's hard to know what's actually true! 
          Facts can change, be disputed, or depend on context. That's why checking AI accuracy 
          is so challenging.
        </p>
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Pro Tip</h3>
        <p style={{ marginTop: '0.5rem' }}>
          When designing tests for AI, pay attention to what topics it tends to get wrong. 
          If it often makes mistakes about dates, test dates more carefully!
        </p>
      </div>
    </div>
  );
};

export default FactualConsistencyComponent;
