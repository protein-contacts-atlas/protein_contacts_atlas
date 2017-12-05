import os
import json
import re
import shutil
import zipfile
import snap
from aminoacid_letters import *

residuesfilteredNodes = {}
residuesfilteredLinks = {}

def read_and_process_json_files(pdb, path,subdirectory,ari,contacts,contacttype):

    for file in os.listdir(path):
        if file.endswith(".json"):

            if "stats" not in file and "_" in file:

                #  Create graph data structure
                GraphNoWater = snap.TUNGraph.New()
                GraphWithWater = snap.TUNGraph.New()

                json_file = os.path.join(path,file)

                with open(json_file, 'r') as f:
                    pdbjson = json.load(f)


                siffile = file[:-5] + ".sif"
                SIFfilename = os.path.join(subdirectory, siffile)
                sifF = open(SIFfilename,"w")

                for idxlink, ilink in enumerate(pdbjson['links']):

                    ilink["contacttype"] = []

                    aricheck = 0
                    contactscheck = 0

                    atoms1 = []
                    atoms2 = []
                    atoms = []
                    atomtypes = []
                    atomtypes1 = []
                    atomtypes2 = []

                    if 'atomnames' in ilink:
                        atoms = ilink["atomnames"].split(",")[:-1]
                        # print atoms
                        for i in atoms:
                            atoms1.append(i.split("-")[0])
                            atoms2.append(i.split("-")[1])

                    if 'atomtypes' in ilink:
                        atomtypes = ilink["atomtypes"].split(",")[:-1]
                        # print atoms
                        for i in atomtypes:
                            atomtypes1.append(i.split("-")[0])
                            atomtypes2.append(i.split("-")[1])


                    jsonres1 = ilink["name"].split("->")[0]
                    jsonres2 = ilink["name"].split("->")[1].split(",")[0]
                    # value = int(ilink["name"].split("->")[1].split(",")[1])
                    value = ilink["value"]
                    chain1 = ilink["chains"].split("->")[0]
                    chain2 = ilink["chains"].split("->")[1]

                    resname1 = pdbjson['nodes'][ilink["source"]]["name"]
                    resname2 = pdbjson['nodes'][ilink["target"]]["name"]
                    match1 = re.match(r"([a-z]+)([0-9]+)", resname1, re.I)
                    if match1:
                        items1 = match1.groups()
                        resletter1 = items1[0]
                        # print items[0]
                    match2 = re.match(r"([a-z]+)([0-9]+)", resname2, re.I)
                    if match2:
                        items2 = match2.groups()
                        resletter2 = items2[0]
                        # print items[0]

                    if (pdbjson["nodes"][ilink["source"]]["type"] == "ATOM"
                    and "NucleicAcid" not in pdbjson["nodes"][ilink["source"]]["group"]):
                        residueLetter1 = oneLetter[resletter1]

                    else:
                        residueLetter1 = resletter1

                    if (pdbjson["nodes"][ilink["target"]]["type"] == "ATOM"
                    and "NucleicAcid" not in pdbjson["nodes"][ilink["target"]]["group"]):
                        residueLetter2 = oneLetter[resletter2]
                    else:
                        residueLetter2 = resletter2

                    if len(ari)>0:
                        for idx, i in enumerate(ari):
                            for ik in i["type"]:
                                if ik in contacttype:
                                    if (jsonres1 == i["res1"] and jsonres2 == i["res2"] and chain1 == i["chain1"] and chain2 == i["chain2"]):
                                        for adx, a in enumerate(atoms1):
                                            if atoms1[adx] == i["atom1"]:
                                                aricheck += 1
                                                ilink["contacttype"].append(ik)

                                                if atomtypes1[adx] == "L":
                                                    atomtype = "LIG"
                                                else:
                                                    atomtype = atomtypes1[adx] + "C"

                                                sifline = chain1 +":"+jsonres1+":_:"+residueLetter1+"\t"+ ik +":"+atomtype+"_SC"+"\t"+ chain2 +":"+jsonres2+":_:"+residueLetter2 + "\t"+ atoms1[adx]+"\n"
                                                sifF.write(sifline)
                                                break

                                    elif (jsonres1 == i["res2"] and jsonres2 == i["res1"] and chain1 == i["chain2"] and chain2 == i["chain1"]):
                                        for adx, a in enumerate(atoms2):
                                            if atoms2[adx] == i["atom1"]:
                                                aricheck += 1
                                                ilink["contacttype"].append(ik)

                                                if atomtypes2[adx] == "L":
                                                    atomtype = "LIG"
                                                else:
                                                    atomtype = atomtypes2[adx] + "C"

                                                sifline = chain2 +":"+jsonres2+":_:"+residueLetter2+"\t"+ ik +":"+atomtype+"_SC"+"\t"+ chain1 +":"+jsonres1+":_:"+residueLetter1 + "\t"+ atoms2[adx]+"\n"
                                                sifF.write(sifline)
                                                break
                    # if len(ri)>0:
                    #     for idx, i in enumerate(ri):
                    #         if ((jsonres1 == i["res1"] and jsonres2 == i["res2"] and chain1 == i["chain1"] and chain2 == i["chain2"])
                    #         or (jsonres1 == i["res2"] and jsonres2 == i["res1"] and chain1 == i["chain2"] and chain2 == i["chain1"])):
                    #             richeck += 1
                    #             ilink["contacttype"].append("pi-pi")

                    if len(contacts)>0:
                        for idx, i in enumerate(contacts):
                            if (jsonres1 == i["res1"] and jsonres2 == i["res2"]
                            and chain1 == i["chain1"] and chain2 == i["chain2"]):
                                for adx, a in enumerate(atoms1):
                                    if atoms1[adx] == i["atom1"] and atoms2[adx] == i["atom2"]:

                                        contactscheck += 1
                                        ilink["contacttype"].append(i["type"])

                                        if atomtypes1[adx] == "L":
                                            atomtype1 = "LIG"
                                        else:
                                            atomtype1 = atomtypes1[adx] + "C"

                                        if atomtypes2[adx] == "L":
                                            atomtype2 = "LIG"
                                        else:
                                            atomtype2 = atomtypes2[adx] + "C"

                                        for t in i["type"]:
                                            if t == "pi-pi":
                                                t = "pipistack"
                                            sifline = chain1 +":"+jsonres1+":_:"+residueLetter1+"\t"+ t +":"+atomtype1+"_"+atomtype2+"\t"+ chain2 +":"+jsonres2+":_:"+residueLetter2 + "\t"+ atoms1[adx]+ "\t"+ atoms2[adx]+"\n"
                                            sifF.write(sifline)

                                        break

                            elif (jsonres1 == i["res2"] and jsonres2 == i["res1"]
                            and chain1 == i["chain2"] and chain2 == i["chain1"]):
                                for adx, a in enumerate(atoms1):
                                    if atoms1[adx] == i["atom2"] and atoms2[adx] == i["atom1"]:

                                        contactscheck += 1
                                        ilink["contacttype"].append(i["type"])

                                        if atomtypes1[adx] == "L":
                                            atomtype1 = "LIG"
                                        else:
                                            atomtype1 = atomtypes1[adx] + "C"

                                        if atomtypes2[adx] == "L":
                                            atomtype2 = "LIG"
                                        else:
                                            atomtype2 = atomtypes2[adx] + "C"

                                        for t in i["type"]:
                                            if t == "pi-pi":
                                                t = "pipistack"
                                            sifline = chain1 +":"+jsonres1+":_:"+residueLetter1+"\t"+ t +":"+atomtype1+"_"+atomtype2+"\t"+ chain2 +":"+jsonres2+":_:"+residueLetter2 + "\t"+ atoms1[adx]+ "\t"+ atoms2[adx]+"\n"
                                            sifF.write(sifline)
                                        break

                    total = aricheck + contactscheck

                    if total == 0:
                        pdbjson['links'][idxlink] = None

                    else:
                        ilink["value"] = total
                        ilink["name"] = jsonres1 + "->" + jsonres2 + ", " + str(total)

                y = [i for i in pdbjson['links'] if i != None]
                pdbjson['links'] = y

                residuesfilteredLinks[file[:-5]] = y

                # calculating betwenness and closeness and degree for filtered contacts
                for idx, i in enumerate(pdbjson['nodes']):
                    i["weight"] = 0
                    if "HOH" not in i['name']:
                            GraphNoWater.AddNode(idx)
                    GraphWithWater.AddNode(idx)

                for idx, ilink in enumerate(pdbjson['links']):
                    pdbjson['nodes'][ilink["source"]]["weight"] += ilink["value"]
                    pdbjson['nodes'][ilink["target"]]["weight"] += ilink["value"]

                    if "HOH" not in pdbjson['nodes'][ilink["source"]]["name"] and "HOH" not in pdbjson['nodes'][ilink["target"]]["name"]:
                        GraphNoWater.AddEdge(ilink["source"], ilink["target"])
                    GraphWithWater.AddEdge(ilink["source"], ilink["target"])

                BtwHNoW = snap.TIntFltH()
                snap.GetBetweennessCentr(GraphNoWater, BtwHNoW, 1.0)
                BtwHW = snap.TIntFltH()
                snap.GetBetweennessCentr(GraphWithWater, BtwHW, 1.0)

                for idx, i in enumerate(pdbjson['nodes']):
                    for NI in GraphNoWater.Nodes():
                        if NI.GetId() == idx:
                            i["degree"] = NI.GetOutDeg()
                            i["betweeness"] = BtwHNoW.GetDat(NI.GetId())
                            i["closeness"] = round(snap.GetClosenessCentr(GraphNoWater, NI.GetId()), 3)
                            # print i["degree"]
                            break

                    for NI in GraphWithWater.Nodes():
                        if NI.GetId() == idx:
                            i["degreeW"] = NI.GetOutDeg()
                            i["betweenessW"] = BtwHW.GetDat(NI.GetId())
                            i["closenessW"] = snap.GetClosenessCentr(GraphWithWater, NI.GetId())
                            break

                residuesfilteredNodes[file[:-5]] = pdbjson['nodes']

                filename = subdirectory +"/"+ file
                with open(filename, 'w') as outfile:
                    json.dump(pdbjson, outfile, indent=2)

                sifF.close()

        elif file.endswith(".pdb"):
            pdb_file = os.path.join(path, file)
            shutil.copy2(pdb_file, subdirectory)
        elif file.endswith(".zip"):
            zip_file = os.path.join(path, file)
            # shutil.copy2(zip_file, subdirectory)

            foldername = file[:-4]
            zipfolder = os.path.join(subdirectory, foldername)

            if "_txt" in file:
                with zipfile.ZipFile(zip_file,"r") as zip_ref:
                    zip_ref.extractall(subdirectory)

                if not os.path.exists(zipfolder):
                    os.mkdir( zipfolder, 0755 )
            if "_rin" in file:
                shutil.copy2(zip_file, subdirectory)

            if "_sif" in file:
                if not os.path.exists(zipfolder):
                    os.mkdir( zipfolder, 0755 )

    for file in os.listdir(path):
        if "stats" in file:
            # print file + " stats"
            json_file = os.path.join(path, file)

            if "statswith" in file:
                filename = file.replace("statswithWater.json", "")
            else:
                filename = file[:-10]

            with open(json_file, 'r') as f:
                pdbjson = json.load(f)

            for idx, i in enumerate(residuesfilteredNodes[filename]):
                for idx2, i2 in enumerate(pdbjson['nodes']):
                    if i["name"] ==  i2["name"]:
                        pdbjson['nodes'][idx2]["weight"] = i["weight"]
                        if "statswith" in file:
                            pdbjson['nodes'][idx2]["degree"] = i["degreeW"]
                            pdbjson['nodes'][idx2]["betweeness"] = i["betweenessW"]
                            pdbjson['nodes'][idx2]["closeness"] = i["closenessW"]
                        else:
                            pdbjson['nodes'][idx2]["degree"] = i["degree"]
                            pdbjson['nodes'][idx2]["betweeness"] = i["betweeness"]
                            pdbjson['nodes'][idx2]["closeness"] = i["closeness"]


            filename = os.path.join(subdirectory, file)
            with open(filename, 'w') as outfile:
                json.dump(pdbjson, outfile, indent=2)

    # Open and read the main json file , eg 2HPY.json
    name = pdb + ".json"
    json_file = os.path.join(path, name)

    with open(json_file, 'r') as f:
        pdbjson = json.load(f)

    # for rl in residuesfilteredLinks:
    #     print rl
    #     for idx, ilink in enumerate(residuesfilteredLinks[rl]):
    #         if ilink["chains"] == "B->B":
    #             print ilink["chains"] + ilink["name"]

    for idx2, i2 in enumerate(pdbjson['nodes']):
        checkN = 0
        for r in residuesfilteredNodes:
            for idx, i in enumerate(residuesfilteredNodes[r]):
                if i["name"] ==  i2["name"] and i["chain"] ==  i2["chain"]:
                    pdbjson['nodes'][idx2]["weight"] = i["weight"]
                    checkN += 1
                    break;

        if checkN == 0:
            pdbjson['nodes'][idx2] = None

    y = [i for i in pdbjson['nodes'] if i != None]
    pdbjson['nodes'] = y

    for idxlink2, ilink2 in enumerate(pdbjson['links']):
        checkL = 0
        contacts_origin = ilink2["name"].split(",")[0]
        for rl in residuesfilteredLinks:
            for idx, ilink in enumerate(residuesfilteredLinks[rl]):
                contacts_updated = ilink["name"].split(",")[0]
                if ( contacts_origin == contacts_updated
                and ilink["chains"] ==  ilink2["chains"]):
                    # print rl
                    pdbjson['links'][idxlink2]["value"] = ilink["value"]
                    pdbjson['links'][idxlink2]["name"] = ilink["name"]
                    checkL += 1
                    break

        if checkL == 0:
            pdbjson['links'][idxlink2] = None

    y = [i for i in pdbjson['links'] if i != None]
    pdbjson['links'] = y

    filename = os.path.join(subdirectory, name)
    with open(filename, 'w') as outfile:
        json.dump(pdbjson, outfile, indent=2)
