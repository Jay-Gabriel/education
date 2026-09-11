# Ôn Thi 360 — Design & UX Spec cho trang chủ

> Phiên bản chuẩn hóa: 2026-09-11. Tài liệu này là nguồn tham chiếu chung cho nội dung, giao diện, tương tác và responsive của trang chủ. Khi yêu cầu AI chỉnh sửa, dùng mã khối `data-section` trong code để chỉ đúng phạm vi.

## 1. Mục tiêu

- Tạo cấp bậc rõ ràng giữa hero, tiêu đề khu vực, tiêu đề card, nội dung và metadata.
- Duy trì cảm giác thân thiện, hiện đại, phù hợp nền tảng giáo dục dành cho học sinh 6–12.
- Không dùng chữ nhỏ hơn 10px. Chữ 10px chỉ dành cho dữ liệu phụ trong card hẹp.
- Hạn chế chữ quá đậm: 900 chỉ dùng cho tên thương hiệu trong hero; phần còn lại ưu tiên 400–800.

## 2. Font chữ

| Vai trò | Font | Weight |
|---|---|---:|
| Toàn bộ giao diện | Be Vietnam Pro | 400–800 |
| Font dự phòng | Plus Jakarta Sans, system-ui | Theo vai trò |
| Câu trích dẫn trang trí | Dancing Script | 700 |

`Be Vietnam Pro` là font chính vì hỗ trợ tiếng Việt tốt, nét chữ sáng và thân thiện. `Dancing Script` chỉ dùng cho câu trích dẫn của giáo viên, không dùng cho nội dung chức năng.

## 3. Thang chữ chuẩn

| Token/CSS class | Cỡ chữ | Line-height | Weight | Mục đích |
|---|---:|---:|---:|---|
| `.type-hero-brand` | 32–42px | 1.00 | 900 | Tên Ôn Thi 360 trong hero |
| `.type-hero-title` | 15–18px | 1.35 | 700 | Thông điệp chính của từng slide |
| `.type-section-title` | 14–16px | 1.35 | 800 | Tiêu đề khối cấp 1 |
| `.type-card-title` | 12px | 1.40 | 700 | Tiêu đề card/sidebar |
| `.type-card-title-compact` | 11px | 1.40 | 700 | Card nhỏ trong dải 5 cột |
| `.type-body` | 12px | 1.55 | 400 | Mô tả và nội dung đọc |
| `.type-label` | 11px | 1.35 | 700 | Tab, badge và nhãn điều khiển |
| `.type-action` | 11px | 1.35 | 700 | Liên kết và CTA nhỏ |
| `.type-meta` | 10px | 1.45 | 500 | Thời gian, lớp, trạng thái phụ |
| `.type-footer-heading` | 14px | 1.40 | 800 | Tiêu đề nhóm liên kết ở footer |
| `.type-footer-link` | 13px | 1.55 | 500 | Liên kết điều hướng ở footer |
| `.type-footer-meta` | 11px | 1.55 | 500 | Pháp lý và bản quyền ở footer |

## 4. Độ đậm

- 400: nội dung mô tả, câu dài.
- 500: metadata, chú thích và nội dung phụ.
- 600: menu điều hướng và lựa chọn chưa kích hoạt.
- 700: card title, nút và trạng thái được chọn.
- 800: tiêu đề khu vực.
- 900: duy nhất cho tên thương hiệu lớn trong hero.

Không dùng toàn bộ giao diện ở 700 vì sẽ làm tiêu đề và nội dung mất tương phản thứ bậc.

## 5. Màu chữ

| Vai trò | Màu |
|---|---|
| Heading chính | `#123B68` |
| Body | `#536D86` |
| Metadata | `#71869A` |
| Action phụ | `#126F91` |
| Điều hướng/CTA thương hiệu | `#0066CC` |
| Trạng thái cảnh báo | Amber theo ngữ cảnh, không dùng cho đoạn văn dài |

## 6. Tiêu chuẩn thẩm mỹ về màu sắc

### 6.1. Tỷ lệ màu

- **80% màu nền trung tính:** trắng, xanh xám rất nhạt và các mặt phẳng có độ bão hòa thấp.
- **15% màu hỗ trợ:** xanh teal, xanh dương nhạt hoặc amber nhạt dùng cho icon, đường viền và trạng thái.
- **5% màu nhấn:** màu thương hiệu hoặc màu trạng thái mạnh, chỉ dành cho CTA chính và tín hiệu thật sự quan trọng.

Sidebar chứa nhiều dữ liệu cạnh nhau nên ưu tiên tỷ lệ trung tính cao hơn hero. Không dùng nhiều mảng xanh dương hoặc amber bão hòa trong cùng một vùng nhìn.

### 6.2. Bảng màu sidebar

| Vai trò | Màu đề xuất | Cách dùng |
|---|---|---|
| Card | `#FFFFFF` | Nền chính |
| Surface phụ | `#F8FAFB` | Hàng dữ liệu, bộ đếm |
| Surface tương tác | `#F1F7FA` | Tab, CTA phụ, hover nhẹ |
| Border | `#DDEAF0` | Viền card |
| Border tương tác | `#C9DFE8` | Hover/focus |
| Teal nhấn | `#2D7FA3` | Icon và nhãn thông tin |
| Teal nhạt | `#EAF5F8` | Nền icon, trạng thái được chọn |
| Xanh dữ liệu | `#3E79A4` | Số liệu học tập |
| Xanh thành công | `#3B9374` | Trạng thái đang học/hoàn thành |
| Amber dữ liệu | `#AF7C32` | Cảnh báo nhẹ, nội dung chưa học |
| Amber nhạt | `#FFF6DF` | Nền icon cuộc thi |

### 6.3. Quy tắc độ bão hòa

- Không dùng nền màu bão hòa cao cho tab trong sidebar; tab đang chọn dùng nền trắng, viền nhạt và chữ màu nhấn.
- Icon 32px ưu tiên nền tint 8–12% và icon màu trung bình thay vì icon trắng trên nền đặc.
- Thanh tiến độ dùng gradient cùng họ màu, chênh lệch sáng vừa phải; không chuyển giữa hai màu quá xa nhau.
- Ba số liệu cạnh nhau có thể khác màu, nhưng cùng độ sáng và độ bão hòa để không mục nào lấn át mục khác.
- Amber chỉ biểu đạt cuộc thi, cảnh báo hoặc trạng thái chờ; không dùng như CTA chính trên diện tích lớn.
- Trong một card chỉ có tối đa một màu nhấn chính. Hover chỉ tăng một cấp độ tương phản, không đổi sang một họ màu khác.

### 6.4. Tương phản và khả năng đọc

- Văn bản thường phải đạt tương phản tối thiểu 4.5:1 trên nền.
- Tiêu đề lớn hoặc chữ từ 18px đậm có thể dùng ngưỡng 3:1.
- Không đặt chữ xám nhạt trên nền pastel gần cùng độ sáng.
- Màu không được là tín hiệu duy nhất cho trạng thái; kết hợp thêm nhãn, icon hoặc dấu chấm trạng thái.

### 6.5. Hệ biểu tượng sidebar phải

- Dùng một hệ icon SVG nét đều (Lucide), stroke khoảng 2px; không trộn emoji với SVG trong cùng một nhóm điều khiển.
- Icon tiêu đề card dùng khung 32×32px, bán kính 12px, nền tint 8–12% và màu icon trung bình. Các card `HOME-06`, `HOME-08`, `HOME-09` phải cùng kích thước khung.
- Tab xếp hạng/thông báo dùng icon 14px, cùng baseline với nhãn; trạng thái chọn đổi màu chữ và nền, không phóng to icon.
- Icon trong danh sách thông báo dùng khung 24×24px, bán kính 8px. Màu chỉ phân loại nội dung (cuộc thi, lịch, tài liệu, hoàn thành), không dùng để trang trí ngẫu nhiên.
- Mũi tên điều hướng và icon lịch dùng 12–16px, nét trung tính; vùng bấm tối thiểu 28px khi là nút độc lập.
- Danh sách Top xuất sắc dùng ảnh chân dung 28×28px; thứ hạng hiển thị bằng badge số 20×20px riêng, không dùng hình huy chương thay cho ảnh người học.

## 7. Tracking và khả năng đọc

- Văn bản thường dùng tracking 0; không nén chữ toàn trang.
- Heading dùng `-0.018em`; hero brand dùng `-0.035em`.
- Nhãn viết hoa dùng tracking `0.06–0.07em`.
- Đoạn văn dùng line-height tối thiểu 1.5.
- Card hẹp giới hạn 1–2 dòng và cung cấp nội dung đầy đủ bằng `title` khi rê chuột.

## 8. Quy tắc responsive

