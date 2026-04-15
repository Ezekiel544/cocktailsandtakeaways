"use client"

export function TicketCTA() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with crowd silhouettes */}
      <div className="absolute inset-0 bg-background">
        {/* Crowd silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%]">
          <svg 
            viewBox="0 0 1440 300" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <linearGradient id="ctaCrowdGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="rgba(20,20,20,0.9)" />
                <stop offset="100%" stopColor="#141414" />
              </linearGradient>
            </defs>
            
            {/* Crowd hands silhouettes */}
            <g fill="rgba(35,35,35,0.8)">
              {/* Raised hands */}
              <path d="M50 250 Q60 180 65 120 L72 120 Q77 180 87 250 Z" />
              <path d="M130 260 Q145 200 150 150 L158 150 Q163 200 178 260 Z" />
              <path d="M220 245 Q230 175 235 115 L243 115 Q248 175 258 245 Z" />
              <path d="M310 255 Q325 195 330 145 L338 145 Q343 195 358 255 Z" />
              <path d="M400 240 Q410 170 415 110 L423 110 Q428 170 438 240 Z" />
              <path d="M490 260 Q505 200 510 150 L518 150 Q523 200 538 260 Z" />
              <path d="M580 250 Q590 180 595 125 L603 125 Q608 180 618 250 Z" />
              <path d="M670 255 Q685 195 690 140 L698 140 Q703 195 718 255 Z" />
              <path d="M760 245 Q770 175 775 115 L783 115 Q788 175 798 245 Z" />
              <path d="M850 260 Q865 200 870 145 L878 145 Q883 200 898 260 Z" />
              <path d="M940 250 Q950 180 955 120 L963 120 Q968 180 978 250 Z" />
              <path d="M1030 255 Q1045 195 1050 140 L1058 140 Q1063 195 1078 255 Z" />
              <path d="M1120 245 Q1130 175 1135 120 L1143 120 Q1148 175 1158 245 Z" />
              <path d="M1210 260 Q1225 200 1230 145 L1238 145 Q1243 200 1258 260 Z" />
              <path d="M1300 250 Q1310 180 1315 125 L1323 125 Q1328 180 1338 250 Z" />
              <path d="M1390 255 Q1405 195 1410 140 L1418 140 Q1423 195 1438 255 Z" />
              
              {/* Heads */}
              <ellipse cx="100" cy="280" rx="30" ry="35" />
              <ellipse cx="180" cy="285" rx="28" ry="32" />
              <ellipse cx="270" cy="275" rx="32" ry="38" />
              <ellipse cx="360" cy="282" rx="30" ry="35" />
              <ellipse cx="450" cy="278" rx="28" ry="32" />
              <ellipse cx="540" cy="285" rx="32" ry="38" />
              <ellipse cx="630" cy="280" rx="30" ry="35" />
              <ellipse cx="720" cy="275" rx="28" ry="32" />
              <ellipse cx="810" cy="282" rx="32" ry="38" />
              <ellipse cx="900" cy="285" rx="30" ry="35" />
              <ellipse cx="990" cy="278" rx="28" ry="32" />
              <ellipse cx="1080" cy="280" rx="32" ry="38" />
              <ellipse cx="1170" cy="275" rx="30" ry="35" />
              <ellipse cx="1260" cy="282" rx="28" ry="32" />
              <ellipse cx="1350" cy="285" rx="32" ry="38" />
            </g>
            
            <rect x="0" y="0" width="1440" height="300" fill="url(#ctaCrowdGradient)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 ">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide leading-tight ">
              GRAB YOUR UNFOLD 2024 TICKETS
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Join the industry&apos;s brightest thinkers for an unforgettable day of inspiration. Let&apos;s shape hospitality&apos;s future together.
            </p>
          </div>
          
          {/* Get Your Ticket Button */}
         <div className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0">
  <button className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 h-12 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center sm:flex-col gap-1 transition-all hover:scale-105 shadow-xl shadow-primary/30">
    <span className="text-sm md:text-base">Get Your</span>
    <span className="text-sm md:text-base">Ticket</span>
  </button>
</div>
        </div>
      </div>
    </section>
  )
}
