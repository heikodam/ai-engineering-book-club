import React, { useState } from 'react';
import './App.css';

// Import all component modules
import IntroductionComponent from './components/introduction_component';
import EvaluationDrivenComponent from './components/evaluation_driven_component';
import FactualConsistencyComponent from './components/factual_consistency_component';
import AiAsJudgeComponent from './components/ai_as_judge_component';
import SafetyEvaluationComponent from './components/safety_evaluation_component';
import InstructionFollowingComponent from './components/instruction_following_component';
import ModelSelectionComponent from './components/model_selection_component';
import OpenSourceModelsComponent from './components/open_source_models_component';
import PublicBenchmarksComponent from './components/public_benchmarks_component';
import DataContaminationComponent from './components/data_contamination_component';
import EvaluationPipelineComponent from './components/evaluation_pipeline_component';

function App() {
  const [currentSection, setCurrentSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: '🎯 Welcome to AI Evaluation', icon: '🌟' },
    { id: 'evaluation_driven', title: '🔄 Evaluation-Driven Development', icon: '🎮' },
    { id: 'factual_consistency', title: '✅ Factual Consistency', icon: '🔍' },
    { id: 'ai_as_judge', title: '⚖️ AI as a Judge', icon: '🤖' },
    { id: 'safety', title: '🛡️ Safety Evaluation', icon: '🚨' },
    { id: 'instruction_following', title: '📋 Instruction Following', icon: '✍️' },
    { id: 'model_selection', title: '🎯 Model Selection', icon: '🔧' },
    { id: 'open_source', title: '🌐 Open vs Proprietary Models', icon: '💡' },
    { id: 'public_benchmarks', title: '📊 Public Benchmarks', icon: '🏆' },
    { id: 'data_contamination', title: '🚫 Data Contamination', icon: '💧' },
    { id: 'evaluation_pipeline', title: '🔬 Design Your Pipeline', icon: '⚗️' }
  ];

  const renderSection = () => {
    switch(currentSection) {
      case 'introduction':
        return <IntroductionComponent />;
      case 'evaluation_driven':
        return <EvaluationDrivenComponent />;
      case 'factual_consistency':
        return <FactualConsistencyComponent />;
      case 'ai_as_judge':
        return <AiAsJudgeComponent />;
      case 'safety':
        return <SafetyEvaluationComponent />;
      case 'instruction_following':
        return <InstructionFollowingComponent />;
      case 'model_selection':
        return <ModelSelectionComponent />;
      case 'open_source':
        return <OpenSourceModelsComponent />;
      case 'public_benchmarks':
        return <PublicBenchmarksComponent />;
      case 'data_contamination':
        return <DataContaminationComponent />;
      case 'evaluation_pipeline':
        return <EvaluationPipelineComponent />;
      default:
        return <IntroductionComponent />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📖 Chapter 4: Evaluate AI Systems</h1>
        <p className="subtitle">Learn how to evaluate AI systems like a pro!</p>
      </header>
      
      <nav className="navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-button ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => setCurrentSection(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-text">{section.title}</span>
          </button>
        ))}
      </nav>

      <main className="content">
        {renderSection()}
      </main>

      <footer className="app-footer">
        <p>🎓 Learning AI Engineering - Chapter 4 | Built with ❤️ for easy understanding</p>
      </footer>
    </div>
  );
}

export default App;