- Không thu body text dưới 12px trên mobile.
- Metadata giữ tối thiểu 10px.
- Hero dùng `clamp()` để thay đổi liên tục từ 32px đến 42px.
- Menu desktop dùng 12px; từ màn hình 1536px trở lên có thể tăng lên 13px.
- Dải card nhiều nội dung cuộn ngang trên mobile thay vì thu chữ xuống dưới chuẩn.

## 9. Quy tắc sử dụng trong code

- Ưu tiên các class semantic `type-*` thay vì tạo thêm cỡ chữ tùy ý.
- Chỉ thêm token mới khi có vai trò nội dung mới, không thêm chỉ để khớp một card đơn lẻ.
- Khi thay đổi font, kiểm tra cả hai trạng thái slideshow và tab nội dung để tránh nhảy chiều cao.

## 10. Quy tắc riêng cho footer

- Tiêu đề nhóm phải lớn hơn liên kết tối thiểu 1px và dùng weight 800 để nhận diện nhanh khi quét trang.
- Liên kết dùng 13px, weight 500 và line-height 1.55; không dùng chữ 10–11px cho điều hướng chính.
- Nội dung giới thiệu dùng 12px trên mobile, 13px trên desktop và giới hạn chiều rộng để dòng không quá dài.
- Phần pháp lý có thể dùng 11px nhưng phải giữ màu đủ tương phản và line-height tối thiểu 1.5.
- Khoảng cách giữa các liên kết là 6px; mỗi liên kết có thêm vùng đệm dọc nhỏ để dễ bấm mà không kéo footer quá cao.
- Logo, tagline và phần giới thiệu tạo thành một cụm; các nhóm liên kết phải thẳng hàng theo cùng một đường cơ sở trên desktop.
- “Kết nối”, mạng xã hội, slogan và pháp lý phải nằm trong một thanh cuối riêng, không đặt trong cột “Thông tin”.
- Trên desktop, thanh cuối dùng một hàng gồm ba vùng: slogan bên trái, mạng xã hội ở giữa và pháp lý bên phải.
- Nội dung pháp lý dùng câu ngắn, ưu tiên dấu `·` để phân tách và không vượt quá hai dòng trên mobile.

## 11. Quy tắc trình bày danh sách nhiều mục

- Không thu nhỏ chữ để ép từ 5 mục trở lên vào một hàng hẹp.
- Với khối `HOME-05`, dùng carousel vòng: 1 card trên mobile, 3 card trên desktop thông thường và 4 card trên màn hình từ 1536px.
- Nút trước/sau phải quay vòng liên tục ở đầu và cuối danh sách, kèm chỉ số vị trí hiện tại.
- Card trong cùng carousel phải có chiều cao bằng nhau; thay đổi mục không được làm dịch chuyển nội dung phía dưới.
- Khi giảm số lượng card hiển thị, ưu tiên tăng chiều rộng card, cỡ tiêu đề và khoảng thở thay vì tăng chiều cao toàn khối.
- Nút trước/sau đặt nổi tại hai mép vùng ảnh, dùng nền trắng bán trong suốt, viền sáng và bóng mềm; không chiếm thêm chỗ trong header.
- Khung ảnh carousel cao tối thiểu 104px và dùng `object-contain` để không cắt mất nội dung minh họa.
- Nhãn tab carousel dùng 12px trên mobile và 13px trên desktop để tương xứng với tiêu đề các khối cùng cấp.
- Tiêu đề card carousel dùng 13.5px; phần mô tả tối thiểu 11px và không quá hai dòng.
- Chỉ số carousel dùng 11px; liên kết hành động dùng 11.5px để không tạo vùng chữ nhỏ biệt lập.
- Tab lộ trình chỉ hiển thị các bước chính trong carousel; không thêm một hàng card phụ có cỡ chữ nhỏ bên dưới.
- Màu chữ trong carousel phải tuân theo hệ màu chung: heading `#123B68`, body `#536D86`, metadata `#71869A`, action và mũi tên `#126F91`.
- Màu pastel khác nhau giữa các card chỉ được dùng cho nền và đường viền, không thay đổi màu chữ theo từng card.

## 12. Quy tắc khối chọn mục tiêu

- Khối `HOME-04` dùng bán kính 22px, khoảng đệm dọc 12px và bóng rất nhẹ; không trình bày như một banner CTA lớn.
- Icon tiêu đề dùng nền teal nhạt có viền, không dùng gradient bão hòa hoặc bóng đậm.
- Bộ chọn lớp chỉ hiển thị icon và lớp hiện tại; nội dung giải thích đầy đủ đặt trong `aria-label`.
- Hàng chọn mục tiêu dùng chiều cao 42px, một lớp nền trung tính và bán kính 12px; tránh lồng nhiều card trắng trong một khung xám.
- CTA phụ cao 40px, dùng nền amber pastel phẳng, bán kính 12px và nhãn ngắn “Xem lộ trình”.

## 13. Quy tắc điều khiển slideshow hero

- Thanh chủ đề nằm ở đầu hero, dùng một nền kính mờ chung; các mục không được tạo thành nhiều nút viền và bóng đổ rời rạc.
- Tên tab ngắn, ưu tiên 2–3 từ và luôn nằm trên một dòng. Mục đang chọn dùng nền xanh thương hiệu; mục còn lại dùng chữ xanh xám trên nền trong suốt.
- Nhãn chủ đề của từng slide luôn hiển thị trên một dòng và không bị co chiều ngang; chú thích phụ chỉ xuất hiện ở màn hình rất rộng khi còn đủ không gian.
- Mỗi slide dùng cấu trúc nội dung cố định: nhãn ngữ cảnh, thương hiệu, tiêu đề chính ngắn, mô tả cụ thể và bảng nội dung lộ trình 2×2.
- Tiêu đề chính ưu tiên dưới 45 ký tự; mô tả có thể dài 70–100 ký tự nhưng chỉ giữ một ý rõ ràng. Không dồn toàn bộ thông điệp vào một heading nhiều dòng.
- Bốn nội dung tiêu biểu được đặt trong một mặt kính mờ chung, chia hai cột và đi kèm dấu xác nhận. Cách trình bày này tạo cảm giác đầy đặn, đáng tin cậy hơn một nhóm badge rời nhưng vẫn giữ khối gọn.
- Bảng nội dung là điểm nhấn chức năng của slide, không phải lớp trang trí: phần đầu bảng phải có biểu tượng chủ đề, nhãn rõ nghĩa và số lượng trọng tâm.
- Mỗi mục trong bảng có biểu tượng riêng để hỗ trợ quét nhanh. Dùng bốn họ màu pastel theo ngữ cảnh: amber cho HSG, xanh dương cho Chuyên Tin, emerald cho Tốt nghiệp và tím nhạt cho Du học.
- Nền bảng dùng gradient rất nhẹ; icon có màu đậm hơn một cấp. Không dùng màu bão hòa mạnh cho toàn bộ mặt bảng hoặc cho cả bốn ô nội dung.
- Ở mobile, lớp phủ ảnh phải đậm hơn desktop để chữ giữ độ tương phản khi vùng nội dung mở rộng.
- Cụm chuyển ảnh nổi trực tiếp trên vùng ảnh, cách đáy 14–16px và cách mép phải 16–20px.
- Dùng nền trắng trong mờ, viền trắng nhẹ và blur vừa phải để đọc rõ trên mọi ảnh nhưng không tạo một mảng màu nặng.
- Nút mũi tên có vùng bấm 28px; nút “tiếp theo” dùng xanh thương hiệu, nút “trước” giữ màu trung tính để tạo thứ bậc thao tác.
- Chỉ báo đang chọn dài 20px; các chỉ báo còn lại rộng 6px. Chuyển trạng thái trong 300ms và không làm thay đổi kích thước hero.
- Khi người dùng trỏ chuột hoặc đưa focus vào hero, tạm dừng tự chuyển để họ có đủ thời gian đọc và thao tác.
- Các điều khiển trong cùng hàng phải có bán kính, độ đậm và chiều cao tương đồng để tạo nhịp thị giác thanh thoát.

## 14. Quy tắc user menu trên header

- User menu mở khi rê chuột vào toàn bộ vùng avatar và đóng khi rời cả trigger lẫn panel; đóng trễ khoảng 160ms để tránh chớp tắt khi di chuyển giữa hai vùng.
- Click vẫn được hỗ trợ cho thiết bị cảm ứng; focus bằng bàn phím phải mở menu và không làm mất focus khi chuyển sang các lựa chọn bên trong.
- Panel desktop đặt ngay dưới trigger với khoảng cách tối đa 6px; panel mobile dùng vị trí cố định, giới hạn chiều cao theo viewport và cho phép cuộn.

## 15. Cấu trúc trang và mã khối

Trang chủ dùng một luồng đọc dọc, với thông báo ở đầu, lưới nội dung chính ở giữa và footer ở cuối:

