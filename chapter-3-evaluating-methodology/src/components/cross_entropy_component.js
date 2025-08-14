import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CrossEntropyComponent = () => {
  const [demo_type, set_demo_type] = useState('weather_prediction');
  const [true_sunny_prob, set_true_sunny_prob] = useState(0.7);
  const [predicted_sunny_prob, set_predicted_sunny_prob] = useState(0.5);
  
  // AI model predictions vs reality
  const [true_probs, set_true_probs] = useState([0.7, 0.2, 0.1]); // Cat, Dog, Bird
  const [predicted_probs, set_predicted_probs] = useState([0.6, 0.3, 0.1]);

  // Calculate cross entropy
  const calculate_cross_entropy = (true_dist, predicted_dist) => {
    return -true_dist.reduce((sum, p, i) => {
      if (p > 0 && predicted_dist[i] > 0) {
        return sum + p * Math.log2(predicted_dist[i]);
      }
      return sum;
    }, 0);
  };

  // Calculate regular entropy for comparison
  const calculate_entropy = (probs) => {
    return -probs.reduce((sum, p) => {
      if (p > 0) {
        return sum + p * Math.log2(p);
      }
      return sum;
    }, 0);
  };

  // Two-outcome (weather) calculations
  const true_weather_dist = [true_sunny_prob, 1 - true_sunny_prob];
  const predicted_weather_dist = [predicted_sunny_prob, 1 - predicted_sunny_prob];
  const weather_cross_entropy = calculate_cross_entropy(true_weather_dist, predicted_weather_dist);
  const weather_entropy = calculate_entropy(true_weather_dist);

  // Three-outcome (animals) calculations
  const animals_cross_entropy = calculate_cross_entropy(true_probs, predicted_probs);
  const animals_entropy = calculate_entropy(true_probs);

  const weather_data = [
    { 
      name: 'Sunny', 
      true_prob: true_sunny_prob, 
      predicted_prob: predicted_sunny_prob,
      surprise: true_sunny_prob > 0 && predicted_sunny_prob > 0 ? -true_sunny_prob * Math.log2(predicted_sunny_prob) : 0
    },
    { 
      name: 'Rainy', 
      true_prob: 1 - true_sunny_prob, 
      predicted_prob: 1 - predicted_sunny_prob,
      surprise: (1 - true_sunny_prob) > 0 && (1 - predicted_sunny_prob) > 0 ? -(1 - true_sunny_prob) * Math.log2(1 - predicted_sunny_prob) : 0
    }
  ];

  const animals_data = ['Cat', 'Dog', 'Bird'].map((animal, i) => ({
    name: animal,
    true_prob: true_probs[i],
    predicted_prob: predicted_probs[i],
    surprise: true_probs[i] > 0 && predicted_probs[i] > 0 ? -true_probs[i] * Math.log2(predicted_probs[i]) : 0
  }));

  const update_animal_true_prob = (index, value) => {
    const new_probs = [...true_probs];
    new_probs[index] = parseFloat(value);
    const sum = new_probs.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      set_true_probs(new_probs.map(p => p / sum));
    }
  };

  const update_animal_predicted_prob = (index, value) => {
    const new_probs = [...predicted_probs];
    new_probs[index] = parseFloat(value);
    const sum = new_probs.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      set_predicted_probs(new_probs.map(p => p / sum));
    }
  };

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>⚖️ Cross Entropy: Comparing Predictions</h1>
        <p className="intro_subtitle">How well do our guesses match reality?</p>
      </div>

      <div className="concept_box">
        <h2>What is Cross Entropy?</h2>
        <div className="simple_explanation">
          <p>
            <strong>Cross entropy</strong> measures how much extra information we need when our predictions don't match reality perfectly.
          </p>
          
          <div className="analogy_container">
            <h3>🎯 Think of it like this:</h3>
            <div className="analogy_comparison">
              <div className="analogy_item">
                <h4>🔮 Perfect Oracle</h4>
                <p>Knows exactly what will happen → Uses minimum bits (entropy)</p>
              </div>
              <div className="analogy_item">
                <h4>🤔 Your Predictions</h4>
                <p>Guesses what will happen → Needs extra bits (cross entropy)</p>
              </div>
            </div>
            <p className="analogy_conclusion">
              <strong>Cross entropy ≥ Entropy</strong> (You can never beat perfect knowledge!)
            </p>
          </div>
        </div>
      </div>

      <div className="formula_section">
        <h2>📐 The Formula</h2>
        <div className="formula_box">
          <p className="formula">H(true, predicted) = -Σ true(x) × log₂(predicted(x))</p>
          <p className="formula_explanation">
            <strong>In Plain English:</strong> For each outcome, take the true probability times the "surprise" of your prediction, then add them up.
          </p>
          <div className="key_insight">
            <p><strong>🔑 Key Insight:</strong> If your predictions are perfect, cross entropy equals entropy!</p>
          </div>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🎮 Interactive Cross Entropy Explorer</h2>
        
        <div className="demo_selector">
          <button 
            className={`demo_button ${demo_type === 'weather_prediction' ? 'active' : ''}`}
            onClick={() => set_demo_type('weather_prediction')}
          >
            🌤️ Weather Forecasting
          </button>
          <button 
            className={`demo_button ${demo_type === 'ai_classification' ? 'active' : ''}`}
            onClick={() => set_demo_type('ai_classification')}
          >
            🤖 AI Image Classification
          </button>
          <button 
            className={`demo_button ${demo_type === 'scenarios' ? 'active' : ''}`}
            onClick={() => set_demo_type('scenarios')}
          >
            📊 Different Scenarios
          </button>
        </div>

        {demo_type === 'weather_prediction' && (
          <div className="weather_demo">
            <h3>🌤️ Weather Forecasting Demo</h3>
            <p>Compare actual weather patterns with your weather predictions!</p>
            
            <div className="controls_grid">
              <div className="control_group">
                <h4>🌍 Reality (True Distribution)</h4>
                <label>Actually Sunny: {(true_sunny_prob * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={true_sunny_prob}
                  onChange={(e) => set_true_sunny_prob(parseFloat(e.target.value))}
                  className="probability_slider"
                />
                <p>Actually Rainy: {((1 - true_sunny_prob) * 100).toFixed(0)}%</p>
              </div>

              <div className="control_group">
                <h4>🔮 Your Forecast (Predicted Distribution)</h4>
                <label>Predict Sunny: {(predicted_sunny_prob * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={predicted_sunny_prob}
                  onChange={(e) => set_predicted_sunny_prob(parseFloat(e.target.value))}
                  className="probability_slider"
                />
                <p>Predict Rainy: {((1 - predicted_sunny_prob) * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="results_comparison">
              <div className="result_item">
                <h4>📊 Actual Entropy (Perfect Knowledge)</h4>
                <p className="entropy_value">{weather_entropy.toFixed(3)} bits</p>
                <p className="explanation">This is the theoretical minimum bits needed</p>
              </div>
              
              <div className="result_item">
                <h4>⚖️ Cross Entropy (Your Predictions)</h4>
                <p className="cross_entropy_value">{weather_cross_entropy.toFixed(3)} bits</p>
                <p className="explanation">This is how many bits you actually need</p>
              </div>
              
              <div className="result_item">
                <h4>📈 Extra Cost</h4>
                <p className="cost_value">{(weather_cross_entropy - weather_entropy).toFixed(3)} bits</p>
                <p className="explanation">
                  {(weather_cross_entropy - weather_entropy) < 0.1 ? "Great predictions! Very close to optimal." :
                   (weather_cross_entropy - weather_entropy) < 0.5 ? "Good predictions with some room for improvement." :
                   "Your predictions are quite different from reality."}
                </p>
              </div>
            </div>

            <div className="chart_container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weather_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    value.toFixed(3), 
                    name === 'true_prob' ? 'True Probability' : 
                    name === 'predicted_prob' ? 'Predicted Probability' : 'Contribution to Cross Entropy'
                  ]} />
                  <Bar dataKey="true_prob" fill="#8884d8" name="true_prob" />
                  <Bar dataKey="predicted_prob" fill="#82ca9d" name="predicted_prob" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {demo_type === 'ai_classification' && (
          <div className="ai_demo">
            <h3>🤖 AI Image Classification Demo</h3>
            <p>An AI tries to classify images as Cat, Dog, or Bird. Let's see how it performs!</p>
            
            <div className="classification_controls">
              <div className="control_group">
                <h4>🎯 Reality (True Distribution)</h4>
                {['Cat', 'Dog', 'Bird'].map((animal, i) => (
                  <div key={animal} className="prob_control">
                    <label>{animal}: {(true_probs[i] * 100).toFixed(1)}%</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={true_probs[i]}
                      onChange={(e) => update_animal_true_prob(i, e.target.value)}
                      className="probability_slider"
                    />
                  </div>
                ))}
              </div>

              <div className="control_group">
                <h4>🤖 AI Predictions</h4>
                {['Cat', 'Dog', 'Bird'].map((animal, i) => (
                  <div key={animal} className="prob_control">
                    <label>{animal}: {(predicted_probs[i] * 100).toFixed(1)}%</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={predicted_probs[i]}
                      onChange={(e) => update_animal_predicted_prob(i, e.target.value)}
                      className="probability_slider"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="results_comparison">
              <div className="result_item">
                <h4>📊 True Entropy</h4>
                <p className="entropy_value">{animals_entropy.toFixed(3)} bits</p>
              </div>
              
              <div className="result_item">
                <h4>⚖️ Cross Entropy</h4>
                <p className="cross_entropy_value">{animals_cross_entropy.toFixed(3)} bits</p>
              </div>
              
              <div className="result_item">
                <h4>🤖 AI Performance</h4>
                <p className="cost_value">+{(animals_cross_entropy - animals_entropy).toFixed(3)} bits penalty</p>
                <p className="explanation">
                  {(animals_cross_entropy - animals_entropy) < 0.1 ? "Excellent AI! Nearly perfect predictions." :
                   (animals_cross_entropy - animals_entropy) < 0.3 ? "Good AI with room for improvement." :
                   (animals_cross_entropy - animals_entropy) < 0.7 ? "AI needs more training." :
                   "AI is performing poorly."}
                </p>
              </div>
            </div>

            <div className="chart_container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={animals_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    value.toFixed(3), 
                    name === 'true_prob' ? 'True Probability' : 
                    name === 'predicted_prob' ? 'AI Prediction' : 'Cross Entropy Contribution'
                  ]} />
                  <Bar dataKey="true_prob" fill="#ff7300" name="true_prob" />
                  <Bar dataKey="predicted_prob" fill="#00ff7f" name="predicted_prob" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {demo_type === 'scenarios' && (
          <div className="scenarios_demo">
            <h3>📊 Different Scenarios</h3>
            <div className="scenario_grid">
              <div className="scenario_item">
                <h4>🎯 Perfect Predictions</h4>
                <p>When predicted = true distribution</p>
                <div className="scenario_result">
                  <strong>Cross Entropy = Entropy</strong>
                  <p>You achieve the theoretical minimum!</p>
                </div>
              </div>
              
              <div className="scenario_item">
                <h4>🎲 Random Guessing</h4>
                <p>When you predict everything equally likely</p>
                <div className="scenario_result">
                  <strong>Cross Entropy = log₂(number of options)</strong>
                  <p>Usually much higher than optimal</p>
                </div>
              </div>
              
              <div className="scenario_item">
                <h4>🚫 Terrible Predictions</h4>
                <p>When you assign low probability to what actually happens</p>
                <div className="scenario_result">
                  <strong>Cross Entropy → ∞</strong>
                  <p>If you predict 0% for something that happens, you pay infinite penalty!</p>
                </div>
              </div>
              
              <div className="scenario_item">
                <h4>✨ Good Predictions</h4>
                <p>When your distribution is close to reality</p>
                <div className="scenario_result">
                  <strong>Cross Entropy ≈ Entropy</strong>
                  <p>Close to optimal with small penalty</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="why_it_matters">
        <h2>🚀 Why Cross Entropy Matters for AI</h2>
        <div className="importance_grid">
          <div className="importance_item">
            <h4>🎯 Training AI Models</h4>
            <p>Cross entropy is the most common loss function for classification tasks</p>
          </div>
          <div className="importance_item">
            <h4>📊 Measuring Performance</h4>
            <p>Lower cross entropy = better predictions = better AI model</p>
          </div>
          <div className="importance_item">
            <h4>🔄 Optimization</h4>
            <p>AI tries to minimize cross entropy during training</p>
          </div>
          <div className="importance_item">
            <h4>🏆 Model Comparison</h4>
            <p>Compare different AI models by their cross entropy scores</p>
          </div>
        </div>
      </div>

      <div className="whats_next">
        <h3>Coming Up: Bits per Character! 📝</h3>
        <p>Now let's learn how to apply these concepts to measure information in text and data!</p>
      </div>
    </div>
  );
};

export default CrossEntropyComponent;

