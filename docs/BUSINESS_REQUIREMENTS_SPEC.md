# Ôn Thi 360 — Đặc tả nghiệp vụ sản phẩm

> Phiên bản: 1.0  
> Ngày: 2026-09-11  
> Phạm vi: các luồng và dữ liệu đang được mô phỏng trong ứng dụng frontend tại thời điểm lập spec.

## 1. Mục đích và nguyên tắc

Tài liệu này mô tả các nghiệp vụ cốt lõi của Ôn Thi 360 dựa trên dữ liệu, nhãn trạng thái, điều hướng và hành vi đang có trong mã nguồn. Đây là nguồn tham chiếu để tiếp tục thiết kế API, cơ sở dữ liệu, phân quyền, kiểm thử và hoàn thiện giao diện.

Nguyên tắc đọc tài liệu:

- Mục “Hiện trạng” phản ánh những gì frontend đang hiển thị hoặc mô phỏng.
- Mục “Quy tắc nghiệp vụ” là hành vi cần được thống nhất khi triển khai thật.
- Các con số, tên người, lớp, đề và mã trong tài liệu là dữ liệu mẫu hiện có, không phải số liệu production.
- Nếu frontend đang xử lý bằng state hoặc timeout, backend cần thay thế bằng dữ liệu và trạng thái có nguồn gốc rõ ràng.

## 2. Nguồn căn cứ dữ liệu

| Nhóm | Nguồn chính | Dữ liệu nghiệp vụ quan sát được |
|---|---|---|
| Điều hướng và phiên người dùng | src/App.jsx, src/components/Header.jsx | Nav công khai, vai trò, workspace, modal truy cập |
| Đăng nhập và quyền | src/components/AccessCenterModal.jsx, ActivationModal.jsx | Đăng nhập, đăng ký, xác minh, khôi phục mật khẩu, mã kích hoạt, quyền học/dạy, checkout |
| Trang chủ | src/components/HomePage.jsx | Mục tiêu học tập, lớp, tiến độ, xếp hạng, tài liệu, cuộc thi |
| Lớp học | src/components/CoursesPage.jsx, ClassDetailModal.jsx | Danh mục lớp, thông tin khóa học, giảng viên, học phí, đăng ký, chi tiết lớp |
| Luyện tập | src/components/PracticePage.jsx, CodeWorkspaceModal.jsx | Bài lẻ, đề thi, lọc, phân trang, trạng thái bài, nộp code |
| Tài liệu | src/components/MaterialsPage.jsx | Sách, chuyên đề, tuyển tập đề, quyền truy cập, giá mềm/bản in |
| Cuộc thi | src/components/ContestsPage.jsx | Sự kiện, mùa giải, vòng/lần thi, thời gian, trạng thái, thể lệ, đăng ký |
| Bảng xếp hạng | src/components/LeaderboardPage.jsx | Phạm vi xếp hạng, Top 3, điểm, AC, chuỗi ngày, tìm kiếm, ẩn danh |
| Giáo viên/chuyên gia | src/components/TeachersPage.jsx | Hồ sơ, thành tích, đánh giá, học viên, lớp phụ trách |
| Thông tin và hỗ trợ | src/components/InfoPage.jsx | FAQ, gửi yêu cầu hỗ trợ, trạng thái gửi |
| Không gian theo vai trò | src/components/RoleWorkspace.jsx, CompletenessPanels.jsx | Học sinh, giáo viên, phụ huynh, quản trị viên và các tác vụ tương ứng |

## 3. Mục tiêu sản phẩm

1. Cung cấp một không gian học Tin học có lộ trình, bài luyện, đề thi và học liệu bản quyền.
2. Kết nối học sinh với lớp học, giáo viên và chuyên gia.
3. Cho phép giáo viên quản lý lớp, học liệu, câu hỏi, đề và kết quả học sinh.
4. Cho phép phụ huynh theo dõi con sau khi có liên kết được xác minh.
5. Tổ chức cuộc thi, lưu kết quả và vinh danh thành tích.
6. Hỗ trợ mô hình quyền học cá nhân và quyền dùng để dạy.
7. Duy trì dữ liệu có thể kiểm tra, có lịch sử thao tác và bảo vệ thông tin học sinh.

## 4. Vai trò và phạm vi quyền

| Vai trò | Mục tiêu | Quyền công khai | Quyền trong workspace |
|---|---|---|---|
| Khách vãng lai | Khám phá sản phẩm | Xem trang chủ, lớp học, luyện tập, tài liệu, cuộc thi, BXH, giáo viên, thông tin | Không có quyền vận hành; nội dung khóa yêu cầu đăng nhập/quyền |
| Học sinh | Học và luyện thi | Như khách, cộng thêm thao tác đăng nhập | Xem tổng quan, khóa học của tôi, luyện tập, tài liệu của tôi, đánh giá, kết quả, thông báo, hồ sơ |
| Giáo viên đã duyệt | Dạy học và theo dõi lớp | Xem nội dung công khai | Quản lý lớp, học liệu lớp, kho câu hỏi, bài tập & đề, giao đề, lịch, kết quả, đánh giá |
| Phụ huynh | Theo dõi con | Xem nội dung công khai | Xem hồ sơ liên kết, lịch/điểm danh, kết quả/tiến độ, đánh giá lớp |
| Quản trị viên | Vận hành hệ thống | Có thể xem toàn bộ nội dung | Quản lý người dùng, nội dung, khóa/lớp, sản phẩm/quyền, đơn hàng, mã kích hoạt, đánh giá, cuộc thi/BXH, audit log, báo cáo |

Quy tắc:

- Một tài khoản có một vai trò hoạt động tại một thời điểm trong phiên hiện tại.
- Vai trò giáo viên phải có trạng thái đã duyệt trước khi được dùng nghiệp vụ dạy.
- Quyền truy cập nội dung và vai trò tài khoản là hai khái niệm riêng.
- Việc chuyển vai trò trong frontend hiện là mô phỏng; khi triển khai thật phải có kiểm tra quyền phía server.

## 5. Từ điển khái niệm

