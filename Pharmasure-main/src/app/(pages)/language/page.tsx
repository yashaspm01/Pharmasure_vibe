'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { PharmaSureLogo } from '@/components/icons';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
];

type Language = {
  code: string;
  name: string;
  flag: string;
};

export default function LanguageSelectionPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleContinue = () => {
    if (selectedLanguage) {
      // In a real app, you would save this preference
      console.log(`Selected language: ${selectedLanguage.name} (${selectedLanguage.code})`);
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <PharmaSureLogo className="h-10 w-10 text-primary" />
          <span className="text-xl font-bold text-foreground">PharmaSure</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Language</h1>
          <p className="text-muted-foreground mb-8">भाषा निवडा</p>
          
          <div className="space-y-3 mb-8">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => setSelectedLanguage(lang)}
                className={`w-full p-4 text-left flex items-center justify-between rounded-xl cursor-pointer transition-all ${
                  selectedLanguage?.code === lang.code 
                    ? 'bg-primary/10 border-2 border-primary' 
                    : 'bg-muted/50 hover:bg-muted/80 border border-muted-foreground/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-lg font-medium text-foreground">{lang.name}</span>
                </div>
                {selectedLanguage?.code === lang.code && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <svg 
                      className="h-3 w-3 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-sm border-t border-muted">
        <Button 
          onClick={handleContinue}
          disabled={!selectedLanguage}
          className="w-full py-6 text-lg font-semibold"
        >
          Continue
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
