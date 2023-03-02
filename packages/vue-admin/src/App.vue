<script setup>
    import {RouterLink, RouterView} from 'vue-router'
    import HelloWorld from './components/HelloWorld.vue'
    import { format,
        trimSpace,
        firstToUpperCase,
        flatArr
    } from '@pense/utils'

    import {
        SkyButton,
        SkyInput,
    }  from '@pense/components'

    import { onMounted,ref } from 'vue'

    // 测试
    // getUser().then(res => {
    //     console.log('%c123', 'color:red;')
    // })
    const time = format(new Date())
    console.log(time)

    const str = trimSpace('  76878,   bnbn  ')
    console.log('%cstr的值：'+str, 'color:red;')

    const str2 = firstToUpperCase('sdsdfdf')
    console.log(str2)

    const arr = [11,[22,33],55,[66,[77,88]]]
    const newArr = flatArr(arr)
    console.log(arr)
    console.log(newArr)

    // console.log(Axios)
    // Axios.get('/user?ID=12345')
    //     .then(function (response) {
    //       // handle success
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });

    onMounted(()=>{
      console.log(123456)
    })

    const clickEven = (val)=>{
      console.log(val)
    }
</script>

<template>
    <header>
<!--        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>-->
        <div class="wrapper">
            <HelloWorld
                ref="hello"
                msg="组件props"
                @clickChild="clickEven"
            />
          <div style="margin-left: 10px;">
            远程npm组件引入测试demo：
            <SkyButton></SkyButton>
            <SkyInput></SkyInput>
          </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/vscroll">虚拟滚动demo</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView/>
</template>

<style>
body{
  --test-var: 'green';
}
/*全局变量*/
:root {
  --fontSize: 19px;
  --bg-color: #1e90ff;
  --font-color: #1e90ff;
  --url: url("https://picsum.photos/id/1/200/300");
}
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (min-width: 1024px) {
        header {
            /*display: flex;*/
            /*place-items: center;*/
            /*padding-right: calc(var(--section-gap) / 2);*/
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            text-align: left;
            margin-left: -1rem;
            font-size: 1rem;

            padding: 1rem 0;
            margin-top: 1rem;
        }
    }
</style>
