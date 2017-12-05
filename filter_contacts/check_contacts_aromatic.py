def check_contacts_aromatic(contacttype,subdirectory,pdbid,contacttypes):
    ari = []
    if "cationpi" in contacttype or "donorpi" in contacttype or "halogenpi" in contacttype or "carbonpi" in contacttype:
        newfile = subdirectory  + "/" + pdbid.upper() + ".ari"

        # readfileAtompi = pd.read_csv(newfile, header = None, sep="\t")
        readfileAtompi = open(newfile, "r")
        for line in readfileAtompi:
            atompi = line.split("\t")
            info = {}
            info["type"] = []
            info["res1"] = atompi[0].split("/")[1]
            info["chain1"] = atompi[0].split("/")[0]
            info["atom1"] = atompi[0].split("/")[2]
            info["res2"] = atompi[2].split("/")[1]
            info["chain2"] = atompi[2].split("/")[0]

            if "," in atompi[4]:
                a = atompi[4][2:-2].lower()
                a = a.replace("'", "")
                a = a.replace(" ", "")
                info["type"] = a.split(",")
                # print info["type"]
            else:
                info["type"].append(atompi[4][2:-2].lower())
                # print info["type"]

            ari.append(info)

    return ari

            # if "pipi" in contacttype:
            #     newfile2 = subdirectory  + "/" + pdbid.upper() + ".ri"
            #     readfilePipi = open(newfile2, "r")
            #     for line in readfilePipi:
            #         pipi = line.split("\t")
            #         info = {}
            #
            #         info["res1"] = pipi[1].split("/")[1]
            #         info["chain1"] = pipi[1].split("/")[0]
            #         info["res2"] = pipi[4].split("/")[1]
            #         info["chain2"] = pipi[4].split("/")[0]
            #         ri.append(info)
            #         # print pipi[4]
