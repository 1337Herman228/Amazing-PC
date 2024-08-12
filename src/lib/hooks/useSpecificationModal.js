

const useSpecificationModal = () => {
   
    const makeProductArray = (product) => {
        let productArray = []
        for (const key in product) {
             const item = product[key];

             if(item != null && item?.length != 0){
                  // item.title = key
                  productArray.push(item)
             }
   
        }
        return productArray
   }

   const getCategories = (product) =>{
    let titles = []
    for (const key in product) {
         const item = product[key];
         if(item != null && item?.length != 0 && !titles.includes(item.category)){
              titles.push(item.category)
         }
    }
    return titles
}

    return {makeProductArray, getCategories}
};

export default useSpecificationModal;