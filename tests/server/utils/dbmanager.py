import json
import datetime
from py.module1 import Boy as Boy
from py.models.project import Project as Project
from py.models.service import Service as Service

class DbManager:
    def __init__(self):
        pass

    def createBoys(self, num=10):
        for i in range(0,num):
            boy = Boy()
            boy.name='Boy '+str(i)
            boy.put()

    def createProjects(self, num=10):
        txt='''
        i am writing this text for description
        '''
        for i in range(0,num):
            if i%2 == 0:
                websites = []
            elif i%3 == 0:
                websites = ['web'+str(i),'web'+str(i+1)]
            else:
                websites = ['web'+str(i)]
            project = Project(name='Project '+str(i),
                             websites=websites,
                              description=txt)
            #project.name='Project '+str(i)
            #project.created=datetime.datetime.now()
            project.put()
            '''
            try:
                project = Project()
                project.put()
            except TypeError:
                print Project.__file__
            #project.name='Project '+str(i)
            #project.put()
            '''
    def createCompanyServices(self, num=10):
        txt='''
        this text for description for the service.
        '''
        for i in range(0,num):
            '''
            if i%2 == 0:
                websites = []
            elif i%3 == 0:
                websites = ['web'+str(i),'web'+str(i+1)]
            else:
                websites = ['web'+str(i)]
            '''
            service = Service(name='Service '+str(i),
                              description=txt)
            #project.name='Project '+str(i)
            #project.created=datetime.datetime.now()
            service.put()
 
