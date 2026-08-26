import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách CHÍNH XÁC 100% theo trang tổng hợp (Part 3) của Sách Hack Não 1500 cho Unit 16 -> Unit 20
const CORRECT_UNITS_DATA = {
  16: {
    unit: 16,
    unit_title: "Personality & Appearance 2",
    category: "People & Lifestyle",
    words: [
      {
        word: "Blond",
        phonetic: "/blɑːnd/",
        word_type: "adjective",
        meaning_vi: "Vàng hoe",
        sound_bridge: "Bố Lan đã dẫn cô ấy đi nhuộm mái tóc màu vàng hoe.",
        definition_en: "(chiefly of hair) fair or pale yellow",
        example_en: "I have blond hair now.\nDo you prefer blond hair or brunette?",
        example_vi: "Bây giờ tôi có mái tóc màu vàng hoe.\nBạn thích tóc vàng hoe hơn hay tóc màu nâu đen hơn?",
        page_number: 156
      },
      {
        word: "Careful",
        phonetic: "/ˈker.fəl/",
        word_type: "adjective",
        meaning_vi: "Cẩn thận",
        sound_bridge: "Những kẻ phun thuốc tăng trưởng cho cây phải luôn cẩn thận nếu không muốn bị bắt.",
        definition_en: "giving a lot of attention to what you are doing so that you do not have an accident, or make a mistake",
        example_en: "Be careful while driving down the mountain!\nShe's always careful when walking across the street.",
        example_vi: "Hãy cẩn thận khi lái xe xuống núi!\nCô ấy luôn cẩn thận khi đi bộ qua đường.",
        page_number: 156
      },
      {
        word: "Cheer",
        phonetic: "/tʃɪr/",
        word_type: "verb",
        meaning_vi: "Sự vui vẻ, cổ vũ",
        sound_bridge: "Muốn có sự vui vẻ thì hãy chia sẻ niềm vui cho mọi người.",
        definition_en: "a shout of encouragement, praise, or joy",
        example_en: "There was a loud cheer.\nDuring the holidays I feel the most cheer.",
        example_vi: "Đã có một tiếng reo hò cổ vũ rất lớn.\nTrong những ngày nghỉ lễ tôi cảm thấy vui vẻ nhất.",
        page_number: 156
      },
      {
        word: "Childhood",
        phonetic: "/ˈtʃaɪld.hʊd/",
        word_type: "noun",
        meaning_vi: "Thời thơ ấu",
        sound_bridge: "Tôi từng là đứa trẻ (child) hời hợt với tình yêu thời thơ ấu.",
        definition_en: "the state or period of being a child",
        example_en: "I miss my childhood.\nYou shouldn't waste your childhood worrying about everything.",
        example_vi: "Tôi nhớ thời thơ ấu của mình.\nBạn không nên lãng phí thời thơ ấu vào việc lo lắng về mọi thứ.",
        page_number: 156
      },
      {
        word: "Conscious",
        phonetic: "/ˈkɑːn.ʃəs/",
        word_type: "adjective",
        meaning_vi: "Ý thức, tỉnh táo",
        sound_bridge: "Cơn sốt Lạc Trôi của Sơn Tùng giúp các bạn trẻ ý thức hơn khi nghe nhạc của Sếp.",
        definition_en: "aware of and responding to one's surroundings",
        example_en: "I'm so tired, I'm barely conscious.\nShe's very conscious of other peoples' emotions.",
        example_vi: "Tôi quá mệt mỏi, tôi hầu như không còn tỉnh táo.\nCô ấy rất có ý thức và nhạy cảm với cảm xúc của người khác.",
        page_number: 157
      },
      {
        word: "Courtesy",
        phonetic: "/ˈkɝː.t̬ə.si/",
        word_type: "noun",
        meaning_vi: "Lịch sự nhã nhặn",
        sound_bridge: "Khách đến chúc tết phải chào lịch sự nhã nhặn mới có tờ lì xì mừng tuổi.",
        definition_en: "the showing of politeness in one's attitude and behaviour towards others",
        example_en: "Won't you do me the courtesy of picking me up?\nIt's just a kind courtesy to open the door for other people.",
        example_vi: "Bạn có thể làm ơn lịch sự đến đón tôi được không?\nMở cửa cho người khác chỉ là một phép lịch sự nhã nhặn tốt đẹp thôi.",
        page_number: 157
      },
      {
        word: "Coward",
        phonetic: "/ˈkaʊ.ɚd/",
        word_type: "noun",
        meaning_vi: "Nhát gan, kẻ hèn nhát",
        sound_bridge: "Cau mày dễ ợt thế này mà không làm được! Đồ nhát gan!",
        definition_en: "a person who is excessively afraid of danger or pain",
        example_en: "Just ask me, you coward!\nI try to be confident, but when I need to act I turn into a coward.",
        example_vi: "Cứ hỏi tôi đi, đồ nhát gan!\nTôi cố gắng tự tin, nhưng khi cần hành động tôi lại biến thành kẻ nhát gan.",
        page_number: 157
      },
      {
        word: "Desperate",
        phonetic: "/ˈdes.pɚ.ət/",
        word_type: "adjective",
        meaning_vi: "Tuyệt vọng, liều lĩnh",
        sound_bridge: "Đét đít con bé đang tuyệt vọng vì bị điểm kém.",
        definition_en: "feeling that you have no hope and are ready to do anything to change the bad situation you are in",
        example_en: "They were desperate for food and water.\nHe made a desperate attempt to escape.",
        example_vi: "Họ đang tuyệt vọng vì thiếu thức ăn và nước uống.\nAnh ấy đã thực hiện một nỗ lực liều lĩnh để trốn thoát.",
        page_number: 157
      },
      {
        word: "Dishonest",
        phonetic: "/dɪˈsɑː.nɪst/",
        word_type: "adjective",
        meaning_vi: "Không trung thực, gian dối",
        sound_bridge: "Đi so nét chữ của kẻ gian dối không trung thực.",
        definition_en: "not honest; intending to trick or deceive people",
        example_en: "He was fired for being dishonest with his boss.\nIt is dishonest to cheat on exams.",
        example_vi: "Anh ta bị sa thải vì không trung thực với sếp của mình.\nGian lận trong thi cử là hành vi không trung thực.",
        page_number: 157
      },
      {
        word: "Elegant",
        phonetic: "/ˈel.ə.ɡənt/",
        word_type: "adjective",
        meaning_vi: "Thanh lịch, trang nhã",
        sound_bridge: "Em Ly ghen tị với vẻ đẹp thanh lịch của cô người mẫu.",
        definition_en: "graceful and attractive in appearance or behaviour",
        example_en: "She was wearing an elegant black dress.\nThey stayed at an elegant hotel downtown.",
        example_vi: "Cô ấy đang mặc một chiếc váy đen thanh lịch.\nHọ đã ở tại một khách sạn trang nhã ở trung tâm thành phố.",
        page_number: 157
      },
      {
        word: "Experience",
        phonetic: "/ɪkˈspɪr.i.əns/",
        word_type: "noun",
        meaning_vi: "Kinh nghiệm, trải nghiệm",
        sound_bridge: "Ếch sợ bia, rượu cần vì nó không có kinh nghiệm uống nên sợ say.",
        definition_en: "practical contact with and observation of facts or events",
        example_en: "Traveling abroad was the greatest experience of my life.\nI don't regret the relationship. It was a valuable experience.",
        example_vi: "Đi du lịch nước ngoài là trải nghiệm tuyệt vời nhất trong cuộc đời tôi.\nTôi không hối tiếc về mối quan hệ đó. Đó là một trải nghiệm quý giá.",
        page_number: 158
      },
      {
        word: "Expert",
        phonetic: "/ˈek.spɝːt/",
        word_type: "noun",
        meaning_vi: "Chuyên gia",
        sound_bridge: "Cần rất nhiều chuyên gia mới có thể tạo ra một chiếc máy bay Air Bus.",
        definition_en: "a person who is very knowledgeable about or skilful in a particular area",
        example_en: "Most experts agree about climate change.\nI'm not an expert in engineering, but I don't think you should use glue to fix your car window.",
        example_vi: "Hầu hết các chuyên gia đều đồng ý về vấn đề biến đổi khí hậu.\nTôi không phải chuyên gia kỹ thuật, nhưng tôi không nghĩ bạn nên dùng keo dán cửa sổ xe.",
        page_number: 158
      },
      {
        word: "Familiar",
        phonetic: "/fəˈmɪl.i.jɚ/",
        word_type: "adjective",
        meaning_vi: "Quen thuộc",
        sound_bridge: "Việc quen thuộc của tôi là pha Milo.",
        definition_en: "well known from long or close association",
        example_en: "You look familiar! Do I know you?\nI saw a lot of familiar faces, but I didn't see any close friends.",
        example_vi: "Bạn trông quen quen! Tôi có biết bạn không nhỉ?\nTôi thấy rất nhiều gương mặt quen thuộc, nhưng không thấy bạn thân nào.",
        page_number: 158
      },
      {
        word: "Generous",
        phonetic: "/ˈdʒen.ər.əs/",
        word_type: "adjective",
        meaning_vi: "Hào phóng",
        sound_bridge: "Anh ấy hào phóng cho bọn trẻ nổ đùa rượt đuổi sau bữa ăn dồi dào năng lượng.",
        definition_en: "showing a readiness to give more of something, especially money, than is strictly necessary or expected",
        example_en: "Some generous billionaires donate money to our organization.\nMy mother taught me to be generous.",
        example_vi: "Một số tỷ phú hào phóng quyên góp tiền cho tổ chức của chúng tôi.\nMẹ dạy tôi phải sống thật hào phóng.",
        page_number: 158
      },
      {
        word: "Grateful",
        phonetic: "/ˈɡreɪt.fəl/",
        word_type: "adjective",
        meaning_vi: "Biết ơn",
        sound_bridge: "Biết ơn ông trời quá, giờ không rét và mưa phùn nữa.",
        definition_en: "feeling or showing an appreciation for something done or received",
        example_en: "I'm so grateful to my parents for raising me.\nShe was so grateful for his kindness.",
        example_vi: "Tôi rất biết ơn cha mẹ đã nuôi nấng tôi nên người.\nCô ấy vô cùng biết ơn lòng tốt của anh ấy.",
        page_number: 158
      },
      {
        word: "Humor",
        phonetic: "/ˈhjuː.mɚ/",
        word_type: "noun",
        meaning_vi: "Làm vui lòng, khiếu hài hước",
        sound_bridge: "Làm vui lòng con gái, mẹ dành riêng cho hũ mỡ đấy nhé!",
        definition_en: "to comply with the wishes of someone in order to keep them content, however unreasonable such wishes might be",
        example_en: "Just humor me, okay?\nI'll join your club, but only to humor you.",
        example_vi: "Cứ chiều theo ý tôi một lần được không?\nTôi sẽ tham gia câu lạc bộ, nhưng chỉ để làm bạn vui lòng thôi.",
        page_number: 158
      },
      {
        word: "Idiot",
        phonetic: "/ˈɪd.i.ət/",
        word_type: "noun",
        meaning_vi: "Tên ngốc",
        sound_bridge: "Ai cử tên ngốc này đi mua ớt vậy?",
        definition_en: "a stupid person",
        example_en: "That idiot forgot his keys inside the house!\nMy brother is the biggest idiot I know.",
        example_vi: "Tên ngốc đó đã để quên chìa khóa bên trong nhà rồi!\nAnh trai tôi là kẻ ngốc nghếch nhất mà tôi từng biết.",
        page_number: 159
      },
      {
        word: "Innocent",
        phonetic: "/ˈɪn.ə.sənt/",
        word_type: "adjective",
        meaning_vi: "Vô tội, ngây thơ",
        sound_bridge: "Tôi vô tội vì tôi không in nó sai.",
        definition_en: "not guilty of a crime or offence",
        example_en: "The police sent him to prison, but he was innocent.\nIf you are innocent why can't you look me in the eyes?",
        example_vi: "Cảnh sát đã tống anh ta vào tù, nhưng anh ta vô tội.\nNếu bạn vô tội thì tại sao bạn không thể nhìn thẳng vào mắt tôi?",
        page_number: 159
      },
      {
        word: "Intelligent",
        phonetic: "/ɪnˈtel.ə.dʒənt/",
        word_type: "adjective",
        meaning_vi: "Thông minh",
        sound_bridge: "Cậu In đi theo cô Ly học hỏi nên dần trở nên thông minh hơn.",
        definition_en: "having or showing intelligence, especially of a high level",
        example_en: "Google only hires the most intelligent students.\nI need my partner to be intelligent, funny, and outgoing.",
        example_vi: "Google chỉ tuyển dụng những sinh viên thông minh nhất.\nTôi cần đối tác của mình phải thông minh, hài hước và cởi mở.",
        page_number: 159
      },
      {
        word: "Mature",
        phonetic: "/məˈtʊr/",
        word_type: "adjective",
        meaning_vi: "Trưởng thành, chín chắn",
        sound_bridge: "Trưởng thành ở vùng đất được ví như mây trời.",
        definition_en: "fully developed physically; full-grown",
        example_en: "I need to be with someone who is more mature.\nYou have become such a mature young man!",
        example_vi: "Tôi cần ở bên một người chín chắn trưởng thành hơn.\nBạn đã trở thành một chàng trai trẻ thật trưởng thành!",
        page_number: 159
      },
      {
        word: "Miserable",
        phonetic: "/ˈmɪz.ɚ.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Đau khổ, khốn khổ",
        sound_bridge: "Thằng nhỏ đang đau khổ vì giống mít nhiều xơ quá, có khả năng (able) chẳng được múi nào.",
        definition_en: "unpleasant and causing unhappiness",
        example_en: "I feel so miserable, I think I'm just going to go to sleep.\nHow can you be miserable in this beautiful city?",
        example_vi: "Tôi cảm thấy quá đau khổ, tôi nghĩ tôi chỉ muốn đi ngủ thôi.\nLàm sao bạn có thể cảm thấy đau khổ ở thành phố tuyệt đẹp này chứ?",
        page_number: 159
      },
      {
        word: "Neat",
        phonetic: "/niːt/",
        word_type: "adjective",
        meaning_vi: "Gọn gàng, ngăn nắp",
        sound_bridge: "Con nít nên được dạy phải gọn gàng từ nhỏ.",
        definition_en: "arranged in a tidy way; in good order",
        example_en: "What a neat house you have!\nMake sure your room is neat when Aunt Karen comes!",
        example_vi: "Bạn có một ngôi nhà thật gọn gàng ngăn nắp!\nHãy chắc chắn rằng phòng của bạn thật gọn gàng khi dì Karen đến nhé!",
        page_number: 159
      },
      {
        word: "Silly",
        phonetic: "/ˈsɪl.i/",
        word_type: "adjective",
        meaning_vi: "Ngớ ngẩn",
        sound_bridge: "Những đứa trẻ bị ngớ ngẩn sợ bị cách li.",
        definition_en: "having or showing a lack of common sense or judgement; absurd and foolish",
        example_en: "My dad's clothes are so silly.\nI make silly faces so my baby will stop crying.",
        example_vi: "Quần áo của bố tôi thật ngớ ngẩn.\nTôi làm những bộ mặt ngớ ngẩn để em bé ngừng khóc.",
        page_number: 160
      },
      {
        word: "Skill",
        phonetic: "/skɪl/",
        word_type: "noun",
        meaning_vi: "Kỹ năng",
        sound_bridge: "Kỹ năng của chú kém quá. Sợ gì chứ lại sợ con rắn kìn kìn này!",
        definition_en: "the ability to do something well; expertise",
        example_en: "Her unique skills make her a good candidate for the job.\nI wish I learned more computer skills in college.",
        example_vi: "Những kỹ năng độc đáo giúp cô ấy trở thành ứng viên tốt cho công việc.\nTôi ước mình đã học thêm nhiều kỹ năng máy tính ở đại học.",
        page_number: 160
      },
      {
        word: "Strict",
        phonetic: "/strɪkt/",
        word_type: "adjective",
        meaning_vi: "Nghiêm khắc",
        sound_bridge: "Tèo nghiêm khắc với bản thân lắm đấy, nó sợ mà vẫn để bác sĩ chích kìa.",
        definition_en: "demanding that rules concerning behaviour are obeyed and observed",
        example_en: "My parents are so strict, they don't even let me stay out past 9:30pm.\nThe drug laws in this country are very strict.",
        example_vi: "Bố mẹ tôi nghiêm khắc đến mức thậm chí không cho tôi ở ngoài đường quá 9:30 tối.\nLuật chống ma túy ở quốc gia này rất nghiêm ngặt.",
        page_number: 160
      }
    ]
  },

  17: {
    unit: 17,
    unit_title: "Personality & Appearance 3",
    category: "People & Lifestyle",
    words: [
      {
        word: "Adorable",
        phonetic: "/əˈdɔːr.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Đáng yêu",
        sound_bridge: "Con bé đáng yêu ở đâu rồi? Đi rây bột cùng mẹ nào.",
        definition_en: "very attractive and easy to feel love for",
        example_en: "You have such an adorable puppy.\nYour accent is adorable.",
        example_vi: "Bạn có một chú cún con thật đáng yêu.\nGiọng điệu của bạn thật đáng yêu.",
        page_number: 165
      },
      {
        word: "Adult",
        phonetic: "/ˈæd.ʌlt/",
        word_type: "noun",
        meaning_vi: "Người trưởng thành",
        sound_bridge: "Anh của Thần Dớt thì chắc chắn phải là người trưởng thành rồi.",
        definition_en: "a person who is fully grown or developed",
        example_en: "You're an adult so you should make the decision yourself.\nI never want to be an adult.",
        example_vi: "Bạn là người trưởng thành nên hãy tự mình đưa ra quyết định.\nTôi không bao giờ muốn trở thành người lớn.",
        page_number: 165
      },
      {
        word: "Anger",
        phonetic: "/ˈæŋ.ɡɚ/",
        word_type: "noun",
        meaning_vi: "Phẫn nộ",
        sound_bridge: "An phẫn nộ khi vấp chân phải gờ tường.",
        definition_en: "a strong feeling of annoyance, displeasure, or hostility",
        example_en: "He could not control his anger.\nWhen I drink, I always feel a bit of anger.",
        example_vi: "Anh ấy đã không thể kiểm soát được cơn tức giận của mình.\nKhi uống rượu, tôi luôn cảm thấy một chút phẫn nộ trong lòng.",
        page_number: 165
      },
      {
        word: "Anxiety",
        phonetic: "/æŋˈzaɪ.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Lo lắng",
        sound_bridge: "Đi ăn bị thiếu tiền, đừng lo lắng, 'nơi này có anh' lo hộ cho!",
        definition_en: "a feeling of worry, or nervousness about something with an uncertain outcome",
        example_en: "I don't drink coffee, it sometimes gives me anxiety.\nI take some medicine to help control my anxiety.",
        example_vi: "Tôi không uống cà phê, thỉnh thoảng nó làm tôi lo lắng bồn chồn.\nTôi dùng một ít thuốc để kiểm soát chứng lo âu của mình.",
        page_number: 165
      },
      {
        word: "Apprehensive",
        phonetic: "/ˌæp.rəˈhen.sɪv/",
        word_type: "adjective",
        meaning_vi: "Lo lắng, sợ hãi",
        sound_bridge: "Lo lắng vì ở nhà đang ấp trứng con gà ri mà không kịp hẹn ship hàng được.",
        definition_en: "feeling worried about something that you are going to do or that is going to happen",
        example_en: "She was feeling a little apprehensive about the plan.\nDon't be apprehensive, just do it!",
        example_vi: "Cô ấy cảm thấy hơi lo lắng về kế hoạch này.\nĐừng lo lắng, cứ làm đi!",
        page_number: 166
      },
      {
        word: "Beard",
        phonetic: "/bɪrd/",
        word_type: "noun",
        meaning_vi: "Bộ râu",
        sound_bridge: "Mấy con bọ chét dùng bộ râu làm bia đỡ đạn nhưng chúng mày không thoát khỏi tay tao được đâu.",
        definition_en: "a growth of hair on the chin and lower cheeks of a man's face",
        example_en: "I love men with beards.\nI can't grow a beard no matter how long I wait.",
        example_vi: "Tôi thích những người đàn ông có râu.\nTôi không thể để râu dù tôi có đợi bao lâu đi nữa.",
        page_number: 166
      },
      {
        word: "Beginner",
        phonetic: "/bɪˈɡɪn.ɚ/",
        word_type: "noun",
        meaning_vi: "Người mới bắt đầu",
        sound_bridge: "Mọi người bắt đầu bế từng đứa bé lên gần bờ vì nước lũ đang dâng cao.",
        definition_en: "a person just starting to learn a skill or take part in an activity",
        example_en: "Could you give some advice to the beginners?\nThis level is for beginners.",
        example_vi: "Bạn có thể cho người mới bắt đầu vài lời khuyên không?\nCấp độ này dành cho những người mới bắt đầu.",
        page_number: 166
      },
      {
        word: "Behavior",
        phonetic: "/bɪˈheɪ.vjɚ/",
        word_type: "noun",
        meaning_vi: "Cách cư xử",
        sound_bridge: "Bé Hai bỏ về vì cách cư xử của bạn Tèo không tốt.",
        definition_en: "a particular way of acting",
        example_en: "Make sure you are on your best behavior!\nYour behavior is unacceptable.",
        example_vi: "Hãy đảm bảo bạn cư xử thật đúng mực nhé!\nCách cư xử của bạn là không thể chấp nhận được.",
        page_number: 166
      },
      {
        word: "Conservative",
        phonetic: "/kənˈsɝː.və.t̬ɪv/",
        word_type: "adjective",
        meaning_vi: "Bảo thủ",
        sound_bridge: "Mẹ phải thật bảo thủ nha, con sợ nó vay tiền xong sẽ không trả đâu.",
        definition_en: "showing that you prefer traditional styles and values",
        example_en: "I don't want to be friend with him because he's really conservative.\nHe had many conservative opinions about sex.",
        example_vi: "Tôi không muốn làm bạn với anh ta vì anh ta rất bảo thủ.\nAnh ấy có nhiều quan điểm bảo thủ về giới tính.",
        page_number: 166
      },
      {
        word: "Nervous",
        phonetic: "/ˈnɝː.vəs/",
        word_type: "adjective",
        meaning_vi: "Lo lắng, hồi hộp",
        sound_bridge: "Ông chồng lo lắng vì nợ quá nhiều, sợ vợ ném hết quần áo đuổi ra ngoài đường ở.",
        definition_en: "easily agitated or alarmed",
        example_en: "I was so nervous before my chemistry exam.\nYou look nervous, is everything okay?",
        example_vi: "Tôi đã rất lo lắng trước kỳ thi hóa học.\nTrông bạn có vẻ lo lắng, mọi chuyện vẫn ổn chứ?",
        page_number: 166
      },
      {
        word: "Panic",
        phonetic: "/ˈpæn.ɪk/",
        word_type: "noun",
        meaning_vi: "Hoảng sợ",
        sound_bridge: "Ba nịt bụng lại để không thấy hoảng sợ khi đứng trước gương.",
        definition_en: "a sudden feeling of great fear that cannot be controlled and prevents you from thinking clearly",
        example_en: "I was feeling pretty panic earlier, but my girlfriend helped me.\nSome animals can comfort people who are feeling panic.",
        example_vi: "Lúc nãy tôi cảm thấy khá hoảng sợ, nhưng bạn gái đã giúp tôi.\nMột số loài động vật có thể an ủi những người đang cảm thấy hoảng sợ.",
        page_number: 167
      },
      {
        word: "Perfume",
        phonetic: "/ˈpɝː.fjuːm/",
        word_type: "noun",
        meaning_vi: "Nước hoa",
        sound_bridge: "Bố phiêu vì hương thơm nước hoa của mẹ toả ra.",
        definition_en: "a fragrant liquid typically made from essential oils extracted from flowers and spices, used to give a pleasant smell to one's body",
        example_en: "I still remember her perfume.\nThe perfume smelled like flowers and cinnamon.",
        example_vi: "Tôi vẫn còn nhớ mùi nước hoa của cô ấy.\nNước hoa có mùi thơm như hoa và quế.",
        page_number: 167
      },
      {
        word: "Personnel",
        phonetic: "/ˌpɝː.sənˈel/",
        word_type: "noun",
        meaning_vi: "Nhân viên, nhân sự",
        sound_bridge: "Hôm nay Bơ sẽ nói: 'Tôi là Hoài Bơ, là nhân viên mới, mong mọi người giúp đỡ'.",
        definition_en: "the people who are employed in a company, organization, or one of the armed forces",
        example_en: "We need more personnel to complete the construction on time.\nOnly authorized personnel can come in here.",
        example_vi: "Chúng ta cần thêm nhân sự để hoàn thành công trình đúng hạn.\nChỉ có nhân viên được ủy quyền mới có thể vào đây.",
        page_number: 167
      },
      {
        word: "Reliable",
        phonetic: "/rɪˈlaɪ.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Đáng tin cậy",
        sound_bridge: "Con mèo này đúng là không đáng tin cậy, con chim ri lai ấy chắc chắn đã bị nó ăn rồi bố ạ.",
        definition_en: "consistently good in quality or performance; able to be trusted",
        example_en: "You need a reliable vehicle for this delivery position.\nOur most reliable customer doesn't even shop here anymore.",
        example_vi: "Bạn cần một phương tiện đáng tin cậy cho vị trí giao hàng này.\nKhách hàng đáng tin cậy nhất của chúng tôi thậm chí không còn mua sắm ở đây nữa.",
        page_number: 167
      },
      {
        word: "Selfish",
        phonetic: "/ˈsel.fɪʃ/",
        word_type: "adjective",
        meaning_vi: "Ích kỉ",
        sound_bridge: "Trước khi có vết sẹo do phích nước làm phỏng, nó là đứa ích kỉ.",
        definition_en: "lacking consideration for other people; concerned chiefly with one's own personal profit or pleasure",
        example_en: "That's a selfish opinion to have.\nSome people say I'm selfish, but I think I am just being strong and confident.",
        example_vi: "Đó là một quan điểm thật ích kỷ.\nMột số người nói tôi ích kỷ, nhưng tôi nghĩ mình chỉ đang mạnh mẽ và tự tin thôi.",
        page_number: 167
      },
      {
        word: "Sense",
        phonetic: "/sens/",
        word_type: "noun",
        meaning_vi: "Giác quan, khả năng phán đoán",
        sound_bridge: "San sẻ cho tao ít khả năng phán đoán như Conan của mày đi.",
        definition_en: "a faculty by which the body perceives an external stimulus; one of the faculties of sight, smell, hearing, taste, and touch",
        example_en: "She has a good sense of smell.\nKids these days have no common sense.",
        example_vi: "Cô ấy có khứu giác rất nhạy bén.\nTrẻ con thời nay chẳng có chút hiểu biết thông thường nào cả.",
        page_number: 167
      },
      {
        word: "Sensible",
        phonetic: "/ˈsen.sə.bəl/",
        word_type: "adjective",
        meaning_vi: "Thấu tình đạt lý",
        sound_bridge: "Sen sợ bồ mình không cư xử thấu tình đạt lý và ý chí bền vững.",
        definition_en: "done or chosen in accordance with wisdom or prudence; likely to be of benefit",
        example_en: "That's a sensible decision.\nThere must be a more sensible method.",
        example_vi: "Đó là một quyết định thấu tình đạt lý/hợp lý.\nChắc chắn phải có một phương pháp hợp lý hơn.",
        page_number: 168
      },
      {
        word: "Serious",
        phonetic: "/ˈsɪr.i.əs/",
        word_type: "adjective",
        meaning_vi: "Nghiêm túc, nghiêm trọng",
        sound_bridge: "Ăn quả sơ ri với ớt thì nghiêm trọng lắm đấy!",
        definition_en: "not joking or intended to be funny",
        example_en: "Why do you look so serious?\nIt's informal, no need to be serious.",
        example_vi: "Sao trông bạn nghiêm túc thế?\nĐây là buổi gặp mặt thân mật, không cần phải nghiêm túc quá đâu.",
        page_number: 168
      },
      {
        word: "Spirit",
        phonetic: "/ˈspɪr.ət/",
        word_type: "noun",
        meaning_vi: "Tinh thần",
        sound_bridge: "Sợ bị rết cắn nên tinh thần suy sụp mất ăn mất ngủ.",
        definition_en: "the non-physical part of a person which is the seat of emotions and character; the soul",
        example_en: "You need to have more spirit for your country.\nWe showed our school spirit by wearing blue and white.",
        example_vi: "Bạn cần có nhiều tinh thần yêu nước hơn.\nChúng tôi đã thể hiện tinh thần của trường bằng cách mặc đồ xanh và trắng.",
        page_number: 168
      },
      {
        word: "Stubborn",
        phonetic: "/ˈstʌb.ɚn/",
        word_type: "adjective",
        meaning_vi: "Bướng bỉnh",
        sound_bridge: "Sợ táp bơn bớt cái tính bướng bỉnh đi không thì bị phạt.",
        definition_en: "having or showing dogged determination not to change one's attitude or position on something",
        example_en: "He is stubborn as a stone.\nDon't be stubborn, listen to what I say!",
        example_vi: "Anh ấy bướng bỉnh như một tảng đá.\nĐừng bướng bỉnh nữa, hãy nghe những gì tôi nói đi!",
        page_number: 168
      },
      {
        word: "Upset",
        phonetic: "/ʌpˈset/",
        word_type: "adjective",
        meaning_vi: "Khó chịu, buồn bực",
        sound_bridge: "Ấp sọt đàn gà làm mẹ buồn bực.",
        definition_en: "unhappy, disappointed, or worried",
        example_en: "She was upset about the bad news.\nWhy are you getting so upset over nothing?",
        example_vi: "Cô ấy buồn bực về tin xấu.\nTại sao bạn lại cảm thấy khó chịu vì một chuyện không đâu chứ?",
        page_number: 168
      },
      {
        word: "Vivid",
        phonetic: "/ˈvɪv.ɪd/",
        word_type: "adjective",
        meaning_vi: "Sống động",
        sound_bridge: "Vì vịt biết bơi nên bức tranh càng thêm sống động.",
        definition_en: "producing powerful feelings or strong, clear images in the mind",
        example_en: "I have vivid memories of our trip.\nThe artist used vivid colors for the painting.",
        example_vi: "Tôi có những ký ức sống động về chuyến đi của chúng tôi.\nHọa sĩ đã sử dụng những gam màu sống động cho bức tranh.",
        page_number: 168
      },
      {
        word: "Wisdom",
        phonetic: "/ˈwɪz.dəm/",
        word_type: "noun",
        meaning_vi: "Sáng suốt, sự thông thái",
        sound_bridge: "Sáng suốt khi chọn trà sữa có vị quýt, đậm đà thật.",
        definition_en: "the quality of having experience, knowledge, and good judgement; the quality of being wise",
        example_en: "Give me your wisdom!\nWhen you are older, you will have more wisdom.",
        example_vi: "Hãy truyền cho tôi sự thông thái của bạn đi!\nKhi bạn lớn tuổi hơn, bạn sẽ có nhiều sự sáng suốt thông thái hơn.",
        page_number: 169
      },
      {
        word: "Wise",
        phonetic: "/waɪz/",
        word_type: "adjective",
        meaning_vi: "Khôn ngoan",
        sound_bridge: "Con yêu quái đã khôn ngoan chạy thoát khi bị Ngộ Không đập.",
        definition_en: "having or showing experience, knowledge, and good judgement",
        example_en: "Wise people know how to avoid violence.\nI think that's a wise choice.",
        example_vi: "Những người khôn ngoan luôn biết cách tránh xa bạo lực.\nTôi nghĩ đó là một sự lựa chọn khôn ngoan.",
        page_number: 169
      },
      {
        word: "Witty",
        phonetic: "/ˈwɪt.i/",
        word_type: "adjective",
        meaning_vi: "Dí dỏm",
        sound_bridge: "Câu chuyện 'Ai ăn quýt đi' thật dí dỏm.",
        definition_en: "showing or characterized by quick and inventive verbal humour",
        example_en: "He makes such witty jokes.\nThe dialogue in this movie is so witty.",
        example_vi: "Anh ấy kể những câu chuyện đùa thật dí dỏm.\nLời thoại trong bộ phim này thật dí dỏm.",
        page_number: 169
      }
    ]
  },

  18: {
    unit: 18,
    unit_title: "Home 1",
    category: "Home & Family",
    words: [
      {
        word: "Apartment",
        phonetic: "/əˈpɑːrt.mənt/",
        word_type: "noun",
        meaning_vi: "Căn hộ",
        sound_bridge: "Ở căn hộ tầng trên, họ đang phát thiệp mừng ăn tân gia.",
        definition_en: "a flat, typically one that is well appointed or used for holidays",
        example_en: "My uncle owns a luxury apartment in New York City.\nI wouldn't pay a lot for this old apartment.",
        example_vi: "Chú tôi sở hữu một căn hộ cao cấp sang trọng ở thành phố New York.\nTôi sẽ không trả nhiều tiền cho căn hộ cũ này đâu.",
        page_number: 174
      },
      {
        word: "Balcony",
        phonetic: "/ˈbæl.kə.ni/",
        word_type: "noun",
        meaning_vi: "Ban công",
        sound_bridge: "Ba cô Ni ra ngoài ban công hóng gió.",
        definition_en: "an area with a wall or bars around it that is joined to the outside wall of a building on an upper level",
        example_en: "Don't fall off the balcony!\nShe loves to read on the balcony.",
        example_vi: "Đừng để bị ngã khỏi ban công nhé!\nCô ấy thích đọc sách ngoài ban công.",
        page_number: 174
      },
      {
        word: "Bench",
        phonetic: "/bentʃ/",
        word_type: "noun",
        meaning_vi: "Băng ghế",
        sound_bridge: "Hãy ngồi ở băng ghế cạnh bàn chờ đồ ăn.",
        definition_en: "a long seat for several people, typically made of wood or stone",
        example_en: "Let's sit on the bench and watch the birds!\nI bought a good bench to do my exercise.",
        example_vi: "Hãy ngồi trên băng ghế và ngắm nhìn những chú chim nào!\nTôi đã mua một băng ghế tốt để tập thể dục.",
        page_number: 174
      },
      {
        word: "Blanket",
        phonetic: "/ˈblæŋ.kɪt/",
        word_type: "noun",
        meaning_vi: "Chăn mền",
        sound_bridge: "Bà Lan kẹt dưới đống đổ nát không lên được, cần đưa chăn mền vào cho bà đỡ lạnh.",
        definition_en: "a large piece of woollen or similar material used as a covering on a bed or elsewhere for warmth",
        example_en: "We snuggled under the blanket.\nSome people don't need blankets to sleep.",
        example_vi: "Chúng tôi cuộn tròn ấm áp dưới tấm chăn.\nMột số người không cần chăn mền khi ngủ.",
        page_number: 174
      },
      {
        word: "Border",
        phonetic: "/ˈbɔːr.dɚ/",
        word_type: "noun",
        meaning_vi: "Biên giới, ranh giới",
        sound_bridge: "Muốn đi qua biên giới phải băng bó đầu giả làm bệnh nhân.",
        definition_en: "a line separating two countries, administrative divisions, or other areas",
        example_en: "They build a fence around the border of their house.\nWe must protect our borders.",
        example_vi: "Họ xây hàng rào xung quanh ranh giới ngôi nhà của họ.\nChúng ta phải bảo vệ biên giới của mình.",
        page_number: 175
      },
      {
        word: "Brick",
        phonetic: "/brɪk/",
        word_type: "noun",
        meaning_vi: "Gạch",
        sound_bridge: "Bác rinh gạch để xây chuồng gà.",
        definition_en: "a small rectangular block typically made of fired or sun-dried clay, used in building",
        example_en: "My house is made of bricks.\nBricks are much better for storms than wood.",
        example_vi: "Ngôi nhà của tôi được xây bằng gạch.\nGạch chống chọi bão tốt hơn nhiều so với gỗ.",
        page_number: 175
      },
      {
        word: "Carpet",
        phonetic: "/ˈkɑːr.pət/",
        word_type: "noun",
        meaning_vi: "Tấm thảm",
        sound_bridge: "Đại ca biết cách đóng tấm thảm vào sàn nhà không?",
        definition_en: "a floor covering made from thick woven fabric",
        example_en: "The cat destroyed the new carpet.\nI replaced the carpet with wood.",
        example_vi: "Con mèo đã cào hỏng tấm thảm mới.\nTôi đã thay tấm thảm bằng sàn gỗ.",
        page_number: 175
      },
      {
        word: "Ceiling",
        phonetic: "/ˈsiː.lɪŋ/",
        word_type: "noun",
        meaning_vi: "Trần nhà",
        sound_bridge: "Xi măng trát trần nhà lâu năm đã bị rỉ sét.",
        definition_en: "the upper interior surface of a room or other similar compartment",
        example_en: "The high ceiling gives the room a spacious feel.\nWe painted the ceiling white to make the room brighter.",
        example_vi: "Trần nhà cao mang lại cảm giác rộng rãi cho căn phòng.\nChúng tôi sơn trần nhà màu trắng để phòng sáng hơn.",
        page_number: 175
      },
      {
        word: "Closet",
        phonetic: "/ˈklɑː.zət/",
        word_type: "noun",
        meaning_vi: "Tủ quần áo, phòng chứa đồ",
        sound_bridge: "Có con la sét đánh đứng cạnh tủ quần áo.",
        definition_en: "a cupboard or a small room with a door, used for storing things, especially clothes",
        example_en: "Hang your coat in the closet.\nThere is plenty of space in the closet.",
        example_vi: "Hãy treo áo khoác của bạn vào trong tủ quần áo.\nCó rất nhiều không gian trong tủ chứa đồ.",
        page_number: 175
      },
      {
        word: "Cottage",
        phonetic: "/ˈkɑː.t̬ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Nhà tranh, nhà gỗ ở nông thôn",
        sound_bridge: "Có tết về căn nhà gỗ ở quê sum họp gia đình.",
        definition_en: "a small house, especially in the country",
        example_en: "They rented a cottage near the lake for the weekend.\nMy grandparents live in a cozy cottage.",
        example_vi: "Họ thuê một ngôi nhà gỗ nhỏ ven hồ vào cuối tuần.\nÔng bà tôi sống trong một ngôi nhà tranh ấm cúng.",
        page_number: 175
      },
      {
        word: "Curtain",
        phonetic: "/ˈkɝː.tən/",
        word_type: "noun",
        meaning_vi: "Rèm cửa",
        sound_bridge: "Các loại rèm cửa ngày càng được phát triển tầm cỡ tân tiến.",
        definition_en: "a piece of material suspended at the top to form a screen, typically movable sideways along a rail and found as one of a pair at a window",
        example_en: "These curtains are old and smelly.\nI prefer modern curtains for the windows.",
        example_vi: "Những tấm rèm cửa này đã cũ và có mùi khó chịu.\nTôi thích rèm cửa hiện đại cho các cửa sổ hơn.",
        page_number: 176
      },
      {
        word: "Faucet",
        phonetic: "/ˈfɑː.sət/",
        word_type: "noun",
        meaning_vi: "Vòi nước",
        sound_bridge: "Phòng tắm bị xịt nước ra do vòi nước bị rò rỉ.",
        definition_en: "a device that controls the flow of liquid, especially water, from a pipe",
        example_en: "The faucet broke so I called a mechanic.\nYou can drink from the faucet, it's safe.",
        example_vi: "Vòi nước bị hỏng nên tôi đã gọi thợ sửa chữa.\nBạn có thể uống nước trực tiếp từ vòi, nó an toàn đấy.",
        page_number: 176
      },
      {
        word: "Fence",
        phonetic: "/fens/",
        word_type: "noun",
        meaning_vi: "Hàng rào",
        sound_bridge: "Phen này phải nhảy qua hàng rào mới vào được nhà.",
        definition_en: "a barrier, railing, or other upright structure, typically of wood or wire, enclosing an area of ground to prevent or control access or escape",
        example_en: "I installed a fence to keep my pets inside.\nThis fence really makes me feel at home.",
        example_vi: "Tôi đã lắp hàng rào để giữ thú cưng ở trong sân.\nHàng rào này thực sự khiến tôi cảm thấy như đang ở nhà.",
        page_number: 176
      },
      {
        word: "Furniture",
        phonetic: "/ˈfɝː.nɪ.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Đồ đạc",
        sound_bridge: "Hoa nở dọc con phố, Ny chờ ngày đẹp như này để dọn dẹp đồ đạc trong nhà.",
        definition_en: "the movable articles that are used to make a room or building suitable for living or working in, such as tables, chairs, or desks",
        example_en: "It's a beautiful house, but it needs new furniture.\nCould you help me move my furniture?",
        example_vi: "Đó là một ngôi nhà đẹp, nhưng cần có đồ đạc nội thất mới.\nBạn có thể giúp tôi chuyển đồ đạc được không?",
        page_number: 176
      },
      {
        word: "Laundry",
        phonetic: "/ˈlɑːn.dri/",
        word_type: "noun",
        meaning_vi: "Giặt là",
        sound_bridge: "Hiệu giặt là có một cái lon đã rỉ nhưng vẫn được bảo quản trong tủ kính.",
        definition_en: "the dirty clothes and sheets that need to be, are being, or have been washed",
        example_en: "Don't forget to do the laundry!\nWhere is the room for laundry?",
        example_vi: "Đừng quên giặt quần áo đấy nhé!\nPhòng giặt đồ ở đâu vậy?",
        page_number: 176
      },
      {
        word: "Lobby",
        phonetic: "/ˈlɑː.bi/",
        word_type: "noun",
        meaning_vi: "Hành lang, sảnh",
        sound_bridge: "Lưu Bị đang đợi Khổng Minh ở hành lang.",
        definition_en: "a room providing a space out of which one or more other rooms or corridors lead, typically one near the entrance of a public building",
        example_en: "I'll meet you in the lobby.\nGuests love to relax in the main lobby.",
        example_vi: "Tôi sẽ gặp bạn ở tiền sảnh.\nKhách rất thích thư giãn ở sảnh chính.",
        page_number: 176
      },
      {
        word: "Mirror",
        phonetic: "/ˈmɪr.ɚ/",
        word_type: "noun",
        meaning_vi: "Gương",
        sound_bridge: "My rờ vào chiếc gương bị hơi nước làm mờ đi.",
        definition_en: "a surface, typically of glass coated with a metal amalgam, which reflects a clear image",
        example_en: "I've got a large mirror in my bedroom.\nMy toothbrush is under the mirror.",
        example_vi: "Tôi có một chiếc gương lớn trong phòng ngủ.\nBàn chải đánh răng của tôi ở dưới gương.",
        page_number: 177
      },
      {
        word: "Napkin",
        phonetic: "/ˈnæp.kɪn/",
        word_type: "noun",
        meaning_vi: "Khăn ăn",
        sound_bridge: "Tôi đậy nắp hũ đường kín lại và đặt lên khăn ăn.",
        definition_en: "a square piece of cloth or paper used at a meal to wipe the fingers or lips and to protect garments",
        example_en: "It's polite to put the napkin on your lap.\nTake some extra napkins!",
        example_vi: "Đặt khăn ăn lên đùi là một phép lịch sự.\nLấy thêm vài chiếc khăn ăn nhé!",
        page_number: 177
      },
      {
        word: "Pillow",
        phonetic: "/ˈpɪl.oʊ/",
        word_type: "noun",
        meaning_vi: "Cái gối",
        sound_bridge: "Chỉ đi mua cái gối thôi mà thằng Pi đi lâu quá.",
        definition_en: "a rectangular cloth bag stuffed with feathers or other soft materials, used to support the head when lying or sleeping",
        example_en: "This bed has the best pillows.\nThere are two pillows on my bed.",
        example_vi: "Chiếc giường này có những chiếc gối êm nhất.\nCó hai cái gối trên giường của tôi.",
        page_number: 177
      },
      {
        word: "Property",
        phonetic: "/ˈprɑː.pɚ.t̬i/",
        word_type: "noun",
        meaning_vi: "Tài sản",
        sound_bridge: "Bơ rồi bơ đi, quyền sở hữu tài sản vẫn thuộc về con tôi.",
        definition_en: "a thing or things belonging to someone; possessions collectively",
        example_en: "This is private property.\nI'm going to give the property to my son when I pass away.",
        example_vi: "Đây là tài sản tư nhân.\nTôi sẽ trao lại tài sản cho con trai khi tôi qua đời.",
        page_number: 177
      },
      {
        word: "Restroom",
        phonetic: "/ˈrest.ruːm/",
        word_type: "noun",
        meaning_vi: "Nhà vệ sinh",
        sound_bridge: "Trời rét chỉ muốn trùm chăn ngồi trong nhà vệ sinh.",
        definition_en: "a toilet in a public building",
        example_en: "May I use the restroom?\nThe restroom is opposite to the bedroom.",
        example_vi: "Tôi có thể sử dụng nhà vệ sinh được không?\nNhà vệ sinh đối diện với phòng ngủ.",
        page_number: 177
      },
      {
        word: "Sheet",
        phonetic: "/ʃiːt/",
        word_type: "noun",
        meaning_vi: "Ga trải giường, tờ",
        sound_bridge: "Suýt nữa thì đã lạc mất tờ giấy trong mớ ga trải giường này.",
        definition_en: "a large piece of thin cloth used on a bed to lie on or lie under",
        example_en: "Clean the sheets before the guests arrive!\nThis sheet doesn't fit the bed.",
        example_vi: "Hãy giặt sạch ga trải giường trước khi khách đến nhé!\nTấm ga trải giường này không vừa với chiếc giường.",
        page_number: 177
      },
      {
        word: "Structure",
        phonetic: "/ˈstrʌk.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Kết cấu",
        sound_bridge: "Bản kết cấu địa trắc chờ phê duyệt.",
        definition_en: "the arrangement of and relations between the parts or elements of something complex",
        example_en: "It's not a sturdy structure.\nMay I see the plans for the structure?",
        example_vi: "Nó không phải là một công trình kết cấu vững chắc.\nTôi có thể xem bản vẽ kết cấu được không?",
        page_number: 178
      },
      {
        word: "Towel",
        phonetic: "/ˈtaʊ.əl/",
        word_type: "noun",
        meaning_vi: "Khăn",
        sound_bridge: "Tôi đem theo khăn khi lên chuyến tàu ở New York.",
        definition_en: "a piece of thick absorbent cloth or paper used for drying oneself or wiping things dry",
        example_en: "I forgot to bring my towel to the beach, so I didn't swim.\nI'll give you a clean towel.",
        example_vi: "Tôi quên mang khăn ra bãi biển nên tôi đã không bơi.\nTôi sẽ đưa cho bạn một chiếc khăn sạch.",
        page_number: 178
      },
      {
        word: "Trash",
        phonetic: "/træʃ/",
        word_type: "verb",
        meaning_vi: "Vứt đi, rác",
        sound_bridge: "Cây tre sau khi bị vứt đi đã được Bình vuốt nhọn thành cọc chông.",
        definition_en: "to cause a lot of damage to something",
        example_en: "Don't trash the place!\nThe soccer team completely trashed the hotel room after their victory.",
        example_vi: "Đừng phá hoại/xả rác bừa bãi ra nơi này!\nĐội bóng đã phá hoại hoàn toàn căn phòng khách sạn sau chiến thắng.",
        page_number: 178
      },
      {
        word: "Wheelchair",
        phonetic: "/ˈwiːl.tʃer/",
        word_type: "noun",
        meaning_vi: "Xe lăn",
        sound_bridge: "Ngồi xe lăn nhớ đeo gậy tre ở bên cạnh để xua đuổi ma tà nhé.",
        definition_en: "a chair fitted with wheels for use as a means of transport by a person who is unable to walk as a result of illness, injury, or disability",
        example_en: "Is the hotel good for people in wheelchairs?\nAfter the accident, she had to use a wheelchair.",
        example_vi: "Khách sạn này có thuận tiện cho người đi xe lăn không?\nSau vụ tai nạn, cô ấy đã phải sử dụng xe lăn.",
        page_number: 178
      },
      {
        word: "Yard",
        phonetic: "/jɑːrd/",
        word_type: "noun",
        meaning_vi: "Cái sân có rào xung quanh",
        sound_bridge: "Hãy ya, tránh ra xem ta nhảy qua cái sân có rào xung quanh kìa nhé!",
        definition_en: "a piece of land next to a house, usually used for growing flowers, grass, and other plants",
        example_en: "A big yard is necessary for my family.\nMy yard has some flowers and trees.",
        example_vi: "Một cái sân lớn là điều cần thiết đối với gia đình tôi.\nSân nhà tôi có một số loài hoa và cây cối.",
        page_number: 178
      }
    ]
  },

  19: {
    unit: 19,
    unit_title: "Home 2",
    category: "Home & Family",
    words: [
      {
        word: "Adopt",
        phonetic: "/əˈdɑːpt/",
        word_type: "verb",
        meaning_vi: "Nhận nuôi",
        sound_bridge: "Ông bù đắp cho Sơn bằng cách nhận nuôi cậu.",
        definition_en: "to take somebody else's child into your family and become its legal parent(s)",
        example_en: "Let's adopt a kitten!\nThey adopted a little girl.",
        example_vi: "Chúng ta hãy nhận nuôi một chú mèo con nhé!\nHọ đã nhận nuôi một bé gái nhỏ.",
        page_number: 183
      },
      {
        word: "Allow",
        phonetic: "/əˈlaʊ/",
        word_type: "verb",
        meaning_vi: "Cho phép",
        sound_bridge: "Ôi lâu thế! Mẹ cậu đã đồng ý cho phép cậu đi chơi với tớ chưa đấy?",
        definition_en: "to let somebody or something do something; to let something happen or be done",
        example_en: "I won't allow you to have a boyfriend!\nThe city doesn't allow big lights that use too much electricity.",
        example_vi: "Bố sẽ không cho phép con có bạn trai đâu!\nThành phố không cho phép sử dụng những bóng đèn lớn tiêu tốn quá nhiều điện.",
        page_number: 183
      },
      {
        word: "Anniversary",
        phonetic: "/ˌæn.əˈvɝː.sɚ.i/",
        word_type: "noun",
        meaning_vi: "Lễ kỉ niệm",
        sound_bridge: "Nhân lễ kỉ niệm tháng lương đầu tiên, anh sẽ cho em ăn mì với sơ-ri Hàn Quốc thỏa thích.",
        definition_en: "a date that is an exact number of years after the date of an important or special event",
        example_en: "It's our 25th wedding anniversary today.\nTomorrow is the anniversary of my grandfather's death.",
        example_vi: "Hôm nay là kỷ niệm 25 năm ngày cưới của chúng tôi.\nNgày mai là ngày giỗ của ông tôi.",
        page_number: 183
      },
      {
        word: "Celebrate",
        phonetic: "/ˈsel.ə.breɪt/",
        word_type: "verb",
        meaning_vi: "Ăn mừng",
        sound_bridge: "Xé lẻ bò đối lấy sừng trang trí là cách ăn mừng của chủ quán thịt.",
        definition_en: "to show that a day or an event is important by doing something special on it",
        example_en: "I'm celebrating the good news with my family.\nThey celebrated Christmas with their friends.",
        example_vi: "Tôi đang ăn mừng tin vui cùng với gia đình của mình.\nHọ đã ăn mừng lễ Giáng sinh cùng với bạn bè của mình.",
        page_number: 183
      },
      {
        word: "Compare",
        phonetic: "/kəmˈper/",
        word_type: "verb",
        meaning_vi: "So sánh",
        sound_bridge: "So sánh: cơm mẹ nấu ngon như cơm cô hàng xóm nấu.",
        definition_en: "to examine people or things to see how they are similar and how they are different",
        example_en: "Don't compare me to your mother!\nThis pizza doesn't compare with my mom's.",
        example_vi: "Đừng so sánh tôi với mẹ của anh!\nMón pizza này không thể so sánh với pizza mẹ tôi làm.",
        page_number: 184
      },
      {
        word: "Cozy",
        phonetic: "/ˈkoʊ.zi/",
        word_type: "adjective",
        meaning_vi: "Ấm cúng",
        sound_bridge: "Cảnh cả nhà vừa xem TV vừa ăn bánh Cosy thật là ấm cúng.",
        definition_en: "warm, comfortable and safe, especially because of being small or confined",
        example_en: "The new chair is so cozy.\nThis is a cozy place to go on a honeymoon.",
        example_vi: "Chiếc ghế mới thật là ấm cúng và dễ chịu.\nĐây là một nơi ấm cúng để đi hưởng tuần trăng mật.",
        page_number: 184
      },
      {
        word: "Engaged",
        phonetic: "/ɪnˈɡeɪdʒd/",
        word_type: "adjective",
        meaning_vi: "Đính hôn",
        sound_bridge: "Sau khi đính hôn Bi vẫn bị cho ăn gậy.",
        definition_en: "having formally agreed to marry",
        example_en: "Tom is engaged to Mary.\nAfter getting engaged, they start to make plans for their wedding.",
        example_vi: "Tom đã đính hôn với Mary.\nSau khi đính hôn, họ bắt đầu lên kế hoạch cho đám cưới.",
        page_number: 184
      },
      {
        word: "Family",
        phonetic: "/ˈfæm.əl.i/",
        word_type: "noun",
        meaning_vi: "Gia đình",
        sound_bridge: "Pha cho tao ly nước mơ rồi tao kể chuyện gia đình nó cho.",
        definition_en: "a group consisting of one or two parents and their children",
        example_en: "There are eight people in my family.\nThis house has belonged to my family for hundreds of years.",
        example_vi: "Có tám người trong gia đình tôi.\nNgôi nhà này đã thuộc về gia đình tôi hàng trăm năm nay.",
        page_number: 184
      },
      {
        word: "Groom",
        phonetic: "/ɡruːm/",
        word_type: "noun",
        meaning_vi: "Chú rể",
        sound_bridge: "Chú rể co rúm người lại khi con ngựa phát điên.",
        definition_en: "a man who is about to get married or has just got married",
        example_en: "The groom cried when he saw his wife.\nI'm a friend of the groom.",
        example_vi: "Chú rể đã bật khóc khi nhìn thấy người vợ của mình.\nTôi là bạn của chú rể.",
        page_number: 184
      },
      {
        word: "Housekeeper",
        phonetic: "/ˈhaʊsˌkiː.pɚ/",
        word_type: "noun",
        meaning_vi: "Người quản gia",
        sound_bridge: "Người quản gia hoàn hảo kia Bơ!",
        definition_en: "a person, usually a woman, whose job is to manage the shopping, cooking, cleaning, etc. in a house or an institution",
        example_en: "The housekeeper always forgets to clean the windows.\nWe are too busy, so we hired a housekeeper.",
        example_vi: "Người quản gia luôn quên lau chùi các cửa sổ.\nChúng tôi quá bận rộn, vì vậy chúng tôi đã thuê một người quản gia.",
        page_number: 184
      },
      {
        word: "Housewife",
        phonetic: "/ˈhaʊs.waɪf/",
        word_type: "noun",
        meaning_vi: "Bà nội trợ",
        sound_bridge: "Tại nhà (house) vợ (wife) hôm nay có buổi liên hoan dành cho các bà nội trợ.",
        definition_en: "a woman who stays at home to cook, clean, take care of the children, etc. while her husband or partner goes out to work",
        example_en: "I don't want to be a housewife. I want to work.\nYou'll make a good housewife one day.",
        example_vi: "Tôi không muốn làm một bà nội trợ. Tôi muốn đi làm.\nMột ngày nào đó bạn sẽ trở thành một bà nội trợ đảm đang.",
        page_number: 185
      },
      {
        word: "Husband",
        phonetic: "/ˈhʌz.bənd/",
        word_type: "noun",
        meaning_vi: "Chồng, ông chồng",
        sound_bridge: "Ông chồng đang hớt rác bẩn trong hồ.",
        definition_en: "the man that somebody is married to; a married man",
        example_en: "Do our husbands know each other?\nI divorced my husband last month.",
        example_vi: "Chồng của chúng ta có quen biết nhau không?\nTôi đã ly hôn với chồng vào tháng trước.",
        page_number: 185
      },
      {
        word: "Instinct",
        phonetic: "/ˈɪn.stɪŋkt/",
        word_type: "noun",
        meaning_vi: "Bản năng",
        sound_bridge: "Hãy in tiền theo bản năng mà cậu có.",
        definition_en: "the way people or animals naturally react or behave, without having to think or learn about it",
        example_en: "It takes good instincts to hunt.\nIt's just an instinct. I do it without thinking.",
        example_vi: "Cần có những bản năng nhạy bén để đi săn.\nĐó chỉ là một bản năng thôi. Tôi làm điều đó mà không cần suy nghĩ.",
        page_number: 185
      },
      {
        word: "Landlord",
        phonetic: "/ˈlænd.lɔːrd/",
        word_type: "noun",
        meaning_vi: "Chủ nhà",
        sound_bridge: "Vùng đất (land) có 1 chúa tể (lord) được gọi là chủ nhà.",
        definition_en: "a person or company from whom you rent a room, a house, an office, etc.",
        example_en: "The landlord never calls me back.\nI pay my landlord every two months.",
        example_vi: "Chủ nhà không bao giờ gọi điện lại cho tôi.\nTôi trả tiền cho chủ nhà hai tháng một lần.",
        page_number: 185
      },
      {
        word: "Member",
        phonetic: "/ˈmem.bɚ/",
        word_type: "noun",
        meaning_vi: "Thành viên",
        sound_bridge: "Mỗi thành viên đều phải có kĩ năng mềm, bởi vì nó thể hiện sự chuyên nghiệp của bạn.",
        definition_en: "a person, an animal or a plant that belongs to a particular group",
        example_en: "Are you a member of the golf club?\nThere are three members in my family.",
        example_vi: "Bạn có phải là thành viên của câu lạc bộ gôn không?\nCó ba thành viên trong gia đình tôi.",
        page_number: 185
      },
      {
        word: "Neighbor",
        phonetic: "/ˈneɪ.bɚ/",
        word_type: "noun",
        meaning_vi: "Hàng xóm",
        sound_bridge: "'Thằng này lai bà hàng xóm rồi!' bố tôi trêu vậy.",
        definition_en: "a person who lives next to you or near you",
        example_en: "My neighbors get annoyed when I have guests.\nHave you met the neighbors yet?",
        example_vi: "Hàng xóm của tôi cảm thấy khó chịu khi tôi có khách đến chơi.\nBạn đã gặp những người hàng xóm mới chưa?",
        page_number: 185
      },
      {
        word: "Owner",
        phonetic: "/ˈoʊ.nɚ/",
        word_type: "noun",
        meaning_vi: "Người chủ",
        sound_bridge: "Người chủ thường phải suy nghĩ nhiều tới nỗi ốm nè.",
        definition_en: "a person who owns something",
        example_en: "I am its rightful owner.\nWho is the owner of the truck?",
        example_vi: "Tôi là người chủ sở hữu hợp pháp của nó.\nAi là chủ của chiếc xe tải đó vậy?",
        page_number: 186
      },
      {
        word: "Receive",
        phonetic: "/rɪˈsiːv/",
        word_type: "verb",
        meaning_vi: "Nhận",
        sound_bridge: "Tôi vừa nhận được con chim ri từ người ship hàng.",
        definition_en: "to get or accept something that is sent or given to you",
        example_en: "I received a lot of money for my birthday.\nHave you received my email?",
        example_vi: "Tôi đã nhận được rất nhiều tiền vào ngày sinh nhật của mình.\nBạn đã nhận được email của tôi chưa?",
        page_number: 186
      },
      {
        word: "Relate",
        phonetic: "/rɪˈleɪt/",
        word_type: "verb",
        meaning_vi: "Liên quan, thấu hiểu",
        sound_bridge: "Ri lấy hàng trong bữa tiệc và bị nghi có liên quan đến vụ hối lộ.",
        definition_en: "to find or show the connection between two or more things",
        example_en: "I can't relate to my sister at all.\nLet's relate this to the beginning of the story!",
        example_vi: "Tôi hoàn toàn không thể đồng cảm/hiểu nổi chị gái tôi.\nHãy liên hệ điều này với phần mở đầu của câu chuyện!",
        page_number: 186
      },
      {
        word: "Ruin",
        phonetic: "/ˈruː.ɪn/",
        word_type: "verb",
        meaning_vi: "Phá hoại",
        sound_bridge: "Phá hoại cây xanh về giờ đang ngồi run.",
        definition_en: "to damage something so badly that it loses all its value, pleasure, etc.; to spoil something",
        example_en: "You'll ruin our relationship!\nThe storm ruined my business.",
        example_vi: "Bạn sẽ phá hỏng mối quan hệ của chúng ta mất!\nCơn bão đã phá hủy công việc kinh doanh của tôi.",
        page_number: 186
      },
      {
        word: "Settle",
        phonetic: "/ˈset̬.əl/",
        word_type: "verb",
        meaning_vi: "Ổn định, định cư",
        sound_bridge: "Xét về số lượng tổ ong thì tháng này vẫn ở mức ổn định, chưa thay đổi.",
        definition_en: "to go and live somewhere, especially permanently",
        example_en: "I want to settle in France.\nThey'll get married and settle in New York.",
        example_vi: "Tôi muốn định cư ở Pháp.\nHọ sẽ kết hôn và định cư ở New York.",
        page_number: 186
      },
      {
        word: "Spouse",
        phonetic: "/spaʊs/",
        word_type: "noun",
        meaning_vi: "Vợ hoặc chồng, bạn đời",
        sound_bridge: "Ai là người hay sờ bao tiền? Vợ hay chồng?",
        definition_en: "a person's husband or wife",
        example_en: "Have you met my spouse?\nI just want a big family and a loving spouse.",
        example_vi: "Bạn đã gặp người bạn đời của tôi chưa?\nTôi chỉ muốn có một gia đình lớn và một người bạn đời yêu thương tôi.",
        page_number: 186
      },
      {
        word: "Stranger",
        phonetic: "/ˈstreɪn.dʒɚ/",
        word_type: "noun",
        meaning_vi: "Người lạ",
        sound_bridge: "Sợ trên giường có người lạ chui vào nằm.",
        definition_en: "a person that you do not know",
        example_en: "Don't talk to strangers on the street.\nHe is a complete stranger to me.",
        example_vi: "Đừng nói chuyện với người lạ trên đường.\nAnh ấy là một người hoàn toàn xa lạ đối với tôi.",
        page_number: 187
      },
      {
        word: "Wife",
        phonetic: "/waɪf/",
        word_type: "noun",
        meaning_vi: "Người vợ",
        sound_bridge: "Điểm Oai-phai (Wi-Fi) ở gần nhà vợ.",
        definition_en: "the woman that somebody is married to; a married woman",
        example_en: "My wife and I have been married for ten years.\nHe bought a beautiful diamond ring for his wife.",
        example_vi: "Vợ tôi và tôi đã kết hôn được mười năm.\nAnh ấy đã mua một chiếc nhẫn kim cương tuyệt đẹp cho vợ mình.",
        page_number: 187
      }
    ]
  },

  20: {
    unit: 20,
    unit_title: "Relationship & Places 1",
    category: "Places & Travel",
    words: [
      {
        word: "Abide by",
        phonetic: "/əˈbaɪd baɪ/",
        word_type: "verb",
        meaning_vi: "Tuân theo",
        sound_bridge: "Ở bai bai. Nhớ tuân theo hướng dẫn của bác sĩ trước khi dùng nhé.",
        definition_en: "to accept and act according to a law, an agreement, etc.",
        example_en: "Make sure you abide by the rules!\nThis hotel abides by all safety standards.",
        example_vi: "Hãy chắc chắn rằng bạn tuân theo các quy tắc nhé!\nKhách sạn này tuân thủ mọi tiêu chuẩn an toàn.",
        page_number: 192
      },
      {
        word: "Assert",
        phonetic: "/əˈsɝːt/",
        word_type: "verb",
        meaning_vi: "Khẳng định",
        sound_bridge: "Ơ xớt có tí da tay mà nó khẳng định là gãy tay đòi bồi thường.",
        definition_en: "to state clearly and firmly that something is true",
        example_en: "You need to assert your dominance.\nThis job will really assert you as a top lawyer.",
        example_vi: "Bạn cần phải khẳng định vị thế thống trị của mình.\nCông việc này sẽ thực sự khẳng định bạn là một luật sư hàng đầu.",
        page_number: 192
      },
      {
        word: "Assurance",
        phonetic: "/əˈʃʊr.əns/",
        word_type: "noun",
        meaning_vi: "Sự chắc chắn, bảo đảm",
        sound_bridge: "Chắc chắn anh sẽ sửa sai dần mà, tha lỗi cho anh nhé!",
        definition_en: "a statement that something will certainly be true or will certainly happen, particularly when there has been doubt about it",
        example_en: "Can you give me assurance that it's safe?\nDai gave his girlfriend his assurance that he will treat her Queen.",
        example_vi: "Bạn có thể bảo đảm với tôi rằng việc này an toàn không?\nĐại cam đoan với bạn gái rằng anh sẽ đối xử với cô như một nữ hoàng.",
        page_number: 192
      },
      {
        word: "Belief",
        phonetic: "/bɪˈliːf/",
        word_type: "noun",
        meaning_vi: "Niềm tin",
        sound_bridge: "Niềm tin là bất tận dù bị chia ly, phải không?",
        definition_en: "a strong feeling that something/somebody exists or is true; confidence that something/somebody is good or right",
        example_en: "There are thousands of different religious beliefs.\nI have the belief that most people are good.",
        example_vi: "Có hàng ngàn niềm tin tôn giáo khác nhau.\nTôi có niềm tin rằng hầu hết mọi người đều tốt bụng.",
        page_number: 192
      },
      {
        word: "Circumstance",
        phonetic: "/ˈsɝː.kəm.stæns/",
        word_type: "noun",
        meaning_vi: "Hoàn cảnh",
        sound_bridge: "Vì cô ta sinh ra trong hoàn cảnh gia đình có điều kiện nên cô ta sợ cầm con cá vì sợ tanh.",
        definition_en: "the conditions and facts that are connected with and affect a situation, an event or an action",
        example_en: "Under different circumstances, I would stay and talk, but I am late for work.\nShe is clever in all circumstances.",
        example_vi: "Trong một hoàn cảnh khác, tôi sẽ ở lại nói chuyện, nhưng tôi đang bị muộn giờ làm.\nCô ấy luôn thông minh khéo léo trong mọi hoàn cảnh.",
        page_number: 193
      },
      {
        word: "Citizen",
        phonetic: "/ˈsɪt̬.ə.zən/",
        word_type: "noun",
        meaning_vi: "Người dân, công dân",
        sound_bridge: "Máy chụp CT dừng hoạt động vì người dân đi chụp quá đông.",
        definition_en: "a person who is a member of a particular country or a person who lives in a particular town or city",
        example_en: "Citizens were unhappy with the pollution.\nNam is a citizen of two countries.",
        example_vi: "Người dân không hài lòng với tình trạng ô nhiễm.\nNam là công dân của hai quốc gia.",
        page_number: 193
      },
      {
        word: "Crown",
        phonetic: "/kraʊn/",
        word_type: "noun",
        meaning_vi: "Vương miện",
        sound_bridge: "Luôn có rào chắn xung quanh vương miện.",
        definition_en: "an object in the shape of a circle, usually made of gold and precious stones, that a king or queen wears on his or her head on official occasions",
        example_en: "After her death, she will pass the crown to her daughter.\nThe crown was decorated with diamonds and rubies.",
        example_vi: "Sau khi qua đời, bà sẽ truyền lại vương miện cho con gái mình.\nChiếc vương miện được đính kim cương và hồng ngọc.",
        page_number: 193
      },
      {
        word: "Deprive",
        phonetic: "/dɪˈpraɪv/",
        word_type: "verb",
        meaning_vi: "Tước đoạt",
        sound_bridge: "Mượn xe tao đi phải về chứ đừng tước đoạt luôn đấy.",
        definition_en: "to take something, especially something necessary or pleasant, away from someone",
        example_en: "All this noise deprived me of sleep.\nDon't deprive me of my favorite food!",
        example_vi: "Tất cả tiếng ồn này đã cướp đi giấc ngủ của tôi.\nĐừng tước đoạt món ăn yêu thích của tôi!",
        page_number: 193
      },
      {
        word: "Dilemma",
        phonetic: "/daɪˈlem.ə/",
        word_type: "noun",
        meaning_vi: "Tình thế khó xử",
        sound_bridge: "Đi làm mà toàn gặp những tình huống tình thế khó xử.",
        definition_en: "a situation which makes problems, often one in which you have to make a very difficult choice between things of equal importance",
        example_en: "I'm in a bit of a dilemma right now.\nThis is a moral dilemma.",
        example_vi: "Hiện tại tôi đang ở trong một tình huống hơi khó xử.\nĐây là một tình huống khó xử về mặt đạo đức.",
        page_number: 193
      },
      {
        word: "Edge",
        phonetic: "/edʒ/",
        word_type: "noun",
        meaning_vi: "Bến bờ, mép",
        sound_bridge: "Bến bờ hạnh phúc là kết thúc bài thi với cảm giác dễ ẹt.",
        definition_en: "the outside limit of an object, a surface or an area; the part furthest from the center",
        example_en: "Stay away from the edge of the cliff! It's dangerous.\nThe temple is located on the edge of the mountain.",
        example_vi: "Hãy tránh xa mép vách đá! Rất nguy hiểm đấy.\nNgôi đền nằm bên bờ mép núi.",
        page_number: 193
      },
      {
        word: "Enhance",
        phonetic: "/ɪnˈhæns/",
        word_type: "verb",
        meaning_vi: "Nâng cao",
        sound_bridge: "Bài toán nâng cao hôm qua thầy giảng đã in hẳn trong đầu tôi.",
        definition_en: "to improve the quality, amount, or strength of something",
        example_en: "You can enhance your muscles with this protein drink.\nThis light really enhances your beauty.",
        example_vi: "Bạn có thể nâng cao cơ bắp bằng đồ uống bổ sung protein này.\nÁnh sáng này thực sự tôn lên vẻ đẹp của bạn.",
        page_number: 194
      },
      {
        word: "Inhabitant",
        phonetic: "/ɪnˈhæb.ɪ.tənt/",
        word_type: "noun",
        meaning_vi: "Cư dân",
        sound_bridge: "Cư dân ở trên đảo này phải tuân thủ nguyên tắc: im lặng hoặc bị táng.",
        definition_en: "a person or an animal that lives in a particular place",
        example_en: "All inhabitants of the island need to leave before the storm comes.\nWe cannot accept 1000 new inhabitants.",
        example_vi: "Tất cả cư dân trên đảo cần phải rời đi trước khi bão đến.\nChúng tôi không thể tiếp nhận thêm 1000 cư dân mới.",
        page_number: 194
      },
      {
        word: "Lease",
        phonetic: "/liːs/",
        word_type: "noun",
        meaning_vi: "Hợp đồng cho thuê",
        sound_bridge: "Mọi người nghĩ anh ta điên vì đi kí một hợp đồng cho thuê một lít xăng.",
        definition_en: "to make a legal agreement by which money is paid in order to use land, a building, a vehicle, or a piece of equipment for an agreed period of time",
        example_en: "I'm leasing the room for a month.\nMy husband and I are leasing our extra bedroom for some more money.",
        example_vi: "Tôi đang cho thuê căn phòng trong một tháng.\nChồng tôi và tôi đang cho thuê phòng ngủ phụ để kiếm thêm tiền.",
        page_number: 194
      },
      {
        word: "Mankind",
        phonetic: "/mænˈkaɪnd/",
        word_type: "noun",
        meaning_vi: "Nhân loại",
        sound_bridge: "Anh ấy men kinh khủng, làm cả nhân loại phát cuồng.",
        definition_en: "all humans, thought about as one large group; the human race",
        example_en: "This technology will benefit all of mankind.\nMankind is doomed.",
        example_vi: "Công nghệ này sẽ mang lại lợi ích cho toàn thể nhân loại.\nNhân loại đang bị đe dọa diệt vong.",
        page_number: 194
      },
      {
        word: "Moral",
        phonetic: "/ˈmɔːr.əl/",
        word_type: "noun",
        meaning_vi: "Đạo đức",
        sound_bridge: "Đạo đức của bác sĩ được đánh giá khi mổ ruột.",
        definition_en: "relating to the standards of good or bad behaviour, fairness, honesty, etc. that each person believes in, rather than to laws",
        example_en: "She is a moral woman.\nIn war, it is difficult to know the most moral decision.",
        example_vi: "Cô ấy là một người phụ nữ có đạo đức.\nTrong chiến tranh, rất khó để biết đâu là quyết định có đạo đức nhất.",
        page_number: 194
      },
      {
        word: "Proximity",
        phonetic: "/prɑːkˈsɪm.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Gần gũi",
        sound_bridge: "Bin phát rồ rồi mặt bí xị xuống khi Mi tý nữa cắm sừng anh vì cứ hay gần gũi với Bo.",
        definition_en: "the state of being near somebody/something in distance or time",
        example_en: "The bombs were all in close proximity.\nThe phones only work in close proximity to a radio tower.",
        example_vi: "Những quả bom đều ở khoảng cách rất gần nhau.\nĐiện thoại chỉ hoạt động ở cự ly gần một tháp phát thanh.",
        page_number: 194
      },
      {
        word: "Religion",
        phonetic: "/rɪˈlɪdʒ.ən/",
        word_type: "noun",
        meaning_vi: "Tôn giáo",
        sound_bridge: "Đi lấy dần mấy quyển sách tôn giáo về tìm hiểu.",
        definition_en: "the belief in and worship of a god or gods, or any such system of belief and worship",
        example_en: "The three main religions live together peacefully in this country.\nI have no religion, but I believe there is life after death.",
        example_vi: "Ba tôn giáo chính cùng chung sống hòa bình tại đất nước này.\nTôi không theo tôn giáo nào, nhưng tôi tin có sự sống sau cái chết.",
        page_number: 195
      },
      {
        word: "Resident",
        phonetic: "/ˈrez.ə.dənt/",
        word_type: "noun",
        meaning_vi: "Cư dân",
        sound_bridge: "Trời đang mưa, tôi bảo cư dân che ô đi đừng đi nữa.",
        definition_en: "a person who lives or has their home in a place",
        example_en: "All city residents agreed that a new park should be built.\nThe residents of this town don't really accept strangers.",
        example_vi: "Tất cả cư dân thành phố đều đồng ý rằng nên xây dựng một công viên mới.\nCư dân của thị trấn này không thực sự cởi mở đón nhận người lạ.",
        page_number: 195
      },
      {
        word: "Shelter",
        phonetic: "/ˈʃel.t̬ɚ/",
        word_type: "verb",
        meaning_vi: "Che chở",
        sound_bridge: "Cậu ta chỉ xem tớ như một thứ để che chở khi cậu ta cần thôi.",
        definition_en: "to protect yourself, or another person or thing, from bad weather, danger, or attack",
        example_en: "We sheltered from the dust storm inside a cave.\nShe often shelters the homeless.",
        example_vi: "Chúng tôi đã trú bão bụi bên trong một hang động.\nCô ấy thường xuyên cưu mang che chở cho những người vô gia cư.",
        page_number: 195
      },
      {
        word: "Society",
        phonetic: "/səˈsaɪ.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Xã hội",
        sound_bridge: "Con bé sợ đánh vần sai từ 'xã hội'.",
        definition_en: "people in general, living together in communities",
        example_en: "Nowadays, society relies too much on technology.\nIt was a peaceful society.",
        example_vi: "Ngày nay, xã hội phụ thuộc quá nhiều vào công nghệ.\nĐó đã từng là một xã hội thanh bình.",
        page_number: 195
      },
      {
        word: "Terrace",
        phonetic: "/ˈter.əs/",
        word_type: "noun",
        meaning_vi: "Sân hiên",
        sound_bridge: "Nó ngã té rớt từ sân hiên xuống.",
        definition_en: "a flat, hard area, especially outside a house or restaurant, where you can sit, eat and enjoy the sun",
        example_en: "He had big party on the terrace.\nI prefer the house with a terrace.",
        example_vi: "Anh ấy đã tổ chức một bữa tiệc lớn trên sân hiên.\nTôi thích một ngôi nhà có sân hiên hơn.",
        page_number: 195
      },
      {
        word: "Tribe",
        phonetic: "/traɪb/",
        word_type: "noun",
        meaning_vi: "Bộ tộc",
        sound_bridge: "Trai ở bộ tộc này toàn mặc khố mày tha hồ mà bổ mắt nhé.",
        definition_en: "a group of people of the same race, and with the same customs, language, religion, etc.",
        example_en: "The tribe's elders will decide your punishment.\nWe welcome you into our tribe.",
        example_vi: "Các trưởng lão trong bộ tộc sẽ quyết định hình phạt dành cho bạn.\nChúng tôi chào đón bạn gia nhập vào bộ tộc của chúng tôi.",
        page_number: 195
      },
      {
        word: "Vested",
        phonetic: "/ˈves.tɪd/",
        word_type: "adjective",
        meaning_vi: "Được trao quyền, được đảm bảo",
        sound_bridge: "Mặc áo vest tít đằng xa để thể hiện mình là người được trao quyền.",
        definition_en: "fully and unconditionally guaranteed as a legal right, benefit, or privilege",
        example_en: "He has a vested interest in the success of the company.\nBy the authority vested in me, I declare the museum open.",
        example_vi: "Anh ấy có quyền lợi gắn liền và được đảm bảo với sự thành công của công ty.\nTheo quyền hạn được trao cho tôi, tôi tuyên bố bảo tàng chính thức mở cửa.",
        page_number: 196
      }
    ]
  }
};

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
let vocabList = JSON.parse(raw);

