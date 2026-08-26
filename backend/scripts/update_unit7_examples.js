import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 21 từ vựng của Unit 7 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 72 -> 75)
const UNIT7_WORDS_UPDATES = [
  {
    "word_number": 177,
    "word": "Appetite",
    "example_en": "I have such a big appetite in the mornings.\nWhen you have the flu, you usually don't have an appetite.",
    "example_vi": "Tôi ăn rất ngon miệng vào các buổi sáng.\nKhi bị cảm cúm, bạn thường không cảm thấy ngon miệng."
  },
  {
    "word_number": 178,
    "word": "Barbecue",
    "example_en": "The whole class was invited to the barbecue.\nThe barbecue at your place was so good.",
    "example_vi": "Cả lớp đã được mời đến bữa tiệc thịt nướng.\nBữa tiệc thịt nướng tại nhà bạn thật tuyệt vời."
  },
  {
    "word_number": 179,
    "word": "Beverage",
    "example_en": "Would you like any beverages with your dinner?\nI don't drink alcoholic beverages.",
    "example_vi": "Bạn có muốn dùng đồ uống gì cùng bữa tối không?\nTôi không uống các loại đồ uống có cồn."
  },
  {
    "word_number": 180,
    "word": "Culinary",
    "example_en": "She went to culinary school to become a chef.\nMy mother has great culinary skills.",
    "example_vi": "Cô ấy đã theo học trường ẩm thực để trở thành một đầu bếp.\nMẹ tôi có những kỹ năng nấu nướng bếp núc tuyệt vời."
  },
  {
    "word_number": 181,
    "word": "Flavor",
    "example_en": "This chicken has no flavor.\nYou can really taste the spicy flavor.",
    "example_vi": "Món thịt gà này không có mùi vị gì cả.\nBạn thực sự có thể cảm nhận được hương vị cay nồng."
  },
  {
    "word_number": 182,
    "word": "Freeze",
    "example_en": "Freeze the chicken before cooking it!\nMake sure you freeze the ice cream!",
    "example_vi": "Hãy làm đông thịt gà trước khi nấu nhé!\nHãy chắc chắn rằng bạn làm đông kem!"
  },
  {
    "word_number": 183,
    "word": "Grill",
    "example_en": "I love to grill hamburgers for my neighbors.\nDon't grill the chicken for too long! It will become dry.",
    "example_vi": "Tôi thích nướng bánh hamburger cho những người hàng xóm của mình.\nĐừng nướng thịt gà quá lâu! Nó sẽ bị khô đấy."
  },
  {
    "word_number": 184,
    "word": "Ingredient",
    "example_en": "I forgot some ingredients at home.\nWhere can you find the ingredients for Thai curry?",
    "example_vi": "Tôi đã quên một số nguyên liệu ở nhà.\nBạn có thể tìm mua các nguyên liệu cho món cà ri Thái ở đâu?"
  },
  {
    "word_number": 185,
    "word": "Kettle",
    "example_en": "Let the kettle boil!\nI bought a special kettle for my grandmother.",
    "example_vi": "Hãy để cho ấm đun nước sôi lên!\nTôi đã mua một chiếc ấm đun nước đặc biệt cho bà của tôi."
  },
  {
    "word_number": 186,
    "word": "Mixture",
    "example_en": "Stir the mixture until it is smooth!\nHe had a mixture of many emotions.",
    "example_vi": "Hãy khuấy đều hỗn hợp cho đến khi sánh mịn!\nAnh ấy mang một hỗn hợp nhiều cảm xúc lẫn lộn."
  },
  {
    "word_number": 187,
    "word": "Mix-up",
    "example_en": "I've mixed-up these recipes.\nSometimes I mix-up all the ingredients to make cakes.",
    "example_vi": "Tôi đã làm lẫn lộn các công thức nấu ăn này.\nĐôi khi tôi trộn tất cả các nguyên liệu lại để làm bánh."
  },
  {
    "word_number": 188,
    "word": "Refrigerator",
    "example_en": "The new refrigerator will arrive tomorrow.\nThe refrigerator isn't cold enough.",
    "example_vi": "Chiếc tủ lạnh mới sẽ được giao vào ngày mai.\nChiếc tủ lạnh không đủ độ lạnh."
  },
  {
    "word_number": 189,
    "word": "Rib",
    "example_en": "These ribs could feed five people.\nThe rib is the best part of the cow.",
    "example_vi": "Chỗ sườn này có thể đủ cho năm người ăn.\nPhần sườn là phần ngon nhất của con bò."
  },
  {
    "word_number": 190,
    "word": "Roast",
    "example_en": "Roast the vegetables slowly!\nThe best way to cook pork is to roast it.",
    "example_vi": "Hãy nướng rau củ một cách từ từ!\nCách tốt nhất để nấu thịt lợn là nướng nó."
  },
  {
    "word_number": 191,
    "word": "Salty",
    "example_en": "This soup is too salty.\nI love the mixture of sweet and salty flavors.",
    "example_vi": "Món súp này quá mặn.\nTôi thích sự kết hợp giữa hương vị ngọt và mặn."
  },
  {
    "word_number": 192,
    "word": "Sample",
    "example_en": "May I have a sample?\nCustomers can sample the smoothie.",
    "example_vi": "Tôi có thể xin một mẫu nếm thử được không?\nKhách hàng có thể nếm thử mẫu sinh tố."
  },
  {
    "word_number": 193,
    "word": "Spice",
    "example_en": "The recipe needed some rare Chinese spices.\nOregano is the best spice for pizza.",
    "example_vi": "Công thức nấu ăn này cần một số loại gia vị Trung Quốc quý hiếm.\nKinh giới cay là loại gia vị ngon nhất cho món pizza."
  },
  {
    "word_number": 194,
    "word": "Steam",
    "example_en": "You can still get burned by steam.\nWhen you can see steam, take the chicken off the burner.",
    "example_vi": "Bạn vẫn có thể bị bỏng bởi hơi nước đấy.\nKhi bạn thấy có hơi nước bốc lên, hãy nhấc gà ra khỏi bếp nấu."
  },
  {
    "word_number": 195,
    "word": "Stove",
    "example_en": "My stove is electric.\nCook the steak on the stove for ten minutes!",
    "example_vi": "Bếp lò của tôi chạy bằng điện.\nHãy nấu miếng bít tết trên bếp trong mười phút nhé!"
  },
  {
    "word_number": 196,
    "word": "Taste",
    "example_en": "Why don't you give this a taste?\nThis is such a unique taste.",
    "example_vi": "Tại sao bạn không nếm thử món này xem sao?\nĐây thực sự là một hương vị rất độc đáo."
  },
  {
    "word_number": 197,
    "word": "Toast",
    "example_en": "I eat my toast with butter.\nDon't burn the toast!",
    "example_vi": "Tôi ăn bánh mì nướng với bơ.\nĐừng để làm cháy bánh mì nướng nhé!"
  }
];

const jsonPath = path.join(__dirname, '..', 'data', 'hacknao_vocab.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const vocabList = JSON.parse(raw);

const updateMap = new Map(UNIT7_WORDS_UPDATES.map(item => [item.word_number, item]));

let count = 0;
for (const v of vocabList) {
  if (v.unit === 7 && updateMap.has(v.word_number)) {
    const up = updateMap.get(v.word_number);
    v.example_en = up.example_en;
    v.example_vi = up.example_vi;
    count++;
    console.log(`Updated #${v.word_number} ${v.word}: ${up.example_en.split('\n').length} câu ví dụ`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`\n✅ Đã cập nhật thành công ${count} từ vựng Unit 7 trong hacknao_vocab.json!`);
