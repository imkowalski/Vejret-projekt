
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

energetic = (20,10,15,False)
calm = (10,5,50,True)
sad = (10,15,80,True)
happy = (30,5,0,False)
moods = [energetic,calm,sad,happy]

def isRainingCheck(icondId:str) -> bool:
    if icondId[:-1] == "09" or icondId[:-1] == "10" or icondId[:-1] == "11":
        return True
    return False



def findClosetMood(temp:int , wind:int, cloud:int, isRaining:bool) -> str:
    dist=[]
    for mood in moods:
        dist.append((temp-mood[0])**2 + (wind-mood[1])**2 + (cloud-mood[2])**2 + (isRaining-mood[3])**2)
    
    print(dist)
    return moods[dist.index(min(dist))]