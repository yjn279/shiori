import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Decorative header area */}
      <div className="relative flex-shrink-0 h-64 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-30 transform -rotate-12">
          <MapleLeaf size={60} />
        </div>
        <div className="absolute top-20 right-16 opacity-20 transform rotate-45">
          <MapleLeaf size={40} />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-25 transform rotate-12">
          <MapleLeaf size={35} />
        </div>
        <div className="absolute top-32 right-1/3 opacity-15">
          <SmallLeaves />
        </div>
        
        {/* Torn paper edge effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 400 20"
            preserveAspectRatio="none"
            className="w-full h-5"
          >
            <path
              d="M0,10 C20,15 40,5 60,10 C80,15 100,5 120,10 C140,15 160,5 180,10 C200,15 220,5 240,10 C260,15 280,5 300,10 C320,15 340,5 360,10 C380,15 400,5 400,10 L400,20 L0,20 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-8 -mt-8">
        {/* Logo area */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookmarkIcon />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            しおり旅
          </h1>
          <p className="text-muted-foreground">
            思い出を、しおりに残そう。
          </p>
        </div>

        {/* Description */}
        <div className="max-w-xs text-center mb-12">
          <p className="text-sm text-muted-foreground leading-relaxed">
            旅のしおりを誰かと一緒に作り、<br />
            思い出として残せる旅行アプリです。
          </p>
        </div>

        {/* Login buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full bg-foreground text-background py-4 px-6 rounded-xl font-medium hover:bg-foreground/90 transition-colors"
          >
            <AppleIcon />
            Appleでログイン
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full bg-card border border-border text-foreground py-4 px-6 rounded-xl font-medium hover:bg-muted transition-colors"
          >
            <GoogleIcon />
            Googleでログイン
          </Link>
        </div>

        {/* Terms */}
        <p className="mt-8 text-xs text-muted-foreground text-center max-w-xs">
          ログインすることで、
          <Link href="/terms" className="underline hover:text-foreground">
            利用規約
          </Link>
          と
          <Link href="/privacy" className="underline hover:text-foreground">
            プライバシーポリシー
          </Link>
          に同意したものとみなされます。
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="flex-shrink-0 h-24 relative overflow-hidden">
        <div className="absolute bottom-4 left-8 opacity-20 transform rotate-45">
          <MapleLeaf size={30} />
        </div>
        <div className="absolute bottom-8 right-12 opacity-15 transform -rotate-12">
          <MapleLeaf size={45} />
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-30">
          <TornPaperStrip />
        </div>
      </div>
    </main>
  );
}

// Icon components
function BookmarkIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="text-primary"
    >
      <rect
        x="12"
        y="6"
        width="24"
        height="36"
        rx="2"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M14 8H34C35.1 8 36 8.9 36 10V42L24 36L12 42V10C12 8.9 12.9 8 14 8Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 16H30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 22H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MapleLeaf({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14 6L18 4L16 8L20 10L16 12L18 16L14 14L12 22L10 14L6 16L8 12L4 10L8 8L6 4L10 6L12 2Z"
        fill="#c4956a"
      />
    </svg>
  );
}

function SmallLeaves() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
      <path
        d="M15 5C18 8 20 12 20 18C20 24 18 28 15 32C12 28 10 24 10 18C10 12 12 8 15 5Z"
        fill="#6b7c5e"
        opacity="0.5"
      />
      <path
        d="M45 10C48 13 50 17 50 23C50 29 48 33 45 37C42 33 40 29 40 23C40 17 42 13 45 10Z"
        fill="#6b7c5e"
        opacity="0.3"
      />
      <path
        d="M30 0C33 3 35 7 35 13C35 19 33 23 30 27C27 23 25 19 25 13C25 7 27 3 30 0Z"
        fill="#6b7c5e"
        opacity="0.4"
      />
    </svg>
  );
}

function TornPaperStrip() {
  return (
    <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
      <path
        d="M5 10C15 5 25 15 35 10C45 5 55 15 65 10C75 5 85 15 95 10C105 5 115 15 125 10C135 5 145 15 145 10"
        stroke="#e0d8ce"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
