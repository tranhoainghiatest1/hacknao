import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 31 từ vựng của Unit 1 với đầy đủ ít nhất 2 câu ví dụ tiếng Anh + dịch nghĩa tiếng Việt chuẩn từ sách gốc
UNIT1_WORDS_UPDATES = [
    {
        "word_number": 1,
        "word": "Additional",
        "example_en": "Your application still needs additional information.\nI'll give you an additional assignment.",
        "example_vi": "Đơn đăng ký của bạn vẫn cần thêm thông tin bổ sung.\nTôi sẽ giao cho bạn một bài tập bổ sung."
    },
    {
        "word_number": 2,
        "word": "Admit",
        "example_en": "I never admitted I did that.\nHe never admits when he makes mistakes.",
        "example_vi": "Tôi chưa bao giờ thừa nhận mình đã làm điều đó.\nAnh ấy không bao giờ thừa nhận khi mình mắc sai lầm."
    },
    {
        "word_number": 3,
        "word": "Agree",
        "example_en": "We can still work together if we don't agree.\nI agree completely.",
        "example_vi": "Chúng ta vẫn có thể làm việc cùng nhau nếu chúng ta không đồng ý.\nTôi hoàn toàn đồng ý."
    },
    {
        "word_number": 4,
        "word": "Announce",
        "example_en": "I'll announce the news tomorrow.\nShe excitedly announced that she was getting married.",
        "example_vi": "Tôi sẽ thông báo tin tức vào ngày mai.\nCô ấy hào hứng thông báo rằng mình sắp kết hôn."
    },
    {
        "word_number": 5,
        "word": "Apologize",
        "example_en": "I apologize for the inconvenience.\nThere is no need to apologize.",
        "example_vi": "Tôi xin lỗi vì sự bất tiện này.\nKhông cần phải xin lỗi đâu."
    },
    {
        "word_number": 6,
        "word": "Approve",
        "example_en": "My boss approved the contract.\nI'm sorry if you do not approve of my decision.",
        "example_vi": "Sếp của tôi đã phê duyệt hợp đồng.\nTôi rất tiếc nếu bạn không tán thành quyết định của tôi."
    },
    {
        "word_number": 7,
        "word": "Argue",
        "example_en": "I rarely argue with my brothers.\nDon't argue with your mother!",
        "example_vi": "Tôi hiếm khi tranh cãi với các anh em trai của mình.\nĐừng tranh cãi với mẹ của bạn!"
    },
    {
        "word_number": 8,
        "word": "Blame",
        "example_en": "Jack always blames others for his mistakes.\nI blame myself.",
        "example_vi": "Jack luôn đổ lỗi cho người khác về những sai lầm của mình.\nTôi tự trách bản thân mình."
    },
    {
        "word_number": 9,
        "word": "Brief",
        "example_en": "I'll brief the staff before moving forward.\nThe president was briefed on the situation.",
        "example_vi": "Tôi sẽ tóm tắt/chỉ dẫn cho các nhân viên trước khi tiếp tục.\nTổng thống đã được tóm tắt về tình hình."
    },
    {
        "word_number": 10,
        "word": "Brochure",
        "example_en": "Take a look at our travel brochure!\nMy business needs 500 brochures with color.",
        "example_vi": "Hãy xem qua cuốn sách giới thiệu du lịch của chúng tôi!\nDoanh nghiệp của tôi cần 500 cuốn brochure in màu."
    },
    {
        "word_number": 11,
        "word": "Certain",
        "example_en": "This means certain failure.\nI'm not certain about that.",
        "example_vi": "Điều này có nghĩa là chắc chắn thất bại.\nTôi không chắc chắn về điều đó."
    },
    {
        "word_number": 12,
        "word": "Comma",
        "example_en": "Use a comma when you're writing lists!\nYour essay needs a lot of commas.",
        "example_vi": "Hãy sử dụng dấu phẩy khi bạn viết danh sách!\nBài luận của bạn cần thêm nhiều dấu phẩy."
    },
    {
        "word_number": 13,
        "word": "Complaint",
        "example_en": "We've received a lot of complaints about your attitude.\nI don't want to hear one more complaint from you.",
        "example_vi": "Chúng tôi đã nhận được rất nhiều lời phàn nàn về thái độ của bạn.\nTôi không muốn nghe thêm bất kỳ lời phàn nàn nào từ bạn nữa."
    },
    {
        "word_number": 14,
        "word": "Complete",
        "example_en": "Complete your tasks on time!\nHave you completed the homework?",
        "example_vi": "Hãy hoàn thành nhiệm vụ của bạn đúng hạn!\nBạn đã hoàn thành bài tập về nhà chưa?"
    },
    {
        "word_number": 15,
        "word": "Conference",
        "example_en": "There's a big conference next week.\nI have to give a speech at the annual medical conference.",
        "example_vi": "Có một hội nghị lớn vào tuần tới.\nTôi phải phát biểu tại hội nghị y khoa thường niên."
    },
    {
        "word_number": 16,
        "word": "Confirm",
        "example_en": "Could you confirm some information for me?\nI can't confirm the date now.",
        "example_vi": "Bạn có thể xác nhận một số thông tin giúp tôi được không?\nTôi chưa thể xác nhận ngày cụ thể vào lúc này."
    },
    {
        "word_number": 17,
        "word": "Contact",
        "example_en": "Contact me when you arrive!\nYou should not contact your ex-lover.",
        "example_vi": "Hãy liên lạc với tôi khi bạn đến nơi!\nBạn không nên liên lạc với người yêu cũ."
    },
    {
        "word_number": 18,
        "word": "Convince",
        "example_en": "You can't convince me otherwise.\nHis mother convinced him to study biology instead of music.",
        "example_vi": "Bạn không thể thuyết phục tôi nghĩ khác được đâu.\nMẹ anh ấy đã thuyết phục anh ấy học sinh học thay vì âm nhạc."
    },
    {
        "word_number": 19,
        "word": "Discuss",
        "example_en": "We'll discuss this later.\nI want to discuss some things with you.",
        "example_vi": "Chúng ta sẽ thảo luận việc này sau.\nTôi muốn thảo luận một vài điều với bạn."
    },
    {
        "word_number": 20,
        "word": "Extreme",
        "example_en": "That's an extreme decision.\nThere's no need for extreme anger.",
        "example_vi": "Đó là một quyết định vô cùng cực đoan.\nKhông cần thiết phải tức giận tột cùng như vậy."
    },
    {
        "word_number": 21,
        "word": "Hint",
        "example_en": "These hints may identify the killer.\nI'll give you a hint.",
        "example_vi": "Những gợi ý này có thể giúp nhận diện kẻ sát nhân.\nTôi sẽ cho bạn một lời gợi ý."
    },
    {
        "word_number": 22,
        "word": "Hurry",
        "example_en": "You don't need to hurry. There is plenty of time.\nHurry or you'll miss the bus!",
        "example_vi": "Bạn không cần phải vội vã. Còn rất nhiều thời gian.\nNhanh lên kẻo bạn sẽ lỡ chuyến xe buýt đấy!"
    },
    {
        "word_number": 23,
        "word": "Include",
        "example_en": "I don't include my little brother when I invite my friends to play.\nIs dinner included with this package?",
        "example_vi": "Tôi không tính cả em trai khi mời bạn bè đến chơi.\nBữa tối có bao gồm trong gói dịch vụ này không?"
    },
    {
        "word_number": 24,
        "word": "Interact",
        "example_en": "My cats don't like to interact.\nI've never even interacted with him.",
        "example_vi": "Mấy con mèo của tôi không thích tương tác.\nTôi thậm chí chưa từng tương tác/nói chuyện với anh ấy."
    },
    {
        "word_number": 25,
        "word": "Need",
        "example_en": "I need to get some sleep.\nYou don't need to be angry now.",
        "example_vi": "Tôi cần đi ngủ một chút.\nBây giờ bạn không cần phải tức giận đâu."
    },
    {
        "word_number": 26,
        "word": "Order",
        "example_en": "I'm going to order a pizza tonight.\nI ordered these shoes last week.",
        "example_vi": "Tôi sẽ gọi một chiếc bánh pizza tối nay.\nTôi đã đặt mua đôi giày này vào tuần trước."
    },
    {
        "word_number": 27,
        "word": "Postcard",
        "example_en": "Send me postcards when you're abroad.\nThe postcard never arrived.",
        "example_vi": "Hãy gửi bưu thiếp cho tôi khi bạn ra nước ngoài nhé.\nTấm bưu thiếp đó chưa bao giờ được gửi đến."
    },
    {
        "word_number": 28,
        "word": "Prepare",
        "example_en": "I still need to prepare my lesson plan.\nHave you prepared the kitchen for inspection?",
        "example_vi": "Tôi vẫn cần chuẩn bị giáo án của mình.\nBạn đã chuẩn bị nhà bếp để phục vụ việc kiểm tra chưa?"
    },
    {
        "word_number": 29,
        "word": "Reason",
        "example_en": "I have no reason to be upset, but I am.\nHe frequently shouted without reason.",
        "example_vi": "Tôi không có lý do gì để buồn bã, nhưng tôi vẫn thấy buồn.\nAnh ấy thường xuyên la hét mà không có lý do."
    },
    {
        "word_number": 30,
        "word": "Stamp",
        "example_en": "He collects old stamps.\nStamps nowadays are too expensive.",
        "example_vi": "Anh ấy sưu tập những con tem cũ.\nTem thư ngày nay quá đắt đỏ."
    },
    {
        "word_number": 31,
        "word": "Whole",
        "example_en": "As a whole, the concert was a success.\nHe ate the strawberry whole.",
        "example_vi": "Nhìn chung toàn bộ, buổi hòa nhạc đã thành công tốt đẹp.\nAnh ấy đã ăn trọn vẹn cả quả dâu tây."
    }
]

def main():
    json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'hacknao_vocab.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        vocab_list = json.load(f)
    
    update_map = {item['word_number']: item for item in UNIT1_WORDS_UPDATES}
    
    count = 0
    for v in vocab_list:
        if v.get('unit') == 1 and v.get('word_number') in update_map:
            up = update_map[v['word_number']]
            v['example_en'] = up['example_en']
            v['example_vi'] = up['example_vi']
            count += 1
            print(f"Updated #{v['word_number']} {v['word']}: {len(up['example_en'].splitlines())} câu ví dụ")
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(vocab_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Đã cập nhật thành công {count} từ vựng Unit 1 trong hacknao_vocab.json!")

if __name__ == '__main__':
    main()
