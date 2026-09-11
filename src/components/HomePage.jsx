import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  Code,
  FileText,
  Trophy,
  BarChart2,
  Users,
  Info,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Bell,
  CheckCircle2,
  HelpCircle,
  Headphones,
  Heart,
  Target,
  GraduationCap,
  LockKeyhole,
  Sparkles,
  Award
} from "lucide-react";

const SYSTEM_NOTICES = [
  {
    category: "Kỳ thi",
    message: "Kỳ thi HSG Tin học cấp tỉnh năm học 2025–2026 sắp diễn ra. Hãy chuẩn bị thật tốt!",
    surfaceClass: "from-[#FFF9E6] via-[#FCFBF5] to-[#F1F7FC]",
    borderClass: "border-amber-200/80",
    accentClass: "bg-amber-300",
    categoryClass: "border-amber-200 bg-amber-50 text-amber-800",
    iconClass: "text-amber-500"
  },
  {
    category: "Lịch học",
    message: "Lịch học lớp Toán Tin 10A1 tuần này đã được cập nhật. Xem lịch để không bỏ lỡ buổi học.",
    surfaceClass: "from-[#EFF8FF] via-[#F7FBFE] to-[#F2F8F6]",
    borderClass: "border-sky-200/80",
    accentClass: "bg-sky-400",
    categoryClass: "border-sky-200 bg-sky-50 text-sky-800",
    iconClass: "text-sky-500"
  },
  {
    category: "Bài tập mới",
    message: "Bài tập mới: Cấu trúc dữ liệu cơ bản đã sẵn sàng trong mục Luyện tập.",
    surfaceClass: "from-[#EEF9F5] via-[#F8FCFB] to-[#F2F7FD]",
    borderClass: "border-emerald-200/80",
    accentClass: "bg-emerald-400",
    categoryClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
    iconClass: "text-emerald-500"
  }
];

