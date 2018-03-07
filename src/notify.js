var data = {name: 'origin'};
observe(data);
data.name = 'newOrigin'; // 监听到值变化了 origin --> newOrigin


// 通知中心，监听 data 变化
function Notify() {
    
}
