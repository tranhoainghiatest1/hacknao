import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 29 từ vựng của Unit 13 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 128 -> 133)
const UNIT13_WORDS_UPDATES = [
  {
    "word_number": 337,
    "word": "Affair",
    "example_en": "I don't want to do this terrible affair.\nThis is a dangerous affair.",
    "example_vi": "Tôi không muốn làm việc khủng khiếp này.\nĐây là một sự việc nguy hiểm."
  },
  {
    "word_number": 338,
    "word": "Ambassador",
    "example_en": "I'm the Korean ambassador to the United Nations.\nAll questions about foreign policy should be asked to the ambassador.",
    "example_vi": "Tôi là đại sứ Hàn Quốc tại Liên Hợp Quốc.\nTất cả các câu hỏi về chính sách đối ngoại nên được hỏi đại sứ."
  },
  {
    "word_number": 339,
    "word": "Apprentice",
    "example_en": "I have three apprentices and the best will run the farm.\nThe apprentice became more skilled than the master.",
    "example_vi": "Tôi có ba người học việc và người giỏi nhất sẽ quản lý trang trại.\nNgười học việc đã trở nên lành nghề hơn cả sư phụ."
  },
  {
    "word_number": 340,
    "word": "Architecture",
    "example_en": "I love old French architecture.\nThe stadium's architecture is totally modern.",
    "example_vi": "Tôi yêu kiến trúc cổ điển của Pháp.\nKiến trúc của sân vận động hoàn toàn hiện đại."
  },
  {
    "word_number": 341,
    "word": "Army",
    "example_en": "We'll need an army to move all my furniture!\nThe enemy army will arrive in 30 minutes.",
    "example_vi": "Chúng ta sẽ cần cả một đội quân để chuyển hết đồ đạc của tôi!\nQuân đội kẻ thù sẽ đến trong vòng 30 phút nữa."
  },
  {
    "word_number": 342,
    "word": "Astronomy",
    "example_en": "I stopped studying writing when I realized I love astronomy.\nAstronomy is the key to the future of mankind.",
    "example_vi": "Tôi đã ngừng học viết khi nhận ra mình yêu thích thiên văn học.\nThiên văn học là chìa khóa cho tương lai của nhân loại."
  },
  {
    "word_number": 343,
    "word": "Bullet",
    "example_en": "This vest can stop a bullet.\nThe soldier ran out of bullets and hid in the trees.",
    "example_vi": "Chiếc áo giáp này có thể chặn được một viên đạn.\nNgười lính đã hết sạch đạn và ẩn nấp trong các lùm cây."
  },
  {
    "word_number": 344,
    "word": "Campaign",
    "example_en": "If I win this campaign, I promise we will have more jobs, better hospitals, and better schools.\nThis campaign will surely fail.",
    "example_vi": "Nếu tôi thắng chiến dịch này, tôi hứa chúng ta sẽ có nhiều việc làm hơn, bệnh viện và trường học tốt hơn.\nChiến dịch này chắc chắn sẽ thất bại."
  },
  {
    "word_number": 345,
    "word": "Charity",
    "example_en": "Don't throw out your old clothes! You should donate them to charity.\nSome charities are only interested in making money.",
    "example_vi": "Đừng vứt quần áo cũ đi! Bạn nên quyên góp chúng cho tổ chức từ thiện.\nMột số tổ chức từ thiện chỉ quan tâm đến việc kiếm tiền."
  },
  {
    "word_number": 346,
    "word": "Chef",
    "example_en": "This is the best chef in New York City.\nA dream of becoming a famous sushi chef.",
    "example_vi": "Đây là bếp trưởng giỏi nhất ở thành phố New York.\nMột giấc mơ trở thành đầu bếp sushi nổi tiếng."
  },
  {
    "word_number": 347,
    "word": "Collar",
    "example_en": "Clean your collar before your interview!\nMy father used to grab me by the collar when I misbehaved.",
    "example_vi": "Hãy giặt sạch cổ áo trước buổi phỏng vấn!\nBố tôi thường túm lấy cổ áo tôi khi tôi cư xử không đúng mực."
  },
  {
    "word_number": 348,
    "word": "Collector",
    "example_en": "He's a wealthy art collector.\nYou should sell these old baseball cards to a collector.",
    "example_vi": "Ông ấy là một nhà sưu tầm nghệ thuật giàu có.\nBạn nên bán những chiếc thẻ bóng chày cũ này cho một nhà sưu tầm."
  },
  {
    "word_number": 349,
    "word": "Command",
    "example_en": "The general commands over 9000 troops.\nYou need to take command while I'm unavailable.",
    "example_vi": "Vị tướng chỉ huy hơn 9000 quân.\nBạn cần nắm quyền chỉ huy trong lúc tôi vắng mặt."
  },
  {
    "word_number": 350,
    "word": "Courier",
    "example_en": "The courier should arrive by Sunday.\nI'll pay a special courier to send you the message secretly.",
    "example_vi": "Người chuyển phát sẽ đến trước Chủ Nhật.\nTôi sẽ trả tiền cho một nhân viên chuyển phát đặc biệt để bí mật gửi tin nhắn cho bạn."
  },
  {
    "word_number": 351,
    "word": "Driver",
    "example_en": "He doesn't even have a license. He hires a driver!\nMy driver will pick you up shortly.",
    "example_vi": "Anh ấy thậm chí còn không có bằng lái. Anh ấy thuê một tài xế riêng!\nTài xế của tôi sẽ đón bạn ngay bây giờ."
  },
  {
    "word_number": 352,
    "word": "Economy",
    "example_en": "The economy experienced growth during the second half of 2018.\nOur economy is based on oil and minerals.",
    "example_vi": "Nền kinh tế đã trải qua sự tăng trưởng trong nửa cuối năm 2018.\nNền kinh tế của chúng ta dựa vào dầu mỏ và khoáng sản."
  },
  {
    "word_number": 353,
    "word": "Guard",
    "example_en": "Two guards are always awake.\nBe quiet! Don't alert the guards.",
    "example_vi": "Hai người bảo vệ luôn luôn tỉnh táo.\nHãy giữ im lặng! Đừng đánh động những người bảo vệ."
  },
  {
    "word_number": 354,
    "word": "Industry",
    "example_en": "My father works for the clothing industry.\nIn the future, new industries will replace oil and coal.",
    "example_vi": "Bố tôi làm việc trong ngành công nghiệp may mặc.\nTrong tương lai, các ngành công nghiệp mới sẽ thay thế dầu mỏ và than đá."
  },
  {
    "word_number": 355,
    "word": "Plumber",
    "example_en": "The plumber fixed my sink.\nI think a plumber is a good profession.",
    "example_vi": "Người thợ sửa ống nước đã sửa bồn rửa mặt của tôi.\nTôi nghĩ thợ sửa ống nước là một nghề rất tốt."
  },
  {
    "word_number": 356,
    "word": "Receptionist",
    "example_en": "The receptionist took the day off today.\nFive receptionists were hired for the big hotel.",
    "example_vi": "Hôm nay nhân viên lễ tân đã xin nghỉ phép.\nNăm nhân viên lễ tân đã được tuyển dụng cho khách sạn lớn."
  },
  {
    "word_number": 357,
    "word": "Refugee",
    "example_en": "These refugees need a new home.\nMy mother is an Iraqi refugee.",
    "example_vi": "Những người tị nạn này cần một ngôi nhà mới.\nMẹ tôi là một người tị nạn người Iraq."
  },
  {
    "word_number": 358,
    "word": "Retire",
    "example_en": "I doubt I'll retire when I'm 60.\nAfter I retire, I'm going to travel to Egypt.",
    "example_vi": "Tôi nghi ngờ khả năng mình sẽ nghỉ hưu khi bước sang tuổi 60.\nSau khi về hưu, tôi sẽ đi du lịch Ai Cập."
  },
  {
    "word_number": 359,
    "word": "Secretary",
    "example_en": "Please see my secretary to schedule the appointment!\nI need a secretary who is more organized.",
    "example_vi": "Vui lòng gặp thư ký của tôi để sắp xếp cuộc hẹn!\nTôi cần một thư ký có tác phong ngăn nắp, tổ chức tốt hơn."
  },
  {
    "word_number": 360,
    "word": "Slave",
    "example_en": "I work like a slave.\nPeople still use slaves today.",
    "example_vi": "Tôi làm việc quần quật như một nô lệ.\nMọi người ngày nay vẫn còn sử dụng nô lệ."
  },
  {
    "word_number": 361,
    "word": "Soldier",
    "example_en": "My grandfather was a soldier in World War Two.\nWe need to call soldiers for backup.",
    "example_vi": "Ông tôi từng là một người lính trong Thế chiến thứ hai.\nChúng ta cần gọi binh lính đến để chi viện."
  },
  {
    "word_number": 362,
    "word": "Supervisor",
    "example_en": "I want to see your supervisor!\nMy supervisor wasn't happy with my poor performance.",
    "example_vi": "Tôi muốn gặp người giám sát của bạn!\nNgười giám sát của tôi không hài lòng với hiệu suất làm việc kém cỏi của tôi."
  },
  {
    "word_number": 363,
    "word": "Sword",
    "example_en": "If you steal, you will die by the sword.\nI prefer a bow with an arrow rather than a sword.",
    "example_vi": "Nếu bạn trộm cắp, bạn sẽ phải chết dưới lưỡi kiếm.\nTôi thích cung tên hơn là một thanh kiếm."
  },
  {
    "word_number": 364,
    "word": "Union",
    "example_en": "We are stronger as a union.\nSome employees talked about forming a union, but the CEO fired them.",
    "example_vi": "Chúng ta sẽ mạnh mẽ hơn khi là một khối hiệp hội đoàn kết.\nMột số nhân viên đã bàn về việc thành lập công đoàn, nhưng Tổng Giám đốc đã sa thải họ."
  },
  {
    "word_number": 365,
    "word": "Volunteer",
    "example_en": "We need volunteers to help the victims.\nIf you can't volunteer, please donate money.",
    "example_vi": "Chúng tôi cần những người tình nguyện để giúp đỡ các nạn nhân.\nNếu bạn không thể tham gia tình nguyện, vui lòng hãy quyên góp tiền."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT13_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 13 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 13 trong hacknao_vocab.json!`);
