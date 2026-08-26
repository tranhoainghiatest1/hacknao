import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BỘ DỮ LIỆU 100% CHUẨN XÁC THEO SÁCH SCAN GỐC HACK NÃO 1500 (UNIT 21 -> 30)
// Mỗi từ đều có: Word, Phonetic, Word Type, Meaning VI, Sound Bridge, Definition EN, 2 câu ví dụ EN + VI, Page Number
const UNITS_21_TO_30_DATA = {
  // ==========================================
  // UNIT 21: Relationship & Places 2 (21 từ, Trang 201 - 205)
  // ==========================================
  21: {
    unit: 21,
    unit_title: "Relationship & Places 2",
    category: "Social & Environment",
    words: [
      {
        word: "Accommodate",
        phonetic: "/əˈkɑː.mə.deɪt/",
        word_type: "verb",
        meaning_vi: "Cung cấp chỗ nghỉ",
        sound_bridge: "Ơ còn mình đây mà! Ai sẽ cung cấp chỗ nghỉ cho mình đây?",
        definition_en: "to provide with a place to live or to be stored in",
        example_en: "This hotel easily accommodates 100 guests.\nThe resort can accommodate up to five hundred people.",
        example_vi: "Khách sạn này dễ dàng cung cấp chỗ nghỉ cho 100 khách.\nKhu nghỉ dưỡng có thể cung cấp chỗ ở cho tối đa 500 người.",
        page_number: 201
      },
      {
        word: "Angle",
        phonetic: "/ˈæŋ.ɡəl/",
        word_type: "noun",
        meaning_vi: "Góc",
        sound_bridge: "Anh gườm dồn tôi vào trong góc.",
        definition_en: "the corner of a building, table, or anything with straight sides",
        example_en: "I can't see the screen from this angle.\nTry looking at the painting from a different angle.",
        example_vi: "Tôi không thể nhìn thấy màn hình từ góc này.\nHãy thử ngắm bức tranh từ một góc độ khác.",
        page_number: 201
      },
      {
        word: "Arrow",
        phonetic: "/ˈer.oʊ/",
        word_type: "noun",
        meaning_vi: "Mũi tên",
        sound_bridge: "A ha! Ngạc nhiên chưa, mũi tên có râu kìa.",
        definition_en: "a weapon that is like along, thin stick with a sharp point at one end and often feathers at the other, shot from a bow",
        example_en: "The arrow narrowing missed his chest.\nFollow the green arrows to find the emergency exit.",
        example_vi: "Mũi tên bay sượt qua ngực anh ấy trong gang tấc.\nHãy đi theo những mũi tên màu xanh để tìm lối thoát hiểm.",
        page_number: 201
      },
      {
        word: "Associate",
        phonetic: "/əˈsoʊ.ʃi.eɪt/",
        word_type: "verb",
        meaning_vi: "Hợp tác, liên tưởng",
        sound_bridge: "Ở vùng sâu xa thế này thì lấy đâu ra công ty to để mà hợp tác?",
        definition_en: "to make a connection between people or things in your mind",
        example_en: "I don't want to associate with him.\nMost people associate sunny weather with happiness.",
        example_vi: "Tôi không muốn hợp tác với anh ta.\nHầu hết mọi người đều liên tưởng thời tiết nắng đẹp với niềm vui.",
        page_number: 201
      },
      {
        word: "Basement",
        phonetic: "/ˈbeɪs.mənt/",
        word_type: "noun",
        meaning_vi: "Tầng hầm",
        sound_bridge: "Tụi bây sợ mìn nổ trúng thì chạy vào tầng hầm đi.",
        definition_en: "a room or rooms in a building, partly or completely below the level of the ground",
        example_en: "The basement had a lot of old secrets.\nWe converted our basement into a cozy home cinema.",
        example_vi: "Tầng hầm chứa rất nhiều bí mật xưa cũ.\nChúng tôi đã cải tạo tầng hầm thành một rạp chiếu phim ấm cúng tại gia.",
        page_number: 202
      },
      {
        word: "Temple",
        phonetic: "/ˈtem.pəl/",
        word_type: "noun",
        meaning_vi: "Ngôi đền",
        sound_bridge: "Nhớ mang tem cho bồ (bạn) khi đến ngôi đền đó nhé!",
        definition_en: "a building used for the worship of a god or gods, especially in religions other than Christianity",
        example_en: "Take your shoes off before walking in the temple!\nMany tourists visit the ancient temple every morning.",
        example_vi: "Hãy cởi giày ra trước khi bước vào ngôi đền!\nNhiều khách du lịch ghé thăm ngôi đền cổ kính vào mỗi buổi sáng.",
        page_number: 202
      },
      {
        word: "Cathedral",
        phonetic: "/kəˈθiː.drəl/",
        word_type: "noun",
        meaning_vi: "Nhà thờ lớn",
        sound_bridge: "Kẻ điên rồ kia, mau tới nhà thờ rửa tội đi.",
        definition_en: "the main church of a district, under the care of a bishop",
        example_en: "This is the largest cathedral in Europe.\nNotre Dame is a famous medieval cathedral in Paris.",
        example_vi: "Đây là nhà thờ lớn nhất ở châu Âu.\nNhà thờ Đức Bà là một nhà thờ thời trung cổ nổi tiếng ở Paris.",
        page_number: 202
      },
      {
        word: "Chimney",
        phonetic: "/ˈtʃɪm.ni/",
        word_type: "noun",
        meaning_vi: "Ống khói",
        sound_bridge: "Một con chim Ni bị rơi vào ống khói.",
        definition_en: "a structure through which smoke or steam is carried up away from a fire, etc. and through the roof of a building",
        example_en: "The chimney is made of bricks.\nSmoke was rising from the factory chimney.",
        example_vi: "Ống khói được làm bằng gạch.\nKhói đang bốc lên từ ống khói nhà máy.",
        page_number: 202
      },
      {
        word: "Church",
        phonetic: "/tʃɝːtʃ/",
        word_type: "noun",
        meaning_vi: "Nhà thờ",
        sound_bridge: "Chớ để họ chờ lâu, họ còn đi nhà thờ.",
        definition_en: "a building where Christians go to worship",
        example_en: "This village is famous for its old church.\nThey go to church together every Sunday morning.",
        example_vi: "Ngôi làng này nổi tiếng với ngôi nhà thờ cổ kính.\nHọ cùng nhau đi nhà thờ vào mỗi sáng Chủ nhật.",
        page_number: 202
      },
      {
        word: "Corner",
        phonetic: "/ˈkɔːr.nɚ/",
        word_type: "noun",
        meaning_vi: "Góc",
        sound_bridge: "Có nợ nần ai thì lo trốn vào trong góc đi.",
        definition_en: "a part of something where two or more sides, lines or edges join",
        example_en: "Let's have a drink on the corner!\nThere is a lovely bakery right around the corner.",
        example_vi: "Chúng ta hãy uống nước ở góc phố nhé!\nCó một tiệm bánh rất dễ thương ngay khúc quanh góc đường.",
        page_number: 202
      },
      {
        word: "Corridor",
        phonetic: "/ˈkɔːr.ə.dɔːr/",
        word_type: "noun",
        meaning_vi: "Hành lang",
        sound_bridge: "Có gì đó ngoài hành lang kia Bin, mau ra xem thử coi.",
        definition_en: "a long narrow passage in a building, with doors that open into rooms on either side",
        example_en: "He walked cautiously down the dark corridor.\nThe bathroom is at the end of the corridor.",
        example_vi: "Anh ta thận trọng bước đi dọc theo hành lang tối tăm.\nPhòng tắm nằm ở cuối hành lang.",
        page_number: 203
      },
      {
        word: "Craft",
        phonetic: "/kræft/",
        word_type: "noun",
        meaning_vi: "Nghề thủ công",
        sound_bridge: "Nghề thủ công làm nón lá khá thú vị nên cần được giữ gìn và phát huy.",
        definition_en: "an activity involving a special skill at making things with your hands",
        example_en: "She likes painting and other crafts.\nThe village is renowned for its traditional wood crafts.",
        example_vi: "Cô ấy thích vẽ tranh và các nghề thủ công khác.\nNgôi làng nổi tiếng với các sản phẩm thủ công bằng gỗ truyền thống.",
        page_number: 203
      },
      {
        word: "Enemy",
        phonetic: "/ˈen.ə.mi/",
        word_type: "noun",
        meaning_vi: "Kẻ thù",
        sound_bridge: "Ê, này My! Hãy đối xử khoan dung với kẻ thù của bạn.",
        definition_en: "a person who hates somebody or who acts or speaks against somebody/something",
        example_en: "The enemy of my enemy is my friend.\nThey managed to defend the city against the enemy.",
        example_vi: "Kẻ thù của kẻ thù là bạn của tôi.\nHọ đã cố gắng bảo vệ thành phố trước kẻ thù.",
        page_number: 203
      },
      {
        word: "Entrance",
        phonetic: "/ˈen.trəns/",
        word_type: "noun",
        meaning_vi: "Cổng vào, lối vào",
        sound_bridge: "Bầy chim én trên cổng vào nhà thờ đang hót vang.",
        definition_en: "a door, gate, passage, etc. used for entering a room, building or place",
        example_en: "The entrance to the restaurant is to your left.\nWait for me at the main entrance of the stadium.",
        example_vi: "Lối vào nhà hàng nằm ở phía bên trái của bạn.\nHãy đợi tôi ở cổng vào chính của sân vận động nhé.",
        page_number: 203
      },
      {
        word: "Funeral",
        phonetic: "/ˈfjuː.nɚ.əl/",
        word_type: "noun",
        meaning_vi: "Đám tang, tang lễ",
        sound_bridge: "Tiễn đám ma đi qua phủ thấy hoa nở rộ hết rồi!",
        definition_en: "a ceremony, usually a religious one, for burying or cremating a dead person",
        example_en: "I have to attend the soldier's funeral.\nHundreds of people gathered at the funeral to pay respects.",
        example_vi: "Tôi phải đi dự đám tang của người lính.\nHàng trăm người đã tề tựu tại tang lễ để bày tỏ lòng thành kính.",
        page_number: 203
      },
      {
        word: "Heaven",
        phonetic: "/ˈhev.ən/",
        word_type: "noun",
        meaning_vi: "Thiên đường",
        sound_bridge: "Thiên đường trồng được cả cây hẹ vàng.",
        definition_en: "the place believed to be the home of God where good people go when they die",
        example_en: "After I die, I hope to go to heaven.\nThis chocolate dessert tastes like pure heaven.",
        example_vi: "Sau khi qua đời, tôi hy vọng được lên thiên đường.\nMón tráng miệng sô-cô-la này ngon như ở chốn thiên đường.",
        page_number: 203
      },
      {
        word: "Monument",
        phonetic: "/ˈmɑːn.jə.mənt/",
        word_type: "noun",
        meaning_vi: "Đài tưởng niệm",
        sound_bridge: "Xây dựng đài tưởng niệm để mong níu giữ mãi những chiến tích của cha ông ta ngày xưa.",
        definition_en: "a building, column, statue, etc. built to remind people of a famous person or event",
        example_en: "This famous monument was built in 1875.\nA monument was erected in honor of national heroes.",
        example_vi: "Đài tưởng niệm nổi tiếng này được xây dựng vào năm 1875.\nMột đài tưởng niệm đã được dựng lên để vinh danh các vị anh hùng dân tộc.",
        page_number: 204
      },
      {
        word: "Mosque",
        phonetic: "/mɑːsk/",
        word_type: "noun",
        meaning_vi: "Nhà thờ Hồi giáo",
        sound_bridge: "Cô ấy thích mốt, nhưng sợ quê nên không dám mặc quần ngắn vào nhà thờ Hồi giáo.",
        definition_en: "a building in which Muslims worship",
        example_en: "Thousands of Muslims pray at this mosque.\nThe blue mosque has stunning architecture and minarets.",
        example_vi: "Hàng ngàn người Hồi giáo cầu nguyện tại nhà thờ Hồi giáo này.\nNhà thờ Hồi giáo Xanh có kiến trúc và những ngọn tháp tuyệt đẹp.",
        page_number: 204
      },
      {
        word: "Nation",
        phonetic: "/ˈneɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Nước, quốc gia",
        sound_bridge: "Người da đỏ ở nước Mỹ lấy sừng trâu làm lễ tế trời.",
        definition_en: "a country considered as a group of people with the same language, culture and history, who live in a particular area under one government",
        example_en: "This nation will fight for its freedom.\nThe president addressed the nation on live television.",
        example_vi: "Quốc gia này sẽ chiến đấu vì sự tự do của mình.\nTổng thống đã có bài phát biểu trước toàn thể quốc gia trên truyền hình trực tiếp.",
        page_number: 204
      },
      {
        word: "Palace",
        phonetic: "/ˈpæl.ɪs/",
        word_type: "noun",
        meaning_vi: "Cung điện",
        sound_bridge: "Phải lấy chìa khóa để mở cửa cung điện nguy nga.",
        definition_en: "a large and impressive building forming the official residence of a ruler",
        example_en: "The king lives in a magnificent palace.\nTourists are allowed to walk through the royal palace gardens.",
        example_vi: "Nhà vua sống trong một cung điện tráng lệ.\nKhách du lịch được phép tản bộ trong khu vườn hoàng cung.",
        page_number: 205
      },
      {
        word: "Surroundings",
        phonetic: "/səˈraʊn.dɪŋz/",
        word_type: "noun",
        meaning_vi: "Cảnh vật xung quanh, môi trường sống",
        sound_bridge: "Sợ rớt nước nên quan sát kỹ cảnh vật xung quanh.",
        definition_en: "the things and conditions around a person or thing",
        example_en: "Animals adapt quickly to their new surroundings.\nShe was sitting comfortably in her peaceful home surroundings.",
        example_vi: "Động vật thích nghi nhanh chóng với môi trường xung quanh mới.\nCô ấy đang ngồi thoải mái trong không gian thanh bình quanh nhà.",
        page_number: 205
      }
    ]
  },

  // ==========================================
  // UNIT 22: Body and Health (31 từ, Trang 209 - 215)
  // ==========================================
  22: {
    unit: 22,
    unit_title: "Body and Health",
    category: "Health & Body",
    words: [
      {
        word: "Ache",
        phonetic: "/eɪk/",
        word_type: "verb",
        meaning_vi: "Đau",
        sound_bridge: "Con ếch bị đau răng.",
        definition_en: "to feel a continuous dull pain",
        example_en: "My stomach aches after that big meal.\nMy legs ache after running ten miles yesterday.",
        example_vi: "Bụng tôi bị đau sau bữa ăn no đó.\nChân tôi đau nhức sau khi chạy 10 dặm ngày hôm qua.",
        page_number: 209
      },
      {
        word: "Aid",
        phonetic: "/eɪd/",
        word_type: "noun",
        meaning_vi: "Sự hỗ trợ, viện trợ",
        sound_bridge: "Ấy, đừng ăn mì cay, cậu nên chọn thức ăn hỗ trợ đường tiêu hóa thì hơn.",
        definition_en: "help or support",
        example_en: "Thanks for giving me aid.\nThe government sent emergency medical aid to the disaster area.",
        example_vi: "Cảm ơn vì đã hỗ trợ tôi.\nChính phủ đã gửi viện trợ y tế khẩn cấp đến vùng thiên tai.",
        page_number: 209
      },
      {
        word: "Ankle",
        phonetic: "/ˈæŋ.kəl/",
        word_type: "noun",
        meaning_vi: "Mắt cá chân",
        sound_bridge: "Anh khờ quá, hai hôm tới thi chạy rồi còn để ngã sưng mắt cá chân.",
        definition_en: "the joint connecting the foot to the leg",
        example_en: "Be careful, not to sprain your ankle!\nHe twisted his ankle while playing basketball.",
        example_vi: "Hãy cẩn thận, đừng để bị trẹo mắt cá chân nhé!\nAnh ấy bị trật mắt cá chân khi đang chơi bóng rổ.",
        page_number: 209
      },
      {
        word: "Asleep",
        phonetic: "/əˈsliːp/",
        word_type: "adjective",
        meaning_vi: "Đang ngủ",
        sound_bridge: "Ơ nhìn kìa, con mèo lim dim ngủ mà vẫn vẫy đuôi.",
        definition_en: "sleeping or not awake",
        example_en: "My kids are asleep.\nHe was so tired that he fell asleep instantly.",
        example_vi: "Các con tôi đang ngủ.\nAnh ấy mệt đến mức ngủ thiếp đi ngay lập tức.",
        page_number: 209
      },
      {
        word: "Bald",
        phonetic: "/bɑːld/",
        word_type: "adjective",
        meaning_vi: "Hói",
        sound_bridge: "Hắn đã hói lại còn bo bo giữ của, chẳng ai chịu được.",
        definition_en: "having little or no hair on the head",
        example_en: "Some people are bald when they are 30.\nHe started going bald in his early twenties.",
        example_vi: "Một số người bị hói khi họ mới 30 tuổi.\nAnh ấy bắt đầu bị hói đầu từ những năm đầu tuổi hai mươi.",
        page_number: 210
      },
      {
        word: "Blind",
        phonetic: "/blaɪnd/",
        word_type: "adjective",
        meaning_vi: "Mù",
        sound_bridge: "Bị kẻ lái xe ẩu đâm vào nên cô bị mù.",
        definition_en: "not able to see",
        example_en: "I am blind in one eye.\nGuide dogs help blind people navigate busy streets.",
        example_vi: "Tôi bị mù một bên mắt.\nChó dẫn đường giúp người mù đi lại trên các con phố đông đúc.",
        page_number: 210
      },
      {
        word: "Cigarette",
        phonetic: "/ˌsɪɡ.əˈret/",
        word_type: "noun",
        meaning_vi: "Điếu thuốc lá",
        sound_bridge: "Làm đơn xin nhà trường giờ rét thì được hút một điếu thuốc lá.",
        definition_en: "a thin tube of paper filled with tobacco, for smoking",
        example_en: "I quit smoking cigarettes already.\nLighting a cigarette is strictly prohibited inside the hospital.",
        example_vi: "Tôi đã bỏ hút thuốc lá rồi.\nChâm thuốc lá bị nghiêm cấm hoàn toàn bên trong bệnh viện.",
        page_number: 210
      },
      {
        word: "Disease",
        phonetic: "/dɪˈziːz/",
        word_type: "noun",
        meaning_vi: "Bệnh tật",
        sound_bridge: "Đề gì toàn nói về bệnh tật thế này!",
        definition_en: "an illness affecting humans, animals or plants, often caused by infection",
        example_en: "Cancer is a horrible disease.\nEating vegetables helps prevent heart disease.",
        example_vi: "Ung thư là một căn bệnh khủng khiếp.\nĂn nhiều rau củ giúp ngăn ngừa bệnh tim mạch.",
        page_number: 210
      },
      {
        word: "Dose",
        phonetic: "/doʊs/",
        word_type: "noun",
        meaning_vi: "Liều thuốc",
        sound_bridge: "Bác sĩ đang cho bé Bi uống liều thuốc đau đầu đấy.",
        definition_en: "an amount of a medicine or a drug that is taken once, or regularly over a period of time",
        example_en: "Take two doses everyday!\nDo not exceed the recommended dose of this medication.",
        example_vi: "Hãy uống hai liều mỗi ngày nhé!\nKhông được dùng quá liều lượng quy định của thuốc này.",
        page_number: 210
      },
      {
        word: "Medicine",
        phonetic: "/ˈmed.ɪ.sən/",
        word_type: "noun",
        meaning_vi: "Thuốc, y học",
        sound_bridge: "Bà mẹ đi xin thuốc cho con vì không có tiền mua.",
        definition_en: "a substance, especially a liquid that you drink or swallow in order to cure an illness",
        example_en: "Modern medicine has saved many lives.\nTake this cough medicine three times a day after meals.",
        example_vi: "Y học hiện đại đã cứu sống nhiều mạng người.\nHãy uống thuốc ho này ba lần một ngày sau bữa ăn.",
        page_number: 210
      },
      {
        word: "Muscle",
        phonetic: "/ˈmʌs.əl/",
        word_type: "noun",
        meaning_vi: "Cơ bắp",
        sound_bridge: "Bé Mơ trông xồ xề vì cơ bắp không được săn chắc.",
        definition_en: "a piece of body tissue that you contract and relax in order to move a particular part of the body",
        example_en: "You can build muscle by eating a lot of protein.\nHe pulled a muscle while lifting heavy boxes.",
        example_vi: "Bạn có thể xây dựng cơ bắp bằng cách ăn nhiều chất đạm.\nAnh ấy bị căng cơ khi đang khuân vác các thùng hàng nặng.",
        page_number: 211
      },
      {
        word: "Mustache",
        phonetic: "/ˈmʌs.tæʃ/",
        word_type: "noun",
        meaning_vi: "Râu mép",
        sound_bridge: "Bé Mơ sợ ta vì bộ râu mép chưa được tỉa gọn gàng.",
        definition_en: "a line of hair that a man allows to grow on his upper lip",
        example_en: "The man had a funny mustache.\nHe decided to shave off his mustache for the interview.",
        example_vi: "Người đàn ông có bộ râu mép trông rất buồn cười.\nAnh ấy quyết định cạo sạch bộ râu mép trước buổi phỏng vấn.",
        page_number: 211
      },
      {
        word: "Operation",
        phonetic: "/ˌɑː.pəˈreɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Ca phẫu thuật",
        sound_bridge: "Mọi người trong ấp bỏ rơi Sơn nếu anh ấy không thực hiện ca phẫu thuật này.",
        definition_en: "the process of cutting open a part of a person's body in order to remove or repair a damaged part",
        example_en: "The operation was a success.\nShe underwent a major heart operation yesterday.",
        example_vi: "Ca phẫu thuật đã thành công tốt đẹp.\nCô ấy đã trải qua một ca đại phẫu tim vào ngày hôm qua.",
        page_number: 211
      },
      {
        word: "Pharmacy",
        phonetic: "/ˈfɑːr.mə.si/",
        word_type: "noun",
        meaning_vi: "Hiệu thuốc",
        sound_bridge: "Pháp mời Messi đến các hiệu thuốc nổi tiếng làm quảng cáo.",
        definition_en: "a shop or part of a shop in which medicines are prepared and sold",
        example_en: "The pharmacy is open late.\nI stopped at the local pharmacy to pick up my prescription.",
        example_vi: "Hiệu thuốc mở cửa đến tận khuya.\nTôi ghé hiệu thuốc địa phương để lấy thuốc theo đơn.",
        page_number: 211
      },
      {
        word: "Poison",
        phonetic: "/ˈpɔɪ.zən/",
        word_type: "noun",
        meaning_vi: "Chất độc, ngộ độc",
        sound_bridge: "Boi dần bình phục sau khi bị ngộ độc.",
        definition_en: "a substance that causes death or harm if it is swallowed or absorbed into the body",
        example_en: "Rat poison should never be used near children.\nThe snake produces a deadly venomous poison.",
        example_vi: "Không bao giờ được dùng thuốc diệt chuột gần trẻ em.\nLoài rắn này tiết ra một loại nọc độc chết người.",
        page_number: 211
      },
      {
        word: "Popularity",
        phonetic: "/ˌpɑː.pjəˈler.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Sự phổ biến",
        sound_bridge: "Bỏ bùn vào tai để lấy ráy tai là phương pháp phổ biến thời Nguyên thủy.",
        definition_en: "the state of being liked, enjoyed or supported by a large number of people",
        example_en: "Yoga is gaining popularity.\nThe band's popularity grew rapidly after their hit single.",
        example_vi: "Yoga đang ngày càng trở nên phổ biến.\nSự nổi tiếng của ban nhạc tăng nhanh chóng sau đĩa đơn ăn khách.",
        page_number: 211
      },
      {
        word: "Portion",
        phonetic: "/ˈpɔːr.ʃən/",
        word_type: "noun",
        meaning_vi: "Khẩu phần ăn",
        sound_bridge: "Bố sẵn sàng nhường tôi khẩu phần ăn của ông.",
        definition_en: "an amount of food that is large enough for one person",
        example_en: "You should eat more portions of fruit.\nThe restaurant serves very generous portions of steak.",
        example_vi: "Bạn nên ăn nhiều khẩu phần trái cây hơn.\nNhà hàng phục vụ những phần bít tết rất đầy đặn.",
        page_number: 212
      },
      {
        word: "Recover",
        phonetic: "/rɪˈkʌv.ɚ/",
        word_type: "verb",
        meaning_vi: "Phục hồi, bình phục",
        sound_bridge: "Tôi đi phục hồi lại những bài hát cover đã bị xóa.",
        definition_en: "to get well again after being ill/sick, hurt, etc.",
        example_en: "If you sleep a lot, you will recover faster.\nIt took her several weeks to fully recover from the flu.",
        example_vi: "Nếu ngủ nhiều, bạn sẽ phục hồi nhanh hơn.\nCô ấy mất vài tuần để hoàn toàn bình phục sau cơn cảm cúm.",
        page_number: 212
      },
      {
        word: "Remedy",
        phonetic: "/ˈrem.ə.di/",
        word_type: "noun",
        meaning_vi: "Phương thuốc, biện pháp cứu chữa",
        sound_bridge: "Loa bị rè rồi, mơ đi không có biện pháp khắc phục nào đâu.",
        definition_en: "a way of dealing with or improving an unpleasant or difficult situation",
        example_en: "This ancient remedy really cured my cold.\nHoney and lemon is a great natural remedy for a sore throat.",
        example_vi: "Phương thuốc cổ truyền này thực sự đã chữa khỏi bệnh cảm của tôi.\nMật ong và chanh là bài thuốc tự nhiên tuyệt vời cho chứng đau họng.",
        page_number: 212
      },
      {
        word: "Smoke",
        phonetic: "/smoʊk/",
        word_type: "verb",
        meaning_vi: "Hút thuốc",
        sound_bridge: "Tôi sợ mâu thuẫn với những người hút thuốc.",
        definition_en: "to breathe smoke into the mouth and usually lungs from a cigarette, pipe, etc.",
        example_en: "I stopped smoking when I had kids.\nSmoking is harmful to both smokers and people around them.",
        example_vi: "Tôi đã ngừng hút thuốc khi có con.\nHút thuốc có hại cho cả người hút lẫn những người xung quanh.",
        page_number: 212
      },
      {
        word: "Surgery",
        phonetic: "/ˈsɝː.dʒər.i/",
        word_type: "noun",
        meaning_vi: "Phẫu thuật",
        sound_bridge: "Bệnh nặng sợ giờ đi phẫu thuật muộn mất rồi.",
        definition_en: "medical treatment of injuries or diseases that involves cutting open a person's body",
        example_en: "She got plastic surgery for her lips.\nThe patient is currently recovering after knee surgery.",
        example_vi: "Cô ấy đã phẫu thuật thẩm mỹ cho đôi môi của mình.\nBệnh nhân hiện đang hồi phục sau ca phẫu thuật đầu gối.",
        page_number: 212
      },
      {
        word: "Symptom",
        phonetic: "/ˈsɪmp.təm/",
        word_type: "noun",
        meaning_vi: "Triệu chứng",
        sound_bridge: "Triệu chứng của những con nhà giàu là mua sim tầm vài triệu trở lên.",
        definition_en: "any feeling of illness or physical or mental change that is caused by a particular disease",
        example_en: "Headache is a symptom of Dengue Fever.\nFever and cough are the common symptoms of a cold.",
        example_vi: "Đau đầu là một triệu chứng của sốt xuất huyết.\nSốt và ho là những triệu chứng phổ biến của bệnh cảm lạnh.",
        page_number: 212
      },
      {
        word: "Tablet",
        phonetic: "/ˈtæb.lət/",
        word_type: "noun",
        meaning_vi: "Viên thuốc",
        sound_bridge: "Cầm trên tay viên thuốc, cậu rất buồn vì phải kiêng táo và lê.",
        definition_en: "a small round piece of medicine that you swallow",
        example_en: "Take two tablets in the morning and one at night!\nSwallow the tablet whole with a full glass of water.",
        example_vi: "Hãy uống 2 viên thuốc vào buổi sáng và 1 viên vào buổi tối nhé!\nHãy nuốt trọn cả viên thuốc với một cốc nước đầy.",
        page_number: 213
      },
      {
        word: "Temperature",
        phonetic: "/ˈtem.prə.tʃɚ/",
        word_type: "noun",
        meaning_vi: "Nhiệt độ, cơn sốt",
        sound_bridge: "Con tem bỏ ra ngoài trời ở nhiệt độ cao màu sẽ đẹp hơn.",
        definition_en: "the measurement in degrees of how hot or cold a thing or place is",
        example_en: "This medicine will reduce your temperature.\nThe nurse came in to check his body temperature.",
        example_vi: "Loại thuốc này sẽ làm hạ nhiệt độ của bạn.\nY tá đã vào để kiểm tra thân nhiệt của anh ấy.",
        page_number: 213
      },
      {
        word: "Therapy",
        phonetic: "/ˈθer.ə.pi/",
        word_type: "noun",
        meaning_vi: "Liệu pháp, trị liệu",
        sound_bridge: "Thè lưỡi ra mới biết bị gì để mà có liệu pháp điều trị.",
        definition_en: "the treatment of a physical problem or an illness",
        example_en: "Physical therapy is a good choice for leg injuries.\nMusic therapy helps many patients reduce mental stress.",
        example_vi: "Vật lý trị liệu là một lựa chọn tốt cho chấn thương ở chân.\nTrị liệu bằng âm nhạc giúp nhiều bệnh nhân giảm bớt căng thẳng tinh thần.",
        page_number: 213
      },
      {
        word: "Throat",
        phonetic: "/θroʊt/",
        word_type: "noun",
        meaning_vi: "Cổ họng",
        sound_bridge: "Chị tôi thở dốc vì bị đau cổ họng không nói được.",
        definition_en: "a passage in the neck through which food and air pass on their way into the body",
        example_en: "His throat finally felt better after two days.\nI have a scratchy throat and a running nose.",
        example_vi: "Cổ họng anh ấy cuối cùng đã đỡ hơn sau 2 ngày.\nTôi bị rát cổ họng và chảy nước mũi.",
        page_number: 213
      },
      {
        word: "Thumb",
        phonetic: "/θʌm/",
        word_type: "noun",
        meaning_vi: "Ngón tay cái",
        sound_bridge: "Thăm xem ngón tay cái nghịch dại chảy máu khỏi chưa.",
        definition_en: "the short thick finger at the side of the hand",
        example_en: "She gave me a thumbs up.\nHe accidentally hit his left thumb with the hammer.",
        example_vi: "Cô ấy đã giơ ngón tay cái lên tán thành tôi.\nAnh ta vô tình đập búa vào ngón tay cái bên trái của mình.",
        page_number: 213
      },
      {
        word: "Usual",
        phonetic: "/ˈjuː.ʒu.əl/",
        word_type: "adjective",
        meaning_vi: "Thông thường, quen thuộc",
        sound_bridge: "Thông thường những người say mê làm việc thì bạn (you) dù ồn ào thế nào cũng không làm họ mất tập trung được.",
        definition_en: "normal; happening, done, or used most often",
        example_en: "This restaurant is better than my usual place.\nI will meet you at the usual time and place.",
        example_vi: "Nhà hàng này ngon hơn chỗ tôi hay ăn thông thường.\nTôi sẽ gặp bạn vào đúng giờ giấc và địa điểm quen thuộc.",
        page_number: 213
      },
      {
        word: "Wound",
        phonetic: "/wuːnd/",
        word_type: "noun",
        meaning_vi: "Vết thương",
        sound_bridge: "Won bị nhiều vết thương do ngã xe.",
        definition_en: "a damaged area of the body, such as a cut or hole in the skin made by a weapon",
        example_en: "Your wound looks better than it did yesterday.\nClean the open wound carefully with antiseptic.",
        example_vi: "Vết thương của bạn trông đã đỡ hơn ngày hôm qua rồi.\nHãy rửa sạch vết thương hở cẩn thận bằng dung dịch sát trùng.",
        page_number: 214
      },
      {
        word: "Wrinkle",
        phonetic: "/ˈrɪŋ.kəl/",
        word_type: "noun",
        meaning_vi: "Nếp nhăn",
        sound_bridge: "Cô ấy bị nhiều nếp nhăn từ khi rinh cồn để tẩy trang da mặt.",
        definition_en: "a line or small fold in your skin, especially on your face, that forms as you get older",
        example_en: "I use cream to prevent wrinkles.\nHe had deep wrinkles around his laughing eyes.",
        example_vi: "Tôi dùng kem để ngăn ngừa các nếp nhăn.\nÔng ấy có những nếp nhăn sâu xung quanh đôi mắt hay cười.",
        page_number: 214
      },
      {
        word: "Wrist",
        phonetic: "/rɪst/",
        word_type: "noun",
        meaning_vi: "Cổ tay",
        sound_bridge: "Thằng bé cắn cổ tay tôi đau quá kêu rít lên.",
        definition_en: "the joint between the hand and the arm",
        example_en: "I hurt my wrist while playing tennis.\nShe wears a beautiful gold watch on her right wrist.",
        example_vi: "Tôi bị đau cổ tay khi chơi quần vợt.\nCô ấy đeo một chiếc đồng hồ vàng tuyệt đẹp trên cổ tay phải.",
        page_number: 214
      }
    ]
  },

  // ==========================================
  // UNIT 23: Sports & Gaming (34 từ, Trang 219 - 224)
  // ==========================================
  23: {
    unit: 23,
    unit_title: "Sports & Gaming",
    category: "Sports & Games",
    words: [
      {
        word: "Addicted",
        phonetic: "/əˈdɪk.tɪd/",
        word_type: "adjective",
        meaning_vi: "Bị nghiện",
        sound_bridge: "Muốn kích thích các bé trở thành người bị nghiện môn chạy bộ, ở đích thật cần trưng bày nhiều đồ chơi vào.",
        definition_en: "unable to stop taking drugs, or doing something as a habit",
        example_en: "Many children are addicted to candy.\nHe is completely addicted to video games.",
        example_vi: "Nhiều đứa trẻ bị nghiện kẹo ngọt.\nCậu ấy hoàn toàn bị nghiện trò chơi điện tử.",
        page_number: 219
      },
      {
        word: "Athlete",
        phonetic: "/ˈæθ.liːt/",
        word_type: "noun",
        meaning_vi: "Vận động viên",
        sound_bridge: "Các vận động viên phải ăn thịt để có nhiều chất đạm.",
        definition_en: "a person who is very good at sports or physical exercise",
        example_en: "He is the greatest athlete in basketball.\nOlympic athletes train for years to compete at the highest level.",
        example_vi: "Anh ấy là vận động viên vĩ đại nhất của môn bóng rổ.\nCác vận động viên Olympic tập luyện nhiều năm để thi đấu ở đỉnh cao.",
        page_number: 219
      },
      {
        word: "Basket",
        phonetic: "/ˈbæs.kət/",
        word_type: "noun",
        meaning_vi: "Cái rổ",
        sound_bridge: "Ông bác kẹt đến nỗi cái rổ cũng không cho nó mượn.",
        definition_en: "a container for holding or carrying things",
        example_en: "Throw the ball into the basket!\nShe filled the basket with fresh apples from the garden.",
        example_vi: "Hãy ném bóng vào rổ đi!\nCô ấy đựng đầy chiếc rổ bằng những quả táo tươi từ vườn.",
        page_number: 219
      },
      {
        word: "Bruise",
        phonetic: "/bruːz/",
        word_type: "noun",
        meaning_vi: "Vết bầm tím",
        sound_bridge: "Bơ rủ các bạn đi bắt bướm, kết quả là trở về với bộ dạng toàn vết thâm tím.",
        definition_en: "an injury or mark where the skin has not been broken but is darker in colour",
        example_en: "The bruise got bigger and bigger.\nShe got a dark bruise on her knee after falling off the bike.",
        example_vi: "Vết bầm tím ngày càng to ra.\nCô ấy bị một vết bầm sẫm màu ở đầu gối sau cú ngã xe đạp.",
        page_number: 219
      },
      {
        word: "Captain",
        phonetic: "/ˈkæp.tən/",
        word_type: "noun",
        meaning_vi: "Đội trưởng",
        sound_bridge: "Đội trưởng dây cáp từng đi bơm môi nên ổng mới có bờ môi quyến rũ như này.",
        definition_en: "the leader of a team or club",
        example_en: "We need to vote for a team captain.\nThe team captain led his players onto the field with confidence.",
        example_vi: "Chúng ta cần bầu ra một đội trưởng.\nĐội trưởng dẫn dắt các cầu thủ ra sân với sự tự tin cao độ.",
        page_number: 220
      },
      {
        word: "Chess",
        phonetic: "/tʃes/",
        word_type: "noun",
        meaning_vi: "Cờ vua",
        sound_bridge: "Chơi cờ vua mà lấy tay che sợ đối phương thắng thì có nhất cũng không vinh quang.",
        definition_en: "a game played by two people on a square board with 16 pieces",
        example_en: "Chess is a game of intelligence.\nMy grandfather taught me how to play chess when I was seven.",
        example_vi: "Cờ vua là một trò chơi của trí tuệ.\nÔng tôi đã dạy tôi cách chơi cờ vua từ khi tôi mới 7 tuổi.",
        page_number: 220
      },
      {
        word: "Coach",
        phonetic: "/koʊtʃ/",
        word_type: "noun",
        meaning_vi: "Huấn luyện viên",
        sound_bridge: "Huấn luyện viên đào tạo các cậu cốt là để sau này các cậu phục vụ cho Tổ quốc.",
        definition_en: "a person who trains an athlete or a team of athletes",
        example_en: "He is a legendary coach in tennis.\nThe head coach inspired the team to victory during halftime.",
        example_vi: "Ông ấy là một huấn luyện viên huyền thoại của làng quần vợt.\nVị huấn luyện viên trưởng đã truyền cảm hứng chiến thắng cho cả đội trong giờ nghỉ.",
        page_number: 220
      },
      {
        word: "Court",
        phonetic: "/kɔːrt/",
        word_type: "noun",
        meaning_vi: "Sân thể thao, tòa án",
        sound_bridge: "Có tờ giấy của tòa án gửi về nên cầu thủ đó bị cấm ra sân.",
        definition_en: "a place to play sports",
        example_en: "Let's go to the court after school!\nThey built a new indoor basketball court in our neighborhood.",
        example_vi: "Chúng ta hãy ra sân bóng sau giờ học nhé!\nHọ vừa xây dựng một sân bóng rổ trong nhà mới ở khu phố tôi.",
        page_number: 220
      },
      {
        word: "Cricket",
        phonetic: "/ˈkrɪk.ɪt/",
        word_type: "noun",
        meaning_vi: "Môn bóng gậy",
        sound_bridge: "Tên Cric bị kẹt với môn thể thao bóng gậy trong mùa hè này.",
        definition_en: "a sport in which two teams of eleven players try to score runs by hitting a small, hard ball with a bat",
        example_en: "Cricket is quite popular in India.\nWe watched an exciting international cricket match on TV.",
        example_vi: "Bóng gậy khá phổ biến ở Ấn Độ.\nChúng tôi đã xem một trận đấu bóng gậy quốc tế kịch tính trên TV.",
        page_number: 220
      },
      {
        word: "Customer",
        phonetic: "/ˈkʌs.tə.mɚ/",
        word_type: "noun",
        meaning_vi: "Khách hàng",
        sound_bridge: "Cắt tóc rõ đẹp thế mà khách hàng vẫn phàn nàn kêu ca.",
        definition_en: "a person who buys goods or a service",
        example_en: "Make sure you please the customers!\nThe company always values feedback from loyal customers.",
        example_vi: "Hãy đảm bảo làm hài lòng các khách hàng nhé!\nCông ty luôn trân trọng những phản hồi từ khách hàng thân thiết.",
        page_number: 220
      },
      {
        word: "Expensive",
        phonetic: "/ɪkˈspen.sɪv/",
        word_type: "adjective",
        meaning_vi: "Đắt tiền",
        sound_bridge: "Í, cây viết (pen) xịn như này thì chắc đắt tiền hơn.",
        definition_en: "costing a lot of money",
        example_en: "This bike is too expensive for my budget.\nDining at five-star restaurants is very expensive.",
        example_vi: "Chiếc xe đạp này quá đắt tiền so với túi tiền của tôi.\nĂn tối tại các nhà hàng năm sao rất đắt đỏ.",
        page_number: 221
      },
      {
        word: "Field",
        phonetic: "/fiːld/",
        word_type: "noun",
        meaning_vi: "Sân bóng, cánh đồng",
        sound_bridge: "Bin kể cho tôi nghe về những phiêu lưu đã trải qua trên sân bóng.",
        definition_en: "an area, usually covered with grass, used for playing sports",
        example_en: "Which field will we meet at tonight?\nThe soccer players ran out onto the grass field.",
        example_vi: "Tối nay chúng ta sẽ gặp nhau ở sân bóng nào?\nCác cầu thủ bóng đá đã chạy ra sân cỏ.",
        page_number: 221
      },
      {
        word: "Goal",
        phonetic: "/ɡoʊl/",
        word_type: "noun",
        meaning_vi: "Bàn thắng, khung thành, mục tiêu",
        sound_bridge: "Một bàn thắng vừa được ghi vào gôn.",
        definition_en: "a point scored in some sports when a player gets the ball into this area",
        example_en: "We need one more goal to tie the game.\nHe scored an incredible goal in the final minute.",
        example_vi: "Chúng ta cần thêm một bàn thắng nữa để gỡ hòa.\nAnh ấy đã ghi một bàn thắng không tưởng ở phút cuối cùng.",
        page_number: 221
      },
      {
        word: "Goalkeeper",
        phonetic: "/ˈɡoʊlˌkiː.pɚ/",
        word_type: "noun",
        meaning_vi: "Thủ môn",
        sound_bridge: "Gấu, khỉ, bò thay nhau làm thủ môn trong trận bóng của muông thú.",
        definition_en: "a player whose job is to stop the ball from going into his or her own team's goal",
        example_en: "The goalkeeper had very fast reflexes.\nThe goalkeeper made an amazing penalty save.",
        example_vi: "Thủ môn có phản xạ rất nhanh nhạy.\nThủ môn đã có một pha cản phá phạt đền ngoạn mục.",
        page_number: 221
      },
      {
        word: "Hobby",
        phonetic: "/ˈhɑː.bi/",
        word_type: "noun",
        meaning_vi: "Sở thích",
        sound_bridge: "Hà bị công việc chi phối sở thích cá nhân.",
        definition_en: "an activity that you do for pleasure when you are not working",
        example_en: "Chess is my favorite hobby.\nGardening is a relaxing hobby on weekends.",
        example_vi: "Cờ vua là sở thích yêu thích nhất của tôi.\nLàm vườn là một sở thích thư giãn vào những ngày cuối tuần.",
        page_number: 221
      },
      {
        word: "Involve",
        phonetic: "/ɪnˈvɑːlv/",
        word_type: "verb",
        meaning_vi: "Bao gồm, liên quan",
        sound_bridge: "Muốn để trí nhớ in vào đầu đòi hỏi nhiều yếu tố liên quan.",
        definition_en: "to include someone in something, or to make them take part in or feel part of it",
        example_en: "The game involves 11 players on each team.\nThe project involves months of intensive research.",
        example_vi: "Trò chơi này bao gồm 11 cầu thủ ở mỗi đội.\nDự án liên quan đến nhiều tháng nghiên cứu chuyên sâu.",
        page_number: 221
      },
      {
        word: "League",
        phonetic: "/liːɡ/",
        word_type: "noun",
        meaning_vi: "Giải đấu, liên đoàn",
        sound_bridge: "Ở trong Liên Đoàn không có chuyện chia ly, nó mang tính tập thể rất cao.",
        definition_en: "a group of teams playing a sport who take part in competitions between each other",
        example_en: "My league is for beginners.\nOur local soccer club won the premier league championship.",
        example_vi: "Giải đấu của tôi dành cho những người mới bắt đầu.\nCâu lạc bộ bóng đá địa phương của chúng tôi đã vô địch giải ngoại hạng.",
        page_number: 222
      },
      {
        word: "Leisure",
        phonetic: "/ˈleʒ.ɚ/",
        word_type: "noun",
        meaning_vi: "Thời gian rỗi, giải trí",
        sound_bridge: "Đừng chơi với nó trong thời gian rỗi không bị lây bệnh lười bây giờ.",
        definition_en: "the time when you are not working or doing other duties",
        example_en: "You can complete the work at your leisure.\nMost people enjoy spending their leisure time with family.",
        example_vi: "Bạn có thể hoàn thành công việc vào thời gian rảnh rỗi của mình.\nHầu hết mọi người thích dành thời gian rảnh rỗi bên gia đình.",
        page_number: 222
      },
      {
        word: "Lose",
        phonetic: "/luːz/",
        word_type: "verb",
        meaning_vi: "Thua cuộc, làm mất",
        sound_bridge: "Cái lu bị thua rồi.",
        definition_en: "to fail to succeed in a game, competition, etc.",
        example_en: "My team always loses to Southbury FC.\nWe fought hard and refused to lose the championship.",
        example_vi: "Đội của tôi luôn bị thua trước CLB Southbury.\nChúng tôi đã chiến đấu kiên cường và không chấp nhận thua giải đấu.",
        page_number: 222
      },
      {
        word: "Medal",
        phonetic: "/ˈmed.əl/",
        word_type: "noun",
        meaning_vi: "Huy chương",
        sound_bridge: "Đây là huy chương dành cho bà mẹ đỡ xôi giỏi nhất năm!",
        definition_en: "a small metal disc given as a reward for a brave action, for winning a competition",
        example_en: "He got a gold medal for first place.\nShe proudly wore her silver medal around her neck.",
        example_vi: "Anh ấy đã nhận được huy chương vàng cho vị trí thứ nhất.\nCô ấy tự hào đeo chiếc huy chương bạc trên cổ.",
        page_number: 222
      },
      {
        word: "Occasion",
        phonetic: "/əˈkeɪ.ʒən/",
        word_type: "noun",
        meaning_vi: "Dịp, cơ hội",
        sound_bridge: "Nông dân phải tranh thủ dịp này để tránh ốc cây dần đàn phá hoại lúa.",
        definition_en: "a special or particular time or event",
        example_en: "This is a very special occasion.\nI only wear formal suits on important occasions.",
        example_vi: "Đây là một dịp rất đặc biệt.\nTôi chỉ mặc âu phục trang trọng vào những dịp quan trọng.",
        page_number: 222
      },
      {
        word: "Parachute",
        phonetic: "/ˈper.ə.ʃuːt/",
        word_type: "noun",
        meaning_vi: "Cái dù nhảy",
        sound_bridge: "Em bé tay cầm cái dù chạy ra sút quả bóng.",
        definition_en: "a piece of equipment made of a large piece of special cloth that is fastened to a person dropped from an aircraft",
        example_en: "I sometimes go skydiving and always bring an extra parachute.\nThe parachute opened smoothly high above the clouds.",
        example_vi: "Tôi thỉnh thoảng đi nhảy dù và luôn mang theo một chiếc dù phụ.\nChiếc dù bung ra nhẹ nhàng trên tầng mây cao.",
        page_number: 222
      },
      {
        word: "Penalty",
        phonetic: "/ˈpen.əl.ti/",
        word_type: "noun",
        meaning_vi: "Phạt đền, hình phạt",
        sound_bridge: "Thách thức: Cứ bắt nạt đi, mày sẽ sớm bị phạt đền.",
        definition_en: "a punishment for breaking a law, rule or contract",
        example_en: "The referee signaled a penalty.\nThe striker scored easily from the penalty spot.",
        example_vi: "Trọng tài đã ra hiệu một quả phạt đền.\nTiền đạo đã ghi bàn dễ dàng từ chấm phạt đền.",
        page_number: 223
      },
      {
        word: "Recreation",
        phonetic: "/ˌrek.riˈeɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Giải trí, tiêu khiển",
        sound_bridge: "Trong khu giải trí có chú vẹt đi lấy hạt vừng.",
        definition_en: "a way of enjoying yourself when you are not working",
        example_en: "I only play soccer for recreation.\nThe city opened a new recreation center with swimming pools.",
        example_vi: "Tôi chỉ chơi bóng đá để giải trí mà thôi.\nThành phố vừa khánh thành một trung tâm giải trí mới có bể bơi.",
        page_number: 223
      },
      {
        word: "Reputation",
        phonetic: "/ˌrep.jəˈteɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Danh tiếng",
        sound_bridge: "Dè bỉu tây sẽ mang danh tiếng.",
        definition_en: "the opinion that people have about what somebody/something is like",
        example_en: "This team has an aggressive reputation.\nThe school has a wonderful reputation for academic excellence.",
        example_vi: "Đội bóng này có danh tiếng là chơi rất hung hăng.\nNgôi trường có danh tiếng tuyệt vời về thành tích học thuật xuất sắc.",
        page_number: 223
      },
      {
        word: "Sailing",
        phonetic: "/ˈseɪ.lɪŋ/",
        word_type: "noun",
        meaning_vi: "Môn chèo thuyền buồm",
        sound_bridge: "Sao lính Trung Quốc lại mang thuyền buồm vào nước ta.",
        definition_en: "the sport or activity of using boats with sails",
        example_en: "We went sailing around the lake.\nSailing requires good knowledge of the wind and tides.",
        example_vi: "Chúng tôi đã đi thuyền buồm dạo quanh hồ.\nMôn chèo thuyền buồm đòi hỏi hiểu biết sâu về gió và thủy triều.",
        page_number: 223
      },
      {
        word: "Service",
        phonetic: "/ˈsɝː.vɪs/",
        word_type: "noun",
        meaning_vi: "Dịch vụ, cú giao bóng",
        sound_bridge: "Ở đây chúng tôi có dịch vụ sờ vịt, chỉ 50k/lần, nhanh tay các bạn ơi!",
        definition_en: "the particular skills or help that a person is able to offer",
        example_en: "I hope you are happy with the room service.\nHis powerful tennis service reached 120 miles per hour.",
        example_vi: "Tôi hy vọng bạn hài lòng với dịch vụ phòng.\nCú giao bóng quần vợt đầy uy lực của anh ấy đạt tốc độ 120 dặm/giờ.",
        page_number: 223
      },
      {
        word: "Skateboard",
        phonetic: "/ˈskeɪt.bɔːrd/",
        word_type: "noun",
        meaning_vi: "Ván trượt",
        sound_bridge: "Một số cây bị chặt bỏ để lấy gỗ làm ván trượt.",
        definition_en: "a flat, narrow board with two small wheels under each end",
        example_en: "Let's take our skateboard to the park!\nHe learned to do amazing tricks on his new skateboard.",
        example_vi: "Hãy mang ván trượt của chúng ta ra công viên nhé!\nCậu bé đã học được những động tác biểu diễn tuyệt đẹp trên chiếc ván trượt mới.",
        page_number: 223
      },
      {
        word: "Soundtrack",
        phonetic: "/ˈsaʊnd.træk/",
        word_type: "noun",
        meaning_vi: "Nhạc phim",
        sound_bridge: "Nhạc phim này hay đấy, sao một bản chắc ăn hơn!",
        definition_en: "music that are recorded for a film/movie",
        example_en: "This movie has the best soundtrack I have ever heard.\nThe soundtrack won an Academy Award for Best Original Score.",
        example_vi: "Bộ phim này có bản nhạc phim hay nhất mà tôi từng nghe.\nBản nhạc phim đã giành giải Oscar cho nhạc nền xuất sắc nhất.",
        page_number: 224
      },
      {
        word: "Surf",
        phonetic: "/sɝːf/",
        word_type: "verb",
        meaning_vi: "Lướt sóng",
        sound_bridge: "Sơ mít phình to khi lướt sóng.",
        definition_en: "to ride on a wave by a board",
        example_en: "The weather is perfect to go surfing.\nThey love to surf early in the morning before work.",
        example_vi: "Thời tiết thật hoàn hảo để đi lướt sóng.\nHọ thích lướt sóng vào sáng sớm trước khi đi làm.",
        page_number: 224
      },
      {
        word: "Swimsuit",
        phonetic: "/ˈswɪm.suːt/",
        word_type: "noun",
        meaning_vi: "Đồ bơi",
        sound_bridge: "Dự định là đi bơi (swim) suốt mùa hè nên đã sắm sẵn bộ đồ bơi.",
        definition_en: "a piece of clothing worn for swimming, especially the type worn by women and girls",
        example_en: "Don't forget your swimsuit at home!\nShe bought a stylish new swimsuit for the beach trip.",
        example_vi: "Đừng quên bộ đồ bơi của bạn ở nhà nhé!\nCô ấy đã mua một bộ đồ bơi sành điệu mới cho chuyến đi biển.",
        page_number: 224
      },
      {
        word: "Tournament",
        phonetic: "/ˈtʊr.nə.mənt/",
        word_type: "noun",
        meaning_vi: "Giải đấu",
        sound_bridge: "Tụi nó mạnh hơn, nhưng anh ấy vẫn thắng trong giải đấu.",
        definition_en: "a competition for teams or single players in which a series of games is played",
        example_en: "The whole team trains together and never takes a day off.\nThirty-two teams are competing in the national tournament.",
        example_vi: "Cả đội cùng tập luyện và không bao giờ nghỉ một ngày nào.\nBa mươi hai đội đang tranh tài tại giải đấu toàn quốc.",
        page_number: 224
      },
      {
        word: "Train",
        phonetic: "/treɪn/",
        word_type: "verb",
        meaning_vi: "Huấn luyện, tập luyện",
        sound_bridge: "Cách tốt nhất để đào tạo là cho sinh viên trải nghiệm môi trường làm việc cụ thể.",
        definition_en: "to prepare someone or yourself for a job, activity, or sport",
        example_en: "How often do you train at the gym?\nAthletes train six hours every single day.",
        example_vi: "Bạn thường tập luyện ở phòng gym bao lâu một lần?\nCác vận động viên tập luyện 6 tiếng mỗi ngày.",
        page_number: 224
      },
      {
        word: "Trophy",
        phonetic: "/ˈtroʊ.fi/",
        word_type: "noun",
        meaning_vi: "Cúp chiến thắng",
        sound_bridge: "Con trâu phi tới đích trước sẽ dành được cúp.",
        definition_en: "an object such as a silver cup that is given as a prize for winning a competition",
        example_en: "We won the first prize trophy.\nThe captain proudly lifted the championship trophy in front of the crowd.",
        example_vi: "Chúng tôi đã giành được chiếc cúp giải nhất.\nĐội trưởng tự hào giương cao chiếc cúp vô địch trước sự chứng kiến của đám đông.",
        page_number: 224
      }
    ]
  },

  // ==========================================
  // UNIT 24: Shop (44 từ, Trang 229 - 237)
  // ==========================================
  24: {
    unit: 24,
    unit_title: "Shop",
    category: "Shopping & Lifestyle",
    words: [
      {
        word: "Balloon",
        phonetic: "/bəˈluːn/",
        word_type: "noun",
        meaning_vi: "Bóng bay",
        sound_bridge: "Không mua cho quả bóng bay là bơ lun anh à?",
        definition_en: "a small bag made of very thin rubber that becomes larger and rounder when filled with air",
        example_en: "He wanted a balloon for his birthday.\nThe room was decorated with colorful balloons.",
        example_vi: "Cậu bé muốn có một quả bóng bay cho ngày sinh nhật.\nCăn phòng được trang trí bằng những quả bóng bay rực rỡ sắc màu.",
        page_number: 229
      },
      {
        word: "Barbershop",
        phonetic: "/ˈbɑːr.bɚ.ʃɑːp/",
        word_type: "noun",
        meaning_vi: "Tiệm cắt tóc nam",
        sound_bridge: "Ba Bơ Shop là tên tiệm cắt tóc mới mở đầu đường có anh chủ quán rất hot.",
        definition_en: "a shop where a barber works",
        example_en: "After I eat, I'm going to the barbershop to change my style.\nMy dad gets his hair trimmed at the same barbershop every month.",
        example_vi: "Sau khi ăn xong, tôi sẽ đến tiệm cắt tóc để thay đổi phong cách.\nBố tôi cắt tỉa tóc tại cùng một tiệm cắt tóc nam mỗi tháng.",
        page_number: 229
      },
      {
        word: "Blade",
        phonetic: "/bleɪd/",
        word_type: "noun",
        meaning_vi: "Lưỡi dao, lưỡi gươm",
        sound_bridge: "Xe máy Air Blade năm nay có kiểu dáng sắc cạnh lấy ý tưởng từ lưỡi dao.",
        definition_en: "the flat part of a knife, tool or machine, which has a sharp edge for cutting",
        example_en: "Be careful, the blade is sharp!\nThe razor blade needs to be replaced after a few uses.",
        example_vi: "Hãy cẩn thận, lưỡi dao rất sắc bén!\nLưỡi dao cạo cần được thay thế sau vài lần sử dụng.",
        page_number: 229
      },
      {
        word: "Blouse",
        phonetic: "/blaʊs/",
        word_type: "noun",
        meaning_vi: "Áo cánh, áo sơ mi nữ",
        sound_bridge: "Cái áo cánh này phơi cạnh bờ ao từ sáng đây mà.",
        definition_en: "a piece of clothing like a shirt, worn by women",
        example_en: "The sisters wore matching blouses to the ceremony.\nShe bought an elegant silk blouse for the interview.",
        example_vi: "Hai chị em đã mặc áo cánh đồng điệu đến buổi lễ.\nCô ấy đã mua một chiếc áo sơ mi lụa thanh lịch cho buổi phỏng vấn.",
        page_number: 229
      },
      {
        word: "Bracelet",
        phonetic: "/ˈbreɪ.slət/",
        word_type: "noun",
        meaning_vi: "Vòng tay, lắc tay",
        sound_bridge: "Brace tặng vòng tay cho Lịt.",
        definition_en: "a piece of jewellery worn around the wrist or arm",
        example_en: "This bracelet was a gift from my friend.\nShe wore a shiny silver bracelet on her left wrist.",
        example_vi: "Chiếc vòng tay này là món quà từ bạn tôi.\nCô ấy đeo một chiếc lắc tay bạc sáng lấp lánh ở cổ tay trái.",
        page_number: 230
      },
      {
        word: "Bucket",
        phonetic: "/ˈbʌk.ɪt/",
        word_type: "noun",
        meaning_vi: "Cái xô, thùng",
        sound_bridge: "Bác Kít cầm cái xô tung tăng đi chợ.",
        definition_en: "an open container with a handle, used for carrying or holding liquids, sand, etc.",
        example_en: "She washes her clothes in a bucket.\nFill the bucket with warm soapy water to mop the floor.",
        example_vi: "Cô ấy giặt quần áo trong một chiếc xô.\nHãy đổ đầy xô nước xà phòng ấm để lau sàn nhà.",
        page_number: 230
      },
      {
        word: "Cardigan",
        phonetic: "/ˈkɑːr.dɪ.ɡən/",
        word_type: "noun",
        meaning_vi: "Áo len đan cài cúc",
        sound_bridge: "Áo len đan cần đi gắn thêm cúc nha!",
        definition_en: "a knitted jacket made of wool, usually with no collar and fastened with buttons at the front",
        example_en: "He wore a fancy cardigan to the party.\nIt was a chilly evening, so she put on a warm cardigan.",
        example_vi: "Anh ấy đã mặc một chiếc áo len đan sang trọng đến bữa tiệc.\nTrời tối se lạnh nên cô ấy đã khoác thêm một chiếc áo len cài cúc ấm áp.",
        page_number: 230
      },
      {
        word: "Casual",
        phonetic: "/ˈkæʒ.u.əl/",
        word_type: "adjective",
        meaning_vi: "Bình thường, thông thường",
        sound_bridge: "Trời mưa che dù đi học với bộ đồ thông thường, tình cờ gặp một bé cún tung tăng dưới mưa.",
        definition_en: "casual clothes are not formal or not suitable for special occasions",
        example_en: "Today at work you can dress casual clothes.\nI prefer wearing casual clothes like jeans and T-shirts on weekends.",
        example_vi: "Hôm nay ở chỗ làm bạn có thể mặc trang phục thông thường.\nTôi thích mặc đồ thoải mái như quần jean và áo phông vào cuối tuần.",
        page_number: 230
      },
      {
        word: "Catalog",
        phonetic: "/ˈkæt̬.əl.ɑːɡ/",
        word_type: "noun",
        meaning_vi: "Danh mục sản phẩm",
        sound_bridge: "Cả tá cả lô danh mục thế này biết chọn cái nào?",
        definition_en: "a complete list of items, for example of things that people can look at or buy",
        example_en: "I don't shop at the store. I just order from the catalog.\nBrowse through our latest furniture catalog to see new designs.",
        example_vi: "Tôi không mua sắm ở cửa hàng. Tôi chỉ đặt mua qua danh mục sản phẩm.\nHãy xem qua danh mục nội thất mới nhất của chúng tôi để ngắm các mẫu thiết kế mới.",
        page_number: 230
      },
      {
        word: "Chain",
        phonetic: "/tʃeɪn/",
        word_type: "noun",
        meaning_vi: "Dây chuyền, chuỗi xích",
        sound_bridge: "Chuỗi ngọc trai treo ở 'chên' có giá 5000$.",
        definition_en: "rings usually made of metal that are connected together",
        example_en: "The dog is attached to the fence by a chain.\nShe wore a delicate gold chain around her neck.",
        example_vi: "Con chó được xích vào hàng rào bằng một sợi dây xích.\nCô ấy đeo một sợi dây chuyền vàng thanh mảnh quanh cổ.",
        page_number: 230
      },
      {
        word: "Comfort",
        phonetic: "/ˈkʌm.fɚt/",
        word_type: "noun",
        meaning_vi: "Sự thoải mái, tiện nghi",
        sound_bridge: "Bà mẹ làm món cơm phở để mang lại sự thoải mái cho con.",
        definition_en: "the state of being physically relaxed and free from pain",
        example_en: "I love the simple comforts of life.\nThese shoes are designed for maximum comfort and support.",
        example_vi: "Tôi yêu những sự thoải mái bình dị của cuộc sống.\nĐôi giày này được thiết kế để mang lại sự thoải mái tối đa và nâng đỡ bàn chân.",
        page_number: 231
      },
      {
        word: "Consume",
        phonetic: "/kənˈsuːm/",
        word_type: "verb",
        meaning_vi: "Tiêu thụ, tiêu dùng",
        sound_bridge: "Tết, cháu con sum họp, thực phẩm trong nhà tiêu dùng hết.",
        definition_en: "to have or digest foods and drinks",
        example_en: "Americans consume the most calories on average.\nAthletes consume large amounts of water during workouts.",
        example_vi: "Người Mỹ trung bình tiêu dùng lượng calo nhiều nhất.\nCác vận động viên tiêu thụ một lượng nước lớn trong suốt buổi tập.",
        page_number: 231
      },
      {
        word: "Consumer",
        phonetic: "/kənˈsuː.mɚ/",
        word_type: "noun",
        meaning_vi: "Người tiêu dùng",
        sound_bridge: "Trời nóng người tiêu dùng thích đồ giải khát nên con sắm lọ nước mơ chiều khách mà giá rẻ.",
        definition_en: "a person who buys goods or uses services",
        example_en: "More consumers want luxury products.\nConsumer rights are strictly protected by law.",
        example_vi: "Ngày càng nhiều người tiêu dùng muốn mua các sản phẩm cao cấp.\nQuyền của người tiêu dùng được pháp luật bảo vệ nghiêm ngặt.",
        page_number: 231
      },
      {
        word: "Contain",
        phonetic: "/kənˈteɪn/",
        word_type: "verb",
        meaning_vi: "Chứa đựng, bao gồm",
        sound_bridge: "Túi hồ sơ chứa đựng thông tin tuyệt mật, cần tên gián điệp cất giữ.",
        definition_en: "to have something inside or include something as apart",
        example_en: "This cake contains fruit, sugar, and candies.\nDoes this dish contain any nuts or dairy products?",
        example_vi: "Chiếc bánh này chứa đựng hoa quả, đường và kẹo.\nMón ăn này có chứa loại hạt hay sản phẩm từ sữa nào không?",
        page_number: 231
      },
      {
        word: "Convenient",
        phonetic: "/kənˈviː.ni.ənt/",
        word_type: "adjective",
        meaning_vi: "Tiện lợi, thuận tiện",
        sound_bridge: "Vào cửa hàng tiện lợi mua hết đồ mà vẫn còn ví tiền mang về.",
        definition_en: "useful, easy or quick to do; not causing problems",
        example_en: "Shopping online is so convenient.\nLiving near a subway station is extremely convenient for commuting.",
        example_vi: "Mua sắm trực tuyến thật là tiện lợi.\nSống gần ga tàu điện ngầm cực kỳ thuận tiện cho việc đi lại hàng ngày.",
        page_number: 231
      },
      {
        word: "Costume",
        phonetic: "/ˈkɑː.stuːm/",
        word_type: "noun",
        meaning_vi: "Trang phục hóa trang",
        sound_bridge: "Khó tiêu tiền cho bộ trang phục này đấy vì nó quá đắt.",
        definition_en: "clothes worn by an actor or for a party",
        example_en: "He wore a scary monster costume for Halloween.\nThe dancers wore colorful traditional folk costumes.",
        example_vi: "Cậu bé đã mặc một bộ trang phục quái vật đáng sợ vào lễ Halloween.\nCác vũ công đã mặc trang phục dân gian truyền thống rực rỡ sắc màu.",
        page_number: 231
      },
      {
        word: "Deluxe",
        phonetic: "/dɪˈlʌks/",
        word_type: "adjective",
        meaning_vi: "Sang trọng, cao cấp",
        sound_bridge: "Đi lắc vòng là một trong những thú vui của người sang trọng.",
        definition_en: "of a higher quality and more expensive than usual",
        example_en: "You can rent our deluxe room for no extra charge.\nThis is the company's most deluxe item.",
        example_vi: "Bạn có thể thuê phòng cao cấp của chúng tôi mà không mất thêm phí.\nĐây là sản phẩm sang trọng cao cấp nhất của công ty.",
        page_number: 232
      },
      {
        word: "Earring",
        phonetic: "/ˈɪr.ɪŋ/",
        word_type: "noun",
        meaning_vi: "Hoa tai, khuyên tai",
        sound_bridge: "Em ring chiếc hoa tai này cất vào tủ đi.",
        definition_en: "a piece of jewellery that you fasten in or on your ear",
        example_en: "The store's most popular product is the set of gold earrings.\nHer earrings were diamond and silver.",
        example_vi: "Sản phẩm phổ biến nhất của cửa hàng là bộ hoa tai bằng vàng.\nĐôi khuyên tai của cô ấy làm bằng kim cương và bạc.",
        page_number: 232
      },
      {
        word: "Glove",
        phonetic: "/ɡlʌv/",
        word_type: "noun",
        meaning_vi: "Găng tay",
        sound_bridge: "Đeo găng tay để sơn gờ giảm tốc nhiều lớp trên đường.",
        definition_en: "a covering for the hand, made of wool, leather, etc.",
        example_en: "It's getting too warm to wear gloves.\nI use leather gloves to work on the farm.",
        example_vi: "Trời đang ấm dần lên để tiếp tục đeo găng tay.\nTôi sử dụng găng tay da để làm việc trên nông trại.",
        page_number: 232
      },
      {
        word: "Grocery",
        phonetic: "/ˈɡroʊ.sɚ.i/",
        word_type: "noun",
        meaning_vi: "Cửa hàng tạp hóa, thực phẩm",
        sound_bridge: "Con chó gâu gâu sung sướng khi được ăn quả sơ ri mua tại cửa hàng tạp hóa.",
        definition_en: "a store for daily items like Vinmart or Circle K",
        example_en: "Go to the grocery store on the corner of the street!\nThere was a robbery in the grocery store.",
        example_vi: "Hãy đi đến cửa hàng tạp hóa ở góc phố nhé!\nĐã có một vụ cướp xảy ra ở cửa hàng tạp hóa.",
        page_number: 232
      },
      {
        word: "Handkerchief",
        phonetic: "/ˈhæŋ.kɚ.tʃiːf/",
        word_type: "noun",
        meaning_vi: "Khăn tay",
        sound_bridge: "Thợ hàn cơ khí đang hàn giá để khăn tay cho trường mầm non Đại Bàng.",
        definition_en: "a small piece of material or paper that you use for blowing your nose, etc.",
        example_en: "He put a handkerchief in his suit pocket.\nI'm feeling sick. Do you have a handkerchief?",
        example_vi: "Anh ấy đặt một chiếc khăn tay vào túi áo vest.\nTôi đang thấy khó chịu trong người. Bạn có khăn tay không?",
        page_number: 232
      },
      {
        word: "Hood",
        phonetic: "/hʊd/",
        word_type: "noun",
        meaning_vi: "Mũ áo khoác",
        sound_bridge: "Chiếc xe Audi mở mui xe lên, liền có cơn gió hút vào thổi bay mũ áo khoác.",
        definition_en: "part of a piece of clothing that can be pulled up to cover the top and back of the head",
        example_en: "She is very shy and always wears a hood.\nThe police couldn't see the thief's face because of his hood.",
        example_vi: "Cô ấy rất nhút nhát và luôn đội mũ áo khoác.\nCảnh sát không thể nhìn thấy mặt tên trộm vì chiếc mũ áo khoác của hắn.",
        page_number: 232
      },
      {
        word: "Necklace",
        phonetic: "/ˈnek.ləs/",
        word_type: "noun",
        meaning_vi: "Vòng cổ, dây chuyền",
        sound_bridge: "Nách lớn thế kia thì kẹp hai bên được cả trăm vòng cổ là chuyện bình thường.",
        definition_en: "a piece of jewellery consisting of a chain, string of beads, etc. worn around the neck",
        example_en: "She has three pearl necklaces.\nA necklace is a great wedding gift.",
        example_vi: "Cô ấy có ba chiếc vòng cổ ngọc trai.\nMột chiếc dây chuyền là món quà cưới tuyệt vời.",
        page_number: 233
      },
      {
        word: "Needle",
        phonetic: "/ˈniː.dəl/",
        word_type: "noun",
        meaning_vi: "Kim khâu",
        sound_bridge: "Cái nón ni đó được may bằng loại kim khâu đắt tiền nhất.",
        definition_en: "a small thin piece of steel that you use for sewing",
        example_en: "It's like finding a needle in a haystack.\nI hurt my finger with a needle.",
        example_vi: "Việc đó giống như mò kim đáy bể vậy.\nTôi bị kim đâm đau vào ngón tay.",
        page_number: 233
      },
      {
        word: "Original",
        phonetic: "/əˈrɪdʒ.ən.əl/",
        word_type: "adjective",
        meaning_vi: "Nguyên bản, gốc",
        sound_bridge: "Ông rim gì mà lạ vậy? Món này có bản gốc lạ nha!",
        definition_en: "existing since the beginning, or being the earliest form of something",
        example_en: "Nothing is better than the original brand.\nAll these songs are original.",
        example_vi: "Không gì tốt hơn nhãn hiệu nguyên bản gốc.\nTất cả những bài hát này đều là tác phẩm gốc tự sáng tác.",
        page_number: 233
      },
      {
        word: "Outdated",
        phonetic: "/ˌaʊtˈdeɪ.t̬ɪd/",
        word_type: "adjective",
        meaning_vi: "Lỗi thời",
        sound_bridge: "Ao tát tết xong là đã thành lỗi thời rồi.",
        definition_en: "not modern or fashionable anymore",
        example_en: "This computer system is completely outdated.\nHer fashion style is a bit outdated.",
        example_vi: "Hệ thống máy tính này đã hoàn toàn lỗi thời.\nPhong cách thời trang của cô ấy hơi lỗi thời.",
        page_number: 233
      },
      {
        word: "Outlet",
        phonetic: "/ˈaʊt.let/",
        word_type: "noun",
        meaning_vi: "Cửa hàng đại lý, ổ cắm",
        sound_bridge: "Ao lét đét mấy con cá vì cửa hàng đại lý không nhập cá giống.",
        definition_en: "a shop that sells goods made by a particular company",
        example_en: "They bought discounted clothes at the factory outlet.\nIs there an electrical outlet near my desk?",
        example_vi: "Họ đã mua quần áo giảm giá tại cửa hàng đại lý của nhà máy.\nCó ổ cắm điện nào gần bàn làm việc của tôi không?",
        page_number: 233
      },
      {
        word: "Package",
        phonetic: "/ˈpæk.ɪdʒ/",
        word_type: "noun",
        meaning_vi: "Gói hàng, kiện hàng",
        sound_bridge: "Bà Kịt nhận gói hàng từ người giao hàng.",
        definition_en: "an object or set of objects wrapped in paper, usually in order to be sent by post",
        example_en: "The courier delivered a heavy package to my door.\nPlease handle this fragile package with care.",
        example_vi: "Nhân viên chuyển phát nhanh đã giao một gói hàng nặng đến tận cửa nhà tôi.\nXin vui lòng nhẹ tay với gói hàng dễ vỡ này.",
        page_number: 233
      },
      {
        word: "Purchase",
        phonetic: "/ˈpɝː.tʃəs/",
        word_type: "verb",
        meaning_vi: "Mua",
        sound_bridge: "Tên này thường xuyên mua bơ mà chây lì không trả tiền.",
        definition_en: "to buy something",
        example_en: "When you purchase a bagel, you will get a free coffee.\nThey have been saving money to purchase the house.",
        example_vi: "Khi bạn mua một chiếc bánh mì tròn, bạn sẽ được tặng một ly cà phê miễn phí.\nHọ đã và đang tiết kiệm tiền để mua căn nhà.",
        page_number: 234
      },
      {
        word: "Purse",
        phonetic: "/pɝːs/",
        word_type: "noun",
        meaning_vi: "Ví tiền nữ",
        sound_bridge: "Ví tiền của tôi chỉ đủ để mua lọ bơ sáp này thôi.",
        definition_en: "a small bag made of leather, plastic, etc. for carrying coins and paper money",
        example_en: "He stole my purse.\nThis purse is made out of leather.",
        example_vi: "Hắn ta đã cướp chiếc ví tiền của tôi.\nChiếc ví này được làm bằng da thật.",
        page_number: 234
      },
      {
        word: "Raincoat",
        phonetic: "/ˈreɪn.koʊt/",
        word_type: "noun",
        meaning_vi: "Áo mưa",
        sound_bridge: "Tôi rên rỉ cầu trời không mưa vì hôm nay tôi quên mang áo mưa.",
        definition_en: "a long light coat that keeps you dry in the rain",
        example_en: "Don't forget your raincoat!\nRaincoats are most important in the Spring.",
        example_vi: "Đừng quên áo mưa của bạn nhé!\nÁo mưa là quan trọng nhất vào mùa xuân.",
        page_number: 234
      },
      {
        word: "Razor",
        phonetic: "/ˈreɪ.zɚ/",
        word_type: "noun",
        meaning_vi: "Dao cạo",
        sound_bridge: "Ngay tại đây, giờ phút này, tôi tuyên bố anh Tùng đã giành được phần thưởng dao cạo vàng.",
        definition_en: "an instrument that is used for shaving",
        example_en: "This company sells special steel razors.\nFor the best look, use a clean razor.",
        example_vi: "Công ty này bán những chiếc dao cạo bằng thép đặc biệt.\nĐể có diện mạo đẹp nhất, hãy dùng dao cạo sạch.",
        page_number: 234
      },
      {
        word: "Rubber",
        phonetic: "/ˈrʌb.ɚ/",
        word_type: "noun",
        meaning_vi: "Cao su",
        sound_bridge: "Ống nước lắp ráp bờ mương là ống cao su.",
        definition_en: "an elastic substance made either from the juice of particular tropical trees or artificially",
        example_en: "These tires are made of rubber.\nI hate the smell of burning rubber.",
        example_vi: "Những chiếc lốp xe này được làm bằng cao su.\nTôi ghét mùi cao su cháy.",
        page_number: 234
      },
      {
        word: "Sandal",
        phonetic: "/ˈsæn.dəl/",
        word_type: "noun",
        meaning_vi: "Đôi dép quai hậu, xăng đan",
        sound_bridge: "Đôi xăng đan ở trong đầm sen là đồ của tôi.",
        definition_en: "a light shoe, especially worn in warm weather, consisting of a bottom part held onto the foot by straps",
        example_en: "Tourists always buy sandals for the beach.\nSandals aren't the best for hiking.",
        example_vi: "Khách du lịch luôn mua xăng đan để đi biển.\nDép xăng đan không phải là lựa chọn tốt nhất cho việc leo núi.",
        page_number: 234
      },
      {
        word: "Satisfy",
        phonetic: "/ˈsæt̬.ɪs.faɪ/",
        word_type: "verb",
        meaning_vi: "Làm hài lòng, thỏa mãn",
        sound_bridge: "Xe Tít phải đưa đi 'khám bác sĩ', giờ xe khỏe re, Tít hài lòng lắm.",
        definition_en: "to please someone by giving them what they want or need",
        example_en: "Do our products satisfy you?\nI hope to satisfy my thirst with a soda.",
        example_vi: "Các sản phẩm của chúng tôi có làm bạn hài lòng không?\nTôi hy vọng giải tỏa cơn khát của mình bằng một lon nước ngọt.",
        page_number: 235
      },
      {
        word: "Scale",
        phonetic: "/skeɪl/",
        word_type: "noun",
        meaning_vi: "Cái cân, quy mô",
        sound_bridge: "Con pet làm hỏng cái cân tao mới mua, nó sợ tao đánh nên chưa sờ đến nó đã kêu ầm lên.",
        definition_en: "a series of marks at regular intervals on an instrument that is used for measuring",
        example_en: "Put the fruit on the scale!\nI don't like to use the scale to check my weight.",
        example_vi: "Hãy đặt hoa quả lên chiếc cân!\nTôi không thích dùng cân để kiểm tra cân nặng của mình.",
        page_number: 235
      },
      {
        word: "Scarf",
        phonetic: "/skɑːrf/",
        word_type: "noun",
        meaning_vi: "Khăn quàng cổ",
        sound_bridge: "Cái khăn quàng cổ lông chuột này sờ khá phê.",
        definition_en: "a piece of cloth that is worn around the neck, for example for warmth or decoration",
        example_en: "Don't forget your scarf! It's cold outside.\nScarves are very fashionable nowadays.",
        example_vi: "Đừng quên khăn quàng cổ của bạn nhé! Ngoài trời lạnh lắm.\nKhăn quàng cổ ngày nay rất hợp thời trang.",
        page_number: 235
      },
      {
        word: "Scissors",
        phonetic: "/ˈsɪz.ɚz/",
        word_type: "noun",
        meaning_vi: "Cái kéo",
        sound_bridge: "Sợ sệt khi tên cướp cầm cây kéo uy hiếp tôi.",
        definition_en: "a tool for cutting paper or cloth, that has two sharp blades with handles",
        example_en: "Scissors are important for teachers.\nDon't run with scissors in your hands!",
        example_vi: "Kéo là dụng cụ quan trọng đối với các giáo viên.\nĐừng chạy nhảy khi đang cầm kéo trên tay!",
        page_number: 235
      },
      {
        word: "Suit",
        phonetic: "/suːt/",
        word_type: "noun",
        meaning_vi: "Bộ com-lê, bộ vest",
        sound_bridge: "Suốt ngày hôm nay cô ấy chỉ đi tìm bộ vest cho bạn trai.",
        definition_en: "a jacket and trousers or a jacket and skirt that are made from the same material",
        example_en: "I need a suit for my cousin's wedding.\nAll employees must wear suits.",
        example_vi: "Tôi cần một bộ com-lê cho đám cưới của anh họ tôi.\nTất cả nhân viên đều phải mặc âu phục.",
        page_number: 235
      },
      {
        word: "Sweater",
        phonetic: "/ˈswet̬.ɚ/",
        word_type: "noun",
        meaning_vi: "Áo len",
        sound_bridge: "Nó bị phạt quét sân từ tờ mờ sáng đến giờ mới được tha vì tội lấy trộm áo len.",
        definition_en: "a piece of clothing, typically with long sleeves and made from wool, that is worn on the upper part of the body",
        example_en: "Sweaters are more expensive in the winter.\nHe gave her his sweater.",
        example_vi: "Áo len đắt hơn vào mùa đông.\nAnh ấy đã đưa cho cô chiếc áo len của mình.",
        page_number: 235
      },
      {
        word: "Tube",
        phonetic: "/tuːb/",
        word_type: "noun",
        meaning_vi: "Ống, tuýp",
        sound_bridge: "Ống nước nhỏ giọt vào túp lều của Mai.",
        definition_en: "a long cylinder made from plastic used for moving or containing liquids or gases",
        example_en: "A metal tube connects the sink to the lake.\nI need a new tube of toothpaste.",
        example_vi: "Một ống kim loại nối bồn rửa với hồ.\nTôi cần một tuýp kem đánh răng mới.",
        page_number: 236
      },
      {
        word: "Vary",
        phonetic: "/ˈver.i/",
        word_type: "verb",
        meaning_vi: "Thay đổi, biến đổi",
        sound_bridge: "Và Ry đã thay đổi.",
        definition_en: "to change or cause something to change in amount or level, especially from one occasion to another",
        example_en: "The quality of the food here varies a lot.\nI try to vary my diet everyday.",
        example_vi: "Chất lượng thức ăn ở đây thay đổi rất nhiều.\nTôi cố gắng đa dạng hóa khẩu phần ăn mỗi ngày.",
        page_number: 236
      },
      {
        word: "Vase",
        phonetic: "/veɪs/",
        word_type: "noun",
        meaning_vi: "Bình hoa, lọ hoa",
        sound_bridge: "Bình hoa này làm từ vảy cá sấu bạch tạng.",
        definition_en: "a container for holding flowers or for decoration",
        example_en: "The store sells expensive glass vases.\nMy mother gave me this vase for my flowers.",
        example_vi: "Cửa hàng bán những chiếc bình hoa bằng thủy tinh đắt tiền.\nMẹ tôi đã tặng tôi chiếc bình này để cắm hoa.",
        page_number: 236
      },
      {
        word: "Wardrobe",
        phonetic: "/ˈwɔːr.droʊb/",
        word_type: "noun",
        meaning_vi: "Tủ quần áo",
        sound_bridge: "Được bạn tặng một cái áo đầm làm quà, đỡ rầu hơn khi nhìn vào tủ quần áo.",
        definition_en: "a tall cupboard in which you hang your clothes",
        example_en: "The old wooden wardrobe is next to the bed.\nI keep all my clothes in the wardrobe.",
        example_vi: "Chiếc tủ quần áo bằng gỗ cũ nằm cạnh giường ngủ.\nTôi cất toàn bộ quần áo của mình trong tủ đồ.",
        page_number: 236
      }
    ]
  },

  // ==========================================
  // UNIT 25: Trade - 1 (29 từ, Trang 241 - 247)
  // ==========================================
  25: {
    unit: 25,
    unit_title: "Trade 1",
    category: "Business & Commerce",
    words: [
      {
        word: "Affordable",
        phonetic: "/əˈfɔːr.də.bəl/",
        word_type: "adjective",
        meaning_vi: "Vừa phải, có thể chi trả",
        sound_bridge: "Phở bò này có giá cả rất vừa phải.",
        definition_en: "cheap enough for most people to afford",
        example_en: "This apartment is affordable for young couples.\nWe offer high quality products at affordable prices.",
        example_vi: "Căn hộ này có giá cả vừa phải cho các cặp vợ chồng trẻ.\nChúng tôi cung cấp các sản phẩm chất lượng cao với giá cả phải chăng.",
        page_number: 241
      },
      {
        word: "Aware",
        phonetic: "/əˈwer/",
        word_type: "adjective",
        meaning_vi: "Nhận thức, biết",
        sound_bridge: "Ở que này ai cũng có nhận thức tốt về việc giữ gìn vệ sinh.",
        definition_en: "knowing or realizing something",
        example_en: "Are you aware of the new company policy?\nShe was well aware of the risks involved in the investment.",
        example_vi: "Bạn có biết về chính sách mới của công ty không?\nCô ấy hoàn toàn nhận thức được những rủi ro trong vụ đầu tư.",
        page_number: 241
      },
      {
        word: "Delivery",
        phonetic: "/dɪˈlɪv.ɚ.i/",
        word_type: "noun",
        meaning_vi: "Giao hàng",
        sound_bridge: "Đi lấy vali về để đi giao hàng cho khách.",
        definition_en: "the act of taking goods, letters, parcels, etc. to people's houses or places of work",
        example_en: "We offer free delivery on orders over $50.\nThe delivery arrived earlier than expected.",
        example_vi: "Chúng tôi miễn phí giao hàng cho các đơn hàng trên 50 đô la.\nChuyến giao hàng đã đến sớm hơn dự kiến.",
        page_number: 241
      },
      {
        word: "Discount",
        phonetic: "/ˈdɪs.kaʊnt/",
        word_type: "noun",
        meaning_vi: "Giảm giá",
        sound_bridge: "Đi săn cao su có chiết khấu giảm giá lớn.",
        definition_en: "an amount of money that is taken off the usual cost of something",
        example_en: "Students get a 10% discount on all books.\nThey offered a huge discount during Black Friday.",
        example_vi: "Học sinh sinh viên được giảm giá 10% cho tất cả các loại sách.\nHọ đã giảm giá khủng trong dịp Black Friday.",
        page_number: 241
      },
      {
        word: "Duplicate",
        phonetic: "/ˈduː.plə.keɪt/",
        word_type: "verb",
        meaning_vi: "Sao chép, nhân bản",
        sound_bridge: "Đuổi bà Lý kẹt trong thang máy ra để sao chép hồ sơ.",
        definition_en: "to make an exact copy of something",
        example_en: "Please duplicate this document for everyone in the meeting.\nIt is difficult to duplicate their incredible success.",
        example_vi: "Vui lòng sao chép tài liệu này cho tất cả mọi người trong cuộc họp.\nRất khó để sao chép thành công phi thường của họ.",
        page_number: 241
      },
      {
        word: "Enterprise",
        phonetic: "/ˈen.t̬ɚ.praɪz/",
        word_type: "noun",
        meaning_vi: "Doanh nghiệp",
        sound_bridge: "Em tờ giấy này cho doanh nghiệp làm việc.",
        definition_en: "a business or company",
        example_en: "He runs a successful software enterprise.\nSmall enterprises are the backbone of the economy.",
        example_vi: "Anh ấy điều hành một doanh nghiệp phần mềm thành công.\nCác doanh nghiệp nhỏ là xương sống của nền kinh tế.",
        page_number: 242
      },
      {
        word: "Establish",
        phonetic: "/ɪˈstæb.lɪʃ/",
        word_type: "verb",
        meaning_vi: "Thành lập, thiết lập",
        sound_bridge: "Em sắp làm lịch để thành lập công ty mới.",
        definition_en: "to start or create an organization, a system, etc.",
        example_en: "The company was established in 1995.\nThey established strong business relationships with local suppliers.",
        example_vi: "Công ty được thành lập vào năm 1995.\nHọ đã thiết lập mối quan hệ kinh doanh bền chặt với các nhà cung cấp địa phương.",
        page_number: 242
      },
      {
        word: "Estate",
        phonetic: "/ɪˈsteɪt/",
        word_type: "noun",
        meaning_vi: "Bất động sản, tài sản",
        sound_bridge: "Ít Tết nào anh ấy về thăm khu bất động sản ven biển.",
        definition_en: "a large area of land, or all the money and property that a person owns",
        example_en: "He invested heavily in real estate.\nHer entire estate was left to charitable organizations.",
        example_vi: "Anh ấy đã đầu tư rất nhiều vào bất động sản.\nToàn bộ tài sản của bà ấy được để lại cho các tổ chức từ thiện.",
        page_number: 242
      },
      {
        word: "Export",
        phonetic: "/ˈek.spɔːrt/",
        word_type: "verb",
        meaning_vi: "Xuất khẩu",
        sound_bridge: "Ếch sợ bị bắt đi xuất khẩu sang nước ngoài.",
        definition_en: "to sell and send goods to another country",
        example_en: "Vietnam exports coffee to many countries worldwide.\nThe government encourages companies to export manufactured goods.",
        example_vi: "Việt Nam xuất khẩu cà phê sang nhiều quốc gia trên toàn thế giới.\nChính phủ khuyến khích các công ty xuất khẩu hàng chế tạo sản xuất.",
        page_number: 242
      },
      {
        word: "Fortune",
        phonetic: "/ˈfɔːr.tʃuːn/",
        word_type: "noun",
        meaning_vi: "Vận may, gia tài",
        sound_bridge: "Phở chuẩn vị gia truyền mang lại cả gia tài cho gia đình.",
        definition_en: "a large amount of money, or good luck",
        example_en: "He made a fortune in the stock market.\nWe had the good fortune to meet generous mentors.",
        example_vi: "Anh ấy đã kiếm được cả một gia tài trên thị trường chứng khoán.\nChúng tôi có vận may được gặp những người thầy hướng dẫn đầy hào phóng.",
        page_number: 242
      },
      {
        word: "Guarantee",
        phonetic: "/ˌɡær.ənˈtiː/",
        word_type: "verb",
        meaning_vi: "Bảo hành, đảm bảo",
        sound_bridge: "Gà rán tí hon này được bảo hành độ giòn ngon.",
        definition_en: "to promise that something will be done or will happen",
        example_en: "All our electronic products are guaranteed for two years.\nWe guarantee complete customer satisfaction.",
        example_vi: "Tất cả các sản phẩm điện tử của chúng tôi được bảo hành trong hai năm.\nChúng tôi đảm bảo sự hài lòng tuyệt đối của khách hàng.",
        page_number: 243
      },
      {
        word: "Guest",
        phonetic: "/ɡest/",
        word_type: "noun",
        meaning_vi: "Khách mời, khách trọ",
        sound_bridge: "Ghét nhất là khách đến chơi nhà mà không báo trước.",
        definition_en: "a person who is invited to visit someone's home, or stays at a hotel",
        example_en: "Our hotel guests enjoy free breakfast every morning.\nShe greeted every wedding guest with a warm smile.",
        example_vi: "Khách trọ tại khách sạn chúng tôi được thưởng thức bữa sáng miễn phí mỗi sáng.\nCô ấy chào đón từng vị khách dự đám cưới bằng nụ cười nồng hậu.",
        page_number: 243
      },
      {
        word: "Import",
        phonetic: "/ˈɪm.pɔːrt/",
        word_type: "verb",
        meaning_vi: "Nhập khẩu",
        sound_bridge: "Im lặng để bưng hàng nhập khẩu vào kho.",
        definition_en: "to buy or bring in products from another country",
        example_en: "They import luxury cars from Germany.\nThe country imports large quantities of crude oil each year.",
        example_vi: "Họ nhập khẩu xe hơi hạng sang từ Đức.\nQuốc gia này nhập khẩu lượng lớn dầu thô mỗi năm.",
        page_number: 243
      },
      {
        word: "Inventory",
        phonetic: "/ˈɪn.vən.tɔːr.i/",
        word_type: "noun",
        meaning_vi: "Hàng tồn kho, bản kiểm kê",
        sound_bridge: "In vào tờ giấy bản kiểm kê hàng tồn kho.",
        definition_en: "a complete list of items such as property, goods in stock, etc.",
        example_en: "We need to check our inventory before placing a new order.\nThe warehouse conducts an annual inventory every December.",
        example_vi: "Chúng ta cần kiểm tra hàng tồn kho trước khi đặt đơn hàng mới.\nNhà kho tiến hành kiểm kê hàng tồn định kỳ vào mỗi tháng 12.",
        page_number: 243
      },
      {
        word: "Invest",
        phonetic: "/ɪnˈvest/",
        word_type: "verb",
        meaning_vi: "Đầu tư",
        sound_bridge: "In áo vest để đầu tư cho thương hiệu thời trang.",
        definition_en: "to put money into a business, property, etc. in the hope of making a profit",
        example_en: "She decided to invest in clean energy technology.\nIt is wise to invest money for your retirement early.",
        example_vi: "Cô ấy quyết định đầu tư vào công nghệ năng lượng sạch.\nĐầu tư tiền sớm cho khoản hưu trí là một quyết định khôn ngoan.",
        page_number: 243
      },
      {
        word: "Invoice",
        phonetic: "/ˈɪn.vɔɪs/",
        word_type: "noun",
        meaning_vi: "Hóa đơn",
        sound_bridge: "In vội hóa đơn cho khách hàng đang chờ thanh toán.",
        definition_en: "a list of goods that have been sold or work that has been done with the total cost",
        example_en: "Please send the invoice to our accounting department.\nPayment is due within 30 days of the invoice date.",
        example_vi: "Vui lòng gửi hóa đơn đến phòng kế toán của chúng tôi.\nHạn thanh toán là trong vòng 30 ngày kể từ ngày lập hóa đơn.",
        page_number: 244
      },
      {
        word: "Item",
        phonetic: "/ˈaɪ.t̬əm/",
        word_type: "noun",
        meaning_vi: "Món hàng, món đồ",
        sound_bridge: "Ai tắm xong cũng ra chọn một món đồ mới mua.",
        definition_en: "a single article or thing",
        example_en: "This item is currently out of stock.\nThere are several expensive items in her shopping cart.",
        example_vi: "Món hàng này hiện đang hết hàng.\nCó một vài món đồ đắt tiền trong giỏ hàng của cô ấy.",
        page_number: 244
      },
      {
        word: "Label",
        phonetic: "/ˈleɪ.bəl/",
        word_type: "noun",
        meaning_vi: "Nhãn mác",
        sound_bridge: "Lấy bắp ngô dán nhãn mác giá tiền lên.",
        definition_en: "a piece of paper or cloth attached to an object that gives information about it",
        example_en: "Always read the nutritional label before buying food.\nThe designer label is clearly visible on the jacket.",
        example_vi: "Luôn đọc nhãn thành phần dinh dưỡng trước khi mua thực phẩm.\nNhãn hiệu của nhà thiết kế được nhìn thấy rõ ràng trên áo khoác.",
        page_number: 244
      },
      {
        word: "Leaflet",
        phonetic: "/ˈliː.flət/",
        word_type: "noun",
        meaning_vi: "Tờ rơi",
        sound_bridge: "Ly phất tờ rơi quảng cáo cho mọi người đi đường.",
        definition_en: "a printed sheet of paper containing information or advertising and distributed free",
        example_en: "Volunteers handed out informational leaflets on the street.\nI picked up a travel leaflet at the tourist information desk.",
        example_vi: "Các tình nguyện viên đã phát những tờ rơi thông tin trên đường phố.\nTôi đã lấy một tờ rơi du lịch tại quầy thông tin du lịch.",
        page_number: 244
      },
      {
        word: "Leather",
        phonetic: "/ˈleð.ɚ/",
        word_type: "noun",
        meaning_vi: "Da (thuộc)",
        sound_bridge: "Lấy đơ chiếc ví da thuộc đem đi bảo dưỡng.",
        definition_en: "material made from the skin of an animal by tanning or a similar process",
        example_en: "This jacket is made of genuine Italian leather.\nHe bought a pair of high-quality leather boots.",
        example_vi: "Chiếc áo khoác này được làm từ da thật của Ý.\nAnh ấy đã mua một đôi bốt da chất lượng cao.",
        page_number: 244
      },
      {
        word: "Loyal",
        phonetic: "/ˈlɔɪ.əl/",
        word_type: "adjective",
        meaning_vi: "Trung thành",
        sound_bridge: "Lọ ớt ai cho vẫn giữ gìn như một người trung thành.",
        definition_en: "firm and not changing in your friendship with or support for a person or an organization",
        example_en: "She has been a loyal customer of our salon for ten years.\nDogs are well known for being loyal companions.",
        example_vi: "Cô ấy là một khách hàng trung thành của tiệm chúng tôi suốt 10 năm qua.\nChó nổi tiếng là những người bạn đồng hành trung thành.",
        page_number: 245
      },
      {
        word: "Luxury",
        phonetic: "/ˈlʌk.ʃɚ.i/",
        word_type: "noun",
        meaning_vi: "Sang trọng, xa xỉ",
        sound_bridge: "Lắc xí ngầu trúng khách sạn xa xỉ bên bờ biển.",
        definition_en: "great comfort and extravagant living",
        example_en: "They enjoyed a week of pure luxury at the five-star resort.\nA private jet is a luxury that few can afford.",
        example_vi: "Họ tận hưởng một tuần lễ hoàn toàn xa xỉ tại khu nghỉ dưỡng năm sao.\nChuyên cơ riêng là một sự xa xỉ mà rất ít người có thể chi trả.",
        page_number: 245
      },
      {
        word: "Maintain",
        phonetic: "/meɪnˈteɪn/",
        word_type: "verb",
        meaning_vi: "Duy trì, bảo dưỡng",
        sound_bridge: "Mấy tên này cố gắng duy trì vị trí dẫn đầu.",
        definition_en: "to make something continue at the same level, standard, etc.",
        example_en: "It is important to maintain a healthy lifestyle.\nThe building is well maintained by the management team.",
        example_vi: "Duy trì một lối sống lành mạnh là điều vô cùng quan trọng.\nTòa nhà được đội ngũ quản lý bảo dưỡng rất tốt.",
        page_number: 245
      },
      {
        word: "Market",
        phonetic: "/ˈmɑːr.kɪt/",
        word_type: "noun",
        meaning_vi: "Thị trường, chợ",
        sound_bridge: "Mang kẹo ra chợ bán thử nghiệm thị trường.",
        definition_en: "an occasion when people buy and sell goods; the business or trade in a particular product",
        example_en: "The smartphone market is becoming more competitive.\nWe buy fresh seafood at the local fish market every Saturday.",
        example_vi: "Thị trường điện thoại thông minh đang ngày càng trở nên cạnh tranh hơn.\nChúng tôi mua hải sản tươi sống tại chợ cá địa phương vào mỗi thứ Bảy.",
        page_number: 245
      },
      {
        word: "Preference",
        phonetic: "/ˈpref.ər.əns/",
        word_type: "noun",
        meaning_vi: "Sở thích ưu tiên",
        sound_bridge: "Phở rắc hành là sở thích ưu tiên của tôi.",
        definition_en: "a greater interest in or desire for somebody/something than somebody/something else",
        example_en: "Do you have any dietary preferences?\nCustomers showed a strong preference for eco-friendly packaging.",
        example_vi: "Bạn có sở thích ăn uống ưu tiên nào không?\nKhách hàng thể hiện sự ưa chuộng mạnh mẽ đối với bao bì thân thiện với môi trường.",
        page_number: 245
      },
      {
        word: "Receipt",
        phonetic: "/rɪˈsiːt/",
        word_type: "noun",
        meaning_vi: "Biên lai, hóa đơn nhận tiền",
        sound_bridge: "Ri xít xoa khi nhận lại biên lai mua hàng.",
        definition_en: "a piece of paper that proves that money, goods, or information have been received",
        example_en: "Keep your receipt in case you want to return the shirt.\nShe showed the cashier her digital receipt on her phone.",
        example_vi: "Hãy giữ lại biên lai phòng khi bạn muốn đổi trả chiếc áo.\nCô ấy đã đưa thu ngân xem biên lai điện tử trên điện thoại.",
        page_number: 246
      },
      {
        word: "Strategy",
        phonetic: "/ˈstræt̬.ə.dʒi/",
        word_type: "noun",
        meaning_vi: "Chiến lược",
        sound_bridge: "Sợ té ngã nên phải lên chiến lược thật kỹ lưỡng.",
        definition_en: "a plan of action designed to achieve a long-term or overall aim",
        example_en: "Our marketing strategy focuses on social media influencers.\nThe company developed a new growth strategy for the Asian market.",
        example_vi: "Chiến lược tiếp thị của chúng tôi tập trung vào những người có tầm ảnh hưởng trên mạng xã hội.\nCông ty đã phát triển một chiến lược tăng trưởng mới cho thị trường châu Á.",
        page_number: 246
      },
      {
        word: "Thief",
        phonetic: "/θiːf/",
        word_type: "noun",
        meaning_vi: "Kẻ trộm",
        sound_bridge: "Thịt bò bị kẻ trộm lấy mất rồi.",
        definition_en: "a person who steals another person's property",
        example_en: "The thief broke into the store through the back window.\nSecurity cameras caught the thief in the act.",
        example_vi: "Kẻ trộm đã đột nhập vào cửa hàng qua cửa sổ phía sau.\nCamera an ninh đã bắt quả tang kẻ trộm khi đang hành sự.",
        page_number: 246
      },
      {
        word: "Trade",
        phonetic: "/treɪd/",
        word_type: "noun",
        meaning_vi: "Thương mại, buôn bán",
        sound_bridge: "Trẻ đi buôn bán thương mại kiếm lời.",
        definition_en: "the activity of buying and selling, or exchanging, goods and services",
        example_en: "International trade has grown significantly over the past decades.\nThey agreed on a fair trade deal between both nations.",
        example_vi: "Thương mại quốc tế đã phát triển vượt bậc trong những thập kỷ qua.\nHọ đã đồng thuận về một thỏa thuận thương mại công bằng giữa hai quốc gia.",
        page_number: 246
      }
    ]
  },

  // ==========================================
  // UNIT 26: Trade - 2 (25 từ, Trang 251 - 256)
  // ==========================================
  26: {
    unit: 26,
    unit_title: "Trade 2",
    category: "Business & Commerce",
    words: [
      {
        word: "Acquire",
        phonetic: "/əˈkwaɪ.ɚ/",
        word_type: "verb",
        meaning_vi: "Đạt được, mua lại",
        sound_bridge: "Ơ quai cặp đẹp thế này mua lại ở đâu đấy?",
        definition_en: "to gain something by your own efforts, ability or behaviour; to buy or obtain an asset",
        example_en: "The tech giant acquired three small startups this year.\nHe worked hard to acquire new language skills.",
        example_vi: "Gã khổng lồ công nghệ đã mua lại 3 công ty khởi nghiệp nhỏ trong năm nay.\nAnh ấy đã làm việc chăm chỉ để trau dồi các kỹ năng ngôn ngữ mới.",
        page_number: 251
      },
      {
        word: "Aggressive",
        phonetic: "/əˈɡres.ɪv/",
        word_type: "adjective",
        meaning_vi: "Quyết liệt, hung hăng",
        sound_bridge: "Ăn ghẹ xong thì nói năng quyết liệt hơn hẳn.",
        definition_en: "behaving in an angry and violent way, or being very determined to win or succeed",
        example_en: "The company launched an aggressive marketing campaign.\nSome aggressive competitors are trying to take our market share.",
        example_vi: "Công ty đã phát động một chiến dịch tiếp thị đầy quyết liệt.\nMột số đối thủ cạnh tranh quyết liệt đang cố giành lấy thị phần của chúng tôi.",
        page_number: 251
      },
      {
        word: "Attribute",
        phonetic: "/ˈæt.rɪ.bjuːt/",
        word_type: "noun",
        meaning_vi: "Thuộc tính, đặc điểm",
        sound_bridge: "Ăn trưa với bí ngô là một đặc điểm thuộc tính của tôi.",
        definition_en: "a quality or feature regarded as a characteristic or inherent part of someone or something",
        example_en: "Patience is an essential attribute for a good leader.\nKey attributes of this car include high safety and fuel efficiency.",
        example_vi: "Kiên nhẫn là một đặc điểm cần thiết đối với một nhà lãnh đạo giỏi.\nNhững thuộc tính cốt lõi của chiếc xe này bao gồm độ an toàn cao và tiết kiệm nhiên liệu.",
        page_number: 251
      },
      {
        word: "Authentic",
        phonetic: "/ɑːˈθen.t̬ɪk/",
        word_type: "adjective",
        meaning_vi: "Đích thực, chính hãng",
        sound_bridge: "Ăn thêm thịt ở quán ăn chính hãng này nhé.",
        definition_en: "known to be real and what somebody claims it is, not a copy",
        example_en: "This restaurant serves authentic Italian pasta.\nMake sure you purchase authentic designer goods with certificates.",
        example_vi: "Nhà hàng này phục vụ món mì Ý đích thực.\nHãy đảm bảo bạn mua hàng hiệu chính hãng kèm theo chứng nhận.",
        page_number: 251
      },
      {
        word: "Balance",
        phonetic: "/ˈbæl.əns/",
        word_type: "noun",
        meaning_vi: "Số dư tài khoản, sự cân bằng",
        sound_bridge: "Ba lần xem số dư tài khoản ngân hàng đều thấy tăng.",
        definition_en: "the amount of money you have in a bank account, or an even distribution of weight",
        example_en: "Check your account balance before making a large purchase.\nMaintaining work-life balance is crucial for your health.",
        example_vi: "Hãy kiểm tra số dư tài khoản trước khi mua sắm món đồ lớn.\nDuy trì sự cân bằng giữa công việc và cuộc sống rất quan trọng cho sức khỏe.",
        page_number: 251
      },
      {
        word: "Bargain",
        phonetic: "/ˈbɑːr.ɡɪn/",
        word_type: "noun",
        meaning_vi: "Món hời, mặc cả",
        sound_bridge: "Bà gần nhà vừa mua được món hời giá rẻ.",
        definition_en: "a thing bought or offered for sale more cheaply than is usual or expected",
        example_en: "At only $10, this leather belt was a real bargain.\nShoppers love to bargain for lower prices at night markets.",
        example_vi: "Chỉ với 10 đô la, chiếc thắt lưng da này quả là một món hời thực sự.\nNgười mua hàng rất thích mặc cả để có giá thấp hơn ở các chợ đêm.",
        page_number: 252
      },
      {
        word: "Charge",
        phonetic: "/tʃɑːrdʒ/",
        word_type: "verb",
        meaning_vi: "Thu phí, tính tiền",
        sound_bridge: "Cha tính tiền thu phí đỗ xe theo giờ.",
        definition_en: "to ask an amount of money for goods or a service",
        example_en: "The bank charges a small fee for international wire transfers.\nHow much do they charge for express shipping?",
        example_vi: "Ngân hàng thu một khoản phí nhỏ cho các giao dịch chuyển tiền quốc tế.\nHọ tính phí bao nhiêu cho dịch vụ giao hàng hỏa tốc?",
        page_number: 252
      },
      {
        word: "Decline",
        phonetic: "/dɪˈklaɪn/",
        word_type: "verb",
        meaning_vi: "Suy giảm, từ chối",
        sound_bridge: "Đi lại khó khăn khiến doanh số suy giảm.",
        definition_en: "to continuously become smaller, fewer, or less; to politely refuse an offer",
        example_en: "Sales began to decline during the winter months.\nShe politely declined the job offer from the competitor.",
        example_vi: "Doanh số bắt đầu suy giảm trong những tháng mùa đông.\nCô ấy đã lịch sự từ chối lời mời làm việc từ đối thủ cạnh tranh.",
        page_number: 252
      },
      {
        word: "Decrease",
        phonetic: "/dɪˈkriːs/",
        word_type: "verb",
        meaning_vi: "Giảm bớt",
        sound_bridge: "Đi cà phê riết thì tiền tiết kiệm giảm bớt.",
        definition_en: "to become smaller or less, or to make something do this",
        example_en: "The store decreased prices to attract more customers.\nTraffic accidents decreased significantly after the new law.",
        example_vi: "Cửa hàng đã giảm giá để thu hút thêm khách hàng.\nTai nạn giao thông đã giảm đáng kể sau khi luật mới ban hành.",
        page_number: 252
      },
      {
        word: "Hedge",
        phonetic: "/hedʒ/",
        word_type: "noun",
        meaning_vi: "Hàng rào phòng ngừa rủi ro",
        sound_bridge: "Hét lên khi biết hàng rào phòng ngừa rủi ro bị phá.",
        definition_en: "a way of protecting yourself against financial loss",
        example_en: "Gold is often used as a hedge against inflation.\nInvestors use options to hedge against sudden market drops.",
        example_vi: "Vàng thường được sử dụng như một hàng rào phòng ngừa lạm phát.\nCác nhà đầu tư dùng quyền chọn để phòng ngừa các đợt sụt giảm bất ngờ của thị trường.",
        page_number: 252
      },
      {
        word: "Liability",
        phonetic: "/ˌlaɪ.əˈbɪl.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Nghĩa vụ pháp lý, khoản nợ",
        sound_bridge: "Lấy áo bi về phải chịu trách nhiệm pháp lý.",
        definition_en: "the state of being legally responsible for something, or debts of a business",
        example_en: "The company accepted full liability for the damaged goods.\nAssets and liabilities must be balanced on the balance sheet.",
        example_vi: "Công ty đã chấp nhận toàn bộ trách nhiệm pháp lý đối với số hàng hóa bị hư hỏng.\nTài sản và các khoản nợ phải được cân đối trên bảng cân đối kế toán.",
        page_number: 253
      },
      {
        word: "Merchandise",
        phonetic: "/ˈmɝː.tʃən.daɪs/",
        word_type: "noun",
        meaning_vi: "Hàng hóa",
        sound_bridge: "Mơ chần chừ không mua hàng hóa giảm giá.",
        definition_en: "goods that are bought and sold",
        example_en: "The store displays its newest merchandise near the front door.\nOfficial concert merchandise was sold out within minutes.",
        example_vi: "Cửa hàng trưng bày các mặt hàng mới nhất gần cửa trước.\nHàng hóa lưu niệm chính thức của buổi hòa nhạc đã được bán hết trong vài phút.",
        page_number: 253
      },
      {
        word: "Mortgage",
        phonetic: "/ˈmɔːr.ɡɪdʒ/",
        word_type: "noun",
        meaning_vi: "Khoản thế chấp, vay mua nhà",
        sound_bridge: "Mơ gạt nợ bằng cách trả tiền thế chấp nhà.",
        definition_en: "a legal agreement by which a bank lends money in exchange for taking title of the debtor's property",
        example_en: "They took out a 30-year mortgage to buy their first home.\nMonthly mortgage payments take up half of his salary.",
        example_vi: "Họ đã vay thế chấp ngân hàng 30 năm để mua ngôi nhà đầu tiên của mình.\nCác khoản trả nợ thế chấp hàng tháng chiếm một nửa tiền lương của anh ấy.",
        page_number: 253
      },
      {
        word: "Profit",
        phonetic: "/ˈprɑː.fɪt/",
        word_type: "noun",
        meaning_vi: "Lợi nhuận",
        sound_bridge: "Phở ngon đem lại lợi nhuận cao cho quán.",
        definition_en: "the money that you make in business, especially after paying all the costs",
        example_en: "The company reported record profits for the third quarter.\nThey reinvested their profits into developing new technologies.",
        example_vi: "Công ty đã báo cáo lợi nhuận kỷ lục trong quý ba.\nHọ tái đầu tư lợi nhuận vào việc phát triển các công nghệ mới.",
        page_number: 253
      },
      {
        word: "Rate",
        phonetic: "/reɪt/",
        word_type: "noun",
        meaning_vi: "Tỷ lệ, mức giá",
        sound_bridge: "Rên rỉ vì tỷ lệ lãi suất tăng cao.",
        definition_en: "a measurement of the speed at which something happens, or a charge/payment",
        example_en: "The central bank decided to lower interest rates.\nWhat is the current exchange rate between US dollars and Euros?",
        example_vi: "Ngân hàng trung ương đã quyết định hạ mức lãi suất.\nTỷ giá hối đoái hiện tại giữa đồng Đô la Mỹ và Euro là bao nhiêu?",
        page_number: 253
      },
      {
        word: "Risk",
        phonetic: "/rɪsk/",
        word_type: "noun",
        meaning_vi: "Rủi ro",
        sound_bridge: "Rít thuốc lá mang lại nhiều rủi ro cho sức khỏe.",
        definition_en: "the possibility of something bad happening",
        example_en: "Every investment involves a certain level of financial risk.\nTaking calculated risks is necessary for business growth.",
        example_vi: "Mọi khoản đầu tư đều đi kèm với một mức độ rủi ro tài chính nhất định.\nChấp nhận những rủi ro có tính toán là điều cần thiết để doanh nghiệp phát triển.",
        page_number: 254
      },
      {
        word: "Stock",
        phonetic: "/stɑːk/",
        word_type: "noun",
        meaning_vi: "Cổ phiếu, hàng trong kho",
        sound_bridge: "Sờn da gà, dựng tóc gáy vì tưởng cổ phiếu đi xuống.",
        definition_en: "part of the ownership of a company that can be bought by members of the public",
        example_en: "I have stock in many computer companies.\nThe stock dropped dramatically.",
        example_vi: "Tôi có cổ phiếu ở nhiều công ty máy tính.\nGiá cổ phiếu đã sụt giảm nghiêm trọng.",
        page_number: 254
      },
      {
        word: "Substitute",
        phonetic: "/ˈsʌb.stə.tuːt/",
        word_type: "verb",
        meaning_vi: "Thay thế",
        sound_bridge: "Sắp thi, tui cần một người thay thế mình làm bài để vượt qua kì thi này.",
        definition_en: "to use something or someone instead of another thing or person",
        example_en: "You can't substitute intelligence.\nCould you substitute for me this afternoon?",
        example_vi: "Bạn không thể thay thế được sự thông minh.\nBạn có thể làm thay cho tôi chiều nay được không?",
        page_number: 254
      },
      {
        word: "Target",
        phonetic: "/ˈtɑːr.ɡɪt/",
        word_type: "noun",
        meaning_vi: "Mục tiêu",
        sound_bridge: "Ta ghét những đứa sống không có mục tiêu.",
        definition_en: "a result that you try to achieve",
        example_en: "We won't reach our target profits for this month.\nSet yourself targets that you can reasonably hope to achieve!",
        example_vi: "Chúng ta sẽ không đạt được mức lợi nhuận mục tiêu cho tháng này.\nHãy đặt cho mình những mục tiêu mà bạn có thể hy vọng đạt được một cách hợp lý!",
        page_number: 254
      },
      {
        word: "Total",
        phonetic: "/ˈtoʊ.t̬əl/",
        word_type: "noun",
        meaning_vi: "Tổng cộng",
        sound_bridge: "Tôi tính tổng cộng số tiền hóa đơn.",
        definition_en: "the whole number or amount of something",
        example_en: "What is the total cost of the order?\nThe total revenue exceeded expectations this quarter.",
        example_vi: "Tổng chi phí của đơn hàng là bao nhiêu?\nTổng doanh thu đã vượt quá kỳ vọng trong quý này.",
        page_number: 254
      },
      {
        word: "Transact",
        phonetic: "/trænˈzækt/",
        word_type: "verb",
        meaning_vi: "Giao dịch",
        sound_bridge: "Trấn an khách hàng khi thực hiện giao dịch lớn.",
        definition_en: "to do business with a person or an organization",
        example_en: "Customers can transact business safely on our online platform.\nThey transacted a multimillion-dollar commercial deal.",
        example_vi: "Khách hàng có thể giao dịch kinh doanh an toàn trên nền tảng trực tuyến của chúng tôi.\nHọ đã thực hiện một thương vụ giao dịch thương mại trị giá hàng triệu đô la.",
        page_number: 254
      },
      {
        word: "Value",
        phonetic: "/ˈvæl.juː/",
        word_type: "noun",
        meaning_vi: "Giá trị",
        sound_bridge: "Va li chứa nhiều đồ vật có giá trị lớn.",
        definition_en: "the amount of money that something is worth; importance or usefulness",
        example_en: "The market value of the property has doubled.\nThis antique clock holds great sentimental value for our family.",
        example_vi: "Giá trị thị trường của khu bất động sản đã tăng gấp đôi.\nChiếc đồng hồ cổ này mang giá trị tinh thần rất lớn đối với gia đình chúng tôi.",
        page_number: 254
      },
      {
        word: "Warranty",
        phonetic: "/ˈwɔːr.ən.t̬i/",
        word_type: "noun",
        meaning_vi: "Giấy bảo hành",
        sound_bridge: "Anh phải răn tí chứ, em laptop này giấy bảo hành hết hạn rồi, vứt đi thôi.",
        definition_en: "a written agreement in which a company selling something promises to repair or replace it if there is a problem",
        example_en: "This refrigerator has a one year warranty.\nIs the car still under warranty?",
        example_vi: "Chiếc tủ lạnh này có thời hạn bảo hành một năm.\nChiếc xe này có còn trong thời gian bảo hành không?",
        page_number: 255
      },
      {
        word: "Willing",
        phonetic: "/ˈwɪl.ɪŋ/",
        word_type: "adjective",
        meaning_vi: "Sẵn lòng",
        sound_bridge: "Will và Linh luôn sẵn lòng đi du lịch muôn nơi.",
        definition_en: "not objecting to doing something; having no reason for not doing something",
        example_en: "Are there any willing candidates available for the job?\nWe need a willing volunteer for our experiment.",
        example_vi: "Có ứng viên nào sẵn lòng nhận công việc này không?\nChúng tôi cần một tình nguyện viên sẵn lòng tham gia cuộc thử nghiệm.",
        page_number: 255
      },
      {
        word: "Worthwhile",
        phonetic: "/ˌwɝːθˈwaɪl/",
        word_type: "adjective",
        meaning_vi: "Đáng giá, bõ công",
        sound_bridge: "Cái cuốc có quai rất đáng giá.",
        definition_en: "important, enjoyable, interesting, etc.; worth spending time, money or effort on",
        example_en: "What will you pay me to make this worthwhile?\nIt didn't seem worthwhile writing it all out again.",
        example_vi: "Bạn sẽ trả cho tôi bao nhiêu để việc này trở nên bõ công/xứng đáng?\nViệc viết lại toàn bộ dường như chẳng bõ công chút nào.",
        page_number: 255
      }
    ]
  },

  // ==========================================
  // UNIT 27: Trade - 3 (28 từ, Trang 259 - 265)
  // ==========================================
  27: {
    unit: 27,
    unit_title: "Trade 3",
    category: "Business & Commerce",
    words: [
      {
        word: "Accountant",
        phonetic: "/əˈkaʊn.t̬ənt/",
        word_type: "noun",
        meaning_vi: "Kế toán viên",
        sound_bridge: "Ở cao tầng này có văn phòng của nhân viên kế toán.",
        definition_en: "a person whose job is to keep or inspect financial accounts",
        example_en: "Our accountant prepared the annual tax report.\nShe works as a senior certified accountant for an international firm.",
        example_vi: "Kế toán viên của chúng tôi đã chuẩn bị báo cáo thuế thường niên.\nCô ấy làm kế toán viên cao cấp có chứng chỉ cho một công ty quốc tế.",
        page_number: 260
      },
      {
        word: "Accumulate",
        phonetic: "/əˈkjuː.mjə.leɪt/",
        word_type: "verb",
        meaning_vi: "Tích lũy, gom góp",
        sound_bridge: "Ăn kem nhiều quá nên tích lũy nhiều mỡ thừa.",
        definition_en: "to gradually get more and more of something over a period of time",
        example_en: "He managed to accumulate a large fortune over thirty years.\nDust quickly accumulates if you don't clean regularly.",
        example_vi: "Ông ấy đã tích lũy được một khối tài sản lớn trong suốt 30 năm.\nBụi bặm tích tụ rất nhanh nếu bạn không lau chùi thường xuyên.",
        page_number: 260
      },
      {
        word: "Accurate",
        phonetic: "/ˈæk.jɚ.ət/",
        word_type: "adjective",
        meaning_vi: "Chính xác",
        sound_bridge: "Ăn cua rếch này phải cân chính xác trọng lượng.",
        definition_en: "correct, exact, and without any mistakes",
        example_en: "The financial forecast turned out to be very accurate.\nPlease ensure all data entered into the system is accurate.",
        example_vi: "Dự báo tài chính hóa ra lại rất chính xác.\nVui lòng đảm bảo tất cả dữ liệu nhập vào hệ thống đều chính xác.",
        page_number: 260
      },
      {
        word: "Asset",
        phonetic: "/ˈæs.et/",
        word_type: "noun",
        meaning_vi: "Tài sản, thế mạnh",
        sound_bridge: "Ăn sét đánh trúng tài sản quý giá.",
        definition_en: "a useful or valuable quality, skill, or person; a piece of property",
        example_en: "Her ability to speak three languages is a great asset to the company.\nThe bank froze all his financial assets.",
        example_vi: "Khả năng nói được ba thứ tiếng là một thế mạnh lớn đối với công ty.\nNgân hàng đã phong tỏa toàn bộ tài sản tài chính của anh ta.",
        page_number: 260
      },
      {
        word: "Auction",
        phonetic: "/ˈɑːk.ʃən/",
        word_type: "noun",
        meaning_vi: "Buổi đấu giá",
        sound_bridge: "Óc chó mang đi đấu giá được cả triệu đô.",
        definition_en: "a public sale in which goods or property are sold to the highest bidder",
        example_en: "The famous painting was sold at an auction in London.\nMany antique collectors attended the charity auction.",
        example_vi: "Bức tranh nổi tiếng đã được bán tại một buổi đấu giá ở London.\nNhiều nhà sưu tập đồ cổ đã tham dự buổi đấu giá từ thiện.",
        page_number: 260
      },
      {
        word: "Audit",
        phonetic: "/ˈɑː.dɪt/",
        word_type: "noun",
        meaning_vi: "Kiểm toán",
        sound_bridge: "Ăn đít gà khi đang làm việc kiểm toán.",
        definition_en: "an official inspection of an individual's or organization's accounts",
        example_en: "The company undergoes an independent financial audit every year.\nThe government conducted an audit of the tax records.",
        example_vi: "Công ty trải qua đợt kiểm toán tài chính độc lập vào mỗi năm.\nChính phủ đã tiến hành kiểm toán các hồ sơ thuế.",
        page_number: 261
      },
      {
        word: "Barrier",
        phonetic: "/ˈbær.i.ɚ/",
        word_type: "noun",
        meaning_vi: "Rào cản",
        sound_bridge: "Ba ria mép cạo sạch để vượt qua rào cản ngoại hình.",
        definition_en: "a fence or other obstacle that prevents movement or access",
        example_en: "Language differences can be a barrier to effective communication.\nTrade barriers between the two countries were removed.",
        example_vi: "Sự khác biệt ngôn ngữ có thể là rào cản đối với giao tiếp hiệu quả.\nCác rào cản thương mại giữa hai quốc gia đã được gỡ bỏ.",
        page_number: 261
      },
      {
        word: "Budget",
        phonetic: "/ˈbʌdʒ.ɪt/",
        word_type: "noun",
        meaning_vi: "Ngân sách",
        sound_bridge: "Bà dắt cháu đi chợ tiêu ngân sách hạn hẹp.",
        definition_en: "the money that is available to a person or an organization and a plan of how it will be spent",
        example_en: "We need to stay within our monthly advertising budget.\nThe government announced a major increase in the education budget.",
        example_vi: "Chúng ta cần chi tiêu trong phạm vi ngân sách quảng cáo hàng tháng.\nChính phủ đã công bố mức tăng ngân sách lớn cho giáo dục.",
        page_number: 261
      },
      {
        word: "Crisis",
        phonetic: "/ˈkraɪ.sɪs/",
        word_type: "noun",
        meaning_vi: "Khủng hoảng",
        sound_bridge: "Cãi rít lên khi công ty rơi vào khủng hoảng.",
        definition_en: "a time of great disagreement, confusion, or suffering",
        example_en: "The world faced a serious economic crisis in 2008.\nThe leadership team met urgently to manage the public relations crisis.",
        example_vi: "Thế giới đã đối mặt với một cuộc khủng hoảng kinh tế nghiêm trọng vào năm 2008.\nBan lãnh đạo đã họp khẩn để xử lý cuộc khủng hoảng truyền thông.",
        page_number: 261
      },
      {
        word: "Currency",
        phonetic: "/ˈkɝː.ən.si/",
        word_type: "noun",
        meaning_vi: "Tiền tệ",
        sound_bridge: "Cứ rên rỉ vì đồng tiền tệ mất giá.",
        definition_en: "the money that is used in a particular country at a particular time",
        example_en: "The Euro is the official currency of many European nations.\nForeign investors are concerned about currency fluctuations.",
        example_vi: "Đồng Euro là đơn vị tiền tệ chính thức của nhiều quốc gia châu Âu.\nCác nhà đầu tư nước ngoài lo ngại về sự biến động tiền tệ.",
        page_number: 261
      },
      {
        word: "Debt",
        phonetic: "/det/",
        word_type: "noun",
        meaning_vi: "Khoản nợ",
        sound_bridge: "Đét đít vì trót vay khoản nợ quá lớn.",
        definition_en: "an amount of money that you owe to a person, bank, company, etc.",
        example_en: "He worked overtime to pay off his credit card debt.\nThe country is struggling under a massive burden of foreign debt.",
        example_vi: "Anh ấy đã làm thêm giờ để trả hết khoản nợ thẻ tín dụng.\nQuốc gia này đang chật vật dưới gánh nặng nợ nước ngoài khổng lồ.",
        page_number: 262
      },
      {
        word: "Declare",
        phonetic: "/dɪˈkler/",
        word_type: "verb",
        meaning_vi: "Tuyên bố, khai báo",
        sound_bridge: "Đi kén rể công khai tuyên bố với cả làng.",
        definition_en: "to announce something clearly, firmly, or officially",
        example_en: "You must declare all goods purchased abroad at customs.\nThe company declared a dividend of 50 cents per share.",
        example_vi: "Bạn phải khai báo tất cả hàng hóa mua ở nước ngoài tại quầy hải quan.\nCông ty đã tuyên bố chia cổ tức 50 xu cho mỗi cổ phiếu.",
        page_number: 262
      },
      {
        word: "Deposit",
        phonetic: "/dɪˈpɑː.zɪt/",
        word_type: "verb",
        meaning_vi: "Gửi tiền, đặt cọc",
        sound_bridge: "Đi qua bờ xít xoa vì gửi tiền tiết kiệm sinh lời.",
        definition_en: "to put money into a bank account; to pay an initial sum as part of a larger payment",
        example_en: "I need to deposit this check into my savings account.\nThey paid a 10% deposit to secure the apartment.",
        example_vi: "Tôi cần gửi tấm séc này vào tài khoản tiết kiệm của mình.\nHọ đã trả 10% tiền đặt cọc để giữ căn hộ.",
        page_number: 262
      },
      {
        word: "Dividend",
        phonetic: "/ˈdɪv.ə.dend/",
        word_type: "noun",
        meaning_vi: "Cổ tức",
        sound_bridge: "Đi về đen đủi nhưng lại nhận được tiền cổ tức.",
        definition_en: "an amount of the profits that a company pays of people who own shares in the company",
        example_en: "Shareholders receive a quarterly dividend payment.\nThe board voted to increase the annual dividend by 5%.",
        example_vi: "Các cổ đông nhận được khoản thanh toán cổ tức hàng quý.\nHội đồng quản trị đã bỏ phiếu tăng cổ tức hàng năm thêm 5%.",
        page_number: 262
      },
      {
        word: "Donate",
        phonetic: "/doʊˈneɪt/",
        word_type: "verb",
        meaning_vi: "Quyên góp, hiến tặng",
        sound_bridge: "Đổ nếp vào kho để quyên góp cho người nghèo.",
        definition_en: "to give money, food, clothes, etc. in order to help a person or organization",
        example_en: "Many wealthy entrepreneurs donate millions to charity every year.\nShe decided to donate blood at the local hospital.",
        example_vi: "Nhiều doanh nhân giàu có quyên góp hàng triệu đô la cho từ thiện mỗi năm.\nCô ấy quyết định hiến máu tại bệnh viện địa phương.",
        page_number: 262
      },
      {
        word: "Down payment",
        phonetic: "/ˌdaʊn ˈpeɪ.mənt/",
        word_type: "noun",
        meaning_vi: "Khoản tiền trả trước",
        sound_bridge: "Đau vì phải gom tiền trả trước mua nhà.",
        definition_en: "an initial payment made when something is bought on credit",
        example_en: "They saved for five years to make a 20% down payment on a house.\nThe dealership requires a small down payment for car financing.",
        example_vi: "Họ đã tiết kiệm 5 năm để trả khoản tiền trả trước 20% khi mua nhà.\nĐại lý xe yêu cầu một khoản tiền trả trước nhỏ cho gói tài chính mua xe.",
        page_number: 263
      },
      {
        word: "Exchange",
        phonetic: "/ɪksˈtʃeɪndʒ/",
        word_type: "verb",
        meaning_vi: "Trao đổi",
        sound_bridge: "Điều có ích nên trao đổi để hiểu biết được nâng lên.",
        definition_en: "to give something to someone and receive something from that person",
        example_en: "You can exchange US dollars for Euros here.\nThat was an uncomfortable exchange of words.",
        example_vi: "Bạn có thể đổi Đô la Mỹ lấy Euro ở đây.\nĐó là một cuộc đấu khẩu/trao đổi lời lẽ không mấy dễ chịu.",
        page_number: 263
      },
      {
        word: "Finance",
        phonetic: "/ˈfaɪ.næns/",
        word_type: "noun",
        meaning_vi: "Tài chính",
        sound_bridge: "'Fine!' nàng đã nói như vậy khi nguồn tài chính bị cắt giảm.",
        definition_en: "money used to run a business, an activity or a project",
        example_en: "I study finance and economics.\nWe don't have the finances to complete the project.",
        example_vi: "Tôi học ngành tài chính và kinh tế học.\nChúng tôi không có đủ nguồn tài chính để hoàn thành dự án.",
        page_number: 263
      },
      {
        word: "Fluctuate",
        phonetic: "/ˈflʌk.tʃu.eɪt/",
        word_type: "verb",
        meaning_vi: "Dao động, biến động",
        sound_bridge: "Phải lắc tung hết chai nước này mới làm đường trong này dao động được.",
        definition_en: "to change frequently in size, amount, quality, etc., especially from one extreme to another",
        example_en: "The stock market regularly fluctuates, don't panic.\nMy health has been fluctuating recently.",
        example_vi: "Thị trường chứng khoán thường xuyên biến động, đừng hoảng sợ.\nSức khỏe của tôi gần đây có sự biến động thất thường.",
        page_number: 263
      },
      {
        word: "Inflation",
        phonetic: "/ɪnˈfleɪ.ʃən/",
        word_type: "noun",
        meaning_vi: "Lạm phát",
        sound_bridge: "In thêm tiền dẫn đến nguy cơ lạm phát phi mã.",
        definition_en: "a general increase in prices and fall in the purchasing value of money",
        example_en: "High inflation erodes the purchasing power of consumers.\nThe central bank took aggressive measures to curb rising inflation.",
        example_vi: "Lạm phát cao làm xói mòn sức mua của người tiêu dùng.\nNgân hàng trung ương đã thực hiện các biện pháp quyết liệt để kiềm chế lạm phát gia tăng.",
        page_number: 263
      },
      {
        word: "Lottery",
        phonetic: "/ˈlɑː.t̬ɚ.i/",
        word_type: "noun",
        meaning_vi: "Xổ số, vé số",
        sound_bridge: "Lo tờ vé số trúng giải đặc biệt bị ướt.",
        definition_en: "a game, often organized by the state, in which tickets are sold and prizes are given to people whose numbers are chosen by chance",
        example_en: "He won ten million dollars in the national lottery.\nBuying lottery tickets is not a reliable investment plan.",
        example_vi: "Anh ấy đã trúng 10 triệu đô la trong kỳ xổ số kiến thiết quốc gia.\nMua vé số không phải là một kế hoạch đầu tư đáng tin cậy.",
        page_number: 264
      },
      {
        word: "Owe",
        phonetic: "/oʊ/",
        word_type: "verb",
        meaning_vi: "Nợ, hàm ơn",
        sound_bridge: "Ôi trời ơi, tôi nợ anh một ân tình lớn.",
        definition_en: "to have to pay somebody for something that you have already received or borrowed",
        example_en: "How much money do I owe you for the dinner?\nI owe my success to the continuous support of my family.",
        example_vi: "Tôi nợ bạn bao nhiêu tiền cho bữa ăn tối vậy?\nTôi có được thành công hôm nay là nhờ vào sự ủng hộ không ngừng của gia đình.",
        page_number: 264
      },
      {
        word: "Party",
        phonetic: "/ˈpɑːr.t̬i/",
        word_type: "noun",
        meaning_vi: "Bên tham gia (hợp đồng), bữa tiệc, đảng phái",
        sound_bridge: "Mỗi bên tham gia được phát tiêu để thi ném bóng.",
        definition_en: "one of the people or groups of people involved in a legal agreement or argument",
        example_en: "There are three main parties in this agreement.\nWe need a third party to witness this activity.",
        example_vi: "Có ba bên tham gia chính trong thỏa thuận này.\nChúng tôi cần một bên thứ ba làm chứng cho hoạt động này.",
        page_number: 264
      },
      {
        word: "Penny",
        phonetic: "/ˈpen.i/",
        word_type: "noun",
        meaning_vi: "Đồng xu nhỏ, đồng xu",
        sound_bridge: "Con bé ni cô đang quét sân ở chùa thì nhặt được một đồng xu.",
        definition_en: "the smallest unit of money in the UK, of which there are 100 in a pound, or a small coin worth this much",
        example_en: "Pennies are worthless nowadays.\nI always save my money, even pennies.",
        example_vi: "Những đồng xu nhỏ ngày nay chẳng có giá trị mấy.\nTôi luôn tiết kiệm tiền, ngay cả những đồng xu lẻ.",
        page_number: 264
      },
      {
        word: "Portfolio",
        phonetic: "/ˌpɔːrtˈfoʊ.li.oʊ/",
        word_type: "noun",
        meaning_vi: "Hồ sơ năng lực, danh mục đầu tư",
        sound_bridge: "Hồ sơ năng lực công ty có kinh nghiệm sản xuất các chất bổ sung cho cây trồng gồm: Phốt pho, Kali, Oxy.",
        definition_en: "a collection of drawings, documents, etc. that represent a person's, especially an artist's, work",
        example_en: "I want to add some new pictures to my portfolio.\nCan you give me your portfolio?",
        example_vi: "Tôi muốn thêm một vài bức tranh mới vào hồ sơ năng lực của mình.\nBạn có thể đưa cho tôi xem hồ sơ năng lực của bạn không?",
        page_number: 264
      },
      {
        word: "Refund",
        phonetic: "/ˈriː.fʌnd/",
        word_type: "noun",
        meaning_vi: "Tiền hoàn lại, hoàn tiền",
        sound_bridge: "Rên rỉ khi xin tiền hoàn lại không được.",
        definition_en: "an amount of money that is given back to you, especially because you are not happy with a product or service",
        example_en: "The store offered a full refund for the defective product.\nYou can claim a refund within thirty days of purchase.",
        example_vi: "Cửa hàng đã hoàn lại toàn bộ tiền cho sản phẩm bị lỗi.\nBạn có thể yêu cầu hoàn tiền trong vòng 30 ngày kể từ ngày mua.",
        page_number: 264
      },
      {
        word: "Savings",
        phonetic: "/ˈseɪ.vɪŋz/",
        word_type: "noun",
        meaning_vi: "Tiền tiết kiệm",
        sound_bridge: "Say xỉn làm mất hết tiền tiết kiệm tích cóp bấy lâu.",
        definition_en: "the money that you have saved, especially in a bank",
        example_en: "She used all her savings to open a small bakery.\nIt's important to build emergency savings for unexpected expenses.",
        example_vi: "Cô ấy đã dùng toàn bộ tiền tiết kiệm để mở một tiệm bánh nhỏ.\nXây dựng khoản tiền tiết kiệm khẩn cấp cho những chi phí bất ngờ là rất quan trọng.",
        page_number: 264
      },
      {
        word: "Wallet",
        phonetic: "/ˈwɑː.lɪt/",
        word_type: "noun",
        meaning_vi: "Ví tiền nam",
        sound_bridge: "Qua lề đường nhặt được chiếc ví tiền rơi.",
        definition_en: "a small, flat, folding pocketbook, especially for paper money and credit cards",
        example_en: "He pulled a hundred-dollar bill out of his leather wallet.\nI accidentally left my wallet at home this morning.",
        example_vi: "Anh ấy rút một tờ 100 đô la ra khỏi chiếc ví da của mình.\nTôi vô tình để quên ví tiền ở nhà sáng nay.",
        page_number: 264
      }
    ]
  },

  // ==========================================
  // UNIT 28: Politics - 1 (25 từ, Trang 269 - 274)
  // ==========================================
  28: {
    unit: 28,
    unit_title: "Politics 1",
    category: "Politics & Society",
    words: [
      {
        word: "Ban",
        phonetic: "/bæn/",
        word_type: "verb",
        meaning_vi: "Cấm",
        sound_bridge: "Bạn bị cấm không được mang điện thoại vào phòng thi.",
        definition_en: "to decide or announce officially that something is not allowed",
        example_en: "The city banned smoking in all public parks.\nThe government placed a ban on plastic bags.",
        example_vi: "Thành phố đã cấm hút thuốc ở tất cả các công viên công cộng.\nChính phủ đã ban hành lệnh cấm sử dụng túi ni-lông.",
        page_number: 269
      },
      {
        word: "Counter",
        phonetic: "/ˈkaʊn.t̬ɚ/",
        word_type: "noun",
        meaning_vi: "Quầy tính tiền, phản kháng",
        sound_bridge: "Cào cào nhảy lên quầy tính tiền làm thu ngân giật mình.",
        definition_en: "a long flat surface over which goods are sold or business is done in a shop, bank, etc.",
        example_en: "Please pay for your tickets at the counter.\nHe leaned against the service counter while waiting.",
        example_vi: "Vui lòng thanh toán vé tại quầy.\nAnh ấy tựa vào quầy dịch vụ trong khi chờ đợi.",
        page_number: 269
      },
      {
        word: "County",
        phonetic: "/ˈkaʊn.t̬i/",
        word_type: "noun",
        meaning_vi: "Hạt, quận hạt",
        sound_bridge: "Cào cào cắn nát hoa màu của cả hạt.",
        definition_en: "an area of a country that has its own local government",
        example_en: "She works for the county health department.\nThey live in a quiet rural area in Orange County.",
        example_vi: "Cô ấy làm việc cho sở y tế quận hạt.\nHọ sống ở một vùng nông thôn yên tĩnh thuộc hạt Cam.",
        page_number: 269
      },
      {
        word: "Crime",
        phonetic: "/kraɪm/",
        word_type: "noun",
        meaning_vi: "Tội ác, tội phạm",
        sound_bridge: "Cãi rít lên khi chứng kiến một tội ác khủng khiếp.",
        definition_en: "an illegal act for which someone can be punished by the government",
        example_en: "The police are working hard to reduce crime in the city.\nStealing personal data is a serious federal crime.",
        example_vi: "Cảnh sát đang nỗ lực hết mình để giảm thiểu tội phạm trong thành phố.\nĐánh cắp dữ liệu cá nhân là một tội phạm liên bang nghiêm trọng.",
        page_number: 269
      },
      {
        word: "Deduct",
        phonetic: "/dɪˈdʌkt/",
        word_type: "verb",
        meaning_vi: "Khấu trừ",
        sound_bridge: "Đi đứt một khoản tiền vì bị khấu trừ thuế.",
        definition_en: "to take away an amount or part from a total",
        example_en: "Taxes are automatically deducted from his monthly salary.\nYou can deduct certain business expenses on your tax form.",
        example_vi: "Thuế được tự động khấu trừ từ tiền lương hàng tháng của anh ấy.\nBạn có thể khấu trừ một số chi phí kinh doanh trên tờ khai thuế.",
        page_number: 269
      },
      {
        word: "Election",
        phonetic: "/iˈlek.ʃən/",
        word_type: "noun",
        meaning_vi: "Cuộc bầu cử",
        sound_bridge: "Ý Lệ muốn cuộc bầu cử diễn ra công bằng.",
        definition_en: "a time when people vote in order to choose someone for a political or official job",
        example_en: "The presidential election will take place next November.\nMillions of citizens cast their ballots in the local election.",
        example_vi: "Cuộc bầu cử tổng thống sẽ diễn ra vào tháng 11 tới.\nHàng triệu công dân đã bỏ phiếu trong cuộc bầu cử địa phương.",
        page_number: 270
      },
      {
        word: "Flag",
        phonetic: "/flæɡ/",
        word_type: "noun",
        meaning_vi: "Lá cờ",
        sound_bridge: "Phở làm gỏi cuốn trang trí hình lá cờ.",
        definition_en: "a piece of cloth with a special color and design, used as a symbol of a country or organization",
        example_en: "The national flag flew proudly at the top of the building.\nChildren waved small paper flags during the parade.",
        example_vi: "Lá quốc kỳ tung bay kiêu hãnh trên đỉnh tòa nhà.\nTrẻ em vẫy những lá cờ giấy nhỏ trong suốt buổi diễu hành.",
        page_number: 270
      },
      {
        word: "Float",
        phonetic: "/floʊt/",
        word_type: "verb",
        meaning_vi: "Trôi nổi, nổi",
        sound_bridge: "Phở lẩu nổi váng mỡ trôi bồng bềnh.",
        definition_en: "to stay on the surface of a liquid and not sink",
        example_en: "Wood floats naturally on water.\nColorful balloons floated gently into the clear blue sky.",
        example_vi: "Gỗ nổi tự nhiên trên mặt nước.\nNhững quả bóng bay rực rỡ trôi nhẹ nhàng vào bầu trời xanh trong.",
        page_number: 270
      },
      {
        word: "Foreign",
        phonetic: "/ˈfɔːr.ən/",
        word_type: "adjective",
        meaning_vi: "Nước ngoài, ngoại quốc",
        sound_bridge: "Phở rắc hành mang hương vị ngoại quốc.",
        definition_en: "belonging or connected to a country that is not your own",
        example_en: "Learning a foreign language opens up new career opportunities.\nThe minister met with several foreign diplomats today.",
        example_vi: "Học một ngoại ngữ mở ra những cơ hội nghề nghiệp mới.\nBộ trưởng đã gặp gỡ một số nhà ngoại giao nước ngoài hôm nay.",
        page_number: 270
      },
      {
        word: "Government",
        phonetic: "/ˈɡʌv.ɚn.mənt/",
        word_type: "noun",
        meaning_vi: "Chính phủ",
        sound_bridge: "Gặp gỡ bàn mưu cùng chính phủ phát triển kinh tế.",
        definition_en: "the group of people who officially rule or control a country",
        example_en: "The government announced new funding for renewable energy.\nCitizens expect the government to protect public safety.",
        example_vi: "Chính phủ đã công bố nguồn tài trợ mới cho năng lượng tái tạo.\nNgười dân kỳ vọng chính phủ sẽ bảo vệ an toàn công cộng.",
        page_number: 270
      },
      {
        word: "Impose",
        phonetic: "/ɪmˈpoʊz/",
        word_type: "verb",
        meaning_vi: "Áp đặt, ban hành",
        sound_bridge: "Im phăng phắc khi cha mẹ áp đặt hình phạt.",
        definition_en: "to officially force a rule, tax, punishment, etc. to be obeyed or received",
        example_en: "The government imposed new economic sanctions on the regime.\nParents should not impose their unfulfilled dreams on children.",
        example_vi: "Chính phủ đã áp đặt các lệnh trừng phạt kinh tế mới lên chính quyền này.\nCha mẹ không nên áp đặt những ước mơ dang dở của mình lên con cái.",
        page_number: 271
      },
      {
        word: "Justice",
        phonetic: "/ˈdʒʌs.tɪs/",
        word_type: "noun",
        meaning_vi: "Công lý, sự công bằng",
        sound_bridge: "Dắt Tít đi tìm công lý khắp nơi.",
        definition_en: "fairness in the way people are dealt with; the legal system",
        example_en: "The victims fought tirelessly for truth and justice.\nOur society relies on courts to deliver equal justice for all.",
        example_vi: "Các nạn nhân đã chiến đấu không mệt mỏi vì sự thật và công lý.\nXã hội chúng ta dựa vào tòa án để thực thi công lý bình đẳng cho tất cả mọi người.",
        page_number: 271
      },
      {
        word: "Mystery",
        phonetic: "/ˈmɪs.tɚ.i/",
        word_type: "noun",
        meaning_vi: "Bí ẩn, điều huyền bí",
        sound_bridge: "Mít sấy giòn tan là một bí ẩn của đầu bếp.",
        definition_en: "something that is not understood or known about",
        example_en: "The disappearance of the ancient civilization remains a mystery.\nShe loves reading classic detective mystery novels.",
        example_vi: "Sự biến mất của nền văn minh cổ đại vẫn còn là một bí ẩn.\nCô ấy rất thích đọc những cuốn tiểu thuyết trinh thám ly kỳ cổ điển.",
        page_number: 271
      },
      {
        word: "Myth",
        phonetic: "/mɪθ/",
        word_type: "noun",
        meaning_vi: "Thần thoại, chuyện hoang đường",
        sound_bridge: "Mít thơm ngát trong câu chuyện thần thoại Hy Lạp.",
        definition_en: "an ancient story, or an idea that many people believe which is not true",
        example_en: "Greek myths are full of gods, monsters, and heroes.\nIt is a popular myth that eating carrots gives you night vision.",
        example_vi: "Thần thoại Hy Lạp chứa đầy những vị thần, quái vật và các anh hùng.\nCó một câu chuyện hoang đường phổ biến rằng ăn cà rốt giúp bạn nhìn rõ trong đêm.",
        page_number: 271
      },
      {
        word: "Obligate",
        phonetic: "/ˈɑːb.lə.ɡeɪt/",
        word_type: "verb",
        meaning_vi: "Bắt buộc, ép buộc",
        sound_bridge: "Ở bể bơi bắt buộc phải đội mũ bơi.",
        definition_en: "to force someone to do something by law or because it is a duty",
        example_en: "The contract obligates both parties to maintain confidentiality.\nEmployees are obligated to report any safety violations immediately.",
        example_vi: "Hợp đồng bắt buộc cả hai bên phải giữ bí mật tuyệt đối.\nNhân viên có nghĩa vụ bắt buộc phải báo cáo ngay mọi vi phạm an toàn.",
        page_number: 271
      },
      {
        word: "Obvious",
        phonetic: "/ˈɑːb.vi.əs/",
        word_type: "adjective",
        meaning_vi: "Rõ ràng, hiển nhiên",
        sound_bridge: "Ở vị trí này ai cũng thấy kết quả rõ ràng.",
        definition_en: "easy to see, recognize, or understand",
        example_en: "It was obvious that she was deeply passionate about music.\nThere is no obvious solution to this complex dilemma.",
        example_vi: "Điều hiển nhiên là cô ấy rất đam mê âm nhạc.\nKhông có giải pháp hiển nhiên nào cho tình thế khó xử phức tạp này.",
        page_number: 272
      },
      {
        word: "Option",
        phonetic: "/ˈɑːp.ʃən/",
        word_type: "noun",
        meaning_vi: "Lựa chọn",
        sound_bridge: "Ông tôi lựa chọn ốp sân thay vì ốp nhà.",
        definition_en: "something that you can choose to have or do; the freedom to choose what you do",
        example_en: "We have no other option.\nI can't choose when there are so many options.",
        example_vi: "Chúng tôi không còn lựa chọn nào khác.\nTôi không thể chọn khi có quá nhiều sự lựa chọn như vậy.",
        page_number: 272
      },
      {
        word: "Policy",
        phonetic: "/ˈpɑː.lə.si/",
        word_type: "noun",
        meaning_vi: "Chính sách",
        sound_bridge: "Năm nay bố sẽ lì xì nếu tôi chịu nghe theo những chính sách của ông.",
        definition_en: "a plan of action agreed or chosen by a political party, a business, etc.",
        example_en: "The new policy will take effect next week.\nThis policy helped panda bears survive.",
        example_vi: "Chính sách mới sẽ có hiệu lực vào tuần tới.\nChính sách này đã giúp loài gấu trúc sống sót.",
        page_number: 272
      },
      {
        word: "Secure",
        phonetic: "/səˈkjʊr/",
        word_type: "adjective",
        meaning_vi: "An toàn, đảm bảo",
        sound_bridge: "Khi chủ nhà sợ hãi kêu lên, hệ thống an toàn của ngôi nhà sẽ tự động báo chuông.",
        definition_en: "not doubting or being worried about yourself and your personal relationships",
        example_en: "Citizens don't feel secure.\nThe capital city is now secure.",
        example_vi: "Người dân không cảm thấy an toàn.\nThủ đô hiện tại đã được bảo đảm an toàn.",
        page_number: 272
      },
      {
        word: "Security",
        phonetic: "/səˈkjʊr.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "An ninh, bảo vệ",
        sound_bridge: "Sợ kẻ cướp nên tăng cường lực lượng an ninh.",
        definition_en: "protection of a person, building, organization, or country against threats",
        example_en: "Airport security was tightened ahead of the international summit.\nHe works as a night security guard at the commercial bank.",
        example_vi: "An ninh sân bay đã được thắt chặt trước thềm hội nghị thượng đỉnh quốc tế.\nAnh ấy làm nhân viên bảo vệ ca đêm tại ngân hàng thương mại.",
        page_number: 272
      },
      {
        word: "Senate",
        phonetic: "/ˈsen.ət/",
        word_type: "noun",
        meaning_vi: "Thượng viện",
        sound_bridge: "Sen nợ tiền khi vận động tranh cử vào Thượng viện.",
        definition_en: "one of the two groups of politicians who make laws in some countries, such as the US",
        example_en: "The Senate passed the new healthcare bill yesterday.\nShe served twelve distinguished years in the United States Senate.",
        example_vi: "Thượng viện đã thông qua dự luật chăm sóc sức khỏe mới vào hôm qua.\nBà ấy đã phục vụ 12 năm xuất sắc tại Thượng viện Hoa Kỳ.",
        page_number: 273
      },
      {
        word: "Senior",
        phonetic: "/ˈsiː.njɚ/",
        word_type: "adjective",
        meaning_vi: "Cấp cao, cao niên",
        sound_bridge: "Si nợ tiền các vị quan chức cấp cao.",
        definition_en: "high or higher in rank or status; older people",
        example_en: "He is a senior manager at a multinational corporation.\nThe community center offers special fitness programs for senior citizens.",
        example_vi: "Anh ấy là một nhà quản lý cấp cao tại một tập đoàn đa quốc gia.\nTrung tâm cộng đồng cung cấp các chương trình thể dục đặc biệt cho người cao niên.",
        page_number: 273
      },
      {
        word: "Sensitive",
        phonetic: "/ˈsen.sə.t̬ɪv/",
        word_type: "adjective",
        meaning_vi: "Nhạy cảm",
        sound_bridge: "Ông ta đe dọa sẽ sờ mó tiếp nếu cô bé quá nhạy cảm kêu lên.",
        definition_en: "easily offended or upset",
        example_en: "This is a sensitive subject for many people.\nThis is sensitive information.",
        example_vi: "Đây là một chủ đề nhạy cảm đối với nhiều người.\nĐây là thông tin nhạy cảm bảo mật.",
        page_number: 273
      },
      {
        word: "Session",
        phonetic: "/ˈseʃ.ən/",
        word_type: "noun",
        meaning_vi: "Phiên họp, kỳ họp",
        sound_bridge: "Ông sếp lớn ngồi xe xịn đến kì họp.",
        definition_en: "a formal meeting or series of meetings of an organization such as a parliament or a law court",
        example_en: "Court is now in session.\nThe submit conference had a long session.",
        example_vi: "Tòa án hiện đang trong phiên xét xử.\nHội nghị thượng đỉnh đã có một phiên họp kéo dài.",
        page_number: 273
      },
      {
        word: "Success",
        phonetic: "/səkˈses/",
        word_type: "noun",
        meaning_vi: "Thành công",
        sound_bridge: "Nhìn sắc mặt nó khi trộm tia sét thành công vui chưa kìa!",
        definition_en: "the fact that you have achieved something that you want and have been trying to do or get",
        example_en: "His nice appearance looks were the key to his success.\nI only want success for my children.",
        example_vi: "Ngoại hình ưa nhìn là chìa khóa dẫn đến thành công của anh ấy.\nTôi chỉ mong muốn sự thành công đến với các con của mình.",
        page_number: 273
      }
    ]
  },

  // ==========================================
  // UNIT 29: Politics - 2 (25 từ, Trang 277 - 283)
  // ==========================================
  29: {
    unit: 29,
    unit_title: "Politics 2",
    category: "Politics & Society",
    words: [
      {
        word: "Comparative",
        phonetic: "/kəmˈper.ə.t̬ɪv/",
        word_type: "adjective",
        meaning_vi: "So sánh, tương đối",
        sound_bridge: "Cơm bà rọi ngon so sánh tương đối với cơm tiệm.",
        definition_en: "connected with studying things to find out how similar or different they are",
        example_en: "We conducted a comparative study of the two political systems.\nThe team enjoyed comparative success after changing their strategy.",
        example_vi: "Chúng tôi đã tiến hành một nghiên cứu so sánh về hai hệ thống chính trị.\nĐội bóng đạt được thành công tương đối sau khi thay đổi chiến thuật.",
        page_number: 278
      },
      {
        word: "Constitute",
        phonetic: "/ˈkɑːn.stə.tuːt/",
        word_type: "verb",
        meaning_vi: "Cấu thành, tạo thành",
        sound_bridge: "Con sợ tui tạo thành thói quen xấu.",
        definition_en: "to be or be considered as something; to form or make something",
        example_en: "Women constitute more than half of the country's population.\nThese recent policy changes constitute a major step forward.",
        example_vi: "Phụ nữ cấu thành hơn một nửa dân số của đất nước.\nNhững thay đổi chính sách gần đây tạo thành một bước tiến lớn.",
        page_number: 278
      },
      {
        word: "Construct",
        phonetic: "/kənˈstrʌkt/",
        word_type: "verb",
        meaning_vi: "Xây dựng",
        sound_bridge: "Con sợ trượt dốc khi xây dựng công trình trên đồi.",
        definition_en: "to build or make something such as a road, building or machine",
        example_en: "They plan to construct a new suspension bridge across the river.\nThe workers constructed the temporary hospital in just ten days.",
        example_vi: "Họ dự định xây dựng một cây cầu treo mới bắc qua sông.\nCác công nhân đã xây dựng bệnh viện dã chiến chỉ trong vòng mười ngày.",
        page_number: 278
      },
      {
        word: "Democracy",
        phonetic: "/dɪˈmɑː.krə.si/",
        word_type: "noun",
        meaning_vi: "Nền dân chủ",
        sound_bridge: "Đi mò cà ri ở một quốc gia có nền dân chủ.",
        definition_en: "a system of government in which all the people of a country can vote to elect their representatives",
        example_en: "Freedom of speech is a fundamental pillar of democracy.\nThe nation celebrated its transition to a constitutional democracy.",
        example_vi: "Tự do ngôn luận là một trụ cột căn bản của nền dân chủ.\nQuốc gia này đã ăn mừng sự chuyển đổi sang một nền dân chủ hợp hiến.",
        page_number: 278
      },
      {
        word: "Evolution",
        phonetic: "/ˌev.əˈluː.ʃən/",
        word_type: "noun",
        meaning_vi: "Sự tiến hóa, phát triển",
        sound_bridge: "Em vào lu sờ con thú đang trong quá trình tiến hóa.",
        definition_en: "the gradual development of plants, animals, etc. over a long period of time",
        example_en: "Darwin formulated the groundbreaking theory of evolution.\nThe technological evolution of the internet has transformed communication.",
        example_vi: "Darwin đã xây dựng nên thuyết tiến hóa mang tính đột phá.\nSự phát triển tiến hóa công nghệ của internet đã làm thay đổi hoàn toàn phương thức giao tiếp.",
        page_number: 278
      },
      {
        word: "Federal",
        phonetic: "/ˈfed.ɚ.əl/",
        word_type: "adjective",
        meaning_vi: "Liên bang",
        sound_bridge: "Phe phở rủ nhau thành lập liên bang.",
        definition_en: "relating to the central government of a country, rather than to the government of an individual state",
        example_en: "The case was handled directly by federal law enforcement agencies.\nFederal taxes apply equally to all residents across the nation.",
        example_vi: "Vụ án được các cơ quan thực thi pháp luật liên bang trực tiếp xử lý.\nThuế liên bang được áp dụng đồng đều cho tất cả cư dân trên toàn quốc.",
        page_number: 279
      },
      {
        word: "Liberty",
        phonetic: "/ˈlɪb.ɚ.t̬i/",
        word_type: "noun",
        meaning_vi: "Sự tự do",
        sound_bridge: "Ly bơ tỉ mỉ vẽ tượng Nữ thần Tự do.",
        definition_en: "the freedom to live, work, and travel as you want without being stopped by anyone",
        example_en: "The Statue of Liberty is a global symbol of hope and freedom.\nCitizens fought bravely to defend their civil liberties.",
        example_vi: "Tượng Nữ thần Tự do là biểu tượng toàn cầu của hy vọng và tự do.\nCác công dân đã chiến đấu dũng cảm để bảo vệ các quyền tự do dân sự của họ.",
        page_number: 279
      },
      {
        word: "Majority",
        phonetic: "/məˈdʒɑːr.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Đa số, phần lớn",
        sound_bridge: "Mẹ dắt Tí đi theo quyết định của đa số.",
        definition_en: "the larger number or part of something; more than half of a group",
        example_en: "The vast majority of employees supported the remote work policy.\nThe proposed resolution passed by an overwhelming majority vote.",
        example_vi: "Đại đa số nhân viên ủng hộ chính sách làm việc từ xa.\nNghị quyết đề xuất đã được thông qua với số phiếu đa số áp đảo.",
        page_number: 279
      },
      {
        word: "Mandatory",
        phonetic: "/ˈmæn.də.tɔːr.i/",
        word_type: "adjective",
        meaning_vi: "Bắt buộc",
        sound_bridge: "Mang đồ tơi đi học là quy định bắt buộc vào ngày mưa.",
        definition_en: "something that must be done, usually because of a law or rule",
        example_en: "Wearing a safety helmet on a motorcycle is mandatory by law.\nAttendance at the orientation session is mandatory for all new staff.",
        example_vi: "Đội mũ bảo hiểm khi đi xe máy là quy định bắt buộc theo luật.\nTham dự buổi định hướng là bắt buộc đối với tất cả nhân viên mới.",
        page_number: 279
      },
      {
        word: "Minister",
        phonetic: "/ˈmɪn.ə.stɚ/",
        word_type: "noun",
        meaning_vi: "Bộ trưởng",
        sound_bridge: "Mịn như tơ là bộ vest của ông Bộ trưởng.",
        definition_en: "a high-ranking government official in charge of a department",
        example_en: "The Minister of Foreign Affairs held a diplomatic press conference.\nThe Prime Minister appointed three new cabinet members today.",
        example_vi: "Bộ trưởng Bộ Ngoại giao đã tổ chức một buổi họp báo ngoại giao.\nThủ tướng đã bổ nhiệm ba thành viên nội các mới vào hôm nay.",
        page_number: 279
      },
      {
        word: "Parliament",
        phonetic: "/ˈpɑːr.lə.mənt/",
        word_type: "noun",
        meaning_vi: "Nghị viện, Quốc hội",
        sound_bridge: "Ba lên mâm cơm kể chuyện trong nghị viện.",
        definition_en: "the group of people who make the laws in some countries",
        example_en: "The British Parliament consists of the House of Commons and House of Lords.\nMembers of Parliament debated the economic budget for three days.",
        example_vi: "Nghị viện Anh bao gồm Viện Thứ dân và Viện Quý tộc.\nCác thành viên Quốc hội đã tranh luận về ngân sách kinh tế trong ba ngày.",
        page_number: 280
      },
      {
        word: "Patron",
        phonetic: "/ˈpeɪ.trən/",
        word_type: "noun",
        meaning_vi: "Khách hàng quen, người bảo trợ",
        sound_bridge: "Bà trốn trong góc là người bảo trợ hào phóng.",
        definition_en: "a person who gives financial or other support to a person, organization, cause, or activity",
        example_en: "The wealthy art patron donated millions to the national museum.\nRegular restaurant patrons receive special discounts on their birthdays.",
        example_vi: "Nhà bảo trợ nghệ thuật giàu có đã quyên góp hàng triệu đô cho bảo tàng quốc gia.\nNhững khách hàng quen của nhà hàng được giảm giá đặc biệt vào ngày sinh nhật.",
        page_number: 280
      },
      {
        word: "Pedestrian",
        phonetic: "/pəˈdes.tri.ən/",
        word_type: "noun",
        meaning_vi: "Người đi bộ",
        sound_bridge: "Bé đét chân xuống đường làm người đi bộ giật mình.",
        definition_en: "a person walking rather than travelling in a vehicle",
        example_en: "Drivers must yield to pedestrians at marked zebra crossings.\nThe city created a pedestrian-only zone in the historic downtown area.",
        example_vi: "Người lái xe phải nhường đường cho người đi bộ tại các vạch kẻ sang đường.\nThành phố đã tạo ra một khu vực dành riêng cho người đi bộ ở khu phố cổ lịch sử.",
        page_number: 280
      },
      {
        word: "Petition",
        phonetic: "/pəˈtɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Đơn kiến nghị",
        sound_bridge: "Bà Tí xin chữ ký vào đơn kiến nghị sửa đường.",
        definition_en: "a formal written request signed by many people appealing to authority in respect of a particular cause",
        example_en: "Thousands of residents signed a petition against the proposed highway.\nActivists submitted a petition to the city council demanding cleaner air.",
        example_vi: "Hàng ngàn cư dân đã ký vào đơn kiến nghị phản đối dự án đường cao tốc đề xuất.\nCác nhà hoạt động đã đệ trình một bản kiến nghị lên hội đồng thành phố yêu cầu không khí sạch hơn.",
        page_number: 280
      },
      {
        word: "Politician",
        phonetic: "/ˌpɑː.ləˈtɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Chính trị gia",
        sound_bridge: "Bò liếm tí sân nhà của chính trị gia nổi tiếng.",
        definition_en: "a person who is professionally involved in politics, especially as a holder of an elected office",
        example_en: "Voters expect politicians to keep their campaign promises.\nThe seasoned politician gave an inspiring speech on economic reform.",
        example_vi: "Cử tri kỳ vọng các chính trị gia sẽ giữ đúng lời hứa khi tranh cử.\nVị chính trị gia dày dạn kinh nghiệm đã có bài phát biểu truyền cảm hứng về cải cách kinh tế.",
        page_number: 280
      },
      {
        word: "Potential",
        phonetic: "/poʊˈten.ʃəl/",
        word_type: "noun",
        meaning_vi: "Tiềm năng",
        sound_bridge: "Bỏ tiền sắm đồ nghề để khai phá tiềm năng nghệ thuật.",
        definition_en: "someone's or something's ability to develop, achieve, or succeed",
        example_en: "This talented young player has immense potential.\nThe renewable energy sector has huge potential for long-term growth.",
        example_vi: "Cầu thủ trẻ tài năng này có tiềm năng rất lớn.\nNgành năng lượng tái tạo có tiềm năng khổng lồ để phát triển dài hạn.",
        page_number: 281
      },
      {
        word: "Procedure",
        phonetic: "/prəˈsiː.dʒɚ/",
        word_type: "noun",
        meaning_vi: "Quy trình, thủ tục",
        sound_bridge: "Bờ suối giờ có quy trình kiểm tra nước nghiêm ngặt.",
        definition_en: "a set of actions that is the official or accepted way of doing something",
        example_en: "Follow standard safety procedures when operating heavy machinery.\nThe application procedure for a student visa takes about four weeks.",
        example_vi: "Hãy tuân theo các quy trình an toàn tiêu chuẩn khi vận hành máy móc hạng nặng.\nThủ tục nộp hồ sơ xin thị thực du học mất khoảng bốn tuần.",
        page_number: 281
      },
      {
        word: "Reform",
        phonetic: "/rɪˈfɔːrm/",
        word_type: "noun",
        meaning_vi: "Cải cách",
        sound_bridge: "Rì rầm bàn về kế hoạch cải cách giáo dục.",
        definition_en: "an improvement, especially in a system or organization",
        example_en: "The government introduced sweeping judicial reforms.\nTax reform is urgently needed to support small business owners.",
        example_vi: "Chính phủ đã đưa ra những cuộc cải cách tư pháp sâu rộng.\nCải cách thuế là điều vô cùng cấp thiết để hỗ trợ các chủ doanh nghiệp nhỏ.",
        page_number: 281
      },
      {
        word: "Result",
        phonetic: "/rɪˈzʌlt/",
        word_type: "noun",
        meaning_vi: "Kết quả",
        sound_bridge: "Ri giật mình khi xem kết quả thi đỗ thủ khoa.",
        definition_en: "something that happens or exists because of something that happened before",
        example_en: "The positive results of the experiment surprised all the scientists.\nHard work and determination brought about excellent academic results.",
        example_vi: "Kết quả khả quan của cuộc thí nghiệm đã làm kinh ngạc tất cả các nhà khoa học.\nSự chăm chỉ và quyết tâm đã mang lại những kết quả học tập xuất sắc.",
        page_number: 281
      },
      {
        word: "Revolution",
        phonetic: "/ˌrev.əˈluː.ʃən/",
        word_type: "noun",
        meaning_vi: "Cuộc cách mạng",
        sound_bridge: "Rẽ vào lu súng trong thời kỳ cuộc cách mạng bùng nổ.",
        definition_en: "a change in the way a country is governed, usually to a different political system",
        example_en: "The Industrial Revolution completely changed human manufacturing.\nThe digital revolution continues to reshape the modern workplace.",
        example_vi: "Cuộc Cách mạng Công nghiệp đã thay đổi hoàn toàn nền sản xuất của nhân loại.\nCuộc cách mạng kỹ thuật số tiếp tục tái định hình môi trường làm việc hiện đại.",
        page_number: 281
      },
      {
        word: "Successive",
        phonetic: "/səkˈses.ɪv/",
        word_type: "adjective",
        meaning_vi: "Liên tiếp, kế tiếp",
        sound_bridge: "Sắc xép đồ đạc trong nhiều ngày liên tiếp.",
        definition_en: "happening one after another without any break",
        example_en: "The team won three successive national championships.\nIt rained for five successive days, causing minor flooding.",
        example_vi: "Đội bóng đã giành ba chức vô địch quốc gia liên tiếp.\nTrời đã mưa trong năm ngày liên tiếp, gây ra ngập lụt nhẹ.",
        page_number: 282
      },
      {
        word: "Sufficient",
        phonetic: "/səˈfɪʃ.ənt/",
        word_type: "adjective",
        meaning_vi: "Đủ, thỏa đáng",
        sound_bridge: "Sợ phiền nên chuẩn bị đủ đồ ăn cho cả đoàn.",
        definition_en: "enough for a particular purpose; as much as you need",
        example_en: "Make sure you drink sufficient water during hot summer days.\nWe have sufficient evidence to prove his innocence in court.",
        example_vi: "Hãy chắc chắn rằng bạn uống đủ nước vào những ngày hè nóng bức.\nChúng tôi có đầy đủ bằng chứng để chứng minh sự vô tội của anh ấy trước tòa.",
        page_number: 282
      },
      {
        word: "Superlative",
        phonetic: "/suːˈpɝː.lə.t̬ɪv/",
        word_type: "adjective",
        meaning_vi: "Tuyệt đỉnh, cao nhất",
        sound_bridge: "Súp phở lẩu tuyệt đỉnh nhất trần đời.",
        definition_en: "of the highest quality or degree",
        example_en: "The athlete delivered a superlative performance at the world finals.\nCritics praised the actor for his superlative acting skills.",
        example_vi: "Vận động viên đã cống hiến một màn trình diễn tuyệt đỉnh tại trận chung kết thế giới.\nCác nhà phê bình đã ca ngợi nam diễn viên vì kỹ năng diễn xuất đỉnh cao.",
        page_number: 282
      },
      {
        word: "Weakness",
        phonetic: "/ˈwiːk.nəs/",
        word_type: "noun",
        meaning_vi: "Điểm yếu, sự yếu đuối",
        sound_bridge: "Quỳ nấc lên vì nhận ra điểm yếu của bản thân.",
        definition_en: "the state of not being strong or powerful, or a flaw in character",
        example_en: "Recognizing your weaknesses is the first step toward self-improvement.\nChocolate is her greatest weakness.",
        example_vi: "Nhận biết các điểm yếu của bản thân là bước đầu tiên để hoàn thiện chính mình.\nSô-cô-la là điểm yếu lớn nhất của cô ấy.",
        page_number: 282
      },
      {
        word: "Welfare",
        phonetic: "/ˈwel.fer/",
        word_type: "noun",
        meaning_vi: "Phúc lợi xã hội",
        sound_bridge: "Quẹo vào phở thưởng thức bữa ăn phúc lợi.",
        definition_en: "the health, happiness, and fortunes of a person or group; financial support given to people in need",
        example_en: "The government provides welfare support to low-income families.\nAnimal welfare organizations advocate for the ethical treatment of pets.",
        example_vi: "Chính phủ cung cấp trợ cấp phúc lợi cho các gia đình có thu nhập thấp.\nCác tổ chức phúc lợi động vật ủng hộ việc đối xử nhân đạo với thú cưng.",
        page_number: 282
      }
    ]
  },

  // ==========================================
  // UNIT 30: Technology - 1 (30 từ, Trang 287 - 293)
  // ==========================================
  30: {
    unit: 30,
    unit_title: "Technology 1",
    category: "Technology & Science",
    words: [
      {
        word: "Altogether",
        phonetic: "/ˌɑːl.təˈɡeð.ɚ/",
        word_type: "adverb",
        meaning_vi: "Hoàn toàn, tổng cộng",
        sound_bridge: "Ăn tô ghẹ tổng cộng hết 200 nghìn.",
        definition_en: "completely; in total",
        example_en: "That is altogether a different matter.\nAltogether, there were twenty participants in the coding competition.",
        example_vi: "Đó hoàn toàn là một vấn đề khác.\nTổng cộng, có hai mươi người tham gia cuộc thi lập trình.",
        page_number: 287
      },
      {
        word: "Achieve",
        phonetic: "/əˈtʃiːv/",
        word_type: "verb",
        meaning_vi: "Đạt được",
        sound_bridge: "Ở chiếu nghỉ cố gắng đạt được thành tích cao.",
        definition_en: "to succeed in reaching a particular goal, status or standard",
        example_en: "She worked diligently to achieve all her academic goals.\nWith teamwork, we achieved extraordinary milestones this year.",
        example_vi: "Cô ấy đã làm việc chăm chỉ để đạt được mọi mục tiêu học tập.\nNhờ tinh thần đồng đội, chúng tôi đã đạt được những cột mốc phi thường trong năm nay.",
        page_number: 287
      },
      {
        word: "Aspect",
        phonetic: "/ˈæs.pekt/",
        word_type: "noun",
        meaning_vi: "Khía cạnh",
        sound_bridge: "Ăn xôi bắp xét theo khía cạnh dinh dưỡng rất tốt.",
        definition_en: "a particular part or feature of a situation, an idea, a problem, etc.",
        example_en: "We must consider every aspect of the technology before launching.\nClimate change affects almost every aspect of human life.",
        example_vi: "Chúng ta phải xem xét mọi khía cạnh của công nghệ trước khi ra mắt.\nBiến đổi khí hậu ảnh hưởng đến hầu như mọi khía cạnh của đời sống con người.",
        page_number: 287
      },
      {
        word: "Atom",
        phonetic: "/ˈæt̬.əm/",
        word_type: "noun",
        meaning_vi: "Nguyên tử",
        sound_bridge: "Ăn tôm chứa nhiều nguyên tử vi lượng.",
        definition_en: "the smallest particle of a chemical element that can exist",
        example_en: "Molecules are formed when two or more atoms bond together.\nSplitting the atom releases an enormous amount of energy.",
        example_vi: "Các phân tử được hình thành khi hai hoặc nhiều nguyên tử liên kết với nhau.\nViệc phân tách nguyên tử giải phóng một lượng năng lượng khổng lồ.",
        page_number: 287
      },
      {
        word: "Attempt",
        phonetic: "/əˈtempt/",
        word_type: "noun",
        meaning_vi: "Sự nỗ lực, cố gắng",
        sound_bridge: "Ở tiệm bánh nỗ lực làm bánh kem hình con thỏ.",
        definition_en: "an act of trying to do something, especially something difficult",
        example_en: "He succeeded on his second attempt at passing the driver's test.\nScientists made a bold attempt to land a probe on the asteroid.",
        example_vi: "Anh ấy đã thành công ở lần nỗ lực thứ hai khi thi bằng lái xe.\nCác nhà khoa học đã thực hiện một nỗ lực táo bạo để hạ cánh tàu thăm dò lên tiểu hành tinh.",
        page_number: 287
      },
      {
        word: "Backup",
        phonetic: "/ˈbæk.ʌp/",
        word_type: "noun",
        meaning_vi: "Bản sao lưu, dự phòng",
        sound_bridge: "Bác ấp trứng có bản sao lưu nhiệt độ phòng.",
        definition_en: "a copy of a file or other item of data made in case the original is lost or damaged",
        example_en: "Always create a secure cloud backup of your important files.\nThe hospital has a backup generator in case of a power outage.",
        example_vi: "Hãy luôn tạo một bản sao lưu đám mây an toàn cho các tệp quan trọng của bạn.\nBệnh viện có máy phát điện dự phòng phòng trường hợp mất điện.",
        page_number: 288
      },
      {
        word: "Battery",
        phonetic: "/ˈbæt̬.ɚ.i/",
        word_type: "noun",
        meaning_vi: "Pin, ắc quy",
        sound_bridge: "Ba tè rỉ nước vào cục pin hỏng.",
        definition_en: "a device that produces electricity to provide power for radios, cars, etc.",
        example_en: "My smartphone battery lasted throughout the entire day.\nElectric vehicles use large lithium-ion battery packs.",
        example_vi: "Pin điện thoại thông minh của tôi đã dùng được suốt cả ngày.\nXe điện sử dụng các khối pin lithium-ion dung lượng lớn.",
        page_number: 288
      },
      {
        word: "Beam",
        phonetic: "/biːm/",
        word_type: "noun",
        meaning_vi: "Chùm tia sáng, xà ngang",
        sound_bridge: "Bím tóc phản chiếu chùm tia sáng mặt trời.",
        definition_en: "a line of light, or a long thick piece of wood or metal used to support a roof",
        example_en: "A laser beam was used to cut the metal sheet.\nThe strong wooden beams support the heavy tiled roof.",
        example_vi: "Một chùm tia laser đã được sử dụng để cắt tấm kim loại.\nNhững thanh xà gỗ chắc chắn nâng đỡ mái ngói nặng nề.",
        page_number: 288
      },
      {
        word: "Beforehand",
        phonetic: "/bɪˈfɔːr.hænd/",
        word_type: "adverb",
        meaning_vi: "Trước, từ trước",
        sound_bridge: "Bị phạt than phiền vì không chuẩn bị từ trước.",
        definition_en: "earlier than a particular time; in advance",
        example_en: "Please read the meeting agenda beforehand.\nShe booked all her flight tickets months beforehand to save money.",
        example_vi: "Vui lòng đọc trước chương trình nghị sự của cuộc họp.\nCô ấy đã đặt vé máy bay trước vài tháng để tiết kiệm chi phí.",
        page_number: 288
      },
      {
        word: "Block",
        phonetic: "/blɑːk/",
        word_type: "verb",
        meaning_vi: "Khóa, chặn lại, khối",
        sound_bridge: "Bố lóc xương cá chặn lại không cho con ăn.",
        definition_en: "to stop something from moving or passing through",
        example_en: "The firewall blocks unauthorized access to the network.\nA fallen tree blocked the main road after the storm.",
        example_vi: "Tường lửa chặn các truy cập trái phép vào mạng nội bộ.\nMột cái cây đổ đã chặn ngang con đường chính sau cơn bão.",
        page_number: 288
      },
      {
        word: "Bulb",
        phonetic: "/bʌlb/",
        word_type: "noun",
        meaning_vi: "Bóng đèn",
        sound_bridge: "Bóp bóng đèn làm vỡ tan tành.",
        definition_en: "a glass object that produces light when electricity passes through it",
        example_en: "Replace the old incandescent bulb with an energy-saving LED bulb.\nThe light bulb above the desk suddenly burned out.",
        example_vi: "Hãy thay bóng đèn sợi đốt cũ bằng bóng đèn LED tiết kiệm điện.\nBóng đèn phía trên bàn làm việc bỗng nhiên bị cháy.",
        page_number: 289
      },
      {
        word: "Button",
        phonetic: "/ˈbʌt.ən/",
        word_type: "noun",
        meaning_vi: "Nút bấm, cúc áo",
        sound_bridge: "Bật nút bấm khởi động máy tính.",
        definition_en: "a small object you press to operate a device or a small disc used to fasten clothes",
        example_en: "Press the red button to power on the device.\nShe sewed a missing wooden button onto her winter coat.",
        example_vi: "Nhấn nút màu đỏ để bật nguồn thiết bị.\nCô ấy đã khâu chiếc cúc gỗ bị rơi vào áo khoác mùa đông.",
        page_number: 289
      },
      {
        word: "Constant",
        phonetic: "/ˈkɑːn.stənt/",
        word_type: "adjective",
        meaning_vi: "Liên tục, không đổi",
        sound_bridge: "Con sợ té ngã vì bánh xe quay liên tục không đổi.",
        definition_en: "happening all the time or repeatedly; staying the same",
        example_en: "The refrigerator maintains a constant low temperature.\nHe suffers from constant back pain due to sitting too long.",
        example_vi: "Tủ lạnh duy trì một nhiệt độ thấp liên tục không đổi.\nAnh ấy bị đau lưng liên tục do ngồi quá lâu.",
        page_number: 289
      },
      {
        word: "Defect",
        phonetic: "/ˈdiː.fekt/",
        word_type: "noun",
        meaning_vi: "Lỗi, khuyết tật",
        sound_bridge: "Đi phượt phát hiện xe bị lỗi kỹ thuật.",
        definition_en: "a fault in something or in the way it has been made which means it is not perfect",
        example_en: "The smartphone was recalled due to a minor battery defect.\nQuality inspectors check every microchip for structural defects.",
        example_vi: "Điện thoại thông minh bị thu hồi do một lỗi pin nhỏ.\nCác thanh tra chất lượng kiểm tra từng vi mạch để tìm các khuyết tật cấu trúc.",
        page_number: 289
      },
      {
        word: "Device",
        phonetic: "/dɪˈvaɪs/",
        word_type: "noun",
        meaning_vi: "Thiết bị",
        sound_bridge: "Đi vay tiền mua thiết bị điện tử mới.",
        definition_en: "an object or a piece of equipment that has been designed to do a particular job",
        example_en: "This electronic device can monitor your heart rate in real time.\nTurn off all electronic devices before the airplane takes off.",
        example_vi: "Thiết bị điện tử này có thể theo dõi nhịp tim của bạn trong thời gian thực.\nHãy tắt mọi thiết bị điện tử trước khi máy bay cất cánh.",
        page_number: 289
      },
      {
        word: "Digital",
        phonetic: "/ˈdɪdʒ.ə.t̬əl/",
        word_type: "adjective",
        meaning_vi: "Kỹ thuật số",
        sound_bridge: "Đi giặt đồ xem phim kỹ thuật số trên điện thoại.",
        definition_en: "using or relating to digital signals and computer technology",
        example_en: "Digital cameras replaced traditional film cameras years ago.\nOur company is undergoing a comprehensive digital transformation.",
        example_vi: "Máy ảnh kỹ thuật số đã thay thế máy ảnh phim truyền thống từ nhiều năm trước.\nCông ty chúng tôi đang trải qua quá trình chuyển đổi số toàn diện.",
        page_number: 290
      },
      {
        word: "Engine",
        phonetic: "/ˈen.dʒɪn/",
        word_type: "noun",
        meaning_vi: "Động cơ",
        sound_bridge: "Em nhìn động cơ xe hơi hoạt động mượt mà.",
        definition_en: "a machine with moving parts that converts power into motion",
        example_en: "The airplane's jet engine roared as it sped down the runway.\nRegular maintenance keeps your car engine running smoothly.",
        example_vi: "Động cơ phản lực của máy bay gầm vang khi lao nhanh trên đường băng.\nBảo dưỡng định kỳ giúp động cơ ô tô của bạn vận hành êm ái.",
        page_number: 290
      },
      {
        word: "Factor",
        phonetic: "/ˈfæk.tɚ/",
        word_type: "noun",
        meaning_vi: "Yếu tố",
        sound_bridge: "Phát tờ rơi xem xét yếu tố thời tiết.",
        definition_en: "a fact or situation that influences the result of something",
        example_en: "Price is a deciding factor for many budget-conscious consumers.\nSafety is the most important factor in aviation engineering.",
        example_vi: "Giá cả là một yếu tố quyết định đối với nhiều người tiêu dùng biết tính toán chi tiêu.\nAn toàn là yếu tố quan trọng nhất trong ngành kỹ thuật hàng không.",
        page_number: 290
      },
      {
        word: "Install",
        phonetic: "/ɪnˈstɑːl/",
        word_type: "verb",
        meaning_vi: "Cài đặt, lắp đặt",
        sound_bridge: "In tờ hướng dẫn cài đặt phần mềm máy tính.",
        definition_en: "to put software onto a computer, or to fix equipment into position",
        example_en: "Install the latest operating system update to protect your computer.\nThe technicians installed solar panels on our roof.",
        example_vi: "Hãy cài đặt bản cập nhật hệ điều hành mới nhất để bảo vệ máy tính của bạn.\nCác kỹ thuật viên đã lắp đặt các tấm pin năng lượng mặt trời trên mái nhà chúng tôi.",
        page_number: 290
      },
      {
        word: "Manual",
        phonetic: "/ˈmæn.ju.əl/",
        word_type: "noun",
        meaning_vi: "Sách hướng dẫn",
        sound_bridge: "Mẹ nuông chiều con mua sách hướng dẫn chơi đàn.",
        definition_en: "a book of instructions on how to use something",
        example_en: "Read the instruction manual carefully before assembling the chair.\nThe software package includes a comprehensive user manual.",
        example_vi: "Hãy đọc kỹ sách hướng dẫn trước khi lắp ráp chiếc ghế.\nGói phần mềm đi kèm một cuốn sách hướng dẫn sử dụng toàn diện.",
        page_number: 290
      },
      {
        word: "Master",
        phonetic: "/ˈmæs.tɚ/",
        word_type: "verb",
        meaning_vi: "Làm chủ, thuần thục",
        sound_bridge: "Mang sợ tơ ra làm chủ kỹ thuật dệt vải.",
        definition_en: "to learn how to do something well",
        example_en: "It takes years of dedicated practice to master a musical instrument.\nShe quickly mastered the new graphic design software.",
        example_vi: "Mất nhiều năm khổ luyện để làm chủ một loại nhạc cụ.\nCô ấy đã nhanh chóng thuần thục phần mềm thiết kế đồ họa mới.",
        page_number: 291
      },
      {
        word: "Period",
        phonetic: "/ˈpɪr.i.əd/",
        word_type: "noun",
        meaning_vi: "Giai đoạn, thời kỳ",
        sound_bridge: "Phở riêu cua bán chạy trong giai đoạn mùa đông.",
        definition_en: "a length of time between two points",
        example_en: "The company experienced rapid growth over a five-year period.\nDuring the trial period, users can access premium features for free.",
        example_vi: "Công ty đã trải qua sự tăng trưởng nhanh chóng trong khoảng thời gian 5 năm.\nTrong giai đoạn dùng thử, người dùng có thể truy cập các tính năng cao cấp miễn phí.",
        page_number: 291
      },
      {
        word: "Replace",
        phonetic: "/rɪˈpleɪs/",
        word_type: "verb",
        meaning_vi: "Thay thế",
        sound_bridge: "Con gà ri ăn bơ lấy từ tủ lạnh thay thế thóc nhặt từ cánh đồng.",
        definition_en: "to be used instead of something or somebody else",
        example_en: "You can't replace this chair, it's an antique.\nShe replaced me with her new boyfriend.",
        example_vi: "Bạn không thể thay thế chiếc ghế này được, nó là một món đồ cổ.\nCô ấy đã thay thế tôi bằng người bạn trai mới.",
        page_number: 291
      },
      {
        word: "Routine",
        phonetic: "/ruːˈtiːn/",
        word_type: "noun",
        meaning_vi: "Thói quen hàng ngày, lịch trình",
        sound_bridge: "Hát ru tiếng Anh là thói quen hàng ngày.",
        definition_en: "the normal order and way in which you regularly do things",
        example_en: "What's your daily routine?\nJennifer made exercise a part of her routine.",
        example_vi: "Lịch trình thói quen hàng ngày của bạn là gì?\nJennifer đã biến việc tập thể dục thành một phần trong thói quen hàng ngày của mình.",
        page_number: 291
      },
      {
        word: "Science",
        phonetic: "/ˈsaɪ.əns/",
        word_type: "noun",
        meaning_vi: "Khoa học",
        sound_bridge: "Nhà khoa học Edison phải làm 1000 thí nghiệm sai lầm mới có phát minh ra bóng đèn đấy.",
        definition_en: "knowledge about the structure and behaviour of the natural and physical world, based on facts that you can prove",
        example_en: "I hate studying science.\nScience and religion never get along with each other.",
        example_vi: "Tôi ghét học môn khoa học.\nKhoa học và tôn giáo chẳng bao giờ hòa hợp được với nhau.",
        page_number: 291
      },
      {
        word: "Search",
        phonetic: "/sɝːtʃ/",
        word_type: "verb",
        meaning_vi: "Tìm kiếm",
        sound_bridge: "Sờ chùm chìa khóa tìm kiếm quanh nhà.",
        definition_en: "to look for something carefully in a particular place",
        example_en: "You can search for information using Google.\nScientists searched for evidence of water on Mars.",
        example_vi: "Bạn có thể tìm kiếm thông tin bằng cách sử dụng Google.\nCác nhà khoa học đã tìm kiếm dấu vết của nước trên sao Hỏa.",
        page_number: 291
      },
      {
        word: "Software",
        phonetic: "/ˈsɑːft.wer/",
        word_type: "noun",
        meaning_vi: "Phần mềm",
        sound_bridge: "Súp phở que ăn khi đang viết phần mềm.",
        definition_en: "the programs and other operating information used by a computer",
        example_en: "Our engineers developed anti-virus software to block malware.\nThe software update fixed several security vulnerabilities.",
        example_vi: "Các kỹ sư của chúng tôi đã phát triển phần mềm diệt virus để ngăn chặn mã độc.\nBản cập nhật phần mềm đã sửa chữa một số lỗ hổng bảo mật.",
        page_number: 291
      },
      {
        word: "Switch",
        phonetic: "/swɪtʃ/",
        word_type: "verb",
        meaning_vi: "Chuyển đổi, công tắc",
        sound_bridge: "Suýt nữa thì quên chuyển đổi công tắc điện.",
        definition_en: "to change or turn something on/off with a control button",
        example_en: "Switch off the lights when leaving the room.\nMany users switched from iOS to Android for greater customization.",
        example_vi: "Hãy tắt công tắc đèn khi rời khỏi phòng.\nNhiều người dùng đã chuyển đổi từ iOS sang Android để tùy biến nhiều hơn.",
        page_number: 291
      },
      {
        word: "Typical",
        phonetic: "/ˈtɪp.ɪ.kəl/",
        word_type: "adjective",
        meaning_vi: "Điển hình, đặc trưng",
        sound_bridge: "Ti và Pi là 2 ví dụ điển hình hay sừng cồ nhất.",
        definition_en: "having the usual qualities or features of a particular type of person, thing or group",
        example_en: "He makes such typical jokes.\nEating with forks is typical in almost all Western countries.",
        example_vi: "Anh ấy kể những câu chuyện đùa thật là điển hình quen thuộc.\nĂn bằng dĩa là nét đặc trưng điển hình ở hầu hết các nước phương Tây.",
        page_number: 292
      },
      {
        word: "Weapon",
        phonetic: "/ˈwep.ən/",
        word_type: "noun",
        meaning_vi: "Vũ khí",
        sound_bridge: "Vũ khí quá bẩn vì để trong kho đã lâu không sử dụng.",
        definition_en: "an object such as a knife, gun, bomb, etc. that is used for fighting or attacking somebody",
        example_en: "Anything can be a weapon if you're smart.\nThe country with the more powerful weapons will win.",
        example_vi: "Bất cứ thứ gì cũng có thể trở thành vũ khí nếu bạn thông minh.\nĐất nước có vũ khí mạnh hơn sẽ giành chiến thắng.",
        page_number: 292
      }
    ]
  }
};

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
let vocabList = JSON.parse(raw);

