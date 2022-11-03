# Write todo list to readme.md from all files in the project

import os
import re

# Get all files in the project
sourceFiles = []
for path, subdirs, files in os.walk(".."):
    for name in files:
        sourceFiles.append(os.path.join(path, name))
# filtre files with extensions .ts, .tsx, .css
sourceFiles = [f for f in sourceFiles if (f.endswith('.ts') or f.endswith('.tsx') or f.endswith('.css')) and not ('node_modules' in f)]

todos = []
for f in sourceFiles:
    with open(f, 'r') as file:
        content = file.readlines()
        for line in content:
            if 'todo' in line.lower():
                todos.append([f, line.lower().split('todo')[1]])


with open('../readme.md', 'r') as readme:
    content = readme.readlines()

with open('../readme.md', 'w') as readme:
    index = 0

    while index < len(content):
        if content[index].startswith('## Table of contents'):
            index += 1
            break
        readme.write(content[index])
        index += 1
    readme.write('## Table of contents\n\n')
    for ind2 in range(len(content)):
        if content[ind2].startswith('#'):
            count = content[ind2].count('#') - 1
            replaced1 = content[ind2].replace("#","").replace("\n","")[1::]
            replaced = content[ind2].replace("#","").replace("\n","").replace(" ","-").lower()[1::]
            readme.write(f'{"  " * count}* [{replaced1}](readme.md#{replaced})\n')

    while index < len(content):
        if content[index].startswith('#'):
            readme.write("\n"+content[index])
            index += 1
            break
        index += 1
    while index < len(content):
        if content[index].startswith('## TODO'):
            index += 1
            break
        readme.write(content[index])
        index += 1

    readme.write("""## TODO (generated by python script)

""") 
    for todo in todos:
        readme.write(f'* {todo[0][3::]}: {todo[1]}')
    
    while index < len(content):
        if content[index].startswith('#'):
            index += 1
            break
        index += 1
    
    while index < len(content):
        readme.write(content[index])
        index += 1