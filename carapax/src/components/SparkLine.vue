<template>
    <div :id="id"></div>
</template>

<script>
    import $ from 'jquery';
    require("../assets/js/jquery.sparkline.min.js");
  	export default {
	    props: ["id", "data"],
	    data() {
	      	return {
	        
	      	}
	    },
	    mounted() {
	      this.drawLine();
	    },
	    methods: {
	      	drawLine() {
		        $("#" + this.id).sparkline(this.data, {
		    		type: 'line',
		    		tooltipChartTitle:'<span style="display:inline;"></span>'+ "接入流量",
		    	});
	      	}
	    }
  	}
</script>