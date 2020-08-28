import csv, json
from decimal import Decimal
from re import sub
import simplejson as json

csvFilePath = 'police-contributions.csv'
jsonFilePath = 'police-contributions.json'

nameMapping = {
    'House of Representatives':'District',
    'Senate': 'District',
    'City Council': 'Place'
}

def camelCase(str):
    newStr = ""
    strArr = str.split()
    for i in range(len(strArr)):
        if i == 0:
            newStr += strArr[i].lower()
        else:
            newStr += strArr[i].capitalize()
    return newStr

def getFullPosition(rows):
    # i know there's a better way to do this
    for key, value in nameMapping.iteritems():
        if key in rows['officeRanForOrDescription']:
            position = " ".join([rows['officeRanForOrDescription'], value, rows['districtOrJurisdiction']])
            return position

    return rows['officeRanForOrDescription']

data =  {}
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        rows = {camelCase(key): value for key, value in rows.items()}
        key = 'electedOfficialName'
        name = rows[key].strip()
        contributionAmt = Decimal(sub(r'[^\d.]', '', rows['totalContribution']))
        if name in data:
            data[name]['totalContribution'] += contributionAmt
            data[name]['contributionSummary'][rows['policeDeptPac']] = contributionAmt
        else:
            contributionMap = {}
            contributionMap[rows['policeDeptPac']] = contributionAmt
            rows['contributionSummary'] = contributionMap
            rows['fullPosition'] = getFullPosition(rows)
            rows['totalContribution'] = contributionAmt
            del rows['policeDeptPac']
            data[name] = rows


with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(list(data.values()), indent=4))


