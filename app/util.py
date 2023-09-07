
'''
=====ENERGETIC=====
temp avg:  20 
wind avg:  10
cloud avg:  15
isRaining:  False

=====CALM=====
temp avg:  10
wind avg:  5
cloud avg:  50
isRaining:  True

=====SAD=====
temp avg:  10
wind avg:  15
cloud avg:  80
isRaining:  True

=====HAPPY=====
temp avg:  30
wind avg:  5
cloud avg:  0
isRaining:  False
'''

energetic = lambda x, y, z, w: (pow(x-a,2)+pow(y-b,2)+pow(z-c,2)+pow(w-d,2))
calm = lambda x, y, z, w: (pow(x-a,2)+pow(y-b,2)+pow(z-c,2)+pow(w-d,2))
sad = lambda x, y, z, w: (pow(x-a,2)+pow(y-b,2)+pow(z-c,2)+pow(w-d,2))
happy = lambda x, y, z, w: (pow(x-a,2)+pow(y-b,2)+pow(z-c,2)+pow(w-d,2))



def isRainingCheck(icondId:str) -> bool:
    if icondId[:-1] == "09" or icondId[:-1] == "10" or icondId[:-1] == "11":
        return True
    return False


def findMood(temp:int , wind:int, cloud:int, isRaining:bool) -> str:
    pass