| Mã khối | Tên | Vị trí / trách nhiệm |
|---|---|---|
| `HOME-01-SYSTEM-NOTICE` | Thông báo hệ thống | Dải thông báo đầu trang, tự chạy và có điều khiển |
| `HOME-02-LEFT-SIDEBAR` | Menu trái | Điều hướng chính, banner và thẻ giáo viên |
| `HOME-03-HERO` | Hero | Thông điệp, ảnh trình chiếu và mục tiêu học |
| `HOME-04-GOAL-SEARCH` | Chọn mục tiêu | Chọn lớp, mục tiêu/lộ trình và CTA |
| `HOME-05A-FEATURED-PROGRAMS` | Chương trình nổi bật | Carousel khóa/lộ trình |
| `HOME-06-LEARNING-PROGRESS` | Không gian học tập | Dữ liệu cá nhân sau đăng nhập |
| `HOME-07-RANKING-NOTIFICATIONS` | Top & thông báo | Hai tab trong sidebar phải |
| `HOME-08-FEATURED-MATERIALS` | Tài liệu nổi bật | Danh sách tài liệu trong sidebar phải |
| `HOME-09-CONTESTS` | Cuộc thi & khảo sát | Sự kiện trong sidebar phải |
| `HOME-10-TESTIMONIALS` | Câu chuyện đồng hành | Ba thẻ cảm nhận và chân khối trang trí |
| `HOME-11-SUPPORT-ROW` | FAQ & hỗ trợ | Một hàng chiếm toàn bộ chiều ngang |

Desktop dùng grid 3 cột: menu trái `210/240/260px`, nội dung giữa `1fr`, sidebar phải `280/310/360px` theo breakpoint. Sidebar phải chỉ trải qua 2 hàng (`row-span-2`) để `HOME-11` bắt đầu ngay sau `HOME-10`, không tạo hàng trống.

## 16. Dải thông báo hệ thống

- Có tối thiểu 3 tin mẫu, tự chuyển mỗi khoảng 5,2 giây; không yêu cầu người dùng bấm “tiếp” mới đổi tin.
- Nút trước/sau phải hoạt động, quay vòng ở đầu/cuối và hiển thị chỉ số `n/tổng` trên desktop.
- Khi rê chuột hoặc focus vào dải, tạm dừng bộ đếm để người dùng đọc; rời vùng thì chạy lại.
- Nội dung cập nhật dùng `aria-live="polite"`, hiệu ứng fade 300–700ms và vùng chữ `truncate` để không làm đổi chiều cao.
- Mỗi loại tin có nền pastel khác nhau nhưng độ bão hòa thấp, vạch màu dọc và nhãn ngắn (`Kỳ thi`, `Lịch học`, `Bài tập mới`).
- Dùng SVG Lucide cho icon thông báo; không dùng emoji trong nhóm điều khiển.

## 17. Không gian học tập và dữ liệu theo vai trò

- Tên khối thống nhất là **Không gian học tập**, vì dùng chung cho Học sinh, Phụ huynh và Giáo viên.
- Khách chưa đăng nhập không được xem số liệu cá nhân. Hiển thị trạng thái giải thích, icon khóa và CTA “Đăng nhập ngay” trong cùng khung để không làm vỡ lưới.
- Học sinh: xem tiến độ cá nhân, bài tiếp theo và ba chỉ số bài đã xong/đang học/chưa học. Màn Tổng quan sắp theo thứ tự: summary tiến độ → ba KPI trạng thái → bài tiếp theo và lịch sắp tới; summary dùng một surface trung tính, còn KPI dùng icon tint nhẹ để tạo điểm neo mà không làm giao diện thành nhiều mảng pastel.
- Ba KPI học sinh dùng nhãn dễ quét `Đã hoàn thành`, `Đang học`, `Chưa bắt đầu`; số liệu là số bài, ghi chú 11px và icon ngữ nghĩa. Nút tiếp tục học cao tối thiểu 40px, tiêu đề bài 14px/700, mô tả 12px và minh họa dùng `object-contain` để không méo hình.
- Phụ huynh: có bộ chọn `Tất cả các con` và từng con; số liệu tổng hợp phải ghi rõ “trung bình của các con”, số liệu riêng phải kèm tên và lớp của con. Màn Tổng quan sắp theo thứ tự: chọn đối tượng → tiến độ của con → điểm danh/tiến độ/điểm gần nhất → gợi ý đồng hành và lịch → thông báo từ lớp; mỗi khối phải ghi rõ học sinh đang được theo dõi để tránh hiểu nhầm dữ liệu tổng hợp.
- Dashboard phụ huynh dùng avatar học sinh ở summary, progress bar cho tiến độ, ngày/giờ trong khung nhỏ và CTA rõ ràng như `Xem tiến độ`, `Mở lịch`; không dùng điểm số hoặc màu cảnh báo làm điểm nhấn duy nhất.
- Giáo viên: có bộ chọn `Tất cả các lớp` và từng lớp; số liệu tổng hợp phải ghi rõ “trung bình các lớp”, số liệu riêng phải kèm mã lớp/môn. Màn Tổng quan sắp theo thứ tự: summary tiến độ lớp → ba KPI lớp/bài/học viên cần chú ý → lớp cần chú ý và việc cần xử lý → lịch giảng dạy; dữ liệu phải giúp giáo viên nhận ra việc cần làm tiếp theo ngay trong lượt quét đầu tiên.
- KPI giáo viên dùng nhãn `Lớp đang phụ trách`, `Bài cần xử lý`, `Học viên cần chú ý`; ưu tiên số liệu vận hành thay vì đưa quyền dạy lên cùng cấp với hiệu quả lớp. Danh sách lớp cần chú ý hiển thị tiến độ bằng progress bar, ảnh minh họa gọn và CTA `Mở lớp` cao tối thiểu 40px khi cần thao tác.
- Bộ chọn đối tượng đặt ở góc phải tiêu đề khối, dùng `select` có label ẩn cho khả năng tiếp cận; khi đổi vai trò phải reset về “Tất cả”.
- Chỉ số, thanh tiến độ và thẻ “việc cần làm tiếp theo” đổi đồng bộ theo đối tượng đang chọn; không dùng dữ liệu của một con/lớp để đại diện cho toàn bộ vai trò.

## 18. Câu chuyện đồng hành và chân khối

- Ba testimonial card trên desktop, một cột trên mobile; ảnh banner không bị cắt ngoài vùng quy định.
- Bên dưới ba card có `HOME-10A` — một dải kết thúc cao khoảng 48–56px, nền pastel rất nhẹ, hai đường cong SVG, ba avatar chồng lớp và một câu chốt ngắn.
- Chân khối là điểm neo thị giác, không phải một card nội dung mới; không dùng màu bão hòa hoặc bóng nặng.
- Khoảng cách từ danh sách testimonial đến chân khối khoảng 16px; chân khối không tạo thêm khoảng cách lớn trước FAQ.

## 19. Nhịp khoảng cách và cân bằng thị giác

- Khoảng cách giữa các khối chính: `16px` trên desktop thường, `20px` ở màn hình rộng; mobile dùng `16px`.
- Card dùng padding 14–16px ở sidebar và 16–20px ở nội dung chính; không kéo card cao chỉ để lấp khoảng trắng.
- Footer toàn trang nối gần nội dung cuối: margin ngoài `12px` mobile và `16px` từ `sm` trở lên; phần đệm bên trong giữ 24–28px để nội dung vẫn thoáng.
- Mỗi vùng phải có một điểm nhấn chính; không xếp nhiều nền pastel đậm cạnh nhau.
- Khi một grid item trải qua nhiều hàng, phải kiểm tra các hàng rỗng bên cạnh trước khi giao diện được xem là hoàn thiện.

## 20. Responsive đa thiết bị

- Mobile `<640px`: một cột; sidebar phải chuyển xuống dưới nội dung; carousel hiển thị một card; nút điều khiển đạt vùng bấm tối thiểu 40px.
- Tablet `640–1023px`: nội dung chính một cột; giữ padding ngang 16–24px; không ép menu desktop vào vùng quá hẹp.
- Desktop `1024–1535px`: grid 3 cột như bảng ở mục 15; menu top dùng 12px và không được tràn ngang.
- Desktop rộng `≥1536px`: có thể dùng 4 card carousel, menu top 13px và sidebar phải rộng 360px.
- Hình ảnh dùng `object-contain` khi nội dung minh họa cần nhìn trọn; dùng `object-cover` chỉ cho ảnh banner đã có vùng cắt chủ ý.
- Không để thay ảnh hero, đổi tab, đổi vai trò hoặc đổi đối tượng làm nhảy chiều cao các khối kế tiếp.
- Footer trên mobile xếp dọc, giữ vùng bấm tối thiểu 36px cho liên kết và không để pháp lý vượt quá hai dòng khi có thể.

