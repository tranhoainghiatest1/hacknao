import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/data/hacknao_vocab.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Tổng số từ vựng trong hacknao_vocab.json: {len(data)}")

seen = {}
duplicates = []
for item in data:
    w = item.get('word', '').strip().lower()
    u = item.get('unit')
    if w in seen:
        duplicates.append((w, seen[w], u))
    else:
        seen[w] = u

print(f"Số từ vựng duy nhất: {len(seen)}")
print(f"Số lượng từ trùng lặp qua các Unit: {len(duplicates)}")
if duplicates:
    for d in duplicates[:20]:
        print(f"  - '{d[0]}' xuất hiện ở Unit {d[1]} và Unit {d[2]}")
