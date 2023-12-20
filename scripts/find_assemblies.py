import os
import json

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

print("Script dir: " + SCRIPT_DIR)

default_uipath_namespaces = json.load(open(os.path.join(SCRIPT_DIR, "default_uipath_namespaces.json")))
studio_path = r"C:\Program Files\UiPath\Studio"

found_assemblies = []
not_found_assemblies = []



for namespace in default_uipath_namespaces:
    print("Searching for namespace: " + namespace)
    # search studio directory for assemblies, walk through all subdirectories
    assembly_name = namespace + ".dll"

    full_name_root = os.path.join(studio_path, assembly_name)
    if os.path.exists(full_name_root):
        found_assemblies.append((assembly_name, full_name_root))
        continue

    full_name_refs = os.path.join(studio_path, "refs", assembly_name)
    if os.path.exists(full_name_refs):
        found_assemblies.append((assembly_name, full_name_refs))
        continue

    # found = False
    # for root, dirs, files in os.walk(studio_path):
    #     if assembly_name in files:
    #         found = True
    #         found_assemblies.append((assembly_name, root))
    #         break
    # if not found:
    #     not_found_assemblies.append(assembly_name)
        
# print("Found assemblies: ")
# for assembly in found_assemblies:
#     print(assembly)

# print("Not found assemblies: ")
# for assembly in not_found_assemblies:
#     print(assembly)

# try creating output directory
try:
    os.mkdir(os.path.join(SCRIPT_DIR, "output"))
except:
    pass

# output to file

with open(os.path.join(SCRIPT_DIR, "output", "found_assemblies.json"), "w") as f:
    # JSON
    json.dump(found_assemblies, f , indent=4)

with open(os.path.join(SCRIPT_DIR, "output", "refs.xml"), "w") as f:
    # JSON
    for assembly in found_assemblies:
        f.write("<Reference Include=\"" + assembly[0] + "\">\n")
        f.write("<HintPath>" + assembly[1] + "</HintPath>\n")
        f.write("</Reference>\n")
