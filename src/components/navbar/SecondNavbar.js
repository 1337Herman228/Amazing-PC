import Link from 'next/link';
import './SecondNavbar.scss'
import { useEffect } from 'react';

const SecondNavbar =({productInfo})=>{

     useEffect(() => {
          window.addEventListener('scroll', dynamicSecondNavLinks);
          dynamicSecondNavLinks();
  
          return () => {
              window.removeEventListener('scroll', dynamicSecondNavLinks);
          };
      }, []);

      const dynamicSecondNavLinks = () => {
          var navbarLinks = document.querySelectorAll(".nav-list__item");
          var blocks = [
               document.getElementById("start"),
               document.getElementById("design"),
               document.getElementById("preview"),
               document.getElementById("performance"),
               document.getElementById("kits-and-prices"),
          ];
          
          var scrollPosition = window.scrollY || window.pageYOffset;

          // console.log(blocks)
          
          for (var i = 0; i < blocks.length; i++) {
               var blockTop = blocks[i].offsetTop - 85;
               var blockBottom = blockTop + blocks[i].offsetHeight - 10;
          
               if (scrollPosition >= blockTop && scrollPosition <= blockBottom) {
               navbarLinks[i].classList.add("active");
               } else {
               navbarLinks[i].classList.remove("active");
               }
          }
     };

     return(
          <header className="second-header">
               <nav className="second-navbar container">
                    <Link href='#start' className="second-navbar__title">{productInfo.name}</Link>
                    <ul className="nav-list">
                         <Link href='#start' className="nav-list__item">
                              Представление
                         </Link>
                         <Link href='#design' className="nav-list__item">
                              Дизайн
                         </Link>
                         <Link href='#preview' className="nav-list__item">
                              Обзор
                         </Link>
                         <Link href='#performance' className="nav-list__item">
                              Производительность
                         </Link>
                         <Link href='#kits-and-prices' className="nav-list__item">
                              Комплектация и цены
                         </Link>
                    </ul>
               </nav>
          </header>
     )
}
export default SecondNavbar