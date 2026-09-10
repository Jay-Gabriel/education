import React, { useState } from "react";
import {
  X,
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Copy,
  Sparkles,
  HelpCircle,
  FileCode,
  Check,
  ChevronDown
} from "lucide-react";

export default function CodeWorkspaceModal({ problem, isOpen, onClose }) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Bài: ${problem?.title || "Dãy con tăng dài nhất (LIS)"}
// Thuật toán: Quy hoạch động kết hợp Tìm kiếm nhị phân O(N log N)
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    vector<int> lis;
    for (int x : a) {
        auto it = lower_bound(lis.begin(), lis.end(), x);
        if (it == lis.end()) {
            lis.push_back(x);
        } else {
            *it = x;
        }
    }

    cout << lis.size() << "\n";
    return 0;
}`);

  const [customInput, setCustomInput] = useState("6\n1 2 5 3 4 7");
  const [customOutput, setCustomOutput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verdictResult, setVerdictResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("problem"); // problem, editorial, submissions

  if (!isOpen) return null;

  const handleRunCustom = () => {
    setCustomOutput("Đang biên dịch & thực thi...\nKết quả:\n4\n\n[Thời gian chạy: 0.015s | Bộ nhớ: 1.8MB]");
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setVerdictResult(null);
    setTimeout(() => {
      setSubmitting(false);
      setVerdictResult({
        verdict: "ACCEPTED",
        score: 100,
        maxScore: 100,
        time: "0.045s",
        memory: "2.4MB",
        testsPassed: 10,
        totalTests: 10,
        testDetails: [
          { id: 1, name: "Test 1 (Sample)", time: "0.012s", mem: "1.2MB", status: "AC" },
          { id: 2, name: "Test 2 (N <= 100)", time: "0.015s", mem: "1.2MB", status: "AC" },
          { id: 3, name: "Test 3 (N <= 1000)", time: "0.024s", mem: "1.5MB", status: "AC" },
          { id: 4, name: "Test 4 (N <= 10000)", time: "0.038s", mem: "2.1MB", status: "AC" },
          { id: 5, name: "Test 5 (Max N = 100000)", time: "0.045s", mem: "2.4MB", status: "AC" }
        ]
      });
    }, 1200);
  };

  const handleCopySample = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#0F172A] rounded-3xl max-w-7xl w-full h-[94vh] flex flex-col shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
        {/* Workspace Top Bar */}
        <div className="bg-[#1E293B] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                  {problem?.title || "Dãy con tăng dài nhất (LIS)"}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                  {problem?.id || "DP_01"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10.5px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>Giới hạn: 1.0 giây</span>
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-amber-400" />
                  <span>Bộ nhớ: 256 MB</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="cpp">C++ 17 (GCC 13)</option>
                <option value="python">Python 3.12</option>
                <option value="pascal">Free Pascal</option>
                <option value="java">Java 21</option>
              </select>
            </div>

            <button
              onClick={handleRunCustom}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Chạy thử</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Đang chấm...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp bài chấm OJ</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Main Area: 2 Columns (Problem Spec on Left | Code & Runner on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
          {/* Left Column: Problem Statement & Tests */}
          <div className="border-r border-slate-800 flex flex-col bg-[#0F172A] overflow-hidden">
            {/* Left Tabs */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
              <button
                onClick={() => setActiveTab("problem")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "problem" ? "bg-blue-600/30 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Đề bài
              </button>
              <button
                onClick={() => setActiveTab("editorial")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "editorial" ? "bg-blue-600/30 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Gợi ý & Thuật toán
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "submissions" ? "bg-blue-600/30 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Lịch sử nộp ({verdictResult ? "1" : "0"})
              </button>
            </div>

            {/* Problem Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs leading-relaxed text-slate-300 font-sans">
              {activeTab === "problem" && (
                <>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1.5">Mô tả bài toán</h4>
                    <p>
                      Cho một dãy số nguyên gồm N phần tử: <code>a₁, a₂, ..., aₙ</code>. Hãy tìm độ dài của dãy con tăng dài nhất (các phần tử không nhất thiết phải liên tiếp, phần tử sau lớn hơn phần tử trước).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-sky-400 mb-1">Dữ liệu vào (Input)</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                      <li>Dòng đầu tiên chứa số nguyên dương <strong>N</strong> (1 ≤ N ≤ 100,000).</li>
                      <li>Dòng thứ hai chứa N số nguyên <strong>a₁, a₂, ..., aₙ</strong> (-10⁹ ≤ aᵢ ≤ 10⁹).</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-sky-400 mb-1">Dữ liệu ra (Output)</h4>
                    <p>In ra một số nguyên duy nhất là độ dài của dãy con tăng dài nhất tìm được.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-amber-400">Ví dụ minh họa</h4>
                      <button
                        onClick={() => handleCopySample("6\n1 2 5 3 4 7")}
                        className="text-[10.5px] text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? "Đã chép" : "Sao chép test"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-slate-500 font-sans block mb-1">Input:</span>
                        <pre className="text-emerald-400">6{"\n"}1 2 5 3 4 7</pre>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-slate-500 font-sans block mb-1">Output:</span>
                        <pre className="text-sky-400">4</pre>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 italic">
                      Giải thích: Dãy con tăng dài nhất là [1, 2, 3, 4, 7] hoặc [1, 2, 5, 7] có độ dài lớn nhất là 4.
                    </p>
                  </div>
                </>
              )}

              {activeTab === "editorial" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40">
                    <h5 className="font-bold text-blue-300 text-xs mb-1">💡 Gợi ý giải thuật O(N log N)</h5>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Sử dụng mảng <code>lis[]</code> lưu phần tử nhỏ nhất kết thúc một dãy con tăng độ dài <code>i</code>. Với mỗi phần tử <code>x</code> trong mảng gốc, dùng hàm <code>lower_bound</code> để tìm vị trí thay thế thích hợp trong <code>lis[]</code>.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "submissions" && (
                <div className="space-y-2">
                  {verdictResult ? (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="font-bold text-emerald-400 text-xs">ACCEPTED ({verdictResult.score}/100)</p>
                          <p className="text-[10px] text-slate-400">{verdictResult.time} • {verdictResult.memory} • C++ 17</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">Vừa xong</span>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Chưa có lần nộp nào trong phiên này.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Code Editor + Real-time Verdict */}
          <div className="flex flex-col bg-[#0B1120] overflow-hidden">
            {/* Editor Area */}
            <div className="flex-1 flex flex-col p-3 font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800">
                <span>Trình soạn thảo mã nguồn</span>
                <span>UTF-8 • Spaces: 4</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 bg-transparent text-emerald-300 font-mono text-xs sm:text-[13px] leading-relaxed resize-none focus:outline-none py-2 px-1 selection:bg-blue-900"
              />
            </div>

            {/* Verdict / Results Drawer */}
            {verdictResult && (
              <div className="bg-[#090D16] border-t border-slate-800 p-3.5 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs border border-emerald-500/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{verdictResult.verdict} — {verdictResult.score}/{verdictResult.maxScore} ĐIỂM 🎉</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Thời gian: <strong>{verdictResult.time}</strong> • Bộ nhớ: <strong>{verdictResult.memory}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {verdictResult.testDetails.map((td) => (
                    <div key={td.id} className="p-1.5 rounded-lg bg-slate-900 border border-emerald-900/50 text-center text-[10px]">
                      <p className="text-slate-400">Test {td.id}</p>
                      <p className="font-bold text-emerald-400">{td.status}</p>
                      <p className="text-[9px] text-slate-500">{td.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Test Runner Output */}
            {customOutput && !verdictResult && (
              <div className="bg-[#090D16] border-t border-slate-800 p-3 text-xs font-mono text-slate-300">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Kết quả chạy thử:</p>
                <pre className="text-sky-300 text-xs">{customOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