| Khái niệm | Ý nghĩa |
|---|---|
| Quyền học cá nhân | Quyền một người học dùng để đọc, làm bài và xem nội dung được cấp |
| Quyền dùng để dạy | Quyền giáo viên sử dụng học liệu cho mọi lớp phụ trách theo thời hạn |
| Lớp học | Nhóm học viên gắn với giáo viên, lịch học, nội dung và kết quả |
| Bài tập chuyên đề | Một bài độc lập để rèn một kỹ thuật hoặc chủ đề |
| Đề thi luyện tập | Một phiên làm bài gồm nhiều bài, thời lượng và điểm tổng hợp |
| Cuộc thi | Sự kiện có thời gian, trạng thái, thể lệ, người tham gia và kết quả |
| Vòng/lần thi | Định danh phiên tổ chức trong một mùa giải, năm hoặc đợt khảo sát |
| AC | Bài được hệ thống chấm đạt |
| Chuỗi luyện tập | Số ngày liên tục có hoạt động hợp lệ |
| Hồ sơ xác thực | Hồ sơ người dùng/giáo viên đã qua bước xác minh cần thiết |
| Mã kích hoạt | Mã mở quyền học hoặc quyền dùng để dạy |
| Audit log | Lịch sử thao tác quan trọng phục vụ truy vết |

## 6. Nghiệp vụ tài khoản và truy cập

### 6.1. Đăng nhập

Đầu vào:

- Email hoặc số điện thoại.
- Mật khẩu.
- Phương thức đăng nhập do giao diện cung cấp.

Kết quả thành công:

- Tạo phiên đăng nhập.
- Xác định vai trò và hồ sơ người dùng.
- Điều hướng vào không gian phù hợp hoặc quay lại nội dung đang xem.
- Hiển thị tên, avatar và vai trò ở Header.

Kết quả thất bại:

- Không tiết lộ tài khoản có tồn tại hay không.
- Hiển thị lỗi ở trường liên quan.
- Cho phép thử lại hoặc chuyển sang khôi phục mật khẩu.

### 6.2. Đăng ký

Các vai trò đăng ký hiện có:

- Học sinh: theo lộ trình, luyện tập và lưu kết quả.
- Phụ huynh: theo dõi con sau khi xác minh liên kết.
- Giáo viên: tạo hồ sơ giảng dạy và gửi yêu cầu phê duyệt.

Luồng:

1. Nhập họ tên, thông tin liên hệ và mật khẩu.
2. Đồng ý điều khoản và chính sách.
3. Nhận mã xác minh 6 chữ số.
4. Xác minh.
5. Chọn vai trò.
6. Hoàn tất tài khoản.

Quy tắc:

- Không kích hoạt quyền dạy chỉ bằng việc chọn vai trò giáo viên.
- Hồ sơ giáo viên phải đi qua phê duyệt.
- Mã xác minh có thời hạn, chỉ dùng một lần và không hiển thị lại trong log công khai.

### 6.3. Khôi phục mật khẩu

1. Người dùng nhập email hoặc số điện thoại.
2. Hệ thống gửi hướng dẫn nếu thông tin hợp lệ.
3. Liên kết khôi phục có thời hạn.
4. Người dùng đặt mật khẩu mới.
5. Phiên cũ có thể bị thu hồi theo chính sách bảo mật.

### 6.4. Kích hoạt mã và mua quyền

Hai loại quyền được mô phỏng:

- Quyền học cá nhân.
- Quyền dùng để dạy cho mọi lớp phụ trách.

Kích hoạt mã:

1. Nhập mã.
2. Chuẩn hóa mã thành chữ in hoa.
3. Kiểm tra tính hợp lệ, sản phẩm, phạm vi và thời hạn.
4. Ghi nhận quyền vào tài khoản.
5. Hiển thị sản phẩm, loại quyền, ngày hết hạn và mã đã dùng một phần.

Mua quyền:

1. Chọn phạm vi học cá nhân hoặc dùng để dạy.
2. Tạo đơn hàng.
3. Chọn VNPAY hoặc chuyển khoản.
4. Chờ trạng thái thanh toán.
5. Chỉ cấp quyền sau khi thanh toán được xác nhận.

Quy tắc:

- Mã đã dùng không được kích hoạt lại.
- Quyền học cá nhân không tự chuyển thành quyền dạy và ngược lại.
- Giá, thời hạn, sản phẩm và quyền cấp phải được lưu tại thời điểm tạo đơn.
- Giáo viên chỉ được dùng quyền dạy trong các lớp được phân công hoặc thuộc phạm vi tài khoản.

## 7. Nghiệp vụ danh mục công khai

### 7.1. Điều hướng

Các mục công khai hiện có:

- Trang chủ
- Lớp học
- Luyện tập
- Tài liệu
- Cuộc thi
- Bảng xếp hạng
- Giáo viên & chuyên gia
- Thông tin

Quy tắc:

- Điều hướng phải giữ trạng thái URL hoặc route tương ứng khi chuyển từ mock frontend sang backend.
- Khi mở một trang, cuộn về đầu trang.
- Nội dung khóa phải chuyển tới luồng đăng nhập, kích hoạt hoặc mua quyền.

### 7.2. Lớp học và khóa học

Danh mục lớp hiện có:

- Tất cả lớp học
- Chuyên Tin 10
- HSG Quốc gia
- C++ & Python cơ bản
- Tốt nghiệp THPT 12
- Thuật toán quốc tế

Mỗi khóa/lớp cần có:

- ID ổn định.
- Tên, danh mục, mô tả.
- Giảng viên/chuyên gia.
- Hình minh họa.
- Học phí và loại quyền.
- Số học viên hoặc giới hạn.
- Trạng thái mở/đóng.
- Lịch học hoặc thời lượng.
- Điều kiện truy cập.

Luồng đăng ký:

1. Người dùng xem card hoặc chi tiết.
2. Hệ thống kiểm tra quyền và trạng thái mở.
3. Nếu chưa có quyền, hiển thị kích hoạt hoặc mua quyền.
4. Nếu đủ điều kiện, tạo đăng ký lớp.
5. Cập nhật danh sách “Khóa học của tôi” hoặc lớp liên quan.

### 7.3. Tài liệu

Ba nhóm nội dung:

- Sách giáo trình.
- Chuyên đề thuật toán.
- Tuyển tập đề thi.

Dữ liệu mẫu hiện có gồm 4 sách, 2 chuyên đề và 2 tuyển tập đề. Mỗi tài liệu có:

- ID, tiêu đề, nhãn đối tượng.
- Số trang hoặc số đề.
- Điểm nổi bật.
- Tác giả.
- Đánh giá và số lượt review.
- Giá bản mềm, có thể có giá bản in.
- Hình bìa.
- Phạm vi quyền.

Quy tắc:

- Tìm kiếm theo tiêu đề, nhãn, điểm nổi bật và tác giả.
- Đổi tab hoặc từ khóa reset về trang 1.
- Mặc định hiển thị 3 item/trang theo cấu hình hiện tại.
- Tài liệu chưa có quyền phải hiển thị trạng thái khóa và CTA mua/kích hoạt.
- Review chỉ được gửi khi tài khoản đáp ứng điều kiện trải nghiệm.

