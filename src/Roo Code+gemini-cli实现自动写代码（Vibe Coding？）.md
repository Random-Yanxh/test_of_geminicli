## 前言

本文介绍了Roo Code这一插件的功能和使用方法，并给出了两种获取免费Gemini 2.5 pro API的途径：
1. Gemini-Cli登录后授权（想体验gemini-cli但是安装登录有问题的可以看这一部分解决方案）
2. aistudio获取免费层级的API-Key（通用）
它可以让你的一些想法快速转化成demo，你只需要做好一个产品经理并指挥好AI干活。
### Vibe coding 与 Roo Code
**Vibe coding**是当前非常火的一个大模型落地的概念，维基百科词条介绍[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)如下：

>**Vibe coding** is an approach to producing software by using [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence "Artificial intelligence") (AI), where a person describes a problem in a few [natural language](https://en.wikipedia.org/wiki/Natural_language "Natural language") sentences as a [prompt](https://en.wikipedia.org/wiki/Prompt_engineering "Prompt engineering") to a [large language model](https://en.wikipedia.org/wiki/Large_language_model "Large language model") (LLM) tuned for coding. The LLM generates [software](https://en.wikipedia.org/wiki/Application_software "Application software") based on the description, shifting the programmer's role from manual coding to guiding, testing, and refining the AI-generated [source code](https://en.wikipedia.org/wiki/Source_code "Source code").
>Vibe 编码是一种利用人工智能（AI）生成软件的方法，其中一个人用几句话的自然语言描述一个问题作为提示输入到针对编码优化的大语言模型（LLM）中。LLM 根据描述生成软件，将程序员的角色从手动编码转变为指导、测试和优化由AI生成的源代码。

提起Vibe coding，避不开[Cursor](https://www.cursor.com/cn)这一IDE。不可否认Cursor很强，Tab很好用，但是它20$/月起步的费用以及交了钱还会降智的吃相让我不习惯也不喜欢使用它。

Roo Code是一个VScode的免费插件，在Cline的基础上开发而来，支持Agent模式和MCP调用，相比于Cursor没有Tab补全功能，需要自行配置使用的模型API。虽然配置稍麻烦一些，功能少一部分，但是理论上可以实现**完全免费**的Vibe coding体验，定制化程度很高。

Cursor, Roo Code和Github Copilot三者的区别如下（由Gemini总结）：
### Cursor vs. RooCode vs. GitHub Copilot 综合对比

| 特性分类 | 特性 | **Cursor** | **RooCode** | **GitHub Copilot** |
| :--- | :--- | :--- | :--- | :--- |
| **核心理念与架构** | **产品定位** | AI 原生代码编辑器 | VSCode 中的 AI 代理开发团队 | IDE 中的 AI 结对程序员 |
| | **核心架构** | 一个 VSCode 的**分支 (Fork)** | 一个安装在 VSCode 中的**扩展 (Extension)** | 一个安装在多种 IDE 中的**扩展 (Extension)** |
| | **与 VSCode 关系** | **深度集成**。本质上是内置了原生 AI 功能的 VSCode，完美兼容 VSCode 扩展与设置。 | **完全依赖**。作为 VSCode 扩展运作，扩展 VSCode 的能力。 | **高度集成**。与 VSCode 紧密结合，但在其他编辑器 (如 JetBrains) 中也能使用。 |
| **AI 功能与特色** | **代码库理解** | **非常强大**。以 `@Codebase` 为代表，能深入理解整个项目的上下文，进行跨文件的问答与编辑。 | **强大**。通过“提问模式”(Ask Mode) 分析代码库，但更强调其代理 (Agent) 执行任务的能力。 | **正在追赶**。Copilot Chat 逐渐增强对上下文的理解，但传统上更专注于当前文件和用户的直接提示。 |
| | **AI 交互方式** | - **内嵌编辑 (Ctrl+K)**：选取代码进行对话式修改<br>- **聊天面板**：进行代码库对话<br>- **AI 调试**：一键分析错误 | - **多种模式切换**：Code, Architect, Debug 等<br>- **智能工具 (Smart Tools)**：授权 AI 读写文件、执行终端命令<br>- **自定义 AI 代理** | - **行内自动完成 (Ghost Text)**<br>- **聊天面板**：问答、生成代码<br>- **快捷指令 (`/fix`, `/doc`)** |
| | **核心差异点** | 以**理解整个项目**为核心，提供流畅的“AI 原生”编辑体验。 | 以**高度可定制的 AI 代理**为核心，赋予 AI 执行复杂工作流的能力。 | 以**高质量的代码建议**和即时问答为核心，提升开发者的日常编码效率。 |
| | **定制性** | 中等。可以切换 AI 模型，但核心体验是内置的。 | **非常高**。支持自带 API 密钥 (BYOM)、本地模型、自定义模式与指令，是为“专家/爱好者”设计的。 | 低。主要使用由 GitHub/Microsoft 提供的模型与功能，用户定制空间较小。 |
| **定价与模型支持** | **定价模型** | - **免费版** (有限请求)<br>- **Pro 版** (~$20/月)<br>- **商业版** | **开源免费**。用户只需支付自己使用的 AI 模型 API 密钥费用。 | - **个人版** (~$10/月)<br>- **商业版** (~$19/用户/月)<br>- **企业版** (~$39/用户/月)<br>(为学生与开源贡献者提供免费版) |
| | **AI 模型支持** | 支持多种主流模型，如 OpenAI (GPT), Anthropic (Claude), Google (Gemini) 等。 | **自带模型 (BYOM)**。支持几乎所有提供 API 的模型，包括开源和本地部署的模型，灵活性最高。 | 主要使用 OpenAI 的模型 (Codex/GPT)，由 Microsoft 进行优化与整合。 |

---

### 什么是gemini-cli
上一部分提到，Roo Code需要自己配置模型的API，并且它对API的消耗速度很快，但是Claude、ChatGPT等模型提供商的API定价都挺高的，最合适这一工具的是可以低价/免费调用并且编码性能较强的模型。Google的 **Gemini 2.5 pro** 则几乎完美符合这一要求：可以使用Vertex渠道或者GCP 300渠道的赠金来低价调用API，~~并且[据传](https://x.com/OfficialLoganK/status/1938744437695299703)近期要重新开放免费层级调用（当前测试仍为429无法使用）~~；1M上下文冠绝群雄，大项目开发巨爽。

🌟6月28日晚上写到这里还是429报错，今天29日可以调用了！免费层级调用限额：
- 每天600万Token
- 每次上限25万Token
- 每天请求上限100次
- 每分钟请求上限为5次
轻量使用的话感觉足够了，如果用量比较大的话建议多个号

但是，
6月25日Google发布了[gemini-cli](https://github.com/google-gemini/gemini-cli)这一终端命令行工具：
`An open-source AI agent that brings the power of Gemini directly into your terminal.（一个开源的AI agent，将Gemini的强大功能直接带入您的终端。）`
[Google announces Gemini CLI: your open-source AI agent](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)
它接入了强大的Gemini-2.5系列模型，支持免费调用Gemini-2.5-pro进行提问和编程，并且有1000 rpd + 60 rpm的额度（每天免费调用1000次，每分钟免费调用60次）和1M上下文。
虽然它在终端命令行中不太好用，但是**可以很方便地接入到Roo Code插件中**，这就暂时解决了API来源这一问题。

### 相比于网页端AI有什么优势？

当我在做一些课程的大作业/做竞赛项目，遇到需要写代码场景但是我本身对这门代码语言并不熟悉的时候，写代码就是一件很头痛的东西。大语言模型的发展让我们从零开始构建一个项目，做一个网页，写一个软件的难度空前降低。但是**传统方案**，即在网页端和大模型进行对话交互，然后再把代码**复制粘贴**到VSCode里实在是**太不优雅**了。如果要修改程序中某一段特定的代码，网页端几乎智能从头全部写起，对于长代码文件的项目来说非常费时，并且每次重写都伴随着其他部分代码发生改变的风险；对于**多文件**的稍微大点的项目来说，网页端一个个编写、修改的方式非常低效而且很容易出错，在一个长对话下，AI非常容易丢失上下文，或者出现突如其来的幻觉，让开发变得很麻烦。

Cursor的横空出世改变了这一模式，后续Cline/Roo Code/Augment等插件的路子也有相似之处。调用API在IDE端直接对项目代码进行 查看/编写/修改，比网页端复制粘贴高效得多。

## 操作步骤
### 环境配置
- 环境需求：
	- [Node.js](https://nodejs.org/zh-cn/download)（没有的话此处安装）
	- Google账号
	- 一个稳定的非HK梯子，请全程挂梯
	- VsCode，并在拓展商店安装好Roo Code插件
### 安装Gemini-cli【如果你不是想体验Gemini-cli，可以直接跳过，使用Gemini API Key】
根据Github文档依次进行即可：命令行输入
```shell
npx https://github.com/google-gemini/gemini-cli
```
或
```shell
npm install -g @google/gemini-cli
```
完成安装。输入`gemini`开始运行。
**注：** 我是直接git clone了仓库，然后在这个仓库目录下cmd进入命令行安装，这有助于后续登录配置。
### 登录与设置
此时会进入这一界面要你选择主题和设置：
![image.png](https://s2.loli.net/2025/06/28/7CykRZEzh62Wn1U.png)
直接Enter即可，我们不在命令行中使用它。如果要选择就按上下方向键。
接下来是选择登录方式：
![image.png](https://s2.loli.net/2025/06/28/auFr2YKEdxTlAZB.png)
这里我们选择第一种方式 直接使用Google账号登录，enter之后会跳转浏览器登录页。
很可能会卡在登录界面：
![image.png](https://s2.loli.net/2025/06/28/MsxO4ECa91oqL5F.png)
此时有两种解决方案：
1. 打开tun（虚拟网卡）模式（Clash系列，我使用的是Clash verge）
2. 修改代理
	打开Clash，在设置中找到你的 端口设置，一般是`7897`。找到你安装Gemini-cli的目录，找到`.gemini`文件夹，进去之后新建一个txt文本文档，粘贴下面的代码，如果你的端口不是7897那就对应修改。保存-关闭，把文本文档重命名为 `.env`
```
HTTPS_PROXY="http://127.0.0.1:7897"
HTTP_PROXY="http://127.0.0.1:7897"
```
之后回到Gemini-cli运行的终端，重新进行登录应该就可以了，成功的结果是这样的：
![image.png](https://s2.loli.net/2025/06/28/3uyXQqb1AUj4dzJ.png)
部分老账号可能出现：Failed to login. Workspace accounts and licensed Code Assist users must configure...无法登录的报错，可以参考[这篇文章](https://mp.weixin.qq.com/s/N1E8zf5Jbd7ZpA8wIKojRw)进行尝试修改，注意最后的代码中 项目ID 应该用 `" "`包裹。

### 在Roo Code中配置Gemini-cli

！请确保Roo Code已经更新到最新版本（3.22.4）
打开设置-提供商，新建一个配置文件，选择提供商为 Gemini CLI，拉到下面模型选择gemini-2,5-pro，保存即可。
![image.png](https://s2.loli.net/2025/06/28/EGqzAmVTy986OKI.png)

### (新增)Roo Code中配置Gemini

1. 创建Gemini API-Key
	在[Get API key | Google AI Studio](https://aistudio.google.com/apikey)Create API key，注意你创建的项目一定要是Free Plan，不然会产生扣费。
2. 在Roo Code中新建配置文件
## 在Roo Code中测试效果
### Roo Code的基本使用
**模式选择**
RooCode 的核心在于其多样化的 **“模式” (Modes)**，每种模式都为特定的开发任务量身定制，并由不同的人工智能模型驱动：
- **代码模式 (Code Mode):** 用于通用的编码任务，能够根据您的需求生成代码片段、完成函数或实现算法。
- **架构师模式 (Architect Mode):** 专注于项目规划和技术选型，可以帮助您设计系统架构、规划项目结构。
- **提问模式 (Ask Mode):** 作为您的项目知识库，能够深入分析您的代码库并回答相关问题。
- **调试模式 (Debug Mode):** 协助您系统地诊断和修复代码中的错误。
- **Orchestrator Mode：** 能够把一个大任务拆分多个子任务，从而减少上下文长度（每个子任务独立上下文长度）。子任务执行完毕后会返回结果总结，使得项目模块更为清晰，但是可能出现信息传递的损耗。在使用Gemini系列1M上下文的API时，其实可以不用它，但是对其他的128k上下文的api比较实用。
- **自定义模式 (Custom Modes):** 允许您创建具有特定角色和能力的个性化 AI 代理，例如安全审计员、性能优化专家或文档撰写者。
你也可以自定义模式，调整prompt以获取更个性化的使用体验。
一般来说，我会先用 Architect 模式让它整理一下我的需求，规划结构，之后再使用 Orchestrator 模式或者Code模式来进行初版代码编写，后续有需要再Ask or Debug。

**自动批准**
建议关了，至少“执行”和“写入”谨慎开启。

**其他补充**
来自某技术论坛的经验帖子。
一个MCP，还没试但是好像挺不错[【通吃:Augment Code、Cursor、Trae、Windsurf】对话次数=超级加倍！！300次变1500、50次变250(500次变2500)、600次变1800~ - 前沿快讯 - LINUX DO](https://linux.do/t/topic/694193)
自定义Mode[cusor降智？agument会不会步其后尘？听说roo code不错但没有搜索到太多的配置信息？有的，佬，我这里都有~ - 开发调优 - LINUX DO](https://linux.do/t/topic/622674)
自定义Mode[【roo code经验分享】嫌回旋镖没记忆？SPARC太复杂？试试我这个魔改版NexusCore - 开发调优 - LINUX DO](https://linux.do/t/topic/635783)
搭配Openrouter的免费Key也不错[Roo Code 保姆级基础使用方法 - 资源荟萃 - LINUX DO](https://linux.do/t/topic/625339)
****
### 样例测试效果
测试用例仓库：[test_of_geminicli: 试一下GeminiCli](https://github.com/Random-Yanxh/test_of_geminicli)
（让Gemini给我提供了测试的Prompt，写了一个实际用处不大的Markdown转HTML的工具）
具体流程其实并不那么重要，但是GIF动图里呈现出来的Vibe Coding的效果，让我在第一次使用它时就非常地惊喜和兴奋。

指令1：Architect Mode
`你好，RooCode。我希望你扮演一个全栈开发者的角色，帮助我完成一个项目。我们的目标是创建一个简单的‘静态网站生成器’。这个工具的功能是读取一个目录下的所有 Markdown 文件，将它们的内容渲染到一个统一的 HTML 模板中，并最终生成一个完整的、可以浏览的静态网站。先帮我规划一下架构`
反馈：给了一些备选项，我选择了用Node.js，给我一些功能备选项，我加入需求之后，让它给我生成了一个Plan.md（这一个文档挺实用，方便后续查看。
![1751169664983.gif](https://s2.loli.net/2025/06/29/9uapAFfbd6soHWy.gif)

指令2：Code Mode
反馈：直接按照步骤给我在终端运行了依赖安装命令，
![1751169845500.gif](https://s2.loli.net/2025/06/29/1oHrUDkCZQRXLxO.gif)
![image.png](https://s2.loli.net/2025/06/29/8aTKR6rukz3wCgY.png)
最后不知道怎么就自己跑完了，我让他再给我写一个 README.md，并按照它的指示，把我之前的一篇md文档丢到对应路径，build项目，但是失败了，终端报错
![1751170087926.gif](https://s2.loli.net/2025/06/29/943KHbRex5wjOmE.gif)

指令3：Ask Mode
问了报错原因，说是md文档缺少元数据，它切换成Code模式给我手动加上去之后就搞定了。
![1751170239133.gif](https://s2.loli.net/2025/06/29/ALmdJXistbjF49O.gif)
但是我发现插入的图片显示还是有问题，因此下面尝试使用Code模式来加入图片自适应缩放功能。

指令4：Code Mode
这里我截图给它看了，Gemini多模态很强，在Roo Code中也可以上传图片，这样在修改的时候是很方便的。

![1751170623992.gif](https://s2.loli.net/2025/06/29/Og4CIv2shEyo5xQ.gif)

应该是加入了一个CSS样式增强规则，解决了这一问题。我让它给我更新了README.md 和 PLAN.md，然后让它给我写了几个不同风格的CSS样式，应该会比较好看。写到一半比较尴尬的是，好像到达用量了（？）切换了AiStudio的Key完成了后续的部分。

指令5：Orchestrator Mode
每次导入文档之后需要手动添加Front Matter信息，很麻烦，我让他加入了自动添加字段信息的功能，实际上好像挺快的，也可以直接用Code模式。

指令6：Debug Mode
`再检查一下看看有没有别的问题`
反馈：索引页好像有点问题，它建议加入临时日志来修改，跑了一遍确实有问题。然后点点点按照它的方案改完了，更新了文档。

最后的效果大概是这样：
![1751170944114.gif](https://s2.loli.net/2025/06/29/7QcqytWn6whBlJs.gif)


## 总结与一些感想

这个学期我已经用这套方案做了好几个大作业了，经常是Roo Code 和 AiStudio搭配使用，后者规划方案给指导思路，前者进行执行，虽然偶尔会出现bug，但是gemini 2.5 pro 在代码方面总体来说还是很不错的。Vibe coding并不那么强大，它也有许多缺陷和毛病，使用的时候最好做好git版本管理，谨慎自动批准，做好一个功能push一下，否则万一它抽风了把做好的功能改乱了，会很浪费时间。

Roo Code还有一些进阶用法，如MCP调用，自定义Mode等；Vibe Coding也有许多新鲜的东西，Trae反响一般，Augment成为黑马，warp似乎不错，Claude Code贵但好用；Google的aistudio中也有build功能，可以做文字游戏，1M上下文的项目构建非常强大。

新的工具不断涌现，模型迭代，像我这样的代码苦手也可以把自己的想法做成简单的demo落地，对我来说，这就是现在AI带给我最棒的东西。在Gemini-cli发布之前，aistudio提供的2.5proAPI有一段时间不能免费使用，这段时间又恰好赶上我要写大作业，没有它写代码非常不方便，不得已去买了个GCP 300途径的API。这篇教程很早就在酝酿，只是苦于没有大家都能简单获取的免费API。昨天看到Gemini-Cli可以用在Roo Code中，把流程跑通之后马上开始写，写到测试用例停笔，今天起床本来打算补这一部分，然后发现Gemini 2.5 Pro 的Api-Key 重新开放免费调用了（令人兴奋，但是Gemini-cli此时的价值就没那么大了），就又往前进行修改，然后把测试用例做完。AI编程并非0️门槛，但是对临时要做个东西需要接触不熟悉的代码领域的同学来说，这可太有用了。

希望能够帮到看到这篇教程的朋友，即使只是做了一个并不实用的demo，也希望你能从中体验到“想法落地”的快乐。

