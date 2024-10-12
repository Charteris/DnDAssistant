import json

all_json = []
with open('srd_5e_monsters.json') as core_rules:
  all_json.extend(json.load(core_rules))
with open('lachlan_monsters.json') as monster_manual:
  all_json.extend(json.load(monster_manual))
with open('lachlan_monsters_extra.json') as extra:
  all_json.extend(json.load(extra))

added_monsters = []
new_json = []
for monster in all_json:
  if monster["name"] in added_monsters:
    continue
  new_json.append(monster)
  added_monsters.append(monster["name"])

with open('filtered_monsters.json', 'w') as output:
  json.dump(new_json, output)