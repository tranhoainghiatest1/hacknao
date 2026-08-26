import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 29 từ vựng của Unit 5 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 53 -> 58)
const UNIT5_WORDS_UPDATES = [
  {
    "word_number": 125,
    "word": "Durable",
    "example_en": "I need a more durable car for the mountains.\nThese gloves are nice and durable.",
    "example_vi": "Tôi cần một chiếc xe bền bỉ hơn để đi đường núi.\nNhững chiếc găng tay này rất đẹp và bền."
  },
  {
    "word_number": 126,
    "word": "Edition",
    "example_en": "The third edition of the textbook has some updated information.\nThis product is a special edition.",
    "example_vi": "Ấn bản thứ ba của sách giáo khoa có một số thông tin cập nhật.\nSản phẩm này là một phiên bản đặc biệt."
  },
  {
    "word_number": 127,
    "word": "Element",
    "example_en": "Carbon is an essential element of life.\nSalt is a combination of two elements.",
    "example_vi": "Cacbon là một nguyên tố thiết yếu của sự sống.\nMuối là sự kết hợp của hai nguyên tố."
  },
  {
    "word_number": 128,
    "word": "Elevator",
    "example_en": "Take the elevator to the fifth floor!\nThe mechanic couldn't find the problem with the elevator.",
    "example_vi": "Hãy đi thang máy lên tầng năm!\nNgười thợ cơ khí không thể tìm ra vấn đề của chiếc thang máy."
  },
  {
    "word_number": 129,
    "word": "Equipment",
    "example_en": "The new laboratory equipment arrives on Thursday.\nThe equipment was old and rusty.",
    "example_vi": "Thiết bị phòng thí nghiệm mới sẽ được chuyển đến vào thứ Năm.\nThiết bị đã cũ kỹ và gỉ sét."
  },
  {
    "word_number": 130,
    "word": "Experiment",
    "example_en": "Any good experiment needs proper funding.\nCould you answer some questions for a social experiment we are doing?",
    "example_vi": "Bất kỳ cuộc thí nghiệm tốt nào cũng cần có nguồn kinh phí thích hợp.\nBạn có thể trả lời một vài câu hỏi cho một thử nghiệm xã hội mà chúng tôi đang thực hiện không?"
  },
  {
    "word_number": 131,
    "word": "Former",
    "example_en": "I am dating my former colleague.\nMy former roommate drank too much beer.",
    "example_vi": "Tôi đang hẹn hò với người đồng nghiệp trước đây của tôi.\nNgười bạn cùng phòng trước đây của tôi uống quá nhiều bia."
  },
  {
    "word_number": 132,
    "word": "Fulfill",
    "example_en": "He never fulfilled his dream of winning the Nobel Prize.\nI haven't fulfilled my duty as a father.",
    "example_vi": "Ông ấy chưa bao giờ thực hiện được ước mơ đoạt giải Nobel của mình.\nTôi vẫn chưa hoàn thành trọn vẹn bổn phận của một người cha."
  },
  {
    "word_number": 133,
    "word": "Fund",
    "example_en": "The history department doesn't have enough funds.\nWe'll need more funds to complete the research.",
    "example_vi": "Khoa lịch sử không có đủ nguồn kinh phí.\nChúng ta sẽ cần thêm kinh phí để hoàn thành nghiên cứu."
  },
  {
    "word_number": 134,
    "word": "Gain",
    "example_en": "We have made great gains toward discovering the cure.\nMike, I think you're gaining weight.",
    "example_vi": "Chúng tôi đã đạt được những bước tiến lớn hướng tới việc tìm ra phương pháp chữa trị.\nMike à, tôi nghĩ bạn đang tăng cân đấy."
  },
  {
    "word_number": 135,
    "word": "General",
    "example_en": "In general, British people are polite.\nAs a general rule, you should double check your work.",
    "example_vi": "Nhìn chung, người Anh rất lịch sự.\nTheo nguyên tắc chung, bạn nên kiểm tra lại công việc của mình."
  },
  {
    "word_number": 136,
    "word": "Generate",
    "example_en": "This dam generates enough electricity for the entire city.\nA boxer can generate a lot of force in one punch.",
    "example_vi": "Đập thủy điện này tạo ra đủ lượng điện cho toàn bộ thành phố.\nMột võ sĩ quyền anh có thể tạo ra rất nhiều lực trong một cú đấm."
  },
  {
    "word_number": 137,
    "word": "Hammer",
    "example_en": "Thor's hammer is made from an ancient star.\nI'll need a small hammer to complete the repairs.",
    "example_vi": "Cây búa của Thor được rèn từ một ngôi sao cổ xưa.\nTôi sẽ cần một cây búa nhỏ để hoàn thành việc sửa chữa."
  },
  {
    "word_number": 138,
    "word": "Leak",
    "example_en": "Have you fixed the leak yet?\nThere was a leak of classified information.",
    "example_vi": "Bạn đã sửa xong chỗ rò rỉ chưa?\nĐã có một sự rò rỉ thông tin mật."
  },
  {
    "word_number": 139,
    "word": "Perspective",
    "example_en": "Allow me to offer a different perspective!\nI never thought about it from that perspective.",
    "example_vi": "Cho phép tôi đưa ra một góc nhìn khác nhé!\nTôi chưa từng nghĩ về nó từ góc nhìn đó."
  },
  {
    "word_number": 140,
    "word": "Presume",
    "example_en": "I presume you're Dr. Einstein?\nI presume this will be enough money.",
    "example_vi": "Tôi cho là/đoán rằng ngài là Tiến sĩ Einstein?\nTôi cho là số tiền này sẽ đủ."
  },
  {
    "word_number": 141,
    "word": "Proof",
    "example_en": "You have some good evidence, but you still have no proof.\nShow me your proof!",
    "example_vi": "Bạn có một số bằng chứng tốt, nhưng bạn vẫn chưa có chứng cứ xác thực.\nHãy cho tôi xem bằng chứng của bạn!"
  },
  {
    "word_number": 142,
    "word": "Proofreader",
    "example_en": "I'll need to hire an English proofreader before publishing the book.\nShe is her own proofreader.",
    "example_vi": "Tôi sẽ cần thuê một người sửa bản in thử tiếng Anh trước khi xuất bản cuốn sách.\nCô ấy là người tự sửa bản in thử của chính mình."
  },
  {
    "word_number": 143,
    "word": "Pure",
    "example_en": "Hitler is pure evil.\nI like this pure gold watch.",
    "example_vi": "Hitler là sự độc ác thuần túy.\nTôi thích chiếc đồng hồ bằng vàng nguyên chất này."
  },
  {
    "word_number": 144,
    "word": "Range",
    "example_en": "We offer a wide range of options.\nThe price range is between 10 and 20 dollars.",
    "example_vi": "Chúng tôi cung cấp một phạm vi lựa chọn rất phong phú.\nMức giá nằm trong khoảng từ 10 đến 20 đô la."
  },
  {
    "word_number": 145,
    "word": "Ray",
    "example_en": "A ray of sunshine beamed through the window.\nX-rays are used to see broken bones.",
    "example_vi": "Một tia nắng chiếu xuyên qua cửa sổ.\nTia X được dùng để quan sát xương bị gãy."
  },
  {
    "word_number": 146,
    "word": "Section",
    "example_en": "Let's read this section together.\nThis section of the library is for children.",
    "example_vi": "Chúng ta hãy cùng đọc phần này nhé.\nKhu vực này của thư viện dành riêng cho trẻ em."
  },
  {
    "word_number": 147,
    "word": "Sector",
    "example_en": "He works as a teacher in the public sector.\nThis sector is off limits to everyone except the scientists.",
    "example_vi": "Ông ấy làm giáo viên trong khu vực công.\nKhu vực này cấm tất cả mọi người ngoại trừ các nhà khoa học."
  },
  {
    "word_number": 148,
    "word": "Significant",
    "example_en": "The movie didn't make me feel anything significant.\nI don't believe your discoveries are significant.",
    "example_vi": "Bộ phim không làm tôi cảm thấy có điều gì quan trọng cả.\nTôi không tin rằng những khám phá của bạn có ý nghĩa quan trọng."
  },
  {
    "word_number": 149,
    "word": "Skeleton",
    "example_en": "The human skeleton is an amazing thing.\nBird skeletons meant there was probably a snake nearby.",
    "example_vi": "Bộ xương người là một cấu trúc đáng kinh ngạc.\nNhững bộ xương chim có nghĩa là có khả năng có một con rắn ở gần đó."
  },
  {
    "word_number": 150,
    "word": "Sleeve",
    "example_en": "Make sure you wear a shirt with sleeves in the laboratory!\nShe wore her heart on her sleeve.",
    "example_vi": "Hãy chắc chắn rằng bạn mặc áo có tay trong phòng thí nghiệm!\nCô ấy luôn bộc lộ cảm xúc ra ngoài/thật lòng."
  },
  {
    "word_number": 151,
    "word": "Sponsor",
    "example_en": "Will you sponsor the event?\nMany corporations sponsor this soccer team.",
    "example_vi": "Bạn sẽ tài trợ cho sự kiện này chứ?\nNhiều tập đoàn tài trợ cho đội bóng đá này."
  },
  {
    "word_number": 152,
    "word": "Stuff",
    "example_en": "I forgot my stuff at your house.\nAtoms are the stuff that make up the universe.",
    "example_vi": "Tôi để quên đồ đạc ở nhà bạn rồi.\nCác nguyên tử là thứ cấu tạo nên vũ trụ."
  },
  {
    "word_number": 153,
    "word": "Subject to",
    "example_en": "The plane ticket will be subject to the time you travel.\nThe city was subject to the king's authority.",
    "example_vi": "Giá vé máy bay sẽ tùy thuộc vào thời điểm bạn khởi hành.\nThành phố phải chịu sự quản lý/chi phối của nhà vua."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT5_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 5 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 5 trong hacknao_vocab.json!`);
