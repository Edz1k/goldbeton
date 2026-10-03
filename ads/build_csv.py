# ads.json → CSV для «Инструменты → Массовые действия → Загрузки» (по официальным шаблонам Google Ads).
# Шаг 1: campaigns.csv (кампании на паузе). Шаг 2: content.csv (группы, ключи, минус-слова, объявления).
import csv
import json

SITE = 'https://gold-beton.kz'
LOCATION = 'Almaty, Kazakhstan'
LANGUAGES = 'ru'  # kk Google Ads не поддерживает
d = json.load(open('ads.json'))
H = [f'Headline {i}' for i in range(1, 16)]
D = [f'Description {i}' for i in range(1, 5)]


def write(name, cols, rows):
    with open(name, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        for r in rows:
            w.writerow({c: r.get(c, '') for c in cols})
    print(name, len(rows), 'rows')


# --- Шаг 1: кампании
camp_cols = ['Row Type', 'Action', 'Campaign status', 'Campaign', 'Campaign type', 'Networks', 'Budget', 'Budget type',
             'Bid strategy type', 'Language', 'Location', 'EU political ads']
write('campaigns.csv', camp_cols, [{
    'Row Type': 'Campaign', 'Action': 'Add', 'Campaign status': 'Paused', 'Campaign': c['name'], 'Campaign type': 'Search',
    'Networks': 'Google search', 'Budget': f"{c['budget_usd']:.2f}", 'Budget type': 'Daily',
    'Bid strategy type': 'Maximize clicks', 'Language': LANGUAGES, 'Location': LOCATION, 'EU political ads': 'No',
} for c in d['campaigns']])

# --- Шаг 2: всё остальное одним файлом (тип строки задаёт Row Type)
cols = ['Row Type', 'Action', 'Campaign', 'Ad group', 'Ad group status', 'Ad group type',
        'Keyword status', 'Keyword', 'Level', 'Negative keyword', 'Type',
        'Ad status', 'Ad type', *H, *D, 'Path 1', 'Path 2', 'Final URL']
rows = []
MATCH = {'[': 'Exact match', '"': 'Phrase match'}
for c in d['campaigns']:
    for neg in sorted(set(c['negatives'] + d['account_negatives'])):
        rows.append({'Row Type': 'Negative keyword', 'Action': 'Add', 'Campaign': c['name'], 'Level': 'Campaign',
                     'Negative keyword': neg, 'Type': 'Phrase match', 'Keyword status': 'Enabled'})
    for g in c['groups']:
        rows.append({'Row Type': 'Ad group', 'Action': 'Add', 'Campaign': c['name'], 'Ad group': g['name'],
                     'Ad group status': 'Enabled', 'Ad group type': 'Standard'})
        for k in g['keywords']:
            rows.append({'Row Type': 'Keyword', 'Action': 'Add', 'Campaign': c['name'], 'Ad group': g['name'],
                         'Keyword': k.strip('[]"'), 'Type': MATCH.get(k[0], 'Broad match'), 'Keyword status': 'Enabled'})
        ad = {'Row Type': 'Ad', 'Action': 'Add', 'Campaign': c['name'], 'Ad group': g['name'], 'Ad status': 'Enabled',
              'Ad type': 'Responsive search ad', 'Final URL': SITE + g['url'],
              'Path 1': g['path'][0], 'Path 2': g['path'][1] if len(g['path']) > 1 else ''}
        ad.update({H[i]: h for i, h in enumerate(g['headlines'])})
        ad.update({D[i]: t for i, t in enumerate(g['descriptions'])})
        rows.append(ad)
write('content.csv', cols, rows)
