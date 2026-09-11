import React, { useState } from "react";
import { Info, HelpCircle, Headphones, CheckCircle2, ChevronDown, Send } from "lucide-react";

export default function InfoPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [supportSent, setSupportSent] = useState(false);

  const faqs = [
    { q: "1. Làm thế nào để kích hoạt mã khóa học hoặc sách?", a: "Bạn chỉ cần nhấn nút Kích hoạt mã ở thanh tiêu đề trên cùng, nhập mã 16 ký tự được cấp (hoặc mã voucher) và nhấn Kích hoạt ngay. Quyền truy cập sẽ được mở khóa tức thì." },
    { q: "2. Hệ thống chấm bài Online Judge hoạt động như thế nào?", a: "Khi bạn viết mã nguồn và bấm Nộp bài, hệ thống sẽ gửi code đến cụm máy chủ chấm tự động an toàn. Mã của bạn sẽ được biên dịch và chạy thử qua 10-50 bộ test ẩn để chấm điểm chính xác trong thời gian thực." },
    { q: "3. Giáo viên có thể mở lớp và giao đề cho học sinh như thế nào?", a: "Giáo viên sau khi được phê duyệt có thể kích hoạt Quyền dùng để dạy cho mọi lớp mình phụ trách. Giáo viên có thể mở bài theo chương/mục hoặc tạo bài kiểm tra có thời hạn đóng mở." },
    { q: "4. Phụ huynh có thể theo dõi việc học của con ra sao?", a: "Phụ huynh có tài khoản riêng để xem lịch học, điểm danh, số bài tập con đã hoàn thành và nhận báo cáo tiến độ tuần." }
  ];

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* 1. HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-200/90 bg-gradient-to-r from-[#0050A0] via-[#0284C7] to-[#38BDF8] p-5 text-white shadow-[0_8px_24px_rgba(0,100,220,0.08)] sm:p-6">
        <img
          src="/assets/generated-info-hero-v1.png"
          alt="Info banner"
          className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none opacity-35 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold text-amber-950 shadow-sm">
            <Info className="w-3.5 h-3.5" />
            <span>Trung tâm Trợ giúp & Thông tin Chính thức</span>
          </div>

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
            Thông tin & Hỗ trợ Kỹ thuật 24/7
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-sky-100 sm:text-sm">
            Giải đáp mọi thắc mắc về khóa học, kích hoạt mã bản quyền, hệ thống chấm bài Online Judge và hỗ trợ học viên.
          </p>
        </div>
      </div>

      {/* 2. 2 COLUMNS: FAQ & CONTACT FORM */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* FAQ Accordion */}
        <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3C78]">Câu hỏi thường gặp (FAQ)</h3>
              <p className="text-[11px] text-slate-500">Giải đáp nhanh các vấn đề phổ biến</p>
            </div>
          </div>

          <div className="divide-y divide-sky-100 overflow-hidden rounded-xl border border-sky-100">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 p-3 text-left text-xs font-bold leading-5 text-slate-800 transition-colors hover:bg-sky-50/60 hover:text-blue-600"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-sky-50 bg-sky-50/50 p-3 pt-0 text-xs leading-relaxed text-slate-600">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3C78]">Gửi yêu cầu hỗ trợ</h3>
              <p className="text-[11px] text-slate-500">Đội ngũ kỹ thuật sẽ phản hồi trong vòng 15 phút</p>
            </div>
          </div>

          {!supportSent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSupportSent(true);
              }}
              className="flex flex-col gap-3 text-xs"
            >
              <div>
                <label className="mb-1 block text-[11px] font-bold text-slate-700">Họ và tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="h-10 w-full rounded-xl border border-sky-200 bg-[#F0F6FC] px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold text-slate-700">Số điện thoại hoặc Email</label>
                <input
                  type="text"
                  required
                  placeholder="0988xxxxxx / email@example.com"
                  className="h-10 w-full rounded-xl border border-sky-200 bg-[#F0F6FC] px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold text-slate-700">Nội dung cần hỗ trợ</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải (lỗi nộp bài, kích hoạt mã...)"
                  className="w-full resize-y rounded-xl border border-sky-200 bg-[#F0F6FC] p-3 text-xs leading-relaxed text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <button
                type="submit"
                className="flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#126F91] px-3 py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#0F5F7A]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi yêu cầu hỗ trợ</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-800">Đã gửi yêu cầu thành công!</h4>
              <p className="text-xs text-slate-500 mt-1">Chuyên viên hỗ trợ sẽ liên hệ với bạn ngay.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