// Lọc bỏ các từ cũ của Unit 16, 17, 18, 19, 20
const otherUnitsVocab = vocabList.filter(w => w.unit < 16 || w.unit > 20);

// Xây dựng lại mảng từ vựng Units 16 -> 20 với word_number liên tục bắt đầu từ 418
let currentWordNumber = 418;
const updatedUnitsVocab = [];

for (let u = 16; u <= 20; u++) {
  const uData = CORRECT_UNITS_DATA[u];
  for (const w of uData.words) {
    updatedUnitsVocab.push({
      word_number: currentWordNumber++,
      unit: uData.unit,
      unit_title: uData.unit_title,
      category: uData.category,
      word: w.word,
      phonetic: w.phonetic,
      word_type: w.word_type,
      meaning_vi: w.meaning_vi,
      sound_bridge: w.sound_bridge,
      definition_en: w.definition_en,
      example_en: w.example_en,
      example_vi: w.example_vi,
      page_number: w.page_number
    });
  }
}

// Cập nhật word_number cho các Unit phía sau (Unit 21 trở đi nếu có)
const afterUnitsVocab = vocabList.filter(w => w.unit > 20);
for (const w of afterUnitsVocab) {
  w.word_number = currentWordNumber++;
}

// Hợp nhất lại toàn bộ vocabList
const finalVocabList = [
  ...vocabList.filter(w => w.unit < 16),
  ...updatedUnitsVocab,
  ...afterUnitsVocab
];

fs.writeFileSync(jsonPath, JSON.stringify(finalVocabList, null, 2), 'utf8');

console.log(`\n🎉 HOÀN TẤT ĐỒNG BỘ 100% CHÍNH XÁC THEO SÁCH CHO UNITS 16 -> 20!`);
for (let u = 16; u <= 20; u++) {
  const uWords = finalVocabList.filter(w => w.unit === u);
  console.log(`- Unit ${u} (${CORRECT_UNITS_DATA[u].unit_title}): ${uWords.length} từ (#${uWords[0].word_number} ${uWords[0].word} -> #${uWords[uWords.length-1].word_number} ${uWords[uWords.length-1].word})`);
}
console.log(`Tổng số từ trong toàn bộ từ điển: ${finalVocabList.length}`);
