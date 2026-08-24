import json
import sys

# Đảm bảo UTF-8
sys.stdout.reconfigure(encoding='utf-8')

from seed_units_1_to_4 import units as u1_u4
from seed_all_units_1_to_10 import units_5_to_10

all_units = u1_u4 + units_5_to_10

all_vocab = []
word_counter = 1

for u in all_units:
    u_num = u["unit"]
    u_title = u["unit_title"]
    u_cat = u["category"]
    for w in u["words"]:
        w["word_number"] = word_counter
        w["unit"] = u_num
        w["unit_title"] = u_title
        w["category"] = u_cat
        if "status" not in w:
            w["status"] = "new"
        all_vocab.append(w)
        word_counter += 1

with open('backend/data/hacknao_vocab.json', 'w', encoding='utf-8') as f:
    json.dump(all_vocab, f, ensure_ascii=False, indent=2)

print(f"Total vocabulary saved: {len(all_vocab)}")
