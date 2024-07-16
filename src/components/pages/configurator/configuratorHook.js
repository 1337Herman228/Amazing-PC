
const configuratorHook = () => {

     const selectIcon = (name) => {
          switch(name){
               case 'Видеокарта':
                    return '/gaming-pc/components-svg/gpu.svg'
               case 'Процессор':
                    return '/gaming-pc/components-svg/cpu.svg'
               case 'Материнская плата':
                    return '/gaming-pc/components-svg/mb.svg'
               case 'Охлаждение':
                    return '/gaming-pc/components-svg/cpu-fan.svg'
               case 'Оперативная память':
                    return '/gaming-pc/components-svg/ram.svg'
               case 'SSD накопитель':
                    return '/gaming-pc/components-svg/ssd.svg'
               case 'Блок питания':
                    return '/gaming-pc/components-svg/pow-sup.svg'
               case 'Корпус':
                    return '/gaming-pc/components-svg/case.svg'
               case 'Вентиляторы':
                    return '/gaming-pc/components-svg/fan.svg'
               case 'Монитор':
                    return '/configurator-svg/monitor.svg'
               default:
                    return null
          }
     }

     return {selectIcon}
}

export default configuratorHook
