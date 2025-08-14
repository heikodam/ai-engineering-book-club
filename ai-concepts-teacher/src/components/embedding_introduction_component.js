import React, { useState } from 'react';

function EmbeddingIntroductionComponent() {
  const [selected_word, set_selected_word] = useState('cat');
  const [show_visualization, set_show_visualization] = useState(false);
  const [comparison_mode, set_comparison_mode] = useState(false);
  const [word_a, set_word_a] = useState('king');
  const [word_b, set_word_b] = useState('queen');
  
  // Simplified embeddings for demonstration
  const example_embeddings = {
    'cat': [0.8, 0.2, 0.5, -0.3, 0.6],
    'dog': [0.7, 0.3, 0.6, -0.2, 0.5],
    'car': [-0.5, 0.9, -0.2, 0.8, -0.3],
    'truck': [-0.4, 0.8, -0.1, 0.9, -0.2],
    'king': [0.9, 0.1, -0.8, 0.3, 0.7],
    'queen': [0.9, 0.2, -0.7, 0.4, 0.8],
    'man': [0.7, 0.0, -0.6, 0.2, 0.5],
    'woman': [0.7, 0.1, -0.5, 0.3, 0.6]
  };
  
  const calculate_similarity = (vec1, vec2) => {
    let dot_product = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
      dot_product += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }
    
    return dot_product / (Math.sqrt(norm1) * Math.sqrt(norm2));
  };
  
  const get_similar_words = (word) => {
    const target_embedding = example_embeddings[word];
    if (!target_embedding) return [];
    
    const similarities = Object.entries(example_embeddings)
      .filter(([w, _]) => w !== word)
      .map(([w, emb]) => ({
        word: w,
        similarity: calculate_similarity(target_embedding, emb)
      }))
      .sort((a, b) => b.similarity - a.similarity);
    
    return similarities;
  };
  
  const similar_words = get_similar_words(selected_word);

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🧩 Introduction to Embeddings</h1>
        <p className="intro_subtitle">
          Turning words and concepts into numbers that capture meaning
        </p>
      </div>

      <div className="concept_box">
        <h2>What is an Embedding? 🤔</h2>
        <div className="simple_explanation">
          <p>
            An embedding is like giving each word a <strong>unique address in a multi-dimensional space</strong>. 
            Just like your home address tells exactly where you live, an embedding tells us where a word 
            "lives" in meaning-space. Words with similar meanings live in the same neighborhood!
          </p>
          
          <div className="key_insight">
            <p>
              "An embedding is a numerical representation that aims to capture the meaning of the original data"
              <br />
              <em>- From Chapter 3, AI Engineering</em>
            </p>
          </div>
        </div>
      </div>

      <div className="analogy_comparison">
        <div className="comparison_item">
          <h4>🏠 Real World</h4>
          <p>Your home address:</p>
          <ul>
            <li>Street: 123 Main St</li>
            <li>City: San Francisco</li>
            <li>State: CA</li>
            <li>ZIP: 94105</li>
          </ul>
          <p>Tells exactly where you are!</p>
        </div>
        
        <div className="comparison_item">
          <h4>🤖 AI Embeddings</h4>
          <p>Word "cat" as numbers:</p>
          <ul>
            <li>Dimension 1: 0.8</li>
            <li>Dimension 2: 0.2</li>
            <li>Dimension 3: 0.5</li>
            <li>... (often 100s more!)</li>
          </ul>
          <p>Tells where "cat" is in meaning-space!</p>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🔬 Explore Word Embeddings</h2>
        
        <div className="demo_selector">
          {Object.keys(example_embeddings).map(word => (
            <button
              key={word}
              className={`demo_button ${selected_word === word ? 'active' : ''}`}
              onClick={() => set_selected_word(word)}
            >
              {word}
            </button>
          ))}
        </div>
        
        <button 
          className="flip_button"
          onClick={() => set_show_visualization(!show_visualization)}
        >
          {show_visualization ? 'Hide' : 'Show'} Embedding Vector
        </button>
        
        {show_visualization && (
          <div className="embedding_visualization">
            <h4>Embedding for "{selected_word}":</h4>
            <div className="vector_display">
              [{example_embeddings[selected_word].map(val => val.toFixed(2)).join(', ')}]
            </div>
            
            <div className="dimension_bars">
              {example_embeddings[selected_word].map((val, idx) => (
                <div key={idx} className="dimension_item">
                  <label>Dim {idx + 1}</label>
                  <div className="bar_container">
                    <div 
                      className={`bar ${val >= 0 ? 'positive' : 'negative'}`}
                      style={{
                        width: `${Math.abs(val) * 50}%`,
                        marginLeft: val < 0 ? 'auto' : '50%'
                      }}
                    />
                  </div>
                  <span className="value">{val.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="similar_words_section">
          <h4>Words similar to "{selected_word}":</h4>
          <div className="similarity_list">
            {similar_words.map(({word, similarity}) => (
              <div key={word} className="similarity_item">
                <span className="word">{word}</span>
                <div className="similarity_bar">
                  <div 
                    className="bar"
                    style={{width: `${similarity * 100}%`}}
                  />
                </div>
                <span className="similarity_score">
                  {(similarity * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="concept_box">
        <h2>The Magic of Embeddings ✨</h2>
        
        <div className="insights_grid">
          <div className="insight_item">
            <h4>📏 Measuring Meaning</h4>
            <p>
              We can calculate the "distance" between words. Similar words 
              (cat & dog) are close together, different words (cat & car) are far apart!
            </p>
          </div>
          
          <div className="insight_item">
            <h4>🧮 Math with Words</h4>
            <p>
              Famous example: King - Man + Woman ≈ Queen. Embeddings let us do 
              arithmetic with meaning!
            </p>
          </div>
          
          <div className="insight_item">
            <h4>🌍 Universal Understanding</h4>
            <p>
              Embeddings work across languages! "Cat" in English and "Chat" in 
              French have similar embeddings.
            </p>
          </div>
          
          <div className="insight_item">
            <h4>🎨 Not Just Words</h4>
            <p>
              We can create embeddings for images, sounds, even entire documents! 
              Anything can be turned into meaningful numbers.
            </p>
          </div>
        </div>
      </div>

      <div className="interactive_demo">
        <h2>🧮 Word Arithmetic Playground</h2>
        
        <div className="word_arithmetic">
          <div className="arithmetic_controls">
            <select 
              value={word_a} 
              onChange={(e) => set_word_a(e.target.value)}
              className="word_select"
            >
              {Object.keys(example_embeddings).map(word => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>
            
            <span className="operator">-</span>
            
            <select 
              value={word_b} 
              onChange={(e) => set_word_b(e.target.value)}
              className="word_select"
            >
              {Object.keys(example_embeddings).map(word => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>
            
            <button 
              className="flip_button"
              onClick={() => set_comparison_mode(!comparison_mode)}
            >
              Calculate Difference
            </button>
          </div>
          
          {comparison_mode && (
            <div className="arithmetic_result">
              <p>
                The vector difference between "{word_a}" and "{word_b}" shows how 
                these concepts differ in meaning space!
              </p>
              <div className="vector_diff">
                {example_embeddings[word_a].map((val, idx) => 
                  (val - example_embeddings[word_b][idx]).toFixed(2)
                ).join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="applications_grid">
        <div className="application_item">
          <h4>🔍 Semantic Search</h4>
          <p>
            Find documents by meaning, not just keywords. Search for "car" 
            also finds "automobile", "vehicle", etc.
          </p>
        </div>
        
        <div className="application_item">
          <h4>🌐 Translation</h4>
          <p>
            Map words between languages by finding embeddings that are close 
            in meaning space across different languages.
          </p>
        </div>
        
        <div className="application_item">
          <h4>🤝 Recommendation</h4>
          <p>
            If you like item A, we can recommend items with similar embeddings. 
            This powers Netflix, Spotify, and more!
          </p>
        </div>
        
        <div className="application_item">
          <h4>🎯 Classification</h4>
          <p>
            Group similar items together based on their embeddings. Useful for 
            organizing content, detecting spam, etc.
          </p>
        </div>
      </div>

      <div className="fun_fact">
        <h4>🤓 Fun Fact: Embedding Dimensions</h4>
        <p>
          Modern language models like GPT-4 use embeddings with thousands of dimensions! 
          Each dimension captures a different aspect of meaning. Some dimensions might 
          represent:
        </p>
        <ul>
          <li>Is it alive or inanimate?</li>
          <li>Is it big or small?</li>
          <li>Is it positive or negative?</li>
          <li>Is it concrete or abstract?</li>
          <li>...and thousands more subtle distinctions!</li>
        </ul>
      </div>

      <style jsx>{`
        .embedding_visualization {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin: 1.5rem 0;
        }
        
        .vector_display {
          font-family: monospace;
          font-size: 1.1rem;
          color: #4f46e5;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          overflow-x: auto;
        }
        
        .dimension_bars {
          margin-top: 1.5rem;
        }
        
        .dimension_item {
          display: grid;
          grid-template-columns: 60px 1fr 60px;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
        }
        
        .dimension_item label {
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .bar_container {
          display: flex;
          height: 20px;
          background: #f1f5f9;
          border-radius: 4px;
          position: relative;
        }
        
        .bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .bar.positive {
          background: #10b981;
        }
        
        .bar.negative {
          background: #ef4444;
        }
        
        .value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
        }
        
        .similar_words_section {
          margin-top: 2rem;
        }
        
        .similarity_list {
          margin-top: 1rem;
        }
        
        .similarity_item {
          display: grid;
          grid-template-columns: 100px 1fr 60px;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
        }
        
        .similarity_item .word {
          font-weight: 600;
          color: #1e293b;
        }
        
        .similarity_bar {
          height: 12px;
          background: #e2e8f0;
          border-radius: 6px;
          overflow: hidden;
        }
        
        .similarity_bar .bar {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
        }
        
        .similarity_score {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }
        
        .word_arithmetic {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .arithmetic_controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .word_select {
          padding: 0.5rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
        }
        
        .operator {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4f46e5;
        }
        
        .arithmetic_result {
          margin-top: 1.5rem;
          text-align: center;
        }
        
        .vector_diff {
          font-family: monospace;
          font-size: 1rem;
          color: #7c3aed;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        ul {
          text-align: left;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}

export default EmbeddingIntroductionComponent;