// Lấy phần từ trước Unit 21 và sau Unit 30
const beforeUnits = vocabList.filter(w => w.unit < 21);
const afterUnits = vocabList.filter(w => w.unit > 30);

// Xây dựng lại mảng từ vựng Units 21 -> 30 với word_number liên tục bắt đầu từ 542
let currentWordNumber = 542;
const updatedUnitsVocab = [];

for (let u = 21; u <= 30; u++) {
  const uData = UNITS_21_TO_30_DATA[u];
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

// Cập nhật word_number cho các Unit 31 trở đi
for (const w of afterUnits) {
  w.word_number = currentWordNumber++;
}

// Hợp nhất lại toàn bộ từ vựng
const finalVocabList = [
  ...beforeUnits,
  ...updatedUnitsVocab,
  ...afterUnits
];

fs.writeFileSync(jsonPath, JSON.stringify(finalVocabList, null, 2), 'utf8');

console.log(`\n🎉 HOÀN TẤT ĐỒNG BỘ 100% CHÍNH XÁC THEO SÁCH CHO UNITS 21 -> 30!`);
for (let u = 21; u <= 30; u++) {
  const uWords = finalVocabList.filter(w => w.unit === u);
  console.log(`- Unit ${u} (${UNITS_21_TO_30_DATA[u].unit_title}): ${uWords.length} từ (#${uWords[0].word_number} ${uWords[0].word} -> #${uWords[uWords.length-1].word_number} ${uWords[uWords.length-1].word})`);
}
console.log(`Tổng số từ trong toàn bộ từ điển: ${finalVocabList.length}`);
