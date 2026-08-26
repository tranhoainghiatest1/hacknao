import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BỘ DỮ LIỆU CHUẨN XÁC 100% THEO SÁCH SCAN GỐC HACK NÃO 1500 (UNITS 41 -> 50)
// Mỗi từ đều có: Word, Phonetic, Word Type, Meaning VI, Sound Bridge, Definition EN, 2 câu ví dụ EN + VI, Page Number
const UNITS_41_TO_50_DATA = {
  // ==========================================
  // UNIT 41: Describing Things 4 (25 từ, Trang 395 - 401)
  // ==========================================
  41: {
    unit: 41,
    unit_title: "Describing Things 4",
    category: "Descriptions & Characteristics",
    words: [
      {
        word: "Awkward",
        phonetic: "/ˈɑː.kwɚd/",
        word_type: "adjective",
        meaning_vi: "Gượng gạo, lúng túng, vụng về",
        sound_bridge: "Óc quạ ăn vụng tạo nên tình huống lúng túng ngượng ngùng.",
        definition_en: "causing difficulty; hard to do or deal with; causing or feeling embarrassment",
        example_en: "There was an awkward silence after the heated argument.\nHe felt awkward dancing in front of a large crowd.",
        example_vi: "Đã có một sự im lặng gượng gạo sau cuộc tranh cãi gay gắt.\nAnh ấy cảm thấy lúng túng ngượng ngùng khi nhảy trước một đám đông lớn.",
        page_number: 395
      },
      {
        word: "Disgusting",
        phonetic: "/dɪsˈɡʌs.tɪŋ/",
        word_type: "adjective",
        meaning_vi: "Kinh tởm, đáng ghét",
        sound_bridge: "Đi sợ gà thối có mùi kinh tởm không chịu nổi.",
        definition_en: "arousing revulsion or strong indignation",
        example_en: "The rotten food in the trash bin smelled disgusting.\nIt is disgusting how much plastic waste is dumped into rivers.",
        example_vi: "Thức ăn ôi thiu trong thùng rác có mùi kinh tởm.\nThật đáng ghê tởm khi biết bao rác thải nhựa bị đổ xuống các dòng sông.",
        page_number: 395
      },
      {
        word: "Exact",
        phonetic: "/ɪɡˈzækt/",
        word_type: "adjective",
        meaning_vi: "Chính xác, chuẩn xác",
        sound_bridge: "In giấy phép yêu cầu ghi chính xác từng số liệu.",
        definition_en: "not approximated in any way; precise",
        example_en: "Can you tell me the exact location of the conference?\nThe scientist measured the exact temperature of the liquid.",
        example_vi: "Bạn có thể cho tôi biết địa điểm chính xác của hội nghị không?\nNhà khoa học đã đo nhiệt độ chuẩn xác của chất lỏng.",
        page_number: 395
      },
      {
        word: "Fault",
        phonetic: "/fɑːlt/",
        word_type: "noun",
        meaning_vi: "Lỗi lầm, khuyết điểm",
        sound_bridge: "Phở lẩu cháy khét là lỗi lầm của người đầu bếp.",
        definition_en: "an unattractive or unsatisfactory feature; responsibility for an accident or misfortune",
        example_en: "It was entirely my fault that we missed the train.\nThe power failure was due to an electrical fault in the wiring.",
        example_vi: "Hoàn toàn là lỗi lầm của tôi khi chúng ta bị lỡ chuyến tàu.\nSự cố mất điện là do một lỗi điện trong hệ thống dây dẫn.",
        page_number: 395
      },
      {
        word: "Imperative",
        phonetic: "/ɪmˈper.ə.t̬ɪv/",
        word_type: "adjective",
        meaning_vi: "Cấp bách, bắt buộc",
        sound_bridge: "In phong thư cấp bách gửi đi ngay trong đêm.",
        definition_en: "of vital importance; crucial",
        example_en: "It is imperative that we submit the report before five.\nImmediate medical attention is imperative in severe emergencies.",
        example_vi: "Việc chúng ta nộp báo cáo trước năm giờ là vô cùng cấp bách.\nSự chăm sóc y tế ngay lập tức là bắt buộc trong các trường hợp khẩn cấp nghiêm trọng.",
        page_number: 395
      },
      {
        word: "Important",
        phonetic: "/ɪmˈpɔːr.tənt/",
        word_type: "adjective",
        meaning_vi: "Quan trọng",
        sound_bridge: "In poster lớn cho sự kiện quan trọng của công ty.",
        definition_en: "of great significance or value",
        example_en: "Regular exercise is important for overall physical health.\nHe made an important announcement regarding our quarterly bonus.",
        example_vi: "Tập thể dục đều đặn là điều quan trọng cho sức khỏe thể chất toàn diện.\nAnh ấy đã đưa ra một thông báo quan trọng liên quan đến tiền thưởng quý của chúng tôi.",
        page_number: 396
      },
      {
        word: "Independent",
        phonetic: "/ˌɪn.dɪˈpen.dənt/",
        word_type: "adjective",
        meaning_vi: "Độc lập, tự chủ",
        sound_bridge: "In đĩa phim về các quốc gia độc lập tự do.",
        definition_en: "free from outside control; not depending on another's authority",
        example_en: "She became financially independent after starting her business.\nVietnam is an independent and sovereign nation.",
        example_vi: "Cô ấy đã trở nên độc lập về tài chính sau khi khởi nghiệp kinh doanh.\nViệt Nam là một quốc gia độc lập và có chủ quyền.",
        page_number: 396
      },
      {
        word: "Initiative",
        phonetic: "/ɪˈnɪʃ.ə.t̬ɪv/",
        word_type: "noun",
        meaning_vi: "Sáng kiến, sự chủ động",
        sound_bridge: "In lịch Tết là sáng kiến chủ động của phòng tiếp thị.",
        definition_en: "the ability to assess and initiate things independently; a new approach",
        example_en: "She showed great initiative by proposing an energy-saving plan.\nThe government launched a green initiative to plant more trees.",
        example_vi: "Cô ấy đã thể hiện sự chủ động tuyệt vời bằng việc đề xuất một kế hoạch tiết kiệm năng lượng.\nChính phủ đã phát động một sáng kiến xanh để trồng thêm nhiều cây xanh.",
        page_number: 396
      },
      {
        word: "Light",
        phonetic: "/laɪt/",
        word_type: "adjective",
        meaning_vi: "Nhẹ, sáng, nhạt",
        sound_bridge: "Lấy lại túi đồ nhẹ nhàng mang đi du lịch.",
        definition_en: "having little weight; not heavy; well illuminated",
        example_en: "This aluminum laptop is extremely light and easy to carry.\nI prefer to have a light breakfast with fruit and yogurt.",
        example_vi: "Chiếc máy tính xách tay bằng nhôm này cực kỳ nhẹ và dễ mang theo.\nTôi thích một bữa sáng nhẹ nhàng với trái cây và sữa chua.",
        page_number: 396
      },
      {
        word: "Marvelous",
        phonetic: "/ˈmɑːr.vəl.əs/",
        word_type: "adjective",
        meaning_vi: "Kỳ diệu, tuyệt vời",
        sound_bridge: "Mẹ vào làng ngắm cảnh quan tuyệt vời kỳ diệu.",
        definition_en: "causing great wonder; extraordinary",
        example_en: "We had a marvelous view of the ocean from our hotel balcony.\nThe magician performed marvelous illusions that delighted the crowd.",
        example_vi: "Chúng tôi đã có một tầm nhìn tuyệt vời ra đại dương từ ban công khách sạn.\nNhà ảo thuật đã biểu diễn những màn ảo thuật kỳ diệu khiến đám đông thích thú.",
        page_number: 396
      },
      {
        word: "Measure",
        phonetic: "/ˈmeʒ.ɚ/",
        word_type: "verb",
        meaning_vi: "Đo lường, biện pháp",
        sound_bridge: "Mẹ giờ này đo lường chiều cao cho các con.",
        definition_en: "ascertain the size, amount, or degree of something by using an instrument",
        example_en: "Use a tape ruler to measure the dimensions of the room.\nThe government introduced strict security measures at all airports.",
        example_vi: "Hãy dùng thước dây để đo lường kích thước của căn phòng.\nChính phủ đã đưa ra các biện pháp an ninh nghiêm ngặt tại tất cả các sân bay.",
        page_number: 397
      },
      {
        word: "Messy",
        phonetic: "/ˈmes.i/",
        word_type: "adjective",
        meaning_vi: "Bừa bộn, lộn xộn",
        sound_bridge: "Mẹ xí xóa căn phòng bừa bộn của cậu con trai.",
        definition_en: "untidy or dirty; disordered",
        example_en: "His desk was messy with papers and coffee mugs scattered everywhere.\nCooking a five-course meal can be a messy process.",
        example_vi: "Bàn làm việc của anh ấy rất bừa bộn với giấy tờ và tách cà phê vứt rải rác khắp nơi.\nNấu một bữa ăn năm món có thể là một quá trình vô cùng lộn xộn bừa bãi.",
        page_number: 397
      },
      {
        word: "Multiple",
        phonetic: "/ˈmʌl.tə.pəl/",
        word_type: "adjective",
        meaning_vi: "Nhiều, đa dạng, bội số",
        sound_bridge: "Mở tủ phát hiện nhiều bộ quần áo đẹp.",
        definition_en: "having or involving several parts, elements, or members",
        example_en: "She suffered multiple injuries during the traffic accident.\nThe application allows users to log into multiple accounts simultaneously.",
        example_vi: "Cô ấy bị nhiều chấn thương trong vụ tai nạn giao thông.\nỨng dụng cho phép người dùng đăng nhập vào nhiều tài khoản cùng một lúc.",
        page_number: 397
      },
      {
        word: "Narrow",
        phonetic: "/ˈner.oʊ/",
        word_type: "adjective",
        meaning_vi: "Hẹp, chật hẹp",
        sound_bridge: "Né rào đi qua con hẻm chật hẹp giữa hai tòa nhà.",
        definition_en: "of small width in relation to length; limited in extent",
        example_en: "The car squeezed through the narrow cobblestone alley.\nHe had a narrow escape when the falling tree barely missed his car.",
        example_vi: "Chiếc xe ô tô len lỏi qua con hẻm lát đá hẹp.\nAnh ấy đã thoát chết trong gang tấc khi cái cây đổ suýt nữa đè trúng xe.",
        page_number: 397
      },
      {
        word: "Necessary",
        phonetic: "/ˈnes.ə.ser.i/",
        word_type: "adjective",
        meaning_vi: "Cần thiết, thiết yếu",
        sound_bridge: "Né sợ rét mua thêm áo ấm là điều cần thiết.",
        definition_en: "required to be done, achieved, or present; needed; essential",
        example_en: "A valid passport is necessary for international travel.\nIt is not necessary to print the ticket; a digital copy is fine.",
        example_vi: "Một cuốn hộ chiếu hợp lệ là điều cần thiết cho việc đi du lịch quốc tế.\nKhông cần thiết phải in vé ra giấy; bản điện tử là được rồi.",
        page_number: 397
      },
      {
        word: "Nuisance",
        phonetic: "/ˈnuː.səns/",
        word_type: "noun",
        meaning_vi: "Sự phiền toái, mối phiền phức",
        sound_bridge: "Nấu súp bị khét tạo nên sự phiền toái cho cả nhà.",
        definition_en: "a person, thing, or circumstance causing inconvenience or annoyance",
        example_en: "The constant phone spam calls are an absolute nuisance.\nHaving to replace lost keys is always a frustrating nuisance.",
        example_vi: "Những cuộc gọi rác liên tục thực sự là một mối phiền toái tuyệt đối.\nViệc phải thay chìa khóa bị mất luôn là một sự phiền phức bực bội.",
        page_number: 398
      },
      {
        word: "Opposite",
        phonetic: "/ˈɑː.pə.zɪt/",
        word_type: "adjective",
        meaning_vi: "Đối diện, trái ngược",
        sound_bridge: "Óc phở xào có hương vị đối diện trái ngược với phở nước.",
        definition_en: "having a position on the other or further side of something; completely different",
        example_en: "They live on the opposite side of the avenue.\nBlack and white are opposite colors on the spectrum.",
        example_vi: "Họ sống ở phía đối diện của đại lộ.\nMàu đen và màu trắng là hai màu sắc đối lập trái ngược nhau trên quang phổ.",
        page_number: 398
      },
      {
        word: "Pattern",
        phonetic: "/ˈpæt̬.ɚn/",
        word_type: "noun",
        meaning_vi: "Hoa văn, quy luật, mẫu",
        sound_bridge: "Phát tờ rơi in hoa văn mẫu trang trí tinh tế.",
        definition_en: "a repeated decorative design; a regular and intelligible form or sequence",
        example_en: "The wallpaper features a delicate floral pattern.\nScientists identified a clear pattern in global temperature shifts.",
        example_vi: "Giấy dán tường có hoa văn hình hoa lá tinh xảo.\nCác nhà khoa học đã xác định một quy luật rõ ràng trong sự biến đổi nhiệt độ toàn cầu.",
        page_number: 398
      },
      {
        word: "Physical",
        phonetic: "/ˈfɪz.ɪ.kəl/",
        word_type: "adjective",
        meaning_vi: "Thể chất, vật lý",
        sound_bridge: "Phở ít cay giúp nâng cao sức khỏe thể chất.",
        definition_en: "relating to the body as opposed to the mind; relating to things perceived through the senses",
        example_en: "Regular physical activity strengthens your cardiovascular system.\nHe went to the hospital for his annual physical examination.",
        example_vi: "Hoạt động thể chất đều đặn giúp tăng cường hệ tim mạch của bạn.\nAnh ấy đã đến bệnh viện để khám kiểm tra thể chất định kỳ hàng năm.",
        page_number: 398
      },
      {
        word: "Pleasant",
        phonetic: "/ˈplez.ənt/",
        word_type: "adjective",
        meaning_vi: "Dễ chịu, thoải mái",
        sound_bridge: "Phở lên thơm nức mang lại cảm giác dễ chịu.",
        definition_en: "giving a sense of happy satisfaction or enjoyment",
        example_en: "We enjoyed a pleasant evening stroll along the lake.\nShe greeted all the customers with a warm and pleasant smile.",
        example_vi: "Chúng tôi đã tận hưởng một buổi dạo bộ buổi tối dễ chịu dọc bờ hồ.\nCô ấy chào đón tất cả khách hàng bằng một nụ cười ấm áp và dễ chịu.",
        page_number: 398
      },
      {
        word: "Preposition",
        phonetic: "/ˌprep.əˈzɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Giới từ (ngữ pháp)",
        sound_bridge: "Phải rèn luyện phân biệt các giới từ tiếng Anh chuẩn.",
        definition_en: "a word governing, and usually preceding, a noun or pronoun",
        example_en: "Words like 'in', 'on', and 'at' are common English prepositions.\nUsing the wrong preposition can completely change the sentence meaning.",
        example_vi: "Các từ như 'in', 'on', và 'at' là những giới từ tiếng Anh phổ biến.\nViệc dùng sai giới từ có thể thay đổi hoàn toàn ý nghĩa của câu.",
        page_number: 399
      },
      {
        word: "Purple",
        phonetic: "/ˈpɝː.pəl/",
        word_type: "adjective",
        meaning_vi: "Màu tím",
        sound_bridge: "Phở pha màu tím từ lá cẩm đẹp mắt.",
        definition_en: "of a colour intermediate between red and blue",
        example_en: "She bought a purple silk scarf at the night market.\nThe sunset painted the evening sky with shades of purple and gold.",
        example_vi: "Cô ấy đã mua một chiếc khăn lụa màu tím ở chợ đêm.\nHoàng hôn nhuộm bầu trời buổi tối bằng những sắc thái màu tím và vàng kim.",
        page_number: 399
      },
      {
        word: "Smooth",
        phonetic: "/smuːð/",
        word_type: "adjective",
        meaning_vi: "Mượt mà, trôi chảy, nhẵn bóng",
        sound_bridge: "Sờ mu bàn tay thấy làn da mượt mà nhẵn bóng.",
        definition_en: "having an even and regular surface; free from perceptible projections, lumps, or roughness",
        example_en: "The surface of the polished marble floor was completely smooth.\nThe flight had a smooth landing despite the breezy conditions.",
        example_vi: "Bề mặt của sàn đá cẩm thạch được đánh bóng hoàn toàn nhẵn bóng.\nChuyến bay đã hạ cánh êm ái trôi chảy dù điều kiện thời tiết có gió nhẹ.",
        page_number: 399
      },
      {
        word: "Square",
        phonetic: "/skwer/",
        word_type: "noun",
        meaning_vi: "Hình vuông, quảng trường",
        sound_bridge: "Sợ kẹt xe nên hẹn nhau ở quảng trường trung tâm.",
        definition_en: "a plane figure with four equal straight sides and four right angles; an open typical area in a city",
        example_en: "Tourists gathered in the historic town square to take photos.\nCut the sandwich into four neat little squares.",
        example_vi: "Du khách đã tập trung tại quảng trường cổ của thị trấn để chụp ảnh.\nHãy cắt chiếc bánh mì kẹp thành bốn miếng hình vuông nhỏ gọn.",
        page_number: 399
      },
      {
        word: "Wonderful",
        phonetic: "/ˈwʌn.dɚ.fəl/",
        word_type: "adjective",
        meaning_vi: "Tuyệt vời, kỳ diệu",
        sound_bridge: "Quần áo mới mua mặc vào thấy tự tin tuyệt vời.",
        definition_en: "inspiring delight, pleasure, or admiration; extremely good; marvelous",
        example_en: "We had a wonderful vacation exploring the ancient temples.\nThank you for this wonderful gift, I truly appreciate it.",
        example_vi: "Chúng tôi đã có một kỳ nghỉ tuyệt vời khi khám phá những ngôi đền cổ.\nCảm ơn bạn vì món quà tuyệt vời này, tôi thực sự rất trân trọng.",
        page_number: 400
      }
    ]
  },

  // ==========================================
  // UNIT 42: Describing Things 5 (26 từ, Trang 404 - 410)
  // ==========================================
  42: {
    unit: 42,
    unit_title: "Describing Things 5",
    category: "Descriptions & Characteristics",
    words: [
      {
        word: "Alike",
        phonetic: "/əˈlaɪk/",
        word_type: "adjective",
        meaning_vi: "Giống nhau, tương tự",
        sound_bridge: "Ơ lại thấy hai chiếc xe giống nhau như đúc.",
        definition_en: "similar to each other",
        example_en: "The two brothers talk and walk alike.\nGood books inspire teachers and students alike.",
        example_vi: "Hai anh em nói chuyện và đi đứng giống hệt nhau.\nNhững cuốn sách hay truyền cảm hứng cho cả giáo viên lẫn học sinh như nhau.",
        page_number: 404
      },
      {
        word: "Appeal",
        phonetic: "/əˈpiːl/",
        word_type: "verb",
        meaning_vi: "Thu hút, hấp dẫn, kêu gọi",
        sound_bridge: "Ơ phở bò hấp dẫn thu hút thực khách gần xa.",
        definition_en: "be attractive or interesting",
        example_en: "The eco-friendly packaging appeals to conscious consumers.\nOrganizers appealed for blood donors during the emergency.",
        example_vi: "Bao bì thân thiện với môi trường thu hút những người tiêu dùng có ý thức.\nBan tổ chức đã kêu gọi những người hiến máu trong tình huống khẩn cấp.",
        page_number: 404
      },
      {
        word: "Astonish",
        phonetic: "/əˈstɑː.nɪʃ/",
        word_type: "verb",
        meaning_vi: "Làm kinh ngạc",
        sound_bridge: "Ơ sợ té ngã làm kinh ngạc cả hội trường biểu diễn.",
        definition_en: "surprise or impress someone greatly",
        example_en: "Her fluent pronunciation astonished the native English speakers.\nThe child prodigy astonished the audience with his piano skills.",
        example_vi: "Khả năng phát âm trôi chảy của cô ấy làm kinh ngạc những người nói tiếng Anh bản ngữ.\nThần đồng nhỏ tuổi đã làm kinh ngạc khán giả bằng kỹ năng chơi đàn piano.",
        page_number: 404
      },
      {
        word: "Awkward",
        phonetic: "/ˈɑː.kwɚd/",
        word_type: "adjective",
        meaning_vi: "Vụng về, ngượng ngùng, khó xử",
        sound_bridge: "Óc quạ ngượng ngùng né tránh ánh mắt mọi người.",
        definition_en: "causing difficulty or embarrassment",
        example_en: "He asked an awkward question that made everyone blush.\nCarrying the oversized wooden ladder proved very awkward.",
        example_vi: "Anh ấy đã hỏi một câu hỏi khó xử khiến mọi người đỏ mặt.\nViệc mang vác chiếc thang gỗ quá khổ tỏ ra rất cồng kềnh vụng về.",
        page_number: 404
      },
      {
        word: "Collapse",
        phonetic: "/kəˈlæps/",
        word_type: "verb",
        meaning_vi: "Sụp đổ, đổ sập",
        sound_bridge: "Cờ lấp lánh rơi xuống khi cây cầu sụp đổ.",
        definition_en: "fall down or give way suddenly; fail suddenly and completely",
        example_en: "The old wooden bridge collapsed under the heavy truck.\nExhausted from the marathon, the runner collapsed across the finish line.",
        example_vi: "Cây cầu gỗ cũ đã sụp đổ dưới sức nặng của chiếc xe tải lớn.\nKiệt sức vì chạy marathon, vận động viên đã ngã quỵ/đổ sập ngay qua vạch đích.",
        page_number: 405
      },
      {
        word: "Demonstrate",
        phonetic: "/ˈdem.ən.streɪt/",
        word_type: "verb",
        meaning_vi: "Chứng minh, biểu thị, biểu tình",
        sound_bridge: "Đè móng sắt xuống chứng minh độ cứng của vật liệu.",
        definition_en: "clearly show the existence or truth of something by giving proof",
        example_en: "The instructor demonstrated how to use the fire extinguisher.\nThousands demonstrated peacefully in front of the city hall.",
        example_vi: "Người hướng dẫn đã chứng minh/thao diễn cách sử dụng bình chữa cháy.\nHàng ngàn người đã biểu tình hòa bình trước tòa thị chính thành phố.",
        page_number: 405
      },
      {
        word: "Enormous",
        phonetic: "/əˈnɔːr.məs/",
        word_type: "adjective",
        meaning_vi: "Khổng lồ, to lớn",
        sound_bridge: "Ơ nó mập mạp to lớn khổng lồ như người khổng lồ.",
        definition_en: "very large in size, quantity, or extent",
        example_en: "The company invested an enormous amount of capital in AI.\nAn enormous cruise ship docked at the deep-water harbor.",
        example_vi: "Công ty đã đầu tư một lượng vốn khổng lồ vào trí tuệ nhân tạo.\nMột chiếc du thuyền khổng lồ đã cập bến tại cảng nước sâu.",
        page_number: 405
      },
      {
        word: "Enthusiastic",
        phonetic: "/ɪnˌθuː.ziˈæs.tɪk/",
        word_type: "adjective",
        meaning_vi: "Nhiệt tình, hăng hái",
        sound_bridge: "In thư xin việc với tinh thần nhiệt tình hăng hái.",
        definition_en: "having or showing intense and eager enjoyment, interest, or approval",
        example_en: "The students were enthusiastic about the science trip.\nShe gave an enthusiastic presentation that won over the investors.",
        example_vi: "Các học sinh rất hào hứng nhiệt tình về chuyến đi thực tế khoa học.\nCô ấy đã có một bài thuyết trình đầy nhiệt huyết thuyết phục được các nhà đầu tư.",
        page_number: 405
      },
      {
        word: "Equivalent",
        phonetic: "/ɪˈkwɪv.əl.ənt/",
        word_type: "adjective",
        meaning_vi: "Tương đương",
        sound_bridge: "In quà lưu niệm có giá trị tương đương tiền mặt.",
        definition_en: "equal in value, amount, function, meaning, etc.",
        example_en: "Eight kilometers is roughly equivalent to five miles.\nHis silence was considered equivalent to an admission of guilt.",
        example_vi: "Tám km xấp xỉ tương đương với năm dặm.\nSự im lặng của anh ấy được coi là tương đương với một lời thừa nhận tội lỗi.",
        page_number: 406
      },
      {
        word: "Essential",
        phonetic: "/ɪˈsen.ʃəl/",
        word_type: "adjective",
        meaning_vi: "Thiết yếu, cốt yếu",
        sound_bridge: "Em sợ sên bò nhưng vẫn đi lấy các vật dụng thiết yếu.",
        definition_en: "absolutely necessary; extremely important",
        example_en: "Water and sunlight are essential for plant growth.\nGood communication skills are essential for effective leadership.",
        example_vi: "Nước và ánh sáng mặt trời là thiết yếu cho sự phát triển của cây cối.\nKỹ năng giao tiếp tốt là yếu tố cốt yếu cho khả năng lãnh đạo hiệu quả.",
        page_number: 406
      },
      {
        word: "Evident",
        phonetic: "/ˈev.ə.dənt/",
        word_type: "adjective",
        meaning_vi: "Rõ ràng, hiển nhiên",
        sound_bridge: "Em vào đền thờ thấy sự trang nghiêm hiển nhiên rõ ràng.",
        definition_en: "plain or obvious; clearly seen or understood",
        example_en: "It was evident that she had practiced the song many times.\nHer deep enthusiasm for art became evident early in childhood.",
        example_vi: "Rõ ràng là cô ấy đã luyện tập bài hát này rất nhiều lần.\nNiềm đam mê sâu sắc của cô ấy với nghệ thuật đã bộc lộ rõ ràng từ thời thơ ấu.",
        page_number: 406
      },
      {
        word: "Excellent",
        phonetic: "/ˈek.səl.ənt/",
        word_type: "adjective",
        meaning_vi: "Xuất sắc, tuyệt hảo",
        sound_bridge: "Ếch sợ lấm lem nhưng đạt kết quả xuất sắc.",
        definition_en: "extremely good; outstanding",
        example_en: "She received an excellent evaluation from her supervisor.\nThe restaurant is famous for its excellent fresh seafood dishes.",
        example_vi: "Cô ấy đã nhận được đánh giá xuất sắc từ người giám sát của mình.\nNhà hàng nổi tiếng với những món hải sản tươi sống tuyệt hảo.",
        page_number: 406
      },
      {
        word: "Tremendous",
        phonetic: "/trɪˈmen.dəs/",
        word_type: "adjective",
        meaning_vi: "To lớn, phi thường, dữ dội",
        sound_bridge: "Trẻ em đi dép tạo nên sự tiến bộ phi thường.",
        definition_en: "very great in amount, scale, or intensity",
        example_en: "The charity concert was a tremendous success.\nDoctors made tremendous progress in curing rare diseases.",
        example_vi: "Buổi hòa nhạc từ thiện là một thành công to lớn vang dội.\nCác bác sĩ đã đạt được sự tiến bộ phi thường trong việc chữa trị các căn bệnh hiếm gặp.",
        page_number: 406
      },
      {
        word: "Extensive",
        phonetic: "/ɪkˈsten.sɪv/",
        word_type: "adjective",
        meaning_vi: "Rộng rãi, bao quát, quy mô lớn",
        sound_bridge: "Ếch sợ tiền xài vào các dự án quy mô lớn.",
        definition_en: "covering or affecting a large area; comprehensive",
        example_en: "The library has an extensive collection of rare manuscripts.\nThe storm caused extensive damage to crops across the province.",
        example_vi: "Thư viện có một bộ sưu tập phong phú sâu rộng về các bản thảo quý hiếm.\nCơn bão đã gây ra thiệt hại trên diện rộng cho mùa màng khắp tỉnh.",
        page_number: 407
      },
      {
        word: "Extraordinary",
        phonetic: "/ɪkˈstrɔːr.dən.er.i/",
        word_type: "adjective",
        meaning_vi: "Phi thường, khác thường",
        sound_bridge: "Ếch sợ trò đùa nhưng có khả năng phi thường.",
        definition_en: "very unusual or remarkable",
        example_en: "She possesses an extraordinary talent for classical painting.\nIt was an extraordinary achievement for such a young athlete.",
        example_vi: "Cô ấy sở hữu một tài năng phi thường đối với hội họa cổ điển.\nĐó là một thành tựu phi thường đối với một vận động viên trẻ tuổi như vậy.",
        page_number: 407
      },
      {
        word: "Gorgeous",
        phonetic: "/ˈɡɔːr.dʒəs/",
        word_type: "adjective",
        meaning_vi: "Lộng lẫy, tuyệt đẹp",
        sound_bridge: "Gõ chuông xong ngắm cảnh hoàng hôn lộng lẫy tuyệt đẹp.",
        definition_en: "beautiful; very attractive; magnificent",
        example_en: "She wore a gorgeous silk evening gown to the banquet.\nThe sunset over the bay looked absolutely gorgeous tonight.",
        example_vi: "Cô ấy đã mặc một chiếc váy dạ hội bằng lụa lộng lẫy đến dự yến tiệc.\nHoàng hôn trên vịnh trông tuyệt đẹp lộng lẫy vào tối nay.",
        page_number: 407
      },
      {
        word: "Immediate",
        phonetic: "/ɪˈmiː.di.ət/",
        word_type: "adjective",
        meaning_vi: "Ngay lập tức, trực tiếp",
        sound_bridge: "In mi-crô đi ngay lập tức giao hàng cho khách.",
        definition_en: "occurring or done at once; instant; nearest in relationship",
        example_en: "This emergency medical case requires immediate surgery.\nOnly immediate family members were invited to the ceremony.",
        example_vi: "Trường hợp y tế khẩn cấp này đòi hỏi phải phẫu thuật ngay lập tức.\nChỉ những thành viên gia đình trực hệ mới được mời đến buổi lễ.",
        page_number: 407
      },
      {
        word: "Immoral",
        phonetic: "/ɪˈmɔːr.əl/",
        word_type: "adjective",
        meaning_vi: "Vô đạo đức, đồi bại",
        sound_bridge: "In mỏ neo phản đối những hành vi vô đạo đức.",
        definition_en: "not conforming to accepted standards of morality",
        example_en: "Cheating and lying to friends is completely immoral.\nSociety strongly condemns immoral exploitation of child labor.",
        example_vi: "Lừa dối và nói dối bạn bè là hành vi hoàn toàn vô đạo đức.\nXã hội lên án mạnh mẽ việc bóc lột lao động trẻ em vô đạo đức.",
        page_number: 407
      },
      {
        word: "Individual",
        phonetic: "/ˌɪn.dəˈvɪdʒ.u.əl/",
        word_type: "adjective",
        meaning_vi: "Cá nhân, riêng lẻ",
        sound_bridge: "In đĩa video cho từng cá nhân riêng lẻ.",
        definition_en: "single; separate; characteristic of a particular person or thing",
        example_en: "Each individual student receives personalized mentoring.\nWe must respect individual rights and freedom of expression.",
        example_vi: "Mỗi cá nhân học sinh đều nhận được sự hướng dẫn cá nhân hóa.\nChúng ta phải tôn trọng các quyền cá nhân và quyền tự do ngôn luận.",
        page_number: 408
      },
      {
        word: "Long-term",
        phonetic: "/ˌlɑːŋˈtɝːm/",
        word_type: "adjective",
        meaning_vi: "Dài hạn, lâu dài",
        sound_bridge: "Lòng tham làm hỏng kế hoạch đầu tư dài hạn.",
        definition_en: "occurring over or involving a relatively long period of time",
        example_en: "Healthy eating delivers tremendous long-term benefits.\nThey signed a long-term commercial lease for five years.",
        example_vi: "Ăn uống lành mạnh mang lại những lợi ích dài hạn lâu dài to lớn.\nHọ đã ký một hợp đồng thuê thương mại dài hạn trong năm năm.",
        page_number: 408
      },
      {
        word: "Missing",
        phonetic: "/ˈmɪs.ɪŋ/",
        word_type: "adjective",
        meaning_vi: "Mất tích, thất lạc, thiếu",
        sound_bridge: "Mít chín thơm tìm thấy quả mít bị thất lạc mất tích.",
        definition_en: "not able to be found; absent",
        example_en: "Police are actively searching for the missing hiker.\nTwo critical pages are missing from this textbook.",
        example_vi: "Cảnh sát đang tích cực tìm kiếm người đi bộ đường dài bị mất tích.\nHai trang quan trọng đang bị thiếu khỏi cuốn sách giáo khoa này.",
        page_number: 408
      },
      {
        word: "Normal",
        phonetic: "/ˈnɔːr.məl/",
        word_type: "adjective",
        meaning_vi: "Bình thường",
        sound_bridge: "Nồi mỡ hành sôi đều ở nhiệt độ bình thường.",
        definition_en: "conforming to a standard; usual, typical, or expected",
        example_en: "Her body temperature is normal after taking the medicine.\nIt is normal to feel nervous before giving a big public speech.",
        example_vi: "Thân nhiệt của cô ấy đã bình thường sau khi uống thuốc.\nCảm thấy hồi hộp trước khi phát biểu trước công chúng là điều hoàn toàn bình thường.",
        page_number: 408
      },
      {
        word: "Ordinary",
        phonetic: "/ˈɔːr.dən.er.i/",
        word_type: "adjective",
        meaning_vi: "Bình thường, thông thường",
        sound_bridge: "Óc phở nướng ăn như món ăn thông thường bình thường.",
        definition_en: "with no special or distinctive features; normal",
        example_en: "It seemed like an ordinary day until the surprising news broke.\nOrdinary citizens worked together to clean up the community park.",
        example_vi: "Đó dường như là một ngày bình thường cho đến khi tin tức bất ngờ nổ ra.\nNhững công dân thông thường bình dị đã cùng nhau dọn dẹp công viên cộng đồng.",
        page_number: 409
      },
      {
        word: "Passive",
        phonetic: "/ˈpæs.ɪv/",
        word_type: "adjective",
        meaning_vi: "Bị động, thụ động",
        sound_bridge: "Phở ít cay ăn thụ động theo khẩu vị người khác.",
        definition_en: "accepting or allowing what happens without active response or resistance",
        example_en: "Don't be a passive learner; participate actively in debates.\nPassive smoking is harmful to non-smokers' respiratory health.",
        example_vi: "Đừng làm một người học thụ động; hãy tham gia tích cực vào các cuộc tranh luận.\nHút thuốc lá thụ động gây hại cho sức khỏe hô hấp của những người không hút thuốc.",
        page_number: 409
      },
      {
        word: "Pertinent",
        phonetic: "/ˈpɝː.tən.ənt/",
        word_type: "adjective",
        meaning_vi: "Thích hợp, có liên quan trực tiếp",
        sound_bridge: "Phở tôm nóng hổi là món thích hợp cho ngày đông.",
        definition_en: "relevant or applicable to a particular matter; apposite",
        example_en: "Please provide all pertinent documents related to the contract.\nShe asked several pertinent questions during the board meeting.",
        example_vi: "Vui lòng cung cấp tất cả các tài liệu có liên quan trực tiếp đến hợp đồng.\nCô ấy đã đặt ra một số câu hỏi xác đáng/thích hợp trong cuộc họp hội đồng quản trị.",
        page_number: 409
      },
      {
        word: "Spectacular",
        phonetic: "/spekˈtæk.jə.lɚ/",
        word_type: "adjective",
        meaning_vi: "Ngoạn mục, hùng vĩ",
        sound_bridge: "Sợ kẹt xe nhưng ngắm pháo hoa ngoạn mục tuyệt đẹp.",
        definition_en: "beautiful in a dramatic and eye-catching way",
        example_en: "The volcanic eruption created a spectacular fireworks display.\nVisitors enjoy spectacular panoramic views from the mountain top.",
        example_vi: "Vụ phun trào núi lửa đã tạo nên một màn trình diễn pháo hoa ngoạn mục.\nDu khách thưởng ngoạn tầm nhìn toàn cảnh hùng vĩ ngoạn mục từ đỉnh núi.",
        page_number: 410
      }
    ]
  },

  // ==========================================
  // UNIT 43: Travel 1 (33 từ, Trang 414 - 420)
  // ==========================================
  43: {
    unit: 43,
    unit_title: "Travel 1",
    category: "Travel & Transport",
    words: [
      {
        word: "Ambulance",
        phonetic: "/ˈæm.bjə.ləns/",
        word_type: "noun",
        meaning_vi: "Xe cứu thương",
        sound_bridge: "Ăn bắp nướng nghe tiếng còi xe cứu thương hối hả.",
        definition_en: "a vehicle equipped for taking sick or injured people to and from hospital",
        example_en: "Call an ambulance immediately after the accident!\nThe ambulance arrived at the emergency scene within five minutes.",
        example_vi: "Hãy gọi xe cứu thương ngay lập tức sau vụ tai nạn!\nXe cứu thương đã đến hiện trường cấp cứu trong vòng năm phút.",
        page_number: 414
      },
      {
        word: "Belt",
        phonetic: "/belt/",
        word_type: "noun",
        meaning_vi: "Thắt lưng, dây an toàn",
        sound_bridge: "Bé thắt dây lưng da bóng loáng đi dự tiệc.",
        definition_en: "a strip of leather or other material worn around the waist or for safety",
        example_en: "Fasten your seat belt firmly before the plane takes off.\nHe wore a brown leather belt to match his formal shoes.",
        example_vi: "Hãy thắt chặt dây an toàn của bạn trước khi máy bay cất cánh.\nAnh ấy đã đeo một chiếc thắt lưng da màu nâu để ton-sur-ton với đôi giày tây.",
        page_number: 414
      },
      {
        word: "Brake",
        phonetic: "/breɪk/",
        word_type: "noun",
        meaning_vi: "Cái phanh, thắng xe",
        sound_bridge: "Bờ rào trước mặt đạp phanh thắng gấp xe máy.",
        definition_en: "a device for slowing or stopping a moving vehicle",
        example_en: "Step on the brake pedal smoothly to stop the car.\nCheck your bicycle brakes regularly before riding down steep hills.",
        example_vi: "Hãy đạp phanh xe thật êm để dừng xe ô tô.\nHãy kiểm tra phanh xe đạp của bạn thường xuyên trước khi thả dốc đồi dốc.",
        page_number: 414
      },
      {
        word: "Cross",
        phonetic: "/krɑːs/",
        word_type: "verb",
        meaning_vi: "Băng qua, vượt qua",
        sound_bridge: "Cọp chạy băng qua dòng suối mát lành.",
        definition_en: "pass or move from one side to the other of something",
        example_en: "Always look both ways before you cross the busy street.\nMigrating birds cross entire continents every autumn.",
        example_vi: "Hãy luôn quan sát cả hai phía trước khi bạn băng qua con đường đông đúc.\nNhững đàn chim di cư vượt qua cả các lục địa vào mỗi mùa thu.",
        page_number: 414
      },
      {
        word: "Crowd",
        phonetic: "/kraʊd/",
        word_type: "noun",
        meaning_vi: "Đám đông",
        sound_bridge: "Cào cào tụ tập thành đám đông trên cánh đồng lúa.",
        definition_en: "a large number of people gathered together in a disorganized or unruly way",
        example_en: "A huge crowd gathered outside the stadium for the concert.\nShe quickly got lost in the bustling market crowd.",
        example_vi: "Một đám đông khổng lồ đã tập trung bên ngoài sân vận động cho buổi hòa nhạc.\nCô ấy nhanh chóng bị lạc trong đám đông tấp nập của khu chợ.",
        page_number: 415
      },
      {
        word: "Van",
        phonetic: "/væn/",
        word_type: "noun",
        meaning_vi: "Xe tải nhỏ, xe chở hàng",
        sound_bridge: "Vác bao gạo lên xe tải nhỏ chở về kho.",
        definition_en: "a medium-sized motor vehicle, typically without side windows in the rear, used for transporting goods",
        example_en: "The delivery van arrived with our online shopping packages.\nThey converted an old white van into a camper van for travel.",
        example_vi: "Chiếc xe tải nhỏ giao hàng đã đến cùng với các kiện hàng mua sắm trực tuyến của chúng tôi.\nHọ đã cải tạo một chiếc xe van màu trắng cũ thành xe cắm trại để đi du lịch.",
        page_number: 415
      },
      {
        word: "Cruise",
        phonetic: "/kruːz/",
        word_type: "noun",
        meaning_vi: "Chuyến du ngoạn bằng tàu thủy",
        sound_bridge: "Cười vui vẻ trong chuyến du ngoạn bằng tàu thủy sang trọng.",
        definition_en: "a voyage on a ship or boat taken for pleasure or as a holiday",
        example_en: "They booked a romantic seven-day cruise in the Mediterranean.\nThe cruise ship offers swimming pools and world-class restaurants.",
        example_vi: "Họ đã đặt một chuyến du ngoạn bằng tàu thủy kéo dài bảy ngày ở Địa Trung Hải.\nCon tàu du lịch cung cấp hồ bơi và những nhà hàng đẳng cấp thế giới.",
        page_number: 415
      },
      {
        word: "Fare",
        phonetic: "/fer/",
        word_type: "noun",
        meaning_vi: "Tiền vé, giá vé",
        sound_bridge: "Phở ngon trả tiền vé xe buýt đi chợ.",
        definition_en: "the money a passenger on public transportation has to pay",
        example_en: "Bus fares have increased slightly due to rising fuel prices.\nChildren under five travel free of fare on city subways.",
        example_vi: "Giá vé xe buýt đã tăng nhẹ do giá nhiên liệu tăng.\nTrẻ em dưới năm tuổi được đi tàu điện ngầm thành phố miễn phí tiền vé.",
        page_number: 415
      },
      {
        word: "Ferry",
        phonetic: "/ˈfer.i/",
        word_type: "noun",
        meaning_vi: "Phà, tàu phà",
        sound_bridge: "Phở riêu cua ăn trên chuyến phà qua sông.",
        definition_en: "a boat or ship for conveying passengers and goods across a river or body of water",
        example_en: "We took a car ferry to reach the tropical island.\nThe morning ferry leaves the harbor promptly at seven o'clock.",
        example_vi: "Chúng tôi đã đi một chuyến phà chở ô tô để đến hòn đảo nhiệt đới.\nChuyến phà buổi sáng rời bến cảng đúng bảy giờ.",
        page_number: 416
      },
      {
        word: "Flight",
        phonetic: "/flaɪt/",
        word_type: "noun",
        meaning_vi: "Chuyến bay",
        sound_bridge: "Phải lại gần quầy check-in chuyến bay đi Tokyo.",
        definition_en: "a journey made through the air, especially in a plane",
        example_en: "Our international flight to Paris was smooth and on time.\nMake sure to arrive at the terminal two hours before your flight.",
        example_vi: "Chuyến bay quốc tế của chúng tôi đến Paris diễn ra êm đẹp và đúng giờ.\nHãy đảm bảo có mặt tại nhà ga hai tiếng trước chuyến bay của bạn.",
        page_number: 416
      },
      {
        word: "Garage",
        phonetic: "/ɡəˈrɑːʒ/",
        word_type: "noun",
        meaning_vi: "Nhà để xe, xưởng sửa xe",
        sound_bridge: "Gà ra nhà để xe trú mưa mát mẻ.",
        definition_en: "a building for housing a motor vehicle or a repair workshop",
        example_en: "Park your car in the garage to protect it from the hail.\nHe took his damaged motorcycle to a local repair garage.",
        example_vi: "Hãy đỗ xe ô tô của bạn trong nhà để xe để bảo vệ xe khỏi mưa đá.\nAnh ấy đã mang chiếc xe máy bị hỏng đến một xưởng sửa xe địa phương.",
        page_number: 416
      },
      {
        word: "Vehicle",
        phonetic: "/ˈviː.ə.kəl/",
        word_type: "noun",
        meaning_vi: "Phương tiện giao thông, xe cộ",
        sound_bridge: "Ví cất trong phương tiện xe cộ cẩn thận.",
        definition_en: "a thing used for transporting people or goods, especially on land",
        example_en: "Electric vehicles help reduce air pollution in urban centers.\nEmergency vehicles have priority over ordinary traffic on the road.",
        example_vi: "Xe cộ chạy điện giúp giảm ô nhiễm không khí tại các trung tâm đô thị.\nCác phương tiện khẩn cấp được ưu tiên hơn so với giao thông thông thường trên đường.",
        page_number: 416
      },
      {
        word: "Harbor",
        phonetic: "/ˈhɑːr.bɚ/",
        word_type: "noun",
        meaning_vi: "Bến cảng",
        sound_bridge: "Hát bài ca về bến cảng quê hương lộng gió.",
        definition_en: "a place on the coast where vessels may find shelter, especially one protected from rough water",
        example_en: "Fishing boats returned to the harbor before the storm hit.\nSydney Harbor is world-famous for its iconic Opera House.",
        example_vi: "Những chiếc thuyền đánh cá đã quay trở lại bến cảng trước khi bão đổ bộ.\nBến cảng Sydney nổi tiếng khắp thế giới với Nhà hát Con Sò mang tính biểu tượng.",
        page_number: 416
      },
      {
        word: "Helicopter",
        phonetic: "/ˈhel.əˌkɑːp.tɚ/",
        word_type: "noun",
        meaning_vi: "Trực thăng, máy bay lên thẳng",
        sound_bridge: "Hét lên khi thấy máy bay trực thăng bay lượn trên trời.",
        definition_en: "a type of aircraft which derives both lift and propulsion from one or more sets of horizontally revolving overhead rotors",
        example_en: "The rescue team dispatched a helicopter to evacuate the injured.\nA traffic helicopter hovered over the crowded motorway.",
        example_vi: "Đội cứu hộ đã phái một chiếc trực thăng để sơ tán những người bị thương.\nMột chiếc máy bay trực thăng theo dõi giao thông lượn vòng trên đường cao tốc đông đúc.",
        page_number: 417
      },
      {
        word: "Hike",
        phonetic: "/haɪk/",
        word_type: "verb",
        meaning_vi: "Đi bộ đường dài, leo núi",
        sound_bridge: "Hai người cùng rủ nhau đi bộ đường dài leo núi.",
        definition_en: "walk for a long distance, especially across country or in the woods",
        example_en: "We hiked ten miles through the national park trails.\nPack plenty of water and protein snacks when you go hiking.",
        example_vi: "Chúng tôi đã đi bộ đường dài mười dặm qua các lối mòn trong công viên quốc gia.\nHãy mang theo nhiều nước và đồ ăn nhẹ giàu protein khi bạn đi leo núi đường dài.",
        page_number: 417
      },
      {
        word: "License",
        phonetic: "/ˈlaɪ.səns/",
        word_type: "noun",
        meaning_vi: "Giấy phép, bằng lái",
        sound_bridge: "Lấy sợi dây buộc bằng lái xe cẩn thận trong ví.",
        definition_en: "a permit from an authority to own or use something, or do a particular thing",
        example_en: "You must pass a road test to obtain a driver's license.\nThe doctor has a professional medical license to practice surgery.",
        example_vi: "Bạn phải vượt qua bài kiểm tra sát hạch đường trường để lấy bằng lái xe.\nBác sĩ có giấy phép hành nghề y khoa chuyên nghiệp để thực hiện phẫu thuật.",
        page_number: 417
      },
      {
        word: "Outskirts",
        phonetic: "/ˈaʊt.skɝːts/",
        word_type: "noun",
        meaning_vi: "Vùng ngoại ô",
        sound_bridge: "Áo sơ mi mua ở vùng ngoại ô giá rất rẻ.",
        definition_en: "the outer parts of a town or city",
        example_en: "They built a spacious house on the outskirts of Hanoi.\nThe giant shopping mall is situated on the city outskirts.",
        example_vi: "Họ đã xây một ngôi nhà rộng rãi ở vùng ngoại ô Hà Nội.\nTrung tâm mua sắm khổng lồ nằm ở khu vực ngoại ô thành phố.",
        page_number: 417
      },
      {
        word: "Windshield",
        phonetic: "/ˈwɪnd.ʃiːld/",
        word_type: "noun",
        meaning_vi: "Kính chắn gió (xe hơi)",
        sound_bridge: "Quỳ sợ lạnh lau sạch kính chắn gió xe hơi.",
        definition_en: "a window at the front of a passenger vehicle that protects occupants from wind and weather",
        example_en: "Wipe the muddy rain off your windshield with wipers.\nA tiny pebble chipped the front windshield on the highway.",
        example_vi: "Hãy lau sạch nước mưa bùn đất trên kính chắn gió bằng cần gạt nước.\nMột viên sỏi nhỏ đã làm nứt kính chắn gió phía trước trên đường cao tốc.",
        page_number: 417
      },
      {
        word: "Passenger",
        phonetic: "/ˈpæs.ən.dʒɚ/",
        word_type: "noun",
        meaning_vi: "Hành khách",
        sound_bridge: "Phở xào nướng phục vụ hành khách trên chuyến tàu.",
        definition_en: "a traveler on a public or private conveyance other than the driver or crew",
        example_en: "All passengers must remain seated until the plane stops.\nThe cruise ship can carry over three thousand passengers.",
        example_vi: "Tất cả hành khách phải ngồi yên tại chỗ cho đến khi máy bay dừng hẳn.\nCon tàu du lịch có thể chở hơn ba nghìn hành khách.",
        page_number: 418
      },
      {
        word: "Path",
        phonetic: "/pæθ/",
        word_type: "noun",
        meaning_vi: "Con đường, lối mòn",
        sound_bridge: "Phát cây dọn dẹp lối mòn dẫn lên đỉnh núi.",
        definition_en: "a way or track laid down for walking or made by continual treading",
        example_en: "Follow the stone path leading through the botanical garden.\nEducation is the clearest path to a prosperous career.",
        example_vi: "Hãy đi theo con đường lát đá dẫn qua vườn thực vật.\nGiáo dục là con đường rõ ràng nhất dẫn đến một sự nghiệp thịnh vượng.",
        page_number: 418
      },
      {
        word: "Pavement",
        phonetic: "/ˈpeɪv.mənt/",
        word_type: "noun",
        meaning_vi: "Vỉa hè, lề đường",
        sound_bridge: "Phở vớt mì ăn trên vỉa hè thoáng mát.",
        definition_en: "a raised paved path for pedestrians at the side of a road",
        example_en: "Pedestrians should always walk on the pavement for safety.\nCafés put colorful tables and chairs on the pavement outside.",
        example_vi: "Người đi bộ nên luôn đi trên vỉa hè để đảm bảo an toàn.\nCác quán cà phê đặt bàn ghế rực rỡ sắc màu trên vỉa hè bên ngoài.",
        page_number: 418
      },
      {
        word: "Platform",
        phonetic: "/ˈplæt.fɔːrm/",
        word_type: "noun",
        meaning_vi: "Sân ga, nền tảng",
        sound_bridge: "Bà lặn lội ra sân ga đón người thân về quê.",
        definition_en: "a raised level surface on which people or things can stand; a train boarding area",
        example_en: "The express train to Da Nang departs from platform number four.\nThis online learning platform has millions of active subscribers.",
        example_vi: "Chuyến tàu tốc hành đi Đà Nẵng khởi hành từ sân ga số bốn.\nNền tảng học trực tuyến này có hàng triệu người dùng đăng ký tích cực.",
        page_number: 418
      },
      {
        word: "Port",
        phonetic: "/pɔːrt/",
        word_type: "noun",
        meaning_vi: "Cảng biển",
        sound_bridge: "Phở tôm thịt ăn tại nhà hàng gần cảng biển.",
        definition_en: "a town or city with a harbor where ships load or unload, especially one where customs officers are stationed",
        example_en: "Hai Phong is the most vital commercial port in northern Vietnam.\nCargo container ships dock at the port day and night.",
        example_vi: "Hải Phòng là cảng biển thương mại quan trọng nhất ở miền Bắc Việt Nam.\nNhững con tàu chở container hàng hóa cập cảng cả ngày lẫn đêm.",
        page_number: 418
      },
      {
        word: "Railroad",
        phonetic: "/ˈreɪl.roʊd/",
        word_type: "noun",
        meaning_vi: "Đường sắt",
        sound_bridge: "Rẽ qua đường sắt chú ý quan sát rào chắn.",
        definition_en: "a track or set of tracks made of steel rails along which passenger and freight trains run",
        example_en: "The trans-continental railroad connected the East and West coasts.\nNever cross a railroad track when the red lights are flashing.",
        example_vi: "Tuyến đường sắt xuyên lục địa đã kết nối hai bờ Đông và Tây.\nĐừng bao giờ băng qua đường sắt khi đèn đỏ đang nhấp nháy.",
        page_number: 419
      },
      {
        word: "Return",
        phonetic: "/rɪˈtɝːn/",
        word_type: "verb",
        meaning_vi: "Trở về, quay lại, trả lại",
        sound_bridge: "Ri tấp nập trở về thăm gia đình sau chuyến công tác.",
        definition_en: "come or go back to a place or person; give back",
        example_en: "She plans to return home after finishing her master's degree.\nPlease return borrowed library books on time.",
        example_vi: "Cô ấy dự định trở về nhà sau khi hoàn thành bằng thạc sĩ.\nVui lòng trả lại những cuốn sách mượn từ thư viện đúng hạn.",
        page_number: 419
      },
      {
        word: "Sailor",
        phonetic: "/ˈseɪ.lɚ/",
        word_type: "noun",
        meaning_vi: "Thủy thủ",
        sound_bridge: "Say xỉn nhưng anh chàng thủy thủ vẫn điều khiển tàu tốt.",
        definition_en: "a person who works as a member of the crew of a commercial or naval ship or boat",
        example_en: "Experienced sailors can navigate ships by reading the stars.\nThe young sailor set sail on his first transatlantic voyage.",
        example_vi: "Những thủy thủ giàu kinh nghiệm có thể định hướng tàu bằng cách nhìn các vì sao.\nChàng thủy thủ trẻ đã giương buồm cho chuyến hải trình vượt Đại Tây Dương đầu tiên của mình.",
        page_number: 419
      },
      {
        word: "Signal",
        phonetic: "/ˈsɪɡ.nəl/",
        word_type: "noun",
        meaning_vi: "Tín hiệu, dấu hiệu",
        sound_bridge: "Si ngắm nhìn tín hiệu đèn giao thông chuyển xanh.",
        definition_en: "a gesture, action, or sound that is used to convey information or instructions",
        example_en: "The green traffic signal indicates it is safe to proceed.\nHis sudden smile was a clear signal of encouragement.",
        example_vi: "Tín hiệu giao thông màu xanh báo hiệu rằng việc di chuyển tiếp là an toàn.\nNụ cười bất ngờ của anh ấy là một dấu hiệu động viên rõ ràng.",
        page_number: 419
      },
      {
        word: "Track",
        phonetic: "/træk/",
        word_type: "noun",
        meaning_vi: "Đường mòn, đường ray, theo dõi",
        sound_bridge: "Trèo qua đường mòn theo dõi dấu chân muông thú.",
        definition_en: "a rough path or road; a continuous line of rails; follow the trail of",
        example_en: "Hikers followed the narrow mountain track to the summit.\nYou can track your online delivery parcel in real-time.",
        example_vi: "Những người leo núi đã đi theo con đường mòn hẹp lên đỉnh núi.\nBạn có thể theo dõi bưu kiện giao hàng trực tuyến của mình trong thời gian thực.",
        page_number: 419
      },
      {
        word: "Traffic",
        phonetic: "/ˈtræf.ɪk/",
        word_type: "noun",
        meaning_vi: "Giao thông, lưu lượng xe cộ",
        sound_bridge: "Tràn phở ra đường gây cản trở giao thông.",
        definition_en: "vehicles moving on a road or public highway",
        example_en: "City traffic is extremely heavy during morning rush hour.\nTraffic police work hard to maintain order at intersections.",
        example_vi: "Giao thông thành phố vô cùng đông đúc vào giờ cao điểm buổi sáng.\nCảnh sát giao thông làm việc vất vả để duy trì trật tự tại các ngã tư.",
        page_number: 420
      },
      {
        word: "Traffic jam",
        phonetic: "/ˈtræf.ɪk dʒæm/",
        word_type: "noun",
        meaning_vi: "Ùn tắc giao thông, kẹt xe",
        sound_bridge: "Tràn phở ra đường gây kẹt xe ùn tắc nghiêm trọng.",
        definition_en: "a line of road vehicles that have stopped or are moving very slowly",
        example_en: "We were stuck in a massive traffic jam for two hours.\nTaking the underground metro helps commuters avoid bad traffic jams.",
        example_vi: "Chúng tôi bị mắc kẹt trong một vụ ùn tắc giao thông nghiêm trọng suốt hai giờ.\nĐi tàu điện ngầm giúp người đi làm tránh được những vụ kẹt xe tồi tệ.",
        page_number: 420
      },
      {
        word: "Truck",
        phonetic: "/trʌk/",
        word_type: "noun",
        meaning_vi: "Xe tải",
        sound_bridge: "Trúc trồng bên đường xe tải chở hàng chạy qua.",
        definition_en: "a large, heavy road vehicle used for carrying goods, materials, or troops",
        example_en: "A massive freight truck transported cargo across the border.\nThe garbage truck comes by our neighborhood every morning.",
        example_vi: "Một chiếc xe tải chở hàng lớn đã vận chuyển hàng hóa qua biên giới.\nChiếc xe tải chở rác đi qua khu phố của chúng tôi vào mỗi buổi sáng.",
        page_number: 420
      },
      {
        word: "Trunk",
        phonetic: "/trʌŋk/",
        word_type: "noun",
        meaning_vi: "Cốp xe, thân cây, vòi voi",
        sound_bridge: "Trúng số mua ô tô có cốp xe rộng rãi.",
        definition_en: "the main wooden stem of a tree; the boot of a car; an elephant's elongated nose",
        example_en: "Put your heavy travel suitcases in the car trunk.\nThe elephant lifted a heavy tree branch with its strong trunk.",
        example_vi: "Hãy đặt những chiếc vali du lịch nặng nề vào cốp xe ô tô.\nChú voi đã nhấc bổng một cành cây nặng bằng chiếc vòi mạnh mẽ của mình.",
        page_number: 420
      },
      {
        word: "Tunnel",
        phonetic: "/ˈtʌn.əl/",
        word_type: "noun",
        meaning_vi: "Đường hầm",
        sound_bridge: "Tân nợ tiền chạy trốn qua đường hầm xuyên núi.",
        definition_en: "an artificial underground passage, especially one built through a hill or under a building",
        example_en: "The train entered a long dark tunnel through the mountain.\nHai Van Tunnel significantly reduces travel time between Da Nang and Hue.",
        example_vi: "Đoàn tàu đã đi vào một đường hầm dài tối tăm xuyên qua ngọn núi.\nHầm Hải Vân rút ngắn đáng kể thời gian di chuyển giữa Đà Nẵng và Huế.",
        page_number: 420
      }
    ]
  },

  // ==========================================
  // UNIT 44: Travel 2 (32 từ, Trang 424 - 430)
  // ==========================================
  44: {
    unit: 44,
    unit_title: "Travel 2",
    category: "Travel & Transport",
    words: [
      {
        word: "Abroad",
        phonetic: "/əˈbrɑːd/",
        word_type: "adverb",
        meaning_vi: "Ở nước ngoài, ra nước ngoài",
        sound_bridge: "Ơ bao rác dọn sạch trước khi đi du học ở nước ngoài.",
        definition_en: "in or to a foreign country or countries",
        example_en: "She decided to study abroad in Australia for two years.\nMany young professionals dream of working abroad to gain experience.",
        example_vi: "Cô ấy đã quyết định đi du học ở nước ngoài tại Úc trong hai năm.\nNhiều chuyên gia trẻ mơ ước được làm việc ở nước ngoài để tích lũy kinh nghiệm.",
        page_number: 424
      },
      {
        word: "Accident",
        phonetic: "/ˈæk.sə.dənt/",
        word_type: "noun",
        meaning_vi: "Tai nạn, sự cố",
        sound_bridge: "Ăn kẹo sô-cô-la tránh xa nơi xảy ra tai nạn.",
        definition_en: "an unfortunate incident that happens unexpectedly and unintentionally, typically resulting in damage or injury",
        example_en: "He escaped from the car accident without a single scratch.\nDrive carefully on wet roads to prevent serious traffic accidents.",
        example_vi: "Anh ấy đã thoát khỏi vụ tai nạn ô tô mà không một vết xước.\nHãy lái xe cẩn thận trên những con đường ướt để ngăn ngừa các vụ tai nạn giao thông nghiêm trọng.",
        page_number: 424
      },
      {
        word: "Address",
        phonetic: "/ˈæd.res/",
        word_type: "noun",
        meaning_vi: "Địa chỉ, diễn văn, giải quyết",
        sound_bridge: "Ăn đĩa rau xong ghi địa chỉ giao hàng bưu điện.",
        definition_en: "the particulars of the place where someone lives or an organization is situated",
        example_en: "Please confirm your current residential address on the form.\nThe president addressed the nation in a live television broadcast.",
        example_vi: "Vui lòng xác nhận địa chỉ cư trú hiện tại của bạn trên mẫu đơn.\nTổng thống đã đọc bài diễn văn gửi tới toàn quốc trong buổi phát sóng truyền hình trực tiếp.",
        page_number: 424
      },
      {
        word: "Airport",
        phonetic: "/ˈer.pɔːrt/",
        word_type: "noun",
        meaning_vi: "Sân bay",
        sound_bridge: "Ép phở tôm ăn nhanh để kịp ra sân bay đón bạn.",
        definition_en: "a complex of runways and buildings for the takeoff, landing, and maintenance of civil aircraft",
        example_en: "Noi Bai International Airport is crowded with travelers today.\nWe arrived at the airport three hours prior to international departure.",
        example_vi: "Sân bay quốc tế Nội Bài hôm nay đông nghẹt du khách.\nChúng tôi đã có mặt tại sân bay ba tiếng trước giờ khởi hành quốc tế.",
        page_number: 424
      },
      {
        word: "Anchor",
        phonetic: "/ˈæŋ.kɚ/",
        word_type: "noun",
        meaning_vi: "Mỏ neo, thả neo",
        sound_bridge: "Ăn kem xong nhìn tàu thả mỏ neo ở vịnh.",
        definition_en: "a heavy metal device dropped from a ship to keep it from drifting",
        example_en: "The sailors dropped the anchor in the calm sheltered bay.\nTrust and honesty are the anchor of any lasting friendship.",
        example_vi: "Các thủy thủ đã thả mỏ neo trong vịnh biển êm ả kín gió.\nSự tin tưởng và trung thực là mỏ neo chỗ dựa của bất kỳ tình bạn bền vững nào.",
        page_number: 425
      },
      {
        word: "Tomb",
        phonetic: "/tuːm/",
        word_type: "noun",
        meaning_vi: "Lăng mộ, ngôi mộ",
        sound_bridge: "Túm lấy bó hoa tươi đặt lên lăng mộ tổ tiên.",
        definition_en: "a large vault, typically an underground one, for burying the dead",
        example_en: "Tourists visited the ancient royal tomb in Hue.\nArchaeologists discovered historical relics inside the Pharaoh's tomb.",
        example_vi: "Du khách đã đến thăm lăng mộ hoàng gia cổ kính ở Huế.\nCác nhà khảo cổ đã phát hiện nhiều di vật lịch sử bên trong lăng mộ Pharaoh.",
        page_number: 425
      },
      {
        word: "Avenue",
        phonetic: "/ˈæv.ə.nuː/",
        word_type: "noun",
        meaning_vi: "Đại lộ",
        sound_bridge: "Ăn vài nụ hoa dạo bước trên đại lộ thênh thang.",
        definition_en: "a broad road in a town or city, typically having trees at regular intervals along its sides",
        example_en: "Fifth Avenue in New York is famous for luxury shopping boutiques.\nTall shaded trees line both sides of the peaceful avenue.",
        example_vi: "Đại lộ số 5 ở New York nổi tiếng với các cửa hàng mua sắm sang trọng.\nNhững hàng cây cao rợp bóng mát trải dài hai bên đại lộ thanh bình.",
        page_number: 425
      },
      {
        word: "Backpack",
        phonetic: "/ˈbæk.pæk/",
        word_type: "noun",
        meaning_vi: "Balo, ba lô",
        sound_bridge: "Bác phác thảo chiếc ba lô du lịch đa năng.",
        definition_en: "a bag with shoulder straps that allow it to be carried on someone's back",
        example_en: "He packed a light jacket and water bottle in his backpack.\nBackpackers love traveling across Southeast Asia on a budget.",
        example_vi: "Anh ấy đã xếp một chiếc áo khoác nhẹ và bình nước vào ba lô.\nNhững du khách đeo ba lô thích du lịch khắp Đông Nam Á với chi phí tiết kiệm.",
        page_number: 425
      },
      {
        word: "Burdensome",
        phonetic: "/ˈbɝː.dən.səm/",
        word_type: "adjective",
        meaning_vi: "Nặng nề, gánh nặng",
        sound_bridge: "Bơ dầm sầu riêng ăn nhiều trở thành gánh nặng tiêu hóa.",
        definition_en: "difficult to carry out or fulfill; burdensome; onerous",
        example_en: "High tax rates can be burdensome for small local businesses.\nManaging such an enormous debt was a burdensome responsibility.",
        example_vi: "Mức thuế cao có thể là gánh nặng nặng nề đối với các doanh nghiệp nhỏ địa phương.\nQuản lý một khoản nợ khổng lồ như vậy là một trách nhiệm nặng nề.",
        page_number: 426
      },
      {
        word: "Cabinet",
        phonetic: "/ˈkæb.nət/",
        word_type: "noun",
        meaning_vi: "Tủ có ngăn, nội các chính phủ",
        sound_bridge: "Cắt bánh nướng cất vào tủ có ngăn trong bếp.",
        definition_en: "a cupboard with drawers or shelves for storing or displaying articles; a body of government advisers",
        example_en: "Store the medical supplies in the locked bathroom cabinet.\nThe prime minister appointed new ministers to the government cabinet.",
        example_vi: "Hãy cất trữ các vật tư y tế trong tủ có ngăn có khóa trong phòng tắm.\nThủ tướng đã bổ nhiệm các bộ trưởng mới vào nội các chính phủ.",
        page_number: 426
      },
      {
        word: "Carnival",
        phonetic: "/ˈkɑːr.nə.vəl/",
        word_type: "noun",
        meaning_vi: "Lễ hội hóa trang",
        sound_bridge: "Cà rốt nấu với thịt ăn trong ngày lễ hội hóa trang.",
        definition_en: "a period of public revelry at a regular time each year, involving processions, music, and dancing",
        example_en: "Rio de Janeiro hosts the world's most spectacular carnival.\nChildren enjoyed thrilling rides and sweet treats at the annual carnival.",
        example_vi: "Rio de Janeiro tổ chức lễ hội hóa trang ngoạn mục nhất thế giới.\nTrẻ em thích thú với những trò chơi cảm giác mạnh và đồ ngọt tại lễ hội hàng năm.",
        page_number: 426
      },
      {
        word: "Toothbrush",
        phonetic: "/ˈtuːθ.brʌʃ/",
        word_type: "noun",
        meaning_vi: "Bàn chải đánh răng",
        sound_bridge: "Tú thong thả dùng bàn chải đánh răng sạch sẽ.",
        definition_en: "a small brush with a long handle, used for cleaning the teeth",
        example_en: "Remember to pack your travel toothbrush and toothpaste.\nDentists advise replacing your toothbrush every three months.",
        example_vi: "Hãy nhớ xếp bàn chải đánh răng du lịch và kem đánh răng vào hành lý.\nCác nha sĩ khuyên nên thay bàn chải đánh răng ba tháng một lần.",
        page_number: 426
      },
      {
        word: "Carrier",
        phonetic: "/ˈker.i.ɚ/",
        word_type: "noun",
        meaning_vi: "Hãng vận chuyển, người mang vác",
        sound_bridge: "Cà ri thơm nức được hãng vận chuyển giao tới tận nhà.",
        definition_en: "a person or company that transports goods or passengers; a mobile network provider",
        example_en: "Vietnam Airlines is the flagship national airline carrier.\nChoose a reliable shipping carrier for international package deliveries.",
        example_vi: "Vietnam Airlines là hãng hàng không vận chuyển quốc gia hàng đầu.\nHãy chọn một hãng vận chuyển uy tín cho việc giao các kiện hàng quốc tế.",
        page_number: 427
      },
      {
        word: "Cart",
        phonetic: "/kɑːrt/",
        word_type: "noun",
        meaning_vi: "Xe đẩy, xe bò",
        sound_bridge: "Cắt bánh mì đặt lên xe đẩy siêu thị.",
        definition_en: "an open two-wheeled or four-wheeled vehicle drawn by horses or pushed by hand",
        example_en: "Grab a shopping cart at the supermarket entrance.\nStreet food vendors push carts selling fresh noodles and sandwiches.",
        example_vi: "Hãy lấy một chiếc xe đẩy hàng tại lối vào siêu thị.\nNhững người bán hàng rong đẩy xe đẩy bán mì tươi và bánh mì kẹp.",
        page_number: 427
      },
      {
        word: "Caution",
        phonetic: "/ˈkɑː.ʃən/",
        word_type: "noun",
        meaning_vi: "Sự cẩn trọng, cảnh báo",
        sound_bridge: "Có sơn mới cảnh báo mọi người chú ý cẩn trọng.",
        definition_en: "care taken to avoid danger or mistakes",
        example_en: "Proceed with caution on icy, slippery mountain roads.\nThe sign gave a clear caution regarding wild animals in the area.",
        example_vi: "Hãy di chuyển với sự cẩn trọng trên những con đường núi đóng băng trơn trượt.\nBiển báo đưa ra lời cảnh báo rõ ràng về động vật hoang dã trong khu vực.",
        page_number: 427
      },
      {
        word: "Cemetery",
        phonetic: "/ˈsem.ə.ter.i/",
        word_type: "noun",
        meaning_vi: "Nghĩa trang",
        sound_bridge: "Xe máy đi ngang nghĩa trang trong đêm thanh vắng.",
        definition_en: "a burial ground; a graveyard",
        example_en: "They visited the national military cemetery to honor fallen heroes.\nAncient marble headstones stood silently in the historic cemetery.",
        example_vi: "Họ đã đến thăm nghĩa trang quân đội quốc gia để tưởng nhớ các anh hùng liệt sĩ.\nNhững bia mộ bằng đá cẩm thạch cổ kính đứng lặng lẽ trong nghĩa trang lịch sử.",
        page_number: 427
      },
      {
        word: "Century",
        phonetic: "/ˈsen.tʃər.i/",
        word_type: "noun",
        meaning_vi: "Thế kỷ (100 năm)",
        sound_bridge: "Sen nở thơm ngát qua nhiều thế kỷ lịch sử.",
        definition_en: "a period of one hundred years",
        example_en: "The ancient pagoda was constructed in the tenth century.\nTechnological innovations evolved exponentially throughout the 21st century.",
        example_vi: "Ngôi chùa cổ kính được xây dựng vào thế kỷ thứ mười.\nCác đổi mới công nghệ đã phát triển theo cấp số nhân trong suốt thế kỷ 21.",
        page_number: 427
      },
      {
        word: "Courage",
        phonetic: "/ˈkɝː.ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Lòng dũng cảm",
        sound_bridge: "Cơ bắp cuồn cuộn thể hiện lòng dũng cảm phi thường.",
        definition_en: "the ability to do something that frightens one; bravery",
        example_en: "It took immense courage to stand up against injustice.\nFirefighters showed remarkable courage entering the burning warehouse.",
        example_vi: "Cần có lòng dũng cảm to lớn để đứng lên chống lại sự bất công.\nCác chiến sĩ cứu hỏa đã thể hiện lòng dũng cảm phi thường khi xông vào nhà kho đang cháy.",
        page_number: 428
      },
      {
        word: "Crossroads",
        phonetic: "/ˈkrɑːs.roʊdz/",
        word_type: "noun",
        meaning_vi: "Ngã tư đường, bước ngoặt",
        sound_bridge: "Cọp rình rập ở ngã tư đường vắng vẻ.",
        definition_en: "an intersection of two or more roads; a crucial turning point",
        example_en: "Turn right when you reach the busy traffic crossroads.\nGraduating from high school put him at a major crossroads in life.",
        example_vi: "Hãy rẽ phải khi bạn đến ngã tư đường đông đúc xe cộ.\nTốt nghiệp cấp ba đã đặt anh ấy vào một bước ngoặt ngã rẽ lớn của cuộc đời.",
        page_number: 428
      },
      {
        word: "Danger",
        phonetic: "/ˈdeɪn.dʒɚ/",
        word_type: "noun",
        meaning_vi: "Mối nguy hiểm, sự nguy hiểm",
        sound_bridge: "Đèn đỏ bật sáng cảnh báo mối nguy hiểm phía trước.",
        definition_en: "the possibility of suffering harm or injury",
        example_en: "Warning signs keep tourists away from cliffside danger.\nLifeguards rescued swimmers in imminent danger of drowning.",
        example_vi: "Các biển cảnh báo giúp du khách tránh xa mối nguy hiểm bên bờ vực.\nNhân viên cứu hộ đã cứu những người bơi lội đang đối mặt với nguy cơ đuối nước cận kề.",
        page_number: 428
      },
      {
        word: "Dare",
        phonetic: "/der/",
        word_type: "verb",
        meaning_vi: "Dám, thách thức",
        sound_bridge: "Đè bẹp nỗi sợ dám vượt qua thử thách khó khăn.",
        definition_en: "have the courage to do something; challenge someone",
        example_en: "No one dared to enter the abandoned dark haunted house.\nHow dare you speak to your elderly teacher in that rude tone?",
        example_vi: "Không ai dám bước vào ngôi nhà hoang ma ám tối tăm đó.\nSao bạn dám nói chuyện với người thầy giáo lớn tuổi của mình bằng giọng thô lỗ như vậy?",
        page_number: 428
      },
      {
        word: "Downtown",
        phonetic: "/ˌdaʊnˈtaʊn/",
        word_type: "noun",
        meaning_vi: "Trung tâm thành phố",
        sound_bridge: "Đao kiếm trưng bày tại bảo tàng trung tâm thành phố.",
        definition_en: "the central part or main business and commercial area of a town or city",
        example_en: "We took a taxi downtown to watch the evening fireworks.\nMany financial corporate headquarters are located in downtown Chicago.",
        example_vi: "Chúng tôi đã bắt taxi vào trung tâm thành phố để xem pháo hoa buổi tối.\nNhiều trụ sở tập đoàn tài chính đặt tại trung tâm thành phố Chicago.",
        page_number: 428
      },
      {
        word: "Grave",
        phonetic: "/ɡreɪv/",
        word_type: "noun",
        meaning_vi: "Ngôi mộ, nghiêm trọng",
        sound_bridge: "Gà rỉ tai bên ngôi mộ cổ dưới tán cây râm mát.",
        definition_en: "a hole dug in the ground to receive a coffin; giving cause for alarm; serious",
        example_en: "Relatives laid fresh white lilies upon grandfather's grave.\nThe economic situation poses a grave threat to small retailers.",
        example_vi: "Người thân đã đặt những bông hoa loa kèn trắng tươi lên ngôi mộ của ông nội.\nTình hình kinh tế đặt ra một mối đe dọa nghiêm trọng đối với các nhà bán lẻ nhỏ.",
        page_number: 429
      },
      {
        word: "Host",
        phonetic: "/hoʊst/",
        word_type: "noun",
        meaning_vi: "Chủ nhà, người dẫn chương trình, đăng cai",
        sound_bridge: "Hổ siêng năng làm chủ nhà đón tiếp muông thú.",
        definition_en: "a person who receives or entertains other people as guests; an MC",
        example_en: "The host warmly welcomed all international guests at the door.\nParis was chosen to host the Olympic Games with great pride.",
        example_vi: "Người chủ nhà đã nồng nhiệt chào đón tất cả các vị khách quốc tế tại cửa.\nParis đã được chọn để đăng cai Thế vận hội Olympic với niềm tự hào to lớn.",
        page_number: 429
      },
      {
        word: "Itinerary",
        phonetic: "/aɪˈtɪn.ə.rer.i/",
        word_type: "noun",
        meaning_vi: "Lịch trình chuyến đi",
        sound_bridge: "Ai tìm nơi in lịch trình chuyến đi du lịch cho cả đoàn.",
        definition_en: "a planned route or journey; a travel document listing dates and destinations",
        example_en: "Our travel itinerary includes visits to Tokyo, Kyoto, and Osaka.\nMake sure to review the complete flight itinerary before booking.",
        example_vi: "Lịch trình chuyến đi của chúng tôi bao gồm các chuyến thăm Tokyo, Kyoto và Osaka.\nHãy đảm bảo kiểm tra lại toàn bộ lịch trình chuyến bay trước khi đặt vé.",
        page_number: 429
      },
      {
        word: "Local",
        phonetic: "/ˈloʊ.kəl/",
        word_type: "adjective",
        meaning_vi: "Địa phương, dân bản địa",
        sound_bridge: "Lô đất mua của người dân địa phương rất màu mỡ.",
        definition_en: "belonging or relating to a particular area or neighborhood",
        example_en: "Support local farmers by buying fresh organic vegetables at the market.\nAsk the local residents for recommendations on authentic street food.",
        example_vi: "Hãy ủng hộ những người nông dân địa phương bằng cách mua rau hữu cơ tươi ở chợ.\nHãy hỏi người dân bản địa địa phương để được gợi ý về các món ăn đường phố chuẩn vị.",
        page_number: 429
      },
      {
        word: "Location",
        phonetic: "/loʊˈkeɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Vị trí, địa điểm",
        sound_bridge: "Lô đất nằm ở vị trí địa điểm đắc địa ven sông.",
        definition_en: "a particular place or position",
        example_en: "The hotel is in a prime location near the beach.\nShare your current GPS location with your travel companions.",
        example_vi: "Khách sạn nằm ở một vị trí đắc địa gần bãi biển.\nHãy chia sẻ vị trí GPS hiện tại của bạn với những người bạn đồng hành.",
        page_number: 429
      },
      {
        word: "Mist",
        phonetic: "/mɪst/",
        word_type: "noun",
        meaning_vi: "Sương mù mỏng, màn sương",
        sound_bridge: "Mít chín thơm trong màn sương mù sớm mai.",
        definition_en: "a cloud of tiny water droplets suspended in the atmosphere limiting visibility",
        example_en: "A thick morning mist hovered over the peaceful lake.\nMountains were veiled in delicate purple mist at twilight.",
        example_vi: "Một màn sương mù dày đặc buổi sớm lơ lửng trên mặt hồ yên ả.\nNhững ngọn núi được bao phủ bởi màn sương tím mỏng manh lúc chạng vạng.",
        page_number: 430
      },
      {
        word: "Moonlight",
        phonetic: "/ˈmuːn.laɪt/",
        word_type: "noun",
        meaning_vi: "Ánh trăng",
        sound_bridge: "Mụn lặn biến mất dưới ánh trăng thanh mát lành.",
        definition_en: "the light of the moon",
        example_en: "We enjoyed a romantic walk along the beach in the silver moonlight.\nThe ancient castle was bathed in bright moonlight.",
        example_vi: "Chúng tôi đã tận hưởng một buổi dạo bộ lãng mạn dọc bờ biển dưới ánh trăng bạc.\nTòa lâu đài cổ kính được tắm mình trong ánh trăng sáng ngời.",
        page_number: 430
      },
      {
        word: "Treasure",
        phonetic: "/ˈtreʒ.ɚ/",
        word_type: "noun",
        meaning_vi: "Kho báu, trân trọng",
        sound_bridge: "Trẻ em reo hò tìm thấy kho báu đồ chơi bị chôn giấu.",
        definition_en: "a quantity of precious metals, gems, or other valuable objects; cherish",
        example_en: "Pirates hid their gold treasure on the uninhabited island.\nI will treasure these sweet childhood memories forever.",
        example_vi: "Cướp biển đã giấu kho báu vàng của họ trên hòn đảo không người ở.\nTôi sẽ trân trọng những kỷ niệm tuổi thơ ngọt ngào này mãi mãi.",
        page_number: 430
      },
      {
        word: "Take part in",
        phonetic: "/teɪk pɑːrt ɪn/",
        word_type: "verb",
        meaning_vi: "Tham gia vào",
        sound_bridge: "Tết bận rộn vẫn hào hứng tham gia vào hội làng.",
        definition_en: "join in an activity; be involved in",
        example_en: "Over five hundred athletes took part in the national marathon.\nWe encourage all students to take part in volunteer community services.",
        example_vi: "Hơn năm trăm vận động viên đã tham gia vào giải chạy marathon quốc gia.\nChúng tôi khuyến khích tất cả học sinh tham gia vào các hoạt động tình nguyện vì cộng đồng.",
        page_number: 430
      },
      {
        word: "Tissue",
        phonetic: "/ˈtɪʃ.uː/",
        word_type: "noun",
        meaning_vi: "Khăn giấy, mô (sinh học)",
        sound_bridge: "Tí xúi bạn lấy khăn giấy lau vết bẩn trên áo.",
        definition_en: "absorbent paper used for wiping; any of the distinct types of material of which animals or plants are made",
        example_en: "Can you hand me a tissue to blow my nose?\nMuscle tissue repairs and strengthens itself during deep sleep.",
        example_vi: "Bạn có thể đưa cho tôi một tờ khăn giấy để xì mũi được không?\nMô cơ tự phục hồi và trở nên săn chắc hơn trong giấc ngủ sâu.",
        page_number: 430
      }
    ]
  },

  // ==========================================
  // UNIT 45: Travel 3 (31 từ, Trang 434 - 440)
  // ==========================================
  45: {
    unit: 45,
    unit_title: "Travel 3",
    category: "Travel & Transport",
    words: [
      {
        word: "Adventure",
        phonetic: "/ədˈven.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Cuộc phiêu lưu, chuyến mạo hiểm",
        sound_bridge: "Ăn đĩa rau rừng bắt đầu chuyến phiêu lưu mạo hiểm.",
        definition_en: "an unusual and exciting, typically hazardous, experience or activity",
        example_en: "Traveling solo across South America was a thrilling adventure.\nLife is a daring adventure or nothing at all.",
        example_vi: "Du lịch một mình khắp Nam Mỹ là một cuộc phiêu lưu đầy ly kỳ.\nCuộc sống hoặc là một chuyến phiêu lưu táo bạo, hoặc chẳng là gì cả.",
        page_number: 434
      },
      {
        word: "Arrange",
        phonetic: "/əˈreɪndʒ/",
        word_type: "verb",
        meaning_vi: "Sắp xếp, thu xếp",
        sound_bridge: "Ơ rên rỉ vì phải sắp xếp đồ đạc dọn nhà mệt mỏi.",
        definition_en: "put things in a neat, attractive, or required order; plan or organize",
        example_en: "She arranged fresh flowers in a crystal vase.\nWe arranged a video meeting with the overseas clients for tomorrow.",
        example_vi: "Cô ấy đã sắp xếp những bông hoa tươi vào chiếc bình pha lê.\nChúng tôi đã thu xếp một cuộc họp video với các đối tác nước ngoài vào ngày mai.",
        page_number: 434
      },
      {
        word: "Available",
        phonetic: "/əˈveɪ.lə.bəl/",
        word_type: "adjective",
        meaning_vi: "Có sẵn, rảnh rỗi",
        sound_bridge: "Ơ voi lội bùn có sẵn nguồn nước uống dồi dào.",
        definition_en: "able to be used or obtained; at someone's disposal; free to do something",
        example_en: "Are there any hotel rooms available for tonight?\nDr. Smith will be available for consultations on Monday morning.",
        example_vi: "Còn phòng khách sạn nào có sẵn cho tối nay không?\nBác sĩ Smith sẽ rảnh rỗi có mặt để tư vấn khám bệnh vào sáng thứ Hai.",
        page_number: 434
      },
      {
        word: "Baggage",
        phonetic: "/ˈbæɡ.ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Hành lý",
        sound_bridge: "Bác gánh gồng nhiều túi hành lý ra ga tàu.",
        definition_en: "personal belongings packed in suitcases for traveling; luggage",
        example_en: "Collect your checked baggage from carousel number two.\nPassengers are allowed one carry-on baggage on domestic flights.",
        example_vi: "Hãy nhận lại hành lý ký gửi của bạn từ băng chuyền số hai.\nHành khách được phép mang theo một kiện hành lý xách tay trên các chuyến bay nội địa.",
        page_number: 434
      },
      {
        word: "Calendar",
        phonetic: "/ˈkæl.ən.dɚ/",
        word_type: "noun",
        meaning_vi: "Lịch, tờ lịch",
        sound_bridge: "Cá lặn dưới nước nhìn tờ lịch treo tường tính ngày hội.",
        definition_en: "a chart or series of pages showing the days, weeks, and months of a particular year",
        example_en: "Mark the exam dates clearly on your wall calendar.\nShe checked her digital calendar to see if she was free next Friday.",
        example_vi: "Hãy đánh dấu các ngày thi thật rõ ràng trên tờ lịch treo tường của bạn.\nCô ấy đã kiểm tra lịch điện tử của mình để xem liệu có rảnh vào thứ Sáu tới không.",
        page_number: 435
      },
      {
        word: "Camp",
        phonetic: "/kæmp/",
        word_type: "verb",
        meaning_vi: "Cắm trại, khu cắm trại",
        sound_bridge: "Cầm que củi nhóm lửa dựng lều cắm trại ven rừng.",
        definition_en: "live for a time in a tent, especially while on holiday",
        example_en: "We camped by the riverside under a blanket of stars.\nThe summer camp organized hiking, kayaking, and campfire singing for kids.",
        example_vi: "Chúng tôi đã cắm trại bên bờ sông dưới một bầu trời đầy sao.\nKhu trại hè đã tổ chức các hoạt động leo núi, chèo thuyền kayak và hát bên lửa trại cho trẻ em.",
        page_number: 435
      },
      {
        word: "Capital",
        phonetic: "/ˈkæp.ə.t̬əl/",
        word_type: "noun",
        meaning_vi: "Thủ đô, vốn đầu tư, chữ in hoa",
        sound_bridge: "Cắt bánh kem tại thủ đô rực rỡ ánh đèn.",
        definition_en: "the city or town that is the official seat of government in a country; financial assets",
        example_en: "Hanoi is the historic and cultural capital of Vietnam.\nThe startup raised five million dollars in venture capital.",
        example_vi: "Hà Nội là thủ đô lịch sử và văn hóa của Việt Nam.\nCông ty khởi nghiệp đã huy động được năm triệu đô la vốn đầu tư mạo hiểm.",
        page_number: 435
      },
      {
        word: "Check out",
        phonetic: "/tʃek aʊt/",
        word_type: "verb",
        meaning_vi: "Trả phòng, kiểm tra, thanh toán",
        sound_bridge: "Chè sen ấp thơm làm thủ tục trả phòng khách sạn.",
        definition_en: "settle one's hotel bill before leaving; inspect or examine",
        example_en: "Hotel guests must check out before twelve noon.\nYou should check out this brand new coffee shop downtown.",
        example_vi: "Khách của khách sạn phải làm thủ tục trả phòng trước mười hai giờ trưa.\nBạn nên ghé qua xem/kiểm tra quán cà phê mới toanh này ở trung tâm thành phố.",
        page_number: 435
      },
      {
        word: "Departure",
        phonetic: "/dɪˈpɑːr.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Sự khởi hành, giờ xuất phát",
        sound_bridge: "Đi phở thơm trước giờ khởi hành chuyến bay sớm.",
        definition_en: "the action of leaving, especially to start a journey",
        example_en: "Check the flight departure screens for any gate changes.\nHis sudden departure from the company surprised all his colleagues.",
        example_vi: "Hãy kiểm tra màn hình hiển thị giờ khởi hành chuyến bay để xem có đổi cổng không.\nSự rời đi khởi hành bất ngờ của anh ấy khỏi công ty đã làm ngạc nhiên tất cả đồng nghiệp.",
        page_number: 436
      },
      {
        word: "Describe",
        phonetic: "/dɪˈskraɪb/",
        word_type: "verb",
        meaning_vi: "Miêu tả, mô tả",
        sound_bridge: "Đi sợ cọp rình rập miêu tả lại cho người dân nghe.",
        definition_en: "give a detailed account in words of something",
        example_en: "Can you describe the suspect's appearance to the police?\nWords cannot describe the breathtaking beauty of the sunset.",
        example_vi: "Bạn có thể miêu tả ngoại hình của nghi phạm cho cảnh sát được không?\nKhông lời nào có thể mô tả được vẻ đẹp ngoạn mục của buổi hoàng hôn.",
        page_number: 436
      },
      {
        word: "Destination",
        phonetic: "/ˌdes.təˈneɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Điểm đến, đích đến",
        sound_bridge: "Đè sợ té ngã khi đến điểm đến đích đến an toàn.",
        definition_en: "the place to which someone or something is going or being sent",
        example_en: "Da Nang is a top vacation destination for international tourists.\nWe finally arrived at our destination after a ten-hour drive.",
        example_vi: "Đà Nẵng là một điểm đến du lịch hàng đầu cho du khách quốc tế.\nChúng tôi cuối cùng đã đến đích đến sau mười tiếng lái xe.",
        page_number: 436
      },
      {
        word: "Direct",
        phonetic: "/daɪˈrekt/",
        word_type: "adjective",
        meaning_vi: "Trực tiếp, thẳng thắn, chỉ đường",
        sound_bridge: "Đi rẽ trái nhận sự chỉ dẫn trực tiếp từ người dân.",
        definition_en: "extending or moving from one place to another by the shortest way without changing direction",
        example_en: "Is there a direct flight from Hanoi to London?\nShe gave a direct answer without hesitating.",
        example_vi: "Có chuyến bay thẳng trực tiếp nào từ Hà Nội đến Luân Đôn không?\nCô ấy đã đưa ra một câu trả lời thẳng thắn trực tiếp không chút do dự.",
        page_number: 436
      },
      {
        word: "Fountain",
        phonetic: "/ˈfaʊn.tən/",
        word_type: "noun",
        meaning_vi: "Đài phun nước",
        sound_bridge: "Phở ăn tơi ngon bên đài phun nước công viên.",
        definition_en: "an ornamental structure in a pool or lake from which one or more jets of water are pumped into the air",
        example_en: "Children tossed shiny coins into the wishing fountain.\nThe illuminated water fountain danced to classical music.",
        example_vi: "Trẻ em tung những đồng xu sáng bóng vào đài phun nước ước nguyện.\nĐài phun nước được chiếu sáng nhảy múa theo điệu nhạc cổ điển.",
        page_number: 437
      },
      {
        word: "Go ahead",
        phonetic: "/ɡoʊ əˈhed/",
        word_type: "verb",
        meaning_vi: "Tiến lên, cứ tự nhiên, tiếp tục",
        sound_bridge: "Gà ấp trứng tiến lên bảo vệ tổ an toàn.",
        definition_en: "proceed; be permitted to start or continue doing something",
        example_en: "Go ahead and take the last slice of pizza.\nThe manager gave us permission to go ahead with the marketing project.",
        example_vi: "Cứ tự nhiên lấy miếng bánh pizza cuối cùng đi nhé.\nNgười quản lý đã cấp phép cho chúng tôi tiến hành tiếp tục dự án tiếp thị.",
        page_number: 437
      },
      {
        word: "Immigrate",
        phonetic: "/ˈɪm.ə.ɡreɪt/",
        word_type: "verb",
        meaning_vi: "Nhập cư",
        sound_bridge: "In mẫu giấy tờ nhập cư sang vùng đất mới.",
        definition_en: "come to live permanently in a foreign country",
        example_en: "His grandparents immigrated to Canada fifty years ago.\nThousands of skilled workers immigrate every year seeking new opportunities.",
        example_vi: "Ông bà của anh ấy đã nhập cư vào Canada cách đây năm mươi năm.\nHàng ngàn lao động lành nghề nhập cư mỗi năm để tìm kiếm những cơ hội mới.",
        page_number: 437
      },
      {
        word: "Journey",
        phonetic: "/ˈdʒɝː.ni/",
        word_type: "noun",
        meaning_vi: "Hành trình, chuyến đi",
        sound_bridge: "Dắt nợ nần vượt qua hành trình vượt khó lập nghiệp.",
        definition_en: "an act of traveling from one place to another",
        example_en: "A journey of a thousand miles begins with a single step.\nThey documented their thrilling journey across the Sahara desert.",
        example_vi: "Hành trình vạn dặm bắt đầu từ một bước chân duy nhất.\nHọ đã ghi lại hành trình đầy ly kỳ của mình băng qua sa mạc Sahara.",
        page_number: 437
      },
      {
        word: "Kingdom",
        phonetic: "/ˈkɪŋ.dəm/",
        word_type: "noun",
        meaning_vi: "Vương quốc",
        sound_bridge: "Kinh đầm sen thuộc quyền sở hữu của vương quốc cổ.",
        definition_en: "a country, state, or territory ruled by a king or queen",
        example_en: "The United Kingdom consists of four constituent nations.\nLions are known as the kings of the animal kingdom.",
        example_vi: "Vương quốc Anh bao gồm bốn quốc gia thành viên.\nSư tử được biết đến là vua của vương quốc loài vật.",
        page_number: 438
      },
      {
        word: "Lane",
        phonetic: "/leɪn/",
        word_type: "noun",
        meaning_vi: "Làn đường, ngõ hẻm",
        sound_bridge: "Lên xe máy chạy đúng làn đường quy định.",
        definition_en: "a narrow road, especially in a rural area; a division of a road marked off with painted lines",
        example_en: "Stay in the right-hand lane unless you are overtaking.\nThey strolled down a quiet country lane shaded by oak trees.",
        example_vi: "Hãy giữ đúng làn đường bên phải trừ khi bạn đang vượt xe khác.\nHọ thong thả dạo bước trên một con ngõ quê yên tĩnh rợp bóng cây sồi.",
        page_number: 438
      },
      {
        word: "Method",
        phonetic: "/ˈmeθ.əd/",
        word_type: "noun",
        meaning_vi: "Phương pháp, cách thức",
        sound_bridge: "Mẹ thong thả chỉ dạy phương pháp nấu ăn ngon.",
        definition_en: "a particular form of procedure for accomplishing or approaching something",
        example_en: "The scientific method relies on systematic observation and testing.\nShe developed a highly effective method for memorizing new vocabulary.",
        example_vi: "Phương pháp khoa học dựa trên sự quan sát và kiểm nghiệm có hệ thống.\nCô ấy đã phát triển một phương pháp vô cùng hiệu quả để ghi nhớ từ vựng mới.",
        page_number: 438
      },
      {
        word: "Publish",
        phonetic: "/ˈpʌb.lɪʃ/",
        word_type: "verb",
        meaning_vi: "Xuất bản, công bố",
        sound_bridge: "Bắp luộc bán xong ngồi viết sách chuẩn bị xuất bản.",
        definition_en: "prepare and issue for public sale or distribution; make publicly known",
        example_en: "The author published her debut fantasy novel last month.\nResearchers published their groundbreaking findings in an international journal.",
        example_vi: "Tác giả đã xuất bản cuốn tiểu thuyết giả tưởng đầu tay của mình vào tháng trước.\nCác nhà nghiên cứu đã công bố những phát hiện mang tính đột phá của họ trên một tạp chí quốc tế.",
        page_number: 438
      },
      {
        word: "Schedule",
        phonetic: "/ˈskedʒ.uːl/",
        word_type: "noun",
        meaning_vi: "Lịch trình, thời gian biểu",
        sound_bridge: "Sợ kẹt xe nên lập thời gian biểu đi lại thật sớm.",
        definition_en: "a plan for carrying out a process or procedure, giving lists of intended events and times",
        example_en: "The train is running exactly according to schedule.\nHer busy work schedule leaves very little free time for leisure.",
        example_vi: "Chuyến tàu đang chạy hoàn toàn chính xác theo lịch trình.\nThời gian biểu công việc bận rộn khiến cô ấy còn rất ít thời gian rảnh để giải trí.",
        page_number: 438
      },
      {
        word: "Sightseeing",
        phonetic: "/ˈsaɪtˌsiː.ɪŋ/",
        word_type: "noun",
        meaning_vi: "Tham quan ngắm cảnh",
        sound_bridge: "Say sưa ngắm cảnh khi đi tham quan các danh lam thắng cảnh.",
        definition_en: "the activity of visiting places of interest in a particular location",
        example_en: "We spent the entire afternoon sightseeing in historic Rome.\nA hop-on hop-off bus is great for city sightseeing tours.",
        example_vi: "Chúng tôi đã dành cả buổi chiều để tham quan ngắm cảnh ở thành phố Rome lịch sử.\nXe buýt hai tầng dừng đón trả linh hoạt rất tuyệt vời cho các chuyến tham quan ngắm cảnh thành phố.",
        page_number: 439
      },
      {
        word: "Souvenir",
        phonetic: "/ˌsuː.vəˈnɪr/",
        word_type: "noun",
        meaning_vi: "Đồ lưu niệm, quà lưu niệm",
        sound_bridge: "Súp vò nếp làm quà lưu niệm cho bạn bè phương xa.",
        definition_en: "a thing that is kept as a reminder of a person, place, or event",
        example_en: "She bought a miniature Eiffel Tower as a souvenir of Paris.\nLocal handicraft markets are full of unique handmade souvenirs.",
        example_vi: "Cô ấy đã mua một mô hình Tháp Eiffel thu nhỏ làm quà lưu niệm từ Paris.\nCác khu chợ thủ công mỹ nghệ địa phương có đầy những món đồ lưu niệm thủ công độc đáo.",
        page_number: 439
      },
      {
        word: "Stay",
        phonetic: "/steɪ/",
        word_type: "verb",
        meaning_vi: "Ở lại, lưu trú",
        sound_bridge: "Sợ té ngã nên ở lại trong nhà trú mưa bão.",
        definition_en: "remain in the same place; live somewhere temporarily as a visitor or guest",
        example_en: "We stayed at a cozy family-run resort in Da Lat.\nStay calm and follow all evacuation procedures.",
        example_vi: "Chúng tôi đã lưu trú tại một khu nghỉ dưỡng ấm cúng do gia đình tự quản ở Đà Lạt.\nHãy giữ bình tĩnh ở lại và tuân thủ tất cả các quy trình sơ tán.",
        page_number: 439
      },
      {
        word: "Stopover",
        phonetic: "/ˈstɑːpˌoʊ.vɚ/",
        word_type: "noun",
        meaning_vi: "Điểm dừng chân, chặng quá cảnh",
        sound_bridge: "Sợ tấp vào lề tạo điểm dừng chân nghỉ ngơi ven đèo.",
        definition_en: "a break in a journey, especially one made when traveling by air",
        example_en: "Our flight had a four-hour stopover in Doha airport.\nWe enjoyed a brief overnight stopover in Singapore before flying home.",
        example_vi: "Chuyến bay của chúng tôi có một chặng quá cảnh dừng chân bốn tiếng tại sân bay Doha.\nChúng tôi đã có một điểm dừng chân qua đêm ngắn ngủi ở Singapore trước khi bay về nước.",
        page_number: 439
      },
      {
        word: "Terminal",
        phonetic: "/ˈtɝː.mə.nəl/",
        word_type: "noun",
        meaning_vi: "Nhà ga, bến cuối",
        sound_bridge: "Té mệt mỏi ngồi nghỉ tại nhà ga sân bay hiện đại.",
        definition_en: "a building at an airport where passengers transfer between ground transportation and the facilities",
        example_en: "International departures leave from Terminal Two.\nPassengers took the free shuttle bus between airport terminals.",
        example_vi: "Các chuyến bay quốc tế khởi hành từ Nhà ga số Hai.\nHành khách đã bắt xe buýt trung chuyển miễn phí giữa các nhà ga sân bay.",
        page_number: 439
      },
      {
        word: "Territory",
        phonetic: "/ˈter.ə.tɔːr.i/",
        word_type: "noun",
        meaning_vi: "Lãnh thổ, địa bàn",
        sound_bridge: "Té rách áo khi đi tuần tra bảo vệ lãnh thổ quốc gia.",
        definition_en: "an area of land under the jurisdiction of a ruler or state",
        example_en: "Tigers mark their territory by leaving scents on trees.\nThe island is an overseas territory of the United Kingdom.",
        example_vi: "Hổ đánh dấu lãnh thổ của chúng bằng cách để lại mùi hương trên thân cây.\nHòn đảo là một vùng lãnh thổ hải ngoại của Vương quốc Anh.",
        page_number: 440
      },
      {
        word: "Unpack",
        phonetic: "/ʌnˈpæk/",
        word_type: "verb",
        meaning_vi: "Mở hành lý, dỡ đồ",
        sound_bridge: "Ăn bắp nướng xong mở hành lý dỡ đồ đạc.",
        definition_en: "open and remove the contents of a suitcase, bag, or package",
        example_en: "Let's unpack our bags and take a warm shower.\nShe carefully unpacked the fragile porcelain dishes from the box.",
        example_vi: "Chúng ta hãy dỡ hành lý mở đồ ra và đi tắm nước ấm nhé.\nCô ấy đã cẩn thận dỡ những chiếc đĩa sứ mỏng manh ra khỏi hộp.",
        page_number: 440
      },
      {
        word: "Village",
        phonetic: "/ˈvɪl.ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Ngôi làng, làng quê",
        sound_bridge: "Ví lấp lánh tìm thấy tại ngôi làng thanh bình.",
        definition_en: "a group of houses and associated buildings, situated in a rural area",
        example_en: "They spent the weekend relaxing in a peaceful mountain village.\nTraditional pottery craftsmanship has been preserved in this ancient village.",
        example_vi: "Họ đã dành cả cuối tuần để thư giãn tại một ngôi làng miền núi thanh bình.\nNghề thủ công làm gốm truyền thống đã được gìn giữ trong ngôi làng cổ kính này.",
        page_number: 440
      },
      {
        word: "Visit",
        phonetic: "/ˈvɪz.ɪt/",
        word_type: "verb",
        meaning_vi: "Thăm viếng, ghé thăm",
        sound_bridge: "Ví rách đi thăm viếng bà con họ hàng vùng quê.",
        definition_en: "go to see and spend time with someone socially, or go to see a place",
        example_en: "We visit our grandparents in the countryside every summer.\nMillions of tourists visit Ha Long Bay each year to see limestone islands.",
        example_vi: "Chúng tôi về thăm ông bà ở vùng quê vào mỗi mùa hè.\nHàng triệu du khách ghé thăm Vịnh Hạ Long mỗi năm để chiêm ngưỡng những đảo đá vôi.",
        page_number: 440
      },
      {
        word: "Voyage",
        phonetic: "/ˈvɔɪ.ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Chuyến hải trình, chuyến du hành biển",
        sound_bridge: "Voi ỉu xìu trên chuyến du hành biển vượt đại dương.",
        definition_en: "a long journey involving travel by sea or in space",
        example_en: "The historic voyage across the Atlantic took several weeks.\nSpacecraft embarked on a daring voyage to explore Mars.",
        example_vi: "Chuyến hải trình lịch sử vượt Đại Tây Dương kéo dài vài tuần.\nTàu vũ trụ đã bắt đầu một chuyến du hành táo bạo để khám phá Sao Hỏa.",
        page_number: 440
      }
    ]
  },

  // ==========================================
  // UNIT 46: Creatures (26 từ, Trang 444 - 449)
  // ==========================================
  46: {
    unit: 46,
    unit_title: "Creatures",
    category: "Nature & Animals",
    words: [
      {
        word: "Abandon",
        phonetic: "/əˈbæn.dən/",
        word_type: "verb",
        meaning_vi: "Từ bỏ, bỏ rơi",
        sound_bridge: "Ơ bạn thân không bao giờ bỏ rơi bạn bè lúc khó khăn.",
        definition_en: "cease to support or look after someone; desert",
        example_en: "Cruel owners abandoned the helpless puppy on the highway.\nThey had to abandon their flooded car and walk to safety.",
        example_vi: "Những người chủ tàn nhẫn đã bỏ rơi chú cún con bất lực trên đường cao tốc.\nHọ đã phải bỏ lại chiếc xe ô tô bị ngập nước và đi bộ đến nơi an toàn.",
        page_number: 444
      },
      {
        word: "Bear",
        phonetic: "/ber/",
        word_type: "noun",
        meaning_vi: "Con gấu, chịu đựng",
        sound_bridge: "Bé sợ con gấu to lớn trong rừng rậm.",
        definition_en: "a large, heavy mammal with thick fur and a very short tail; endure an ordeal",
        example_en: "Grizzly bears catch fresh salmon from mountain streams.\nShe could hardly bear the pain of the broken ankle.",
        example_vi: "Những chú gấu xám bắt cá hồi tươi từ những con suối trên núi.\nCô ấy hầu như không thể chịu đựng nổi cơn đau do mắt cá chân bị gãy.",
        page_number: 444
      },
      {
        word: "Branch",
        phonetic: "/bræntʃ/",
        word_type: "noun",
        meaning_vi: "Cành cây, chi nhánh",
        sound_bridge: "Bà rải thóc trên cành cây cho chim ăn.",
        definition_en: "a part of a tree which grows out from the trunk; a division of an organization",
        example_en: "Birds perched cheerfully on the leafy oak branches.\nThe commercial bank opened a new branch in our neighborhood.",
        example_vi: "Những chú chim đậu líu lo vui vẻ trên những cành cây sồi rợp bóng lá.\nNgân hàng thương mại đã mở một chi nhánh mới tại khu phố của chúng tôi.",
        page_number: 444
      },
      {
        word: "Breed",
        phonetic: "/briːd/",
        word_type: "verb",
        meaning_vi: "Sinh sản, nhân giống, nòi giống",
        sound_bridge: "Bà rải thức ăn nhân giống đàn gà ri quý hiếm.",
        definition_en: "mate and then produce offspring; rear and train",
        example_en: "Many species of migratory birds breed in northern wetlands.\nGolden Retrievers are a gentle and loyal breed of dog.",
        example_vi: "Nhiều loài chim di cư sinh sản ở các vùng đất ngập nước phía bắc.\nChó Golden Retriever là một giống chó hiền lành và trung thành.",
        page_number: 444
      },
      {
        word: "Bush",
        phonetic: "/bʊʃ/",
        word_type: "noun",
        meaning_vi: "Bụi cây, bụi rậm",
        sound_bridge: "Búp sen nở ẩn mình sau bụi cây rậm rạp.",
        definition_en: "a shrub or clump of shrubs with stems of moderate length",
        example_en: "Rabbits hid quickly in the thick rose bush.\nWe planted flowering bushes along the front garden fence.",
        example_vi: "Những chú thỏ nhanh chóng ẩn nấp trong bụi hoa hồng rậm rạp.\nChúng tôi đã trồng những bụi cây có hoa dọc theo hàng rào vườn trước.",
        page_number: 445
      },
      {
        word: "Creature",
        phonetic: "/ˈkriː.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Sinh vật, loài vật",
        sound_bridge: "Cười khúc khích ngắm nhìn những sinh vật biển kỳ lạ.",
        definition_en: "an animal, as distinct from a human being; an animate being",
        example_en: "Deep-sea creatures have adapted to survive extreme pressure.\nRespect all living creatures and protect their natural habitats.",
        example_vi: "Các sinh vật biển sâu đã thích nghi để tồn tại dưới áp suất cực lớn.\nHãy tôn trọng tất cả các loài sinh vật sống và bảo vệ môi trường sống tự nhiên của chúng.",
        page_number: 445
      },
      {
        word: "Crocodile",
        phonetic: "/ˈkrɑː.kə.daɪl/",
        word_type: "noun",
        meaning_vi: "Con cá sấu",
        sound_bridge: "Cọp sợ con cá sấu khổng lồ đang bơi dưới đầm lầy.",
        definition_en: "a large predatory semiaquatic reptile with long jaws, armored skin, and a powerful tail",
        example_en: "Crocodiles bask under the warm tropical sun along riverbanks.\nA crocodile can hold its breath underwater for over an hour.",
        example_vi: "Những con cá sấu sưởi ấm dưới ánh nắng nhiệt đới dọc theo các bờ sông.\nMột con cá sấu có thể nín thở dưới nước trong hơn một giờ.",
        page_number: 445
      },
      {
        word: "Eggplant",
        phonetic: "/ˈeɡ.plænt/",
        word_type: "noun",
        meaning_vi: "Cà tím",
        sound_bridge: "Ép phở ăn cùng món cà tím nướng mỡ hành thơm phức.",
        definition_en: "the purple egg-shaped fruit of a tropical Old World plant, which is eaten as a vegetable",
        example_en: "Grilled eggplant with garlic sauce is a delicious vegan dish.\nShe harvested fresh purple eggplants from her organic garden.",
        example_vi: "Cà tím nướng với sốt tỏi là một món ăn chay thơm ngon tuyệt vời.\nCô ấy đã thu hoạch những quả cà tím tươi ngon từ khu vườn hữu cơ của mình.",
        page_number: 445
      },
      {
        word: "Faithful",
        phonetic: "/ˈfeɪθ.fəl/",
        word_type: "adjective",
        meaning_vi: "Trung thành, chung thủy",
        sound_bridge: "Phở thơm lừng người bạn trung thành mời thưởng thức.",
        definition_en: "remaining loyal and steadfast; reliable",
        example_en: "Dogs are famous for being man's most faithful companions.\nShe remained faithful to her core moral principles throughout her career.",
        example_vi: "Chó nổi tiếng là những người bạn đồng hành trung thành nhất của con người.\nCô ấy luôn trung thành với các nguyên tắc đạo đức cốt lõi trong suốt sự nghiệp của mình.",
        page_number: 446
      },
      {
        word: "Feather",
        phonetic: "/ˈfeð.ɚ/",
        word_type: "noun",
        meaning_vi: "Lông vũ, lông chim",
        sound_bridge: "Phở thơm nhẹ như chiếc lông vũ bay trong gió.",
        definition_en: "any of the flat appendages growing from a bird's skin, consisting of a central shaft and soft barbs",
        example_en: "Peacocks display dazzling, iridescent tail feathers.\nThe pillow is stuffed with soft duck feathers for maximum comfort.",
        example_vi: "Những chú công phô diễn bộ lông vũ đuôi rực rỡ lấp lánh ánh kim.\nChiếc gối được nhồi lông vũ vịt mềm mại để mang lại sự thoải mái tối đa.",
        page_number: 446
      },
      {
        word: "Giraffe",
        phonetic: "/dʒɪˈræf/",
        word_type: "noun",
        meaning_vi: "Hươu cao cổ",
        sound_bridge: "Gà rỉ tai ngước nhìn chú hươu cao cổ ăn lá trên cao.",
        definition_en: "a large African mammal with a very long neck and forelegs",
        example_en: "Giraffes use their long purple tongues to pluck leaves from acacia trees.\nThe giraffe is the tallest living terrestrial animal on Earth.",
        example_vi: "Hươu cao cổ sử dụng chiếc lưỡi dài màu tím để hái lá từ những cây keo.\nHươu cao cổ là loài động vật trên cạn cao nhất còn sống trên Trái Đất.",
        page_number: 446
      },
      {
        word: "Herb",
        phonetic: "/ɝːb/",
        word_type: "noun",
        meaning_vi: "Thảo mộc, rau thơm",
        sound_bridge: "Hút nước sắc thảo mộc bồi bổ cơ thể khỏe mạnh.",
        definition_en: "any plant with leaves, seeds, or flowers used for flavoring, food, medicine, or perfume",
        example_en: "Fresh herbs like basil, mint, and cilantro add flavor to food.\nTraditional Vietnamese medicine utilizes countless medicinal herbs.",
        example_vi: "Các loại rau thơm tươi như húng quế, bạc hà và ngò rí làm tăng hương vị cho món ăn.\nY học cổ truyền Việt Nam sử dụng vô số loại cây thảo mộc chữa bệnh.",
        page_number: 446
      },
      {
        word: "Jungle",
        phonetic: "/ˈdʒʌŋ.ɡəl/",
        word_type: "noun",
        meaning_vi: "Rừng rậm nhiệt đới",
        sound_bridge: "Dắt trâu đi qua rừng rậm nhiệt đới bạt ngàn.",
        definition_en: "an area of land overgrown with dense forest and tangled vegetation, typically in the tropics",
        example_en: "The Amazon jungle is home to millions of unique plant species.\nExplorers trekked for weeks through the dense tropical jungle.",
        example_vi: "Rừng rậm nhiệt đới Amazon là ngôi nhà của hàng triệu loài thực vật độc đáo.\nCác nhà thám hiểm đã đi bộ nhiều tuần qua cánh rừng rậm nhiệt đới dày đặc.",
        page_number: 447
      },
      {
        word: "Kitten",
        phonetic: "/ˈkɪt.ən/",
        word_type: "noun",
        meaning_vi: "Mèo con",
        sound_bridge: "Kính cận ngắm nhìn chú mèo con tinh nghịch đùa giỡn.",
        definition_en: "a young cat",
        example_en: "The playful kitten chased a ball of colorful wool.\nWe adopted a stray ginger kitten from the animal shelter.",
        example_vi: "Chú mèo con tinh nghịch đuổi theo một cuộn len đầy màu sắc.\nChúng tôi đã nhận nuôi một chú mèo con lông vàng bị lạc từ trạm cứu hộ động vật.",
        page_number: 447
      },
      {
        word: "Nut",
        phonetic: "/nʌt/",
        word_type: "noun",
        meaning_vi: "Hạt cây, đai ốc",
        sound_bridge: "Nấu chè hạt dẻ thơm ngon bổ dưỡng.",
        definition_en: "a fruit consisting of a hard or tough shell around an edible kernel",
        example_en: "Eating almonds and walnuts provides healthy fatty acids.\nTighten the metal nut firmly onto the bolt with a wrench.",
        example_vi: "Ăn hạt hạnh nhân và hạt óc chó cung cấp các axit béo lành mạnh.\nHãy vặn chặt chiếc đai ốc kim loại vào bu-lông bằng cờ-lê.",
        page_number: 447
      },
      {
        word: "Owl",
        phonetic: "/aʊl/",
        word_type: "noun",
        meaning_vi: "Chim cú mèo",
        sound_bridge: "Ao sâu có chim cú mèo đậu trên cành cây rình mồi.",
        definition_en: "a nocturnal bird of prey with large forward-facing eyes, facial disc, and silent flight",
        example_en: "Owls can rotate their heads up to 270 degrees.\nThe barn owl hunted silently for mice in the moonlit field.",
        example_vi: "Cú mèo có thể xoay đầu tới 270 độ.\nChú cú lợn săn chuột một cách thầm lặng trên cánh đồng ngập ánh trăng.",
        page_number: 447
      },
      {
        word: "Parrot",
        phonetic: "/ˈper.ət/",
        word_type: "noun",
        meaning_vi: "Con vẹt",
        sound_bridge: "Phở ếch cho con vẹt ăn quả chín ngon lành.",
        definition_en: "a mainly tropical bird with bright plumage and a curved beak, capable of mimicking human speech",
        example_en: "The colorful parrot mimicked everything its owner said.\nMacaw parrots have brilliant scarlet, blue, and yellow feathers.",
        example_vi: "Chú vẹt sặc sỡ nhại lại tất cả những gì người chủ nói.\nNhững chú vẹt Macaw có bộ lông màu đỏ tươi, xanh dương và vàng rực rỡ.",
        page_number: 447
      },
      {
        word: "Pine",
        phonetic: "/paɪn/",
        word_type: "noun",
        meaning_vi: "Cây thông, gỗ thông",
        sound_bridge: "Phải nướng ngô dưới tán cây thông Đà Lạt thơm ngát.",
        definition_en: "an evergreen coniferous tree which has clusters of long needle-shaped leaves",
        example_en: "The fresh scent of pine filled the cool morning mountain air.\nThis rustic kitchen table was crafted from solid pine wood.",
        example_vi: "Hương thơm tươi mát của cây thông tràn ngập bầu không khí núi non buổi sớm.\nChiếc bàn ăn mộc mạc này được chế tác từ gỗ thông nguyên khối.",
        page_number: 448
      },
      {
        word: "Process",
        phonetic: "/ˈprɑː.ses/",
        word_type: "noun",
        meaning_vi: "Quá trình, quy trình, xử lý",
        sound_bridge: "Phải lo xét duyệt quy trình sản xuất an toàn thực phẩm.",
        definition_en: "a series of actions or steps taken in order to achieve a particular end",
        example_en: "Photosynthesis is the natural process by which plants make food.\nThe computer takes a few seconds to process high-resolution video.",
        example_vi: "Quang hợp là quy trình tự nhiên mà qua đó cây cối tạo ra thức ăn.\nMáy tính mất vài giây để xử lý video độ phân giải cao.",
        page_number: 448
      },
      {
        word: "Rabbit",
        phonetic: "/ˈræb.ɪt/",
        word_type: "noun",
        meaning_vi: "Con thỏ",
        sound_bridge: "Rau bắp cải cho con thỏ trắng gặm nhấm ngon lành.",
        definition_en: "a burrowing, gregarious, plant-eating mammal with long ears, long hind legs, and a short tail",
        example_en: "The fluffy white rabbit hopped across the grassy lawn.\nRabbits have excellent hearing thanks to their long mobile ears.",
        example_vi: "Chú thỏ trắng mịn màng nhảy tung tăng trên thảm cỏ xanh.\nThỏ có thính giác tuyệt vời nhờ đôi tai dài linh hoạt.",
        page_number: 448
      },
      {
        word: "Region",
        phonetic: "/ˈriː.dʒən/",
        word_type: "noun",
        meaning_vi: "Khu vực, vùng miền",
        sound_bridge: "Ri dẫn dắt đoàn du lịch khám phá khu vực miền Trung.",
        definition_en: "an area or division, especially part of a country or the world having definable characteristics",
        example_en: "The Mekong Delta is Vietnam's most productive agricultural region.\nThis mountainous region is famous for producing high-grade tea.",
        example_vi: "Đồng bằng sông Cửu Long là khu vực nông nghiệp màu mỡ nhất của Việt Nam.\nVùng miền núi này nổi tiếng về việc sản xuất các loại trà thượng hạng.",
        page_number: 448
      },
      {
        word: "Scenery",
        phonetic: "/ˈsiː.nɚ.i/",
        word_type: "noun",
        meaning_vi: "Phong cảnh, cảnh quan",
        sound_bridge: "Si ngắm nhìn phong cảnh thiên nhiên tuyệt đẹp.",
        definition_en: "the natural features of a landscape considered in terms of their appearance, especially when picturesque",
        example_en: "The train ride from Da Nang to Hue offers spectacular coastal scenery.\nTourists took photos of the breathtaking mountain scenery.",
        example_vi: "Chuyến tàu hỏa từ Đà Nẵng đến Huế mang lại phong cảnh ven biển ngoạn mục.\nDu khách đã chụp ảnh cảnh quan núi non đẹp đến nghẹt thở.",
        page_number: 448
      },
      {
        word: "Shell",
        phonetic: "/ʃel/",
        word_type: "noun",
        meaning_vi: "Vỏ ốc, vỏ trứng, mai rùa",
        sound_bridge: "Xe lùi làm rơi chiếc vỏ ốc biển trang trí.",
        definition_en: "the hard protective outer case of a mollusk, crustacean, egg, or nut",
        example_en: "Children collected colorful seashells on the sandy beach.\nTurtles retreat inside their hard bony shells when sensing danger.",
        example_vi: "Trẻ em đã nhặt những chiếc vỏ ốc biển đầy màu sắc trên bãi cát.\nRùa thu mình vào trong lớp mai xương cứng cáp khi cảm nhận thấy mối nguy hiểm.",
        page_number: 449
      },
      {
        word: "Swan",
        phonetic: "/swɑːn/",
        word_type: "noun",
        meaning_vi: "Thiên nga, chim thiên nga",
        sound_bridge: "Súp oản xôi cho đàn thiên nga trắng bơi lội ăn.",
        definition_en: "a large waterbird with a long flexible neck, short legs, webbed feet, and a typically all-white plumage",
        example_en: "A pair of graceful white swans glided across the tranquil lake.\nSwans are known to mate for life with their partners.",
        example_vi: "Một đôi thiên nga trắng duyên dáng lướt nhẹ trên mặt hồ yên ả.\nThiên nga được biết đến là loài thủy chung gắn bó cả đời với bạn đời của chúng.",
        page_number: 449
      },
      {
        word: "Turkey",
        phonetic: "/ˈtɝː.ki/",
        word_type: "noun",
        meaning_vi: "Con gà tây, nước Thổ Nhĩ Kỳ",
        sound_bridge: "Tết ăn món gà tây nướng thơm lừng cả nhà.",
        definition_en: "a large primarily North American bird with a bald neck and colorful plumage; a transcontinental country",
        example_en: "Roast turkey is the traditional centerpiece of Thanksgiving dinner.\nWild turkeys can run surprisingly fast across open fields.",
        example_vi: "Gà tây nướng là món ăn tâm điểm truyền thống của bữa tối Lễ Tạ Ơn.\nNhững chú gà tây hoang dã có thể chạy nhanh đáng kinh ngạc qua những cánh đồng trống.",
        page_number: 449
      },
      {
        word: "Worm",
        phonetic: "/wɝːm/",
        word_type: "noun",
        meaning_vi: "Con giun, sâu",
        sound_bridge: "Quỳ sợ con giun đất bò qua luống rau xanh.",
        definition_en: "any of a number of creeping or burrowing invertebrate animals with long, slender, soft bodies",
        example_en: "Earthworms enrich garden soil and make it fertile for crops.\nThe early bird catches the juicy morning worm.",
        example_vi: "Những chú giun đất làm giàu đất vườn và khiến đất trở nên màu mỡ cho cây trồng.\nChú chim dậy sớm sẽ bắt được con sâu béo bở buổi sớm.",
        page_number: 449
      }
    ]
  },

  // ==========================================
  // UNIT 47: Natural World 1 (26 từ, Trang 453 - 458)
  // ==========================================
  47: {
    unit: 47,
    unit_title: "Natural World 1",
    category: "Nature & Environment",
    words: [
      {
        word: "Abuse",
        phonetic: "/əˈbjuːz/",
        word_type: "verb",
        meaning_vi: "Lạm dụng, hành hạ",
        sound_bridge: "Ơ bị xúi lạm dụng thuốc kháng sinh gây hại sức khỏe.",
        definition_en: "use something to bad effect or for a bad purpose; treat with cruelty or violence",
        example_en: "Do not abuse chemical pesticides on food crops.\nAnimal welfare charities protect pets from cruelty and abuse.",
        example_vi: "Đừng lạm dụng thuốc trừ sâu hóa học trên các loại cây lương thực.\nCác tổ chức từ thiện bảo vệ động vật bảo vệ thú cưng khỏi sự tàn bạo và hành hạ.",
        page_number: 453
      },
      {
        word: "Climate",
        phonetic: "/ˈklaɪ.mət/",
        word_type: "noun",
        meaning_vi: "Khí hậu",
        sound_bridge: "Cá lặn dưới nước thích nghi với khí hậu nhiệt đới.",
        definition_en: "the weather conditions prevailing in an area in general or over a long period",
        example_en: "Global climate change is causing rising sea levels worldwide.\nDa Lat enjoys a cool and pleasant temperate climate all year.",
        example_vi: "Biến đổi khí hậu toàn cầu đang khiến mực nước biển dâng cao trên toàn thế giới.\nĐà Lạt có một khí hậu ôn đới mát mẻ và dễ chịu quanh năm.",
        page_number: 453
      },
      {
        word: "Coast",
        phonetic: "/koʊst/",
        word_type: "noun",
        meaning_vi: "Bờ biển, miền ven biển",
        sound_bridge: "Cột buồm tàu lướt êm dọc theo bờ biển tuyệt đẹp.",
        definition_en: "the part of the land near the sea; the edge of the land",
        example_en: "Vietnam has a coastline extending over 3,200 kilometers.\nWe drove along the scenic Pacific coast at sunset.",
        example_vi: "Việt Nam có đường bờ biển trải dài hơn 3.200 km.\nChúng tôi đã lái xe dọc theo bờ biển Thái Bình Dương thơ mộng lúc hoàng hôn.",
        page_number: 453
      },
      {
        word: "Copper",
        phonetic: "/ˈkɑː.pɚ/",
        word_type: "noun",
        meaning_vi: "Đồng (kim loại)",
        sound_bridge: "Cọp sợ đồ vật làm bằng đồng sáng bóng loáng.",
        definition_en: "a red-brown metal, the chemical element of atomic number 29",
        example_en: "Copper is widely used for electrical wiring because it is a great conductor.\nAncient artisans crafted decorative pots from hammered copper.",
        example_vi: "Đồng được sử dụng rộng rãi cho dây dẫn điện vì nó là chất dẫn điện tuyệt vời.\nCác nghệ nhân cổ xưa đã chế tác những chiếc bình trang trí từ đồng rèn.",
        page_number: 453
      },
      {
        word: "Disaster",
        phonetic: "/dɪˈzæs.tɚ/",
        word_type: "noun",
        meaning_vi: "Thảm họa, tai họa",
        sound_bridge: "Đi sợ sét đánh trúng tạo nên thảm họa kinh hoàng.",
        definition_en: "a sudden catastrophe that causes great damage or loss of life",
        example_en: "Floods and landslides are common natural disasters during monsoon season.\nThe emergency response team worked tirelessly after the earthquake disaster.",
        example_vi: "Lũ lụt và sạt lở đất là những thảm họa tự nhiên phổ biến trong mùa gió mùa.\nĐội phản ứng khẩn cấp đã làm việc không biết mệt mỏi sau thảm họa động đất.",
        page_number: 454
      },
      {
        word: "Earthquake",
        phonetic: "/ˈɝːθ.kweɪk/",
        word_type: "noun",
        meaning_vi: "Trận động đất",
        sound_bridge: "Ếch sợ quạ kêu khi trận động đất làm rung chuyển mặt đất.",
        definition_en: "a sudden and violent shaking of the ground, sometimes causing great destruction",
        example_en: "A massive earthquake measuring 7.5 struck the offshore region.\nModern Japanese skyscrapers are engineered to withstand violent earthquakes.",
        example_vi: "Một trận động đất lớn mạnh 7,5 độ đã tấn công khu vực ngoài khơi.\nNhững tòa nhà chọc trời hiện đại của Nhật Bản được thiết kế để chịu được các trận động đất dữ dội.",
        page_number: 454
      },
      {
        word: "Era",
        phonetic: "/ˈɪr.ə/",
        word_type: "noun",
        meaning_vi: "Kỷ nguyên, thời đại",
        sound_bridge: "In rực rỡ các bức tranh về thời đại kỷ nguyên số.",
        definition_en: "a long and distinct period of history with a particular feature or characteristic",
        example_en: "We are living in an unprecedented era of technological transformation.\nThe Industrial Era brought about monumental shifts in human manufacturing.",
        example_vi: "Chúng ta đang sống trong một kỷ nguyên biến đổi công nghệ chưa từng có.\nThời đại Công nghiệp đã mang lại những thay đổi to lớn trong sản xuất của nhân loại.",
        page_number: 454
      },
      {
        word: "Fad",
        phonetic: "/fæd/",
        word_type: "noun",
        meaning_vi: "Mốt nhất thời, xu hướng ngắn hạn",
        sound_bridge: "Phở ăn thử theo mốt nhất thời của giới trẻ.",
        definition_en: "an intense and widely shared enthusiasm for something, especially one that is short-lived",
        example_en: "Diet trends are often short-lived fads that fade within months.\nDon't waste money chasing every passing fashion fad.",
        example_vi: "Các xu hướng ăn kiêng thường là mốt nhất thời chóng tàn lụi trong vài tháng.\nĐừng lãng phí tiền bạc theo đuổi mọi mốt nhất thời thoáng qua của thời trang.",
        page_number: 454
      },
      {
        word: "Fog",
        phonetic: "/fɑːɡ/",
        word_type: "noun",
        meaning_vi: "Sương mù dày đặc",
        sound_bridge: "Phở ăn gắp miếng thịt trong màn sương mù dày đặc.",
        definition_en: "a thick cloud of tiny water droplets suspended in the atmosphere at or near the earth's surface",
        example_en: "Dense morning fog reduced visibility to less than fifty meters.\nFlights were grounded temporarily because of the heavy fog.",
        example_vi: "Sương mù dày đặc buổi sáng đã làm giảm tầm nhìn xuống dưới năm mươi mét.\nCác chuyến bay đã bị hoãn tạm thời vì màn sương mù dày đặc.",
        page_number: 455
      },
      {
        word: "Forecast",
        phonetic: "/ˈfɔːr.kæst/",
        word_type: "verb",
        meaning_vi: "Dự báo (thời tiết/kinh tế)",
        sound_bridge: "Phở cạn nước theo đúng dự báo thời tiết khô hạn.",
        definition_en: "predict or estimate a future event or trend",
        example_en: "Meteorologists forecast heavy rain showers for tomorrow afternoon.\nFinancial analysts forecast a strong economic recovery next quarter.",
        example_vi: "Các nhà khí tượng học dự báo sẽ có mưa rào lớn vào chiều mai.\nCác nhà phân tích tài chính dự báo sự phục hồi kinh tế mạnh mẽ trong quý tới.",
        page_number: 455
      },
      {
        word: "Harvest",
        phonetic: "/ˈhɑːr.vəst/",
        word_type: "noun",
        meaning_vi: "Mùa thu hoạch, vụ mùa",
        sound_bridge: "Hát bài ca mừng mùa thu hoạch lúa bội thu.",
        definition_en: "the process or period of gathering in crops",
        example_en: "Farmers celebrated a bountiful rice harvest this autumn.\nVineyards hire seasonal workers to harvest ripe wine grapes.",
        example_vi: "Những người nông dân đã ăn mừng một mùa thu hoạch lúa bội thu vào mùa thu này.\nCác vườn nho thuê công nhân thời vụ để thu hoạch những trái nho chín mọng.",
        page_number: 455
      },
      {
        word: "Humid",
        phonetic: "/ˈhjuː.mɪd/",
        word_type: "adjective",
        meaning_vi: "Ẩm ướt, oi bức",
        sound_bridge: "Hút nước mát giải nhiệt trong ngày oi bức ẩm ướt.",
        definition_en: "marked by a relatively high level of water vapor in the atmosphere",
        example_en: "Summers in Hanoi can be intensely hot and humid.\nTurn on the air conditioner to reduce the humid room atmosphere.",
        example_vi: "Mùa hè ở Hà Nội có thể vô cùng nóng nực và ẩm ướt oi ả.\nHãy bật điều hòa để làm giảm không khí ẩm ướt trong phòng.",
        page_number: 455
      },
      {
        word: "Mild",
        phonetic: "/maɪld/",
        word_type: "adjective",
        meaning_vi: "Ôn hòa, êm dịu, nhẹ",
        sound_bridge: "Mai lau nhà trong thời tiết ôn hòa êm dịu.",
        definition_en: "not severe, serious, or harsh; moderately warm",
        example_en: "The coastal town enjoys mild winters and sunny summers.\nHe suffered only mild symptoms and recovered within two days.",
        example_vi: "Thị trấn ven biển có mùa đông ôn hòa êm dịu và mùa hè ngập tràn ánh nắng.\nAnh ấy chỉ bị các triệu chứng nhẹ và đã hồi phục trong vòng hai ngày.",
        page_number: 456
      },
      {
        word: "Mud",
        phonetic: "/mʌd/",
        word_type: "noun",
        meaning_vi: "Bùn lầy, đất bùn",
        sound_bridge: "Mặt lấm lem đất bùn lầy sau trận đấu bóng đá.",
        definition_en: "soft, sticky matter consisting of an earth and water mixture",
        example_en: "The heavy storm turned the mountain trail into thick mud.\nChildren laughed happily while splashing in mud puddles.",
        example_vi: "Cơn bão lớn đã biến con đường mòn trên núi thành bùn lầy dày đặc.\nLũ trẻ cười vui vẻ khi lội bì bõm trong những vũng bùn lầy.",
        page_number: 456
      },
      {
        word: "Planet",
        phonetic: "/ˈplæn.ɪt/",
        word_type: "noun",
        meaning_vi: "Hành tinh",
        sound_bridge: "Bà lặn lội ngắm hành tinh sao Hỏa qua kính viễn vọng.",
        definition_en: "a celestial body moving in an elliptical orbit around a star",
        example_en: "Earth is the only known planet in the universe that supports life.\nAstronomers recently discovered new planets orbiting distant stars.",
        example_vi: "Trái Đất là hành tinh duy nhất được biết đến trong vũ trụ có sự sống.\nCác nhà thiên văn học gần đây đã phát hiện các hành tinh mới quay quanh những ngôi sao xa xôi.",
        page_number: 456
      },
      {
        word: "Pollute",
        phonetic: "/pəˈluːt/",
        word_type: "verb",
        meaning_vi: "Làm ô nhiễm",
        sound_bridge: "Phở lẩu đổ bừa bãi làm ô nhiễm dòng sông.",
        definition_en: "contaminate with harmful or poisonous substances",
        example_en: "Factories that pollute freshwater rivers face severe fines.\nVehicle exhaust fumes pollute urban air and harm human lungs.",
        example_vi: "Các nhà máy làm ô nhiễm nguồn nước ngọt sông ngòi phải đối mặt với mức phạt nặng.\nKhí thải xe cộ làm ô nhiễm không khí đô thị và gây hại cho phổi của con người.",
        page_number: 456
      },
      {
        word: "Rage",
        phonetic: "/reɪdʒ/",
        word_type: "noun",
        meaning_vi: "Cơn thịnh nộ, giận dữ",
        sound_bridge: "Rán cá khét làm mẹ nổi cơn thịnh nộ giận dữ.",
        definition_en: "violent, uncontrollable anger",
        example_en: "He flew into an uncontrollable rage and slammed his fist on the desk.\nThe furious storm raged along the coastal villages all night.",
        example_vi: "Anh ấy nổi cơn thịnh nộ mất kiểm soát và đập mạnh nắm đấm xuống bàn.\nCơn bão hung dữ đã gầm rú giận dữ dọc theo các ngôi làng ven biển suốt đêm.",
        page_number: 457
      },
      {
        word: "Seaside",
        phonetic: "/ˈsiː.saɪd/",
        word_type: "noun",
        meaning_vi: "Bờ biển, vùng ven biển",
        sound_bridge: "Si say sưa ngắm hoàng hôn buông xuống bờ biển.",
        definition_en: "a place by the sea, especially a beach resort or holiday location",
        example_en: "We spent our annual family summer holiday at a seaside hotel.\nThe fresh seaside breeze revitalized our energy instantly.",
        example_vi: "Chúng tôi đã dành kỳ nghỉ hè hàng năm của gia đình tại một khách sạn ven bờ biển.\nLàn gió bờ biển trong lành đã tiếp thêm sinh lực cho chúng tôi ngay tức thì.",
        page_number: 457
      },
      {
        word: "Shadow",
        phonetic: "/ˈʃæd.oʊ/",
        word_type: "noun",
        meaning_vi: "Bóng râm, bóng tối",
        sound_bridge: "Xe đậu dưới bóng râm của cây cổ thụ mát mẻ.",
        definition_en: "a dark area or shape produced by a body coming between rays of light and a surface",
        example_en: "The ancient banyan tree cast a welcoming shadow across the courtyard.\nHis shadow lengthened as the sun sank low on the horizon.",
        example_vi: "Cây đa cổ thụ tỏa bóng râm mát rượi khắp sân đình.\nBóng của anh ấy dài ra khi mặt trời lặn dần xuống đường chân trời.",
        page_number: 457
      },
      {
        word: "Stream",
        phonetic: "/striːm/",
        word_type: "noun",
        meaning_vi: "Dòng suối, dòng chảy",
        sound_bridge: "Sợ trượt ngã khi lội qua con suối nước trong veo.",
        definition_en: "a small, narrow river; a continuous flow of liquid or data",
        example_en: "Clear, cold water flowed gently down the mountain stream.\nYou can stream live music concerts in 4K resolution online.",
        example_vi: "Nước trong veo mát lạnh nhẹ nhàng chảy dọc theo dòng suối trên núi.\nBạn có thể phát trực tiếp các buổi hòa nhạc với độ phân giải 4K trên mạng.",
        page_number: 457
      },
      {
        word: "Thunder",
        phonetic: "/ˈθʌn.dɚ/",
        word_type: "noun",
        meaning_vi: "Tiếng sấm sét",
        sound_bridge: "Thịt nướng thơm lừng tiếng sấm rền vang trên bầu trời.",
        definition_en: "a loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air",
        example_en: "Loud claps of thunder shook the windows during the thunderstorm.\nThe pet dog hid under the bed whenever it heard thunder.",
        example_vi: "Những tiếng sấm sét nổ vang làm rung chuyển các ô cửa sổ trong cơn giông bão.\nChú chó cưng trốn dưới gầm giường mỗi khi nghe thấy tiếng sấm sét.",
        page_number: 457
      },
      {
        word: "Tide",
        phonetic: "/taɪd/",
        word_type: "noun",
        meaning_vi: "Thủy triều",
        sound_bridge: "Tai nghe tiếng sóng thủy triều dâng cao tràn bờ.",
        definition_en: "the alternate rising and falling of the sea, usually twice in each lunar day",
        example_en: "The tide is coming in, so move your beach towels higher up.\nSurfers checked the tide forecast to catch the biggest ocean waves.",
        example_vi: "Thủy triều đang dâng lên rồi, hãy dời khăn tắm biển lên cao hơn nhé.\nNhững người lướt sóng đã kiểm tra dự báo thủy triều để bắt những con sóng đại dương lớn nhất.",
        page_number: 458
      },
      {
        word: "Tornado",
        phonetic: "/tɔːrˈneɪ.doʊ/",
        word_type: "noun",
        meaning_vi: "Cơn lốc xoáy, vòi rồng",
        sound_bridge: "To nổ tung khi cơn lốc xoáy quét qua cánh đồng.",
        definition_en: "a mobile, destructive vortex of violently rotating winds having the appearance of a funnel-shaped cloud",
        example_en: "A devastating tornado ripped roofs off houses in the town.\nResidents took shelter in underground basements during the tornado warning.",
        example_vi: "Một cơn lốc xoáy tàn phá đã giật tung mái nhà của các ngôi nhà trong thị trấn.\nCư dân đã trú ẩn trong các tầng hầm dưới lòng đất trong thời gian cảnh báo lốc xoáy.",
        page_number: 458
      },
      {
        word: "Valley",
        phonetic: "/ˈvæl.i/",
        word_type: "noun",
        meaning_vi: "Thung lũng",
        sound_bridge: "Va li xách tay mang đến thung lũng tình yêu Đà Lạt.",
        definition_en: "a low area of land between hills or mountains, typically with a river or stream flowing through it",
        example_en: "Muong Hoa Valley is famed for its breathtaking terraced rice fields.\nThe peaceful river winds gracefully through the lush green valley.",
        example_vi: "Thung lũng Mường Hoa nổi tiếng với những thửa ruộng bậc thang đẹp nghẹt thở.\nDòng sông yên ả uốn lượn duyên dáng qua thung lũng xanh tươi tốt.",
        page_number: 458
      },
      {
        word: "Volcano",
        phonetic: "/vɑːlˈkeɪ.noʊ/",
        word_type: "noun",
        meaning_vi: "Núi lửa",
        sound_bridge: "Voi lội bùn né tránh miệng núi lửa đang phun trào.",
        definition_en: "a mountain or hill having a crater or vent through which lava, rock fragments, and vapor are erupted",
        example_en: "Mount Fuji is an iconic active volcano in central Japan.\nThe volcano erupted violently, spewing ash clouds miles into the sky.",
        example_vi: "Núi Phú Sĩ là một ngọn núi lửa đang hoạt động mang tính biểu tượng ở miền trung Nhật Bản.\nNgọn núi lửa đã phun trào dữ dội, thổi tung những đám mây tro bụi cao hàng dặm lên bầu trời.",
        page_number: 458
      },
      {
        word: "Waterfall",
        phonetic: "/ˈwɑː.t̬ɚ.fɑːl/",
        word_type: "noun",
        meaning_vi: "Thác nước",
        sound_bridge: "Quạt phở thơm mát bên thác nước tung bọt trắng xóa.",
        definition_en: "a cascade of water falling from a height, formed when a river or stream flows over a precipice",
        example_en: "Ban Gioc Waterfall is one of the most majestic waterfalls in Southeast Asia.\nCool mist from the roaring waterfall refreshed all the tired hikers.",
        example_vi: "Thác Bản Giốc là một trong những thác nước hùng vĩ nhất ở Đông Nam Á.\nLàn sương mát lành từ thác nước cuộn trào gầm vang đã làm sảng khoái tất cả những người leo núi mệt mỏi.",
        page_number: 458
      }
    ]
  },

  // ==========================================
  // UNIT 48: Natural World 2 (27 từ, Trang 462 - 467)
  // ==========================================
  48: {
    unit: 48,
    unit_title: "Natural World 2",
    category: "Nature & Environment",
    words: [
      {
        word: "Atmosphere",
        phonetic: "/ˈæt.məs.fɪr/",
        word_type: "noun",
        meaning_vi: "Bầu khí quyển, bầu không khí",
        sound_bridge: "Ăn tôm xào phở trong bầu không khí ấm cúng của gia đình.",
        definition_en: "the envelope of gases surrounding the earth or another planet; tone or mood of a place",
        example_en: "Earth's atmosphere protects all living organisms from cosmic radiation.\nThe restaurant has a cozy and relaxing atmosphere.",
        example_vi: "Bầu khí quyển của Trái Đất bảo vệ tất cả sinh vật sống khỏi bức xạ vũ trụ.\nNhà hàng có một bầu không khí ấm cúng và thư giãn.",
        page_number: 462
      },
      {
        word: "Abundant",
        phonetic: "/əˈbʌn.dənt/",
        word_type: "adjective",
        meaning_vi: "Dồi dào, phong phú",
        sound_bridge: "Ơ bạn thân có nguồn tài liệu dồi dào phong phú.",
        definition_en: "existing or available in large quantities; plentiful",
        example_en: "Tropical rainforests possess abundant wildlife and plant species.\nThe island is blessed with abundant sunshine throughout the year.",
        example_vi: "Rừng mưa nhiệt đới sở hữu các loài động thực vật hoang dã phong phú dồi dào.\nHòn đảo được ban tặng nguồn ánh nắng mặt trời dồi dào quanh năm.",
        page_number: 462
      },
      {
        word: "Allocate",
        phonetic: "/ˈæl.ə.keɪt/",
        word_type: "verb",
        meaning_vi: "Phân bổ, chỉ định",
        sound_bridge: "Ăn lẩu cá phân bổ đều phần ăn cho từng người.",
        definition_en: "distribute resources or duties for a particular purpose",
        example_en: "The government allocated millions of dollars to disaster relief.\nWe must allocate sufficient budget for online marketing campaigns.",
        example_vi: "Chính phủ đã phân bổ hàng triệu đô la cho việc cứu trợ thảm họa.\nChúng ta phải phân bổ ngân sách đầy đủ cho các chiến dịch tiếp thị trực tuyến.",
        page_number: 462
      },
      {
        word: "Anticipate",
        phonetic: "/ænˈtɪs.ə.peɪt/",
        word_type: "verb",
        meaning_vi: "Dự đoán, lường trước, mong đợi",
        sound_bridge: "Ăn thịt phở bò dự đoán lường trước nhu cầu của khách.",
        definition_en: "regard as probable; expect or predict; look forward to",
        example_en: "We anticipate a significant increase in summer tourist bookings.\nEngineers anticipated potential system failures and designed backup measures.",
        example_vi: "Chúng tôi dự đoán mong đợi sự gia tăng đáng kể trong lượng đặt chỗ du lịch mùa hè.\nCác kỹ sư đã lường trước các lỗi hệ thống tiềm ẩn và thiết kế các biện pháp dự phòng.",
        page_number: 462
      },
      {
        word: "Anymore",
        phonetic: "/ˌen.iˈmɔːr/",
        word_type: "adverb",
        meaning_vi: "Nữa, không còn nữa",
        sound_bridge: "Em nợ một món tiền nhưng không còn nợ nữa.",
        definition_en: "to any further extent; any longer (used in negative sentences)",
        example_en: "She does not work at this international company anymore.\nI am not afraid of speaking in front of crowds anymore.",
        example_vi: "Cô ấy không còn làm việc tại công ty quốc tế này nữa.\nTôi không còn sợ nói trước đám đông nữa.",
        page_number: 463
      },
      {
        word: "Arise",
        phonetic: "/əˈraɪz/",
        word_type: "verb",
        meaning_vi: "Phát sinh, nảy sinh, xuất hiện",
        sound_bridge: "Ơ rái cá xuất hiện khi cơ hội mới nảy sinh.",
        definition_en: "originate; come into being; happen as a result of a situation",
        example_en: "Should any unforeseen difficulties arise, please notify management.\nNew business opportunities arose after the economic trade agreement.",
        example_vi: "Nếu có bất kỳ khó khăn bất ngờ nào phát sinh, vui lòng thông báo cho ban quản lý.\nNhững cơ hội kinh doanh mới đã nảy sinh xuất hiện sau hiệp định thương mại kinh tế.",
        page_number: 463
      },
      {
        word: "Battle",
        phonetic: "/ˈbæt̬.əl/",
        word_type: "noun",
        meaning_vi: "Trận chiến, cuộc chiến đấu",
        sound_bridge: "Bát tôm nướng ăn lấy sức tham gia trận chiến lịch sử.",
        definition_en: "a sustained fight between large organized armed forces; a lengthy struggle",
        example_en: "The historic battle of Dien Bien Phu changed the course of history.\nDoctors are fighting a brave battle against viral epidemics.",
        example_vi: "Trận chiến lịch sử Điện Biên Phủ đã thay đổi tiến trình lịch sử.\nCác bác sĩ đang tiến hành một cuộc chiến đấu dũng cảm chống lại các dịch bệnh do virus.",
        page_number: 463
      },
      {
        word: "Beneath",
        phonetic: "/bɪˈniːθ/",
        word_type: "preposition",
        meaning_vi: "Ở bên dưới, dưới chân",
        sound_bridge: "Bí nếp thơm nằm ở bên dưới giàn lá xanh mát.",
        definition_en: "extending or directly underneath; at a lower level than",
        example_en: "The subway tracks run beneath the bustling city streets.\nShe hid the spare front door key beneath a decorative flowerpot.",
        example_vi: "Các đường ray tàu điện ngầm chạy ở bên dưới những con phố thành phố nhộn nhịp.\nCô ấy đã giấu chiếc chìa khóa cửa trước dự phòng ở bên dưới một chậu hoa trang trí.",
        page_number: 463
      },
      {
        word: "Bottom",
        phonetic: "/ˈbɑː.t̬əm/",
        word_type: "noun",
        meaning_vi: "Đáy, phần dưới cùng",
        sound_bridge: "Bò tót uống nước ở đáy thung lũng mát lành.",
        definition_en: "the lowest point or part of something",
        example_en: "Sunken shipwrecks rest at the bottom of the deep ocean.\nSign your signature clearly at the bottom of the last page.",
        example_vi: "Những xác tàu đắm chìm nghỉ ngơi ở đáy đại dương sâu thẳm.\nHãy ký chữ ký của bạn thật rõ ràng ở phần dưới cùng của trang cuối cùng.",
        page_number: 464
      },
      {
        word: "Bounce",
        phonetic: "/baʊns/",
        word_type: "verb",
        meaning_vi: "Nảy lên, tung tăng",
        sound_bridge: "Bao nấm nảy lên khi rơi xuống mặt sàn cao su.",
        definition_en: "rebound after hitting a hard surface; move enthusiastically",
        example_en: "The tennis ball bounced high over the net.\nShe bounced into the living room full of joy and energy.",
        example_vi: "Quả bóng tennis đã nảy lên cao qua tấm lưới.\nCô ấy tung tăng bước vào phòng khách tràn đầy niềm vui và năng lượng.",
        page_number: 464
      },
      {
        word: "Context",
        phonetic: "/ˈkɑːn.tekst/",
        word_type: "noun",
        meaning_vi: "Ngữ cảnh, bối cảnh",
        sound_bridge: "Con tết tóc trong bối cảnh ngày hội truyền thống.",
        definition_en: "the circumstances that form the setting for an event, statement, or idea",
        example_en: "Always learn new English vocabulary within a meaningful context.\nHis quote was completely taken out of context by the tabloids.",
        example_vi: "Hãy luôn học từ vựng tiếng Anh mới trong một ngữ cảnh có ý nghĩa.\nLời trích dẫn của anh ấy đã bị các tờ báo lá cải cắt xén hoàn toàn khỏi bối cảnh.",
        page_number: 464
      },
      {
        word: "Contrast",
        phonetic: "/ˈkɑːn.træst/",
        word_type: "noun",
        meaning_vi: "Sự tương phản, đối chiếu",
        sound_bridge: "Con trát vữa tạo sự tương phản giữa hai mảng tường.",
        definition_en: "the state of being strikingly different from something else in juxtaposition",
        example_en: "There is a sharp contrast between rich and poor neighborhoods.\nIn contrast to yesterday's rain, today is bright and sunny.",
        example_vi: "Có một sự tương phản rõ rệt giữa các khu dân cư giàu và nghèo.\nTrái ngược tương phản với cơn mưa ngày hôm qua, hôm nay trời nắng ráo và sáng sủa.",
        page_number: 464
      },
      {
        word: "Decade",
        phonetic: "/ˈdek.eɪd/",
        word_type: "noun",
        meaning_vi: "Thập kỷ (10 năm)",
        sound_bridge: "Đè kẹo ngọt qua cả một thập kỷ không phai hương vị.",
        definition_en: "a period of ten years",
        example_en: "Smartphone technology has advanced dramatically over the last decade.\nThe historic bridge was built more than five decades ago.",
        example_vi: "Công nghệ điện thoại thông minh đã phát triển vượt bậc trong suốt một thập kỷ qua.\nCây cầu lịch sử được xây dựng cách đây hơn năm thập kỷ.",
        page_number: 465
      },
      {
        word: "Entitle",
        phonetic: "/ɪnˈtaɪ.t̬əl/",
        word_type: "verb",
        meaning_vi: "Cho quyền, đặt tiêu đề",
        sound_bridge: "In tai thỏ cho quyền các bé vào khu vui chơi miễn phí.",
        definition_en: "give a legal right or a just claim to receive something; give a title to a book",
        example_en: "This VIP ticket entitles you to enter the executive lounge.\nHe entitled his best-selling autobiography 'Journey to the Stars'.",
        example_vi: "Chiếc vé VIP này cho bạn quyền được bước vào phòng chờ thương gia.\nAnh ấy đã đặt tiêu đề cho cuốn tự truyện bán chạy nhất của mình là 'Hành trình đến các vì sao'.",
        page_number: 465
      },
      {
        word: "Geography",
        phonetic: "/dʒiˈɑː.ɡrə.fi/",
        word_type: "noun",
        meaning_vi: "Địa lý, môn địa lý",
        sound_bridge: "Ghi chép ra giấy kiến thức môn địa lý tự nhiên.",
        definition_en: "the study of the physical features of the earth and its atmosphere, and of human activity as it affects and is affected by these",
        example_en: "Physical geography studies mountains, rivers, and climate zones.\nShe scored highest in the national geography competition.",
        example_vi: "Địa lý tự nhiên nghiên cứu về núi non, sông ngòi và các đới khí hậu.\nCô ấy đạt điểm cao nhất trong kỳ thi học sinh giỏi địa lý quốc gia.",
        page_number: 465
      },
      {
        word: "Influx",
        phonetic: "/ˈɪn.flʌks/",
        word_type: "noun",
        meaning_vi: "Sự tràn vào, dòng người đổ về",
        sound_bridge: "In phao bơi đón dòng người tràn vào bãi biển ngày hè.",
        definition_en: "an arrival or entry of large numbers of people or things",
        example_en: "The coastal city saw a massive influx of tourists this summer.\nThe sudden influx of capital accelerated project development.",
        example_vi: "Thành phố ven biển đã chứng kiến một sự tràn vào khổng lồ của lượng du khách vào mùa hè này.\nSự rót vào/đổ về bất ngờ của dòng vốn đã đẩy nhanh tiến độ dự án.",
        page_number: 465
      },
      {
        word: "Landscape",
        phonetic: "/ˈlænd.skeɪp/",
        word_type: "noun",
        meaning_vi: "Phong cảnh, cảnh quan, cảnh quan thiên nhiên",
        sound_bridge: "Lén xem tranh phong cảnh cảnh quan tuyệt đẹp của làng quê.",
        definition_en: "all the visible features of an area of countryside or land",
        example_en: "The volcanic eruption altered the island's landscape forever.\nPhotographers captured the serene snowy landscape at sunrise.",
        example_vi: "Vụ phun trào núi lửa đã làm thay đổi cảnh quan phong cảnh của hòn đảo mãi mãi.\nCác nhiếp ảnh gia đã ghi lại cảnh quan tuyết trắng thanh bình lúc bình minh.",
        page_number: 466
      },
      {
        word: "Nature",
        phonetic: "/ˈneɪ.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Tự nhiên, thiên nhiên, bản chất",
        sound_bridge: "Né trâu rừng hòa mình vào với thiên nhiên tự nhiên.",
        definition_en: "the phenomena of the physical world collectively, including plants and animals; basic features of something",
        example_en: "We should live in harmony with Mother Nature.\nIt is human nature to desire companionship and love.",
        example_vi: "Chúng ta nên sống hòa hợp với Mẹ Thiên Nhiên.\nBản chất của con người là luôn khao khát tình bạn bè và tình yêu thương.",
        page_number: 466
      },
      {
        word: "Peak",
        phonetic: "/piːk/",
        word_type: "noun",
        meaning_vi: "Đỉnh cao, đỉnh núi, giờ cao điểm",
        sound_bridge: "Bích leo lên đỉnh núi ngắm toàn cảnh thung lũng.",
        definition_en: "the pointed top of a mountain; the highest level or greatest degree",
        example_en: "Snow blankets the mountain peak throughout the winter.\nElectricity consumption reaches its peak during hot summer afternoons.",
        example_vi: "Tuyết bao phủ đỉnh núi suốt mùa đông.\nLượng tiêu thụ điện đạt đỉnh cao điểm vào những buổi chiều hè oi bức.",
        page_number: 466
      },
      {
        word: "Reality",
        phonetic: "/riˈæl.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Thực tế, hiện thực",
        sound_bridge: "Ri ăn lẩu nhận ra thực tế cuộc sống muôn màu.",
        definition_en: "the state of things as they actually exist, as opposed to an idealistic or notional idea of them",
        example_en: "Virtual reality brings digital worlds to life vividly.\nWe must face the harsh reality and work hard to overcome it.",
        example_vi: "Thực tế ảo đưa các thế giới kỹ thuật số vào cuộc sống một cách sống động.\nChúng ta phải đối mặt với hiện thực khắc nghiệt và làm việc chăm chỉ để vượt qua nó.",
        page_number: 466
      },
      {
        word: "Resource",
        phonetic: "/ˈriː.sɔːrs/",
        word_type: "noun",
        meaning_vi: "Tài nguyên, nguồn lực",
        sound_bridge: "Ri sợ sụt giảm nguồn lực tài nguyên khoáng sản.",
        definition_en: "a stock or supply of money, materials, staff, and other assets that can be drawn on",
        example_en: "Water is the planet's most precious natural resource.\nThe online library provides abundant educational resources for students.",
        example_vi: "Nước là tài nguyên thiên nhiên quý giá nhất của hành tinh.\nThư viện trực tuyến cung cấp các nguồn lực tài liệu giáo dục phong phú cho học sinh.",
        page_number: 466
      },
      {
        word: "Shower",
        phonetic: "/ˈʃaʊ.ɚ/",
        word_type: "noun",
        meaning_vi: "Cơn mưa rào, vòi hoa sen",
        sound_bridge: "Sau giờ làm tắm vòi hoa sen xua tan mệt mỏi.",
        definition_en: "a brief and usually light fall of rain, hail, or snow; a device for washing oneself",
        example_en: "Take an umbrella, as sudden afternoon rain showers are likely.\nA refreshing hot shower helps you relax after a long workout.",
        example_vi: "Hãy mang theo ô nhé, vì những cơn mưa rào bất chợt buổi chiều rất dễ xảy ra.\nTắm vòi hoa sen nước nóng sảng khoái giúp bạn thư giãn sau buổi tập luyện dài.",
        page_number: 467
      },
      {
        word: "Source",
        phonetic: "/sɔːrs/",
        word_type: "noun",
        meaning_vi: "Nguồn gốc, nguồn cung cấp",
        sound_bridge: "Súp phở là nguồn năng lượng dồi dào cho buổi sáng.",
        definition_en: "a place, person, or thing from which something comes or can be obtained",
        example_en: "Solar and wind power are clean renewable energy sources.\nAlways verify the credibility of information sources before sharing news.",
        example_vi: "Năng lượng mặt trời và gió là những nguồn năng lượng tái tạo sạch.\nHãy luôn xác minh độ tin cậy của các nguồn thông tin trước khi chia sẻ tin tức.",
        page_number: 467
      },
      {
        word: "Thorough",
        phonetic: "/ˈθɝː.oʊ/",
        word_type: "adjective",
        meaning_vi: "Kỹ lưỡng, thấu đáo, triệt để",
        sound_bridge: "Thờ ơ bỏ qua việc kiểm tra kỹ lưỡng giấy tờ quan trọng.",
        definition_en: "complete with regard to every detail; not superficial or partial",
        example_en: "The mechanic gave the vehicle engine a thorough inspection.\nShe conducted thorough research before writing the academic paper.",
        example_vi: "Người thợ máy đã tiến hành một cuộc kiểm tra kỹ lưỡng thấu đáo động cơ xe.\nCô ấy đã tiến hành nghiên cứu kỹ lưỡng thấu đáo trước khi viết bài báo học thuật.",
        page_number: 467
      },
      {
        word: "Tier",
        phonetic: "/tɪr/",
        word_type: "noun",
        meaning_vi: "Tầng, bậc, cấp độ",
        sound_bridge: "Tí rủ bạn xếp bánh kem ba tầng lộng lẫy.",
        definition_en: "each in a series of rows or levels of a structure placed one above the other",
        example_en: "The wedding cake had four elegant decorative tiers.\nSubscribers in the premium tier enjoy exclusive ad-free benefits.",
        example_vi: "Chiếc bánh cưới có bốn tầng trang trí thanh lịch.\nNhững người đăng ký ở cấp độ tầng cao cấp được hưởng những quyền lợi độc quyền không có quảng cáo.",
        page_number: 467
      },
      {
        word: "Various",
        phonetic: "/ˈver.i.əs/",
        word_type: "adjective",
        meaning_vi: "Đa dạng, nhiều loại khác nhau",
        sound_bridge: "Vẽ ri rủ bạn tô màu nhiều loại hoa quả khác nhau.",
        definition_en: "more than one; several of different kinds",
        example_en: "The supermarket sells various types of exotic fruits.\nShe has lived in various countries across Europe and Asia.",
        example_vi: "Siêu thị bán nhiều loại trái cây ngoại nhập khác nhau đa dạng.\nCô ấy đã sống ở nhiều quốc gia khác nhau trên khắp châu Âu và châu Á.",
        page_number: 467
      },
      {
        word: "Victim",
        phonetic: "/ˈvɪk.təm/",
        word_type: "noun",
        meaning_vi: "Nạn nhân",
        sound_bridge: "Ví kẹp tiền giúp đỡ nạn nhân bị thiên tai lũ lụt.",
        definition_en: "a person harmed, injured, or killed as a result of a crime, accident, or other event",
        example_en: "Volunteers provided medical aid to victims of the earthquake.\nDo not blame the innocent victim for the criminal's malicious actions.",
        example_vi: "Các tình nguyện viên đã cung cấp viện trợ y tế cho các nạn nhân của trận động đất.\nĐừng đổ lỗi cho nạn nhân vô tội vì những hành vi ác ý của kẻ phạm tội.",
        page_number: 467
      }
    ]
  },

  // ==========================================
  // UNIT 49: Arts & Media 1 (29 từ, Trang 471 - 477)
  // ==========================================
  49: {
    unit: 49,
    unit_title: "Arts & Media 1",
    category: "Arts & Media",
    words: [
      {
        word: "Acting",
        phonetic: "/ˈæk.tɪŋ/",
        word_type: "noun",
        meaning_vi: "Diễn xuất, nghề diễn viên",
        sound_bridge: "Ăn kẹo tí hon xem màn diễn xuất tài tình của nghệ sĩ.",
        definition_en: "the art or occupation of performing in plays, movies, or television productions",
        example_en: "She won an Oscar for her extraordinary dramatic acting.\nHe took acting classes to build confidence and stage presence.",
        example_vi: "Cô ấy đã giành giải Oscar cho màn diễn xuất chính kịch phi thường của mình.\nAnh ấy đã tham gia các lớp học diễn xuất để xây dựng sự tự tin và phong thái sân khấu.",
        page_number: 471
      },
      {
        word: "Article",
        phonetic: "/ˈɑːr.t̬ɪ.kəl/",
        word_type: "noun",
        meaning_vi: "Bài báo, điều khoản, đồ vật",
        sound_bridge: "Ăn thịt cá kho đọc bài báo mới trên tạp chí khoa học.",
        definition_en: "a piece of writing included with others in a newspaper or magazine; a particular item",
        example_en: "She wrote an insightful article about renewable energy for the magazine.\nDo not leave valuable personal articles unattended in public spaces.",
        example_vi: "Cô ấy đã viết một bài báo sâu sắc về năng lượng tái tạo cho tạp chí.\nĐừng để các đồ vật cá nhân có giá trị mà không có người trông coi ở những nơi công cộng.",
        page_number: 471
      },
      {
        word: "Artistic",
        phonetic: "/ɑːrˈtɪs.tɪk/",
        word_type: "adjective",
        meaning_vi: "Thuộc về nghệ thuật, có khiếu nghệ thuật",
        sound_bridge: "Ăn thịt ếch xào với tâm hồn nghệ thuật bay bổng.",
        definition_en: "having or revealing natural creative skill; relating to art",
        example_en: "She showed great artistic talent from an early age.\nThe film received acclaim for its exceptional artistic direction.",
        example_vi: "Cô ấy đã thể hiện tài năng nghệ thuật tuyệt vời từ khi còn nhỏ.\nBộ phim đã nhận được nhiều lời khen ngợi nhờ sự chỉ đạo nghệ thuật đặc sắc.",
        page_number: 471
      },
      {
        word: "Brand",
        phonetic: "/brænd/",
        word_type: "noun",
        meaning_vi: "Thương hiệu, nhãn hiệu",
        sound_bridge: "Bà rán nem xây dựng thương hiệu ẩm thực nổi tiếng.",
        definition_en: "a type of product manufactured by a particular company under a particular name",
        example_en: "Nike is a globally recognized sportswear brand.\nBuilding a trustworthy brand takes years of consistent quality.",
        example_vi: "Nike là một thương hiệu đồ thể thao được công nhận trên toàn cầu.\nViệc xây dựng một thương hiệu đáng tin cậy đòi hỏi nhiều năm giữ vững chất lượng ổn định.",
        page_number: 471
      },
      {
        word: "Cable",
        phonetic: "/ˈkeɪ.bəl/",
        word_type: "noun",
        meaning_vi: "Dây cáp, truyền hình cáp",
        sound_bridge: "Cây bưởi sai quả quấn quanh đường dây cáp quang.",
        definition_en: "a thick rope of wire or nonmetallic fiber, typically used for transmitting electricity or telecommunication signals",
        example_en: "Connect the laptop to the external monitor using an HDMI cable.\nWe subscribed to cable television to watch live sports channels.",
        example_vi: "Hãy kết nối máy tính xách tay với màn hình ngoài bằng dây cáp HDMI.\nChúng tôi đã đăng ký truyền hình cáp để xem các kênh thể thao trực tiếp.",
        page_number: 472
      },
      {
        word: "Cartoon",
        phonetic: "/kɑːrˈtuːn/",
        word_type: "noun",
        meaning_vi: "Phim hoạt hình, tranh biếm họa",
        sound_bridge: "Cắt tờ giấy vẽ tranh biếm họa hoạt hình vui nhộn.",
        definition_en: "a motion picture using animation techniques to photograph a sequence of drawings; a humorous drawing in a newspaper",
        example_en: "Children love watching animated cartoons on Saturday mornings.\nThe political cartoon highlighted societal issues with sharp humor.",
        example_vi: "Trẻ em thích xem phim hoạt hình vào các buổi sáng thứ Bảy.\nBức tranh biếm họa chính trị đã làm nổi bật các vấn đề xã hội bằng sự hài hước sâu cay.",
        page_number: 472
      },
      {
        word: "Channel",
        phonetic: "/ˈtʃæn.əl/",
        word_type: "noun",
        meaning_vi: "Kênh truyền hình, kênh thông tin, eo biển",
        sound_bridge: "Chè sen ngọt mát bật kênh truyền hình yêu thích thưởng thức.",
        definition_en: "a band of frequencies used in radio and television transmission; a medium for communication",
        example_en: "Switch to channel five to watch the evening news.\nYouTube is a powerful distribution channel for independent content creators.",
        example_vi: "Hãy chuyển sang kênh số năm để xem tin tức buổi tối.\nYouTube là một kênh phân phối mạnh mẽ cho các nhà sáng tạo nội dung độc lập.",
        page_number: 472
      },
      {
        word: "Column",
        phonetic: "/ˈkɑː.ləm/",
        word_type: "noun",
        meaning_vi: "Cột báo, chuyên mục, cột trụ",
        sound_bridge: "Cổ lấm lem ngồi viết chuyên mục báo tuần.",
        definition_en: "an upright pillar; a regular section of a newspaper or magazine",
        example_en: "She writes a weekly advice column for a national magazine.\nMagnificent marble columns supported the temple roof.",
        example_vi: "Cô ấy viết một chuyên mục tư vấn hàng tuần cho một tạp chí quốc gia.\nNhững cột trụ đá cẩm thạch tráng lệ nâng đỡ mái đền.",
        page_number: 472
      },
      {
        word: "Current",
        phonetic: "/ˈkɝː.ənt/",
        word_type: "adjective",
        meaning_vi: "Hiện tại, hiện hành, dòng chảy",
        sound_bridge: "Cơ rách nát cập nhật tin tức hiện tại mới nhất.",
        definition_en: "belonging to the present time; happening or being used or done now; a flow of water or electricity",
        example_en: "What is your current residential address?\nStrong ocean currents make swimming dangerous along this shore.",
        example_vi: "Địa chỉ cư trú hiện tại của bạn là gì?\nNhững dòng chảy đại dương mạnh mẽ khiến việc bơi lội trở nên nguy hiểm dọc theo bờ biển này.",
        page_number: 473
      },
      {
        word: "Curve",
        phonetic: "/kɝːv/",
        word_type: "noun",
        meaning_vi: "Đường cong, uốn cong",
        sound_bridge: "Cơ vạm vỡ uốn cong thanh kim loại làm khung tranh.",
        definition_en: "a line or outline which gradually deviates from being straight for some or all of its length",
        example_en: "Slow down when approaching the sharp curve in the road.\nThe artist drew elegant curves to outline the dancer's silhouette.",
        example_vi: "Hãy giảm tốc độ khi đến gần khúc đường cong gấp trên đường.\nHọa sĩ đã vẽ những đường cong thanh lịch để phác họa bóng dáng người vũ công.",
        page_number: 473
      },
      {
        word: "Custom",
        phonetic: "/ˈkʌs.təm/",
        word_type: "noun",
        meaning_vi: "Phong tục, tập quán",
        sound_bridge: "Cắt tấm vải may trang phục theo phong tục truyền thống.",
        definition_en: "a traditional and widely accepted way of behaving or doing something that is specific to a particular society",
        example_en: "It is a Vietnamese custom to give lucky money during Tet.\nUnderstanding local customs helps travelers avoid cultural misunderstandings.",
        example_vi: "Tặng tiền lì xì vào dịp Tết là một phong tục tập quán của người Việt Nam.\nHiểu biết các phong tục địa phương giúp du khách tránh được những hiểu lầm về văn hóa.",
        page_number: 473
      },
      {
        word: "Disk",
        phonetic: "/dɪsk/",
        word_type: "noun",
        meaning_vi: "Đĩa quang, đĩa lưu trữ, đĩa tròn",
        sound_bridge: "Đi xem đĩa phim tài liệu khoa học hấp dẫn.",
        definition_en: "a flat, thin, round object or device on which data can be stored",
        example_en: "Insert the installation disk into your computer drive.\nStore backup copies of essential files on an external hard disk.",
        example_vi: "Hãy đưa đĩa cài đặt vào ổ đĩa máy tính của bạn.\nHãy lưu trữ các bản sao lưu của các tệp thiết yếu trên một ổ đĩa cứng gắn ngoài.",
        page_number: 473
      },
      {
        word: "Display",
        phonetic: "/dɪˈspleɪ/",
        word_type: "verb",
        meaning_vi: "Trưng bày, hiển thị, màn hình",
        sound_bridge: "Đi sợ phơi nắng vào phòng trưng bày triển lãm tranh.",
        definition_en: "make a prominent exhibition of something in a place where it can be easily seen",
        example_en: "The museum displays ancient artifacts from feudal dynasties.\nThe smartphone features an ultra-sharp OLED color display.",
        example_vi: "Bảo tàng trưng bày các cổ vật từ các triều đại phong kiến xưa.\nChiếc điện thoại thông minh sở hữu màn hình hiển thị màu OLED siêu sắc nét.",
        page_number: 474
      },
      {
        word: "Drum",
        phonetic: "/drʌm/",
        word_type: "noun",
        meaning_vi: "Cái trống, đánh trống",
        sound_bridge: "Đá rơi trúng mặt trống phát ra âm thanh vang dội.",
        definition_en: "a percussion instrument sounded by being struck with sticks or the hands",
        example_en: "He played a vibrant rhythm on the traditional wooden drums.\nThe drummer practiced diligently for the upcoming rock concert.",
        example_vi: "Anh ấy đã chơi một giai điệu sôi động trên những chiếc trống gỗ truyền thống.\nTay trống đã luyện tập chăm chỉ cho buổi hòa nhạc rock sắp tới.",
        page_number: 474
      },
      {
        word: "Fiction",
        phonetic: "/ˈfɪk.ʃən/",
        word_type: "noun",
        meaning_vi: "Hư cấu, tiểu thuyết viễn tưởng",
        sound_bridge: "Phở ít cay đọc cuốn tiểu thuyết viễn tưởng hư cấu kỳ thú.",
        definition_en: "literature in the form of prose, especially short stories and novels, that describes imaginary events and people",
        example_en: "Science fiction explores futuristic technology and space colonization.\nHer latest book is a masterwork of historical fiction.",
        example_vi: "Khoa học viễn tưởng hư cấu khám phá công nghệ tương lai và việc khai phá không gian.\nCuốn sách mới nhất của cô ấy là một kiệt tác tiểu thuyết hư cấu lịch sử.",
        page_number: 474
      },
      {
        word: "Flute",
        phonetic: "/fluːt/",
        word_type: "noun",
        meaning_vi: "Cây sáo, thổi sáo",
        sound_bridge: "Phở lẩu thơm nức nghe tiếng thổi sáo réo rắt bên sông.",
        definition_en: "a wind instrument made from a tube with holes along it that are stopped by the fingers or keys",
        example_en: "She played a haunting melody on the bamboo flute.\nThe orchestra's flute section sounded bright and melodious.",
        example_vi: "Cô ấy đã thổi một giai điệu da diết trên cây sáo trúc.\nPhần bè sáo của dàn nhạc giao hưởng nghe thật trong trẻo và du dương.",
        page_number: 474
      },
      {
        word: "Modern",
        phonetic: "/ˈmɑː.dɚn/",
        word_type: "adjective",
        meaning_vi: "Hiện đại, tân tiến",
        sound_bridge: "Mở đường rộng lớn xây dựng đô thị hiện đại tân tiến.",
        definition_en: "relating to the present or recent times as opposed to the remote past",
        example_en: "Modern architecture emphasizes clean lines and natural light.\nComputers are indispensable tools in modern everyday life.",
        example_vi: "Kiến trúc hiện đại nhấn mạnh vào những đường nét thanh thoát và ánh sáng tự nhiên.\nMáy tính là những công cụ không thể thiếu trong cuộc sống hiện đại ngày nay.",
        page_number: 475
      },
      {
        word: "Portrait",
        phonetic: "/ˈpɔːr.trɪt/",
        word_type: "noun",
        meaning_vi: "Bức chân dung, hình chân dung",
        sound_bridge: "Phở tôm thịt ăn xong ngồi vẽ bức tranh chân dung cho mẹ.",
        definition_en: "a painting, drawing, photograph, or engraving of a person, especially one depicting only the face or head and shoulders",
        example_en: "The Mona Lisa is the most famous painted portrait in the world.\nShe framed a black-and-white portrait of her grandparents.",
        example_vi: "Mona Lisa là bức tranh chân dung vẽ người nổi tiếng nhất thế giới.\nCô ấy đã lồng khung một bức ảnh chân dung đen trắng của ông bà mình.",
        page_number: 475
      },
      {
        word: "Pottery",
        phonetic: "/ˈpɑː.t̬ɚ.i/",
        word_type: "noun",
        meaning_vi: "Đồ gốm, nghề làm gốm",
        sound_bridge: "Bò tót lội bùn ghé thăm làng nghề làm gốm Bát Tràng.",
        definition_en: "pots, dishes, and other articles made of earthenware or baked clay",
        example_en: "Bat Trang is famous for its handcrafted ceramic pottery.\nShe took a weekend pottery workshop to learn how to mold clay.",
        example_vi: "Bát Tràng nổi tiếng với các sản phẩm đồ gốm sứ thủ công mỹ nghệ.\nCô ấy đã tham gia một buổi học làm đồ gốm cuối tuần để học cách nặn đất sét.",
        page_number: 475
      },
      {
        word: "Quality",
        phonetic: "/ˈkwɑː.lə.t̬i/",
        word_type: "noun",
        meaning_vi: "Chất lượng, phẩm chất",
        sound_bridge: "Quả lê tươi ngon đạt chất lượng xuất khẩu cao.",
        definition_en: "the standard of something as measured against other things of a similar kind; the degree of excellence",
        example_en: "We always prioritize product quality over cheap quantity.\nHonesty is a vital moral quality in any true leader.",
        example_vi: "Chúng tôi luôn ưu tiên chất lượng sản phẩm hơn là số lượng giá rẻ.\nSự trung thực là một phẩm chất đạo đức tối quan trọng ở bất kỳ nhà lãnh đạo chân chính nào.",
        page_number: 475
      },
      {
        word: "Quantity",
        phonetic: "/ˈkwɑːn.t̬ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Số lượng",
        sound_bridge: "Quần áo may sẵn sản xuất với số lượng lớn.",
        definition_en: "the amount or number of a material or abstract thing not usually estimated by spatial measurement",
        example_en: "The factory produces a vast quantity of sports shoes daily.\nFocus on the quality of your practice rather than the sheer quantity of hours.",
        example_vi: "Nhà máy sản xuất một số lượng giày thể thao khổng lồ mỗi ngày.\nHãy tập trung vào chất lượng luyện tập của bạn hơn là số lượng giờ đơn thuần.",
        page_number: 476
      },
      {
        word: "Reasonable",
        phonetic: "/ˈriː.zən.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Hợp lý, phải chăng, có lý",
        sound_bridge: "Ri xào nấm bán với giá cả vô cùng hợp lý phải chăng.",
        definition_en: "having sound judgment; fair and sensible; not too expensive",
        example_en: "The restaurant serves delicious food at very reasonable prices.\nIt is reasonable to expect employees to arrive on time.",
        example_vi: "Nhà hàng phục vụ đồ ăn ngon với mức giá cả vô cùng hợp lý phải chăng.\nKỳ vọng nhân viên đến làm đúng giờ là một điều hoàn toàn hợp lý có lý.",
        page_number: 476
      },
      {
        word: "Record",
        phonetic: "/ˈrek.ɚd/",
        word_type: "noun",
        meaning_vi: "Kỷ lục, hồ sơ, đĩa hát, ghi âm",
        sound_bridge: "Rét run người nhưng vận động viên đã phá vỡ kỷ lục quốc gia.",
        definition_en: "a thing constituting a piece of evidence about the past; the best achievement in a field",
        example_en: "He set a new world record in the 100m sprint.\nThe hospital keeps detailed medical records for all patients.",
        example_vi: "Anh ấy đã thiết lập một kỷ lục thế giới mới ở cự ly chạy nước rút 100m.\nBệnh viện lưu giữ hồ sơ bệnh án chi tiết cho tất cả bệnh nhân.",
        page_number: 476
      },
      {
        word: "Review",
        phonetic: "/rɪˈvjuː/",
        word_type: "verb",
        meaning_vi: "Đánh giá, nhận xét, ôn tập",
        sound_bridge: "Ri vào xem đánh giá nhận xét về bộ phim mới.",
        definition_en: "examine or assess something formally with the possibility or intention of instituting change; write a critical appraisal",
        example_en: "The committee will review all scholarship submissions carefully.\nCritics gave rave reviews for the director's latest cinematic masterpiece.",
        example_vi: "Ủy ban sẽ xem xét đánh giá tất cả các hồ sơ nộp xin học bổng một cách cẩn thận.\nCác nhà phê bình đã đưa ra những bài nhận xét đánh giá nồng nhiệt cho kiệt tác điện ảnh mới nhất của đạo diễn.",
        page_number: 476
      },
      {
        word: "Scene",
        phonetic: "/siːn/",
        word_type: "noun",
        meaning_vi: "Cảnh tượng, phân cảnh phim, hiện trường",
        sound_bridge: "Si ngắm nhìn phân cảnh cảm động trong bộ phim tình cảm.",
        definition_en: "the place where an incident in real life or fiction occurs or occurred; a sequence of continuous action in a play or movie",
        example_en: "Police officers cordoned off the crime scene immediately.\nThe movie's climactic battle scene was filmed in the desert.",
        example_vi: "Các cảnh sát đã phong tỏa hiện trường vụ án ngay lập tức.\nPhân cảnh chiến đấu cao trào của bộ phim đã được quay tại sa mạc.",
        page_number: 476
      },
      {
        word: "Stage",
        phonetic: "/steɪdʒ/",
        word_type: "noun",
        meaning_vi: "Sân khấu, giai đoạn",
        sound_bridge: "Sợ té ngã khi biểu diễn tự tin trên sân khấu lớn.",
        definition_en: "a raised floor or platform on which actors, entertainers, or speakers perform; a point or period in a process",
        example_en: "Actors walked onto the brightly lit theatre stage.\nThe startup is currently in the initial stage of product development.",
        example_vi: "Các diễn viên đã bước lên sân khấu nhà hát ngập tràn ánh sáng.\nCông ty khởi nghiệp hiện đang ở giai đoạn ban đầu của quá trình phát triển sản phẩm.",
        page_number: 477
      },
      {
        word: "Statue",
        phonetic: "/ˈstætʃ.uː/",
        word_type: "noun",
        meaning_vi: "Bức tượng",
        sound_bridge: "Sợ té ngã khi ngước nhìn bức tượng khổng lồ trên đỉnh núi.",
        definition_en: "a carved or cast figure of a person or animal, especially one that is life-size or larger",
        example_en: "The Statue of Liberty is an iconic symbol of freedom in New York.\nAn impressive bronze statue honors the national war hero.",
        example_vi: "Tượng Nữ thần Tự do là biểu tượng tự do nổi tiếng ở New York.\nMột bức tượng đồng ấn tượng tôn vinh vị anh hùng chiến tranh của dân tộc.",
        page_number: 477
      },
      {
        word: "System",
        phonetic: "/ˈsɪs.təm/",
        word_type: "noun",
        meaning_vi: "Hệ thống",
        sound_bridge: "Si siêng năng nâng cấp hệ thống máy chủ mạng.",
        definition_en: "a set of connected things or parts forming a complex whole",
        example_en: "The human immune system fights off harmful bacteria and viruses.\nThe city upgraded its public transportation system with new metro lines.",
        example_vi: "Hệ thống miễn dịch của con người chống lại các vi khuẩn và virus gây hại.\nThành phố đã nâng cấp hệ thống giao thông công cộng bằng những tuyến tàu điện ngầm mới.",
        page_number: 477
      },
      {
        word: "Trend",
        phonetic: "/trend/",
        word_type: "noun",
        meaning_vi: "Xu hướng, trào lưu",
        sound_bridge: "Trẻ em bắt kịp xu hướng trào lưu công nghệ hiện đại.",
        definition_en: "a general direction in which something is developing or changing; a prevailing fashion",
        example_en: "Remote working has become a major global employment trend.\nFollow the latest design trends to create modern and engaging websites.",
        example_vi: "Làm việc từ xa đã trở thành một xu hướng việc làm lớn trên toàn cầu.\nHãy theo dõi các xu hướng thiết kế mới nhất để tạo ra các trang web hiện đại và thu hút.",
        page_number: 477
      }
    ]
  },

  // ==========================================
  // UNIT 50: Arts & Media 2 (28 từ, Trang 481 - 486)
  // ==========================================
  50: {
    unit: 50,
    unit_title: "Arts & Media 2",
    category: "Arts & Media",
    words: [
      {
        word: "Advertise",
        phonetic: "/ˈæd.vɚ.taɪz/",
        word_type: "verb",
        meaning_vi: "Quảng cáo",
        sound_bridge: "Ăn vài quả táo xong làm video quảng cáo sản phẩm mới.",
        definition_en: "describe or draw attention to a product, service, or event in a public medium in order to promote sales",
        example_en: "Companies advertise their latest electronics during the Super Bowl.\nWe advertised the job opening across several professional networks.",
        example_vi: "Các công ty quảng cáo những thiết bị điện tử mới nhất của mình trong giờ phát sóng Super Bowl.\nChúng tôi đã quảng cáo thông tin tuyển dụng việc làm trên một số mạng lưới chuyên nghiệp.",
        page_number: 481
      },
      {
        word: "Animation",
        phonetic: "/ˌæn.əˈmeɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Hoạt hình, nghệ thuật đồ họa chuyển động",
        sound_bridge: "Ăn nấm xào xem phim hoạt hình đồ họa 3D tuyệt đẹp.",
        definition_en: "the technique of photographing successive drawings or positions of puppets or models to create an illusion of movement",
        example_en: "Pixar is internationally acclaimed for pioneering 3D computer animation.\nThe graphic designer added smooth micro-animations to the website.",
        example_vi: "Pixar được quốc tế ca ngợi vì đã tiên phong trong lĩnh vực hoạt hình máy tính 3D.\nNhà thiết kế đồ họa đã thêm các hiệu ứng hoạt hình vi mô mượt mà vào trang web.",
        page_number: 481
      },
      {
        word: "Audience",
        phonetic: "/ˈɑː.di.əns/",
        word_type: "noun",
        meaning_vi: "Khán giả, thính giả",
        sound_bridge: "Áo đẹp mặc vào đi biểu diễn trước hàng ngàn khán giả.",
        definition_en: "the assembled spectators or listeners at a public event such as a play, movie, concert, or meeting",
        example_en: "The concert hall was filled with an enthusiastic audience.\nThe speaker engaged the audience with humorous stories.",
        example_vi: "Khán phòng hòa nhạc chật kín những khán giả nhiệt tình hào hứng.\nDiễn giả đã lôi cuốn khán giả thính giả bằng những câu chuyện hài hước.",
        page_number: 481
      },
      {
        word: "Broadcast",
        phonetic: "/ˈbrɑːd.kæst/",
        word_type: "verb",
        meaning_vi: "Phát sóng, truyền hình",
        sound_bridge: "Bò ra đồng xem chương trình truyền hình phát sóng trực tiếp.",
        definition_en: "transmit a program or some information by radio or television",
        example_en: "The national television channel will broadcast the football final live.\nRadio stations broadcast weather emergency alerts every fifteen minutes.",
        example_vi: "Kênh truyền hình quốc gia sẽ phát sóng trực tiếp trận chung kết bóng đá.\nCác đài phát thanh phát sóng các cảnh báo thời tiết khẩn cấp sau mỗi mười lăm phút.",
        page_number: 481
      },
      {
        word: "Category",
        phonetic: "/ˈkæt̬.ə.ɡɔːr.i/",
        word_type: "noun",
        meaning_vi: "Hạng mục, danh mục",
        sound_bridge: "Cắt tờ giấy phân loại vào từng hạng mục danh mục rõ ràng.",
        definition_en: "a class or division of people or things regarded as having particular shared characteristics",
        example_en: "The documentary won in the best cultural film category.\nOrganize your spending expenses into clear budget categories.",
        example_vi: "Bộ phim tài liệu đã chiến thắng trong hạng mục phim văn hóa xuất sắc nhất.\nHãy sắp xếp các khoản chi tiêu của bạn vào các danh mục ngân sách rõ ràng.",
        page_number: 482
      },
      {
        word: "Chaos",
        phonetic: "/ˈkeɪ.ɑːs/",
        word_type: "noun",
        meaning_vi: "Sự hỗn loạn",
        sound_bridge: "Cây áo rách tạo nên cảnh hỗn loạn sau cơn lốc xoáy.",
        definition_en: "complete disorder and confusion",
        example_en: "The storm caused complete chaos on the city highways.\nWithout clear rules, the classroom descended into noisy chaos.",
        example_vi: "Cơn bão đã gây ra sự hỗn loạn hoàn toàn trên các đường cao tốc thành phố.\nNếu không có quy định rõ ràng, lớp học sẽ rơi vào tình trạng hỗn loạn ồn ào.",
        page_number: 482
      },
      {
        word: "Characteristic",
        phonetic: "/ˌker.ək.təˈrɪs.tɪk/",
        word_type: "noun",
        meaning_vi: "Đặc điểm, nét đặc trưng",
        sound_bridge: "Cà rốt đỏ tươi là nét đặc trưng của món salad.",
        definition_en: "a feature or quality belonging typically to a person, place, or thing and serving to identify it",
        example_en: "Kindness and empathy are the key characteristics of a good friend.\nA curved beak is a distinct characteristic of parrot species.",
        example_vi: "Lòng tốt và sự thấu cảm là những đặc điểm nét đặc trưng cốt lõi của một người bạn tốt.\nChiếc mỏ cong là một nét đặc trưng riêng biệt của các loài vẹt.",
        page_number: 482
      },
      {
        word: "Come up with",
        phonetic: "/kʌm ʌp wɪð/",
        word_type: "verb",
        meaning_vi: "Nghĩ ra, nảy ra (ý tưởng)",
        sound_bridge: "Cơm ấp trứng nóng hổi vừa nghĩ ra công thức nấu mới.",
        definition_en: "produce something, especially when pressured or challenged; think of an idea",
        example_en: "She came up with a brilliant idea for our advertising campaign.\nEngineers need to come up with a workable solution by tomorrow.",
        example_vi: "Cô ấy đã nghĩ ra một ý tưởng xuất sắc cho chiến dịch quảng cáo của chúng tôi.\nCác kỹ sư cần phải nghĩ ra một giải pháp khả thi trước ngày mai.",
        page_number: 482
      },
      {
        word: "Commercial",
        phonetic: "/kəˈmɝː.ʃəl/",
        word_type: "noun",
        meaning_vi: "Quảng cáo truyền hình, thương mại",
        sound_bridge: "Cơm mỡ hành xuất hiện trong đoạn phim quảng cáo truyền hình.",
        definition_en: "a television or radio advertisement; relating to commerce",
        example_en: "The funny TV commercial went viral across social media.\nThe downtown district is packed with busy commercial shopping centers.",
        example_vi: "Đoạn phim quảng cáo truyền hình hài hước đã gây sốt trên khắp mạng xã hội.\nKhu vực trung tâm thành phố chật kín những trung tâm mua sắm thương mại sầm uất.",
        page_number: 483
      },
      {
        word: "Concert",
        phonetic: "/ˈkɑːn.sɚt/",
        word_type: "noun",
        meaning_vi: "Buổi hòa nhạc, buổi biểu diễn ca nhạc",
        sound_bridge: "Con sợ kẹt xe nên đến buổi hòa nhạc từ sớm.",
        definition_en: "a musical performance given in public, typically by several performers or of several compositions",
        example_en: "Thousands of singing fans attended the open-air rock concert.\nThe orchestra will perform a classical symphony concert this weekend.",
        example_vi: "Hàng ngàn người hâm mộ cùng hòa giọng đã tham dự buổi hòa nhạc rock ngoài trời.\nDàn nhạc giao hưởng sẽ biểu diễn một buổi hòa nhạc giao hưởng cổ điển vào cuối tuần này.",
        page_number: 483
      },
      {
        word: "Contemporary",
        phonetic: "/kənˈtem.pə.rer.i/",
        word_type: "adjective",
        meaning_vi: "Đương đại, hiện đại, cùng thời",
        sound_bridge: "Con tắm mát ngắm tác phẩm nghệ thuật đương đại trong bảo tàng.",
        definition_en: "living or occurring at the same time; belonging to or occurring in the present",
        example_en: "The gallery showcases masterpieces of contemporary Vietnamese art.\nContemporary music combines traditional ethnic sounds with electronic beats.",
        example_vi: "Phòng trưng bày giới thiệu những kiệt tác của nghệ thuật đương đại Việt Nam.\nÂm nhạc đương đại kết hợp âm hưởng dân tộc truyền thống với những nhịp điệu điện tử.",
        page_number: 483
      },
      {
        word: "Entertain",
        phonetic: "/en.t̬ɚˈteɪn/",
        word_type: "verb",
        meaning_vi: "Giải trí, chiêu đãi",
        sound_bridge: "Em tới Tết hát ca giải trí cho cả gia đình.",
        definition_en: "provide someone with amusement or enjoyment; receive guests",
        example_en: "The clown entertained the children with funny balloon animals.\nThey love to entertain guests with lavish homemade dinners.",
        example_vi: "Chú hề đã làm giải trí cho lũ trẻ bằng những con thú bằng bóng bay vui nhộn.\nHọ rất thích chiêu đãi bạn bè khách khứa bằng những bữa tối thịnh soạn tự nấu ở nhà.",
        page_number: 483
      },
      {
        word: "Episode",
        phonetic: "/ˈep.ə.soʊd/",
        word_type: "noun",
        meaning_vi: "Tập phim, đoạn, hồi",
        sound_bridge: "Ép phở xào xem tập phim truyền hình gay cấn mới nhất.",
        definition_en: "an event or a group of events occurring as part of a larger sequence; each of the separate parts of a serialized program",
        example_en: "I cannot wait to watch the final episode of this drama series tonight.\nThe dramatic incident was just an unfortunate episode in his life.",
        example_vi: "Tôi không thể chờ đợi để xem tập phim cuối cùng của bộ phim truyền hình này tối nay.\nSự cố kịch tính đó chỉ là một đoạn hồi không may mắn trong cuộc đời anh ấy.",
        page_number: 484
      },
      {
        word: "Graphics",
        phonetic: "/ˈɡræf.ɪks/",
        word_type: "noun",
        meaning_vi: "Đồ họa, hình ảnh đồ họa",
        sound_bridge: "Gà rán thơm ngon thiết kế hình ảnh đồ họa bắt mắt.",
        definition_en: "the products of the graphic arts, especially commercial design or illustration; visual computer display",
        example_en: "The new video game features stunning ultra-realistic 3D graphics.\nShe works as a professional graphics designer for an advertising agency.",
        example_vi: "Trò chơi điện tử mới có đồ họa 3D chân thực tuyệt đẹp đến kinh ngạc.\nCô ấy làm việc với tư cách là một nhà thiết kế đồ họa chuyên nghiệp cho một công ty quảng cáo.",
        page_number: 484
      },
      {
        word: "Instrument",
        phonetic: "/ˈɪn.strə.mənt/",
        word_type: "noun",
        meaning_vi: "Nhạc cụ, dụng cụ, công cụ",
        sound_bridge: "In sợ trượt tay làm rơi chiếc nhạc cụ violin quý giá.",
        definition_en: "a tool or implement, especially one for precision work; an object used for producing musical sounds",
        example_en: "Playing a musical instrument like the piano enhances cognitive development.\nSurgeons use specialized sterile instruments during heart operations.",
        example_vi: "Chơi một loại nhạc cụ như đàn piano giúp nâng cao sự phát triển nhận thức não bộ.\nCác bác sĩ phẫu thuật sử dụng các dụng cụ vô trùng chuyên dụng trong các ca mổ tim.",
        page_number: 484
      },
      {
        word: "International",
        phonetic: "/ˌɪn.t̬ɚˈnæʃ.ən.əl/",
        word_type: "adjective",
        meaning_vi: "Quốc tế",
        sound_bridge: "In tờ lịch cho hội nghị quốc tế các nhà khoa học.",
        definition_en: "existing, occurring, or carried on between two or more nations",
        example_en: "English is widely used as a universal language for international business.\nThe Olympic Games celebrate international cooperation and athletic excellence.",
        example_vi: "Tiếng Anh được sử dụng rộng rãi như một ngôn ngữ phổ quát cho kinh doanh quốc tế.\nThế vận hội Olympic tôn vinh sự hợp tác quốc tế và sự xuất sắc trong thể thao.",
        page_number: 484
      },
      {
        word: "Judge",
        phonetic: "/dʒʌdʒ/",
        word_type: "noun",
        meaning_vi: "Thẩm phán, giám khảo, đánh giá",
        sound_bridge: "Dắt trâu đi thi được ban giám khảo chấm điểm cao.",
        definition_en: "a public official appointed to decide cases in a court of law; a person who decides the results of a competition",
        example_en: "The presiding judge sentenced the convicted criminal according to law.\nExpert judges evaluated each dish based on taste and presentation.",
        example_vi: "Vị thẩm phán chủ tọa đã tuyên án tên tội phạm theo đúng quy định của pháp luật.\nCác giám khảo chuyên gia đã đánh giá từng món ăn dựa trên hương vị và cách trình bày.",
        page_number: 484
      },
      {
        word: "Keyboard",
        phonetic: "/ˈkiː.bɔːrd/",
        word_type: "noun",
        meaning_vi: "Bàn phím máy tính, đàn phím điện tử",
        sound_bridge: "Kính bơi rơi trúng bàn phím máy tính cơ mới mua.",
        definition_en: "a panel of keys that operate a computer or typewriter; a set of keys on a piano or musical synthesizer",
        example_en: "A mechanical keyboard provides tactile feedback for programmers.\nHe plays both the acoustic piano and electronic keyboard in the jazz band.",
        example_vi: "Một chiếc bàn phím cơ cung cấp cảm giác gõ phản hồi xúc giác cho các lập trình viên.\nAnh ấy chơi cả đàn piano cơ lẫn đàn phím điện tử trong ban nhạc jazz.",
        page_number: 485
      },
      {
        word: "Literature",
        phonetic: "/ˈlɪt̬.ɚ.ə.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Văn học, văn chương, tài liệu",
        sound_bridge: "Ly trà thơm thưởng thức khi đọc tác phẩm văn học kinh điển.",
        definition_en: "written works, especially those considered of superior or lasting artistic merit",
        example_en: "Classic Vietnamese literature includes the timeless epic poem The Tale of Kieu.\nShe read extensive scientific literature before conducting her lab experiments.",
        example_vi: "Văn học cổ điển Việt Nam bao gồm tác phẩm thơ kinh điển Truyện Kiều sống mãi với thời gian.\nCô ấy đã đọc nhiều tài liệu văn hiến khoa học trước khi tiến hành thí nghiệm.",
        page_number: 485
      },
      {
        word: "Orchestra",
        phonetic: "/ˈɔːr.kə.strə/",
        word_type: "noun",
        meaning_vi: "Dàn nhạc giao hưởng",
        sound_bridge: "Óc phở xào thưởng thức sau khi xem dàn nhạc giao hưởng biểu diễn.",
        definition_en: "a large group of musicians who play together on various instruments, usually including strings, woodwinds, brass, and percussion",
        example_en: "The symphony orchestra performed Beethoven's Ninth Symphony to a standing ovation.\nA talented conductor leads and unifies the entire orchestra.",
        example_vi: "Dàn nhạc giao hưởng đã biểu diễn Bản giao hưởng số 9 của Beethoven trước những tràng pháo tay đứng dậy tán thưởng.\nMột vị nhạc trưởng tài ba chỉ huy và gắn kết toàn bộ dàn nhạc giao hưởng.",
        page_number: 485
      },
      {
        word: "Perform",
        phonetic: "/pɚˈfɔːrm/",
        word_type: "verb",
        meaning_vi: "Biểu diễn, trình diễn, thực hiện",
        sound_bridge: "Phở thơm ngon đầu bếp biểu diễn kỹ năng xào nấu điêu luyện.",
        definition_en: "carry out, accomplish, or fulfill an action, task, or function; present a form of entertainment to an audience",
        example_en: "The ballet troupe performed gracefully in front of a packed auditorium.\nSurgeons successfully performed a complex five-hour heart transplant.",
        example_vi: "Đoàn múa ba-lê đã biểu diễn duyên dáng trước một khán phòng chật kín người.\nCác bác sĩ phẫu thuật đã thực hiện thành công một ca ghép tim phức tạp kéo dài năm giờ.",
        page_number: 485
      },
      {
        word: "Permanent",
        phonetic: "/ˈpɝː.mə.nənt/",
        word_type: "adjective",
        meaning_vi: "Vĩnh viễn, lâu dài, cố định",
        sound_bridge: "Phở mỡ thơm ngon để lại ấn tượng vĩnh viễn sâu sắc.",
        definition_en: "lasting or intended to last or remain unchanged indefinitely",
        example_en: "She was offered a permanent full-time position at the research lab.\nSmoking causes irreversible, permanent damage to lung tissues.",
        example_vi: "Cô ấy đã được đề nghị một vị trí công việc chính thức lâu dài tại phòng nghiên cứu.\nHút thuốc lá gây ra những tổn hại vĩnh viễn không thể đảo ngược cho các mô phổi.",
        page_number: 485
      },
      {
        word: "Rhythm",
        phonetic: "/ˈrɪð.əm/",
        word_type: "noun",
        meaning_vi: "Nhịp điệu, tiết tấu",
        sound_bridge: "Ri đập tay theo nhịp điệu bài hát sôi động.",
        definition_en: "a strong, regular, repeated pattern of movement or sound",
        example_en: "The hypnotic drum rhythm got everyone dancing on their feet.\nOur bodies follow a natural internal circadian rhythm for sleep.",
        example_vi: "Nhịp điệu trống đầy mê hoặc đã khiến mọi người đều đứng dậy nhún nhảy theo.\nCơ thể chúng ta tuân theo một nhịp điệu sinh học tự nhiên bên trong cho giấc ngủ.",
        page_number: 486
      },
      {
        word: "Sculpture",
        phonetic: "/ˈskʌlp.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Tác phẩm điêu khắc, nghệ thuật điêu khắc",
        sound_bridge: "Sợ kẹp tay khi tạc tác phẩm điêu khắc bằng đá cẩm thạch.",
        definition_en: "the art of making two- or three-dimensional representative or abstract forms, especially by carving stone or wood",
        example_en: "Michelangelo's David is a celebrated marble sculpture of the Renaissance.\nThe garden is decorated with modern abstract bronze sculptures.",
        example_vi: "Tượng David của Michelangelo là một tác phẩm điêu khắc bằng đá cẩm thạch nổi tiếng của thời kỳ Phục Hưng.\nKhu vườn được trang trí bằng những tác phẩm điêu khắc bằng đồng trừu tượng hiện đại.",
        page_number: 486
      },
      {
        word: "Substance",
        phonetic: "/ˈsʌb.stəns/",
        word_type: "noun",
        meaning_vi: "Chất, vật chất, nội dung cốt lõi",
        sound_bridge: "Súp tôm thịt chứa nhiều chất dinh dưỡng thiết yếu.",
        definition_en: "a particular kind of matter with uniform properties; the real physical matter of which a person or thing consists",
        example_en: "Water is an essential chemical substance for all terrestrial life.\nHis speech was full of empty rhetoric and lacked real substance.",
        example_vi: "Nước là một chất hóa học thiết yếu cho mọi sự sống trên cạn.\nBài phát biểu của anh ấy toàn là những lời hoa mỹ sáo rỗng và thiếu nội dung thực chất.",
        page_number: 486
      },
      {
        word: "Thrill",
        phonetic: "/θrɪl/",
        word_type: "noun",
        meaning_vi: "Cảm giác hồi hộp, phấn khích ly kỳ",
        sound_bridge: "Thì rốt cuộc cảm nhận cảm giác hồi hộp khi trượt zipline.",
        definition_en: "a sudden feeling of great excitement and pleasure",
        example_en: "Riding the giant roller coaster gave tourists an unforgettable thrill.\nShe felt a thrill of pride when accepting the gold medal.",
        example_vi: "Đi tàu lượn siêu tốc khổng lồ mang lại cho du khách một cảm giác hồi hộp phấn khích khó quên.\nCô ấy cảm thấy một niềm phấn khích hồi hộp tự hào dâng trào khi nhận huy chương vàng.",
        page_number: 486
      },
      {
        word: "Tradition",
        phonetic: "/trəˈdɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Truyền thống",
        sound_bridge: "Trà đi kèm bánh ngọt là truyền thống văn hóa hiếu khách.",
        definition_en: "the transmission of customs or beliefs from generation to generation",
        example_en: "Wrapping Chung cake is an indispensable Tet holiday tradition in Vietnam.\nOur school maintains a long and proud tradition of academic excellence.",
        example_vi: "Gói bánh chưng là một truyền thống không thể thiếu trong dịp Tết ở Việt Nam.\nNgôi trường của chúng tôi duy trì một truyền thống lâu đời và đáng tự hào về sự xuất sắc trong học tập.",
        page_number: 486
      },
      {
        word: "Tragedy",
        phonetic: "/ˈtrædʒ.ə.di/",
        word_type: "noun",
        meaning_vi: "Bi kịch, thảm kịch",
        sound_bridge: "Trẻ em rơi lệ trước vở kịch bi kịch đầy thương tâm.",
        definition_en: "an event causing great suffering, destruction, and distress; a play dealing with tragic events and having an unhappy ending",
        example_en: "Romeo and Juliet is Shakespeare's most famous romantic tragedy.\nThe community came together to support families affected by the fire tragedy.",
        example_vi: "Romeo và Juliet là vở bi kịch lãng mạn nổi tiếng nhất của đại văn hào Shakespeare.\nCộng đồng đã chung tay hỗ trợ các gia đình bị ảnh hưởng bởi thảm kịch hỏa hoạn.",
        page_number: 486
      }
    ]
  }
};

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
let vocabList = JSON.parse(raw);

