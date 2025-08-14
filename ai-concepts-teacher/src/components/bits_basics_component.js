import React, { useState } from 'react';

const BitsBasicsComponent = () => {
  const [current_demo, set_current_demo] = useState('coin');
  const [coin_flips, set_coin_flips] = useState([]);
  const [user_guess, set_user_guess] = useState('');

  const flip_coin = () => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    set_coin_flips([...coin_flips, result]);
  };

  const reset_coin_flips = () => {
    set_coin_flips([]);
  };

  const calculate_questions_needed = (num_options) => {
    return Math.ceil(Math.log2(num_options));
  };

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🔢 What are Bits?</h1>
        <p className="intro_subtitle">The basic unit for measuring information</p>
      </div>

      <div className="concept_box">
        <h2>Think of Bits like Inches</h2>
        <div className="analogy_comparison">
          <div className="analogy_item">
            <h3>📏 For Length</h3>
            <p>We measure distance in <strong>inches</strong>, <strong>feet</strong>, or <strong>meters</strong></p>
          </div>
          <div className="analogy_item">
            <h3>📊 For Information</h3>
            <p>We measure information in <strong>bits</strong></p>
          </div>
        </div>
      </div>

      <div className="simple_definition">
        <h2>Simple Definition</h2>
        <div className="definition_box">
          <p className="big_text">
            <strong>1 bit = the amount of information you get from one yes/no question</strong>
          </p>
          <p className="example_text">
            Like: "Is the coin heads?" → Answer gives you 1 bit of information
          </p>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>Let's Play with Bits!</h2>
        
        <div className="demo_selector">
          <button 
            className={`demo_button ${current_demo === 'coin' ? 'active' : ''}`}
            onClick={() => set_current_demo('coin')}
          >
            🪙 Coin Flip (1 bit)
          </button>
          <button 
            className={`demo_button ${current_demo === 'dice' ? 'active' : ''}`}
            onClick={() => set_current_demo('dice')}
          >
            🎲 Dice Roll (more bits)
          </button>
          <button 
            className={`demo_button ${current_demo === 'calculator' ? 'active' : ''}`}
            onClick={() => set_current_demo('calculator')}
          >
            🧮 Bit Calculator
          </button>
        </div>

        {current_demo === 'coin' && (
          <div className="coin_demo">
            <h3>Coin Flip Demo</h3>
            <p>A coin can be either heads or tails. That's 2 possibilities.</p>
            <p><strong>2 possibilities = 1 bit of information</strong></p>
            
            <div className="coin_container">
              <button className="flip_button" onClick={flip_coin}>
                🪙 Flip Coin
              </button>
              <button className="reset_button" onClick={reset_coin_flips}>
                🔄 Reset
              </button>
            </div>

            <div className="coin_results">
              <h4>Your flips:</h4>
              <div className="flips_display">
                {coin_flips.map((flip, index) => (
                  <span key={index} className={`flip_result ${flip}`}>
                    {flip === 'heads' ? '👑' : '🥄'}
                  </span>
                ))}
              </div>
              <p>Total flips: {coin_flips.length} → Total information: {coin_flips.length} bits</p>
            </div>
          </div>
        )}

        {current_demo === 'dice' && (
          <div className="dice_demo">
            <h3>Dice Roll Demo</h3>
            <p>A dice has 6 sides. That's 6 possibilities.</p>
            <p><strong>How many yes/no questions do you need to figure out which side?</strong></p>
            
            <div className="binary_tree">
              <h4>The Question Strategy:</h4>
              <div className="question_tree">
                <div className="tree_level">
                  <div className="question">Q1: "Is it 1, 2, or 3?" → Eliminates half</div>
                </div>
                <div className="tree_level">
                  <div className="question">Q2: Within your group, "Is it the first or second?" → Eliminates half again</div>
                </div>
                <div className="tree_level">
                  <div className="question">Q3: Sometimes needed for 6 options</div>
                </div>
              </div>
              <p className="result_text">
                <strong>Answer: About 2.6 bits</strong> (because log₂(6) ≈ 2.58)
              </p>
            </div>

            <div className="math_explanation">
              <h4>The Math (Don't worry, it's simple!):</h4>
              <p>Number of bits = log₂(number of possibilities)</p>
              <ul>
                <li>2 possibilities (coin) → log₂(2) = 1 bit</li>
                <li>4 possibilities → log₂(4) = 2 bits</li>
                <li>8 possibilities → log₂(8) = 3 bits</li>
                <li>6 possibilities (dice) → log₂(6) ≈ 2.58 bits</li>
              </ul>
            </div>
          </div>
        )}

        {current_demo === 'calculator' && (
          <div className="calculator_demo">
            <h3>Bit Calculator</h3>
            <p>Enter the number of possibilities, and I'll tell you how many bits!</p>
            
            <div className="calculator_input">
              <label htmlFor="possibilities">Number of possibilities:</label>
              <input
                id="possibilities"
                type="number"
                min="1"
                value={user_guess}
                onChange={(e) => set_user_guess(e.target.value)}
                placeholder="e.g., 256"
              />
            </div>

            {user_guess && user_guess > 0 && (
              <div className="calculator_result">
                <h4>Results:</h4>
                <p><strong>{user_guess} possibilities = {Math.log2(user_guess).toFixed(2)} bits</strong></p>
                <p>This means you need about {calculate_questions_needed(user_guess)} yes/no questions to figure out the answer.</p>
                
                <div className="practical_examples">
                  <h5>Real-world examples with {user_guess} possibilities:</h5>
                  {user_guess == 2 && <p>• Coin flip (heads/tails)</p>}
                  {user_guess == 8 && <p>• 8 colors, 8-person race, 1 week day</p>}
                  {user_guess == 26 && <p>• Letters in alphabet</p>}
                  {user_guess == 256 && <p>• 1 byte of data, RGB color values</p>}
                  {user_guess == 1000 && <p>• 3-digit number, large vocabulary word choice</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="key_insights">
        <h2>🎯 Key Insights About Bits</h2>
        <div className="insights_grid">
          <div className="insight_item">
            <h4>📏 Bits are Universal</h4>
            <p>Just like inches work for any length, bits work for any type of information</p>
          </div>
          <div className="insight_item">
            <h4>🔢 More Possibilities = More Bits</h4>
            <p>The more options there are, the more information (bits) the answer contains</p>
          </div>
          <div className="insight_item">
            <h4>❓ It's About Questions</h4>
            <p>Bits measure how many yes/no questions you need to figure something out</p>
          </div>
          <div className="insight_item">
            <h4>🔮 Perfect for Computers</h4>
            <p>Computers think in yes/no (1/0), so bits are their natural language</p>
          </div>
        </div>
      </div>

      <div className="whats_next">
        <h3>Coming Up Next: Entropy! 🎲</h3>
        <p>Now that you understand bits, let's learn about <strong>entropy</strong> - which measures how many bits we need <em>on average</em> when things aren't equally likely to happen!</p>
      </div>
    </div>
  );
};

export default BitsBasicsComponent;

