import sys
from filter_by_contact_types import main

pdbid = sys.argv[1]
contacttype = sys.argv[2]
baseDir = sys.argv[3]

main(pdbid, contacttype, baseDir)
