import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 29 từ vựng của Unit 12 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 118 -> 123)
const UNIT12_WORDS_UPDATES = [
  {
    "word_number": 308,
    "word": "Advantage",
    "example_en": "Let's take advantage of the situation!\nTheir better strategy gives them the advantage.",
    "example_vi": "Hãy tận dụng lợi thế của tình thế này nhé!\nChiến lược tốt hơn đem lại cho họ lợi thế."
  },
  {
    "word_number": 309,
    "word": "Ambition",
    "example_en": "An entrepreneur must have ambition.\nYou can't succeed without ambition.",
    "example_vi": "Một doanh nhân phải có hoài bão.\nBạn không thể thành công nếu không có hoài bão."
  },
  {
    "word_number": 310,
    "word": "Appoint",
    "example_en": "I'll appoint the counsel member.\nNine judges were appointed by the new president.",
    "example_vi": "Tôi sẽ bổ nhiệm thành viên hội đồng cố vấn.\nChín thẩm phán đã được bổ nhiệm bởi vị tổng thống mới."
  },
  {
    "word_number": 311,
    "word": "Appreciate",
    "example_en": "I don't appreciate your attitude.\nLet's take a moment to appreciate our families!",
    "example_vi": "Tôi không thích thái độ của bạn.\nHãy dành một khoảnh khắc để trân trọng gia đình của chúng ta!"
  },
  {
    "word_number": 312,
    "word": "Candidate",
    "example_en": "Her experience makes her the best candidate for the job.\nI think I am an appropriate candidate.",
    "example_vi": "Kinh nghiệm của cô ấy khiến cô ấy trở thành ứng viên tốt nhất cho công việc.\nTôi nghĩ tôi là một ứng viên phù hợp."
  },
  {
    "word_number": 313,
    "word": "Capable",
    "example_en": "She is very capable under pressure.\nThe car isn't capable of holding five people.",
    "example_vi": "Cô ấy rất có năng lực khi làm việc dưới áp lực.\nChiếc xe này không thể chở được năm người."
  },
  {
    "word_number": 314,
    "word": "Capture",
    "example_en": "After the capture, I always release the fish.\nHis carelessness lead to his capture.",
    "example_vi": "Sau khi bắt được, tôi luôn thả cá ra.\nSự bất cẩn của anh ta đã dẫn đến việc anh ta bị bắt giữ."
  },
  {
    "word_number": 315,
    "word": "Compile",
    "example_en": "We've got a computer that compiles the data for us.\nCould you compile those files into a single document?",
    "example_vi": "Chúng tôi có một chiếc máy tính biên soạn dữ liệu giúp chúng tôi.\nBạn có thể biên soạn những tập tin đó thành một tài liệu duy nhất được không?"
  },
  {
    "word_number": 316,
    "word": "Conduct",
    "example_en": "The inspector will conduct a survey this afternoon.\nIron conducts heat and electricity.",
    "example_vi": "Thanh tra sẽ tiến hành một cuộc khảo sát vào chiều nay.\nSắt dẫn nhiệt và dẫn điện."
  },
  {
    "word_number": 317,
    "word": "Conflict",
    "example_en": "It was a bloody conflict.\nI want to avoid conflict by negotiating an agreement.",
    "example_vi": "Đó là một cuộc xung đột đẫm máu.\nTôi muốn tránh xung đột bằng cách đàm phán một thỏa thuận."
  },
  {
    "word_number": 318,
    "word": "Consist",
    "example_en": "This lake consists of fish, crocodiles, and birds.\nCould you tell me your symptoms consist of?",
    "example_vi": "Hồ này gồm có cá, cá sấu và chim.\nBạn có thể cho tôi biết các triệu chứng của bạn gồm có những gì không?"
  },
  {
    "word_number": 319,
    "word": "Consult",
    "example_en": "I'll need to consult a lawyer before I talk to the police.\nThey consulted a special company to install the windows.",
    "example_vi": "Tôi sẽ cần hỏi ý kiến luật sư trước khi nói chuyện với cảnh sát.\nHọ đã tham khảo một công ty chuyên nghiệp để lắp đặt cửa sổ."
  },
  {
    "word_number": 320,
    "word": "Critic",
    "example_en": "I am my own worst critic.\nCritics will always try to ruin you.",
    "example_vi": "Tôi là nhà phê bình khắt khe nhất đối với chính mình.\nCác nhà phê bình sẽ luôn cố gắng vùi dập bạn."
  },
  {
    "word_number": 321,
    "word": "Delicate",
    "example_en": "Be careful with that vase! It's delicate.\nI love this new phone, but it's so delicate.",
    "example_vi": "Hãy cẩn thận với chiếc bình đó! Nó rất mỏng manh dễ vỡ.\nTôi thích chiếc điện thoại mới này, nhưng nó thật mỏng manh."
  },
  {
    "word_number": 322,
    "word": "Deserve",
    "example_en": "You don't deserve the job.\nI know I deserve a higher salary.",
    "example_vi": "Bạn không xứng đáng với công việc đó.\nTôi biết mình xứng đáng được nhận mức lương cao hơn."
  },
  {
    "word_number": 323,
    "word": "Designate",
    "example_en": "We should designate a staff member to print the photocopies.\nI was designated to drive tonight.",
    "example_vi": "Chúng ta nên chỉ định một nhân viên in các bản sao.\nTôi đã được chỉ định lái xe tối nay."
  },
  {
    "word_number": 324,
    "word": "Despair",
    "example_en": "Her heart was heavy with despair.\nDo not feel despair! There is still hope.",
    "example_vi": "Trái tim cô ấy trĩu nặng sự tuyệt vọng.\nĐừng cảm thấy tuyệt vọng! Vẫn còn hy vọng mà."
  },
  {
    "word_number": 325,
    "word": "Effective",
    "example_en": "This is not an effective way to produce computers.\nThis is the most effective strategy to reduce traffic.",
    "example_vi": "Đây không phải là một cách hiệu quả để sản xuất máy tính.\nĐây là chiến lược hiệu quả nhất để giảm bớt tình trạng ùn tắc giao thông."
  },
  {
    "word_number": 326,
    "word": "Efficient",
    "example_en": "These new trains are more efficient, cheaper, and safer.\nSwitzerland has a very efficient public transportation system.",
    "example_vi": "Những đoàn tàu mới này hoạt động hiệu quả hơn, rẻ hơn và an toàn hơn.\nThụy Sĩ có một hệ thống giao thông công cộng rất hiệu quả."
  },
  {
    "word_number": 327,
    "word": "Escort",
    "example_en": "The escort will arrive at exactly 12pm.\nI'll need an escort to get home safely.",
    "example_vi": "Đội hộ tống sẽ đến vào đúng 12 giờ trưa.\nTôi sẽ cần người hộ tống để về nhà một cách an toàn."
  },
  {
    "word_number": 328,
    "word": "Facilitate",
    "example_en": "By accepting online applications, we'll facilitate an easier, less stressful way to apply to our university.\nI'm not going to facilitate your addiction.",
    "example_vi": "Bằng cách chấp nhận đơn trực tuyến, chúng tôi sẽ tạo điều kiện dễ dàng và ít căng thẳng hơn để nộp đơn vào trường.\nTôi sẽ không tiếp tay/tạo điều kiện cho thói nghiện ngập của bạn."
  },
  {
    "word_number": 329,
    "word": "Lead time",
    "example_en": "My goal as supervisor is to decrease lead times.\nThe lead times are so short that I can now order online and receive the package the same day.",
    "example_vi": "Mục tiêu của tôi với tư cách là giám sát viên là giảm thời gian hoàn thành.\nThời gian hoàn thành ngắn đến mức bây giờ tôi có thể đặt hàng trực tuyến và nhận gói hàng ngay trong ngày."
  },
  {
    "word_number": 330,
    "word": "Opponent",
    "example_en": "The more successful you are, the more opponents you have.\nMy opponents will never let me get away with this.",
    "example_vi": "Bạn càng thành công, bạn càng có nhiều đối thủ.\nCác đối thủ của tôi sẽ không bao giờ để tôi thoát khỏi chuyện này."
  },
  {
    "word_number": 331,
    "word": "Overall",
    "example_en": "The overall atmosphere was dark and hopeless.\nThe movie was a little slow, but overall it wasn't bad.",
    "example_vi": "Bầu không khí nhìn chung rất u ám và tuyệt vọng.\nBộ phim hơi chậm một chút, nhưng nhìn chung thì không tệ."
  },
  {
    "word_number": 332,
    "word": "Productive",
    "example_en": "This factory is the most productive in the business.\nI had a productive day.",
    "example_vi": "Nhà máy này có năng suất cao nhất trong ngành.\nTôi đã có một ngày làm việc rất năng suất/hiệu quả."
  },
  {
    "word_number": 333,
    "word": "Regulation",
    "example_en": "New regulations prohibit stores from selling kids cigarettes.\nWe need better environmental regulations.",
    "example_vi": "Các quy định mới cấm các cửa hàng bán thuốc lá cho trẻ em.\nChúng ta cần các quy định về môi trường tốt hơn."
  },
  {
    "word_number": 334,
    "word": "Spreadsheet",
    "example_en": "Could you put his address in the spreadsheet?\nSpreadsheets make reading information easier.",
    "example_vi": "Bạn có thể điền địa chỉ của anh ấy vào bảng tính được không?\nBảng tính giúp việc đọc thông tin trở nên dễ dàng hơn."
  },
  {
    "word_number": 335,
    "word": "Stationery",
    "example_en": "I have the cutest stationery with cats and dogs.\nHe always wrote down everything on stationery.",
    "example_vi": "Tôi có những món đồ dùng văn phòng phẩm dễ thương nhất in hình chó và mèo.\nAnh ấy luôn ghi chép mọi thứ vào văn phòng phẩm."
  },
  {
    "word_number": 336,
    "word": "Worldwide",
    "example_en": "Our company is now known worldwide.\nThe worldwide web is the most important invention of humankind.",
    "example_vi": "Công ty chúng tôi hiện nay đã được biết đến trên toàn thế giới.\nMạng lưới toàn cầu World Wide Web là phát minh quan trọng nhất của nhân loại."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT12_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 12 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 12 trong hacknao_vocab.json!`);
