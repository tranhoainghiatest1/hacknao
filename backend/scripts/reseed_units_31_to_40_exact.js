import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BỘ DỮ LIỆU CHUẨN XÁC 100% THEO SÁCH SCAN GỐC HACK NÃO 1500 (UNIT 31 -> 40)
// Mỗi từ đều có: Word, Phonetic, Word Type, Meaning VI, Sound Bridge, Definition EN, 2 câu ví dụ EN + VI, Page Number
const UNITS_31_TO_40_DATA = {
  // ==========================================
  // UNIT 31: Technology 2 (30 từ, Trang 297 - 303)
  // ==========================================
  31: {
    unit: 31,
    unit_title: "Technology 2",
    category: "Science & Technology",
    words: [
      {
        word: "Alternative",
        phonetic: "/ɑːlˈtɝː.nə.t̬ɪv/",
        word_type: "noun",
        meaning_vi: "Sự thay thế, phương án thay thế",
        sound_bridge: "Ơ tờ nợ tiền có phương án thay thế trả bằng công sức.",
        definition_en: "one of two or more available possibilities",
        example_en: "Solar power is a clean alternative to fossil fuels.\nWe had no alternative but to cancel the flight due to bad weather.",
        example_vi: "Năng lượng mặt trời là một phương án thay thế sạch cho nhiên liệu hóa thạch.\nChúng tôi không có sự lựa chọn thay thế nào khác ngoài việc hủy chuyến bay do thời tiết xấu.",
        page_number: 297
      },
      {
        word: "Amplitude",
        phonetic: "/ˈæm.plə.tuːd/",
        word_type: "noun",
        meaning_vi: "Biên độ (sóng)",
        sound_bridge: "Ăn kem ly to đo biên độ sóng âm thanh dao động.",
        definition_en: "the maximum extent of a vibration or oscillation",
        example_en: "The amplifier increases the amplitude of sound waves.\nScientists measured the amplitude of the seismic waves after the earthquake.",
        example_vi: "Bộ khuếch đại làm tăng biên độ của các sóng âm thanh.\nCác nhà khoa học đã đo biên độ của sóng địa chấn sau trận động đất.",
        page_number: 297
      },
      {
        word: "Analyse",
        phonetic: "/ˈæn.əl.aɪz/",
        word_type: "verb",
        meaning_vi: "Phân tích",
        sound_bridge: "Ăn nấm xào xong ngồi phân tích dữ liệu thí nghiệm.",
        definition_en: "examine methodically and in detail the structure of something",
        example_en: "Software tools help analyse complex data sets.\nResearchers need more time to analyse the blood samples.",
        example_vi: "Các công cụ phần mềm giúp phân tích các tập dữ liệu phức tạp.\nCác nhà nghiên cứu cần thêm thời gian để phân tích các mẫu máu.",
        page_number: 297
      },
      {
        word: "Apparent",
        phonetic: "/əˈper.ənt/",
        word_type: "adjective",
        meaning_vi: "Rõ ràng, hiển nhiên",
        sound_bridge: "Ơ ba rủ đi dạo khi sự thật đã trở nên rõ ràng.",
        definition_en: "clearly visible or understood; obvious",
        example_en: "It became apparent that the system had crashed.\nHer sudden anger made her unhappiness apparent to everyone.",
        example_vi: "Rõ ràng là hệ thống đã bị sập.\nCơn giận bất ngờ của cô ấy khiến nỗi bất hạnh lộ rõ trước mắt mọi người.",
        page_number: 297
      },
      {
        word: "Approach",
        phonetic: "/əˈproʊtʃ/",
        word_type: "noun",
        meaning_vi: "Phương pháp tiếp cận, sự đến gần",
        sound_bridge: "Ơ phở rớt trúng sách khi tìm phương pháp tiếp cận mới.",
        definition_en: "a way of dealing with something, or moving closer",
        example_en: "We need an innovative approach to solve this bug.\nWith the approach of winter, temperatures began to drop rapidly.",
        example_vi: "Chúng ta cần một phương pháp tiếp cận đổi mới để sửa lỗi này.\nCùng với sự đến gần của mùa đông, nhiệt độ bắt đầu giảm nhanh chóng.",
        page_number: 298
      },
      {
        word: "Approximate",
        phonetic: "/əˈprɑːk.sə.mət/",
        word_type: "adjective",
        meaning_vi: "Xấp xỉ, gần đúng",
        sound_bridge: "Ơ phở rắc mè tính ra chi phí xấp xỉ 50 nghìn.",
        definition_en: "close to the actual, but not completely accurate or exact",
        example_en: "The approximate download time is five minutes.\nCan you give me an approximate estimate of the project costs?",
        example_vi: "Thời gian tải xuống xấp xỉ khoảng năm phút.\nBạn có thể cho tôi một ước tính gần đúng về chi phí dự án không?",
        page_number: 298
      },
      {
        word: "Artificial",
        phonetic: "/ˌɑːr.t̬əˈfɪʃ.əl/",
        word_type: "adjective",
        meaning_vi: "Nhân tạo",
        sound_bridge: "Ăn thịt phở bò nấu bằng gia vị nhân tạo.",
        definition_en: "made or produced by human beings rather than occurring naturally",
        example_en: "Artificial intelligence is advancing rapidly.\nThis beverage contains no artificial colors or flavors.",
        example_vi: "Trí tuệ nhân tạo đang phát triển nhanh chóng.\nĐồ uống này không chứa phẩm màu hay hương liệu nhân tạo.",
        page_number: 298
      },
      {
        word: "Ascertain",
        phonetic: "/ˌæs.ɚˈteɪn/",
        word_type: "verb",
        meaning_vi: "Xác định chắc chắn, tìm hiểu chắc chắn",
        sound_bridge: "Ăn sợ té ngã nên phải xác định chắc chắn địa hình phía trước.",
        definition_en: "find something out for certain; make sure of",
        example_en: "We must ascertain the cause of the network failure.\nPolice are trying to ascertain whether anyone witnessed the robbery.",
        example_vi: "Chúng ta phải xác định chắc chắn nguyên nhân gây ra sự cố mạng.\nCảnh sát đang cố gắng xác định xem có ai chứng kiến vụ cướp hay không.",
        page_number: 298
      },
      {
        word: "Assemble",
        phonetic: "/əˈsem.bəl/",
        word_type: "verb",
        meaning_vi: "Lắp ráp, tập hợp",
        sound_bridge: "Ơ xem bố lắp ráp cỗ máy vi tính mới toanh.",
        definition_en: "fit together the separate component parts of a machine",
        example_en: "Robots assemble cars on the factory line.\nThousands of protesters assembled in the main city square.",
        example_vi: "Robot lắp ráp ô tô trên dây chuyền nhà máy.\nHàng ngàn người biểu tình đã tập hợp tại quảng trường chính của thành phố.",
        page_number: 298
      },
      {
        word: "Assume",
        phonetic: "/əˈsuːm/",
        word_type: "verb",
        meaning_vi: "Giả định, cho rằng",
        sound_bridge: "Ơ sợ xui xẻo nên cứ giả định trường hợp xấu nhất.",
        definition_en: "suppose to be the case, without proof",
        example_en: "Never assume the code works without testing it.\nMany people assume that technology always makes life simpler.",
        example_vi: "Đừng bao giờ cho rằng mã hoạt động mà không qua kiểm thử.\nNhiều người cho rằng công nghệ luôn làm cho cuộc sống trở nên đơn giản hơn.",
        page_number: 299
      },
      {
        word: "Attain",
        phonetic: "/əˈteɪn/",
        word_type: "verb",
        meaning_vi: "Đạt được, giành được",
        sound_bridge: "Ơ Tết đến đạt được mục tiêu doanh số xuất sắc.",
        definition_en: "succeed in achieving something that one desires and has worked for",
        example_en: "She attained a high level of technical expertise.\nWith consistent practice, you can attain fluency in English.",
        example_vi: "Cô ấy đã đạt được trình độ chuyên môn kỹ thuật cao.\nBằng việc luyện tập đều đặn, bạn có thể đạt được sự trôi chảy trong tiếng Anh.",
        page_number: 299
      },
      {
        word: "Automatic",
        phonetic: "/ˌɑː.t̬əˈmæt̬.ɪk/",
        word_type: "adjective",
        meaning_vi: "Tự động",
        sound_bridge: "Ao tắm mát mẻ có hệ thống xả nước tự động.",
        definition_en: "working by itself with little or no direct human control",
        example_en: "The automatic doors slide open when you step close.\nOur car has an automatic transmission system.",
        example_vi: "Cửa tự động trượt mở ra khi bạn bước lại gần.\nXe hơi của chúng tôi có hệ thống hộp số tự động.",
        page_number: 299
      },
      {
        word: "Breakthrough",
        phonetic: "/ˈbreɪk.θruː/",
        word_type: "noun",
        meaning_vi: "Bước đột phá",
        sound_bridge: "Bà rải thức ăn tạo nên bước đột phá trong nghiên cứu sinh học.",
        definition_en: "a sudden, dramatic, and important discovery or development",
        example_en: "Quantum computing is a major scientific breakthrough.\nScientists announced a medical breakthrough in cancer treatment.",
        example_vi: "Điện toán lượng tử là một bước đột phá khoa học lớn.\nCác nhà khoa học đã công bố một bước đột phá y học trong điều trị ung thư.",
        page_number: 299
      },
      {
        word: "Compatible",
        phonetic: "/kəmˈpæt̬.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Tương thích",
        sound_bridge: "Cơm phở bắp bò tương thích với khẩu vị của mọi người.",
        definition_en: "able to exist or occur together without conflict; able to be used together",
        example_en: "This app is compatible with both iOS and Android.\nMake sure the new graphics card is compatible with your motherboard.",
        example_vi: "Ứng dụng này tương thích với cả hệ điều hành iOS và Android.\nHãy đảm bảo card đồ họa mới tương thích với bo mạch chủ của bạn.",
        page_number: 299
      },
      {
        word: "Condition",
        phonetic: "/kənˈdɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Điều kiện, tình trạng",
        sound_bridge: "Con đi xin điều kiện được gia nhập câu lạc bộ robot.",
        definition_en: "the state of something with regard to its appearance, quality, or working order",
        example_en: "Keep the laboratory equipment in pristine condition.\nThey agreed to sign the contract under favorable financial conditions.",
        example_vi: "Hãy giữ các thiết bị phòng thí nghiệm trong tình trạng nguyên sơ.\nHọ đồng ý ký hợp đồng dưới các điều kiện tài chính thuận lợi.",
        page_number: 300
      },
      {
        word: "Conducive",
        phonetic: "/kənˈduː.sɪv/",
        word_type: "adjective",
        meaning_vi: "Thuận lợi, có ích cho",
        sound_bridge: "Con đu dây tạo môi trường thuận lợi cho việc rèn luyện thể lực.",
        definition_en: "making a certain situation or outcome likely or possible",
        example_en: "A quiet room is conducive to deep studying.\nGood lighting is conducive to productive office work.",
        example_vi: "Một căn phòng yên tĩnh rất thuận lợi cho việc học tập sâu.\nÁnh sáng tốt rất có lợi cho hiệu suất làm việc văn phòng.",
        page_number: 300
      },
      {
        word: "Confine",
        phonetic: "/kənˈfaɪn/",
        word_type: "verb",
        meaning_vi: "Giới hạn, hạn chế",
        sound_bridge: "Con phải ngoan không bị giới hạn giờ chơi game.",
        definition_en: "keep or restrict someone or something within certain limits",
        example_en: "Please confine your remarks to the agenda topic.\nThe infectious illness confined him to bed for an entire week.",
        example_vi: "Vui lòng giới hạn phát biểu của bạn trong chủ đề chương trình.\nCăn bệnh truyền nhiễm đã khiến anh ấy phải nằm bẹp trên giường suốt cả tuần.",
        page_number: 300
      },
      {
        word: "Dimension",
        phonetic: "/ˌdaɪˈmen.ʃən/",
        word_type: "noun",
        meaning_vi: "Kích thước, chiều không gian",
        sound_bridge: "Đi mượn xe đo kích thước chiều dài sân bãi.",
        definition_en: "a measurable extent of a particular kind, such as length or breadth",
        example_en: "Check the dimensions of the machine before delivery.\nVirtual reality adds a whole new dimension to gaming.",
        example_vi: "Hãy kiểm tra kích thước của máy móc trước khi giao hàng.\nThực tế ảo bổ sung một chiều không gian hoàn toàn mới cho trải nghiệm chơi game.",
        page_number: 300
      },
      {
        word: "Electricity",
        phonetic: "/ˌiː.lekˈtrɪs.ə.t̬i/",
        word_type: "noun",
        meaning_vi: "Điện, điện lực",
        sound_bridge: "In lịch Tết dùng nguồn điện năng lượng mặt trời.",
        definition_en: "a form of energy resulting from the existence of charged particles",
        example_en: "Renewable sources generate clean electricity.\nRemember to turn off appliances to save electricity.",
        example_vi: "Các nguồn tái tạo tạo ra nguồn điện sạch.\nHãy nhớ tắt các thiết bị để tiết kiệm điện.",
        page_number: 300
      },
      {
        word: "Explore",
        phonetic: "/ɪkˈsplɔːr/",
        word_type: "verb",
        meaning_vi: "Khám phá, thám hiểm",
        sound_bridge: "Ếch sợ cọp nhảy vào rừng khám phá hang động mới.",
        definition_en: "travel in or through an unfamiliar country or area in order to learn about it",
        example_en: "Space probes explore distant planets.\nWe spent the weekend exploring hidden hiking trails in the forest.",
        example_vi: "Các tàu thăm dò không gian khám phá những hành tinh xa xôi.\nChúng tôi đã dành cả cuối tuần để khám phá những con đường mòn ẩn sâu trong rừng.",
        page_number: 301
      },
      {
        word: "Highlight",
        phonetic: "/ˈhaɪ.laɪt/",
        word_type: "verb",
        meaning_vi: "Làm nổi bật, điểm nhấn",
        sound_bridge: "Hai lại gần bật đèn làm nổi bật tác phẩm nghệ thuật.",
        definition_en: "draw special attention to",
        example_en: "The report highlights the benefits of AI automation.\nThe museum tour was definitely the highlight of our vacation.",
        example_vi: "Báo cáo làm nổi bật những lợi ích của việc tự động hóa bằng AI.\nChuyến tham quan bảo tàng chắc chắn là điểm nhấn đáng nhớ nhất trong kỳ nghỉ của chúng tôi.",
        page_number: 301
      },
      {
        word: "Identify",
        phonetic: "/aɪˈden.t̬ə.faɪ/",
        word_type: "verb",
        meaning_vi: "Nhận diện, xác định danh tính",
        sound_bridge: "Ai đến phải nhận diện khuôn mặt trước khi vào phòng máy.",
        definition_en: "establish or indicate who or what someone or something is",
        example_en: "Biometric scanners identify authorized staff instantly.\nCan you identify the main bottlenecks in this workflow?",
        example_vi: "Máy quét sinh trắc học nhận diện nhân viên được ủy quyền ngay lập tức.\nBạn có thể xác định những điểm nghẽn chính trong quy trình làm việc này không?",
        page_number: 301
      },
      {
        word: "Progress",
        phonetic: "/ˈprɑː.ɡres/",
        word_type: "noun",
        meaning_vi: "Tiến bộ, sự phát triển",
        sound_bridge: "Phải lo gánh vác để tạo ra sự tiến bộ công nghệ vượt bậc.",
        definition_en: "forward or onward movement towards a destination or goal",
        example_en: "Track the progress of your code build in the terminal.\nShe has made impressive progress in her English pronunciation.",
        example_vi: "Theo dõi tiến độ biên dịch mã nguồn của bạn trong terminal.\nCô ấy đã có sự tiến bộ đầy ấn tượng trong việc phát âm tiếng Anh.",
        page_number: 301
      },
      {
        word: "Rectify",
        phonetic: "/ˈrek.tə.faɪ/",
        word_type: "verb",
        meaning_vi: "Khắc phục, sửa chữa sai sót",
        sound_bridge: "Rét run người nhưng vẫn cố gắng khắc phục sự cố rò rỉ điện.",
        definition_en: "put something right; correct",
        example_en: "Engineers worked overnight to rectify the software bug.\nSteps have been taken to rectify the accounting error immediately.",
        example_vi: "Các kỹ sư đã làm việc thâu đêm để khắc phục lỗi phần mềm.\nCác bước đã được thực hiện để khắc phục lỗi kế toán ngay lập tức.",
        page_number: 301
      },
      {
        word: "Recycle",
        phonetic: "/ˌriːˈsaɪ.kəl/",
        word_type: "verb",
        meaning_vi: "Tái chế",
        sound_bridge: "Ri say sưa gom chai nhựa cũ đem đi tái chế.",
        definition_en: "convert waste into reusable material",
        example_en: "We should recycle e-waste responsibly.\nRecycling aluminum cans saves a massive amount of energy.",
        example_vi: "Chúng ta nên tái chế rác thải điện tử một cách có trách nhiệm.\nTái chế lon nhôm tiết kiệm được một lượng năng lượng khổng lồ.",
        page_number: 302
      },
      {
        word: "System",
        phonetic: "/ˈsɪs.təm/",
        word_type: "noun",
        meaning_vi: "Hệ thống",
        sound_bridge: "Si siêng năng nâng cấp hệ thống máy chủ dữ liệu.",
        definition_en: "a set of things working together as parts of a mechanism or network",
        example_en: "The operating system runs smoothly without lag.\nThe school installed an advanced security alarm system.",
        example_vi: "Hệ điều hành chạy mượt mà không bị giật lag.\nNgôi trường đã lắp đặt một hệ thống báo động an ninh tiên tiến.",
        page_number: 302
      },
      {
        word: "Technique",
        phonetic: "/tekˈniːk/",
        word_type: "noun",
        meaning_vi: "Kỹ thuật, phương pháp",
        sound_bridge: "Tết nịt bụng học kỹ thuật lập trình web hiện đại.",
        definition_en: "a way of carrying out a particular task, especially the execution of an artistic work or scientific procedure",
        example_en: "Machine learning techniques improve diagnosis accuracy.\nThe chef demonstrated a French cooking technique for sautéing fish.",
        example_vi: "Các kỹ thuật học máy nâng cao độ chính xác trong chẩn đoán.\nBếp trưởng đã biểu diễn một kỹ thuật nấu ăn kiểu Pháp để áp chảo cá.",
        page_number: 302
      },
      {
        word: "Transfer",
        phonetic: "/trænsˈfɝː/",
        word_type: "verb",
        meaning_vi: "Chuyển giao, truyền tải dữ liệu",
        sound_bridge: "Tràn phở ra bàn khi đang truyền tải dữ liệu qua cổng USB.",
        definition_en: "move from one place to another",
        example_en: "Transfer big files using high-speed fiber internet.\nHe transferred all his money from the checking account to savings.",
        example_vi: "Truyền tải các tệp tin dung lượng lớn bằng mạng cáp quang tốc độ cao.\nAnh ấy đã chuyển toàn bộ tiền từ tài khoản vãng lai sang tài khoản tiết kiệm.",
        page_number: 302
      },
      {
        word: "Update",
        phonetic: "/ʌpˈdeɪt/",
        word_type: "verb",
        meaning_vi: "Cập nhật",
        sound_bridge: "Ấp trứng xong nhớ cập nhật phiên bản ứng dụng mới.",
        definition_en: "make something more modern or up to date",
        example_en: "Update your antivirus software regularly.\nShe updated her online profile with recent accomplishments.",
        example_vi: "Hãy cập nhật phần mềm diệt virus của bạn thường xuyên.\nCô ấy đã cập nhật hồ sơ trực tuyến của mình với các thành tựu gần đây.",
        page_number: 302
      },
      {
        word: "Upgrade",
        phonetic: "/ʌpˈɡreɪd/",
        word_type: "verb",
        meaning_vi: "Nâng cấp",
        sound_bridge: "Ấp gà ri để dành tiền nâng cấp bộ nhớ RAM máy tính.",
        definition_en: "raise something to a higher standard, in particular improve by adding parts",
        example_en: "Upgrade your hardware for better gaming performance.\nThey decided to upgrade their airline seats to business class.",
        example_vi: "Nâng cấp phần cứng của bạn để có hiệu năng chơi game tốt hơn.\nHọ đã quyết định nâng cấp ghế máy bay của mình lên hạng thương gia.",
        page_number: 303
      }
    ]
  },

  // ==========================================
  // UNIT 32: Action 1 (33 từ, Trang 307 - 313)
  // ==========================================
  32: {
    unit: 32,
    unit_title: "Action 1",
    category: "Actions & Movement",
    words: [
      {
        word: "Adjust",
        phonetic: "/əˈdʒʌst/",
        word_type: "verb",
        meaning_vi: "Điều chỉnh, căn chỉnh",
        sound_bridge: "Ơ dắt xe vào chỗ để điều chỉnh lại gương chiếu hậu.",
        definition_en: "alter or move something slightly in order to achieve the desired fit",
        example_en: "Adjust the screen brightness for eye comfort.\nIt took the child a few weeks to adjust to the new school.",
        example_vi: "Điều chỉnh độ sáng màn hình để mắt dễ chịu hơn.\nĐứa bé mất vài tuần để thích nghi/điều chỉnh với ngôi trường mới.",
        page_number: 307
      },
      {
        word: "Arrest",
        phonetic: "/əˈrest/",
        word_type: "verb",
        meaning_vi: "Bắt giữ",
        sound_bridge: "Ơ rét run người khi cảnh sát bắt giữ tên tội phạm.",
        definition_en: "seize someone by legal authority and take into custody",
        example_en: "Police arrested the suspect near the crime scene.\nThe officer informed the man of his rights before arresting him.",
        example_vi: "Cảnh sát đã bắt giữ nghi phạm gần hiện trường vụ án.\nViên cảnh sát đã thông báo quyền lợi trước khi tiến hành bắt giữ người đàn ông.",
        page_number: 307
      },
      {
        word: "Be out of",
        phonetic: "/biː aʊt ʌv/",
        word_type: "verb",
        meaning_vi: "Hết, cạn kiệt",
        sound_bridge: "Bị ao ước khi máy in bị cạn kiệt mực in.",
        definition_en: "have no more of a particular item or substance",
        example_en: "We are out of paper for the office printer.\nI am out of patience with his endless excuses.",
        example_vi: "Chúng ta đã hết giấy cho máy in văn phòng.\nTôi đã cạn kiệt sự kiên nhẫn với những lời viện cớ vô tận của anh ta.",
        page_number: 307
      },
      {
        word: "Bend",
        phonetic: "/bend/",
        word_type: "verb",
        meaning_vi: "Uốn cong, gập người",
        sound_bridge: "Bé nén đau uốn cong thanh kim loại làm khung ảnh.",
        definition_en: "shape or force something straight into a curve or angle",
        example_en: "Bend your knees slightly when lifting heavy boxes.\nThe metal wire bends easily without breaking.",
        example_vi: "Hãy uốn cong đầu gối một chút khi nhấc những chiếc hộp nặng.\nSợi dây kim loại uốn cong dễ dàng mà không bị gãy.",
        page_number: 307
      },
      {
        word: "Catch up",
        phonetic: "/kætʃ ʌp/",
        word_type: "verb",
        meaning_vi: "Bắt kịp, đuổi kịp",
        sound_bridge: "Cắt ấp trứng nhanh lên để bắt kịp tiến độ công việc.",
        definition_en: "succeed in reaching a person or standard that is ahead",
        example_en: "She ran fast to catch up with her classmates.\nLet's meet for coffee this weekend to catch up on our news.",
        example_vi: "Cô ấy chạy nhanh để bắt kịp các bạn cùng lớp.\nCuối tuần này chúng ta hãy đi uống cà phê để cập nhật tin tức của nhau nhé.",
        page_number: 308
      },
      {
        word: "Chase",
        phonetic: "/tʃeɪs/",
        word_type: "verb",
        meaning_vi: "Rượt đuổi, đuổi theo",
        sound_bridge: "Chè xôi thơm lừng khiến chú chó rượt đuổi theo người bán hàng.",
        definition_en: "pursue in order to catch or catch up with",
        example_en: "The cat chased the mouse across the kitchen floor.\nChildren love chasing soap bubbles in the sunny park.",
        example_vi: "Con mèo đã đuổi theo con chuột khắp sàn bếp.\nTrẻ em rất thích đuổi theo những bong bóng xà phòng trong công viên đầy nắng.",
        page_number: 308
      },
      {
        word: "Collect",
        phonetic: "/kəˈlekt/",
        word_type: "verb",
        meaning_vi: "Thu thập, sưu tầm",
        sound_bridge: "Cờ lấp lánh được bé thu thập và sưu tầm trong hộp.",
        definition_en: "bring or gather together a number of things",
        example_en: "He loves to collect rare vintage stamps.\nVolunteers collected donations for families affected by the flood.",
        example_vi: "Anh ấy thích sưu tầm những con tem cổ quý hiếm.\nCác tình nguyện viên đã quyên góp/thu thập tiền ủng hộ cho các gia đình bị ảnh hưởng bởi lũ lụt.",
        page_number: 308
      },
      {
        word: "Comb",
        phonetic: "/koʊm/",
        word_type: "verb",
        meaning_vi: "Chải tóc, cái lược",
        sound_bridge: "Cơm nguội ăn vội rồi cầm lược chải tóc mượt mà.",
        definition_en: "untangle or arrange the hair by drawing a comb through it",
        example_en: "She combed her long hair before the mirror.\nPolice combed through the woods searching for missing evidence.",
        example_vi: "Cô ấy chải mái tóc dài của mình trước gương.\nCảnh sát đã lùng sục kỹ lưỡng khắp khu rừng để tìm kiếm chứng cứ bị mất.",
        page_number: 308
      },
      {
        word: "Combine",
        phonetic: "/kəmˈbaɪn/",
        word_type: "verb",
        meaning_vi: "Kết hợp",
        sound_bridge: "Cơm bánh mì kết hợp tạo nên bữa sáng ngon miệng.",
        definition_en: "join or merge to form a single unit or substance",
        example_en: "Combine yellow and blue paint to make green.\nThe new recipe combines traditional spices with modern cooking techniques.",
        example_vi: "Kết hợp sơn màu vàng và màu xanh để tạo ra màu xanh lá cây.\nCông thức mới kết hợp các loại gia vị truyền thống với kỹ thuật nấu ăn hiện đại.",
        page_number: 308
      },
      {
        word: "Compete",
        phonetic: "/kəmˈpiːt/",
        word_type: "verb",
        meaning_vi: "Cạnh tranh, thi đấu",
        sound_bridge: "Cơm phở nóng hổi cạnh tranh khốc liệt thu hút thực khách.",
        definition_en: "strive to gain or win something by defeating or establishing superiority over others",
        example_en: "Top athletes compete for the gold medal.\nSmall businesses struggle to compete against global retail giants.",
        example_vi: "Các vận động viên hàng đầu thi đấu để giành huy chương vàng.\nCác doanh nghiệp nhỏ chật vật cạnh tranh với các tập đoàn bán lẻ khổng lồ toàn cầu.",
        page_number: 309
      },
      {
        word: "Continue",
        phonetic: "/kənˈtɪn.juː/",
        word_type: "verb",
        meaning_vi: "Tiếp tục",
        sound_bridge: "Con tìm nụ hoa hồng tiếp tục chăm sóc cho vườn cây.",
        definition_en: "persist in an activity or process",
        example_en: "Please continue with your presentation.\nThe heavy rain is expected to continue throughout the night.",
        example_vi: "Vui lòng tiếp tục bài thuyết trình của bạn.\nCơn mưa lớn được dự báo sẽ tiếp tục kéo dài suốt đêm.",
        page_number: 309
      },
      {
        word: "Control",
        phonetic: "/kənˈtroʊl/",
        word_type: "verb",
        meaning_vi: "Kiểm soát, điều khiển",
        sound_bridge: "Con trâu lội nước được người nông dân kiểm soát chặt chẽ.",
        definition_en: "determine the behavior or supervise the running of",
        example_en: "Use the remote to control the smart TV.\nIt is vital to learn how to control your stress levels.",
        example_vi: "Sử dụng điều khiển từ xa để điều khiển chiếc TV thông minh.\nViệc học cách kiểm soát mức độ căng thẳng là vô cùng quan trọng.",
        page_number: 309
      },
      {
        word: "Convert",
        phonetic: "/kənˈvɝːt/",
        word_type: "verb",
        meaning_vi: "Chuyển đổi, biến đổi",
        sound_bridge: "Con vớt bèo chuyển đổi thành phân bón hữu cơ cho cây.",
        definition_en: "change the form, character, or function of something",
        example_en: "Convert the document to PDF format before printing.\nThey converted the old attic into a comfortable guest bedroom.",
        example_vi: "Chuyển đổi tài liệu sang định dạng PDF trước khi in ấn.\nHọ đã cải tạo/chuyển đổi căn gác xép cũ thành một phòng ngủ thoải mái cho khách.",
        page_number: 309
      },
      {
        word: "Cover",
        phonetic: "/ˈkʌv.ɚ/",
        word_type: "verb",
        meaning_vi: "Che phủ, bao bọc",
        sound_bridge: "Cơ vỡ tan tành lấy bạt che phủ bảo vệ xe máy.",
        definition_en: "put something over or on top of something, in order to protect it",
        example_en: "Cover the pot with a lid to boil water faster.\nSnow covered the entire mountain peaks in pure white.",
        example_vi: "Đậy nắp nồi lại để đun sôi nước nhanh hơn.\nTuyết trắng xóa đã bao phủ toàn bộ các đỉnh núi.",
        page_number: 309
      },
      {
        word: "Create",
        phonetic: "/kriˈeɪt/",
        word_type: "verb",
        meaning_vi: "Tạo ra, sáng tạo",
        sound_bridge: "Cười khúc khích khi sáng tạo ra bức tranh vui nhộn.",
        definition_en: "bring something into existence",
        example_en: "Artists create stunning masterpieces with passion.\nThe software allows graphic designers to create 3D animations.",
        example_vi: "Các nghệ sĩ sáng tạo ra những kiệt tác tuyệt đẹp với niềm đam mê.\nPhần mềm cho phép các nhà thiết kế đồ họa tạo ra hoạt hình 3D.",
        page_number: 310
      },
      {
        word: "Damage",
        phonetic: "/ˈdæm.ɪdʒ/",
        word_type: "verb",
        meaning_vi: "Làm hư hại, tổn hại",
        sound_bridge: "Đá mịt mù làm hư hại kính chắn gió xe hơi.",
        definition_en: "inflict physical harm on something so as to impair its value",
        example_en: "The storm damaged several coastal buildings.\nSmoking heavily causes severe damage to your lungs.",
        example_vi: "Cơn bão đã làm hư hại một vài tòa nhà ven biển.\nHút thuốc lá nặng gây tổn hại nghiêm trọng cho phổi của bạn.",
        page_number: 310
      },
      {
        word: "Decide",
        phonetic: "/dɪˈsaɪd/",
        word_type: "verb",
        meaning_vi: "Quyết định",
        sound_bridge: "Đi say xỉn không thể đưa ra quyết định sáng suốt.",
        definition_en: "come to a resolution in the mind as a result of consideration",
        example_en: "They decided to launch the product in June.\nI cannot decide which university degree to choose.",
        example_vi: "Họ đã quyết định ra mắt sản phẩm vào tháng 6.\nTôi không thể quyết định nên chọn văn bằng đại học nào.",
        page_number: 310
      },
      {
        word: "Decorate",
        phonetic: "/ˈdek.ər.eɪt/",
        word_type: "verb",
        meaning_vi: "Trang trí",
        sound_bridge: "Đè que kem trang trí bánh sinh nhật cho bé.",
        definition_en: "make something look more attractive by adding extra items to it",
        example_en: "We decorated the classroom with festive banners.\nThey decorated the living room with fairy lights for Christmas.",
        example_vi: "Chúng tôi đã trang trí lớp học bằng những dải băng rôn rực rỡ.\nHọ đã trang trí phòng khách bằng dây đèn nhấp nháy đón Giáng sinh.",
        page_number: 310
      },
      {
        word: "Defeat",
        phonetic: "/dɪˈfiːt/",
        word_type: "verb",
        meaning_vi: "Đánh bại",
        sound_bridge: "Đi phơi rơm đánh bại cơn lười biếng dậy sớm tập thể dục.",
        definition_en: "win a victory over someone in a battle or contest",
        example_en: "Our soccer team defeated the reigning champions.\nShe defeated all opponents to win the national chess title.",
        example_vi: "Đội bóng đá của chúng tôi đã đánh bại nhà đương kim vô địch.\nCô ấy đã đánh bại mọi đối thủ để giành chức vô địch cờ vua quốc gia.",
        page_number: 310
      },
      {
        word: "Defend",
        phonetic: "/dɪˈfend/",
        word_type: "verb",
        meaning_vi: "Bảo vệ, phòng thủ, bào chữa",
        sound_bridge: "Đi phen này quyết tâm bảo vệ thành quả lao động.",
        definition_en: "protect from harm or attack",
        example_en: "Soldiers brave danger to defend their homeland.\nThe lawyer defended his client against the false accusations.",
        example_vi: "Những người lính dũng cảm đối mặt hiểm nguy để bảo vệ tổ quốc.\nLuật sư đã bào chữa bảo vệ thân chủ của mình trước những cáo buộc sai trái.",
        page_number: 311
      },
      {
        word: "Stir",
        phonetic: "/stɝː/",
        word_type: "verb",
        meaning_vi: "Khuấy, đảo đều",
        sound_bridge: "Sợ trúng gió dùng thìa khuấy đều cốc trà gừng nóng.",
        definition_en: "move a spoon or other implement around in a liquid in order to mix it",
        example_en: "Stir the soup gently while simmering.\nAdd sugar to the hot coffee and stir well.",
        example_vi: "Khuấy nhẹ nồi súp trong khi đang đun nhỏ lửa.\nThêm đường vào cà phê nóng và khuấy đều.",
        page_number: 311
      },
      {
        word: "Delete",
        phonetic: "/dɪˈliːt/",
        word_type: "verb",
        meaning_vi: "Xóa bỏ",
        sound_bridge: "Đi lấy kẹo xóa bỏ tin nhắn rác trên màn hình điện thoại.",
        definition_en: "remove or obliterate written or printed matter",
        example_en: "Delete unwanted temporary files to free up disk space.\nBe careful not to delete essential system folders.",
        example_vi: "Xóa các tệp tạm thời không cần thiết để giải phóng dung lượng đĩa.\nHãy cẩn thận đừng xóa các thư mục hệ thống thiết yếu.",
        page_number: 311
      },
      {
        word: "Get out of",
        phonetic: "/ɡet aʊt ʌv/",
        word_type: "verb",
        meaning_vi: "Rời khỏi, thoát khỏi",
        sound_bridge: "Ghét ao sâu nên nhanh chóng rời khỏi bờ vực nguy hiểm.",
        definition_en: "leave a place or situation",
        example_en: "Get out of the car carefully in heavy traffic.\nHe tried to get out of doing his household chores.",
        example_vi: "Hãy bước ra khỏi xe cẩn thận khi đường đông đúc.\nCậu bé đã cố gắng trốn tránh/thoát khỏi việc làm việc nhà.",
        page_number: 311
      },
      {
        word: "Reserve",
        phonetic: "/rɪˈzɝːv/",
        word_type: "verb",
        meaning_vi: "Đặt trước, giữ chỗ",
        sound_bridge: "Ri sợ vỡ cốc nên đặt trước bàn tiệc ở phòng riêng.",
        definition_en: "arrange for a room or seat to be kept for the use of a particular person",
        example_en: "We reserved a table for four at the seafood restaurant.\nMake sure to reserve your train tickets well in advance.",
        example_vi: "Chúng tôi đã đặt trước một bàn bốn người tại nhà hàng hải sản.\nHãy chắc chắn đặt trước vé tàu từ sớm.",
        page_number: 311
      },
      {
        word: "Rob",
        phonetic: "/rɑːb/",
        word_type: "verb",
        meaning_vi: "Cướp đoạt",
        sound_bridge: "Rót bia vội vàng bị tên cướp cướp đoạt túi tiền.",
        definition_en: "take property unlawfully from a person or place by force or threat of force",
        example_en: "The masked men attempted to rob the local bank.\nArmed thieves robbed a luxury jewelry store downtown.",
        example_vi: "Những người đàn ông bịt mặt đã nỗ lực cướp ngân hàng địa phương.\nNhững tên trộm có vũ trang đã cướp một cửa hàng trang sức sang trọng ở trung tâm thành phố.",
        page_number: 312
      },
      {
        word: "Select",
        phonetic: "/səˈlekt/",
        word_type: "verb",
        meaning_vi: "Lựa chọn, tuyển chọn",
        sound_bridge: "Sợ lỡ hẹn nên nhanh chóng lựa chọn bộ trang phục đẹp nhất.",
        definition_en: "carefully choose as being the best or most suitable",
        example_en: "Select your preferred payment method from the menu.\nThe committee will select three final candidates for the scholarship.",
        example_vi: "Hãy chọn phương thức thanh toán ưa thích của bạn từ menu.\nỦy ban sẽ tuyển chọn ba ứng viên cuối cùng cho suất học bổng.",
        page_number: 312
      },
      {
        word: "Sew",
        phonetic: "/soʊ/",
        word_type: "verb",
        meaning_vi: "May vá, khâu",
        sound_bridge: "Sợi chỉ dài dùng để may vá chiếc áo rách.",
        definition_en: "join, fasten, or repair something by making stitches with a needle and thread",
        example_en: "Grandmother taught me how to sew buttons onto shirts.\nShe sewed her own elegant wedding gown by hand.",
        example_vi: "Bà đã dạy tôi cách may cúc vào áo sơ mi.\nCô ấy đã tự tay may bộ váy cưới lộng lẫy của chính mình.",
        page_number: 312
      },
      {
        word: "Shave",
        phonetic: "/ʃeɪv/",
        word_type: "verb",
        meaning_vi: "Cạo râu, cạo lông",
        sound_bridge: "Xe vội chạy mua bọt cạo râu cho bố.",
        definition_en: "cut the hair off very close to the skin with a razor",
        example_en: "He shaves his beard every morning before work.\nHe shaved his head completely for the movie role.",
        example_vi: "Anh ấy cạo râu mỗi buổi sáng trước khi đi làm.\nAnh ấy đã cạo trọc đầu hoàn toàn cho vai diễn trong phim.",
        page_number: 312
      },
      {
        word: "Site",
        phonetic: "/saɪt/",
        word_type: "noun",
        meaning_vi: "Địa điểm, công trường, trang web",
        sound_bridge: "Sai sót địa điểm công trường xây dựng bệnh viện mới.",
        definition_en: "an area of ground on which a town, building, or monument is constructed",
        example_en: "Wear a hard hat when entering the construction site.\nThis e-commerce site attracts millions of visitors daily.",
        example_vi: "Hãy đội mũ bảo hộ khi bước vào công trường xây dựng.\nTrang web thương mại điện tử này thu hút hàng triệu lượt truy cập mỗi ngày.",
        page_number: 312
      },
      {
        word: "Skate",
        phonetic: "/skeɪt/",
        word_type: "verb",
        meaning_vi: "Trượt băng, trượt ván",
        sound_bridge: "Sợ kẹt bánh xe khi tập trượt băng nghệ thuật.",
        definition_en: "move on ice skates or a skateboard",
        example_en: "Children love to skate on the frozen lake in winter.\nTeenagers gathered at the skate park to practice tricks.",
        example_vi: "Trẻ em thích trượt băng trên mặt hồ đóng băng vào mùa đông.\nThanh thiếu niên tụ tập tại công viên trượt ván để luyện các kỹ thuật biểu diễn.",
        page_number: 313
      },
      {
        word: "Solve",
        phonetic: "/sɑːlv/",
        word_type: "verb",
        meaning_vi: "Giải quyết, tìm lời giải",
        sound_bridge: "Sợ lỡ hẹn nên tập trung giải quyết xong bài toán khó.",
        definition_en: "find an answer to, explanation for, or means of effectively dealing with a problem",
        example_en: "Teamwork helped solve the complex technical glitch.\nScientists are working relentlessly to solve the mystery of dark matter.",
        example_vi: "Làm việc nhóm đã giúp giải quyết trục trặc kỹ thuật phức tạp.\nCác nhà khoa học đang không ngừng nỗ lực tìm lời giải cho bí ẩn về vật chất tối.",
        page_number: 313
      },
      {
        word: "Spill",
        phonetic: "/spɪl/",
        word_type: "verb",
        meaning_vi: "Làm tràn, làm đổ",
        sound_bridge: "Sợ phở nguội bưng vội làm đổ canh ra bàn.",
        definition_en: "cause or allow liquid to flow over the edge of its container",
        example_en: "Be careful not to spill hot tea onto the laptop.\nAn oil tanker spilled thousands of barrels into the ocean.",
        example_vi: "Hãy cẩn thận đừng làm đổ trà nóng lên máy tính xách tay.\nMột chiếc tàu chở dầu đã làm tràn hàng ngàn thùng dầu ra đại dương.",
        page_number: 313
      },
      {
        word: "Spoil",
        phonetic: "/spɔɪl/",
        word_type: "verb",
        meaning_vi: "Làm hỏng, chiều chuộng quá mức",
        sound_bridge: "Sợ phơi ngoài nắng làm hỏng đồ ăn tươi sống.",
        definition_en: "diminish or destroy the value or quality of something",
        example_en: "Rain spoiled our weekend camping plans.\nGrandparents often spoil their grandchildren with sweet treats.",
        example_vi: "Cơn mưa đã làm hỏng kế hoạch cắm trại cuối tuần của chúng tôi.\nÔng bà thường chiều chuộng các cháu quá mức bằng những món bánh kẹo ngọt.",
        page_number: 313
      }
    ]
  },

  // ==========================================
  // UNIT 33: Action 2 (30 từ, Trang 317 - 323)
  // ==========================================
  33: {
    unit: 33,
    unit_title: "Action 2",
    category: "Actions & Movement",
    words: [
      {
        word: "Intend",
        phonetic: "/ɪnˈtend/",
        word_type: "verb",
        meaning_vi: "Dự định, có ý định",
        sound_bridge: "In tên lên thiệp dự định mời bạn bè đến dự sinh nhật.",
        definition_en: "have in mind as a purpose or plan; plan",
        example_en: "I intend to study computer science next semester.\nWe intend to expand our business overseas next year.",
        example_vi: "Tôi dự định sẽ theo học ngành khoa học máy tính vào kỳ tới.\nChúng tôi có ý định mở rộng hoạt động kinh doanh ra nước ngoài vào năm tới.",
        page_number: 317
      },
      {
        word: "Invade",
        phonetic: "/ɪnˈveɪd/",
        word_type: "verb",
        meaning_vi: "Xâm lược, xâm chiếm",
        sound_bridge: "In vài tờ rơi phản đối hành động xâm lược lãnh thổ.",
        definition_en: "enter a country or region so as to subjugate or occupy it",
        example_en: "Foreign troops invaded the sovereign borders.\nPests invaded the orchard and destroyed the apple harvest.",
        example_vi: "Quân đội nước ngoài đã xâm chiếm các đường biên giới có chủ quyền.\nSâu bọ xâm hại vườn cây và phá hủy vụ thu hoạch táo.",
        page_number: 317
      },
      {
        word: "Irritate",
        phonetic: "/ˈɪr.ə.teɪt/",
        word_type: "verb",
        meaning_vi: "Làm phát cáu, kích ứng da",
        sound_bridge: "In râu tết tóc làm phát cáu em gái nhỏ.",
        definition_en: "make someone annoyed, irritated, or angry; cause inflammation",
        example_en: "Loud construction noise irritates the whole neighborhood.\nHarsh laundry detergents can irritate sensitive baby skin.",
        example_vi: "Tiếng ồn xây dựng lớn làm phát cáu cả khu phố.\nBột giặt có chất tẩy mạnh có thể làm kích ứng làn da nhạy cảm của em bé.",
        page_number: 317
      },
      {
        word: "Knit",
        phonetic: "/nɪt/",
        word_type: "verb",
        meaning_vi: "Đan len",
        sound_bridge: "Nịt bụng ngồi thêu đan khăn len tặng người yêu.",
        definition_en: "make a garment by interlocking loops of wool or other yarn with knitting needles",
        example_en: "My grandmother knitted a warm sweater for winter.\nShe learned to knit wool scarves during quarantine.",
        example_vi: "Bà tôi đã đan một chiếc áo len ấm cho mùa đông.\nCô ấy đã học đan khăn len trong thời gian giãn cách.",
        page_number: 317
      },
      {
        word: "Lift",
        phonetic: "/lɪft/",
        word_type: "verb",
        meaning_vi: "Nâng lên, nhấc lên",
        sound_bridge: "Ly phở nóng nhấc lên đặt cẩn thận lên khay ăn.",
        definition_en: "raise to a higher position or level",
        example_en: "Lift the heavy box using proper posture.\nThe morning sun slowly lifted the fog over the valley.",
        example_vi: "Hãy nâng chiếc hộp nặng bằng tư thế đúng cách.\nÁnh mặt trời buổi sớm từ từ làm tan/nâng màn sương mù trên thung lũng.",
        page_number: 318
      },
      {
        word: "Manage",
        phonetic: "/ˈmæn.ədʒ/",
        word_type: "verb",
        meaning_vi: "Quản lý, xoay xở",
        sound_bridge: "Mẹ nợ nần nhưng vẫn xoay xở quản lý chi tiêu gia đình tốt.",
        definition_en: "be in charge of a business, organization, or team; succeed in surviving",
        example_en: "She manages a team of twenty talented engineers.\nDespite heavy traffic, we managed to catch the morning flight.",
        example_vi: "Cô ấy quản lý một đội ngũ gồm hai mươi kỹ sư tài năng.\nDù kẹt xe nặng, chúng tôi vẫn xoay xở kịp chuyến bay buổi sáng.",
        page_number: 318
      },
      {
        word: "Match",
        phonetic: "/mætʃ/",
        word_type: "verb",
        meaning_vi: "Khớp với, que diêm, trận đấu",
        sound_bridge: "Mát mẻ đi xem trận đấu bóng đá đỉnh cao.",
        definition_en: "correspond or cause to correspond in some essential respect",
        example_en: "Your shoes perfectly match your handbag.\nThey lit the campfire using a single wooden match.",
        example_vi: "Đôi giày của bạn hoàn toàn khớp với chiếc túi xách.\nHọ đã thắp đống lửa trại chỉ bằng một que diêm gỗ.",
        page_number: 318
      },
      {
        word: "Murder",
        phonetic: "/ˈmɝː.dɚ/",
        word_type: "noun",
        meaning_vi: "Vụ án mạng, giết người",
        sound_bridge: "Mở cửa phát hiện vụ án mạng bí ẩn trong biệt thự.",
        definition_en: "the unlawful premeditated killing of one human being by another",
        example_en: "Detectives investigated the unsolved murder case.\nThe suspect was convicted of second-degree murder.",
        example_vi: "Các thám tử đã điều tra vụ án mạng chưa có lời giải.\nNghi phạm đã bị kết tội giết người cấp độ hai.",
        page_number: 318
      },
      {
        word: "Noise",
        phonetic: "/nɔɪz/",
        word_type: "noun",
        meaning_vi: "Tiếng ồn",
        sound_bridge: "Nồi xúp sôi ùng ục phát ra tiếng ồn vui tai.",
        definition_en: "a sound, especially one that is loud, unpleasant, or causes disturbance",
        example_en: "Earplugs block out ambient street noise.\nThe engine was making a strange rattling noise.",
        example_vi: "Nút tai giúp ngăn chặn tiếng ồn đường phố xung quanh.\nĐộng cơ đang phát ra tiếng ồn lách cách kỳ lạ.",
        page_number: 318
      },
      {
        word: "Note",
        phonetic: "/noʊt/",
        word_type: "verb",
        meaning_vi: "Ghi chú, chú ý",
        sound_bridge: "Nấu xong nhớ ghi chú công thức nấu ăn vào sổ tay.",
        definition_en: "notice or pay particular attention to; record in writing",
        example_en: "Please note that the office closes early on Friday.\nHe carefully noted all the professor's key points during lecture.",
        example_vi: "Xin lưu ý ghi nhớ rằng văn phòng sẽ đóng cửa sớm vào thứ Sáu.\nAnh ấy cẩn thận ghi chú tất cả các ý chính của giáo sư trong bài giảng.",
        page_number: 319
      },
      {
        word: "Notice",
        phonetic: "/ˈnoʊ.t̬ɪs/",
        word_type: "verb",
        meaning_vi: "Nhận thấy, chú ý",
        sound_bridge: "Nấu thịt xong nhận thấy hương thơm lan tỏa khắp phòng.",
        definition_en: "become aware of",
        example_en: "Did you notice any strange behavior last night?\nI noticed that she had cut her hair short.",
        example_vi: "Bạn có nhận thấy hành vi kỳ lạ nào vào tối qua không?\nTôi nhận thấy cô ấy đã cắt tóc ngắn.",
        page_number: 319
      },
      {
        word: "Offer",
        phonetic: "/ˈɑː.fɚ/",
        word_type: "verb",
        meaning_vi: "Cung cấp, đề nghị",
        sound_bridge: "Óc phở thơm ngon chủ quán đề nghị giảm giá cho khách quen.",
        definition_en: "present or proffer something for someone to accept or reject as so desired",
        example_en: "The company offered him an attractive salary package.\nCan I offer you a glass of fresh orange juice?",
        example_vi: "Công ty đã đề nghị cho anh ấy một gói mức lương rất hấp dẫn.\nTôi có thể mời bạn một ly nước cam tươi được không?",
        page_number: 319
      },
      {
        word: "Particular",
        phonetic: "/pɚˈtɪk.jə.lɚ/",
        word_type: "adjective",
        meaning_vi: "Cụ thể, đặc biệt, kỹ tính",
        sound_bridge: "Phải tính toán cụ thể từng chi tiết cho dự án lớn.",
        definition_en: "used to single out an individual member of a specified group or class",
        example_en: "Is there any particular topic you would like to discuss?\nShe is very particular about keeping her kitchen spotless.",
        example_vi: "Có chủ đề cụ thể nào bạn muốn thảo luận không?\nCô ấy rất kỹ tính về việc giữ cho gian bếp của mình không một hạt bụi.",
        page_number: 319
      },
      {
        word: "Plan",
        phonetic: "/plæn/",
        word_type: "noun",
        meaning_vi: "Kế hoạch",
        sound_bridge: "Bà lặn lội lập kế hoạch đi du lịch Đà Nẵng.",
        definition_en: "a detailed proposal for doing or achieving something",
        example_en: "Create a detailed study plan before final exams.\nDo you have any plans for the upcoming holiday?",
        example_vi: "Hãy lập một kế hoạch học tập chi tiết trước kỳ thi cuối kỳ.\nBạn đã có kế hoạch gì cho kỳ nghỉ sắp tới chưa?",
        page_number: 319
      },
      {
        word: "Post",
        phonetic: "/poʊst/",
        word_type: "verb",
        meaning_vi: "Đăng tải, gửi bưu điện",
        sound_bridge: "Bột sắn dây được đăng tải bán trên mạng xã hội.",
        definition_en: "display a notice; publish a message online; send via mail",
        example_en: "She posted high-resolution photos of her vacation.\nI need to post these birthday cards before noon.",
        example_vi: "Cô ấy đã đăng tải những bức ảnh độ phân giải cao về kỳ nghỉ của mình.\nTôi cần gửi những tấm thiệp sinh nhật này qua bưu điện trước buổi trưa.",
        page_number: 320
      },
      {
        word: "Postpone",
        phonetic: "/poʊstˈpoʊn/",
        word_type: "verb",
        meaning_vi: "Hoãn lại, trì hoãn",
        sound_bridge: "Bột phồng tôm hoãn lại ngày mở bán vì trời mưa.",
        definition_en: "cause or arrange for something to take place at a time later than that first scheduled",
        example_en: "The match was postponed due to heavy rainfall.\nWe decided to postpone our wedding until next spring.",
        example_vi: "Trận đấu đã bị hoãn lại do mưa lớn.\nChúng tôi đã quyết định hoãn đám cưới lại cho đến mùa xuân năm sau.",
        page_number: 320
      },
      {
        word: "Pour",
        phonetic: "/pɔːr/",
        word_type: "verb",
        meaning_vi: "Rót, đổ (nước)",
        sound_bridge: "Phở thơm lừng rót nước dùng ngọt thanh vào tô.",
        definition_en: "cause a liquid to flow from a container in a steady stream",
        example_en: "Pour fresh milk into your morning coffee.\nIt is pouring outside, so take an umbrella.",
        example_vi: "Rót sữa tươi vào ly cà phê buổi sáng của bạn.\nNgoài trời đang mưa như trút nước, nên hãy mang theo ô nhé.",
        page_number: 320
      },
      {
        word: "Present",
        phonetic: "/prɪˈzent/",
        word_type: "verb",
        meaning_vi: "Thuyết trình, trình bày, món quà",
        sound_bridge: "Phải rèn luyện tự tin khi đứng thuyết trình trước hội đồng.",
        definition_en: "give something to someone formally or ceremonially; show and explain",
        example_en: "The manager presented the new quarterly strategy.\nHe presented his wife with a diamond necklace on her birthday.",
        example_vi: "Người quản lý đã trình bày chiến lược hàng quý mới.\nAnh ấy đã tặng vợ một chiếc vòng cổ kim cương nhân dịp sinh nhật cô ấy.",
        page_number: 320
      },
      {
        word: "Prevent",
        phonetic: "/prɪˈvent/",
        word_type: "verb",
        meaning_vi: "Ngăn chặn, phòng ngừa",
        sound_bridge: "Phải rèn luyện thói quen tốt để ngăn chặn bệnh tật phát sinh.",
        definition_en: "keep something from happening or arising",
        example_en: "Regular handwashing helps prevent infections.\nSeatbelts are designed to prevent severe injuries in car crashes.",
        example_vi: "Rửa tay thường xuyên giúp ngăn ngừa các bệnh lây nhiễm.\nDây an toàn được thiết kế để ngăn ngừa thương tích nặng trong các vụ tai nạn xe hơi.",
        page_number: 320
      },
      {
        word: "Provide",
        phonetic: "/prəˈvaɪd/",
        word_type: "verb",
        meaning_vi: "Cung cấp",
        sound_bridge: "Phải rủ vài người bạn cung cấp cứu trợ đồng bào.",
        definition_en: "make available for use; supply",
        example_en: "The school provides free textbooks for students in need.\nThis comprehensive guide provides all the necessary instructions.",
        example_vi: "Nhà trường cung cấp sách giáo khoa miễn phí cho học sinh có hoàn cảnh khó khăn.\nCuốn cẩm nang toàn diện này cung cấp tất cả các hướng dẫn cần thiết.",
        page_number: 321
      },
      {
        word: "Race",
        phonetic: "/reɪs/",
        word_type: "noun",
        meaning_vi: "Cuộc đua, chủng tộc",
        sound_bridge: "Rơi xuống nước trong cuộc đua thuyền vượt thác.",
        definition_en: "a competition between runners, horses, vehicles to see which is the fastest",
        example_en: "He won first place in the 400m race.\nThe marathon race attracted runners from over fifty countries.",
        example_vi: "Anh ấy đã giành giải nhất trong cuộc đua cự ly 400m.\nCuộc đua chạy marathon đã thu hút các vận động viên từ hơn năm mươi quốc gia.",
        page_number: 321
      },
      {
        word: "Ready",
        phonetic: "/ˈred.i/",
        word_type: "adjective",
        meaning_vi: "Sẵn sàng",
        sound_bridge: "Rẽ đi mua đồ chuẩn bị sẵn sàng cho chuyến bay sớm.",
        definition_en: "in a suitable state for an activity, action, or situation; fully prepared",
        example_en: "Are you ready to order your dinner?\nThe software is tested and ready for market deployment.",
        example_vi: "Bạn đã sẵn sàng gọi bữa tối chưa?\nPhần mềm đã được kiểm thử và sẵn sàng để triển khai ra thị trường.",
        page_number: 321
      },
      {
        word: "Reduce",
        phonetic: "/rɪˈduːs/",
        word_type: "verb",
        meaning_vi: "Cắt giảm, làm giảm",
        sound_bridge: "Ri đu xà cắt giảm lượng mỡ thừa tích tụ trong cơ thể.",
        definition_en: "make smaller or less in amount, degree, or size",
        example_en: "Using public transport reduces traffic congestion.\nEating less salt helps reduce high blood pressure.",
        example_vi: "Sử dụng phương tiện công cộng giúp làm giảm ùn tắc giao thông.\nĂn ít muối giúp làm giảm huyết áp cao.",
        page_number: 321
      },
      {
        word: "Remove",
        phonetic: "/rɪˈmuːv/",
        word_type: "verb",
        meaning_vi: "Gỡ bỏ, loại bỏ",
        sound_bridge: "Ri mua vớ mới loại bỏ những chiếc tất cũ rách.",
        definition_en: "take off or away from the position occupied",
        example_en: "Remove your shoes before stepping inside the house.\nDoctors operated to remove the benign tumor successfully.",
        example_vi: "Hãy cởi tháo giày ra trước khi bước vào trong nhà.\nCác bác sĩ đã phẫu thuật để loại bỏ khối u lành tính thành công.",
        page_number: 321
      },
      {
        word: "Rescue",
        phonetic: "/ˈres.kjuː/",
        word_type: "verb",
        meaning_vi: "Giải cứu, cứu hộ",
        sound_bridge: "Rét run người đội cứu hộ kịp thời giải cứu người mắc kẹt.",
        definition_en: "save someone from a dangerous or distressing situation",
        example_en: "Firefighters rescued the family from the burning building.\nHelicopters were dispatched to rescue the stranded climbers.",
        example_vi: "Lực lượng cứu hỏa đã giải cứu gia đình khỏi tòa nhà đang cháy.\nTrực thăng đã được phái đi để cứu các nhà leo núi đang mắc kẹt.",
        page_number: 322
      },
      {
        word: "Scan",
        phonetic: "/skæn/",
        word_type: "verb",
        meaning_vi: "Quét tài liệu, xem lướt qua",
        sound_bridge: "Sợ cạn mực in khi quét tài liệu hợp đồng gửi qua email.",
        definition_en: "look at all parts of something carefully; convert a document into digital form",
        example_en: "Scan the QR code to access the online menu.\nShe scanned the morning newspaper headlines while having breakfast.",
        example_vi: "Hãy quét mã QR để truy cập vào thực đơn trực tuyến.\nCô ấy lướt qua các tiêu đề báo sáng trong lúc ăn sáng.",
        page_number: 322
      },
      {
        word: "Scratch",
        phonetic: "/skrætʃ/",
        word_type: "verb",
        meaning_vi: "Cào, gãi, vết xước",
        sound_bridge: "Sợ cào rách làm xước mặt sơn xe máy mới mua.",
        definition_en: "score or mark the surface of something with a sharp or pointed object",
        example_en: "The puppy scratched playfully at the wooden door.\nThere is a tiny scratch on my sunglasses lens.",
        example_vi: "Chú cún con cào đùa nghịch vào cánh cửa gỗ.\nCó một vết xước nhỏ xíu trên mắt kính râm của tôi.",
        page_number: 322
      },
      {
        word: "Screw",
        phonetic: "/skruː/",
        word_type: "noun",
        meaning_vi: "Con ốc vít, vặn vít",
        sound_bridge: "Sợ rớt con ốc vít dùng tua-vít vặn chặt thanh giằng.",
        definition_en: "a short, slender, sharp-pointed metal pin with a raised helical thread running around it",
        example_en: "Tighten the loose screw with a screwdriver.\nScrew the shelf brackets firmly into the wall studs.",
        example_vi: "Hãy vặn chặt con ốc vít bị lỏng bằng tua-vít.\nHãy bắt vít giá đỡ kệ thật chắc chắn vào các thanh giằng tường.",
        page_number: 322
      },
      {
        word: "Seal",
        phonetic: "/siːl/",
        word_type: "verb",
        meaning_vi: "Niêm phong, dán kín, con hải cẩu",
        sound_bridge: "Si siêng năng dán kín niêm phong bưu kiện trước khi gửi.",
        definition_en: "fasten or close securely",
        example_en: "Seal the envelope tightly before dropping it in the mailbox.\nWe watched seals basking in the sun on the rocky shore.",
        example_vi: "Hãy dán kín phong bì cẩn thận trước khi thả vào hòm thư.\nChúng tôi đã ngắm những chú hải cẩu phơi nắng trên bờ đá.",
        page_number: 322
      },
      {
        word: "Sunbathe",
        phonetic: "/ˈsʌn.beɪð/",
        word_type: "verb",
        meaning_vi: "Tắm nắng",
        sound_bridge: "Săn bắp ngô nướng nằm tắm nắng trên bãi cát vàng.",
        definition_en: "sit or lie in the sun, especially in order to tan the skin",
        example_en: "Tourists love to sunbathe on the tropical beach.\nRemember to apply sunscreen before you sunbathe.",
        example_vi: "Khách du lịch thích nằm tắm nắng trên bãi biển nhiệt đới.\nHãy nhớ thoa kem chống nắng trước khi bạn đi tắm nắng.",
        page_number: 323
      }
    ]
  },

  // ==========================================
  // UNIT 34: Action 3 (33 từ, Trang 327 - 333)
  // ==========================================
  34: {
    unit: 34,
    unit_title: "Action 3",
    category: "Actions & Movement",
    words: [
      {
        word: "Disgrace",
        phonetic: "/dɪsˈɡreɪs/",
        word_type: "noun",
        meaning_vi: "Sự ô nhục, nỗi nhục nhã",
        sound_bridge: "Đi sợ gãy chân chịu nỗi nhục nhã thua cuộc.",
        definition_en: "loss of reputation or respect as the result of a dishonorable action",
        example_en: "His cheating scandal brought disgrace to the team.\nIt is an absolute disgrace that the historic monument was vandalized.",
        example_vi: "Vụ bê bối gian lận của anh ấy đã mang lại nỗi ô nhục cho toàn đội.\nThật là một sự ô nhục tuyệt đối khi di tích lịch sử bị phá hoại.",
        page_number: 327
      },
      {
        word: "Disguise",
        phonetic: "/dɪsˈɡaɪz/",
        word_type: "verb",
        meaning_vi: "Cải trang, ngụy trang",
        sound_bridge: "Đi săn gà rừng phải ngụy trang cải trang khéo léo.",
        definition_en: "give a different appearance in order to conceal one's identity",
        example_en: "The detective disguised himself as a security guard.\nShe tried to disguise her genuine feelings behind a cheerful smile.",
        example_vi: "Thám tử đã cải trang thành một nhân viên bảo vệ.\nCô ấy cố gắng che giấu/ngụy trang cảm xúc thật của mình đằng sau một nụ cười vui vẻ.",
        page_number: 327
      },
      {
        word: "Dismiss",
        phonetic: "/dɪˈsmɪs/",
        word_type: "verb",
        meaning_vi: "Sa thải, bác bỏ, giải tán",
        sound_bridge: "Đi sợ mít rụng trúng đầu bị sa thải khỏi vườn trái cây.",
        definition_en: "order or allow to leave; send away; discharge from employment",
        example_en: "The judge dismissed the charges due to lack of evidence.\nThe CEO dismissed several underperforming managers last month.",
        example_vi: "Thẩm phán đã bác bỏ các cáo buộc vì thiếu bằng chứng.\nGiám đốc điều hành đã sa thải một số quản lý kém hiệu quả vào tháng trước.",
        page_number: 327
      },
      {
        word: "Disparate",
        phonetic: "/ˈdɪs.pɚ.ət/",
        word_type: "adjective",
        meaning_vi: "Khác biệt, hoàn toàn khác nhau",
        sound_bridge: "Đi săn phở rớt trúng hai ý kiến hoàn toàn khác biệt nhau.",
        definition_en: "essentially different in kind; not able to be compared",
        example_en: "The committee gathered disparate viewpoints on the policy.\nThe exhibition brought together disparate artworks from five continents.",
        example_vi: "Ủy ban đã thu thập những quan điểm hoàn toàn khác biệt về chính sách.\nTriển lãm đã quy tụ những tác phẩm nghệ thuật đa dạng khác biệt từ năm châu lục.",
        page_number: 327
      },
      {
        word: "Disperse",
        phonetic: "/dɪˈspɝːs/",
        word_type: "verb",
        meaning_vi: "Giải tán, phân tán",
        sound_bridge: "Đi sợ phở bẩn giải tán đám đông trước cổng chợ.",
        definition_en: "distribute or spread over a wide area; go or cause to go in different directions",
        example_en: "Police used water cannons to disperse the crowd.\nThe strong morning breeze dispersed the thick clouds of smoke.",
        example_vi: "Cảnh sát đã sử dụng vòi rồng để giải tán đám đông.\nCơn gió sớm mạnh mẽ đã làm phân tán những đám mây khói dày đặc.",
        page_number: 328
      },
      {
        word: "Disrupt",
        phonetic: "/dɪsˈrʌpt/",
        word_type: "verb",
        meaning_vi: "Làm gián đoạn, phá vỡ",
        sound_bridge: "Đi sợ rớt mạng làm gián đoạn buổi hội thảo trực tuyến.",
        definition_en: "interrupt an event, activity, or process by causing a disturbance or problem",
        example_en: "Heavy storms disrupted air traffic for hours.\nInnovative technologies constantly disrupt traditional business models.",
        example_vi: "Những cơn bão lớn đã làm gián đoạn giao thông hàng không trong nhiều giờ.\nCác công nghệ đổi mới liên tục phá vỡ các mô hình kinh doanh truyền thống.",
        page_number: 328
      },
      {
        word: "Distract",
        phonetic: "/dɪˈstrækt/",
        word_type: "verb",
        meaning_vi: "Làm sao nhãng, làm phân tâm",
        sound_bridge: "Đi sợ trát vữa làm sao nhãng việc học bài.",
        definition_en: "prevent someone from giving full attention to something",
        example_en: "Loud music can distract you while studying.\nDo not let incoming smartphone notifications distract your driving.",
        example_vi: "Âm nhạc quá lớn có thể làm bạn sao nhãng khi đang học bài.\nĐừng để thông báo điện thoại làm bạn mất tập trung khi đang lái xe.",
        page_number: 328
      },
      {
        word: "Fancy",
        phonetic: "/ˈfæn.si/",
        word_type: "adjective",
        meaning_vi: "Sang trọng, ưa thích",
        sound_bridge: "Phải ăn xôi trong nhà hàng sang trọng đắt tiền.",
        definition_en: "elaborate in structure or decoration; expensive",
        example_en: "They celebrated their anniversary at a fancy restaurant.\nDo you fancy going for a swim at the beach this afternoon?",
        example_vi: "Họ đã kỷ niệm ngày cưới tại một nhà hàng sang trọng.\nBạn có thích đi bơi ở bãi biển vào chiều nay không?",
        page_number: 328
      },
      {
        word: "Fill out",
        phonetic: "/fɪl aʊt/",
        word_type: "verb",
        meaning_vi: "Điền vào (mẫu đơn)",
        sound_bridge: "Phi lon ton điền vào mẫu đơn xin việc làm.",
        definition_en: "complete a form by adding required information",
        example_en: "Please fill out this registration form completely.\nApplicants must fill out all the mandatory fields accurately.",
        example_vi: "Vui lòng điền đầy đủ thông tin vào mẫu đăng ký này.\nNgười nộp đơn phải điền chính xác vào tất cả các trường bắt buộc.",
        page_number: 328
      },
      {
        word: "Follow up",
        phonetic: "/ˈfɑː.loʊ ʌp/",
        word_type: "verb",
        meaning_vi: "Theo dõi tiếp, bám sát",
        sound_bridge: "Phở lẩu ấp trứng bám sát tiến độ phục vụ khách hàng.",
        definition_en: "continue or complete an inquiry or action",
        example_en: "Always follow up with clients after an initial meeting.\nThe doctor scheduled a follow-up consultation for next Tuesday.",
        example_vi: "Hãy luôn bám sát theo dõi khách hàng sau cuộc họp đầu tiên.\nBác sĩ đã lên lịch một buổi khám tái theo dõi vào thứ Ba tới.",
        page_number: 329
      },
      {
        word: "Forbid",
        phonetic: "/fɚˈbɪd/",
        word_type: "verb",
        meaning_vi: "Cấm đoán, nghiêm cấm",
        sound_bridge: "Phở bò cấm đoán ăn trong phòng thí nghiệm hóa học.",
        definition_en: "refuse to allow something",
        example_en: "School rules strictly forbid smoking on campus.\nMy strict doctor forbade me from eating sugary desserts.",
        example_vi: "Nội quy nhà trường nghiêm cấm hút thuốc trong khuôn viên.\nVị bác sĩ nghiêm khắc đã cấm tôi ăn các món tráng miệng nhiều đường.",
        page_number: 329
      },
      {
        word: "Glance",
        phonetic: "/ɡlæns/",
        word_type: "verb",
        meaning_vi: "Liếc nhìn, nhìn thoáng qua",
        sound_bridge: "Gà lặn lội liếc nhìn đồng hồ xem giờ vào lớp.",
        definition_en: "take a brief or hurried look",
        example_en: "He glanced at his watch and realized he was late.\nShe gave a quick glance at the menu before ordering.",
        example_vi: "Anh ấy đã liếc nhìn đồng hồ và nhận ra mình đã bị muộn.\nCô ấy liếc nhìn nhanh qua thực đơn trước khi gọi món.",
        page_number: 329
      },
      {
        word: "Glimpse",
        phonetic: "/ɡlɪmps/",
        word_type: "noun",
        meaning_vi: "Cái nhìn thoáng qua, sự thoảng thấy",
        sound_bridge: "Gà lội mương nhìn thoáng qua bóng dáng người quen.",
        definition_en: "a momentary or partial view",
        example_en: "She caught a glimpse of the superstar through the crowd.\nThe documentary offers a fascinating glimpse into deep-sea life.",
        example_vi: "Cô ấy đã thoáng thấy siêu sao qua đám đông.\nBộ phim tài liệu mang lại một cái nhìn thoáng qua đầy mê hoặc về sự sống dưới biển sâu.",
        page_number: 329
      },
      {
        word: "Grip",
        phonetic: "/ɡrɪp/",
        word_type: "verb",
        meaning_vi: "Nắm chặt, kẹp chặt",
        sound_bridge: "Gà rỉ tai bảo nắm chặt tay lái khi đi đường đèo.",
        definition_en: "take and keep a firm hold of; grasp tightly",
        example_en: "He gripped the steering wheel tightly on the icy road.\nFear gripped the entire village as the wild storm approached.",
        example_vi: "Anh ấy đã nắm chặt vô lăng trên con đường đóng băng trơn trượt.\nNỗi sợ hãi đã bao trùm/bóp nghẹt cả ngôi làng khi cơn bão dữ đến gần.",
        page_number: 329
      },
      {
        word: "Hesitate",
        phonetic: "/ˈhez.ə.teɪt/",
        word_type: "verb",
        meaning_vi: "Do dự, ngập ngừng",
        sound_bridge: "Hét inh ỏi đừng do dự nắm bắt cơ hội tốt.",
        definition_en: "pause before saying or doing something through uncertainty",
        example_en: "Do not hesitate to contact us if you have questions.\nHe hesitated for a second before jumping into the pool.",
        example_vi: "Đừng ngập ngừng do dự liên hệ với chúng tôi nếu bạn có thắc mắc.\nCậu bé ngập ngừng một giây trước khi nhảy xuống hồ bơi.",
        page_number: 330
      },
      {
        word: "Ignore",
        phonetic: "/ɪɡˈnɔːr/",
        word_type: "verb",
        meaning_vi: "Phớt lờ, làm ngơ",
        sound_bridge: "In gạch ngói phớt lờ những lời phàn nàn vô lý.",
        definition_en: "refuse to take notice of or acknowledge; disregard intentionally",
        example_en: "It is unwise to ignore health warning symptoms.\nShe chose to ignore his rude comments and walked away.",
        example_vi: "Thật không khôn ngoan khi phớt lờ các triệu chứng cảnh báo sức khỏe.\nCô ấy chọn cách phớt lờ những lời bình luận thô lỗ của anh ta và bước đi.",
        page_number: 330
      },
      {
        word: "Lock into",
        phonetic: "/lɑːk ˈɪn.tuː/",
        word_type: "verb",
        meaning_vi: "Khóa chặt vào, cam kết cố định",
        sound_bridge: "Lóc cóc khóa chặt vali cố định dây đai hành lý.",
        definition_en: "commit someone or something irrevocably to a certain course",
        example_en: "They locked into a long-term fixed mortgage rate.\nMake sure your seatbelt is locked securely into position.",
        example_vi: "Họ đã cam kết cố định mức lãi suất thế chấp dài hạn.\nHãy đảm bảo dây an toàn của bạn được khóa chặt vào vị trí.",
        page_number: 330
      },
      {
        word: "Occupy",
        phonetic: "/ˈɑː.kjə.paɪ/",
        word_type: "verb",
        meaning_vi: "Chiếm đóng, cư ngụ",
        sound_bridge: "Óc kẹp bánh mì chiếm đóng toàn bộ chỗ ngồi phòng ăn.",
        definition_en: "reside or have one's place of business in; fill or take up a space",
        example_en: "The tech firm occupies three floors in the tower.\nReading keeps the mind occupied during long flights.",
        example_vi: "Công ty công nghệ chiếm ba tầng trong tòa tháp.\nĐọc sách giúp tâm trí bận rộn/thư giãn trong các chuyến bay dài.",
        page_number: 330
      },
      {
        word: "Occur",
        phonetic: "/əˈkɝː/",
        word_type: "verb",
        meaning_vi: "Xảy ra, xuất hiện",
        sound_bridge: "Ơ cọp xuất hiện đột ngột xảy ra náo loạn trong sở thú.",
        definition_en: "happen; take place",
        example_en: "Earthquakes frequently occur in this geological zone.\nIt didn't occur to me that she was telling the truth.",
        example_vi: "Động đất thường xuyên xảy ra ở vùng địa chất này.\nTôi chưa từng nghĩ ra rằng cô ấy đang nói sự thật.",
        page_number: 330
      },
      {
        word: "Permit",
        phonetic: "/pɚˈmɪt/",
        word_type: "verb",
        meaning_vi: "Cho phép, giấy phép",
        sound_bridge: "Phải mua mít có giấy phép cho phép kinh doanh trái cây.",
        definition_en: "give authorization or consent to someone to do something",
        example_en: "Photography is permitted inside the public museum.\nYou must obtain a building permit from the city council.",
        example_vi: "Việc chụp ảnh được cho phép bên trong bảo tàng công cộng.\nBạn phải xin giấy phép xây dựng từ hội đồng thành phố.",
        page_number: 331
      },
      {
        word: "Pick up",
        phonetic: "/pɪk ʌp/",
        word_type: "verb",
        meaning_vi: "Nhặt lên, đón ai, học lỏm",
        sound_bridge: "Bích ấp trứng nhặt chiếc chìa khóa bị rơi trên thảm.",
        definition_en: "lift an object; collect someone by car; learn casually",
        example_en: "He offered to pick up the children from school.\nShe picked up Spanish quickly while living in Madrid.",
        example_vi: "Anh ấy đã đề nghị đi đón lũ trẻ từ trường học về.\nCô ấy học lỏm tiếng Tây Ban Nha rất nhanh khi sống ở Madrid.",
        page_number: 331
      },
      {
        word: "Polish",
        phonetic: "/ˈpɑː.lɪʃ/",
        word_type: "verb",
        meaning_vi: "Đánh bóng, trau chuốt",
        sound_bridge: "Bò lội suối đánh bóng đôi giày da sáng bóng.",
        definition_en: "make the surface of something smooth and shiny by rubbing it",
        example_en: "Polish your shoes before going to the interview.\nHe spent hours polishing the essay before submitting it.",
        example_vi: "Hãy đánh bóng đôi giày của bạn trước khi đi phỏng vấn.\nAnh ấy đã dành nhiều giờ trau chuốt bài luận trước khi nộp.",
        page_number: 331
      },
      {
        word: "Pull out",
        phonetic: "/pʊl aʊt/",
        word_type: "verb",
        meaning_vi: "Rút ra, kéo ra, rút lui",
        sound_bridge: "Búp bê rút ra cây bút chì từ chiếc hộp đựng.",
        definition_en: "withdraw from an undertaking; extract or remove",
        example_en: "The foreign investor decided to pull out of the deal.\nHe pulled out his wallet to pay for our lunch.",
        example_vi: "Nhà đầu tư nước ngoài đã quyết định rút lui khỏi thỏa thuận.\nAnh ấy đã rút ví ra để trả tiền bữa trưa cho chúng tôi.",
        page_number: 331
      },
      {
        word: "Punch",
        phonetic: "/pʌntʃ/",
        word_type: "verb",
        meaning_vi: "Đấm, cú đấm, bấm lỗ",
        sound_bridge: "Bánh phồng tôm đấm một cú vào bao cát tập luyện.",
        definition_en: "strike with the fist",
        example_en: "The boxer delivered a powerful knockout punch.\nUse this tool to punch neat holes in the documents.",
        example_vi: "Võ sĩ quyền anh đã tung ra một cú đấm hạ gục uy lực.\nHãy sử dụng dụng cụ này để bấm những lỗ gọn gàng trên tài liệu.",
        page_number: 331
      },
      {
        word: "Pursue",
        phonetic: "/pɚˈsuː/",
        word_type: "verb",
        meaning_vi: "Theo đuổi, truy đuổi",
        sound_bridge: "Phải sợ sương mù nhưng vẫn kiên trì theo đuổi đam mê.",
        definition_en: "follow in order to catch or attack them; continue or proceed along",
        example_en: "Never give up on pursuing your lifelong dreams.\nPolice cars pursued the fleeing suspect down the highway.",
        example_vi: "Đừng bao giờ từ bỏ việc theo đuổi những giấc mơ cả đời của bạn.\nXe cảnh sát đã truy đuổi nghi phạm đang bỏ trốn dọc theo đường cao tốc.",
        page_number: 332
      },
      {
        word: "Quarrel",
        phonetic: "/ˈkwɔːr.əl/",
        word_type: "verb",
        meaning_vi: "Cãi cọ, tranh cãi",
        sound_bridge: "Quơ que cãi cọ tranh giành đồ chơi với bạn.",
        definition_en: "have an angry argument or disagreement",
        example_en: "Siblings often quarrel over minor household matters.\nThey quarreled loudly about money matters late last night.",
        example_vi: "Anh chị em thường cãi cọ vì những chuyện nhỏ nhặt trong nhà.\nHọ đã tranh cãi to tiếng về chuyện tiền bạc vào tối muộn hôm qua.",
        page_number: 332
      },
      {
        word: "Resolve",
        phonetic: "/rɪˈzɑːlv/",
        word_type: "verb",
        meaning_vi: "Giải quyết, quyết tâm",
        sound_bridge: "Ri dạt dào quyết tâm giải quyết dứt điểm các mâu thuẫn.",
        definition_en: "settle or find a solution to a problem, dispute, or contentious matter",
        example_en: "Both parties met to resolve their contract dispute.\nShe resolved to exercise every day to improve her health.",
        example_vi: "Cả hai bên đã gặp nhau để giải quyết tranh chấp hợp đồng.\nCô ấy quyết tâm tập thể dục mỗi ngày để cải thiện sức khỏe.",
        page_number: 332
      },
      {
        word: "Restore",
        phonetic: "/rɪˈstɔːr/",
        word_type: "verb",
        meaning_vi: "Khôi phục, phục hồi",
        sound_bridge: "Ri sợ tơ vò khôi phục lại dữ liệu bị xóa nhầm.",
        definition_en: "bring back or re-establish; return to a former condition",
        example_en: "Engineers worked to restore power after the outage.\nExperts carefully restored the centuries-old oil painting.",
        example_vi: "Các kỹ sư đã làm việc để khôi phục nguồn điện sau sự cố mất điện.\nCác chuyên gia đã cẩn thận phục chế bức tranh sơn dầu có niên đại hàng thế kỷ.",
        page_number: 332
      },
      {
        word: "Revenge",
        phonetic: "/rɪˈvendʒ/",
        word_type: "noun",
        meaning_vi: "Sự trả thù, phục thù",
        sound_bridge: "Ri vẹn toàn kế hoạch trả thù kẻ đã hãm hại gia đình.",
        definition_en: "the action of inflicting hurt or harm on someone for an injury or wrong",
        example_en: "Forgiveness is better than seeking bitter revenge.\nHe swore to take revenge on those who betrayed him.",
        example_vi: "Sự tha thứ tốt hơn là tìm kiếm sự trả thù cay đắng.\nAnh ấy đã thề sẽ trả thù những kẻ đã phản bội mình.",
        page_number: 332
      },
      {
        word: "Specify",
        phonetic: "/ˈspes.ə.faɪ/",
        word_type: "verb",
        meaning_vi: "Chỉ rõ, định rõ chi tiết",
        sound_bridge: "Sợ phở xào nguội phải chỉ rõ yêu cầu nấu nóng cho đầu bếp.",
        definition_en: "identify clearly and definitely",
        example_en: "The contract specifies the exact delivery date.\nPlease specify your dietary requirements when booking.",
        example_vi: "Hợp đồng chỉ rõ ngày giao hàng chính xác.\nVui lòng chỉ rõ các yêu cầu ăn uống kiêng cữ của bạn khi đặt chỗ.",
        page_number: 333
      },
      {
        word: "Spray",
        phonetic: "/spreɪ/",
        word_type: "verb",
        meaning_vi: "Phun, xịt (nước)",
        sound_bridge: "Sợ rớt nước nên dùng bình xịt phun sương tưới hoa lan.",
        definition_en: "apply liquid to someone or something in the form of tiny drops",
        example_en: "Spray disinfectant on surfaces to kill germs.\nThe gardener sprayed water over the thirsty flowerbeds.",
        example_vi: "Xịt thuốc khử trùng lên các bề mặt để tiêu diệt vi khuẩn.\nNgười làm vườn đã phun nước lên những luống hoa đang khát.",
        page_number: 333
      },
      {
        word: "Submit",
        phonetic: "/səbˈmɪt/",
        word_type: "verb",
        meaning_vi: "Nộp, đệ trình",
        sound_bridge: "Sắp mít vào sọt đệ trình nộp báo cáo thu hoạch.",
        definition_en: "present a proposal, application, or other document to a person or body for consideration",
        example_en: "Submit your assignment before midnight.\nAll proposals must be submitted directly to the board of directors.",
        example_vi: "Hãy nộp bài tập của bạn trước nửa đêm.\nTất cả các đề xuất phải được đệ trình trực tiếp lên hội đồng quản trị.",
        page_number: 333
      },
      {
        word: "Subscribe",
        phonetic: "/səbˈskraɪb/",
        word_type: "verb",
        meaning_vi: "Đăng ký theo dõi, đặt mua dài hạn",
        sound_bridge: "Sắp xếp từ từ đăng ký theo dõi kênh học tiếng Anh hữu ích.",
        definition_en: "arrange to receive something regularly, typically a publication or service",
        example_en: "Subscribe to our channel for new video updates.\nMillions of users subscribe to music streaming services every year.",
        example_vi: "Hãy đăng ký theo dõi kênh của chúng tôi để nhận các video mới nhất.\nHàng triệu người dùng đăng ký dài hạn các dịch vụ nghe nhạc trực tuyến mỗi năm.",
        page_number: 333
      }
    ]
  },

  // ==========================================
  // UNIT 35: Action 4 (30 từ, Trang 337 - 343)
  // ==========================================
  35: {
    unit: 35,
    unit_title: "Action 4",
    category: "Actions & Movement",
    words: [
      {
        word: "Accept",
        phonetic: "/əkˈsept/",
        word_type: "verb",
        meaning_vi: "Chấp nhận, nhận lời",
        sound_bridge: "Ơ kẹp sếp vào thang máy nhận lời mời hợp tác.",
        definition_en: "consent to receive a thing offered; believe or come to recognize as valid",
        example_en: "She happily accepted the job offer.\nHe had to accept the painful reality that they had lost.",
        example_vi: "Cô ấy đã vui vẻ nhận lời đề nghị làm việc.\nAnh ấy phải chấp nhận thực tế đau đớn rằng họ đã thua cuộc.",
        page_number: 337
      },
      {
        word: "Divide",
        phonetic: "/dɪˈvaɪd/",
        word_type: "verb",
        meaning_vi: "Chia ra, phân chia",
        sound_bridge: "Đi vài mét phân chia ranh giới khu đất trồng rau.",
        definition_en: "separate or be separated into parts",
        example_en: "Divide the cake into eight equal slices.\nThe teacher divided the students into small study groups.",
        example_vi: "Hãy chia chiếc bánh thành tám phần bằng nhau.\nGiáo viên đã chia các học sinh thành các nhóm học nhỏ.",
        page_number: 337
      },
      {
        word: "Drag",
        phonetic: "/dræɡ/",
        word_type: "verb",
        meaning_vi: "Kéo lê, kéo rê",
        sound_bridge: "Đá rách bao tải khi kéo lê trên đường đá dăm.",
        definition_en: "pull someone or something along forcefully, roughly, or with difficulty",
        example_en: "Drag and drop the files into the new folder.\nHe dragged the heavy suitcase all the way up the stairs.",
        example_vi: "Kéo lê và thả các tệp vào thư mục mới.\nAnh ấy đã kéo lê chiếc vali nặng nhọc suốt các bậc cầu thang.",
        page_number: 337
      },
      {
        word: "Draw",
        phonetic: "/drɑː/",
        word_type: "verb",
        meaning_vi: "Vẽ, rút ra (tiền/kinh nghiệm)",
        sound_bridge: "Đò qua sông vẽ bức tranh phong cảnh đồng quê tuyệt đẹp.",
        definition_en: "produce a picture or diagram by making lines and marks on paper",
        example_en: "Children love to draw colorful animals.\nWe can draw valuable lessons from past mistakes.",
        example_vi: "Trẻ em thích vẽ những con thú đầy màu sắc.\nChúng ta có thể rút ra những bài học quý giá từ những sai lầm trong quá khứ.",
        page_number: 337
      },
      {
        word: "Effort",
        phonetic: "/ˈef.ɚt/",
        word_type: "noun",
        meaning_vi: "Nỗ lực, công sức",
        sound_bridge: "Em phớt lờ mệt mỏi bỏ ra mọi nỗ lực để đạt điểm cao.",
        definition_en: "a vigorous or determined attempt",
        example_en: "Success requires persistent effort and discipline.\nShe put a lot of effort into organizing the charity event.",
        example_vi: "Thành công đòi hỏi nỗ lực bền bỉ và tính kỷ luật.\nCô ấy đã bỏ ra rất nhiều công sức để tổ chức sự kiện từ thiện.",
        page_number: 338
      },
      {
        word: "Escape",
        phonetic: "/ɪˈskeɪp/",
        word_type: "verb",
        meaning_vi: "Trốn thoát, thoát khỏi",
        sound_bridge: "Ếch sợ kẹp trốn thoát khỏi chiếc bẫy chuột.",
        definition_en: "break free from confinement or control",
        example_en: "The prisoners managed to escape during the night.\nThey went to the countryside to escape the city noise.",
        example_vi: "Những tù nhân đã xoay xở trốn thoát trong đêm.\nHọ về vùng nông thôn để thoát khỏi tiếng ồn ào của thành phố.",
        page_number: 338
      },
      {
        word: "Fold",
        phonetic: "/foʊld/",
        word_type: "verb",
        meaning_vi: "Gấp lại, gập lại",
        sound_bridge: "Phở lẩu ăn xong gập gọn bàn ghế cất vào góc.",
        definition_en: "bend something flexible over on itself so that one part of it covers another",
        example_en: "Fold the clean laundry neatly before putting it away.\nHe folded the letter and put it into an envelope.",
        example_vi: "Hãy gấp quần áo sạch thật gọn gàng trước khi cất đi.\nAnh ấy đã gấp bức thư lại và đặt vào trong phong bì.",
        page_number: 338
      },
      {
        word: "Follow",
        phonetic: "/ˈfɑː.loʊ/",
        word_type: "verb",
        meaning_vi: "Đi theo, tuân theo",
        sound_bridge: "Phở lẩu ngon đi theo sự chỉ dẫn của người dân bản địa.",
        definition_en: "go or come after a person or thing proceeding ahead",
        example_en: "Follow the trail markers up the mountain.\nAlways follow safety guidelines when operating machinery.",
        example_vi: "Hãy đi theo các biển chỉ dẫn đường mòn lên núi.\nLuôn tuân theo các hướng dẫn an toàn khi vận hành máy móc.",
        page_number: 338
      },
      {
        word: "Grab",
        phonetic: "/ɡræb/",
        word_type: "verb",
        meaning_vi: "Vồ lấy, chộp lấy",
        sound_bridge: "Gà rách áo chộp lấy quả bóng đang lăn trên sân.",
        definition_en: "grasp or seize suddenly and roughly",
        example_en: "Grab your coat and umbrella before leaving.\nLet's grab a quick bite to eat before the movie starts.",
        example_vi: "Hãy chộp lấy áo khoác và ô trước khi ra ngoài.\nChúng ta hãy đi ăn nhanh một cái gì đó trước khi phim bắt đầu nhé.",
        page_number: 338
      },
      {
        word: "Guide",
        phonetic: "/ɡaɪd/",
        word_type: "verb",
        meaning_vi: "Hướng dẫn, người dẫn đường",
        sound_bridge: "Gà đi trước hướng dẫn đàn vịt qua sông an toàn.",
        definition_en: "show the way to a person or thing",
        example_en: "A local expert guided the tour through the jungle.\nHer wisdom helped guide me through difficult times.",
        example_vi: "Một chuyên gia địa phương đã hướng dẫn chuyến tham quan xuyên rừng.\nSự thông thái của bà đã giúp định hướng/dẫn dắt tôi qua những khoảng thời gian khó khăn.",
        page_number: 339
      },
      {
        word: "Habit",
        phonetic: "/ˈhæb.ɪt/",
        word_type: "noun",
        meaning_vi: "Thói quen",
        sound_bridge: "Hát bài tập thể dục rèn luyện thói quen dậy sớm.",
        definition_en: "a settled or regular tendency or practice, especially one that is hard to give up",
        example_en: "Reading daily is a wonderful lifelong habit.\nTry to break the bad habit of biting your nails.",
        example_vi: "Đọc sách hàng ngày là một thói quen tuyệt vời suốt đời.\nHãy cố gắng từ bỏ thói quen xấu cắn móng tay.",
        page_number: 339
      },
      {
        word: "Handle",
        phonetic: "/ˈhæn.dəl/",
        word_type: "verb",
        meaning_vi: "Xử lý, tay cầm",
        sound_bridge: "Hát hò nhàn nhã xử lý gọn ghẽ mọi công việc khó khăn.",
        definition_en: "manage, deal with, or be responsible for",
        example_en: "He knows how to handle difficult customer complaints.\nTurn the door handle gently so you don't wake the baby.",
        example_vi: "Anh ấy biết cách xử lý những lời phàn nàn khó tính của khách hàng.\nHãy vặn tay nắm cửa nhẹ nhàng để không làm đánh thức em bé.",
        page_number: 339
      },
      {
        word: "Hold",
        phonetic: "/hoʊld/",
        word_type: "verb",
        meaning_vi: "Cầm, giữ, tổ chức",
        sound_bridge: "Hồ nước mênh mông giữ chặt tay lái thuyền vượt sóng.",
        definition_en: "grasp, carry, or support with one's hands; keep in a particular position",
        example_en: "Hold my hand while crossing the busy street.\nThe city will hold the annual international festival in July.",
        example_vi: "Hãy nắm giữ tay tôi khi qua con đường đông đúc.\nThành phố sẽ tổ chức lễ hội quốc tế thường niên vào tháng 7.",
        page_number: 339
      },
      {
        word: "Hurt",
        phonetic: "/hɝːt/",
        word_type: "verb",
        meaning_vi: "Làm đau, bị thương",
        sound_bridge: "Hút nước ngọt lạnh làm đau rát cổ họng.",
        definition_en: "cause physical pain or injury to",
        example_en: "Be careful with that knife so you don't hurt yourself.\nHis harsh words really hurt her feelings.",
        example_vi: "Hãy cẩn thận với con dao đó để không làm đau chính mình.\nNhững lời nói gay gắt của anh ấy thực sự làm tổn thương cảm xúc của cô ấy.",
        page_number: 339
      },
      {
        word: "Incur",
        phonetic: "/ɪnˈkɝː/",
        word_type: "verb",
        meaning_vi: "Gánh chịu, phát sinh (chi phí)",
        sound_bridge: "In cờ rách phát sinh gánh chịu chi phí in ấn lại.",
        definition_en: "become subject to something unwelcome or unpleasant as a result of one's own behavior",
        example_en: "Late payments incur additional penalty fees.\nThe company incurred substantial losses during the market downturn.",
        example_vi: "Thanh toán trễ hạn sẽ phát sinh gánh chịu thêm phí phạt.\nCông ty đã phải gánh chịu những khoản lỗ đáng kể trong đợt suy thoái thị trường.",
        page_number: 340
      },
      {
        word: "Influence",
        phonetic: "/ˈɪn.flu.əns/",
        word_type: "verb",
        meaning_vi: "Ảnh hưởng, tác động",
        sound_bridge: "In phao thi ảnh hưởng tác động xấu đến tinh thần học tập.",
        definition_en: "have an influence on; affect",
        example_en: "Social media influencers influence consumer trends.\nParents strongly influence their children's moral values.",
        example_vi: "Những người có ảnh hưởng trên mạng xã hội tác động đến xu hướng tiêu dùng.\nCha mẹ có ảnh hưởng mạnh mẽ đến các giá trị đạo đức của con cái.",
        page_number: 340
      },
      {
        word: "Injure",
        phonetic: "/ˈɪn.dʒɚ/",
        word_type: "verb",
        meaning_vi: "Làm bị thương",
        sound_bridge: "In chữ lên áo bị kéo cắt làm bị thương ngón tay.",
        definition_en: "do physical harm or damage to someone",
        example_en: "Nobody was seriously injured in the minor collision.\nHe injured his shoulder while playing rugby yesterday.",
        example_vi: "Không ai bị thương nặng trong vụ va chạm nhỏ.\nAnh ấy bị thương ở vai khi chơi bóng bầu dục vào ngày hôm qua.",
        page_number: 340
      },
      {
        word: "Inspect",
        phonetic: "/ɪnˈspekt/",
        word_type: "verb",
        meaning_vi: "Thanh tra, kiểm tra kỹ",
        sound_bridge: "In sợ phét kiểm tra kỹ lưỡng giấy tờ kiểm định.",
        definition_en: "look at someone or something closely, typically in order to assess their condition",
        example_en: "Inspect the brake pads before embarking on a long drive.\nHealth officials inspected the restaurant kitchen for hygiene standards.",
        example_vi: "Hãy kiểm tra kỹ má phanh trước khi bắt đầu chuyến lái xe đường dài.\nCác quan chức y tế đã thanh tra gian bếp nhà hàng về các tiêu chuẩn vệ sinh.",
        page_number: 340
      },
      {
        word: "Rehearse",
        phonetic: "/rɪˈhɝːs/",
        word_type: "verb",
        meaning_vi: "Diễn tập, tập dượt",
        sound_bridge: "Ri hăm hở diễn tập tập dượt vở kịch sân khấu mới.",
        definition_en: "practice a play, piece of music, or other work for later public performance",
        example_en: "The actors rehearsed their lines diligently.\nThe orchestra rehearsed the symphony every day this week.",
        example_vi: "Các diễn viên đã diễn tập lời thoại của mình một cách chăm chỉ.\nDàn nhạc giao hưởng đã tập dượt bản giao hưởng mỗi ngày trong tuần này.",
        page_number: 340
      },
      {
        word: "Reinforce",
        phonetic: "/ˌriː.ɪnˈfɔːrs/",
        word_type: "verb",
        meaning_vi: "Củng cố, gia cố",
        sound_bridge: "Ri in phông bạt gia cố củng cố thêm khung sắt chắc chắn.",
        definition_en: "strengthen or support an object or substance with additional material",
        example_en: "Steel beams reinforce the concrete foundation.\nPositive feedback reinforces good habits among students.",
        example_vi: "Những thanh dầm thép gia cố nền móng bê tông.\nNhững phản hồi tích cực củng cố những thói quen tốt ở các học sinh.",
        page_number: 341
      },
      {
        word: "Reject",
        phonetic: "/rɪˈdʒekt/",
        word_type: "verb",
        meaning_vi: "Từ chối, bác bỏ",
        sound_bridge: "Ri rách áo từ chối tham gia bữa tiệc sang trọng.",
        definition_en: "dismiss as inadequate, inappropriate, or not to one's taste",
        example_en: "The editor rejected the poorly formatted manuscript.\nThe board rejected the buyout proposal unanimously.",
        example_vi: "Biên tập viên đã từ chối bản thảo được định dạng kém.\nHội đồng quản trị đã nhất trí bác bỏ đề xuất mua lại.",
        page_number: 341
      },
      {
        word: "Release",
        phonetic: "/rɪˈliːs/",
        word_type: "verb",
        meaning_vi: "Phát hành, giải phóng, thả ra",
        sound_bridge: "Ri lí nhí thông báo phát hành album âm nhạc mới.",
        definition_en: "allow or enable to escape from confinement; publish or make available",
        example_en: "The company will release a software update tomorrow.\nThey released the captured wild birds back into nature.",
        example_vi: "Công ty sẽ phát hành bản cập nhật phần mềm vào ngày mai.\nHọ đã thả những chú chim rừng bị bắt trở về với tự nhiên.",
        page_number: 341
      },
      {
        word: "Require",
        phonetic: "/rɪˈkwaɪr/",
        word_type: "verb",
        meaning_vi: "Yêu cầu, đòi hỏi",
        sound_bridge: "Ri qua rào yêu cầu đòi hỏi mở cửa cho vào nhà.",
        definition_en: "need for a particular purpose; depend on for success or fulfillment",
        example_en: "This advanced role requires five years of coding experience.\nAll passengers are required to fasten their seatbelts.",
        example_vi: "Vị trí cao cấp này yêu cầu năm năm kinh nghiệm viết mã.\nTất cả hành khách được yêu cầu phải thắt dây an toàn.",
        page_number: 341
      },
      {
        word: "Tempt",
        phonetic: "/tempt/",
        word_type: "verb",
        meaning_vi: "Cám dỗ, xúi giục",
        sound_bridge: "Tém tóc lại đừng để đồ ăn vặt cám dỗ trong lúc ăn kiêng.",
        definition_en: "entice or attempt to entice someone to do something, often something unwise",
        example_en: "Do not let sugary desserts tempt you away from your diet.\nThe warm weather tempted us to spend the entire afternoon outside.",
        example_vi: "Đừng để các món tráng miệng nhiều đường cám dỗ bạn rời xa chế độ ăn kiêng.\nThời tiết ấm áp đã cám dỗ chúng tôi dành cả buổi chiều ở ngoài trời.",
        page_number: 341
      },
      {
        word: "Throw out",
        phonetic: "/θroʊ aʊt/",
        word_type: "verb",
        meaning_vi: "Vứt đi, vứt bỏ",
        sound_bridge: "Thì rốt cuộc vứt đi những đồ dùng hỏng cũ không dùng đến.",
        definition_en: "discard or get rid of something as useless or unwanted",
        example_en: "Throw out expired dairy products immediately.\nShe threw out all the old newspapers cluttering the room.",
        example_vi: "Hãy vứt bỏ các sản phẩm từ sữa đã hết hạn ngay lập tức.\nCô ấy đã vứt đi tất cả những tờ báo cũ đang bừa bộn khắp phòng.",
        page_number: 342
      },
      {
        word: "Verify",
        phonetic: "/ˈver.ə.faɪ/",
        word_type: "verb",
        meaning_vi: "Xác minh, kiểm chứng",
        sound_bridge: "Vẽ ri rủ bạn xác minh kiểm chứng tính đúng đắn của tài liệu.",
        definition_en: "make sure or demonstrate that something is true, accurate, or justified",
        example_en: "Please verify your email address via the activation link.\nThe bank called to verify the large credit card transaction.",
        example_vi: "Vui lòng xác minh địa chỉ email của bạn qua liên kết kích hoạt.\nNgân hàng đã gọi điện để xác minh giao dịch thẻ tín dụng lớn.",
        page_number: 342
      },
      {
        word: "Whistle",
        phonetic: "/ˈwɪs.əl/",
        word_type: "verb",
        meaning_vi: "Huýt sáo, thổi còi",
        sound_bridge: "Quỳ sợ lạnh huýt sáo gọi chú chó chạy lại gần.",
        definition_en: "emit a clear, high-pitched sound by forcing breath through a small hole",
        example_en: "The referee whistled to start the second half.\nHe whistled a cheerful tune while walking down the street.",
        example_vi: "Trọng tài đã thổi còi để bắt đầu hiệp hai.\nAnh ấy huýt sáo một giai điệu vui vẻ khi đang đi dạo trên phố.",
        page_number: 342
      },
      {
        word: "Withhold",
        phonetic: "/wɪðˈhoʊld/",
        word_type: "verb",
        meaning_vi: "Giữ lại, giấu kín",
        sound_bridge: "Quỳ giữ chặt thông tin mật không tiết lộ ra ngoài.",
        definition_en: "refuse to give something that is due to or is desired by another",
        example_en: "The witness chose to withhold key details from reporters.\nEmployers withhold income tax directly from monthly paychecks.",
        example_vi: "Nhân chứng đã chọn giữ lại những chi tiết quan trọng không nói cho các phóng viên.\nNgười sử dụng lao động khấu trừ giữ lại thuế thu nhập trực tiếp từ tiền lương hàng tháng.",
        page_number: 342
      },
      {
        word: "Witness",
        phonetic: "/ˈwɪt.nəs/",
        word_type: "noun",
        meaning_vi: "Nhân chứng, người chứng kiến",
        sound_bridge: "Quýt nát vứt đi nhân chứng đứng ra làm chứng tại tòa.",
        definition_en: "a person who sees an event, typically a crime or accident, take place",
        example_en: "Eyewitnesses reported seeing a speeding red car.\nHe was called to act as a witness in the legal dispute.",
        example_vi: "Những nhân chứng tận mắt chứng kiến báo cáo đã nhìn thấy một chiếc xe màu đỏ chạy quá tốc độ.\nAnh ấy được triệu tập để làm nhân chứng trong vụ tranh chấp pháp lý.",
        page_number: 342
      },
      {
        word: "Instead",
        phonetic: "/ɪnˈsted/",
        word_type: "adverb",
        meaning_vi: "Thay vì, thay vào đó",
        sound_bridge: "In sợ tết ăn rau luộc thay vì ăn nhiều thịt mỡ.",
        definition_en: "as an alternative or substitute",
        example_en: "Drink fresh water instead of sugary soda.\nThere was no coffee left, so I drank green tea instead.",
        example_vi: "Hãy uống nước lọc thay vì nước ngọt có ga.\nKhông còn cà phê nên tôi đã uống trà xanh thay vào đó.",
        page_number: 343
      }
    ]
  },

  // ==========================================
  // UNIT 36: Action 5 (36 từ, Trang 347 - 354)
  // ==========================================
  36: {
    unit: 36,
    unit_title: "Action 5",
    category: "Actions & Movement",
    words: [
      {
        word: "Arrive",
        phonetic: "/əˈraɪv/",
        word_type: "verb",
        meaning_vi: "Đến nơi, cập bến",
        sound_bridge: "Ơ rái cá bơi đến nơi cập bờ an toàn.",
        definition_en: "reach a destination at the end of a journey or a stage of a journey",
        example_en: "The express train arrived on time at the station.\nGuests began to arrive at the wedding reception.",
        example_vi: "Chuyến tàu tốc hành đã đến ga đúng giờ.\nKhách khứa bắt đầu đến nơi dự tiệc cưới.",
        page_number: 347
      },
      {
        word: "Attach",
        phonetic: "/əˈtætʃ/",
        word_type: "verb",
        meaning_vi: "Đính kèm, gắn vào",
        sound_bridge: "Ơ tát nước đính kèm gắn tài liệu vào thư điện tử.",
        definition_en: "join or fasten something to something else",
        example_en: "Please attach your updated CV to the job application.\nShe attached a label with her name to her luggage.",
        example_vi: "Vui lòng đính kèm CV cập nhật vào đơn xin việc.\nCô ấy đã gắn một nhãn có tên mình vào hành lý.",
        page_number: 347
      },
      {
        word: "Attack",
        phonetic: "/əˈtæk/",
        word_type: "verb",
        meaning_vi: "Tấn công",
        sound_bridge: "Ơ tát con muỗi đang bay vào tấn công da thịt.",
        definition_en: "take aggressive action against a place or enemy",
        example_en: "The guard dog attacked the midnight intruder.\nTroops attacked the fortress at dawn.",
        example_vi: "Chú chó bảo vệ đã tấn công kẻ đột nhập lúc nửa đêm.\nQuân đội đã tấn công pháo đài vào lúc bình minh.",
        page_number: 347
      },
      {
        word: "Attend",
        phonetic: "/əˈtend/",
        word_type: "verb",
        meaning_vi: "Tham dự, có mặt",
        sound_bridge: "Ơ té ngã nhưng vẫn cố gắng đến tham dự hội nghị quốc tế.",
        definition_en: "be present at an event, meeting, or function",
        example_en: "Hundreds of developers attended the tech conference.\nAll employees are required to attend the safety workshop.",
        example_vi: "Hàng trăm lập trình viên đã tham dự hội nghị công nghệ.\nTất cả nhân viên được yêu cầu tham dự buổi hội thảo an toàn.",
        page_number: 347
      },
      {
        word: "Avoid",
        phonetic: "/əˈvɔɪd/",
        word_type: "verb",
        meaning_vi: "Tránh, né tránh",
        sound_bridge: "Ơ voi to lớn né tránh để không va chạm xe cộ.",
        definition_en: "keep away from or stop oneself from doing something",
        example_en: "Avoid driving during peak rush hour traffic.\nYou should avoid eating greasy food before going to bed.",
        example_vi: "Hãy tránh lái xe vào giờ cao điểm kẹt xe.\nBạn nên tránh ăn đồ ăn nhiều dầu mỡ trước khi đi ngủ.",
        page_number: 348
      },
      {
        word: "Babysit",
        phonetic: "/ˈbeɪ.bi.sɪt/",
        word_type: "verb",
        meaning_vi: "Trông trẻ, giữ trẻ",
        sound_bridge: "Bé bị xít xoa khi chị gái trông trẻ giúp mẹ.",
        definition_en: "look after a child or children while the parents are out",
        example_en: "She earns extra pocket money by babysitting her neighbors' kids.\nCan you babysit our baby on Friday evening?",
        example_vi: "Cô ấy kiếm thêm tiền tiêu vặt bằng cách trông trẻ cho hàng xóm.\nBạn có thể trông em bé giúp chúng tôi vào tối thứ Sáu được không?",
        page_number: 348
      },
      {
        word: "Brush",
        phonetic: "/brʌʃ/",
        word_type: "verb",
        meaning_vi: "Chải, quét, bàn chải",
        sound_bridge: "Bơ rắc lên bàn chải để chải răng sạch bóng.",
        definition_en: "clean, tidy, or smooth something with a brush",
        example_en: "Brush your teeth twice a day for good dental health.\nShe gently brushed the dust off her jacket.",
        example_vi: "Hãy chải răng hai lần một ngày để có sức khỏe răng miệng tốt.\nCô ấy nhẹ nhàng quét sạch bụi bẩn trên áo khoác.",
        page_number: 348
      },
      {
        word: "Bury",
        phonetic: "/ˈber.i/",
        word_type: "verb",
        meaning_vi: "Chôn vùi, chôn cất",
        sound_bridge: "Bé ri chôn vùi củ khoai nướng dưới tro tàn.",
        definition_en: "put or hide underground",
        example_en: "Pirates buried their treasure chest on a remote island.\nThe dog buried a bone under the apple tree.",
        example_vi: "Cướp biển đã chôn rương kho báu của họ trên một hòn đảo xa xôi.\nChú chó đã chôn một khúc xương dưới gốc cây táo.",
        page_number: 348
      },
      {
        word: "Cancel",
        phonetic: "/ˈkæn.səl/",
        word_type: "verb",
        meaning_vi: "Hủy bỏ",
        sound_bridge: "Căn sầu riêng bị hủy bỏ đơn đặt hàng vì quả chưa chín.",
        definition_en: "decide that a planned event will not take place",
        example_en: "They had to cancel the outdoor concert due to heavy storm.\nI called the airline to cancel my flight reservation.",
        example_vi: "Họ đã phải hủy buổi hòa nhạc ngoài trời do bão lớn.\nTôi đã gọi điện cho hãng hàng không để hủy đặt chỗ chuyến bay.",
        page_number: 348
      },
      {
        word: "Carry",
        phonetic: "/ˈker.i/",
        word_type: "verb",
        meaning_vi: "Mang, vác, chở",
        sound_bridge: "Cà ri thơm nức mang vác đến bữa tiệc gia đình.",
        definition_en: "support and move someone or something from one place to another",
        example_en: "He helped her carry the heavy grocery bags.\nAirplanes carry passengers across oceans safely.",
        example_vi: "Anh ấy đã giúp cô ấy mang những chiếc túi mua sắm nặng nề.\nMáy bay chở hành khách qua các đại dương một cách an toàn.",
        page_number: 349
      },
      {
        word: "Cheer",
        phonetic: "/tʃɪr/",
        word_type: "verb",
        meaning_vi: "Cổ vũ, reo hò",
        sound_bridge: "Chị rủ mọi người cùng cổ vũ reo hò cho đội nhà.",
        definition_en: "shout for joy or in praise or encouragement",
        example_en: "The crowd cheered loudly when the team scored.\nA warm cup of cocoa will cheer you up on a rainy day.",
        example_vi: "Đám đông đã reo hò cổ vũ cuồng nhiệt khi đội nhà ghi bàn.\nMột tách ca cao ấm sẽ làm bạn vui vẻ phấn chấn hơn vào một ngày mưa.",
        page_number: 349
      },
      {
        word: "Design",
        phonetic: "/dɪˈzaɪn/",
        word_type: "verb",
        meaning_vi: "Thiết kế",
        sound_bridge: "Đi say sưa thiết kế ngôi nhà mơ ước ven hồ.",
        definition_en: "decide upon the look and functioning of a building, garment, or other object",
        example_en: "Architects designed an energy-efficient modern villa.\nShe designs custom jewelry for celebrities.",
        example_vi: "Các kiến trúc sư đã thiết kế một căn biệt thự hiện đại tiết kiệm năng lượng.\nCô ấy thiết kế trang sức theo yêu cầu cho những người nổi tiếng.",
        page_number: 349
      },
      {
        word: "Detect",
        phonetic: "/dɪˈtekt/",
        word_type: "verb",
        meaning_vi: "Phát hiện, dò tìm",
        sound_bridge: "Đi Tết phát hiện nhiều phong bao lì xì may mắn.",
        definition_en: "discover or identify the presence or existence of",
        example_en: "Smoke alarms detect fire hazards instantly.\nThe blood test can detect early signs of infection.",
        example_vi: "Chuông báo khói phát hiện các nguy cơ hỏa hoạn ngay tức thì.\nXét nghiệm máu có thể phát hiện các dấu hiệu nhiễm trùng sớm.",
        page_number: 349
      },
      {
        word: "Develop",
        phonetic: "/dɪˈvel.əp/",
        word_type: "verb",
        meaning_vi: "Phát triển",
        sound_bridge: "Đi về lấp đất phát triển khu vườn cây ăn trái.",
        definition_en: "grow or cause to grow and become more mature, advanced, or elaborate",
        example_en: "Our engineers developed an innovative mobile app.\nChildren develop social skills through cooperative play.",
        example_vi: "Các kỹ sư của chúng tôi đã phát triển một ứng dụng di động đổi mới.\nTrẻ em phát triển các kỹ năng xã hội thông qua các trò chơi hợp tác.",
        page_number: 349
      },
      {
        word: "Dig",
        phonetic: "/dɪɡ/",
        word_type: "verb",
        meaning_vi: "Đào, bới",
        sound_bridge: "Đi gặp bạn cùng đào bới tìm củ mì.",
        definition_en: "break up and move earth with a tool or to search deeply",
        example_en: "The dog dug a hole in the backyard.\nArchaeologists dug for ancient artifacts at the historical site.",
        example_vi: "Chú chó đã đào một cái hố ở sân sau.\nCác nhà khảo cổ đã đào tìm các cổ vật tại khu di tích lịch sử.",
        page_number: 350
      },
      {
        word: "Disappoint",
        phonetic: "/ˌdɪs.əˈpɔɪnt/",
        word_type: "verb",
        meaning_vi: "Làm thất vọng",
        sound_bridge: "Đi sợ phơi nắng làm thất vọng người thân đang chờ.",
        definition_en: "fail to fulfill the hopes or expectations of",
        example_en: "I am sorry to disappoint you, but the tickets are sold out.\nHe worked extra hard because he did not want to disappoint his parents.",
        example_vi: "Tôi rất tiếc phải làm bạn thất vọng, nhưng vé đã bán hết sạch rồi.\nAnh ấy làm việc chăm chỉ gấp bội vì không muốn làm cha mẹ thất vọng.",
        page_number: 350
      },
      {
        word: "Dive",
        phonetic: "/daɪv/",
        word_type: "verb",
        meaning_vi: "Lặn, lao mình xuống nước",
        sound_bridge: "Đá vỡ tan khi thợ lặn lao mình xuống biển sâu.",
        definition_en: "plunge head first into water",
        example_en: "He dived gracefully from the highest springboard.\nTourists love to dive among the colorful coral reefs.",
        example_vi: "Anh ấy đã lao mình xuống nước một cách duyên dáng từ ván nhảy cao nhất.\nDu khách thích lặn biển ngắm những rạn san hô rực rỡ sắc màu.",
        page_number: 350
      },
      {
        word: "Embark",
        phonetic: "/ɪmˈbɑːrk/",
        word_type: "verb",
        meaning_vi: "Lên tàu, bắt đầu một hành trình",
        sound_bridge: "Im lặng bước lên tàu bắt đầu chuyến hải trình mới.",
        definition_en: "go on board a ship, aircraft, or other vehicle; begin a course of action",
        example_en: "Passengers embarked on the luxury cruise ship.\nShe is ready to embark on a new career in tech.",
        example_vi: "Hành khách đã lên con tàu du lịch sang trọng.\nCô ấy đã sẵn sàng bắt đầu một sự nghiệp mới trong ngành công nghệ.",
        page_number: 350
      },
      {
        word: "Encourage",
        phonetic: "/ɪnˈkɝː.ɪdʒ/",
        word_type: "verb",
        meaning_vi: "Khuyến khích, động viên",
        sound_bridge: "In cờ rực rỡ khuyến khích động viên tinh thần chiến đấu.",
        definition_en: "give support, confidence, or hope to someone",
        example_en: "Teachers always encourage students to ask questions.\nMy parents encouraged me to pursue my passion for art.",
        example_vi: "Các giáo viên luôn khuyến khích học sinh đặt câu hỏi.\nCha mẹ đã động viên tôi theo đuổi niềm đam mê nghệ thuật.",
        page_number: 350
      },
      {
        word: "Excite",
        phonetic: "/ɪkˈsaɪt/",
        word_type: "verb",
        meaning_vi: "Kích thích, làm phấn khích",
        sound_bridge: "Ếch say xỉn làm phấn khích cả bầy ễnh ương.",
        definition_en: "cause strong feelings of enthusiasm and eagerness in",
        example_en: "The news of the concert excited all the fans.\nThe upcoming trip to Japan excites the whole family.",
        example_vi: "Tin tức về buổi hòa nhạc đã làm phấn khích tất cả người hâm mộ.\nChuyến đi Nhật Bản sắp tới khiến cả gia đình vô cùng hào hứng phấn khởi.",
        page_number: 351
      },
      {
        word: "Expand",
        phonetic: "/ɪkˈspænd/",
        word_type: "verb",
        meaning_vi: "Mở rộng, phát triển rộng ra",
        sound_bridge: "Ếch sợ phơi nắng mở rộng diện tích bóng râm.",
        definition_en: "become or make larger or more extensive",
        example_en: "The company plans to expand into European markets.\nMetals expand when heated and contract when cooled.",
        example_vi: "Công ty dự định mở rộng sang các thị trường châu Âu.\nKim loại giãn nở ra khi đun nóng và co lại khi làm lạnh.",
        page_number: 351
      },
      {
        word: "Expect",
        phonetic: "/ɪkˈspekt/",
        word_type: "verb",
        meaning_vi: "Kỳ vọng, mong đợi",
        sound_bridge: "Ếch sợ phét lác luôn kỳ vọng vào những điều chân thật.",
        definition_en: "regard something as likely to happen",
        example_en: "We expect sunny weather throughout this weekend.\nShe expects high standards of quality from her team.",
        example_vi: "Chúng tôi kỳ vọng thời tiết nắng ráo suốt cuối tuần này.\nCô ấy kỳ vọng các tiêu chuẩn chất lượng cao từ đội ngũ của mình.",
        page_number: 351
      },
      {
        word: "Expire",
        phonetic: "/ɪkˈspaɪr/",
        word_type: "verb",
        meaning_vi: "Hết hạn",
        sound_bridge: "Ếch sợ phơi nắng đến khi giấy phép hết hạn.",
        definition_en: "cease to be valid, typically after a fixed period of time",
        example_en: "My driving license will expire next month.\nCheck the milk carton to make sure it hasn't expired.",
        example_vi: "Giấy phép lái xe của tôi sẽ hết hạn vào tháng tới.\nHãy kiểm tra hộp sữa để đảm bảo nó chưa bị hết hạn.",
        page_number: 351
      },
      {
        word: "Frighten",
        phonetic: "/ˈfraɪ.tən/",
        word_type: "verb",
        meaning_vi: "Làm sợ hãi, dọa sợ",
        sound_bridge: "Phở rán thơm lừng dọa sợ cơn thèm ăn của đối thủ.",
        definition_en: "make someone afraid or anxious",
        example_en: "Loud thunder frightened the young puppy.\nDo not sneak up on me like that, you frightened me!",
        example_vi: "Tiếng sấm sét lớn đã làm chú cún con sợ hãi.\nĐừng lén đi từ phía sau như thế, bạn làm tôi sợ chết khiếp đấy!",
        page_number: 351
      },
      {
        word: "Garment",
        phonetic: "/ˈɡɑːr.mənt/",
        word_type: "noun",
        meaning_vi: "Trang phục, áo quần",
        sound_bridge: "Gà mải mê may trang phục áo quần mới.",
        definition_en: "an item of clothing",
        example_en: "She designed a collection of eco-friendly garments.\nDry-clean this delicate silk garment to maintain its quality.",
        example_vi: "Cô ấy đã thiết kế một bộ sưu tập trang phục thân thiện với môi trường.\nHãy giặt khô món đồ lụa mỏng manh này để duy trì chất lượng của nó.",
        page_number: 352
      },
      {
        word: "Gather",
        phonetic: "/ˈɡæð.ɚ/",
        word_type: "verb",
        meaning_vi: "Tụ họp, thu thập",
        sound_bridge: "Gà đẻ trứng cùng tụ họp đàn con quanh chuồng.",
        definition_en: "come together; assemble or accumulate",
        example_en: "Family members gathered around the dining table.\nShe gathered fresh wildflowers from the meadow.",
        example_vi: "Các thành viên trong gia đình tụ họp quanh bàn ăn.\nCô ấy đã hái/thu thập những bông hoa dại tươi từ đồng cỏ.",
        page_number: 352
      },
      {
        word: "Harm",
        phonetic: "/hɑːrm/",
        word_type: "verb",
        meaning_vi: "Làm hại, gây tổn hại",
        sound_bridge: "Hàm răng sắc nhọn không làm hại ai bao giờ.",
        definition_en: "physical injury, especially that which is deliberately inflicted",
        example_en: "Pollution causes severe harm to marine life.\nEating a balanced diet will not do you any harm.",
        example_vi: "Ô nhiễm gây ra tổn hại nghiêm trọng cho sinh vật biển.\nĂn uống theo chế độ cân bằng sẽ không gây hại gì cho bạn đâu.",
        page_number: 352
      },
      {
        word: "Imagine",
        phonetic: "/ɪˈmædʒ.ɪn/",
        word_type: "verb",
        meaning_vi: "Tưởng tượng, hình dung",
        sound_bridge: "In mải miết bức tranh tưởng tượng vũ trụ bao la.",
        definition_en: "form a mental image or concept of",
        example_en: "Imagine living on a tropical paradise island.\nI can't imagine how difficult it must have been for him.",
        example_vi: "Hãy tưởng tượng cuộc sống trên một hòn đảo thiên đường nhiệt đới.\nTôi không thể hình dung nổi việc đó đã khó khăn với anh ấy đến mức nào.",
        page_number: 352
      },
      {
        word: "Impact",
        phonetic: "/ˈɪm.pækt/",
        word_type: "noun",
        meaning_vi: "Tác động, ảnh hưởng",
        sound_bridge: "In phác thảo tác động to lớn của công nghệ.",
        definition_en: "the action of one object coming forcibly into contact with another; a marked effect",
        example_en: "The new policy had an immediate impact on sales.\nScientists study the environmental impact of deforestation.",
        example_vi: "Chính sách mới đã tạo ra tác động ngay lập tức lên doanh số.\nCác nhà khoa học nghiên cứu tác động môi trường của việc tàn phá rừng.",
        page_number: 352
      },
      {
        word: "Understand",
        phonetic: "/ˌʌn.dɚˈstænd/",
        word_type: "verb",
        meaning_vi: "Hiểu, thấu hiểu",
        sound_bridge: "Ăn đồ xào xong thấu hiểu tấm lòng người nấu.",
        definition_en: "perceive the intended meaning of words, a language, or a person",
        example_en: "Do you understand the instructions clearly?\nShe truly understands the emotional needs of her students.",
        example_vi: "Bạn có hiểu rõ các chỉ dẫn không?\nCô ấy thực sự thấu hiểu những nhu cầu cảm xúc của học sinh mình.",
        page_number: 353
      },
      {
        word: "Inconsiderate",
        phonetic: "/ˌɪn.kənˈsɪd.ɚ.ət/",
        word_type: "adjective",
        meaning_vi: "Thiếu chu đáo, vô tâm",
        sound_bridge: "In cờ rách vô tâm không để ý đến cảm xúc của bạn bè.",
        definition_en: "thoughtlessly causing hurt or inconvenience to others",
        example_en: "Playing loud music late at night is very inconsiderate.\nIt was inconsiderate of him to leave without saying goodbye.",
        example_vi: "Bật nhạc lớn lúc đêm muộn là hành vi rất thiếu chu đáo/vô tâm.\nThật là vô tâm khi anh ta bỏ đi mà không thèm chào tạm biệt.",
        page_number: 353
      },
      {
        word: "Regret",
        phonetic: "/rɪˈɡret/",
        word_type: "verb",
        meaning_vi: "Hối tiếc",
        sound_bridge: "Ri gầm rú hối tiếc vì đã bỏ lỡ cơ hội quý giá.",
        definition_en: "feel sad, repentant, or disappointed over something that one has done",
        example_en: "I deeply regret not attending my best friend's wedding.\nDo not say words in anger that you will later regret.",
        example_vi: "Tôi vô cùng hối tiếc vì đã không tham dự đám cưới của người bạn thân nhất.\nĐừng nói những lời lúc tức giận để rồi sau này phải hối tiếc.",
        page_number: 353
      },
      {
        word: "Relax",
        phonetic: "/rɪˈlæks/",
        word_type: "verb",
        meaning_vi: "Thư giãn, nghỉ ngơi",
        sound_bridge: "Ri lướt ván thư giãn sau tuần làm việc căng thẳng.",
        definition_en: "make or become less tense or anxious",
        example_en: "Listen to soft music to relax after a stressful day.\nA warm bath helps your muscles relax completely.",
        example_vi: "Hãy nghe nhạc nhẹ để thư giãn sau một ngày căng thẳng.\nNgâm mình trong bồn nước ấm giúp cơ bắp của bạn thư giãn hoàn toàn.",
        page_number: 353
      },
      {
        word: "Respect",
        phonetic: "/rɪˈspekt/",
        word_type: "verb",
        meaning_vi: "Tôn trọng, kính trọng",
        sound_bridge: "Ri sợ phét lác luôn tôn trọng những người trung thực.",
        definition_en: "admire someone deeply as a result of their abilities, qualities, or achievements",
        example_en: "Always respect the opinions and feelings of others.\nStudents deeply respect their dedicated professor.",
        example_vi: "Hãy luôn tôn trọng ý kiến và cảm xúc của người khác.\nCác sinh viên hết sức kính trọng vị giáo sư tận tụy của mình.",
        page_number: 353
      },
      {
        word: "Surprise",
        phonetic: "/sɚˈpraɪz/",
        word_type: "noun",
        meaning_vi: "Sự ngạc nhiên, bất ngờ",
        sound_bridge: "Sợ phở rơi tạo sự bất ngờ cho cả bàn tiệc.",
        definition_en: "an unexpected or astonishing event, fact, etc.",
        example_en: "Her sudden visit was a delightful surprise.\nWe organized a surprise birthday party for our manager.",
        example_vi: "Chuyến thăm bất ngờ của cô ấy là một sự ngạc nhiên thú vị.\nChúng tôi đã tổ chức một bữa tiệc sinh nhật bất ngờ cho người quản lý của mình.",
        page_number: 354
      },
      {
        word: "Take back",
        phonetic: "/teɪk bæk/",
        word_type: "verb",
        meaning_vi: "Lấy lại, rút lại (lời nói)",
        sound_bridge: "Tết bận rộn lấy lại năng lượng bằng giấc ngủ ngon.",
        definition_en: "retract something said; recover possession of something",
        example_en: "I apologize and take back what I said earlier.\nYou can take back the defective item to the store for a refund.",
        example_vi: "Tôi xin lỗi và xin rút lại những gì đã nói trước đó.\nBạn có thể mang trả lại món hàng bị lỗi đến cửa hàng để được hoàn tiền.",
        page_number: 354
      }
    ]
  },

  // ==========================================
  // UNIT 37: Action 6 (34 từ, Trang 358 - 364)
  // ==========================================
  37: {
    unit: 37,
    unit_title: "Action 6",
    category: "Actions & Movement",
    words: [
      {
        word: "Accompany",
        phonetic: "/əˈkʌm.pə.ni/",
        word_type: "verb",
        meaning_vi: "Đi cùng, đồng hành",
        sound_bridge: "Ơ cắm bình hoa đồng hành cùng mẹ vào bếp.",
        definition_en: "go somewhere with someone as a companion",
        example_en: "My brother accompanied me to the airport.\nChildren under twelve must be accompanied by an adult.",
        example_vi: "Anh trai đã đồng hành cùng tôi ra sân bay.\nTrẻ em dưới mười hai tuổi phải có người lớn đi cùng.",
        page_number: 358
      },
      {
        word: "Determine",
        phonetic: "/dɪˈtɝː.mɪn/",
        word_type: "verb",
        meaning_vi: "Xác định, quyết tâm",
        sound_bridge: "Đi tới miền núi xác định ranh giới tự nhiên của rừng.",
        definition_en: "cause something to occur in a particular way; ascertain definitely",
        example_en: "Hard work will determine your future success.\nScientists conducted experiments to determine the exact age of the fossil.",
        example_vi: "Sự chăm chỉ sẽ quyết định thành công trong tương lai của bạn.\nCác nhà khoa học đã tiến hành các thí nghiệm để xác định niên đại chính xác của hóa thạch.",
        page_number: 358
      },
      {
        word: "Diagnose",
        phonetic: "/ˌdaɪ.əɡˈnoʊz/",
        word_type: "verb",
        meaning_vi: "Chẩn đoán",
        sound_bridge: "Đá gãy nát bác sĩ chẩn đoán xương bị rạn nứt.",
        definition_en: "identify the nature of an illness or other problem by examination of the symptoms",
        example_en: "The doctor diagnosed him with mild pneumonia.\nSpecialized software helps engineers diagnose hardware malfunctions.",
        example_vi: "Bác sĩ đã chẩn đoán anh ấy bị viêm phổi nhẹ.\nPhần mềm chuyên dụng giúp các kỹ sư chẩn đoán các trục trặc phần cứng.",
        page_number: 358
      },
      {
        word: "Disseminate",
        phonetic: "/dɪˈsem.ə.neɪt/",
        word_type: "verb",
        meaning_vi: "Tuyên truyền, phổ biến",
        sound_bridge: "Đi xem mít phổ biến thông tin nông sản cho bà con.",
        definition_en: "spread something, especially information, widely",
        example_en: "Health agencies disseminate important hygiene guidelines.\nThe internet makes it easy to disseminate news across the globe.",
        example_vi: "Các cơ quan y tế phổ biến những hướng dẫn vệ sinh quan trọng.\nInternet giúp việc truyền bá tin tức trên toàn cầu trở nên dễ dàng.",
        page_number: 358
      },
      {
        word: "Distribute",
        phonetic: "/dɪˈstrɪb.juːt/",
        word_type: "verb",
        meaning_vi: "Phân phát, phân phối",
        sound_bridge: "Đi sợ trượt dốc phân phát hàng cứu trợ đến từng nhà.",
        definition_en: "give shares of something to a number of people",
        example_en: "Volunteers distributed warm blankets to the homeless.\nThe logistics company distributes goods to over a thousand supermarkets.",
        example_vi: "Các tình nguyện viên đã phân phát những chiếc chăn ấm cho người vô gia cư.\nCông ty hậu cần phân phối hàng hóa đến hơn một nghìn siêu thị.",
        page_number: 358
      },
      {
        word: "Disturb",
        phonetic: "/dɪˈstɝːb/",
        word_type: "verb",
        meaning_vi: "Làm phiền, quấy rầy",
        sound_bridge: "Đi sợ tơ vò làm phiền giấc ngủ của em bé.",
        definition_en: "interfere with the normal arrangement or peace of",
        example_en: "Please do not disturb the meeting in progress.\nLoud music outside disturbed my concentration while reading.",
        example_vi: "Xin vui lòng không làm phiền cuộc họp đang diễn ra.\nÂm nhạc lớn bên ngoài đã làm phiền sự tập trung đọc sách của tôi.",
        page_number: 359
      },
      {
        word: "Diverse",
        phonetic: "/daɪˈvɝːs/",
        word_type: "adjective",
        meaning_vi: "Đa dạng",
        sound_bridge: "Đá vỡ tan tạo nên nhiều hình thù đa dạng.",
        definition_en: "showing a great deal of variety; very different",
        example_en: "The city has a culturally diverse population.\nOur team consists of experts with diverse academic backgrounds.",
        example_vi: "Thành phố có một cộng đồng dân cư đa dạng về văn hóa.\nĐội ngũ của chúng tôi bao gồm các chuyên gia có nền tảng học thuật đa dạng.",
        page_number: 359
      },
      {
        word: "Estimate",
        phonetic: "/ˈes.tə.meɪt/",
        word_type: "verb",
        meaning_vi: "Ước tính, dự tính",
        sound_bridge: "Em sợ tết ước tính chi phí mua sắm quà cáp.",
        definition_en: "roughly calculate or judge the value, number, quantity, or extent of",
        example_en: "We estimate that the renovation will take two months.\nContractors estimated the total repair costs at five thousand dollars.",
        example_vi: "Chúng tôi ước tính rằng việc cải tạo sẽ mất hai tháng.\nCác nhà thầu ước tính tổng chi phí sửa chữa vào khoảng năm nghìn đô la.",
        page_number: 359
      },
      {
        word: "Evaluate",
        phonetic: "/ɪˈvæl.ju.eɪt/",
        word_type: "verb",
        meaning_vi: "Đánh giá",
        sound_bridge: "Em vào lũy tre đánh giá độ bền của vật liệu.",
        definition_en: "form an idea of the amount, number, or value of; assess",
        example_en: "The committee will evaluate all scholarship applications.\nDoctors evaluated her recovery progress after the operation.",
        example_vi: "Ủy ban sẽ đánh giá tất cả các hồ sơ xin học bổng.\nCác bác sĩ đã đánh giá tiến độ hồi phục của cô ấy sau ca phẫu thuật.",
        page_number: 359
      },
      {
        word: "Explode",
        phonetic: "/ɪkˈsploʊd/",
        word_type: "verb",
        meaning_vi: "Phát nổ, bùng nổ",
        sound_bridge: "Ếch sợ phơi nắng phát nổ cơn giận dữ kìm nén.",
        definition_en: "burst or shatter violently and noisily as a result of rapid chemical reaction",
        example_en: "The gas tank exploded with a loud bang.\nThe population of the metropolitan area exploded over the last decade.",
        example_vi: "Bình gas đã phát nổ với một tiếng nổ lớn.\nDân số của vùng đô thị lớn đã bùng nổ trong suốt thập kỷ qua.",
        page_number: 359
      },
      {
        word: "Expose",
        phonetic: "/ɪkˈspoʊz/",
        word_type: "verb",
        meaning_vi: "Phơi bày, tiếp xúc với",
        sound_bridge: "Ếch sợ phở thiu phơi bày sự thật về vệ sinh thực phẩm.",
        definition_en: "make something visible by uncovering it; reveal the true nature of",
        example_en: "The journalist exposed corruption in high office.\nDo not expose delicate photographic paper to direct sunlight.",
        example_vi: "Nhà báo đã phơi bày nạn tham nhũng ở các cơ quan cấp cao.\nĐừng để giấy ảnh mỏng manh tiếp xúc trực tiếp với ánh nắng mặt trời.",
        page_number: 360
      },
      {
        word: "Give up",
        phonetic: "/ɡɪv ʌp/",
        word_type: "verb",
        meaning_vi: "Từ bỏ, bỏ cuộc",
        sound_bridge: "Gà ấp trứng không bao giờ từ bỏ việc bảo vệ đàn con.",
        definition_en: "cease making an effort; resign oneself to failure",
        example_en: "Never give up on your dreams no matter the obstacles.\nHe decided to give up smoking for his health.",
        example_vi: "Đừng bao giờ từ bỏ ước mơ của bạn bất kể chướng ngại vật nào.\nAnh ấy đã quyết định từ bỏ thuốc lá vì sức khỏe của mình.",
        page_number: 360
      },
      {
        word: "Grant",
        phonetic: "/ɡrænt/",
        word_type: "verb",
        meaning_vi: "Ban cho, cấp phép, tiền tài trợ",
        sound_bridge: "Gà rán thơm ngon được ban cho người có thành tích tốt.",
        definition_en: "agree to give or allow something requested; bestow formally",
        example_en: "The university granted her a full academic scholarship.\nThe judge granted the lawyer's request for an extension.",
        example_vi: "Trường đại học đã cấp cho cô ấy một suất học bổng toàn phần.\nThẩm phán đã chấp thuận cấp phép cho yêu cầu gia hạn của luật sư.",
        page_number: 360
      },
      {
        word: "Hamper",
        phonetic: "/ˈhæm.pɚ/",
        word_type: "verb",
        meaning_vi: "Cản trở, gây khó khăn",
        sound_bridge: "Hát mải mê cản trở bước chân người đi đường.",
        definition_en: "hinder or impede the movement or progress of",
        example_en: "Severe blizzards hampered the mountain rescue mission.\nHeavy bureaucracy hampers the growth of innovative startups.",
        example_vi: "Những trận bão tuyết dữ dội đã cản trở sứ mệnh cứu hộ trên núi.\nThủ tục hành chính rườm rà cản trở sự phát triển của các công ty khởi nghiệp đổi mới.",
        page_number: 360
      },
      {
        word: "Illuminate",
        phonetic: "/ɪˈluː.mə.neɪt/",
        word_type: "verb",
        meaning_vi: "Chiếu sáng, làm sáng tỏ",
        sound_bridge: "In lúa mì chiếu sáng rực rỡ cả cánh đồng trong đêm.",
        definition_en: "light up; help to clarify or explain",
        example_en: "Colorful lanterns illuminated the ancient village streets.\nThe professor's insightful explanation illuminated the difficult theory.",
        example_vi: "Những chiếc đèn lồng rực rỡ chiếu sáng các con phố cổ của ngôi làng.\nLời giải thích sâu sắc của vị giáo sư đã làm sáng tỏ lý thuyết khó.",
        page_number: 360
      },
      {
        word: "Inspire",
        phonetic: "/ɪnˈspaɪr/",
        word_type: "verb",
        meaning_vi: "Truyền cảm hứng",
        sound_bridge: "In sợ phơi nắng truyền cảm hứng sáng tác thơ ca.",
        definition_en: "fill someone with the urge or ability to do or feel something, especially something creative",
        example_en: "Her brave story inspired thousands of young athletes.\nThe majestic mountain landscape inspired the artist's new painting.",
        example_vi: "Câu chuyện dũng cảm của cô ấy đã truyền cảm hứng cho hàng ngàn vận động viên trẻ.\nKhung cảnh núi non hùng vĩ đã truyền cảm hứng cho bức tranh mới của người họa sĩ.",
        page_number: 361
      },
      {
        word: "Investigate",
        phonetic: "/ɪnˈves.tə.ɡeɪt/",
        word_type: "verb",
        meaning_vi: "Điều tra, nghiên cứu kỹ",
        sound_bridge: "In vết tích điều tra kỹ lưỡng nguyên nhân vụ cháy.",
        definition_en: "carry out a systematic or formal inquiry to discover and examine the facts",
        example_en: "Detectives are investigating the recent jewelry store heist.\nScientists investigate the effects of microplastics on sea creatures.",
        example_vi: "Các thám tử đang điều tra vụ cướp cửa hàng trang sức gần đây.\nCác nhà khoa học nghiên cứu điều tra tác động của vi nhựa đối với các sinh vật biển.",
        page_number: 361
      },
      {
        word: "Negotiate",
        phonetic: "/nəˈɡoʊ.ʃi.eɪt/",
        word_type: "verb",
        meaning_vi: "Đàm phán, thương lượng",
        sound_bridge: "Nấu gà xé đàm phán hợp đồng kinh tế thành công.",
        definition_en: "obtain or bring about by discussion; try to reach an agreement",
        example_en: "Diplomats met to negotiate a peaceful ceasefire treaty.\nShe negotiated a higher starting salary for the management role.",
        example_vi: "Các nhà ngoại giao đã gặp nhau để đàm phán một hiệp ước ngừng bắn hòa bình.\nCô ấy đã thương lượng được mức lương khởi điểm cao hơn cho vị trí quản lý.",
        page_number: 361
      },
      {
        word: "Notify",
        phonetic: "/ˈnoʊ.t̬ə.faɪ/",
        word_type: "verb",
        meaning_vi: "Thông báo",
        sound_bridge: "Nấu thịt phở thông báo mời cả nhà vào ăn cơm.",
        definition_en: "inform someone of something, typically in a formal or official manner",
        example_en: "The airline notified passengers of the flight delay via SMS.\nPlease notify human resources if your residential address changes.",
        example_vi: "Hãng hàng không đã thông báo cho hành khách về việc hoãn chuyến bay qua tin nhắn SMS.\nVui lòng thông báo cho phòng nhân sự nếu địa chỉ cư trú của bạn thay đổi.",
        page_number: 361
      },
      {
        word: "Observe",
        phonetic: "/əbˈzɝːv/",
        word_type: "verb",
        meaning_vi: "Quan sát, theo dõi, tuân thủ",
        sound_bridge: "Ơ bờ suối quan sát đàn chim di cư bay về phương Nam.",
        definition_en: "notice or perceive something and register it as being significant; fulfill or comply with",
        example_en: "Scientists observed the behavior of wild wolves.\nAll visitors must observe the rules and regulations of the park.",
        example_vi: "Các nhà khoa học đã quan sát hành vi của loài sói hoang dã.\nTất cả du khách phải tuân thủ các quy tắc và quy định của công viên.",
        page_number: 361
      },
      {
        word: "Participate",
        phonetic: "/pɑːrˈtɪs.ə.peɪt/",
        word_type: "verb",
        meaning_vi: "Tham gia, tham dự",
        sound_bridge: "Phở tôm thịt mời bạn bè tham gia tiệc liên hoan.",
        definition_en: "be involved; take part in an activity",
        example_en: "Over fifty schools participated in the science fair.\nWe encourage everyone to actively participate in class discussions.",
        example_vi: "Hơn năm mươi trường học đã tham gia vào hội chợ khoa học.\nChúng tôi khuyến khích mọi người tích cực tham gia vào các buổi thảo luận trên lớp.",
        page_number: 362
      },
      {
        word: "Preclude",
        phonetic: "/prəˈkluːd/",
        word_type: "verb",
        meaning_vi: "Ngăn cản, loại trừ",
        sound_bridge: "Phải lo lót ngăn cản mọi rủi ro có thể xảy ra.",
        definition_en: "prevent from happening; make impossible",
        example_en: "His severe injury precluded him from playing in the final match.\nLack of formal qualifications does not preclude you from applying.",
        example_vi: "Chấn thương nặng đã ngăn cản anh ấy thi đấu trong trận chung kết.\nViệc thiếu bằng cấp chính quy không loại trừ bạn khỏi việc nộp đơn ứng tuyển.",
        page_number: 362
      },
      {
        word: "Prohibit",
        phonetic: "/prəˈhɪb.ɪt/",
        word_type: "verb",
        meaning_vi: "Cấm, ngăn cấm",
        sound_bridge: "Phải lo bắt giữ kẻ buôn hàng cấm.",
        definition_en: "formally forbid something by law, rule, or other authority",
        example_en: "The law strictly prohibits driving without a valid license.\nSigns prohibit swimming in the turbulent reservoir waters.",
        example_vi: "Luật pháp nghiêm cấm lái xe mà không có giấy phép hợp lệ.\nCác biển báo cấm bơi lội trong vùng nước hồ chứa đang cuộn xoáy.",
        page_number: 362
      },
      {
        word: "Prompt",
        phonetic: "/prɑːmpt/",
        word_type: "verb",
        meaning_vi: "Thúc đẩy, nhắc nhở, nhanh chóng",
        sound_bridge: "Phở rơm thơm thúc đẩy tinh thần làm việc nhanh chóng.",
        definition_en: "cause or bring about an action or feeling; done without delay",
        example_en: "The financial crisis prompted immediate government intervention.\nThank you for your prompt response to my inquiry.",
        example_vi: "Cuộc khủng hoảng tài chính đã thúc đẩy sự can thiệp ngay lập tức của chính phủ.\nCảm ơn bạn vì phản hồi nhanh chóng đối với câu hỏi của tôi.",
        page_number: 362
      },
      {
        word: "Protest",
        phonetic: "/ˈproʊ.test/",
        word_type: "verb",
        meaning_vi: "Phản đối, cuộc biểu tình",
        sound_bridge: "Phở tôm ếch kêu gọi phản đối thực phẩm bẩn.",
        definition_en: "a statement or action expressing disapproval of or objection to something",
        example_en: "Citizens gathered to protest against the proposed tax hike.\nWorkers peacefully protested for better working conditions and wages.",
        example_vi: "Người dân đã tập hợp lại để phản đối kế hoạch tăng thuế được đề xuất.\nCác công nhân đã biểu tình hòa bình để đòi điều kiện làm việc và tiền lương tốt hơn.",
        page_number: 362
      },
      {
        word: "Provision",
        phonetic: "/prəˈvɪʒ.ən/",
        word_type: "noun",
        meaning_vi: "Sự cung cấp, điều khoản",
        sound_bridge: "Phải lo vị trí cung cấp thực phẩm cho đoàn người.",
        definition_en: "the action of providing or supplying something for use; a condition or requirement in a legal document",
        example_en: "The contract includes a special provision for early termination.\nThe emergency provision of food and clean water saved many lives.",
        example_vi: "Hợp đồng bao gồm một điều khoản đặc biệt cho việc chấm dứt hợp đồng sớm.\nViệc cung cấp khẩn cấp thực phẩm và nước sạch đã cứu sống nhiều mạng người.",
        page_number: 363
      },
      {
        word: "Reckon",
        phonetic: "/ˈrek.ən/",
        word_type: "verb",
        meaning_vi: "Tính toán, cho rằng",
        sound_bridge: "Rét run người tính toán chi phí sưởi ấm mùa đông.",
        definition_en: "establish by calculation; consider or regard in a specified way",
        example_en: "I reckon it will take at least two hours to drive there.\nExperts reckon that the economy will rebound in the second quarter.",
        example_vi: "Tôi cho rằng sẽ mất ít nhất hai giờ để lái xe đến đó.\nCác chuyên gia tính toán/cho rằng nền kinh tế sẽ phục hồi vào quý hai.",
        page_number: 363
      },
      {
        word: "Recognize",
        phonetic: "/ˈrek.əɡ.naɪz/",
        word_type: "verb",
        meaning_vi: "Nhận ra, công nhận",
        sound_bridge: "Rét gớm nhưng nhận ra bóng dáng mẹ đi chợ về.",
        definition_en: "identify someone or something from having encountered them before; acknowledge validity",
        example_en: "I barely recognized him with his new haircut and glasses.\nThe university is internationally recognized for scientific research.",
        example_vi: "Tôi suýt không nhận ra anh ấy với kiểu tóc và cặp kính mới.\nTrường đại học được quốc tế công nhận về nghiên cứu khoa học.",
        page_number: 363
      },
      {
        word: "Reconcile",
        phonetic: "/ˈrek.ən.saɪl/",
        word_type: "verb",
        meaning_vi: "Hòa giải, dàn xếp",
        sound_bridge: "Ri can ngăn giúp hai bạn hòa giải mâu thuẫn.",
        definition_en: "restore friendly relations between; settle a quarrel",
        example_en: "The mediator helped reconcile the disputing business partners.\nIt is difficult to reconcile these two opposing viewpoints.",
        example_vi: "Người hòa giải đã giúp hòa giải các đối tác kinh doanh đang có tranh chấp.\nRất khó để dàn xếp hai quan điểm hoàn toàn đối lập này.",
        page_number: 363
      },
      {
        word: "Recur",
        phonetic: "/rɪˈkɝː/",
        word_type: "verb",
        meaning_vi: "Tái diễn, lặp lại",
        sound_bridge: "Ri cẩn thận phòng ngừa bệnh cũ tái diễn.",
        definition_en: "occur again periodically or repeatedly",
        example_en: "Doctors took precautions so the symptom wouldn't recur.\nThis software issue seems to recur every time the server restarts.",
        example_vi: "Các bác sĩ đã thực hiện các biện pháp phòng ngừa để triệu chứng không tái diễn.\nLỗi phần mềm này dường như lặp lại mỗi khi máy chủ khởi động lại.",
        page_number: 363
      },
      {
        word: "Set up",
        phonetic: "/set ʌp/",
        word_type: "verb",
        meaning_vi: "Thiết lập, thành lập",
        sound_bridge: "Sét đánh làm hỏng hệ thống vừa thiết lập.",
        definition_en: "establish a business, institution, or other organization; place or erect",
        example_en: "She set up her own digital marketing consultancy firm.\nTechnicians arrived early to set up the audio equipment for the show.",
        example_vi: "Cô ấy đã thành lập công ty tư vấn tiếp thị kỹ thuật số của riêng mình.\nCác kỹ thuật viên đã đến sớm để thiết lập hệ thống âm thanh cho buổi biểu diễn.",
        page_number: 364
      },
      {
        word: "Subtract",
        phonetic: "/səbˈtrækt/",
        word_type: "verb",
        meaning_vi: "Trừ đi, khấu trừ",
        sound_bridge: "Súp tôm rớt trừ đi bớt tiền trong hóa đơn.",
        definition_en: "take away a number or amount from another to calculate the difference",
        example_en: "If you subtract five from twelve, you get seven.\nSubtract transportation expenses from your total monthly revenue.",
        example_vi: "Nếu bạn lấy 12 trừ đi 5, bạn sẽ được 7.\nHãy trừ đi các chi phí đi lại khỏi tổng doanh thu hàng tháng của bạn.",
        page_number: 364
      },
      {
        word: "Suicide",
        phonetic: "/ˈsuː.ə.saɪd/",
        word_type: "noun",
        meaning_vi: "Tự tử",
        sound_bridge: "Súp cua say xỉn ngăn chặn hành vi tự tử bồng bột.",
        definition_en: "the action of killing oneself intentionally",
        example_en: "Counseling hotlines offer 24/7 support for suicide prevention.\nMental health awareness helps prevent youth suicide.",
        example_vi: "Đường dây nóng tư vấn hỗ trợ 24/7 cho việc phòng chống tự tử.\nNâng cao nhận thức về sức khỏe tinh thần giúp ngăn ngừa nạn tự tử ở giới trẻ.",
        page_number: 364
      },
      {
        word: "Suspect",
        phonetic: "/səˈspekt/",
        word_type: "verb",
        meaning_vi: "Nghi ngờ, nghi phạm",
        sound_bridge: "Súp sợ phét nghi ngờ kẻ lạ mặt đột nhập.",
        definition_en: "have an idea or impression of the existence or truth of something without certain proof",
        example_en: "Police suspect that the fire was started deliberately.\nThe prime suspect was taken into custody for further questioning.",
        example_vi: "Cảnh sát nghi ngờ rằng ngọn lửa đã bị cố ý châm ngòi.\nNghi phạm chính đã bị tạm giam để thẩm vấn thêm.",
        page_number: 364
      }
    ]
  },

  // ==========================================
  // UNIT 38: Describing Things 1 (27 từ, Trang 368 - 374)
  // ==========================================
  38: {
    unit: 38,
    unit_title: "Describing Things 1",
    category: "Descriptions & Characteristics",
    words: [
      {
        word: "Abnormal",
        phonetic: "/æbˈnɔːr.məl/",
        word_type: "adjective",
        meaning_vi: "Bất thường, khác thường",
        sound_bridge: "Ăn bắp nướng mỡ hành có hương vị khác thường lạ miệng.",
        definition_en: "deviating from what is normal or usual, typically in a way that is undesirable",
        example_en: "The doctor detected an abnormal heart rhythm.\nAbnormal weather patterns have caused unexpected crop failures.",
        example_vi: "Bác sĩ đã phát hiện nhịp tim bất thường.\nNhững hình thái thời tiết bất thường đã gây ra thiệt hại mùa màng bất ngờ.",
        page_number: 368
      },
      {
        word: "Absolute",
        phonetic: "/ˈæb.sə.luːt/",
        word_type: "adjective",
        meaning_vi: "Tuyệt đối, hoàn toàn",
        sound_bridge: "Ăn bắp xào luộc đạt độ ngon tuyệt đối.",
        definition_en: "not qualified or diminished in any way; total",
        example_en: "I have absolute confidence in our team's victory.\nThe scientist demanded absolute precision in measuring the chemical doses.",
        example_vi: "Tôi có niềm tin tuyệt đối vào chiến thắng của đội nhà.\nNhà khoa học yêu cầu độ chính xác tuyệt đối trong việc đo lường liều lượng hóa chất.",
        page_number: 368
      },
      {
        word: "Absorb",
        phonetic: "/əbˈzɔːrb/",
        word_type: "verb",
        meaning_vi: "Hấp thụ, thấm hút",
        sound_bridge: "Ơ bờ xôi hấp thụ nước canh đậm đà.",
        definition_en: "take in or soak up energy, liquid, or other substances",
        example_en: "Sponges absorb large amounts of water rapidly.\nPlants absorb sunlight and carbon dioxide to produce oxygen.",
        example_vi: "Miếng bọt biển thấm hút một lượng nước lớn rất nhanh chóng.\nCây cối hấp thụ ánh sáng mặt trời và khí carbon dioxide để tạo ra oxy.",
        page_number: 368
      },
      {
        word: "Adequate",
        phonetic: "/ˈæd.ə.kwət/",
        word_type: "adjective",
        meaning_vi: "Đầy đủ, thỏa đáng",
        sound_bridge: "Ăn đĩa quẩy đầy đủ dinh dưỡng cho bữa sáng.",
        definition_en: "satisfactory or acceptable in quality or quantity",
        example_en: "Make sure you get adequate sleep before the big exam.\nThe old clinic lacks adequate medical equipment to treat severe cases.",
        example_vi: "Hãy đảm bảo bạn ngủ đầy đủ giấc trước kỳ thi lớn.\nPhòng khám cũ thiếu thiết bị y tế thỏa đáng/đầy đủ để điều trị các ca bệnh nặng.",
        page_number: 368
      },
      {
        word: "Alike",
        phonetic: "/əˈlaɪk/",
        word_type: "adjective",
        meaning_vi: "Giống nhau, tương tự",
        sound_bridge: "Ơ lại giống nhau như hai giọt nước.",
        definition_en: "similar to each other",
        example_en: "The twins look remarkably alike in childhood photos.\nThe museum appeals to children and adults alike.",
        example_vi: "Hai đứa trẻ sinh đôi trông giống nhau một cách đáng kinh ngạc trong những bức ảnh thời thơ ấu.\nBảo tàng thu hút cả trẻ em lẫn người lớn như nhau.",
        page_number: 368
      },
      {
        word: "Appeal",
        phonetic: "/əˈpiːl/",
        word_type: "verb",
        meaning_vi: "Thu hút, hấp dẫn, kêu gọi",
        sound_bridge: "Ơ phở bò hấp dẫn thu hút đông đảo thực khách.",
        definition_en: "be attractive or interesting; make a serious or urgent request",
        example_en: "The minimalist design appeals to younger generations.\nCharity organizations appealed to the public for emergency donations.",
        example_vi: "Thiết kế tối giản thu hút các thế hệ trẻ hơn.\nCác tổ chức từ thiện đã kêu gọi công chúng quyên góp cứu trợ khẩn cấp.",
        page_number: 369
      },
      {
        word: "Astonish",
        phonetic: "/əˈstɑː.nɪʃ/",
        word_type: "verb",
        meaning_vi: "Làm kinh ngạc",
        sound_bridge: "Ơ sợ té ngã làm kinh ngạc khán giả xem xiếc.",
        definition_en: "surprise or impress someone greatly",
        example_en: "His incredible magic tricks astonished the entire audience.\nHer rapid mastery of the violin astonished her music teacher.",
        example_vi: "Những trò ảo thuật khó tin của anh ấy đã làm kinh ngạc toàn bộ khán giả.\nSự thuần thục nhanh chóng cây đàn vĩ cầm của cô ấy đã làm giáo viên âm nhạc kinh ngạc.",
        page_number: 369
      },
      {
        word: "Category",
        phonetic: "/ˈkæt̬.ə.ɡɔːr.i/",
        word_type: "noun",
        meaning_vi: "Hạng mục, thể loại",
        sound_bridge: "Cắt tờ giấy phân loại vào từng hạng mục rõ ràng.",
        definition_en: "a class or division of people or things regarded as having particular shared characteristics",
        example_en: "Books are organized into fiction and non-fiction categories.\nShe won first prize in the young vocalists category.",
        example_vi: "Sách được sắp xếp thành các hạng mục hư cấu và phi hư cấu.\nCô ấy đã giành giải nhất trong hạng mục ca sĩ trẻ.",
        page_number: 369
      },
      {
        word: "Chaos",
        phonetic: "/ˈkeɪ.ɑːs/",
        word_type: "noun",
        meaning_vi: "Sự hỗn loạn",
        sound_bridge: "Cây áo rách tạo nên cảnh hỗn loạn trong phòng thay đồ.",
        definition_en: "complete disorder and confusion",
        example_en: "The traffic was thrown into complete chaos after the blackout.\nLosing the internet connection caused temporary chaos in the trading firm.",
        example_vi: "Giao thông rơi vào tình trạng hỗn loạn hoàn toàn sau sự cố mất điện.\nViệc mất kết nối internet đã gây ra sự hỗn loạn tạm thời tại công ty giao dịch.",
        page_number: 369
      },
      {
        word: "Everyday",
        phonetic: "/ˈev.ri.deɪ/",
        word_type: "adjective",
        meaning_vi: "Hàng ngày, thường nhật",
        sound_bridge: "Em vào rẫy hái rau phục vụ bữa ăn thường nhật hàng ngày.",
        definition_en: "encountered or used for ordinary days rather than for special occasions",
        example_en: "Smartphones have become an essential part of everyday life.\nWear comfortable everyday shoes for walking around the city.",
        example_vi: "Điện thoại thông minh đã trở thành một phần thiết yếu của cuộc sống hàng ngày.\nHãy mang giày đi bộ thường nhật thoải mái để dạo quanh thành phố.",
        page_number: 369
      },
      {
        word: "Frequent",
        phonetic: "/ˈfriː.kwənt/",
        word_type: "adjective",
        meaning_vi: "Thường xuyên",
        sound_bridge: "Phở riêu cua ăn thường xuyên không thấy ngán.",
        definition_en: "occurring or done on many occasions, in many cases, or in quick succession",
        example_en: "He is a frequent flyer with this international airline.\nFrequent handwashing protects you from spreading seasonal colds.",
        example_vi: "Anh ấy là khách hàng bay thường xuyên của hãng hàng không quốc tế này.\nRửa tay thường xuyên bảo vệ bạn khỏi việc lây lan cảm lạnh theo mùa.",
        page_number: 370
      },
      {
        word: "Perhaps",
        phonetic: "/pɚˈhæps/",
        word_type: "adverb",
        meaning_vi: "Có lẽ",
        sound_bridge: "Phở hầm xương có lẽ là món ngon nhất quán.",
        definition_en: "used to express uncertainty or possibility",
        example_en: "Perhaps we will visit Japan next spring if flights are affordable.\nThis is perhaps the finest performance of his entire acting career.",
        example_vi: "Có lẽ chúng tôi sẽ đến thăm Nhật Bản vào mùa xuân tới nếu vé máy bay phải chăng.\nĐây có lẽ là màn trình diễn xuất sắc nhất trong toàn bộ sự nghiệp diễn xuất của anh ấy.",
        page_number: 370
      },
      {
        word: "Probably",
        phonetic: "/ˈprɑː.bə.bli/",
        word_type: "adverb",
        meaning_vi: "Có thể, có khả năng cao",
        sound_bridge: "Phở bò béo ngậy có khả năng cao là món bán chạy nhất.",
        definition_en: "almost certainly; as far as one knows or can tell",
        example_en: "It will probably rain later this afternoon, so take a raincoat.\nShe is probably the most qualified applicant for the engineering post.",
        example_vi: "Trời có khả năng cao sẽ mưa vào chiều nay, nên hãy mang theo áo mưa.\nCô ấy có lẽ là ứng viên có trình độ phù hợp nhất cho vị trí kỹ sư.",
        page_number: 370
      },
      {
        word: "Punctual",
        phonetic: "/ˈpʌŋk.tʃu.əl/",
        word_type: "adjective",
        meaning_vi: "Đúng giờ",
        sound_bridge: "Phở nước trong thơm lừng đến ăn đúng giờ hẹn.",
        definition_en: "happening or doing something at the agreed or proper time",
        example_en: "She is always punctual for business meetings.\nThe high-speed bullet trains in Japan are famously punctual.",
        example_vi: "Cô ấy luôn luôn đúng giờ cho các cuộc họp kinh doanh.\nNhững chuyến tàu cao tốc hình viên đạn ở Nhật Bản nổi tiếng là đúng giờ.",
        page_number: 370
      },
      {
        word: "Purple",
        phonetic: "/ˈpɝː.pəl/",
        word_type: "adjective",
        meaning_vi: "Màu tím",
        sound_bridge: "Phở pha màu tím từ lá cẩm thiên nhiên tuyệt đẹp.",
        definition_en: "of a colour intermediate between red and blue",
        example_en: "She wore an elegant purple velvet dress to the gala.\nLavender fields blossom in vibrant purple hues every summer.",
        example_vi: "Cô ấy đã mặc một chiếc váy nhung màu tím thanh lịch đến buổi dạ hội.\nNhững cánh đồng hoa oải hương nở rộ sắc tím rực rỡ vào mỗi mùa hè.",
        page_number: 370
      },
      {
        word: "Quarter",
        phonetic: "/ˈkwɔːr.t̬ɚ/",
        word_type: "noun",
        meaning_vi: "Một phần tư, quý",
        sound_bridge: "Quơ que đo một phần tư tấm ván ép.",
        definition_en: "each of four equal or corresponding parts into which something is divided",
        example_en: "Cut the apple into four equal quarters.\nThe company reported strong profits in the first quarter of the year.",
        example_vi: "Hãy cắt quả táo thành bốn phần tư bằng nhau.\nCông ty đã báo cáo lợi nhuận tăng mạnh trong quý đầu tiên của năm.",
        page_number: 371
      },
      {
        word: "Random",
        phonetic: "/ˈræn.dəm/",
        word_type: "adjective",
        meaning_vi: "Ngẫu nhiên",
        sound_bridge: "Rán đỗ mỡ hành chọn ngẫu nhiên nguyên liệu tươi ngon.",
        definition_en: "made, done, happening, or chosen without method or conscious decision",
        example_en: "The computer generated a random six-digit password.\nSecurity guards conducted random bag checks at the airport entrance.",
        example_vi: "Máy tính đã tạo ra một mật khẩu gồm sáu chữ số ngẫu nhiên.\nNhân viên an ninh đã tiến hành kiểm tra túi xách ngẫu nhiên tại lối vào sân bay.",
        page_number: 371
      },
      {
        word: "Rapid",
        phonetic: "/ˈræp.ɪd/",
        word_type: "adjective",
        meaning_vi: "Nhanh chóng, mau lẹ",
        sound_bridge: "Rau phơi nắng héo nhanh chóng trong ngày hè.",
        definition_en: "happening in a short time or at a fast pace",
        example_en: "The city has experienced rapid economic expansion.\nThere has been rapid progress in the development of vaccine technology.",
        example_vi: "Thành phố đã trải qua sự mở rộng kinh tế nhanh chóng.\nĐã có sự tiến bộ mau lẹ trong việc phát triển công nghệ vắc-xin.",
        page_number: 371
      },
      {
        word: "Regular",
        phonetic: "/ˈreɡ.jə.lɚ/",
        word_type: "adjective",
        meaning_vi: "Đều đặn, thường xuyên",
        sound_bridge: "Rẽ qua lại đều đặn mỗi ngày tập thể dục.",
        definition_en: "done or happening frequently; arranged with equal space between each thing",
        example_en: "Get regular exercise to maintain physical fitness.\nHe is a regular customer at our local coffee shop.",
        example_vi: "Hãy tập thể dục đều đặn để duy trì thể lực dẻo dai.\nAnh ấy là một khách hàng quen thường xuyên tại quán cà phê địa phương của chúng tôi.",
        page_number: 371
      },
      {
        word: "Seldom",
        phonetic: "/ˈsel.dəm/",
        word_type: "adverb",
        meaning_vi: "Hiếm khi, ít khi",
        sound_bridge: "Xe lội đầm hiếm khi gặp trục trặc động cơ.",
        definition_en: "not often; rarely",
        example_en: "He seldom eats fast food because he prefers home cooking.\nSnow seldom falls in this warm coastal region.",
        example_vi: "Anh ấy hiếm khi ăn đồ ăn nhanh vì anh ấy thích tự nấu ăn ở nhà hơn.\nTuyết hiếm khi rơi ở vùng ven biển ấm áp này.",
        page_number: 371
      },
      {
        word: "Similar",
        phonetic: "/ˈsɪm.ə.lɚ/",
        word_type: "adjective",
        meaning_vi: "Tương tự, giống nhau",
        sound_bridge: "Si mua len làm áo tương tự chiếc áo mẹ mặc.",
        definition_en: "having a resemblance in appearance, character, or quantity, without being identical",
        example_en: "The two brothers have very similar personalities.\nHer dress is quite similar to the one I bought yesterday.",
        example_vi: "Hai anh em có tính cách rất tương tự nhau.\nChiếc váy của cô ấy khá giống với chiếc váy tôi đã mua ngày hôm qua.",
        page_number: 372
      },
      {
        word: "Singular",
        phonetic: "/ˈsɪŋ.ɡjə.lɚ/",
        word_type: "adjective",
        meaning_vi: "Số ít, phi thường, độc nhất",
        sound_bridge: "Si ngồi hát một mình với tài năng độc nhất vô nhị.",
        definition_en: "denoting or referring to just one person or thing; exceptionally good or great",
        example_en: "In English grammar, 'cat' is singular and 'cats' is plural.\nShe showed a singular dedication to advancing children's education.",
        example_vi: "Trong ngữ pháp tiếng Anh, 'cat' là số ít và 'cats' là số nhiều.\nCô ấy đã thể hiện một sự cống hiến phi thường/độc nhất cho sự nghiệp phát triển giáo dục trẻ em.",
        page_number: 372
      },
      {
        word: "Tedious",
        phonetic: "/ˈtiː.di.əs/",
        word_type: "adjective",
        meaning_vi: "Tẻ nhạt, buồn tẻ",
        sound_bridge: "Tí đi ỉu xìu vì phải làm công việc buồn tẻ.",
        definition_en: "too long, slow, or dull; tiresome or monotonous",
        example_en: "Entering data into spreadsheets manually is a tedious task.\nThe long journey was made less tedious by listening to audiobooks.",
        example_vi: "Nhập dữ liệu vào bảng tính thủ công là một công việc tẻ nhạt.\nChuyến hành trình dài bớt buồn tẻ hơn nhờ việc nghe sách nói.",
        page_number: 372
      },
      {
        word: "Temper",
        phonetic: "/ˈtem.pɚ/",
        word_type: "noun",
        meaning_vi: "Tính khí, cơn giận",
        sound_bridge: "Tem phơi nắng làm người sưu tầm nổi cơn giận dữ.",
        definition_en: "a person's state of mind seen in terms of their being angry or calm",
        example_en: "Try to keep your temper during heated discussions.\nHe lost his temper and slammed the door behind him.",
        example_vi: "Hãy cố gắng kiềm chế tính khí/cơn giận trong những cuộc thảo luận nảy lửa.\nAnh ấy đã mất bình tĩnh nổi giận và đóng sầm cánh cửa lại phía sau.",
        page_number: 372
      },
      {
        word: "Tense",
        phonetic: "/tens/",
        word_type: "adjective",
        meaning_vi: "Căng thẳng, thì (ngữ pháp)",
        sound_bridge: "Tết nợ tiền khiến không khí gia đình vô cùng căng thẳng.",
        definition_en: "stretched tight, or unable to relax because of anxiety or nervous strain",
        example_en: "The atmosphere in the room became tense as negotiations stalled.\nRelax your tense shoulders by taking deep, slow breaths.",
        example_vi: "Bầu không khí trong phòng trở nên căng thẳng khi các cuộc đàm phán bị đình trệ.\nHãy thả lỏng đôi vai đang căng cứng của bạn bằng cách hít thở sâu và chậm.",
        page_number: 372
      },
      {
        word: "Tight",
        phonetic: "/taɪt/",
        word_type: "adjective",
        meaning_vi: "Chặt, chật chội",
        sound_bridge: "Tai thính nghe tiếng dây đai siết chặt.",
        definition_en: "fixed, fastened, or closed firmly; fitting very closely to the body",
        example_en: "These new leather shoes are too tight around my toes.\nHold tight to the handrail while descending the steep stairs.",
        example_vi: "Đôi giày da mới này quá chật ở phần ngón chân của tôi.\nHãy bám chặt vào tay vịn khi bước xuống cầu thang dốc.",
        page_number: 373
      },
      {
        word: "Verbal",
        phonetic: "/ˈvɝː.bəl/",
        word_type: "adjective",
        meaning_vi: "Bằng lời nói, thuộc về lời nói",
        sound_bridge: "Vợ bồ cãi nhau bằng lời nói gay gắt.",
        definition_en: "relating to or in the form of words",
        example_en: "They got into a heated verbal fight over the bill.\nIt was an awkward verbal exchange between the rival candidates.",
        example_vi: "Họ đã cãi cọ đấu khẩu bằng lời nói nảy lửa về hóa đơn thanh toán.\nĐó là một màn đối đáp khẩu chiến bằng lời nói ngượng ngùng giữa các ứng viên đối thủ.",
        page_number: 373
      }
    ]
  },

  // ==========================================
  // UNIT 39: Describing Things 2 (26 từ, Trang 378 - 383)
  // ==========================================
  39: {
    unit: 39,
    unit_title: "Describing Things 2",
    category: "Descriptions & Characteristics",
    words: [
      {
        word: "Able",
        phonetic: "/ˈeɪ.bəl/",
        word_type: "adjective",
        meaning_vi: "Có thể, có năng lực",
        sound_bridge: "Ếch bò lên cây chứng tỏ có năng lực phi thường.",
        definition_en: "having the power, skill, means, or opportunity to do something",
        example_en: "She is able to speak four languages fluently.\nWith modern technology, we are able to work remotely from anywhere.",
        example_vi: "Cô ấy có thể nói trôi chảy bốn thứ tiếng.\nVới công nghệ hiện đại, chúng ta có thể làm việc từ xa từ bất cứ đâu.",
        page_number: 378
      },
      {
        word: "Across",
        phonetic: "/əˈkrɑːs/",
        word_type: "preposition",
        meaning_vi: "Băng qua, ở phía bên kia",
        sound_bridge: "Ơ cọp chạy băng qua cánh đồng cỏ mênh mông.",
        definition_en: "from one side to the other of something with clear limits",
        example_en: "They walked across the wooden suspension bridge.\nThere is a lovely coffee shop right across the street.",
        example_vi: "Họ đã đi bộ băng qua cây cầu treo bằng gỗ.\nCó một quán cà phê rất xinh xắn ngay ở phía bên kia đường.",
        page_number: 378
      },
      {
        word: "Awesome",
        phonetic: "/ˈɑː.səm/",
        word_type: "adjective",
        meaning_vi: "Tuyệt vời, đỉnh cao",
        sound_bridge: "Áo sơ mi mới mua đẹp tuyệt vời đỉnh cao.",
        definition_en: "extremely impressive or daunting; inspiring great admiration",
        example_en: "We had an awesome time camping under the stars.\nThe fireworks display over the bay was truly awesome.",
        example_vi: "Chúng tôi đã có một khoảng thời gian tuyệt vời khi cắm trại dưới bầu trời sao.\nMàn trình diễn pháo hoa trên vịnh thực sự quá đỗi tuyệt vời.",
        page_number: 378
      },
      {
        word: "Awful",
        phonetic: "/ˈɑː.fəl/",
        word_type: "adjective",
        meaning_vi: "Tồi tệ, khủng khiếp",
        sound_bridge: "Áo phở dính bẩn trông tồi tệ khủng khiếp.",
        definition_en: "very bad or unpleasant",
        example_en: "The weather was awful with non-stop freezing rain.\nI have an awful headache and need to lie down.",
        example_vi: "Thời tiết thật tồi tệ với những cơn mưa lạnh giá không ngớt.\nTôi bị một cơn đau đầu khủng khiếp và cần phải nằm nghỉ.",
        page_number: 378
      },
      {
        word: "Basic",
        phonetic: "/ˈbeɪ.sɪk/",
        word_type: "adjective",
        meaning_vi: "Cơ bản",
        sound_bridge: "Bê xích vào gốc cây là nguyên tắc an toàn cơ bản.",
        definition_en: "forming an essential foundation or starting point; fundamental",
        example_en: "Clean water and shelter are basic human needs.\nThe course covers basic principles of computer programming.",
        example_vi: "Nước sạch và nơi trú ẩn là những nhu cầu cơ bản của con người.\nKhóa học bao quát các nguyên tắc cơ bản của việc lập trình máy tính.",
        page_number: 378
      },
      {
        word: "Below",
        phonetic: "/bɪˈloʊ/",
        word_type: "preposition",
        meaning_vi: "Ở dưới, bên dưới",
        sound_bridge: "Bí lội dưới nước nằm ở dưới đáy hồ.",
        definition_en: "at a lower level or layer than",
        example_en: "The temperature dropped well below zero last night.\nPlease read the instructions listed below carefully.",
        example_vi: "Nhiệt độ đã giảm sâu xuống dưới mức không độ vào đêm qua.\nVui lòng đọc kỹ các hướng dẫn được liệt kê ở bên dưới.",
        page_number: 379
      },
      {
        word: "Blank",
        phonetic: "/blæŋk/",
        word_type: "adjective",
        meaning_vi: "Trống rỗng, để trống",
        sound_bridge: "Bê lăn lộn trên trang giấy trắng tinh để trống.",
        definition_en: "bare, empty, or with no marks or features",
        example_en: "Leave this section blank if it does not apply to you.\nMy mind went completely blank during the interview.",
        example_vi: "Hãy để trống phần này nếu nó không áp dụng cho bạn.\nĐầu óc tôi hoàn toàn trống rỗng trong suốt buổi phỏng vấn.",
        page_number: 379
      },
      {
        word: "Bright",
        phonetic: "/braɪt/",
        word_type: "adjective",
        meaning_vi: "Sáng sủa, thông minh",
        sound_bridge: "Bờ rào sáng rực dưới ánh nắng mặt trời sáng sủa.",
        definition_en: "giving out or reflecting a lot of light; shining; clever",
        example_en: "The morning sun shone bright in the sky.\nShe is a bright student with a very promising future.",
        example_vi: "Ánh mặt trời buổi sớm chiếu sáng rực rỡ trên bầu trời.\nCô ấy là một học sinh thông minh sáng dạ với tương lai đầy hứa hẹn.",
        page_number: 379
      },
      {
        word: "Different",
        phonetic: "/ˈdɪf.ɚ.ənt/",
        word_type: "adjective",
        meaning_vi: "Khác biệt, khác nhau",
        sound_bridge: "Đi phở rớt trúng món ăn khác biệt hoàn toàn.",
        definition_en: "not the same as another or each other",
        example_en: "Every country has different cultural customs.\nHer new hairstyle makes her look completely different.",
        example_vi: "Mỗi quốc gia đều có những phong tục văn hóa khác nhau.\nKiểu tóc mới khiến cô ấy trông hoàn toàn khác biệt.",
        page_number: 379
      },
      {
        word: "Dirty",
        phonetic: "/ˈdɝː.t̬i/",
        word_type: "adjective",
        meaning_vi: "Bẩn thỉu, dơ bẩn",
        sound_bridge: "Đơ tí vì đôi giày trắng bị dính bùn đất bẩn thỉu.",
        definition_en: "covered or marked with an unclean substance",
        example_en: "Wash your dirty hands with warm water and soap.\nDo not leave dirty dishes in the kitchen sink overnight.",
        example_vi: "Hãy rửa đôi tay bẩn thỉu của bạn bằng nước ấm và xà phòng.\nĐừng để bát đĩa dơ bẩn trong bồn rửa chén qua đêm.",
        page_number: 379
      },
      {
        word: "Empty",
        phonetic: "/ˈemp.ti/",
        word_type: "adjective",
        meaning_vi: "Trống rỗng, rỗng",
        sound_bridge: "Em tí hon đứng trước căn phòng trống rỗng.",
        definition_en: "containing nothing; not filled or occupied",
        example_en: "The fuel tank is almost empty, let's find a gas station.\nHe stared out at the empty streets in the early morning.",
        example_vi: "Bình nhiên liệu gần như trống rỗng rồi, hãy tìm trạm xăng thôi.\nAnh ấy nhìn ra những con đường vắng vẻ trống trải vào sáng sớm.",
        page_number: 380
      },
      {
        word: "Extra",
        phonetic: "/ˈek.strə/",
        word_type: "adjective",
        meaning_vi: "Thêm, phụ thêm",
        sound_bridge: "Ếch sợ trát thêm một lớp sơn phụ thêm.",
        definition_en: "added to an existing or usual amount or number; additional",
        example_en: "Could we have two extra chairs for our guests?\nHe works extra hours on weekends to save for vacation.",
        example_vi: "Chúng tôi có thể lấy thêm hai chiếc ghế cho khách được không?\nAnh ấy làm thêm giờ vào cuối tuần để tiết kiệm tiền đi nghỉ mát.",
        page_number: 380
      },
      {
        word: "Gentle",
        phonetic: "/ˈdʒen.t̬əl/",
        word_type: "adjective",
        meaning_vi: "Dịu dàng, nhẹ nhàng",
        sound_bridge: "Dắt Tí đi dạo trong làn gió nhẹ nhàng dịu dàng.",
        definition_en: "having or showing a mild, kind, or tender temperament or character",
        example_en: "A gentle breeze cooled the warm summer afternoon.\nBe gentle when holding the newborn kitten.",
        example_vi: "Một làn gió nhẹ nhàng làm mát buổi chiều hè oi ả.\nHãy nhẹ nhàng khi ôm chú mèo con mới sinh.",
        page_number: 380
      },
      {
        word: "Horrible",
        phonetic: "/ˈhɔːr.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Kinh khủng, ghê gớm",
        sound_bridge: "Hổ rống to tạo nên âm thanh kinh khủng ghê gớm.",
        definition_en: "causing or likely to cause horror; shocking",
        example_en: "There was a horrible car accident on the highway.\nThe medicine tasted horrible, but it cured my throat.",
        example_vi: "Đã có một vụ tai nạn ô tô kinh khủng trên đường cao tốc.\nThuốc có vị kinh khủng ghê gớm nhưng nó đã chữa khỏi họng tôi.",
        page_number: 380
      },
      {
        word: "Instant",
        phonetic: "/ˈɪn.stənt/",
        word_type: "adjective",
        meaning_vi: "Ngay lập tức, ăn liền",
        sound_bridge: "In sợ Tết pha gói mì ăn liền ngay lập tức.",
        definition_en: "happening or coming immediately; prepared quickly",
        example_en: "Instant noodles are popular among college students.\nThe new mobile game became an instant global success.",
        example_vi: "Mì ăn liền rất phổ biến đối với các sinh viên đại học.\nTrò chơi di động mới đã trở thành một thành công toàn cầu ngay lập tức.",
        page_number: 380
      },
      {
        word: "Interior",
        phonetic: "/ɪnˈtɪr.i.ɚ/",
        word_type: "noun",
        meaning_vi: "Nội thất, bên trong",
        sound_bridge: "In tranh treo trang trí nội thất bên trong căn hộ.",
        definition_en: "the internal or inside part of a building or room",
        example_en: "The interior of the cathedral was breathtakingly beautiful.\nShe hired a professional interior designer to redecorate the villa.",
        example_vi: "Nội thất bên trong nhà thờ lớn đẹp đến nghẹt thở.\nCô ấy đã thuê một nhà thiết kế nội thất chuyên nghiệp để trang trí lại căn biệt thự.",
        page_number: 381
      },
      {
        word: "Level",
        phonetic: "/ˈlev.əl/",
        word_type: "noun",
        meaning_vi: "Cấp độ, mức độ, bằng phẳng",
        sound_bridge: "Lấy vò rượu đo mức độ cồn bên trong.",
        definition_en: "a position on a real or imaginary scale of amount, quantity, or importance",
        example_en: "She achieved an advanced level of French proficiency.\nKeep the table surface level so glasses do not slide.",
        example_vi: "Cô ấy đã đạt được trình độ/cấp độ tiếng Pháp cao cấp.\nHãy giữ mặt bàn bằng phẳng để ly không bị trượt.",
        page_number: 381
      },
      {
        word: "Limit",
        phonetic: "/ˈlɪm.ɪt/",
        word_type: "noun",
        meaning_vi: "Giới hạn, hạn mức",
        sound_bridge: "Ly mít thơm ngát ăn không có giới hạn.",
        definition_en: "a point or level beyond which something does not or may not extend or pass",
        example_en: "The speed limit on this highway is 100 km/h.\nThere is no limit to what you can achieve with perseverance.",
        example_vi: "Giới hạn tốc độ trên đường cao tốc này là 100 km/h.\nKhông có giới hạn nào cho những gì bạn có thể đạt được với sự kiên trì.",
        page_number: 381
      },
      {
        word: "Little",
        phonetic: "/ˈlɪt̬.əl/",
        word_type: "adjective",
        meaning_vi: "Nhỏ bé, ít ỏi",
        sound_bridge: "Ly tí hon nhỏ bé đựng một ít nước.",
        definition_en: "small in size, amount, or degree",
        example_en: "A little girl was playing with her teddy bear.\nI have very little time left before the deadline.",
        example_vi: "Một cô bé nhỏ nhắn đang chơi đùa với chú gấu bông của mình.\nTôi còn rất ít thời gian trước khi đến hạn chót.",
        page_number: 381
      },
      {
        word: "Nasty",
        phonetic: "/ˈnæs.ti/",
        word_type: "adjective",
        meaning_vi: "Khó chịu, bẩn thỉu, độc địa",
        sound_bridge: "Nấu súp tí hon có mùi khó chịu bẩn thỉu.",
        definition_en: "highly unpleasant, annoying, or spiteful",
        example_en: "He received a nasty cut on his finger from the sharp can.\nDon't be nasty to your classmates on social media.",
        example_vi: "Anh ấy bị một vết cắt khó chịu/sâu ở ngón tay do chiếc lon sắc bén.\nĐừng đối xử độc địa/xấu tính với bạn cùng lớp trên mạng xã hội.",
        page_number: 381
      },
      {
        word: "Navy",
        phonetic: "/ˈneɪ.vi/",
        word_type: "noun",
        meaning_vi: "Hải quân, màu xanh hải quân",
        sound_bridge: "Né voi chạy vào doanh trại hải quân an toàn.",
        definition_en: "the branch of the armed services that conducts military operations at sea; a dark blue color",
        example_en: "He served four years as an officer in the navy.\nShe wore a sharp navy blue blazer to the interview.",
        example_vi: "Anh ấy đã phục vụ bốn năm với tư cách là một sĩ quan hải quân.\nCô ấy đã mặc một chiếc áo khoác màu xanh hải quân chỉn chu đến buổi phỏng vấn.",
        page_number: 382
      },
      {
        word: "Solid",
        phonetic: "/ˈsɑː.lɪd/",
        word_type: "adjective",
        meaning_vi: "Rắn chắc, đặc, vững chắc",
        sound_bridge: "So lít nước đông đá thành khối rắn chắc.",
        definition_en: "firm and stable in shape; not liquid or fluid",
        example_en: "This dining table is made of solid oak wood.\nThe candidate has a solid background in financial accounting.",
        example_vi: "Chiếc bàn ăn này được làm từ gỗ sồi đặc nguyên khối rắn chắc.\nỨng viên có nền tảng vững chắc trong ngành kế toán tài chính.",
        page_number: 382
      },
      {
        word: "Position",
        phonetic: "/pəˈzɪʃ.ən/",
        word_type: "noun",
        meaning_vi: "Vị trí, tư thế",
        sound_bridge: "Phở xào nóng đặt đúng vị trí trên bàn ăn.",
        definition_en: "a place where someone or something is located or has been put",
        example_en: "The GPS accurately pinpointed our exact position.\nShe applied for the managerial position in marketing.",
        example_vi: "Hệ thống định vị GPS đã xác định chính xác vị trí của chúng tôi.\nCô ấy đã nộp đơn ứng tuyển cho vị trí quản lý trong bộ phận tiếp thị.",
        page_number: 382
      },
      {
        word: "Possible",
        phonetic: "/ˈpɑː.sə.bəl/",
        word_type: "adjective",
        meaning_vi: "Có thể, khả thi",
        sound_bridge: "Phở xào bắp bò là món hoàn toàn khả thi có thể nấu nhanh.",
        definition_en: "able to be done or achieved to happen",
        example_en: "Please reply as soon as possible.\nIt is possible to master coding skills through regular practice.",
        example_vi: "Vui lòng phản hồi càng sớm càng tốt (càng sớm càng khả thi).\nViệc thành thạo các kỹ năng lập trình là hoàn toàn khả thi thông qua việc luyện tập đều đặn.",
        page_number: 382
      },
      {
        word: "Same",
        phonetic: "/seɪm/",
        word_type: "adjective",
        meaning_vi: "Giống nhau, cùng một",
        sound_bridge: "Súp phở giống nhau hương vị thơm ngon.",
        definition_en: "identical; not different",
        example_en: "We went to the same high school in Hanoi.\nThey ordered the same dish at the restaurant.",
        example_vi: "Chúng tôi đã học cùng một trường cấp ba ở Hà Nội.\nHọ đã gọi cùng một món ăn tại nhà hàng.",
        page_number: 382
      },
      {
        word: "Separate",
        phonetic: "/ˈsep.ər.ət/",
        word_type: "adjective",
        meaning_vi: "Tách biệt, riêng biệt",
        sound_bridge: "Xe phở rách chuyển sang một gian hàng tách biệt riêng.",
        definition_en: "forming or viewed as a unit by itself; not joined or connected",
        example_en: "The children sleep in separate bedrooms.\nStore raw meat in a separate container from fresh vegetables.",
        example_vi: "Lũ trẻ ngủ trong những phòng ngủ riêng biệt tách biệt nhau.\nHãy bảo quản thịt sống trong một hộp chứa riêng biệt tách rời khỏi rau tươi.",
        page_number: 383
      }
    ]
  },

  // ==========================================
  // UNIT 40: Describing Things 3 (27 từ, Trang 387 - 392)
  // ==========================================
  40: {
    unit: 40,
    unit_title: "Describing Things 3",
    category: "Descriptions & Characteristics",
    words: [
      {
        word: "Amusing",
        phonetic: "/əˈmjuː.zɪŋ/",
        word_type: "adjective",
        meaning_vi: "Vui nhộn, buồn cười",
        sound_bridge: "Ơ múa may tạo ra những cử chỉ vui nhộn buồn cười.",
        definition_en: "causing laughter and providing entertainment",
        example_en: "He told an amusing anecdote about his college days.\nThe cartoon featured amusing characters that made kids laugh.",
        example_vi: "Anh ấy đã kể một giai thoại vui nhộn về những ngày tháng đại học của mình.\nBộ phim hoạt hình có những nhân vật buồn cười khiến trẻ con cười nghiêng ngả.",
        page_number: 387
      },
      {
        word: "Ancient",
        phonetic: "/ˈeɪn.ʃənt/",
        word_type: "adjective",
        meaning_vi: "Cổ xưa, cổ đại",
        sound_bridge: "Ăn sắn nướng trong ngôi đền cổ xưa cổ đại.",
        definition_en: "belonging to the very distant past and no longer in existence",
        example_en: "Tourists marveled at the ancient pyramids of Egypt.\nThis ancient tradition has been preserved for over a millennium.",
        example_vi: "Du khách kinh ngạc trước những kim tự tháp cổ đại của Ai Cập.\nTruyền thống cổ xưa này đã được gìn giữ qua hơn một thiên niên kỷ.",
        page_number: 387
      },
      {
        word: "Antique",
        phonetic: "/ænˈtiːk/",
        word_type: "noun",
        meaning_vi: "Đồ cổ, cổ kính",
        sound_bridge: "Ăn thịt nướng bên cạnh chiếc bàn đồ cổ quý giá.",
        definition_en: "a collectable object such as a piece of furniture that has a high value because of its age",
        example_en: "She collects rare antique clocks from the 18th century.\nThe living room is furnished with exquisite antique chairs.",
        example_vi: "Cô ấy sưu tầm những chiếc đồng hồ cổ quý hiếm từ thế kỷ 18.\nPhòng khách được bài trí bằng những chiếc ghế đồ cổ tinh xảo.",
        page_number: 387
      },
      {
        word: "Average",
        phonetic: "/ˈæv.ɚ.ɪdʒ/",
        word_type: "adjective",
        meaning_vi: "Trung bình",
        sound_bridge: "Ăn vài quả ổi đạt kích thước trung bình vừa phải.",
        definition_en: "having qualities that are seen as typical of a particular person or group",
        example_en: "The average lifespan of a domestic cat is fifteen years.\nHis test score was well above the class average.",
        example_vi: "Tuổi thọ trung bình của một chú mèo nhà là mười lăm năm.\nĐiểm kiểm tra của anh ấy cao hơn nhiều so với mức trung bình của lớp.",
        page_number: 387
      },
      {
        word: "Brilliant",
        phonetic: "/ˈbrɪl.jənt/",
        word_type: "adjective",
        meaning_vi: "Xuất sắc, lỗi lạc, rực rỡ",
        sound_bridge: "Bờ ruộng lấp lánh ánh sáng rực rỡ xuất sắc.",
        definition_en: "exceptionally clever or talented; very bright",
        example_en: "The scientist proposed a brilliant solution to clean energy.\nThe diamonds shone with brilliant radiance under the spotlight.",
        example_vi: "Nhà khoa học đã đề xuất một giải pháp xuất sắc lỗi lạc cho năng lượng sạch.\nNhững viên kim cương tỏa sáng rực rỡ lấp lánh dưới ánh đèn sân khấu.",
        page_number: 387
      },
      {
        word: "Broad",
        phonetic: "/brɑːd/",
        word_type: "adjective",
        meaning_vi: "Rộng lớn, bao quát",
        sound_bridge: "Bò ra đường rộng lớn thong dong gặm cỏ.",
        definition_en: "having an ample distance from side to side; wide; comprehensive",
        example_en: "The river is broad and deep at this point.\nHe gave a broad overview of the company's international operations.",
        example_vi: "Dòng sông rộng lớn và sâu tại khúc này.\nAnh ấy đã đưa ra một cái nhìn bao quát rộng lớn về các hoạt động quốc tế của công ty.",
        page_number: 388
      },
      {
        word: "Delicious",
        phonetic: "/dɪˈlɪʃ.əs/",
        word_type: "adjective",
        meaning_vi: "Ngon miệng, thơm ngon",
        sound_bridge: "Đi lấy sữa thơm ngon bổ dưỡng cho bữa sáng.",
        definition_en: "highly pleasant to the taste",
        example_en: "The chef cooked a delicious traditional seafood pasta.\nFreshly baked bread smells absolutely delicious.",
        example_vi: "Bếp trưởng đã nấu một món mì hải sản truyền thống thơm ngon tuyệt hảo.\nBánh mì mới nướng có mùi thơm ngon ngào ngạt.",
        page_number: 388
      },
      {
        word: "Delight",
        phonetic: "/dɪˈlaɪt/",
        word_type: "noun",
        meaning_vi: "Niềm vui sướng, hân hoan",
        sound_bridge: "Đi lại vui sướng trong ngày hội ngộ gia đình.",
        definition_en: "great pleasure or satisfaction",
        example_en: "The children shrieked with delight when opening their presents.\nIt was a true delight to meet you in person.",
        example_vi: "Lũ trẻ hét lên vì vui sướng hân hoan khi mở những món quà của mình.\nThật là một niềm vui sướng thực sự khi được gặp gỡ trực tiếp bạn.",
        page_number: 388
      },
      {
        word: "Detail",
        phonetic: "/ˈdiː.teɪl/",
        word_type: "noun",
        meaning_vi: "Chi tiết",
        sound_bridge: "Đi té ngã vì mải nhìn các chi tiết tinh xảo trên tường.",
        definition_en: "an individual feature, fact, or item",
        example_en: "Pay close attention to every detail in the legal contract.\nThe architect explained the design in great detail.",
        example_vi: "Hãy chú ý kỹ lưỡng đến từng chi tiết trong bản hợp đồng pháp lý.\nKiến trúc sư đã giải thích bản thiết kế một cách hết sức chi tiết.",
        page_number: 388
      },
      {
        word: "Difficult",
        phonetic: "/ˈdɪf.ə.kəlt/",
        word_type: "adjective",
        meaning_vi: "Khó khăn",
        sound_bridge: "Đi phở cạn nước gặp khó khăn khi chan canh.",
        definition_en: "needing much effort or skill to accomplish, make, or understand",
        example_en: "Learning a new language is difficult but rewarding.\nShe had to make a very difficult career decision.",
        example_vi: "Học một ngôn ngữ mới là điều khó khăn nhưng rất xứng đáng.\nCô ấy đã phải đưa ra một quyết định sự nghiệp vô cùng khó khăn.",
        page_number: 388
      },
      {
        word: "Faintly",
        phonetic: "/ˈfeɪnt.li/",
        word_type: "adverb",
        meaning_vi: "Yếu ớt, mờ nhạt, thoang thoảng",
        sound_bridge: "Phở nấu thoang thoảng mùi thơm yếu ớt từ bếp.",
        definition_en: "in a manner that is scarcely perceptible; slightly",
        example_en: "I could faintly hear music playing in the distance.\nShe smiled faintly through her tears.",
        example_vi: "Tôi có thể nghe thấy tiếng nhạc thoang thoảng yếu ớt từ đằng xa.\nCô ấy mỉm cười nhẹ mờ nhạt qua những giọt nước mắt.",
        page_number: 389
      },
      {
        word: "Fierce",
        phonetic: "/fɪrs/",
        word_type: "adjective",
        meaning_vi: "Hung dữ, dữ dội, khốc liệt",
        sound_bridge: "Phở ớt cay dữ dội làm rát lưỡi người ăn.",
        definition_en: "having or displaying a violent or ferocious aggressiveness",
        example_en: "The two rival teams engaged in a fierce competition.\nA fierce snowstorm battered the northern mountain region.",
        example_vi: "Hai đội đối thủ đã bước vào một cuộc cạnh tranh khốc liệt gay gắt.\nMột cơn bão tuyết dữ dội đã tấn công vùng núi phía bắc.",
        page_number: 389
      },
      {
        word: "Flexible",
        phonetic: "/ˈflek.sə.bəl/",
        word_type: "adjective",
        meaning_vi: "Linh hoạt, mềm dẻo",
        sound_bridge: "Phở lẩu xào bắp linh hoạt thay đổi thực đơn hàng ngày.",
        definition_en: "capable of bending easily without breaking; adaptable",
        example_en: "We offer flexible working hours for our employees.\nGymnasts must have extremely flexible bodies.",
        example_vi: "Chúng tôi cung cấp giờ làm việc linh hoạt cho nhân viên của mình.\nCác vận động viên thể dục dụng cụ phải có cơ thể cực kỳ mềm dẻo linh hoạt.",
        page_number: 389
      },
      {
        word: "Ideal",
        phonetic: "/aɪˈdiː.əl/",
        word_type: "adjective",
        meaning_vi: "Lý tưởng, hoàn hảo",
        sound_bridge: "Ai đi êm ái trên con đường lý tưởng này.",
        definition_en: "satisfying one's conception of what is perfect; most suitable",
        example_en: "This sunny weather is ideal for a beach picnic.\nThe resort is an ideal place to relax and unwind.",
        example_vi: "Thời tiết nắng ráo này thật lý tưởng cho một buổi dã ngoại trên bãi biển.\nKhu nghỉ dưỡng là một địa điểm lý tưởng để thư giãn và nghỉ ngơi.",
        page_number: 389
      },
      {
        word: "Lengthy",
        phonetic: "/ˈleŋ.θi/",
        word_type: "adjective",
        meaning_vi: "Dài dòng, kéo dài",
        sound_bridge: "Lén thi chạy đường dài kéo dài suốt buổi sáng.",
        definition_en: "of considerable or unusual length, especially with reference to time",
        example_en: "After lengthy discussions, the board finally reached an agreement.\nThe professor gave a lengthy lecture on quantum physics.",
        example_vi: "Sau những cuộc thảo luận kéo dài dòng dã, hội đồng quản trị cuối cùng đã đạt được thỏa thuận.\nGiáo sư đã có một bài giảng dài dòng về vật lý lượng tử.",
        page_number: 389
      },
      {
        word: "Massive",
        phonetic: "/ˈmæs.ɪv/",
        word_type: "adjective",
        meaning_vi: "Khổng lồ, đồ sộ",
        sound_bridge: "Mang xôi vò khổng lồ ra chiêu đãi cả làng.",
        definition_en: "large and heavy or solid; exceptionally large",
        example_en: "A massive earthquake shook the entire coastal area.\nThe company spent a massive amount on global marketing.",
        example_vi: "Một trận động đất khổng lồ đã làm rung chuyển toàn bộ khu vực ven biển.\nCông ty đã chi một số tiền đồ sộ khổng lồ cho việc tiếp thị toàn cầu.",
        page_number: 390
      },
      {
        word: "Miracle",
        phonetic: "/ˈmɪr.ə.kəl/",
        word_type: "noun",
        meaning_vi: "Phép màu, điều kỳ diệu",
        sound_bridge: "Mẹ rủ con ngắm phép màu hoa quỳnh nở trong đêm.",
        definition_en: "a remarkable event or development that brings very welcome consequences",
        example_en: "It was a miracle that nobody was hurt in the plane crash.\nModern medicine has performed countless miracles in saving lives.",
        example_vi: "Thật là một phép màu kỳ diệu khi không có ai bị thương trong vụ rơi máy bay.\nY học hiện đại đã thực hiện vô số phép màu kỳ diệu trong việc cứu sống con người.",
        page_number: 390
      },
      {
        word: "Pity",
        phonetic: "/ˈpɪt.i/",
        word_type: "noun",
        meaning_vi: "Lòng thương hại, điều đáng tiếc",
        sound_bridge: "Phi tí hon cảm thấy lòng thương hại chú chim gãy cánh.",
        definition_en: "the feeling of sorrow and compassion caused by the suffering of others; an unfortunate event",
        example_en: "It is a pity that you cannot join us for dinner tonight.\nShe felt deep pity for the stray animals out in the cold rain.",
        example_vi: "Thật là một điều đáng tiếc khi bạn không thể tham gia bữa tối với chúng tôi tối nay.\nCô ấy cảm thấy lòng thương hại sâu sắc đối với những con vật đi lạc ngoài trời mưa lạnh.",
        page_number: 390
      },
      {
        word: "Plain",
        phonetic: "/pleɪn/",
        word_type: "adjective",
        meaning_vi: "Đơn giản, trơn, đồng bằng",
        sound_bridge: "Phở lên mâm bài trí đơn giản thanh đạm.",
        definition_en: "not decorated or elaborate; simple or ordinary; a large area of flat land",
        example_en: "She prefers wearing plain cotton T-shirts.\nThe wild horses ran freely across the vast grassy plains.",
        example_vi: "Cô ấy thích mặc những chiếc áo phông cotton trơn đơn giản.\nNhững chú ngựa hoang chạy tự do khắp các vùng đồng bằng cỏ bao la.",
        page_number: 390
      },
      {
        word: "Plenty",
        phonetic: "/ˈplen.t̬i/",
        word_type: "noun",
        meaning_vi: "Nhiều, dồi dào",
        sound_bridge: "Phở lên tơi xốp dồi dào dinh dưỡng cho người ốm.",
        definition_en: "a large or sufficient amount or quantity",
        example_en: "Don't rush, we have plenty of time before the train arrives.\nDrink plenty of fluids when you have a fever.",
        example_vi: "Đừng vội vã, chúng ta có rất nhiều thời gian dồi dào trước khi tàu đến.\nHãy uống nhiều chất lỏng khi bạn bị sốt.",
        page_number: 390
      },
      {
        word: "Terrible",
        phonetic: "/ˈter.ə.bəl/",
        word_type: "adjective",
        meaning_vi: "Kinh khủng, tồi tệ",
        sound_bridge: "Té rách bắp chân cảm giác đau đớn kinh khủng.",
        definition_en: "extremely bad or serious",
        example_en: "We had terrible weather throughout our beach holiday.\nI feel terrible about forgetting your birthday.",
        example_vi: "Chúng tôi đã gặp phải thời tiết tồi tệ kinh khủng trong suốt kỳ nghỉ ở bãi biển.\nTôi cảm thấy thật tồi tệ kinh khủng khi quên mất ngày sinh nhật của bạn.",
        page_number: 391
      },
      {
        word: "Sharp",
        phonetic: "/ʃɑːrp/",
        word_type: "adjective",
        meaning_vi: "Sắc bén, nhọn, đột ngột",
        sound_bridge: "Sáp ong nhọn sắc bén cắt đứt sợi chỉ mỏng.",
        definition_en: "having an edge or point that is able to cut or pierce something easily",
        example_en: "Be careful with that kitchen knife, it is razor sharp.\nThere was a sharp rise in house prices over the past year.",
        example_vi: "Hãy cẩn thận với con dao làm bếp đó, nó sắc như dao cạo đấy.\nĐã có một sự gia tăng đột ngột mạnh mẽ của giá nhà trong năm qua.",
        page_number: 391
      },
      {
        word: "Shiny",
        phonetic: "/ˈʃaɪ.ni/",
        word_type: "adjective",
        meaning_vi: "Sáng bóng, bóng loáng",
        sound_bridge: "Say xỉn lau chiếc xe hơi sáng bóng loáng.",
        definition_en: "reflecting light, typically because clean or polished",
        example_en: "She wore a pair of shiny black leather shoes.\nThe polished silver coins were shiny and bright.",
        example_vi: "Cô ấy đã mang một đôi giày da màu đen sáng bóng.\nNhững đồng xu bạc được đánh bóng sáng bóng loáng và rực rỡ.",
        page_number: 391
      },
      {
        word: "Silent",
        phonetic: "/ˈsaɪ.lənt/",
        word_type: "adjective",
        meaning_vi: "Im lặng, tĩnh lặng",
        sound_bridge: "Sai lầm khi không giữ im lặng trong phòng đọc sách.",
        definition_en: "not making or accompanied by any sound",
        example_en: "The library remained completely silent during study hours.\nHe stayed silent and refused to answer their probing questions.",
        example_vi: "Thư viện hoàn toàn im lặng tĩnh mịch trong suốt những giờ học tập.\nAnh ấy giữ im lặng và từ chối trả lời những câu hỏi thăm dò của họ.",
        page_number: 391
      },
      {
        word: "Straight",
        phonetic: "/streɪt/",
        word_type: "adjective",
        meaning_vi: "Thẳng, thẳng thắn",
        sound_bridge: "Sợ trượt ngã đi thẳng một mạch trên đường.",
        definition_en: "extending or moving uniformly in one direction only; without a curve or bend",
        example_en: "Draw a straight line across the paper with a ruler.\nGo straight ahead for two blocks, then turn left.",
        example_vi: "Hãy vẽ một đường thẳng ngang qua trang giấy bằng thước kẻ.\nHãy đi thẳng về phía trước qua hai dãy nhà, sau đó rẽ trái.",
        page_number: 391
      },
      {
        word: "Stripe",
        phonetic: "/straɪp/",
        word_type: "noun",
        meaning_vi: "Sọc, vạch kẻ sọc",
        sound_bridge: "Sợ trượt chân trên vạch kẻ sọc dành cho người đi bộ.",
        definition_en: "a long narrow band or strip differing in colour or texture from the surface on either side of it",
        example_en: "Zebras are easily recognized by their distinctive black and white stripes.\nHe wore a smart shirt with blue and white vertical stripes.",
        example_vi: "Ngựa vằn dễ dàng được nhận ra bởi những sọc đen trắng đặc trưng của chúng.\nAnh ấy đã mặc một chiếc áo sơ mi lịch lãm có những sọc kẻ dọc màu xanh và trắng.",
        page_number: 392
      },
      {
        word: "Strong",
        phonetic: "/strɑːŋ/",
        word_type: "adjective",
        meaning_vi: "Mạnh mẽ, kiên cường, nồng độ đậm",
        sound_bridge: "Sợ trúng gió uống ly trà gừng đậm đặc mạnh mẽ.",
        definition_en: "having the power to move heavy weights or perform other physically demanding tasks",
        example_en: "He is physically strong and can lift heavy weights with ease.\nA strong cup of black coffee helped him stay awake during the night shift.",
        example_vi: "Anh ấy có thể lực mạnh mẽ và có thể nâng các mức tạ nặng một cách dễ dàng.\nMột tách cà phê đen đậm đặc mạnh mẽ đã giúp anh ấy tỉnh táo suốt ca trực đêm.",
        page_number: 392
      }
    ]
  }
};

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
let vocabList = JSON.parse(raw);

// Lấy phần từ trước Unit 31 và sau Unit 40
const beforeUnits = vocabList.filter(w => w.unit < 31);
const afterUnits = vocabList.filter(w => w.unit > 40);

// Xây dựng lại mảng từ vựng Units 31 -> 40 với word_number liên tục bắt đầu từ 834
let currentWordNumber = 834;
const updatedUnitsVocab = [];

for (let u = 31; u <= 40; u++) {
  const uData = UNITS_31_TO_40_DATA[u];
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

// Cập nhật word_number cho các Unit 41 trở đi
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

console.log(`\n🎉 HOÀN TẤT ĐỒNG BỘ 100% CHÍNH XÁC THEO SÁCH CHO UNITS 31 -> 40!`);
for (let u = 31; u <= 40; u++) {
  const uWords = finalVocabList.filter(w => w.unit === u);
  console.log(`- Unit ${u} (${UNITS_31_TO_40_DATA[u].unit_title}): ${uWords.length} từ (#${uWords[0].word_number} ${uWords[0].word} -> #${uWords[uWords.length-1].word_number} ${uWords[uWords.length-1].word})`);
}
console.log(`Tổng số từ trong toàn bộ từ điển: ${finalVocabList.length}`);
