#!/usr/bin/python
import sys

sys.path.append('/www/users/rajini/jsonapi/')

import os
import bottle
from bottle import route, run, Bottle, redirect
import json

# Change working directory so relative paths (and template lookup) work again
os.chdir(os.path.dirname(__file__))

# ... build or import your bottle application here ...
# Do NOT use bottle.run() with mod_wsgi

# app = Bottle()

@route('/')
def index():
    return redirect("http://www.mrc-lmb.cam.ac.uk/rajini/index.html")

@route('/api/<pdbid>')
def pdb_api(pdbid):

    chain = ""
    path = "../structures_database/"+pdbid.upper()+"/";

    #read all the files in the directory and get the json files and first json file listed
    for file in os.listdir(path):
        if file.endswith(".json"):
            if "-" not in file and "_" in file and "stats" not in file:
                s = file.index('_')+1
                e = file.index('.')
                chain = file[s:e]
                #print(chain)
                break

    json_file = "../structures_database/"+pdbid.upper()+"/"+pdbid.upper()+"_"+chain+".json"
    json_data = open(json_file)
    pdbjson =  json.load(json_data)
    return pdbjson

#selecting a pdb and a specifi chain
@route('/api/<pdbid>/<chainid>')
def pdb_chain(pdbid,chainid):

    chain = chainid

    json_file = "../structures_database/"+pdbid.upper()+"/"+pdbid.upper()+"_"+chain+".json"
    json_data = open(json_file)
    pdbjson =  json.load(json_data)
    return pdbjson

@route('/redirect/<pdbid>')
def pdb_redirect(pdbid):

    chains = []
    path = "../structures_database/"+pdbid.upper()+"/";

    for file in os.listdir(path):
        if file.endswith(".json"):
            if "-" not in file and "_" in file and "stats" not in file:
                s = file.index('_')+1
                e = file.index('.')
                chains.append(file[s:e])

    chains_url = ""
    for chain in chains:
        chains_url += chain + "-"

    rajini_url = "http://www.mrc-lmb.cam.ac.uk/rajini/views/matrix.html?allchains=" + pdbid.upper() + "_" + chains_url + "&cutoff=0.5"

    return redirect(rajini_url)

application = bottle.default_app()
