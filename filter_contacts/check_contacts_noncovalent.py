def check_contacts_noncovalent(contacttype,subdirectory,pdbid,contacttypes):
    contacts = []
    if ("hydrogen" in contacttype or "weakhydrogen" in contacttype or "halogen" in contacttype or "ionic" in contacttype
    or "metal" in contacttype or "aromatic" in contacttype or "hydrophobic" in contacttype or "carbonyl" in contacttype or "polar" in contacttype or "weakpolar" in contacttype):
        newfile3 = subdirectory  + "/" + pdbid.upper() + ".contacts"
        readfileNonCov = open(newfile3, "r")
        for line in readfileNonCov:

            info = {}
            info["type"] = []
            noncov = line.split("\t")
            # print noncov[1]

            info["res1"] = noncov[0].split("/")[1]
            info["chain1"] = noncov[0].split("/")[0]
            info["atom1"] = noncov[0].split("/")[2]
            info["res2"] = noncov[1].split("/")[1]
            info["chain2"] = noncov[1].split("/")[0]
            info["atom2"] = noncov[1].split("/")[2]

            for i in contacttypes:
                if int(noncov[7]) == 1 and i == "hydrogen":
                    info["type"].append("hydrogen")
                if int(noncov[8]) == 1 and i == "weakhydrogen":
                    info["type"].append("weakhydrogen")
                if int(noncov[9]) == 1 and i == "halogen":
                    info["type"].append("halogen")
                if int(noncov[10]) == 1 and i == "ionic":
                    info["type"].append("ionic")
                if int(noncov[11]) == 1 and i == "metal":
                    info["type"].append("metal")
                if int(noncov[12]) == 1 and i == "aromatic":
                    info["type"].append("pi-pi")
                if int(noncov[13]) == 1 and i == "hydrophobic":
                    info["type"].append("hydrophobic")
                if int(noncov[14]) == 1 and i == "carbonyl":
                    info["type"].append("carbonyl")
                if int(noncov[15]) == 1 and i == "polar":
                    info["type"].append("polar")
                if int(noncov[16]) == 1 and i == "weakpolar":
                    info["type"].append("weakpolar")

            if len(info["type"])!=0:
                contacts.append(info)

    return contacts
    # YOU CAN ALSO ADD BUTTON FOR "ALL NON-COVALENT" AND FOR "NON-CANONICAL" TO CALCULATE FOR ALL IN THOSE GROUPS
