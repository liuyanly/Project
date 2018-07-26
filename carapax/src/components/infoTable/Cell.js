export default {
    name: 'Cell',
    functional: true,
    props: {
        render: Function,
        data: {
            type: Object,
            default: {}
        }
    },
    render: (h, ctx) => {
        const { data, render } = ctx.props;
        const params = {
            data: data,
        };
        if(JSON.stringify(data) == "{}") {
            return '';
        }
        return render(h, params);
    }
};