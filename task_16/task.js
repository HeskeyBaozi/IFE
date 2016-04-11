(function (window) {
    window.onload = function () {
        /**
         * aqiData，存储用户输入的空气指数数据
         * 示例格式：
         * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
         */
        var aqiData = {};

        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {
            var city = document.querySelector('#aqi-city-input').value;
            var aqi = document.querySelector('#aqi-value-input').value;
            aqiData[city] = parseInt(aqi);
        }

        /**
         * 渲染aqi-table表格
         */
        function renderAqiList() {
            var table = document.querySelector('#aqi-table');
            table.innerHTML = '';
            if (table.children.length === 0) {
                var tableHead = document.createElement('tr');
                tableHead.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>';
                table.appendChild(tableHead);
            }
            var tableVirtual = document.createDocumentFragment('table');
            for (var cityName in aqiData) {
                var item = document.createElement('tr');
                //if(aqiData.hasOwnProperty('cityName')){
                item.innerHTML = '<td>' + cityName + '</td><td>' + aqiData[cityName] + '</td><td>' + '<input type="button" class="deletebtn" value="删除">' + '</td>';
                tableVirtual.appendChild(item);
                //}
            }
            table.appendChild(tableVirtual);
        }

        /**
         * 点击add-btn时的处理逻辑
         * 获取用户输入，更新数据，并进行页面呈现的更新
         */
        function addBtnHandle() {
            addAqiData();
            renderAqiList();
        }

        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle(key) {
            delete aqiData[key];
            renderAqiList();
        }

        function init() {
            // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            document.querySelector('#add-btn').addEventListener('click', addBtnHandle);
            // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
            document.querySelector('#aqi-table').addEventListener('click', function (e) {
                if (e.target && e.target.type.toLowerCase() == 'button') {
                    var cityName = e.target.parentNode.parentNode.firstChild.textContent;
                    delBtnHandle(cityName);
                }
            }, false);
        }

        init();
    }
})(window);