## 8. Nghiệp vụ luyện tập

### 8.1. Chế độ bài tập chuyên đề

Tab nghiệp vụ:

- Tất cả bài tập.
- Theo lớp học.
- Bài được giao.
- Lịch sử nộp bài.

Bộ lọc:

- Chuyên đề: Quy hoạch động, Đồ thị, Cấu trúc dữ liệu, Toán học & Số học, Tham lam & Hai con trỏ, Xử lý Xâu.
- Độ khó: Dễ, Trung bình, Khó, Cực khó.
- Từ khóa theo mã hoặc tiêu đề.

Trạng thái bài:

- AC: đã chấm đạt.
- Đang làm: có tiến độ hoặc lượt làm đang dang dở.
- Chưa nộp: chưa có lần nộp hợp lệ.
- Khóa: chưa đủ quyền hoặc điều kiện truy cập.

Quy tắc:

- Một bài có mã duy nhất, chủ đề, độ khó, điểm, giới hạn thời gian và bộ test.
- Tab và bộ lọc phải lọc dữ liệu thật, không chỉ đổi màu.
- Phân trang hiện tại là 5 bài/trang.
- Đổi tab, chuyên đề, độ khó, từ khóa hoặc chế độ phải reset về trang 1.
- Hàng bài phải hiển thị trạng thái bằng cả icon và nhãn.

### 8.2. Nộp bài và chấm Online Judge

Luồng:

1. Người học mở bài.
2. Chọn ngôn ngữ và viết mã nguồn.
3. Gửi lần nộp.
4. Hệ thống tạo submission.
5. Biên dịch và chạy qua test.
6. Trả trạng thái, điểm, thời gian, bộ nhớ và lỗi nếu có.
7. Cập nhật lịch sử, AC rate và tiến độ.

Trạng thái đề xuất:

- queued
- compiling
- judging
- accepted
- wrong_answer
- time_limit
- memory_limit
- runtime_error
- compile_error
- system_error

Quy tắc:

- Lịch sử submission là dữ liệu riêng, không ghi đè lần nộp cũ.
- Không công bố test ẩn và lời giải trước thời điểm được phép.
- Điểm và AC chỉ cập nhật sau khi submission có kết quả cuối cùng.
- Cần lưu thời gian, ngôn ngữ, mã nguồn hoặc hash mã nguồn theo chính sách bảo mật.

### 8.3. Chế độ đề thi luyện tập

Dữ liệu mẫu hiện có 6 đề, gồm:

- HSG Quốc gia.
- Chuyên Tin 10.
- Olympic quốc tế.

Mỗi đề có:

- ID, tiêu đề, mô tả.
- Loại đề.
- Thời lượng.
- Số bài.
- Lượt làm.
- Trạng thái.
- Tiến độ cá nhân.
- Điểm gần nhất.
- Hình minh họa.

Trạng thái:

- Đang mở.
- Đang làm dở.
- Đã hoàn thành.

Quy tắc:

- Phân trang hiện tại là 4 đề/trang.
- Đổi loại đề, từ khóa hoặc chế độ phải reset về trang 1.
- Một đề có thể có nhiều lần làm, nhưng chỉ lần được chọn theo quy tắc mới được tính là kết quả gần nhất hoặc kết quả tốt nhất.
- Khi hết thời lượng, hệ thống tự khóa submit và chốt kết quả.
- Đề thi phải lưu thời điểm bắt đầu, thời điểm kết thúc và các lần submit liên quan.

## 9. Nghiệp vụ cuộc thi

Dữ liệu mẫu hiện có 5 sự kiện:

- Kỳ thi HSG Tin học cấp tỉnh mở rộng năm học 2025–2026.
- Cuộc thi Lập trình Online Ôn Thi 360 lần thứ 3.
- Khảo sát năng lực Thuật toán & Tư duy lập trình THCS.
- Kỳ thi thử Chuyên đề Đồ thị tháng 9.
- Mini Contest Cấu trúc dữ liệu tháng 8.

Mỗi sự kiện phải có:

- ID duy nhất.
- Tên và loại: contest hoặc survey.
- Mùa giải/đợt khảo sát và năm.
- Vòng thi hoặc lần thi.
- Thời gian bắt đầu/kết thúc.
- Thời lượng.
- Số bài.
- Số người đăng ký.
- Giải thưởng.
- Hình minh họa.
- Trạng thái.

Trạng thái hiện có:

- Đang diễn ra.
- Sắp diễn ra.
- Đang mở khảo sát.
- Chờ công bố kết quả.
- Đã công bố.

Luồng cuộc thi:

1. Người dùng xem danh sách và lọc theo trạng thái/loại.
2. Mở thể lệ và thông tin chấm điểm.
3. Đăng ký nếu sự kiện cho phép.
4. Đến thời điểm mở, hệ thống cấp quyền vào phòng thi.
5. Làm bài và gửi bài trong thời lượng.
6. Chốt bài khi hết giờ hoặc người dùng nộp cuối.
7. Hiển thị bảng điểm tạm thời nếu được phép.
8. Ban tổ chức kiểm tra, đối soát và công bố kết quả.
9. Cấp huy hiệu, chứng nhận hoặc giải thưởng theo quy chế.

Quy tắc:

- Không dùng tên sự kiện để suy ra vòng/lần thi; hai trường này phải được lưu riêng.
- Không cho đăng ký sau thời điểm đóng đăng ký.
- Kết quả “chờ công bố” không được coi là kết quả chính thức.
- Mỗi tài khoản chỉ có một lượt thi chính thức nếu thể lệ quy định như dữ liệu mô phỏng hiện tại.
- Phân trang hiện tại là 3 sự kiện/trang; đổi tab reset về trang 1.

## 10. Nghiệp vụ bảng xếp hạng

Phạm vi xếp hạng hiện có:

- Toàn thời gian.
- Tháng này.
- Cuộc thi gần nhất.
- Lớp của tôi.

Dữ liệu thành tích gồm:

- Điểm tổng.
- Số bài AC.
- Chuỗi ngày.
- Trường.
- Avatar.
- Hạng.

Quy tắc tính điểm cần chốt khi triển khai backend:

- Điểm bài AC: theo điểm bài và/hoặc mức độ khó.
- Điểm cuộc thi: theo thứ hạng, điểm và quy chế từng cuộc.
- Chuỗi luyện tập: chỉ tính ngày có hoạt động hợp lệ.
- Cuộc thi đã hủy hoặc kết quả chưa công bố không được tính vào BXH chính thức.
- Thứ hạng phải có quy tắc phá hòa ổn định, ví dụ điểm cao hơn, AC nhiều hơn, thời điểm đạt điểm sớm hơn.

