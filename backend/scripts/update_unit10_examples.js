import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 30 từ vựng của Unit 10 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 99 -> 104)
const UNIT10_WORDS_UPDATES = [
  {
    "word_number": 252,
    "word": "Academic",
    "example_en": "He always speaks using academic language.\nI hope to publish my research and a good academic journal.",
    "example_vi": "Anh ấy luôn nói chuyện bằng ngôn từ mang tính học thuật.\nTôi hy vọng xuất bản nghiên cứu của mình trên một tạp chí học thuật uy tín."
  },
  {
    "word_number": 253,
    "word": "Acknowledge",
    "example_en": "She acknowledged her mistake.\nHe refused to acknowledge his defeat.",
    "example_vi": "Cô ấy đã thừa nhận lỗi của mình.\nAnh ấy đã từ chối công nhận thất bại của mình."
  },
  {
    "word_number": 254,
    "word": "Admission",
    "example_en": "Admission is free for students.\nShe received admission to her top choice university.",
    "example_vi": "Miễn phí vé vào cửa cho học sinh sinh viên.\nCô ấy đã nhận được giấy báo trúng tuyển vào trường đại học mơ ước."
  },
  {
    "word_number": 255,
    "word": "Assignment",
    "example_en": "Complete the assignment before Friday.\nThis assignment is worth 20 percent of your grade.",
    "example_vi": "Hãy hoàn thành bài tập trước thứ Sáu.\nBài tập này chiếm 20 phần trăm tổng điểm của bạn."
  },
  {
    "word_number": 256,
    "word": "Ballet",
    "example_en": "She has been practicing ballet since childhood.\nThe Russian ballet performance was breathtaking.",
    "example_vi": "Cô ấy đã tập múa ba lê từ khi còn nhỏ.\nBuổi biểu diễn múa ba lê của Nga thật ngoạn mục."
  },
  {
    "word_number": 257,
    "word": "Biology",
    "example_en": "The biology of an ant is incredible.\nYou need to take biology before you study organic chemistry.",
    "example_vi": "Đặc điểm sinh học của loài kiến thật đáng kinh ngạc.\nBạn cần học môn sinh học trước khi học hóa học hữu cơ."
  },
  {
    "word_number": 258,
    "word": "Calculate",
    "example_en": "I calculated again and I found an error.\nCould you calculate the total costs?",
    "example_vi": "Tôi đã tính toán lại và phát hiện ra một lỗi sai.\nBạn có thể tính toán tổng chi phí được không?"
  },
  {
    "word_number": 259,
    "word": "Chemistry",
    "example_en": "If you major in chemistry, you still need to study math and physics.\nI went on a date last night, but we have no chemistry.",
    "example_vi": "Nếu bạn học chuyên ngành hóa học, bạn vẫn cần học toán và vật lý.\nTối qua tôi có đi hẹn hò, nhưng giữa chúng tôi không có sự hòa hợp cảm xúc."
  },
  {
    "word_number": 260,
    "word": "Colleague",
    "example_en": "He stole the work of his colleague and published it himself.\nI love drinking beer with my colleagues after work.",
    "example_vi": "Anh ta đã đánh cắp tác phẩm của đồng nghiệp và tự mình xuất bản.\nTôi thích uống bia cùng các đồng nghiệp sau giờ làm việc."
  },
  {
    "word_number": 261,
    "word": "College",
    "example_en": "Some students think college is for partying.\nI applied to ten colleges and was accepted to six.",
    "example_vi": "Một số sinh viên nghĩ rằng đại học cao đẳng chỉ để tiệc tùng.\nTôi đã nộp đơn vào mười trường cao đẳng/đại học và được sáu trường nhận."
  },
  {
    "word_number": 262,
    "word": "Commensurate",
    "example_en": "You should receive a commensurate salary considering how talented you are.\nSerious problems need commensurate solutions.",
    "example_vi": "Bạn xứng đáng nhận được mức lương tương xứng với tài năng của mình.\nNhững vấn đề nghiêm trọng cần có những giải pháp tương xứng."
  },
  {
    "word_number": 263,
    "word": "Committee",
    "example_en": "The committee will decide your punishment.\nWe need a special committee to investigate the crimes of the president.",
    "example_vi": "Ủy ban sẽ quyết định hình phạt dành cho bạn.\nChúng ta cần một ủy ban đặc biệt để điều tra các tội danh của tổng thống."
  },
  {
    "word_number": 264,
    "word": "Council",
    "example_en": "She was voted onto the city council.\nThe top council is responsible for accepting or rejecting applicants.",
    "example_vi": "Cô ấy đã được bầu vào hội đồng thành phố.\nHội đồng cấp cao chịu trách nhiệm chấp nhận hoặc từ chối các ứng viên."
  },
  {
    "word_number": 265,
    "word": "Department",
    "example_en": "The psychology department is known for its tough classes.\nMany people think the department of fine arts is a joke, but it's not.",
    "example_vi": "Khoa tâm lý học nổi tiếng với những lớp học rất khó.\nNhiều người nghĩ khoa mỹ thuật là trò đùa, nhưng không phải vậy."
  },
  {
    "word_number": 266,
    "word": "Diploma",
    "example_en": "I officially received my diploma.\nAre diplomas even valuable nowadays?",
    "example_vi": "Tôi đã chính thức nhận được tấm bằng chứng chỉ tốt nghiệp của mình.\nNgày nay những tấm bằng chứng chỉ có thực sự có giá trị không?"
  },
  {
    "word_number": 267,
    "word": "Graduate",
    "example_en": "I graduated from Oxford University.\nWhen do you graduate?",
    "example_vi": "Tôi đã tốt nghiệp Đại học Oxford.\nKhi nào thì bạn tốt nghiệp?"
  },
  {
    "word_number": 268,
    "word": "Handout",
    "example_en": "\"Please take a look at the handout,\" said the teacher.\nI need to get all the handouts printed put before the class.",
    "example_vi": "\"Làm ơn hãy xem tài liệu phát tay,\" giáo viên nói.\nTôi cần phải in xong tất cả tài liệu trước giờ vào lớp."
  },
  {
    "word_number": 269,
    "word": "Honor",
    "example_en": "She graduated with the highest honors.\nIt is an honor to accept this award.",
    "example_vi": "Cô ấy đã tốt nghiệp với tấm bằng danh dự cao quý nhất.\nThật là một niềm vinh dự khi nhận giải thưởng này."
  },
  {
    "word_number": 270,
    "word": "Institute",
    "example_en": "This is the oldest science institute in the country.\nThe institute of astronomy has done a lot of research about our solar system.",
    "example_vi": "Đây là viện khoa học lâu đời nhất trong cả nước.\nViện thiên văn học đã thực hiện rất nhiều nghiên cứu về hệ mặt trời."
  },
  {
    "word_number": 271,
    "word": "Merit",
    "example_en": "I only look at your merit. I don't care who your father is.\nThis scholarship is based on merit.",
    "example_vi": "Tôi chỉ nhìn vào phẩm chất xứng đáng của bạn. Tôi không quan tâm cha bạn là ai.\nHọc bổng này được trao dựa trên sự xứng đáng và năng lực."
  },
  {
    "word_number": 272,
    "word": "Outline",
    "example_en": "The professor outlined the format of the exam.\nHe outlined the structure of a human cell.",
    "example_vi": "Giáo sư đã phác thảo cấu trúc của bài kiểm tra.\nAnh ấy đã phác thảo cấu trúc của một tế bào người."
  },
  {
    "word_number": 273,
    "word": "Philosophy",
    "example_en": "I disagree with your life philosophy.\nShe studied great works of philosophy in her free time.",
    "example_vi": "Tôi không đồng tình với triết lý sống của bạn.\nCô ấy nghiên cứu những tác phẩm triết học vĩ đại vào thời gian rảnh."
  },
  {
    "word_number": 274,
    "word": "Prerequisite",
    "example_en": "Algebra is a prerequisite for calculus.\nI can't take this class. I haven't completed the prerequisites.",
    "example_vi": "Đại số là môn học điều kiện tiên quyết đối với môn giải tích.\nTôi không thể học lớp này. Tôi chưa hoàn thành các môn điều kiện tiên quyết."
  },
  {
    "word_number": 275,
    "word": "Qualify",
    "example_en": "You qualify for extra help.\nSorry, you don't qualify for financial aid.",
    "example_vi": "Bạn đủ điều kiện để nhận thêm sự trợ giúp.\nXin lỗi, bạn không đủ tiêu chuẩn để nhận hỗ trợ tài chính."
  },
  {
    "word_number": 276,
    "word": "Research",
    "example_en": "This is very consequential research.\nI found his research a bit boring.",
    "example_vi": "Đây là một công trình nghiên cứu có tầm ảnh hưởng rất lớn.\nTôi thấy công trình nghiên cứu của anh ấy hơi nhàm chán."
  },
  {
    "word_number": 277,
    "word": "Seminar",
    "example_en": "I will present at the seminar of physicists.\nDid you attend Dr. Howard's chemistry seminar?",
    "example_vi": "Tôi sẽ thuyết trình tại hội nghị chuyên đề của các nhà vật lý học.\nBạn có tham dự hội nghị chuyên đề hóa học của Tiến sĩ Howard không?"
  },
  {
    "word_number": 278,
    "word": "Summary",
    "example_en": "We need a summary document about the car crash.\nThis is a summary seminar that will describe all past research.",
    "example_vi": "Chúng ta cần một tài liệu tóm tắt về vụ tai nạn xe hơi.\nĐây là một buổi hội nghị tóm tắt để mô tả lại toàn bộ các nghiên cứu trước đây."
  },
  {
    "word_number": 279,
    "word": "Terms",
    "example_en": "We will do this under my terms.\nI have two more terms to complete until I graduate.",
    "example_vi": "Chúng ta sẽ làm việc này theo các điều khoản của tôi.\nTôi còn hai học kỳ nữa phải hoàn thành trước khi tốt nghiệp."
  },
  {
    "word_number": 280,
    "word": "Thesis",
    "example_en": "Her thesis described a new method of extracted iron from rocks.\nI'm so stressed to complete my thesis.",
    "example_vi": "Bản luận án của cô ấy mô tả một phương pháp mới để chiết xuất sắt từ đá.\nTôi đang rất căng thẳng để hoàn thành bài luận án của mình."
  },
  {
    "word_number": 281,
    "word": "Tutor",
    "example_en": "My mom hired a tutor because I was failing math.\nI became a tutor so I could earn some extra money.",
    "example_vi": "Mẹ tôi đã thuê một gia sư vì tôi học môn toán bị kém.\nTôi đã làm gia sư để có thể kiếm thêm một ít tiền."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT10_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 10 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 10 trong hacknao_vocab.json!`);
