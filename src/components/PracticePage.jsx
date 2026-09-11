import React, { useEffect, useState } from "react";
import {
  Code,
  Code2,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  CalendarDays,
  Timer,
  Sparkles,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Flame,
  GitBranch,
  Database,
  Calculator,
  Route,
  TextCursorInput
} from "lucide-react";

function PracticePagination({ page, totalPages, onChange, label }) {
  if (totalPages <= 1) return null;
  return <nav aria-label={label} className="mt-3 flex flex-col items-center justify-between gap-2 rounded-xl border border-[#DDEAF0] bg-[#F8FAFB] p-2 sm:flex-row"><span className="text-[11px] text-[#71869A]">Trang <b className="text-[#536D86]">{page}</b> / {totalPages}</span><div className="flex items-center gap-1.5"><button type="button" aria-label="Trang trước" disabled={page === 1} onClick={() => onChange(Math.max(1, page - 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-[#DDEAF0] bg-white text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button type="button" key={pageNumber} aria-label={`Trang ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined} onClick={() => onChange(pageNumber)} className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-[11px] font-extrabold transition ${page === pageNumber ? "bg-[#126F91] text-white shadow-[0_3px_8px_rgba(18,111,145,0.16)]" : "text-[#536D86] hover:bg-white"}`}>{pageNumber}</button>) }<button type="button" aria-label="Trang sau" disabled={page === totalPages} onClick={() => onChange(Math.min(totalPages, page + 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-[#DDEAF0] bg-white text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button></div></nav>;
}

function DifficultyStars({ level = 3 }) {
  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={"Độ khó " + level + " trên 5 sao"}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={"h-3.5 w-3.5 " + (index < level ? "fill-amber-400 text-amber-500" : "text-slate-200")} />
      ))}
      <span className="ml-1 text-[10px] font-bold text-[#71869A]">{level}/5</span>
    </div>
  );
}

function AcRateProgress({ problem }) {
  const rate = Number.parseFloat(problem.acRate) || 0;
  const userSubmissions = problem.userSubmissions ?? 0;
  return (
    <div className="min-w-[132px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-black text-[#123B68]">{problem.acRate}</span>
        <span className="text-[9px] font-bold uppercase tracking-wide text-[#71869A]">AC</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EAF0F3]" aria-label={"Tỷ lệ AC " + problem.acRate}>
        <div className="h-full rounded-full bg-[#2F8A6B] transition-all" style={{ width: rate + "%" }} />
      </div>
      <p className="mt-1 text-[9px] text-[#8A9BAD]">{problem.acceptedCount}/{problem.submissionCount} lượt toàn hệ thống</p>
      <p className="mt-0.5 text-[10px] font-semibold text-[#536D86]">Bạn đã nộp {userSubmissions} lần</p>
    </div>
  );
}