Quyền riêng tư:

- Bật ẩn danh thay tên hiển thị bằng “Học viên đã xác thực”.
- Vẫn giữ avatar, điểm và thành tích khi ẩn danh, trừ khi chính sách yêu cầu ẩn thêm.
- Không hiển thị thông tin nhạy cảm như email, số điện thoại hoặc ngày sinh.

## 11. Nghiệp vụ giáo viên và chuyên gia

Hồ sơ cần có:

- ID, tên, vai trò chuyên môn.
- Đơn vị công tác.
- Avatar.
- Tiểu sử.
- Thành tích.
- Điểm đánh giá.
- Số học viên.
- Số lớp/chương trình.

Dữ liệu mẫu hiện có 5 hồ sơ để hiển thị 3 hồ sơ/trang.

Luồng hồ sơ:

1. Người dùng xem danh sách.
2. Mở hồ sơ chi tiết.
3. Xem giới thiệu, thành tích, đánh giá và lớp phụ trách.
4. Chuyển tới danh sách lớp/khóa học nếu có CTA.

Quy tắc:

- Giáo viên chỉ được gắn nhãn đã duyệt sau khi hồ sơ được phê duyệt.
- Thành tích và đánh giá phải có nguồn hoặc trạng thái kiểm duyệt.
- Avatar phải là ảnh đại diện, không dùng badge thứ hạng làm avatar.
- Phân trang hiện tại là 3 hồ sơ/trang.

## 12. Nghiệp vụ không gian học sinh

Các tác vụ hiện có:

- Tổng quan.
- Khóa học của tôi.
- Luyện tập.
- Tài liệu của tôi.
- Đánh giá của tôi.
- Kết quả.
- Thông báo.
- Hồ sơ.

Dữ liệu tổng quan cần có:

- Mục tiêu/lớp hiện tại.
- Tiến độ học.
- Bài đã hoàn thành.
- Điểm và lịch sử nộp.
- Quyền truy cập.
- Thông báo mới.

Quy tắc:

- Chỉ hiển thị nội dung thuộc quyền của học sinh.
- Kết quả phải gắn với lớp, đề, bài và lần nộp.
- Đánh giá chỉ mở khi đủ điều kiện trải nghiệm.
- Học sinh có thể xem lịch sử của mình nhưng không xem dữ liệu riêng của học sinh khác.

## 13. Nghiệp vụ giáo viên

Các tác vụ hiện có:

### 13.1. Quản lý lớp

- Xem lớp HSG Tin 10A1.
- Sĩ số mẫu 36 học viên.
- Tiến độ tuần mẫu 86%.
- Xem thành viên.
- Điểm danh.
- Theo dõi tiến độ.
- Gửi thông báo.
- Xuất báo cáo.
- Giao đề.

Quy tắc:

- Giáo viên chỉ xem lớp được phân công.
- Điểm danh có các trạng thái có mặt, vắng có phép, chưa điểm danh.
- Thay đổi trạng thái phải lưu người thao tác và thời điểm.
- Thông báo phải có người gửi, lớp nhận, nội dung và trạng thái gửi.

### 13.2. Học liệu lớp và quyền dạy

- Xem quyền dạy và ngày hết hạn.
- Gắn/gỡ học liệu khỏi lớp.
- Học liệu dùng trong lớp không tự cấp quyền học cá nhân cho từng người.
- Gỡ học liệu không xóa lịch sử học tập hoặc kết quả đã phát sinh.

### 13.3. Kho câu hỏi

- Tạo câu hỏi.
- Sửa câu hỏi.
- Quản lý version.
- Trạng thái bản nháp, chờ duyệt, đã phát hành.
- Tách kho cá nhân khỏi kho chung.

Quy tắc:

- Câu hỏi đã phát hành không sửa trực tiếp làm thay đổi dữ liệu lịch sử; phải tạo version mới.
- Mỗi version cần người tạo, thời điểm, nội dung và trạng thái duyệt.

### 13.4. Tạo và giao đề

- Chọn câu hỏi.
- Cấu hình thời lượng.
- Cấu hình thời gian mở/đóng.
- Chọn lớp nhận.
- Lưu bản nháp hoặc lên lịch giao.
- Theo dõi trạng thái chờ mở, đang mở, đã đóng.

Quy tắc:

- Không phát hành đề khi thiếu câu hỏi, thời lượng hoặc quy tắc chấm.
- Không cho sửa cấu hình ảnh hưởng kết quả sau khi đã có học sinh nộp, trừ khi tạo phiên bản điều chỉnh có log.
- Một đề giao cho lớp phải có lịch sử phát hành.

### 13.5. Kết quả và báo cáo

Phễu dữ liệu:

Lớp → Đề → Học sinh → Lần nộp.

Mỗi dòng kết quả cần có:

- Học sinh.
- Lần nộp.
- Điểm.
- Trạng thái chấm.
- Thời gian.
- Có thể truy ngược về submission.

## 14. Nghiệp vụ phụ huynh

Liên kết học sinh:

1. Phụ huynh nhập mã liên kết và ngày sinh.
2. Yêu cầu được tạo với trạng thái chờ xác minh.
3. Học sinh hoặc nhà trường xác nhận.
4. Khi được duyệt, phụ huynh xem được dữ liệu được phép.
5. Liên kết có thể bị thu hồi.

Quy tắc:

- Không cho phụ huynh tìm học sinh theo tên.
- Mã liên kết dùng một lần và hết hạn sau thời gian quy định.
- Chỉ dữ liệu của học sinh đã xác minh mới được hiển thị.
- Phụ huynh không được sửa bài, nộp bài hoặc thay đổi kết quả của học sinh.

## 15. Nghiệp vụ quản trị

Các vùng quản trị hiện có:

- Người dùng.
- Nội dung.
- Khóa & Lớp.
- Sản phẩm & Quyền.
- Đơn hàng.
- Mã kích hoạt.
- Đánh giá.
- Cuộc thi & BXH.
- Audit log.
- Báo cáo.

Quy tắc tối thiểu:

- Mọi thay đổi quyền, đơn hàng, mã kích hoạt, kết quả thi và trạng thái duyệt phải có audit log.
- Tác vụ quản trị nhạy cảm cần phân quyền riêng, không chỉ dựa trên menu frontend.
- Xóa dữ liệu nghiệp vụ nên dùng archive/soft delete để bảo toàn lịch sử.
- Báo cáo phải ghi thời điểm tạo, phạm vi dữ liệu và người tạo.

## 16. Mô hình dữ liệu đề xuất

Các thực thể lõi:

