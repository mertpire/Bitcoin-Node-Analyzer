import json
import sys


def hex2ipv4(ip):
    ipv4 = ""
    count = 0
    while count < 4:
        x = int((ip[count] + ip[count + 1]),16)

        if count == 0:
            ipv4 = str(x)
        else:
            ipv4 = ipv4 + "." + str(x)
        count = count + 1
    return ipv4



with open(str(sys.argv[1])) as f:
    data = json.load(f)


hex_ipv6 = []
hex_ipv4 = []
str_ipv4 = []

for key in data:
    ip = data[key]['ip']
    if ip[25:29] == 'ffff':
        hex_ipv4.append(ip[30:33] + ip[35:])
    else:
        hex_ipv6.append(ip)


for ip in hex_ipv4:
    str_ipv4.append(hex2ipv4(ip))

print(str_ipv4)


f = open("ipv4.txt",'w')
for ip in str_ipv4:
    f.write(ip+",")

    

    

    
    
    
    

