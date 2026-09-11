import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  Search,
  Filter,
  Star,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Globe2,
  KeyRound,
  MapPin,
  LockKeyhole,
  PlayCircle,
  Video,
  Target,
  Trophy,
  UserPlus
} from "lucide-react";

export default function CoursesPage({ onOpenClassDetail, onOpenActivation }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // [COURSES-00] DANH MỤC LỚP HỌC — icon SVG và màu pastel theo spec, không dùng emoji.
  const categories = [
    { id: "all", label: "Tất cả lớp học", icon: BookOpen, iconTone: "text-[#2D7FA3]", surface: "bg-[#EAF5F8] border-[#C9DFE8]" },
    { id: "chuyen-tin", label: "Chuyên Tin 10", icon: Target, iconTone: "text-[#4C83B0]", surface: "bg-[#EEF5FF] border-[#D4E3F7]" },
    { id: "hsg-qg", label: "HSG Quốc gia", icon: Trophy, iconTone: "text-[#AF7C32]", surface: "bg-[#FFF7E3] border-[#F2E1B6]" },
    { id: "nen-tang", label: "C++ & Python cơ bản", icon: Code2, iconTone: "text-[#3B9374]", surface: "bg-[#EFF9F5] border-[#D4EDE2]" },
    { id: "thpt-qg", label: "Tốt nghiệp THPT 12", icon: GraduationCap, iconTone: "text-[#786BB1]", surface: "bg-[#F2F0FF] border-[#E0DBF7]" },
    { id: "usaco", label: "Thuật toán quốc tế", icon: Globe2, iconTone: "text-[#B86C6C]", surface: "bg-[#FFF1F0] border-[#F3D8D6]" },
  ];

  const coursesList = [
    {
      id: "course-1",
      title: "Chuyên sâu Cấu trúc dữ liệu & Thuật toán HSG Quốc Gia",
      program: "Bồi dưỡng HSG Quốc gia",
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
      tag: "Đội tuyển HSG",
      image: "/assets/course-img-1.png",
      classCode: "HSG-QG-2026",
      location: "Trực tuyến",
      address: "Phòng HSG 360 · Thái Bình",
      format: "Live + ghi hình",
      seats: "32 / 40 học sinh",
      enrollmentStatus: "Vào học",
      assistants: ["/assets/testi-av-1.png?v=3", "/assets/testi-av-2.png?v=3"],
      featured: true
    },
    {
      id: "course-2",
      title: "Luyện thi vào lớp 10 Chuyên Tin học 2026",
      program: "Luyện thi Chuyên Tin 10",
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
      tag: "Mục tiêu trường Chuyên",
      image: "/assets/course-img-2.png",
      classCode: "10CT-2026",
      location: "Trực tuyến",
      address: "Phòng Chuyên Tin 360",
      format: "Live + ghi hình",
      seats: "28 / 35 học sinh",
      enrollmentStatus: "Đăng ký học",
      assistants: ["/assets/testi-av-1.png?v=3", "/assets/testi-av-3.png?v=3"],
      featured: true
    },
    {
      id: "course-3",
      title: "Lập trình C++ và Tư duy thuật toán cho học sinh 6–9",
      program: "Lập trình nền tảng",
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
      tag: "Nền tảng lập trình",
      image: "/assets/course-img-3.png",
      classCode: "CPP-BASIC-2026",
      location: "Online & CLB",
      address: "Cơ sở học tập Ôn Thi 360",
      format: "Kết hợp",
      seats: "64 / 80 học sinh",
      enrollmentStatus: "Vào học",
      assistants: ["/assets/testi-av-2.png?v=3", "/assets/testi-av-3.png?v=3"],
      featured: false
    },
    {
      id: "course-4",
      title: "Tổng ôn cấp tốc 9+ môn Tin học kỳ thi Tốt nghiệp THPT",
      program: "Ôn thi Tốt nghiệp THPT 12",
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
      tag: "Bứt phá điểm 9+",
      image: "/assets/course-img-4.png",
      classCode: "THPT-2026",
      location: "Trực tuyến",
      address: "Phòng ôn thi 360",
      format: "Tự học + chữa bài",
      seats: "150 / 150 học sinh",
      enrollmentStatus: "Đã đóng",
      assistants: ["/assets/testi-av-1.png?v=3", "/assets/testi-av-2.png?v=3"],
      featured: false
    },
    {
      id: "course-5",
      title: "Luyện thi USACO Bronze & Silver Division",
      program: "Thuật toán quốc tế & USACO",
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
      tag: "Vươn ra thế giới",
      image: "/assets/course-img-5.png",
      classCode: "USACO-2026",
      location: "Trực tuyến",
      address: "Lớp quốc tế 360",
      format: "Live bằng tiếng Anh",
      seats: "18 / 24 học sinh",
      enrollmentStatus: "Đăng ký học",
      assistants: ["/assets/testi-av-2.png?v=3", "/assets/testi-av-3.png?v=3"],
      featured: true
    },
    {
      id: "course-6",
      title: "Lập trình Python căn bản & Ứng dụng giải toán THCS",
      program: "Lập trình nền tảng",
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
      tag: "Python thiếu nhi",
      image: "/assets/course-img-1.png",
      classCode: "PY-THCS-2026",
      location: "Trực tuyến",
      address: "Phòng Python 360",
      format: "Tự học + hỗ trợ",
      seats: "46 / 60 học sinh",
      enrollmentStatus: "Đăng ký học",
      assistants: ["/assets/testi-av-1.png?v=3", "/assets/testi-av-3.png?v=3"],
      featured: false
    }
  ];

  const filteredCourses = coursesList.filter((c) => {
    const matchCat = selectedCategory === "all" || c.category === selectedCategory;
    const matchGrade = selectedGrade === "all" || c.grade.includes(selectedGrade);
    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchGrade && matchSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
  const visibleCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // [COURSES-05] PHÂN TRANG — bộ lọc mới luôn bắt đầu từ trang 1, tránh trạng thái danh sách rỗng.
  useEffect(() => { setCurrentPage(1); }, [selectedCategory, selectedGrade, searchQuery]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* [COURSES-01] HERO LỚP HỌC — tạo điểm nhấn vừa đủ, không dùng tiêu đề quá lớn như banner quảng cáo. */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-r from-[#0B3C78] via-[#0050A0] to-[#0284C7] p-5 text-white shadow-[0_10px_35px_rgba(0,100,220,0.08)] sm:p-6 lg:p-7">
        <img
          src="/assets/generated-courses-hero-v1.png"
          alt="Minh họa lớp học Tin học 360"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-40 mix-blend-overlay"
        />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold text-sky-50 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chương trình đào tạo chuẩn Chuyên & HSG</span>
          </div>

          <h1 className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
            Lớp học Tin học 360
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-5 text-sky-100 sm:text-sm sm:leading-6">
            Mỗi khóa học gồm các lớp theo khối, mục tiêu và hình thức học riêng; tích hợp chấm bài tự động, giáo trình bản quyền và đội ngũ giáo viên trường Chuyên.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenActivation}
              type="button"
              className="flex min-h-10 items-center gap-1.5 rounded-xl bg-[#FFF1C7] px-4 py-2 text-[11px] font-extrabold text-[#76551A] shadow-sm transition-all hover:bg-[#FFE6A1] active:scale-[.98]"
            >
              <KeyRound className="w-4 h-4" />
              <span>Kích hoạt mã lớp học</span>
            </button>
            <div className="flex items-center gap-2 text-[11px] font-medium text-sky-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Chấm tự động OJ 24/7</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-slate-950/10 p-3 text-center shadow-lg backdrop-blur-md lg:w-72 lg:shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-[.08em] text-sky-100">Quy mô hệ thống</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/10 p-2.5">
              <p className="text-xl font-black text-white">45+</p>
              <p className="mt-0.5 text-[11px] text-sky-100">Lớp học</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2.5">
              <p className="text-xl font-black text-[#FFE08A]">12,000+</p>
              <p className="mt-0.5 text-[11px] text-sky-100">Học viên</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* [COURSES-02] BỘ LỌC — một mặt phẳng trung tính, ưu tiên tìm kiếm và lọc nhanh. */}
      <div className="flex flex-col gap-3 rounded-3xl border border-[#DDEAF0] bg-white p-3.5 shadow-[0_2px_10px_rgba(28,91,121,0.04)] lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71869A]" />
          <input
            type="text"
            aria-label="Tìm kiếm lớp học"
            placeholder="Tìm kiếm khóa học, lớp học, chuyên đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-11 w-full rounded-2xl border border-[#DDEAF0] bg-[#F8FAFB] py-2 pl-10 pr-4 text-xs text-slate-800 placeholder:text-[#8A9BAD] transition-all focus:border-[#9DC8D7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#EAF5F8]"
          />
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="type-label shrink-0 text-[#536D86]">Khối lớp:</span>
          {["all", "Lớp 6–9", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"].map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setSelectedGrade(g)}
              aria-pressed={selectedGrade === g}
              className={`min-h-9 rounded-xl border px-3 py-1 text-[11px] font-bold transition-all whitespace-nowrap ${
                selectedGrade === g
                  ? "border-[#126F91] bg-[#126F91] text-white shadow-[0_4px_10px_rgba(18,111,145,0.18)]"
                  : "border-transparent bg-[#F5F8FA] text-[#536D86] hover:border-[#C9DFE8] hover:bg-white"
              }`}
            >
              {g === "all" ? "Tất cả" : g}
            </button>
          ))}
        </div>
      </div>

      {/* [COURSES-03] TAB CHUYÊN MỤC — icon Lucide và trạng thái chọn theo hệ màu pastel của spec. */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            aria-pressed={selectedCategory === cat.id}
            className={`flex min-h-10 items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-[11px] font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? "border-[#126F91] bg-[#126F91] text-white shadow-[0_4px_10px_rgba(18,111,145,0.18)]"
                : `${cat.surface} text-[#536D86] hover:brightness-[.98] hover:shadow-[0_2px_8px_rgba(28,91,121,0.06)]`
            }`}
          >
            <span className={`grid h-5 w-5 place-items-center rounded-lg ${selectedCategory === cat.id ? "bg-white/15" : "bg-white"}`}><cat.icon className={`h-3.5 w-3.5 ${selectedCategory === cat.id ? "text-white" : cat.iconTone}`} /></span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-[11px] text-[#71869A]">
          <Filter className="h-3.5 w-3.5 text-[#2D7FA3]" />
          <span>Hiển thị <b className="text-[#536D86]">{filteredCourses.length}</b> lớp học phù hợp</span>
        </div>
        <span className="hidden text-[11px] text-[#8A9BAD] sm:inline">Cập nhật theo mục tiêu học tập của bạn</span>
      </div>

      {/* [COURSES-04] LƯỚI LỚP HỌC — card đồng chiều cao, ảnh minh họa không bị cắt và typography theo thang card 12–14px. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {visibleCourses.map((course) => (
          <div
            key={course.id}
            className="group flex min-h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#DDEAF0] bg-white shadow-[0_4px_16px_rgba(28,91,121,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9DFE8] hover:shadow-[0_12px_28px_rgba(28,91,121,0.1)]"
          >
            <div>
              {/* Course Image Header */}
              <div className="relative h-44 overflow-hidden bg-[#F5F8FA] sm:h-48">
                <div className={`absolute inset-x-0 top-0 z-10 h-1 ${course.featured ? "bg-gradient-to-r from-[#F6C453] via-[#F9D778] to-[#2D7FA3]" : "bg-gradient-to-r from-[#78C7D5] to-[#B7E5E7]"}`} />
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9DFE8] bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#216F8E] shadow-sm backdrop-blur-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-md bg-[#EAF5F8]">{course.featured ? <Trophy className="h-3.5 w-3.5 text-[#AF7C32]" /> : <Sparkles className="h-3.5 w-3.5 text-[#2D7FA3]" />}</span>
                    {course.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-900/60 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
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
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#C9DFE8] bg-[#EAF5F8] px-2 py-1 text-[11px] font-extrabold text-[#216F8E]">
                    <GraduationCap className="h-3.5 w-3.5 text-[#2D7FA3]" />
                    {course.grade}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#AF7C32]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-[11px] font-medium text-[#8A9BAD]">({course.reviewCount})</span>
                  </div>
                </div>
                {/* [COURSES-04B] QUAN HỆ KHÓA–LỚP — luôn nói rõ card là một lớp thuộc khóa học nào. */}
                <div className="mb-1.5 flex min-w-0 items-center gap-1.5 text-[11px] text-[#536D86]">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#EEF5FF]"><BookOpen className="h-3.5 w-3.5 text-[#4C83B0]" /></span>
                  <span className="shrink-0">Khóa học:</span>
                  <button type="button" aria-pressed={selectedCategory === course.category} aria-label={`Lọc các lớp thuộc khóa học ${course.program}`} onClick={() => setSelectedCategory(course.category)} className="min-w-0 truncate text-left font-bold text-[#2D7FA3] underline-offset-2 transition hover:text-[#126F91] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBEAF1]" title={`Lọc theo khóa học: ${course.program}`}>{course.program}</button>
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.08em] text-[#8A9BAD]">Mã lớp · {course.classCode}</p>

                <h3 className="mb-1.5 line-clamp-2 text-sm font-extrabold leading-5 text-[#123B68] transition-colors group-hover:text-[#126F91] sm:text-[15px]">
                  {course.title}
                </h3>

                <p className="type-body mb-3 line-clamp-2">
                  {course.subtitle}
                </p>

                {/* [COURSES-04A] THÔNG TIN LỚP — địa điểm, địa chỉ và hình thức học trong một dải gọn. */}
                <div className="mb-3 grid grid-cols-2 gap-x-3 gap-y-2 border-y border-[#E7EFF3] py-3 text-[11px] text-[#536D86]">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2D7FA3]" />
                    <span className="truncate" title={course.location}>{course.location}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Video className="h-3.5 w-3.5 shrink-0 text-[#3B9374]" />
                      <span className="truncate" title={course.format}>{course.format}</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#71869A]" />
                    <span className="truncate" title={course.address}>{course.address}</span>
                  </div>
                  <div className="col-span-2 flex min-w-0 items-center gap-1.5 text-[#536D86]">
                    <Users className="h-3.5 w-3.5 shrink-0 text-[#4C83B0]" />
                    <span className="shrink-0 font-semibold text-[#71869A]">Sĩ số:</span>
                    <span className="truncate text-[11px] font-bold text-[#376B98]" title={`${course.seats} đã đăng ký / tối đa nhận`}>{course.seats}</span>
                  </div>
                </div>

                {/* Instructor Card */}
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#DDEAF0] bg-[#F8FAFB] p-2.5">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full object-cover border border-sky-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="truncate text-[11px] font-bold text-slate-800">{course.instructor}</p>
                    <p className="truncate text-[11px] text-[#71869A]">Giảng viên phụ trách</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <div className="flex -space-x-1.5" aria-label="Các trợ giảng đồng hành">
                        {course.assistants.map((avatar, index) => <img key={avatar} src={avatar} alt={`Trợ giảng ${index + 1}`} className="h-4 w-4 rounded-full border border-white object-cover" />)}
                      </div>
                      <span className="truncate text-[11px] text-[#71869A]">Trợ giảng đồng hành</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between gap-3 border-t border-[#DDEAF0] pt-3">
                <div>
                  <p className="type-meta">Học phí trọn khóa</p>
                  <p className="text-sm font-black text-[#123B68]">{course.price}</p>
                  <p className="type-meta mt-0.5 max-w-[150px] truncate" title={course.scope}>{course.scope}</p>
                </div>

                <button
                  type="button"
                  onClick={() => course.enrollmentStatus !== "Đã đóng" && onOpenClassDetail(course)}
                  disabled={course.enrollmentStatus === "Đã đóng"}
                  className={`flex min-h-10 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[11px] font-extrabold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CBEAF1] active:scale-[.98] ${course.enrollmentStatus === "Đã đóng" ? "cursor-not-allowed bg-[#F1F4F6] text-[#8A9BAD]" : course.enrollmentStatus === "Vào học" ? "bg-gradient-to-r from-[#2D7FA3] to-[#3B9374] text-white shadow-[0_5px_12px_rgba(45,127,163,0.18)] hover:brightness-105" : "bg-gradient-to-r from-[#126F91] to-[#188DB0] text-white shadow-[0_5px_12px_rgba(18,111,145,0.18)] hover:from-[#0F607E] hover:to-[#147D9B]"}`}
                >
                  <span>{course.enrollmentStatus}</span>
                  {course.enrollmentStatus === "Đăng ký học" && <UserPlus className="h-3.5 w-3.5" />}
                  {course.enrollmentStatus === "Vào học" && <PlayCircle className="h-3.5 w-3.5" />}
                  {course.enrollmentStatus === "Đã đóng" && <LockKeyhole className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredCourses.length > pageSize && <nav aria-label="Phân trang lớp học" className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-[#DDEAF0] bg-white p-2.5 sm:flex-row">
        <span className="text-[11px] text-[#71869A]">Trang <b className="text-[#536D86]">{currentPage}</b> / {totalPages}</span>
        <div className="flex items-center gap-1.5">
          <button type="button" aria-label="Trang trước" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="grid h-9 w-9 place-items-center rounded-xl border border-[#DDEAF0] text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} aria-label={`Trang ${page}`} aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 text-[11px] font-extrabold transition ${currentPage === page ? "bg-[#126F91] text-white shadow-[0_3px_8px_rgba(18,111,145,0.18)]" : "border border-transparent text-[#536D86] hover:border-[#C9DFE8] hover:bg-[#F8FAFB]"}`}>{page}</button>)}
          <button type="button" aria-label="Trang sau" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="grid h-9 w-9 place-items-center rounded-xl border border-[#DDEAF0] text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </nav>}
      {filteredCourses.length === 0 && <div className="rounded-3xl border border-dashed border-[#C9DFE8] bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-[#9DC8D7]"/><h2 className="mt-3 text-sm font-black text-[#123B68]">Không tìm thấy lớp học phù hợp</h2><p className="mt-1 text-xs text-[#71869A]">Thử đổi khối lớp, danh mục hoặc từ khóa tìm kiếm.</p><button type="button" onClick={() => { setSelectedCategory("all"); setSelectedGrade("all"); setSearchQuery(""); }} className="mt-4 text-[11px] font-bold text-[#126F91] hover:underline">Xóa bộ lọc</button></div>}
    </div>
  );
}
