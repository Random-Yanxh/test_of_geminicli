## 能干什么
1. 调用API可以实现相对于机翻更准确的AI翻译，并且响应速度快，目前免费
2. 辅助读文献，Zotero里面对几篇文献一起写综述性文字

## 前期准备
1. Zotero
2. 插件：
	1. 辅助文献阅读和分析：[Awesome GPT for Zotero | Zotero 中文社区](https://zotero-chinese.com/user-guide/plugins/zotero-gpt.html)
	2. 翻译：[Translate for Zotero](https://zotero-chinese.com/plugins/#search=Translate%20for%20Zotero)
3. 大先生平台获取API[大先生-模型广场](https://chat.zju.edu.cn/model-service?hideRight=true&name=%E6%A8%A1%E5%9E%8B%E5%B9%BF%E5%9C%BA&iframeSrc=https://chat.zju.edu.cn/model-square/%23/model-square)在调用管理那里生成API即可
4. 一些供测试的文献

## 具体步骤（以Zotero7为例）
### 翻译
1. 安装好翻译插件后，进入插件的设置页面
2. 服务--翻译服务，下拉选择“自定义GPT”，填入你在大先生平台上申请好的API
	 
<div align="center">
  <img src="https://s2.loli.net/2025/03/08/YDbVFZi7ExdzeL1.png"  width="80%">
</div>

3. 进入“配置”，按照如下填法依次填好保存：
	1. 接口：`https://chat.zju.edu.cn/api/ai/v1/chat/completions`
	2. 模型：`deepseek-v3-671b` （这个效果和速度兼备）
	3. 温度：`0~1之间随便填`
	4. Prompt：`As an academic expert with specialized knowledge in various fields, please provide a proficient and precise translation from ${langFrom} to ${langTo} of the academic text enclosed in 🔤. It is crucial to maintaining the original phrase or sentence and ensure accuracy while utilizing the appropriate language. The text is as follows:  🔤 ${sourceText} 🔤  Please provide the translated result without any additional explanation and remove 🔤.`
	5. 可以勾选Stream（流式传输）
	6.  
<div align="center">
  <img src="https://s2.loli.net/2025/03/08/3XR8Hh7KvqOdEjc.png"  width="60%">
</div>

4. 测试效果：
	 
<div align="center">
  <img src="https://s2.loli.net/2025/03/08/UzJeXumOPs2oGab.png"  width="100%">
</div>

5. **注意事项**：似乎我挂了梯子之后API就无法正常请求，不挂梯子使用效果是很棒的。

### Awesome-GPT
1. 安装好插件之后进入插件设置页面（GPT），依次这样填：
	 <div align="center">
  <img src="https://s2.loli.net/2025/03/08/Te9B4vzr1PduM6X.png"  width="100%">
	</div>
	
	1. Full API：`https://chat.zju.edu.cn/api/ai/v1/chat/completions`
	2. APIKEY：你申请的
	3. Model：`deepseek-v3-671b`
	4. 参数：
		1. Max tokens最好拉到8192，如果多轮的话可能要调小到4096
		2. 下面两个一个是回答引用数，一个是对话轮数（似乎是），不能太大，实测8+5或者10+3比较稳，不然可能超过了API的上下文限制，就会无法输出。
	5. 系统提示词用自带的不用改：`你是Zotero GPT插件，用于辅助用户使用文献管理软件Zotero阅读管理文献，你的输出环境支持markdown渲染。`
	6. 勾选使用自定义的向量模型：
		1. Full API: `https://chat.zju.edu.cn/api/ai/v1/embeddings`【注意这里和前面的后缀不同】
		2. APIKEY一致
		3. Model：自己输入`bge-m3`
	7. Test，正常情况如上图
	8. Save Config，便于后续可以切换
	9. 测试效果：
		1. 单篇文献AskPDF：
			
			<div align="center">
			  <img src="https://s2.loli.net/2025/03/08/8JiwcMtEuVd5Fa3.png"  width="100%">
			</div>

		2. 多篇文献综述：
			 
			<div align="center">
			  <img src="https://s2.loli.net/2025/03/08/Qkg3yrmWbXCtGse.png"  width="100%">
			</div>


## 其他
大先生的API上下文还是太短了，讯飞的可以按照默认设置输出，商汤和大先生的V3API只能阉割，而且大先生API调用时候记得关闭代理或者加个分流规则，不然调用不了。

有个挺好的是它提供了embedding 和 rerank的模型，RAG知识库可以用（你可以在CherryStudio里面用），而大先生对话的API还提供了QwQ-32B，这个可以在CherryStudio里面玩玩，别的不如直接网页端（除非你用知识库）。QwQ-32B的配置参考上一个帖子里Groq的配置方法，勾选其为推理模型后，可以将思考和正文分开显示。速度不错。但是在Zotero里面没有找到好的办法隐藏其思考过程。 
<div align="center">
  <img src="https://s2.loli.net/2025/03/08/1s6ylGSoi7ktTAL.png"  width="100%">
</div>









