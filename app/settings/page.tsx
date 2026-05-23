"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, LogOut, ChevronRight } from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { currentUser } from "@/lib/mock-data";

export default function SettingsPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [iconUrl, setIconUrl] = useState(currentUser.iconUrl || "");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleNameChange = (value: string) => {
    setDisplayName(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // In real app, this would save via API
    setHasChanges(false);
  };

  const handleLogout = () => {
    // In real app, this would call logout API
    router.push("/login");
  };

  return (
    <main className="flex-1 pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">設定</h1>
          </div>
          
          {hasChanges && (
            <button
              onClick={handleSave}
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              保存
            </button>
          )}
        </div>
      </header>

      <div className="px-5 py-6 space-y-8">
        {/* Profile Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            プロフィール
          </h2>
          
          <div className="bg-card rounded-2xl border border-border p-5">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={displayName}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-2xl text-muted-foreground">
                      {displayName.charAt(0)}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-md cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setIconUrl(reader.result as string);
                          setHasChanges(true);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                表示名
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              />
              <p className="text-xs text-muted-foreground mt-2">
                共同編集時に他のメンバーに表示される名前です
              </p>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            アカウント
          </h2>
          
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  ログイン方法
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentUser.authProvider === "google" ? "Google" : "Apple"}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                {currentUser.authProvider === "google" ? (
                  <GoogleIcon />
                ) : (
                  <AppleIcon />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* App Info Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            アプリについて
          </h2>
          
          <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            <Link
              href="/terms"
              className="px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-foreground">利用規約</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/privacy"
              className="px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-foreground">プライバシーポリシー</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-foreground">バージョン</span>
              <span className="text-sm text-muted-foreground">1.0.0</span>
            </div>
          </div>
        </section>

        {/* Logout */}
        <section>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-destructive py-4 hover:bg-destructive/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            ログアウト
          </button>
        </section>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ログアウトしますか？
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              再度ログインするには認証が必要です。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
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

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
