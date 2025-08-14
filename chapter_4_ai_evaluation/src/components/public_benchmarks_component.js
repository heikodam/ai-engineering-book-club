import React, { useState } from 'react';

const PublicBenchmarksComponent = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSaturation, setShowSaturation] = useState(false);
  const [showStanfordStudy, setShowStanfordStudy] = useState(false);

  const mockLeaderboard = [
    { rank: 1, model: 'GPT-4', score: 86.4, org: 'OpenAI' },
    { rank: 2, model: 'Claude 3', score: 85.7, org: 'Anthropic' },
    { rank: 3, model: 'Gemini Ultra', score: 85.2, org: 'Google' },
    { rank: 4, model: 'LLaMA 3', score: 82.9, org: 'Meta' },
    { rank: 5, model: 'Mixtral', score: 80.5, org: 'Mistral AI' }
  ];

  const stanfordStudyData = [
    { task: 'Math Problems', gpt35March: 87.2, gpt35June: 52.8, gpt4March: 97.6, gpt4June: 86.8 },
    { task: 'Code Generation', gpt35March: 22.0, gpt35June: 2.0, gpt4March: 52.0, gpt4June: 48.0 },
    { task: 'Visual Reasoning', gpt35March: 92.0, gpt35June: 98.2, gpt4March: 98.2, gpt4June: 91.0 }
  ];

  return (
    <div className="component-card">
      <h2 className="section-title">
        <span className="section-icon">📊</span>
        Public Benchmarks
      </h2>
      
      <div className="info-box">
        <h3>🏅 What are Public Benchmarks?</h3>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          Think of benchmarks like standardized tests for AI - they're public tests that 
          everyone uses to compare how smart different AI models are. It's like having 
          all students take the same exam to see who scores highest!
        </p>
      </div>

      <div className="demo-box" style={{ marginTop: '2rem' }}>
        <h3>🏆 Current Leaderboards</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          AI models compete on standard tests - here's who's winning!
        </p>
        
        <button
          className="button-primary"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          {showLeaderboard ? 'Hide' : 'Show'} Sample Leaderboard 📋
        </button>

        {showLeaderboard && (
          <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', background: 'white', borderRadius: '10px', overflow: 'hidden' }}>
              <thead style={{ background: '#667eea', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Rank</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Model</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Organization</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((entry) => (
                  <tr key={entry.rank} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{entry.model}</td>
                    <td style={{ padding: '1rem' }}>{entry.org}</td>
                    <td style={{ padding: '1rem' }}>
                      <div className="progress-bar" style={{ width: '100px', height: '20px' }}>
                        <div className="progress-fill" style={{ width: `${entry.score}%`, fontSize: '0.8rem' }}>
                          {entry.score}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="warning-box" style={{ marginTop: '2rem' }}>
        <h3>⚠️ The Saturation Problem</h3>
        <button
          className="button-secondary"
          onClick={() => setShowSaturation(!showSaturation)}
          style={{ marginTop: '1rem' }}
        >
          {showSaturation ? 'Hide' : 'Learn About'} Benchmark Saturation 📈
        </button>

        {showSaturation && (
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>What's happening?</strong> When all AI models start scoring 95%+ on a test, 
              the test stops being useful - it's like if everyone in class gets an A+!
            </p>
            
            <div className="visual-container" style={{ gap: '1rem' }}>
              <div className="visual-item" style={{ flex: 1 }}>
                <div style={{ fontSize: '2rem' }}>📝</div>
                <h5>Old Benchmark</h5>
                <p style={{ fontSize: '0.85rem' }}>Models scored 60-90%</p>
                <p style={{ fontSize: '0.85rem', color: '#28a745' }}>✅ Good for comparison</p>
              </div>
              <div style={{ fontSize: '2rem' }}>→</div>
              <div className="visual-item" style={{ flex: 1 }}>
                <div style={{ fontSize: '2rem' }}>🎯</div>
                <h5>Saturated Benchmark</h5>
                <p style={{ fontSize: '0.85rem' }}>All models score 95%+</p>
                <p style={{ fontSize: '0.85rem', color: '#dc3545' }}>❌ Can't tell difference</p>
              </div>
            </div>

            <div className="info-box" style={{ marginTop: '1rem' }}>
              <strong>Solution:</strong> Create harder tests! It's like making advanced exams 
              when everyone masters the basic ones.
            </div>
          </div>
        )}
      </div>

      <div className="demo-box" style={{ marginTop: '2rem', background: '#fff3cd' }}>
        <h3>📉 The Changing Performance Mystery</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          "Every time OpenAI updates its models, people complain that their models seem to be 
          getting worse."
        </p>
        
        <button
          className="button-primary"
          onClick={() => setShowStanfordStudy(!showStanfordStudy)}
        >
          {showStanfordStudy ? 'Hide' : 'Show'} Stanford Study Results 🔬
        </button>

        {showStanfordStudy && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className="warning-box" style={{ background: '#e3f2fd' }}>
              <p>
                <strong>Study Finding:</strong> "A study by Stanford and UC Berkeley found that for 
                many benchmarks, both GPT-3.5 and GPT-4 performances changed significantly between 
                March 2023 and June 2023."
              </p>
            </div>

            <h5 style={{ marginTop: '1.5rem' }}>Performance Changes (March → June 2023)</h5>
            {stanfordStudyData.map((task) => (
              <div key={task.task} style={{ marginTop: '1rem', background: 'white', padding: '1rem', borderRadius: '10px' }}>
                <h6>{task.task}</h6>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>GPT-3.5</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{task.gpt35March}%</span>
                      <span style={{ fontSize: '1.5rem' }}>→</span>
                      <span style={{ 
                        color: task.gpt35June < task.gpt35March ? '#dc3545' : '#28a745',
                        fontWeight: 'bold'
                      }}>
                        {task.gpt35June}%
                      </span>
                      <span style={{ fontSize: '0.85rem' }}>
                        ({task.gpt35June > task.gpt35March ? '+' : ''}{(task.gpt35June - task.gpt35March).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>GPT-4</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{task.gpt4March}%</span>
                      <span style={{ fontSize: '1.5rem' }}>→</span>
                      <span style={{ 
                        color: task.gpt4June < task.gpt4March ? '#dc3545' : '#28a745',
                        fontWeight: 'bold'
                      }}>
                        {task.gpt4June}%
                      </span>
                      <span style={{ fontSize: '0.85rem' }}>
                        ({task.gpt4June > task.gpt4March ? '+' : ''}{(task.gpt4June - task.gpt4March).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h5>🤔 Why Does This Happen?</h5>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Models are updated to be better at some tasks</li>
                <li>This can accidentally make them worse at others</li>
                <li>It's like training for a marathon might make you slower at sprints!</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="success-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Key Takeaways</h3>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Public benchmarks help compare AI models fairly</li>
          <li>When everyone scores high, we need harder tests</li>
          <li>Model performance can change with updates - always retest!</li>
          <li>What works in March might not work the same in June</li>
        </ul>
      </div>
    </div>
  );
};

export default PublicBenchmarksComponent;
