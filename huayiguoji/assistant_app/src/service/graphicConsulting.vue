<template>
	<div class="d4">
		<headers headName="患者信息"></headers>
		<publicHeaderPhoto  :zijipic='zijipic' :hz='hz' :name='name' :bing='bing' :sex='sex' :age='age'></publicHeaderPhoto>
		<div>
			<p class="y-x-title">症状</p>
			<div class="y-x-fengexian"></div>
			<p class="y-x-miaoshu">从事综合内科工作10余年，对内科冠心病、心力衰竭、 心肌梗死、心律失常、上呼吸道感染、肺炎、慢性支气 管炎、泌尿道感染、胃炎、胃溃疡、幽门螺旋杆菌感染、 肝硬化、对糖尿病药物及糖尿病胰岛素泵治疗、甲状腺 疾病（妊娠甲状腺疾病）、高尿酸血症、骨质疏松及代 谢疾病有独到见解。
			</p>
			<div class="y-fengexian"></div>
			
		</div>

		<div>
			<p class="y-x-title aui-border-b">
				<span>图文咨询</span>
				<span class="aui-text-333 aui-pull-right">¥ 100/次</span>
			</p>
			<div class="kong222">
				
			</div>
			
			<div class="y-x-fengexian"></div>

		</div>
		<publicFooter1 :footer1Txt='footer1Txt' :footer1TxtUsl='footer1TxtUsl'></publicFooter1>
	</div>
</template>

<script>
	import headers from '../components/Header'
	import publicHeaderPhoto from '@/components/parts/headerPhoto'
	import publicFooter1 from '@/components/parts/footer1'

	export default {
		name: 'd4twxq',
		data() {
			return {
				name: '啦啦啦',
				bing: '天天开心',
				sex: '男',
				age: '120',
				footer1Txt: "立即咨询",
				footer1TxtUsl: '/graphicConsultingDetails',
				zijipic: '/src/images/pic_h.png', //头像
				hz: '/src/images/f1_v3@2x.png', //   徽章 
			}
		},
		components: {
			headers,
			publicHeaderPhoto,
			publicFooter1
		}
	}
</script>

<style scoped>
	.kong222{
		height: 5.55rem;
		background: #fff;
	}
	.d4{
		margin-bottom: 2.95rem;
	}
</style>