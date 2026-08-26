import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 26 từ vựng của Unit 11 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 109 -> 113)
const UNIT11_WORDS_UPDATES = [
  {
    "word_number": 282,
    "word": "Agency",
    "example_en": "Could you recommend a real estate agency for me?\nThis new agency is not trustworthy.",
    "example_vi": "Bạn có thể giới thiệu một công ty bất động sản cho tôi được không?\nĐại lý mới này không đáng tin cậy."
  },
  {
    "word_number": 283,
    "word": "Apply",
    "example_en": "Thousands applied, but only five people became astronauts for the mission.\nI'm so stressed about applying to study abroad.",
    "example_vi": "Hàng ngàn người đã nộp đơn, nhưng chỉ có năm người trở thành phi hành gia cho nhiệm vụ.\nTôi rất căng thẳng về việc nộp đơn đi du học."
  },
  {
    "word_number": 284,
    "word": "Benefit",
    "example_en": "There are a lot of benefits to daily exercise.\nCould you tell me about the benefits of working for you?",
    "example_vi": "Có rất nhiều lợi ích từ việc tập thể dục hàng ngày.\nBạn có thể cho tôi biết về các phúc lợi khi làm việc cho bạn không?"
  },
  {
    "word_number": 285,
    "word": "Career",
    "example_en": "I'll begin my career in Paris, France.\nWhere do you see your career in ten years?",
    "example_vi": "Tôi sẽ bắt đầu sự nghiệp của mình ở Paris, Pháp.\nBạn nhìn thấy sự nghiệp của mình ở đâu trong mười năm tới?"
  },
  {
    "word_number": 286,
    "word": "Contract",
    "example_en": "The contract had unclear language.\nI'd hire a lawyer before you sign the contract.",
    "example_vi": "Hợp đồng có từ ngữ không rõ ràng.\nTôi khuyên bạn nên thuê một luật sư trước khi ký hợp đồng."
  },
  {
    "word_number": 287,
    "word": "Duty",
    "example_en": "It is not my duty to help you.\nPlease don't contact me if I am not on duty!",
    "example_vi": "Giúp bạn không phải là nhiệm vụ của tôi.\nLàm ơn đừng liên lạc với tôi nếu tôi không trong ca làm việc!"
  },
  {
    "word_number": 288,
    "word": "Earnings",
    "example_en": "Monthly earnings have increased a lot.\nCould you please calculate the earnings for this weekend?",
    "example_vi": "Thu nhập hàng tháng đã tăng lên rất nhiều.\nBạn có thể vui lòng tính toán thu nhập cho cuối tuần này không?"
  },
  {
    "word_number": 289,
    "word": "Factory",
    "example_en": "The chemical factory had a huge fire.\nThis factory produces all kinds of vehicles for our company.",
    "example_vi": "Nhà máy hóa chất đã xảy ra một vụ hỏa hoạn lớn.\nNhà máy này sản xuất tất cả các loại xe cho công ty chúng tôi."
  },
  {
    "word_number": 290,
    "word": "Function",
    "example_en": "Only use this computer for its proper function.\nI believe profits are a function of hard work.",
    "example_vi": "Chỉ sử dụng máy tính này cho đúng chức năng của nó.\nTôi tin rằng lợi nhuận là kết quả của sự làm việc chăm chỉ."
  },
  {
    "word_number": 291,
    "word": "Headquarters",
    "example_en": "We're moving the company headquarters to Mumbai.\nMy office is on the fourth floor in the company headquarters.",
    "example_vi": "Chúng tôi đang chuyển trụ sở chính của công ty đến Mumbai.\nVăn phòng của tôi ở tầng bốn tại trụ sở chính của công ty."
  },
  {
    "word_number": 292,
    "word": "Hire",
    "example_en": "You only hired him because you love him.\nOur company wants to hire you, congratulations!",
    "example_vi": "Bạn chỉ thuê anh ta vì bạn yêu anh ta thôi.\nCông ty chúng tôi muốn tuyển dụng bạn, xin chúc mừng!"
  },
  {
    "word_number": 293,
    "word": "Income",
    "example_en": "I only want enough income to support my family.\nDenmark is a country with very high incomes.",
    "example_vi": "Tôi chỉ muốn có đủ thu nhập để nuôi sống gia đình.\nĐan Mạch là quốc gia có mức thu nhập rất cao."
  },
  {
    "word_number": 294,
    "word": "Interview",
    "example_en": "I need to interview new candidates this afternoon.\nAfter interviewing everyone, he decided he would not hire a new accountant.",
    "example_vi": "Tôi cần phỏng vấn các ứng viên mới vào chiều nay.\nSau khi phỏng vấn mọi người, anh ấy quyết định sẽ không thuê kế toán mới."
  },
  {
    "word_number": 295,
    "word": "Board",
    "example_en": "The board of directors approved the budget.\nHe is a member of the school board.",
    "example_vi": "Hội đồng quản trị đã thông qua ngân sách.\nÔng ấy là thành viên của hội đồng trường."
  },
  {
    "word_number": 296,
    "word": "Network",
    "example_en": "He has an extensive business network.\nYou should build a professional network early in your career.",
    "example_vi": "Anh ấy có một mạng lưới kinh doanh sâu rộng.\nBạn nên xây dựng một mạng lưới quan hệ chuyên nghiệp ngay từ sớm trong sự nghiệp."
  },
  {
    "word_number": 297,
    "word": "Passion",
    "example_en": "She has a passion for teaching.\nFollow your passion and success will follow you.",
    "example_vi": "Cô ấy có niềm đam mê mãnh liệt với công việc giảng dạy.\nHãy theo đuổi đam mê và thành công sẽ theo đuổi bạn."
  },
  {
    "word_number": 298,
    "word": "Pension",
    "example_en": "My company puts money into my pension every month.\nWhen I am 65, my pension will be large enough to retire.",
    "example_vi": "Công ty đóng tiền vào quỹ lương hưu của tôi mỗi tháng.\nKhi tôi 65 tuổi, lương hưu của tôi sẽ đủ lớn để nghỉ hưu."
  },
  {
    "word_number": 299,
    "word": "Profile",
    "example_en": "Take a look at her profile!\nYour profile says you worked for Google.",
    "example_vi": "Hãy xem qua hồ sơ của cô ấy nhé!\nHồ sơ của bạn nói rằng bạn từng làm việc cho Google."
  },
  {
    "word_number": 300,
    "word": "Promote",
    "example_en": "I'd like to promote your new video on my website.\nAs a part of the deal, their company promoted our products on TV.",
    "example_vi": "Tôi muốn quảng bá video mới của bạn trên trang web của tôi.\nLà một phần của thỏa thuận, công ty họ đã quảng bá các sản phẩm của chúng tôi trên TV."
  },
  {
    "word_number": 301,
    "word": "Recruit",
    "example_en": "They recruited new talent.\nWe've been recruiting a lot of foreign workers recently.",
    "example_vi": "Họ đã tuyển dụng những tài năng mới.\nGần đây chúng tôi đã tuyển dụng rất nhiều lao động nước ngoài."
  },
  {
    "word_number": 302,
    "word": "Salary",
    "example_en": "My salary has not increased in one year.\nEngineers typically receive a good salary.",
    "example_vi": "Tiền lương của tôi đã không tăng trong suốt một năm.\nCác kỹ sư thường nhận được mức lương rất tốt."
  },
  {
    "word_number": 303,
    "word": "Staff",
    "example_en": "My staff knows what to do in an emergency situation.\nThe staff takes a break at noon.",
    "example_vi": "Nhân viên của tôi biết phải làm gì trong tình huống khẩn cấp.\nCác nhân viên nghỉ giải lao vào buổi trưa."
  },
  {
    "word_number": 304,
    "word": "Storage",
    "example_en": "I'll put these in a safe storage.\nYou can rent this storage for long term.",
    "example_vi": "Tôi sẽ cất những thứ này vào một kho lưu trữ an toàn.\nBạn có thể thuê kho lưu trữ này dài hạn."
  },
  {
    "word_number": 305,
    "word": "Supply",
    "example_en": "This power plant supplies the whole city with electricity.\nYou supply the paper, and I'll make the lesson plan.",
    "example_vi": "Nhà máy điện này cung cấp điện cho toàn thành phố.\nBạn cung cấp giấy, còn tôi sẽ làm giáo án bài giảng."
  },
  {
    "word_number": 306,
    "word": "Wage",
    "example_en": "My wages is too low to afford this house anymore.\nWages have not increased much in recent years.",
    "example_vi": "Tiền công của tôi quá thấp để có thể chi trả cho căn nhà này nữa.\nTiền công đã không tăng nhiều trong những năm gần đây."
  },
  {
    "word_number": 307,
    "word": "Yield",
    "example_en": "There were a lot of storms this summer, so our farm had a small yield.\nWhen the yield is good, we can save money to buy more land.",
    "example_vi": "Mùa hè này có rất nhiều bão, vì vậy trang trại của chúng tôi có sản lượng thấp.\nKhi sản lượng tốt, chúng ta có thể tiết kiệm tiền để mua thêm đất."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT11_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 11 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 11 trong hacknao_vocab.json!`);
