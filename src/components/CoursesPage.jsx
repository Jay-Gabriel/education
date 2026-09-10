import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Users,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  KeyRound
} from "lucide-react";

export default function CoursesPage({ onOpenClassDetail, onOpenActivation }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Tất cả khóa học" },
    { id: "chuyen-tin", label: "Luyện thi Chuyên Tin 10" },
    { id: "hsg-qg", label: "Bồi dưỡng HSG Quốc Gia" },
    { id: "nen-tang", label: "Lập trình C++ & Python cơ bản" },
    { id: "thpt-qg", label: "Ôn thi Tốt nghiệp THPT 12" },
    { id: "usaco", label: "Thuật toán quốc tế & USACO" },
  ];

  const coursesList = [
    {
      id: "course-1",
      title: "Chuyên sâu Cấu trúc dữ liệu & Thuật toán HSG Quốc Gia",
      subtitle: "Quy hoạch động nâng cao, Cây phân đoạn (Segment Tree), Đồ thị và Luồng cực đại",
      category: "hsg-qg",
      grade: "Lớp 11–12",
      instructor: "Thầy Nguyễn Tiến Thành (THPT Chuyên Thái Bình)",
      instructorAvatar: "/assets/teacher-thanh.png",
      rating: 4.9,
      reviewCount: 142,
      lessonsCount: 36,
      studentCount: "1,250+",
      price: "1.200.000đ",
      scope: "Cần quyền học cá nhân / Mã kích hoạt",
      tag: "🏆 Đội tuyển HSG",
      image: "/assets/course-img-1.png",
      classCode: "HSG-QG-2026",
      featured: true
    },
    {
      id: "course-2",
      title: "Luyện thi vào lớp 10 Chuyên Tin học 2026",
      subtitle: "Chinh phục kỳ thi tuyển sinh Chuyên KHTN, Chuyên Sư Phạm, Chuyên Amsterdam",
      category: "chuyen-tin",
      grade: "Lớp 9",
      instructor: "Thầy Lê Minh Đức (Huấn luyện viên HSG TP. Hà Nội)",
      instructorAvatar: "/assets/testi-av-3.png?v=3",
      rating: 4.9,
      reviewCount: 198,
      lessonsCount: 42,
      studentCount: "2,400+",
      price: "950.000đ",
      scope: "Quyền học cá nhân",
      tag: "🎯 Mục tiêu trường Chuyên",
      image: "/assets/course-img-2.png",
      classCode: "10CT-2026",
      featured: true
    },
    {
      id: "course-3",
      title: "Lập trình C++ và Tư duy thuật toán cho học sinh 6–9",
      subtitle: "Nền tảng cú pháp C++17, mảng, xâu ký tự, hàm và các cấu trúc điều khiển cơ bản",
      category: "nen-tang",
      grade: "Lớp 6–9",
      instructor: "Cô Trần Phương Thảo (Giáo viên Chuyên Tin)",
      instructorAvatar: "/assets/testi-av-1.png?v=3",
      rating: 4.8,
      reviewCount: 86,
      lessonsCount: 24,
      studentCount: "3,100+",
      price: "650.000đ",
      scope: "Mở tự do Chương 1",
      tag: "🌱 Nền tảng lập trình",
      image: "/assets/course-img-3.png",
      classCode: "CPP-BASIC-2026",
      featured: false
    },
    {
      id: "course-4",
      title: "Tổng ôn cấp tốc 9+ môn Tin học kỳ thi Tốt nghiệp THPT",
      subtitle: "Bám sát định dạng đề thi mới GDPT, 50 đề thi thử trắc nghiệm & điền đáp án chuẩn",
      category: "thpt-qg",
      grade: "Lớp 12",
      instructor: "Tổ chuyên môn Ôn Thi 360",
      instructorAvatar: "/assets/teacher-thanh.png",
      rating: 4.9,
      reviewCount: 165,
      lessonsCount: 30,
      studentCount: "4,500+",
      price: "450.000đ",
      scope: "Quyền học cá nhân",
      tag: "⚡ Bứt phá điểm 9+",
      image: "/assets/course-img-4.png",
      classCode: "THPT-2026",
      featured: false
    },
    {
      id: "course-5",
      title: "Luyện thi USACO Bronze & Silver Division",
      subtitle: "Thuật toán quốc tế, bài tập USACO chuẩn tiếng Anh, chuẩn bị hồ sơ du học Tech",
      category: "usaco",
      grade: "Lớp 10–12",
      instructor: "GS. Trần Đăng Khoa (Cố vấn học thuật Quốc tế)",
      instructorAvatar: "/assets/teacher-thanh.png",
      rating: 5.0,
      reviewCount: 74,
      lessonsCount: 32,
      studentCount: "820+",
      price: "1.800.000đ",
      scope: "Quyền học cá nhân",
      tag: "✈️ Vươn ra thế giới",
      image: "/assets/course-img-5.png",
      classCode: "USACO-2026",
      featured: true
    },
    {
      id: "course-6",
      title: "Lập trình Python căn bản & Ứng dụng giải toán THCS",
      subtitle: "Học lập trình qua trực quan hóa, turtle đồ họa, cấu trúc dữ liệu list và dictionary",
      category: "nen-tang",
      grade: "Lớp 6–8",
      instructor: "Thầy Nguyễn Tiến Thành",
      instructorAvatar: "/assets/teacher-thanh.png",
      rating: 4.8,
      reviewCount: 92,
      lessonsCount: 20,
      studentCount: "1,850+",
      price: "550.000đ",
      scope: "Quyền học cá nhân",
      tag: "🐍 Python thiếu nhi",
      image: "/assets/course-img-1.png",
      classCode: "PY-THCS-2026",
      featured: false
    }
  ];

  const filteredCourses = coursesList.filter((c) => {
    const matchCat = selectedCategory === "all" || c.category === selectedCategory;
    const matchGrade = selectedGrade === "all" || c.grade.includes(selectedGrade);
    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchGrade && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. COURSES HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0B3C78] via-[#0050A0] to-[#0284C7] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-courses-hero-v1.png"
          alt="Courses banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-40 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chương trình đào tạo chuẩn Chuyên & HSG</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Khóa học & Lớp học Tin học 360
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Hệ thống khóa học bài bản từ lớp 6–12, tích hợp chấm bài tự động trên Online Judge, giáo trình bản quyền và đội ngũ giáo viên trường Chuyên hàng đầu Việt Nam.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <button
              onClick={onOpenActivation}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
            >
              <KeyRound className="w-4 h-4" />
              <span>Kích hoạt mã lớp học</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-sky-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Chấm tự động OJ 24/7</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 w-full md:w-80 text-center shadow-xl">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider">Thống kê khóa học</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-white/10 rounded-2xl p-2.5">
              <p className="text-2xl font-black text-white">45+</p>
              <p className="text-[10px] text-sky-200 mt-0.5">Khóa & Lớp học</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5">
              <p className="text-2xl font-black text-amber-300">12,000+</p>
              <p className="text-[10px] text-sky-200 mt-0.5">Học viên tham gia</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, chuyên đề, giáo viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F0F6FC] border border-sky-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 shrink-0">Khối lớp:</span>
          {["all", "Lớp 6–9", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedGrade === g
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {g === "all" ? "Tất cả" : g}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY PILL TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-[#0066CC] to-[#0050A0] text-white shadow-sm shadow-blue-500/20 scale-102"
                : "bg-white text-slate-700 hover:bg-sky-50 border border-sky-100 shadow-2xs"
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-sky-100/90 shadow-[0_4px_16px_rgba(0,100,220,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-sky-200 transition-all duration-300 group"
          >
            <div>
              {/* Course Image Header */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-white/95 text-[#0050A0] border border-sky-200 shadow-2xs backdrop-blur-xs">
                    {course.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{course.lessonsCount} bài học</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-300" />
                    <span>{course.studentCount} học viên</span>
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    Khối: {course.grade}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-[10px] text-slate-400">({course.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-[#0B3C78] leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {course.subtitle}
                </p>

                {/* Instructor Card */}
                <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#F8FBFE] border border-sky-100">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full object-cover border border-sky-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold text-slate-800 truncate">{course.instructor}</p>
                    <p className="text-[9.5px] text-slate-400 truncate">Giảng viên phụ trách</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="p-4 pt-0 sm:p-5 sm:pt-0">
              <div className="pt-3 border-t border-sky-100/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Học phí trọn khóa</p>
                  <p className="text-sm sm:text-base font-black text-[#0B3C78]">{course.price}</p>
                </div>

                <button
                  onClick={() => onOpenClassDetail(course)}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-105 active:scale-98 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Xem chi tiết lớp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredCourses.length === 0 && <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-sky-300"/><h2 className="mt-3 text-sm font-black text-slate-800">Không tìm thấy khóa học phù hợp</h2><p className="mt-1 text-xs text-slate-500">Thử đổi khối lớp, danh mục hoặc từ khóa tìm kiếm.</p><button onClick={() => { setSelectedCategory("all"); setSelectedGrade("all"); setSearchQuery(""); }} className="mt-4 text-xs font-bold text-blue-600">Xóa bộ lọc</button></div>}
    </div>
  );
}
