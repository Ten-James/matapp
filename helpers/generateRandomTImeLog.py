#make json file with random time log data, data is stored in a list of dictionaries with the following format:
#{"14.01.2022": 120}
#where the key is the date and the random value between 40 and 300
#the data is stored in a json file with the name "time.log"

import json
import random
import datetime

def generateRandomTimeLog():
    #generate random time log data
    #return a list of dictionaries with the format {"14.01.2022": 120}
    #where the key is the date and the random value between 40 and 300
    timeLog = ""
    for i in range(0, 50):
        date = datetime.date(2022, 1, 1) + datetime.timedelta(days=i)
        timeLog+= "\""+ date.strftime("%d.%m.%Y")+"\": "+str(random.randint(40, 300))+","
    return timeLog

def writeTimeLogToFile(timeLog):
    #write the time log data to a json file
    with open("time.log", "w") as file:
        file.write(timeLog)
    
def main():
    timeLog = generateRandomTimeLog()
    writeTimeLogToFile(timeLog)

if __name__ == "__main__":
    main()
