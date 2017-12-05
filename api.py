from bottle import route, run, Bottle, redirect
import json
import os

app = Bottle()

@app.route('/api/<pdbid>')
def pdb_api(pdbid):

    chain = ""
    path = "structures_database/"+pdbid.upper()+"/";

    for file in os.listdir(path):
        if file.endswith(".json"):
            if "-" not in file and "_" in file and "stats" not in file:
                s = file.index('_')+1
                e = file.index('.')
                chain = file[s:e]
                #print(chain)
                break

    json_file = "structures_database/"+pdbid.upper()+"/"+pdbid.upper()+"_"+chain+".json"
    json_data = open(json_file)
    pdbjson =  json.load(json_data)
    return pdbjson

@app.route('/api/<pdbid>/<chainid>')
def pdb_api(pdbid,chainid):

    chain = chainid

    json_file = "structures_database/"+pdbid.upper()+"/"+pdbid.upper()+"_"+chain+".json"
    json_data = open(json_file)
    pdbjson =  json.load(json_data)
    return pdbjson

@app.route('/redirect/<pdbid>')
def pdb_redirect(pdbid):

    chains = []
    path = "structures_database/"+pdbid.upper()+"/";

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


app.run(reloader=True)