## 21. Tương tác và khả năng tiếp cận

- Mọi nút chuyển, tab, select và CTA phải có `type`, nhãn hoặc `aria-label`, trạng thái focus nhìn thấy và vùng bấm tối thiểu 28px (40px trên mobile nếu là nút nổi).
- Tab vai trò dùng `role="tablist"`, `role="tab"` và `aria-selected`; dữ liệu thay đổi không làm mất focus.
- Nội dung tự chạy phải có cơ chế tạm dừng khi hover/focus; không dùng chuyển động liên tục gây khó đọc.
- Không dùng màu làm tín hiệu duy nhất; trạng thái phải đi kèm nhãn, icon hoặc con số.
- Khi người dùng bật `prefers-reduced-motion`, giảm hoặc tắt fade/scale/auto-play không cần thiết.

## 22. Checklist nghiệm thu trước khi giao diện được xem là hoàn thiện

- [ ] Font chính là Be Vietnam Pro; không có text dưới 10px trong trang chủ.
- [ ] Menu top, menu trái và liên kết học tập ở footer đều hiển thị **Lớp học**; đích điều hướng cũ vẫn tương thích.
- [ ] User menu mở/đóng bằng hover, click và bàn phím.
- [ ] Thông báo hệ thống tự chạy, có pause khi hover/focus và nút trước/sau hoạt động.
- [ ] Hero, carousel và đổi vai trò không gây layout shift.
- [ ] Không gian học tập yêu cầu đăng nhập; Phụ huynh xem được nhiều con; Giáo viên xem được nhiều lớp.
- [ ] Sidebar phải dùng Lucide SVG và màu pastel tiết chế; Top xuất sắc dùng ảnh chân dung.
- [ ] `HOME-10` có chân khối trang trí, `HOME-11` chiếm toàn bộ chiều ngang và không còn hàng trống trước FAQ.
- [ ] Footer nối gần nội dung, chữ/link đúng thang, thanh cuối gọn trên mobile.
- [ ] Kiểm tra tối thiểu ở 375px, 768px, 1024px, 1440px và 1920px; không có overflow ngang.
- [ ] Chạy `npm run build` thành công; chỉ chấp nhận cảnh báo chunk lớn nếu không có lỗi compile.

## 23. Spec trang đăng nhập và trung tâm truy cập

- Modal đăng nhập dùng hai vùng trên desktop: panel hình ảnh khoảng 52% chiều rộng và panel form khoảng 48%; panel hình ảnh ẩn dưới `lg` để mobile tập trung vào thao tác.
- Lớp phủ nền modal dùng slate đen trong suốt và blur nhẹ; khung chính bo tròn 24px, không dùng viền hoặc shadow quá nặng.
- Panel hình ảnh dùng artwork học tập có `object-cover`, lớp phủ xanh dương nhiều mức và một cụm thống kê ngắn ở đáy; nội dung chỉ bổ trợ niềm tin, không cạnh tranh với form.
- Form dùng tối đa khoảng 448px chiều rộng, padding 20px mobile và 36px desktop; vùng nội dung có thể cuộn trong viewport cao hạn chế.
- Tiêu đề form chính dùng màu heading `#123B68`, kích thước `20px` trên mobile và `24px` trên desktop; các trạng thái compact giữ `16px`. Cấp chữ này lấy cảm hứng từ banner Giáo viên nhưng vẫn thấp hơn hero; mô tả dùng 12px/1.5–1.6 và màu body `#536D86`.
- Mỗi input cao tối thiểu 48px, bo tròn 16px, padding ngang 16px; giá trị nhập dùng 13px/500, label trường dùng 12px/700; placeholder dùng 13px với màu `#8193A3` để đủ tương phản.
- Focus input dùng viền teal và ring pastel; nút hiện/ẩn mật khẩu có vùng bấm tối thiểu 40×40px và `aria-label` rõ nghĩa.
- Phương thức Email/Số điện thoại dùng tab 2 cột, cao tối thiểu 40px và chữ 12px; tab đang chọn dùng nền trắng, chữ teal và shadow rất nhẹ.
- CTA “Đăng nhập” cao tối thiểu 48px, chữ 12px/800, nền gradient teal/xanh dương cùng hệ thương hiệu; luôn là nút `type="submit"` và có focus ring.
- Nút Google là CTA phụ: nền trắng, viền trung tính, cao tối thiểu 48px; không lấn át nút đăng nhập chính.
- Thứ tự đọc: tiêu đề → lời giới thiệu an toàn/riêng tư → phương thức liên hệ → mật khẩu → ghi nhớ/quên mật khẩu → CTA chính → đăng nhập Google → đăng ký.
- Trạng thái đăng nhập chính phải ưu tiên “một màn hình”: tiêu đề ngắn, mô tả tối đa một dòng, ghi chú riêng tư dạng inline và khoảng cách dọc cô đọng; không bắt người dùng cuộn ở viewport desktop/mobile thông thường. Thang chữ form dùng `section 14–16px`, `card/body 12px`, `label/liên kết hành động 12px`, input/placeholder 13px; không dùng chữ nội dung thao tác nhỏ hơn 12px.
- Trạng thái đăng nhập thành công, khôi phục mật khẩu và đăng ký dùng cùng `AuthShell`, cùng thang chữ, padding và nút CTA; không tạo một hệ modal thứ hai.
- Bước 3 của đăng ký phải có nhóm chọn vai trò gồm đúng ba lựa chọn: **Học sinh**, **Phụ huynh**, **Giáo viên**. Mỗi lựa chọn dùng icon Lucide, tên vai trò và một mô tả ngắn để người dùng hiểu quyền sử dụng trước khi xác nhận.
- Nhóm vai trò dùng `role="radiogroup"`; từng nút dùng `role="radio"` và `aria-checked`. Trạng thái chọn thể hiện đồng thời bằng viền teal, nền teal rất nhạt và dấu xác nhận, không chỉ dựa vào màu.
- Các lựa chọn vai trò có cùng chiều cao/padding và xếp một cột trên mobile; vùng bấm tối thiểu 48px. Sau khi hoàn tất, màn hình thành công phải hiển thị lại vai trò đã chọn để người dùng kiểm tra.
- Form chính có dải teal mảnh ở cạnh trên trên mobile và đường phân cách nhẹ với panel hình ảnh trên desktop, tạo một điểm neo thương hiệu mà không tăng độ nặng của khung. Mobile phải không bị cắt nút đóng, không tràn ngang và cho phép cuộn dọc khi bàn phím mở; desktop phải giữ khung trong tối đa 96vh.

## 24. Favicon và nhận diện trình duyệt

- Toàn bộ trang dùng chung `/favicon.svg`, không dùng emoji hoặc biểu tượng khác nhau theo từng route.
- Favicon dùng đúng biểu tượng nhận diện gốc: vòng tròn xanh chuyển sắc liền nét và mũi tên vàng chéo hướng lên; không thêm chữ Ôn Thi 360 hoặc khẩu hiệu vào icon.
- Hình phải đọc được ở kích thước 16–32px: chỉ giữ vòng tròn liền nét và mũi tên với nét dày, tương phản rõ. Thân mũi tên phải có khoảng ngắt nhỏ ở vùng tâm để không bị hiểu nhầm là kim đồng hồ hoặc đường chéo liền mạch.
- `index.html` khai báo `theme-color` `#126F91` để màu trình duyệt và vùng giao diện hệ thống đồng bộ với thương hiệu.

## 25. Spec trang Lớp học

