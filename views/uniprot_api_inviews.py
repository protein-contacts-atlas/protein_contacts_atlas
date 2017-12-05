import urllib,urllib2
# import urllib3
import re
import sys
import requests
# from requests.packages.urllib3.exceptions import InsecureRequestWarning
# from requests.packages.urllib3.exceptions import SNIMissingWarning
# from requests.packages.urllib3.exceptions import InsecurePlatformWarning
import json

url = 'http://www.uniprot.org/uniprot/'
# url = 'http://www.uniprot.org/mapping/'
# http://www.uniprot.org/mapping/?query=3SN6&from=PDB_ID&to=ACC+ID&format=tab
# http://www.uniprot.org/mapping/?to=P_REFSEQ_AC&query=P13368+P20806+Q9UM73+P97793+Q17192&from=ACC&format=tab
# http://www.uniprot.org/uniprot/?query=organism:9606+AND+3SN6&format=tab&from=PDB_ID&to=ACC

input_pdb = sys.argv[1].lower()

params = {
'format':'tab',
'columns':'id,entry name,feature(NATURAL VARIANT),comment(DISEASE)',
'query':'organism:9606 AND ' + input_pdb
# 'query':'organism:"Encephalitozoon cuniculi" AND ' + input_pdb
# 'query': input_pdb
}

# params = {
# 'from':'ACC',
# 'to':'P_REFSEQ_AC',
# 'format':'tab',
# 'query':'P13368 P20806 Q9UM73 P97793 Q17192'
# }

# the following is to disable warnings for those specified, check these later:
# /lmb/home/mkayikci/lib/python2.6/site-packages/requests/packages/urllib3/util/ssl_.py:318: SNIMissingWarning: An HTTPS request has been made, but the SNI (Subject Name Indication) extension to TLS is not available on this platform. This may cause the server to present an incorrect TLS certificate, which can cause validation failures. You can upgrade to a newer version of Python to solve this. For more information, see https://urllib3.readthedocs.io/en/latest/security.html#snimissingwarning.
#   SNIMissingWarning
# /lmb/home/mkayikci/lib/python2.6/site-packages/requests/packages/urllib3/util/ssl_.py:122: InsecurePlatformWarning: A true SSLContext object is not available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL connections to fail. You can upgrade to a newer version of Python to solve this. For more information, see https://urllib3.readthedocs.io/en/latest/security.html#insecureplatformwarning.
#   InsecurePlatformWarning
# https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings
# https://urllib3.readthedocs.io/en/latest/user-guide.html#ssl-py2
# http://stackoverflow.com/questions/27981545/suppress-insecurerequestwarning-unverified-https-request-is-being-made-in-pytho
# requests.packages.urllib3.disable_warnings(InsecurePlatformWarning)
# requests.packages.urllib3.disable_warnings(SNIMissingWarning)

# above doesn't work with php, the script just doesn't run so maybe should not dismiss warnings, php doesn't like it

data = urllib.urlencode(params)
# print data
request = urllib2.Request(url, data)
contact = "" # Please set your email address here to help us debug in case of problems.
request.add_header('User-Agent', 'Python %s' % contact)
response = urllib2.urlopen(request)
html = response.read()
# print response.getcode()

ACC = []
ID = []
NATVARIANTS = []
DISEASE = []

if html=="":
    # exit
    print "-"

