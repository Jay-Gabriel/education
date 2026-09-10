import React, { useState } from "react";
import {
  X,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Star,
  Bell,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Send,
  MessageSquare
} from "lucide-react";

export default function ClassDetailModal({ course, isOpen, onClose, onOpenCodeWorkspace, onOpenReview, onOpenLocked }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, syllabus, schedule, materials, reviews, announcements, members
  const [newReviewText, setNewReviewText] = useState("");
  const [ratingVal, setRatingVal] = useState(5);

  if (!isOpen || !course) return null;

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: BookOpen },
    { id: "syllabus", label: "Lộ trình & Bài tập", icon: Play },
    { id: "schedule", label: "Lịch học", icon: Calendar },
    { id: "materials", label: "Tài liệu gắn", icon: FileText },
    { id: "reviews", label: "Đánh giá (★ 4.9)", icon: Star },
    { id: "announcements", label: "Thông báo", icon: Bell },
    { id: "members", label: "Thành viên", icon: Users },
  ];

  const syllabusUnits = [
    {
      unit: "Chương 1: Kỹ thuật đệ quy và Quay lui nâng cao",
      lessons: [
        { id: "REC_01", title: "Bài 1: Đệ quy có nhớ và bài toán Phân tích số", status: "opened", type: "code", points: 100, attempts: 2, passed: true },
        { id: "REC_02", title: "Bài 2: Bài toán N-Queens và xếp mã trên bàn cờ", status: "opened", type: "code", points: 100, attempts: 1, passed: true },
        { id: "REC_03", title: "Bài 3: Trắc nghiệm: Độ phức tạp thuật toán quay lui", status: "opened", type: "quiz", questions: 10, passed: true },
      ]
    },
    {
      unit: "Chương 2: Quy hoạch động 1D và 2D chuyên sâu",
      lessons: [
        { id: "DP_01", title: "Bài 4: Dãy con tăng dài nhất (LIS O(N log N))", status: "opened", type: "code", points: 100, attempts: 3, passed: true },
        { id: "DP_02", title: "Bài 5: Bài toán Cái túi (Knapsack 0/1 & Unbounded)", status: "opened", type: "code", points: 100, attempts: 0, passed: false },
        { id: "DP_03", title: "Bài 6: Quy hoạch động trên lưới và bảng ma trận", status: "locked_progress", type: "code", points: 100, reason: "Giáo viên chưa mở bài này" },
      ]
    },
    {
      unit: "Chương 3: Cấu trúc dữ liệu nâng cao (Segment Tree & Fenwick)",
      lessons: [
        { id: "DS_01", title: "Bài 7: Xây dựng và truy vấn Range Minimum Query (RMQ)", status: "locked_progress", type: "code", points: 100, reason: "Giáo viên chưa mở bài này" },
        { id: "DS_02", title: "Bài 8: Lazy Propagation trên Segment Tree", status: "locked_access", type: "code", points: 100, reason: "Cần quyền học cá nhân để mở bài" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sky-100 overflow-hidden relative">
        {/* Header with Background Accent */}
        <div className="bg-gradient-to-r from-[#0050A0] via-[#0066CC] to-[#0284C7] p-4 sm:p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={course.image || "/assets/course-img-1.png"}
              alt={course.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 shadow-2xs">
                  {course.tag || "Lớp Chuyên Tin"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                  Mã lớp: {course.classCode || "10CT-2026"}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>4.9 (128 đánh giá đã xác thực)</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {course.title}
              </h2>
              <p className="text-xs text-sky-100 mt-1 line-clamp-1">
                Giảng viên: <strong>{course.instructor || "Thầy Nguyễn Tiến Thành (THPT Chuyên Thái Bình)"}</strong>
              </p>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mt-4 pt-3 border-t border-white/20">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-white text-[#0066CC] shadow-md"
                      : "text-white/80 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#F8FBFE]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs">
                <h4 className="text-sm font-bold text-[#0B3C78] mb-2">Giới thiệu lớp học</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lớp học được thiết kế chuyên biệt cho học sinh ôn thi HSG và vào lớp 10 Chuyên Tin các trường trọng điểm. Học sinh được học kiến thức giải thuật chuyên sâu, thực hành nộp bài trên hệ thống chấm tự động Online Judge với hàng trăm bài tập phân loại theo cấp độ.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl p-3.5 border border-sky-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    ⏱️
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Thời lượng</p>
                    <p className="text-xs font-bold text-slate-800">36 buổi (72 giờ)</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-sky-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    📝
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Hệ thống bài tập</p>
                    <p className="text-xs font-bold text-slate-800">120+ bài code OJ</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-sky-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    🎓
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Mục tiêu</p>
                    <p className="text-xs font-bold text-slate-800">Đỗ Chuyên Tin & HSG</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-amber-900">Tiến độ lớp học</h5>
                  <p className="text-[11px] text-amber-700 mt-0.5">Bạn đã hoàn thành 8/24 bài tập được giao (33%)</p>
                </div>
                <button
                  onClick={() => setActiveTab("syllabus")}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Vào làm bài ngay →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SYLLABUS & PROBLEMS */}
          {activeTab === "syllabus" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-sky-100">
                <span className="text-xs font-bold text-[#0B3C78]">Danh sách bài tập và đề đánh giá</span>
                <span className="text-[11px] text-slate-500">Giáo viên mở bài theo tuần học</span>
              </div>

              {syllabusUnits.map((u, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-2xs">
                  <div className="bg-slate-50/80 px-4 py-2.5 border-b border-sky-100 flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#0050A0]">{u.unit}</h5>
                    <span className="text-[10px] font-semibold text-slate-500">{u.lessons.length} bài học</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {u.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-sky-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {lesson.status === "opened" ? (
                            lesson.passed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : (
                              <Play className="w-5 h-5 text-blue-600 shrink-0" />
                            )
                          ) : (
                            <Lock className="w-5 h-5 text-slate-300 shrink-0" />
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800 truncate">{lesson.title}</span>
                              <span className="text-[9.5px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 font-mono">
                                {lesson.id}
                              </span>
                            </div>

                            {lesson.reason && (
                              <p className="text-[10px] text-amber-600 font-medium mt-0.5">{lesson.reason}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          {lesson.status === "opened" ? (
                            <button
                              onClick={() => {
                                onClose();
                                if (onOpenCodeWorkspace) onOpenCodeWorkspace(lesson);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{lesson.passed ? "Luyện lại" : "Làm bài"}</span>
                              <span className="font-bold">→</span>
                            </button>
                          ) : lesson.status === "locked_access" ? (
                            <button onClick={() => onOpenLocked?.()} className="text-[11px] font-bold text-amber-700 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer">Xem quyền</button>
                          ) : (
                            <span className="text-[11px] font-semibold text-slate-400 px-3 py-1 bg-slate-100 rounded-xl">Chưa mở</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="flex flex-col gap-3">
              {[
                { date: "Thứ Ba, 12/09/2026", time: "19:30 – 21:30", topic: "Buổi 12: Đồ thị nâng cao (Dijkstra & BFS cải tiến)", status: "Sắp diễn ra" },
                { date: "Thứ Năm, 14/09/2026", time: "19:30 – 21:30", topic: "Buổi 13: Cây khung nhỏ nhất (Kruskal & Prim)", status: "Đã lên lịch" },
                { date: "Thứ Bảy, 16/09/2026", time: "14:00 – 17:00", topic: "Kiểm tra định kỳ Chuyên đề Đồ thị (Đề 3 bài OJ)", status: "Bài kiểm tra" }
              ].map((sch, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-sky-100 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0066CC] flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{sch.topic}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sch.date} • {sch.time}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MATERIALS */}
          {activeTab === "materials" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-sky-100 flex items-center gap-3 shadow-2xs">
                <img src="/assets/book-img-2.png" alt="Sách" className="w-16 h-20 object-cover rounded-xl border border-slate-200" />
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Giáo trình chính</span>
                  <h5 className="text-xs font-bold text-slate-800 mt-1">Chuyên đề Cấu trúc dữ liệu & Giải thuật</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">200 trang • Bản mềm đã cấp quyền</p>
                  <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Đọc tài liệu →</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-sky-100 flex items-center gap-3 shadow-2xs">
                <img src="/assets/book-img-3.png" alt="Sách" className="w-16 h-20 object-cover rounded-xl border border-slate-200" />
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Tài liệu tham khảo</span>
                  <h5 className="text-xs font-bold text-slate-800 mt-1">Tuyển tập đề thi HSG Tin học các tỉnh</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">500+ đề thi có lời giải chi tiết</p>
                  <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Xem bộ đề →</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS (VERIFIED REVIEWS ACCORDING TO SPEC) */}
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {/* Rating Summary Header */}
              <div className="bg-white rounded-2xl p-4 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#0B3C78]">4.9</p>
                    <div className="flex items-center justify-center gap-0.5 text-amber-400 my-1">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-[10px] text-slate-400">128 đánh giá đã xác thực</p>
                  </div>

                  <div className="hidden sm:flex flex-col gap-1 border-l border-slate-100 pl-4 text-[11px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-24">Độ dễ hiểu & sư phạm:</span>
                      <strong className="text-emerald-600">5.0 / 5.0</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24">Chất lượng bài tập OJ:</span>
                      <strong className="text-emerald-600">4.9 / 5.0</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24">Hỗ trợ & giải đáp:</span>
                      <strong className="text-emerald-600">4.8 / 5.0</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenReview) onOpenReview(course);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0066CC] hover:bg-[#0050A0] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  ✍️ Viết đánh giá của bạn
                </button>
              </div>

              {/* Reviews List */}
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Học viên đã xác thực", role: "Học sinh lớp 10 Chuyên", date: "3 ngày trước", rating: 5, comment: "Thầy Thành giảng quy hoạch động cực kỳ dễ hiểu, bài tập trên hệ thống OJ có bộ test rất sát với đề thi HSG Quốc gia!" },
                  { name: "Phụ huynh đã xác thực", role: "Phụ huynh học sinh", date: "1 tuần trước", rating: 5, comment: "Tôi theo dõi được lịch học và tỷ lệ làm bài tập của con trên dashboard rất minh bạch. Con tiến bộ rõ rệt sau 2 tháng." },
                  { name: "Học viên đã xác thực", role: "Đạt Giải Nhì HSG Tỉnh 2025", date: "2 tuần trước", rating: 5, comment: "Nền tảng chấm bài nhanh và có giải thích test case rất rõ ràng. Cảm ơn thầy và Ôn Thi 360!" }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-3.5 border border-sky-100 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800">{rev.name}</span>
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {rev.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-bold mb-1">
                  <Bell className="w-4 h-4" />
                  <span>Thông báo thi thử định kỳ cuối tuần này</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Thầy thông báo toàn thể lớp sẽ tham gia đợt thi khảo sát năng lực Lập trình vào 19h30 tối Thứ 7 (16/09). Đề thi gồm 3 bài chấm trên OJ trong thời gian 120 phút. Các em nhớ ôn lại Quy hoạch động và Đồ thị!
                </p>
                <span className="text-[10px] text-slate-400 mt-2 block">Đăng bởi Thầy Nguyễn Tiến Thành • 1 ngày trước</span>
              </div>
            </div>
          )}

          {/* TAB 7: MEMBERS */}
          {activeTab === "members" && (
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs">
              <h5 className="text-xs font-bold text-[#0B3C78] mb-3">Danh sách thành viên lớp ({course.classCode || "10CT-2026"})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Nguyễn Minh Anh (Bạn)", role: "Học sinh", score: "9.8" },
                  { name: "Trần Đức Duy", role: "Học sinh", score: "9.6" },
                  { name: "Lê Phương Thảo", role: "Học sinh", score: "9.5" },
                  { name: "Phạm Hoàng Nam", role: "Học sinh", score: "9.3" }
                ].map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{m.name}</span>
                    <span className="font-bold text-blue-600">Điểm: {m.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-sky-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Khóa học có bản quyền của <strong>Ôn Thi 360</strong>
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => setActiveTab("syllabus")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-105 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Lộ trình bài tập →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
