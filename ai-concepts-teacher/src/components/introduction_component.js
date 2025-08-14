import React, { useState } from 'react';

const IntroductionComponent = () => {
  const [current_example, set_current_example] = useState(0);

  const examples = [
    {
      scenario: "🌤️ Weather Prediction",
      description: "Imagine you're trying to guess tomorrow's weather. If it's always sunny where you live, guessing 'sunny' isn't very impressive. But if weather changes randomly, correctly guessing 'thunderstorm' is amazing!",
      lesson: "When something is predictable, there's less information in knowing the answer."
    },
    {
      scenario: "🎁 Surprise Gifts",
      description: "If your friend always gives you books for your birthday, getting a book isn't surprising. But if they give you a trip to Japan, that's LOTS of information (surprise)!",
      lesson: "Rare, unexpected events carry more information than common, expected ones."
    },
    {
      scenario: "🎯 Guessing Games",
      description: "If I ask you to guess a number between 1 and 2, you have a 50% chance. If I ask you to guess between 1 and 1000, much harder! The answer carries more information.",
      lesson: "The more possibilities there are, the more information the correct answer contains."
    }
  ];

  return (
    <div className="component_container">
      <div className="intro_hero">
        <h1>🌟 Welcome to the World of Information!</h1>
        <p className="intro_subtitle">Let's start with something you already understand...</p>
      </div>

      <div className="concept_box">
        <h2>What is "Information" anyway?</h2>
        <p className="simple_explanation">
          Think of information as <strong>how surprised you are</strong> when you learn something new. 
          The more surprised you are, the more information that thing contains!
        </p>
      </div>

      <div className="interactive_examples">
        <h3>Let's see this in action:</h3>
        
        <div className="example_container">
          <div className="example_selector">
            {examples.map((example, index) => (
              <button
                key={index}
                className={`example_button ${current_example === index ? 'active' : ''}`}
                onClick={() => set_current_example(index)}
              >
                {example.scenario}
              </button>
            ))}
          </div>

          <div className="example_content">
            <div className="example_description">
              <h4>{examples[current_example].scenario}</h4>
              <p>{examples[current_example].description}</p>
            </div>
            
            <div className="lesson_box">
              <strong>💡 Key Insight:</strong>
              <p>{examples[current_example].lesson}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="preview_next">
        <h3>What's coming next?</h3>
        <div className="preview_grid">
          <div className="preview_item">
            <h4>🔢 Bits</h4>
            <p>The basic unit for measuring information (like inches for length)</p>
          </div>
          <div className="preview_item">
            <h4>🎲 Entropy</h4>
            <p>A mathematical way to measure "how much surprise" something has</p>
          </div>
          <div className="preview_item">
            <h4>🤯 Perplexity</h4>
            <p>How we measure if an AI is confused or confident</p>
          </div>
        </div>
      </div>

      <div className="fun_fact">
        <h4>🎯 Fun Fact!</h4>
        <p>
          The concepts you're about to learn are used every day in:
        </p>
        <ul>
          <li>📱 Compressing photos on your phone</li>
          <li>🤖 Training ChatGPT and other AI models</li>
          <li>📡 Sending data over the internet efficiently</li>
          <li>🔐 Encrypting your messages securely</li>
        </ul>
      </div>

      <div className="ready_check">
        <div className="ready_content">
          <h3>Ready to dive deeper? 🚀</h3>
          <p>Click "Next" to learn about the building blocks of information: <strong>Bits</strong>!</p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionComponent;

