
export async function loader({ params }) {
   console.log(params.id,'id')
  return { name: 1 };
}

export default function ProductDetail() {
  return (
    <div>product-detail</div>
  )
}
