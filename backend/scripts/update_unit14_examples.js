import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 27 từ vựng của Unit 14 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 138 -> 142)
const UNIT14_WORDS_UPDATES = [
  {
    "word_number": 366,
    "word": "Abolish",
    "example_en": "Some states abolished the death penalty already.\nSlavery was abolished in the US, but racism still exists.",
    "example_vi": "Một số bang đã bãi bỏ án tử hình rồi.\nChế độ nô lệ đã bị bãi bỏ ở Mỹ, nhưng nạn phân biệt chủng tộc vẫn còn tồn tại."
  },
  {
    "word_number": 367,
    "word": "Accomplish",
    "example_en": "You have accomplished a lot already.\nFocus on what you accomplished, not the mistakes you've made.",
    "example_vi": "Bạn đã hoàn thành/đạt được rất nhiều điều rồi đấy.\nHãy tập trung vào những gì bạn đã đạt được, chứ không phải những sai lầm bạn đã mắc phải."
  },
  {
    "word_number": 368,
    "word": "Agenda",
    "example_en": "Everyone knew she had a secret agenda.\nWe should note down all the important information in the meeting agenda.",
    "example_vi": "Mọi người đều biết cô ấy có một mục đích bí mật.\nChúng ta nên ghi lại tất cả các thông tin quan trọng trong chương trình nghị sự của cuộc họp."
  },
  {
    "word_number": 369,
    "word": "Aspire",
    "example_en": "I aspire to be a famous comedian.\nMy mom always thought I should aspire to something more, but I love being a waiter.",
    "example_vi": "Tôi khao khát trở thành một diễn viên hài nổi tiếng.\nMẹ tôi luôn nghĩ tôi nên hướng tới điều gì đó cao hơn, nhưng tôi yêu công việc bồi bàn."
  },
  {
    "word_number": 370,
    "word": "Assess",
    "example_en": "Assess the situation before making any quick decisions!\nThis exam will assess your math proficiency.",
    "example_vi": "Hãy đánh giá tình hình trước khi đưa ra bất kỳ quyết định vội vàng nào!\nKỳ thi này sẽ đánh giá năng lực toán học của bạn."
  },
  {
    "word_number": 371,
    "word": "Authorize",
    "example_en": "I'm leaving for two weeks, and I authorize you to lead the project until I return.\nIt's time to authorize another attack.",
    "example_vi": "Tôi sẽ đi trong hai tuần, và tôi ủy quyền cho bạn lãnh đạo dự án cho đến khi tôi trở lại.\nĐã đến lúc cho phép một cuộc tấn công khác."
  },
  {
    "word_number": 372,
    "word": "Cater",
    "example_en": "This restaurant caters to vegetarians.\nHe catered to her emotions.",
    "example_vi": "Nhà hàng này phục vụ cho người ăn chay.\nAnh ấy đã chiều chuộng cảm xúc của cô ấy."
  },
  {
    "word_number": 373,
    "word": "Collaborate",
    "example_en": "We're collaborating with a Japanese company.\nMusicians often collaborate to make a special sound.",
    "example_vi": "Chúng tôi đang hợp tác với một công ty Nhật Bản.\nCác nhạc sĩ thường cộng tác với nhau để tạo ra âm thanh đặc biệt."
  },
  {
    "word_number": 374,
    "word": "Collocate",
    "example_en": "His music collocates with the theme of the party.\nStudents collocate with teachers.",
    "example_vi": "Âm nhạc của anh ấy rất ăn khớp với chủ đề của bữa tiệc.\nHọc sinh được xếp cùng một chỗ với giáo viên."
  },
  {
    "word_number": 375,
    "word": "Compensate",
    "example_en": "I'll compensate you generously for your work.\nAren't you going to compensate me for the damage you caused?",
    "example_vi": "Tôi sẽ đền đáp/trả thù lao hậu hĩnh cho công việc của bạn.\nBạn không định bồi thường cho tôi về thiệt hại mà bạn đã gây ra sao?"
  },
  {
    "word_number": 376,
    "word": "Complicated",
    "example_en": "Our relationship is complicated at the moment.\nPhysics is so complicated, but I love studying it.",
    "example_vi": "Mối quan hệ của chúng tôi hiện tại đang rất phức tạp.\nVật lý rất phức tạp, nhưng tôi thích học môn này."
  },
  {
    "word_number": 377,
    "word": "Compromise",
    "example_en": "Don't compromise our location! Be silent.\nI'll send a representative to compromise.",
    "example_vi": "Đừng làm lộ vị trí của chúng ta! Hãy im lặng.\nTôi sẽ cử một đại diện đến để thỏa hiệp."
  },
  {
    "word_number": 378,
    "word": "Contribute",
    "example_en": "He contributes thousands of dollars to the Conservative Party.\nI think the pollution contributes to my feeling tired.",
    "example_vi": "Ông ấy đóng góp hàng ngàn đô la cho Đảng Bảo thủ.\nTôi nghĩ sự ô nhiễm môi trường góp phần làm tôi cảm thấy mệt mỏi."
  },
  {
    "word_number": 379,
    "word": "Cooperate",
    "example_en": "We should cooperate to finish more quickly.\nI can't cooperate with my brother.",
    "example_vi": "Chúng ta nên hợp tác để hoàn thành nhanh hơn.\nTôi không thể hợp tác với anh trai của mình."
  },
  {
    "word_number": 380,
    "word": "Coordinate",
    "example_en": "We'll coordinate our flights to land at the same time.\nThese exhibits were coordinated by experts from my university.",
    "example_vi": "Chúng tôi sẽ phối hợp các chuyến bay để hạ cánh cùng một lúc.\nCác buổi triển lãm này đã được điều phối bởi các chuyên gia từ trường đại học của tôi."
  },
  {
    "word_number": 381,
    "word": "Corporation",
    "example_en": "Our corporation is now the biggest in South America.\nCorporations make big donations to politicians.",
    "example_vi": "Tập đoàn của chúng tôi hiện là lớn nhất ở Nam Mỹ.\nCác tập đoàn đóng góp những khoản quyên góp lớn cho các chính trị gia."
  },
  {
    "word_number": 382,
    "word": "Correspond",
    "example_en": "Each mark on the screen corresponds to a different company location.\nOur schedules don't correspond well.",
    "example_vi": "Mỗi dấu trên màn hình tương ứng với một địa điểm công ty khác nhau.\nLịch trình của chúng tôi không khớp nhau lắm."
  },
  {
    "word_number": 383,
    "word": "Dedicate",
    "example_en": "He dedicated his whole life to the work.\nShe dedicates her life to her children and her work and has little time for herself.",
    "example_vi": "Ông ấy đã cống hiến cả cuộc đời mình cho công việc.\nCô ấy cống hiến cuộc đời cho con cái và công việc nên có rất ít thời gian cho bản thân."
  },
  {
    "word_number": 384,
    "word": "Deliberate",
    "example_en": "I want to deliberate with my coworkers before I decide.\nFeel free to take a moment to deliberate!",
    "example_vi": "Tôi muốn cân nhắc thảo luận kỹ với các đồng nghiệp trước khi đưa ra quyết định.\nCứ tự nhiên dành chút thời gian để cân nhắc nhé!"
  },
  {
    "word_number": 385,
    "word": "Desire",
    "example_en": "I never desired something so much until now.\nI desire to become a businessman.",
    "example_vi": "Chưa bao giờ tôi khao khát một điều gì nhiều như bây giờ.\nTôi mong muốn trở thành một doanh nhân."
  },
  {
    "word_number": 386,
    "word": "Devote",
    "example_en": "I've devoted my life to becoming a great chef.\nThe CEO was very devoted to his work.",
    "example_vi": "Tôi đã dành cả cuộc đời mình để trở thành một đầu bếp cừ khôi.\nVị Giám đốc điều hành đã rất tận tâm cống hiến cho công việc của mình."
  },
  {
    "word_number": 387,
    "word": "Opportunity",
    "example_en": "Few people will ever get this opportunity.\nThis is a good opportunity to meet people who work in your field.",
    "example_vi": "Rất ít người có cơ hội như thế này.\nĐây là một cơ hội tốt để gặp gỡ những người làm việc trong lĩnh vực của bạn."
  },
  {
    "word_number": 388,
    "word": "Remote",
    "example_en": "I own a house on a remote island in the Pacific Ocean.\nThere's not even a remote chance that this will work.",
    "example_vi": "Tôi sở hữu một ngôi nhà trên một hòn đảo xa xôi ở Thái Bình Dương.\nThậm chí chẳng có một cơ hội mong manh nào để việc này thành công."
  },
  {
    "word_number": 389,
    "word": "Resign",
    "example_en": "I want to tell you that I will resign permanently.\nAfter the newspaper published the story, the CEO resigned.",
    "example_vi": "Tôi muốn nói với bạn rằng tôi sẽ từ chức vĩnh viễn.\nSau khi tờ báo đăng bài viết, vị Tổng giám đốc đã từ chức."
  },
  {
    "word_number": 390,
    "word": "Responsible",
    "example_en": "I have a lot of responsible employees in my company.\nThe ideal candidate is responsible, organized, and friendly.",
    "example_vi": "Tôi có rất nhiều nhân viên có tinh thần trách nhiệm trong công ty của mình.\nỨng viên lý tưởng là người có tinh thần trách nhiệm, ngăn nắp và thân thiện."
  },
  {
    "word_number": 391,
    "word": "Specialize",
    "example_en": "Do you know anyone who specializes in jet engines?\nThe position requires someone who specializes in social media advertising.",
    "example_vi": "Bạn có biết ai chuyên về động cơ phản lực không?\nVị trí này đòi hỏi một người chuyên môn hóa về quảng cáo trên mạng xã hội."
  },
  {
    "word_number": 392,
    "word": "Unemployment",
    "example_en": "The rate of unemployment has decreased to only 4.5% of adults.\nOur new policies will focus on unemployment and education.",
    "example_vi": "Tỷ lệ thất nghiệp đã giảm xuống chỉ còn 4,5% ở người trưởng thành.\nCác chính sách mới của chúng tôi sẽ tập trung vào vấn đề thất nghiệp và giáo dục."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT14_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 14 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 14 trong hacknao_vocab.json!`);
