import { Stethoscope, type LucideProps, Pill, Bell } from "lucide-react";

export const PharmaSureNavLogo = (props: LucideProps) => (
  <div className="flex items-center gap-2" >
    <PharmaSureLogo className="h-8 w-8" />
    <span className="hidden text-xl font-bold font-headline text-primary sm:inline-block">PharmaSure</span>
  </div>
);


export const PharmaSureLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      {...props}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      <g style={{ filter: 'url(#shadow)' }} className="text-primary">
        {/* Capsule */}
        <rect x="25" y="15" width="20" height="50" rx="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <line x1="35" y1="25" x2="35" y2="40" stroke="currentColor" strokeWidth="4" />
        
        {/* Round Pill */}
        <circle cx="65" cy="30" r="12" stroke="currentColor" strokeWidth="4" fill="none" />
        <line x1="65" y1="18" x2="65" y2="42" stroke="currentColor" strokeWidth="4" />
        
        {/* Bell */}
        <path d="M55 55a10 10 0 0 1 20 0v5a2 2 0 0 1-2 2H57a2 2 0 0 1-2-2v-5z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        <path d="M65 72a2 2 0 0 0 2 2h0a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M53 55c-3 2-5 5-5 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M77 55c3 2 5 5 5 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );

