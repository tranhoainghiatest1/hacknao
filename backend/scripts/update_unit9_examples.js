import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 25 từ vựng của Unit 9 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 90 -> 94)
const UNIT9_WORDS_UPDATES = [
  {
    "word_number": 227,
    "word": "Abroad",
    "example_en": "We went abroad for holiday.\nI will study abroad in New Zealand next year.",
    "example_vi": "Chúng tôi đã đi nước ngoài trong kỳ nghỉ.\nTôi sẽ đi du học ở New Zealand vào năm tới."
  },
  {
    "word_number": 228,
    "word": "Absent",
    "example_en": "I noticed you were absent from the meeting.\nIf you are absent, the teacher will give you a bad mark.",
    "example_vi": "Tôi nhận thấy bạn đã vắng mặt trong cuộc họp.\nNếu bạn vắng mặt, giáo viên sẽ cho bạn điểm kém."
  },
  {
    "word_number": 229,
    "word": "Abstract",
    "example_en": "Some concepts in physics are so abstract.\nIt's an abstract idea, but it just might work.",
    "example_vi": "Một số khái niệm trong vật lý rất trừu tượng.\nĐó là một ý tưởng trừu tượng, nhưng nó có thể mang lại hiệu quả."
  },
  {
    "word_number": 230,
    "word": "Adjacent",
    "example_en": "The bank is on the adjacent street.\nPlease put your shoes in the adjacent room!",
    "example_vi": "Ngân hàng nằm ở con phố liền kề.\nLàm ơn hãy để giày của bạn ở căn phòng kế bên!"
  },
  {
    "word_number": 231,
    "word": "Advance",
    "example_en": "I'm advancing toward my goals.\nComputer technology has advanced in recent years.",
    "example_vi": "Tôi đang tiến gần hơn tới các mục tiêu của mình.\nCông nghệ máy tính đã có nhiều tiến bộ trong những năm gần đây."
  },
  {
    "word_number": 232,
    "word": "Afterwards",
    "example_en": "We had coffee, and afterwards we kissed.\nThe restaurant was too crowded at lunch, but afterwards there were some empty tables for us.",
    "example_vi": "Chúng tôi uống cà phê, và sau đó chúng tôi đã hôn nhau.\nNhà hàng quá đông vào bữa trưa, nhưng sau đó đã có vài bàn trống cho chúng tôi."
  },
  {
    "word_number": 233,
    "word": "Assist",
    "example_en": "I assist my professor with research.\nHe always assists his mom with the housework.",
    "example_vi": "Tôi hỗ trợ giáo sư của mình trong việc nghiên cứu.\nAnh ấy luôn giúp mẹ làm việc nhà."
  },
  {
    "word_number": 234,
    "word": "Basis",
    "example_en": "What's the basis of your bad behavior?\nEinstein's theory of gravity is the basis for his research.",
    "example_vi": "Đâu là cơ sở cho hành vi cư xử tồi tệ của bạn vậy?\nThuyết hấp dẫn của Einstein là nền tảng cho nghiên cứu của ông."
  },
  {
    "word_number": 235,
    "word": "Common",
    "example_en": "English is the most common language in the UK.\nIt's common sense not to drive with headphones.",
    "example_vi": "Tiếng Anh là ngôn ngữ phổ biến nhất ở Vương quốc Anh.\nKhông đeo tai nghe khi lái xe là điều bình thường ai cũng hiểu."
  },
  {
    "word_number": 236,
    "word": "Concentrate",
    "example_en": "I can't concentrate with all that noise.\nDon't concentrate on the negatives!",
    "example_vi": "Tôi không thể tập trung với tất cả tiếng ồn đó.\nĐừng chỉ tập trung vào những điều tiêu cực!"
  },
  {
    "word_number": 237,
    "word": "Concern",
    "example_en": "You should only concern yourself with your studies.\nDon't concern yourself with others!",
    "example_vi": "Bạn chỉ nên bận tâm đến việc học tập của mình thôi.\nĐừng bận tâm về người khác!"
  },
  {
    "word_number": 238,
    "word": "Conclude",
    "example_en": "They concluded the new technology could reduce expenses by 50%.\nTo conclude, factory farming is not a sustainable practice.",
    "example_vi": "Họ kết luận rằng công nghệ mới có thể giảm 50% chi phí.\nĐể kết luận, nông nghiệp chăn nuôi công nghiệp không phải là biện pháp bền vững."
  },
  {
    "word_number": 239,
    "word": "Concrete",
    "example_en": "We need a concrete plan before we begin.\nYou need some more concrete evidence.",
    "example_vi": "Chúng ta cần một kế hoạch cụ thể trước khi bắt đầu.\nBạn cần thêm một số bằng chứng cụ thể hơn."
  },
  {
    "word_number": 240,
    "word": "Course",
    "example_en": "I heard great things about Dr. Simonsen's public policy course.\nI have taken this course three times because I keep failing.",
    "example_vi": "Tôi nghe nhiều điều tuyệt vời về khóa học chính sách công của Tiến sĩ Simonsen.\nTôi đã học khóa học này ba lần vì toàn bị thi trượt."
  },
  {
    "word_number": 241,
    "word": "Deadline",
    "example_en": "The deadline for presentations is Friday.\nI have too many deadlines this week so I can't hang out with you.",
    "example_vi": "Hạn chót nộp bài thuyết trình là thứ Sáu.\nTuần này tôi có quá nhiều hạn chót nên không thể đi chơi với bạn được."
  },
  {
    "word_number": 242,
    "word": "Debate",
    "example_en": "We debated the importance of free tuition.\nSome people still debate about whether or not the earth is round.",
    "example_vi": "Chúng tôi đã tranh luận về tầm quan trọng của việc miễn học phí.\nMột số người vẫn tranh luận về việc liệu trái đất có tròn hay không."
  },
  {
    "word_number": 243,
    "word": "Diagram",
    "example_en": "The professor drew a diagram of the human brain.\nMaking diagrams helps me study!",
    "example_vi": "Giáo sư đã vẽ một sơ đồ về bộ não con người.\nVẽ các sơ đồ giúp tôi học tập tốt hơn!"
  },
  {
    "word_number": 244,
    "word": "Draft",
    "example_en": "The first draft was terrible.\nFinish the draft by Tuesday!",
    "example_vi": "Bản thảo nháp đầu tiên thật tồi tệ.\nHãy hoàn thành bản nháp trước thứ Ba nhé!"
  },
  {
    "word_number": 245,
    "word": "Eligible",
    "example_en": "People with diseases are not eligible to sign up.\nYou're not eligible for free tuition.",
    "example_vi": "Những người mắc bệnh không đủ điều kiện để đăng ký.\nBạn không đủ điều kiện để được miễn học phí."
  },
  {
    "word_number": 246,
    "word": "Error",
    "example_en": "I'm sorry, your application has an error.\nThere has been an error in your taxes.",
    "example_vi": "Tôi xin lỗi, đơn đăng ký của bạn có một sai sót.\nĐã có một lỗi sai trong khoản thuế của bạn."
  },
  {
    "word_number": 247,
    "word": "Hall",
    "example_en": "I'll meet you by the main hall.\nThe halls had the most beautiful lights and paintings.",
    "example_vi": "Tôi sẽ gặp bạn ở gần đại sảnh chính.\nCác đại sảnh có những chùm đèn và bức tranh đẹp nhất."
  },
  {
    "word_number": 248,
    "word": "Integral",
    "example_en": "Drinking has become an integral part of student culture at some universities.\nHard work is an integral part of success.",
    "example_vi": "Việc uống rượu bia đã trở thành một phần không thể thiếu trong văn hóa sinh viên ở một số trường đại học.\nChăm chỉ làm việc là một phần thiết yếu của thành công."
  },
  {
    "word_number": 249,
    "word": "Library",
    "example_en": "The library closes at midnight.\nI do most of my studying in the library.",
    "example_vi": "Thư viện đóng cửa lúc nửa đêm.\nTôi dành hầu hết thời gian học tập trong thư viện."
  },
  {
    "word_number": 250,
    "word": "Priority",
    "example_en": "My priority is to get a good education.\nOlder students will have priority.",
    "example_vi": "Ưu tiên hàng đầu của tôi là có được nền giáo dục tốt.\nNhững học sinh lớn tuổi hơn sẽ có sự ưu tiên."
  },
  {
    "word_number": 251,
    "word": "Private",
    "example_en": "I'm a private investigator.\nThis is a private university.",
    "example_vi": "Tôi là một thám tử tư.\nĐây là một trường đại học tư thục."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT9_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 9 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 9 trong hacknao_vocab.json!`);
