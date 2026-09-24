export type PackageType = "MEMBERSHIP" | "PT";

export type GymPackage = {
  id: string;
  name: string;
  type: PackageType;
  price: number;
  durationDays: number;
  totalSessions: number | null;
  description: string;
  perks: string[];
  featured?: boolean;
};

export const packages: GymPackage[] = [
  {
    id: "flex-monthly",
    name: "Linh Hoạt Hàng Tháng",
    type: "MEMBERSHIP",
    price: 399000,
    durationDays: 30,
    totalSessions: null,
    description: "Ra vào khu tập giờ thấp điểm, phù hợp người tự tập theo lịch riêng.",
    perks: ["Khu tập 9:00–16:00", "Sử dụng tủ đồ", "1 buổi hướng dẫn nhập môn", "Ứng dụng hội viên"],
  },
  {
    id: "standard-monthly",
    name: "Tiêu Chuẩn Hàng Tháng",
    type: "MEMBERSHIP",
    price: 599000,
    durationDays: 30,
    totalSessions: null,
    description: "Ra vào không giới hạn giờ mở cửa, kèm lớp nhóm không giới hạn.",
    perks: ["Khu tập 5:00–23:00", "Lớp nhóm không giới hạn", "Khu xông hơi & phục hồi", "1 lượt khách miễn phí/tháng"],
    featured: true,
  },
  {
    id: "all-access-quarter",
    name: "Trọn Gói 3 Tháng",
    type: "MEMBERSHIP",
    price: 1590000,
    durationDays: 90,
    totalSessions: null,
    description: "Toàn bộ khu vực tập, mọi lớp học, kèm đo chỉ số cơ thể mỗi quý.",
    perks: ["Toàn bộ khu vực trong gym", "Lớp học không giới hạn", "Đo InBody mỗi quý", "Dịch vụ khăn tập", "Ưu tiên đặt lịch"],
  },
  {
    id: "annual-standard",
    name: "Tiêu Chuẩn Trọn Năm",
    type: "MEMBERSHIP",
    price: 5990000,
    durationDays: 365,
    totalSessions: null,
    description: "Mười hai tháng gói Tiêu Chuẩn, tặng thêm hai tháng miễn phí.",
    perks: ["Toàn bộ quyền lợi gói Tiêu Chuẩn", "Bảo lưu 2 tháng", "Tặng bộ quà tập luyện", "Khóa giá không tăng"],
  },
  {
    id: "pt-starter-8",
    name: "PT Khởi Đầu 8 Buổi",
    type: "PT",
    price: 4000000,
    durationDays: 45,
    totalSessions: 8,
    description: "Tám buổi tập 1-kèm-1 để nắm nền tảng và xây dựng giáo án phù hợp.",
    perks: ["Đánh giá vận động", "Giáo án cá nhân hoá", "Kiến thức dinh dưỡng cơ bản", "Theo dõi tiến độ định kỳ"],
  },
  {
    id: "pt-transform-24",
    name: "PT Chuyển Hoá 24 Buổi",
    type: "PT",
    price: 10800000,
    durationDays: 90,
    totalSessions: 24,
    description: "Chương trình 12 tuần, tập 2 buổi/tuần cùng huấn luyện viên, theo dõi sát sao.",
    perks: ["2 buổi/tuần", "Tư vấn thực đơn hàng tuần", "Đo chỉ số cơ thể hàng tháng", "Hỗ trợ nhắn tin"],
    featured: true,
  },
  {
    id: "pt-elite-48",
    name: "PT Nâng Cao 48 Buổi",
    type: "PT",
    price: 21600000,
    durationDays: 180,
    totalSessions: 48,
    description: "Sáu tháng huấn luyện chuyên sâu dành cho vận động viên và mục tiêu cao.",
    perks: ["Giáo án chu kỳ hoá", "Chuẩn bị thi đấu", "Phác đồ phục hồi", "Nhắn tin hỗ trợ không giới hạn"],
  },
];

export type Trainer = {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  ratingAvg: number;
  reviewCount: number;
  certificates: string[];
  /** Khu vực làm việc chính trong gym (một phòng gym duy nhất). */
  branch: string;
  tags: string[];
};