- Tên hiển thị thống nhất là **Lớp học Tin học 360**; không dùng tiêu đề “Khóa học” làm nhãn chính dù dữ liệu/route cũ vẫn có thể giữ để tương thích.
- Thang chữ riêng của trang: hero `20px/24px` (mobile/desktop), mô tả hero `12px/14px`, tab và CTA `11px`, tên lớp `13px/14px`, mô tả lớp `12px`, metadata lớp/mã lớp `11px`, giá `14px`. Chỉ nhãn phụ rất ngắn mới dùng token `type-meta` 10px.
- Logic nội dung phải phân biệt rõ: **Khóa học** là chương trình/nhóm kiến thức, còn **Lớp học** là lớp cụ thể thuộc khóa đó, có khối, mã lớp, lịch/địa điểm và hình thức học riêng. Card nên hiển thị quan hệ `Khóa học: ...` trước tên lớp.
- Tên khóa học trên card là nút lọc (không phải văn bản trang trí): khi bấm, danh mục tương ứng được chọn và danh sách chỉ hiển thị các lớp thuộc khóa đó; nút phải có `aria-label`, trạng thái `aria-pressed` và focus ring.
- Hero trang lớp học là điểm nhấn cấp 1 nhưng không vượt quá `24px` ở desktop; mô tả dùng 12–14px, CTA chính tối thiểu 40px và nền amber chỉ dùng dạng pastel.
- Bộ lọc gồm ô tìm kiếm, khối lớp và danh mục; dùng nền trung tính `#F8FAFB`, viền `#DDEAF0`, trạng thái chọn teal nhạt `#EAF5F8` và có `aria-pressed` cho các nút lựa chọn.
- Danh mục phải hiển thị icon SVG Lucide cùng nhãn ngắn; icon chưa chọn có thể dùng tint pastel riêng theo nhóm, còn trạng thái đang chọn dùng xanh đậm thương hiệu để nhận biết nhanh; không dùng emoji trong tab, badge hoặc điều khiển.
- Các icon SVG bổ sung trong card và bộ lọc phải có màu có chủ đích hoặc nằm trong khung tint 8–12%; icon trung tính chỉ dùng cho metadata phụ, không để toàn bộ biểu tượng bị xám/trắng.
- Nền pastel theo danh mục chỉ dùng ở tab chưa chọn và các surface metadata nhỏ; mỗi card không dùng quá 2–3 tint cạnh nhau, luôn giữ chữ heading xanh đậm và body xanh xám để tránh cảm giác sặc sỡ.
- CTA chính “Xem chi tiết” được phép dùng gradient thương hiệu teal/xanh và chữ trắng; CTA phụ dùng nền pastel có viền, không để toàn bộ nút trên trang ở trạng thái trắng phẳng.
- Card lớp học dùng viền `#DDEAF0`, bán kính 24px, bóng mềm; ảnh minh họa đặt trong khung cao cố định và dùng `object-contain` khi cần giữ trọn hình.
- Với ảnh lớp học tỉ lệ ngang 4:3, khung ảnh dùng chiều cao khoảng 176–192px và `object-cover` để hình đủ lớn, không bị co vào; chỉ dùng `object-contain` cho minh họa có chi tiết sát mép cần giữ trọn.
- Tiêu đề lớp học dùng 13–14px, mô tả dùng 12px, metadata 10–11px, CTA 11px; card trong cùng một hàng giữ chiều cao cân bằng để nội dung bên dưới không nhảy.
- Thông tin giảng viên là một hàng phụ có avatar 32px, nền `#F8FAFB` và không dùng chữ dưới 10px. Màu vàng chỉ dành cho điểm đánh giá hoặc nhãn thành tích.
- Mỗi card lớp hiển thị thêm metadata thực tế theo dải hai hàng: địa điểm, hình thức học và địa chỉ; dùng icon Lucide 14px, chữ 11px, truncate có `title` khi nội dung dài.
- Sĩ số là metadata độc lập, không đặt như dòng con của hình thức học: dùng một hàng riêng có icon người học và nhãn `Sĩ số: đã đăng ký / tối đa nhận` (ví dụ `32 / 40 học sinh`) để người dùng biết quy mô và chỗ còn lại.
- CTA cuối card phản ánh trạng thái tuyển sinh: `Đăng ký học` (CTA xanh chính), `Vào học` (teal–emerald, dành cho lớp đã có quyền) hoặc `Đã đóng` (nền xám, disabled). Không dùng nhãn chung “Xem chi tiết” cho cả ba trạng thái.
- Mỗi chức năng phải có màu và icon ngữ nghĩa riêng: đăng ký dùng `UserPlus`, vào học dùng `PlayCircle`, lớp đã đóng dùng `LockKeyhole`; các nút cùng chức năng trên toàn trang phải giữ cùng một màu, không đổi màu ngẫu nhiên theo card.
- Thông tin lớp phải có badge dễ quét ngay cạnh đánh giá, gồm icon tốt nghiệp và nhãn như `Lớp 11–12`; mã lớp đặt ở dòng phụ 10px để hỗ trợ tra cứu mà không cạnh tranh với tên lớp.
- Nếu lớp có trợ giảng, đặt 2–3 avatar 16px chồng nhẹ bên dưới tên giáo viên phụ trách, kèm nhãn “Trợ giảng đồng hành”; avatar chỉ bổ trợ niềm tin và không được làm tăng chiều cao card quá mức.
- Lưới responsive: một cột dưới 768px, hai cột từ 768px, ba cột từ 1280px; khoảng cách giữa card 16–20px và không tạo overflow ngang ở tab danh mục.
- Khi số lớp vượt quá 3 card, dùng phân trang vòng ngoài lưới: 3 card/trang, hiển thị số trang, nút trước/sau tối thiểu 36px và trạng thái disabled rõ ràng. Đổi danh mục, khối lớp hoặc từ khóa phải reset về trang 1.

## 26. Spec trang Luyện tập

- Trang Luyện tập có hai nhiệm vụ cấp 1: **Bài tập chuyên đề** (bài code lẻ để rèn một kỹ thuật) và **Đề thi luyện tập** (một phiên thi gồm nhiều bài, có thời lượng và kết quả tổng hợp). Hai nhiệm vụ dùng tab chuyển chế độ, không trộn chung trong một danh sách.
- Hero Luyện tập dùng cùng thang với trang Lớp học: tiêu đề 20–24px, mô tả 12–14px, badge và chỉ số 10–12px; CTA chính `Làm bài ngay` cao tối thiểu 40px trên mobile và 44px trên desktop, đặt trước các chip tiến độ để tạo điểm nhìn rõ. Không dùng emoji trong nội dung điều khiển.
- Tab trạng thái, bộ lọc độ khó và chuyên đề đều là nút có `type="button"`, `aria-pressed` và focus ring. Bộ lọc chính (`Tất cả bài tập`, `Theo lớp học`, `Bài được giao`, `Lịch sử nộp bài`) dùng chữ 12px, cao tối thiểu 40px và có điểm nhấn teal; bộ lọc phụ (độ khó, chuyên đề, loại đề) dùng chữ 11px, cao 36px, nền trung tính/tint pastel và viền nhẹ. Tránh dùng xanh bão hòa hoặc gradient cho các control phụ.
- Các tab `Tất cả bài tập`, `Theo lớp học`, `Bài được giao` và `Lịch sử nộp bài` phải lọc dữ liệu thật, không chỉ đổi màu trạng thái; số lượng kết quả cần cập nhật theo tab và các bộ lọc phụ.
- Chuyên đề dùng icon Lucide 14px trong khung 20px; mỗi nhóm có màu icon riêng. Độ khó hiển thị theo thang 1–5 sao bằng icon `Star` màu amber; nhãn chữ Dễ/Trung bình/Khó/Cực khó chỉ là thông tin phụ. Không dùng màu đơn độc để truyền đạt độ khó.
  - Danh sách bài dùng bảng trên desktop và card compact trên mobile; tên bài 14–15px, font-weight 700 (`bold`) thay cho `extrabold`, mã bài/thời gian 11px, nhãn trạng thái 11px, tỷ lệ AC 13px và CTA 10–11px cao 36–40px, rộng vừa đủ theo nhãn; không dùng shadow nặng hoặc hiệu ứng nâng item.
  - Ngay dưới tên bài hiển thị nguồn nội dung bằng dòng `Nguồn: ...`, chữ 10px font-weight 600–700, màu amber/cam trầm và icon Lucide 12px. Nguồn phải là dữ liệu thực tế như kho chung, lớp học, bài được giao hoặc chuyên đề; không để nguồn cạnh tranh với tiêu đề.
- CTA theo trạng thái dùng màu đơn, không dùng gradient: `Làm bài` xanh đậm `#126F91`, `Tiếp tục` vàng trầm `#B68032`, `Luyện lại` xanh lá `#2F8A6B`; hover chỉ dùng một sắc đậm hơn cùng màu. Màu nút phải phân loại hành động, không tạo hiệu ứng trang trí.
- Trạng thái bài gồm icon và nhãn (`AC`, `Đang làm`, `Chưa nộp`), không dùng màu đơn độc để truyền đạt kết quả. Hàng bài có chiều cao ổn định và hover nhẹ, không làm dịch chuyển cột.
  - Chế độ Đề thi có dải tổng quan ba chỉ số (kho đề, đề đang luyện, điểm cao nhất) trước danh sách để tạo ngữ cảnh và điểm neo thị giác; mỗi chỉ số dùng icon Lucide trong khung tint nhỏ, chữ số 18px và mô tả 11px.
  - Chế độ Đề thi dùng card 1/2/4 cột responsive, hiển thị loại đề, trạng thái, mã đề, thời lượng, số bài, lượt làm, tiến độ cá nhân và kết quả gần nhất; card dùng bán kính 16px, vùng ảnh cao khoảng 144px để minh họa đủ lớn, `object-contain` với chiều cao tự nhiên và `max-width` để không kéo giãn/crop, đặt giữa khung trung tính, padding 14px, viền thay đổi nhẹ theo trạng thái và CTA đơn màu 11px/cao 40px, rộng theo nội dung và căn phải để tránh cảm giác cục mịch. Tiêu đề đề thi dùng 14px, font-weight 700. CTA lần lượt là `Bắt đầu làm đề` (xanh đậm), `Tiếp tục làm đề` (vàng trầm) hoặc `Xem kết quả` (xanh lá).