| Thực thể | Trường chính |
|---|---|
| User | id, role, name, email/phone, avatar, status, createdAt |
| TeacherProfile | userId, title, school, bio, achievements, verificationStatus |
| ParentStudentLink | id, parentId, studentId, code, status, expiresAt, verifiedAt |
| Course | id, category, title, description, instructorId, price, status |
| Class | id, courseId, teacherId, name, schedule, status |
| Enrollment | id, classId, studentId, status, joinedAt |
| Material | id, type, title, author, pages/count, price, status, image |
| AccessRight | id, userId, productId, accessType, startsAt, expiresAt, status |
| ActivationCode | id, codeHash, productId, accessType, expiresAt, redeemedBy, redeemedAt |
| Problem | id, code, title, topic, difficulty, points, limits, status |
| Submission | id, problemId/examId, userId, language, source, status, score, createdAt |
| PracticeExam | id, type, title, duration, problemIds, status |
| ExamAttempt | id, examId, userId, startedAt, submittedAt, score, status |
| Contest | id, type, title, edition, year, round, startAt, endAt, status |
| ContestRegistration | id, contestId, userId, registeredAt, status |
| ContestResult | id, contestId, userId, score, rank, publishedAt |
| LeaderboardSnapshot | id, scope, period, userId, score, ac, streak, rank |
| Review | id, authorId, targetType, targetId, rating, content, status |
| SupportTicket | id, requesterId, contact, content, status, assignedTo, createdAt |
| Notification | id, recipientId, type, title, body, readAt |
| AuditLog | id, actorId, action, entityType, entityId, before, after, createdAt |

## 17. Ma trận trạng thái quan trọng

| Đối tượng | Trạng thái |
|---|---|
| Tài khoản | pending verification, active, locked, archived |
| Hồ sơ giáo viên | draft, pending review, approved, rejected, suspended |
| Quyền | pending, active, expired, revoked |
| Đơn hàng | draft, pending payment, paid, failed, cancelled, refunded |
| Câu hỏi | draft, pending review, published, archived |
| Đề luyện tập | open, doing, closed |
| Cuộc thi | draft, registration open, ongoing, scoring, waiting result, published, cancelled |
| Liên kết phụ huynh | pending, verified, rejected, revoked, expired |
| Yêu cầu hỗ trợ | open, assigned, in progress, resolved, closed |

## 18. Quy tắc bảo mật và dữ liệu

- Kiểm tra quyền ở API/server cho mọi tài nguyên riêng tư.
- Hash mật khẩu và mã kích hoạt; không lưu plaintext.
- Không ghi mã xác minh hoặc mật khẩu vào log.
- Giới hạn số lần thử đăng nhập, mã xác minh và mã kích hoạt.
- Avatar và nội dung tải lên cần kiểm tra loại file, kích thước và quyền sử dụng.
- Dữ liệu học sinh, ngày sinh, điểm và liên kết phụ huynh phải có chính sách truy cập tối thiểu.
- Kết quả thi và BXH cần có thời điểm chốt, người/phần hệ thống chốt và lịch sử điều chỉnh.
- Tách dữ liệu demo khỏi dữ liệu production.

## 19. Tiêu chí nghiệm thu nghiệp vụ

### Tài khoản và quyền

- Người dùng có thể đăng nhập, đăng ký, xác minh và khôi phục mật khẩu.
- Chọn vai trò giáo viên không tự cấp quyền dạy.
- Mã hợp lệ cấp đúng loại quyền và thời hạn.
- Mã đã dùng hoặc hết hạn không thể cấp quyền lần hai.
- Người không có quyền không thể đọc/làm nội dung bị khóa.

### Học tập

- Tab và bộ lọc luyện tập trả đúng tập dữ liệu.
- Phân trang bài tập 5/trang và đề thi 4/trang hoạt động đúng.
- Submission lưu được lịch sử và trạng thái chấm.
- Kết quả đề thi phản ánh đúng lần làm và thời lượng.

### Lớp học

- Giáo viên chỉ thao tác trên lớp được phân công.
- Giao đề có đủ thời gian, câu hỏi và lịch mở/đóng.
- Kết quả truy ngược được từ lớp tới submission.
- Phụ huynh chỉ xem được học sinh đã liên kết và xác minh.

### Cuộc thi và BXH

- Mỗi cuộc thi hiển thị mùa giải/năm và vòng/lần thi.
- Không vào phòng thi ngoài thời gian hoặc khi chưa đủ điều kiện.
- Kết quả chờ công bố không xuất hiện như kết quả chính thức.
- BXH lọc đúng phạm vi và không làm lộ dữ liệu riêng tư.

### Vận hành

- Thay đổi quyền, kết quả, duyệt hồ sơ và thanh toán có audit log.
- Các trạng thái loading, empty, error, locked có nội dung rõ ràng.
- Không xóa vật lý dữ liệu làm mất lịch sử nghiệp vụ.

## 20. Các điểm cần chốt trước khi triển khai backend

1. Công thức tính điểm tổng và quy tắc phá hòa của BXH.
2. Chính sách mỗi tài khoản một lượt thi hay cho phép nhiều attempt ở từng loại cuộc thi.
3. Định nghĩa chính xác “đã hoàn thành”, “đang làm” và “AC”.
4. Mô hình sản phẩm/quyền: mua theo tài liệu, theo khóa, theo lớp hay theo gói.
5. Điều kiện mở review và quy trình kiểm duyệt.
6. Luồng phê duyệt giáo viên, giấy tờ cần xác minh và người duyệt.
7. Thời hạn mã xác minh, mã liên kết và mã kích hoạt.
8. Chính sách ẩn danh BXH: ẩn tên, avatar, trường hay toàn bộ hồ sơ.
9. Quy định lưu mã nguồn submission và thời hạn lưu dữ liệu.
10. Nhà cung cấp thanh toán, webhook và xử lý hoàn tiền.
11. Quy chế cuộc thi, điều kiện hủy kết quả và quyền khiếu nại.
12. Sự khác nhau giữa lớp học công khai, lớp riêng và lớp được giao.

## 21. Kế hoạch triển khai đề xuất

### Giai đoạn 1 — Nền tảng dữ liệu và tài khoản

- User, role, session.
- TeacherProfile và phê duyệt.
- AccessRight, ActivationCode, Order.
- AuditLog và phân quyền API.

### Giai đoạn 2 — Học tập cốt lõi

- Course, Class, Enrollment.
- Material và quyền truy cập.
- Problem, Submission, PracticeExam, ExamAttempt.
- Kết quả và thông báo.

### Giai đoạn 3 — Giáo viên và phụ huynh

