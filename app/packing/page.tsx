"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Check, Trash2, Package } from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

const initialItems: PackingItem[] = [
  { id: "1", name: "パスポート", category: "貴重品", checked: true },
  { id: "2", name: "財布", category: "貴重品", checked: true },
  { id: "3", name: "スマートフォン", category: "貴重品", checked: false },
  { id: "4", name: "充電器", category: "電子機器", checked: false },
  { id: "5", name: "モバイルバッテリー", category: "電子機器", checked: false },
  { id: "6", name: "着替え（3日分）", category: "衣類", checked: false },
  { id: "7", name: "パジャマ", category: "衣類", checked: false },
  { id: "8", name: "歯ブラシ", category: "洗面用具", checked: true },
  { id: "9", name: "化粧品", category: "洗面用具", checked: false },
  { id: "10", name: "常備薬", category: "その他", checked: false },
  { id: "11", name: "カメラ", category: "電子機器", checked: false },
  { id: "12", name: "ガイドブック", category: "その他", checked: true },
];

const categories = ["貴重品", "電子機器", "衣類", "洗面用具", "その他"];

export default function PackingListPage() {
  const [items, setItems] = useState<PackingItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("その他");
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newItem: PackingItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      category: selectedCategory,
      checked: false,
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setShowAddForm(false);
  };

  const checkedCount = items.filter((item) => item.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  const groupedItems = categories.reduce(
    (acc, category) => {
      acc[category] = items.filter((item) => item.category === category);
      return acc;
    },
    {} as Record<string, PackingItem[]>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <h1 className="font-serif text-lg text-foreground">持ち物リスト</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 rounded-full hover:bg-card transition-colors"
          >
            <Plus className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Progress */}
        <div className="bg-card rounded-xl p-4 border border-border/30 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">準備状況</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {checkedCount} / {items.length}
            </span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {progress === 100
              ? "準備完了！"
              : `あと${items.length - checkedCount}アイテム`}
          </p>
        </div>

        {/* Items by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = groupedItems[category];
            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
                  {category}
                </h3>
                <div className="bg-card rounded-xl border border-border/30 overflow-hidden">
                  {categoryItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 ${
                        index !== categoryItems.length - 1
                          ? "border-b border-border/20"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          item.checked
                            ? "bg-primary border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {item.checked && (
                          <Check className="w-4 h-4 text-primary-foreground" />
                        )}
                      </button>
                      <span
                        className={`flex-1 text-sm ${
                          item.checked
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {item.name}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive/60" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Add Item Modal */}
      {showAddForm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAddForm(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 p-6 pb-8">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-bold text-foreground mb-4">
              持ち物を追加
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  アイテム名
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="例: 日焼け止め"
                  className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  カテゴリー
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border/50 text-foreground hover:border-primary/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={addItem}
                disabled={!newItemName.trim()}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                追加する
              </button>
            </div>
          </div>
        </>
      )}

      <BottomNavigation />
    </div>
  );
}