- Bộ lọc của hai chế độ độc lập: bài chuyên đề lọc theo tab/trạng thái, chuyên đề và độ khó; đề thi lọc theo loại đề và từ khóa. Khi chuyển chế độ, không giữ bộ lọc không còn phù hợp.
- Danh sách bài chuyên đề dùng phân trang 5 bài/trang; đề thi dùng 4 đề/trang, tương ứng với lưới 4 cột trên desktop như trang Tài liệu. Phân trang hiển thị bên ngoài lưới khi số đề vượt 4, gồm số trang, trước/sau, `aria-current` và vùng bấm tối thiểu 36px; dữ liệu mẫu nên có tối thiểu 5 đề để minh họa trạng thái chuyển trang.
  - Trạng thái bài (`AC`, `Đang làm`, `Chưa nộp`) không trình bày như pill ngang; dùng icon SVG trong khung 44px trên mobile và 36–44px trên desktop, viền tint 2px, nền chuyển sắc pastel có chủ đích và nhãn chữ đậm đặt bên dưới. Trên mobile, trạng thái chiếm một cột riêng, metadata gộp thành một dòng và CTA không kéo toàn chiều ngang để danh sách thoáng, dễ quét và không phụ thuộc màu đơn độc. Hàng bài có vạch teal mảnh khi hover để hỗ trợ định vị mà không làm dịch chuyển cột.
  - Tỷ lệ AC hiển thị bằng progress bar ngang thay cho chỉ một con số: phần trăm nằm trên thanh, màu xanh lá đơn, có nhãn `AC`. Bên dưới ghi số AC/tổng lượt nộp của toàn hệ thống và số lần người dùng đã nộp bài (`Bạn đã nộp N lần`) nếu dữ liệu có.

## 27. Phương án đồng bộ Lớp học với Tài liệu

### 27.1. Kết quả đối chiếu

- Tài liệu tạo cảm giác dễ chịu hơn vì card có một điểm nhìn chính là ảnh bìa, ít lớp metadata và chỉ một CTA lặp lại; Lớp học hiện có nhiều lớp thông tin cạnh nhau (badge, khóa học, mã lớp, mô tả, bốn metadata, giảng viên, trợ giảng, giá và trạng thái).
- Lớp học dùng lưới 3 cột để chứa nội dung phong phú, trong khi Tài liệu dùng 4 cột với card đơn giản hơn. Nếu giữ 3 cột, cần giảm số dòng và gom metadata theo nhóm để tránh cảm giác dày.
- Cỡ chữ nền tảng của hai trang không chênh lệch lớn; cảm giác “li ti” của Lớp học đến từ quá nhiều nhãn 10–11px xuất hiện liên tiếp và nhiều pill/surface cạnh nhau.
- Tài liệu có nhịp CTA đồng nhất; Lớp học cần giữ màu khác nhau theo trạng thái nhưng cùng chiều cao, bán kính và vị trí để không phá nhịp card.

### 27.2. Hướng nâng cấp

- Giữ cấu trúc 3 cột trên desktop nhưng rút card về bốn vùng: ảnh 4:3 cố định, quan hệ `Khóa học → Lớp học`, metadata lớp gọn 2×2, footer giá + CTA. Mô tả tối đa hai dòng.
- Chỉ dùng 11px cho thông tin cần đọc; mã lớp, nhãn trợ giảng và chú thích phụ gom vào một dòng hoặc tooltip. Không xếp quá ba surface pastel cạnh nhau trong một card.
- CTA giữ quy tắc ngữ nghĩa: `Đăng ký học` xanh thương hiệu, `Vào học` teal–emerald, `Đã đóng` xám disabled; tất cả dùng cùng min-height 40px và icon riêng.
- Bộ lọc và phân trang dùng cùng kiểu control của Tài liệu: nền trung tính, trạng thái chọn xanh đậm, viền nhạt, vùng bấm tối thiểu 36–40px.
- Mỗi card chỉ có một màu nhấn chính; màu danh mục dùng ở icon/dải đầu card, không đổi màu heading và body giữa các card.
- Kiểm tra lại ở 375px, 768px, 1280px và 1440px; ưu tiên giữ card không nhảy chiều cao, không overflow ngang và không để CTA rơi xuống dòng.

### 27.3. Trình tự triển khai

1. Tạo token dùng chung cho hero, tab, metadata và CTA của hai trang.
2. Gom lại markup card Lớp học theo bốn vùng và cân lại khoảng cách dọc.
3. Đồng bộ trạng thái màu/icon của nút, filter và pagination.
4. Kiểm tra visual regression ở bốn breakpoint, sau đó mới tinh chỉnh màu pastel theo từng danh mục.

## 28. Spec trang Tài liệu

- Header trang Tài liệu dùng cùng thang với Luyện tập và Lớp học: tiêu đề hero cố định 24px (`text-2xl`) trên mobile và desktop, không tăng lên 30–36px theo breakpoint; badge dùng 11–12px, mô tả dùng 12px trên mobile và 14px từ `sm` trở lên.
- Ba nhóm nội dung giữ nguyên ranh giới: **Sách giáo trình**, **Chuyên đề thuật toán** và **Tuyển tập đề thi**. Tab phải dùng icon SVG Lucide có màu chủ đích trong khung 20×20px, không dùng emoji.
- Tab đang chọn dùng xanh thương hiệu `#0066CC`, chữ trắng và icon trắng; tab chưa chọn dùng nền trung tính, chữ `#536D86`, icon pastel theo ngữ cảnh. Mọi tab có `type="button"`, `aria-pressed` và focus ring rõ ràng.
- Metadata trong card dùng icon SVG 14px ở cùng baseline với nhãn: `FileText` cho số trang, `Sparkles` cho điểm nổi bật và `Star` cho đánh giá. Không dùng ký tự emoji hoặc ký hiệu Unicode thay cho icon giao diện.
- Nút đóng modal dùng icon `X` trong vùng bấm tối thiểu 36px và có `aria-label`; xác nhận quyền truy cập dùng icon `CheckCircle2` kèm nội dung, không truyền đạt bằng màu đơn độc.
- Danh sách tài liệu dùng phân trang bên ngoài lưới, 3 card/trang trên desktop và mobile; điều khiển có số trang, trước/sau, `aria-current`, trạng thái disabled và vùng bấm tối thiểu 36px. Đổi tab hoặc từ khóa phải reset về trang 1.
- Tìm kiếm lọc theo tiêu đề, nhãn, điểm nổi bật và tác giả; số card hiển thị, trạng thái rỗng và phân trang phải đồng bộ với kết quả đã lọc.
- Lưới card giữ ảnh bìa là điểm nhìn chính; icon không được tạo thêm mảng màu bão hòa cạnh ảnh. Nền icon ưu tiên tint 8–12%, heading dùng `#123B68`, body `#536D86`, metadata `#71869A`.

## 29. Spec trang Cuộc thi

- Giữ nguyên hệ màu đặc trưng của trang Cuộc thi: xanh dương cho đấu trường, amber cho thời gian/giải thưởng, xanh lá cho trạng thái đang diễn ra, tím cho trạng thái chờ; việc đồng bộ chỉ thay đổi kích thước và nhịp bố cục, không thay palette theo trang Luyện tập.
- Hero dùng cùng thang chữ với các trang trước: tiêu đề 24px trên mọi breakpoint, badge 11px, mô tả 12px mobile và 14px từ `sm`; khối countdown dùng số 20px để không lấn át tiêu đề.
- Thanh tab dùng card bo 16px, padding 12px, nút cao tối thiểu 40px, chữ 11px; trạng thái đang chọn giữ màu xanh hiện có, trạng thái chưa chọn giữ màu trung tính và không tạo thêm surface nặng.
- Danh sách sự kiện dùng lưới 1/2/3 cột responsive, card bán kính 16px, bóng nhẹ và khoảng cách 16px; ảnh cao khoảng 144px, tiêu đề item 14px với font-weight 700, mô tả/metadata 11–12px. Các card trong cùng hàng phải giữ nhịp chiều cao ổn định.
- Mỗi sự kiện phải có ngữ cảnh tổ chức rõ ràng gồm mùa giải/đợt khảo sát và năm, kèm vòng thi hoặc lần thi. Hai nhãn này hiển thị ngay dưới tiêu đề item và lặp lại trong header modal thể lệ; không chỉ suy ra từ tên cuộc thi.
- Danh sách dùng phân trang bên ngoài lưới, 3 sự kiện/trang; có số trang, nút trước/sau tối thiểu 36px, trạng thái disabled và aria-current. Khi đổi tab trạng thái, reset về trang 1; dữ liệu hiển thị và trạng thái rỗng phải tính trên danh sách đã lọc.
- Khối metadata của item gom thành một surface trung tính nhỏ, icon Lucide 14px có màu theo ngữ nghĩa (lịch xanh, thời lượng amber, người tham gia tím); giải thưởng là một dòng nhấn riêng, không kéo card quá cao.
- Footer card dùng đường phân cách nhẹ, liên kết phụ 11px và CTA 11px/cao 40px, giữ màu hiện tại của từng trạng thái; không dùng nút quá rộng hoặc bo góc lớn gây cảm giác cục mịch.
- Modal thể lệ có thể giữ cấu trúc hiện tại; tiêu đề 18px, nội dung 11–12px và nút xác nhận 11px/cao 40px để đồng bộ với card ngoài danh sách.

