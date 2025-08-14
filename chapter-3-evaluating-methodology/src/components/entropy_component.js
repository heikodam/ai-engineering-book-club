import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EntropyComponent = () => {
  const [current_demo, set_current_demo] = useState('weather');
  const [sunny_probability, set_sunny_probability] = useState(0.7);
  const [custom_probabilities, set_custom_probabilities] = useState([0.25, 0.25, 0.25, 0.25]);

  // Calculate entropy for any probability distribution
  const calculate_entropy = (probabilities) => {
    return -probabilities
      .filter(p => p > 0)
      .reduce((sum, p) => sum + p * Math.log2(p), 0);
  };

  // Weather demo with 2 outcomes
  const weather_entropy = calculate_entropy([sunny_probability, 1 - sunny_probability]);
  const weather_data = [
    { name: 'Sunny', probability: sunny_probability, bits: sunny_probability > 0 ? -sunny_probability * Math.log2(sunny_probability) : 0 },
    { name: 'Rainy', probability: 1 - sunny_probability, bits: (1 - sunny_probability) > 0 ? -(1 - sunny_probability) * Math.log2(1 - sunny_probability) : 0 }
  ];

  // 4-outcome demo
  const four_outcome_entropy = calculate_entropy(custom_probabilities);
  const four_outcome_data = custom_probabilities.map((prob, index) => ({
    name: `Option ${index + 1}`,
    probability: prob,
    bits: prob > 0 ? -prob * Math.log2(prob) : 0
  }));

  const update_custom_probability = (index, value) => {
    const new_probs = [...custom_probabilities];
    new_probs[index] = parseFloat(value);
    
    // Normalize to ensure they sum to 1
    const sum = new_probs.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      const normalized = new_probs.map(p => p / sum);
      set_custom_probabilities(normalized);
    }
  };

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🎲 Entropy: Measuring Surprise</h1>
        <p className="intro_subtitle">How much information do we expect on average?</p>
      </div>

      <div className="concept_box">
        <h2>What is Entropy?</h2>
        <div className="simple_explanation">
          <p>
            <strong>Entropy</strong> measures <em>how much surprise</em> we expect on average. 
            It's like asking: "If I had to guess many times, how hard would it be?"
          </p>
          
          <div className="entropy_analogy">
            <h3>🎯 Simple Analogy:</h3>
            <div className="analogy_grid">
              <div className="analogy_item">
                <h4>🌞 Predictable Weather</h4>
                <p>If it's sunny 99% of the time → Low entropy (little surprise)</p>
              </div>
              <div className="analogy_item">
                <h4>🎲 Random Weather</h4>
                <p>If weather is totally random → High entropy (lots of surprise)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="entropy_formula">
        <h2>📐 The Formula (Don't Panic!)</h2>
        <div className="formula_box">
          <p className="formula">H = -Σ p(x) × log₂(p(x))</p>
          <p className="formula_explanation">
            <strong>In Plain English:</strong> For each possible outcome, multiply its probability by its "surprise value" (log), then add them all up.
          </p>
          <div className="formula_breakdown">
            <ul>
              <li><strong>p(x)</strong> = probability of outcome x</li>
              <li><strong>log₂(p(x))</strong> = how surprised you are (in bits)</li>
              <li><strong>Σ</strong> = add up all outcomes</li>
              <li><strong>-</strong> = flip the sign (technical reason)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🎮 Interactive Entropy Explorer</h2>
        
        <div className="demo_selector">
          <button 
            className={`demo_button ${current_demo === 'weather' ? 'active' : ''}`}
            onClick={() => set_current_demo('weather')}
          >
            🌤️ Weather Prediction
          </button>
          <button 
            className={`demo_button ${current_demo === 'four_way' ? 'active' : ''}`}
            onClick={() => set_current_demo('four_way')}
          >
            🎯 Four Options
          </button>
          <button 
            className={`demo_button ${current_demo === 'extremes' ? 'active' : ''}`}
            onClick={() => set_current_demo('extremes')}
          >
            🔄 Extreme Cases
          </button>
        </div>

        {current_demo === 'weather' && (
          <div className="weather_demo">
            <h3>🌤️ Weather Entropy Demo</h3>
            <p>Adjust how often it's sunny and see how entropy changes!</p>
            
            <div className="slider_container">
              <label>Probability of Sunny Weather: {(sunny_probability * 100).toFixed(0)}%</label>
              <input
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value={sunny_probability}
                onChange={(e) => set_sunny_probability(parseFloat(e.target.value))}
                className="probability_slider"
              />
              <p>Rainy: {((1 - sunny_probability) * 100).toFixed(0)}%</p>
            </div>

            <div className="entropy_result">
              <h4>📊 Current Entropy: <span className="entropy_value">{weather_entropy.toFixed(3)} bits</span></h4>
              <p className="entropy_interpretation">
                {weather_entropy < 0.5 && "Very predictable! You're rarely surprised."}
                {weather_entropy >= 0.5 && weather_entropy < 0.9 && "Somewhat predictable, but some surprise."}
                {weather_entropy >= 0.9 && "Very unpredictable! Maximum surprise is 1 bit."}
              </p>
            </div>

            <div className="chart_container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weather_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value.toFixed(3), name === 'probability' ? 'Probability' : 'Information (bits)']} />
                  <Bar dataKey="probability" fill="#8884d8" name="probability" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {current_demo === 'four_way' && (
          <div className="four_way_demo">
            <h3>🎯 Four Options Demo</h3>
            <p>Adjust the probabilities of 4 different outcomes:</p>
            
            <div className="probability_controls">
              {custom_probabilities.map((prob, index) => (
                <div key={index} className="prob_control">
                  <label>Option {index + 1}: {(prob * 100).toFixed(1)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={prob}
                    onChange={(e) => update_custom_probability(index, e.target.value)}
                    className="probability_slider"
                  />
                </div>
              ))}
            </div>

            <div className="entropy_result">
              <h4>📊 Current Entropy: <span className="entropy_value">{four_outcome_entropy.toFixed(3)} bits</span></h4>
              <p className="entropy_interpretation">
                {four_outcome_entropy < 1 && "Some outcomes are more likely than others."}
                {four_outcome_entropy >= 1 && four_outcome_entropy < 1.8 && "Fairly random, but not completely."}
                {four_outcome_entropy >= 1.8 && "Very random! Close to maximum entropy of 2 bits."}
              </p>
            </div>

            <div className="chart_container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={four_outcome_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value.toFixed(3), name === 'probability' ? 'Probability' : 'Information (bits)']} />
                  <Bar dataKey="probability" fill="#82ca9d" name="probability" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {current_demo === 'extremes' && (
          <div className="extremes_demo">
            <h3>🔄 Extreme Cases</h3>
            <p>Let's see what happens at the extremes:</p>
            
            <div className="extreme_cases">
              <div className="extreme_case">
                <h4>🎯 Completely Predictable</h4>
                <p>One outcome has 100% probability</p>
                <div className="case_result">
                  <strong>Entropy = 0 bits</strong>
                  <p>No surprise at all! You always know what will happen.</p>
                </div>
              </div>
              
              <div className="extreme_case">
                <h4>🎲 Completely Random</h4>
                <p>All outcomes equally likely</p>
                <div className="case_result">
                  <strong>Entropy = log₂(number of outcomes)</strong>
                  <ul>
                    <li>2 equally likely outcomes → 1 bit</li>
                    <li>4 equally likely outcomes → 2 bits</li>
                    <li>8 equally likely outcomes → 3 bits</li>
                    <li>256 equally likely outcomes → 8 bits</li>
                  </ul>
                  <p>Maximum possible surprise!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="entropy_insights">
        <h2>🧠 Key Insights About Entropy</h2>
        <div className="insights_grid">
          <div className="insight_item">
            <h4>📊 It's an Average</h4>
            <p>Entropy tells you the average bits of information per outcome, not for any single event</p>
          </div>
          <div className="insight_item">
            <h4>🎯 Predictable = Low Entropy</h4>
            <p>When outcomes are very uneven in probability, entropy is low</p>
          </div>
          <div className="insight_item">
            <h4>🎲 Random = High Entropy</h4>
            <p>When all outcomes are equally likely, entropy is maximized</p>
          </div>
          <div className="insight_item">
            <h4>🔢 Always ≥ 0</h4>
            <p>Entropy is never negative. 0 means completely predictable.</p>
          </div>
        </div>
      </div>

      <div className="real_world_examples">
        <h2>🌍 Real-World Examples</h2>
        <div className="examples_grid">
          <div className="example_item">
            <h4>📚 English Text</h4>
            <p>Entropy ≈ 1.5 bits per letter (some letters like 'e' are very common)</p>
          </div>
          <div className="example_item">
            <h4>🎵 Random Music</h4>
            <p>Higher entropy than structured music (random notes vs. melodies)</p>
          </div>
          <div className="example_item">
            <h4>📷 Image Compression</h4>
            <p>JPEG works because natural images have lower entropy than random pixels</p>
          </div>
          <div className="example_item">
            <h4>🔐 Passwords</h4>
            <p>Good passwords have high entropy (hard to guess)</p>
          </div>
        </div>
      </div>

      <div className="whats_next">
        <h3>Coming Up: Cross Entropy! ⚖️</h3>
        <p>Now let's learn what happens when we compare two different probability distributions using <strong>cross entropy</strong>!</p>
      </div>
    </div>
  );
};

export default EntropyComponent;

