import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Copy,
  Sparkles,
  FileCode,
  FileText,
  Eye,
  ShieldCheck,
  Check,
  ChevronRight,
  GripVertical,
  Download,
  Moon,
  Sun
} from "lucide-react";
import useWorkspaceTheme from "./useWorkspaceTheme";

const CODE_KEYWORDS = new Set([
  "auto", "bool", "break", "case", "catch", "char", "class", "const", "continue",
  "def", "do", "double", "else", "for", "from", "if", "import", "in", "int",
  "long", "namespace", "new", "None", "nullptr", "return", "short", "sizeof",
  "static", "string", "struct", "try", "using", "void", "while", "False",
  "True", "vector", "include", "print", "range"
]);
const CODE_TOKEN_PATTERN = /(\/\/[^\n]*|#[^\n]*|\"(?:\\.|[^\"])*\"|'(?:\\.|[^'])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;

function escapeCodeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

function highlightCode(value) {
  return value.split("\n").map((line) => {
    let html = "";
    let cursor = 0;
    for (const match of line.matchAll(CODE_TOKEN_PATTERN)) {
      const token = match[0];
      const start = match.index ?? 0;
      html += escapeCodeHtml(line.slice(cursor, start));
      const afterToken = line.slice(start + token.length);
      let tokenClass = "code-token-plain";
      if (token.startsWith("//")) tokenClass = "code-token-comment";
      else if (token.startsWith("#include") || token.startsWith("#define") || token.startsWith("#if")) tokenClass = "code-token-preprocessor";
      else if (token.startsWith("#")) tokenClass = "code-token-comment";
      else if (token.startsWith("\"") || token.startsWith("'")) tokenClass = "code-token-string";
      else if (/^\d/.test(token)) tokenClass = "code-token-number";
      else if (CODE_KEYWORDS.has(token)) tokenClass = "code-token-keyword";
      else if (/^\s*\(/.test(afterToken)) tokenClass = "code-token-function";
      html += '<span class="' + tokenClass + '">' + escapeCodeHtml(token) + "</span>";
      cursor = start + token.length;
    }
    return html + escapeCodeHtml(line.slice(cursor));
  }).join("\n");
}

const sampleTests = [
  { id: "sample-1", label: "Test mẫu 1 · cơ bản", input: "6\n1 2 5 3 4 7", expected: "4" },
  { id: "sample-2", label: "Test mẫu 2 · phần tử trùng", input: "8\n1 1 2 2 3 3 4 4", expected: "4" },
  { id: "edge-1", label: "Biên · N = 1", input: "1\n42", expected: "1" },
  { id: "custom", label: "Tự nhập dữ liệu", input: "6\n1 2 5 3 4 7", expected: "Nhập expected output khi cần" }
];

function createActivityEntry(type, title, detail) {
  return {
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    type,
    title,
    detail,
    time: new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" }).format(new Date())
  };
}

function clampSplitRatio(value) {
  return Math.min(68, Math.max(32, value));
}

function isPassedTest(test) {
  return test.passed ?? ["AC", "Đúng", "PASSED", "Accepted"].includes(test.status);
}

export default function CodeWorkspaceModal({ problem, isOpen, onClose, onNextProblem }) {
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
  const [customExpected, setCustomExpected] = useState("4");
  const [customOutput, setCustomOutput] = useState("");
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerError, setRunnerError] = useState("");
  const [selectedTestId, setSelectedTestId] = useState("sample-1");
  const [ioMode, setIoMode] = useState("stdio");
  const [inputFileName, setInputFileName] = useState("input.txt");
  const [outputFileName, setOutputFileName] = useState("output.txt");
  const [submitting, setSubmitting] = useState(false);
  const [verdictResult, setVerdictResult] = useState(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("problem"); // problem, editorial, activity
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [fillAnswer, setFillAnswer] = useState("");
  const [guideViewed, setGuideViewed] = useState(false);
  const [activityLog, setActivityLog] = useState(() => [
    createActivityEntry("session", "Bắt đầu làm bài", "Mở phòng làm bài")
  ]);
  const [theme, toggleTheme] = useWorkspaceTheme(isOpen);
  const [splitRatio, setSplitRatio] = useState(50);
  const [isResizingSplit, setIsResizingSplit] = useState(false);
  const lastProblemId = useRef(problem?.id || null);
  const codeHighlightRef = useRef(null);
  const splitGridRef = useRef(null);

  const statementPdf = problem?.statementPdf || problem?.pdfUrl;
  const guidePdf = problem?.solutionPdf || problem?.editorialPdf;
  const topicLabel = problem?.topicLabel || problem?.topic || "Chuyên đề tổng hợp";
  const nextProblem = problem?.nextProblem;
  const questionType = problem?.questionType || (problem?.type === "code" ? "programming" : problem?.type) || "programming";
  const isProgramming = questionType === "programming" || questionType === "code";
  const isMultipleChoice = questionType === "multiple_choice";
  const questionTypeLabel = questionType === "fill_answer" ? "Điền đáp án" : questionType === "single_choice" ? "Trắc nghiệm" : questionType === "multiple_choice" ? "Nhiều lựa chọn" : "Lập trình";
  const answerOptions = problem?.options || ["Dijkstra", "Kruskal", "Quick sort", "DFS"];
  const availableTests = useMemo(() => {
    if (!Array.isArray(problem?.sampleTests) || problem.sampleTests.length === 0) return sampleTests;
    return [
      ...problem.sampleTests.map((test, index) => ({
        id: test.id || "sample-" + (index + 1),
        label: test.label || test.name || "Test mẫu " + (index + 1),
        input: test.input || "",
        expected: test.expected ?? test.output ?? ""
      })),
      { id: "custom", label: "Tự nhập dữ liệu", input: "", expected: "" }
    ];
  }, [problem?.sampleTests]);

  const appendActivity = (type, title, detail) => {
    setActivityLog((current) => [createActivityEntry(type, title, detail), ...current].slice(0, 40));
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appendActivity("attention", "Rời màn hình", "Đã ghi nhận tín hiệu chuyển sang tab/cửa sổ khác");
      } else {
        appendActivity("attention", "Quay lại bài", "Phiên làm bài tiếp tục được theo dõi");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !problem?.id) return;
    if (lastProblemId.current !== null && lastProblemId.current !== problem.id) {
      setCode("// Bài: " + (problem.title || "Bài lập trình") + "\n\n// Viết lời giải tại đây\nint main() {\n    return 0;\n}");
      setLanguage("cpp");
      setCustomOutput("");
      setRunnerError("");
      appendActivity("session", "Bắt đầu bài mới", "Chuyển sang " + (problem.title || "bài lập trình"));
      setSelectedTestId(availableTests[0]?.id || "sample-1");
      setCustomInput(availableTests[0]?.input || "");
      setCustomExpected(availableTests[0]?.expected || "");
      setRunnerOpen(false);
      setVerdictResult(null);
      setResultOpen(false);
      setActiveTab("problem");
      setGuideViewed(false);
      setSelectedAnswer("");
      setSelectedAnswers([]);
      setFillAnswer("");
    }
    lastProblemId.current = problem.id;
  }, [isOpen, problem?.id]);

  useEffect(() => {
    if (!isOpen || (!runnerOpen && !resultOpen)) return undefined;
    const handleRunnerKeyDown = (event) => {
      if (event.key === "Escape") {
        setRunnerOpen(false);
        setResultOpen(false);
      }
    };
    document.addEventListener("keydown", handleRunnerKeyDown);
    return () => document.removeEventListener("keydown", handleRunnerKeyDown);
  }, [isOpen, runnerOpen, resultOpen]);

  useEffect(() => {
    if (!isResizingSplit) return undefined;
    const updateSplitPosition = (event) => {
      const bounds = splitGridRef.current?.getBoundingClientRect();
      if (!bounds || bounds.width === 0) return;
      setSplitRatio(clampSplitRatio(((event.clientX - bounds.left) / bounds.width) * 100));
    };
    const stopResizing = () => setIsResizingSplit(false);
    document.addEventListener("pointermove", updateSplitPosition);
    document.addEventListener("pointerup", stopResizing);
    document.body.classList.add("workspace-is-resizing");
    return () => {
      document.removeEventListener("pointermove", updateSplitPosition);
      document.removeEventListener("pointerup", stopResizing);
      document.body.classList.remove("workspace-is-resizing");
    };
  }, [isResizingSplit]);

  const openGuide = () => {
    setGuideViewed(true);
    setActiveTab("editorial");
    appendActivity("guide", "Mở hướng dẫn", guidePdf ? "Đã mở hướng dẫn giải PDF" : "Đã mở khu vực hướng dẫn giải");
  };

  if (!isOpen) return null;

  const resultTestDetails = verdictResult?.testDetails || [];
  const passedTestCount = resultTestDetails.filter(isPassedTest).length;
  const failedTests = resultTestDetails.filter((test) => !isPassedTest(test));
  const failedTestCount = failedTests.length;
  const resultAccepted = failedTestCount === 0;
  const resultHeadline = resultAccepted
    ? (isProgramming ? "Bài làm đã được chấp nhận" : "Đáp án chính xác")
    : "Bài làm cần kiểm tra lại";
  const resultDescription = resultAccepted
    ? "Kết quả đã vượt qua toàn bộ kiểm tra của bài."
    : failedTestCount + " test chưa đạt; hãy xem chi tiết bên dưới để điều chỉnh bài làm.";

  const handleDownloadFailedTest = (test) => {
    if (!test || isPassedTest(test)) return;
    const content = [
      "TEST " + test.id + " · " + (test.name || "Test " + test.id),
      "Trạng thái: " + (test.status || "Sai"),
      "",
      "Input:",
      test.input ?? "(Không có dữ liệu input)",
      "",
      "Expected output:",
      test.expected ?? "(Không có expected output)",
      "",
      "Actual output:",
      test.actual ?? test.output ?? "(Không có actual output)",
      "",
      "Thời gian: " + (test.time || "—") + " · Bộ nhớ: " + (test.mem || "—")
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeProblemId = String(problem?.id || "bai-tap").replace(/[^a-zA-Z0-9_-]+/g, "-");
    const safeTestId = String(test.id || "unknown").replace(/[^a-zA-Z0-9_-]+/g, "-");
    link.download = safeProblemId + "-test-" + safeTestId + "-sai.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    appendActivity("download", "Tải test sai", "Đã tải riêng test " + test.id + " để kiểm tra lại");
  };

  const handleRunCustom = () => {
    const selectedTest = availableTests.find((test) => test.id === selectedTestId) || availableTests[0];
    if (ioMode === "file" && (!inputFileName.trim() || !outputFileName.trim())) {
      setRunnerError("Vui lòng nhập tên file input và output trước khi chạy test.");
      setCustomOutput("");
      appendActivity("error", "Chạy test không thành công", "Thiếu tên file input hoặc output");
      return;
    }
    if (!code.trim()) {
      setRunnerError("Không thể chạy test khi trình soạn thảo đang trống.");
      setCustomOutput("");
      appendActivity("error", "Chạy test không thành công", "Trình soạn thảo đang trống");
      return;
    }
    setRunnerError("");
    const expectedOutput = selectedTest.id === "custom" ? customExpected.trim() || "(chưa nhập)" : selectedTest.expected;
    const inputSource = ioMode === "stdio" ? "stdin" : inputFileName || "input.txt";
    const outputTarget = ioMode === "stdio" ? "stdout" : outputFileName || "output.txt";
    setCustomOutput([
      "Đang biên dịch & thực thi...",
      "Bộ test: " + selectedTest.label,
      "Cách I/O: " + inputSource + " → " + outputTarget,
      "",
      inputSource + " (input):",
      customInput || "(trống)",
      "",
      outputTarget + " (output mô phỏng):",
      expectedOutput,
      "",
      selectedTest.id === "custom" && !customExpected.trim()
        ? "[Đã chạy thử cấu hình I/O — nhập expected output để đối chiếu]"
        : "[Kết quả: Khớp output mẫu | Thời gian: 0.015s | Bộ nhớ: 1.8MB]"
    ].join("\n"));
    appendActivity("test", "Chạy test", selectedTest.label + " · " + (ioMode === "stdio" ? "stdin / stdout" : inputFileName + " → " + outputFileName));
  };

  const handleSelectTest = (event) => {
    const testId = event.target.value;
    const selectedTest = availableTests.find((test) => test.id === testId) || availableTests[0];
    setSelectedTestId(testId);
    setCustomInput(selectedTest.input);
    setCustomExpected(selectedTest.id === "custom" ? "" : selectedTest.expected);
    setCustomOutput("");
    setRunnerError("");
    appendActivity("test", "Chọn bộ test", selectedTest.label);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setVerdictResult(null);
    setResultOpen(false);
    appendActivity("submission", "Đang nộp bài", "Gửi " + (isProgramming ? "mã nguồn" : "đáp án") + " lên hệ thống chấm");
    setTimeout(() => {
      setSubmitting(false);
      const result = {
        verdict: "ACCEPTED",
        questionType,
        score: 100,
        maxScore: 100,
        time: "0.045s",
        memory: "2.4MB",
        testsPassed: isProgramming ? 10 : 1,
        totalTests: isProgramming ? 10 : 1,
        testDetails: isProgramming ? [
          { id: 1, name: "Test 1 · Ví dụ", time: "0.012s", mem: "1.2MB", status: "AC", passed: true },
          { id: 2, name: "Test 2 · N ≤ 100", time: "0.015s", mem: "1.2MB", status: "AC", passed: true },
          { id: 3, name: "Test 3 · N ≤ 1.000", time: "0.024s", mem: "1.5MB", status: "AC", passed: true },
          { id: 4, name: "Test 4 · N ≤ 10.000", time: "0.038s", mem: "2.1MB", status: "AC", passed: true },
          { id: 5, name: "Test 5 · N tối đa", time: "0.045s", mem: "2.4MB", status: "AC", passed: true }
        ] : [{ id: 1, name: "Kiểm tra đáp án", time: "—", mem: "—", status: "Đúng", passed: true }]
      };
      setVerdictResult(result);
      setResultOpen(true);
      appendActivity("submission", "Đã nộp bài", result.verdict + " · " + result.score + "/" + result.maxScore + " điểm");
    }, 1200);
  };

  const handleCopySample = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextProblem = () => {
    if (!nextProblem || !onNextProblem) return;
    setActiveTab("problem");
    setGuideViewed(false);
    setVerdictResult(null);
    setResultOpen(false);
    setCustomOutput("");
    setSelectedAnswer("");
    setSelectedAnswers([]);
    setFillAnswer("");
    onNextProblem(nextProblem);
  };

  const handleCodeScroll = (event) => {
    if (!codeHighlightRef.current) return;
    codeHighlightRef.current.scrollTop = event.currentTarget.scrollTop;
    codeHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  };

  const handleSplitPointerDown = (event) => {
    event.preventDefault();
    setIsResizingSplit(true);
  };

  const handleSplitKeyDown = (event) => {
    const step = event.shiftKey ? 5 : 2;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplitRatio((current) => clampSplitRatio(current - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplitRatio((current) => clampSplitRatio(current + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setSplitRatio(32);
    }
    if (event.key === "End") {
      event.preventDefault();
      setSplitRatio(68);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="workspace-shell bg-[#F8FAFB] rounded-2xl sm:rounded-3xl max-w-7xl w-full h-[96dvh] sm:h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-700">
        {/* Workspace Top Bar */}
        <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#126F91] font-bold shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-[#123B68] truncate">
                  {problem?.title || "Dãy con tăng dài nhất (LIS)"}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-[#126F91] border border-sky-100 shrink-0">
                  {problem?.id || "DP_01"}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                  {questionTypeLabel}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10.5px] text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-600" />
                  <span>Giới hạn: 1.0 giây</span>
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-amber-600" />
                  <span>Bộ nhớ: 256 MB</span>
                </span>
                <span className="flex items-center gap-1 text-[#126F91]">
                  <Sparkles className="h-3 w-3" />
                  <span>Chuyên đề: {topicLabel}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-sky-100 bg-white text-slate-600 transition-colors hover:bg-sky-50 hover:text-[#126F91] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={theme === "dark" ? "Chuyển phòng làm bài sang giao diện sáng" : "Chuyển phòng làm bài sang giao diện tối"}
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? "Giao diện sáng" : "Giao diện tối"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Language Selector */}
            {isProgramming && <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="cpp14">C++14</option>
                <option value="cpp">C++17</option>
                <option value="python">Python 3</option>
              </select>
            </div>}

            {isProgramming && <button
              type="button"
              onClick={() => setRunnerOpen((isOpen) => !isOpen)}
              className="flex min-h-8 items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-[#126F91] transition-colors hover:bg-sky-100 cursor-pointer"
              aria-label="Mở cửa sổ chạy test"
            >
              <Play className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Chạy test</span>
            </button>}

            {nextProblem && <button
              type="button"
              onClick={handleNextProblem}
              className="flex min-h-9 items-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-[11px] font-bold text-[#126F91] transition-colors hover:bg-sky-100 cursor-pointer"
              title={"Bài tiếp theo: " + nextProblem.title}
            >
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Bài tiếp</span>
            </button>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-1.5 rounded-xl bg-[#126F91] hover:bg-[#0F607E] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Đang chấm...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{isProgramming ? "Nộp bài chấm OJ" : "Nộp đáp án"}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Đóng phòng làm bài"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Main Area: 2 Columns (Problem Spec on Left | Code Editor on Right) */}
        <div ref={splitGridRef} style={{ "--workspace-split": splitRatio + "%" }} className="workspace-split-grid relative grid grid-cols-1 grid-rows-2 lg:grid-rows-1 flex-1 overflow-hidden">
          {/* Left Column: Problem Statement & Tests */}
          <div className="workspace-statement-panel border-b border-slate-200 lg:border-b-0 lg:border-r flex flex-col overflow-hidden">
            {/* Left Tabs */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setActiveTab("problem")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "problem" ? "bg-[#126F91] text-white" : "text-slate-500 hover:bg-sky-50 hover:text-[#126F91]"
                }`}
              >
                {statementPdf ? "Đề bài PDF" : "Đề bài LaTeX"}
              </button>
              <button
                type="button"
                onClick={openGuide}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "editorial" ? "bg-amber-500 text-white" : "text-slate-500 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                Hướng dẫn PDF
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("activity")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "activity" ? "bg-slate-700 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                Nhật ký làm bài ({activityLog.length})
              </button>
            </div>

            {/* Problem Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs leading-relaxed text-slate-600 font-sans">
              {activeTab === "problem" && (
                <>
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-[#F8FAFB] px-3 py-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500"><FileText className="h-3.5 w-3.5 text-[#126F91]" />{statementPdf ? "PDF đề bài" : "Mô tả LaTeX"}</span>
                      <button type="button" onClick={openGuide} className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 hover:underline"><Eye className="h-3.5 w-3.5" />Xem hướng dẫn</button>
                    </div>
                    {statementPdf ? (
                      <iframe title="PDF đề bài" src={statementPdf} className="h-72 w-full bg-slate-100" />
                    ) : (
                      <div className="mx-auto max-w-xl bg-white p-5 text-slate-700">
                        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] text-slate-400"><span>ÔN THI 360 · ĐỀ BÀI</span><span>Trang 1 / 1</span></div>
                        <h5 className="text-center text-sm font-bold text-[#123B68]">{problem?.title || "Dãy con tăng dài nhất (LIS)"}</h5>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-amber-700">Mô tả LaTeX thay thế</p>
                        <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-amber-100 bg-amber-50/60 p-3 font-mono text-[11px] leading-relaxed text-slate-600">{problem?.latexDescription || problem?.description || "Cho dãy số a₁, a₂, ..., aₙ. Hãy tìm độ dài dãy con tăng dài nhất."}</pre>
                        <div className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-500"><p><strong>Mã bài:</strong> {problem?.id || "DP_01"} · <strong>Loại:</strong> {questionTypeLabel}</p><p>PDF chính thức chưa được gắn cho bài này.</p></div>
                      </div>
                    )}
                  </div>
                  <div className={isProgramming && !statementPdf ? "" : "hidden"}>
                    <div className="mb-3 flex items-center justify-between gap-2"><h4 className="text-sm font-bold text-[#123B68]">Mô tả bài toán</h4><span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">LaTeX · bản thay thế</span></div>
                    <p>
                      Cho một dãy số nguyên gồm N phần tử: <code>a₁, a₂, ..., aₙ</code>. Hãy tìm độ dài của dãy con tăng dài nhất (các phần tử không nhất thiết phải liên tiếp, phần tử sau lớn hơn phần tử trước).
                    </p>
                  </div>

                  <div className={isProgramming && !statementPdf ? "" : "hidden"}>
                    <h4 className="text-xs font-bold text-[#126F91] mb-1">Dữ liệu vào (Input)</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      <li>Dòng đầu tiên chứa số nguyên dương <strong>N</strong> (1 ≤ N ≤ 100,000).</li>
                      <li>Dòng thứ hai chứa N số nguyên <strong>a₁, a₂, ..., aₙ</strong> (-10⁹ ≤ aᵢ ≤ 10⁹).</li>
                    </ul>
                  </div>

                  <div className={isProgramming && !statementPdf ? "" : "hidden"}>
                    <h4 className="text-xs font-bold text-[#126F91] mb-1">Dữ liệu ra (Output)</h4>
                    <p>In ra một số nguyên duy nhất là độ dài của dãy con tăng dài nhất tìm được.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-amber-700">Ví dụ minh họa</h4>
                      <button
                        onClick={() => handleCopySample("6\n1 2 5 3 4 7")}
                        className="text-[10.5px] text-[#126F91] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? "Đã chép" : "Sao chép test"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                        <span className="text-[10px] text-slate-400 font-sans block mb-1">Input:</span>
                        <pre className="text-emerald-700">6{"\n"}1 2 5 3 4 7</pre>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                        <span className="text-[10px] text-slate-400 font-sans block mb-1">Output:</span>
                        <pre className="text-sky-700">4</pre>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 italic">
                      Giải thích: Dãy con tăng dài nhất là [1, 2, 3, 4, 7] hoặc [1, 2, 5, 7] có độ dài lớn nhất là 4.
                    </p>
                  </div>
                </>
              )}

              {activeTab === "editorial" && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50 px-3 py-2"><span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-amber-800"><FileText className="h-3.5 w-3.5" />PDF hướng dẫn giải</span><span className="text-[10px] font-bold text-emerald-700">Đã ghi nhận mở</span></div>
                    {guidePdf ? <iframe title="PDF hướng dẫn giải" src={guidePdf} className="h-72 w-full bg-slate-100" /> : <div className="p-4 text-xs leading-relaxed text-slate-600">Bản hướng dẫn giải sẽ được hiển thị tại đây khi tài liệu PDF được gắn với mã bài.</div>}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <div className="mb-2 flex items-center justify-between gap-2"><h5 className="font-bold text-amber-800 text-xs">Hướng dẫn giải · PDF</h5><span className="text-[10px] font-bold text-amber-700">{guideViewed ? "Đã ghi nhận" : "Mở để xem"}</span></div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed">
                      Sử dụng mảng <code>lis[]</code> lưu phần tử nhỏ nhất kết thúc một dãy con tăng độ dài <code>i</code>. Với mỗi phần tử <code>x</code> trong mảng gốc, dùng hàm <code>lower_bound</code> để tìm vị trí thay thế thích hợp trong <code>lis[]</code>.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="workspace-activity-log space-y-2">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                    <div><p className="text-xs font-bold text-[#123B68]">Nhật ký làm bài</p><p className="mt-0.5 text-[10px] text-slate-500">Theo dõi thao tác trong phiên hiện tại, gồm cả chạy test và nộp bài.</p></div>
                    <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{activityLog.length} sự kiện</span>
                  </div>
                  <div className="space-y-2">
                    {activityLog.map((entry) => {
                      const ActivityIcon = entry.type === "submission" ? Send : entry.type === "test" ? Play : entry.type === "guide" ? Eye : entry.type === "attention" ? ShieldCheck : entry.type === "error" ? XCircle : Clock;
                      const iconClass = entry.type === "submission" ? "text-[#126F91] bg-sky-50" : entry.type === "test" ? "text-emerald-700 bg-emerald-50" : entry.type === "error" ? "text-rose-700 bg-rose-50" : entry.type === "guide" ? "text-amber-700 bg-amber-50" : "text-slate-500 bg-slate-100";
                      return <div key={entry.id} className="workspace-activity-item flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
                        <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-lg " + iconClass}><ActivityIcon className="h-4 w-4" /></span>
                        <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-xs font-bold text-slate-700">{entry.title}</p><time className="shrink-0 text-[10px] font-medium text-slate-400">{entry.time}</time></div><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{entry.detail}</p></div>
                      </div>;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="workspace-split-divider hidden lg:flex"
            role="separator"
            aria-label="Điều chỉnh độ rộng khu vực đề và khu vực làm bài"
            aria-orientation="vertical"
            aria-valuemin="32"
            aria-valuemax="68"
            aria-valuenow={Math.round(splitRatio)}
            tabIndex={0}
            onPointerDown={handleSplitPointerDown}
            onKeyDown={handleSplitKeyDown}
          >
            <span><GripVertical className="h-4 w-4" /></span>
          </div>

          {/* Right Column: Code Editor + Real-time Verdict */}
          <div className="workspace-answer-panel flex flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#126F91]"><Send className="h-3.5 w-3.5" />Khu vực nộp bài</span>
              <span className="text-[10px] font-medium text-slate-400">{isProgramming ? "Mã nguồn của bạn" : "Đáp án của bạn"}</span>
            </div>
            {isProgramming && <>
            {/* Editor Area */}
            <div className="flex flex-1 flex-col overflow-hidden p-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1.5 border-b border-slate-200">
                <span>Trình soạn thảo mã nguồn</span>
                <span>UTF-8 • Spaces: 4</span>
              </div>
              <div className="workspace-code-surface relative mt-2 min-h-0 flex-1 overflow-hidden rounded-xl border shadow-inner focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                <pre ref={codeHighlightRef} aria-hidden="true" className="workspace-code-preview pointer-events-none absolute inset-0 overflow-auto whitespace-pre p-3 font-mono text-xs leading-[1.7] sm:text-[13px]"><code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} /></pre>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={handleCodeScroll}
                  spellCheck={false}
                  aria-label="Mã nguồn bài làm"
                  className="code-highlight-input relative z-10 h-full w-full resize-none overflow-auto whitespace-pre bg-transparent p-3 font-mono text-xs leading-[1.7] text-transparent caret-[#126F91] outline-none selection:bg-sky-200/40 sm:text-[13px]"
                />
              </div>
            </div>
            </>}

            {!isProgramming && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <div className="mb-4 rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-[#126F91]"><Check className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">Khu vực trả lời</p><h4 className="text-sm font-bold text-[#123B68]">{questionTypeLabel}</h4></div></div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">Chọn hoặc nhập đáp án theo đúng định dạng của câu hỏi. Hệ thống sẽ lưu câu trả lời theo phiên làm bài.</p>
                </div>
                {questionType === "fill_answer" ? (
                  <label className="block rounded-2xl border border-slate-200 bg-white p-4 text-xs font-bold text-slate-700 shadow-sm">Đáp án của bạn
                    <input value={fillAnswer} onChange={(event) => setFillAnswer(event.target.value)} placeholder="Nhập đáp án..." className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#F8FAFB] px-3 text-sm font-medium outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                    <span className="mt-2 block text-[11px] font-normal text-slate-500">Không phân biệt khoảng trắng thừa; quy tắc chuẩn hóa được áp dụng khi chấm.</span>
                  </label>
                ) : (
                  <div className="space-y-2">
                    {answerOptions.map((option, index) => {
                      const isSelected = isMultipleChoice ? selectedAnswers.includes(option) : selectedAnswer === option;
                      return <label key={option} className={"flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 text-xs font-semibold shadow-sm transition-colors " + (isSelected ? "border-sky-300 bg-sky-50 text-sky-700" : "border-slate-200 text-slate-700 hover:border-sky-200")}>
                      <input type={isMultipleChoice ? "checkbox" : "radio"} name="workspace-answer" checked={isSelected} onChange={() => isMultipleChoice ? setSelectedAnswers((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]) : setSelectedAnswer(option)} className="h-4 w-4 accent-[#126F91]" />
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-500">{String.fromCharCode(65 + index)}</span><span>{option}</span>
                    </label>;
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Compact score summary */}
            {verdictResult && (
              <div className="workspace-score-card shrink-0 border-t border-slate-200 p-3.5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="workspace-score-badge inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-5 w-5" /></span>
                    <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">Điểm sau khi nộp</p><p className="truncate text-sm font-black text-[#123B68]">{verdictResult.score}/{verdictResult.maxScore} điểm <span className="text-xs font-bold text-emerald-700">· {verdictResult.verdict}</span></p></div>
                  </div>
                  <div className="flex items-center gap-2"><span className="text-[10px] font-medium text-slate-500">{passedTestCount} đúng · {failedTestCount} sai</span><button type="button" onClick={() => setResultOpen(true)} className="min-h-8 rounded-lg border border-sky-200 bg-sky-50 px-2.5 text-[10px] font-bold text-[#126F91] transition-colors hover:bg-sky-100">Xem chi tiết</button></div>
                </div>
              </div>
            )}

          </div>
        </div>

        {runnerOpen && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="runner-modal-title"
            onMouseDown={(event) => event.target === event.currentTarget && setRunnerOpen(false)}
          >
            <div className="workspace-runner-modal w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Play className="h-4 w-4" /></span>
                  <div><h3 id="runner-modal-title" className="text-sm font-bold text-[#123B68]">Chạy test</h3><p className="text-[10px] text-slate-500">Kiểm tra nhanh mã nguồn mà không ảnh hưởng lần nộp OJ.</p></div>
                </div>
                <button type="button" onClick={() => setRunnerOpen(false)} aria-label="Đóng cửa sổ chạy test" className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"><X className="h-4 w-4" /></button>
              </div>

              <div className="grid max-h-[78dvh] gap-4 overflow-y-auto p-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(250px,.85fr)] sm:p-5">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-600">Bộ test ví dụ
                    <select value={selectedTestId} onChange={handleSelectTest} className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100">
                      {availableTests.map((test) => <option key={test.id} value={test.id}>{test.label}</option>)}
                    </select>
                  </label>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-600">Cách đọc/ghi dữ liệu</span>
                    <div className="workspace-runner-mode mt-1 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <button type="button" onClick={() => setIoMode("stdio")} className={"min-h-9 rounded-lg px-2 text-[10px] font-bold transition-colors " + (ioMode === "stdio" ? "bg-[#126F91] text-white shadow-sm" : "text-slate-500 hover:bg-white")}>stdin / stdout</button>
                      <button type="button" onClick={() => setIoMode("file")} className={"min-h-9 rounded-lg px-2 text-[10px] font-bold transition-colors " + (ioMode === "file" ? "bg-[#126F91] text-white shadow-sm" : "text-slate-500 hover:bg-white")}>File input / output</button>
                    </div>
                  </div>

                  <label className="block text-[10px] font-bold text-slate-600">Dữ liệu đầu vào
                    <textarea value={customInput} onChange={(event) => setCustomInput(event.target.value)} rows={5} className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                  </label>

                  {selectedTestId === "custom" && <label className="block text-[10px] font-bold text-slate-600">Expected output <span className="font-normal text-slate-400">(tuỳ chọn)</span>
                    <textarea value={customExpected} onChange={(event) => setCustomExpected(event.target.value)} rows={3} placeholder="Nhập output đúng để đối chiếu" className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                  </label>}

                  {ioMode === "file" && <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] font-bold text-slate-600">Tên file input<input value={inputFileName} onChange={(event) => setInputFileName(event.target.value)} className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-medium outline-none focus:border-sky-400" /></label>
                    <label className="text-[10px] font-bold text-slate-600">Tên file output<input value={outputFileName} onChange={(event) => setOutputFileName(event.target.value)} className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-medium outline-none focus:border-sky-400" /></label>
                  </div>}
                </div>

                <div className="workspace-runner-result flex min-h-[220px] flex-col rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2"><span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#126F91]">Kết quả chạy test</span>{customOutput && !runnerError && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />Đã chạy</span>}</div>
                  {runnerError ? (
                    <div className="workspace-runner-error mt-3 rounded-xl border border-rose-100 bg-rose-50 p-3 text-[11px] leading-relaxed text-rose-700"><div className="flex items-center gap-1.5 font-bold"><XCircle className="h-4 w-4" />Không thể chạy test</div><p className="mt-1">{runnerError}</p></div>
                  ) : customOutput ? (
                    <pre className="workspace-runner-output mt-3 flex-1 whitespace-pre-wrap overflow-auto rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 font-mono text-[10px] leading-relaxed text-emerald-800">{customOutput}</pre>
                  ) : (
                    <div className="workspace-runner-empty flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-slate-400"><Play className="h-7 w-7 text-emerald-600/70" /><p className="text-[11px] leading-relaxed">Chọn bộ test, kiểm tra input rồi bấm “Chạy test”.</p></div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 sm:px-5">
                <p className="text-[10px] text-slate-400">{ioMode === "stdio" ? "Đọc stdin và ghi stdout." : "Đọc input file và ghi output file."}</p>
                <div className="flex items-center gap-2"><button type="button" onClick={() => setRunnerOpen(false)} className="min-h-9 rounded-xl border border-slate-200 px-3 text-[10.5px] font-bold text-slate-600 transition-colors hover:bg-slate-50">Đóng</button><button type="button" onClick={handleRunCustom} className="flex min-h-9 items-center gap-1.5 rounded-xl bg-[#126F91] px-3.5 text-[10.5px] font-bold text-white transition-colors hover:bg-[#0F607E]"><Play className="h-3.5 w-3.5" />Chạy test</button></div>
              </div>
            </div>
          </div>
        )}

        {resultOpen && verdictResult && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/45 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-result-title"
            onMouseDown={(event) => event.target === event.currentTarget && setResultOpen(false)}
          >
            <div className="workspace-result-modal w-full max-w-xl overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-2.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className={"grid h-8 w-8 place-items-center rounded-lg " + (failedTestCount > 0 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700")}>
                    {failedTestCount > 0 ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  </span>
                  <div><h3 id="submission-result-title" className="text-[13px] font-semibold text-[#123B68]">Kết quả nộp bài</h3><p className="text-[10px] text-slate-500">{isProgramming ? "Kết quả chấm theo từng test của OJ." : "Kết quả kiểm tra đáp án của câu hỏi."}</p></div>
                </div>
                <button type="button" onClick={() => setResultOpen(false)} aria-label="Đóng kết quả nộp bài" className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"><X className="h-4 w-4" /></button>
              </div>

              <div className="max-h-[76dvh] overflow-y-auto p-3.5 sm:p-4">
                <div className={"workspace-result-hero rounded-xl border p-3.5 " + (resultAccepted ? "workspace-result-hero-success" : "workspace-result-hero-failure")}>
                  <div className="flex items-center gap-3">
                    <span className={"workspace-result-hero-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl " + (resultAccepted ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
                      {resultAccepted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0 flex-1"><h4 className="text-[13px] font-semibold text-[#123B68]">{resultHeadline}</h4><p className="mt-0.5 text-[10.5px] leading-relaxed text-slate-500">{resultDescription}</p></div>
                    <div className="workspace-result-score-block shrink-0 border-l pl-3 text-right"><p className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">Điểm</p><p className="mt-0.5 text-xl font-black text-[#123B68]">{verdictResult.score}<span className="text-[11px] font-bold text-slate-400">/{verdictResult.maxScore}</span></p></div>
                  </div>
                  <div className="workspace-result-stat-strip mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2.5 text-[10px] text-slate-500"><span><strong className="text-emerald-700">{passedTestCount}</strong> test đúng</span><span><strong className="text-rose-700">{failedTestCount}</strong> test sai</span><span>Thời gian: <strong>{verdictResult.time}</strong></span><span>Bộ nhớ: <strong>{verdictResult.memory}</strong></span></div>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500"><span className={"rounded-md px-1.5 py-0.5 font-bold " + (resultAccepted ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>{verdictResult.verdict}</span><span>Loại: <strong>{isProgramming ? "Lập trình" : questionTypeLabel}</strong></span><span>Ngôn ngữ: <strong>{language === "cpp14" ? "C++14" : language === "python" ? "Python 3" : "C++17"}</strong></span></div>

                <div className="mt-3.5"><div className="mb-2 flex items-center justify-between gap-3"><h4 className="text-xs font-bold text-[#123B68]">Chi tiết từng test</h4><span className="text-[10px] text-slate-400">{resultTestDetails.length} mục</span></div><div className="space-y-1.5">
                  {resultTestDetails.map((test) => {
                    const passed = isPassedTest(test);
                    return <div key={test.id} className={"workspace-result-test flex items-center gap-2.5 rounded-lg border px-2.5 py-2 " + (passed ? "workspace-result-test-pass border-emerald-100 bg-emerald-50/50" : "workspace-result-test-fail border-rose-100 bg-rose-50/50")}>
                      <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-md " + (passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>{passed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-slate-700">{test.name || "Test " + test.id}</p><p className="mt-0.5 text-[9px] text-slate-500">Test {test.id} · {test.status}</p></div>
                      <div className="flex shrink-0 items-center gap-2"><div className="text-right"><p className={"text-[10px] font-bold " + (passed ? "text-emerald-700" : "text-rose-700")}>{passed ? "Đúng" : "Sai"}</p><p className="mt-0.5 text-[9px] text-slate-400">{test.time} · {test.mem}</p></div>{!passed && <button type="button" onClick={() => handleDownloadFailedTest(test)} aria-label={"Tải test sai " + test.id} title="Tải test này" className="grid h-7 w-7 place-items-center rounded-md border border-rose-200 text-rose-700 transition-colors hover:bg-rose-50"><Download className="h-3.5 w-3.5" /></button>}</div>
                    </div>;
                  })}
                </div></div>
              </div>

              <div className="flex items-center justify-end border-t border-slate-200 px-4 py-2.5 sm:px-5"><button type="button" onClick={() => setResultOpen(false)} className="min-h-8 rounded-lg bg-[#126F91] px-3.5 text-[10px] font-bold text-white transition-colors hover:bg-[#0F607E]">Đóng kết quả</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
