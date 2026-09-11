import React, { useEffect, useState } from "react";
import {
  FileText,
  Search,
  BookOpen,
  Star,
  Download,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  Printer,
  FileCheck,
  X
} from "lucide-react";

function MaterialsPagination({ page, totalPages, onChange, label }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={label} className="mt-1 flex flex-col items-center justify-between gap-2 rounded-2xl border border-[#DDEAF0] bg-white p-2.5 sm:flex-row">
      <span className="text-[11px] text-[#71869A]">
        Trang <b className="text-[#536D86]">{page}</b> / {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Trang trước"
          disabled={page === 1}
          onClick={() => onChange(Math.max(1, page - 1))}
          className="grid h-9 w-9 place-items-center rounded-xl border border-[#DDEAF0] text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            aria-label={`Trang ${pageNumber}`}
            aria-current={page === pageNumber ? "page" : undefined}
            onClick={() => onChange(pageNumber)}
            className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 text-[11px] font-extrabold transition ${page === pageNumber ? "bg-[#0066CC] text-white shadow-[0_3px_8px_rgba(0,102,204,0.18)]" : "text-[#536D86] hover:bg-[#F8FAFB]"}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          aria-label="Trang sau"
          disabled={page === totalPages}
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          className="grid h-9 w-9 place-items-center rounded-xl border border-[#DDEAF0] text-[#536D86] transition hover:border-[#9DC8D7] hover:bg-[#EAF5F8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

export default function MaterialsPage({ onOpenActivation, onOpenCheckout }) {
  const [activeTab, setActiveTab] = useState("books"); // books, topics, exams
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);

  const materialsData = {
    books: [
      {
        id: "book-1",
        title: "Lập trình căn bản và Thuật toán với Python 3",
        tag: "Dành cho học sinh 6–10",
        pages: "320 trang",
        highlight: "150+ bài tập minh họa có chấm OJ",
        author: "Thầy Nguyễn Tiến Thành & Ban Chuyên môn",
        rating: 4.9,
        reviews: 124,
        priceSoft: "180.000đ",
        pricePrint: "245.000đ",
        image: "/assets/book-img-1.png",
        scope: "Quyền học cá nhân 365 ngày"
      },
      {
        id: "book-2",
        title: "Chuyên đề Cấu trúc dữ liệu và Giải thuật chuyên sâu",
        tag: "Dành cho HSG lớp 10–12 & Đội tuyển",
        pages: "420 trang",
        highlight: "Quy hoạch động, Đồ thị, Segment Tree, Treap",
        author: "GS. Trần Đăng Khoa & Thầy Lê Minh Đức",
        rating: 5.0,
        reviews: 210,
        priceSoft: "260.000đ",
        pricePrint: "350.000đ",
        image: "/assets/book-img-2.png",
        scope: "Quyền học cá nhân & Dùng để dạy"
      },
      {
        id: "book-3",
        title: "Tuyển tập đề thi HSG Tin học các tỉnh & Quốc Gia 2020–2026",
        tag: "Cập nhật đề thi mới nhất",
        pages: "560 trang",
        highlight: "Có lời giải chi tiết và bộ test case chuẩn",
        author: "Tổ chuyên gia Olympic Tin học",
        rating: 4.9,
        reviews: 188,
        priceSoft: "220.000đ",
        pricePrint: "310.000đ",
        image: "/assets/book-img-3.png",
        scope: "Quyền học cá nhân"
      },
      {
        id: "book-4",
        title: "Bộ đề ôn thi vào lớp 10 chuyên Tin học",
        tag: "Theo cấu trúc đề thi trường Chuyên",
        pages: "380 trang",
        highlight: "300 đề luyện tập phân dạng chi tiết",
        author: "Thầy Nguyễn Tiến Thành",
        rating: 4.8,
        reviews: 156,
        priceSoft: "190.000đ",
        pricePrint: "270.000đ",
        image: "/assets/book-img-4.png",
        scope: "Quyền học cá nhân"
      }
    ],
    topics: [
      {
        id: "topic-1",
        title: "Chuyên đề Quy hoạch động nâng cao (Advanced DP)",
        tag: "Chuyên đề độc quyền",
        pages: "120 trang PDF",
        highlight: "Bao gồm DP Bitmask, DP Tree, Convex Hull Trick",
        author: "Thầy Lê Minh Đức",
        rating: 4.9,
        reviews: 95,
        priceSoft: "120.000đ",
        image: "/assets/course-img-1.png"
      },
      {
        id: "topic-2",
        title: "Chuyên đề Thuật toán Đồ thị: Luồng cực đại & Khớp nối",
        tag: "Olympic & HSG Quốc Gia",
        pages: "140 trang PDF",
        highlight: "Dinic, Push-Relabel, Tarjan SCC",
        author: "GS. Trần Đăng Khoa",
        rating: 5.0,
        reviews: 82,
        priceSoft: "150.000đ",
        image: "/assets/course-img-2.png"
      }
    ],
    exams: [
      {
        id: "exam-1",
        title: "Bộ 50 đề thi thử HSG Tin học cấp Tỉnh (Kèm Test & Lời giải)",
        tag: "Cấu trúc chuẩn 2026",
        pages: "50 Đề thi",
        highlight: "Chấm tự động toàn bộ trên Online Judge",
        author: "Hội đồng khảo thí Ôn Thi 360",
        rating: 4.9,
        reviews: 140,
        priceSoft: "160.000đ",
        image: "/assets/contest-img-1.png"
      },
      {
        id: "exam-2",
        title: "Bộ đề thi thử Tốt nghiệp THPT môn Tin học 2026",
        tag: "Trắc nghiệm & Điền đáp án",
        pages: "30 Đề thi",
        highlight: "Bám sát ma trận đề Bộ GD&ĐT",
        author: "Tổ chuyên môn THPT 360",
        rating: 4.8,
        reviews: 110,
        priceSoft: "90.000đ",
        image: "/assets/contest-img-2.png"
      }
    ]
  };

  const currentItems = materialsData[activeTab] || materialsData.books;
  const filteredItems = currentItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return `${item.title} ${item.tag} ${item.highlight} ${item.author}`.toLowerCase().includes(query);
  });
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. MATERIALS HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0B3C78] via-[#0284C7] to-[#38BDF8] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-materials-hero-v1.png"
          alt="Materials banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kho học liệu & Sách giáo trình có bản quyền</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
            Tài liệu, Giáo trình & Bộ đề thi
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Hệ thống sách giáo trình, chuyên đề giải thuật và bộ đề thi chuẩn hóa được biên soạn công phu bởi các chuyên gia và giáo viên trường Chuyên hàng đầu.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <button
              onClick={onOpenActivation}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
            >
              <KeyRound className="w-4 h-4" />
              <span>Kích hoạt mã sách / tài liệu</span>
            </button>
            <span className="text-xs text-sky-100 font-medium">Hỗ trợ bản mềm PDF tương tác & Bản in giao tận nhà</span>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 w-full md:w-80 shadow-xl text-center">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider">Học liệu đã phát hành</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-white/10 rounded-2xl p-2.5">
              <p className="text-2xl font-black text-white">50+</p>
              <p className="text-[10px] text-sky-200 mt-0.5">Đầu sách & Chuyên đề</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5">
              <p className="text-2xl font-black text-amber-300">100%</p>
              <p className="text-[10px] text-sky-200 mt-0.5">Bản quyền & Lời giải</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 3 TABS EXACTLY ACCORDING TO SPEC: SÁCH / CHUYÊN ĐỀ / ĐỀ THI */}
      <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
          {[
            { id: "books", label: "Sách giáo trình", count: materialsData.books.length, icon: BookOpen, tone: "text-[#2D7FA3]" },
            { id: "topics", label: "Chuyên đề thuật toán", count: materialsData.topics.length, icon: Sparkles, tone: "text-[#786BB1]" },
            { id: "exams", label: "Tuyển tập đề thi", count: materialsData.exams.length, icon: Award, tone: "text-[#AF7C32]" }
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`flex-1 sm:flex-none min-h-10 px-4 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9DC8D7] ${
                activeTab === tab.id
                  ? "bg-[#0066CC] text-white shadow-2xs"
                  : "text-[#536D86] hover:bg-white hover:text-[#126F91]"
              }`}
            >
              <span className={`grid h-5 w-5 place-items-center rounded-lg ${activeTab === tab.id ? "bg-white/15" : "bg-[#EAF5F8]"}`}>
                <tab.icon className={`h-3.5 w-3.5 ${activeTab === tab.id ? "text-white" : tab.tone}`} />
              </span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tài liệu, tác giả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F0F6FC] border border-sky-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 3. MATERIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-sky-100 shadow-[0_4px_16px_rgba(0,100,220,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-sky-200 transition-all duration-300 group"
          >
            <div>
              {/* Cover */}
              <div className="relative h-56 overflow-hidden bg-slate-50 flex items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0050A0] border border-sky-200 shadow-2xs backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-1 text-xs mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-500 font-medium">
                    <FileText className="h-3.5 w-3.5 text-[#2D7FA3]" />
                    {item.pages}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-[10px] text-slate-400">({item.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-extrabold text-[#0B3C78] leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="flex items-start gap-1 text-[11px] text-slate-500 line-clamp-2 mb-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#AF7C32]" />
                  <span>{item.highlight}</span>
                </p>

                <p className="text-[10px] text-slate-400">
                  Tác giả: <strong className="text-slate-600">{item.author}</strong>
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-sky-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">Bản mềm (Online)</p>
                  <p className="text-sm font-black text-[#0B3C78]">{item.priceSoft}</p>
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Xem tài liệu</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MaterialsPagination page={page} totalPages={totalPages} onChange={setPage} label="Phân trang tài liệu" />
      {filteredItems.length === 0 && <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center"><Search className="mx-auto h-9 w-9 text-sky-300"/><h2 className="mt-3 text-sm font-black text-slate-800">Không tìm thấy tài liệu</h2><p className="mt-1 text-xs text-slate-500">Thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.</p><button type="button" onClick={() => setSearchQuery("")} className="mt-4 text-xs font-bold text-blue-600">Xóa tìm kiếm</button></div>}

      {/* Detail & Buy Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-sky-100 relative">
              <button
                type="button"
                aria-label="Đóng thông tin tài liệu"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9DC8D7]"
              >
                <X className="h-4 w-4" />
              </button>

            <div className="flex gap-4 mb-4">
              <img src={selectedItem.image} alt="" className="w-24 h-32 object-contain rounded-xl border border-slate-200" />
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedItem.tag}
                </span>
                <h3 className="text-sm font-bold text-[#0B3C78] mt-1">{selectedItem.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Tác giả: {selectedItem.author}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-500">
                    <span className="inline-flex items-center gap-0.5" aria-label={`${selectedItem.rating} trên 5 sao`}>
                      {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3.5 w-3.5 fill-amber-400" />)}
                    </span>
                    <span>{selectedItem.rating} (Đã xác thực)</span>
                  </div>
              </div>
            </div>

            <div className="bg-[#F8FBFE] p-3.5 rounded-2xl border border-sky-100 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Bản mềm (Đọc & Chấm bài trên web):</span>
                <strong className="text-blue-600">{selectedItem.priceSoft}</strong>
              </div>
              {selectedItem.pricePrint && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Tùy chọn kèm sách in giao tận nhà:</span>
                  <strong className="text-amber-600">{selectedItem.pricePrint}</strong>
                </div>
              )}
              <div className="flex items-start gap-1.5 border-t border-sky-100 pt-1 text-[11px] text-slate-400">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B9374]" />
                <span>Được cấp quyền truy cập ngay sau khi nhập mã kích hoạt hợp lệ.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onOpenActivation();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Nhập mã kích hoạt có sẵn
              </button>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onOpenCheckout?.();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Mua quyền học ngay →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
