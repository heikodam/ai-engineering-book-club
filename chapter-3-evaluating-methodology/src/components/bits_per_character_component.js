import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BitsPerCharacterComponent = () => {
  const [user_text, set_user_text] = useState("Hello World!");
  const [demo_type, set_demo_type] = useState('basic');
  const [selected_language, set_selected_language] = useState('english');

  // Calculate character frequencies
  const calculate_character_frequencies = (text) => {
    const chars = text.toLowerCase().split('');
    const freq_map = {};
    chars.forEach(char => {
      freq_map[char] = (freq_map[char] || 0) + 1;
    });
    
    const total = chars.length;
    const frequencies = Object.entries(freq_map).map(([char, count]) => ({
      char: char === ' ' ? '(space)' : char,
      count,
      probability: count / total,
      bits: -Math.log2(count / total)
    }));
    
    return frequencies.sort((a, b) => b.count - a.count);
  };

  // Calculate entropy of text
  const calculate_text_entropy = (text) => {
    if (!text.length) return 0;
    
    const frequencies = calculate_character_frequencies(text);
    return frequencies.reduce((entropy, { probability }) => {
      return entropy - probability * Math.log2(probability);
    }, 0);
  };

  // Predefined language statistics (simplified)
  const language_stats = {
    english: {
      name: "English",
      entropy: 4.14,
      description: "Natural English text has about 4.14 bits per character",
      common_chars: [
        { char: 'e', probability: 0.127, bits: 2.98 },
        { char: 't', probability: 0.091, bits: 3.46 },
        { char: 'a', probability: 0.082, bits: 3.61 },
        { char: 'o', probability: 0.075, bits: 3.74 },
        { char: 'i', probability: 0.070, bits: 3.84 }
      ]
    },
    random: {
      name: "Random Characters",
      entropy: 4.70,
      description: "Random lowercase letters (26 possibilities)",
      common_chars: [
        { char: 'a', probability: 0.0385, bits: 4.70 },
        { char: 'b', probability: 0.0385, bits: 4.70 },
        { char: 'c', probability: 0.0385, bits: 4.70 },
        { char: 'd', probability: 0.0385, bits: 4.70 },
        { char: 'e', probability: 0.0385, bits: 4.70 }
      ]
    },
    dna: {
      name: "DNA Sequence",
      entropy: 2.00,
      description: "Perfect random DNA (4 equally likely bases)",
      common_chars: [
        { char: 'A', probability: 0.25, bits: 2.00 },
        { char: 'T', probability: 0.25, bits: 2.00 },
        { char: 'G', probability: 0.25, bits: 2.00 },
        { char: 'C', probability: 0.25, bits: 2.00 }
      ]
    }
  };

  const user_text_frequencies = calculate_character_frequencies(user_text);
  const user_text_entropy = calculate_text_entropy(user_text);
  const naive_bits = Math.log2(new Set(user_text.toLowerCase()).size) || 0;

  // Convert to bits per byte
  const bits_per_byte = user_text_entropy * 8; // Assuming ASCII

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>📝 Bits per Character & Byte</h1>
        <p className="intro_subtitle">How much information is in text and data?</p>
      </div>

      <div className="concept_box">
        <h2>What are Bits per Character?</h2>
        <div className="simple_explanation">
          <p>
            <strong>Bits per character</strong> tells us how much information each letter or symbol carries on average.
          </p>
          
          <div className="concept_comparison">
            <div className="comparison_item">
              <h4>🎯 In English Text</h4>
              <p>About 1.5 bits per character (some letters are predictable)</p>
            </div>
            <div className="comparison_item">
              <h4>🎲 In Random Text</h4>
              <p>About 4.7 bits per character (every letter is surprising)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="byte_explanation">
        <h2>📦 Characters vs Bytes</h2>
        <div className="byte_info">
          <div className="byte_item">
            <h4>📝 Character</h4>
            <p>One letter, number, or symbol that you can see</p>
            <p className="example">Examples: 'A', '5', '!', ' '</p>
          </div>
          <div className="byte_item">
            <h4>💾 Byte</h4>
            <p>8 bits of computer memory (can store 256 different values)</p>
            <p className="example">Usually stores one character in ASCII</p>
          </div>
        </div>
        <p className="conversion_note">
          <strong>Conversion:</strong> Bits per byte = Bits per character × 8 (for ASCII text)
        </p>
      </div>

      <div className="interactive_demo">
        <h2>🎮 Interactive Text Analysis</h2>
        
        <div className="demo_selector">
          <button 
            className={`demo_button ${demo_type === 'basic' ? 'active' : ''}`}
            onClick={() => set_demo_type('basic')}
          >
            ✏️ Analyze Your Text
          </button>
          <button 
            className={`demo_button ${demo_type === 'languages' ? 'active' : ''}`}
            onClick={() => set_demo_type('languages')}
          >
            🌍 Compare Languages
          </button>
          <button 
            className={`demo_button ${demo_type === 'compression' ? 'active' : ''}`}
            onClick={() => set_demo_type('compression')}
          >
            🗜️ Compression Demo
          </button>
        </div>

        {demo_type === 'basic' && (
          <div className="text_analysis_demo">
            <h3>✏️ Analyze Your Text</h3>
            <p>Type any text and see its information content!</p>
            
            <div className="text_input_area">
              <label htmlFor="user_text">Enter your text:</label>
              <textarea
                id="user_text"
                value={user_text}
                onChange={(e) => set_user_text(e.target.value)}
                placeholder="Type anything here..."
                rows="4"
                className="text_input"
              />
            </div>

            <div className="text_analysis_results">
              <div className="stat_grid">
                <div className="stat_item">
                  <h4>📊 Total Characters</h4>
                  <p className="stat_value">{user_text.length}</p>
                </div>
                
                <div className="stat_item">
                  <h4>🔤 Unique Characters</h4>
                  <p className="stat_value">{new Set(user_text.toLowerCase()).size}</p>
                </div>
                
                <div className="stat_item">
                  <h4>🎯 Entropy</h4>
                  <p className="stat_value">{user_text_entropy.toFixed(2)} bits/char</p>
                </div>
                
                <div className="stat_item">
                  <h4>🤔 Naive Approach</h4>
                  <p className="stat_value">{naive_bits.toFixed(2)} bits/char</p>
                  <p className="stat_note">If we treated all characters as equally likely</p>
                </div>
              </div>

              <div className="efficiency_comparison">
                <h4>📈 Efficiency Analysis</h4>
                <p>
                  Your text is <strong>{((1 - user_text_entropy / naive_bits) * 100).toFixed(1)}%</strong> more efficient than random because some characters appear more frequently than others.
                </p>
              </div>
            </div>

            {user_text_frequencies.length > 0 && (
              <div className="frequency_chart">
                <h4>📊 Character Frequency Analysis</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={user_text_frequencies.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="char" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'count' ? value : 
                      name === 'probability' ? (value * 100).toFixed(1) + '%' :
                      value.toFixed(2) + ' bits',
                      name === 'count' ? 'Count' :
                      name === 'probability' ? 'Probability' : 'Information Content'
                    ]} />
                    <Bar dataKey="count" fill="#8884d8" name="count" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="chart_explanation">
                  More frequent characters (taller bars) carry less information per occurrence.
                </p>
              </div>
            )}
          </div>
        )}

        {demo_type === 'languages' && (
          <div className="languages_demo">
            <h3>🌍 Compare Different Types of Text</h3>
            
            <div className="language_selector">
              <label>Select text type:</label>
              <select 
                value={selected_language} 
                onChange={(e) => set_selected_language(e.target.value)}
                className="language_select"
              >
                <option value="english">English Text</option>
                <option value="random">Random Characters</option>
                <option value="dna">DNA Sequence</option>
              </select>
            </div>

            <div className="language_info">
              <h4>{language_stats[selected_language].name}</h4>
              <p>{language_stats[selected_language].description}</p>
              
              <div className="entropy_display">
                <h5>Entropy: {language_stats[selected_language].entropy} bits per character</h5>
                <div className="entropy_bar">
                  <div 
                    className="entropy_fill" 
                    style={{width: `${(language_stats[selected_language].entropy / 5) * 100}%`}}
                  ></div>
                </div>
              </div>

              <div className="common_chars_chart">
                <h5>Most Common Characters:</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={language_stats[selected_language].common_chars}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="char" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'probability' ? (value * 100).toFixed(1) + '%' :
                      value.toFixed(2) + ' bits',
                      name === 'probability' ? 'Probability' : 'Information Content'
                    ]} />
                    <Bar dataKey="probability" fill="#82ca9d" name="probability" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="language_insights">
              <h4>🧠 Key Insights</h4>
              <div className="insights_grid">
                <div className="insight_item">
                  <h5>📚 English is Predictable</h5>
                  <p>Common letters like 'e' and 't' make English text compressible</p>
                </div>
                <div className="insight_item">
                  <h5>🎲 Random is Maximum</h5>
                  <p>Random text has maximum entropy for its character set</p>
                </div>
                <div className="insight_item">
                  <h5>🧬 DNA is Structured</h5>
                  <p>DNA sequences often have patterns, reducing entropy</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {demo_type === 'compression' && (
          <div className="compression_demo">
            <h3>🗜️ Text Compression Demo</h3>
            <p>See how entropy relates to compression!</p>
            
            <div className="compression_examples">
              <div className="compression_example">
                <h4>📄 Repetitive Text</h4>
                <div className="example_text">"AAAAAAAAAA" (10 A's)</div>
                <div className="compression_stats">
                  <p><strong>Original:</strong> 10 characters × 8 bits = 80 bits</p>
                  <p><strong>Compressed:</strong> "10×A" ≈ 24 bits</p>
                  <p><strong>Compression Ratio:</strong> 70% smaller!</p>
                  <p><strong>Entropy:</strong> 0 bits/char (completely predictable)</p>
                </div>
              </div>
              
              <div className="compression_example">
                <h4>📚 English Text</h4>
                <div className="example_text">"Hello World"</div>
                <div className="compression_stats">
                  <p><strong>Original:</strong> 11 characters × 8 bits = 88 bits</p>
                  <p><strong>Compressed:</strong> ≈ 50-60 bits (using patterns)</p>
                  <p><strong>Compression Ratio:</strong> 30-40% smaller</p>
                  <p><strong>Entropy:</strong> ~3-4 bits/char</p>
                </div>
              </div>
              
              <div className="compression_example">
                <h4>🎲 Random Text</h4>
                <div className="example_text">"x8Ks@mP9nZ"</div>
                <div className="compression_stats">
                  <p><strong>Original:</strong> 10 characters × 8 bits = 80 bits</p>
                  <p><strong>Compressed:</strong> ≈ 75-80 bits (barely compressible)</p>
                  <p><strong>Compression Ratio:</strong> Almost no compression</p>
                  <p><strong>Entropy:</strong> ~4.7 bits/char (maximum for this character set)</p>
                </div>
              </div>
            </div>

            <div className="compression_principle">
              <h4>🔑 The Fundamental Principle</h4>
              <div className="principle_box">
                <p><strong>You cannot compress data below its entropy!</strong></p>
                <p>Entropy represents the theoretical minimum bits needed to represent the information.</p>
                <ul>
                  <li>High entropy = Hard to compress</li>
                  <li>Low entropy = Easy to compress</li>
                  <li>Perfect compression achieves the entropy limit</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="practical_applications">
        <h2>🚀 Real-World Applications</h2>
        <div className="applications_grid">
          <div className="application_item">
            <h4>📱 File Compression</h4>
            <p>ZIP, RAR, and 7z use entropy to determine how much files can be compressed</p>
          </div>
          <div className="application_item">
            <h4>🌐 Internet Speed</h4>
            <p>Web pages compress text before sending to save bandwidth</p>
          </div>
          <div className="application_item">
            <h4>🤖 AI Model Training</h4>
            <p>Language models learn to predict text by minimizing bits per character</p>
          </div>
          <div className="application_item">
            <h4>📊 Data Analysis</h4>
            <p>Entropy helps detect patterns and anomalies in large datasets</p>
          </div>
        </div>
      </div>

      <div className="whats_next">
        <h3>Final Stop: Perplexity! 🤯</h3>
        <p>Now let's learn about <strong>perplexity</strong> - the metric that tells us how confused an AI model is!</p>
      </div>
    </div>
  );
};

export default BitsPerCharacterComponent;

