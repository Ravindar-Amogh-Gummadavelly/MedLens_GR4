'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
    }
  }, []);

  const toggleListening = () => {
    if (!supported) return;

    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('Listening for clinician prompt...');

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setTranscript('Voice recognition timed out. Try clicking the mic button again.');
      };

      recognition.start();
    }
  };

  const processVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();
    if (cmd.includes('abnormal') || cmd.includes('flagged') || cmd.includes('glucose')) {
      setAiResponse(`Found 3 abnormal lab parameters for current patient: Hemoglobin 11.2 g/dL (LOW), Fasting Glucose 142 mg/dL (HIGH), Total Cholesterol 210 mg/dL (HIGH).`);
    } else if (cmd.includes('allergies') || cmd.includes('allergy')) {
      setAiResponse(`Patient HAS documented allergy: Penicillin (reported mild hives).`);
    } else {
      setAiResponse(`Extracted query "${command}": 42 historical lab observations found in patient timeline.`);
    }
  };

  return (
    <div className="card p-5 border border-primary-500/30 bg-gradient-to-r from-primary-950/40 via-slate-900 to-slate-900 text-white space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">AI Voice Assistant & Dictation</h3>
            <span className="text-2xs text-primary-300 font-medium">Ask patient lab queries or dictate clinical notes</span>
          </div>
        </div>

        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
            isListening
              ? 'bg-rose-600 animate-pulse text-white'
              : 'bg-primary-600 hover:bg-primary-500 text-white'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? 'Listening...' : 'Start Dictation / Ask Question'}
        </button>
      </div>

      {transcript && (
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span>"{transcript}"</span>
        </div>
      )}

      {aiResponse && (
        <div className="bg-primary-950/90 border border-primary-800/80 p-3.5 rounded-xl text-xs text-primary-100 leading-relaxed space-y-1">
          <span className="font-bold text-primary-300 block text-2xs uppercase tracking-wider">AI Clinical Insights Answer</span>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