const JOURNEY_ROLE_VIEWS = {
  student: {
    label: "Học sinh",
    icon: GraduationCap,
    iconClass: "text-[#2D7FA3]",
    progress: 65,
    progressLabel: "Tiến độ tổng thể",
    nextLabel: "Tiếp tục học",
    nextTitle: "Bài 12: Cấu trúc dữ liệu và giải thuật",
    nextMeta: "Còn khoảng 18 phút",
    stats: [
      { value: "12", label: "Bài đã xong", valueClass: "text-[#3E79A4]" },
      { value: "8", label: "Đang học", valueClass: "text-[#3B9374]" },
      { value: "3", label: "Chưa học", valueClass: "text-[#AF7C32]" }
    ]
  },
  parent: {
    label: "Phụ huynh",
    icon: Heart,
    iconClass: "text-[#4C88A1]",
    contextLabel: "Con đang theo dõi",
    contexts: [
      {
        label: "Tất cả 2 con",
        progress: 78,
        progressLabel: "Tiến độ trung bình của các con",
        nextLabel: "Cần đồng hành",
        nextTitle: "Minh Anh đã hoàn thành 4 bài trong tuần",
        nextMeta: "Minh Anh · Lớp 10A1 · Cập nhật hôm nay",
        stats: [
          { value: "7", label: "Bài tuần này", valueClass: "text-[#3E79A4]" },
          { value: "89%", label: "Đúng trung bình", valueClass: "text-[#3B9374]" },
          { value: "2", label: "Cần hỗ trợ", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "Minh Anh · 10A1",
        progress: 82,
        progressLabel: "Tiến độ của Minh Anh",
        nextLabel: "Cần đồng hành",
        nextTitle: "Đã hoàn thành 4 bài trong tuần",
        nextMeta: "Lớp 10A1 · Cập nhật hôm nay",
        stats: [
          { value: "4", label: "Bài tuần này", valueClass: "text-[#3E79A4]" },
          { value: "92%", label: "Đúng trung bình", valueClass: "text-[#3B9374]" },
          { value: "5h20", label: "Thời gian học", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "Gia Hân · 7A2",
        progress: 74,
        progressLabel: "Tiến độ của Gia Hân",
        nextLabel: "Gợi ý đồng hành",
        nextTitle: "Ôn lại 2 bài trước khi sang chuyên đề mới",
        nextMeta: "Lớp 7A2 · Cập nhật hôm qua",
        stats: [
          { value: "3", label: "Bài tuần này", valueClass: "text-[#3E79A4]" },
          { value: "86%", label: "Đúng trung bình", valueClass: "text-[#3B9374]" },
          { value: "1", label: "Cần hỗ trợ", valueClass: "text-[#AF7C32]" }
        ]
      }
    ]
  },
  teacher: {
    label: "Giáo viên",
    icon: Users,
    iconClass: "text-[#5B77A8]",
    contextLabel: "Lớp đang quản lý",
    contexts: [
      {
        label: "Tất cả 4 lớp",
        progress: 84,
        progressLabel: "Tiến độ trung bình các lớp",
        nextLabel: "Cần theo dõi",
        nextTitle: "9 học sinh cần hỗ trợ ở chuyên đề hiện tại",
        nextMeta: "4 lớp · Báo cáo cập nhật hôm nay",
        stats: [
          { value: "126", label: "Học sinh", valueClass: "text-[#3E79A4]" },
          { value: "84%", label: "Hoàn thành", valueClass: "text-[#3B9374]" },
          { value: "18", label: "Bài chờ chấm", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "10A1 · Toán Tin",
        progress: 84,
        progressLabel: "Tiến độ lớp 10A1",
        nextLabel: "Cần theo dõi",
        nextTitle: "3 học sinh cần hỗ trợ ở chuyên đề hiện tại",
        nextMeta: "32 học sinh · Xem báo cáo lớp",
        stats: [
          { value: "32", label: "Học sinh", valueClass: "text-[#3E79A4]" },
          { value: "84%", label: "Hoàn thành", valueClass: "text-[#3B9374]" },
          { value: "6", label: "Bài chờ chấm", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "10A2 · Cơ bản",
        progress: 76,
        progressLabel: "Tiến độ lớp 10A2",
        nextLabel: "Cần theo dõi",
        nextTitle: "4 học sinh chưa hoàn thành bài tuần này",
        nextMeta: "30 học sinh · Xem báo cáo lớp",
        stats: [
          { value: "30", label: "Học sinh", valueClass: "text-[#3E79A4]" },
          { value: "76%", label: "Hoàn thành", valueClass: "text-[#3B9374]" },
          { value: "5", label: "Bài chờ chấm", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "11A1 · Chuyên đề",
        progress: 88,
        progressLabel: "Tiến độ lớp 11A1",
        nextLabel: "Cần theo dõi",
        nextTitle: "2 học sinh cần bổ sung phần bài tập nâng cao",
        nextMeta: "36 học sinh · Xem báo cáo lớp",
        stats: [
          { value: "36", label: "Học sinh", valueClass: "text-[#3E79A4]" },
          { value: "88%", label: "Hoàn thành", valueClass: "text-[#3B9374]" },
          { value: "4", label: "Bài chờ chấm", valueClass: "text-[#AF7C32]" }
        ]
      },
      {
        label: "12A1 · Ôn HSG",
        progress: 91,
        progressLabel: "Tiến độ lớp 12A1",
        nextLabel: "Cần theo dõi",
        nextTitle: "2 học sinh sắp chạm mốc đội tuyển",
        nextMeta: "28 học sinh · Xem báo cáo lớp",
        stats: [
          { value: "28", label: "Học sinh", valueClass: "text-[#3E79A4]" },
          { value: "91%", label: "Hoàn thành", valueClass: "text-[#3B9374]" },
          { value: "3", label: "Bài chờ chấm", valueClass: "text-[#AF7C32]" }
        ]
      }
    ]
  }
};

/**
 * SƠ ĐỒ KHỐI TRANG CHỦ — dùng các mã dưới đây khi yêu cầu AI chỉnh giao diện:
 * HOME-01: Thanh thông báo hệ thống.
 * HOME-02: Menu trái (điều hướng, banner, thẻ giáo viên).
 * HOME-03: Hero/banner trình chiếu chính.
 * HOME-04: Bộ chọn lớp, mục tiêu và nút tìm kiếm.
 * HOME-05: Chương trình nổi bật / lộ trình học.
 * HOME-06: Không gian học tập — tiến độ theo vai trò, yêu cầu đăng nhập.
 * HOME-07: Bảng xếp hạng / thông báo.
 * HOME-08: Tài liệu nổi bật ở sidebar phải.
 * HOME-09: Cuộc thi & khảo sát ở sidebar phải.
 * HOME-10: Câu chuyện đồng hành.
 * HOME-11: Câu hỏi thường gặp và hỗ trợ toàn chiều ngang.
 */
export default function HomePage({
  onNavigate,
  onOpenClassDetail,
  onOpenActivation,
  onOpenAccess,
  onOpenCodeWorkspace,
  selectedGrade,
  setSelectedGrade,
  selectedGoal,
  setSelectedGoal,
  userRole = "guest"
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const [mainSectionTab, setMainSectionTab] = useState("courses");
  const [isMainTabPaused, setIsMainTabPaused] = useState(false);
  const [courseCarouselIndex, setCourseCarouselIndex] = useState(0);
  const [pathCarouselIndex, setPathCarouselIndex] = useState(0);
  const [sidebarTab, setSidebarTab] = useState("leaderboard");
  const [systemNoticeIndex, setSystemNoticeIndex] = useState(0);
  const [isSystemNoticePaused, setIsSystemNoticePaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeSystemNotice = SYSTEM_NOTICES[systemNoticeIndex];
  const initialJourneyRole = userRole === "parent" || userRole === "teacher" ? userRole : "student";
  const [journeyRole, setJourneyRole] = useState(initialJourneyRole);
  const [journeyContextIndex, setJourneyContextIndex] = useState(0);
  const activeJourney = JOURNEY_ROLE_VIEWS[journeyRole];
  const activeJourneyData = activeJourney.contexts?.[journeyContextIndex] || activeJourney;
  const isGuest = userRole === "guest";

  // Slideshow State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  // Tôn trọng tùy chọn giảm chuyển động của hệ điều hành cho mọi nội dung tự chạy.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncMotionPreference();
    mediaQuery.addEventListener?.("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener?.("change", syncMotionPreference);
  }, []);

  const heroSlides = [
    {
      id: "hsg",
      tabTitle: "Giải HSG",
      tag: "🏆 Đấu trường đỉnh cao",
      tagStyle: "bg-amber-100/90 text-amber-800 border-amber-300",
      subtitle: "Chinh phục HSG & Olympic Tin học",
      description: "Học theo chuyên đề trọng tâm, luyện đề phân cấp và từng bước tiến tới đội tuyển.",
      panelStyle: "border-[#EBCF73] bg-gradient-to-br from-[#FFF2BA]/94 via-[#FFF9E2]/92 to-white/86",
      panelIconStyle: "border-[#E8C75D] bg-[#FFE89A] text-[#9A6508]",
      itemIconStyle: "bg-[#FFF0B8] text-[#A86D08]",
      panelIcon: Trophy,
      highlights: [
        { label: "HSG Tin học lớp 9", icon: BookOpen },
        { label: "HSG Quốc gia lớp 12", icon: Trophy },
        { label: "Olympic Tin học", icon: Code },
        { label: "Bồi dưỡng đội tuyển", icon: Award }
      ],
      defaultGoal: "Luyện thi HSG Tin học lớp 9",
      bgImage: "/assets/hero-banner-hsg.jpg"
    },
    {
      id: "chuyen-tin",
      tabTitle: "Chuyên Tin",
      tag: "🎯 Mục tiêu trường Chuyên",
      tagStyle: "bg-blue-100/90 text-blue-800 border-blue-300",
      subtitle: "Tự tin đỗ lớp 10 Chuyên Tin",
      description: "Củng cố thuật toán, rèn kỹ năng làm bài và luyện đề theo từng trường mục tiêu.",
      panelStyle: "border-[#AFCFED] bg-gradient-to-br from-[#DDEEFF]/94 via-[#EEF7FF]/92 to-white/86",
      panelIconStyle: "border-[#A5C9EA] bg-[#CFE8FF] text-[#17669E]",
      itemIconStyle: "bg-[#DBEEFF] text-[#176AAB]",
      panelIcon: Target,
      highlights: [
        { label: "Chuyên KHTN", icon: Code },
        { label: "Chuyên Sư phạm", icon: BookOpen },
        { label: "Chuyên Amsterdam", icon: Target },
        { label: "Chuyên tỉnh/TP", icon: GraduationCap }
      ],
      defaultGoal: "Luyện thi vào lớp 10 chuyên Tin",
      bgImage: "/assets/hero-banner-chuyen.jpg"
    },
    {
      id: "tot-nghiep",
      tabTitle: "Tốt nghiệp 9+",
      tag: "⚡ Bứt phá điểm 9+",
      tagStyle: "bg-emerald-100/90 text-emerald-800 border-emerald-300",
      subtitle: "Bứt phá điểm 9+ môn Tin học",
      description: "Hệ thống hóa lý thuyết, luyện đề bám cấu trúc kỳ thi 2025–2026 và theo dõi tiến bộ.",
      panelStyle: "border-[#A9DDC9] bg-gradient-to-br from-[#D9F6EA]/94 via-[#ECFBF5]/92 to-white/86",
      panelIconStyle: "border-[#98D7BE] bg-[#C9EFDF] text-[#14785A]",
      itemIconStyle: "bg-[#D8F4E8] text-[#168062]",
      panelIcon: BarChart2,
      highlights: [
        { label: "Mục tiêu 9+", icon: Target },
        { label: "100+ đề bám cấu trúc", icon: FileText },
        { label: "Lý thuyết trọng tâm", icon: BookOpen },
        { label: "Chấm điểm tự động", icon: BarChart2 }
      ],
      defaultGoal: "Ôn thi tốt nghiệp môn Tin học",
      bgImage: "/assets/hero-banner-totnghiep.jpg"
    },
    {
      id: "du-hoc",
      tabTitle: "Du học & AP CS",
      tag: "✈️ Vươn ra thế giới",
      tagStyle: "bg-purple-100/90 text-purple-800 border-purple-300",
      subtitle: "Sẵn sàng cho AP CS, USACO & học bổng",
      description: "Xây nền thuật toán, luyện chuẩn quốc tế và hoàn thiện hồ sơ công nghệ có định hướng.",
      panelStyle: "border-[#CDBDEB] bg-gradient-to-br from-[#E9E0FA]/94 via-[#F5F0FF]/92 to-white/86",
      panelIconStyle: "border-[#C7B4E8] bg-[#DFD1F6] text-[#7050A5]",
      itemIconStyle: "bg-[#EBE2FA] text-[#7653AD]",
      panelIcon: GraduationCap,
      highlights: [
        { label: "USACO Bronze–Gold", icon: Code },
        { label: "AP Computer Science A", icon: BookOpen },
        { label: "Portfolio công nghệ", icon: FileText },
        { label: "Định hướng học bổng", icon: GraduationCap }
      ],
      defaultGoal: "Học trước chương trình Tin học để du học",
      bgImage: "/assets/hero-banner-duhoc.jpg"
    }
  ];

  // Auto-play slideshow timer
  useEffect(() => {
    if (isSlidePaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isSlidePaused, prefersReducedMotion, heroSlides.length]);

  // Đồng bộ mục tiêu bên dưới với nội dung hero, kể cả khi slideshow tự chuyển.
  useEffect(() => {
    setSelectedGoal(heroSlides[currentSlideIndex].defaultGoal);
  }, [currentSlideIndex, setSelectedGoal]);

  // Auto-switch Main Section Tab
  useEffect(() => {
    if (isMainTabPaused || prefersReducedMotion) return;
    const mainTabTimer = setInterval(() => {
      setMainSectionTab((prev) => (prev === "courses" ? "path" : "courses"));
    }, 6000);
    return () => clearInterval(mainTabTimer);
  }, [isMainTabPaused, prefersReducedMotion]);

  // HOME-01 tự chuyển thông báo định kỳ; tạm dừng khi rê chuột để người dùng đọc dễ hơn.
  useEffect(() => {
    if (isSystemNoticePaused || prefersReducedMotion) return;
    const noticeTimer = setInterval(() => {
      setSystemNoticeIndex((prev) => (prev + 1) % SYSTEM_NOTICES.length);
    }, 5200);
    return () => clearInterval(noticeTimer);
  }, [isSystemNoticePaused, prefersReducedMotion]);

  // Đồng bộ tab hành trình với vai trò đang chọn ở menu người dùng; vẫn cho phép xem thử từng vai trò.
  useEffect(() => {
    setJourneyRole(userRole === "parent" || userRole === "teacher" ? userRole : "student");
  }, [userRole]);

  useEffect(() => {
    setJourneyContextIndex(0);
  }, [journeyRole]);

  const handleSelectSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  const handlePrevSlide = () => {
    const nextIdx = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    setCurrentSlideIndex(nextIdx);
  };

  const handleNextSlide = () => {
    const nextIdx = (currentSlideIndex + 1) % heroSlides.length;
    setCurrentSlideIndex(nextIdx);
  };

  const featuredCourses = [
    {
      title: "Bài tập tự luyện",
      desc: "Hệ thống bài tập tự luyện phong phú theo từng chuyên đề từ cơ bản đến nâng cao",
      btnText: "Luyện tập ngay",
      bgClass: "from-[#EAF4FE] to-[#D8EAFD] border-[#BAE0FD]",
      btnClass: "bg-[#38BDF8] hover:bg-[#0284C7] text-white",
      image: "/assets/course-img-1.png?v=3",
      target: "Luyện tập"
    },
    {
      title: "Tài liệu",
      desc: "Sách, chuyên đề, bộ đề, giáo viên và chuyên gia uy tín hỗ trợ và đồng hành",
      btnText: "Khám phá",
      bgClass: "from-[#E8FBF6] to-[#D0F5E7] border-[#A7F3D0]",
      btnClass: "bg-[#2DD4BF] hover:bg-[#0D9488] text-white",
      image: "/assets/course-img-2.png?v=3",
      target: "Tài liệu"
    },
    {
      title: "Lớp học",
      desc: "Lớp học chuyên nghiệp, quản lý và theo dõi tiến độ học sinh chuẩn mực",
      btnText: "Vào lớp học",
      bgClass: "from-[#F3EFFF] to-[#E5DEFF] border-[#DDD6FE]",
      btnClass: "bg-[#A78BFA] hover:bg-[#7C3AED] text-white",
      image: "/assets/course-img-3.png?v=3",
      target: "Khóa học"
    },
    {
      title: "Giáo viên & Chuyên gia",
      desc: "Đội ngũ giáo viên chuyên nghiệp & chuyên gia uy tín đồng hành tận tâm",
      btnText: "Xem đội ngũ",
      bgClass: "from-[#FFF7E6] to-[#FEEAD0] border-[#FED7AA]",
      btnClass: "bg-[#FB923C] hover:bg-[#EA580C] text-white",
      image: "/assets/course-img-4.png?v=3",
      target: "Giáo viên & chuyên gia"
    },
    {
      title: "Cuộc thi",
      desc: "Cuộc thi, khảo sát được tổ chức thường xuyên và công bằng",
      btnText: "Tìm hiểu",
      bgClass: "from-[#E6F7FF] to-[#CCEFFF] border-[#BAE6FD]",
      btnClass: "bg-[#38BDF8] hover:bg-[#0284C7] text-white",
      image: "/assets/course-img-5.png?v=3",
      target: "Cuộc thi"
    }
  ];

  const learningSteps = [
    { step: "1. Lựa chọn mục tiêu", desc: "Chọn mục tiêu lớp phù hợp", img: "/assets/step-1.png?v=3" },
    { step: "2. Chọn lộ trình phù hợp", desc: "Học theo năng lực & mục tiêu", img: "/assets/step-2.png?v=3" },
    { step: "3. Luyện tập & học liệu", desc: "Bài tập, giáo trình, chuyên đề", img: "/assets/step-3.png?v=3" },
    { step: "4. Lớp học & giáo viên", desc: "Học cùng giáo viên, nhận hỗ trợ", img: "/assets/step-4.png?v=3" },
    { step: "5. Thi & Đánh giá", desc: "Cuộc thi, đánh giá phát năng lực", img: "/assets/step-5.png?v=3" }
  ];

  // HOME-05 carousel: luôn lấy tối đa 4 mục liên tiếp và quay vòng ở cuối danh sách.
  const getCircularItems = (items, startIndex) =>
    Array.from({ length: Math.min(4, items.length) }, (_, offset) => {
      const originalIndex = (startIndex + offset) % items.length;
      return { item: items[originalIndex], originalIndex, offset };
    });

  const visibleCourses = getCircularItems(featuredCourses, courseCarouselIndex);
  const visibleLearningSteps = getCircularItems(learningSteps, pathCarouselIndex);
  const activeCarouselIndex = mainSectionTab === "courses" ? courseCarouselIndex : pathCarouselIndex;
  const activeCarouselLength = mainSectionTab === "courses" ? featuredCourses.length : learningSteps.length;

  const moveLearningCarousel = (direction) => {
    if (mainSectionTab === "courses") {
      setCourseCarouselIndex((current) => (current + direction + featuredCourses.length) % featuredCourses.length);
      return;
    }
    setPathCarouselIndex((current) => (current + direction + learningSteps.length) % learningSteps.length);
  };

  const books = [
    {
      title: "Lập trình căn bản với Python",
      tag: "Dành cho học sinh 6–10",
      pages: "320 trang",
      highlight: "Nhiều bài tập minh họa",
      image: "/assets/book-img-1.png?v=3",
      btnText: "Xem tài liệu",
      btnStyle: "bg-[#38BDF8] hover:bg-sky-500 text-white"
    },
    {
      title: "Chuyên đề Cấu trúc dữ liệu và giải thuật",
      tag: "Dành cho HSG lớp 10–12",
      pages: "200 trang",
      highlight: "Bài tập nâng cao",
      image: "/assets/book-img-2.png?v=3",
      btnText: "Xem tài liệu",
      btnStyle: "bg-[#38BDF8] hover:bg-sky-500 text-white"
    },
    {
      title: "Tuyển tập đề thi HSG Tin học các tỉnh",
      tag: "Cập nhật 2020 – 2025",
      pages: "500+ đề thi",
      highlight: "Có lời giải chi tiết",
      image: "/assets/book-img-3.png?v=3",
      btnText: "Xem chi tiết",
      btnStyle: "bg-[#FDBA74] hover:bg-amber-400 text-amber-950 font-bold"
    },
    {
      title: "Bộ đề ôn thi vào lớp 10 chuyên Tin",
      tag: "Theo cấu trúc mới nhất",
      pages: "300 đề luyện tập",
      highlight: "Có đáp án và lời giải",
      image: "/assets/book-img-4.png?v=4",
      btnText: "Xem tài liệu",
      btnStyle: "bg-[#38BDF8] hover:bg-sky-500 text-white"
    }
  ];

  const competitions = [
    {
      title: "Kỳ thi HSG Tin học cấp tỉnh năm 2025–2026",
      time: "Bắt đầu: 15/11/2025",
      status: "Đang nhận đăng ký",
      statusColor: "text-emerald-600",
      statusDot: "bg-emerald-500",
      image: "/assets/contest-img-1.png?v=3"
    },
    {
      title: "Cuộc thi Lập trình Online Ôn Thi 360 lần 3",
      time: "Thời gian: 20/10/2025",
      status: "Sắp diễn ra",
      statusColor: "text-amber-500",
      statusDot: "bg-amber-400",
      image: "/assets/contest-img-2.png?v=3"
    },
    {
      title: "Khảo sát năng lực Tin học",
      time: "Thời gian: 01/11 – 10/11/2025",
      status: "Đang mở",
      statusColor: "text-emerald-600",
      statusDot: "bg-emerald-500",
      image: "/assets/contest-img-3.png?v=3"
    }
  ];

  const testimonials = [
    {
      quote: "“ Nhờ Ôn Thi 360, mình tự tin hơn rất nhiều trong học tập và đạt kết quả tốt ở kỳ thi HSG cấp tỉnh. Nền tảng giúp mình có lộ trình rõ ràng và bài tập chất lượng. ”",
      author: "Nguyễn Hà Phương",
      role: "Học sinh lớp 12",
      banner: "/assets/testi-banner-1.png?v=3",
      avatar: "/assets/testi-av-1.png?v=3"
    },
    {
      quote: "“ Tôi rất yên tâm khi con học tại Ôn Thi 360. Con tiến bộ rõ rệt, chúng tôi có thể theo dõi tiến độ và nhận được sự hỗ trợ tận tình từ đội ngũ giáo viên. ”",
      author: "Chị Trần Thị Mai",
      role: "Phụ huynh học sinh",
      banner: "/assets/testi-banner-2.png?v=3",
      avatar: "/assets/testi-av-2.png?v=3"
    },
    {
      quote: "“ Ôn Thi 360 là nền tảng hữu ích, giúp học sinh tiếp cận kiến thức Tin học một cách hệ thống, hiện đại và hiệu quả. ”",
      author: "Thầy Lê Minh Đức",
      role: "Giáo viên Tin học",
      banner: "/assets/testi-banner-3.png?v=3",
      avatar: "/assets/testi-av-3.png?v=3"
    }
  ];

  const faqs = [
    {
      q: "1. Ôn Thi 360 có những lớp học nào?",
      a: "Ôn Thi 360 cung cấp đầy đủ các khóa học từ Lập trình cơ bản THCS, Bồi dưỡng HSG Tin học lớp 9, Ôn thi vào lớp 10 chuyên Tin, đến Luyện thi HSG Quốc gia và Thi tốt nghiệp THPT."
    },
    {
      q: "2. Tài liệu tại Ôn Thi 360 có phù hợp với chương trình giáo dục hiện hành?",
      a: "Toàn bộ giáo trình, chuyên đề và bộ đề thi đều được cập nhật bám sát chương trình GDPT mới nhất, được thẩm định bởi đội ngũ giáo viên trường chuyên và chuyên gia Tin học uy tín."
    },
    {
      q: "3. Làm thế nào để luyện tập theo chuyên đề hiệu quả?",
      a: "Học sinh nên theo đúng lộ trình: Đọc lý thuyết trọng tâm -> Làm bài tập tự luyện có chấm tự động -> Xem giải thích chi tiết -> Làm bài kiểm tra năng lực cuối mỗi chuyên đề."
    },
    {
      q: "4. Phụ huynh có thể theo dõi tiến độ học tập của con như thế nào?",
      a: "Phụ huynh có tài khoản đồng hành riêng để xem chi tiết thời gian học, số bài tập đã nộp, tỷ lệ làm đúng và nhận báo cáo tiến độ định kỳ hàng tuần từ hệ thống."
    }
  ];

  const topStudents = [
    // Ảnh chân dung riêng cho bảng xếp hạng; badge số bên trái vẫn giữ thứ hạng rõ ràng.
    { rank: 1, name: "Nguyễn Minh Anh", class: "10A1", score: "9.8", avatar: "/assets/testimonial-1.png" },
    { rank: 2, name: "Trần Đức Duy", class: "10A2", score: "9.6", avatar: "/assets/testimonial-3.png" },
    { rank: 3, name: "Lê Phương Thảo", class: "10A3", score: "9.5", avatar: "/assets/testimonial-2.png" },
    { rank: 4, name: "Phạm Hoàng Nam", class: "10A2", score: "9.3", avatar: "/assets/testi-av-3.png" },
    { rank: 5, name: "Vũ Thị Mai", class: "10A2", score: "9.2", avatar: "/assets/testi-av-1.png" }
  ];

  const sidebarNavItems = [
    { name: "Trang chủ", icon: Home, target: "Trang chủ" },
    { name: "Lớp học", icon: BookOpen, target: "Khóa học" },
    { name: "Luyện tập", icon: Code, target: "Luyện tập" },
    { name: "Tài liệu", icon: FileText, target: "Tài liệu" },
    { name: "Cuộc thi", icon: Trophy, target: "Cuộc thi" },
    { name: "Bảng xếp hạng", icon: BarChart2, target: "Bảng xếp hạng" },
    { name: "Giáo viên & chuyên gia", icon: Users, target: "Giáo viên & chuyên gia" },
    { name: "Thông tin", icon: Info, target: "Thông tin" },
  ];

  return (
    <div data-section="HOME-PAGE" className="home-typography flex flex-col gap-4 sm:gap-5 animate-fadeIn">
      {/* [HOME-01] THANH THÔNG BÁO HỆ THỐNG — nội dung tin chạy đầu trang chủ */}
      <div
        data-section="HOME-01-SYSTEM-NOTICE"
        className={`relative overflow-hidden bg-gradient-to-r ${activeSystemNotice.surfaceClass} border ${activeSystemNotice.borderClass} rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition-colors duration-500`}
        onMouseEnter={() => setIsSystemNoticePaused(true)}
        onMouseLeave={() => setIsSystemNoticePaused(false)}
        onFocusCapture={() => setIsSystemNoticePaused(true)}
        onBlurCapture={() => setIsSystemNoticePaused(false)}
        aria-label="Thông báo hệ thống"
      >
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-xs sm:text-[13px]">
          <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${activeSystemNotice.accentClass} transition-colors duration-500`} aria-hidden="true" />
          <span className={`${activeSystemNotice.iconClass} flex h-5 w-5 shrink-0 items-center justify-center animate-pulse`} aria-hidden="true">
            <Bell className="h-4 w-4" />
          </span>
          <span className="font-bold text-amber-800 shrink-0 text-xs sm:text-sm">Thông báo hệ thống</span>
          <span className="text-slate-300">|</span>
          <span key={`category-${systemNoticeIndex}`} className={`hidden sm:inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-bold leading-tight animate-fadeIn ${activeSystemNotice.categoryClass}`}>
            {activeSystemNotice.category}
          </span>
          <p key={`message-${systemNoticeIndex}`} aria-live="polite" className="min-w-0 text-slate-700 truncate font-medium text-xs sm:text-sm animate-fadeIn">
            {activeSystemNotice.message}
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-slate-400 shrink-0 ml-2">
          <button
            type="button"
            aria-label="Thông báo trước"
            onClick={() => setSystemNoticeIndex((prev) => (prev - 1 + SYSTEM_NOTICES.length) % SYSTEM_NOTICES.length)}
            className="p-1 hover:text-blue-600 hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="hidden sm:inline text-[10px] font-semibold text-slate-400 tabular-nums min-w-7 text-center">
            {systemNoticeIndex + 1}/{SYSTEM_NOTICES.length}
          </span>
          <button
            type="button"
            aria-label="Thông báo tiếp theo"
            onClick={() => setSystemNoticeIndex((prev) => (prev + 1) % SYSTEM_NOTICES.length)}
            className="p-1 hover:text-blue-600 hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* [HOME-LAYOUT] LƯỚI CHÍNH 3 CỘT — menu trái | nội dung giữa | sidebar phải */}
      <div data-section="HOME-MAIN-GRID" className="grid grid-cols-1 lg:grid-cols-[210px_1fr_280px] xl:grid-cols-[240px_1fr_310px] 2xl:grid-cols-[260px_1fr_360px] gap-3.5 sm:gap-4 xl:gap-5 2xl:gap-6 items-start">
        {/* [HOME-02] MENU TRÁI — điều hướng, banner quảng bá và thẻ giáo viên */}
        <aside data-section="HOME-02-LEFT-SIDEBAR" className="hidden lg:flex flex-col gap-3.5 xl:gap-4 shrink-0">
          {/* [HOME-02A] Danh sách điều hướng ở menu trái */}
          <div data-section="HOME-02A-LEFT-NAV" className="bg-white rounded-3xl p-3 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] flex flex-col gap-1.5">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isSelected = item.name === "Trang chủ";
              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.target)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs 2xl:text-[13px] font-semibold leading-snug transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#E6F3FF] text-[#0066CC] font-bold shadow-2xs"
                      : "text-slate-700 hover:bg-sky-50 hover:text-blue-600"
                  }`}
                >
                  <Icon className={`w-4 h-4 xl:w-4.5 xl:h-4.5 shrink-0 ${isSelected ? "text-[#0066CC]" : "text-blue-600"}`} />
                  <span className="whitespace-nowrap truncate">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* [HOME-02B] Banner “Cùng nhau kiến tạo tương lai số” */}
          <div
            data-section="HOME-02B-PROMO-BANNER"
            onClick={() => onNavigate("Khóa học")}
            className="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] cursor-pointer hover:shadow-md transition-all group"
          >
            <img
              src="/assets/sidebar-plane.jpg"
              alt="Cùng nhau kiến tạo tương lai số"
              className="w-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          {/* [HOME-02C] Thẻ giáo viên tiêu biểu thu nhỏ */}
          <div
            data-section="HOME-02C-TEACHER-CARD"
            onClick={() => onNavigate("Giáo viên & chuyên gia")}
            className="relative min-h-[190px] xl:min-h-[205px] overflow-hidden rounded-3xl border border-sky-200/90 bg-gradient-to-br from-white via-[#F3FAFF] to-[#E4F3FF] p-3.5 shadow-[0_8px_24px_rgba(0,100,220,0.09)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(0,100,220,0.14)] cursor-pointer group"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/35 blur-sm transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-blue-100/60 blur-md" />

            <div className="relative z-10 flex min-h-[160px] xl:min-h-[175px] flex-col">
              <div className="flex items-center gap-2.5 text-left">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-blue-500 blur-[2px] opacity-70" />
                  <img
                    src="/assets/testi-av-3.png?v=3"
                    alt="Thầy Nguyễn Tiến Thành"
                    className="relative w-11 h-11 rounded-full border-2 border-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                    <Award className="h-2.5 w-2.5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h5 className="type-card-title text-[#073B78] group-hover:text-blue-600 transition-colors">
                    Thầy Nguyễn Tiến Thành
                  </h5>
                  <p className="type-meta mt-0.5 text-slate-500">
                    Giáo viên trường THPT<br />Chuyên Thái Bình
                  </p>
                </div>
              </div>

              <div className="my-3 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

              <div className="relative flex-1 px-2 text-center">
                <Sparkles className="absolute -left-0.5 top-0 h-3.5 w-3.5 text-amber-400" />
                <span className="absolute -right-1 -top-3 select-none text-4xl font-black leading-none text-blue-100">“</span>
                <p
                  className="relative text-[17px] xl:text-[19px] font-bold leading-[1.15] text-[#07549A] transition-colors group-hover:text-blue-700"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Kiến thức là chìa khóa<br />mở ra tương lai
                </p>
                <svg className="mx-auto mt-1 h-2 w-24 text-sky-500" viewBox="0 0 100 8" fill="none" aria-hidden="true">
                  <path d="M3 6C25 2 58 1 97 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

            </div>
          </div>
        </aside>

        {/* [HOME-CENTER] CỘT GIỮA — hero, tìm mục tiêu và chương trình học */}
        <main data-section="HOME-CENTER-CONTENT" className="flex flex-col gap-4 sm:gap-5 min-w-0">
          {/* [HOME-03] HERO — banner trình chiếu 4 mục tiêu học tập */}
          <section
            id="hero"
            data-section="HOME-03-HERO"
            onMouseEnter={() => setIsSlidePaused(true)}
            onMouseLeave={() => setIsSlidePaused(false)}
            onFocusCapture={() => setIsSlidePaused(true)}
            onBlurCapture={() => setIsSlidePaused(false)}
            className="relative rounded-3xl border border-sky-200/90 shadow-[0_12px_40px_rgba(0,100,220,0.09)] overflow-hidden p-4 sm:p-6 lg:p-7 min-h-[340px] sm:min-h-[380px] lg:min-h-[390px] flex flex-col justify-between group/hero"
          >
            {/* 4 Theme-Specific Ultra-HD Background Artworks */}
            {heroSlides.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.bgImage}
                alt={`${slide.subtitle}. ${slide.description}`}
                className={`absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none z-0 transition-opacity duration-700 ease-in-out ${
                  currentSlideIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}

            {/* Lớp phủ giữ chữ rõ trên ảnh; đậm hơn ở mobile vì nội dung chiếm gần toàn chiều ngang */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_72%,rgba(255,255,255,0.3)_100%)] sm:bg-gradient-to-r sm:from-white/95 sm:via-white/70 sm:to-transparent" />

            {/* Nhãn chủ đề của slideshow — giữ phía trên để nhận biết nhanh nội dung đang xem */}
            <div className="relative z-10 mb-3 max-w-full overflow-x-auto no-scrollbar">
              <div className="flex w-max min-w-full items-center gap-0.5 rounded-2xl border border-white/80 bg-white/62 p-1 shadow-[0_3px_14px_rgba(31,91,139,0.07)] backdrop-blur-md sm:w-full">
                {heroSlides.map((slide, idx) => {
                  const isActive = currentSlideIndex === idx;
                  return (
                    <button
                      type="button"
                      key={slide.id}
                      onClick={() => handleSelectSlide(idx)}
                      aria-pressed={isActive}
                      className={`relative flex h-7 min-w-[104px] flex-1 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 text-[11px] font-semibold transition-all cursor-pointer xl:text-xs ${
                        isActive
                          ? "bg-[#07549A] text-white shadow-[0_3px_9px_rgba(7,84,154,0.22)]"
                          : "text-[#4F6C85] hover:bg-white/75 hover:text-[#07549A]"
                      }`}
                    >
                      <span>{slide.tabTitle}</span>
                      {isActive && (
                        <span className="hidden h-1.5 w-1.5 rounded-full bg-amber-300 sm:inline-block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Slide Content Area */}
            <div className="relative z-10 grid w-full my-auto">
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                const PanelIcon = slide.panelIcon;
                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 flex w-full max-w-[92%] flex-col gap-2 transition-opacity duration-500 sm:max-w-[64%] lg:max-w-[60%] xl:max-w-[58%] ${
                      isActive ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
                    }`}
                  >
                    {/* Category Pill Tag */}
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border shadow-2xs ${slide.tagStyle}`}
                      >
                        {slide.tag}
                      </span>
                      <span className="hidden min-w-0 truncate text-[10px] font-medium text-slate-400 2xl:inline">
                        • Lộ trình chuẩn quốc gia & quốc tế
                      </span>
                    </div>

                    {/* 3D Stylized Title with Golden Orbit */}
                    <div className="flex items-center gap-2">
                      <h1 className="type-hero-brand text-[#0050A0] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-2">
                        <span>Ôn Thi</span>
                        <span className="text-[#F59E0B] relative inline-block">
                          360
                          <svg
                            className="absolute -bottom-1 -left-2 w-[115%] h-5 text-[#F59E0B] pointer-events-none"
                            viewBox="0 0 80 20"
                            fill="none"
                          >
                            <ellipse
                              cx="40"
                              cy="10"
                              rx="36"
                              ry="6"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeDasharray="45 8"
                              transform="rotate(-8 40 10)"
                            />
                          </svg>
                        </span>
                      </h1>
                    </div>

                    {/* Dynamic Subtitle */}
                    <h2 className="type-hero-title text-[#0F3A7A]">
                      {slide.subtitle}
                    </h2>

                    {/* Mô tả đủ thông tin để tăng độ tin cậy nhưng tách khỏi heading để dễ đọc */}
                    <p className="type-body max-w-[34rem] font-medium text-[#526E88]">
                      {slide.description}
                    </p>

                    {/* Bảng 2×2 tạo cảm giác đầy đặn và thể hiện rõ phạm vi của từng lộ trình */}
                    <div className={`mt-1.5 max-w-[34rem] rounded-2xl border p-2.5 shadow-[0_5px_18px_rgba(38,91,128,0.1)] backdrop-blur-md ${slide.panelStyle}`}>
                      <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/80 pb-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border shadow-sm ${slide.panelIconStyle}`}>
                            <PanelIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.055em] text-[#31536F]">
                            Nội dung lộ trình
                          </span>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/90 bg-white/68 px-2 py-0.5 text-[10px] font-bold text-[#607A91]">
                          4 trọng tâm
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {slide.highlights.map(({ label, icon: HighlightIcon }) => (
                          <div key={label} className="flex min-w-0 items-center gap-1.5 rounded-lg border border-white/70 bg-white/52 px-1.5 py-1">
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${slide.itemIconStyle}`}>
                              <HighlightIcon className="h-3 w-3" />
                            </span>
                            <span className="text-[10px] font-semibold leading-[1.3] text-[#294D69] sm:text-[10.5px]">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Điều khiển slideshow — nổi trên ảnh, sát đáy và lệch phải để không chặn nội dung chính */}
            <div className="absolute bottom-3.5 right-4 sm:bottom-4 sm:right-5 z-20 flex items-center gap-1 rounded-full border border-white/80 bg-white/82 px-1.5 py-1 shadow-[0_5px_18px_rgba(15,58,122,0.16)] backdrop-blur-md">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#42617E] transition-all hover:bg-white hover:text-[#07549A] hover:shadow-sm active:scale-95 cursor-pointer"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1 px-0.5" aria-label="Vị trí ảnh trình chiếu">
                {heroSlides.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlideIndex === idx
                        ? "w-5 bg-[#07549A]"
                        : "w-1.5 bg-[#A9BCCB] hover:bg-[#6E8CA5]"
                    }`}
                    aria-label={`Chuyển đến ảnh ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#07549A] text-white shadow-sm transition-all hover:bg-[#06447D] active:scale-95 cursor-pointer"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* [HOME-04] TÌM MỤC TIÊU — chọn lớp, mục tiêu và tìm khóa học */}
          <section
            data-section="HOME-04-GOAL-SEARCH"
            className="rounded-[22px] border border-[#DFEBF0] bg-white px-3.5 py-3 sm:px-4 shadow-[0_5px_20px_rgba(45,96,145,0.045)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#CDE8EC] bg-[#E9F7F8] text-[#23869B]">
                  <Target className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <h3 className="type-section-title">
                    Chọn mục tiêu hoặc lộ trình của bạn
                  </h3>
                  <p className="mt-0.5 truncate text-[11px] font-normal leading-snug text-[#71869A]">
                    Gợi ý phù hợp theo năng lực và định hướng học tập
                  </p>
                </div>
              </div>

              {/* Bộ chọn lớp tối giản: chỉ giữ icon và lớp đang dùng */}
              <button
                type="button"
                onClick={() => setSelectedGrade(selectedGrade === "Lớp 10" ? "Lớp 9" : "Lớp 10")}
                className="group flex h-8 shrink-0 items-center gap-1.5 rounded-xl border border-[#DCE8ED] bg-[#F8FAFB] px-2.5 text-left transition-all hover:border-[#BFDDE4] hover:bg-[#F2F8F9]"
                aria-label="Đổi lớp hiện tại"
              >
                <GraduationCap className="h-3.5 w-3.5 text-[#23869B]" />
                <span className="text-[11px] font-bold leading-none text-[#123B68]">{selectedGrade}</span>
                <ChevronDown className="h-3 w-3 text-[#8BA0B5] transition-colors group-hover:text-[#126F91]" />
              </button>
            </div>

            {/* Hàng điều khiển thấp, cùng bán kính và không lồng nhiều lớp nền */}
            <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setSelectedGoal(selectedGoal.includes("lớp 9") ? "Luyện thi vào lớp 10 chuyên Tin" : "Luyện thi HSG Tin học lớp 9")}
                className="group flex h-[42px] min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#DFEAEE] bg-[#F8FAFB] px-2.5 text-left transition-all hover:border-[#C6E0E6] hover:bg-[#F3F8F9]"
                aria-label="Đổi mục tiêu học"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E7F5F6] text-[#23869B]">
                  <Target className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold leading-none text-[#71869A]">Mục tiêu</span>
                  <span className="mt-1 block truncate text-xs sm:text-[13px] font-semibold leading-none text-[#123B68]">{selectedGoal}</span>
                </span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#8BA0B5] transition-colors group-hover:text-[#126F91]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("Khóa học")}
                className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#ECD78F] bg-[#FFF4C7] px-4 text-xs font-bold text-[#765C18] shadow-[0_2px_7px_rgba(183,143,37,0.09)] transition-all hover:border-[#DFC56F] hover:bg-[#FFEDAA] active:scale-[0.98]"
              >
                <span>Xem lộ trình</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>

          {/* [HOME-05] NỘI DUNG HỌC — chuyển tab giữa chương trình nổi bật và lộ trình */}
          <div
            data-section="HOME-05-LEARNING-CONTENT"
            className="mt-3.5 rounded-[28px] border border-[#DFEBF4] bg-white p-3.5 sm:p-4 shadow-[0_7px_26px_rgba(45,96,145,0.055)]"
            onMouseEnter={() => setIsMainTabPaused(true)}
            onMouseLeave={() => setIsMainTabPaused(false)}
          >
            <div className="mb-2.5 flex flex-col gap-2 border-b border-[#E7EFF5] pb-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center gap-1 rounded-2xl bg-[#F3F8FA] p-1 sm:w-fit overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setMainSectionTab("courses")}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-xs sm:text-[13px] font-bold leading-snug transition-all cursor-pointer ${
                    mainSectionTab === "courses"
                      ? "border-[#CBE7EE] bg-white text-[#123B68] shadow-[0_2px_8px_rgba(34,126,151,0.08)]"
                      : "border-transparent text-[#71869A] hover:bg-white/70 hover:text-[#123B68]"
                  }`}
                >
                  <img src="/assets/badge-courses.png?v=3" alt="" className="w-[18px] h-[18px] object-contain" />
                  <span>Chương trình học nổi bật</span>
                </button>

                <button
                  onClick={() => setMainSectionTab("path")}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-xs sm:text-[13px] font-bold leading-snug transition-all cursor-pointer ${
                    mainSectionTab === "path"
                      ? "border-[#CBE7EE] bg-white text-[#123B68] shadow-[0_2px_8px_rgba(34,126,151,0.08)]"
                      : "border-transparent text-[#71869A] hover:bg-white/70 hover:text-[#123B68]"
                  }`}
                >
                  <img src="/assets/badge-path.png?v=3" alt="" className="w-[18px] h-[18px] object-contain" />
                  <span>Lộ trình học chuyên nghiệp</span>
                </button>
              </div>

              {/* Chỉ số carousel và liên kết tổng; nút trước/sau được đặt nổi trên ảnh */}
              <div className="flex w-full items-center justify-end gap-1.5 sm:w-auto">
                <span className="mr-0.5 min-w-7 text-center text-[11px] font-semibold leading-snug text-[#71869A]">
                  {activeCarouselIndex + 1}/{activeCarouselLength}
                </span>
                <button
                  onClick={() => onNavigate(mainSectionTab === "courses" ? "Khóa học" : "Luyện tập")}
                  className="hidden shrink-0 items-center gap-1 rounded-full px-2 py-1.5 text-[11.5px] font-bold leading-snug text-[#126F91] transition-colors hover:bg-[#EFF9FB] hover:text-[#0B6487] sm:flex cursor-pointer"
                >
                  Xem tất cả <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* [HOME-05A] Tab “Chương trình học nổi bật” */}
            {mainSectionTab === "courses" && (
              <section
                id="courses"
                data-section="HOME-05A-FEATURED-PROGRAMS"
                className="relative overflow-hidden sm:h-[198px]"
              >
                {/* Carousel chương trình: ảnh được hiển thị trọn vẹn, điều hướng nổi trên vùng ảnh */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 2xl:grid-cols-4">
                  {visibleCourses.map(({ item: course, originalIndex, offset }) => (
                    <div
                      key={`${course.title}-${originalIndex}`}
                      className={`group animate-fadeIn overflow-hidden rounded-2xl border bg-gradient-to-b ${course.bgClass} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                        offset === 0 ? "block" : offset < 3 ? "hidden sm:block" : "hidden 2xl:block"
                      }`}
                      onClick={() => onNavigate(course.target)}
                      title={course.desc}
                    >
                      <div className="relative h-[104px] overflow-hidden border-b border-white/70 bg-white/35">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.025]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-white/35 to-transparent" />
                      </div>
                      <div className="flex h-[84px] flex-col px-3 py-2.5 text-left">
                        <h4 className="text-[13.5px] font-bold leading-snug text-[#123B68] line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-[11px] font-normal leading-[1.45] text-[#536D86]">
                          {course.desc}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-0.5 pt-1 text-[11.5px] font-bold leading-snug text-[#126F91] transition-colors group-hover:text-[#0B6487]">
                          <span>{course.btnText}</span>
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => moveLearningCarousel(-1)}
                  aria-label="Xem mục trước"
                  className="absolute left-2 top-[37px] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#126F91] shadow-[0_3px_12px_rgba(38,80,100,0.14)] backdrop-blur-sm transition-all hover:bg-white hover:scale-105 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveLearningCarousel(1)}
                  aria-label="Xem mục tiếp theo"
                  className="absolute right-2 top-[37px] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#126F91] shadow-[0_3px_12px_rgba(38,80,100,0.14)] backdrop-blur-sm transition-all hover:bg-white hover:scale-105 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </section>
            )}

            {/* [HOME-05B] Tab “Lộ trình học chuyên nghiệp” */}
            {mainSectionTab === "path" && (
              <section
                id="path"
                data-section="HOME-05B-LEARNING-PATH"
                className="relative overflow-hidden sm:h-[198px]"
              >
                {/* Carousel lộ trình dùng cùng cấu trúc ảnh lớn để hai tab cân bằng thị giác */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 2xl:grid-cols-4">
                  {visibleLearningSteps.map(({ item: step, originalIndex, offset }) => (
                    <div
                      key={`${step.step}-${originalIndex}`}
                      onClick={() => onNavigate("Luyện tập")}
                      className={`group relative h-[188px] animate-fadeIn overflow-hidden rounded-2xl border border-[#DDEAF2] bg-[#F8FBFD] text-left transition-all hover:-translate-y-0.5 hover:border-[#B8DFE8] hover:bg-[#F3FAFC] hover:shadow-sm cursor-pointer ${
                        offset === 0 ? "block" : offset < 3 ? "hidden sm:block" : "hidden 2xl:block"
                      }`}
                      title={step.desc}
                    >
                      <div className="relative flex h-[104px] items-center justify-center overflow-hidden border-b border-white bg-gradient-to-br from-[#F3FAFC] to-[#E7F3F7]">
                        <img
                          src={step.img}
                          alt={step.step}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.025]"
                        />
                        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white/90 text-[10px] font-bold text-[#126F91] shadow-sm">
                          {originalIndex + 1}
                        </span>
                      </div>
                      <div className="flex h-[84px] min-w-0 flex-col px-3 py-2.5">
                        <h5 className="text-[13.5px] font-bold leading-snug text-[#123B68] line-clamp-1">
                          {step.step}
                        </h5>
                        <p className="mt-1 line-clamp-2 text-[11px] font-normal leading-[1.45] text-[#536D86]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => moveLearningCarousel(-1)}
                  aria-label="Xem mục trước"
                  className="absolute left-2 top-[37px] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#126F91] shadow-[0_3px_12px_rgba(38,80,100,0.14)] backdrop-blur-sm transition-all hover:bg-white hover:scale-105 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveLearningCarousel(1)}
                  aria-label="Xem mục tiếp theo"
                  className="absolute right-2 top-[37px] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#126F91] shadow-[0_3px_12px_rgba(38,80,100,0.14)] backdrop-blur-sm transition-all hover:bg-white hover:scale-105 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </section>
            )}
          </div>
        </main>

        {/* [HOME-RIGHT] SIDEBAR PHẢI — tiến độ, xếp hạng, tài liệu và cuộc thi */}
        {/* Sidebar phải chỉ trải qua 2 hàng để khối FAQ bên dưới nối liền, không tạo hàng trống sau HOME-10. */}
        <aside id="leaderboard" data-section="HOME-RIGHT-SIDEBAR" className="flex flex-col gap-3.5 xl:gap-4 lg:row-span-2">
          {/* [HOME-06] KHÔNG GIAN HỌC TẬP — dữ liệu cá nhân theo vai trò, yêu cầu đăng nhập */}
          <div data-section="HOME-06-LEARNING-PROGRESS" className="bg-white rounded-3xl p-3.5 xl:p-4 border border-[#DDEAF0] shadow-[0_4px_16px_rgba(52,91,120,0.045)]">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 xl:gap-2">
                {/* Icon tiến độ dùng cùng khung 32px với các header sidebar khác */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#CFE6EC] bg-[#EAF5F8] text-[#2D7FA3]">
                  <BarChart2 className="h-4 w-4" />
                </span>
                <h4 className="type-card-title text-slate-800">Không gian học tập</h4>
              </div>
              {!isGuest && activeJourney.contexts ? (
                <div className="relative max-w-[132px]">
                  <label htmlFor="journey-context" className="sr-only">{activeJourney.contextLabel}</label>
                  <select
                    id="journey-context"
                    value={journeyContextIndex}
                    onChange={(event) => setJourneyContextIndex(Number(event.target.value))}
                    className="type-label w-full appearance-none rounded-xl border border-[#DCE8ED] bg-[#F5F8FA] py-1 pl-2 pr-6 text-[#536D7E] outline-none transition-colors hover:bg-[#EEF5F7] focus:border-[#A9D2DF]"
                  >
                    {activeJourney.contexts.map((context, index) => (
                      <option key={context.label} value={index}>{context.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
                </div>
              ) : !isGuest && (
                <div
                  onClick={() => setSelectedGrade(selectedGrade === "Lớp 10" ? "Lớp 9" : "Lớp 10")}
                  className="type-label bg-[#F5F8FA] hover:bg-[#EEF5F7] border border-[#DCE8ED] rounded-xl px-2 py-0.5 flex items-center gap-1 cursor-pointer transition-colors text-[#536D7E]"
                >
                  <span>{selectedGrade}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              )}
            </div>

            {isGuest ? (
              /* [HOME-06G] Trạng thái khách — giữ chỗ trong sidebar và giải thích rõ vì sao cần đăng nhập */
              <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-[#F5FAFD] to-[#EEF7FB] p-3.5 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 bg-white text-[#3E88A6] shadow-[0_2px_8px_rgba(64,125,151,0.08)]">
                  <LockKeyhole className="h-5 w-5" />
                </span>
                <p className="type-card-title mt-2.5 text-[#245B7A]">Đăng nhập để xem hành trình</p>
                <p className="type-body mt-1 text-slate-500">Tiến độ, lịch học và báo cáo sẽ được cá nhân hóa theo vai trò của bạn.</p>
                <button
                  type="button"
                  onClick={() => onOpenAccess?.("auth")}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#B9DCE8] bg-white px-3.5 py-2 text-xs font-bold text-[#216F8E] shadow-[0_2px_7px_rgba(64,125,151,0.08)] transition-colors hover:border-[#8FC6D8] hover:bg-[#F7FCFE]"
                >
                  Đăng nhập ngay <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <>
            {/* [HOME-06A] Bộ chọn vai trò — đổi nhanh góc nhìn học sinh, phụ huynh hoặc giáo viên */}
            <div role="tablist" aria-label="Vai trò xem hành trình học" className="mb-3 grid grid-cols-3 gap-1 rounded-2xl bg-[#F3F7F9] p-1">
              {Object.entries(JOURNEY_ROLE_VIEWS).map(([roleKey, roleView]) => {
                const RoleIcon = roleView.icon;
                const isSelected = journeyRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setJourneyRole(roleKey)}
                    className={`flex min-w-0 items-center justify-center gap-1 rounded-xl px-1.5 py-1.5 text-[10px] font-bold transition-all ${
                      isSelected
                        ? "bg-white text-[#245B7A] shadow-[0_2px_7px_rgba(64,105,125,0.12)]"
                        : "text-[#78909E] hover:bg-white/70 hover:text-[#39728B]"
                    }`}
                  >
                    <RoleIcon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? roleView.iconClass : "text-[#9AB0BA]"}`} />
                    <span className="truncate">{roleView.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mb-2.5">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-[#2E718F]">{activeJourneyData.progressLabel}</span>
                <span className="text-[#2E718F]">{activeJourneyData.progress}%</span>
              </div>
              <div className="w-full bg-[#E8F0F3] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#6CC7C4] to-[#3EA7B2] h-1.5 rounded-full transition-[width] duration-500"
                  style={{ width: `${activeJourneyData.progress}%` }}
                ></div>
              </div>
            </div>

            {/* [HOME-06B] Thẻ hành động theo vai trò — luôn chỉ ra việc nên làm tiếp theo */}
            <div
              onClick={() => {
                if (journeyRole === "student") {
                  onOpenCodeWorkspace && onOpenCodeWorkspace({ title: "Bài 12: Cấu trúc dữ liệu và giải thuật", id: "DS_12" });
                } else if (journeyRole === "parent") {
                  onNavigate("Bảng xếp hạng");
                } else {
                  onNavigate("Giáo viên & chuyên gia");
                }
              }}
              className="bg-[#F5FAFB] border border-[#DCECEF] rounded-2xl p-2 xl:p-2.5 mb-2.5 flex items-center justify-between cursor-pointer hover:border-[#C5E1E7] transition-colors"
            >
              <div className="overflow-hidden">
                <p className="type-meta font-bold text-[#2E7E94] uppercase tracking-wide">{activeJourneyData.nextLabel}</p>
                <p className="type-card-title truncate mt-0.5">{activeJourneyData.nextTitle}</p>
                <p className="type-meta mt-0.5 text-slate-500 truncate">{activeJourneyData.nextMeta}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6F9CAC] shrink-0 ml-1.5" />
            </div>

            {/* [HOME-06C] Chỉ số tóm tắt — số liệu thay đổi theo vai trò đang xem */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {activeJourneyData.stats.map((stat) => (
                <div key={stat.label} className="bg-[#F8FAFB] rounded-xl p-1.5 xl:p-2 border border-[#E7EDF0]">
                  <p className={`text-base xl:text-lg font-extrabold leading-tight ${stat.valueClass}`}>{stat.value}</p>
                  <p className="type-meta mt-0.5 text-slate-500 truncate">{stat.label}</p>
                </div>
              ))}
            </div>
              </>
            )}
          </div>

          {/* [HOME-07] XẾP HẠNG & THÔNG BÁO — card có hai tab chuyển đổi */}
          <div data-section="HOME-07-RANKING-NOTIFICATIONS" className="bg-white rounded-3xl p-3.5 xl:p-4 border border-[#DDEAF0] shadow-[0_4px_16px_rgba(52,91,120,0.045)]">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1 bg-[#F2F6F8] p-0.5 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => setSidebarTab("leaderboard")}
                  aria-selected={sidebarTab === "leaderboard"}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    sidebarTab === "leaderboard"
                      ? "border border-[#CDE4EA] bg-white text-[#216F8E] shadow-[0_1px_4px_rgba(44,102,124,0.07)]"
                      : "border border-transparent text-[#6D8293] hover:bg-white/60 hover:text-[#2D718D]"
                  }`}
                >
                  <Trophy className="h-3.5 w-3.5 text-[#B77A22]" />
                  <span>Top xuất sắc</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarTab("notifications")}
                  aria-selected={sidebarTab === "notifications"}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    sidebarTab === "notifications"
                      ? "border border-[#CDE4EA] bg-white text-[#216F8E] shadow-[0_1px_4px_rgba(44,102,124,0.07)]"
                      : "border border-transparent text-[#6D8293] hover:bg-white/60 hover:text-[#2D718D]"
                  }`}
                >
                  <Bell className="h-3.5 w-3.5 text-[#5E8098]" />
                  <span>Thông báo</span>
                </button>
              </div>
            </div>

            {sidebarTab === "leaderboard" && (
              <div>
                <div className="flex flex-col gap-1.5 mb-2.5">
                  {topStudents.map((st) => (
                    <div
                      key={st.rank}
                      onClick={() => onNavigate("Bảng xếp hạng")}
                      className="flex items-center justify-between py-1 px-1.5 rounded-xl hover:bg-sky-50 transition-colors text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-extrabold ${
                          st.rank === 1
                            ? "border-[#E8CD77] bg-[#FFF4D7] text-[#A76D0B]"
                            : st.rank === 2
                              ? "border-[#C9D6DF] bg-[#F0F5F7] text-[#5D7485]"
                              : st.rank === 3
                                ? "border-[#E4C4A7] bg-[#FFF0E4] text-[#A66A42]"
                                : "border-[#DDE8EE] bg-[#F7FAFB] text-[#6D8495]"
                        }`}>
                          {st.rank}
                        </span>
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-7 h-7 rounded-full border border-sky-200 object-cover shadow-2xs"
                        />
                        <span className="font-semibold text-slate-800 truncate max-w-[100px]">{st.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{st.class}</span>
                        <span className="text-xs font-bold text-[#2E6FA7]">{st.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  onClick={() => onNavigate("Bảng xếp hạng")}
                  className="overflow-hidden rounded-2xl border border-sky-100 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src="/assets/achieve-banner.png?v=3"
                    alt="Cùng chinh phục thành tích cao hơn!"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {sidebarTab === "notifications" && (
              <div className="flex flex-col gap-1.5 py-1">
                {[
                  { title: "Kỳ thi HSG Tin học cấp tỉnh sắp diễn ra", time: "3 ngày trước", icon: Trophy, iconStyle: "bg-[#FFF4D7] text-[#B77A22]" },
                  { title: "Lịch học lớp Toán Tin 10A1 tuần này", time: "5 giờ trước", icon: Calendar, iconStyle: "bg-[#E7F3FB] text-[#3A77A2]" },
                  { title: "Bài tập mới: Cấu trúc dữ liệu cơ bản", time: "1 ngày trước", icon: FileText, iconStyle: "bg-[#EAF5F8] text-[#2D7FA3]" },
                  { title: "Bạn đã nộp được một bài tập hôm nay!", time: "2 ngày trước", icon: CheckCircle2, iconStyle: "bg-[#E8F7F0] text-[#258667]" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs group cursor-pointer hover:bg-sky-50/70 p-2 rounded-xl transition-colors">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${item.iconStyle}`}>
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                        {item.title}
                      </p>
                      <p className="type-meta mt-0.5 text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* [HOME-08] TÀI LIỆU NỔI BẬT — danh sách xem nhanh ở sidebar phải */}
          <section
            id="materials"
            data-section="HOME-08-FEATURED-MATERIALS"
            className="bg-white rounded-3xl p-3.5 xl:p-4 border border-[#DDEAF0] shadow-[0_4px_16px_rgba(52,91,120,0.045)]"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl border border-[#D5E6EF] bg-[#EAF3F8] flex items-center justify-center text-[#3A77A2] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="type-card-title">Tài liệu nổi bật</h3>
                  <p className="type-meta mt-0.5 truncate text-slate-500">Chọn lọc cho mục tiêu của bạn</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("Tài liệu")}
                className="type-action text-[#3A7598] hover:text-[#285F7D] whitespace-nowrap cursor-pointer"
              >
                Tất cả →
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {books.slice(0, 2).map((book) => (
                <button
                  key={book.title}
                  onClick={() => onNavigate("Tài liệu")}
                  className="group w-full flex items-center gap-2.5 rounded-2xl border border-[#E1EBF0] bg-[#F8FAFB] p-2 text-left transition-all hover:border-[#C9DFE8] hover:bg-[#F3F8FA] hover:shadow-sm cursor-pointer"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-14 rounded-xl object-cover border border-sky-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="type-card-title line-clamp-2 group-hover:text-blue-600">
                      {book.title}
                    </h4>
                    <p className="type-meta mt-1 truncate text-slate-500">{book.pages} • {book.tag}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate("Tài liệu")}
              className="mt-2.5 w-full rounded-xl border border-[#DCEAF0] bg-[#F1F7FA] py-2 text-xs font-bold text-[#2F718F] transition-colors hover:bg-[#E8F3F6] cursor-pointer"
            >
              Khám phá kho tài liệu
            </button>
          </section>

          {/* [HOME-09] CUỘC THI & KHẢO SÁT — danh sách xem nhanh ở sidebar phải */}
          <section
            id="contests"
            data-section="HOME-09-CONTESTS"
            className="bg-white rounded-3xl p-3.5 xl:p-4 border border-[#DDEAF0] shadow-[0_4px_16px_rgba(52,91,120,0.045)]"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl border border-[#F0DEB2] bg-[#FFF6DF] flex items-center justify-center text-[#B47A22] shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="type-card-title">Cuộc thi & khảo sát</h3>
                  <p className="type-meta mt-0.5 truncate text-slate-500">Sự kiện đang và sắp diễn ra</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("Cuộc thi")}
                className="type-action text-[#3A7598] hover:text-[#285F7D] whitespace-nowrap cursor-pointer"
              >
                Tất cả →
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {competitions.slice(0, 2).map((competition) => (
                <button
                  key={competition.title}
                  onClick={() => onNavigate("Cuộc thi")}
                  className="group w-full overflow-hidden rounded-2xl border border-[#E7E5DE] bg-[#FAFBFB] text-left transition-all hover:border-[#E6D6AD] hover:bg-[#FFFCF4] hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-stretch">
                    <img
                      src={competition.image}
                      alt={competition.title}
                      className="w-16 min-h-18 object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 p-2.5">
                      <h4 className="type-card-title line-clamp-2 group-hover:text-blue-600">
                        {competition.title}
                      </h4>
                      <p className="type-meta mt-1 flex items-center gap-1 truncate text-slate-500">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span className="truncate">{competition.time}</span>
                      </p>
                      <p className={`type-meta mt-1 flex items-center gap-1 font-bold ${competition.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${competition.statusDot}`} />
                        {competition.status}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate("Cuộc thi")}
              className="mt-2.5 w-full rounded-xl border border-[#F0E2BD] bg-[#FFF8E8] py-2 text-xs font-bold text-[#976921] transition-colors hover:bg-[#FFF3D4] cursor-pointer"
            >
              Xem lịch cuộc thi
            </button>
          </section>
        </aside>

      {/* [HOME-10] CÂU CHUYỆN ĐỒNG HÀNH — cảm nhận của học sinh, phụ huynh, giáo viên */}
        <section
          id="testimonials"
          data-section="HOME-10-TESTIMONIALS"
          className="lg:col-span-2 bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                  <Heart className="w-4.5 h-4.5 text-white fill-white" />
                </div>
                <div>
                  <h3 className="type-section-title">
                    Câu chuyện đồng hành
                  </h3>
                  <p className="type-body mt-0.5 text-slate-500">
                    Những câu chuyện thật, truyền cảm hứng thật
                  </p>
                </div>
              </div>
              <button
                  onClick={() => onNavigate("Giáo viên & chuyên gia")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Xem thêm câu chuyện →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="bg-[#F8FBFE] rounded-2xl border border-sky-100/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="w-full h-22 sm:h-24 overflow-hidden">
                    <img
                      src={t.banner}
                      alt={t.author}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between bg-white m-1.5 rounded-xl border border-sky-50 shadow-2xs">
                    <p className="type-body mb-2 line-clamp-3 italic text-slate-600">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-6.5 h-6.5 rounded-full object-cover border border-sky-200 shadow-2xs"
                      />
                      <div className="overflow-hidden text-left">
                        <p className="type-card-title truncate">
                          {t.author}
                        </p>
                        <p className="type-meta mt-0.5 truncate text-slate-400">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* [HOME-10A] Chân khối đồng hành — dải họa tiết nhẹ giúp kết thúc card và cân bằng khoảng trống */}
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#DDEEF4] bg-gradient-to-r from-[#F3FAFC] via-white to-[#F8F5FF] px-3.5 py-2.5">
              <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full text-[#DCEFF4]" viewBox="0 0 720 56" fill="none" aria-hidden="true">
                <path d="M0 42C96 10 158 10 244 36C326 60 401 57 482 26C568 -7 639 8 720 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 51C96 19 158 19 244 45C326 69 401 66 482 35C568 2 639 17 720 44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".7" />
              </svg>
              <div className="relative flex items-center gap-2.5">
                <div className="flex shrink-0 -space-x-2">
                  {testimonials.slice(0, 3).map((t) => (
                    <img
                      key={`supporter-${t.author}`}
                      src={t.avatar}
                      alt=""
                      className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-[0_2px_6px_rgba(55,104,123,0.12)]"
                    />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="type-card-title truncate text-[#245B7A]">Đồng hành để tiến bộ mỗi ngày</p>
                  <p className="type-meta mt-0.5 truncate text-slate-500">Học sinh, gia đình và thầy cô cùng chung một mục tiêu.</p>
                </div>
                <Heart className="h-4 w-4 shrink-0 text-[#74B6C5]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

      {/* [HOME-11] HỖ TRỢ TOÀN CHIỀU NGANG — FAQ bên trái, liên hệ hỗ trợ bên phải */}
      <div id="support" data-section="HOME-11-SUPPORT-ROW" className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* [HOME-11A] Câu hỏi thường gặp */}
        <section data-section="HOME-11A-FAQ" className="h-full bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8.5 h-8.5 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                <HelpCircle className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h3 className="type-section-title">
                  Câu hỏi thường gặp
                </h3>
                <p className="type-body mt-0.5 text-slate-500">
                  Giải đáp nhanh những thắc mắc phổ biến
                </p>
              </div>
            </div>

            <div className="border border-sky-100 rounded-2xl divide-y divide-sky-100 overflow-hidden bg-white">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="type-card-title w-full text-left px-4 py-2.5 flex items-center justify-between text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="type-body px-4 pb-3 text-slate-600 bg-sky-50/40 border-t border-sky-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* [HOME-11B] Liên hệ tư vấn và hỗ trợ */}
        <section data-section="HOME-11B-CONTACT-SUPPORT" className="h-full relative overflow-hidden rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between min-h-[300px] sm:min-h-[320px]">
          <img
            src="/assets/support-banner-bg.jpg"
            alt="Cần hỗ trợ?"
            className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-right pointer-events-none select-none z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 sm:from-white/80 sm:via-white/50 sm:to-transparent z-0 pointer-events-none" />

          <div className="absolute top-4 right-4 sm:right-6 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-sky-200 shadow-xs text-[11px] font-semibold text-sky-800 leading-tight text-center pointer-events-none z-10 hidden sm:block">
            Chúng tôi<br />luôn ở đây<br />cùng bạn!
          </div>

          <div className="relative z-10 w-full sm:max-w-[58%] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8.5 h-8.5 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs shrink-0">
                  <Headphones className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="type-section-title">Cần hỗ trợ?</h3>
                  <p className="type-body mt-0.5 text-slate-600">
                    Đội ngũ tư vấn luôn sẵn sàng đồng hành cùng bạn trên hành trình chinh phục tri thức.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 my-2.5 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 shrink-0" />
                  <span>Tư vấn lộ trình học phù hợp</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 shrink-0" />
                  <span>Hỗ trợ kỹ thuật, giải đáp thắc mắc</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 shrink-0" />
                  <span>Đồng hành cùng học sinh và phụ huynh</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5">
              <button
                onClick={() => onNavigate("Thông tin")}
                className="bg-[#0091FF] hover:bg-blue-600 text-white font-bold text-xs py-2 px-5 rounded-full shadow-md inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Liên hệ tư vấn</span>
                <span className="text-xs font-bold">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
