import SingleProductPage from "@/components/pages/single-product/SingleProductPage";

export default function Page({ params }) {
     return (
          <SingleProductPage product_name={params.name}/>
     )
}