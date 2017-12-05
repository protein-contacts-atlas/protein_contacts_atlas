import json
import os, sys
import shutil
import pandas as pd
import re

from copy_arpeggio_files import *
from check_contacts_aromatic import *
from check_contacts_noncovalent import *
from copy_and_change_sif_txt_files import *
from read_and_process_json_files import *

# from .ari
# commandline atom aromatic ring options cationpi, donorpi, halogenpi,carbonpi
# from .contacts
# hydrogen, weakhydrogen, halogen, ionic, metal, aromatic, hydrophobic, carbonyl, polar, weakpolar

# ri = [] # list of dictionary for contents from the file .ri which has pipi interactions
# ari = [] # list of dictionary for contents from the file .ari which has atom pi interactions
# contacts = [] # list of dictionary for contents from the file .contacts which has all types of interactions
subdirectory = ""
pdbid = ""

def create_zip(src,dest):
    zf = zipfile.ZipFile("%s.zip" % (dest), "w", zipfile.ZIP_DEFLATED)
    abs_src = os.path.abspath(src)
    for dirname, subdirs, files in os.walk(src):
        for filename in files:
            absname = os.path.abspath(os.path.join(dirname, filename))
            arcname = absname[len(abs_src) + 1:]
            zf.write(absname, arcname)
    zf.close()

def main(pdbid, contacttype, baseDir='./structures_database'):

    # outputDir = os.path.join(baseDir, 'structures_database-filter_by_contact_type/')
    outputDir = './structures_database-filter_by_contact_type/'

    # Path to be created
    # directoryContactType = os.path.join(baseDir, "XRAY_INPUT/")
    directoryContactType = "./XRAY_INPUT/"

    # Path to be created
    directory = outputDir + contacttype

    if not os.path.exists(directory):
        os.mkdir( directory, 0777 );

    subdirectory = os.path.join(directory, pdbid.upper())
    contacttypes = contacttype.split(",")
    path = os.path.join(baseDir, pdbid.upper());

    copy_arpeggio_files(directoryContactType,subdirectory, pdbid)
    ari = check_contacts_aromatic(contacttype,subdirectory,pdbid,contacttypes)
    contacts = check_contacts_noncovalent(contacttype,subdirectory,pdbid,contacttypes)
    read_and_process_json_files(pdbid.upper(),path,subdirectory,ari,contacts,contacttype)

    root, folders, files = os.walk(subdirectory).next()

    copy_and_change_sif_txt_files(folders,subdirectory,contacts,ari,contacttype)

    if "sif" in folders[0]:
        folder1 = folders[0]
        folder2 = folders[1]
    elif "sif" in folders[1]:
        folder1 = folders[1]
        folder2 = folders[0]

    zipfoldersif = os.path.join(subdirectory, folder1)
    newsifname = folder1 + "_" + contacttype
    zipnewsifname = os.path.join(subdirectory, newsifname)
    create_zip(zipfoldersif,zipnewsifname)
    shutil.rmtree(zipfoldersif)

    zipfoldertxt = os.path.join(subdirectory, folder2)
    newtxtname = folder2 + "_" + contacttype
    zipnewtxtname = os.path.join(subdirectory, newtxtname)
    create_zip(zipfoldertxt,zipnewtxtname)
    shutil.rmtree(zipfoldertxt)

    arpeggiofolder = os.path.join(subdirectory, "arpeggiofiles")
    if not os.path.exists(arpeggiofolder):
            os.mkdir( arpeggiofolder, 0755 )

    for file in os.listdir(subdirectory):
        if ("arpeggiofiles" not in file and not file.endswith(".sif")
        and not file.endswith(".json") and not file.endswith(".txt")
        and not file.endswith(".zip") and not file.endswith(".pdb")):
            newfile = subdirectory  + "/" + file
            shutil.copy2(newfile, arpeggiofolder)
            os.remove(newfile)

    create_zip(arpeggiofolder,arpeggiofolder)
    shutil.rmtree(arpeggiofolder)


# main(pdbid, contacttype)
