import sys
import os
import time



def nextIntervalPython(start_raw,end_raw,path):
    try:
        filePath = path
        if(os.path.isfile(filePath)==False):
            return
    except:
        return


    try:
        fileText = []
        with open(filePath) as file:
            fileData = file.read().split('\n')
            for line in fileData:
                fileText.append(line)
        file.close()
        fileLen = len(fileText)
        #print("Updating Int Now"+str(start)+","+str(end))
        #sys.stdout.flush()
    except:
        time.sleep(0.2)
        return
    try:
        start = int(start_raw)
        end = int(end_raw)
        fileLenPretty = fileLen - 1
        if(start == 0):
            print("Failed: Start begins at 1")
        elif(start <= end and start > 0 and end > 0):
            interval = end-start
            endOut = end + interval + 1
            startOut = start + interval + 1
            if(start==fileLenPretty or end==fileLenPretty):
                print("Finished List! - "+str(fileLenPretty)+" , "+str(fileLenPretty))
            elif(startOut == fileLenPretty):
                end = fileLenPretty
                print("Interval Updated "+str(fileLenPretty)+" , "+str(fileLenPretty))
            elif(endOut > fileLenPretty):
                end = fileLenPretty
                print("Interval Updated "+str(startOut)+" , "+str(fileLenPretty))
            elif(startOut >= fileLenPretty):
                print("Finished List! - "+str(fileLenPretty)+" , "+str(fileLenPretty))
            else:
                print("Interval Updated "+str(startOut)+" , "+str(endOut))
        else:
            print("Failed: Are you sure Start <= End?")
    except:
        print("Failed: Start and End must be numbers!")
    #sys.stdout.flush()
    return

nextIntervalPython(sys.argv[1],sys.argv[2],sys.argv[3])