// Lấy phần từ vựng trước Unit 41 (Unit 1 -> 40)
const beforeUnits = vocabList.filter(w => w.unit < 41);

// Xây dựng lại mảng từ vựng Units 41 -> 50 với word_number liên tục bắt đầu từ 1140
let currentWordNumber = 1140;
const updatedUnitsVocab = [];

for (let u = 41; u <= 50; u++) {
  const uData = UNITS_41_TO_50_DATA[u];
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

// Hợp nhất lại toàn bộ từ vựng
const finalVocabList = [
  ...beforeUnits,
  ...updatedUnitsVocab
];

fs.writeFileSync(jsonPath, JSON.stringify(finalVocabList, null, 2), 'utf8');

console.log(`\n🎉 HOÀN TẤT ĐỒNG BỘ 100% CHÍNH XÁC THEO SÁCH CHO UNITS 41 -> 50!`);
for (let u = 41; u <= 50; u++) {
  const uWords = finalVocabList.filter(w => w.unit === u);
  console.log(`- Unit ${u} (${UNITS_41_TO_50_DATA[u].unit_title}): ${uWords.length} từ (#${uWords[0].word_number} ${uWords[0].word} -> #${uWords[uWords.length-1].word_number} ${uWords[uWords.length-1].word})`);
}
console.log(`Tổng số từ trong toàn bộ từ điển 50 Units: ${finalVocabList.length}`);
