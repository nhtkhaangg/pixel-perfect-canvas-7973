import type { OpsConfig } from "@/components/shared/ops-page";

const months = ["T4", "T5", "T6", "T7", "T8", "T9"];
const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const names = [
  "Nguyễn Minh Anh", "Trần Quốc Bảo", "Lê Thu Hà", "Phạm Gia Huy", "Hoàng Ngọc Lan", "Võ Thành Nam",
  "Đặng Mỹ Linh", "Bùi Đức Thắng", "Đỗ Khánh Vy", "Ngô Hải Đăng", "Dương Thảo My", "Lý Tuấn Kiệt",
];
const pick = <T,>(arr: T[], i: number) => arr[i % arr.length]!;
const date = (i: number) => `2026-09-${String(24 - (i % 20)).padStart(2, "0")}`;
const statusOpts = (pairs: [string, string][]) => pairs.map(([value, label]) => ({ value, label }));

const zones = ["Khu tạ tự do", "Khu cardio", "Phòng group X", "Khu functional", "Phòng yoga", "Khu máy"];

export const opsPages: Record<string, OpsConfig> = {
  adminIndex: {
    title: "Tổng quan quản trị",
    description: "Tình trạng hệ thống, mức sử dụng và hoạt động quản trị gần đây.",
    stats: [
      { label: "Tổng tài khoản", value: "1.284", delta: 6.2, hint: "so với tháng trước" },
      { label: "Đăng nhập hôm nay", value: "412", delta: 3.1 },
      { label: "Thời gian hoạt động", value: "99,98%", hint: "30 ngày gần nhất" },
      { label: "Cảnh báo bảo mật", value: "2", delta: -50 },
    ],
    charts: [
      { title: "Tài khoản mới theo tháng", type: "bar", xKey: "m", series: [{ key: "customer", label: "Hội viên" }, { key: "staff", label: "Nhân sự" }],
        data: months.map((m, i) => ({ m, customer: 60 + i * 12, staff: 2 + (i % 3) })) },
      { title: "Lượt đăng nhập trong tuần", xKey: "d", series: [{ key: "v", label: "Lượt đăng nhập" }],
        data: days.map((d, i) => ({ d, v: 320 + ((i * 37) % 120) })) },
    ],
    table: {
      title: "Nhật ký hoạt động",
      columns: [{ key: "time", header: "Thời gian" }, { key: "name", header: "Người thực hiện" }, { key: "action", header: "Hành động" }, { key: "status", header: "Kết quả", kind: "status" }],
      rows: Array.from({ length: 14 }, (_, i) => ({
        id: `log${i}`, time: date(i), name: pick(names, i),
        action: pick(["Cập nhật vai trò", "Khóa tài khoản", "Đổi cài đặt thanh toán", "Tạo nhân viên", "Đặt lại mật khẩu"], i),
        status: pick(["completed", "completed", "failed", "pending"], i),
      })),
      actions: ["Xem chi tiết"],
    },
  },
  adminUsers: {
    title: "Người dùng",
    description: "Quản lý tài khoản hội viên, huấn luyện viên và nhân sự.",
    primaryAction: "Thêm người dùng",
    stats: [
      { label: "Hội viên", value: "1.186", delta: 5.4 },
      { label: "Huấn luyện viên", value: "18" },
      { label: "Nhân viên & quản lý", value: "80" },
      { label: "Tài khoản bị khóa", value: "7", delta: -12 },
    ],
    charts: [],
    table: {
      title: "Danh sách tài khoản",
      columns: [{ key: "name", header: "Họ tên" }, { key: "email", header: "Email" }, { key: "role", header: "Vai trò" }, { key: "joined", header: "Ngày tạo" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: Array.from({ length: 24 }, (_, i) => ({
        id: `u${i}`, name: pick(names, i), email: `user${i + 1}@gymfit.vn`,
        role: pick(["Hội viên", "Hội viên", "Huấn luyện viên", "Nhân viên", "Quản lý"], i),
        joined: date(i * 3), status: pick(["active", "active", "active", "locked", "pending"], i),
      })),
      filter: { key: "status", label: "Trạng thái", options: statusOpts([["active", "Đang hoạt động"], ["locked", "Đã khóa"], ["pending", "Chờ xử lý"]]) },
      actions: ["Xem chi tiết", "Đổi vai trò", "Khóa tài khoản"],
    },
  },
  adminRoles: {
    title: "Vai trò & phân quyền",
    description: "Sáu vai trò của hệ thống và quyền truy cập tương ứng.",
    primaryAction: "Cập nhật quyền",
    stats: [
      { label: "Vai trò", value: "6" },
      { label: "Nhóm quyền", value: "42" },
      { label: "Thay đổi tháng này", value: "9" },
      { label: "Quản trị viên", value: "3" },
    ],
    charts: [
      { title: "Số người theo vai trò", type: "bar", xKey: "r", series: [{ key: "v", label: "Người dùng" }],
        data: [{ r: "Hội viên", v: 1186 }, { r: "HLV", v: 18 }, { r: "Nhân viên", v: 72 }, { r: "Quản lý", v: 5 }, { r: "Quản trị", v: 3 }] },
    ],
    table: {
      title: "Ma trận vai trò",
      columns: [{ key: "name", header: "Vai trò" }, { key: "users", header: "Số người" }, { key: "perms", header: "Số quyền" }, { key: "scope", header: "Phạm vi" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: [
        ["Khách", 0, 6, "Trang công khai"], ["Hội viên", 1186, 24, "Cổng hội viên"], ["Huấn luyện viên", 18, 31, "Cổng HLV"],
        ["Nhân viên", 72, 19, "Lễ tân, check-in"], ["Quản lý", 5, 36, "Vận hành phòng gym"], ["Quản trị viên", 3, 42, "Toàn hệ thống"],
      ].map(([name, users, perms, scope], i) => ({ id: `r${i}`, name, users, perms, scope, status: "active" } as Record<string, string | number>)),
    },
  },
  adminFacility: {
    title: "Cơ sở vật chất",
    description: "Các khu tập, thiết bị và lịch bảo trì của phòng gym.",
    primaryAction: "Thêm thiết bị",
    stats: [
      { label: "Khu tập", value: "6" },
      { label: "Thiết bị", value: "148" },
      { label: "Đang bảo trì", value: "5", delta: -2 },
      { label: "Công suất trung bình", value: "72%", delta: 4 },
    ],
    charts: [
      { title: "Mức sử dụng theo khu", type: "bar", xKey: "z", series: [{ key: "v", label: "% công suất" }],
        data: zones.map((z, i) => ({ z: z.replace("Khu ", "").replace("Phòng ", ""), v: 55 + ((i * 13) % 40) })) },
      { title: "Chi phí bảo trì (triệu VNĐ)", xKey: "m", series: [{ key: "v", label: "Chi phí" }],
        data: months.map((m, i) => ({ m, v: 8 + ((i * 5) % 9) })) },
    ],
    table: {
      title: "Danh sách thiết bị",
      columns: [{ key: "name", header: "Thiết bị" }, { key: "zone", header: "Khu" }, { key: "qty", header: "Số lượng" }, { key: "check", header: "Bảo trì gần nhất" }, { key: "usage", header: "Tần suất dùng", kind: "percent" }, { key: "status", header: "Tình trạng", kind: "status" }],
      rows: ["Máy chạy bộ Life Fitness", "Xe đạp tập Keiser", "Giàn squat", "Ghế đẩy ngực", "Bộ tạ đơn 2–40 kg", "Máy kéo cáp", "Máy chèo thuyền", "Thảm yoga", "Kettlebell", "Máy leg press", "Máy elip", "Xà đơn đa năng"]
        .map((name, i) => ({ id: `e${i}`, name, zone: pick(zones, i), qty: 2 + ((i * 3) % 18), check: date(i * 2), usage: 40 + ((i * 17) % 60), status: pick(["active", "active", "in_progress", "active"], i) })),
      actions: ["Xem chi tiết", "Lên lịch bảo trì"],
    },
  },
  adminSettings: {
    title: "Cài đặt hệ thống",
    description: "Cấu hình thanh toán, thông báo, giờ mở cửa và tích hợp.",
    stats: [
      { label: "Cổng thanh toán", value: "3", hint: "VNPAY, PayOS, tiền mặt" },
      { label: "Mẫu thông báo", value: "24" },
      { label: "Giờ mở cửa", value: "05:00–22:00" },
      { label: "Sao lưu gần nhất", value: "24/09/2026" },
    ],
    charts: [],
    table: {
      title: "Tham số cấu hình",
      columns: [{ key: "name", header: "Tham số" }, { key: "group", header: "Nhóm" }, { key: "value", header: "Giá trị" }, { key: "updated", header: "Cập nhật" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: [
        ["Thanh toán VNPAY", "Thanh toán", "Bật"], ["Thanh toán PayOS", "Thanh toán", "Bật"], ["Thời hạn hoàn tiền", "Thanh toán", "7 ngày"],
        ["Nhắc gói sắp hết hạn", "Thông báo", "Trước 7 ngày"], ["Email xác nhận đặt lịch", "Thông báo", "Bật"], ["Giờ mở cửa ngày thường", "Vận hành", "05:00–22:00"],
        ["Giờ mở cửa cuối tuần", "Vận hành", "06:00–21:00"], ["Giới hạn đổi lịch PT", "Vận hành", "2 lần/tháng"], ["Gợi ý AI", "Tích hợp", "Bật"], ["Sao lưu tự động", "Hệ thống", "Hằng ngày 02:00"],
      ].map(([name, group, value], i) => ({ id: `s${i}`, name: name!, group: group!, value: value!, updated: date(i * 4), status: "active" })),
      actions: ["Chỉnh sửa"],
    },
  },
  managerIndex: {
    title: "Tổng quan vận hành",
    description: "Doanh thu, hội viên và hiệu suất của phòng gym.",
    stats: [
      { label: "Doanh thu tháng 9", value: "486.500.000 VNĐ", delta: 8.4 },
      { label: "Hội viên đang hoạt động", value: "942", delta: 3.2 },
      { label: "Lượt check-in hôm nay", value: "318", delta: 5.1 },
      { label: "Tỷ lệ gia hạn", value: "68%", delta: -1.4 },
    ],
    charts: [
      { title: "Doanh thu 6 tháng (triệu VNĐ)", type: "bar", xKey: "m", series: [{ key: "membership", label: "Gói tập" }, { key: "pt", label: "Gói PT" }],
        data: months.map((m, i) => ({ m, membership: 260 + i * 14, pt: 150 + ((i * 23) % 60) })) },
      { title: "Lượt check-in theo ngày", xKey: "d", series: [{ key: "v", label: "Check-in" }],
        data: days.map((d, i) => ({ d, v: [290, 305, 322, 298, 340, 410, 260][i]! })) },
    ],
    table: {
      title: "Hiệu suất huấn luyện viên",
      columns: [{ key: "name", header: "Huấn luyện viên" }, { key: "clients", header: "Học viên" }, { key: "sessions", header: "Buổi tháng này" }, { key: "revenue", header: "Doanh thu", kind: "money" }, { key: "rating", header: "Đánh giá" }, { key: "attendance", header: "Tỷ lệ đi tập", kind: "percent" }],
      rows: names.slice(0, 10).map((name, i) => ({ id: `t${i}`, name, clients: 8 + ((i * 5) % 14), sessions: 40 + ((i * 11) % 50), revenue: 18000000 + i * 3200000, rating: (4.3 + (i % 7) / 10).toFixed(1), attendance: 72 + ((i * 7) % 26) })),
    },
  },
  managerMemberships: {
    title: "Gói tập & hội viên",
    description: "Theo dõi gói đã bán, gia hạn, hết hạn và hoàn tiền.",
    primaryAction: "Tạo gói mới",
    stats: [
      { label: "Gói đang hoạt động", value: "1.024", delta: 4.6 },
      { label: "Sắp hết hạn (7 ngày)", value: "56" },
      { label: "Yêu cầu hoàn tiền", value: "4" },
      { label: "Giá trị trung bình", value: "2.450.000 VNĐ", delta: 2.1 },
    ],
    charts: [
      { title: "Gói bán ra theo tháng", type: "bar", xKey: "m", series: [{ key: "new", label: "Mua mới" }, { key: "renew", label: "Gia hạn" }],
        data: months.map((m, i) => ({ m, new: 90 + ((i * 17) % 40), renew: 120 + i * 9 })) },
      { title: "Tỷ lệ gia hạn (%)", xKey: "m", series: [{ key: "v", label: "Gia hạn" }], data: months.map((m, i) => ({ m, v: 62 + ((i * 3) % 9) })) },
    ],
    table: {
      title: "Gói của hội viên",
      columns: [{ key: "name", header: "Hội viên" }, { key: "pkg", header: "Gói" }, { key: "price", header: "Giá", kind: "money" }, { key: "start", header: "Bắt đầu" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: Array.from({ length: 22 }, (_, i) => ({
        id: `m${i}`, name: pick(names, i + 3), pkg: pick(["Gói 1 tháng", "Gói 3 tháng", "Gói 12 tháng", "PT 12 buổi", "PT 24 buổi"], i),
        price: pick([600000, 1500000, 5400000, 4800000, 8900000], i), start: date(i * 2), status: pick(["active", "active", "pending", "expired", "cancelled"], i),
      })),
      filter: { key: "status", label: "Trạng thái", options: statusOpts([["active", "Đang hoạt động"], ["pending", "Chờ thanh toán"], ["expired", "Hết hạn"], ["cancelled", "Đã hủy"]]) },
    },
  },
  managerReports: {
    title: "Báo cáo",
    description: "Báo cáo tài chính, hội viên và giao dịch thanh toán.",
    stats: [
      { label: "Doanh thu quý 3", value: "1.402.000.000 VNĐ", delta: 11.2 },
      { label: "Chi phí vận hành", value: "618.000.000 VNĐ", delta: 2.4 },
      { label: "Lợi nhuận gộp", value: "56%", delta: 3.6 },
      { label: "Giao dịch thất bại", value: "1,8%", delta: -0.6 },
    ],
    charts: [
      { title: "Doanh thu và chi phí (triệu VNĐ)", xKey: "m", series: [{ key: "rev", label: "Doanh thu" }, { key: "cost", label: "Chi phí" }],
        data: months.map((m, i) => ({ m, rev: 410 + i * 16, cost: 190 + ((i * 7) % 30) })) },
      { title: "Phương thức thanh toán", type: "bar", xKey: "p", series: [{ key: "v", label: "Giao dịch" }],
        data: [{ p: "VNPAY", v: 612 }, { p: "PayOS", v: 384 }, { p: "Tiền mặt", v: 196 }] },
    ],
    table: {
      title: "Giao dịch gần đây",
      columns: [{ key: "id", header: "Mã GD" }, { key: "name", header: "Hội viên" }, { key: "method", header: "Phương thức" }, { key: "amount", header: "Số tiền", kind: "money" }, { key: "date", header: "Ngày" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: Array.from({ length: 20 }, (_, i) => ({
        id: `GD${String(20260900 + i)}`, name: pick(names, i + 5), method: pick(["VNPAY", "PayOS", "Tiền mặt"], i),
        amount: pick([600000, 1500000, 4800000, 5400000], i), date: date(i), status: pick(["paid", "paid", "paid", "failed", "refunded"], i),
      })),
      filter: { key: "status", label: "Trạng thái", options: statusOpts([["paid", "Đã thanh toán"], ["failed", "Thất bại"], ["refunded", "Đã hoàn tiền"]]) },
    },
  },
  managerStaff: {
    title: "Nhân viên",
    description: "Hồ sơ nhân viên, huấn luyện viên, ca làm và phê duyệt.",
    primaryAction: "Thêm nhân viên",
    stats: [
      { label: "Tổng nhân sự", value: "95" },
      { label: "Đang trong ca", value: "14" },
      { label: "Đơn nghỉ chờ duyệt", value: "3" },
      { label: "Chứng chỉ chờ duyệt", value: "5" },
    ],
    charts: [
      { title: "Số người trực theo ca", type: "bar", xKey: "d", series: [{ key: "sang", label: "Ca sáng" }, { key: "chieu", label: "Ca chiều" }, { key: "toi", label: "Ca tối" }],
        data: days.map((d, i) => ({ d, sang: 5 + (i % 2), chieu: 4 + (i % 3), toi: 6 + ((i + 1) % 2) })) },
      { title: "Giờ làm trung bình / tuần", xKey: "m", series: [{ key: "v", label: "Giờ" }], data: months.map((m, i) => ({ m, v: 40 + ((i * 3) % 6) })) },
    ],
    table: {
      title: "Danh sách nhân sự",
      columns: [{ key: "name", header: "Họ tên" }, { key: "position", header: "Vị trí" }, { key: "shift", header: "Ca làm" }, { key: "phone", header: "Điện thoại" }, { key: "kpi", header: "KPI tháng", kind: "percent" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: names.map((name, i) => ({
        id: `st${i}`, name, position: pick(["Huấn luyện viên", "Lễ tân", "Chăm sóc hội viên", "Kỹ thuật", "Tư vấn bán gói"], i),
        shift: pick(["Sáng 05:00–13:00", "Chiều 13:00–22:00", "Hành chính"], i), phone: `09${String(12345678 + i * 111).slice(0, 8)}`,
        kpi: 65 + ((i * 9) % 35), status: pick(["active", "active", "pending", "active"], i),
      })),
      actions: ["Xem hồ sơ", "Phân ca", "Duyệt đơn nghỉ"],
    },
  },
  staffIndex: {
    title: "Tổng quan ca làm",
    description: "Công việc trong ca, lượt check-in và lớp học hôm nay.",
    stats: [
      { label: "Check-in hôm nay", value: "318", delta: 5.1 },
      { label: "Đang tập tại phòng", value: "86" },
      { label: "Lớp học hôm nay", value: "9" },
      { label: "Gói bán trong ca", value: "7", hint: "10.800.000 VNĐ" },
    ],
    charts: [
      { title: "Check-in theo giờ", type: "bar", xKey: "h", series: [{ key: "v", label: "Lượt" }],
        data: ["05h", "07h", "09h", "11h", "13h", "15h", "17h", "19h", "21h"].map((h, i) => ({ h, v: [42, 58, 24, 16, 12, 20, 64, 72, 10][i]! })) },
    ],
    table: {
      title: "Việc cần làm trong ca",
      columns: [{ key: "name", header: "Công việc" }, { key: "owner", header: "Liên quan" }, { key: "due", header: "Hạn" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: ["Gọi nhắc gia hạn gói", "Xác nhận thanh toán tiền mặt", "Kiểm tra máy chạy bộ số 3", "Tư vấn khách mới", "Chuẩn bị phòng yoga", "Xử lý yêu cầu đổi lịch"]
        .map((name, i) => ({ id: `task${i}`, name, owner: pick(names, i), due: date(0), status: pick(["pending", "completed", "in_progress"], i) })),
      actions: ["Đánh dấu hoàn thành"],
    },
  },
  staffMembers: {
    title: "Hội viên",
    description: "Tra cứu hội viên, gói tập và lịch sử check-in.",
    primaryAction: "Đăng ký hội viên",
    stats: [
      { label: "Hội viên", value: "1.186" },
      { label: "Mới trong tháng", value: "84", delta: 9.3 },
      { label: "Sắp hết hạn", value: "56" },
      { label: "Chưa check-in 14 ngày", value: "112" },
    ],
    charts: [],
    table: {
      title: "Danh sách hội viên",
      columns: [{ key: "id", header: "Mã HV" }, { key: "name", header: "Họ tên" }, { key: "pkg", header: "Gói hiện tại" }, { key: "expire", header: "Hết hạn" }, { key: "visits", header: "Lượt tập tháng" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: Array.from({ length: 24 }, (_, i) => ({
        id: `HV${1000 + i}`, name: pick(names, i + 1), pkg: pick(["Gói 1 tháng", "Gói 3 tháng", "Gói 12 tháng", "PT 12 buổi"], i),
        expire: `2026-${String(10 + (i % 3)).padStart(2, "0")}-${String(1 + (i % 27)).padStart(2, "0")}`, visits: 3 + ((i * 7) % 20), status: pick(["active", "active", "expired", "pending"], i),
      })),
      filter: { key: "status", label: "Trạng thái", options: statusOpts([["active", "Đang hoạt động"], ["expired", "Hết hạn"], ["pending", "Chờ thanh toán"]]) },
      actions: ["Xem hồ sơ", "Gia hạn gói", "Check-in hộ"],
    },
  },
  staffCheckIn: {
    title: "Check-in",
    description: "Quét mã QR, check-in thủ công và theo dõi lượt vào phòng.",
    primaryAction: "Check-in thủ công",
    stats: [
      { label: "Lượt vào hôm nay", value: "318", delta: 5.1 },
      { label: "Quét QR", value: "291" },
      { label: "Thủ công", value: "27" },
      { label: "Bị từ chối", value: "4", hint: "Gói hết hạn" },
    ],
    charts: [
      { title: "Check-in 7 ngày qua", xKey: "d", series: [{ key: "qr", label: "QR" }, { key: "manual", label: "Thủ công" }],
        data: days.map((d, i) => ({ d, qr: 260 + ((i * 29) % 110), manual: 18 + ((i * 5) % 14) })) },
    ],
    table: {
      title: "Lượt check-in gần nhất",
      columns: [{ key: "time", header: "Giờ" }, { key: "name", header: "Hội viên" }, { key: "method", header: "Hình thức" }, { key: "zone", header: "Khu" }, { key: "status", header: "Kết quả", kind: "status" }],
      rows: Array.from({ length: 20 }, (_, i) => ({
        id: `ci${i}`, time: `${String(21 - Math.floor(i / 3)).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`, name: pick(names, i + 2),
        method: i % 6 === 0 ? "Thủ công" : "QR", zone: pick(zones, i), status: i % 9 === 4 ? "rejected" : "checked_in",
      })),
      actions: ["Xem hội viên"],
    },
  },
  staffClasses: {
    title: "Lớp học",
    description: "Lịch lớp nhóm, huấn luyện viên phụ trách và số chỗ.",
    primaryAction: "Thêm lớp",
    stats: [
      { label: "Lớp tuần này", value: "42" },
      { label: "Tỷ lệ lấp đầy", value: "81%", delta: 4.2 },
      { label: "Danh sách chờ", value: "17" },
      { label: "Lớp bị hủy", value: "1" },
    ],
    charts: [
      { title: "Học viên tham gia theo ngày", type: "bar", xKey: "d", series: [{ key: "v", label: "Học viên" }],
        data: days.map((d, i) => ({ d, v: [96, 110, 104, 118, 122, 140, 88][i]! })) },
    ],
    table: {
      title: "Lịch lớp tuần này",
      columns: [{ key: "name", header: "Lớp" }, { key: "coach", header: "Huấn luyện viên" }, { key: "time", header: "Thời gian" }, { key: "room", header: "Phòng" }, { key: "fill", header: "Lấp đầy", kind: "percent" }, { key: "status", header: "Trạng thái", kind: "status" }],
      rows: ["Yoga buổi sáng", "HIIT 45'", "Zumba", "Body Pump", "Pilates", "Boxing cơ bản", "Spinning", "Stretching", "Functional", "Core & Abs"]
        .map((name, i) => ({ id: `cl${i}`, name, coach: pick(names, i + 4), time: `${pick(days, i)} ${pick(["06:00", "07:30", "17:30", "18:30", "19:30"], i)}`,
          room: pick(["Phòng group X", "Phòng yoga", "Khu functional"], i), fill: 55 + ((i * 11) % 45), status: pick(["scheduled", "scheduled", "completed", "cancelled", "scheduled"], i) })),
      actions: ["Xem danh sách", "Đổi giờ", "Hủy lớp"],
    },
  },
};
