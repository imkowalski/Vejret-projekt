
def findMood(temp:int, humidity:int , wind:int, cloud:int, isRaining:bool) -> str:
    pass 


def isRainingCheck(icondId:str) -> bool:
    if icondId[:-1] == "09" or icondId[:-1] == "10" or icondId[:-1] == "11":
        return True
    return False