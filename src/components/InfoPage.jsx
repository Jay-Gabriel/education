import React, { useState } from "react";
import { Info, HelpCircle, Headphones, CheckCircle2, ChevronDown, Mail, Phone, MapPin, Send } from "lucide-react";

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
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. HERO */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0050A0] via-[#0284C7] to-[#38BDF8] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-info-hero-v1.png"
          alt="Info banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <Info className="w-3.5 h-3.5" />
            <span>Trung tâm Trợ giúp & Thông tin Chính thức</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Thông tin & Hỗ trợ Kỹ thuật 24/7
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Giải đáp mọi thắc mắc về khóa học, kích hoạt mã bản quyền, hệ thống chấm bài Online Judge và hỗ trợ học viên.
          </p>
        </div>
      </div>

      {/* 2. 2 COLUMNS: FAQ & CONTACT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-md">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3C78]">Câu hỏi thường gặp (FAQ)</h3>
              <p className="text-xs text-slate-500">Giải đáp nhanh các vấn đề phổ biến</p>
            </div>
          </div>

          <div className="divide-y divide-sky-100 border border-sky-100 rounded-2xl overflow-hidden">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>
                {openFaq === i && (
                  <div className="p-3.5 pt-0 text-xs text-slate-600 bg-sky-50/50 leading-relaxed border-t border-sky-50">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-md">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3C78]">Gửi yêu cầu hỗ trợ</h3>
              <p className="text-xs text-slate-500">Đội ngũ kỹ thuật sẽ phản hồi trong vòng 15 phút</p>
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
                <label className="block font-bold text-slate-700 mb-1">Họ và tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full p-2.5 rounded-xl bg-[#F0F6FC] border border-sky-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại hoặc Email</label>
                <input
                  type="text"
                  required
                  placeholder="0988xxxxxx / email@example.com"
                  className="w-full p-2.5 rounded-xl bg-[#F0F6FC] border border-sky-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung cần hỗ trợ</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải (lỗi nộp bài, kích hoạt mã...)"
                  className="w-full p-2.5 rounded-xl bg-[#F0F6FC] border border-sky-200"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi yêu cầu hỗ trợ</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">Đã gửi yêu cầu thành công!</h4>
              <p className="text-xs text-slate-500 mt-1">Chuyên viên hỗ trợ sẽ liên hệ với bạn ngay.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
