import React, { useState } from 'react';

function ComparativeEvaluationsComponent() {
  const [selected_challenge, set_selected_challenge] = useState('scalability');
  const [show_comparison, set_show_comparison] = useState(false);
  const [evaluation_method, set_evaluation_method] = useState('pairwise');
  
  const challenges = [
    {
      id: 'scalability',
      title: '📈 Scalability Bottlenecks',
      icon: '🚧',
      description: 'Comparing all possible pairs grows exponentially',
      detail: 'With just 100 models, you need 4,950 comparisons for full pairwise evaluation! With 1,000 models, that becomes 499,500 comparisons!'
    },
    {
      id: 'standardization',
      title: '📏 Lack of Standardization',
      icon: '⚠️',
      description: 'No universal benchmarks or evaluation criteria',
      detail: 'Different evaluators use different criteria, making it hard to compare results across studies. What counts as "good" varies widely.'
    },
    {
      id: 'quality_control',
      title: '🎯 Quality Control Issues',
      icon: '❌',
      description: 'Ensuring consistent and reliable evaluations',
      detail: 'Human evaluators get tired, AI judges have biases, and criteria can be interpreted differently each time.'
    },
    {
      id: 'absolute_vs_comparative',
      title: '🔄 Comparative → Absolute',
      icon: '📊',
      description: 'Moving from "A is better than B" to "A scores 85/100"',
      detail: 'Comparative evaluations tell us rankings but not absolute quality. We need ways to convert relative performance to absolute metrics.'
    }
  ];
  
  const evaluation_methods = [
    {
      id: 'pairwise',
      name: 'Pairwise Comparison',
      models: 4,
      comparisons: 6,
      formula: 'n × (n-1) / 2',
      description: 'Compare every model against every other model'
    },
    {
      id: 'tournament',
      name: 'Tournament Style',
      models: 8,
      comparisons: 7,
      formula: 'n - 1',
      description: 'Elimination brackets like sports tournaments'
    },
    {
      id: 'elo',
      name: 'Elo Rating System',
      models: 'Unlimited',
      comparisons: 'Ongoing',
      formula: 'Dynamic',
      description: 'Chess-style ratings that update with each match'
    }
  ];
  
  // Calculate pairwise comparisons needed
  const calculate_comparisons = (n) => {
    return (n * (n - 1)) / 2;
  };
  
  const model_counts = [10, 50, 100, 500, 1000];

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🔄 Comparative Evaluations</h1>
        <p className="intro_subtitle">
          Understanding how we compare AI models against each other
        </p>
      </div>

      <div className="concept_box">
        <h2>What are Comparative Evaluations? 🤔</h2>
        <div className="simple_explanation">
          <p>
            Imagine a <strong>baking competition</strong> where instead of giving each cake a score, 
            judges only say which cake is better when comparing two at a time. That's comparative 
            evaluation - we determine which AI model is better by comparing them directly, rather 
            than scoring them individually!
          </p>
          
          <div className="key_insight">
            <p>
              💡 Key Insight: "Is A better than B?" is often easier to answer than "How good is A on a scale of 1-100?"
            </p>
          </div>
        </div>
      </div>

      <div className="analogy_comparison">
        <div className="comparison_item">
          <h4>📊 Absolute Evaluation</h4>
          <p>Like grading tests:</p>
          <ul>
            <li>Model A: 85/100</li>
            <li>Model B: 72/100</li>
            <li>Model C: 91/100</li>
          </ul>
          <p className="verdict">✅ Clear scores</p>
        </div>
        
        <div className="comparison_item">
          <h4>🔄 Comparative Evaluation</h4>
          <p>Like taste tests:</p>
          <ul>
            <li>A vs B: A wins</li>
            <li>B vs C: C wins</li>
            <li>A vs C: C wins</li>
          </ul>
          <p className="verdict">🏆 Ranking: C > A > B</p>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🔬 Evaluation Methods Comparison</h2>
        
        <div className="method_selector">
          {evaluation_methods.map(method => (
            <button
              key={method.id}
              className={`demo_button ${evaluation_method === method.id ? 'active' : ''}`}
              onClick={() => set_evaluation_method(method.id)}
            >
              {method.name}
            </button>
          ))}
        </div>
        
        {evaluation_method && (
          <div className="method_details">
            {evaluation_methods.find(m => m.id === evaluation_method) && (
              <>
                <h4>{evaluation_methods.find(m => m.id === evaluation_method).name}</h4>
                <p>{evaluation_methods.find(m => m.id === evaluation_method).description}</p>
                
                <div className="method_stats">
                  <div className="stat_box">
                    <label>Models:</label>
                    <span className="stat_value">{evaluation_methods.find(m => m.id === evaluation_method).models}</span>
                  </div>
                  <div className="stat_box">
                    <label>Comparisons:</label>
                    <span className="stat_value">{evaluation_methods.find(m => m.id === evaluation_method).comparisons}</span>
                  </div>
                  <div className="stat_box">
                    <label>Formula:</label>
                    <span className="formula_small">{evaluation_methods.find(m => m.id === evaluation_method).formula}</span>
                  </div>
                </div>
                
                {evaluation_method === 'pairwise' && (
                  <div className="scalability_demo">
                    <h5>🚨 Scalability Problem:</h5>
                    <div className="comparison_table">
                      {model_counts.map(count => (
                        <div key={count} className="comparison_row">
                          <span>{count} models</span>
                          <span className="arrow">→</span>
                          <span className="comparisons_needed">
                            {calculate_comparisons(count).toLocaleString()} comparisons
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="concept_box">
        <h2>🚧 Major Challenges</h2>
        
        <div className="challenge_selector">
          <div className="challenge_buttons">
            {challenges.map(challenge => (
              <button
                key={challenge.id}
                className={`challenge_button ${selected_challenge === challenge.id ? 'active' : ''}`}
                onClick={() => set_selected_challenge(challenge.id)}
              >
                {challenge.icon} {challenge.title}
              </button>
            ))}
          </div>
          
          {selected_challenge && (
            <div className="challenge_details">
              {challenges.find(c => c.id === selected_challenge) && (
                <>
                  <h4>{challenges.find(c => c.id === selected_challenge).title}</h4>
                  <p className="challenge_description">
                    {challenges.find(c => c.id === selected_challenge).description}
                  </p>
                  <div className="challenge_detail">
                    {challenges.find(c => c.id === selected_challenge).detail}
                  </div>
                  
                  {selected_challenge === 'scalability' && (
                    <div className="visual_example">
                      <div className="models_grid">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="model_node">M{i + 1}</div>
                        ))}
                      </div>
                      <p className="grid_caption">
                        With just 6 models, we need 15 pairwise comparisons!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🔄 From Comparative to Absolute Performance</h2>
        
        <button 
          className="flip_button"
          onClick={() => set_show_comparison(!show_comparison)}
        >
          {show_comparison ? 'Hide' : 'Show'} Conversion Example
        </button>
        
        {show_comparison && (
          <div className="conversion_example">
            <div className="conversion_step">
              <h4>Step 1: Comparative Results</h4>
              <div className="match_results">
                <div className="match">Model A vs B: A wins (60% preference)</div>
                <div className="match">Model B vs C: C wins (75% preference)</div>
                <div className="match">Model A vs C: C wins (80% preference)</div>
                <div className="match">Model A vs D: A wins (55% preference)</div>
                <div className="match">Model B vs D: B wins (65% preference)</div>
                <div className="match">Model C vs D: C wins (90% preference)</div>
              </div>
            </div>
            
            <div className="conversion_arrow">⬇️</div>
            
            <div className="conversion_step">
              <h4>Step 2: Elo Ratings (Absolute Scores)</h4>
              <div className="elo_ratings">
                <div className="rating_item">
                  <span className="model_name">Model C</span>
                  <div className="rating_bar" style={{width: '90%'}}>
                    <span className="rating_score">1450</span>
                  </div>
                </div>
                <div className="rating_item">
                  <span className="model_name">Model A</span>
                  <div className="rating_bar" style={{width: '70%'}}>
                    <span className="rating_score">1200</span>
                  </div>
                </div>
                <div className="rating_item">
                  <span className="model_name">Model B</span>
                  <div className="rating_bar" style={{width: '65%'}}>
                    <span className="rating_score">1150</span>
                  </div>
                </div>
                <div className="rating_item">
                  <span className="model_name">Model D</span>
                  <div className="rating_bar" style={{width: '50%'}}>
                    <span className="rating_score">1000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="insights_grid">
        <div className="insight_item">
          <h4>✅ Advantages</h4>
          <p>
            • Easier for humans to judge<br />
            • More reliable than absolute scoring<br />
            • Natural preference expression<br />
            • Works well for subjective tasks
          </p>
        </div>
        
        <div className="insight_item">
          <h4>❌ Disadvantages</h4>
          <p>
            • Doesn't scale well<br />
            • No absolute quality measure<br />
            • Hard to track improvements<br />
            • Expensive for large model sets
          </p>
        </div>
        
        <div className="insight_item">
          <h4>🛠️ Solutions</h4>
          <p>
            • Use tournament brackets<br />
            • Implement Elo rating systems<br />
            • Sample comparisons wisely<br />
            • Combine with absolute metrics
          </p>
        </div>
        
        <div className="insight_item">
          <h4>📊 Best Practices</h4>
          <p>
            • Define clear criteria upfront<br />
            • Use multiple evaluators<br />
            • Track confidence intervals<br />
            • Document evaluation process
          </p>
        </div>
      </div>

      <div className="fun_fact">
        <h4>🎮 Real-World Example: Chatbot Arena</h4>
        <p>
          The LMSYS Chatbot Arena uses comparative evaluations to rank language models. 
          Users chat with two anonymous models and vote for the better response. With 
          over 1 million votes, they've created reliable Elo ratings for dozens of models!
        </p>
        <div className="arena_example">
          <div className="chat_comparison">
            <div className="chat_box">
              <h5>Model A (Hidden)</h5>
              <p>"The capital of France is Paris."</p>
            </div>
            <div className="vs_symbol">VS</div>
            <div className="chat_box">
              <h5>Model B (Hidden)</h5>
              <p>"Paris is the capital and most populous city of France, with an estimated population of 2.1 million residents."</p>
            </div>
          </div>
          <p className="vote_prompt">Which response is better? 🗳️</p>
        </div>
      </div>

      <div className="whats_next">
        <h3>🚀 Why This Matters</h3>
        <p>
          Comparative evaluations are crucial for understanding relative model performance, 
          especially for subjective tasks like creativity or helpfulness. While they have 
          scalability challenges, techniques like Elo ratings help us convert comparative 
          results into absolute metrics we can track over time!
        </p>
      </div>

      <style jsx>{`
        .method_selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .method_details {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .method_stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        
        .stat_box {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .stat_box label {
          display: block;
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        
        .stat_value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4f46e5;
        }
        
        .formula_small {
          font-family: monospace;
          color: #7c3aed;
          font-weight: 600;
        }
        
        .scalability_demo {
          margin-top: 1.5rem;
          background: #fef2f2;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #fecaca;
        }
        
        .scalability_demo h5 {
          color: #dc2626;
          margin-bottom: 1rem;
        }
        
        .comparison_table {
          display: grid;
          gap: 0.5rem;
        }
        
        .comparison_row {
          display: grid;
          grid-template-columns: 100px 30px 1fr;
          align-items: center;
          gap: 0.5rem;
        }
        
        .arrow {
          color: #6b7280;
          text-align: center;
        }
        
        .comparisons_needed {
          font-weight: 600;
          color: #dc2626;
        }
        
        .challenge_selector {
          margin-top: 1rem;
        }
        
        .challenge_buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .challenge_button {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          font-size: 0.95rem;
        }
        
        .challenge_button:hover {
          border-color: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .challenge_button.active {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          border-color: #4f46e5;
        }
        
        .challenge_details {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .challenge_description {
          color: #64748b;
          margin: 0.5rem 0;
        }
        
        .challenge_detail {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          color: #374151;
          font-weight: 500;
        }
        
        .visual_example {
          margin-top: 1.5rem;
          text-align: center;
        }
        
        .models_grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .model_node {
          width: 60px;
          height: 60px;
          background: #4f46e5;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .grid_caption {
          margin-top: 1rem;
          color: #64748b;
          font-style: italic;
        }
        
        .conversion_example {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .conversion_step {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        
        .conversion_arrow {
          text-align: center;
          font-size: 2rem;
          margin: 1rem 0;
        }
        
        .match_results {
          display: grid;
          gap: 0.5rem;
        }
        
        .match {
          padding: 0.5rem;
          background: #f1f5f9;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.9rem;
        }
        
        .elo_ratings {
          display: grid;
          gap: 0.75rem;
        }
        
        .rating_item {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-items: center;
          gap: 1rem;
        }
        
        .model_name {
          font-weight: 600;
          color: #374151;
        }
        
        .rating_bar {
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
          height: 30px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 1rem;
          position: relative;
        }
        
        .rating_score {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .arena_example {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .chat_comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: center;
        }
        
        .chat_box {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .chat_box h5 {
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .chat_box p {
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .vs_symbol {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ef4444;
        }
        
        .vote_prompt {
          text-align: center;
          margin-top: 1rem;
          font-weight: 600;
          color: #4f46e5;
        }
        
        .verdict {
          margin-top: 0.5rem;
          font-weight: 600;
          color: #10b981;
        }
        
        @media (max-width: 768px) {
          .challenge_buttons {
            grid-template-columns: 1fr;
          }
          
          .chat_comparison {
            grid-template-columns: 1fr;
          }
          
          .vs_symbol {
            text-align: center;
            margin: 0.5rem 0;
          }
          
          .method_selector {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default ComparativeEvaluationsComponent;
