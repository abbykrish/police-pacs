import csv, json

csvFilePath = 'police-contributions.csv'
jsonFilePath = 'police-contributions.json'

def camelCase(str):
    newStr = ""
    strArr = str.split()
    for i in range(len(strArr)):
        if i == 0:
            newStr += strArr[i].lower()
        else:
            newStr += strArr[i].capitalize()
    return newStr



data =  {}
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        rows = {camelCase(key): value for key, value in rows.items()}
        key = 'electedOfficialName'
        name = rows[key].strip()
        contribution = "{0} : {1}".format(rows['policeDeptPac'], rows['totalContribution'])
        if name in data:
            data[name]['contributionSummary'] += '\n' + contribution
        else:
            rows['contributionSummary'] = contribution
            data[name] = rows


with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(list(data.values()), indent=4))


