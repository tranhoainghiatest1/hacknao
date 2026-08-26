import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 29 từ vựng của Unit 8 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 80 -> 85)
const UNIT8_WORDS_UPDATES = [
  {
    "word_number": 198,
    "word": "Access",
    "example_en": "I don't have access to the files.\nOnly some staff have access to this room.",
    "example_vi": "Tôi không có quyền truy cập vào các tệp này.\nChỉ một số nhân viên mới có quyền tiếp cận căn phòng này."
  },
  {
    "word_number": 199,
    "word": "Blackboard",
    "example_en": "Too many equations were written on the blackboard.\nChildren love to draw on the blackboard.",
    "example_vi": "Quá nhiều phương trình đã được viết trên bảng đen.\nBọn trẻ rất thích vẽ lên bảng đen."
  },
  {
    "word_number": 200,
    "word": "Uniform",
    "example_en": "All students are required to wear uniforms.\nWhat are the advantages of wearing uniforms to work?",
    "example_vi": "Tất cả học sinh đều được yêu cầu phải mặc đồng phục.\nNhững lợi ích của việc mặc đồng phục đi làm là gì?"
  },
  {
    "word_number": 201,
    "word": "Classmate",
    "example_en": "I have a huge crush on my classmate.\nMy classmates are so lazy.",
    "example_vi": "Tôi phải lòng say đắm người bạn cùng lớp của mình.\nCác bạn cùng lớp của tôi thật là lười biếng."
  },
  {
    "word_number": 202,
    "word": "Degree",
    "example_en": "A degree is necessary to become a doctor.\nNowadays, everyone has a degree but few people have practical experience.",
    "example_vi": "Bằng cấp là điều cần thiết để trở thành một bác sĩ.\nNgày nay, ai cũng có bằng cấp nhưng ít người có kinh nghiệm thực tế."
  },
  {
    "word_number": 203,
    "word": "Elementary",
    "example_en": "I'm taking elementary mathematics next semester.\nShe can speak Japanese at an elementary level.",
    "example_vi": "Tôi sẽ học toán cơ bản vào học kỳ tới.\nCô ấy có thể nói tiếng Nhật ở mức độ sơ cấp."
  },
  {
    "word_number": 204,
    "word": "Essay",
    "example_en": "Just write a few sentences! You don't need to write an essay.\nThe essay must be at least 1000 words.",
    "example_vi": "Chỉ cần viết vài câu thôi! Bạn không cần phải viết cả một bài tiểu luận đâu.\nBài tiểu luận phải dài ít nhất 1000 từ."
  },
  {
    "word_number": 205,
    "word": "Examine",
    "example_en": "The doctor examined her carefully.\nThe detective examined the crime scene.",
    "example_vi": "Bác sĩ đã thăm khám cho cô ấy một cách cẩn thận.\nThám tử đã kiểm tra hiện trường vụ án."
  },
  {
    "word_number": 206,
    "word": "Fail",
    "example_en": "He failed the final exam.\nDon't be afraid to fail!",
    "example_vi": "Anh ấy đã thi trượt kỳ thi cuối kỳ.\nĐừng sợ thất bại!"
  },
  {
    "word_number": 207,
    "word": "Holiday",
    "example_en": "We're going on holiday next week.\nChristmas is my favorite holiday.",
    "example_vi": "Chúng tôi sẽ đi nghỉ vào tuần tới.\nGiáng sinh là kỳ nghỉ yêu thích nhất của tôi."
  },
  {
    "word_number": 208,
    "word": "Improve",
    "example_en": "You can improve your public speaking skills with practice.\nStudents haven't really improved their Chinese during the semester.",
    "example_vi": "Bạn có thể cải thiện kỹ năng nói trước công chúng bằng cách luyện tập.\nCác học sinh chưa thực sự cải thiện tiếng Trung trong suốt học kỳ."
  },
  {
    "word_number": 209,
    "word": "Layout",
    "example_en": "I don't like the layout of this room.\nThe website needed a new layout.",
    "example_vi": "Tôi không thích bố cục của căn phòng này.\nTrang web cần một bố cục mới."
  },
  {
    "word_number": 210,
    "word": "Lecture",
    "example_en": "The lecture had 100 students.\nThis is the most boring lecture I've ever listened to.",
    "example_vi": "Bài giảng có 100 sinh viên tham dự.\nĐây là bài giảng nhàm chán nhất mà tôi từng nghe."
  },
  {
    "word_number": 211,
    "word": "Mentor",
    "example_en": "She was my mentor when I was a graduate student.\nAll young children should have a good mentor to raise them.",
    "example_vi": "Cô ấy là người hướng dẫn của tôi khi tôi còn là sinh viên cao học.\nTất cả trẻ nhỏ đều nên có một người cố vấn tốt chỉ dạy."
  },
  {
    "word_number": 212,
    "word": "Mistake",
    "example_en": "Don't worry about your mistakes!\nI made too many mistakes on my homework.",
    "example_vi": "Đừng quá lo lắng về những sai lầm của bạn!\nTôi đã mắc quá nhiều lỗi trong bài tập về nhà."
  },
  {
    "word_number": 213,
    "word": "Nursery",
    "example_en": "The nursery is a great learning environment for my daughter.\nI dropped my child off at the nursery.",
    "example_vi": "Nhà trẻ là một môi trường học tập tuyệt vời cho con gái tôi.\nTôi đã đưa con đến gửi ở nhà trẻ."
  },
  {
    "word_number": 214,
    "word": "Object",
    "example_en": "The object of the game is to score as many points as you can.\nThe object of universities is to give students a good preparation for their future.",
    "example_vi": "Mục tiêu của trò chơi là ghi được càng nhiều điểm càng tốt.\nMục tiêu của các trường đại học là chuẩn bị tốt tương lai cho sinh viên."
  },
  {
    "word_number": 215,
    "word": "Outstanding",
    "example_en": "Thanks to your outstanding efforts, all 20 students will graduate.\nThis lunch is outstanding.",
    "example_vi": "Nhờ những nỗ lực xuất sắc của bạn, cả 20 học sinh đều sẽ tốt nghiệp.\nBữa trưa này thật xuất sắc."
  },
  {
    "word_number": 216,
    "word": "Overview",
    "example_en": "We'll have an overview of the material before the exam.\nWe've taken an overview of your performance so far.",
    "example_vi": "Chúng ta sẽ có một cái nhìn tổng quan về tài liệu trước kỳ thi.\nChúng tôi đã có một cái nhìn tổng quan về sự thể hiện của bạn từ trước đến nay."
  },
  {
    "word_number": 217,
    "word": "Practical",
    "example_en": "I want more practical skills.\nThis method may work, but it's not practical.",
    "example_vi": "Tôi muốn có thêm nhiều kỹ năng thực tế hơn.\nPhương pháp này có thể hiệu quả, nhưng nó không thực tế."
  },
  {
    "word_number": 218,
    "word": "Practice",
    "example_en": "You have to practice for the exam.\nShe should practice her skills before the tournament.",
    "example_vi": "Bạn phải luyện tập cho kỳ thi.\nCô ấy nên luyện tập các kỹ năng của mình trước giải đấu."
  },
  {
    "word_number": 219,
    "word": "Primary",
    "example_en": "Primary education is the first stage of compulsory education.\nShe wants to become a primary teacher.",
    "example_vi": "Giáo dục tiểu học là giai đoạn đầu tiên của giáo dục bắt buộc.\nCô ấy muốn trở thành một giáo viên tiểu học."
  },
  {
    "word_number": 220,
    "word": "Principal",
    "example_en": "The principal in my school is really strict.\nIf I were the principal of my school, I would make the break time longer.",
    "example_vi": "Thầy/Cô hiệu trưởng trường tôi rất nghiêm khắc.\nNếu tôi là hiệu trưởng của trường mình, tôi sẽ kéo dài thời gian nghỉ giải lao."
  },
  {
    "word_number": 221,
    "word": "Quantify",
    "example_en": "How can you quantify love?\nYou can't quantify the value of art.",
    "example_vi": "Làm sao bạn có thể định lượng tình yêu được?\nBạn không thể định lượng được giá trị của nghệ thuật."
  },
  {
    "word_number": 222,
    "word": "Regardless",
    "example_en": "Regardless of your past mistakes, you can still succeed.\nThe lecture will continue regardless of the weather.",
    "example_vi": "Bất kể những sai lầm trong quá khứ của bạn, bạn vẫn có thể thành công.\nBài giảng sẽ tiếp tục bất chấp thời tiết thế nào."
  },
  {
    "word_number": 223,
    "word": "Register",
    "example_en": "I need to register to vote in the election.\nYou need to register your motorbike with the department of motor vehicles.",
    "example_vi": "Tôi cần đăng ký để bỏ phiếu trong cuộc bầu cử.\nBạn cần đăng ký xe máy với cơ quan quản lý xe cơ giới."
  },
  {
    "word_number": 224,
    "word": "Revise",
    "example_en": "You'll need to revise this before you present.\nHenry, could you revise this essay for me?",
    "example_vi": "Bạn sẽ cần xem lại bài này trước khi thuyết trình.\nHenry, bạn có thể xem lại bài luận này giúp tôi được không?"
  },
  {
    "word_number": 225,
    "word": "Textbook",
    "example_en": "The homework is on page 47 in the textbook.\nTextbooks have become so expensive.",
    "example_vi": "Bài tập về nhà ở trang 47 trong sách giáo khoa.\nSách giáo khoa ngày nay đã trở nên quá đắt đỏ."
  },
  {
    "word_number": 226,
    "word": "Project",
    "example_en": "My boss wants me to lead the new project.\nThis project will take 300 scientists.",
    "example_vi": "Sếp của tôi muốn tôi dẫn dắt dự án mới.\nDự án này sẽ cần tới 300 nhà khoa học."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT8_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 8 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 8 trong hacknao_vocab.json!`);
