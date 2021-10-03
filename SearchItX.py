import sys
import os
import time
import json
import random
#import urllib
#import webbrowser as wb

def pythonSearch(data):
    forms = ["Error: No Data Received"]
    forms = data

    shortWait = 0.5
    longWait = 20
    longWaitPower = 2
    longWaitInterval = 30

    if(forms[0] == "Error: No Data Received"):
        print("Error: No Data Received", flush = True)
        
        return


    try:
        parsed = json.loads(forms)
        print("Form Data Loaded", flush = True)
        
    except:
        print("Error: No Data Received", flush = True)
        
        return


    try:
        filePath = parsed[16][0]
        if(os.path.isfile(filePath)):
            print("File Path Found", flush = True)
            
        else:
            print("Error: File Path Not Found", flush = True)
            
            return
    except:
        print("Error: Form data crashed", flush = True)
        
        return


    try:
        fileText = []
        with open(filePath) as file:
            fileData = file.read().split('\n')
            for line in fileData:
                fileText.append(line)
        file.close()
        fileLen = len(fileText)
        print("File Read! Found "+str(fileLen)+" lines", flush = True)
        
        
    except:
        print("Error: Could not read file", flush = True)
        
        return


    #print(json.dumps(parsed, indent=4, sort_keys=True))
    #time.sleep(1)

    # save the script as hello.py
    try:
        start = int(parsed[13][0])
        end = int(parsed[14][0])
        if(start == 0):
            print("Failed: Start begins at 1", flush = True)
        elif(start <= end and start > 0 and end > 0):
            print("Interval Valid "+str(start)+","+str(end), flush = True)
        else:
            print("Failed: Are you sure Start <= End?", flush = True)
    except:
        print("Failed: Start and End must be numbers!", flush = True)
        proceed = False
        return
    #



    try:
        google = "http://www.google.com/search?q="
        alternate = parsed[12][0]
        if(alternate==""):
        	alternate = google
        h1 = parsed[0][0]
        h2 = parsed[1][0]
        h3 = parsed[2][0]
        h4 = parsed[3][0]
        h5 = parsed[4][0]
        h6 = parsed[5][0]
        f1 = parsed[6][0]
        f2 = parsed[7][0]
        f3 = parsed[8][0]
        f4 = parsed[9][0]
        f5 = parsed[10][0]
        f6 = parsed[11][0]
        d1 = parsed[15][0]
        d2 = parsed[15][1]
        d3 = parsed[15][2]
        d4 = parsed[15][3]
        d5 = parsed[15][4]
        d6 = parsed[15][5]
        auto = True
        auto2 = False
        searchList = [(auto,d1,h1,f1),(auto2,d2,h2,f2),(auto2,d3,h3,f3),(auto2,d4,h4,f4),(auto2,d5,h5,f5),(auto2,d6,h6,f6)]
        longWaitCounter = 1
        searchCounter = 0
        start = start - 1
        end = end - 1
        current = start
        while(current <= end):
            fileLine=fileText[current]
            for searches in searchList:
                searchUrl = google
                if(searches[1]=="true"):
                    searchUrl = alternate
                if(searches[0] or searches[2]!="" or searches[3]!=""):
                    searchCounter = searchCounter + 1
                    if(searchCounter%longWaitInterval==0):
                        time.sleep(longWait*(longWaitCounter^longWaitPower))
                        longWaitCounter = longWaitCounter + 1 
                    sleeptime = shortWait+ (float(random.randrange(0,10000))/float(20000))
                    time.sleep(sleeptime)
                    url = searchUrl+searches[2]+fileLine+searches[3]
                    #wb.open_new_tab(url)
                    print(url, flush = True)
            current = current + 1
        time.sleep(sleeptime)
        print("Search Complete", flush = True)
        #
        return
    except:
        print("ERROR: ASE Failue!", flush = True)
        #
        return

pythonSearch(sys.argv[1])
