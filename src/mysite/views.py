from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from subprocess import run,PIPE
import sys

import json

def home(request):
   
    return render(request,"templates/nodes.html",{})

def external(request):


         inp = request.POST.get('param')
         uploaded_json = request.FILES['json']
         fs = FileSystemStorage()
         saved_file = fs.save(uploaded_json.name,uploaded_json)
         file_url = fs.open(saved_file)
         full_url  = fs.url(saved_file)
         
         out= run([sys.executable,'parser.py',str(file_url)],shell=False,stdout=PIPE)
         return render(request,'templates/nodes.html',{'data':out.stdout})

   
  
    

     

    
    
    
    


