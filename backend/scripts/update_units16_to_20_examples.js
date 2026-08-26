import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Toàn bộ 124 từ vựng của Unit 16 đến Unit 20 với đầy đủ ít nhất 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc
const UNITS_16_TO_20_UPDATES = [
  // ==========================================
  // UNIT 16: Personality & Appearance 2 (25 từ)
  // ==========================================
  {
    "word_number": 418,
    "word": "Blond",
    "example_en": "I have blond hair now.\nDo you prefer blond hair or brunette?",
    "example_vi": "Bây giờ tôi có mái tóc màu vàng hoe.\nBạn thích tóc vàng hoe hơn hay tóc màu nâu đen hơn?"
  },
  {
    "word_number": 419,
    "word": "Careful",
    "example_en": "Be careful while driving down the mountain!\nShe's always careful when walking across the street.",
    "example_vi": "Hãy cẩn thận khi lái xe xuống núi!\nCô ấy luôn cẩn thận khi đi bộ qua đường."
  },
  {
    "word_number": 420,
    "word": "Cheer",
    "example_en": "There was a loud cheer.\nDuring the holidays I feel the most cheer.",
    "example_vi": "Đã có một tiếng reo hò cổ vũ rất lớn.\nTrong những ngày nghỉ lễ tôi cảm thấy vui vẻ nhất."
  },
  {
    "word_number": 421,
    "word": "Childhood",
    "example_en": "I miss my childhood.\nYou shouldn't waste your childhood worrying about everything.",
    "example_vi": "Tôi nhớ thời thơ ấu của mình.\nBạn không nên lãng phí thời thơ ấu vào việc lo lắng về mọi thứ."
  },
  {
    "word_number": 422,
    "word": "Conscious",
    "example_en": "I'm so tired, I'm barely conscious.\nShe's very conscious of other peoples' emotions.",
    "example_vi": "Tôi quá mệt mỏi, tôi hầu như không còn tỉnh táo.\nCô ấy rất có ý thức và nhạy cảm với cảm xúc của người khác."
  },
  {
    "word_number": 423,
    "word": "Courtesy",
    "example_en": "Won't you do me the courtesy of picking me up?\nIt's just a kind courtesy to open the door for other people.",
    "example_vi": "Bạn có thể làm ơn lịch sự đến đón tôi được không?\nMở cửa cho người khác chỉ là một phép lịch sự nhã nhặn tốt đẹp thôi."
  },
  {
    "word_number": 424,
    "word": "Coward",
    "example_en": "Just ask me, you coward!\nI try to be confident, but when I need to act I turn into a coward.",
    "example_vi": "Cứ hỏi tôi đi, đồ nhát gan!\nTôi cố gắng tự tin, nhưng khi cần hành động tôi lại biến thành kẻ nhát gan."
  },
  {
    "word_number": 425,
    "word": "Experience",
    "example_en": "Traveling abroad was the greatest experience of my life.\nI don't regret the relationship. It was a valuable experience.",
    "example_vi": "Đi du lịch nước ngoài là trải nghiệm tuyệt vời nhất trong cuộc đời tôi.\nTôi không hối tiếc về mối quan hệ đó. Đó là một trải nghiệm quý giá."
  },
  {
    "word_number": 426,
    "word": "Expert",
    "example_en": "Most experts agree about climate change.\nI'm not an expert in engineering, but I don't think you should use glue to fix your car window.",
    "example_vi": "Hầu hết các chuyên gia đều đồng ý về vấn đề biến đổi khí hậu.\nTôi không phải chuyên gia kỹ thuật, nhưng tôi không nghĩ bạn nên dùng keo dán cửa sổ xe."
  },
  {
    "word_number": 427,
    "word": "Familiar",
    "example_en": "You look familiar! Do I know you?\nI saw a lot of familiar faces, but I didn't see any close friends.",
    "example_vi": "Bạn trông quen quen! Tôi có biết bạn không nhỉ?\nTôi thấy rất nhiều gương mặt quen thuộc, nhưng không thấy bạn thân nào."
  },
  {
    "word_number": 428,
    "word": "Generous",
    "example_en": "Some generous billionaires donate money to our organization.\nMy mother taught me to be generous.",
    "example_vi": "Một số tỷ phú hào phóng quyên góp tiền cho tổ chức của chúng tôi.\nMẹ dạy tôi phải sống thật hào phóng."
  },
  {
    "word_number": 429,
    "word": "Grateful",
    "example_en": "I'm so grateful to my parents for raising me.\nShe was so grateful for his kindness.",
    "example_vi": "Tôi rất biết ơn cha mẹ đã nuôi nấng tôi nên người.\nCô ấy vô cùng biết ơn lòng tốt của anh ấy."
  },
  {
    "word_number": 430,
    "word": "Humor",
    "example_en": "Just humor me, okay?\nI'll join your club, but only to humor you.",
    "example_vi": "Cứ chiều theo ý tôi một lần được không?\nTôi sẽ tham gia câu lạc bộ, nhưng chỉ để làm bạn vui lòng thôi."
  },
  {
    "word_number": 431,
    "word": "Idiot",
    "example_en": "That idiot forgot his keys inside the house!\nMy brother is the biggest idiot I know.",
    "example_vi": "Tên ngốc đó đã để quên chìa khóa bên trong nhà rồi!\nAnh trai tôi là kẻ ngốc nghếch nhất mà tôi từng biết."
  },
  {
    "word_number": 432,
    "word": "Innocent",
    "example_en": "The police sent him to prison, but he was innocent.\nIf you are innocent why can't you look me in the eyes?",
    "example_vi": "Cảnh sát đã tống anh ta vào tù, nhưng anh ta vô tội.\nNếu bạn vô tội thì tại sao bạn không thể nhìn thẳng vào mắt tôi?"
  },
  {
    "word_number": 433,
    "word": "Intelligent",
    "example_en": "Google only hires the most intelligent students.\nI need my partner to be intelligent, funny, and outgoing.",
    "example_vi": "Google chỉ tuyển dụng những sinh viên thông minh nhất.\nTôi cần đối tác của mình phải thông minh, hài hước và cởi mở."
  },
  {
    "word_number": 434,
    "word": "Mature",
    "example_en": "I need to be with someone who is more mature.\nYou have become such a mature young man!",
    "example_vi": "Tôi cần ở bên một người chín chắn trưởng thành hơn.\nBạn đã trở thành một chàng trai trẻ thật trưởng thành!"
  },
  {
    "word_number": 435,
    "word": "Miserable",
    "example_en": "I feel so miserable, I think I'm just going to go to sleep.\nHow can you be miserable in this beautiful city?",
    "example_vi": "Tôi cảm thấy quá đau khổ, tôi nghĩ tôi chỉ muốn đi ngủ thôi.\nLàm sao bạn có thể cảm thấy đau khổ ở thành phố tuyệt đẹp này chứ?"
  },
  {
    "word_number": 436,
    "word": "Neat",
    "example_en": "What a neat house you have!\nMake sure your room is neat when Aunt Karen comes!",
    "example_vi": "Bạn có một ngôi nhà thật gọn gàng ngăn nắp!\nHãy chắc chắn rằng phòng của bạn thật gọn gàng khi dì Karen đến nhé!"
  },
  {
    "word_number": 437,
    "word": "Silly",
    "example_en": "My dad's clothes are so silly.\nI make silly faces so my baby will stop crying.",
    "example_vi": "Quần áo của bố tôi thật ngớ ngẩn.\nTôi làm những bộ mặt ngớ ngẩn để em bé ngừng khóc."
  },
  {
    "word_number": 438,
    "word": "Skill",
    "example_en": "Her unique skills make her a good candidate for the job.\nI wish I learned more computer skills in college.",
    "example_vi": "Những kỹ năng độc đáo giúp cô ấy trở thành ứng viên tốt cho công việc.\nTôi ước mình đã học thêm nhiều kỹ năng máy tính ở đại học."
  },
  {
    "word_number": 439,
    "word": "Strict",
    "example_en": "My parents are so strict, they don't even let me stay out past 9:30pm.\nThe drug laws in this country are very strict.",
    "example_vi": "Bố mẹ tôi nghiêm khắc đến mức thậm chí không cho tôi ở ngoài đường quá 9:30 tối.\nLuật chống ma túy ở quốc gia này rất nghiêm ngặt."
  },
  {
    "word_number": 440,
    "word": "Talented",
    "example_en": "She is a talented young artist.\nHe is talented at playing multiple musical instruments.",
    "example_vi": "Cô ấy là một nghệ sĩ trẻ đầy tài năng.\nAnh ấy có tài chơi nhiều loại nhạc cụ khác nhau."
  },
  {
    "word_number": 441,
    "word": "Tough",
    "example_en": "It was a tough decision to make.\nHe put on a tough face during the difficult negotiations.",
    "example_vi": "Đó là một quyết định vô cùng khó khăn.\nAnh ấy giữ vẻ mặt cứng rắn trong suốt cuộc đàm phán khó khăn."
  },
  {
    "word_number": 442,
    "word": "Ugly",
    "example_en": "The caterpillar will turn into a beautiful butterfly.\nThat is the ugliest shirt I have ever seen.",
    "example_vi": "Con sâu bướm xấu xí sẽ hóa thành chú bướm xinh đẹp.\nĐó là chiếc áo sơ mi xấu xí nhất mà tôi từng thấy."
  },

  // ==========================================
  // UNIT 17: Personality & Appearance 3 (25 từ)
  // ==========================================
  {
    "word_number": 443,
    "word": "Adorable",
    "example_en": "You have such an adorable puppy.\nYour accent is adorable.",
    "example_vi": "Bạn có một chú cún con thật đáng yêu.\nGiọng điệu của bạn thật đáng yêu."
  },
  {
    "word_number": 444,
    "word": "Adult",
    "example_en": "You're an adult so you should make the decision yourself.\nI never want to be an adult.",
    "example_vi": "Bạn là người trưởng thành nên hãy tự mình đưa ra quyết định.\nTôi không bao giờ muốn trở thành người lớn."
  },
  {
    "word_number": 445,
    "word": "Anger",
    "example_en": "He could not control his anger.\nWhen I drink, I always feel a bit of anger.",
    "example_vi": "Anh ấy đã không thể kiểm soát được cơn tức giận của mình.\nKhi uống rượu, tôi luôn cảm thấy một chút phẫn nộ trong lòng."
  },
  {
    "word_number": 446,
    "word": "Anxiety",
    "example_en": "I don't drink coffee, it sometimes gives me anxiety.\nI take some medicine to help control my anxiety.",
    "example_vi": "Tôi không uống cà phê, thỉnh thoảng nó làm tôi lo lắng bồn chồn.\nTôi dùng một ít thuốc để kiểm soát chứng lo âu của mình."
  },
  {
    "word_number": 447,
    "word": "Apprehensive",
    "example_en": "She was feeling a little apprehensive about the plan.\nDon't be apprehensive, just do it!",
    "example_vi": "Cô ấy cảm thấy hơi lo lắng về kế hoạch này.\nĐừng lo lắng, cứ làm đi!"
  },
  {
    "word_number": 448,
    "word": "Beard",
    "example_en": "I love men with beards.\nI can't grow a beard no matter how long I wait.",
    "example_vi": "Tôi thích những người đàn ông có râu.\nTôi không thể để râu dù tôi có đợi bao lâu đi nữa."
  },
  {
    "word_number": 449,
    "word": "Beginner",
    "example_en": "Could you give some advice to the beginners?\nThis level is for beginners.",
    "example_vi": "Bạn có thể cho người mới bắt đầu vài lời khuyên không?\nCấp độ này dành cho những người mới bắt đầu."
  },
  {
    "word_number": 450,
    "word": "Behavior",
    "example_en": "Make sure you are on your best behavior!\nYour behavior is unacceptable.",
    "example_vi": "Hãy đảm bảo bạn cư xử thật đúng mực nhé!\nCách cư xử của bạn là không thể chấp nhận được."
  },
  {
    "word_number": 451,
    "word": "Conservative",
    "example_en": "I don't want to be friend with him because he's really conservative.\nHe had many conservative opinions about sex.",
    "example_vi": "Tôi không muốn làm bạn với anh ta vì anh ta rất bảo thủ.\nAnh ấy có nhiều quan điểm bảo thủ về giới tính."
  },
  {
    "word_number": 452,
    "word": "Nervous",
    "example_en": "I was so nervous before my chemistry exam.\nYou look nervous, is everything okay?",
    "example_vi": "Tôi đã rất lo lắng trước kỳ thi hóa học.\nTrông bạn có vẻ lo lắng, mọi chuyện vẫn ổn chứ?"
  },
  {
    "word_number": 453,
    "word": "Panic",
    "example_en": "I was feeling pretty panic earlier, but my girlfriend helped me.\nSome animals can comfort people who are feeling panic.",
    "example_vi": "Lúc nãy tôi cảm thấy khá hoảng sợ, nhưng bạn gái đã giúp tôi.\nMột số loài động vật có thể an ủi những người đang cảm thấy hoảng sợ."
  },
  {
    "word_number": 454,
    "word": "Perfume",
    "example_en": "I still remember her perfume.\nThe perfume smelled like flowers and cinnamon.",
    "example_vi": "Tôi vẫn còn nhớ mùi nước hoa của cô ấy.\nNước hoa có mùi thơm như hoa và quế."
  },
  {
    "word_number": 455,
    "word": "Personnel",
    "example_en": "We need more personnel to complete the construction on time.\nOnly authorized personnel can come in here.",
    "example_vi": "Chúng ta cần thêm nhân sự để hoàn thành công trình đúng hạn.\nChỉ có nhân viên được ủy quyền mới có thể vào đây."
  },
  {
    "word_number": 456,
    "word": "Reliable",
    "example_en": "You need a reliable vehicle for this delivery position.\nOur most reliable customer doesn't even shop here anymore.",
    "example_vi": "Bạn cần một phương tiện đáng tin cậy cho vị trí giao hàng này.\nKhách hàng đáng tin cậy nhất của chúng tôi thậm chí không còn mua sắm ở đây nữa."
  },
  {
    "word_number": 457,
    "word": "Selfish",
    "example_en": "That's a selfish opinion to have.\nSome people say I'm selfish, but I think I am just being strong and confident.",
    "example_vi": "Đó là một quan điểm thật ích kỷ.\nMột số người nói tôi ích kỷ, nhưng tôi nghĩ mình chỉ đang mạnh mẽ và tự tin thôi."
  },
  {
    "word_number": 458,
    "word": "Sense",
    "example_en": "She has a good sense of smell.\nKids these days have no common sense.",
    "example_vi": "Cô ấy có khứu giác rất nhạy bén.\nTrẻ con thời nay chẳng có chút hiểu biết thông thường nào cả."
  },
  {
    "word_number": 459,
    "word": "Sensible",
    "example_en": "That's a sensible decision.\nThere must be a more sensible method.",
    "example_vi": "Đó là một quyết định thấu tình đạt lý/hợp lý.\nChắc chắn phải có một phương pháp hợp lý hơn."
  },
  {
    "word_number": 460,
    "word": "Serious",
    "example_en": "Why do you look so serious?\nIt's informal, no need to be serious.",
    "example_vi": "Sao trông bạn nghiêm túc thế?\nĐây là buổi gặp mặt thân mật, không cần phải nghiêm túc quá đâu."
  },
  {
    "word_number": 461,
    "word": "Spirit",
    "example_en": "You need to have more spirit for your country.\nWe showed our school spirit by wearing blue and white.",
    "example_vi": "Bạn cần có nhiều tinh thần yêu nước hơn.\nChúng tôi đã thể hiện tinh thần của trường bằng cách mặc đồ xanh và trắng."
  },
  {
    "word_number": 462,
    "word": "Stubborn",
    "example_en": "He is stubborn as a stone.\nDon't be stubborn, listen to what I say!",
    "example_vi": "Anh ấy bướng bỉnh như một tảng đá.\nĐừng bướng bỉnh nữa, hãy nghe những gì tôi nói đi!"
  },
  {
    "word_number": 463,
    "word": "Upset",
    "example_en": "She was upset about the bad news.\nWhy are you getting so upset over nothing?",
    "example_vi": "Cô ấy buồn bực về tin xấu.\nTại sao bạn lại cảm thấy khó chịu vì một chuyện không đâu chứ?"
  },
  {
    "word_number": 464,
    "word": "Vivid",
    "example_en": "I have vivid memories of our trip.\nThe artist used vivid colors for the painting.",
    "example_vi": "Tôi có những ký ức sống động về chuyến đi của chúng tôi.\nHọa sĩ đã sử dụng những gam màu sống động cho bức tranh."
  },
  {
    "word_number": 465,
    "word": "Wisdom",
    "example_en": "Give me your wisdom!\nWhen you are older, you will have more wisdom.",
    "example_vi": "Hãy truyền cho tôi sự thông thái của bạn đi!\nKhi bạn lớn tuổi hơn, bạn sẽ có nhiều sự sáng suốt thông thái hơn."
  },
  {
    "word_number": 466,
    "word": "Wise",
    "example_en": "Wise people know how to avoid violence.\nI think that's a wise choice.",
    "example_vi": "Những người khôn ngoan luôn biết cách tránh xa bạo lực.\nTôi nghĩ đó là một sự lựa chọn khôn ngoan."
  },
  {
    "word_number": 467,
    "word": "Witty",
    "example_en": "He makes such witty jokes.\nThe dialogue in this movie is so witty.",
    "example_vi": "Anh ấy kể những câu chuyện đùa thật dí dỏm.\nLời thoại trong bộ phim này thật dí dỏm."
  },

  // ==========================================
  // UNIT 18: Home 1 (27 từ)
  // ==========================================
  {
    "word_number": 468,
    "word": "Apartment",
    "example_en": "My uncle owns a luxury apartment in New York City.\nI wouldn't pay a lot for this old apartment.",
    "example_vi": "Chú tôi sở hữu một căn hộ cao cấp sang trọng ở thành phố New York.\nTôi sẽ không trả nhiều tiền cho căn hộ cũ này đâu."
  },
  {
    "word_number": 469,
    "word": "Balcony",
    "example_en": "Don't fall off the balcony!\nShe loves to read on the balcony.",
    "example_vi": "Đừng để bị ngã khỏi ban công nhé!\nCô ấy thích đọc sách ngoài ban công."
  },
  {
    "word_number": 470,
    "word": "Bench",
    "example_en": "Let's sit on the bench and watch the birds!\nI bought a good bench to do my exercise.",
    "example_vi": "Hãy ngồi trên băng ghế và ngắm nhìn những chú chim nào!\nTôi đã mua một băng ghế tốt để tập thể dục."
  },
  {
    "word_number": 471,
    "word": "Blanket",
    "example_en": "We snuggled under the blanket.\nSome people don't need blankets to sleep.",
    "example_vi": "Chúng tôi cuộn tròn ấm áp dưới tấm chăn.\nMột số người không cần chăn mền khi ngủ."
  },
  {
    "word_number": 472,
    "word": "Border",
    "example_en": "They build a fence around the border of their house.\nWe must protect our borders.",
    "example_vi": "Họ xây hàng rào xung quanh ranh giới ngôi nhà của họ.\nChúng ta phải bảo vệ biên giới của mình."
  },
  {
    "word_number": 473,
    "word": "Brick",
    "example_en": "My house is made of bricks.\nBricks are much better for storms than wood.",
    "example_vi": "Ngôi nhà của tôi được xây bằng gạch.\nGạch chống chọi bão tốt hơn nhiều so với gỗ."
  },
  {
    "word_number": 474,
    "word": "Carpet",
    "example_en": "The cat destroyed the new carpet.\nI replaced the carpet with wood.",
    "example_vi": "Con mèo đã cào hỏng tấm thảm mới.\nTôi đã thay tấm thảm bằng sàn gỗ."
  },
  {
    "word_number": 475,
    "word": "Curtain",
    "example_en": "These curtains are old and smelly.\nI prefer modern curtains for the windows.",
    "example_vi": "Những tấm rèm cửa này đã cũ và có mùi khó chịu.\nTôi thích rèm cửa hiện đại cho các cửa sổ hơn."
  },
  {
    "word_number": 476,
    "word": "Faucet",
    "example_en": "The faucet broke so I called a mechanic.\nYou can drink from the faucet, it's safe.",
    "example_vi": "Vòi nước bị hỏng nên tôi đã gọi thợ sửa chữa.\nBạn có thể uống nước trực tiếp từ vòi, nó an toàn đấy."
  },
  {
    "word_number": 477,
    "word": "Fence",
    "example_en": "I installed a fence to keep my pets inside.\nThis fence really makes me feel at home.",
    "example_vi": "Tôi đã lắp hàng rào để giữ thú cưng ở trong sân.\nHàng rào này thực sự khiến tôi cảm thấy như đang ở nhà."
  },
  {
    "word_number": 478,
    "word": "Furniture",
    "example_en": "It's a beautiful house, but it needs new furniture.\nCould you help me move my furniture?",
    "example_vi": "Đó là một ngôi nhà đẹp, nhưng cần có đồ đạc nội thất mới.\nBạn có thể giúp tôi chuyển đồ đạc được không?"
  },
  {
    "word_number": 479,
    "word": "Laundry",
    "example_en": "Don't forget to do the laundry!\nWhere is the room for laundry?",
    "example_vi": "Đừng quên giặt quần áo đấy nhé!\nPhòng giặt đồ ở đâu vậy?"
  },
  {
    "word_number": 480,
    "word": "Lobby",
    "example_en": "I'll meet you in the lobby.\nGuests love to relax in the main lobby.",
    "example_vi": "Tôi sẽ gặp bạn ở tiền sảnh.\nKhách rất thích thư giãn ở sảnh chính."
  },
  {
    "word_number": 481,
    "word": "Mirror",
    "example_en": "I've got a large mirror in my bedroom.\nMy toothbrush is under the mirror.",
    "example_vi": "Tôi có một chiếc gương lớn trong phòng ngủ.\nBàn chải đánh răng của tôi ở dưới gương."
  },
  {
    "word_number": 482,
    "word": "Napkin",
    "example_en": "It's polite to put the napkin on your lap.\nTake some extra napkins!",
    "example_vi": "Đặt khăn ăn lên đùi là một phép lịch sự.\nLấy thêm vài chiếc khăn ăn nhé!"
  },
  {
    "word_number": 483,
    "word": "Pillow",
    "example_en": "This bed has the best pillows.\nThere are two pillows on my bed.",
    "example_vi": "Chiếc giường này có những chiếc gối êm nhất.\nCó hai cái gối trên giường của tôi."
  },
  {
    "word_number": 484,
    "word": "Property",
    "example_en": "This is private property.\nI'm going to give the property to my son when I pass away.",
    "example_vi": "Đây là tài sản tư nhân.\nTôi sẽ trao lại tài sản cho con trai khi tôi qua đời."
  },
  {
    "word_number": 485,
    "word": "Restroom",
    "example_en": "May I use the restroom?\nThe restroom is opposite to the bedroom.",
    "example_vi": "Tôi có thể sử dụng nhà vệ sinh được không?\nNhà vệ sinh đối diện với phòng ngủ."
  },
  {
    "word_number": 486,
    "word": "Sheet",
    "example_en": "Clean the sheets before the guests arrive!\nThis sheet doesn't fit the bed.",
    "example_vi": "Hãy giặt sạch ga trải giường trước khi khách đến nhé!\nTấm ga trải giường này không vừa với chiếc giường."
  },
  {
    "word_number": 487,
    "word": "Structure",
    "example_en": "It's not a sturdy structure.\nMay I see the plans for the structure?",
    "example_vi": "Nó không phải là một công trình kết cấu vững chắc.\nTôi có thể xem bản vẽ kết cấu được không?"
  },
  {
    "word_number": 488,
    "word": "Towel",
    "example_en": "I forgot to bring my towel to the beach, so I didn't swim.\nI'll give you a clean towel.",
    "example_vi": "Tôi quên mang khăn ra bãi biển nên tôi đã không bơi.\nTôi sẽ đưa cho bạn một chiếc khăn sạch."
  },
  {
    "word_number": 489,
    "word": "Trash",
    "example_en": "Don't trash the place!\nThe soccer team completely trashed the hotel room after their victory.",
    "example_vi": "Đừng phá hoại/xả rác bừa bãi ra nơi này!\nĐội bóng đã phá hoại hoàn toàn căn phòng khách sạn sau chiến thắng."
  },
  {
    "word_number": 490,
    "word": "Wheelchair",
    "example_en": "Is the hotel good for people in wheelchairs?\nAfter the accident, she had to use a wheelchair.",
    "example_vi": "Khách sạn này có thuận tiện cho người đi xe lăn không?\nSau vụ tai nạn, cô ấy đã phải sử dụng xe lăn."
  },
  {
    "word_number": 491,
    "word": "Yard",
    "example_en": "A big yard is necessary for my family.\nMy yard has some flowers and trees.",
    "example_vi": "Một cái sân lớn là điều cần thiết đối với gia đình tôi.\nSân nhà tôi có một số loài hoa và cây cối."
  },
  {
    "word_number": 492,
    "word": "Roof",
    "example_en": "The roof needs repairing before the rainy season.\nThere was a leak in the roof during the heavy rain.",
    "example_vi": "Mái nhà cần được sửa chữa trước mùa mưa.\nĐã có chỗ dột trên mái nhà trong trận mưa lớn."
  },
  {
    "word_number": 493,
    "word": "Ceiling",
    "example_en": "The high ceiling gives the room a spacious feel.\nWe painted the ceiling white to make the room brighter.",
    "example_vi": "Trần nhà cao mang lại cảm giác rộng rãi cho căn phòng.\nChúng tôi sơn trần nhà màu trắng để phòng sáng hơn."
  },
  {
    "word_number": 494,
    "word": "Basement",
    "example_en": "They converted the basement into a games room.\nWe store all our old furniture in the basement.",
    "example_vi": "Họ đã cải tạo tầng hầm thành một phòng trò chơi.\nChúng tôi cất toàn bộ đồ đạc cũ dưới tầng hầm."
  },

  // ==========================================
  // UNIT 19: Home 2 (24 từ)
  // ==========================================
  {
    "word_number": 495,
    "word": "Adopt",
    "example_en": "Let's adopt a kitten!\nThey adopted a little girl.",
    "example_vi": "Chúng ta hãy nhận nuôi một chú mèo con nhé!\nHọ đã nhận nuôi một bé gái nhỏ."
  },
  {
    "word_number": 496,
    "word": "Allow",
    "example_en": "I won't allow you to have a boyfriend!\nThe city doesn't allow big lights that use too much electricity.",
    "example_vi": "Bố sẽ không cho phép con có bạn trai đâu!\nThành phố không cho phép sử dụng những bóng đèn lớn tiêu tốn quá nhiều điện."
  },
  {
    "word_number": 497,
    "word": "Anniversary",
    "example_en": "It's our 25th wedding anniversary today.\nTomorrow is the anniversary of my grandfather's death.",
    "example_vi": "Hôm nay là kỷ niệm 25 năm ngày cưới của chúng tôi.\nNgày mai là ngày giỗ của ông tôi."
  },
  {
    "word_number": 498,
    "word": "Celebrate",
    "example_en": "I'm celebrating the good news with my family.\nThey celebrated Christmas with their friends.",
    "example_vi": "Tôi đang ăn mừng tin vui cùng với gia đình của mình.\nHọ đã ăn mừng lễ Giáng sinh cùng với bạn bè của mình."
  },
  {
    "word_number": 499,
    "word": "Compare",
    "example_en": "Don't compare me to your mother!\nThis pizza doesn't compare with my mom's.",
    "example_vi": "Đừng so sánh tôi với mẹ của anh!\nMón pizza này không thể so sánh với pizza mẹ tôi làm."
  },
  {
    "word_number": 500,
    "word": "Cozy",
    "example_en": "The new chair is so cozy.\nThis is a cozy place to go on a honeymoon.",
    "example_vi": "Chiếc ghế mới thật là ấm cúng và dễ chịu.\nĐây là một nơi ấm cúng để đi hưởng tuần trăng mật."
  },
  {
    "word_number": 501,
    "word": "Engaged",
    "example_en": "Tom is engaged to Mary.\nAfter getting engaged, they start to make plans for their wedding.",
    "example_vi": "Tom đã đính hôn với Mary.\nSau khi đính hôn, họ bắt đầu lên kế hoạch cho đám cưới."
  },
  {
    "word_number": 502,
    "word": "Family",
    "example_en": "There are eight people in my family.\nThis house has belonged to my family for hundreds of years.",
    "example_vi": "Có tám người trong gia đình tôi.\nNgôi nhà này đã thuộc về gia đình tôi hàng trăm năm nay."
  },
  {
    "word_number": 503,
    "word": "Groom",
    "example_en": "The groom cried when he saw his wife.\nI'm a friend of the groom.",
    "example_vi": "Chú rể đã bật khóc khi nhìn thấy người vợ của mình.\nTôi là bạn của chú rể."
  },
  {
    "word_number": 504,
    "word": "Housekeeper",
    "example_en": "The housekeeper always forgets to clean the windows.\nWe are too busy, so we hired a housekeeper.",
    "example_vi": "Người quản gia luôn quên lau chùi các cửa sổ.\nChúng tôi quá bận rộn, vì vậy chúng tôi đã thuê một người quản gia."
  },
  {
    "word_number": 505,
    "word": "Housewife",
    "example_en": "I don't want to be a housewife. I want to work.\nYou'll make a good housewife one day.",
    "example_vi": "Tôi không muốn làm một bà nội trợ. Tôi muốn đi làm.\nMột ngày nào đó bạn sẽ trở thành một bà nội trợ đảm đang."
  },
  {
    "word_number": 506,
    "word": "Husband",
    "example_en": "Do our husbands know each other?\nI divorced my husband last month.",
    "example_vi": "Chồng của chúng ta có quen biết nhau không?\nTôi đã ly hôn với chồng vào tháng trước."
  },
  {
    "word_number": 507,
    "word": "Instinct",
    "example_en": "It takes good instincts to hunt.\nIt's just an instinct. I do it without thinking.",
    "example_vi": "Cần có những bản năng nhạy bén để đi săn.\nĐó chỉ là một bản năng thôi. Tôi làm điều đó mà không cần suy nghĩ."
  },
  {
    "word_number": 508,
    "word": "Landlord",
    "example_en": "The landlord never calls me back.\nI pay my landlord every two months.",
    "example_vi": "Chủ nhà không bao giờ gọi điện lại cho tôi.\nTôi trả tiền cho chủ nhà hai tháng một lần."
  },
  {
    "word_number": 509,
    "word": "Member",
    "example_en": "Are you a member of the golf club?\nThere are three members in my family.",
    "example_vi": "Bạn có phải là thành viên của câu lạc bộ gôn không?\nCó ba thành viên trong gia đình tôi."
  },
  {
    "word_number": 510,
    "word": "Neighbor",
    "example_en": "My neighbors get annoyed when I have guests.\nHave you met the neighbors yet?",
    "example_vi": "Hàng xóm của tôi cảm thấy khó chịu khi tôi có khách đến chơi.\nBạn đã gặp những người hàng xóm mới chưa?"
  },
  {
    "word_number": 511,
    "word": "Owner",
    "example_en": "I am its rightful owner.\nWho is the owner of the truck?",
    "example_vi": "Tôi là người chủ sở hữu hợp pháp của nó.\nAi là chủ của chiếc xe tải đó vậy?"
  },
  {
    "word_number": 512,
    "word": "Receive",
    "example_en": "I received a lot of money for my birthday.\nHave you received my email?",
    "example_vi": "Tôi đã nhận được rất nhiều tiền vào ngày sinh nhật của mình.\nBạn đã nhận được email của tôi chưa?"
  },
  {
    "word_number": 513,
    "word": "Relate",
    "example_en": "I can't relate to my sister at all.\nLet's relate this to the beginning of the story!",
    "example_vi": "Tôi hoàn toàn không thể đồng cảm/hiểu nổi chị gái tôi.\nHãy liên hệ điều này với phần mở đầu của câu chuyện!"
  },
  {
    "word_number": 514,
    "word": "Ruin",
    "example_en": "You'll ruin our relationship!\nThe storm ruined my business.",
    "example_vi": "Bạn sẽ phá hỏng mối quan hệ của chúng ta mất!\nCơn bão đã phá hủy công việc kinh doanh của tôi."
  },
  {
    "word_number": 515,
    "word": "Settle",
    "example_en": "I want to settle in France.\nThey'll get married and settle in New York.",
    "example_vi": "Tôi muốn định cư ở Pháp.\nHọ sẽ kết hôn và định cư ở New York."
  },
  {
    "word_number": 516,
    "word": "Spouse",
    "example_en": "Have you met my spouse?\nI just want a big family and a loving spouse.",
    "example_vi": "Bạn đã gặp người bạn đời của tôi chưa?\nTôi chỉ muốn có một gia đình lớn và một người bạn đời yêu thương tôi."
  },
  {
    "word_number": 517,
    "word": "Uncle",
    "example_en": "My uncle lives in London.\nUncle Bob gave me a wonderful present for my birthday.",
    "example_vi": "Chú của tôi sống ở London.\nBác Bob đã tặng tôi một món quà tuyệt vời vào ngày sinh nhật."
  },
  {
    "word_number": 518,
    "word": "Wife",
    "example_en": "My wife and I have been married for ten years.\nHe bought a beautiful diamond ring for his wife.",
    "example_vi": "Vợ tôi và tôi đã kết hôn được mười năm.\nAnh ấy đã mua một chiếc nhẫn kim cương tuyệt đẹp cho vợ mình."
  },

  // ==========================================
  // UNIT 20: Relationship & Places 1 (23 từ)
  // ==========================================
  {
    "word_number": 519,
    "word": "Abide by",
    "example_en": "Make sure you abide by the rules!\nThis hotel abides by all safety standards.",
    "example_vi": "Hãy chắc chắn rằng bạn tuân theo các quy tắc nhé!\nKhách sạn này tuân thủ mọi tiêu chuẩn an toàn."
  },
  {
    "word_number": 520,
    "word": "Assert",
    "example_en": "You need to assert your dominance.\nThis job will really assert you as a top lawyer.",
    "example_vi": "Bạn cần phải khẳng định vị thế thống trị của mình.\nCông việc này sẽ thực sự khẳng định bạn là một luật sư hàng đầu."
  },
  {
    "word_number": 521,
    "word": "Assurance",
    "example_en": "Can you give me assurance that it's safe?\nDai gave his girlfriend his assurance that he will treat her Queen.",
    "example_vi": "Bạn có thể bảo đảm với tôi rằng việc này an toàn không?\nĐại cam đoan với bạn gái rằng anh sẽ đối xử với cô như một nữ hoàng."
  },
  {
    "word_number": 522,
    "word": "Belief",
    "example_en": "There are thousands of different religious beliefs.\nI have the belief that most people are good.",
    "example_vi": "Có hàng ngàn niềm tin tôn giáo khác nhau.\nTôi có niềm tin rằng hầu hết mọi người đều tốt bụng."
  },
  {
    "word_number": 523,
    "word": "Circumstance",
    "example_en": "Under different circumstances, I would stay and talk, but I am late for work.\nShe is clever in all circumstances.",
    "example_vi": "Trong một hoàn cảnh khác, tôi sẽ ở lại nói chuyện, nhưng tôi đang bị muộn giờ làm.\nCô ấy luôn thông minh khéo léo trong mọi hoàn cảnh."
  },
  {
    "word_number": 524,
    "word": "Citizen",
    "example_en": "Citizens were unhappy with the pollution.\nNam is a citizen of two countries.",
    "example_vi": "Người dân không hài lòng với tình trạng ô nhiễm.\nNam là công dân của hai quốc gia."
  },
  {
    "word_number": 525,
    "word": "Crown",
    "example_en": "After her death, she will pass the crown to her daughter.\nThe crown was decorated with diamonds and rubies.",
    "example_vi": "Sau khi qua đời, bà sẽ truyền lại vương miện cho con gái mình.\nChiếc vương miện được đính kim cương và hồng ngọc."
  },
  {
    "word_number": 526,
    "word": "Deprive",
    "example_en": "All this noise deprived me of sleep.\nDon't deprive me of my favorite food!",
    "example_vi": "Tất cả tiếng ồn này đã cướp đi giấc ngủ của tôi.\nĐừng tước đoạt món ăn yêu thích của tôi!"
  },
  {
    "word_number": 527,
    "word": "Dilemma",
    "example_en": "I'm in a bit of a dilemma right now.\nThis is a moral dilemma.",
    "example_vi": "Hiện tại tôi đang ở trong một tình huống hơi khó xử.\nĐây là một tình huống khó xử về mặt đạo đức."
  },
  {
    "word_number": 528,
    "word": "Edge",
    "example_en": "Stay away from the edge of the cliff! It's dangerous.\nThe temple is located on the edge of the mountain.",
    "example_vi": "Hãy tránh xa mép vách đá! Rất nguy hiểm đấy.\nNgôi đền nằm bên bờ mép núi."
  },
  {
    "word_number": 529,
    "word": "Enhance",
    "example_en": "You can enhance your muscles with this protein drink.\nThis light really enhances your beauty.",
    "example_vi": "Bạn có thể nâng cao cơ bắp bằng đồ uống bổ sung protein này.\nÁnh sáng này thực sự tôn lên vẻ đẹp của bạn."
  },
  {
    "word_number": 530,
    "word": "Inhabitant",
    "example_en": "All inhabitants of the island need to leave before the storm comes.\nWe cannot accept 1000 new inhabitants.",
    "example_vi": "Tất cả cư dân trên đảo cần phải rời đi trước khi bão đến.\nChúng tôi không thể tiếp nhận thêm 1000 cư dân mới."
  },
  {
    "word_number": 531,
    "word": "Lease",
    "example_en": "I'm leasing the room for a month.\nMy husband and I are leasing our extra bedroom for some more money.",
    "example_vi": "Tôi đang cho thuê căn phòng trong một tháng.\nChồng tôi và tôi đang cho thuê phòng ngủ phụ để kiếm thêm tiền."
  },
  {
    "word_number": 532,
    "word": "Mankind",
    "example_en": "This technology will benefit all of mankind.\nMankind is doomed.",
    "example_vi": "Công nghệ này sẽ mang lại lợi ích cho toàn thể nhân loại.\nNhân loại đang bị đe dọa diệt vong."
  },
  {
    "word_number": 533,
    "word": "Moral",
    "example_en": "She is a moral woman.\nIn war, it is difficult to know the most moral decision.",
    "example_vi": "Cô ấy là một người phụ nữ có đạo đức.\nTrong chiến tranh, rất khó để biết đâu là quyết định có đạo đức nhất."
  },
  {
    "word_number": 534,
    "word": "Proximity",
    "example_en": "The bombs were all in close proximity.\nThe phones only work in close proximity to a radio tower.",
    "example_vi": "Những quả bom đều ở khoảng cách rất gần nhau.\nĐiện thoại chỉ hoạt động ở cự ly gần một tháp phát thanh."
  },
  {
    "word_number": 535,
    "word": "Religion",
    "example_en": "The three main religions live together peacefully in this country.\nI have no religion, but I believe there is life after death.",
    "example_vi": "Ba tôn giáo chính cùng chung sống hòa bình tại đất nước này.\nTôi không theo tôn giáo nào, nhưng tôi tin có sự sống sau cái chết."
  },
  {
    "word_number": 536,
    "word": "Resident",
    "example_en": "All city residents agreed that a new park should be built.\nThe residents of this town don't really accept strangers.",
    "example_vi": "Tất cả cư dân thành phố đều đồng ý rằng nên xây dựng một công viên mới.\nCư dân của thị trấn này không thực sự cởi mở đón nhận người lạ."
  },
  {
    "word_number": 537,
    "word": "Shelter",
    "example_en": "We sheltered from the dust storm inside a cave.\nShe often shelters the homeless.",
    "example_vi": "Chúng tôi đã trú bão bụi bên trong một hang động.\nCô ấy thường xuyên cưu mang che chở cho những người vô gia cư."
  },
  {
    "word_number": 538,
    "word": "Society",
    "example_en": "Nowadays, society relies too much on technology.\nIt was a peaceful society.",
    "example_vi": "Ngày nay, xã hội phụ thuộc quá nhiều vào công nghệ.\nĐó đã từng là một xã hội thanh bình."
  },
  {
    "word_number": 539,
    "word": "Terrace",
    "example_en": "He had big party on the terrace.\nI prefer the house with a terrace.",
    "example_vi": "Anh ấy đã tổ chức một bữa tiệc lớn trên sân hiên.\nTôi thích một ngôi nhà có sân hiên hơn."
  },
  {
    "word_number": 540,
    "word": "Tribe",
    "example_en": "The tribe's elders will decide your punishment.\nWe welcome you into our tribe.",
    "example_vi": "Các trưởng lão trong bộ tộc sẽ quyết định hình phạt dành cho bạn.\nChúng tôi chào đón bạn gia nhập vào bộ tộc của chúng tôi."
  },
  {
    "word_number": 541,
    "word": "Vested",
    "example_en": "He has a vested interest in the success of the company.\nBy the authority vested in me, I declare the museum open.",
    "example_vi": "Anh ấy có quyền lợi gắn liền và được đảm bảo với sự thành công của công ty.\nTheo quyền hạn được trao cho tôi, tôi tuyên bố bảo tàng chính thức mở cửa."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNITS_16_TO_20_UPDATES.map(item => [item.word_number, item]));

let count = 0;
const unitCounts = { 16: 0, 17: 0, 18: 0, 19: 0, 20: 0 };

for (const v of vocabList) {
  if (v.unit >= 16 && v.unit <= 20 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    unitCounts[v.unit] = (unitCounts[v.unit] || 0) + 1;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công tổng cộng ${count} từ vựng Units 16 -> 20 trong hacknao_vocab.json:`);
for (let u = 16; u <= 20; u++) {
  console.log(`- Unit ${u}: ${unitCounts[u]} từ`);
}
