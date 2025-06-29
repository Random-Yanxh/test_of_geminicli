---
title: "基于CherryStudio RAG知识库 的考前抱佛脚教程"
author: "user"
date: "2025-06-29"
theme: "ancient"
---
## 前言
虽然说外文文献最好是直接啃+划词翻译，但是有时候只是想快速阅读全文又不希望使用AI来摘要的话，还是希望能够有比较好的全文翻译工具。在Zotero中，使用翻译+gpt插件可以比较好地做到划词翻译+概括全文，但是全文翻译一直没法方便的实现。
当前，英文PDF的全文翻译主要有以下工具：
1. DeepL：
	1. 缺点：不是pro会员的话，免费额度少，大小有限制
	2. 优点：翻译效果不错，但有时候公式和图表容易乱码
2. 沉浸式翻译（普通版）：
	1. 缺点：丑，特别是对一些公式和表格的支持不好，可能乱码或者很丑
	2. 优点：可以拿来翻译PDF/EPUB，免费，可以接入deeplx或别的AI api进行翻译
3. 🌟 沉浸式翻译BabelDOC beta测试版[BabelDOC - 注重排版的 PDF 翻译：字体映射、标点悬挂，自适应缩放，双语对照](https://app.immersivetranslate.com/babel-doc/)
	1. 缺点：没什么缺点，但是现在是测试版，后续不知道能维持多久
	2. 优点：每月1000页免费额度，效果很不错
4. 彩云小译：
	3. 缺点：好像挺丑的，而且没会员每月只能下载3次？
	4. 优点：逐段对照
5. 有道翻译：
	5. 缺点：付费才能查看全文+导出
	6. 优点：效果看起来很不错，支持逐段和整页对照，但是不清楚公式支持如何
6. ⭐doc2x[Doc2X](https://doc2x.noedgeai.com/)
	7. 缺点：免费用量有限
	8. 优点：对公式、表格、参考文献等支持都很不错，导出的PDF可以选择原文+译文横版同页看起来很方便。可以自己选大模型来翻译，并且推广期可以签到/邀请拿额度，临时用用比较推荐

总之是免费和效果很难得兼，对于理工科来说大量的公式和排版如果支持不好，那全文翻译就是纯纯副作用。

## PDFMathTranslate（pdf2zh)
[Byaidu/PDFMathTranslate: PDF scientific paper translation with preserved formats - 基于 AI 完整保留排版的 PDF 文档全文双语翻译，支持 Google/DeepL/Ollama/OpenAI 等服务，提供 CLI/GUI/Docker/Zotero](https://github.com/Byaidu/PDFMathTranslate)
这是一个开源项目，正如介绍可以调用多种接口进行保留格式的翻译，并且由于是可以本地部署，完全免费，只是部署起来有一点难度。有在线demo站可以小规模体验效果：[PDFMathTranslate - PDF Translation with preserved formats](https://pdf2zh.com/)
**优点**：**免费**，本地自部署，可以调用API进行AI翻译，保留排版且字体美观，对公式和表格支持不错，**可以配合插件在Zotero中实现方便的翻译全文并将译文文件添加到条目下**
**缺点**：安装部署稍有麻烦，插件配置教程不多仍需要完善，表格有时不翻译，偶尔会出现文本重叠乱码，参考文献这类文本的翻译有bug，不能换行（不过这个感觉影响不那么大）
### 如何部署本地服务
[PDFMathTranslate/docs/README_zh-CN.md at main · Byaidu/PDFMathTranslate](https://github.com/Byaidu/PDFMathTranslate/blob/main/docs/README_zh-CN.md)
参考官方中文文档，这里推荐采用 **“图形用户界面”** 安装，前提需要Python 3.10~3.12的环境，可以走本地服务器端口在浏览器打开图形化界面，操作更方便。我自己在安装的时候遇到了端口没开的情况，后面不知道怎么就弄好了，应该是电脑设置问题。
会用Docker的话一键拉取也比较方便。

### Zotero-pdf2zh插件
这个项目最方便的是，有大佬开发了适配Zotero的插件[zotero-pdf2zh: PDF2zh for Zotero | Zotero PDF中文翻译插件](https://github.com/guaguastandup/zotero-pdf2zh)，可以省去 把英文文献拉到浏览器翻译——翻译完下载导出——拉到Zotero原条目下 的步骤，这也是我觉得这个插件比较**优雅**的一点。

插件搭配Zotero7食用，安装教程直接按照上面的链接README来操作即可。这里讲讲配置的问题，项目文档没有讲得很清楚。
#### 所需环境
1. Zotero 7
2. Python 3.10~3.12
3. 下载好wget [wget 的安装与使用（Windows）-CSDN博客](https://blog.csdn.net/m0_45447650/article/details/125786723)用于拉取脚本
4. 以任意一种方式安装好了pdf2zh（可以不用图形界面）

#### 如何配置
以下步骤的前提是你已经安装部署好pdf2zh：
1. Zotero中配置插件参数：
	<div align="center">
	  <img src="https://s2.loli.net/2025/03/12/5PVqt3lBcm1igdX.png" width="100%">
	</div>
	
	- 这里默认端口8888，如果已经占用了可以改，然后再config.json同步改。
	- 有两个路径，建议和我一样在C盘外专门开个文件夹（尽量英文路径），里面新建一个config.json文件（没有VScode建议装一个，要么就新建txt编辑完再改后缀为.json）再建一个translated文件夹放临时文件。
	- 翻译引擎可以先不改，先用bing跑通了再改，懒得折腾就用这个机翻。线程数可以改8，没问题。
	- 默认生成文件建议勾选 dual，这个是一页英文一页译文，中英文对照比较抽象，是一页里面分两栏，左英右中，对一些外文期刊公式和图不多的还可以，很容易排版出错比较乱。但是在Zotero电脑端可以将查看方式改为 **奇/偶数分布**，然后把边栏收起，这样就是左边一页英文对应右边一页译文。
	- 生成后自动打开文件可以不勾选，如果你翻译完之后发现没有自动添加到条目下，但是在translate文件夹下面有，可以勾选试试看，重新翻译之后可能就恢复正常了。
2. config.json文件配置API
	1. 这里不建议和官方文档一样弄字体，默认的字体基本上和原文献比较和谐，乱改反而容易出错。
	2. 如果不配置这个json文件，只能使用bing/Google进行机翻，虽然方便但是可能效果不会很好。要使用API，可以参考我的示例：
		1. 这里尝试过~~硅基流动的龟速api~~、~~大先生的超龟速api~~之后，还是推荐使用国产智谱的**GLM-4-flash**，并发量/上下文。速度都挺好而且**免费**，量大的/有Google号的可以搞个gemini，也很快并且上下文长+免费。
		2. 示例中从上到下依次为硅基流动/大先生/智谱，可以删去不用的，然后记得把APIKEY改成你自己的。其他OpenAI格式的也走第2个格式。
		3. 记得两个服务之间的`{}`用`,`分隔。
	3. 如何申请智谱的API：
		1. 去官网注册登录：[智谱AI开放平台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
		2. 找右上角小钥匙图标，添加新的apikey，复制过来即可
		3. ![image.png](https://s2.loli.net/2025/03/12/dsn2OkqI8m3vLgY.png)


```json
{
    "translators": [

        {

            "name": "silicon",

            "envs": {

                "SILICON_URL": "https://api.siliconflow.cn/v1",

                "SILICON_API_KEY": "你的APIKEY",

                "SILICON_MODEL": "Qwen/Qwen2.5-72B-Instruct-128K（可以改别的模型，但是都很慢）"

            }

        },

        {

            "name": "openai",

            "envs": {

                "OPENAI_BASE_URL": "https://chat.zju.edu.cn/api/ai/v1",

                "OPENAI_API_KEY": "你的APIkey",

                "OPENAI_MODEL": "deepseek-v3-671b"

            }

        },

        {

            "name": "zhupu",

            "envs": {

                "ZHIPU_URL": "https://open.bigmodel.cn/api/paas/v4",

                "ZHIPU_API_KEY": "你的apikey",

                "ZHIPU_MODEL": "glm-4-flash"

            }

        }

    ]

}
```
3. 如何启动服务
	1. 如果你都是安装前面的默认方式走的，在安装服务和拉取脚本的时候一般会在C盘用户(Users)/User文件夹下安装pdf2zh，并在此目录下生成 `server.py`文件
	2. 全文翻译插件的使用需要先在命令行中启动上面的文件，如果默认都是C:\Users\User路径，那么直接输入： `python server.py 8888`即可，8888为端口号。如下图即可使用。
		![image.png](https://s2.loli.net/2025/03/12/Rlb3UL9xhVgMNAP.png)
	3. 随便找一篇英文文献，右键点击条目，选择PDF2zh:Translate PDF
		![image.png](https://s2.loli.net/2025/03/12/awzfROEKI72845s.png)
		此时命令行窗口如果这样就是正常在翻译（当前用的bing，智谱也很快）：
		![image.png](https://s2.loli.net/2025/03/12/yZQKYASxamw1EGe.png)
		随后翻译好的PDF被**自动添加进条目中**，可以选不同的版本来看，非常方便。
		![image.png](https://s2.loli.net/2025/03/12/Sw8XKysbMdBfqo4.png)
	4. 用完之后如果要关闭服务，请ctrl+C，或者直接都关了好像也没什么关系。
### 效果展示
#### 图形化界面
![image.png](https://s2.loli.net/2025/03/12/dDPYzy2lTJREpbN.png)
#### 翻译效果对比
原文：Estimating Energy Forecasting Uncertainty for Reliable AI Autonomous Smart Grid Design
![image.png](https://s2.loli.net/2025/03/12/cZ4JTa5KvROWoS8.png)

1. deepl
	![image.png](https://s2.loli.net/2025/03/12/ETQAw9a4KuYNfph.png)

2. 沉浸式翻译普通版👎
	![image.png](https://s2.loli.net/2025/03/12/A9tX6kKCiShzPEs.png)

3. 沉浸式翻译beta版🌟
	![image.png](https://s2.loli.net/2025/03/12/wKl9c5NZkHODWqP.png)


4. 彩云小译👎
	![image.png](https://s2.loli.net/2025/03/12/hNYEqkUx1ZLzPCy.png)

5. 有道（只有截图）
	![有道.png](https://s2.loli.net/2025/03/12/luIf81bKSJ7xQBo.jpg)
6. doc2x⭐
	![image.png](https://s2.loli.net/2025/03/12/fbHAU2LmgnPrIOu.png)

7. pdf2zh🌟
	![image.png](https://s2.loli.net/2025/03/12/jSvdEBLOJR5wKzV.png)
可以看到，pdf2zh，doc2x，和沉浸式翻译beta版的效果还是挺好的，有道的感觉也还行，剩下的你们怎么好意思收费的我请问呢？？？
我也找了本300页左右的英文书PDF（李飞飞的 *The World I See*），此时仅中文模式，只有bing/Google可以翻译，其他的api估计只有gemini可用，就格式来说翻译效果还不错，但是机翻本身的质量见仁见智。
![image.png](https://s2.loli.net/2025/03/12/NkYz1J8F27GDaL3.png)



## 其他
这个项目只要能配置好我觉得还是挺方便好用的，但是它的配置确实可能有一定的难度。如果你有任何问题可以在楼下提出，大家可以一起讨论着解决。
如果你还是没法部署，那么上文提到的小规模的doc2x,沉浸式beta版，以及pdf2zh的demo站也可以应急使用，或者采用上一个帖子中的划词翻译方式[【学习天地】（API已恢复）在Zotero中调用大先生DSV3API实现读文献+翻译]( https://www.cc98.org/topic/6129178 )也很不错，智谱的api也可以用在那个里面。

总之希望这些Zotero工具教程能够帮到各位师兄师姐，以及忙着写论文看论文的本科生们，祝各位科研顺利！
