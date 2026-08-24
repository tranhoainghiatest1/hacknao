import json
import sys

# Đảm bảo UTF-8
sys.stdout.reconfigure(encoding='utf-8')

from seed_units_1_to_10 import UNITS_DATA as UNITS_1_TO_10
from seed_units_11_to_20 import UNITS_11_TO_20
from seed_units_21_to_30 import UNITS_21_TO_30
from seed_units_31_to_40 import UNITS_31_TO_40

ALL_UNITS = UNITS_1_TO_10 + UNITS_11_TO_20 + UNITS_21_TO_30 + UNITS_31_TO_40

def generate_vocab_dataset():
    all_vocab = []
    word_id = 1
    for u in ALL_UNITS:
        u_num = u["unit"]
        u_title = u["unit_title"]
        u_cat = u["category"]
        for w in u["words"]:
            w["id"] = word_id
            w["word_number"] = word_id
            w["unit"] = u_num
            w["unit_title"] = u_title
            w["category"] = u_cat
            if "status" not in w:
                w["status"] = "new"
            all_vocab.append(w)
            word_id += 1

    output_path = 'backend/data/hacknao_vocab.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_vocab, f, ensure_ascii=False, indent=2)

    print(f"✅ Đã xuất thành công {len(all_vocab)} từ vựng chuẩn Unit 1 đến Unit 40 vào: {output_path}")

if __name__ == '__main__':
    generate_vocab_dataset()