## 30. Spec trang Bảng xếp hạng

- Trang Bảng xếp hạng dùng ba lớp thị giác: hero tổng quan và vị trí cá nhân, khu vực vinh danh Top 3, sau đó là danh sách xếp hạng chi tiết. Khoảng cách giữa các lớp là 16px, card dùng bán kính 16px và bóng nhẹ.
- Hero giữ hệ xanh dương thương hiệu với nền xanh trung bình có chiều sâu vừa phải, tránh cả nền navy quá tối lẫn nền trắng quá sáng; tiêu đề 24px với font-weight 700–800, badge và chỉ số phụ 11px, mô tả 12px mobile và 14px từ sm. Thẻ vị trí cá nhân dùng avatar thật, thứ hạng, tổng số học viên và điểm hiện tại; không dùng huy hiệu thứ hạng thay cho ảnh người.
- Bộ lọc thời gian/lớp dùng nút phẳng cao tối thiểu 40px, chữ 11–12px, có type button, aria-pressed và trạng thái chọn xanh thương hiệu. Tìm kiếm và tùy chọn ẩn danh nằm cùng hàng điều khiển nhưng không được lấn át nội dung xếp hạng.
- Khu vực Top 3 dùng nền sáng chuyển nhẹ xanh–trắng–amber để giữ cảm giác trang trọng nhưng không nặng thị giác, dùng avatar tròn thật với kích thước 64px cho hạng 2–3 và 80px cho hạng 1. Hạng 1 dùng amber làm điểm nhấn, hạng 2 dùng bạc/xám, hạng 3 dùng vàng đồng; thứ hạng phải có icon hoặc số riêng, không truyền đạt bằng màu đơn độc.
- Danh sách chi tiết dùng bảng trên desktop và vùng cuộn ngang có kiểm soát trên màn hình hẹp. Mỗi hàng cao tối thiểu 64px, avatar 36px, tên học sinh 12–13px font-weight 700, trường 12px, metadata chuỗi luyện tập 11px, số bài AC màu xanh lá và tổng điểm căn phải.
- Dữ liệu avatar phải trỏ tới asset ảnh đại diện hoặc ảnh chân dung; các asset huy hiệu như rank-1.png chỉ dùng cho thứ hạng, không dùng trong thẻ avatar. Ảnh avatar luôn có alt mô tả và dùng object-cover trong khung tròn.
- Khi bật ẩn danh, thay tên bằng nhãn “Học viên đã xác thực” nhưng vẫn giữ avatar, điểm và thành tích. Khi tìm kiếm không có kết quả, hiển thị trạng thái rỗng ngay trong bảng mà không làm vỡ chiều cao bố cục.

## 31. Spec trang Giáo viên & Chuyên gia

- Hero trang Giáo viên & Chuyên gia dùng tiêu đề 24px, font-weight 700–800, badge 11px, mô tả 12px trên mobile và 14px từ sm; card hero bán kính 16px, padding 20–24px và khoảng cách nội dung 16px.
- Danh sách hồ sơ dùng lưới 1/2/3 cột responsive, khoảng cách 16px; mỗi card bán kính 16px, padding 16px, bóng nhẹ và chiều cao ổn định. Avatar thật đặt trong khung 56px, bo góc 12px, không dùng icon thay cho ảnh đại diện.
- Tên giáo viên dùng 14px, font-weight 700, tiêu đề chuyên môn 11px, đơn vị công tác 11px, giới thiệu 12px với line-height tối thiểu 1.5. Danh sách thành tích dùng nền trung tính/tint nhẹ, icon Lucide 14px và chữ 11px.
- CTA hồ sơ dùng màu xanh teal đơn, chữ 11px, chiều cao tối thiểu 40px, không dùng gradient hoặc nút quá lớn. Tất cả nút điều khiển có type button và vùng focus rõ ràng.
- Danh sách hồ sơ dùng phân trang bên ngoài lưới, 3 hồ sơ/trang; có số trang, nút trước/sau tối thiểu 36px, trạng thái disabled và aria-current. Dữ liệu mẫu hoặc dữ liệu thật phải giữ phân trang hoạt động khi có nhiều hơn 3 hồ sơ.
- Modal hồ sơ giữ nội dung xác thực, dùng tiêu đề 18–20px, nội dung 11–12px và CTA 11px/cao 40px; avatar trong modal được giữ tỷ lệ, không kéo giãn.

## 32. Spec trang Thông tin

- Hero trang Thông tin dùng tiêu đề 24px, font-weight 700–800, badge 11px, mô tả 12px trên mobile và 14px từ sm; card hero bán kính 16px, padding 20–24px và hình nền chỉ tạo lớp minh họa nhẹ.
- Hai khối FAQ và Hỗ trợ kỹ thuật dùng lưới 1/2 cột responsive, khoảng cách 16px, card bán kính 16px, padding 16px và bóng nhẹ. Tiêu đề khối dùng 14px, mô tả phụ 11px.
- Câu hỏi FAQ dùng nút cao tối thiểu 48px, chữ 12px font-weight 700, có type button và aria-expanded; icon Lucide 16px không làm thay đổi chiều cao hàng. Nội dung trả lời dùng 12px, line-height tối thiểu 1.5 và nền tint rất nhẹ.
- Form hỗ trợ dùng label 11px, input và textarea chữ 12px, chiều cao input 40px, viền rõ khi focus và nền xanh xám rất nhạt. CTA dùng màu teal đơn, chữ 11px, cao tối thiểu 40px, không dùng gradient.
- Trạng thái gửi thành công dùng icon Lucide 40px, tiêu đề 14px và mô tả 12px; trạng thái phải được truyền đạt bằng icon và nội dung, không chỉ bằng màu.

## 33. Spec phòng làm bài đa dạng câu hỏi

