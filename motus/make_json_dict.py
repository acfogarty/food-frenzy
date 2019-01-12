import json

with open("google-10000-english-usa-no-swears-medium.txt", "r") as f:
    raw = f.read()

words = raw.split()
ddict = {5: [], 6: [], 7: [], 8: []}
for w in words:
    ddict[len(w)].append(w)

with open('wordlists_6789.json', 'w') as f:
    json.dump(ddict, f)
