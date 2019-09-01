import PyPDF2
import json
# pdf file object
# you can find find the pdf file with complete code in below
data={}
pdfFileObj = open('Pt.pdf', 'rb')
# pdf reader object
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
# number of pages in pdf
print(pdfReader.numPages)
# a page object
flag=0
l=0
finalline=[]
str=''
for i in range(1,pdfReader.numPages):

    pageObj = pdfReader.getPage(i)
    linelist=pageObj.extractText().splitlines( )

    for k,line in enumerate(linelist):
        line.strip()
        templine=line


        if(len(line)<=8 and len(line)>=7 and ("."not in line)and ("["not in line)):
            l+=1
            str=str.replace("[","")
            str=str.replace("]","")
            str=str.replace("{","-")
            finalline.append(str.rstrip())
            str=''
            str="Subject:"+line+','
        else:


            str=str+line

finalline.append(str.rstrip())

data=[]
k=0
for subject in finalline[1:]:
    sub={}
    venue=subject
    subjectname=subject[subject.find("Subject:")+8:subject.find(",")]
    subject=subject[subject.find(",")+1:]
    m1=''
    m1v=''
    m2v=''
    m3v=''
    m4v=''
    m5v=''
    m2=''
    m3=''
    m4=''
    m5=''

    while( "Venue" in subject):
        monday=0
        Venue=subject[subject.find("Venue:")+6:subject.find(",")]
        venuestr=subject[subject.find(",")+1:subject.find(".")]

        for i in range(venuestr.count(",")+1):

            monday=venuestr[venuestr.find("Mo"):venuestr.find("Mo")+7]
            monday=monday[monday.find(":")-2:monday.find(":")+3]
            tuesday=venuestr[venuestr.find("Tu"):venuestr.find("Tu")+7]
            tuesday=tuesday[tuesday.find(":")-2:tuesday.find(":")+3]
            wednesday=venuestr[venuestr.find("We"):venuestr.find("We")+7]
            wednesday=wednesday[wednesday.find(":")-2:wednesday.find(":")+3]
            thursday=venuestr[venuestr.find("Th"):venuestr.find("Th")+7]
            thursday=thursday[thursday.find(":")-2:thursday.find(":")+3]
            friday=venuestr[venuestr.find("Fr"):venuestr.find("Fr")+7]
            friday=friday[friday.find(":")-2:friday.find(":")+3]



            venuestr=venuestr[venuestr.find(",")+1:]
            if(monday!=''):
                m1=monday
                m1v=Venue
            if(tuesday!=''):
                m2=tuesday
                m2v=Venue
            if(wednesday!=''):
                m3=wednesday
                m3v=Venue
            if(thursday!=''):
                m4=thursday
                m4v=Venue
            if(friday!=''):
                m5=friday
                m5v=Venue
        if (venuestr==','):
            break
        subject=subject[subject.find(".")+1:]


    data.append({"subject":subjectname,"number":k,'Mo':{"Time": m1,"Venue":m1v},'Tu':{"Time":m2,"Venue":m2v},'We':{"Time":m3,"Venue":m3v},'Th':{"Time":m4,"Venue":m4v},'Fr':{"Time":m5,"Venue":m5v}})
    k=k+1







json.dumps(data)

with open('Potch_Final.json', 'w') as json_file:
    json.dump(data, json_file)
