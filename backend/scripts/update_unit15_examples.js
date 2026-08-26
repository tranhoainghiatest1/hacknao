import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 25 từ vựng của Unit 15 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 147 -> 152)
const UNIT15_WORDS_UPDATES = [
  {
    "word_number": 393,
    "word": "Admire",
    "example_en": "I really admire the work of Shakespeare.\nThe students all admire their teacher.",
    "example_vi": "Tôi thực sự rất ngưỡng mộ các tác phẩm của Shakespeare.\nTất cả các học sinh đều rất ngưỡng mộ giáo viên của mình."
  },
  {
    "word_number": 394,
    "word": "Attitude",
    "example_en": "You should have a positive attitude.\nI'm really sick of your attitude, Becky.",
    "example_vi": "Bạn nên có một thái độ sống tích cực.\nTôi thực sự phát ngán với thái độ của bạn rồi đấy, Becky."
  },
  {
    "word_number": 395,
    "word": "Attract",
    "example_en": "She attracts a lot of men, but she doesn't like any of them.\nFlowers attract bees in the summer.",
    "example_vi": "Cô ấy thu hút rất nhiều người đàn ông, nhưng cô ấy chẳng thích ai trong số họ cả.\nNhững bông hoa thu hút bầy ong vào mùa hè."
  },
  {
    "word_number": 396,
    "word": "Background",
    "example_en": "This painting is a lovely background for the photo.\nDo you see that light there in the background?",
    "example_vi": "Bức tranh này là một bối cảnh đáng yêu cho bức ảnh.\nBạn có thấy ánh sáng ở phía sau đằng kia không?"
  },
  {
    "word_number": 397,
    "word": "Busy",
    "example_en": "Main Street is too busy at night, so I usually just stay home.\nI've been super busy at work recently.",
    "example_vi": "Phố Chính quá đông đúc vào ban đêm, vì vậy tôi thường chỉ ở nhà.\nGần đây tôi cực kỳ bận rộn trong công việc."
  },
  {
    "word_number": 398,
    "word": "Charming",
    "example_en": "You've got such a charming smile.\nThis is a charming place for a date.",
    "example_vi": "Bạn có một nụ cười thật quyến rũ.\nĐây là một địa điểm thật duyên dáng và lý tưởng cho buổi hẹn hò."
  },
  {
    "word_number": 399,
    "word": "Cruel",
    "example_en": "The king made a cruel punishment for drinking alcohol.\nI think capital punishment is so cruel.",
    "example_vi": "Vị vua đã đưa ra hình phạt tàn nhẫn cho việc uống rượu.\nTôi nghĩ án tử hình là vô cùng tàn nhẫn."
  },
  {
    "word_number": 400,
    "word": "Curious",
    "example_en": "I'm just asking because I'm curious.\nAren't you curious about the new bar downtown?",
    "example_vi": "Tôi chỉ hỏi vì tôi tò mò thôi.\nBạn không tò mò về quán bar mới ở trung tâm thành phố sao?"
  },
  {
    "word_number": 401,
    "word": "Envy",
    "example_en": "She looked at the Ferrari with envy.\nI envy those who can dance without feeling shy.",
    "example_vi": "Cô ấy nhìn chiếc Ferrari với ánh mắt đầy đố kị.\nTôi ghen tị với những người có thể nhảy múa mà không cảm thấy ngại ngùng."
  },
  {
    "word_number": 402,
    "word": "Favorite",
    "example_en": "Who is your favorite actor?\nMy favorite hobby is playing the guitar.",
    "example_vi": "Ai là diễn viên yêu thích của bạn?\nSở thích yêu thích nhất của tôi là chơi đàn ghi-ta."
  },
  {
    "word_number": 403,
    "word": "Guilty",
    "example_en": "I feel guilty, but I didn't do anything wrong.\nAre you guilty of fraud?",
    "example_vi": "Tôi cảm thấy có lỗi, nhưng tôi đã không làm gì sai cả.\nBạn có phạm tội lừa đảo không?"
  },
  {
    "word_number": 404,
    "word": "Jealous",
    "example_en": "I'm feeling pretty jealous of your new boyfriend.\nI'm not usually a jealous kind of person.",
    "example_vi": "Tôi đang cảm thấy khá ghen tị với người bạn trai mới của bạn.\nTôi thường không phải là kiểu người hay ghen tuông đố kị."
  },
  {
    "word_number": 405,
    "word": "Memory",
    "example_en": "I have very few memories of when I was a kid.\nWhat is your first memory?",
    "example_vi": "Tôi có rất ít ký ức về thời thơ ấu.\nKý ức đầu tiên của bạn là gì?"
  },
  {
    "word_number": 406,
    "word": "Negative",
    "example_en": "There are a lot of negative sides to living abroad.\nI can't stand negative people.",
    "example_vi": "Có rất nhiều mặt tiêu cực của việc sống ở nước ngoài.\nTôi không thể chịu nổi những người luôn tiêu cực."
  },
  {
    "word_number": 407,
    "word": "Opinion",
    "example_en": "What is your opinion about eating dog meat?\nIn my opinion, people should walk more to reduce pollution.",
    "example_vi": "Quan điểm của bạn về việc ăn thịt chó là gì?\nTheo quan điểm của tôi, mọi người nên đi bộ nhiều hơn để giảm ô nhiễm."
  },
  {
    "word_number": 408,
    "word": "Patient",
    "example_en": "You must be patient to see results.\nHe likes challenge and experimentation, but he is also a patient professional.",
    "example_vi": "Bạn phải kiên nhẫn mới thấy được kết quả.\nAnh ấy thích thử thách và trải nghiệm, nhưng anh cũng là một chuyên gia đầy kiên nhẫn."
  },
  {
    "word_number": 409,
    "word": "Peaceful",
    "example_en": "These are peaceful times.\nThis is a peaceful place to relax.",
    "example_vi": "Đây là những khoảng thời gian yên bình.\nĐây là một nơi yên bình để thư giãn."
  },
  {
    "word_number": 410,
    "word": "Pleasure",
    "example_en": "It is my pleasure!\nIt is a pleasure to meet you.",
    "example_vi": "Đó là niềm vinh hạnh của tôi!\nRất hân hạnh được gặp bạn."
  },
  {
    "word_number": 411,
    "word": "Polite",
    "example_en": "Your children are so sweet and polite.\nMake sure you're polite to your grandmother!",
    "example_vi": "Các con của bạn thật dễ thương và lễ phép.\nHãy chắc chắn rằng bạn luôn lịch sự với bà của mình!"
  },
  {
    "word_number": 412,
    "word": "Positive",
    "example_en": "You should always be positive.\nMy friends are the most positive influence.",
    "example_vi": "Bạn nên luôn luôn sống tích cực.\nBạn bè của tôi là nguồn ảnh hưởng tích cực nhất."
  },
  {
    "word_number": 413,
    "word": "Powerful",
    "example_en": "The movie ended with a powerful message.\nShe is a very powerful woman.",
    "example_vi": "Bộ phim kết thúc với một thông điệp mạnh mẽ.\nBà ấy là một người phụ nữ đầy quyền lực."
  },
  {
    "word_number": 414,
    "word": "Rude",
    "example_en": "Don't be rude to your mother!\nThat's a rude way to say sorry.",
    "example_vi": "Đừng thô lỗ với mẹ của bạn!\nĐó là một cách xin lỗi thật thô lỗ."
  },
  {
    "word_number": 415,
    "word": "Shy",
    "example_en": "She is too shy to speak in public.\nDon't be shy, come and join us!",
    "example_vi": "Cô ấy quá nhút nhát để phát biểu trước đám đông.\nĐừng ngại ngùng, hãy đến tham gia cùng chúng tôi đi!"
  },
  {
    "word_number": 416,
    "word": "Sincere",
    "example_en": "Please accept our sincere apologies.\nHe sounded very sincere when he thanked me.",
    "example_vi": "Xin vui lòng chấp nhận lời xin lỗi chân thành của chúng tôi.\nAnh ấy nghe có vẻ rất chân thành khi nói lời cảm ơn tôi."
  },
  {
    "word_number": 417,
    "word": "Stubborn",
    "example_en": "He is as stubborn as a mule.\nShe was too stubborn to admit she was wrong.",
    "example_vi": "Anh ta cứng đầu như một con lừa.\nCô ấy quá bướng bỉnh để chịu thừa nhận rằng mình đã sai."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT15_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 15 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 15 trong hacknao_vocab.json!`);
