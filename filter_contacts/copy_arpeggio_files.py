import os
import shutil

def copy_arpeggio_files(directoryContactType, subdirectory, pdbid):
    if not os.path.exists(subdirectory):
        os.mkdir( subdirectory, 0755 );
    for file in os.listdir(directoryContactType):
        if file.startswith(pdbid.upper()) and not file.endswith(".pdb"):
            arpeggio_file = directoryContactType + file
            shutil.copy2(arpeggio_file, subdirectory)
            # LATER HERE ADD COMMAND TO DELETE THESE FILES IN XRAY_INPUT folder
