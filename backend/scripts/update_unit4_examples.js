import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 30 từ vựng của Unit 4 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 44 -> 49)
const UNIT4_WORDS_UPDATES = [
  {
    "word_number": 95,
    "word": "Coincide",
    "example_en": "The championship coincides with my birthday.\nThe war coincided with the invention of the printing press.",
    "example_vi": "Giải vô địch trùng hợp vào đúng ngày sinh nhật của tôi.\nCuộc chiến tranh trùng hợp với thời điểm phát minh ra máy in."
  },
  {
    "word_number": 96,
    "word": "Commit",
    "example_en": "She committed an act of forgery.\nI don't want to commit to a long term relationship.",
    "example_vi": "Cô ấy đã phạm tội làm giả mạo giấy tờ.\nTôi không muốn cam kết một mối quan hệ lâu dài."
  },
  {
    "word_number": 97,
    "word": "Conform",
    "example_en": "This factory doesn't conform to international standards.\nDon't conform to society's beauty standards!",
    "example_vi": "Nhà máy này không tuân thủ các tiêu chuẩn quốc tế.\nĐừng rập khuôn tuân theo các tiêu chuẩn sắc đẹp của xã hội!"
  },
  {
    "word_number": 98,
    "word": "Confront",
    "example_en": "I hate to confront people about their mistakes.\nI didn't mean to confront you in such an aggressive way.",
    "example_vi": "Tôi ghét việc phải đối đầu với mọi người về những sai lầm của họ.\nTôi không có ý định đối đầu với bạn một cách hung hăng như vậy."
  },
  {
    "word_number": 99,
    "word": "Confuse",
    "example_en": "Don't confuse the children, keep things simple!\nSome animals confuse predators by changing colors.",
    "example_vi": "Đừng làm bọn trẻ bối rối, hãy giữ mọi thứ thật đơn giản!\nMột số loài động vật làm kẻ săn mồi bối rối bằng cách đổi màu."
  },
  {
    "word_number": 100,
    "word": "Congratulate",
    "example_en": "I would like to congratulate you on your victory.\nPeople congratulated her for her new baby.",
    "example_vi": "Tôi muốn chúc mừng bạn vì chiến thắng của bạn.\nMọi người đã chúc mừng cô ấy vì vừa sinh em bé."
  },
  {
    "word_number": 101,
    "word": "Congress",
    "example_en": "Congress will never approve the law.\nWe need new members of Congress.",
    "example_vi": "Quốc hội sẽ không bao giờ thông qua đạo luật này.\nChúng ta cần có những thành viên mới trong Quốc hội."
  },
  {
    "word_number": 102,
    "word": "Consequence",
    "example_en": "You must accept the consequences of your actions.\nThe accident was a consequence of reckless driving.",
    "example_vi": "Bạn phải chấp nhận hậu quả từ những hành động của mình.\nVụ tai nạn là hậu quả của việc lái xe liều lĩnh."
  },
  {
    "word_number": 103,
    "word": "Consider",
    "example_en": "Have you considered all the options?\nPlease consider my proposal carefully.",
    "example_vi": "Bạn đã cân nhắc tất cả các lựa chọn chưa?\nXin vui lòng cân nhắc kỹ đề xuất của tôi."
  },
  {
    "word_number": 104,
    "word": "Deceive",
    "example_en": "He deceived everyone into thinking he was rich.\nAppearances can be deceiving.",
    "example_vi": "Anh ta đã lừa gạt mọi người nghĩ rằng mình giàu có.\nVẻ bề ngoài có thể đánh lừa người khác."
  },
  {
    "word_number": 105,
    "word": "Dialogue",
    "example_en": "I think we can have a productive dialogue about this topic.\nPlease read the dialogue with your partner!",
    "example_vi": "Tôi nghĩ chúng ta có thể có một cuộc đối thoại hiệu quả về chủ đề này.\nHãy đọc bài đối thoại cùng với bạn cặp của bạn!"
  },
  {
    "word_number": 106,
    "word": "Discrepancy",
    "example_en": "There is some discrepancy between what you say and what you do.\nThere are some discrepancies in our research.",
    "example_vi": "Có sự khác nhau/bất đồng giữa những gì bạn nói và những gì bạn làm.\nCó một số điểm khác biệt trong nghiên cứu của chúng tôi."
  },
  {
    "word_number": 107,
    "word": "Envelope",
    "example_en": "There is a surprise inside the envelope.\nEnvelopes are sometimes sealed with wax.",
    "example_vi": "Có một điều bất ngờ bên trong phong bì thư.\nPhong bì đôi khi được niêm phong bằng sáp."
  },
  {
    "word_number": 108,
    "word": "Especially",
    "example_en": "I hate dessert, especially cake.\nI think she is especially charming.",
    "example_vi": "Tôi ghét món tráng miệng, đặc biệt là bánh ngọt.\nTôi nghĩ cô ấy đặc biệt quyến rũ."
  },
  {
    "word_number": 109,
    "word": "Hyphen",
    "example_en": "I didn't proofread for hyphens.\nCompound words sometimes use a hyphen.",
    "example_vi": "Tôi đã không rà soát lại các dấu gạch nối.\nCác từ ghép đôi khi sử dụng một dấu gạch nối."
  },
  {
    "word_number": 110,
    "word": "Impress",
    "example_en": "I wanted to impress her.\nI think you have done a good job of impressing my boss.",
    "example_vi": "Tôi đã muốn gây ấn tượng với cô ấy.\nTôi nghĩ bạn đã làm rất tốt việc gây ấn tượng với sếp tôi."
  },
  {
    "word_number": 111,
    "word": "Indicate",
    "example_en": "These documents indicate you haven't paid all your taxes.\nWait for the light to indicate for you to turn!",
    "example_vi": "Những tài liệu này chỉ ra rằng bạn chưa nộp đủ tiền thuế.\nHãy chờ đèn tín hiệu chỉ dẫn để bạn rẽ nhé!"
  },
  {
    "word_number": 112,
    "word": "Legend",
    "example_en": "Don't believe the legend, it's not real!\nHe is a basketball legend.",
    "example_vi": "Đừng tin vào truyền thuyết đó, nó không có thật đâu!\nAnh ấy là một huyền thoại bóng rổ."
  },
  {
    "word_number": 113,
    "word": "Moment",
    "example_en": "My first kiss was a magical moment.\nI remember the moment I knew I was in love.",
    "example_vi": "Nụ hôn đầu tiên của tôi là một khoảnh khắc kỳ diệu.\nTôi nhớ giây phút tôi nhận ra mình đã yêu."
  },
  {
    "word_number": 114,
    "word": "Recall",
    "example_en": "I don't recall the events of that night.\nDo you recall your childhood?",
    "example_vi": "Tôi không nhớ lại được các sự việc trong đêm đó.\nBạn có nhớ lại được tuổi thơ của mình không?"
  },
  {
    "word_number": 115,
    "word": "Recommend",
    "example_en": "I don't recommend swimming in this lake.\nWhich restaurant do you recommend?",
    "example_vi": "Tôi không khuyên bạn bơi ở hồ nước này đâu.\nBạn gợi ý/giới thiệu nhà hàng nào?"
  },
  {
    "word_number": 116,
    "word": "Refer",
    "example_en": "What are you referring to?\nI'll refer you to my website.",
    "example_vi": "Bạn đang ám chỉ/nhắc đến điều gì vậy?\nTôi sẽ giới thiệu bạn đến trang web của tôi."
  },
  {
    "word_number": 117,
    "word": "Refuse",
    "example_en": "He refused to eat his dinner.\nI refuse to let you destroy my reputation.",
    "example_vi": "Anh ấy từ chối ăn bữa tối.\nTôi từ chối để bạn hủy hoại danh tiếng của tôi."
  },
  {
    "word_number": 118,
    "word": "Relevant",
    "example_en": "Can you think of any relevant questions to the topic?\nDon't use your phone unless it's relevant to the class!",
    "example_vi": "Bạn có thể nghĩ ra câu hỏi nào liên quan đến chủ đề không?\nĐừng dùng điện thoại trừ khi nó liên quan đến tiết học!"
  },
  {
    "word_number": 119,
    "word": "Repel",
    "example_en": "These magnets repel each other.\nThis spray repels bugs.",
    "example_vi": "Những thanh nam châm này đẩy lùi nhau.\nBình xịt này xua đuổi côn trùng."
  },
  {
    "word_number": 120,
    "word": "Represent",
    "example_en": "She was chosen to represent our school.\nThe union represents over 20,000 workers.",
    "example_vi": "Cô ấy đã được chọn làm đại diện cho trường chúng tôi.\nCông đoàn đại diện cho hơn 20.000 công nhân."
  },
  {
    "word_number": 121,
    "word": "Signature",
    "example_en": "Put your signature here, please.\nEach signature on the petition makes a difference.",
    "example_vi": "Vui lòng ký tên của bạn vào đây.\nMỗi chữ ký trên bản kiến nghị đều tạo nên sự khác biệt."
  },
  {
    "word_number": 122,
    "word": "Statement",
    "example_en": "He made a bold statement yesterday.\nThe witness gave a clear statement to the police.",
    "example_vi": "Hôm qua ông ấy đã đưa ra một lời tuyên bố táo bạo.\nNhân chứng đã đưa ra một bản tường trình rõ ràng cho cảnh sát."
  },
  {
    "word_number": 123,
    "word": "Strain",
    "example_en": "This dog has put our relationship under strain.\nI feel a strain in my shoulder.",
    "example_vi": "Con chó này đã khiến mối quan hệ của chúng tôi thêm căng thẳng.\nTôi cảm thấy bị căng cơ ở vùng vai."
  },
  {
    "word_number": 124,
    "word": "Sympathy",
    "example_en": "I have no sympathy for murderers.\nSympathy is important in all relationships.",
    "example_vi": "Tôi không có bất kỳ sự thương hại nào cho những kẻ giết người.\nSự thông cảm rất quan trọng trong mọi mối quan hệ."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT4_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 4 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 4 trong hacknao_vocab.json!`);