- Quản lý lớp.
- Điểm danh, giao đề, chấm và báo cáo.
- ParentStudentLink và quyền xem dữ liệu.

### Giai đoạn 4 — Cuộc thi và vinh danh

- Contest, registration, attempt, result.
- Quy trình đối soát và công bố.
- Leaderboard snapshot và ẩn danh.

### Giai đoạn 5 — Vận hành và chất lượng

- Review moderation.
- Support ticket.
- Dashboard báo cáo.
- Audit, bảo mật, backup và kiểm thử quyền.

## 22. Trạng thái tài liệu

- Đã căn cứ vào dữ liệu frontend hiện có.
- Chưa phải tài liệu API hoặc thiết kế cơ sở dữ liệu cuối cùng.
- Các con số và người dùng trong code là dữ liệu minh họa.
- Các mục “cần chốt” phải được xác nhận trước khi dùng làm quy định chính thức.

## 23. Nội dung chuẩn trên PDF và liên kết bài tập

### 23.1. PDF là nguồn nội dung chính thức

- Đề bài được phát hành và hiển thị từ file PDF chính thức của tài liệu, bộ đề hoặc cuộc thi.
- Hướng dẫn giải/lời giải cũng được phát hành từ file PDF chính thức riêng hoặc một phiên bản PDF được quản lý độc lập.
- PDF phải có version, người phát hành, thời điểm phát hành, trạng thái và quyền truy cập.
- Không được coi nội dung text trích xuất tự động từ PDF là nguồn chính nếu chưa được kiểm tra; text extraction chỉ phục vụ tìm kiếm, accessibility và tạo liên kết.
- Khi PDF được thay thế, phải tạo version mới hoặc ghi nhận bản sửa đổi; không làm thay đổi âm thầm nội dung mà học sinh đã làm.
- Nếu PDF không đọc được, thiếu trang hoặc sai mapping mã bài, hệ thống phải hiển thị lỗi rõ ràng và không cho coi là đã hoàn thành việc đọc.

### 23.2. Mã bài và liên kết từ tài liệu

Sách, chuyên đề, bộ đề và tài liệu tương tự có thể chứa nhiều bài tập. Mỗi bài tập phải có một mã duy nhất trong phạm vi toàn hệ thống, ví dụ DP_LIS hoặc GRAPH_DIJKSTRA.

Mỗi bài cần có mapping giữa:

- documentId và documentVersion;
- problemId và problemCode;
- số trang hoặc vùng bắt đầu trong PDF;
- tiêu đề hiển thị;
- liên kết tới trang làm bài;
- liên kết tới PDF hướng dẫn giải nếu người dùng có quyền;
- trạng thái bài trong tài liệu: có thể làm, bị khóa, đã làm, đã đạt.

Luồng đọc tài liệu:

1. Người dùng mở sách/chuyên đề/bộ đề.
2. Hệ thống hiển thị PDF theo đúng version được cấp quyền.
3. Mục lục hoặc vùng nhận diện bài hiển thị mã bài và liên kết “Làm bài”.
4. Người dùng chuyển sang trang làm bài với đúng problemId, không phải một bản sao không định danh.
5. Sau khi làm hoặc nộp bài, kết quả được liên kết ngược về bài trong tài liệu.
6. Nếu có quyền xem hướng dẫn, liên kết “Xem hướng dẫn giải” mở đúng solutionDocumentVersion.

Quy tắc:

- Không dùng tiêu đề làm khóa liên kết vì tiêu đề có thể thay đổi.
- Một bài có thể xuất hiện trong nhiều tài liệu nhưng chỉ có một problemId chuẩn; mỗi lần xuất hiện lưu thêm documentId, thứ tự và vị trí PDF.
- Nếu bộ đề chứa nhiều bài, examProblem phải lưu thứ tự, điểm và vai trò của bài trong bộ đề.
- Link tới bài bị khóa phải chuyển tới luồng đăng nhập, kích hoạt hoặc mua quyền theo đúng nguyên nhân.

## 24. Giáo viên đối tác và sở hữu nội dung riêng

### 24.1. Đăng ký đối tác

Giáo viên muốn trở thành giáo viên của hệ thống phải đăng ký đối tác, không được tự nhận quyền giáo viên chỉ bằng việc chọn vai trò khi đăng ký tài khoản.

Hồ sơ đăng ký đối tác cần có:

- userId;
- thông tin định danh và liên hệ;
- đơn vị công tác;
- chuyên môn và kinh nghiệm;
- giấy tờ hoặc minh chứng theo chính sách;
- trạng thái xét duyệt;
- người duyệt, thời điểm duyệt và lý do từ chối nếu có.

Trạng thái hồ sơ đối tác:

- draft;
- submitted;
- under review;
- approved;
- rejected;
- suspended;
- terminated.

Chỉ hồ sơ approved mới được cấp partnerTeacher capability. Khi suspended hoặc terminated, giáo viên không được tạo mới hoặc phát hành nội dung; dữ liệu lớp, đề và bài cũ vẫn phải giữ lịch sử.

### 24.2. Phạm vi sở hữu riêng

Giáo viên đối tác được tạo:

- lớp của họ;
- bài tập của họ;
- đề của họ;
- học liệu riêng gắn với nội dung của họ;
- thông báo và kết quả trong lớp của họ.

Nội dung do giáo viên tạo mặc định có visibility private_to_owner. Nội dung này:

- chỉ giáo viên sở hữu và quản trị viên được xem toàn bộ;
- chỉ được thêm vào các lớp do giáo viên đó sở hữu hoặc được phân công;
- không tự xuất hiện trong kho chung, trang công khai, BXH hoặc tài liệu thương mại;
- không được giáo viên khác sửa hoặc dùng lại nếu chưa có cơ chế chia sẻ/cấp phép;
- không bị xóa vật lý khi giáo viên đóng tài khoản hoặc mất quyền.

Mỗi tài nguyên riêng cần lưu ownerId, ownerType, visibility, createdBy, updatedBy, version, status và audit history.

### 24.3. Vòng đời nội dung của giáo viên

1. Giáo viên đối tác tạo bản nháp.
2. Giáo viên kiểm tra PDF, mã bài, đáp án và cấu hình chấm.
3. Giáo viên thêm bài vào đề hoặc lớp của mình.
4. Giáo viên phát hành cho lớp.
5. Học sinh làm bài và phát sinh kết quả.
6. Giáo viên có thể đóng phát hành hoặc tạo version mới.

Không được sửa trực tiếp đáp án hoặc cấu hình chấm của version đã có submission nếu việc sửa làm thay đổi điểm lịch sử. Thay đổi phải tạo version mới, có lý do và audit log.

## 25. Chấm bài đa hình thức

