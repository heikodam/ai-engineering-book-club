import React, { useState } from 'react';

function AiAsJudgeComponent() {
  const [judge_mode, set_judge_mode] = useState('quality');
  const [show_evaluation, set_show_evaluation] = useState(false);
  const [selected_bias, set_selected_bias] = useState('self_preference');
  const [scoring_system, set_scoring_system] = useState('classification');
  
  // Sample responses for evaluation
  const [user_question] = useState("Explain how photosynthesis works");
  const [response_a] = useState("Photosynthesis is when plants make food from sunlight. They use chlorophyll in their leaves to capture light energy and combine it with water and carbon dioxide to create glucose (sugar) and oxygen.");
  const [response_b] = useState("Photosynthesis is a complex biochemical process wherein plants, algae, and certain bacteria convert light energy, typically from the sun, into chemical energy stored in glucose molecules. This process involves two main stages: the light-dependent reactions occurring in the thylakoid membranes, and the Calvin cycle taking place in the stroma of chloroplasts.");
  
  const judge_modes = [
    {
      id: 'quality',
      title: '1️⃣ Evaluate Quality',
      description: 'Evaluate the quality of a response by itself',
      icon: '🎯'
    },
    {
      id: 'reference',
      title: '2️⃣ Compare to Reference',
      description: 'Compare a generated response to a reference answer',
      icon: '📊'
    },
    {
      id: 'comparison',
      title: '3️⃣ Compare Responses',
      description: 'Compare two responses and determine which is better',
      icon: '⚖️'
    }
  ];
  
  const scoring_systems = [
    {
      id: 'classification',
      label: 'Classification (Good/Bad/Neutral)',
      example: 'Response Quality: Good ✅'
    },
    {
      id: 'discrete',
      label: 'Discrete Scale (1-5)',
      example: 'Score: 4/5 ⭐'
    },
    {
      id: 'continuous',
      label: 'Continuous (1-100)',
      example: 'Score: 87/100 (Not Recommended)'
    }
  ];
  
  const biases = [
    {
      id: 'self_preference',
      title: 'Self-Preference Bias',
      description: 'Models tend to favor their own responses over others',
      example: 'GPT-4 rating GPT-4 responses higher than Claude responses'
    },
    {
      id: 'position',
      title: 'Position Bias',
      description: 'Models often favor the first option presented',
      example: 'Option A gets higher scores just for being shown first'
    },
    {
      id: 'length',
      title: 'Length Bias',
      description: 'Longer responses often get higher scores',
      example: 'A 500-word answer rated higher than a concise 100-word one'
    },
    {
      id: 'verbosity',
      title: 'Verbosity Preference',
      description: 'Complex language is rated higher than simple explanations',
      example: 'Technical jargon preferred over clear, simple language'
    }
  ];
  
  const gandalf_example = {
    question: "Does this sound like something Gandalf would say?",
    good_response: "You shall not pass! A wizard is never late, nor is he early. He arrives precisely when he means to.",
    bad_response: "Hey guys, what's up? Let me check my smartphone real quick. LOL, this is totally lit!",
    evaluation: "The first response captures Gandalf's wisdom, authority, and archaic speech patterns. The second uses modern slang that would be completely out of character."
  };

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>⚖️ AI as a Judge</h1>
        <p className="intro_subtitle">
          Using AI models to evaluate other AI models - the meta approach!
        </p>
      </div>

      <div className="concept_box">
        <h2>What is AI as a Judge? 🤔</h2>
        <div className="simple_explanation">
          <p>
            Imagine having a <strong>teacher grade another teacher's work</strong>. That's what we do when 
            we use one AI model to evaluate the outputs of another AI model! It's like having an expert 
            reviewer who can quickly assess quality, accuracy, and appropriateness.
          </p>
          
          <div className="key_insight">
            <p>
              "An AI model that is used to evaluate other AI models"
              <br />
              <em>- Chapter 3, AI Engineering</em>
            </p>
          </div>
        </div>
      </div>

      <div className="analogy_grid">
        {judge_modes.map(mode => (
          <div key={mode.id} className="analogy_item">
            <h3>{mode.icon} {mode.title}</h3>
            <p>{mode.description}</p>
          </div>
        ))}
      </div>

      <div className="interactive_demo">
        <h2>🔬 AI Judge in Action</h2>
        
        <div className="judge_scenario">
          <div className="scenario_setup">
            <h4>User Question:</h4>
            <div className="question_box">{user_question}</div>
            
            <div className="responses_grid">
              <div className="response_box">
                <h5>Response A (Simple):</h5>
                <p>{response_a}</p>
              </div>
              
              <div className="response_box">
                <h5>Response B (Technical):</h5>
                <p>{response_b}</p>
              </div>
            </div>
          </div>
          
          <div className="judge_controls">
            <label>Select Judging Mode:</label>
            <select 
              value={judge_mode} 
              onChange={(e) => set_judge_mode(e.target.value)}
              className="mode_select"
            >
              {judge_modes.map(mode => (
                <option key={mode.id} value={mode.id}>{mode.title}</option>
              ))}
            </select>
            
            <button 
              className="flip_button"
              onClick={() => set_show_evaluation(!show_evaluation)}
            >
              {show_evaluation ? 'Hide' : 'Show'} AI Judge Evaluation
            </button>
          </div>
          
          {show_evaluation && (
            <div className="evaluation_results">
              {judge_mode === 'quality' && (
                <div className="evaluation_box">
                  <h4>🎯 Quality Evaluation</h4>
                  <div className="criteria_list">
                    <div className="criterion">
                      <strong>Accuracy:</strong> ✅ Both responses are factually correct
                    </div>
                    <div className="criterion">
                      <strong>Clarity:</strong> Response A is clearer for general audience
                    </div>
                    <div className="criterion">
                      <strong>Completeness:</strong> Response B provides more detail
                    </div>
                  </div>
                  <div className="verdict">
                    <strong>Verdict:</strong> Both are good, but serve different audiences
                  </div>
                </div>
              )}
              
              {judge_mode === 'comparison' && (
                <div className="evaluation_box">
                  <h4>⚖️ Comparison Evaluation</h4>
                  <div className="comparison_table">
                    <div className="comparison_row">
                      <span>Simplicity</span>
                      <span className="winner">Response A ✅</span>
                    </div>
                    <div className="comparison_row">
                      <span>Technical Depth</span>
                      <span className="winner">Response B ✅</span>
                    </div>
                    <div className="comparison_row">
                      <span>Accessibility</span>
                      <span className="winner">Response A ✅</span>
                    </div>
                  </div>
                  <div className="verdict">
                    <strong>Winner:</strong> Response A (for general audience)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="concept_box">
        <h2>🎯 How to Prompt an AI Judge</h2>
        
        <div className="prompt_structure">
          <div className="prompt_component">
            <h4>1. Define the Task</h4>
            <p>Clearly specify what the AI judge should evaluate</p>
            <div className="example_prompt">
              "Evaluate the relevance between this answer and the question"
            </div>
          </div>
          
          <div className="prompt_component">
            <h4>2. Provide Criteria</h4>
            <p>List specific aspects to evaluate</p>
            <div className="example_prompt">
              "Consider: accuracy, clarity, completeness, and tone"
            </div>
          </div>
          
          <div className="prompt_component">
            <h4>3. Specify Scoring System</h4>
            <p>Define how results should be presented</p>
            <div className="scoring_examples">
              {scoring_systems.map(system => (
                <div key={system.id} className="scoring_option">
                  <input
                    type="radio"
                    id={system.id}
                    name="scoring"
                    value={system.id}
                    checked={scoring_system === system.id}
                    onChange={(e) => set_scoring_system(e.target.value)}
                  />
                  <label htmlFor={system.id}>
                    <strong>{system.label}</strong>
                    <br />
                    <span className="example">{system.example}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fun_fact">
        <h4>🧙‍♂️ Character Consistency Example</h4>
        <div className="gandalf_demo">
          <p className="question">"{gandalf_example.question}"</p>
          
          <div className="character_responses">
            <div className="response good">
              <h5>✅ In Character:</h5>
              <p>"{gandalf_example.good_response}"</p>
            </div>
            
            <div className="response bad">
              <h5>❌ Out of Character:</h5>
              <p>"{gandalf_example.bad_response}"</p>
            </div>
          </div>
          
          <div className="explanation">
            <strong>AI Judge Analysis:</strong> {gandalf_example.evaluation}
          </div>
        </div>
      </div>

      <div className="concept_box">
        <h2>⚠️ Limitations & Biases</h2>
        
        <div className="bias_selector">
          <h4>Explore Common Biases:</h4>
          <div className="bias_buttons">
            {biases.map(bias => (
              <button
                key={bias.id}
                className={`bias_button ${selected_bias === bias.id ? 'active' : ''}`}
                onClick={() => set_selected_bias(bias.id)}
              >
                {bias.title}
              </button>
            ))}
          </div>
          
          {selected_bias && (
            <div className="bias_details">
              {biases.find(b => b.id === selected_bias) && (
                <>
                  <h5>{biases.find(b => b.id === selected_bias).title}</h5>
                  <p>{biases.find(b => b.id === selected_bias).description}</p>
                  <div className="bias_example">
                    <strong>Example:</strong> {biases.find(b => b.id === selected_bias).example}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="insights_grid">
        <div className="insight_item">
          <h4>💡 Can Smaller Models Judge Larger Ones?</h4>
          <p>
            Yes! Many argue that judging is easier than generating. Just like anyone 
            can say if they like a song, but few can compose good music.
          </p>
        </div>
        
        <div className="insight_item">
          <h4>🎭 Types of AI Judges</h4>
          <p>
            <strong>Reward Model:</strong> Scores responses<br />
            <strong>Reference Judge:</strong> Compares to ideal<br />
            <strong>Preference Model:</strong> Picks the better option
          </p>
        </div>
        
        <div className="insight_item">
          <h4>💰 Cost Considerations</h4>
          <p>
            Using AI judges increases costs and latency. Each evaluation is an 
            additional API call. Balance quality needs with resource constraints.
          </p>
        </div>
        
        <div className="insight_item">
          <h4>🔄 Consistency Challenges</h4>
          <p>
            AI judges can be inconsistent. The same input might get different 
            scores on different runs. Use multiple evaluations for critical decisions.
          </p>
        </div>
      </div>

      <div className="whats_next">
        <h3>🚀 Why AI Judges Matter</h3>
        <p>
          AI judges enable automated quality control at scale. They help us evaluate 
          thousands of responses quickly, maintain consistent standards, and continuously 
          improve our AI systems. Understanding their strengths and limitations is key 
          to building reliable AI applications!
        </p>
      </div>

      <style jsx>{`
        .judge_scenario {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin: 1.5rem 0;
        }
        
        .question_box {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid #4f46e5;
          margin: 0.5rem 0 1.5rem 0;
          font-weight: 500;
          color: #1e293b;
        }
        
        .responses_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .response_box {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .response_box h5 {
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .response_box p {
          color: #64748b;
          line-height: 1.6;
        }
        
        .judge_controls {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .mode_select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
        }
        
        .evaluation_results {
          margin-top: 1.5rem;
        }
        
        .evaluation_box {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid #10b981;
        }
        
        .criteria_list {
          margin: 1rem 0;
        }
        
        .criterion {
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .verdict {
          margin-top: 1rem;
          padding: 1rem;
          background: #f0fdf4;
          border-radius: 8px;
          color: #065f46;
        }
        
        .comparison_table {
          margin: 1rem 0;
        }
        
        .comparison_row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .winner {
          color: #10b981;
          font-weight: 600;
        }
        
        .prompt_structure {
          display: grid;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .prompt_component {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .prompt_component h4 {
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .example_prompt {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.9rem;
          color: #4f46e5;
          margin-top: 0.5rem;
        }
        
        .scoring_examples {
          margin-top: 1rem;
          display: grid;
          gap: 0.75rem;
        }
        
        .scoring_option {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .scoring_option label {
          cursor: pointer;
          flex: 1;
        }
        
        .scoring_option .example {
          font-size: 0.9rem;
          color: #64748b;
          font-style: italic;
        }
        
        .gandalf_demo {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
        }
        
        .gandalf_demo .question {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .character_responses {
          display: grid;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .response {
          padding: 1rem;
          border-radius: 6px;
        }
        
        .response.good {
          background: #f0fdf4;
          border: 1px solid #10b981;
        }
        
        .response.bad {
          background: #fef2f2;
          border: 1px solid #ef4444;
        }
        
        .response h5 {
          margin-bottom: 0.5rem;
        }
        
        .explanation {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
          color: #475569;
        }
        
        .bias_selector {
          margin-top: 1rem;
        }
        
        .bias_buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1rem 0;
        }
        
        .bias_button {
          padding: 0.5rem 1rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        
        .bias_button:hover {
          border-color: #4f46e5;
          color: #4f46e5;
        }
        
        .bias_button.active {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }
        
        .bias_details {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-top: 1rem;
        }
        
        .bias_details h5 {
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .bias_example {
          background: #fef3c7;
          padding: 1rem;
          border-radius: 6px;
          margin-top: 0.75rem;
          color: #92400e;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default AiAsJudgeComponent;