else:
    print html

    lines = html.splitlines()[1:] #to skip the first line with titles
    for line in lines:
        alltabs = re.split(r'\t+', line)
        # print len(alltabs)
        if len(alltabs)<3:
            ACC.append(alltabs[0])
            ID.append(alltabs[1])
            NATVARIANTS.append("-")
            DISEASE.append("-")
        elif len(alltabs)==3:
            ACC.append(alltabs[0])
            ID.append(alltabs[1])
            if "VARIANT" in alltabs[2]:
                NATVARIANTS.append(alltabs[2])
                DISEASE.append("-")
            elif "DISEASE" in alltabs[2]:
                NATVARIANTS.append("-")
                DISEASE.append(alltabs[2])
            else:
                NATVARIANTS.append("-")
                DISEASE.append("-")
        else:
            ACC.append(alltabs[0])
            ID.append(alltabs[1])
            # NATVARIANTS.append(alltabs[2])
            # DISEASE.append(alltabs[3])
            if "VARIANT" in alltabs[2] and "DISEASE" in alltabs[3]:
                NATVARIANTS.append(alltabs[2])
                DISEASE.append(alltabs[3])
            elif "VARIANT" in alltabs[2]:
                NATVARIANTS.append(alltabs[2])
                DISEASE.append("-")
            elif "DISEASE" in alltabs[2]:
                NATVARIANTS.append("-")
                DISEASE.append(alltabs[2])
            else:
                NATVARIANTS.append("-")
                DISEASE.append("-")

    main_list_variants = []
    for y in range(len(NATVARIANTS)):
        if NATVARIANTS[y]!="-" and NATVARIANTS[y]!="":
            item = {"origins":[], "variants":[], "residuenumbers":[], "correctedresnums":[], "info":[]}
            natvariants_arr = re.split(r'VARIANT+', NATVARIANTS[y])

            c = 0;
            for variant in natvariants_arr:
                # print variant + "lala"
                if variant != "":
                    item["info"].append(variant)
                words = variant.split()
                i=0;
                for word in words:
                    if i==1:
                        item["residuenumbers"].append(word)
                        item["correctedresnums"].append(word)
                    elif i==2:
                        item["origins"].append(word)
                    elif i==4:
                        item["variants"].append(word.rstrip('\.'))
                    i+=1
                c+=1
            main_list_variants.append(item)

        else:
            item = {"origins":[], "variants":[], "residuenumbers":[], "correctedresnums":[], "info":[]}
            main_list_variants.append(item)

    endpoint = "https://www.ebi.ac.uk/pdbe/api/mappings/uniprot/" + input_pdb
    response = requests.get(endpoint)
        # print response.url
        # print response.status_code
        # print response.headers["content-type"]
        # print response.text
    data =  response.json()

    myjson = []
    chains = ""

    for i in range(len(ACC)):
        if ACC[i] in data[input_pdb]["UniProt"] and NATVARIANTS[i]!="-" and NATVARIANTS[i]!="":
            # print ACC
            # print NATVARIANTS[i]
            chain_id = []
            unp_start = []
            unp_end = []
            pdb_start = []
            pdb_end = []
            difference = []

            identifier = data[input_pdb]["UniProt"][ACC[i]]["identifier"]
            for k in range(len(data[input_pdb]["UniProt"][ACC[i]]["mappings"])):

                # only start positions are enough to calculate the difference
                unp_start.append(data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["unp_start"])
                # unp_end.append(data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["unp_end"])
                pdb_start.append(data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["start"]["author_residue_number"])
                # pdb_end.append(data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["end"]["author_residue_number"])

                chain = data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["chain_id"]
                if chain not in chain_id:
                    chain_id.append(chain)
                    chains+=chain+"-"

            for k in range(len(data[input_pdb]["UniProt"][ACC[i]]["mappings"])):
                difference.append(int(unp_start[k]) - int(pdb_start[k]))
            for y in range(len(main_list_variants[i]["residuenumbers"])):
                # difference between pdb and uniprot starts are the same in the same uniprot so took first element
                # in the case of 1ytb, 3eml, 3oc3
                # within the same chain but different junks of positions or different chains
                main_list_variants[i]["correctedresnums"][y] = int(main_list_variants[i]["residuenumbers"][y]) - difference[0]

            variantsarr=[]
            for y in range(len(main_list_variants[i]["residuenumbers"])):
                item = {"residuenumber": str(main_list_variants[i]["correctedresnums"][y]),'origin': main_list_variants[i]["origins"][y],'variant': main_list_variants[i]["variants"][y],'info': main_list_variants[i]["info"][y]}
                variantsarr.append(item)

            myjson_1 = {
               'ACC' : ACC[i],
               'ID' : ID[i],
               'DISEASE' : DISEASE[i],
            #    'PDB' : input_pdb.upper(),
               'CHAINS': chain_id,
               'VARIANTS': variantsarr
            }

            myjson.append(myjson_1)

        elif ACC[i] in data[input_pdb]["UniProt"] and DISEASE[i]!="-" and DISEASE[i]!="":
            chain_id = []
            identifier = data[input_pdb]["UniProt"][ACC[i]]["identifier"]
            for k in range(len(data[input_pdb]["UniProt"][ACC[i]]["mappings"])):

                chain = data[input_pdb]["UniProt"][ACC[i]]["mappings"][k]["chain_id"]
                if chain not in chain_id:
                    chain_id.append(chain)
                    chains+=chain+"-"

            myjson_1 = {
               'ACC' : ACC[i],
               'ID' : ID[i],
               'DISEASE' : DISEASE[i],
            #    'PDB' : input_pdb.upper(),
               'CHAINS': chain_id,
               'VARIANTS': ""
            }
            myjson.append(myjson_1)

        else:
            chains = "-"

    filename = '../mutationjsons/' +input_pdb.upper()+ '_variants.json'

    if chains != "-":
        with open(filename, 'w') as outfile:
            json.dump(myjson, outfile)

    print chains
