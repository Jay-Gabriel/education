import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Code,
  FileText,
  Trophy,
  BarChart2,
  Users,
  Info,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Headphones,
  Heart,
  Target,
  GraduationCap,
  Menu,
  X,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Trang chủ');
  const [activeSidebar, setActiveSidebar] = useState('Trang chủ');
  const [activeDocTab, setActiveDocTab] = useState('Sách');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('Lớp 10');
  const [selectedGoal, setSelectedGoal] = useState('Luyện thi HSG Tin học lớp 9');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Slideshow State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  const heroSlides = [
    {
      id: 'hsg',
      tabTitle: 'Giải cao HSG',
      tag: '🏆 Đấu trường đỉnh cao',
      tagStyle: 'bg-amber-100/90 text-amber-800 border-amber-300',
      subtitle: 'Luyện thi Tin học – Đồng hành cùng bạn chinh phục giải HSG & Olympic Tin học',
      badges: ['HSG Tin học lớp 9', 'HSG Quốc gia lớp 12', 'Olympic Tin học', 'Bồi dưỡng đội tuyển'],
      defaultGoal: 'Luyện thi HSG Tin học lớp 9',
      bgImage: '/assets/hero-banner-hsg.jpg',
      floatingCard: {
        icon: '🥇',
        title: 'Giải Nhất HSG Quốc gia 2025',
        desc: 'Điểm tuyệt đối phần Quy hoạch động & Đồ thị',
        badge: 'Top 1 Toàn quốc'
      }
    },
    {
      id: 'chuyen-tin',
      tabTitle: 'Đỗ Chuyên Tin',
      tag: '🎯 Mục tiêu trường Chuyên',
      tagStyle: 'bg-blue-100/90 text-blue-800 border-blue-300',
      subtitle: 'Luyện thi vào lớp 10 Chuyên Tin – Tự tin đỗ trường Chuyên top đầu cả nước',
      badges: ['Chuyên Khoa Học Tự Nhiên', 'Chuyên Sư Phạm', 'Chuyên Amsterdam', 'Chuyên Tin các tỉnh'],
      defaultGoal: 'Luyện thi vào lớp 10 chuyên Tin',
      bgImage: '/assets/hero-banner-chuyen.jpg',
      floatingCard: {
        icon: '🎓',
        title: 'Thủ khoa Chuyên KHTN & CSP',
        desc: 'Tự tin đỗ lớp 10 chuyên thuật toán & C++',
        badge: 'Đỗ Chuyên 100%'
      }
    },
    {
      id: 'tot-nghiep',
      tabTitle: 'Điểm cao Tốt nghiệp',
      tag: '⚡ Bứt phá điểm 9+',
      tagStyle: 'bg-emerald-100/90 text-emerald-800 border-emerald-300',
      subtitle: 'Tổng ôn cấp tốc THPT – Chinh phục điểm 9+ môn Tin học kỳ thi Tốt nghiệp 2025–2026',
      badges: ['Điểm 9+ THPT môn Tin', '100+ Đề thi thử trắc nghiệm', 'Lý thuyết trọng tâm', 'Chấm điểm tự động'],
      defaultGoal: 'Ôn thi tốt nghiệp môn Tin học',
      bgImage: '/assets/hero-banner-totnghiep.jpg',
      floatingCard: {
        icon: '💯',
        title: '10/10 Điểm Tin Tốt Nghiệp THPT',
        desc: 'Nắm chắc 100% ma trận & định dạng đề thi mới',
        badge: 'Thủ khoa A00 / B00'
      }
    },
    {
      id: 'du-hoc',
      tabTitle: 'Phỏng vấn du học',
      tag: '✈️ Vươn ra thế giới',
      tagStyle: 'bg-purple-100/90 text-purple-800 border-purple-300',
      subtitle: 'Luyện thuật toán quốc tế AP CS & USACO – Tự tin phỏng vấn học bổng Du học ngành Tech',
      badges: ['USACO Bronze / Silver / Gold', 'AP Computer Science A', 'Portfolio Tech quốc tế', 'Học bổng Du học $50k+'],
      defaultGoal: 'Học trước chương trình Tin học để du học',
      bgImage: '/assets/hero-banner-duhoc.jpg',
      floatingCard: {
        icon: '🌐',
        title: 'Học bổng $50,000 Đại học Mỹ',
        desc: 'USACO Gold Division & AP CS điểm 5/5',
        badge: 'Tech Scholarship'
      }
    }
  ];

  // Auto-play slideshow timer (every 4.5s unless hovered)
  useEffect(() => {
    if (isSlidePaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isSlidePaused, heroSlides.length]);

  const handleSelectSlide = (index) => {
    setCurrentSlideIndex(index);
    setSelectedGoal(heroSlides[index].defaultGoal);
  };

  const handlePrevSlide = () => {
    const nextIdx = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    setCurrentSlideIndex(nextIdx);
    setSelectedGoal(heroSlides[nextIdx].defaultGoal);
  };

  const handleNextSlide = () => {
    const nextIdx = (currentSlideIndex + 1) % heroSlides.length;
    setCurrentSlideIndex(nextIdx);
    setSelectedGoal(heroSlides[nextIdx].defaultGoal);
  };

  const navItems = [
    { name: 'Trang chủ', icon: Home, targetId: 'hero' },
    { name: 'Lớp học', icon: BookOpen, targetId: 'courses' },
    { name: 'Luyện tập', icon: Code, targetId: 'path' },
    { name: 'Tài liệu', icon: FileText, targetId: 'materials' },
    { name: 'Cuộc thi', icon: Trophy, targetId: 'contests' },
    { name: 'Bảng xếp hạng', icon: BarChart2, targetId: 'leaderboard' },
    { name: 'Giáo viên & Chuyên gia', icon: Users, targetId: 'testimonials' },
    { name: 'Thông tin', icon: Info, targetId: 'support' },
  ];

  const scrollToSection = (targetId, name) => {
    setActiveNav(name);
    setActiveSidebar(name);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    'Luyện thi HSG Tin học lớp 9',
    'Luyện thi HSG môn Tin học lớp 12',
    'Luyện thi vào lớp 10 chuyên Tin',
    'Ôn thi tốt nghiệp môn Tin học',
    'Học trước chương trình Tin học để du học'
  ];

  const featuredCourses = [
    {
      title: 'Bài tập tự luyện',
      desc: 'Hệ thống bài tập tự luyện phong phú theo từng chuyên đề từ cơ bản đến nâng cao',
      btnText: 'Luyện tập ngay',
      bgClass: 'from-[#EAF4FE] to-[#D8EAFD] border-[#BAE0FD]',
      btnClass: 'bg-[#38BDF8] hover:bg-[#0284C7] text-white',
      image: '/assets/course-img-1.png?v=3'
    },
    {
      title: 'Tài liệu',
      desc: 'Sách, chuyên đề, bộ đề, giáo viên và chuyên gia uy tín hỗ trợ và đồng hành',
      btnText: 'Khám phá',
      bgClass: 'from-[#E8FBF6] to-[#D0F5E7] border-[#A7F3D0]',
      btnClass: 'bg-[#2DD4BF] hover:bg-[#0D9488] text-white',
      image: '/assets/course-img-2.png?v=3'
    },
    {
      title: 'Lớp học',
      desc: 'Lớp học chuyên nghiệp, quản lý và theo dõi tiến độ học sinh chuẩn mực',
      btnText: 'Vào lớp học',
      bgClass: 'from-[#F3EFFF] to-[#E5DEFF] border-[#DDD6FE]',
      btnClass: 'bg-[#A78BFA] hover:bg-[#7C3AED] text-white',
      image: '/assets/course-img-3.png?v=3'
    },
    {
      title: 'Giáo viên & Chuyên gia',
      desc: 'Đội ngũ giáo viên chuyên nghiệp & chuyên gia uy tín đồng hành tận tâm',
      btnText: 'Xem đội ngũ',
      bgClass: 'from-[#FFF7E6] to-[#FEEAD0] border-[#FED7AA]',
      btnClass: 'bg-[#FB923C] hover:bg-[#EA580C] text-white',
      image: '/assets/course-img-4.png?v=3'
    },
    {
      title: 'Cuộc thi',
      desc: 'Cuộc thi, khảo sát được tổ chức thường xuyên và công bằng',
      btnText: 'Tìm hiểu',
      bgClass: 'from-[#E6F7FF] to-[#CCEFFF] border-[#BAE6FD]',
      btnClass: 'bg-[#38BDF8] hover:bg-[#0284C7] text-white',
      image: '/assets/course-img-5.png?v=3'
    }
  ];

  const learningSteps = [
    {
      step: '1. Lựa chọn mục tiêu',
      desc: 'Chọn mục tiêu lớp phù hợp',
      img: '/assets/step-1.png?v=3'
    },
    {
      step: '2. Chọn lộ trình phù hợp',
      desc: 'Học theo năng lực & mục tiêu',
      img: '/assets/step-2.png?v=3'
    },
    {
      step: '3. Luyện tập & học liệu',
      desc: 'Bài tập, giáo trình, chuyên đề',
      img: '/assets/step-3.png?v=3'
    },
    {
      step: '4. Lớp học & giáo viên',
      desc: 'Học cùng giáo viên, nhận hỗ trợ',
      img: '/assets/step-4.png?v=3'
    },
    {
      step: '5. Thi & Đánh giá',
      desc: 'Cuộc thi, đánh giá phát năng lực',
      img: '/assets/step-5.png?v=3'
    }
  ];

  const audiencePills = [
    {
      title: 'Học sinh tự luyện',
      desc: 'Luyện tập theo chuyên đề',
      img: '/assets/aud-1.png?v=4'
    },
    {
      title: 'Phụ huynh đồng hành',
      desc: 'Theo dõi tiến độ và kết quả',
      img: '/assets/aud-2.png?v=4'
    },
    {
      title: 'Lớp học chuyên nghiệp',
      desc: 'Quản lý lớp, nhận xét học sinh',
      img: '/assets/aud-3.png?v=4'
    },
    {
      title: 'Giáo viên & Chuyên gia',
      desc: 'Đồng hành, hỗ trợ cao cấp',
      img: '/assets/aud-4.png?v=4'
    },
    {
      title: 'Hệ thống & cuộc thi',
      desc: 'Học liệu chuẩn, đấu trường uy tín',
      img: '/assets/aud-5.png?v=4'
    }
  ];

  const books = [
    {
      title: 'Lập trình căn bản với Python',
      tag: 'Dành cho học sinh 6–10',
      pages: '320 trang',
      highlight: 'Nhiều bài tập minh họa',
      image: '/assets/book-img-1.png?v=3',
      btnText: 'Xem tài liệu',
      btnStyle: 'bg-[#38BDF8] hover:bg-sky-500 text-white'
    },
    {
      title: 'Chuyên đề Cấu trúc dữ liệu và giải thuật',
      tag: 'Dành cho HSG lớp 10–12',
      pages: '200 trang',
      highlight: 'Bài tập nâng cao',
      image: '/assets/book-img-2.png?v=3',
      btnText: 'Xem tài liệu',
      btnStyle: 'bg-[#38BDF8] hover:bg-sky-500 text-white'
    },
    {
      title: 'Tuyển tập đề thi HSG Tin học các tỉnh',
      tag: 'Cập nhật 2020 – 2025',
      pages: '500+ đề thi',
      highlight: 'Có lời giải chi tiết',
      image: '/assets/book-img-3.png?v=3',
      btnText: 'Xem chi tiết',
      btnStyle: 'bg-[#FDBA74] hover:bg-amber-400 text-amber-950 font-bold'
    },
    {
      title: 'Bộ đề ôn thi vào lớp 10 chuyên Tin',
      tag: 'Theo cấu trúc mới nhất',
      pages: '300 đề luyện tập',
      highlight: 'Có đáp án và lời giải',
      image: '/assets/book-img-4.png?v=4',
      btnText: 'Xem tài liệu',
      btnStyle: 'bg-[#38BDF8] hover:bg-sky-500 text-white'
    }
  ];

  const competitions = [
    {
      title: 'Kỳ thi HSG Tin học cấp tỉnh năm 2025–2026',
      time: 'Bắt đầu: 15/11/2025',
      status: 'Đang nhận đăng ký',
      statusColor: 'text-emerald-600',
      statusDot: 'bg-emerald-500',
      image: '/assets/contest-img-1.png?v=3'
    },
    {
      title: 'Cuộc thi Lập trình Online Ôn Thi 360 lần 3',
      time: 'Thời gian: 20/10/2025',
      status: 'Sắp diễn ra',
      statusColor: 'text-amber-500',
      statusDot: 'bg-amber-400',
      image: '/assets/contest-img-2.png?v=3'
    },
    {
      title: 'Khảo sát năng lực Tin học',
      time: 'Thời gian: 01/11 – 10/11/2025',
      status: 'Đang mở',
      statusColor: 'text-emerald-600',
      statusDot: 'bg-emerald-500',
      image: '/assets/contest-img-3.png?v=3'
    }
  ];

  const testimonials = [
    {
      quote: '“ Nhờ Ôn Thi 360, mình tự tin hơn rất nhiều trong học tập và đạt kết quả tốt ở kỳ thi HSG cấp tỉnh. Nền tảng giúp mình có lộ trình rõ ràng và bài tập chất lượng. ”',
      author: 'Nguyễn Hà Phương',
      role: 'Học sinh lớp 12',
      banner: '/assets/testi-banner-1.png?v=3',
      avatar: '/assets/testi-av-1.png?v=3'
    },
    {
      quote: '“ Tôi rất yên tâm khi con học tại Ôn Thi 360. Con tiến bộ rõ rệt, chúng tôi có thể theo dõi tiến độ và nhận được sự hỗ trợ tận tình từ đội ngũ giáo viên. ”',
      author: 'Chị Trần Thị Mai',
      role: 'Phụ huynh học sinh',
      banner: '/assets/testi-banner-2.png?v=3',
      avatar: '/assets/testi-av-2.png?v=3'
    },
    {
      quote: '“ Ôn Thi 360 là nền tảng hữu ích, giúp học sinh tiếp cận kiến thức Tin học một cách hệ thống, hiện đại và hiệu quả. ”',
      author: 'Thầy Lê Minh Đức',
      role: 'Giáo viên Tin học',
      banner: '/assets/testi-banner-3.png?v=3',
      avatar: '/assets/testi-av-3.png?v=3'
    }
  ];

  const faqs = [
    {
      q: '1. Ôn Thi 360 có những lớp học nào?',
      a: 'Ôn Thi 360 cung cấp đầy đủ các khóa học từ Lập trình cơ bản THCS, Bồi dưỡng HSG Tin học lớp 9, Ôn thi vào lớp 10 chuyên Tin, đến Luyện thi HSG Quốc gia và Thi tốt nghiệp THPT.'
    },
    {
      q: '2. Tài liệu tại Ôn Thi 360 có phù hợp với chương trình giáo dục hiện hành?',
      a: 'Toàn bộ giáo trình, chuyên đề và bộ đề thi đều được cập nhật bám sát chương trình GDPT mới nhất, được thẩm định bởi đội ngũ giáo viên trường chuyên và chuyên gia Tin học uy tín.'
    },
    {
      q: '3. Làm thế nào để luyện tập theo chuyên đề hiệu quả?',
      a: 'Học sinh nên theo đúng lộ trình: Đọc lý thuyết trọng tâm -> Làm bài tập tự luyện có chấm tự động -> Xem giải thích chi tiết -> Làm bài kiểm tra năng lực cuối mỗi chuyên đề.'
    },
    {
      q: '4. Phụ huynh có thể theo dõi tiến độ học tập của con như thế nào?',
      a: 'Phụ huynh có tài khoản đồng hành riêng để xem chi tiết thời gian học, số bài tập đã nộp, tỷ lệ làm đúng và nhận báo cáo tiến độ định kỳ hàng tuần từ hệ thống.'
    }
  ];

  const topStudents = [
    { rank: 1, name: 'Nguyễn Minh Anh', class: '10A1', score: '9.8', avatar: '/assets/rank-1.png' },
    { rank: 2, name: 'Trần Đức Duy', class: '10A2', score: '9.6', avatar: '/assets/rank-2.png' },
    { rank: 3, name: 'Lê Phương Thảo', class: '10A3', score: '9.5', avatar: '/assets/rank-3.png' },
    { rank: 4, name: 'Phạm Hoàng Nam', class: '10A2', score: '9.3', avatar: '/assets/rank-4.png' },
    { rank: 5, name: 'Vũ Thị Mai', class: '10A2', score: '9.2', avatar: '/assets/rank-5.png' }
  ];

  return (
    <div className="min-h-screen bg-[#EEF5FC] text-slate-800 font-sans antialiased selection:bg-blue-100">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] w-full">
        <div className="max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-10 py-2 sm:py-2.5 flex items-center justify-between gap-2 lg:gap-3">
          {/* Left: Mobile Menu Button + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-blue-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => scrollToSection('hero', 'Trang chủ')}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <img
                src="/assets/header-logo.png?v=3"
                alt="Ôn Thi 360 - Học cùng mục tiêu – Vươn xa ước mơ"
                className="h-7 sm:h-8 lg:h-8.5 xl:h-9 object-contain"
              />
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap shrink-0">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <React.Fragment key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.targetId, item.name)}
                    className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#E6F3FF] text-[#0066CC] shadow-2xs font-bold'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-sky-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isActive ? 'text-[#0066CC]' : 'text-blue-600'}`} />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </button>
                  {idx < navItems.length - 1 && (
                    <span className="text-slate-200 font-light text-xs px-0.5 select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Search & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="relative hidden 2xl:block">
              <input
                type="text"
                placeholder="Tìm kiếm bài học, đề thi, sách..."
                className="w-44 2xl:w-56 pl-8 pr-3 py-1.5 text-xs bg-[#F0F6FC] border border-sky-200/80 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <button className="relative p-1.5 text-slate-600 hover:text-blue-600 hover:bg-sky-50 rounded-full transition-colors cursor-pointer shrink-0">
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-slate-200 cursor-pointer shrink-0">
              <img
                src="/assets/user-avatar.png"
                alt="Avatar"
                className="w-8 h-8 rounded-full border-2 border-sky-300 object-cover shadow-2xs shrink-0"
              />
              <div className="text-left hidden 2xl:block leading-tight">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                  Nguyễn Minh Anh
                </p>
                <p className="text-[10px] text-blue-600 font-medium">Học sinh</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-sky-100 bg-white px-4 py-3 shadow-lg flex flex-col gap-1 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.targetId, item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-[#E6F3FF] text-[#0066CC] font-bold'
                      : 'text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066CC]' : 'text-blue-600'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="max-w-[1780px] mx-auto px-3 sm:px-5 lg:px-6 2xl:px-10 py-3 sm:py-5">
        {/* 2. SYSTEM TICKER BAR */}
        <div className="mb-4 sm:mb-5 bg-gradient-to-r from-[#FFF9E6] via-[#F0F7FD] to-[#EAF4FE] border border-amber-200/80 rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-xs sm:text-sm lg:text-base">
            <span className="text-amber-500 text-base sm:text-lg animate-pulse">📢</span>
            <span className="font-bold text-amber-800 shrink-0 text-xs sm:text-sm">Thông báo hệ thống</span>
            <span className="text-slate-300">|</span>
            <p className="text-slate-700 truncate font-medium text-xs sm:text-sm">
              Kỳ thi HSG Tin học cấp tỉnh năm học 2025–2026 sắp diễn ra. Hãy chuẩn bị thật tốt!
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-slate-400 shrink-0 ml-2">
            <button className="p-1 hover:text-blue-600 hover:bg-white rounded-full transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1 hover:text-blue-600 hover:bg-white rounded-full transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 3. TOP 3-COLUMN LAYOUT: Left Menu | Main Center | Right Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr_280px] xl:grid-cols-[240px_1fr_310px] 2xl:grid-cols-[260px_1fr_360px] gap-3.5 sm:gap-4 xl:gap-5 2xl:gap-6 items-start">
          {/* LEFT SIDEBAR (Menu trái) */}
          <aside className="hidden lg:flex flex-col gap-3.5 xl:gap-4 shrink-0">
            {/* Sidebar Menu */}
            <div className="bg-white rounded-3xl p-3 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeSidebar === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.targetId, item.name)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs xl:text-sm font-semibold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#E6F3FF] text-[#0066CC] font-bold shadow-2xs'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 xl:w-4.5 xl:h-4.5 shrink-0 ${isSelected ? 'text-[#0066CC]' : 'text-blue-600'}`} />
                    <span className="whitespace-nowrap truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Banner: Cùng nhau kiến tạo tương lai số */}
            <div className="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] cursor-pointer hover:shadow-md transition-all group">
              <img
                src="/assets/sidebar-plane.jpg"
                alt="Cùng nhau kiến tạo tương lai số"
                className="w-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>

            {/* Teacher Card: Thầy Nguyễn Tiến Thành */}
            <div className="bg-white rounded-3xl p-3.5 xl:p-4 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] text-center">
              <div className="flex items-center gap-2.5 xl:gap-3 text-left mb-2.5 xl:mb-3">
                <img
                  src="/assets/teacher-thanh.png"
                  alt="Thầy Nguyễn Tiến Thành"
                  className="w-9 h-9 xl:w-11 xl:h-11 rounded-full border-2 border-sky-300 object-cover shrink-0 shadow-2xs"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs xl:text-sm font-bold text-[#0B3C78] leading-tight truncate">Thầy Nguyễn Tiến Thành</h4>
                  <p className="text-[10px] xl:text-xs text-slate-500 leading-tight mt-0.5 truncate">
                    GV THPT Chuyên Thái Bình
                  </p>
                </div>
              </div>
              <p className="text-[11px] xl:text-xs 2xl:text-sm font-bold text-blue-700 pt-2.5 xl:pt-3 border-t border-sky-100 leading-snug">
                Kiến thức là chìa khóa mở ra tương lai
              </p>
            </div>
          </aside>

          {/* MAIN CENTER COLUMN (Hero, Search Box, Featured Courses, Learning Path) */}
          <main className="flex flex-col gap-4 sm:gap-5 min-w-0">
            {/* HERO BANNER WITH ARTISTIC SHADOW & SPACIOUS COMPOSITION */}
            <section
              id="hero"
              onMouseEnter={() => setIsSlidePaused(true)}
              onMouseLeave={() => setIsSlidePaused(false)}
              className="relative rounded-3xl border border-sky-200/90 shadow-[0_12px_40px_rgba(0,100,220,0.09)] overflow-hidden p-4 sm:p-6 lg:p-7 min-h-[340px] sm:min-h-[380px] lg:min-h-[390px] flex flex-col justify-between group/hero"
            >
              {/* 4 Theme-Specific Ultra-HD Background Artworks with Smooth Cross-Fade */}
              {heroSlides.map((slide, idx) => (
                <img
                  key={slide.id}
                  src={slide.bgImage}
                  alt={slide.subtitle}
                  className={`absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none z-0 transition-opacity duration-700 ease-in-out ${
                    currentSlideIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))}

              {/* Background gradient overlay for crystal clear text legibility on left */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent pointer-events-none z-0" />

              {/* SLIDESHOW TOP TABS & NAVIGATION */}
              <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2 mb-2 pb-1 border-b border-sky-100/70">
                {/* 4 Theme Tabs with smooth horizontal scroll */}
                <div className="flex-1 min-w-0 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {heroSlides.map((slide, idx) => {
                    const isActive = currentSlideIndex === idx;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-[#0050A0] text-white shadow-md shadow-blue-900/20 scale-102'
                            : 'bg-white/85 hover:bg-white text-slate-700 hover:text-blue-700 border border-slate-200/80 shadow-2xs'
                        }`}
                      >
                        <span>{slide.tabTitle}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Slideshow Controls (Prev / Next / Indicators) */}
                <div className="flex items-center gap-1 shrink-0 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full border border-sky-200/80 shadow-2xs">
                  <button
                    onClick={handlePrevSlide}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-sky-50 transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <div className="flex items-center gap-1 px-1">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSlide(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentSlideIndex === idx
                            ? 'w-4 bg-[#0050A0]'
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNextSlide}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-sky-50 transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Main Slide Content Area */}
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 my-auto">
                {/* Left Text Block */}
                <div
                  key={heroSlides[currentSlideIndex].id}
                  className="w-full max-w-full sm:max-w-[62%] lg:max-w-[58%] xl:max-w-[55%] flex flex-col gap-2.5 animate-fadeIn"
                >
                  {/* Category Pill Tag */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border shadow-2xs ${heroSlides[currentSlideIndex].tagStyle}`}
                    >
                      {heroSlides[currentSlideIndex].tag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      • Lộ trình chuẩn quốc gia & quốc tế
                    </span>
                  </div>

                  {/* 3D Stylized Title with Golden Orbit */}
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0050A0] tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-2">
                      <span>Ôn Thi</span>
                      <span className="text-[#F59E0B] relative inline-block">
                        360
                        {/* Golden orbital swoosh */}
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
                  <h2 className="text-xs sm:text-base lg:text-lg font-bold text-[#0F3A7A] leading-snug">
                    {heroSlides[currentSlideIndex].subtitle}
                  </h2>

                  {/* Dynamic Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                    {heroSlides[currentSlideIndex].badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#E8F8F0]/95 text-[#0D8A4E] border border-[#A7E8C5] shadow-2xs backdrop-blur-xs whitespace-nowrap shrink-0"
                      >
                        <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0D8A4E] fill-[#C7F3DC]" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* DEDICATED SEARCH & GOAL SELECTOR CARD (Hạ xuống dưới thanh thoát & thoáng) */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-[0_4px_20px_rgba(0,100,220,0.06)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0066CC]">
                  <img src="/assets/badge-target.png?v=4" alt="Mục tiêu" className="w-5.5 h-5.5 object-contain shrink-0 rounded-lg shadow-2xs" />
                  <span>Chọn mục tiêu học hoặc lộ trình của bạn</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Phù hợp học sinh lớp 6 – 12</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] xl:flex xl:flex-row items-stretch xl:items-center gap-2.5">
                {/* Dropdown 1: Lớp hiện tại */}
                <div
                  onClick={() => setSelectedGrade(selectedGrade === 'Lớp 10' ? 'Lớp 9' : 'Lớp 10')}
                  className="bg-[#F0F6FC] hover:bg-sky-100/70 border border-sky-200/90 rounded-2xl px-3 py-2 flex items-center justify-between cursor-pointer transition-colors group xl:w-[125px] xl:shrink-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <GraduationCap className="w-4.5 h-4.5 text-[#0066CC] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium leading-none">Lớp hiện tại</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#0359B5] leading-tight mt-0.5 truncate">{selectedGrade}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 ml-1" />
                </div>

                {/* Dropdown 2: Mục tiêu học */}
                <div
                  onClick={() => setSelectedGoal(selectedGoal.includes('lớp 9') ? 'Luyện thi vào lớp 10 chuyên Tin' : 'Luyện thi HSG Tin học lớp 9')}
                  className="min-w-0 bg-[#F0F6FC] hover:bg-sky-100/70 border border-sky-200/90 rounded-2xl px-3.5 py-2 flex items-center justify-between cursor-pointer transition-colors group xl:flex-1"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img src="/assets/badge-target.png?v=4" alt="Mục tiêu" className="w-5 h-5 object-contain shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-medium leading-none">Mục tiêu học</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#0359B5] leading-tight truncate mt-0.5">{selectedGoal}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 group-hover:text-blue-600 transition-colors" />
                </div>

                {/* Yellow CTA Button */}
                <button
                  onClick={() => alert(`Tìm kiếm lớp học cho: ${selectedGrade} - ${selectedGoal}`)}
                  className="col-span-full xl:col-auto xl:w-auto shrink-0 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 active:scale-98 text-[#451A03] font-black text-xs sm:text-sm py-2.5 px-5 sm:px-6 rounded-full shadow-md shadow-amber-200/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Tìm kiếm lớp học</span>
                  <span className="text-sm font-bold">→</span>
                </button>
              </div>

              {/* 5 Quick Pill Buttons with Smooth Horizontal Scroll on Mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto sm:flex-wrap no-scrollbar pt-1.5 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 hidden sm:inline">Gợi ý nhanh:</span>
                {quickLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => setSelectedGoal(link)}
                    className={`border rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-all shadow-2xs whitespace-nowrap shrink-0 ${
                      selectedGoal === link
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED COURSES (Chương trình học nổi bật) */}
            <section
              id="courses"
              className="relative rounded-3xl p-4 sm:p-6 border border-sky-200/80 shadow-[0_4px_20px_rgba(0,100,220,0.06)] overflow-hidden bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/assets/courses-bg-cloud.png?v=1')`, backgroundSize: '100% 100%' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center bg-white">
                    <img
                      src="/assets/badge-courses.png?v=3"
                      alt="Chương trình học nổi bật"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-[#0B3C78] leading-tight">
                      Chương trình học nổi bật
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      Kết hợp giữa luyện tập, giáo trình, lớp học phù hợp, giáo viên và chuyên gia cao cấp
                    </p>
                  </div>
                </div>
                <a href="#courses" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0">
                  Xem tất cả <span>→</span>
                </a>
              </div>

              {/* 5 Distinct Pastel Cards with Carousel Arrows */}
              <div className="relative">
                {/* Left Arrow */}
                <button className="hidden sm:flex absolute -left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-200 shadow-md items-center justify-center text-slate-600 hover:text-blue-600 z-10 cursor-pointer text-base font-bold">
                  ‹
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 xl:gap-3 text-center">
                  {featuredCourses.map((course) => (
                    <div
                      key={course.title}
                      className={`bg-gradient-to-b ${course.bgClass} rounded-2xl border overflow-hidden flex flex-col items-center justify-between hover:shadow-md transition-all duration-200 group`}
                    >
                      <div className="w-full h-28 sm:h-32 xl:h-36 overflow-hidden relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between w-full">
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3C78] leading-snug mb-1 min-h-[32px] flex items-center justify-center">
                            {course.title}
                          </h4>
                          <p className="text-[10.5px] sm:text-[11px] text-slate-600 leading-snug mb-2 line-clamp-2">
                            {course.desc}
                          </p>
                        </div>
                        <button
                          className={`w-full py-1.5 px-2 rounded-full text-[11px] sm:text-xs font-bold ${course.btnClass} shadow-2xs transition-opacity flex items-center justify-center gap-1 cursor-pointer`}
                        >
                          <span>{course.btnText}</span>
                          <span className="font-bold">→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button className="hidden sm:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-200 shadow-md items-center justify-center text-slate-600 hover:text-blue-600 z-10 cursor-pointer text-base font-bold">
                  ›
                </button>
              </div>
            </section>

            {/* LEARNING PATH SECTION (Lộ trình học chuyên nghiệp - Gọn gàng & Hiện đại) */}
            <section
              id="path"
              className="relative rounded-3xl p-3.5 sm:p-4 border border-sky-200/80 shadow-[0_4px_20px_rgba(0,100,220,0.06)] overflow-hidden bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/assets/courses-bg-cloud.png?v=1')`, backgroundSize: '100% 100%' }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center bg-white">
                  <img
                    src="/assets/badge-path.png?v=3"
                    alt="Lộ trình học chuyên nghiệp"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B3C78] leading-tight">
                    Lộ trình học chuyên nghiệp
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
                    Định hướng rõ ràng • Tiết kiệm thời gian • Chinh phục mục tiêu
                  </p>
                </div>
              </div>

              {/* 5 Steps horizontal flow */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 xl:gap-2.5 items-stretch py-0.5">
                {learningSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="flex flex-col items-center text-center relative rounded-2xl bg-[#F8FBFE] border border-sky-100/80 overflow-hidden hover:border-sky-200 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="w-full h-20 sm:h-24 xl:h-26 overflow-hidden relative">
                      <img
                        src={step.img}
                        alt={step.step}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-center w-full">
                      <h5 className="text-[11.5px] xl:text-xs font-bold text-[#0B3C78] leading-tight mb-0.5">
                        {step.step}
                      </h5>
                      <p className="text-[10px] xl:text-[10.5px] text-slate-500 leading-snug">
                        {step.desc}
                      </p>
                    </div>

                    {/* Arrow between steps */}
                    {idx < learningSteps.length - 1 && (
                      <span className="hidden xl:block absolute -right-2 top-1/2 -translate-y-1/2 text-sky-400 font-black text-sm z-10 drop-shadow-xs">
                        ›
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Audience Cards (4 cards below path) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-sky-200/50">
                {audiencePills.slice(0, 4).map((aud) => (
                  <div
                    key={aud.title}
                    className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#EAF4FE]/95 hover:bg-[#E0F0FE] border border-[#C6E2FA] hover:border-blue-400 hover:shadow-2xs transition-all group cursor-pointer"
                  >
                    <img
                      src={aud.img}
                      alt={aud.title}
                      className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full object-cover border border-sky-300 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden text-left">
                      <h6 className="text-[11.5px] sm:text-xs font-extrabold text-[#0C3E8A] truncate leading-tight group-hover:text-blue-600 transition-colors">
                        {aud.title}
                      </h6>
                      <p className="text-[10px] sm:text-[10.5px] text-[#4B6B94] truncate leading-tight mt-0.5 font-medium">
                        {aud.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside
            id="leaderboard"
            className="flex flex-col gap-4"
          >
            {/* Card 1: Hành trình học của bạn */}
            <div className="bg-white rounded-3xl p-3.5 xl:p-5 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 xl:gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-2xs font-bold">★</span>
                  <h4 className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-800 leading-tight">Hành trình học của bạn</h4>
                </div>
                <div
                  onClick={() => setSelectedGrade(selectedGrade === 'Lớp 10' ? 'Lớp 9' : 'Lớp 10')}
                  className="bg-[#F0F6FC] hover:bg-sky-100/70 border border-sky-200/90 rounded-xl px-2 xl:px-2.5 py-1 flex items-center gap-1 cursor-pointer transition-colors text-[11px] font-semibold text-slate-700"
                >
                  <span>{selectedGrade}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3.5">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-blue-600">Tiến độ tổng thể</span>
                  <span className="text-blue-600">65%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-2 rounded-full w-[65%] shadow-xs"></div>
                </div>
              </div>

              {/* Tiếp tục học */}
              <div className="bg-gradient-to-r from-blue-50/70 to-sky-50/70 border border-blue-100 rounded-2xl p-2.5 xl:p-3 mb-3 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors">
                <div className="overflow-hidden">
                  <p className="text-[10px] xl:text-[11px] font-bold text-blue-600 uppercase tracking-wide">Tiếp tục học</p>
                  <p className="text-xs xl:text-sm font-bold text-[#0B3C78] truncate mt-0.5">Bài 12: Cấu trúc dữ liệu và giải thuật</p>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 ml-1.5" />
              </div>

              {/* 3 Stats counters */}
              <div className="grid grid-cols-3 gap-1.5 xl:gap-2.5 text-center">
                <div className="bg-slate-50 rounded-2xl p-2 xl:p-2.5 border border-slate-100">
                  <p className="text-base xl:text-lg 2xl:text-xl font-black text-blue-600 leading-tight">12</p>
                  <p className="text-[10px] xl:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Bài đã xong</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-2 xl:p-2.5 border border-slate-100">
                  <p className="text-base xl:text-lg 2xl:text-xl font-black text-emerald-600 leading-tight">8</p>
                  <p className="text-[10px] xl:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Đang học</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-2 xl:p-2.5 border border-slate-100">
                  <p className="text-base xl:text-lg 2xl:text-xl font-black text-amber-500 leading-tight">3</p>
                  <p className="text-[10px] xl:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Chưa học</p>
                </div>
              </div>
            </div>

            {/* Card 2: Thông báo quan trọng */}
            <div className="bg-white rounded-3xl p-3.5 xl:p-5 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-800">Thông báo quan trọng</h4>
                <a href="#hero" className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Xem tất cả →
                </a>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { title: 'Kỳ thi HSG Tin học cấp tỉnh sắp diễn ra', time: '3 ngày trước', icon: '⭐' },
                  { title: 'Lịch học lớp Toán Tin 10A1 tuần này', time: '5 giờ trước', icon: '📅' },
                  { title: 'Bài tập mới: Cấu trúc dữ liệu cơ bản', time: '1 ngày trước', icon: '💡' },
                  { title: 'Bạn đã nộp được một bài tập hôm nay!', time: '2 ngày trước', icon: '⭐' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs xl:text-sm group cursor-pointer hover:bg-sky-50/70 p-1.5 xl:p-2 rounded-xl transition-colors">
                    <span className="text-sm xl:text-base mt-0.5">{item.icon}</span>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs xl:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] xl:text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Top học sinh xuất sắc */}
            <div className="bg-white rounded-3xl p-3.5 xl:p-5 border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 xl:gap-2">
                  <span className="text-amber-400 text-base xl:text-lg">⭐</span>
                  <h4 className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-800 leading-tight">Top học sinh xuất sắc</h4>
                </div>
                <a href="#leaderboard" className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Xem bảng xếp hạng →
                </a>
              </div>

              <div className="flex flex-col gap-2 mb-3.5">
                {topStudents.map((st) => (
                  <div
                    key={st.rank}
                    className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-sky-50 transition-colors text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-center font-bold text-slate-500 text-xs sm:text-sm">
                        {st.rank}
                      </span>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-sky-200 object-cover shadow-2xs"
                      />
                      <span className="font-semibold text-slate-800">{st.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-400">{st.class}</span>
                      <span className="text-xs sm:text-sm font-bold text-blue-600">{st.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivational Banner Graphic */}
              <div className="overflow-hidden rounded-2xl border border-sky-100 cursor-pointer hover:shadow-md transition-shadow">
                <img
                  src="/assets/achieve-banner.png?v=3"
                  alt="Cùng chinh phục thành tích cao hơn!"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* 4. FULL-WIDTH MIDDLE SECTION: TÀI LIỆU NỔI BẬT */}
        <section
          id="materials"
          className="mt-6 bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B3C78] leading-tight">Tài liệu nổi bật</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Sách, chuyên đề, đề thi chất lượng, được biên soạn bởi đội ngũ giáo viên và chuyên gia uy tín
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2.5">
              <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs sm:text-sm font-medium">
                {['Sách', 'Chuyên đề', 'Đề thi'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDocTab(tab)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                      activeDocTab === tab
                        ? 'bg-blue-600 text-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <a href="#materials" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 ml-1">
                Xem tất cả →
              </a>
            </div>
          </div>

          {/* 4 Books in Single Horizontal Row of 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {books.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl border border-sky-100 overflow-hidden flex flex-row items-stretch gap-3 hover:shadow-md hover:border-sky-200 transition-all duration-200 group min-h-[175px]"
              >
                {/* Book Cover on the Left - Full Vertical Height */}
                <div className="w-[40%] shrink-0 relative overflow-hidden bg-slate-50">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  />
                </div>

                {/* Details on the Right */}
                <div className="w-[60%] p-3 py-3.5 pr-3.5 flex flex-col justify-between text-left">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B3C78] leading-snug line-clamp-2 mb-2">
                      {b.title}
                    </h4>

                    <div className="flex flex-col gap-1 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500 text-xs">👤</span>
                        <span className="truncate">{b.tag}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500 text-xs">📄</span>
                        <span>{b.pages}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-500 text-xs">💡</span>
                        <span className="truncate">{b.highlight}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`w-full py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${b.btnStyle}`}
                  >
                    <span>{b.btnText}</span>
                    <span className="font-bold">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 2-COLUMN SECTION: CUỘC THI & KHẢO SÁT | CÂU CHUYỆN ĐỒNG HÀNH */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Col 1: Cuộc thi & khảo sát */}
          <section
            id="contests"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B3C78] leading-tight">
                      Cuộc thi & khảo sát
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Được tổ chức thường xuyên, công bằng và uy tín
                    </p>
                  </div>
                </div>
                <a href="#contests" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700">
                  Xem tất cả →
                </a>
              </div>

              {/* 3 Contests in row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {competitions.map((c) => (
                  <div
                    key={c.title}
                    className="bg-[#F8FBFE] rounded-2xl border border-sky-100/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div className="w-full h-28 sm:h-32 xl:h-36 overflow-hidden relative">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0B3C78] leading-snug line-clamp-2 mb-2">
                          {c.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{c.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold mb-3">
                          <span className={`w-2 h-2 rounded-full ${c.statusDot}`}></span>
                          <span className={c.statusColor}>{c.status}</span>
                        </div>
                      </div>

                      <button className="w-full py-2 px-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#38BDF8] hover:bg-sky-500 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>Xem cuộc thi</span>
                        <span className="font-bold">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Col 2: Câu chuyện đồng hành */}
          <section
            id="testimonials"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B3C78] leading-tight">
                      Câu chuyện đồng hành
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Những câu chuyện thật, truyền cảm hứng thật
                    </p>
                  </div>
                </div>
                <a href="#testimonials" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700">
                  Xem thêm câu chuyện →
                </a>
              </div>

              {/* 3 Testimonials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {testimonials.map((t) => (
                  <div
                    key={t.author}
                    className="bg-[#F8FBFE] rounded-2xl border border-sky-100/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    {/* Top scenic portrait banner */}
                    <div className="w-full h-28 overflow-hidden">
                      <img
                        src={t.banner}
                        alt={t.author}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom quote card */}
                    <div className="p-3 flex-1 flex flex-col justify-between bg-white m-2 rounded-xl border border-sky-50 shadow-2xs">
                      <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3 mb-2.5">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-100">
                        <img
                          src={t.avatar}
                          alt={t.author}
                          className="w-7 h-7 rounded-full object-cover border border-sky-200 shadow-2xs"
                        />
                        <div className="overflow-hidden text-left">
                          <p className="text-xs sm:text-sm font-bold text-[#0B3C78] truncate leading-none">
                            {t.author}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate leading-none mt-1">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 6. 2-COLUMN SECTION: CÂU HỎI THƯỜNG GẶP | CẦN HỖ TRỢ? */}
        <div id="support" className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Col 1: Câu hỏi thường gặp */}
          <section className="h-full bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B3C78] leading-tight">
                    Câu hỏi thường gặp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Giải đáp nhanh những thắc mắc phổ biến
                  </p>
                </div>
              </div>

              {/* Continuous container with 4 border-separated items */}
              <div className="border border-sky-100 rounded-2xl divide-y divide-sky-100 overflow-hidden bg-white">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="transition-colors">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <span className="pr-2">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 bg-sky-50/40 leading-relaxed border-t border-sky-50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Col 2: Cần hỗ trợ? */}
          <section className="h-full relative overflow-hidden rounded-3xl p-5 sm:p-7 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col justify-between min-h-[340px] sm:min-h-[360px]">
            {/* Full HD Background Artwork */}
            <img
              src="/assets/support-banner-bg.jpg"
              alt="Cần hỗ trợ?"
              className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-right pointer-events-none select-none z-0"
            />

            {/* Mobile-Friendly Soft White Gradient Overlay for 100% Readable Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 sm:from-white/80 sm:via-white/50 sm:to-transparent z-0 pointer-events-none" />

            {/* Speech bubble */}
            <div className="absolute top-5 right-5 sm:right-7 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-sky-200 shadow-xs text-xs font-semibold text-sky-800 leading-tight text-center pointer-events-none z-10 hidden sm:block">
              Chúng tôi<br />luôn ở đây<br />cùng bạn!
            </div>

            <div className="relative z-10 w-full sm:max-w-[58%] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow-2xs shrink-0">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0B3C78] leading-tight">Cần hỗ trợ?</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-snug">
                      Đội ngũ tư vấn luôn sẵn sàng đồng hành cùng bạn trên hành trình chinh phục tri thức.
                    </p>
                  </div>
                </div>

                {/* Checklist */}
                <div className="flex flex-col gap-2 my-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="flex items-center gap-2.5 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                    <span>Tư vấn lộ trình học phù hợp</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                    <span>Hỗ trợ kỹ thuật, giải đáp thắc mắc</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                    <span>Đồng hành cùng học sinh và phụ huynh</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button className="bg-[#0091FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full shadow-md inline-flex items-center gap-2 transition-all cursor-pointer">
                  <span>Liên hệ tư vấn</span>
                  <span className="text-sm font-bold">→</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 7. FULL-WIDTH PANORAMIC FOOTER */}
      <footer className="w-full relative overflow-hidden border-t border-sky-200/80 bg-white mt-10">
        {/* Panoramic HD Background Artwork */}
        <img
          src="/assets/footer-bg.jpg"
          alt="Footer background"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
        />

        <div className="relative z-10 max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-10 py-9 sm:py-11">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-7 sm:gap-8 mb-8">
            {/* Logo & Intro */}
            <div className="md:col-span-2">
              <img
                src="/assets/header-logo.png?v=3"
                alt="Ôn Thi 360"
                className="h-10 sm:h-11 object-contain mb-3"
              />
              <p className="text-sm sm:text-base font-semibold text-blue-700 mb-1.5">
                Học cùng mục tiêu – Vươn xa ước mơ
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Nền tảng học tập Tin học uy tín, đồng hành cùng học sinh trên hành trình chinh phục tri thức và ước mơ.
              </p>
            </div>

            {/* Col 1: Học tập */}
            <div>
              <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-3">Học tập</h5>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600">
                {['Lớp học', 'Luyện tập', 'Tài liệu', 'Cuộc thi'].map((it) => (
                  <li key={it}>
                    <a href="#courses" className="hover:text-blue-600 transition-colors">{it}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Đồng hành */}
            <div>
              <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-3">Đồng hành</h5>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600">
                {['Dành cho học sinh', 'Dành cho phụ huynh', 'Giáo viên & chuyên gia', 'Bảng xếp hạng'].map((it) => (
                  <li key={it}>
                    <a href="#testimonials" className="hover:text-blue-600 transition-colors">{it}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Thông tin & Kết nối */}
            <div>
              <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-3">Thông tin</h5>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 mb-3.5">
                {['Giới thiệu', 'Tin tức', 'Hướng dẫn sử dụng', 'Liên hệ'].map((it) => (
                  <li key={it}>
                    <a href="#support" className="hover:text-blue-600 transition-colors">{it}</a>
                  </li>
                ))}
              </ul>

              <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">Kết nối với chúng tôi</h5>
              <div className="flex items-center gap-2.5 mb-3.5">
                <a href="#" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm font-bold hover:opacity-90 shadow-2xs">
                  f
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold hover:opacity-90 shadow-2xs">
                  ▶
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 shadow-2xs">
                  Zalo
                </a>
              </div>

              <div className="text-xs text-slate-500 leading-normal">
                <p>Điều khoản sử dụng | Chính sách bảo mật</p>
                <p className="mt-0.5">© 2025 Ôn Thi 360. Tất cả quyền được bảo lưu.</p>
              </div>
            </div>
          </div>

          {/* Bottom Slogan */}
          <div className="pt-6 border-t border-sky-100/70 text-center flex items-center justify-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent w-24 hidden sm:block"></div>
            <p className="text-sm sm:text-base font-bold text-blue-900 italic tracking-wide">
              — Học tốt Tin học – Vững vàng hành trang 6–12 —
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent w-24 hidden sm:block"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
