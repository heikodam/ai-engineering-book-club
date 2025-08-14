import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const PerplexityComponent = () => {
  const [demo_type, set_demo_type] = useState('basic_concept');
  const [model_confidence, set_model_confidence] = useState(0.8);
  const [vocabulary_size, set_vocabulary_size] = useState(1000);
  const [selected_scenario, set_selected_scenario] = useState('good_model');

  // Calculate perplexity from cross entropy
  const calculate_perplexity = (cross_entropy) => {
    return Math.pow(2, cross_entropy);
  };

  // Different model scenarios
  const model_scenarios = {
    perfect_model: {
      name: "Perfect Model",
      cross_entropy: 0,
      perplexity: 1,
      description: "Predicts next word with 100% accuracy",
      explanation: "This model is never confused - it always knows exactly what comes next!"
    },
    good_model: {
      name: "Good Language Model",
      cross_entropy: 3.5,
      perplexity: 11.3,
      description: "Like GPT-4 on well-written text",
      explanation: "On average, this model is confused between about 11 equally likely words."
    },
    average_model: {
      name: "Average Model",
      cross_entropy: 6.0,
      perplexity: 64,
      description: "Decent but not great performance",
      explanation: "This model is typically confused between about 64 words - needs more training!"
    },
    poor_model: {
      name: "Poor Model",
      cross_entropy: 10.0,
      perplexity: 1024,
      description: "Barely better than random guessing",
      explanation: "This model is very confused - it might as well be picking randomly from 1000+ words!"
    },
    random_model: {
      name: "Random Guessing",
      cross_entropy: Math.log2(vocabulary_size),
      perplexity: vocabulary_size,
      description: "Completely random predictions",
      explanation: `This "model" just picks randomly from all ${vocabulary_size} possible words.`
    }
  };

  // Generate data for perplexity vs performance chart
  const performance_data = Object.values(model_scenarios).map(scenario => ({
    name: scenario.name,
    cross_entropy: scenario.cross_entropy,
    perplexity: scenario.perplexity,
    performance: scenario.name === "Perfect Model" ? 100 : 
                 scenario.name === "Good Language Model" ? 85 :
                 scenario.name === "Average Model" ? 60 :
                 scenario.name === "Poor Model" ? 25 : 10
  }));

  // Interactive model simulation
  const simulated_cross_entropy = -Math.log2(model_confidence);
  const simulated_perplexity = calculate_perplexity(simulated_cross_entropy);

  // Word prediction examples
  const prediction_examples = [
    {
      context: "The cat sat on the",
      good_predictions: [
        { word: "mat", probability: 0.4 },
        { word: "floor", probability: 0.2 },
        { word: "chair", probability: 0.15 },
        { word: "table", probability: 0.1 },
        { word: "bed", probability: 0.15 }
      ],
      poor_predictions: [
        { word: "elephant", probability: 0.2 },
        { word: "quantum", probability: 0.2 },
        { word: "mat", probability: 0.2 },
        { word: "spaceship", probability: 0.2 },
        { word: "bicycle", probability: 0.2 }
      ]
    }
  ];

  const calculate_example_perplexity = (predictions) => {
    const cross_entropy = -predictions.reduce((sum, pred) => {
      return sum + pred.probability * Math.log2(pred.probability);
    }, 0);
    return Math.pow(2, cross_entropy);
  };

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🤯 Perplexity: How Confused is Our AI?</h1>
        <p className="intro_subtitle">The ultimate metric for language model performance</p>
      </div>

      <div className="concept_box">
        <h2>What is Perplexity?</h2>
        <div className="simple_explanation">
          <p>
            <strong>Perplexity</strong> measures how confused an AI model is when predicting the next word. 
            It's like asking: "How many words was the AI genuinely considering?"
          </p>
          
          <div className="perplexity_intuition">
            <h3>🎯 Simple Intuition:</h3>
            <div className="intuition_grid">
              <div className="intuition_item">
                <h4>🎯 Low Perplexity (Good)</h4>
                <p>"I'm pretty sure the next word is 'cat'"</p>
                <p className="example">Perplexity = 2 → Confused between ~2 words</p>
              </div>
              <div className="intuition_item">
                <h4>🤔 High Perplexity (Bad)</h4>
                <p>"Could be any of 1000 words... no idea!"</p>
                <p className="example">Perplexity = 1000 → Confused between ~1000 words</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="formula_section">
        <h2>📐 The Formula Connection</h2>
        <div className="formula_box">
          <div className="formula_chain">
            <p className="formula">Perplexity = 2^(Cross Entropy)</p>
            <p className="formula_explanation">
              <strong>In Plain English:</strong> Take the cross entropy (bits of confusion) and raise 2 to that power.
            </p>
          </div>
          
          <div className="formula_examples">
            <h4>Quick Examples:</h4>
            <ul>
              <li><strong>Cross Entropy = 1 bit</strong> → Perplexity = 2¹ = 2 words</li>
              <li><strong>Cross Entropy = 3 bits</strong> → Perplexity = 2³ = 8 words</li>
              <li><strong>Cross Entropy = 10 bits</strong> → Perplexity = 2¹⁰ = 1024 words</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🎮 Interactive Perplexity Explorer</h2>
        
        <div className="demo_selector">
          <button 
            className={`demo_button ${demo_type === 'basic_concept' ? 'active' : ''}`}
            onClick={() => set_demo_type('basic_concept')}
          >
            🎯 Basic Concept
          </button>
          <button 
            className={`demo_button ${demo_type === 'model_comparison' ? 'active' : ''}`}
            onClick={() => set_demo_type('model_comparison')}
          >
            🏆 Model Comparison
          </button>
          <button 
            className={`demo_button ${demo_type === 'real_examples' ? 'active' : ''}`}
            onClick={() => set_demo_type('real_examples')}
          >
            💬 Real Examples
          </button>
          <button 
            className={`demo_button ${demo_type === 'use_cases' ? 'active' : ''}`}
            onClick={() => set_demo_type('use_cases')}
          >
            🚀 Use Cases
          </button>
        </div>

        {demo_type === 'basic_concept' && (
          <div className="basic_concept_demo">
            <h3>🎯 Understanding Perplexity</h3>
            
            <div className="perplexity_simulator">
              <h4>🎮 Model Confidence Simulator</h4>
              <p>Adjust how confident your AI model is and see how perplexity changes:</p>
              
              <div className="confidence_slider">
                <label>Model Confidence: {(model_confidence * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="0.99"
                  step="0.01"
                  value={model_confidence}
                  onChange={(e) => set_model_confidence(parseFloat(e.target.value))}
                  className="confidence_control"
                />
              </div>

              <div className="simulation_results">
                <div className="result_item">
                  <h5>Cross Entropy</h5>
                  <p className="result_value">{simulated_cross_entropy.toFixed(2)} bits</p>
                </div>
                <div className="result_item">
                  <h5>Perplexity</h5>
                  <p className="result_value">{simulated_perplexity.toFixed(1)}</p>
                </div>
                <div className="result_item">
                  <h5>Interpretation</h5>
                  <p className="result_explanation">
                    The model is confused between approximately <strong>{Math.round(simulated_perplexity)}</strong> equally likely words.
                  </p>
                </div>
              </div>
            </div>

            <div className="perplexity_scale">
              <h4>📏 Perplexity Scale Reference</h4>
              <div className="scale_items">
                <div className="scale_item excellent">
                  <strong>1-10: Excellent</strong>
                  <p>Very confident predictions</p>
                </div>
                <div className="scale_item good">
                  <strong>10-50: Good</strong>
                  <p>Decent language understanding</p>
                </div>
                <div className="scale_item average">
                  <strong>50-200: Average</strong>
                  <p>Moderate confusion</p>
                </div>
                <div className="scale_item poor">
                  <strong>200+: Poor</strong>
                  <p>High confusion, needs training</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {demo_type === 'model_comparison' && (
          <div className="model_comparison_demo">
            <h3>🏆 Comparing Different Models</h3>
            
            <div className="scenario_selector">
              <label>Select a model to examine:</label>
              <select 
                value={selected_scenario} 
                onChange={(e) => set_selected_scenario(e.target.value)}
                className="scenario_select"
              >
                {Object.entries(model_scenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>{scenario.name}</option>
                ))}
              </select>
            </div>

            <div className="scenario_details">
              <h4>{model_scenarios[selected_scenario].name}</h4>
              <p>{model_scenarios[selected_scenario].description}</p>
              
              <div className="scenario_metrics">
                <div className="metric_item">
                  <h5>Cross Entropy</h5>
                  <p className="metric_value">{model_scenarios[selected_scenario].cross_entropy.toFixed(1)} bits</p>
                </div>
                <div className="metric_item">
                  <h5>Perplexity</h5>
                  <p className="metric_value">{model_scenarios[selected_scenario].perplexity.toFixed(1)}</p>
                </div>
              </div>
              
              <div className="scenario_explanation">
                <p><strong>What this means:</strong> {model_scenarios[selected_scenario].explanation}</p>
              </div>
            </div>

            <div className="comparison_chart">
              <h4>📊 Model Performance Comparison</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={performance_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="perplexity" name="Perplexity" type="number" scale="log" domain={['dataMin', 'dataMax']} />
                  <YAxis dataKey="performance" name="Performance %" />
                  <Tooltip formatter={(value, name) => [
                    name === 'perplexity' ? value.toFixed(1) : value + '%',
                    name === 'perplexity' ? 'Perplexity' : 'Performance'
                  ]} />
                  <Scatter dataKey="performance" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="chart_note">Lower perplexity generally means better performance!</p>
            </div>
          </div>
        )}

        {demo_type === 'real_examples' && (
          <div className="real_examples_demo">
            <h3>💬 Real Word Prediction Examples</h3>
            
            <div className="prediction_example">
              <h4>Context: "{prediction_examples[0].context}..."</h4>
              
              <div className="predictions_comparison">
                <div className="prediction_group">
                  <h5>🎯 Good Model Predictions</h5>
                  <div className="predictions_list">
                    {prediction_examples[0].good_predictions.map((pred, i) => (
                      <div key={i} className="prediction_item">
                        <span className="word">"{pred.word}"</span>
                        <span className="probability">{(pred.probability * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="perplexity_result">
                    <strong>Perplexity: {calculate_example_perplexity(prediction_examples[0].good_predictions).toFixed(1)}</strong>
                  </p>
                  <p className="explanation">Reasonable predictions that make sense in context!</p>
                </div>

                <div className="prediction_group">
                  <h5>😵 Poor Model Predictions</h5>
                  <div className="predictions_list">
                    {prediction_examples[0].poor_predictions.map((pred, i) => (
                      <div key={i} className="prediction_item">
                        <span className="word">"{pred.word}"</span>
                        <span className="probability">{(pred.probability * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="perplexity_result">
                    <strong>Perplexity: {calculate_example_perplexity(prediction_examples[0].poor_predictions).toFixed(1)}</strong>
                  </p>
                  <p className="explanation">Random, nonsensical predictions!</p>
                </div>
              </div>
            </div>

            <div className="real_world_perplexities">
              <h4>🌍 Real-World Perplexity Values</h4>
              <div className="perplexity_examples">
                <div className="example_item">
                  <h5>📚 GPT-3 on Books</h5>
                  <p><strong>Perplexity: ~20-30</strong></p>
                  <p>Excellent performance on well-written text</p>
                </div>
                <div className="example_item">
                  <h5>💬 Chatbot on Conversations</h5>
                  <p><strong>Perplexity: ~40-60</strong></p>
                  <p>Good but conversations are less predictable</p>
                </div>
                <div className="example_item">
                  <h5>🔬 Model on Technical Papers</h5>
                  <p><strong>Perplexity: ~80-150</strong></p>
                  <p>Harder due to specialized vocabulary</p>
                </div>
                <div className="example_item">
                  <h5>🎵 Model on Poetry</h5>
                  <p><strong>Perplexity: ~100-300</strong></p>
                  <p>Very challenging due to creative language</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {demo_type === 'use_cases' && (
          <div className="use_cases_demo">
            <h3>🚀 How Perplexity is Used</h3>
            
            <div className="use_case_grid">
              <div className="use_case_item">
                <h4>🏗️ Model Development</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> Track training progress</p>
                  <p><strong>How:</strong> Lower perplexity = better model</p>
                  <p><strong>Example:</strong> "Our new model achieved perplexity 15, down from 45!"</p>
                </div>
              </div>

              <div className="use_case_item">
                <h4>⚖️ Model Comparison</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> Choose the best model</p>
                  <p><strong>How:</strong> Compare perplexity on same test data</p>
                  <p><strong>Example:</strong> "Model A: 20 vs Model B: 35 → Choose A"</p>
                </div>
              </div>

              <div className="use_case_item">
                <h4>📊 Domain Adaptation</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> See how well model fits new domain</p>
                  <p><strong>How:</strong> High perplexity = needs domain-specific training</p>
                  <p><strong>Example:</strong> "Legal text gives perplexity 200 → need legal training"</p>
                </div>
              </div>

              <div className="use_case_item">
                <h4>🔍 Anomaly Detection</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> Find unusual text</p>
                  <p><strong>How:</strong> Very high perplexity = something's wrong</p>
                  <p><strong>Example:</strong> "This email has perplexity 500 → might be spam"</p>
                </div>
              </div>

              <div className="use_case_item">
                <h4>📈 Research Benchmarks</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> Standard way to compare models</p>
                  <p><strong>How:</strong> Report perplexity on common datasets</p>
                  <p><strong>Example:</strong> "State-of-the-art on WikiText: 16.4 perplexity"</p>
                </div>
              </div>

              <div className="use_case_item">
                <h4>🎯 Quality Control</h4>
                <div className="use_case_content">
                  <p><strong>Purpose:</strong> Monitor production model performance</p>
                  <p><strong>How:</strong> Alert if perplexity suddenly increases</p>
                  <p><strong>Example:</strong> "User queries now have perplexity 80 vs usual 30"</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="perplexity_guidelines">
        <h2>📋 Practical Perplexity Guidelines</h2>
        <div className="guidelines_grid">
          <div className="guideline_item">
            <h4>✅ When Perplexity is Useful</h4>
            <ul>
              <li>Comparing models on same task</li>
              <li>Tracking training progress</li>
              <li>Evaluating language understanding</li>
              <li>Domain adaptation assessment</li>
            </ul>
          </div>
          <div className="guideline_item">
            <h4>⚠️ Perplexity Limitations</h4>
            <ul>
              <li>Doesn't measure actual usefulness</li>
              <li>Can't compare across different vocabularies</li>
              <li>Doesn't capture semantic understanding</li>
              <li>May not reflect human preferences</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="journey_complete">
        <h2>🎉 Congratulations!</h2>
        <div className="completion_summary">
          <h3>You've Mastered Information Theory for AI!</h3>
          <p>You now understand the fundamental concepts that power modern AI systems:</p>
          
          <div className="concepts_mastered">
            <div className="mastered_item">
              <h4>🔢 Bits</h4>
              <p>The basic unit of information</p>
            </div>
            <div className="mastered_item">
              <h4>🎲 Entropy</h4>
              <p>Average surprise in data</p>
            </div>
            <div className="mastered_item">
              <h4>⚖️ Cross Entropy</h4>
              <p>Cost of imperfect predictions</p>
            </div>
            <div className="mastered_item">
              <h4>📝 Bits per Character</h4>
              <p>Information density in text</p>
            </div>
            <div className="mastered_item">
              <h4>🤯 Perplexity</h4>
              <p>AI model confusion metric</p>
            </div>
          </div>

          <div className="next_steps">
            <h4>🚀 Where to Go Next</h4>
            <p>With this foundation, you're ready to understand:</p>
            <ul>
              <li>How language models like GPT are trained</li>
              <li>Why some AI tasks are harder than others</li>
              <li>How to evaluate and improve AI systems</li>
              <li>The mathematics behind neural networks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerplexityComponent;

