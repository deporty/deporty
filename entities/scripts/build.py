import os
import shutil
os.system('cd .. && npm run compile')

original = r'../package.json'
target = r'../dist/package.json'

shutil.copyfile(original, target)