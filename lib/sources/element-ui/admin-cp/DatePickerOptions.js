export var xX_datePickerOptions = {
    shortcuts: [{
            text: '最近一周',
            onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                picker.$emit('pick', [start, end]);
            },
        }, {
            text: '最近一个月',
            onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            },
        }, {
            text: '最近三个月',
            onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            },
        }],
};
//# sourceMappingURL=DatePickerOptions.js.map