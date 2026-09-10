import React, { useState } from "react";
import { X, Star, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function ReviewModal({ target, isOpen, onClose, userRole }) {
  const [rating, setRating] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [exercises, setExercises] = useState(5);
  const [support, setSupport] = useState(5);
  const [comment, setComment] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmed) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-sky-100 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0B3C78]">Đánh giá trải nghiệm thực</h3>
                <p className="text-xs text-slate-500">Đối tượng: <strong>{target?.title || "Khóa học / Tài liệu"}</strong></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs text-slate-700">
              {/* Overall Rating */}
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col items-center gap-1">
                <span className="font-bold text-amber-900">Mức độ hài lòng tổng thể</span>
                <div className="flex items-center gap-2 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="text-2xl sm:text-3xl text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      {s <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-amber-700">{rating === 5 ? "Rất xuất sắc (5/5)" : rating === 4 ? "Tốt (4/5)" : "Bình thường"}</span>
              </div>

              {/* Specific Criteria */}
              <div className="space-y-2 bg-[#F8FBFE] p-3 rounded-2xl border border-sky-100 text-[11px]">
                <div className="flex items-center justify-between">
                  <span>Chất lượng bài giảng & Dễ hiểu:</span>
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} onClick={() => setClarity(s)} className="cursor-pointer text-sm">
                        {s <= clarity ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Hệ thống bài tập Online Judge:</span>
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} onClick={() => setExercises(s)} className="cursor-pointer text-sm">
                        {s <= exercises ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Hỗ trợ & giải đáp của giáo viên:</span>
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} onClick={() => setSupport(s)} className="cursor-pointer text-sm">
                        {s <= support ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text review */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nhận xét chi tiết (Tối đa 1.000 ký tự)
                </label>
                <textarea
                  rows={3}
                  placeholder="Chia sẻ trải nghiệm học tập thực tế của bạn về nội dung, phương pháp giảng dạy..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2.5 rounded-2xl bg-[#F0F6FC] border border-sky-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Verified Badge Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-slate-500">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Tôi xác nhận đánh giá này dựa trên trải nghiệm thực tế và đồng ý với tiêu chuẩn kiểm duyệt nội dung của Ôn Thi 360.</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!confirmed}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md disabled:opacity-50 transition-all cursor-pointer"
                >
                  Gửi đánh giá xác thực
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-slate-900">Cảm ơn bạn đã gửi đánh giá!</h4>
            <p className="text-xs text-slate-500 mt-1">Đánh giá của bạn đang được kiểm duyệt và sẽ công bố sớm trên trang chi tiết.</p>
          </div>
        )}
      </div>
    </div>
  );
}
