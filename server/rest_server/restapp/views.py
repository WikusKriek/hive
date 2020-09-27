from django.contrib.auth.models import User
from django.http import Http404,HttpResponse, JsonResponse
import json

from restapp.serializers import CommentSerializer,postDataSerializer,postDataUrlSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import io
from rest_framework.parsers import JSONParser

from datetime import datetime
import requests
from bs4 import BeautifulSoup

class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

class Post_data:
    def __init__(self, studentNumber, password):
        self.studentNumber = studentNumber
        self.password = password
    

class UserList(APIView):

    def get(self, request, format=None):
        users = Comment ( content='wikus',email='wik@email')
        serializer = CommentSerializer(users)
        return JsonResponse(serializer.data)
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
                url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                try:
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    subjects=soup.find('div',class_='fav-sites-term')
                    #subjects=subjects.find_all('div')
                    subjects=subjects.find_all('div')
                except:
                    data=json.loads('{"announcements":[]}')
                    return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST) 
                modules=[]
                data=json.loads('{"announcements":[]}')
                temp = data['announcements']  
                for subject in subjects:
                    try:

                        ref=subject.a['href']
                        try:
                            modules.append(subject.a['title'])
                        except:
                            pass
                        
                        r=s.get(ref,headers=headers)
                        soup=BeautifulSoup(r.content,'html5lib')
                        ass_url=soup.find('a',class_='Mrphs-toolsNav__menuitem--link',title="Assignments - For posting, submitting and grading assignment(s) online")['href']
                        r=s.get(ass_url,headers=headers)
                        soup=BeautifulSoup(r.content,'html5lib')
                        soup=soup.tbody
                        assignments=soup.find_all('tr')
                        for assingment in assignments[1:]:
                            try:
                                ass_title=assingment.a['title']
                                ass_infourl=assingment.a['href']
                                ass_due=assingment.span.get_text().strip().replace("\t", "")
                                ass_status=assingment.find('td' ,headers="status").get_text().strip().replace("\t", "")
                                #print(ass_title+','+ass_due+','+ass_status)
                                temp.append({"title":ass_title,"InfoUrl":ass_infourl,"due":ass_due,"status":ass_status})
                            except:
                                pass  
                    except:
                        pass
                

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class Assignments(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
                url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                try:
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    subjects=soup.find('div',class_='fav-sites-term')
                    #subjects=subjects.find_all('div')
                    subjects=subjects.find_all('div')
                except:
                    data=json.loads('{"assignments":[]}')
                    return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST) 
                modules=[]
                data=json.loads('{"assignments":[]}')
                temp = data['assignments']  
                for subject in subjects:
                    try:

                        ref=subject.a['href']
                        try:
                            modules.append(subject.a['title'])
                            r=s.get(ref,headers=headers)
                            soup=BeautifulSoup(r.content,'html5lib')
                            ass_url=soup.find('a',class_='Mrphs-toolsNav__menuitem--link',title="Assignments - For posting, submitting and grading assignment(s) online")['href']
                            r=s.get(ass_url,headers=headers)
                            soup=BeautifulSoup(r.content,'html5lib')
                            soup=soup.tbody
                            assignments=soup.find_all('tr')
                        except:
                            pass
                        for assingment in assignments[1:]:
                            try:
                                ass_subject=subject.span.get_text().strip()
                                ass_title=assingment.a['title']
                                ass_infourl=assingment.a['href']
                                ass_due=assingment.span.get_text().strip().replace("\t", "")
                                ass_status=assingment.find('td' ,headers="status").get_text().strip().replace("\t", "")
                                #print(ass_title+','+ass_due+','+ass_status)
                                temp.append({"subject":ass_subject,"title":ass_title,"InfoUrl":ass_infourl,"due":ass_due,"status":ass_status})
                            except:
                                pass  
                    except:
                        pass
                
             
            data.update({"subjects":modules} )       
            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Announcements(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
                url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                try:
                    url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    anounceurl=soup.find('a',class_='Mrphs-toolsNav__menuitem--link',title="Announcements - For posting current, time-critical information")['href']
                    
                    an=s.get(anounceurl,headers=headers)
                    soup=BeautifulSoup(an.content,'html5lib')
                    announcements=soup.findAll('tr')
                except:
                    data=json.loads('{"announcements":[]}')
                    return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST) 
                
                data=json.loads('{"announcements":[]}')
                temp = data['announcements']  
                for announcement in announcements:
                    try:

                        An_infourl=announcement.th.strong.a['href']
                        An_Title=announcement.th.strong.a.span.get_text().strip()
                        An_author=announcement.find(headers='author').get_text().strip()
                        An_date=announcement.find(headers='date').get_text().strip()
                        An_module=announcement.find(headers='channel').get_text().strip() 
                        temp.append({"author":An_author,"date":An_date, "title":An_Title ,"InfoUrl":An_infourl ,"module":An_module})
                    except:
                        pass
                

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnnouncementDetails(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataUrlSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
              
                try:
                    url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    login=soup.find('head').find('title').get_text().strip()
                    data=json.loads('{"login":"true"}')
                    
                except:
                    data=json.loads('{"login":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                if not (login=='CAS – Central Authentication Service'):
                    
                    anounceurl=serializer.data['url']
                    an=s.get(anounceurl,headers=headers)
                    soup=BeautifulSoup(an.content,'html5lib')
                    announcement=soup
                    try:

                        An_heading=str(announcement.find('div',class_='page-header'))
                        

                        An_form=str(announcement.find('div',class_='form-horizontal'))
                        
                        
                        An_message=str(announcement.find('div',class_='message-body'))
                        An_attachments=str(announcement.find('div',class_='attachList'))
                        
                        #An_attachments=announcement.find('div',class_='attachList').get_text().strip()
                        #print(An_attachments)
                        
                        data={"login":"true","heading":An_heading,"form":An_form, "message":An_message, "attachments":An_attachments}

                        return JsonResponse(data, status=status.HTTP_200_OK)
                    except:
                        return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)

                    

                data=json.loads('{"login":"false"}') 
                return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                

            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentDetails(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataUrlSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
              
                try:
                    url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    login=soup.find('head').find('title').get_text().strip()
                    data=json.loads('{"login":"true"}')
                    
                except:
                    data=json.loads('{"login":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                if not (login=='CAS – Central Authentication Service'):
                    
                    anounceurl=serializer.data['url']
                    an=s.get(anounceurl,headers=headers)
                    soup=BeautifulSoup(an.content,'html5lib')
                    announcement=soup
                    try:

                        An_heading=str(announcement.find('h3'))
                        

                        An_instructions=str(announcement.find('div',class_='textPanel'))
                        
                        
                        
                        
                        #An_attachments=announcement.find('div',class_='attachList').get_text().strip()
                        #print(An_attachments)
                        
                        data={"login":"true","heading":An_heading,"instructions":An_instructions}

                        return JsonResponse(data, status=status.HTTP_200_OK)
                    except:
                        return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)

                    

                data=json.loads('{"login":"false"}') 
                return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                

            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
                
                try:
                    url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    login=soup.find('head').find('title').get_text().strip()
                    data=json.loads('{"login":"true"}')
                    if not (login=='CAS – Central Authentication Service'):

                        return JsonResponse(data, status=status.HTTP_200_OK)

                    data=json.loads('{"login":"false"}') 
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                except:
                    pass
                    data=json.loads('{"login":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BalanceResults(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'Content-Type': 'application/x-www-form-urlencoded'}

            logindata={
            'loginName': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            
            }
            
            with requests.Session() as s:
                
                try:
                    url="http://mobile.nwu.ac.za/mdot/services/authentication/login.json"
                    urlgrades='http://mobile.nwu.ac.za/mdot/grades/getResults?endDate=2020-12-31&startDate=2020-01-01'
                    urlbalance="http://mobile.nwu.ac.za/mdot/buy/getBalance?"
                    
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    
                    r=s.get(urlgrades,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    results=soup.body.get_text()
                    
                    r=s.get(urlbalance,headers=headers)
                    balance=BeautifulSoup(r.content,'html5lib').get_text().strip()
                    
                    data={"status":"true","balance":balance,"exam":json.loads(results)}
                except:
                    data=json.loads('{"status":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class auth(APIView):

    
#Post request that takes login information and returns 
   def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'Content-Type': 'application/x-www-form-urlencoded'}

            logindata={
            'loginName': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            
            }
            
            with requests.Session() as s:
                
                try:
                    url="http://mobile.nwu.ac.za/mdot/services/authentication/login.json"
                    urlgrades='http://mobile.nwu.ac.za/mdot/grades/getResults?endDate=2020-12-31&startDate=2020-01-01'
                    urlbalance="http://mobile.nwu.ac.za/mdot/buy/getBalance?"
                    
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    
                    r=s.get(urlgrades,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    results=soup.body.get_text()
                    
                    r=s.get(urlbalance,headers=headers)
                    balance=BeautifulSoup(r.content,'html5lib').get_text().strip()
                    
                    data={"login":"true","balance":balance,"exam":json.loads(results)}
                except:
                    data=json.loads('{"login":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class userDetails(APIView):

    
#Post request that takes login information and returns 
    def post(self, request, format=None):
        
        serializer = postDataSerializer( data=request.data)
        
        if serializer.is_valid():
            #
            headers={
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

            logindata={
            'username': serializer.data['studentNumber'],
            'password': serializer.data['password'],
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': 'LOGIN'
            }
            
            with requests.Session() as s:
                
                try:
                    url="https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer"
                    r=s.get(url,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    logindata['lt']=soup.find('input',attrs={'name':'lt'})['value']
                    r=s.post(url,data=logindata,headers=headers)
                    soup=BeautifulSoup(r.content,'html5lib')
                    login=soup.find('head').find('title').get_text().strip()
                    data=json.loads('{"login":"true","user":[]}')
                    temp = data['user']
                    mylist=[]
                    if not (login=='CAS – Central Authentication Service'):
                        try:
                            url=soup.find('a',attrs={'title':'Account - View and modify my user profile'})['href']
                            print(url)
                            r=s.get(url,headers=headers)
                            soup=BeautifulSoup(r.content,'html5lib')
                            user=soup.find_all('div',class_="shorttext")
                            print(user)
                            for field in user:
                                mylist.append(field.get_text().strip())
                            temp.append(mylist)
                                
                        except:
                           return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST) 

                        return JsonResponse(data, status=status.HTTP_200_OK)

                    data=json.loads('{"login":"false"}') 
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

                except:
                    pass
                    data=json.loads('{"login":"false"}')
                    return JsonResponse(data, status=status.HTTP_401_UNAUTHORIZED)

            return JsonResponse(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)