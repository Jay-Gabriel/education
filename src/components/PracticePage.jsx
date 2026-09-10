import React, { useState } from "react";
import {
  Code,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Tag,
  FileCode,
  Flame,
  Check
} from "lucide-react";

export default function PracticePage({ onOpenCodeWorkspace }) {
  const [activeTab, setActiveTab] = useState("all"); // all, class, assigned, saved, history
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    { id: "all", label: "Tất cả chuyên đề" },
    { id: "dp", label: "Quy hoạch động (DP)" },
    { id: "graph", label: "Lý thuyết Đồ thị (Graph)" },
    { id: "ds", label: "Cấu trúc dữ liệu (Tree/Stack)" },
    { id: "math", label: "Toán học & Số học" },
    { id: "greedy", label: "Tham lam & Hai con trỏ" },
    { id: "string", label: "Xử lý Xâu ký tự (String)" },
  ];

  const difficulties = [
    { id: "all", label: "Mọi độ khó" },
    { id: "easy", label: "Dễ (⭐)", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "medium", label: "Trung bình (⭐⭐)", color: "text-sky-600 bg-sky-50 border-sky-200" },
    { id: "hard", label: "Khó (⭐⭐⭐)", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "expert", label: "Cực khó (⭐⭐⭐⭐)", color: "text-rose-600 bg-rose-50 border-rose-200" }
  ];

  const problemList = [
    {
      id: "DP_LIS",
      title: "Dãy con tăng dài nhất (LIS O(N log N))",
      topic: "dp",
      topicLabel: "Quy hoạch động",
      difficulty: "medium",
      difficultyLabel: "Trung bình",
      difficultyStyle: "text-sky-600 bg-sky-50 border-sky-200",
      acceptedCount: "3,420",
      submissionCount: "5,800",
      acRate: "58.9%",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "ac", // ac, doing, todo, locked
      type: "code",
      points: 100
    },
    {
      id: "GRAPH_DIJKSTRA",
      title: "Tìm đường đi ngắn nhất đồ thị trọng số dương (Dijkstra)",
      topic: "graph",
      topicLabel: "Lý thuyết Đồ thị",
      difficulty: "medium",
      difficultyStyle: "text-sky-600 bg-sky-50 border-sky-200",
      acceptedCount: "2,890",
      submissionCount: "4,600",
      acRate: "62.8%",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "todo",
      type: "code",
      points: 100
    },
    {
      id: "DS_SEGTREE",
      title: "Cây phân đoạn: Cập nhật đoạn và truy vấn Tổng (Lazy Propagation)",
      topic: "ds",
      topicLabel: "Cấu trúc dữ liệu",
      difficulty: "hard",
      difficultyStyle: "text-amber-600 bg-amber-50 border-amber-200",
      acceptedCount: "1,450",
      submissionCount: "3,100",
      acRate: "46.7%",
      timeLimit: "1.5s",
      memoryLimit: "512MB",
      status: "doing",
      type: "code",
      points: 100
    },
    {
      id: "DP_KNAPSACK",
      title: "Bài toán Cái túi 0/1 (0-1 Knapsack Problem)",
      topic: "dp",
      topicLabel: "Quy hoạch động",
      difficulty: "easy",
      difficultyStyle: "text-emerald-600 bg-emerald-50 border-emerald-200",
      acceptedCount: "4,900",
      submissionCount: "6,200",
      acRate: "79.0%",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "ac",
      type: "code",
      points: 100
    },
    {
      id: "MATH_PRIME",
      title: "Sàng nguyên tố Eratosthenes phân đoạn và Đếm ước",
      topic: "math",
      topicLabel: "Toán học & Số học",
      difficulty: "easy",
      difficultyStyle: "text-emerald-600 bg-emerald-50 border-emerald-200",
      acceptedCount: "5,120",
      submissionCount: "6,400",
      acRate: "80.0%",
      timeLimit: "1.0s",
      memoryLimit: "128MB",
      status: "ac",
      type: "code",
      points: 100
    },
    {
      id: "GRAPH_MAXFLOW",
      title: "Luồng cực đại trên mạng: Thuật toán Dinic O(V²E)",
      topic: "graph",
      topicLabel: "Lý thuyết Đồ thị",
      difficulty: "expert",
      difficultyStyle: "text-rose-600 bg-rose-50 border-rose-200",
      acceptedCount: "620",
      submissionCount: "1,900",
      acRate: "32.6%",
      timeLimit: "2.0s",
      memoryLimit: "512MB",
      status: "todo",
      type: "code",
      points: 150
    },
    {
      id: "STRING_KMP",
      title: "Khớp mẫu xâu ký tự: Thuật toán Knuth-Morris-Pratt (KMP)",
      topic: "string",
      topicLabel: "Xử lý Xâu",
      difficulty: "hard",
      difficultyStyle: "text-amber-600 bg-amber-50 border-amber-200",
      acceptedCount: "1,100",
      submissionCount: "2,400",
      acRate: "45.8%",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "todo",
      type: "code",
      points: 100
    }
  ];

  const filteredProblems = problemList.filter((p) => {
    const matchTopic = selectedTopic === "all" || p.topic === selectedTopic;
    const matchDiff = selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTopic && matchDiff && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. PRACTICE HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0050A0] via-[#0066CC] to-[#38BDF8] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-practice-hero-v1.png"
          alt="Practice banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-emerald-950 mb-3 shadow-sm">
            <Flame className="w-3.5 h-3.5" />
            <span>Đấu trường Luyện tập Online Judge 24/7</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Kho bài tập Thuật toán & Lập trình
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Hơn 1,000+ bài tập thuật toán bám sát đề thi HSG Quốc gia, Tuyển sinh 10 Chuyên Tin và chuẩn Olympic Tin học quốc tế. Hệ thống chấm bài tự động tức thì.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border border-white/20 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Đã hoàn thành: 28 bài</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border border-white/20 text-xs font-bold">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>Chuỗi luyện tập: 7 ngày liên tục 🔥</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 w-full md:w-80 shadow-xl">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider text-center">Tiến độ chuyên đề của bạn</p>
          <div className="space-y-2.5 mt-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Quy hoạch động (DP)</span>
                <span className="font-bold text-amber-300">14/20 bài</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[70%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Lý thuyết Đồ thị</span>
                <span className="font-bold text-emerald-300">9/15 bài</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[60%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABS & FILTER TOOLBAR */}
      <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col gap-3">
        {/* Top Tabs */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "Tất cả bài tập" },
              { id: "class", label: "Theo lớp học" },
              { id: "assigned", label: "Bài được giao" },
              { id: "history", label: "Lịch sử nộp bài" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === t.id
                    ? "bg-[#0066CC] text-white shadow-2xs"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Hiển thị <strong>{filteredProblems.length}</strong> bài tập
          </span>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bài, mã bài (VD: DP_LIS, Dijkstra)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F0F6FC] border border-sky-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0">Độ khó:</span>
            {difficulties.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedDifficulty === d.id
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TOPICS PILLS */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {topics.map((tp) => (
          <button
            key={tp.id}
            onClick={() => setSelectedTopic(tp.id)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTopic === tp.id
                ? "bg-[#0B3C78] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-sky-50 border border-sky-100 shadow-2xs"
            }`}
          >
            {tp.label}
          </button>
        ))}
      </div>

      {/* 4. PROBLEMS TABLE / CARD LIST */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-[0_4px_16px_rgba(0,100,220,0.05)] overflow-hidden divide-y divide-slate-100">
        <div className="hidden lg:grid grid-cols-[80px_1fr_180px_120px_100px_140px] px-5 py-3 bg-[#F8FBFE] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Trạng thái</span>
          <span>Tên bài tập & Mã</span>
          <span>Chuyên đề</span>
          <span>Độ khó</span>
          <span>Tỷ lệ AC</span>
          <span className="text-right">Hành động</span>
        </div>

        {filteredProblems.map((prob) => (
          <div
            key={prob.id}
            className="p-4 sm:px-5 flex flex-col lg:grid lg:grid-cols-[80px_1fr_180px_120px_100px_140px] items-start lg:items-center gap-2 sm:gap-3 hover:bg-sky-50/50 transition-colors"
          >
            {/* Status Icon */}
            <div className="flex items-center gap-2">
              {prob.status === "ac" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AC</span>
                </span>
              )}
              {prob.status === "doing" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Đang làm</span>
                </span>
              )}
              {prob.status === "todo" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">
                  <span>Chưa nộp</span>
                </span>
              )}
            </div>

            {/* Problem Title */}
            <div className="min-w-0">
              <h4
                onClick={() => onOpenCodeWorkspace(prob)}
                className="text-xs sm:text-sm font-bold text-[#0B3C78] hover:text-blue-600 transition-colors cursor-pointer truncate"
              >
                {prob.title}
              </h4>
              <div className="flex items-center gap-2 text-[10.5px] text-slate-400 mt-0.5 font-mono">
                <span>Mã: {prob.id}</span>
                <span>•</span>
                <span>{prob.timeLimit} / {prob.memoryLimit}</span>
              </div>
            </div>

            {/* Topic */}
            <div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                {prob.topicLabel}
              </span>
            </div>

            {/* Difficulty */}
            <div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${prob.difficultyStyle}`}>
                {prob.difficultyLabel || "Trung bình"}
              </span>
            </div>

            {/* AC Rate */}
            <div>
              <p className="text-xs font-bold text-slate-800">{prob.acRate}</p>
              <p className="text-[10px] text-slate-400">{prob.acceptedCount} / {prob.submissionCount}</p>
            </div>

            {/* Action Button */}
            <div className="w-full lg:w-auto flex justify-end">
              <button
                onClick={() => onOpenCodeWorkspace(prob)}
                className="w-full lg:w-auto px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{prob.status === "ac" ? "Luyện lại" : "Làm bài"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredProblems.length === 0 && <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-sky-300"/><h2 className="mt-3 text-sm font-black text-slate-800">Không có bài tập phù hợp</h2><p className="mt-1 text-xs text-slate-500">Hãy đổi chuyên đề hoặc mức độ để xem kho bài khác.</p><button onClick={() => { setSelectedTopic("all"); setSelectedDifficulty("all"); setActiveTab("all"); }} className="mt-4 text-xs font-bold text-blue-600">Xóa bộ lọc</button></div>}
    </div>
  );
}
