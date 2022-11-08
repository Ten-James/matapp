import os

# Get all files in the project
sourceFiles = []
for path, subdirs, files in os.walk(".."):
    for name in files:
        sourceFiles.append(os.path.join(path, name))
# filtre files with extensions .ts, .tsx, .css
sourceFiles = [f for f in sourceFiles if (f.endswith('.ts') or f.endswith('.tsx') or f.endswith('.css')) and not ('node_modules' in f)]

radky = 0
slova = 0
znaky = 0
for f in sourceFiles:
    with open(f, 'r') as file:
        content = file.readlines()
        radky += len(content)
        for line in content:
            znaky += len(line)

print(radky, znaky)