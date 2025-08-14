import React, { useState } from 'react';

function ModelEvaluationComponent() {
  const [similarity_type, set_similarity_type] = useState('exact');
  const [reference_text, set_reference_text] = useState('The quick brown fox jumps over the lazy dog.');
  const [generated_text, set_generated_text] = useState('The quick brown fox jumped over the lazy dog.');
  const [show_comparison, set_show_comparison] = useState(false);
  
  // Calculate different similarity measures
  const calculate_similarities = () => {
    const ref_lower = reference_text.toLowerCase();
    const gen_lower = generated_text.toLowerCase();
    
    // Exact match
    const exact_match = ref_lower === gen_lower;
    
    // Lexical similarity (character-level Jaccard)
    const ref_chars = new Set(ref_lower.replace(/\s/g, ''));
    const gen_chars = new Set(gen_lower.replace(/\s/g, ''));
    const intersection = new Set([...ref_chars].filter(x => gen_chars.has(x)));
    const union = new Set([...ref_chars, ...gen_chars]);
    const char_jaccard = union.size > 0 ? intersection.size / union.size : 0;
    
    // Word-level similarity
    const ref_words = ref_lower.split(/\s+/).filter(w => w);
    const gen_words = gen_lower.split(/\s+/).filter(w => w);
    const word_intersection = ref_words.filter(w => gen_words.includes(w));
    const word_union = [...new Set([...ref_words, ...gen_words])];
    const word_jaccard = word_union.length > 0 ? word_intersection.length / word_union.length : 0;
    
    // Levenshtein distance (simplified)
    const levenshtein = calculate_levenshtein(ref_lower, gen_lower);
    const max_len = Math.max(ref_lower.length, gen_lower.length);
    const normalized_distance = max_len > 0 ? 1 - (levenshtein / max_len) : 0;
    
    return {
      exact_match,
      char_jaccard,
      word_jaccard,
      normalized_distance
    };
  };
  
  const calculate_levenshtein = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };
  
  const similarities = calculate_similarities();
  
  const evaluation_types = [
    {
      id: 'functional',
      title: '🎯 Functional Correctness',
      icon: '✅',
      description: 'Does the model produce the correct output for the given input?'
    },
    {
      id: 'similarity',
      title: '📊 Similarity Measurements',
      icon: '🔍',
      description: 'How similar is the generated output to reference data?'
    }
  ];
  
  const similarity_examples = [
    {
      type: 'Exact Match',
      example_ref: 'Paris is the capital of France',
      example_gen: 'Paris is the capital of France',
      match: true,
      description: 'Character-by-character identical match'
    },
    {
      type: 'Lexical Similarity',
      example_ref: 'The weather is beautiful today',
      example_gen: 'Today the weather is beautiful',
      match: false,
      description: 'Same words, different order'
    },
    {
      type: 'Semantic Similarity',
      example_ref: 'The cat sat on the mat',
      example_gen: 'A feline was resting on the rug',
      match: false,
      description: 'Different words, same meaning'
    }
  ];

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🎯 Model Evaluation</h1>
        <p className="intro_subtitle">
          Understanding how to measure if our AI is doing a good job
        </p>
      </div>

      <div className="concept_box">
        <h2>What is Model Evaluation? 🤔</h2>
        <div className="simple_explanation">
          <p>
            Model evaluation is like being a <strong>teacher grading a student's work</strong>. We need 
            ways to measure how well our AI model is performing. Just like there are different ways to 
            grade (multiple choice vs. essays), there are different ways to evaluate AI models!
          </p>
        </div>
      </div>

      <div className="analogy_grid">
        {evaluation_types.map(type => (
          <div key={type.id} className="analogy_item">
            <h3>{type.icon} {type.title}</h3>
            <p>{type.description}</p>
          </div>
        ))}
      </div>

      <div className="interactive_demo">
        <h2>🔬 Try It: Similarity Measurement Lab</h2>
        
        <div className="text_input_area">
          <label>Reference Text (What we expect):</label>
          <textarea
            className="text_input"
            value={reference_text}
            onChange={(e) => set_reference_text(e.target.value)}
            placeholder="Enter reference text..."
          />
        </div>
        
        <div className="text_input_area">
          <label>Generated Text (What the AI produced):</label>
          <textarea
            className="text_input"
            value={generated_text}
            onChange={(e) => set_generated_text(e.target.value)}
            placeholder="Enter generated text..."
          />
        </div>
        
        <button 
          className="flip_button"
          onClick={() => set_show_comparison(!show_comparison)}
        >
          {show_comparison ? 'Hide' : 'Show'} Similarity Analysis
        </button>
        
        {show_comparison && (
          <div className="results_comparison">
            <div className="result_item">
              <h4>Exact Match</h4>
              <div className={`metric_value ${similarities.exact_match ? 'success' : 'error'}`}>
                {similarities.exact_match ? '✅ Match!' : '❌ No Match'}
              </div>
            </div>
            
            <div className="result_item">
              <h4>Character Similarity</h4>
              <div className="metric_value">
                {(similarities.char_jaccard * 100).toFixed(1)}%
              </div>
              <p className="stat_note">Jaccard similarity of characters</p>
            </div>
            
            <div className="result_item">
              <h4>Word Similarity</h4>
              <div className="metric_value">
                {(similarities.word_jaccard * 100).toFixed(1)}%
              </div>
              <p className="stat_note">Jaccard similarity of words</p>
            </div>
            
            <div className="result_item">
              <h4>Edit Distance</h4>
              <div className="metric_value">
                {(similarities.normalized_distance * 100).toFixed(1)}%
              </div>
              <p className="stat_note">Normalized Levenshtein similarity</p>
            </div>
          </div>
        )}
      </div>

      <div className="concept_box">
        <h2>Types of Similarity Measurements 📏</h2>
        
        <div className="examples_grid">
          {similarity_examples.map((example, idx) => (
            <div key={idx} className="example_item">
              <h4>{example.type}</h4>
              <p>{example.description}</p>
              <div className="code_example">
                <div>Reference: "{example.example_ref}"</div>
                <div>Generated: "{example.example_gen}"</div>
                <div className={example.match ? 'success' : 'warning'}>
                  {example.match ? '✅ Exact Match' : '⚠️ Not Exact Match'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="insights_grid">
        <div className="insight_item">
          <h4>🎯 Functional Correctness</h4>
          <p>
            Checks if the output is correct for specific tasks. Like checking if 2+2=4, 
            not 2+2=5. Used for tasks with clear right/wrong answers.
          </p>
        </div>
        
        <div className="insight_item">
          <h4>📊 Exact Match</h4>
          <p>
            The strictest measure - every character must be identical. Good for 
            classification tasks or when precision is critical.
          </p>
        </div>
        
        <div className="insight_item">
          <h4>🔤 Lexical Similarity</h4>
          <p>
            Measures word/character overlap. Useful when exact wording isn't critical 
            but content should be similar.
          </p>
        </div>
        
        <div className="insight_item">
          <h4>🧠 Semantic Similarity</h4>
          <p>
            Measures meaning similarity using embeddings. Can recognize that "car" 
            and "automobile" mean the same thing!
          </p>
        </div>
      </div>

      <div className="formula_box">
        <h3>📐 Common Similarity Metrics</h3>
        <div className="formula">
          Jaccard Similarity = |A ∩ B| / |A ∪ B|
        </div>
        <div className="formula_explanation">
          Measures the overlap between two sets (words, characters, etc.)
        </div>
        
        <div className="formula">
          F1 Score = 2 × (Precision × Recall) / (Precision + Recall)
        </div>
        <div className="formula_explanation">
          Balances precision (accuracy of what was found) with recall (how much was found)
        </div>
      </div>

      <div className="whats_next">
        <h3>🚀 Why This Matters</h3>
        <p>
          Different evaluation methods are suitable for different tasks. Understanding these 
          helps us choose the right metric for our specific use case and build better AI systems!
        </p>
      </div>

      <style jsx>{`
        .code_example {
          background: #f1f5f9;
          padding: 1rem;
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .code_example div {
          margin: 0.25rem 0;
        }
        
        .success {
          color: #10b981;
          font-weight: 600;
        }
        
        .error {
          color: #ef4444;
        }
        
        .warning {
          color: #f59e0b;
          font-weight: 600;
        }
        
        .metric_value.success {
          color: #10b981;
        }
        
        .metric_value.error {
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}

export default ModelEvaluationComponent;