- Phòng làm bài mặc định dùng một nền xanh than thống nhất cho toàn bộ khung nội dung; khi người dùng chuyển sáng, workspace dùng `#F8FAFB` và vùng thao tác dùng `#FFFFFF`. Không chia đôi giao diện bằng một panel trắng và một panel đen; lớp tối chỉ được dùng cho overlay ngoài modal.
- Trong cùng một theme, khu vực đọc đề và khu vực nộp bài vẫn dùng hai surface khác nhau để định hướng thị giác: đề trung tính xanh xám, khu vực nộp bài teal/xanh than dịu. Chênh lệch nền phải vừa đủ, không tạo đường cắt trắng–đen gắt.
- Loại câu hỏi là tham số bắt buộc của phiên làm bài, tối thiểu gồm `programming`, `single_choice`, `multiple_choice` và `fill_answer`. Header phải hiển thị nhãn loại câu hỏi cùng icon hoặc màu tint nhẹ để người học nhận biết ngay.
- `programming` chỉ hiển thị trình soạn thảo mã, chọn C++14/C++17/Python 3, chạy thử và kết quả theo test. Editor dùng kiểu chữ monospace và bám theo theme đang chọn, nhưng phải giữ viền/focus rõ; không dùng một editor code cho câu trắc nghiệm hoặc điền đáp án.
- `Chạy test` là một nút gọn trong thanh công cụ editor; form cấu hình và vùng thông báo lỗi/kết quả mở trong modal riêng, không chiếm chiều cao trình soạn thảo. Modal phải cho phép chọn nhanh bộ test mẫu theo nhóm cơ bản/phần tử trùng/biên và có lựa chọn `Tự nhập dữ liệu`; khi đổi bộ test, input và expected output phải được nạp lại tương ứng, còn test tự nhập phải cho phép sửa cả hai.
- Test runner phải có hai chế độ I/O độc lập: `stdin / stdout` cho đọc/ghi màn hình chuẩn và `File` cho đọc/ghi qua file. Ở chế độ file, người dùng được đặt tên file input/output; kết quả phải hiển thị rõ nguồn input và đích output, không trộn với luồng nộp bài chính thức.
- Kết quả `Chạy test` là một vùng xem kết quả riêng, có nhãn bộ test và cách I/O. Khi chưa có expected output của test tự nhập, chỉ thông báo đã chạy thử cấu hình I/O, không kết luận đúng/sai.
- Code editor phải có syntax highlighting tối thiểu cho preprocessor/comment, keyword, string, number và function; mỗi nhóm có màu trầm, font-weight hoặc font-style riêng, chữ thường có màu nền rõ ràng, đồng thời bảo đảm tương phản ở cả theme sáng và tối.
- `single_choice` dùng radio; `multiple_choice` dùng checkbox. Mỗi lựa chọn là một hàng cao tối thiểu 44px, có trạng thái chọn bằng viền/nền tint xanh và icon/điều khiển rõ ràng, không dùng màu gắt làm điểm nhấn duy nhất.
- `fill_answer` dùng một input đáp án nổi bật vừa phải, có hướng dẫn định dạng và trạng thái focus rõ. Không kéo dài trường nhập hoặc nút trả lời quá mức cần thiết.
- Đề và hướng dẫn giải hiển thị theo PDF chuẩn nếu có URL; khu vực PDF có nhãn “Đề chuẩn PDF”, nút “Xem hướng dẫn” và trạng thái đã mở/chưa mở. Khi chưa có PDF thật, phải hiển thị trạng thái dữ liệu mẫu rõ ràng, không giả vờ là nội dung chính thức.
- Phiên làm bài phải ghi nhận trạng thái PDF, việc đã mở hướng dẫn và tín hiệu rời màn hình. Dữ liệu này đi cùng lần nộp bài, nhưng không được trình bày bằng nền cảnh báo lớn làm lấn át câu hỏi.
- Không dùng thanh trạng thái ngang riêng dưới header cho các thông tin phiên. Thay vào đó, tab `Nhật ký làm bài` là nơi tập trung toàn bộ sự kiện của phiên: bắt đầu/chuyển bài, mở hướng dẫn, rời/quay lại màn hình, chọn/chạy test, nộp bài và kết quả chấm. Mỗi sự kiện có icon, thời gian, tiêu đề và mô tả; sự kiện lỗi phải có màu cảnh báo dịu và nội dung giải thích.
- Mọi thao tác nộp bài, gồm nộp OJ và nộp đáp án thường, phải mở modal kết quả sau khi chấm xong. Modal hiển thị điểm, verdict, thời gian/bộ nhớ, ngôn ngữ và danh sách từng test với trạng thái đúng/sai rõ ràng; trong khu vực làm bài vẫn giữ một thẻ điểm thu gọn kèm số test đúng/sai và nút `Xem chi tiết`.
- Mỗi item test sai trong modal kết quả phải có nút icon `Tải test này`; nút chỉ tải đúng một test đang chọn, gồm mã test, input, expected output, actual output và thông tin thời gian/bộ nhớ. Không dùng nút tải hàng loạt ở footer modal; test đúng không hiển thị nút tải.
- Nếu có `statementPdf`, PDF là nguồn hiển thị đề mặc định và mô tả LaTeX không lặp lại bên dưới. Khi chưa có PDF, hiển thị mô tả LaTeX thay thế với nhãn rõ ràng để phân biệt dữ liệu chính thức và dữ liệu fallback.
- Khi mở bài từ danh sách luyện tập, phòng làm bài giữ chuỗi bài theo bộ lọc hiện tại và hiển thị nút `Bài tiếp` nếu còn bài kế tiếp; chuyển bài không cần quay lại danh sách và phải reset đáp án/kết quả phiên của bài trước.
- Nút chính dùng màu thương hiệu đơn, cao tối thiểu 40px, chữ 11–12px; nút theo ngữ cảnh dùng xanh teal, amber hoặc xanh lá. Không dùng gradient, shadow nặng hoặc nút quá lớn khiến khu vực trả lời trở nên cục mịch.
- Trên màn hình từ `lg`, ranh giới giữa khu vực đề và khu vực làm bài là một divider có thể kéo ngang; tỷ lệ cho phép trong khoảng 32–68% để cả hai bên vẫn dùng được. Divider có vùng bắt chuột rộng tối thiểu 12px, cursor `col-resize`, focus ring và hỗ trợ phím mũi tên/Home/End; dưới `lg` không hiển thị divider vì hai khu vực xếp dọc.

## 34. Spec chuyển giao diện sáng/tối

- Trong phòng làm bài, giao diện tối là mặc định để giảm chói và hỗ trợ người dùng làm bài liên tục. Nút chuyển theme chỉ đặt trong header của phòng làm bài, dùng icon `Moon` khi đang sáng và `Sun` khi đang tối, vùng bấm tối thiểu 32px, có `aria-label`, `aria-pressed` và tooltip.
- Theme tối chỉ áp dụng trong phòng làm bài bằng token/surface chung; không cho phép một panel tự đổi sang nền đen trong khi khu vực còn lại vẫn trắng. Khi đóng phòng làm bài, các trang chính trở lại giao diện sáng.
- Theme tối dùng nền xanh than dịu, chữ sáng xanh xám, viền xanh xám và tint trạng thái giảm bão hòa. Nút hành động teal/amber/xanh lá vẫn được giữ màu nhận diện nhưng không dùng gradient hoặc shadow mạnh.
- Lựa chọn theme được lưu theo thiết bị và khôi phục ở lần truy cập sau. Việc chuyển theme không làm mất dữ liệu form, trạng thái câu hỏi, phiên làm bài hoặc modal đang mở.
- Dark mode phải bảo đảm độ tương phản của heading, body, metadata, input, focus ring và trạng thái lỗi/thành công; màu không phải là phương tiện duy nhất để truyền đạt trạng thái.

## 35. Spec điều hướng đa thiết bị

- Trên màn hình dưới `lg`, header phải có nút menu rõ ràng với icon `Menu`, vùng bấm tối thiểu 36px, `aria-expanded` và nhãn “Mở menu điều hướng”. Khi mở, menu hiển thị toàn bộ trang chính trong lưới 2 cột trên mobile nhỏ và 4 cột từ `sm`.
- Mục đang mở dùng nền tint xanh và chữ xanh thương hiệu; mục còn lại dùng surface trung tính. Mỗi mục có icon Lucide và vùng bấm tối thiểu 44px để thao tác bằng ngón tay.
- Menu mobile đặt ngay dưới header, có nền, viền và shadow riêng để không bị lẫn vào nội dung. Sau khi chọn trang, menu tự đóng; nút chuyển thành `X` và nhãn accessibility đổi thành “Đóng menu điều hướng”.
- Không hiển thị đồng thời một menu mobile đầy đủ ở header và một menu đầy đủ khác ở đáy màn hình. Nếu có thanh đáy, chỉ dùng cho tối đa 3 lối tắt thật sự quan trọng.
- Trên màn hình `lg` trở lên, giữ menu ngang hiện có; các breakpoint phải tránh tràn ngang logo, tiện ích header và menu điều hướng.

## 36. Spec modal chi tiết lớp học

- Modal chi tiết lớp học dùng khung sáng `#F8FAFB`, bán kính 16–24px, viền xanh xám mảnh và shadow vừa phải. Header dùng nền trắng với một dải teal mảnh làm điểm nhấn, tránh gradient đậm chiếm toàn bộ vùng đầu modal.
- Header hiển thị ảnh lớp, tên lớp, mã lớp, giáo viên, đánh giá xác thực và trạng thái “Đang học” theo thứ tự ưu tiên rõ ràng. Nút đóng có vùng bấm tối thiểu 36px, `aria-label` và focus ring.
- Tab đặt trong thanh riêng có thể cuộn ngang trên mobile. Tab đang chọn dùng teal đơn và chữ trắng; tab chưa chọn dùng chữ slate trên nền trong, không dùng nhiều màu cạnh tranh.
- Tổng quan dùng ba thẻ chỉ số với icon Lucide 20px, tint màu nhẹ và nhãn 10px; không dùng emoji làm icon giao diện. Khối tiến độ có một CTA ngắn, cao tối thiểu 40px.
- Danh sách lộ trình phân nhóm theo chương; mỗi bài hiển thị mã bài, loại câu hỏi, trạng thái mở/đã đạt/chưa mở và hành động tương ứng. Item dùng padding vừa phải, không kéo cao hoặc dùng nút quá lớn.
- Trên mobile, nội dung modal được cuộn độc lập, footer giữ CTA trong vùng nhìn thấy và các hàng lịch học/tài liệu có thể co giãn mà không gây tràn ngang.