### 25.1. Loại bài được hỗ trợ

Mỗi problem phải có questionType:

- single_choice: một đáp án đúng;
- multiple_choice: nhiều đáp án đúng;
- fill_answer: điền đáp án;
- programming: lập trình;
- reading_or_document: đọc nội dung hoặc câu hỏi gắn với PDF nếu cần.

Mỗi loại bài có answerSchema và gradingConfig riêng. Không dùng một logic chấm chung cho mọi loại.

### 25.2. Trắc nghiệm

- Single choice được chấm theo đáp án đúng.
- Multiple choice phải cấu hình rõ chấm đủ đáp án, chấm từng phần hay sai một đáp án là 0 điểm.
- Cần lưu đáp án người học, đáp án chuẩn, điểm, lần làm và thời điểm nộp.
- Đáp án đúng của câu hỏi không được gửi xuống client trước khi được phép.

### 25.3. Điền đáp án

answerSchema phải quy định:

- kiểu dữ liệu: số, chuỗi, phân số, biểu thức hoặc danh sách;
- chuẩn hóa khoảng trắng, chữ hoa/chữ thường và dấu phân cách;
- có cho phép nhiều đáp án tương đương hay không;
- sai số cho đáp án số;
- chấm toàn phần hoặc từng ô;
- thông báo lỗi cho người học.

Không nên dùng so sánh chuỗi đơn giản cho các đáp án có thể biểu diễn tương đương về mặt toán học nếu chưa có bộ chuẩn hóa được kiểm thử.

### 25.4. Lập trình

Ngôn ngữ bắt buộc trong phạm vi hiện tại:

- C++14;
- C++17;
- Python 3.

Mỗi lần nộp phải lưu language, compiler/runtime version, source hoặc source hash, thời gian chạy, bộ nhớ, test result và submission status.

Kết quả chấm cần hiển thị:

- số test đúng/tổng số test;
- test đầu tiên bị sai hoặc nhóm test bị sai nếu chính sách cho phép;
- trạng thái compile, runtime, time limit, memory limit hoặc system error;
- điểm đạt được;
- thời gian và bộ nhớ;
- thông báo hướng dẫn tiếp theo cho người học.

Không hiển thị input, expected output hoặc test ẩn đầy đủ nếu điều đó làm lộ bộ test. Giao diện có thể hiển thị “Test 3: Sai” hoặc nhóm lỗi, còn chi tiết nhạy cảm chỉ dành cho giáo viên/quản trị viên theo quyền.

Hệ thống chấm phải chạy trong sandbox, giới hạn CPU/bộ nhớ/thời gian, không cho truy cập mạng hoặc file ngoài workspace tạm, đồng thời pin phiên bản compiler/runtime để kết quả tái lập được.

## 26. Theo dõi việc xem hướng dẫn và tín hiệu toàn vẹn bài làm

### 26.1. Phạm vi áp dụng

Việc ghi nhận hành vi áp dụng cho:

- bài lập trình;
- trắc nghiệm;
- điền đáp án;
- đề luyện tập;
- cuộc thi;
- bài do giáo viên đối tác tạo.

### 26.2. Sự kiện cần ghi nhận

SubmissionAttempt hoặc ExamAttempt cần có event log cho các sự kiện:

- problem_opened;
- pdf_opened;
- solution_guide_opened;
- solution_guide_closed;
- guide_section_viewed nếu PDF viewer cung cấp được vị trí;
- tab_visibility_lost;
- tab_visibility_restored;
- window_blur;
- window_focus;
- submit_started;
- submit_completed;
- attempt_expired.

Mỗi event cần có attemptId, userId, eventType, occurredAt, source, page/document version và metadata tối thiểu cần thiết.

### 26.3. Hướng dẫn giải

- Hệ thống phải ghi nhận học sinh có mở PDF hướng dẫn giải hay không.
- Phải phân biệt đã mở, đã đóng và thời điểm mở; không tự kết luận học sinh đã đọc hết nội dung.
- Trạng thái “đã xem hướng dẫn” là một tín hiệu nghiệp vụ để hiển thị cho học sinh/giáo viên theo quyền, không mặc định là gian lận.
- Quy chế từng bài/đề phải quy định việc xem hướng dẫn có trừ điểm, khóa nộp hay chỉ là thông tin tham khảo.
- Nếu hướng dẫn chưa được phép xem, thao tác mở phải bị chặn và vẫn có thể ghi nhận security_denied_event.

### 26.4. Mở tab khác

- Trình duyệt chỉ có thể xác định trang làm bài mất visibility hoặc mất focus; không xác định chắc chắn người dùng đã mở website nào ở tab khác.
- Vì vậy hệ thống phải dùng nhãn “mất tiêu điểm/mất hiển thị” hoặc “tín hiệu rời màn hình”, không dùng khẳng định tuyệt đối “đã mở tab gian lận”.
- Tín hiệu này phải được ghi nhận cho mọi loại bài, không chỉ bài lập trình.
- Một lần mất focus ngắn có thể do thông báo hệ điều hành, chuyển cửa sổ hoặc thiết bị di động; không tự động hủy bài chỉ vì một event.
- Có thể cấu hình ngưỡng và quy tắc theo loại bài: số lần, tổng thời gian, thời điểm và trạng thái attempt.
- Với cuộc thi có giám sát, hệ thống có thể đánh dấu attempt cần review; quyết định kỷ luật phải do quy chế và người có thẩm quyền quyết định.

### 26.5. Quyền riêng tư và thông báo

- Trước khi bắt đầu bài/đề, phải thông báo rõ những event được ghi nhận, mục đích và thời gian lưu.
- Chỉ thu thập event cần cho tính toàn vẹn; không thu âm, quay màn hình hoặc đọc nội dung tab khác nếu chưa có cơ chế đồng ý riêng.
- Học sinh được xem lịch sử tín hiệu của chính mình ở mức phù hợp.
- Giáo viên chỉ xem attempt của học sinh trong lớp/đề mình sở hữu; quản trị viên xem theo quyền vận hành.
- Event log phải có retention policy và cơ chế ẩn danh/xóa theo chính sách dữ liệu.

## 27. Bổ sung mô hình dữ liệu

Các thực thể và trường cần bổ sung:

