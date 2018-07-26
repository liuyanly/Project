<style scoped>
    .echart {
        margin-top: 30px;
    }
    h2{
        margin-bottom: 25px;
    }
</style>
<template>
    <div class="echart">
        <div>
            <h2>{{data.title}}</h2>
        </div>
        <Table stripe  :columns="data.columns" :data="data.data" ></Table>
    </div>
</template>

<script>
  	export default {
        props: {
            data: {
                type: Object,
                default:{}
            }
        }
  	}
</script>
