import React from 'react';

const IntroductionComponent = () => {
  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">🌟</span>
        Welcome to AI Evaluation!
      </h2>
      
      <div className="info-box">
        <h3>🤔 What is AI Evaluation?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Imagine you're teaching a child to recognize animals. How do you know if they're 
          learning correctly? You test them! AI Evaluation is just like that - it's how we 
          check if our AI systems are doing what we want them to do.
        </p>
      </div>

      <div className="visual-container">
        <div className="visual-item" style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍🏫</div>
          <h4>Teaching</h4>
          <p>We train AI systems with data and instructions</p>
        </div>
        <div style={{ fontSize: '3rem', display: 'flex', alignItems: 'center' }}>→</div>
        <div className="visual-item" style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧪</div>
          <h4>Testing</h4>
          <p>We evaluate how well they learned</p>
        </div>
      </div>

      <div className="demo-box">
        <h3>🎯 Why is Evaluation Important?</h3>
        <div className="comparison-grid" style={{ marginTop: '1.5rem' }}>
          <div className="comparison-item">
            <h4 style={{ color: '#667eea' }}>✅ Good AI</h4>
            <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
              <li>Gives accurate answers</li>
              <li>Follows instructions</li>
              <li>Stays safe and helpful</li>
              <li>Works reliably</li>
            </ul>
          </div>
          <div className="comparison-item">
            <h4 style={{ color: '#e74c3c' }}>❌ Bad AI</h4>
            <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
              <li>Makes up false information</li>
              <li>Ignores what you ask</li>
              <li>Says harmful things</li>
              <li>Works unpredictably</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="warning-box">
        <h3>⚠️ The Challenge</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Unlike testing a calculator (2+2 always equals 4), AI systems are more like 
          testing a creative writer - there might be many "right" answers! That's what 
          makes AI evaluation both challenging and fascinating.
        </p>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Ready to learn how professionals evaluate AI systems? Let's explore each method! 🚀
        </p>
      </div>
    </div>
  );
};

export default IntroductionComponent;