| Thực thể | Trường bổ sung |
|---|---|
| Document | type, fileUrl, version, checksum, pageCount, accessPolicy, status |
| DocumentProblemMap | documentId, documentVersionId, problemId, problemCode, pageStart, pageEnd, orderIndex, linkType |
| SolutionDocument | problemId hoặc examId, documentVersionId, accessPolicy, releaseAt |
| Problem | questionType, ownerId, visibility, answerSchema, gradingConfig, version |
| ExamProblem | examId, problemId, orderIndex, points, documentMapId |
| PartnerApplication | userId, evidence, organization, status, reviewerId, reviewedAt, reviewNote |
| Class | ownerTeacherId, partnerScope, visibility, status |
| Submission | attemptId, questionType, language, runtimeVersion, sourceHash, score, status |
| ProgrammingTestResult | submissionId, testGroup, testIndex, verdict, runtimeMs, memoryKb, isHidden |
| AttemptEvent | attemptId, userId, eventType, occurredAt, documentId, documentVersionId, metadata |
| ContentShare | resourceId, ownerId, targetTeacherId/classId, permission, status, expiresAt |

Quan hệ bắt buộc:

- DocumentProblemMap nối PDF với problemId.
- Submission nối người học, problem/exam, attempt và version bài.
- AttemptEvent nối hành vi với attempt cụ thể, không nối mơ hồ chỉ theo userId.
- ContentShare không thay đổi ownerId; nó chỉ cấp quyền sử dụng có kiểm soát.

## 28. Tiêu chí nghiệm thu bổ sung

### PDF và tài liệu

- Mở đúng PDF theo quyền và version.
- Từ sách/chuyên đề/bộ đề có thể đi tới đúng bài theo problemCode.
- Từ bài có thể quay lại vị trí tương ứng trong tài liệu.
- PDF hướng dẫn giải chỉ mở khi đủ quyền hoặc đến releaseAt.
- Thay version không làm sai kết quả của attempt cũ.

### Giáo viên đối tác

- Giáo viên chưa approved không thể tạo hoặc phát hành lớp, bài, đề.
- Giáo viên approved tạo được lớp, bài và đề riêng.
- Nội dung riêng chỉ xuất hiện trong lớp thuộc phạm vi sở hữu/phân công.
- Giáo viên khác không sửa được nội dung nếu không có ContentShare.
- Quản trị viên truy vết được người tạo, version và lịch sử phát hành.

### Chấm bài

- Chấm đúng single choice, multiple choice và fill answer theo answerSchema.
- Chấm programming trên C++14, C++17 và Python 3.
- Kết quả programming hiển thị được test đúng/sai và verdict tổng hợp.
- Không làm lộ test ẩn, đáp án chuẩn hoặc source của người khác.
- Một submission lỗi compiler/runtime không làm mất lịch sử submission trước.

### Toàn vẹn attempt

- Ghi nhận việc mở/đóng hướng dẫn giải.
- Ghi nhận visibility/focus mất và trở lại ở tất cả loại bài.
- Không khẳng định sai rằng người học đã mở website khác.
- Có thông báo trước khi ghi nhận, quyền xem log và quy tắc retention.
- Một event đơn lẻ không tự động kết luận gian lận hoặc hủy kết quả.

## 29. Phản biện và các điểm phải chốt

### 29.1. PDF là nguồn chuẩn nhưng cần lớp dữ liệu có cấu trúc

Chỉ dùng PDF sẽ khó lọc, tìm kiếm, chấm tự động và liên kết ổn định. Giải pháp phù hợp là PDF làm nguồn hiển thị/pháp lý, còn Problem, AnswerSchema, GradingConfig và DocumentProblemMap là lớp dữ liệu có cấu trúc được kiểm duyệt. Hai lớp phải có checksum/version để đối soát.

### 29.2. “Sở hữu riêng” không đồng nghĩa “không quản trị”

Giáo viên phải sở hữu phạm vi sử dụng, nhưng quản trị viên vẫn cần quyền kiểm duyệt, khóa nội dung vi phạm, xử lý khiếu nại và truy cập audit. Spec không nên hiểu private_to_owner là bất khả xâm phạm với hệ thống.

### 29.3. Phát hiện mở tab khác có giới hạn

Frontend không biết tab nào được mở hoặc người học làm gì ngoài trang. Vì vậy chỉ nên coi tab_visibility_lost/window_blur là tín hiệu cần review. Nếu sản phẩm cần giám sát nghiêm ngặt hơn, phải tách thành một module proctoring có đồng ý riêng, thông báo riêng và đánh giá pháp lý riêng.

### 29.4. Xem hướng dẫn phải có chính sách điểm

Việc ghi nhận mở hướng dẫn chỉ có ý nghĩa khi mỗi loại bài/đề quy định rõ: không ảnh hưởng điểm, trừ điểm, khóa AC, hay chỉ gửi cảnh báo. Nếu chưa chốt, mặc định an toàn là ghi nhận để minh bạch nhưng không tự trừ điểm.

### 29.5. Chấm đa hình thức cần test contract

Mỗi questionType cần bộ test độc lập cho đáp án, chuẩn hóa, điểm, attempt và giao diện kết quả. Nếu không có test contract, việc thêm fill answer hoặc multiple choice dễ làm sai logic chấm programming hiện tại.

### 29.6. Ngôn ngữ lập trình cần pin phiên bản thật

Nhãn C++14, C++17 và Python 3 chưa đủ để tái lập kết quả. Cần chốt compiler/runtime image, phiên bản patch, flags, thư viện cho phép, giới hạn tài nguyên và lịch nâng cấp. Mọi thay đổi môi trường phải tạo grading environment version mới.

### 29.7. Bản quyền và tải PDF

Phải chốt người dùng được xem online, tải file hay in; quyền này khác nhau giữa tài liệu mềm, bản in, quyền học cá nhân và quyền dùng để dạy. URL PDF không nên public trực tiếp; nên dùng signed URL hoặc proxy có kiểm tra quyền.

## 30. Quyết định mặc định để tiếp tục triển khai

Trong khi chờ chốt chính sách chính thức, có thể dùng các mặc định sau:

- PDF đề và PDF hướng dẫn giải là hai document version độc lập.
- Mỗi bài có problemCode duy nhất và mapping tới một hoặc nhiều PDF.
- Nội dung giáo viên đối tác tạo mặc định private_to_owner.
- Giáo viên chỉ được phát hành sau partner approval.
- Hỗ trợ single choice, multiple choice, fill answer và programming.
- Programming chạy sandbox trên ba môi trường C++14, C++17 và Python 3 được pin version.
- Kết quả hiển thị verdict và test index/nhóm test, không lộ test ẩn.
- Ghi nhận guide opened và visibility/focus events cho mọi attempt.
- Visibility/focus chỉ là tín hiệu review, không tự kết luận gian lận.
- Mở hướng dẫn không tự trừ điểm cho tới khi quy chế từng loại bài được phê duyệt.
- Event log chỉ lưu metadata tối thiểu, có retention và quyền xem theo vai trò.
