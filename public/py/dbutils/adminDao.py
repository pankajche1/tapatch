import json
from google.appengine.api import users
from py.models.project import Project as Project
from py.models.service import Service as Service
from py.models.user import User as User

class AdminDAO:
    def __init__(self):
        pass

    def isUserAdmin(self, nickName, level):
        q = User.query(User.nickName == nickName)
        users = q.fetch()
        isNickNameFound=False
        isUserAdmin = False
        user = users[0] 
        if user != None:
            if user.level == level:
                isUserAdmin = True 
        # check the already existing users:
        '''
        for i in range(0, len(users)):
            if users[i].nickName== nickName:
                isNickNameFound = True
                if users[i].level == level:
                    isUserAdmin = True
                break
        '''
        return isUserAdmin 

    def saveProject(self, data):
        project = Project(name=data['name'],
                          websites=data['websites'],
                          description=data['description'])
        project.put()

    def saveService(self, data):
        ''' for services offered by company '''
        service = Service(name=data['name'],
                description=data['description'])
        service.put()

    def getMembers(self):
        q = User.query()
        users, nextCursor, more = q.fetch_page(20)
        return users 

    def getMemberByNickName(self, nickName):
        q = User.query(User.nickName == nickName)
        users = q.fetch()
        return users[0] 

    def updateMemberLevel(self, nickName, level):
        out = ''
        q = User.query(User.nickName == nickName)
        users = q.fetch()
        user = users[0] 
        if user != None:
            user.level = level
            user.put()
            out = 'member level updated'
        else:
            out = 'no member found'
        return out
 


