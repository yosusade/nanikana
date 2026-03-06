vrm桌宠文件夹所需终端指令

npm install electron --save-dev

npm install three @pixiv/three-vrm

npm start

在vscode里面的终端里输入，在"vrm桌宠>"（总之就是解压后的文件夹的名字）后面输入

对了，不要忘了在解压后的文件夹里新建一个空文件夹"vrm-pet"

vrm0.0导入的时候可能会出现模型向后转以及手臂投降的问题，这时只要改动app.js里的

<img width="397" height="35" alt="QQ浏览器截图20260306180006" src="https://github.com/user-attachments/assets/c8da1400-dc57-4c99-9989-b3f0c65d07ad" />


<img width="365" height="146" alt="QQ浏览器截图20260306180014" src="https://github.com/user-attachments/assets/8c212ec3-cf2d-4ebe-b6f4-b8324f781d19" />

上面的将等号后的改为Matn.PI

下面的将两个等号后的数字互换即可

该库依旧有很大的改进空间，如有需要改进的地方或者是存在哪些问题还欢迎来讨论


