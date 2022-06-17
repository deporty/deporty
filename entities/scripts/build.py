import os
import shutil
os.system('cd .. && npm run compile')

original = r'../package.json'
target = r'../dist/package.json'

shutil.copyfile(original, target)

default_package = 'package.json'

dirs = list(
    filter(
        lambda x: os.path.isdir(
            x
        ),
        map(
            lambda y: f'../dist/{y}',
            os.listdir('../dist')
        )
    )
)

for dir in dirs:
    shutil.copyfile(default_package, f'{dir}/package.json')

