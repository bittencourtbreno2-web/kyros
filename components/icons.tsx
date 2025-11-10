import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const TwitterIcon: React.FC<IconProps> = (props) => (
  <svg {...props} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
);

export const LinkedInIcon: React.FC<IconProps> = (props) => (
  <svg {...props} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
);

export const InstagramIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427C2.013 16.07 2 15.726 2 12.315v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.316 2.427-.364C8.901 2.013 9.24 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.06-1.064.049-1.64.21-2.126.41a3.096 3.096 0 00-1.13 1.13c-.2.486-.36 1.062-.41 2.126-.049 1.023-.06 1.351-.06 3.807v.468c0 2.456.011 2.784.06 3.807.049 1.064.21 1.64.41 2.126a3.096 3.096 0 001.13 1.13c.486.2.962.361 2.126.41 1.023.049 1.351.06 3.807.06h.468c2.456 0 2.784-.011 3.807-.06 1.064-.049 1.64-.21 2.126-.41a3.096 3.096 0 001.13-1.13c.2-.486.36-1.062.41-2.126.049-1.023.06-1.351.06-3.807v-.468c0-2.456-.011-2.784-.06-3.807-.049-1.064-.21-1.64-.41-2.126a3.096 3.096 0 00-1.13-1.13c-.486-.2-.962-.361-2.126-.41-1.023-.049-1.351-.06-3.807-.06zm-1.16 3.903a5.21 5.21 0 100 10.42 5.21 5.21 0 000-10.42zm-3.413 5.21a3.413 3.413 0 116.826 0 3.413 3.413 0 01-6.826 0z" clipRule="evenodd" /></svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);

export const EyeSlashIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.201-1.209a9.953 9.953 0 01-2.201 1.209" /></svg>
);

export const AppleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.23,1.93c-0.34-0.01-1.12,0.36-1.84,0.73c-0.78,0.41-1.6,0.92-2.24,1.67c-1.1,1.3-1.93,3.06-1.93,5.13c0,1.4,0.3,2.5,0.85,3.38c0.54,0.85,1.25,1.5,2.15,1.86c0.88,0.35,1.56,0.34,2.26-0.03c0.1-0.05,0.5-0.24,1.04-0.56c0.55-0.32,0.99-0.56,1.01-0.56c0.02,0,0.46,0.21,0.96,0.47c0.53,0.27,1.01,0.48,1.15,0.51c0.75,0.18,1.49-0.08,2.02-0.59c-0.02-0.01-1.5-0.96-1.52-2.83c-0.01-1.18,0.52-2.2,1.21-2.79c0.69-0.59,1.18-1.4,1.18-2.4s-0.54-1.9-1.39-2.61C14.07,1.82,11.03,1.93,10.23,1.93z M12.04,0c1.07,0.02,2.3,0.5,3.15,1.27c0.91,0.83,1.4,2.01,1.4,3.22c0,1.21-0.49,2.29-1.37,3.13c-0.81,0.78-2.1,1.18-3.3,0.86c-0.03,0-0.4-0.19-0.84-0.42c-0.44-0.23-0.81-0.42-0.81-0.42s-0.44,0.23-0.94,0.51c-0.5,0.28-0.9,0.49-1.02,0.54c-1.2,0.53-2.64,0.29-3.6-0.66C4.84,10.96,4.5,9.65,4.5,8.44c0-2.44,1.01-4.4,2.23-5.59C7.81,1.83,8.9,1.17,10.32,1.03C10.82,0.98,11.41,0.95,12.04,0z"/></svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
);

export const ZapIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22.444a12.02 12.02 0 009-1.5z" /></svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

export const AccountIcon: React.FC<IconProps> = (props) => (
  <svg {...props} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export const AwardIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a9 9 0 11-9 9 9.75 9.75 0 011.33-4.93a9.96 9.96 0 013.9-3.9A9.75 9.75 0 0112 6zm-3 9a3 3 0 116 0 3 3 0 01-6 0z" /></svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

export const VideoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
