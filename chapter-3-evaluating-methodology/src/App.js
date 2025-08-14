import React, { useState } from 'react';
import './App.css';
import IntroductionComponent from './components/introduction_component';
import BitsBasicsComponent from './components/bits_basics_component';
import EntropyComponent from './components/entropy_component';
import CrossEntropyComponent from './components/cross_entropy_component';
import BitsPerCharacterComponent from './components/bits_per_character_component';
import PerplexityComponent from './components/perplexity_component';
import ModelEvaluationComponent from './components/model_evaluation_component';
import EmbeddingIntroductionComponent from './components/embedding_introduction_component';
import AiAsJudgeComponent from './components/ai_as_judge_component';
import ComparativeEvaluationsComponent from './components/comparative_evaluations_component';

function App() {
  const [current_section, set_current_section] = useState('introduction');

  const sections = [
    { 
      category: 'Information Theory',
      items: [
        { id: 'introduction', title: '🌟 Welcome! What is Information?', component: IntroductionComponent },
        { id: 'bits', title: '🔢 What are Bits?', component: BitsBasicsComponent },
        { id: 'entropy', title: '🎲 Entropy (Measuring Surprise)', component: EntropyComponent },
        { id: 'cross_entropy', title: '⚖️ Cross Entropy (Comparing Predictions)', component: CrossEntropyComponent },
        { id: 'bits_per_char', title: '📝 Bits per Character/Byte', component: BitsPerCharacterComponent },
        { id: 'perplexity', title: '🤯 Perplexity (How Confused is Our AI?)', component: PerplexityComponent },
      ]
    },
    {
      category: 'Model Evaluation & Embeddings',
      items: [
        { id: 'model_evaluation', title: '🎯 Model Evaluation', component: ModelEvaluationComponent },
        { id: 'embeddings', title: '🧮 Introduction to Embeddings', component: EmbeddingIntroductionComponent },
        { id: 'ai_judge', title: '⚖️ AI as a Judge', component: AiAsJudgeComponent },
        { id: 'comparative_eval', title: '🔄 Comparative Evaluations', component: ComparativeEvaluationsComponent },
      ]
    }
  ];

  // Find the current component from the nested structure
  const get_current_component = () => {
    for (const category of sections) {
      const found = category.items.find(item => item.id === current_section);
      if (found) return found.component;
    }
    return IntroductionComponent;
  };

  const CurrentComponent = get_current_component();

  // Helper function to get all sections in a flat array for navigation
  const get_all_sections = () => {
    const all_items = [];
    sections.forEach(category => {
      category.items.forEach(item => all_items.push(item));
    });
    return all_items;
  };

  const all_sections = get_all_sections();

  const handle_previous = () => {
    const current_index = all_sections.findIndex(s => s.id === current_section);
    if (current_index > 0) {
      set_current_section(all_sections[current_index - 1].id);
    }
  };

  const handle_next = () => {
    const current_index = all_sections.findIndex(s => s.id === current_section);
    if (current_index < all_sections.length - 1) {
      set_current_section(all_sections[current_index + 1].id);
    }
  };

  return (
    <div className="app_container">
      <nav className="sidebar_navigation">
        <div className="sidebar_header">
          <h1>📖 Chapter 3</h1>
          <p>Evaluating Methodology</p>
        </div>
        
        <div className="sidebar_content">
          {sections.map((category, category_index) => (
            <div key={category_index} className="nav_category">
              <h3 className="category_title">{category.category}</h3>
              <div className="category_items">
                {category.items.map((item, item_index) => {
                  const global_index = sections
                    .slice(0, category_index)
                    .reduce((acc, cat) => acc + cat.items.length, 0) + item_index + 1;
                  
                  return (
                    <button
                      key={item.id}
                      className={`sidebar_nav_button ${current_section === item.id ? 'active' : ''}`}
                      onClick={() => set_current_section(item.id)}
                    >
                      <span className="section_number">{global_index}</span>
                      <span className="section_title">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="sidebar_footer">
          <div className="navigation_controls">
            <button
              onClick={handle_previous}
              disabled={all_sections.findIndex(s => s.id === current_section) === 0}
              className="nav_control_button"
              title="Previous lesson"
            >
              ←
            </button>
            <span className="current_progress">
              {all_sections.findIndex(s => s.id === current_section) + 1} / {all_sections.length}
            </span>
            <button
              onClick={handle_next}
              disabled={all_sections.findIndex(s => s.id === current_section) === all_sections.length - 1}
              className="nav_control_button"
              title="Next lesson"
            >
              →
            </button>
          </div>
        </div>
      </nav>

      <main className="main_content">
        <CurrentComponent />
      </main>
    </div>
  );
}

export default App;