import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 23 từ vựng của Unit 6 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 63 -> 67)
const UNIT6_WORDS_UPDATES = [
  {
    "word_number": 154,
    "word": "Bacon",
    "example_en": "Bacon and eggs make a great breakfast.\nHow can you live without eating bacon?",
    "example_vi": "Thịt xông khói và trứng tạo nên một bữa sáng tuyệt vời.\nLàm sao bạn có thể sống mà không ăn thịt xông khói chứ?"
  },
  {
    "word_number": 155,
    "word": "Broccoli",
    "example_en": "Chicken and broccoli go well together.\nMy father grows broccoli in the backyard.",
    "example_vi": "Thịt gà và bông cải xanh rất hợp khi ăn cùng nhau.\nBố tôi trồng bông cải xanh ở sân sau."
  },
  {
    "word_number": 156,
    "word": "Cabbage",
    "example_en": "Some animals ate my cabbages.\nCabbages are bitter if you pick them too early.",
    "example_vi": "Một vài con vật đã ăn hết chỗ bắp cải của tôi.\nBắp cải sẽ bị đắng nếu bạn hái chúng quá sớm."
  },
  {
    "word_number": 157,
    "word": "Champagne",
    "example_en": "The bottle of champagne was more expensive than my computer.\nPop the champagne! It's my birthday.",
    "example_vi": "Chai rượu sâm banh đó đắt hơn cả chiếc máy tính của tôi.\nHãy khui sâm banh đi! Hôm nay là sinh nhật của tôi."
  },
  {
    "word_number": 158,
    "word": "Cucumber",
    "example_en": "Could you cut some cucumbers for the sandwich?\nCucumbers are mostly water.",
    "example_vi": "Bạn có thể cắt một vài quả dưa leo cho món bánh kẹp không?\nDưa leo hầu như là nước."
  },
  {
    "word_number": 159,
    "word": "Dessert",
    "example_en": "Would you like dessert?\nI don't usually eat dessert, but I couldn't resist the ice cream.",
    "example_vi": "Bạn có muốn dùng món tráng miệng không?\nTôi thường không ăn món tráng miệng, nhưng tôi không thể cưỡng lại món kem."
  },
  {
    "word_number": 160,
    "word": "Flour",
    "example_en": "Mix flour with wine to make the sauce!\nToo much flour will make the bread dry.",
    "example_vi": "Hãy trộn bột mì với rượu để làm nước sốt!\nQuá nhiều bột mì sẽ làm bánh mì bị khô."
  },
  {
    "word_number": 161,
    "word": "Juice",
    "example_en": "Fruit juice is often high in sugar.\nThe orange juice is free.",
    "example_vi": "Nước ép trái cây thường chứa nhiều đường.\nNước ép cam được miễn phí."
  },
  {
    "word_number": 162,
    "word": "Lemonade",
    "example_en": "I prefer lemonade with no ice.\nMy son sells lemonade on the weekends to buy toys.",
    "example_vi": "Tôi thích uống nước chanh không đá hơn.\nCon trai tôi bán nước chanh vào các ngày cuối tuần để mua đồ chơi."
  },
  {
    "word_number": 163,
    "word": "Mint",
    "example_en": "Mint goes great with a mojito.\nCould you grab some more mint from the garden?",
    "example_vi": "Lá bạc hà rất hợp khi pha cùng mojito.\nBạn có thể hái thêm một ít lá bạc hà từ ngoài vườn được không?"
  },
  {
    "word_number": 164,
    "word": "Mushroom",
    "example_en": "We're going out to pick some mushrooms.\nThis oil is made from mushrooms.",
    "example_vi": "Chúng tôi đang ra ngoài để hái nấm.\nLoại dầu này được chiết xuất từ nấm."
  },
  {
    "word_number": 165,
    "word": "Pepper",
    "example_en": "Would you mind cutting the peppers?\nToo much pepper will ruin the taste.",
    "example_vi": "Bạn có phiền cắt giúp mấy quả ớt chuông không?\nQuá nhiều hạt tiêu sẽ làm hỏng hương vị."
  },
  {
    "word_number": 166,
    "word": "Powder",
    "example_en": "Just sprinkle some of the powder into the soup for a better taste!\nYou can use the protein powder to make a healthy smoothie.",
    "example_vi": "Chỉ cần rắc một ít bột này vào súp để tăng thêm vị ngon!\nBạn có thể dùng bột đạm protein để làm một ly sinh tố bổ dưỡng."
  },
  {
    "word_number": 167,
    "word": "Recipe",
    "example_en": "This recipe can serve four people.\nThe recipe requires a lot of expensive ingredients.",
    "example_vi": "Công thức này đủ khẩu phần cho bốn người.\nCông thức này đòi hỏi rất nhiều nguyên liệu đắt tiền."
  },
  {
    "word_number": 168,
    "word": "Sausage",
    "example_en": "Germany is famous for sausage.\nI mix some sausage in with my eggs.",
    "example_vi": "Nước Đức rất nổi tiếng về món xúc xích.\nTôi trộn một ít xúc xích cùng với trứng của mình."
  },
  {
    "word_number": 169,
    "word": "Shrimp",
    "example_en": "Are the shrimp finished yet?\nShrimp are a great source of protein.",
    "example_vi": "Món tôm đã nấu chín xong chưa?\nTôm là một nguồn cung cấp protein tuyệt vời."
  },
  {
    "word_number": 170,
    "word": "Sour",
    "example_en": "Have you tried KFC's new sweet and sour chicken?\nThe lemonade was a bit too sour.",
    "example_vi": "Bạn đã thử món gà chua ngọt mới của KFC chưa?\nCốc nước chanh này hơi bị quá chua."
  },
  {
    "word_number": 171,
    "word": "Spinach",
    "example_en": "I like salad with only a little spinach.\nSpinach is too bitter for me.",
    "example_vi": "Tôi thích ăn salad chỉ với một ít rau cải bó xôi.\nRau cải bó xôi quá đắng đối với tôi."
  },
  {
    "word_number": 172,
    "word": "Squash",
    "example_en": "There are many varieties of squash.\nYou can use squash to make soup.",
    "example_vi": "Có rất nhiều giống bí khác nhau.\nBạn có thể dùng quả bí để nấu món súp."
  },
  {
    "word_number": 173,
    "word": "Steak",
    "example_en": "I like my steak a little red.\nFilet mignon is my favorite steak.",
    "example_vi": "Tôi thích món bít tết của mình hơi tái một chút.\nFilet mignon là món bít tết ưa thích nhất của tôi."
  },
  {
    "word_number": 174,
    "word": "Tuna",
    "example_en": "Don't eat too much tuna! The meat has mercury.\nRecently, tuna have become more rare due to overfishing.",
    "example_vi": "Đừng ăn quá nhiều cá ngừ! Thịt cá có chứa thủy ngân.\nGần đây, cá ngừ trở nên hiếm hơn do đánh bắt quá mức."
  },
  {
    "word_number": 175,
    "word": "Vegetarian",
    "example_en": "Vegetarians can still get enough protein.\nI became a vegetarian after I watched a documentary about the meat industry.",
    "example_vi": "Những người ăn chay vẫn có thể hấp thu đủ lượng protein.\nTôi đã trở thành người ăn chay sau khi xem bộ phim tài liệu về ngành công nghiệp thịt."
  },
  {
    "word_number": 176,
    "word": "Vinegar",
    "example_en": "Vinegar and oil makes a simple salad dressing.\nVinegar has many uses, including cleaning.",
    "example_vi": "Giấm và dầu tạo nên một loại sốt trộn salad đơn giản.\nGiấm có rất nhiều công dụng, bao gồm cả việc lau chùi tẩy rửa."
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT6_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 6 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 6 trong hacknao_vocab.json!`);
