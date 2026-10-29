import React, { useState } from 'react';

const ChatHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Text');
  const [inputPrompt, setInputPrompt] = useState('');
  const [publishToCommunity, setPublishToCommunity] = useState(false);

  const options = [
    { label: 'Text', desc: 'Default text assistant' },
    { label: 'Image', desc: 'Create and edit images' },
    { label: 'Video', desc: 'Generate with Veo' }, // Upgrade badge removed
    { label: 'Deep Research', desc: 'Get detailed reports' },
    { label: 'Guided Learning', desc: 'Get step-by-step help' }, // Added Guided Learning
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    // Handle message send logic here
    console.log({
      prompt: inputPrompt,
      option: selectedOption,
      publishToCommunity
    });
    setInputPrompt('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 relative">
      {/* Header Section */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          {/* Logo with Sparkle / Star Icon matching the project style */}
          <div className="w-10 h-10 bg-linear-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-800 leading-none">MyGPT</h2>
            <span className="text-xs text-gray-500 font-medium">Intelligent AI Assistant</span>
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-gray-700 mt-6">Ask me anything.</h1>
      </div>

      {/* Main Bar Form Container */}
      <div className="w-full max-w-2xl relative flex flex-col items-center">
        
        {/* Publish to Community Checkbox Option */}
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
          <input
            type="checkbox"
            id="communityCheck"
            checked={publishToCommunity}
            onChange={(e) => setPublishToCommunity(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
          <label htmlFor="communityCheck" className="cursor-pointer select-none">
            Publish Generated Image to Community
          </label>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-center bg-white border border-gray-200 rounded-full shadow-md px-4 py-2 gap-2 w-full focus-within:border-purple-500 transition-all"
        >
          {/* Plus Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-gray-600 font-bold text-lg transition"
          >
            +
          </button>

          {/* Current Selection Label */}
          <span className="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-700 rounded-md">
            {selectedOption}
          </span>

          {/* Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="flex-1 text-sm text-gray-700 outline-none bg-transparent px-2"
          />

          {/* Purple Circular Send Button */}
          <button
            type="submit"
            className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>

        {/* Plus-Click Menu Popup */}
        {isOpen && (
          <div className="absolute left-0 bottom-16 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 w-64 z-50 flex flex-col gap-1">
            {options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  setSelectedOption(opt.label);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl text-left w-full transition"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                  <div className="text-xs text-gray-400">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHub;
