import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 33 từ vựng của Unit 2 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 24 -> 29)
UNIT2_WORDS_UPDATES = [
    {
        "word_number": 32,
        "word": "Almost",
        "example_en": "We almost had the victory.\nI'm almost finished.",
        "example_vi": "Chúng ta gần như đã có được chiến thắng.\nTôi gần như đã hoàn thành xong rồi."
    },
    {
        "word_number": 33,
        "word": "Confidence",
        "example_en": "You need confidence to be a politician.\nI want to help you have more confidence.",
        "example_vi": "Bạn cần sự tự tin để trở thành một chính trị gia.\nTôi muốn giúp bạn có thêm sự tự tin."
    },
    {
        "word_number": 34,
        "word": "Despite",
        "example_en": "Despite my good salary, I'm leaving the company.\nDespite his best efforts, he didn't get the job.",
        "example_vi": "Mặc dù mức lương của tôi rất tốt, tôi vẫn sẽ rời công ty.\nMặc dù đã nỗ lực hết sức, anh ấy vẫn không nhận được công việc."
    },
    {
        "word_number": 35,
        "word": "Emphasize",
        "example_en": "I want to emphasize the importance of eating breakfast.\nI understand already. You don't need to keep emphasizing it.",
        "example_vi": "Tôi muốn nhấn mạnh tầm quan trọng của việc ăn bữa sáng.\nTôi đã hiểu rồi. Bạn không cần phải liên tục nhấn mạnh điều đó đâu."
    },
    {
        "word_number": 36,
        "word": "Express",
        "example_en": "He expressed his love for her.\nSome animals express unique characteristics from genetic mutations.",
        "example_vi": "Anh ấy đã bày tỏ tình yêu của mình với cô ấy.\nMột số loài động vật biểu hiện những đặc tính độc đáo từ đột biến gen."
    },
    {
        "word_number": 37,
        "word": "Guess",
        "example_en": "Take a guess!\nI guess you're not coming out tonight.",
        "example_vi": "Hãy thử đoán xem!\nTôi đoán là tối nay bạn sẽ không đi chơi."
    },
    {
        "word_number": 38,
        "word": "Imply",
        "example_en": "What are you implying?\nThe research implies we need new ways to deal with climate change.",
        "example_vi": "Bạn đang ám chỉ điều gì vậy?\nNghiên cứu ám chỉ rằng chúng ta cần những phương thức mới để ứng phó với biến đổi khí hậu."
    },
    {
        "word_number": 39,
        "word": "Inform",
        "example_en": "I'll inform the others about the sad news.\nTV often isn't the best way to inform yourself.",
        "example_vi": "Tôi sẽ thông báo cho những người khác về tin buồn này.\nXem TV thường không phải là cách tốt nhất để bạn cập nhật thông tin."
    },
    {
        "word_number": 40,
        "word": "Initial",
        "example_en": "The initial explosion killed two people.\nMy initial reaction was surprise.",
        "example_vi": "Vụ nổ ban đầu đã làm hai người thiệt mạng.\nPhản ứng ban đầu của tôi là ngạc nhiên."
    },
    {
        "word_number": 41,
        "word": "Idiom",
        "example_en": "There are plenty of idioms about the weather.\nIt's only an idiom, don't take it literally.",
        "example_vi": "Có rất nhiều thành ngữ nói về thời tiết.\nNó chỉ là một câu thành ngữ thôi, đừng hiểu theo nghĩa đen."
    },
    {
        "word_number": 42,
        "word": "Insist",
        "example_en": "Don't worry, I insist!\nHe insisted I eat dessert.",
        "example_vi": "Đừng lo, tôi khăng khăng/nhất quyết mời mà!\nAnh ấy khăng khăng bắt tôi ăn món tráng miệng."
    },
    {
        "word_number": 43,
        "word": "Issue",
        "example_en": "I don't see why this is an issue.\nYou should stay informed about the issues.",
        "example_vi": "Tôi không hiểu tại sao điều này lại là một vấn đề.\nBạn nên cập nhật thông tin về các vấn đề này."
    },
    {
        "word_number": 44,
        "word": "Mention",
        "example_en": "In my thank you speech, I mentioned my mother and father first.\nIt's not a problem, don't mention it.",
        "example_vi": "Trong bài phát biểu cảm ơn của mình, tôi đã đề cập đến bố mẹ đầu tiên.\nKhông có vấn đề gì đâu, đừng bận tâm/đừng nhắc đến nữa."
    },
    {
        "word_number": 45,
        "word": "Interrupt",
        "example_en": "Don't interrupt me while I'm speaking.\nShe was interrupted by a crash.",
        "example_vi": "Đừng ngắt lời khi tôi đang nói.\nCô ấy đã bị gián đoạn bởi một tiếng va chạm mạnh."
    },
    {
        "word_number": 46,
        "word": "Material",
        "example_en": "Steel is the best material for the bridge.\nThe comedian ran out of good material.",
        "example_vi": "Thép là vật liệu tốt nhất để xây cầu.\nDiễn viên hài đã cạn kiệt những mẩu truyện/chất liệu hay."
    },
    {
        "word_number": 47,
        "word": "Inquiry",
        "example_en": "We'll need to make an inquiry regarding the accident.\nHave you heard the results of the inquiry?",
        "example_vi": "Chúng ta sẽ cần thực hiện một cuộc điều tra liên quan đến vụ tai nạn.\nBạn đã nghe kết quả của cuộc điều tra chưa?"
    },
    {
        "word_number": 48,
        "word": "Persuade",
        "example_en": "No matter what he said, he couldn't persuade her to join him.\nWhat can I say to persuade you?",
        "example_vi": "Dù anh ấy nói gì đi nữa, anh ấy cũng không thể thuyết phục cô ấy tham gia cùng mình.\nTôi có thể nói gì để thuyết phục bạn đây?"
    },
    {
        "word_number": 49,
        "word": "Predict",
        "example_en": "Whom do you predict will win?\nI cannot predict the future.",
        "example_vi": "Bạn dự đoán ai sẽ giành chiến thắng?\nTôi không thể đoán trước được tương lai."
    },
    {
        "word_number": 50,
        "word": "Quote",
        "example_en": "Don't quote me without my permission!\nYou need to quote more sources.",
        "example_vi": "Đừng trích dẫn lời tôi mà không có sự cho phép của tôi!\nBạn cần phải trích dẫn nhiều nguồn tài liệu hơn."
    },
    {
        "word_number": 51,
        "word": "Phase",
        "example_en": "We are now in the second phase of the experiment.\nIt's only a short phase.",
        "example_vi": "Hiện tại chúng ta đang ở giai đoạn thứ hai của cuộc thử nghiệm.\nĐó chỉ là một giai đoạn ngắn thôi."
    },
    {
        "word_number": 52,
        "word": "Questionnaire",
        "example_en": "Could you fill out the questionnaire?\nThe questionnaire really helps me improve my teaching method.",
        "example_vi": "Bạn có thể điền vào bảng câu hỏi này được không?\nBảng câu hỏi thực sự giúp tôi cải thiện phương pháp giảng dạy của mình."
    },
    {
        "word_number": 53,
        "word": "Paragraph",
        "example_en": "My essay still needs a concluding paragraph.\nPlease read the second paragraph silently!",
        "example_vi": "Bài luận của tôi vẫn còn thiếu một đoạn văn kết bài.\nXin vui lòng đọc thầm đoạn văn thứ hai!"
    },
    {
        "word_number": 54,
        "word": "Recent",
        "example_en": "Recent weather has made it impossible to play outside.\nI haven't done much exercise in recent weeks.",
        "example_vi": "Thời tiết gần đây đã khiến chúng tôi không thể ra ngoài chơi.\nTôi đã không tập thể dục nhiều trong những tuần gần đây."
    },
    {
        "word_number": 55,
        "word": "Respond",
        "example_en": "I won't respond to the critics.\nShe always responded with wit.",
        "example_vi": "Tôi sẽ không phản hồi lại những lời chỉ trích.\nCô ấy luôn phản hồi/đáp lại bằng sự hóm hỉnh."
    },
    {
        "word_number": 56,
        "word": "Scream",
        "example_en": "He screamed in terror.\nSomeone is screaming.",
        "example_vi": "Anh ấy đã thét lên trong sự kinh hãi.\nCó ai đó đang la hét."
    },
    {
        "word_number": 57,
        "word": "Reflect",
        "example_en": "Reflecting is important for improvement.\nI need to reflect on my actions.",
        "example_vi": "Tự suy ngẫm/chiêm nghiệm là điều rất quan trọng để tiến bộ.\nTôi cần phải suy ngẫm lại về những hành động của mình."
    },
    {
        "word_number": 58,
        "word": "Shout",
        "example_en": "Don't shout in the library!\nMy father shouted at me for stealing.",
        "example_vi": "Đừng la hét trong thư viện!\nBố tôi đã quát tháo tôi vì tội trộm cắp."
    },
    {
        "word_number": 59,
        "word": "Survey",
        "example_en": "We'll survey the population.\nAfter surveying the community, we think it's best to stop the construction of the football stadium.",
        "example_vi": "Chúng tôi sẽ tiến hành khảo sát dân số.\nSau khi khảo sát cộng đồng, chúng tôi nghĩ tốt nhất là nên dừng việc xây dựng sân vận động bóng đá."
    },
    {
        "word_number": 60,
        "word": "Tension",
        "example_en": "You could feel the tension in the room.\nYour neck has a lot of tension.",
        "example_vi": "Bạn có thể cảm nhận được sự căng thẳng trong căn phòng.\nCổ của bạn đang bị căng cơ rất nhiều."
    },
    {
        "word_number": 61,
        "word": "Urge",
        "example_en": "Do not urge me to try smoking.\nI urge you to check again.",
        "example_vi": "Đừng thúc giục tôi thử hút thuốc.\nTôi thúc giục bạn hãy kiểm tra lại lần nữa."
    },
    {
        "word_number": 62,
        "word": "Warn",
        "example_en": "You were warned about this company.\nI'll warn the others.",
        "example_vi": "Bạn đã được cảnh báo trước về công ty này rồi.\nTôi sẽ cảnh báo cho những người khác."
    },
    {
        "word_number": 63,
        "word": "Trick",
        "example_en": "It was only a trick.\nIt's just a magic trick.",
        "example_vi": "Đó chỉ là một mánh khóe/thủ thuật thôi.\nĐó chỉ là một trò ảo thuật thôi."
    },
    {
        "word_number": 64,
        "word": "Vowel",
        "example_en": "Do you know all the English vowels?\nI can't pronounce many vowel sounds properly.",
        "example_vi": "Bạn có biết tất cả các nguyên âm trong tiếng Anh không?\nTôi không thể phát âm chuẩn nhiều âm nguyên âm."
    }
]

def main():
    json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'hacknao_vocab.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        vocab_list = json.load(f)
    
    update_map = {item['word_number']: item for item in UNIT2_WORDS_UPDATES}
    
    count = 0
    for v in vocab_list:
        if v.get('unit') == 2 and v.get('word_number') in update_map:
            up = update_map[v['word_number']]
            v['example_en'] = up['example_en']
            v['example_vi'] = up['example_vi']
            count += 1
            print(f"Updated #{v['word_number']} {v['word']}: {len(up['example_en'].splitlines())} câu ví dụ")
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(vocab_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Đã cập nhật thành công {count} từ vựng Unit 2 trong hacknao_vocab.json!")

if __name__ == '__main__':
    main()
