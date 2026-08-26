import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 30 từ vựng của Unit 3 với đầy đủ 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc (Trang 34 -> 39)
UNIT3_WORDS_UPDATES = [
    {
        "word_number": 65,
        "word": "Address",
        "example_en": "Make sure you don't send it to my older address.\nPlease give me the address of your hotel.",
        "example_vi": "Hãy đảm bảo rằng bạn không gửi nó đến địa chỉ cũ của tôi.\nLàm ơn cho tôi xin địa chỉ khách sạn của bạn."
    },
    {
        "word_number": 66,
        "word": "Advice",
        "example_en": "Let me give you some advice!\nI feel I don't have enough experience to offer dating advice.",
        "example_vi": "Để tôi cho bạn một vài lời khuyên nhé!\nTôi cảm thấy mình không có đủ kinh nghiệm để đưa ra lời khuyên hẹn hò."
    },
    {
        "word_number": 67,
        "word": "Annual",
        "example_en": "It's time for the annual reward ceremony.\nWelcome to the annual Fall Concert!",
        "example_vi": "Đã đến lúc diễn ra lễ trao thưởng thường niên/hàng năm.\nChào mừng các bạn đến với Buổi hòa nhạc Mùa thu thường niên!"
    },
    {
        "word_number": 68,
        "word": "Appear",
        "example_en": "A strange creature appeared in the forest.\nYou don't appear to be a doctor.",
        "example_vi": "Một sinh vật kỳ lạ đã xuất hiện trong khu rừng.\nBạn dường như không giống một bác sĩ."
    },
    {
        "word_number": 69,
        "word": "Applause",
        "example_en": "The crowd erupted in applause.\nHe lived for the sound of the audience's applause.",
        "example_vi": "Đám đông đã vỡ òa trong tiếng vỗ tay.\nAnh ấy sống vì những tràng pháo tay của khán giả."
    },
    {
        "word_number": 70,
        "word": "Appointment",
        "example_en": "I've got an appointment at 3.\nYou should make an appointment with the dentist every year.",
        "example_vi": "Tôi có một cuộc hẹn lúc 3 giờ.\nBạn nên đặt lịch hẹn với nha sĩ hàng năm."
    },
    {
        "word_number": 71,
        "word": "Borrow",
        "example_en": "I hate borrowing money.\nDon't borrow something you can't give back.",
        "example_vi": "Tôi ghét việc đi vay mượn tiền.\nĐừng mượn thứ gì mà bạn không thể hoàn trả."
    },
    {
        "word_number": 72,
        "word": "Bother",
        "example_en": "Stop bothering me!\nThe smell doesn't bother me. It's the taste that does.",
        "example_vi": "Đừng làm phiền tôi nữa!\nMùi hương không làm phiền tôi. Chính cái vị của nó mới làm tôi khó chịu."
    },
    {
        "word_number": 73,
        "word": "Claim",
        "example_en": "I never claimed to be your friend.\nClaim your luggage at the checkout!",
        "example_vi": "Tôi chưa bao giờ tự nhận là bạn của bạn.\nHãy nhận hành lý của bạn tại quầy thủ tục!"
    },
    {
        "word_number": 74,
        "word": "Client",
        "example_en": "Make sure you impress the new clients!\nI work with very wealthy clients.",
        "example_vi": "Hãy đảm bảo rằng bạn gây ấn tượng tốt với các khách hàng mới!\nTôi làm việc với những khách hàng rất giàu có."
    },
    {
        "word_number": 75,
        "word": "Conversation",
        "example_en": "They found it easy to make conversation together.\nI just had the most awkward conversation.",
        "example_vi": "Họ thấy thật dễ dàng để trò chuyện cùng nhau.\nTôi vừa trải qua một cuộc trò chuyện vô cùng gượng gạo."
    },
    {
        "word_number": 76,
        "word": "Deny",
        "example_en": "You can't deny that I am better.\nDon't deny your destiny!",
        "example_vi": "Bạn không thể phủ nhận rằng tôi giỏi hơn.\nĐừng phủ nhận số mệnh của bạn!"
    },
    {
        "word_number": 77,
        "word": "Depress",
        "example_en": "That movie really depresses me.\nThe dinosaur is depressed by the shoes.",
        "example_vi": "Bộ phim đó thực sự làm tôi chán nản.\nChú khủng long cảm thấy chán nản vì đôi giày."
    },
    {
        "word_number": 78,
        "word": "Diary",
        "example_en": "I write in my diary almost every day.\nThis is a diary from the 1600s.",
        "example_vi": "Tôi viết nhật ký gần như mỗi ngày.\nĐây là một cuốn nhật ký từ những năm 1600."
    },
    {
        "word_number": 79,
        "word": "Forget",
        "example_en": "Don't forget our plans next week!\nYou forgot about me already.",
        "example_vi": "Đừng quên kế hoạch của chúng ta vào tuần tới nhé!\nBạn đã quên tôi mất rồi."
    },
    {
        "word_number": 80,
        "word": "Invite",
        "example_en": "Can I invite you out for a drink?\nI don't want to invite my ex to the party.",
        "example_vi": "Tôi có thể mời bạn đi uống nước được không?\nTôi không muốn mời người yêu cũ đến bữa tiệc."
    },
    {
        "word_number": 81,
        "word": "Later",
        "example_en": "We'll party later.\nIt is later than I thought.",
        "example_vi": "Chúng ta sẽ tiệc tùng sau.\nTrời đã muộn hơn tôi nghĩ."
    },
    {
        "word_number": 82,
        "word": "Matter",
        "example_en": "I don't think you understand the matter.\nThis is a serious matter.",
        "example_vi": "Tôi không nghĩ là bạn hiểu vấn đề này đâu.\nĐây là một vấn đề nghiêm trọng."
    },
    {
        "word_number": 83,
        "word": "Obtain",
        "example_en": "Just one more year and you will obtain the title of master.\nHe obtained high social status.",
        "example_vi": "Chỉ một năm nữa thôi là bạn sẽ đạt được danh hiệu thạc sĩ.\nAnh ấy đã đạt được địa vị xã hội cao."
    },
    {
        "word_number": 84,
        "word": "Possess",
        "example_en": "The driver possessed many weapons.\nHe possesses a rare talent.",
        "example_vi": "Người tài xế sở hữu nhiều loại vũ khí.\nAnh ấy sở hữu một tài năng hiếm có."
    },
    {
        "word_number": 85,
        "word": "Purpose",
        "example_en": "What's the purpose of studying at a university?\nMy main purpose is to help others.",
        "example_vi": "Mục đích của việc học đại học là gì?\nMục đích chính của tôi là giúp đỡ những người khác."
    },
    {
        "word_number": 86,
        "word": "Remember",
        "example_en": "Remember me when you move to London!\nI don't remember writing that.",
        "example_vi": "Hãy nhớ đến tôi khi bạn chuyển đến London nhé!\nTôi không nhớ là mình đã viết điều đó."
    },
    {
        "word_number": 87,
        "word": "Remind",
        "example_en": "Stop reminding me about my mistakes.\nThis smell reminds me of my ex.",
        "example_vi": "Đừng nhắc nhở tôi về những sai lầm của tôi nữa.\nMùi hương này làm tôi nhớ đến người yêu cũ."
    },
    {
        "word_number": 88,
        "word": "Rumor",
        "example_en": "Don't tell anyone! I don't want them to be rumors.\nThere's a rumor that you're dating Nick.",
        "example_vi": "Đừng nói với ai nhé! Tôi không muốn chúng trở thành những tin đồn đâu.\nCó tin đồn rằng bạn đang hẹn hò với Nick đấy."
    },
    {
        "word_number": 89,
        "word": "Several",
        "example_en": "There are several ways to get to my house.\nI've repeated myself several times already.",
        "example_vi": "Có một vài cách để đi đến nhà của tôi.\nTôi đã tự lặp lại lời mình vài lần rồi."
    },
    {
        "word_number": 90,
        "word": "Speech",
        "example_en": "I hate giving speeches.\nThe president gave a great speech to honor the soldiers.",
        "example_vi": "Tôi ghét việc phải phát biểu.\nTổng thống đã có một bài phát biểu tuyệt vời để vinh danh các người lính."
    },
    {
        "word_number": 91,
        "word": "Symbol",
        "example_en": "This book has tons of hidden symbols.\nTake this necklace as a symbol of my gratitude!",
        "example_vi": "Cuốn sách này có vô số các biểu tượng ẩn giấu.\nHãy nhận chiếc vòng cổ này như một biểu tượng cho lòng biết ơn của tôi!"
    },
    {
        "word_number": 92,
        "word": "Therefore",
        "example_en": "No one wants to buy their products. Therefore, they need to cut down the price.\nThe solution, therefore, is to consume more Vitamin A.",
        "example_vi": "Không ai muốn mua sản phẩm của họ. Vì vậy, họ cần phải giảm giá.\nDo đó, giải pháp là bổ sung thêm nhiều Vitamin A."
    },
    {
        "word_number": 93,
        "word": "Translate",
        "example_en": "Could you translate these sentences into Russian?\nShe needs to finish translating this document by Tuesday.",
        "example_vi": "Bạn có thể dịch những câu này sang tiếng Nga được không?\nCô ấy cần hoàn thành việc dịch tài liệu này trước thứ Ba."
    },
    {
        "word_number": 94,
        "word": "Underline",
        "example_en": "I've underlined the main ideas for you.\nI underline words when I read.",
        "example_vi": "Tôi đã gạch dưới những ý chính cho bạn rồi.\nTôi gạch chân dưới các từ khi đọc sách."
    }
]

def main():
    json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'hacknao_vocab.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        vocab_list = json.load(f)
    
    update_map = {item['word_number']: item for item in UNIT3_WORDS_UPDATES}
    
    count = 0
    for v in vocab_list:
        if v.get('unit') == 3 and v.get('word_number') in update_map:
            up = update_map[v['word_number']]
            v['example_en'] = up['example_en']
            v['example_vi'] = up['example_vi']
            count += 1
            print(f"Updated #{v['word_number']} {v['word']}: {len(up['example_en'].splitlines())} câu ví dụ")
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(vocab_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Đã cập nhật thành công {count} từ vựng Unit 3 trong hacknao_vocab.json!")

if __name__ == '__main__':
    main()
