import SkyButton from './sky-button/Button.vue'
import SkyInput from './sky-input/Input.vue'
export  {
    SkyButton,
    SkyInput,
}


// import SkyButton from './sky-button/Button.vue'
// import SkyInput from './sky-input/Input.vue'
// const coms = [SkyButton, SkyInput]; // 将来如果有其它组件,都可以写到这个数组里
//
// // 批量组件注册
// const install = function (Vue) {
//     coms.forEach((com) => {
//         Vue.component(com.name, com);
//     });
// };
//
// export default install; // 这个方法以后再使用的时候可以被use调用