export const trainers: Trainer[] = [
  {
    id: "maya-nguyen",
    name: "Nguyễn Minh Anh",
    specialization: "Sức mạnh & Cử tạ",
    experienceYears: 9,
    bio: "Cựu vận động viên cử tạ cấp quốc gia, giúp người mới và người tập trung cấp xây dựng sức mạnh thực sự với kỹ thuật an toàn và giáo án đơn giản.",
    ratingAvg: 4.9,
    reviewCount: 128,
    certificates: ["NSCA-CSCS", "Huấn luyện viên cử tạ quốc gia", "Dinh dưỡng thể thao cấp 1"],
    branch: "Khu tạ tự do",
    tags: ["Sức mạnh", "Kỹ thuật", "Tập cho nữ"],
  },
  {
    id: "daniel-okafor",
    name: "Trần Quốc Đạt",
    specialization: "Giảm mỡ & Sức bền",
    experienceYears: 7,
    bio: "Kết hợp bài tập chuyển hóa với thói quen dinh dưỡng bền vững. Học viên giảm trung bình 6 kg mỡ sau một chu kỳ 12 tuần.",
    ratingAvg: 4.8,
    reviewCount: 96,
    certificates: ["ACE-CPT", "Kettlebell Athletics cấp 2", "Sơ cấp cứu CPR/AED"],
    branch: "Khu functional",
    tags: ["HIIT", "Giảm cân", "Kettlebell"],
  },
  {
    id: "lena-fischer",
    name: "Lê Thị Hồng Ngọc",
    specialization: "Vận động & Phục hồi",
    experienceYears: 11,
    bio: "Được đào tạo vật lý trị liệu, tập trung vào vận động không đau, phục hồi chấn thương và cải thiện linh hoạt cho dân văn phòng và người lớn tuổi.",
    ratingAvg: 4.95,
    reviewCount: 142,
    certificates: ["Cử nhân Vật lý trị liệu", "FRC Mobility Specialist", "Huấn luyện viên Pilates"],
    branch: "Phòng yoga",
    tags: ["Linh hoạt", "Phục hồi chấn thương", "Pilates"],
  },
  {
    id: "marco-silva",
    name: "Phạm Thành Long",
    specialization: "Tăng cơ & Thể hình",
    experienceYears: 6,
    bio: "Vận động viên thể hình thi đấu, huấn luyện tăng cơ dựa trên khoa học, chuẩn bị thi đấu và tái cấu trúc cơ thể.",
    ratingAvg: 4.7,
    reviewCount: 74,
    certificates: ["NASM-CPT", "Thẻ VĐV IFBB", "Dinh dưỡng thể hình ISSA"],
    branch: "Khu tạ tự do",
    tags: ["Tăng cơ", "Chuẩn bị thi đấu", "Dinh dưỡng"],
  },
  {
    id: "aisha-rahman",
    name: "Đỗ Thu Trang",
    specialization: "Sức bền & Chạy bộ",
    experienceYears: 8,
    bio: "Vận động viên marathon và ba môn phối hợp, xây dựng nền tảng thể lực — từ 5km đầu tiên đến marathon sub-3 — kèm bài tập sức mạnh để tránh chấn thương.",
    ratingAvg: 4.85,
    reviewCount: 88,
    certificates: ["UESCA Running Coach", "TrainingPeaks cấp 2", "NASM-CES"],
    branch: "Khu cardio",
    tags: ["Chạy bộ", "Ba môn phối hợp", "Sức bền"],
  },
  {
    id: "tom-becker",
    name: "Vũ Hoàng Nam",
    specialization: "Functional & Người lớn tuổi",
    experienceYears: 14,
    bio: "14 năm kinh nghiệm giúp học viên trên 50 tuổi duy trì sức khỏe, thăng bằng và sự tự chủ thông qua bài tập chức năng.",
    ratingAvg: 4.9,
    reviewCount: 110,
    certificates: ["ACSM-EP", "Chuyên gia thể lực người cao tuổi", "TRX STC"],
    branch: "Khu functional",
    tags: ["Thăng bằng", "Lão hoá khoẻ mạnh", "Functional"],
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: "Training" | "Nutrition" | "Recovery" | "Community";
  author: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export const articleCategoryLabels: Record<Article["category"], string> = {
  Training: "Tập luyện",
  Nutrition: "Dinh dưỡng",
  Recovery: "Phục hồi",
  Community: "Cộng đồng",
};

export const articles: Article[] = [
  {
    id: "beginner-strength-guide",
    title: "Hướng dẫn 12 tuần tập sức mạnh đầu tiên cho người mới",
    excerpt: "Ba bài tập, ba buổi mỗi tuần, một quy tắc tăng tải đơn giản. Đây là giáo án các huấn luyện viên áp dụng cho mọi hội viên mới.",
    category: "Training",
    author: "Nguyễn Minh Anh",
    date: "2026-09-18",
    readMinutes: 7,
    body: [
      "Bắt đầu một chương trình sức mạnh không phải là tìm ra giáo án hoàn hảo, mà là duy trì đều đặn. Huấn luyện viên khuyên nên tập toàn thân 3 buổi/tuần với squat, hinge và đẩy vai.",
      "Áp dụng nguyên tắc tăng tải tuyến tính: thêm 2,5 kg cho bài thân trên và 5 kg cho bài thân dưới mỗi buổi khi kỹ thuật vẫn ổn định. Khi chững lại hai lần liên tiếp, giảm 10% tạ rồi tăng dần trở lại.",
      "Các bài bổ trợ vẫn quan trọng, nhưng nên giữ ngắn gọn. Hai hoặc ba bài cho lưng, cơ trung tâm và sức mạnh một chân là đủ trong 12 tuần đầu.",
      "Cuối cùng, hãy ghi lại mọi thứ. Ứng dụng hội viên tự động lưu số hiệp khi bạn tập theo giáo án GymFit, để bạn thấy rõ mình đã tiến bộ ra sao.",
    ],
  },
  {
    id: "protein-myths",
    title: "Năm hiểu lầm về đạm đang cản trở tiến bộ của bạn",
    excerpt: "Không, cơ thể không chỉ hấp thụ được 30g đạm mỗi lần. Cùng xem nghiên cứu nói gì.",
    category: "Nutrition",
    author: "Trần Quốc Đạt",
    date: "2026-09-10",
    readMinutes: 5,
    body: [
      "Đạm là chất dinh dưỡng được bàn tán nhiều nhất trong phòng gym, và cũng bị hiểu sai nhiều nhất.",
      "Hầu hết người tập đạt hiệu quả tốt với 1,6–2,2g đạm mỗi kg cân nặng mỗi ngày. Chia đều trong 3-4 bữa có lợi, nhưng tổng lượng cả ngày mới là yếu tố quan trọng nhất.",
      "Đạm thực vật cũng hiệu quả — chỉ cần kết hợp nhiều nguồn và tăng nhẹ tổng lượng. Đạm cao vẫn an toàn với người có thận khỏe mạnh.",
    ],
  },
  {
    id: "sleep-and-recovery",
    title: "Giấc ngủ là công cụ phục hồi tốt nhất bạn chưa tận dụng",
    excerpt: "Danh sách thực tế giúp ngủ sâu hơn — và lý do nó quan trọng hơn bất kỳ thực phẩm bổ sung nào.",
    category: "Recovery",
    author: "Lê Thị Hồng Ngọc",
    date: "2026-08-29",
    readMinutes: 6,
    body: [
      "Cơ bắp được xây dựng khi bạn nghỉ ngơi, và phần lớn quá trình phục hồi diễn ra trong giấc ngủ sâu.",
      "Giữ giờ thức dậy cố định, kể cả cuối tuần. Ra ngoài nắng trong vòng một giờ sau khi dậy, và giữ phòng ngủ mát, tối và yên tĩnh.",
      "Ngừng caffeine sau 14:00 và tránh tập nặng trong vòng hai giờ trước khi ngủ nếu bạn thấy khó ngủ.",
    ],
  },
  {
    id: "riverside-opening",
    title: "Khu tạ tự do vừa nâng cấp: điều gì mới trong mùa thu này",
    excerpt: "Thêm một làn kéo lê tạ mới, hai giá squat và câu lạc bộ chạy bộ thứ Bảy. Cùng tham gia tuần lễ kỷ niệm.",
    category: "Community",
    author: "Đội ngũ GymFit",
    date: "2026-08-20",
    readMinutes: 3,
    body: [
      "Đã một năm kể từ khi khu tạ tự do khai trương, và hơn 1.400 hội viên đã coi đây là điểm tập luyện quen thuộc.",
      "Để kỷ niệm, chúng tôi đã thêm một làn kéo lê tạ dài 20m, hai giá squat mới và câu lạc bộ chạy bộ miễn phí vào thứ Bảy do huấn luyện viên Đỗ Thu Trang dẫn dắt.",
      "Tuần lễ kỷ niệm diễn ra từ 1–7/10 với vé khách miễn phí và lớp học mở cho tất cả mọi người.",
    ],
  },
  {
    id: "hiit-vs-steady-state",
    title: "HIIT hay cardio ổn định: đâu là lựa chọn đốt mỡ tốt hơn?",
    excerpt: "Câu trả lời trung thực phụ thuộc vào lịch trình, khả năng hồi phục và điều bạn thực sự có thể duy trì.",
    category: "Training",
    author: "Đỗ Thu Trang",
    date: "2026-08-12",
    readMinutes: 6,
    body: [
      "HIIT đốt nhiều calo hơn mỗi phút, nhưng cardio ổn định dễ hồi phục hơn và có thể tập thường xuyên hơn.",
      "Với hầu hết hội viên, kết hợp cả hai là tốt nhất: một hoặc hai buổi interval ngắn cộng hai buổi cardio nhẹ 30–45 phút mỗi tuần.",
      "Hãy chọn phương pháp bạn thích — sự kiên trì luôn quan trọng hơn tối ưu hoá.",
    ],
  },
  {
    id: "desk-mobility",
    title: "Bài tập linh hoạt 10 phút cho dân văn phòng",
    excerpt: "Hông, cột sống ngực và vai — ba vùng bị ảnh hưởng nhiều nhất khi ngồi cả ngày.",
    category: "Recovery",
    author: "Lê Thị Hồng Ngọc",
    date: "2026-07-30",
    readMinutes: 4,
    body: [
      "Ngồi tám tiếng mỗi ngày làm co rút cơ gập hông và khiến lưng trên gù xuống. Mười phút mỗi ngày giúp cải thiện điều đó.",
      "Thực hiện 60 giây mỗi động tác: giãn cơ tư thế ghế sofa (mỗi bên), cat-cow, thread the needle (mỗi bên), wall slides và giữ tư thế squat sâu.",
      "Kết hợp với đi bộ giờ nghỉ trưa và bạn sẽ thấy khác biệt chỉ sau hai tuần.",
    ],
  },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  /** Khu vực trong gym mà hội viên nhắc tới (một phòng gym duy nhất). */
  branch: string;
  title: string;
  body: string;
  memberSince: string;
};

export const reviews: Review[] = [
  { id: "r1", author: "Sophie Lâm", rating: 5, date: "2026-09-20", branch: "Khu tạ tự do", title: "Huấn luyện viên tốt nhất tôi từng gặp", body: "Chị Minh Anh đã sửa hoàn toàn kỹ thuật squat của tôi chỉ sau ba buổi. Gym luôn sạch sẽ và không bao giờ quá đông, kể cả lúc 18:00.", memberSince: "2024" },
  { id: "r2", author: "James Kiên", rating: 5, date: "2026-09-15", branch: "Khu functional", title: "Lớp học thực sự thú vị", body: "Các lớp thể lực khá nặng nhưng được tổ chức tốt. Đặt lịch qua ứng dụng chỉ mất vài giây.", memberSince: "2025" },
  { id: "r3", author: "Priya Sương", rating: 4, date: "2026-09-08", branch: "Khu tạ tự do", title: "Thiết bị tốt, hơi đông giờ cao điểm", body: "Rất nhiều giá đỡ và bánh tạ. Có thể đông vào khoảng 17:30 nhưng nhân viên hỗ trợ luân chuyển tốt.", memberSince: "2023" },
  { id: "r4", author: "Carlos Minh", rating: 5, date: "2026-08-30", branch: "Khu functional", title: "Hoàn hảo cho bố tôi", body: "Các buổi tập chức năng của thầy Hoàng Nam đã giúp bố tôi cải thiện thăng bằng và sự tự tin rất nhiều.", memberSince: "2025" },
  { id: "r5", author: "Emily Chi", rating: 4, date: "2026-08-22", branch: "Khu phục hồi", title: "Rất thích khu phục hồi", body: "Xông hơi và bể lạnh sau khi tập là một trải nghiệm tuyệt vời. Mong có thể mở cửa muộn hơn vào cuối tuần.", memberSince: "2024" },
  { id: "r6", author: "Hiro Thắng", rating: 5, date: "2026-08-14", branch: "Khu cardio", title: "Hoàn thành marathon đầu tiên", body: "Giáo án của chị Thu Trang đưa tôi từ 10km lên marathon trong sáu tháng mà không hề chấn thương. Rất đáng để giới thiệu.", memberSince: "2025" },
  { id: "r7", author: "Grace Oanh", rating: 3, date: "2026-08-02", branch: "Khu tạ tự do", title: "Tốt nhưng bãi xe hơi khó khăn", body: "Phòng gym rất tốt, nhưng tìm chỗ đậu xe vào buổi tối đôi khi hơi mất thời gian.", memberSince: "2026" },
  { id: "r8", author: "Ben Vũ", rating: 5, date: "2026-07-25", branch: "Sảnh chính", title: "Lễ tân thân thiện", body: "Nhân viên nhớ tên hội viên và check-in bằng mã QR chỉ trong tích tắc. Cảm giác như một cộng đồng thực sự.", memberSince: "2022" },
];

export const gymInfo = {
  name: "GymFit",
  tagline: "Tập luyện có mục tiêu, theo dõi từng buổi",
  phone: "0903 123 456",
  email: "hello@gymfit.vn",
  address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  hours: "Thứ 2–Thứ 6: 5:00–23:00 · Thứ 7–Chủ nhật: 7:00–21:00",
  sizeSqm: 1800,
  stats: [
    { label: "Hội viên đang hoạt động", value: "1.200+" },
    { label: "Huấn luyện viên", value: "12" },
    { label: "Lớp học mỗi tuần", value: "36" },
    { label: "Đánh giá trung bình", value: "4.8" },
  ],
  /** Giữ dạng mảng để tương thích với các trang khác; phòng gym chỉ có một cơ sở duy nhất. */
  branches: [
    { name: "Cơ sở chính", address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh", hours: "Thứ 2–Thứ 6: 5:00–23:00 · Thứ 7–CN: 7:00–21:00", sizeSqm: 1800 },
  ],
  /** Các khu vực chức năng trong cùng một phòng gym. */
  zones: [
    { name: "Khu tạ tự do", description: "24 giá squat, hệ thống tạ đơn và tạ đòn đầy đủ." },
    { name: "Khu cardio", description: "60 máy chạy bộ, xe đạp và máy elliptical." },
    { name: "Phòng yoga", description: "Không gian yên tĩnh cho yoga, pilates và giãn cơ." },
    { name: "Khu functional", description: "Dụng cụ TRX, kettlebell, bục nhảy và thảm tập." },
    { name: "Khu phục hồi", description: "Xông hơi, xông khô và bể ngâm lạnh." },
  ],
  amenities: [
    "Khu tạ tự do với 24 giá squat",
    "Khu cardio với 60 máy tập",
    "Phòng lớp nhóm & phòng yoga",
    "Xông hơi, xông khô & bể lạnh",
    "Làn kéo lê tạ chuyên dụng",
    "Dịch vụ khăn tập & tủ đồ",
    "Khu vui chơi trẻ em",
    "Bãi giữ xe miễn phí",
  ],
  faqs: [
    { q: "Tôi có thể trải nghiệm trước khi đăng ký không?", a: "Có — mỗi khách tham quan được tặng một ngày trải nghiệm miễn phí. Chỉ cần mang CCCD đến quầy lễ tân." },
    { q: "Tôi có thể bảo lưu gói tập không?", a: "Gói tháng có thể bảo lưu tối đa 30 ngày mỗi năm. Gói năm được tặng thêm hai tháng bảo lưu." },
    { q: "Có phí gia nhập không?", a: "Không có phí gia nhập cho bất kỳ gói nào. Bạn chỉ thanh toán cho gói mình chọn." },
    { q: "Làm sao để đặt lịch tập cùng huấn luyện viên?", a: "Mua gói PT, sau đó đặt lịch với huấn luyện viên bạn chọn ngay trên ứng dụng hội viên." },
  ],
};

export const formatCurrency = (n: number) =>
  `${new Intl.NumberFormat("vi-VN").format(n)} VNĐ`;

export const formatDate = (d: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
};

export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