export default function PracticePage({ onOpenCodeWorkspace }) {
  const [activeTab, setActiveTab] = useState("all"); // all, class, assigned, saved, history
  const [practiceMode, setPracticeMode] = useState("problems"); // problems, exams
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [problemPage, setProblemPage] = useState(1);
  const [examPage, setExamPage] = useState(1);

  const changePracticeMode = (mode) => {
    setPracticeMode(mode);
    setSearchQuery("");
    if (mode === "problems") setSelectedExamType("all");
    if (mode === "exams") { setActiveTab("all"); setSelectedTopic("all"); setSelectedDifficulty("all"); }
  };

  // [PRACTICE-00] CHUYÊN ĐỀ — icon SVG màu nhẹ giúp quét nhanh mà không dùng emoji.
  const topics = [
    { id: "all", label: "Tất cả chuyên đề", icon: Code2, tone: "text-[#2D7FA3]" },
    { id: "dp", label: "Quy hoạch động", icon: Route, tone: "text-[#786BB1]" },
    { id: "graph", label: "Lý thuyết Đồ thị", icon: GitBranch, tone: "text-[#4C83B0]" },
    { id: "ds", label: "Cấu trúc dữ liệu", icon: Database, tone: "text-[#3B9374]" },
    { id: "math", label: "Toán học & Số học", icon: Calculator, tone: "text-[#AF7C32]" },
    { id: "greedy", label: "Tham lam & Hai con trỏ", icon: Route, tone: "text-[#B86C6C]" },
    { id: "string", label: "Xử lý Xâu ký tự", icon: TextCursorInput, tone: "text-[#2D7FA3]" },
  ];

  const difficulties = [
    { id: "all", label: "Mọi độ khó" },
    { id: "easy", label: "Dễ", color: "text-[#397C68] bg-[#EFF9F5] border-[#D4EDE2]", icon: CheckCircle2 },
    { id: "medium", label: "Trung bình", color: "text-[#376B98] bg-[#EEF5FF] border-[#D4E3F7]", icon: TrendingUp },
    { id: "hard", label: "Khó", color: "text-[#8E6B2E] bg-[#FFF7E3] border-[#F2E1B6]", icon: Flame },
    { id: "expert", label: "Cực khó", color: "text-[#A15B5B] bg-[#FFF1F0] border-[#F3D8D6]", icon: Award }
  ];

  const problemList = [
    {
      id: "DP_LIS",
      title: "Dãy con tăng dài nhất (LIS O(N log N))",
      source: "Kho luyện tập Ôn Thi 360",
      topic: "dp",
      topicLabel: "Quy hoạch động",
      difficulty: "medium",
      difficultyLevel: 3,
      difficultyLabel: "Trung bình",
      difficultyStyle: "text-sky-600 bg-sky-50 border-sky-200",
      acceptedCount: "3,420",
      submissionCount: "5,800",
      acRate: "58.9%",
      userSubmissions: 5,
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "ac", // ac, doing, todo, locked
      buckets: ["class", "history"],
      type: "code",
      points: 100
    },
    {
      id: "GRAPH_DIJKSTRA",
      title: "Tìm đường đi ngắn nhất đồ thị trọng số dương (Dijkstra)",
      source: "Lớp Chuyên Tin 10A1",
      topic: "graph",
      topicLabel: "Lý thuyết Đồ thị",
      difficulty: "medium",
      difficultyLevel: 3,
      difficultyStyle: "text-sky-600 bg-sky-50 border-sky-200",
      acceptedCount: "2,890",
      submissionCount: "4,600",
      acRate: "62.8%",
      userSubmissions: 0,
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "todo",
      buckets: ["class", "assigned"],
      type: "code",
      points: 100
    },
    {
      id: "DS_SEGTREE",
      title: "Cây phân đoạn: Cập nhật đoạn và truy vấn Tổng (Lazy Propagation)",
      source: "Lớp Chuyên Tin 10A1",
      topic: "ds",
      topicLabel: "Cấu trúc dữ liệu",
      difficulty: "hard",
      difficultyLevel: 4,
      difficultyStyle: "text-amber-600 bg-amber-50 border-amber-200",
      acceptedCount: "1,450",
      submissionCount: "3,100",
      acRate: "46.7%",
      userSubmissions: 2,
      timeLimit: "1.5s",
      memoryLimit: "512MB",
      status: "doing",
      buckets: ["class", "assigned"],
      type: "code",
      points: 100
    },
    {
      id: "DP_KNAPSACK",
      title: "Bài toán Cái túi 0/1 (0-1 Knapsack Problem)",
      source: "Chuyên đề Quy hoạch động",
      topic: "dp",
      topicLabel: "Quy hoạch động",
      difficulty: "easy",
      difficultyLevel: 1,
      difficultyStyle: "text-emerald-600 bg-emerald-50 border-emerald-200",
      acceptedCount: "4,900",
      submissionCount: "6,200",
      acRate: "79.0%",
      userSubmissions: 4,
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "ac",
      buckets: ["history"],
      type: "code",
      points: 100
    },
    {
      id: "MATH_PRIME",
      title: "Sàng nguyên tố Eratosthenes phân đoạn và Đếm ước",
      source: "Kho luyện tập Ôn Thi 360",
      topic: "math",
      topicLabel: "Toán học & Số học",
      difficulty: "easy",
      difficultyLevel: 2,
      difficultyStyle: "text-emerald-600 bg-emerald-50 border-emerald-200",
      acceptedCount: "5,120",
      submissionCount: "6,400",
      acRate: "80.0%",
      userSubmissions: 6,
      timeLimit: "1.0s",
      memoryLimit: "128MB",
      status: "ac",
      buckets: ["class", "history"],
      type: "code",
      points: 100
    },
    {
      id: "GRAPH_MAXFLOW",
      title: "Luồng cực đại trên mạng: Thuật toán Dinic O(V²E)",
      source: "Bài được giao · Lớp Chuyên Tin 10A1",
      topic: "graph",
      topicLabel: "Lý thuyết Đồ thị",
      difficulty: "expert",
      difficultyLevel: 5,
      difficultyStyle: "text-rose-600 bg-rose-50 border-rose-200",
      acceptedCount: "620",
      submissionCount: "1,900",
      acRate: "32.6%",
      userSubmissions: 0,
      timeLimit: "2.0s",
      memoryLimit: "512MB",
      status: "todo",
      buckets: ["assigned"],
      type: "code",
      points: 150
    },
    {
      id: "STRING_KMP",
      title: "Khớp mẫu xâu ký tự: Thuật toán Knuth-Morris-Pratt (KMP)",
      source: "Chuyên đề Xử lý Xâu",
      topic: "string",
      topicLabel: "Xử lý Xâu",
      difficulty: "hard",
      difficultyLevel: 4,
      difficultyStyle: "text-amber-600 bg-amber-50 border-amber-200",
      acceptedCount: "1,100",
      submissionCount: "2,400",
      acRate: "45.8%",
      userSubmissions: 1,
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      status: "todo",
      buckets: ["class"],
      type: "code",
      points: 100
    }
  ];

  // [PRACTICE-00B] ĐỀ THI LUYỆN TẬP — một đề gồm nhiều bài, có thời lượng và tiến độ riêng.
  const examList = [
    { id: "EXAM_HSG_01", title: "Đề luyện HSG Quốc gia · Vòng 1", subtitle: "Tổng hợp DP, Đồ thị và Cấu trúc dữ liệu theo format thi thật.", type: "hsg", typeLabel: "HSG Quốc gia", duration: "180 phút", problemsCount: 4, attempts: "1,240 lượt làm", status: "open", statusLabel: "Đang mở", progress: 0, progressLabel: "Chưa bắt đầu", scoreLabel: "Chưa có điểm", image: "/assets/contest-img-1.png" },
    { id: "EXAM_10CT_02", title: "Đề thi thử vào 10 Chuyên Tin · Số 02", subtitle: "Luyện tốc độ xử lý và kỹ năng phân bổ thời gian trong phòng thi.", type: "specialized", typeLabel: "Chuyên Tin 10", duration: "150 phút", problemsCount: 3, attempts: "860 lượt làm", status: "doing", statusLabel: "Đang làm dở", progress: 62, progressLabel: "Đã làm 2/3 bài", scoreLabel: "72/100 điểm", image: "/assets/contest-img-2.png" },
    { id: "EXAM_OLYMPIC_01", title: "Đề mô phỏng Olympic Tin học · Challenge", subtitle: "Bộ đề nâng cao với các bài thuật toán quốc tế và giới hạn lớn.", type: "olympic", typeLabel: "Olympic quốc tế", duration: "240 phút", problemsCount: 5, attempts: "420 lượt làm", status: "closed", statusLabel: "Đã hoàn thành", progress: 100, progressLabel: "Đã hoàn thành", scoreLabel: "86/100 điểm", image: "/assets/contest-img-3.png" },
    { id: "EXAM_HSG_02", title: "Đề luyện HSG Quốc gia · Vòng 2", subtitle: "Thử sức với bài toán quy hoạch động và đồ thị ở mức phân loại đội tuyển.", type: "hsg", typeLabel: "HSG Quốc gia", duration: "180 phút", problemsCount: 4, attempts: "980 lượt làm", status: "open", statusLabel: "Đang mở", progress: 0, progressLabel: "Chưa bắt đầu", scoreLabel: "Chưa có điểm", image: "/assets/course-img-4.png" },
    { id: "EXAM_SPECIALIZED_03", title: "Đề thi thử vào 10 Chuyên Tin · Số 03", subtitle: "Củng cố nền tảng và rèn chiến thuật phân bổ thời gian theo từng phần thi.", type: "specialized", typeLabel: "Chuyên Tin 10", duration: "120 phút", problemsCount: 3, attempts: "640 lượt làm", status: "open", statusLabel: "Đang mở", progress: 0, progressLabel: "Chưa bắt đầu", scoreLabel: "Chưa có điểm", image: "/assets/contest-img-2.png" },
    { id: "EXAM_OLYMPIC_02", title: "Olympic Tin học trẻ · Vòng tuyển chọn", subtitle: "Các bài tư duy thuật toán nâng cao dành cho vòng tuyển chọn đội tuyển.", type: "olympic", typeLabel: "Olympic quốc tế", duration: "210 phút", problemsCount: 4, attempts: "310 lượt làm", status: "doing", statusLabel: "Đang làm dở", progress: 38, progressLabel: "Đã làm 1/4 bài", scoreLabel: "Đang cập nhật", image: "/assets/contest-img-3.png" },
  ];

  const examTypes = [
    { id: "all", label: "Tất cả đề thi" },
    { id: "hsg", label: "HSG Quốc gia" },
    { id: "specialized", label: "Chuyên Tin 10" },
    { id: "olympic", label: "Olympic quốc tế" },
  ];

  const filteredProblems = problemList.filter((p) => {
    const matchTab = activeTab === "all" || p.buckets?.includes(activeTab);
    const matchTopic = selectedTopic === "all" || p.topic === selectedTopic;
    const matchDiff = selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchTopic && matchDiff && matchSearch;
  });
  const filteredExams = examList.filter((exam) => {
    const matchType = selectedExamType === "all" || exam.type === selectedExamType;
    const matchSearch = !searchQuery || `${exam.title} ${exam.subtitle} ${exam.id}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });
  const problemPageSize = 5;
  const examPageSize = 4;
  const problemTotalPages = Math.max(1, Math.ceil(filteredProblems.length / problemPageSize));
  const examTotalPages = Math.max(1, Math.ceil(filteredExams.length / examPageSize));
  const visibleProblems = filteredProblems.slice((problemPage - 1) * problemPageSize, problemPage * problemPageSize);
  const visibleExams = filteredExams.slice((examPage - 1) * examPageSize, examPage * examPageSize);
  const openProblem = (problem) => {
    const startIndex = filteredProblems.findIndex((item) => item.id === problem.id);
    const buildQueue = (index) => {
      if (index < 0 || index >= filteredProblems.length) return null;
      const current = filteredProblems[index];
      return { ...current, nextProblem: buildQueue(index + 1) };
    };
    onOpenCodeWorkspace?.(buildQueue(startIndex));
  };
  useEffect(() => { setProblemPage(1); }, [activeTab, selectedTopic, selectedDifficulty, searchQuery, practiceMode]);
  useEffect(() => { setExamPage(1); }, [selectedExamType, searchQuery, practiceMode]);
  useEffect(() => { if (problemPage > problemTotalPages) setProblemPage(problemTotalPages); }, [problemPage, problemTotalPages]);
  useEffect(() => { if (examPage > examTotalPages) setExamPage(examTotalPages); }, [examPage, examTotalPages]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* [PRACTICE-01] HERO LUYỆN TẬP — điểm nhấn gọn, title không vượt thang 24px của trang Lớp học. */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-r from-[#0B3C78] via-[#0050A0] to-[#188DB0] p-5 text-white shadow-[0_10px_35px_rgba(0,100,220,0.08)] sm:p-6 lg:p-7">
        <img
          src="/assets/generated-practice-hero-v1.png"
          alt="Practice banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold text-sky-50 backdrop-blur">
            <Flame className="w-3.5 h-3.5" />
            <span>Đấu trường Luyện tập Online Judge 24/7</span>
          </div>

          <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-2xl">
            Kho bài tập Thuật toán & Lập trình
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-5 text-sky-100 sm:text-sm sm:leading-6">
            Hơn 1,000+ bài tập thuật toán bám sát đề thi HSG Quốc gia, Tuyển sinh 10 Chuyên Tin và chuẩn Olympic Tin học quốc tế. Hệ thống chấm bài tự động tức thì.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button type="button" onClick={() => onOpenCodeWorkspace?.(problemList[0])} className="flex min-h-10 items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11px] font-black text-[#126F91] shadow-[0_5px_12px_rgba(4,45,105,0.14)] transition hover:-translate-y-0.5 hover:bg-[#F4FBFF] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 active:scale-[.98]"><Code2 className="h-3.5 w-3.5" />Làm bài ngay<ChevronRight className="h-3.5 w-3.5" /></button>
            <div className="flex min-h-9 items-center gap-1.5 rounded-lg border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Đã hoàn thành: 28 bài</span>
            </div>
            <div className="flex min-h-9 items-center gap-1.5 rounded-lg border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>Chuỗi luyện tập: 7 ngày liên tục</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-slate-950/10 p-3 shadow-lg backdrop-blur-md lg:w-72 lg:shrink-0">
          <p className="text-center text-xs font-bold uppercase tracking-[.08em] text-sky-100">Tiến độ chuyên đề của bạn</p>
          <div className="mt-3 space-y-2.5 text-xs">
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
      </div>

      {/* [PRACTICE-01A] CHỌN KIỂU LUYỆN — tách bài theo chuyên đề và đề thi thành hai nhiệm vụ rõ ràng. */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_10px_rgba(28,91,121,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#71869A]">Không gian luyện tập</p>
          <p className="mt-0.5 text-sm font-extrabold text-[#123B68]">Chọn cách bạn muốn rèn luyện hôm nay</p>
        </div>
        <div role="tablist" aria-label="Kiểu luyện tập" className="grid grid-cols-2 gap-1 rounded-xl border border-[#DDEAF0] bg-[#F5F8FA] p-1 sm:w-auto">
            <button type="button" role="tab" aria-selected={practiceMode === "problems"} onClick={() => changePracticeMode("problems")} className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-[11px] font-extrabold transition ${practiceMode === "problems" ? "bg-[#126F91] text-white shadow-[0_3px_8px_rgba(18,111,145,0.16)]" : "text-[#536D86] hover:bg-white"}`}><Code2 className="h-3.5 w-3.5" />Bài tập chuyên đề</button>
          <button type="button" role="tab" aria-selected={practiceMode === "exams"} onClick={() => changePracticeMode("exams")} className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-[11px] font-extrabold transition ${practiceMode === "exams" ? "bg-[#126F91] text-white shadow-[0_3px_8px_rgba(18,111,145,0.16)]" : "text-[#536D86] hover:bg-white"}`}><FileText className="h-3.5 w-3.5" />Đề thi luyện tập</button>
        </div>
      </div>

      {practiceMode === "problems" ? <>
      {/* [PRACTICE-02] TABS & BỘ LỌC — một mặt phẳng trung tính, trạng thái chọn xanh đậm. */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_10px_rgba(28,91,121,0.04)]">
        {/* Top Tabs */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E7EFF3] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "Tất cả bài tập" },
              { id: "class", label: "Theo lớp học" },
              { id: "assigned", label: "Bài được giao" },
              { id: "history", label: "Lịch sử nộp bài" }
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                aria-pressed={activeTab === t.id}
                  className={`min-h-10 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? "bg-[#126F91] text-white shadow-[0_3px_8px_rgba(18,111,145,0.16)]"
                    : "text-[#536D86] hover:bg-[#F2F8FA] hover:text-[#216F8E]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="hidden text-[11px] font-medium text-[#71869A] sm:inline">
            Hiển thị <strong>{filteredProblems.length}</strong> bài tập
          </span>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71869A]" />
            <input
              type="text"
              aria-label="Tìm kiếm bài tập"
              placeholder="Tìm theo tên bài hoặc mã bài (VD: DP_LIS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-[#D5E3E9] bg-[#F8FAFB] py-2 pl-10 pr-4 text-[13px] font-medium text-[#183D5E] placeholder:text-[#8193A3] focus:border-[#2D7FA3] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#DDF1F6]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="type-label shrink-0 text-[#536D86]">Độ khó:</span>
            {difficulties.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id)}
                aria-pressed={selectedDifficulty === d.id}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-all whitespace-nowrap ${
                  selectedDifficulty === d.id
                    ? "border-[#9DC8D7] bg-[#EAF5F8] text-[#126F91]"
                    : `${d.color} hover:brightness-[.98]`
                }`}
              >
                {d.icon && <d.icon className={`h-3.5 w-3.5 ${selectedDifficulty === d.id ? "text-white" : ""}`} />}
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* [PRACTICE-03] CHUYÊN ĐỀ — nhãn ngắn, icon màu để phân nhóm nội dung. */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {topics.map((tp) => (
          <button
            type="button"
            key={tp.id}
            onClick={() => setSelectedTopic(tp.id)}
            aria-pressed={selectedTopic === tp.id}
            className={`inline-flex min-h-9 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-bold transition-all whitespace-nowrap ${
              selectedTopic === tp.id
                ? "border-[#9DC8D7] bg-[#EAF5F8] text-[#126F91]"
                : "border-[#DDEAF0] bg-[#F8FAFB] text-[#536D86] hover:border-[#C9DFE8] hover:bg-white"
            }`}
          >
            <span className={`grid h-4 w-4 place-items-center rounded-md ${selectedTopic === tp.id ? "bg-white/60" : "bg-white"}`}><tp.icon className={`h-3 w-3 ${selectedTopic === tp.id ? "text-[#126F91]" : tp.tone}`} /></span>
            {tp.label}
          </button>
        ))}
      </div>

      {/* [PRACTICE-04] DANH SÁCH BÀI — desktop dạng bảng, mobile xếp card; trạng thái và CTA có màu ngữ nghĩa. */}
        <div className="divide-y divide-[#E7EFF3] overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-[0_2px_12px_rgba(28,91,121,0.06)]">
        <div className="hidden bg-[#F8FAFB] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[.06em] text-[#71869A] lg:grid lg:grid-cols-[88px_1fr_180px_120px_132px_148px]">
          <span>Trạng thái</span>
          <span>Tên bài tập & Mã</span>
          <span>Chuyên đề</span>
          <span>Độ khó</span>
          <span>Tỷ lệ AC</span>
          <span className="text-right">Hành động</span>
        </div>

        {visibleProblems.map((prob) => (
          <div
            key={prob.id}
            className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 gap-y-2 border-l-2 border-transparent p-3.5 transition-all hover:border-l-[#2D7FA3] hover:bg-[#F8FBFC] sm:px-5 lg:grid-cols-[88px_1fr_180px_120px_132px_148px] lg:items-center lg:gap-3"
          >
            {/* Status Icon */}
            <div className="row-span-3 flex items-start justify-center pt-0.5 lg:row-span-1 lg:justify-start lg:pt-0">
              {prob.status === "ac" && (
                <div className="flex flex-col items-center gap-1 lg:items-start"><span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#8BD5B4] bg-gradient-to-br from-[#DFF8EC] to-[#EFF9F5] text-[#188B67] shadow-[0_5px_12px_rgba(59,147,116,0.18)]"><CheckCircle2 className="h-5 w-5" /></span><span className="text-[11px] font-extrabold text-[#188B67]">AC</span></div>
              )}
              {prob.status === "doing" && (
                <div className="flex flex-col items-center gap-1 lg:items-start"><span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#E7C674] bg-gradient-to-br from-[#FFF0C4] to-[#FFF7E3] text-[#A96D09] shadow-[0_5px_12px_rgba(211,154,62,0.2)]"><Clock className="h-5 w-5" /></span><span className="text-[11px] font-extrabold text-[#A96D09]">Đang làm</span></div>
              )}
              {prob.status === "todo" && (
                <div className="flex flex-col items-center gap-1 lg:items-start"><span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#BFD4E6] bg-gradient-to-br from-[#EAF2FA] to-[#F5F8FA] text-[#4B7EA7] shadow-[0_5px_12px_rgba(75,126,167,0.14)]"><Circle className="h-5 w-5" /></span><span className="text-[11px] font-extrabold text-[#4B7EA7]">Chưa nộp</span></div>
              )}
            </div>

            {/* Problem Title */}
            <div className="min-w-0">
              <button type="button" title={prob.title} onClick={() => openProblem(prob)} className="block max-w-full line-clamp-2 text-left text-sm font-bold leading-5 text-[#123B68] transition-colors hover:text-[#126F91] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBEAF1] sm:text-[15px]">
                {prob.title}
              </button>
              <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-amber-700">
                <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
                <span>Nguồn: {prob.source || "Kho luyện tập Ôn Thi 360"}</span>
              </p>
              <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-[#8A9BAD]">
                <span>Mã: {prob.id}</span>
                <span>•</span>
                <span>{prob.timeLimit} / {prob.memoryLimit}</span>
              </div>
            </div>

            {/* Compact metadata on mobile, separate table columns on desktop */}
            <div className="flex min-w-0 flex-wrap items-center gap-1.5 lg:contents">
              <div>
                <span className="rounded-lg border border-[#DDEAF0] bg-[#F5F8FA] px-2 py-1 text-[11px] font-semibold text-[#536D86] sm:text-xs">
                  {prob.topicLabel}
                </span>
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <DifficultyStars level={prob.difficultyLevel} />
                <span className="text-[10px] font-semibold text-[#71869A]">{prob.difficultyLabel || "Trung bình"}</span>
              </div>

              <AcRateProgress problem={prob} />
            </div>

            {/* Action Button */}
            <div className="col-span-2 flex justify-end lg:col-auto lg:w-auto">
              <button
                type="button"
                onClick={() => openProblem(prob)}
                className={`flex min-h-9 min-w-[96px] items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[10.5px] font-bold text-white shadow-none transition-colors active:scale-[.98] lg:min-h-9 lg:min-w-0 lg:w-auto ${prob.status === "ac" ? "bg-[#2F8A6B] hover:bg-[#28795E]" : prob.status === "doing" ? "bg-[#B68032] hover:bg-[#9F702A]" : "bg-[#126F91] hover:bg-[#0F5E7B]"}`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{prob.status === "ac" ? "Luyện lại" : prob.status === "doing" ? "Tiếp tục" : "Làm bài"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <PracticePagination page={problemPage} totalPages={problemTotalPages} onChange={setProblemPage} label="Phân trang bài tập chuyên đề" />
      {filteredProblems.length === 0 && <div className="rounded-3xl border border-dashed border-[#C9DFE8] bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-[#9DC8D7]"/><h2 className="mt-3 text-sm font-black text-[#123B68]">Không có bài tập phù hợp</h2><p className="mt-1 text-xs text-[#71869A]">Hãy đổi chuyên đề hoặc mức độ để xem kho bài khác.</p><button type="button" onClick={() => { setSelectedTopic("all"); setSelectedDifficulty("all"); setActiveTab("all"); }} className="mt-4 text-[11px] font-bold text-[#126F91] hover:underline">Xóa bộ lọc</button></div>}
      </>
      : <>
        {/* [PRACTICE-05] BỘ LỌC ĐỀ THI — tìm theo tên đề và loại đề, không dùng bộ lọc chuyên đề của bài lẻ. */}
        <div className="flex flex-col gap-3 rounded-2xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_10px_rgba(28,91,121,0.04)] md:flex-row md:items-center md:justify-between">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71869A]" />
            <input type="text" aria-label="Tìm kiếm đề thi" placeholder="Tìm đề thi theo tên hoặc mã đề..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="min-h-10 w-full rounded-xl border border-[#DDEAF0] bg-[#F8FAFB] py-2 pl-10 pr-4 text-xs text-slate-800 placeholder:text-[#8A9BAD] focus:border-[#9DC8D7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#EAF5F8]" />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {examTypes.map((type) => <button type="button" key={type.id} aria-pressed={selectedExamType === type.id} onClick={() => setSelectedExamType(type.id)} className={`min-h-9 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${selectedExamType === type.id ? "border-[#9DC8D7] bg-[#EAF5F8] text-[#126F91]" : "border-[#DDEAF0] bg-[#F8FAFB] text-[#536D86] hover:border-[#C9DFE8] hover:bg-white"}`}>{type.label}</button>)}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-1"><div className="flex items-center gap-2 text-[11px] text-[#71869A]"><FileText className="h-3.5 w-3.5 text-[#4C83B0]" /><span>Hiển thị <b className="text-[#536D86]">{filteredExams.length}</b> đề thi luyện tập</span></div><span className="hidden text-[11px] text-[#8A9BAD] sm:inline">Mỗi đề mô phỏng một lượt thi hoàn chỉnh</span></div>

        {/* [PRACTICE-06] TỔNG QUAN ĐỀ THI — giúp người học đọc nhanh trạng thái trước khi chọn đề. */}
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_8px_rgba(28,91,121,0.04)]">
            <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EAF5F8] text-[#126F91]"><FileText className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-wide text-[#71869A]">Kho đề thi</p><p className="text-lg font-bold leading-5 text-[#123B68]">{examList.length}</p></div></div>
            <p className="mt-2 text-[11px] text-[#536D86]">Đề mô phỏng theo từng mục tiêu</p>
          </div>
          <div className="rounded-xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_8px_rgba(28,91,121,0.04)]">
            <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF7E3] text-[#B68032]"><Clock className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-wide text-[#71869A]">Đang luyện</p><p className="text-lg font-bold leading-5 text-[#123B68]">{examList.filter((exam) => exam.status === "doing").length}</p></div></div>
            <p className="mt-2 text-[11px] text-[#536D86]">Tiếp tục từ nơi bạn đã dừng</p>
          </div>
          <div className="rounded-xl border border-[#DDEAF0] bg-white p-3 shadow-[0_2px_8px_rgba(28,91,121,0.04)]">
            <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EFF9F5] text-[#2F8A6B]"><Award className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-wide text-[#71869A]">Điểm cao nhất</p><p className="text-lg font-bold leading-5 text-[#123B68]">86/100</p></div></div>
            <p className="mt-2 text-[11px] text-[#536D86]">Kết quả tốt nhất của bạn</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-1 pt-1"><div><p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#71869A]">Danh sách đề thi</p><p className="mt-0.5 text-sm font-bold text-[#123B68]">Chọn một phiên thi để bắt đầu</p></div><span className="hidden text-[11px] text-[#8A9BAD] sm:inline">{filteredExams.length} đề phù hợp</span></div>

        {/* [PRACTICE-07] CARD ĐỀ THI — thể hiện thời lượng, số bài, tiến độ và điểm như một phiên thi hoàn chỉnh. */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {visibleExams.map((exam) => <article key={exam.id} className={`group flex min-h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_2px_12px_rgba(28,91,121,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(28,91,121,0.09)] ${exam.status === "open" ? "border-[#BFDCE5]" : exam.status === "doing" ? "border-[#E7D6AB]" : "border-[#CFE5D9]"}`}>
            <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#F8FBFC] p-2.5"><img src={exam.image} alt={exam.title} className="h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" /><span className={`absolute left-3 top-3 rounded-lg border px-2 py-1 text-[11px] font-bold ${exam.status === "open" ? "border-[#D4EDE2] bg-[#EFF9F5] text-[#397C68]" : exam.status === "doing" ? "border-[#F2E1B6] bg-[#FFF7E3] text-[#8E6B2E]" : "border-[#DDEAF0] bg-[#F5F8FA] text-[#71869A]"}`}>{exam.statusLabel}</span><span className="absolute bottom-2 left-3 rounded-md bg-white/90 px-2 py-1 font-mono text-[10px] font-bold text-[#536D86]">{exam.id}</span></div>
            <div className="flex flex-1 flex-col p-3.5"><div className="flex items-center justify-between gap-2"><div className="flex items-center gap-1.5 text-[11px] font-bold text-[#4C83B0]"><FileText className="h-3.5 w-3.5" />{exam.typeLabel}</div><span className="text-[10px] font-bold text-[#8A9BAD]">Thi mô phỏng</span></div><h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-[#123B68]">{exam.title}</h3><p className="type-body mt-1 line-clamp-2 text-[11px]">{exam.subtitle}</p><div className="mt-2.5 grid grid-cols-3 gap-1 rounded-xl border border-[#E7EFF3] bg-[#F8FBFC] p-1.5 text-center"><div><Timer className="mx-auto h-3.5 w-3.5 text-[#2D7FA3]" /><p className="mt-0.5 text-[11px] font-bold text-[#536D86]">{exam.duration}</p><p className="text-[9px] text-[#8A9BAD]">Thời lượng</p></div><div><Code2 className="mx-auto h-3.5 w-3.5 text-[#786BB1]" /><p className="mt-0.5 text-[11px] font-bold text-[#536D86]">{exam.problemsCount} bài</p><p className="text-[9px] text-[#8A9BAD]">Cấu trúc đề</p></div><div><TrendingUp className="mx-auto h-3.5 w-3.5 text-[#3B9374]" /><p className="mt-0.5 text-[11px] font-bold text-[#536D86]">{exam.attempts}</p><p className="text-[9px] text-[#8A9BAD]">Lượt làm</p></div></div><div className="mt-2.5"><div className="flex items-center justify-between gap-2 text-[10px]"><span className="font-bold text-[#536D86]">Tiến độ của bạn</span><span className={`font-bold ${exam.status === "open" ? "text-[#126F91]" : exam.status === "doing" ? "text-[#B68032]" : "text-[#2F8A6B]"}`}>{exam.progressLabel}</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EAF0F3]"><div className={`h-full rounded-full ${exam.status === "open" ? "bg-[#126F91]" : exam.status === "doing" ? "bg-[#B68032]" : "bg-[#2F8A6B]"}`} style={{ width: `${exam.progress}%` }} /></div></div><div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#E7EFF3] pt-2.5"><div><p className="text-[9px] text-[#8A9BAD]">Kết quả gần nhất</p><p className="mt-0.5 text-[11px] font-bold text-[#123B68]">{exam.scoreLabel}</p></div><button type="button" onClick={() => onOpenCodeWorkspace({ ...exam, type: "exam" })} className={`flex min-h-10 min-w-[148px] items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-extrabold text-white shadow-[0_4px_10px_rgba(18,111,145,0.12)] transition hover:-translate-y-0.5 active:scale-[.98] ${exam.status === "open" ? "bg-[#126F91] hover:bg-[#0F5E7B]" : exam.status === "doing" ? "bg-[#B68032] hover:bg-[#9F702A]" : "bg-[#2F8A6B] hover:bg-[#28795E]"}`}>{exam.status === "open" ? "Bắt đầu làm đề" : exam.status === "doing" ? "Tiếp tục làm đề" : "Xem kết quả"}<ChevronRight className="h-3.5 w-3.5" /></button></div></div>
          </article>)}
        </div>
        <PracticePagination page={examPage} totalPages={examTotalPages} onChange={setExamPage} label="Phân trang đề thi luyện tập" />
        {filteredExams.length === 0 && <div className="rounded-3xl border border-dashed border-[#C9DFE8] bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-[#9DC8D7]" /><h2 className="mt-3 text-sm font-black text-[#123B68]">Không có đề thi phù hợp</h2><p className="mt-1 text-xs text-[#71869A]">Thử đổi loại đề hoặc từ khóa tìm kiếm.</p><button type="button" onClick={() => { setSelectedExamType("all"); setSearchQuery(""); }} className="mt-4 text-[11px] font-bold text-[#126F91] hover:underline">Xóa bộ lọc</button></div>}
      </>}
    </div>
  );
}
