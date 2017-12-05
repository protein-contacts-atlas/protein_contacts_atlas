import os
import shutil

def copy_and_change_sif_txt_files(folders,subdirectory,contacts,ari,contacttype):

    if "sif" in folders[0]:
        folder1 = folders[0]
        folder2 = folders[1]
    elif "sif" in folders[1]:
        folder1 = folders[1]
        folder2 = folders[0]

    for file in os.listdir(subdirectory):
        if file.endswith(".sif"):
            newfile = os.path.join(subdirectory, file)
            shutil.copy2(newfile, os.path.join(subdirectory, folder1))
            os.remove(newfile)

        if file.endswith(".txt"):
            newfile = os.path.join(subdirectory, file)
            readfile = open(newfile, "r")

            first_line = readfile.readline()
            # string = first_line.rstrip()
            # string += "\tContact type" + "\n"

            string = "PDB\tChain1\tChain2\tSS1\tSS2\tRes1\tResNum1\tRes2\tResNum2\tAtoms\tChain Types\tDistance\tContact type\n"

            # next(readfile)
            f = file[:-4]

            filename = os.path.join(subdirectory, folder2, file)
            with open(filename, 'w') as outfile:
                outfile.write(string)
                for line in readfile:
                    # for empty lines, skip
                    if not line.strip():
                        continue;
                    else:
                        word = line.split("\t")
                        pdb = word[0]
                        chain1 = word[1]
                        chain2 = word[2]
                        ss1 = word[3]
                        ss2 = word[4]
                        reslet1 = word[5]
                        reslet2 = word[7]
                        resnum1 = word[6]
                        resnum2 = word[8]
                        numatomcont = word[9]
                        atom1 = word[10].split("-")[0]
                        atom2 = word[10].split("-")[1]
                        chaintypes = word[11]
                        distance = word[12].rstrip()

                    # string = line.rstrip()

                    if len(contacts)>0:

                        for idx, i in enumerate(contacts):
                            if (resnum1 == i["res1"] and resnum2 == i["res2"]
                            and chain1 == i["chain1"] and chain2 == i["chain2"]
                            and atom1 == i["atom1"] and atom2 == i["atom2"]):
                                # string = line.rstrip()
                                # string += "\t"
                                string = (pdb +"\t"+ chain1 +"\t"+ chain2 +"\t"+ ss1 +"\t"+ ss2 +"\t"+ reslet1 +"\t"+ resnum1 +"\t"+ reslet2
                                +"\t"+ resnum2 +"\t"+ word[10] +"\t"+ chaintypes +"\t"+ distance + "\t")

                                for t in i["type"]:
                                    string += t
                                    string += ","
                                string += "\n"
                                outfile.write(string)
                                break
                            elif (resnum1 == i["res2"] and resnum2 == i["res1"]
                            and chain1 == i["chain2"] and chain2 == i["chain1"]
                            and atom1 == i["atom2"] and atom2 == i["atom1"]):
                                # string = line.rstrip()
                                # string += "\t"
                                string = (pdb +"\t"+ chain1 +"\t"+ chain2 +"\t"+ ss1 +"\t"+ ss2 +"\t"+ reslet1 +"\t"+ resnum1 +"\t"+ reslet2
                                +"\t"+ resnum2 +"\t"+ word[10] +"\t"+ chaintypes +"\t"+ distance + "\t")

                                for t in i["type"]:
                                    string += t
                                    string += ","
                                string += "\n"
                                outfile.write(string)
                                break

                    if len(ari)>0:
                        for idx, i in enumerate(ari):
                            for ik in i["type"]:
                                if ik in contacttype:
                                    if (resnum1 == i["res1"] and resnum2 == i["res2"]
                                    and chain1 == i["chain1"] and chain2 == i["chain2"]
                                    and atom1 == i["atom1"]):
                                        # string = line.rstrip()
                                        # string += "\t"
                                        string = (pdb +"\t"+ chain1 +"\t"+ chain2 +"\t"+ ss1 +"\t"+ ss2 +"\t"+ reslet1 +"\t"+ resnum1 +"\t"+ reslet2
                                        +"\t"+ resnum2 +"\t"+ word[10] +"\t"+ chaintypes +"\t"+ distance + "\t")
                                        string += ik
                                        string += "\n"
                                        outfile.write(string)
                                        break

                                    elif (resnum1 == i["res2"] and resnum2 == i["res1"]
                                    and chain1 == i["chain2"] and chain2 == i["chain1"]
                                    and atom2 == i["atom1"]):
                                        # string = line.rstrip()
                                        # string += "\t"
                                        string = (pdb +"\t"+ chain1 +"\t"+ chain2 +"\t"+ ss1 +"\t"+ ss2 +"\t"+ reslet1 +"\t"+ resnum1 +"\t"+ reslet2
                                        +"\t"+ resnum2 +"\t"+ word[10] +"\t"+ chaintypes +"\t"+ distance + "\t")
                                        string += ik
                                        string += "\n"
                                        outfile.write(string)
                                        break

                    # outfile.write(string)
            os.remove(newfile)
